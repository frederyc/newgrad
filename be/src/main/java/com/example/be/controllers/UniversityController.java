package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.University;
import com.example.be.services.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("api/v1/university")
public class UniversityController {

    private final UniversityService universityService;

    @Autowired
    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping("/")
    public ResponseEntity<?> find() {
        try {
            return ResponseEntity.ok(universityService.find());
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> find(@PathVariable("id") String id) {
        try {
            return ResponseEntity.ok(universityService.find(id));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        }
    }

    @GetMapping("/name={name}")
    public ResponseEntity<?> findByName(@PathVariable("name") String name) {
        try {
            return ResponseEntity.ok(universityService.findByName(name));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        }
    }

    @GetMapping("/domain={domain}")
    public ResponseEntity<?> findByEmailDomain(@PathVariable("domain") String domain) {
        try {
            return ResponseEntity.ok(universityService.findByEmailDomain(domain));
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        }
    }
}
