package com.example.be.services;

import com.example.be.entities.University;
import com.example.be.expressions.UniversityExpression;
import com.example.be.repositories.UniversityRepository;
import com.example.be.services.base.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UniversityService extends BaseEntityService<University> {

    private final UniversityExpression universityExpression;

    @Autowired
    public UniversityService(
            UniversityRepository universityRepository,
            UniversityExpression universityExpression
    ) {
        super(universityRepository);
        this.universityExpression = universityExpression;
    }

    public University findByName(String name) {
        List<University> l = super.find(universityExpression.findUniversityByName(name));
        return l.isEmpty() ? null : l.get(0);
    }

    public University findByEmailDomain(String domain) {
        List<University> l = super.find(universityExpression.findUniversityByEmailDomain(domain));
        return l.isEmpty() ? null : l.get(0);
    }
}
