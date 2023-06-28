package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.example.be.entities.RecruiterAccountStatus;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public class RecruiterAccountStatusRepository extends BaseRepository<RecruiterAccountStatus> {
    public RecruiterAccountStatusRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, RecruiterAccountStatus.class);
    }
}
