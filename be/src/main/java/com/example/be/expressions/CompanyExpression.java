package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.example.be.entities.Company;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public final class CompanyExpression {
    public DynamoDBQueryExpression<Company> findCompanyByName(String name) {
        return new DynamoDBQueryExpression<Company>()
                .withIndexName("name-index")
                .withKeyConditionExpression("#name = :name")
                .withExpressionAttributeNames(Map.of("#name", "name"))
                .withExpressionAttributeValues(Map.of(":name", new AttributeValue().withS(name)))
                .withConsistentRead(false);
    }
}
