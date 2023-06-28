package com.example.be.expressions;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public final class JobEntryExpression {

    public DynamoDBScanExpression browseJobEntryCardQueryExpression(
            String search,
            String location,
            List<String> workTimes,
            List<String> workArrangements,
            List<String> seniorityLevels,
            List<String> educationLevels
    ) {
        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        Map<String, String> expressionAttributeNames = new HashMap<>(Map.of("#location", "location"));
        StringBuilder filterExpression = new StringBuilder();

        if (search != null) {
            expressionAttributeValues.put(":search", new AttributeValue().withS(search));
            filterExpression.append("(contains(title, :search) OR contains(companyName, :search) OR contains(tags, :search))");
        }
        if (location != null) {
            expressionAttributeValues.put(":location", new AttributeValue().withS(location));
            filterExpression
                    .append(filterExpression.isEmpty() ? "" : " AND ")
                    .append("contains(#location, :location)");
        }
        if (workTimes != null && !workTimes.isEmpty()) {
            filterExpression
                    .append(filterExpression.isEmpty() ? "" : " AND ")
                    .append(
                        buildORScanExpression(
                            "workTime",
                            workTimes,
                            expressionAttributeValues,
                            expressionAttributeNames
                        )
                    );
        }
        if (workArrangements != null && !workArrangements.isEmpty()) {
            filterExpression
                    .append(filterExpression.isEmpty() ? "" : " AND ")
                    .append(
                            buildORScanExpression(
                                    "workArrangement",
                                    workArrangements,
                                    expressionAttributeValues,
                                    expressionAttributeNames
                            )
                    );
        }
        if (seniorityLevels != null && !seniorityLevels.isEmpty()) {
            filterExpression
                    .append(filterExpression.isEmpty() ? "" : " AND ")
                    .append(
                            buildORScanExpression(
                                    "seniority",
                                    seniorityLevels,
                                    expressionAttributeValues,
                                    expressionAttributeNames
                            )
                    );
        }
        if (educationLevels != null && !educationLevels.isEmpty()) {
            filterExpression
                    .append(filterExpression.isEmpty() ? "" : " AND ")
                    .append(
                            buildORScanExpression(
                                    "education",
                                    educationLevels,
                                    expressionAttributeValues,
                                    expressionAttributeNames
                            )
                    );
        }

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withExpressionAttributeNames(expressionAttributeNames)
                .withProjectionExpression("id, ownerUsername, companyName, title, #location, description, salary, salaryCurrency, tags");

        if (!filterExpression.isEmpty()) {
            scanExpression = scanExpression
                    .withFilterExpression(filterExpression.toString())
                    .withExpressionAttributeValues(expressionAttributeValues);
        }

        return scanExpression;
    }

    public DynamoDBScanExpression browseJobEntriesByUserPosted(String username) {
        return new DynamoDBScanExpression()
                .withFilterExpression("ownerUsername = :username")
                .withExpressionAttributeValues(Map.of(":username", new AttributeValue().withS(username)))
                .withExpressionAttributeNames(Map.of("#location", "location"))
                .withProjectionExpression("id, ownerUsername, companyName, title, #location, description, salary, salaryCurrency, tags");
    }

    public DynamoDBScanExpression browseJobEntriesByUserSaved(List<String> jobEntriesIds) {
        Map<String, String> attributeNames = new HashMap<>(Map.of("#location", "location"));
        Map<String, AttributeValue> attributeValues = new HashMap<>();
        StringBuilder filterExpression = new StringBuilder();

        for (int i = 0; i < jobEntriesIds.size(); i ++) {
            String attributeName = "#jobId%d".formatted(i);
            String attributeValue = ":jobId%d".formatted(i);

            filterExpression.append("%s = %s".formatted(attributeName, attributeValue));

            attributeNames.put(attributeName, "id");
            attributeValues.put(attributeValue, new AttributeValue().withS(jobEntriesIds.get(i)));

            if (i < jobEntriesIds.size() - 1) {
                filterExpression.append(" OR ");
            }
        }

        return new DynamoDBScanExpression()
                .withFilterExpression(filterExpression.toString())
                .withExpressionAttributeNames(attributeNames)
                .withExpressionAttributeValues(attributeValues)
                .withProjectionExpression("id, ownerUsername, companyName, title, #location, description, salary, salaryCurrency, tags");
    }

    /**
     * Builds a filter expression for performing an OR scan on a given attribute with a list of values
     * @param attribute The name of the attribute to be checked.
     * @param list The list of values to be checked against the attribute.
     * @param expressionAttributeValues A map to store the attribute values used in the expression.
     * @param expressionAttributeNames A map to store the attribute names used in the expression.
     * @return The constructed filter expression string.
     */
    private String buildORScanExpression(
            String attribute,
            List<String> list,
            Map<String, AttributeValue> expressionAttributeValues,
            Map<String, String> expressionAttributeNames
    ) {
        StringBuilder sb = new StringBuilder("(");
        for (int i = 0; i < list.size(); i ++) {
            String attributeName = "#%s%d".formatted(attribute, i);
            String attributeValue = ":%sValue%d".formatted(attribute, i);

            expressionAttributeNames.put(attributeName, attribute);
            expressionAttributeValues.put(attributeValue, new AttributeValue().withS(list.get(i)));

            sb.append("contains(").append(attributeName).append(", ").append(attributeValue).append(")");

            if (i < list.size() - 1) {
                sb.append(" OR ");
            }
        }
        sb.append(")");
        return sb.toString();
    }
}
