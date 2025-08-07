package com.hotelManagementSystem.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StaffAuthDTO {
    private String staffMemberName;
    private String staffMemberEmail;
    private String password;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "MANAGER|FINANCE|HR|CHEFS|SERVICE|RECEPTIONIST|HOUSEKEEPER|MAINTENANCE",
            message = "Invalid role.")
    private String role;
}
