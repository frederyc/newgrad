package com.example.be.services;

import com.example.be.dtos.TokenDTO;
import com.example.be.entities.Company;
import com.example.be.expressions.CompanyExpression;
import com.example.be.repositories.CompanyRepository;
import com.example.be.services.base.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class CompanyService extends BaseEntityService<Company> {
    private final CompanyExpression companyExpression;
    private final CognitoService cognitoService;

    @Autowired
    public CompanyService(
            CompanyRepository companyRepository,
            CompanyExpression companyExpression,
            CognitoService cognitoService
    ) {
        super(companyRepository);
        this.companyExpression = companyExpression;
        this.cognitoService = cognitoService;
    }

    public Company save(Company company, TokenDTO tokenDTO) {
        tokenValidationForSaveUpdate(tokenDTO);
        return super.save(company);
    }

    public Company update(Company company, TokenDTO tokenDTO) {
        tokenValidationForSaveUpdate(tokenDTO);
        return super.update(company);
    }

    @Override
    public List<Company> find() {
        return super.find().stream()
                .sorted((x, y) -> x.getName().compareTo(y.getName()))
                .toList();
    }

    private void tokenValidationForSaveUpdate(TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        try {
            if (cognitoService.getUserRole(tokenDTO).equals("ADMIN")) {
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
            }
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
    }

    public Company findCompanyByName(String name) {
        List<Company> l = find(companyExpression.findCompanyByName(name));
        return l.isEmpty() ? null : l.get(0);
    }
}
