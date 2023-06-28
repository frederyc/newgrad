package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.example.be.entities.RecruiterAccountStatus;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public final class RecruiterAccountStatusExpression {
    public DynamoDBQueryExpression<RecruiterAccountStatus> findByUsername(String username) {
        return new DynamoDBQueryExpression<RecruiterAccountStatus>()
                .withIndexName("username-index")
                .withKeyConditionExpression("username = :username")
                .withExpressionAttributeValues(Map.of(":username", new AttributeValue().withS(username)))
                .withConsistentRead(false);
    }
}
