package com.example.be.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SignUpDataDTO {

    private @NonNull String name;
    private @NonNull String email;
    private @NonNull String password;
    private @NonNull String role;
    // If the role is 'JOB_SEEKER', company will be an empty string and vice-versa for 'RECRUITER'
    private @NonNull String company;
    private @NonNull String university;
}
