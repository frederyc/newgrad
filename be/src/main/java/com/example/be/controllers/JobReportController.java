package com.example.be.controllers;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.job.JobReport;
import com.example.be.services.JobReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("api/v1/job-report")
public class JobReportController {
    private final JobReportService jobReportService;

    @Autowired
    public JobReportController(JobReportService jobReportService) {
        this.jobReportService = jobReportService;
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody JobReport jobReport,
            @RequestHeader("Authorization") TokenDTO tokenDTO
    ) {
        try {
            return ResponseEntity.ok(jobReportService.save(jobReport, tokenDTO));
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getMessage());
        }
    }
}
