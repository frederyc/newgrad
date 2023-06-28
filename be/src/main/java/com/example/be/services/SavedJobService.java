package com.example.be.services;

import com.example.be.dtos.TokenDTO;
import com.example.be.dtos.UserDataDTO;
import com.example.be.entities.SavedJob;
import com.example.be.expressions.SavedJobExpression;
import com.example.be.repositories.SavedJobRepository;
import com.example.be.services.base.BaseEntityService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.util.List;

@Service
public class SavedJobService extends BaseEntityService<SavedJob> {
    private final CognitoService cognitoService;
    private final SavedJobExpression savedJobExpression;
    private final UserDataService userDataService;

    @Autowired
    public SavedJobService(
            SavedJobRepository savedJobRepository,
            CognitoService cognitoService,
            SavedJobExpression savedJobExpression,
            UserDataService userDataService
    ) {
        super(savedJobRepository);
        this.cognitoService = cognitoService;
        this.savedJobExpression = savedJobExpression;
        this.userDataService = userDataService;
    }

    public SavedJob find(String id, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return super.find(id);
    }

    public List<SavedJob> findByUsername(TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return super.find(savedJobExpression.findByUsername(userDataService.getUserData(tokenDTO).getUsername()));
    }

    public SavedJob findByQueryIndex(String jobId, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        try {
            List<SavedJob> l = super.find(savedJobExpression.findByQueryIndex(
                    MD5("%s%s".formatted(jobId, userDataService.getUserData(tokenDTO).getUsername()))
            ));
            return l.isEmpty() ? null : l.get(0);
        } catch (NoSuchAlgorithmException e) {
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    public SavedJob save(SavedJob savedJob, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        try {
            savedJob.setQueryIndex(MD5("%s%s".formatted(savedJob.getJobId(), userDataService.getUserData(tokenDTO).getUsername())));
            savedJob.setUsername(userDataService.getUserData(tokenDTO).getUsername());
            return super.save(savedJob);
        } catch (NoSuchAlgorithmException e) {
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

    public SavedJob delete(String id, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        SavedJob sj = this.findByQueryIndex(id, tokenDTO);
        if (sj == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Saved job not found");
        } else if (!userDataService.getUserData(tokenDTO).getUsername().equals(sj.getUsername())) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return super.delete(sj.getId());
    }

    private String MD5(String input) throws NoSuchAlgorithmException {
        // Create an instance of MessageDigest with SHA-256 algorithm
        MessageDigest digest = MessageDigest.getInstance("SHA-256");

        // Compute the SHA-256 hash of the input string
        byte[] encodedHash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

        // Convert the byte array to a hexadecimal string
        StringBuilder hexString = new StringBuilder();
        for (byte b : encodedHash) {
            String hex = String.format("%02x", b);
            hexString.append(hex);
        }

        return hexString.toString();
    }
}
