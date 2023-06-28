package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.example.be.entities.job.JobReport;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobReportRepository extends BaseRepository<JobReport> {
    @Autowired
    public JobReportRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, JobReport.class);
    }
}
