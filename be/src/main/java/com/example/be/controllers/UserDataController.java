package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.services.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("api/v1/user-data")
public class UserDataController {
    private final UserDataService userDataService;

    @Autowired
    public UserDataController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getUserData(@RequestHeader("Authorization") TokenDTO tokenDTO) {
        try {
            return ResponseEntity.ok(userDataService.getUserData(tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserData(@PathVariable("username") String username) {
        try {
            return ResponseEntity.ok(userDataService.getUserData(username));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }
}
