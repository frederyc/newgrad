package com.example.be.services;

import com.example.be.entities.RecruiterAccountStatus;
import com.example.be.exception.RecruiterAccountStatusAlreadyExistsException;
import com.example.be.expressions.RecruiterAccountStatusExpression;
import com.example.be.repositories.RecruiterAccountStatusRepository;
import com.example.be.services.base.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterAccountStatusService extends BaseEntityService<RecruiterAccountStatus> {
    private final RecruiterAccountStatusExpression recruiterAccountStatusExpression;

    @Autowired
    public RecruiterAccountStatusService(
            RecruiterAccountStatusRepository recruiterAccountStatusRepository,
            RecruiterAccountStatusExpression recruiterAccountStatusExpression
    ) {
        super(recruiterAccountStatusRepository);
        this.recruiterAccountStatusExpression = recruiterAccountStatusExpression;
    }

    public RecruiterAccountStatus findByUsername(String username) {
        List<RecruiterAccountStatus> l = find(recruiterAccountStatusExpression.findByUsername(username));
        return l.isEmpty() ? null : l.get(0);
    }

    @Override
    public RecruiterAccountStatus save(RecruiterAccountStatus recruiterAccountStatus) {
        List<RecruiterAccountStatus> l = find(recruiterAccountStatusExpression.findByUsername(
                recruiterAccountStatus.getUsername())
        );
        if (l.isEmpty()) {
            return super.save(recruiterAccountStatus);
        } else {
            throw new RecruiterAccountStatusAlreadyExistsException();
        }
    }

}
