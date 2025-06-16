package com.hotelManagementSystem.server.dto;

import lombok.Data;

@Data
public class StaffAuthDTO {
    private String staffMemberName;
    private String staffMemberEmail;
    private String password;
    private String role;
}
