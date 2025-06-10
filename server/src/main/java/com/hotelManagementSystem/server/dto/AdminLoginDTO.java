package com.hotelManagementSystem.server.dto;

import lombok.Data;

@Data
public class AdminLoginDTO {

    private String adminUsernameOrAdminEmail;
    private String adminPassword;
}
