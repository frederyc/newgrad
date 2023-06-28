package com.example.be.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDBConfig {
    @Value("${aws.accesskey}")
    private String ACCESS_KEY;

    @Value("${aws.secretkey}")
    private String SECRET_KEY;

    @Value("${aws.dynamodb.serviceendpoint}")
    private String DYNAMODB_SERVICE_ENDPOINT;

    @Value("${aws.dynamodb.signinregion}")
    private String DYNAMODB_SIGN_IN_REGION;


    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());
    }

    private AmazonDynamoDB buildAmazonDynamoDB() {
        return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(DYNAMODB_SERVICE_ENDPOINT, DYNAMODB_SIGN_IN_REGION)
                )
                .withCredentials(
                        new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY)
                        )
                )
                .build();
    }


}
