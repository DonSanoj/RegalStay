package com.hotelManagementSystem.server.controller;

import com.hotelManagementSystem.server.dto.StaffAuthDTO;
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
}
