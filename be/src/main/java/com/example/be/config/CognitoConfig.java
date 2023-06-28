package com.example.be.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.regions.Regions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

@Configuration
public class CognitoConfig {
    @Value("${aws.accesskey}")
    private String ACCESS_KEY;

    @Value("${aws.secretkey}")
    private String SECRET_KEY;

    @Bean
    public AWSCognitoIdentityProvider cognitoClient() {
        return AWSCognitoIdentityProviderClientBuilder.standard()
                .withCredentials(
                        new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY)
                        )
                )
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    /**
     * This is a set of accepted email domains by newgrad.eu. The lists consist of over 400 european universities,
     * the eligible universities can be found <a href="https://www.topuniversities.com/university-rankings/world-university-rankings/2023">here</a>
     * @return A set of email domains of the top 1000 universities in Europe
     * @throws FileNotFoundException
     */
    @Bean
    public Set<String> studentEmailDomains() throws FileNotFoundException {
        Set<String> result = new HashSet<>();
        File resourceFile = new File("src/main/resources/student_email_domains.txt");
        Scanner scanner = new Scanner(resourceFile);
        while (scanner.hasNextLine()) {
            result.add(scanner.nextLine());
        }
        scanner.close();
        return result;
    }
}
