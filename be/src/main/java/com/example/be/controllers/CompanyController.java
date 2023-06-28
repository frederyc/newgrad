package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.Company;
import com.example.be.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("api/v1/company")
public class CompanyController {
    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        try {
            return ResponseEntity.ok(companyService.find(id));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> find() {
        try {
            return ResponseEntity.ok(companyService.find());
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody Company company,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(companyService.save(company, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> update(
            @RequestBody Company company,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(companyService.update(company, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }
}
