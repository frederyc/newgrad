package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.example.be.entities.University;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public class UniversityRepository extends BaseRepository<University> {
    public UniversityRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, University.class);
    }
}
