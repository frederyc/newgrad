package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.SavedJob;
import com.example.be.services.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

@RestController
@RequestMapping("api/v1/saved-job")
public class SavedJobController {
    private final SavedJobService savedJobService;

    @Autowired
    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @GetMapping("/id={id}")
    public ResponseEntity<?> findById(
            @PathVariable("id") String id,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(savedJobService.find(id, tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/jobId={jobId}")
    public ResponseEntity<?> findByQueryIndex(
            @PathVariable("jobId") String jobId,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(savedJobService.findByQueryIndex(jobId, tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> findByUsername(
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(savedJobService.findByUsername(tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody SavedJob savedJob,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(savedJobService.save(savedJob, tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/id={id}")
    public ResponseEntity<?> delete(
            @PathVariable("id") String id,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(savedJobService.delete(id, tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }
}
