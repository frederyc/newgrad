package com.example.be.services;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.dtos.SignInDataDTO;
import com.example.be.dtos.SignUpDataDTO;
import com.example.be.dtos.TokenDTO;
import com.example.be.entities.RecruiterAccountStatus;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import com.nimbusds.jose.jwk.RSAKey;
import org.springframework.web.client.HttpClientErrorException;

import java.security.interfaces.RSAPublicKey;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class CognitoService {
    private final AWSCognitoIdentityProvider cognitoClient;
    private final Set<String> studentEmailDomains;
    private final RecruiterAccountStatusService recruiterAccountStatusService;
    private final CacheManager cacheManager;

    // Storing verified tokens in a map to keep track of verified tokens and their expiration
    @Value("${aws.cognito.userpoolid}")
    private String USER_POOL_ID;

    @Value("${aws.cognito.clientid}")
    private String CLIENT_ID;

    @Value("${aws.cognito.clientsecret}")
    private String CLIENT_SECRET;

    @Autowired
    public CognitoService(
            AWSCognitoIdentityProvider cognitoClient,
            Set<String> studentEmailDomains,
            RecruiterAccountStatusService recruiterAccountStatusService,
            CacheManager cacheManager
    ) {
        this.cognitoClient = cognitoClient;
        this.studentEmailDomains = studentEmailDomains;
        this.recruiterAccountStatusService = recruiterAccountStatusService;
        this.cacheManager = cacheManager;
    }

    public SignUpResult signUp(SignUpDataDTO signUpData) {
        String username = getEmailAsUsername(signUpData.getEmail());

        if (!Set.of("RECRUITER", "JOB_SEEKER").contains(signUpData.getRole())) {
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Invalid role");
        }

        SignUpRequest signUpRequest = new SignUpRequest()
                .withClientId(CLIENT_ID)
                .withSecretHash(computeSecretHash(username))
                .withUsername(username)
                .withUserAttributes(
                        new AttributeType().withName("email").withValue(signUpData.getEmail()),
                        new AttributeType().withName("name").withValue(signUpData.getName()),
                        new AttributeType().withName("custom:role").withValue(signUpData.getRole()),
                        new AttributeType().withName(
                            "custom:%s".formatted(signUpData.getRole().equals("RECRUITER") ? "company" : "university")
                        ).withValue(
                            signUpData.getRole().equals("RECRUITER") ? signUpData.getCompany() : signUpData.getUniversity()
                        )
                )
                .withPassword(signUpData.getPassword());

        String emailProviderDomain = signUpData.getEmail().split("@")[1];
        switch (signUpData.getRole()) {
            // If the user is a JOB_SEEKER, check if the email's domain is a valid university domain
            case "JOB_SEEKER":
                if (!studentEmailDomains.contains(emailProviderDomain)) {
                    throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Not a valid university email");
                }
                break;
            // If the user is a RECRUITER, deny immediately any attempt to register with an email that is provided
            // by a popular, public provider
            case "RECRUITER":
                Set<String> popularEmailProviders = Set.of(
                        "gmail.com",
                        "yahoo.com",
                        "outlook.com",
                        "aol.com",
                        "mail.com",
                        "icloud"
                );
                if (popularEmailProviders.contains(emailProviderDomain)) {
                    throw new HttpClientErrorException(
                            HttpStatus.BAD_REQUEST,
                            "Public email addresses cannot be used by recruiters"
                    );
                }
                recruiterAccountStatusService.save(new RecruiterAccountStatus(
                   getEmailAsUsername(signUpData.getEmail()),
                   "UNCONFIRMED"
                ));
                break;
        }
        try {
            return cognitoClient.signUp(signUpRequest);
        } catch (UsernameExistsException e) {
            throw new HttpClientErrorException(HttpStatus.CONFLICT, "A user with this email already exists");
        }
    }

    public AdminUserGlobalSignOutResult signOut(TokenDTO tokenDTO) {
        try {
            DecodedJWT jwt = JWT.decode(tokenDTO.getToken());
            String username = jwt.getClaim("username").asString();

            AdminUserGlobalSignOutRequest signOutRequest = new AdminUserGlobalSignOutRequest();
            signOutRequest.setUserPoolId(USER_POOL_ID);
            signOutRequest.setUsername(username);

            // Check if the token is in cache and if it is, delete it
            ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("authTokens");
            assert cache != null;
            SimpleKey sk = new SimpleKey(jwt.getSignature());
            Cache.ValueWrapper vw = cache.get(sk);

            if (vw != null) {
                cache.evict(sk);
            }

            return cognitoClient.adminUserGlobalSignOut(signOutRequest);
        } catch (IllegalArgumentException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
    }

    public String signIn(SignInDataDTO signInData) {
        String username = getEmailAsUsername(signInData.getEmail());
        Map<String, String> authParams = new HashMap<>(Map.of(
                "USERNAME", username,
                "PASSWORD", signInData.getPassword(),
                "SECRET_HASH", computeSecretHash(username)
        ));

        AdminInitiateAuthRequest authRequest = new AdminInitiateAuthRequest()
                .withAuthFlow(AuthFlowType.ADMIN_NO_SRP_AUTH)
                .withClientId(CLIENT_ID)
                .withUserPoolId(USER_POOL_ID)
                .withAuthParameters(authParams);

        try {
            AdminInitiateAuthResult authResult = cognitoClient.adminInitiateAuth(authRequest);
            RecruiterAccountStatus recruiterAccountStatus = recruiterAccountStatusService.findByUsername(
                    getEmailAsUsername(signInData.getEmail())
            );
            if (recruiterAccountStatus != null && !recruiterAccountStatus.getStatus().equals("CONFIRMED")) {
                String message = "";
                switch (recruiterAccountStatus.getStatus()) {
                    case "UNCONFIRMED" -> message = "You must wait for our team to check your account";
                    case "SUSPENDED" -> message = "This account has been suspended";
                    case "BANNED" -> message = "This account has been permanently banned";
                }
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, message);
            }
            return authResult.getAuthenticationResult().getAccessToken();
        } catch (UserNotConfirmedException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Account unconfirmed");
        } catch (NotAuthorizedException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Wrong username or password");
        }
    }

    public boolean validateToken(TokenDTO tokenDTO)
            throws IOException, ParseException, JOSEException, NotAuthorizedException {
        String issuer = "https://cognito-idp.%s.amazonaws.com/%s".formatted(
                USER_POOL_ID.split("_")[0],
                USER_POOL_ID
        );

        // Retrieve the RSA public key from Cognito's JWK set
        JWKSet jwkSet = JWKSet.load(new URL("%s/.well-known/jwks.json".formatted(issuer)));
        DecodedJWT jwt = JWT.decode(tokenDTO.getToken());
        RSAKey rsaKey = (RSAKey) jwkSet.getKeyByKeyId(jwt.getKeyId());
        RSAPublicKey rsaPublicKey = rsaKey.toRSAPublicKey();

        // Verify if the JWT is in the cache, return without performing additional computation
        ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("authTokens");
        assert cache != null;
        SimpleKey sk = new SimpleKey(jwt.getSignature());
        Cache.ValueWrapper vw = cache.get(sk);

        if (vw != null) {
            if (((long) vw.get()) < jwt.getExpiresAt().getTime()) {
                return true;
            } else {
                cache.evict(jwt.getSignature());
            }
        }

        // Verify the token's signature
        Algorithm algorithm = Algorithm.RSA256(rsaPublicKey);

        // Verify if the token is valid
        JWT.require(algorithm)
                .withIssuer(issuer)
                .build()
                .verify(tokenDTO.getToken());

        // Check if the token is still usable (aka the user didn't sign out or the jwt didn't expire)
        cognitoClient.getUser(new GetUserRequest().withAccessToken(tokenDTO.getToken()));

        // Store the JWT in the verified set so the next time the user performs a request it will be more efficient
        cache.put(sk, jwt.getExpiresAt().getTime());

        return true;
    }

    public GetUserResult getUserResult(TokenDTO tokenDTO) {
        return cognitoClient.getUser(new GetUserRequest().withAccessToken(tokenDTO.getToken()));
    }

    public String getUserRole(TokenDTO tokenDTO) {
        return getUserResult(tokenDTO).getUserAttributes()
                .stream()
                .filter(x -> x.getName().equals("custom:role"))
                .findFirst()
                .get().getValue();
    }

    private String computeSecretHash(String username) {
        try {
            String message = username + CLIENT_ID;
            SecretKeySpec keySpec = new SecretKeySpec(
                    CLIENT_SECRET.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(keySpec);
            byte[] result = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.encodeBase64String(result);
        } catch (Exception e) {
            throw new RuntimeException("Error while calculating secret hash", e);
        }
    }

    // Clean outdated tokens every 1h
    @Scheduled(fixedRate = 6000000)
    public void cleanTokenCache() {
        ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("authTokens");
        assert cache != null;
        cache.getNativeCache().forEach((k, v) -> {
            if ((long) v > System.currentTimeMillis()) {
                cache.evict(k);
            }
        });
    }

    private String getEmailAsUsername(String email) {
        return email.replace("@", "_").replace(".", "_");
    }
}
