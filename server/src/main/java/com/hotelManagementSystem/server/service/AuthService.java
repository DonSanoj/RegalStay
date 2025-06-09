package com.hotelManagementSystem.server.service;

import com.hotelManagementSystem.server.dto.AuthDTO;
import com.hotelManagementSystem.server.model.Users;
import com.hotelManagementSystem.server.repository.UsersRepository;
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
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UsersRepository usersRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpiration = 86400000; // 24 hours
    
    public Map<String, Object> signup(AuthDTO authDTO) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check if user already exists
            if (usersRepository.findByEmail(authDTO.getEmail()).isPresent()) {
                response.put("success", false);
                response.put("message", "Email already exists");
                return response;
            }
            
            if (usersRepository.findByUsername(authDTO.getUsername()).isPresent()) {
                response.put("success", false);
                response.put("message", "Username already exists");
                return response;
            }
            
            // Create new user
            Users user = new Users();
            user.setUsername(authDTO.getUsername());
            user.setEmail(authDTO.getEmail());
            user.setPassword(passwordEncoder.encode(authDTO.getPassword()));
            user.setRole(Users.Role.CUSTOMER);
            
            Users savedUser = usersRepository.save(user);
            
            // Generate JWT token
            String token = generateToken(savedUser);
            
            // Prepare user data (without password)
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", savedUser.getId());
            userData.put("username", savedUser.getUsername());
            userData.put("email", savedUser.getEmail());
            userData.put("role", savedUser.getRole().toString());
            
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", userData);
            response.put("token", token);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
        }
        
        return response;
    }
    
    public Map<String, Object> login(String usernameOrEmail, String password) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Find user by email or username
            Optional<Users> userOpt = usersRepository.findByEmail(usernameOrEmail);
            if (userOpt.isEmpty()) {
                userOpt = usersRepository.findByUsername(usernameOrEmail);
            }
            
            if (userOpt.isEmpty()) {
                response.put("success", false);
                response.put("message", "User not found");
                return response;
            }
            
            Users user = userOpt.get();
            
            // Check password
            if (!passwordEncoder.matches(password, user.getPassword())) {
                response.put("success", false);
                response.put("message", "Invalid password");
                return response;
            }
            
            // Generate JWT token
            String token = generateToken(user);
            
            // Prepare user data (without password)
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole().toString());
            
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", userData);
            response.put("token", token);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
        }
        
        return response;
    }
    
    public Map<String, Object> checkAuth(String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.put("success", false);
                response.put("message", "No valid token provided");
                return response;
            }
            
            String token = authHeader.substring(7);
            Claims claims = validateToken(token);
            
            if (claims == null) {
                response.put("success", false);
                response.put("message", "Invalid token");
                return response;
            }
            
            Long userId = Long.valueOf(claims.getSubject());
            Optional<Users> userOpt = usersRepository.findById(userId);
            
            if (userOpt.isEmpty()) {
                response.put("success", false);
                response.put("message", "User not found");
                return response;
            }
            
            Users user = userOpt.get();
            
            // Prepare user data (without password)
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole().toString());
            
            response.put("success", true);
            response.put("user", userData);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Authentication failed: " + e.getMessage());
        }
        
        return response;
    }
    
    private String generateToken(Users user) {
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("username", user.getUsername())
                .claim("role", user.getRole().toString())
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
