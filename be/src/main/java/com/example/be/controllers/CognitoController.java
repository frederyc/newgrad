package com.example.be.controllers;

import com.amazonaws.services.cognitoidp.model.AdminUserGlobalSignOutResult;
import com.amazonaws.services.cognitoidp.model.NotAuthorizedException;
import com.example.be.dtos.SignInDataDTO;
import com.example.be.dtos.TokenDTO;
import com.example.be.dtos.SignUpDataDTO;
import com.example.be.services.CognitoService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.text.ParseException;

@RestController
@RequestMapping("api/v1/authentication")
public class CognitoController {
    private final CognitoService cognitoService;

    @Autowired
    public CognitoController(CognitoService cognitoService) {
        this.cognitoService = cognitoService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDataDTO signUpData) {
        try {
            return ResponseEntity.ok(cognitoService.signUp(signUpData));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<AdminUserGlobalSignOutResult> signOut(@RequestHeader("Authorization") TokenDTO tokenDTO) {
        return ResponseEntity.ok(cognitoService.signOut(tokenDTO));
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody SignInDataDTO signInData) {
        try {
            return ResponseEntity.ok(cognitoService.signIn(signInData));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") TokenDTO tokenDTO) {
        try {
            return ResponseEntity.ok(cognitoService.validateToken(tokenDTO));
        } catch (NotAuthorizedException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Unauthorized request. Token may be invalid");
        } catch (IOException | ParseException | JOSEException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error");
        }
    }
}
