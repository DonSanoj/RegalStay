package com.hotelManagementSystem.server.service;

import com.hotelManagementSystem.server.dto.StaffAuthDTO;
import com.hotelManagementSystem.server.model.Staff;
import com.hotelManagementSystem.server.repository.StaffRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class StaffAuthService {

    @Autowired
    private StaffRepository staffRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpiration = 86400000;

    public Map<String, Object> staffSignup(StaffAuthDTO staffAuthDTO) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (staffRepository.findByStaffMemberEmail(staffAuthDTO.getStaffMemberEmail()).isPresent()) {
                response.put("success", false);
                response.put("message", "Staff member email already exists");
                return response;
            }

            if (staffRepository.findByStaffMemberName(staffAuthDTO.getStaffMemberName()).isPresent()) {
                response.put("success", false);
                response.put("message", "Staff member name already exists");
                return response;
            }

            Staff staffMember = new Staff();
            staffMember.setStaffMemberName(staffAuthDTO.getStaffMemberName());
            staffMember.setStaffMemberEmail(staffAuthDTO.getStaffMemberEmail());
            staffMember.setPassword(passwordEncoder.encode(staffAuthDTO.getPassword()));
            staffMember.setRole(staffAuthDTO.getRole());

            Staff savedStaffMember = staffRepository.save(staffMember);

            String token = generateToken(savedStaffMember);

            Map<String, Object> staffMemberData = new HashMap<>();
            staffMemberData.put("staffMemberId", savedStaffMember.getStaffMemberId());
            staffMemberData.put("staffMemberName", savedStaffMember.getStaffMemberName());
            staffMemberData.put("staffMemberEmail", savedStaffMember.getStaffMemberEmail());
            staffMemberData.put("role", savedStaffMember.getRole().toString());

            response.put("success", true);
            response.put("message", "Staff member registered successfully");
            response.put("staffMember", staffMemberData);
            response.put("token", token);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }

        return response;
    }

    private String generateToken(Staff staffMember) {
        return Jwts.builder()
                .setSubject(staffMember.getStaffMemberId().toString())
                .claim("staffMemberEmail", staffMember.getStaffMemberEmail())
                .claim("staffMemberName", staffMember.getStaffMemberName())
                .claim("role", staffMember.getRole().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(jwtSecret)
                .compact();
    }

    private Claims validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            return null;
        }
    }
}
