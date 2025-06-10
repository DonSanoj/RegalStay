package com.hotelManagementSystem.server.controller;

import com.hotelManagementSystem.server.dto.AdminAuthDTO;
import com.hotelManagementSystem.server.dto.AdminLoginDTO;
import com.hotelManagementSystem.server.service.AdminAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin
public class AdminAuthController {

    @Autowired
    private AdminAuthService adminAuthService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody AdminAuthDTO adminAuthDTO) {
        Map<String, Object> response = adminAuthService.adminSignup(adminAuthDTO);

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AdminLoginDTO adminLoginDTO) {
        Map<String, Object> response = adminAuthService.adminLogin(adminLoginDTO.getAdminUsernameOrAdminEmail(), adminLoginDTO.getAdminPassword());

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/adminCheckAuth")
    public ResponseEntity<Map<String, Object>> adminCheckAuth(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, Object> response = adminAuthService.checkAdminAuth(authHeader);

        if ((Boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
}
