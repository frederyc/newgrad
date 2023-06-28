package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public final class JobReportExpression {
    public DynamoDBScanExpression findByJobId(String jobId) {
        return new DynamoDBScanExpression()
                .withFilterExpression("jobId = :jobId")
                .withExpressionAttributeValues(Map.of(":jobId", new AttributeValue().withS(jobId)));
    }

    public DynamoDBScanExpression findByPosterUsername(String posterUsername) {
        return new DynamoDBScanExpression()
                .withFilterExpression("posterUsername = :posterUsername")
                .withExpressionAttributeValues(Map.of(":posterUsername", new AttributeValue().withS(posterUsername)));
    }

    public DynamoDBScanExpression findByJobIdAndPosterUsername(String jobId, String posterUsername) {
        return new DynamoDBScanExpression()
                .withFilterExpression("jobId = :jobId AND posterUsername = :posterUsername")
                .withExpressionAttributeValues(Map.of(
                        ":jobId", new AttributeValue().withS(jobId),
                        ":posterUsername", new AttributeValue().withS(posterUsername)
                ));
    }
}
