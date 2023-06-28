package com.example.be.services;

import com.example.be.entities.SavedJob;
import com.example.be.entities.job.BrowseJobEntry;
import com.example.be.dtos.TokenDTO;
import com.example.be.dtos.UserDataDTO;
import com.example.be.entities.job.JobEntry;
import com.example.be.expressions.JobEntryExpression;
import com.example.be.repositories.JobEntryRepository;
import com.example.be.services.base.BaseEntityService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobEntryService extends BaseEntityService<JobEntry> {

    private final CognitoService cognitoService;
    private final CompanyService companyService;
    private final UserDataService userDataService;
    private final JobEntryExpression jobEntryExpression;
    private final SavedJobService savedJobService;
    private final CacheManager cacheManager;

    @Autowired
    public JobEntryService(
            JobEntryRepository jobEntryRepository,
            CompanyService companyService,
            CognitoService cognitoService,
            UserDataService userDataService,
            JobEntryExpression jobEntryExpression,
            SavedJobService savedJobService,
            CacheManager cacheManager
    ) {
        super(jobEntryRepository);
        this.companyService = companyService;
        this.cognitoService = cognitoService;
        this.userDataService = userDataService;
        this.jobEntryExpression = jobEntryExpression;
        this.savedJobService = savedJobService;
        this.cacheManager = cacheManager;
    }

    public JobEntry find(String id, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("jobEntries");
        assert cache != null;
        SimpleKey sk = new SimpleKey("job-entry-%s".formatted(id));
        Cache.ValueWrapper vw = cache.get(sk);

        JobEntry jobEntry = super.find(id);
        if (jobEntry == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Job with specified id was not found");
        }

        if (vw == null) {
            cache.put(sk, jobEntry);
        }

        return (JobEntry) cache.get(sk).get();
    }

    @SuppressWarnings("unchecked")
    public List<BrowseJobEntry> findUserPostedJobs(TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        String username = userDataService.getUserData(tokenDTO).getUsername();
        ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("userJobEntries");
        assert cache != null;
        SimpleKey sk = new SimpleKey(username);
        Cache.ValueWrapper vw = cache.get(sk);

        if (vw == null) {
            cache.put(
                    sk,
                    ((JobEntryRepository) super.repo)
                            .browseJobEntryCardQuery(
                                    jobEntryExpression.browseJobEntriesByUserPosted(
                                            userDataService.getUserData(tokenDTO).getUsername()
                                    )
                            )
            );
        }

        return (List<BrowseJobEntry>) cache.get(sk).get();
    }

    @SuppressWarnings("unchecked")
    public List<BrowseJobEntry> find(
            String search,
            String location,
            List<String> workTimes,
            List<String> workArrangements,
            List<String> seniorityLevels,
            List<String> educationLevels,
            TokenDTO tokenDTO
    ) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache("browseJobEntries");
        assert cache != null;
        SimpleKey sk = new SimpleKey(search, location, workTimes, workArrangements, seniorityLevels, educationLevels);
        Cache.ValueWrapper vw = cache.get(sk);

        if (vw == null) {
            cache.put(
                    sk,
                    ((JobEntryRepository) super.repo)
                            .browseJobEntryCardQuery(
                                    jobEntryExpression.browseJobEntryCardQueryExpression(
                                            search,
                                            location,
                                            workTimes,
                                            workArrangements,
                                            seniorityLevels,
                                            educationLevels
                                    )
                            )
            );
        }

        return (List<BrowseJobEntry>) cache.get(sk).get();
    }

    public List<JobEntry> findUserSavedJobs(TokenDTO tokenDTO) {
        List<SavedJob> savedJobs = savedJobService.findByUsername(tokenDTO);

        return savedJobs.isEmpty() ? new ArrayList<>() : super.find(
                jobEntryExpression.browseJobEntriesByUserSaved(
                        savedJobs.stream()
                                .map(SavedJob::getJobId)
                                .toList()
                )
        );
    }

    public JobEntry save(JobEntry jobEntry, TokenDTO tokenDTO) throws IOException, ParseException, JOSEException {
        saveUpdateRequest(jobEntry, tokenDTO);
        handleCaching(jobEntry, UpdateCacheMethod.SAVE);
        return save(jobEntry);
    }

    public JobEntry update(JobEntry jobEntry, TokenDTO tokenDTO) throws IOException, ParseException, JOSEException {
        saveUpdateRequest(jobEntry, tokenDTO);
        handleCaching(jobEntry, UpdateCacheMethod.UPDATE);
        return update(jobEntry);
    }

    public JobEntry delete(String id, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        JobEntry deletedJobEntry = super.delete(id);
        if (deletedJobEntry != null) {
            handleCaching(deletedJobEntry, UpdateCacheMethod.DELETE);
            return deletedJobEntry;
        } else {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Job with specified id was not found");
        }
    }

    /**
     * Checks if the user is really the owner of the job or if the user can post the job they are intending
     * to do so
     */
    public void saveUpdateRequest(JobEntry jobEntry, TokenDTO tokenDTO) {
        try {
            cognitoService.validateToken(tokenDTO);
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        UserDataDTO userData = userDataService.getUserData(tokenDTO);

        // If an admin want to post or update a job, don't do any further checks
        if (userData.getRole().equals("ADMIN")) {
            return;
        }

        if (
                !userData.getUsername().equals(jobEntry.getOwnerUsername()) ||
                companyService.findCompanyByName(jobEntry.getCompanyName()) == null ||
                !userData.getRole().equals("RECRUITER") ||
                !userData.getCompany().equals(jobEntry.getCompanyName())
        ) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        } else if (jobEntry.getId() != null && super.find(jobEntry.getId()) == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Job entry not found");
        }
    }

    private enum UpdateCacheMethod {
            SAVE, UPDATE, DELETE
    }

    @SuppressWarnings("unchecked")
    private void handleCaching(JobEntry jobEntry, UpdateCacheMethod cacheMethod) {
        // Update every cache instance
        BrowseJobEntry browseJobEntry = BrowseJobEntry.of(jobEntry);
        cacheManager.getCacheNames().forEach(cacheName -> {
            ConcurrentMapCache cache = (ConcurrentMapCache) cacheManager.getCache(cacheName);
            if (cache != null) {
                switch (cacheName) {
                    case "browseJobEntries", "userJobEntries" -> cache.getNativeCache().forEach((k, v) -> {
                            List<BrowseJobEntry> nv = new ArrayList<>((List<BrowseJobEntry>) v);
                            switch (cacheMethod) {
                                case SAVE -> nv.add(browseJobEntry);
                                case UPDATE -> {
                                    nv.removeIf(x -> x.getId().equals(browseJobEntry.getId()));
                                    nv.add(browseJobEntry);
                                }
                                case DELETE -> nv.removeIf(x -> x.getId().equals(browseJobEntry.getId()));
                            }
                            cache.put(k, nv);
                        });
//                    case "userJobEntries" -> {
//
//                        List<BrowseJobEntry> nv = new ArrayList<>();
//                        if (cache.get(browseJobEntry.getOwnerUsername()) != null) {
//                            SimpleKey sk = new SimpleKey(cache.get(browseJobEntry.getOwnerUsername()));
//                            if (cache.get(sk) != null) {
//                                nv.addAll((List<BrowseJobEntry>) cache.get(sk));
//                            }
//                        }
//                        switch (cacheMethod) {
//                            case SAVE -> nv.add(browseJobEntry);
//                            case DELETE -> nv.removeIf(x -> x.getId().equals(browseJobEntry.getId()));
//                            case UPDATE -> {
//                                nv.removeIf(x -> x.getId().equals(browseJobEntry.getId()));
//                                nv.add(browseJobEntry);
//                            }
//                        }
//                        cache.put(browseJobEntry.getOwnerUsername(), nv);
//                    }
                    case "jobEntries" -> {
                        SimpleKey sk = new SimpleKey("job-entry-%s".formatted(jobEntry.getId()));
                        switch (cacheMethod) {
                            case SAVE, UPDATE -> cache.put(sk, jobEntry);
                            case DELETE -> cache.evict(sk);
                        }
                    }
                }
            }
        });
    }

}
