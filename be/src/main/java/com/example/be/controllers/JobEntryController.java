package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.job.JobEntry;
import com.example.be.services.JobEntryService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("api/v1/job-entry")
public class JobEntryController {
    private final JobEntryService jobEntryService;

    @Autowired
    public JobEntryController(JobEntryService jobEntryService) {
        this.jobEntryService = jobEntryService;
    }

    @GetMapping("/id={id}")
    public ResponseEntity<?> findById(
            @PathVariable("id") String id,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(jobEntryService.find(id, tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/posted")
    public ResponseEntity<?> findJobsPostedByUser(@RequestHeader("Authorization") TokenDTO tokenDTO) {
        try {
            return ResponseEntity.ok(jobEntryService.findUserPostedJobs(tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/saved")
    public ResponseEntity<?> findJobsSavedByUser(@RequestHeader("Authorization") TokenDTO tokenDTO) {
        try {
            return ResponseEntity.ok(jobEntryService.findUserSavedJobs(tokenDTO));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> findAll(
            @RequestHeader("Authorization") TokenDTO tokenDTO,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "workTimes", required = false) List<String> workTimes,
            @RequestParam(value = "workArrangements", required = false) List<String> workArrangements,
            @RequestParam(value = "seniorityLevels", required = false) List<String> seniorityLevels,
            @RequestParam(value = "educationLevels", required = false) List<String> educationLevels
    ) {
        try {
            return ResponseEntity.ok(jobEntryService.find(
                    search,
                    location,
                    workTimes,
                    workArrangements,
                    seniorityLevels,
                    educationLevels,
                    tokenDTO
            ));
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> update(
            @RequestBody JobEntry jobEntry,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(jobEntryService.update(jobEntry, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        } catch (IOException | ParseException | JOSEException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error");
        }
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody JobEntry jobEntry,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(jobEntryService.save(jobEntry, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        } catch (IOException | ParseException | JOSEException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal server error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable("id") String id,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(jobEntryService.delete(id, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }

}
