package com.example.be.repositories.base;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDeleteExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.be.entities.base.IBaseEntity;
import java.util.List;

public interface IBaseRepository<T extends IBaseEntity> {
    // POST
    T save(T t);
    List<T> save(List<T> ts);
    void save(T t, DynamoDBSaveExpression saveExpression);

    // GET
    T find(String id);
    List<T> find();
    List<T> find(DynamoDBQueryExpression<T> queryExpression);
    List<T> find(DynamoDBScanExpression scanExpression);

    // UPDATE
    T update(T t);

    // DELETE
    T delete(String id);
    T delete(String id, DynamoDBDeleteExpression deleteExpression);
}
