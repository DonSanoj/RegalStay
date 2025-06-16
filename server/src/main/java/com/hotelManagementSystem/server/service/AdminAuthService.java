package com.hotelManagementSystem.server.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hotelManagementSystem.server.dto.AdminAuthDTO;
import com.hotelManagementSystem.server.model.Admins;
import com.hotelManagementSystem.server.repository.AdminsRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class AdminAuthService {

    @Autowired
    private AdminsRepository adminsRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // Use the same JWT secret pattern as AuthService for consistency
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpiration = 86400000; // 24 hours

    public Map<String, Object> adminSignup(AdminAuthDTO adminAuthDTO) {
        Map<String, Object> response = new HashMap<>();

        try {

            //Check if Admin already exist
            if (adminsRepository.findByAdminEmail(adminAuthDTO.getAdminEmail()).isPresent()) {
                response.put("success", false);
                response.put("message", "Admin email already exists");
                return response;
            }

            if (adminsRepository.findByAdminUsername(adminAuthDTO.getAdminUsername()).isPresent()) {
                response.put("success", false);
                response.put("message", "Admin username already exists");
                return response;
            }

            Admins admin = new Admins();
            admin.setAdminUsername(adminAuthDTO.getAdminUsername());
            admin.setAdminEmail(adminAuthDTO.getAdminEmail());
            admin.setAdminPassword(passwordEncoder.encode(adminAuthDTO.getAdminPassword()));
            admin.setRole(Admins.AdminRole.ADMIN);

            Admins savedAdmin = adminsRepository.save(admin);

            String token = generateAdminToken(savedAdmin);

            Map<String, Object> adminData = new HashMap<>();
            adminData.put("admin_id", savedAdmin.getAdmin_id());
            adminData.put("admin_username", savedAdmin.getAdminUsername());
            adminData.put("admin_email", savedAdmin.getAdminEmail());
            adminData.put("admin_role", savedAdmin.getRole().toString());

            response.put("success", true);
            response.put("message", "Admin registered successfully");
            response.put("admin", adminData);
            response.put("adminToken", token);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }

        return response;
    }

    public Map<String, Object> adminLogin(String adminUsernameOrAdminEmail, String adminPassword) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Admins> adminOpt = adminsRepository.findByAdminEmail(adminUsernameOrAdminEmail);
            if (adminOpt.isEmpty()) {
                adminOpt = adminsRepository.findByAdminUsername(adminUsernameOrAdminEmail);
            }

            if (adminOpt.isEmpty()) {
                response.put("success", false);
                response.put("message", "Admin not found");
                return response;
            }

            Admins admin = adminOpt.get();

            if (!passwordEncoder.matches(adminPassword, admin.getAdminPassword())) {
                response.put("success", false);
                response.put("message", "Admin password does not match");
                return response;
            }

            String adminToken = generateAdminToken(admin);

            Map<String, Object> adminData = new HashMap<>();
            adminData.put("admin_id", admin.getAdmin_id());
            adminData.put("admin_username", admin.getAdminUsername());
            adminData.put("admin_email", admin.getAdminEmail());
            adminData.put("admin_role", admin.getRole().toString());

            response.put("success", true);
            response.put("message", "Admin Login successfully");
            response.put("admin", adminData);
            response.put("adminToken", adminToken);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
        }

        return response;
    }

    public Map<String, Object> checkAdminAuth(String authHeader) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("message", "No valid token provided");
                return response;
            }

            String adminToken = authHeader.substring(7);
            Claims claims = validateAdminToken(adminToken);

            if (claims == null) {
                response.put("success", false);
                response.put("message", "Invalid token");
                return response;
            }

            Long adminId = Long.valueOf(claims.getSubject());
            Optional<Admins> adminOpt = adminsRepository.findById(adminId);

            if (adminOpt.isEmpty()) {
                response.put("success", false);
                response.put("message", "Admin not found");
                return response;
            }

            Admins admin = adminOpt.get();

            Map<String, Object> adminData = new HashMap<>();
            adminData.put("admin_id", admin.getAdmin_id());
            adminData.put("admin_username", admin.getAdminUsername());
            adminData.put("admin_email", admin.getAdminEmail());
            adminData.put("admin_role", admin.getRole().toString());

            response.put("success", true);
            response.put("admin", adminData);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
        }

        return response;
    }

    private String generateAdminToken(Admins admin) {
        return Jwts.builder()
                .setSubject(admin.getAdmin_id().toString())
                .claim("admin_email", admin.getAdminEmail())
                .claim("admin_username", admin.getAdminUsername())
                .claim("admin_role", admin.getRole().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(jwtSecret)
                .compact();
    }

    private Claims validateAdminToken(String adminToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(adminToken)
                    .getBody();
        } catch (Exception e) {
            return null;
        }
    }
}
