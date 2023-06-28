package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.be.entities.job.BrowseJobEntry;
import com.example.be.entities.job.JobEntry;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobEntryRepository extends BaseRepository<JobEntry> {

    @Autowired
    public JobEntryRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, JobEntry.class);
    }

    public List<BrowseJobEntry> browseJobEntryCardQuery(DynamoDBScanExpression scanExpression) {
        return super.dynamoDBMapper.scan(
                BrowseJobEntry.class,
                scanExpression
        );
    }
}
