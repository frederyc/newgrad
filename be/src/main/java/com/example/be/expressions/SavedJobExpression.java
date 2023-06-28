package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.example.be.entities.SavedJob;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class SavedJobExpression {
    public DynamoDBScanExpression findByUsername(String username) {
        return new DynamoDBScanExpression()
                .withExpressionAttributeValues(Map.of(":username", new AttributeValue().withS(username)))
                .withFilterExpression("username = :username");
    }

    public DynamoDBQueryExpression<SavedJob> findByQueryIndex(String queryIndex) {
        return new DynamoDBQueryExpression<SavedJob>()
                .withIndexName("queryIndex-index")
                .withKeyConditionExpression("queryIndex = :queryIndex")
                .withExpressionAttributeValues(Map.of(":queryIndex", new AttributeValue().withS(queryIndex)))
                .withConsistentRead(false);
    }
}
