package com.example.be.repositories;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.example.be.entities.Company;
import com.example.be.repositories.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyRepository extends BaseRepository<Company> {

    public CompanyRepository(DynamoDBMapper dynamoDBMapper) {
        super(dynamoDBMapper, Company.class);
    }
}
