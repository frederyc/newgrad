package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.example.be.entities.SavedJob;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SavedJobRepository extends BaseRepository<SavedJob> {
    @Autowired
    public SavedJobRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, SavedJob.class);
    }
}
