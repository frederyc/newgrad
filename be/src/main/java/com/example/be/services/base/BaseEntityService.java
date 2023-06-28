package com.example.be.services.base;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDeleteExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.be.entities.base.IBaseEntity;
import com.example.be.repositories.base.IBaseRepository;

import java.util.List;

public abstract class BaseEntityService<T extends IBaseEntity> implements IBaseEntityService<T> {
    protected final IBaseRepository<T> repo;

    public BaseEntityService(IBaseRepository<T> repo) {
        this.repo = repo;
    }

    @Override
    public T save(T t) {
        return repo.save(t);
    }

    @Override
    public List<T> save(List<T> ts) {
        return repo.save(ts);
    }

    @Override
    public void save(T t, DynamoDBSaveExpression saveExpression) {
        repo.save(t, saveExpression);
    }

    @Override
    public T find(String id) {
        return repo.find(id);
    }

    @Override
    public List<T> find() {
        return repo.find();
    }

    @Override
    public List<T> find(DynamoDBQueryExpression<T> queryExpression) {
        return repo.find(queryExpression);
    }

    @Override
    public List<T> find(DynamoDBScanExpression scanExpression) {
        return repo.find(scanExpression);
    }

    @Override
    public T update(T t) {
        return repo.update(t);
    }

    @Override
    public T delete(String id) {
        return repo.delete(id);
    }

    @Override
    public T delete(String id, DynamoDBDeleteExpression deleteExpression) {
        return repo.delete(id, deleteExpression);
    }

}
