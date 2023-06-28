package com.example.be.services;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.*;
import com.example.be.dtos.TokenDTO;
import com.example.be.dtos.UserDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class UserDataService {

    private final AWSCognitoIdentityProvider cognitoClient;
    private final UniversityService universityService;
    private final CompanyService companyService;

    @Value("${aws.cognito.userpoolid}")
    private String USER_POOL_ID;

    @Autowired
    public UserDataService(
            AWSCognitoIdentityProvider cognitoClient,
            UniversityService universityService,
            CompanyService companyService
    ) {
        this.cognitoClient = cognitoClient;
        this.universityService = universityService;
        this.companyService = companyService;
    }

    public UserDataDTO getUserData(TokenDTO tokenDTO) {
        GetUserResult userDataByJWT = cognitoClient.getUser(new GetUserRequest().withAccessToken(tokenDTO.getToken()));
        UserDataDTO userDataDTO = new UserDataDTO();
        userDataDTO.setUsername(userDataByJWT.getUsername());
        for (AttributeType attribute : userDataByJWT.getUserAttributes()) {
            switch (attribute.getName()) {
                case "sub" -> userDataDTO.setId(attribute.getValue());
                case "name" -> userDataDTO.setName(attribute.getValue());
                case "email" -> userDataDTO.setEmail(attribute.getValue());
                case "custom:role" -> {
                    if (
                            !attribute.getValue().equals("JOB_SEEKER") &&
                            !attribute.getValue().equals("RECRUITER") &&
                            !attribute.getValue().equals("ADMIN")
                    ) {
                        throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Invalid user role");
                    }
                    userDataDTO.setRole(attribute.getValue());
                }
                case "custom:university" -> userDataDTO.setUniversity(attribute.getValue());
                case "custom:company" -> userDataDTO.setCompany(attribute.getValue());
            }
        }
        return userDataDTO;
    }

    public UserDataDTO getUserData(String username) {
        AdminGetUserResult userResult = cognitoClient.adminGetUser(
                new AdminGetUserRequest()
                        .withUserPoolId(USER_POOL_ID)
                        .withUsername(username)
        );
        UserDataDTO userDataDTO = new UserDataDTO();
        userDataDTO.setUsername(userDataDTO.getUsername());
        for (AttributeType attribute : userResult.getUserAttributes()) {
            switch (attribute.getName()) {
                case "sub" -> userDataDTO.setId(attribute.getValue());
                case "name" -> userDataDTO.setName(attribute.getValue());
                case "email" -> userDataDTO.setEmail(attribute.getValue());
                case "custom:role" -> {
                    if (
                            !attribute.getValue().equals("JOB_SEEKER") &&
                            !attribute.getValue().equals("RECRUITER") &&
                            !attribute.getValue().equals("ADMIN")
                    ) {
                        throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Invalid user role");
                    }
                    userDataDTO.setRole(attribute.getValue());
                }
                case "custom:university" -> userDataDTO.setUniversity(attribute.getValue());
                case "custom:company" -> userDataDTO.setCompany(attribute.getValue());
            }
        }
        return userDataDTO;
    }
}
