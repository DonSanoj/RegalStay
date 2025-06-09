package com.hotelManagementSystem.server.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthDTO {

    private Long id;
    private String username;
    private String email;
    private String password;
}
