package com.hotelManagementSystem.server.controller;

import com.hotelManagementSystem.server.dto.StaffAuthDTO;
import com.hotelManagementSystem.server.dto.StaffLoginDTO;
import com.hotelManagementSystem.server.service.StaffAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/staff/auth")
@CrossOrigin
public class StaffAuthController {

    @Autowired
    private StaffAuthService staffAuthService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody StaffAuthDTO staffAuthDTO) {
        Map<String, Object> response = staffAuthService.staffSignup(staffAuthDTO);

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody StaffLoginDTO staffLoginDTO) {
        Map<String, Object> response = staffAuthService.staffLogin(staffLoginDTO.getStaffMemberNameOrStaffMemberEmail(), staffLoginDTO.getStaffMemberPassword());

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/checkAuth")
    public ResponseEntity<Map<String, Object>> checkStaffAuth(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, Object> response = staffAuthService.checkStaffAuth(authHeader);

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
}
