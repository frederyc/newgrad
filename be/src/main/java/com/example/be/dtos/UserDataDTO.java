package com.example.be.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class UserDataDTO {
    private @NonNull String id;
    private @NonNull String name;
    private @NonNull String email;
    private @NonNull String username;
    private @NonNull String role;           // JOB_SEEKER || RECRUITER || ADMIN || JOB_BOT
    private String company;
    private String university;
}
