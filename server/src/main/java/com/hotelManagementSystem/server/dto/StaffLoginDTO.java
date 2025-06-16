package com.hotelManagementSystem.server.dto;

import lombok.Data;

@Data
public class StaffLoginDTO {

    private String staffMemberNameOrStaffMemberEmail;
    private String staffMemberPassword;
    private String role;
}
