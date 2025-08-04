package com.hotelManagementSystem.server.dto;

import lombok.Data;

@Data
public class AdminUpdateDTO {
    private String adminUsername;
    private String adminPassword; // Optional - only if user wants to change password
}
