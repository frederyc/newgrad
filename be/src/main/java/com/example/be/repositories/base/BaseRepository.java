package com.example.be.repositories.base;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.example.be.entities.base.IBaseEntity;

import java.util.List;

public abstract class BaseRepository<T extends IBaseEntity>
    implements IBaseRepository<T> {

    protected final DynamoDBMapper dynamoDBMapper;
    private final Class<T> clazz;

    public BaseRepository(DynamoDBMapper dynamoDBMapper, Class<T> clazz) {
        this.dynamoDBMapper = dynamoDBMapper;
        this.clazz = clazz;
    }

    @Override
    public T save(T t) {
        dynamoDBMapper.save(t);
        return find(t.getId());
    }

    @Override
    public List<T> save(List<T> ts) {
        /**
         * todo
         * change this, batchSave returns a list of errors. If the list is not empty, you should
         * throw an exception of some type and revert the added items
         */
        dynamoDBMapper.batchSave(ts);
        return ts;
    }

    @Override
    public void save(T t, DynamoDBSaveExpression saveExpression) {
        dynamoDBMapper.save(t, saveExpression);
    }

    @Override
    public T find(String id) {
        return dynamoDBMapper.load(clazz, id);
    }

    @Override
    public List<T> find() {
        return dynamoDBMapper.scan(clazz, new DynamoDBScanExpression());
    }

    @Override
    public List<T> find(DynamoDBQueryExpression<T> queryExpression) {
        return dynamoDBMapper.query(
                clazz,
                queryExpression
        );
    }

    @Override
    public List<T> find(DynamoDBScanExpression scanExpression) {
        return dynamoDBMapper.scan(
                clazz,
                scanExpression
        );
    }

    @Override
    public T update(T t) {
        dynamoDBMapper.save(t, new DynamoDBSaveExpression().withExpectedEntry(
                "id",
                new ExpectedAttributeValue(new AttributeValue().withS(t.getId()))
        ));
        return find(t.getId());
    }

    @Override
    public T delete(String id) {
        T toDelete = find(id);
        dynamoDBMapper.delete(toDelete);
        return toDelete;
    }

    @Override
    public T delete(String id, DynamoDBDeleteExpression deleteExpression) {
        T toDelete = find(id);
        dynamoDBMapper.delete(toDelete, deleteExpression);
        return toDelete;
    }
}
