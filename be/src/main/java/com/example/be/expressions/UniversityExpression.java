package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.example.be.entities.University;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public final class UniversityExpression {
    public DynamoDBScanExpression findUniversityByName(String name) {
        Map<String, String> expressionAttributesName = new HashMap<>();
        expressionAttributesName.put("#name", "name");

        return new DynamoDBScanExpression()
                .withFilterExpression("#name = :name")
                .withExpressionAttributeNames(expressionAttributesName)
                .withExpressionAttributeValues(Map.of(":name", new AttributeValue().withS(name)));
    }

    public DynamoDBQueryExpression<University> findUniversityByEmailDomain(String domain) {
        return new DynamoDBQueryExpression<University>()
                .withIndexName("studentEmailDomain-index")
                .withKeyConditionExpression("studentEmailDomain = :domain")
                .withExpressionAttributeValues(Map.of(":domain", new AttributeValue().withS(domain)))
                .withConsistentRead(false);
    }
}
