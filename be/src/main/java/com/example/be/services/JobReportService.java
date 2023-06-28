package com.example.be.services;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.job.JobEntry;
import com.example.be.entities.job.JobReport;
import com.example.be.expressions.JobReportExpression;
import com.example.be.repositories.JobReportRepository;
import com.example.be.services.base.BaseEntityService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@Service
public class JobReportService extends BaseEntityService<JobReport> {
    private final JobReportExpression jobReportQueryExpression;
    private final CognitoService cognitoService;
    private final JobEntryService jobEntryService;
    private final UserDataService userDataService;

    @Autowired
    public JobReportService(
            JobReportRepository jobReportRepository,
            JobReportExpression jobReportQueryExpression,
            CognitoService cognitoService,
            JobEntryService jobEntryService,
            UserDataService userDataService
    ) {
        super(jobReportRepository);
        this.jobReportQueryExpression = jobReportQueryExpression;
        this.cognitoService = cognitoService;
        this.jobEntryService = jobEntryService;
        this.userDataService = userDataService;
}

    public JobReport save(JobReport jobReport, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (IOException | ParseException | JOSEException e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized request");
        }

        JobEntry reportedJob = jobEntryService.find(jobReport.getJobId());
        if (reportedJob == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Job with the specified id was not found");
        } else if (jobReport.getPosterUsername().equals(reportedJob.getOwnerUsername())) {
            throw new HttpClientErrorException(HttpStatus.FORBIDDEN, "Cannot report your own job");
        } else if (!userDataService.getUserData(tokenDTO).getUsername().equals(jobReport.getPosterUsername())) {
            throw new HttpClientErrorException(HttpStatus.FORBIDDEN, "Wrong user");
        }

        // Check if user has already reported the job
        List<JobReport> j = find(jobReportQueryExpression.findByJobIdAndPosterUsername(
                jobReport.getJobId(),
                jobReport.getPosterUsername()
        ));

        if (j.isEmpty()) {
            return save(jobReport);
        } else {
            throw new HttpClientErrorException(HttpStatus.FORBIDDEN, "You already reported this job");
        }

    }
}
