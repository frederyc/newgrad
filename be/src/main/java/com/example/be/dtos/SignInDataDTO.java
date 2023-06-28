package com.example.be.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SignInDataDTO {
    private @NonNull String email;
    private @NonNull String password;
}
