package com.hotelManagementSystem.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotelManagementSystem.server.dto.AuthDTO;
import com.hotelManagementSystem.server.model.Users;
import com.hotelManagementSystem.server.repository.UserRepository;
import com.hotelManagementSystem.server.util.GenerateJWT;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GenerateJWT jwtUtil;

    public Map<String, Object> signup(AuthDTO authDTO) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(authDTO.getEmail())) {
                response.put("success", false);
                response.put("message", "Email already exists");
                return response;
            }
            
            if (userRepository.existsByUsername(authDTO.getUsername())) {
                response.put("success", false);
                response.put("message", "Username already exists");
                return response;
            }
            
            // Create new user
            Users newUser = new Users();
            newUser.setUsername(authDTO.getUsername());
            newUser.setEmail(authDTO.getEmail());
            newUser.setPassword(passwordEncoder.encode(authDTO.getPassword()));
            
            Users savedUser = userRepository.save(newUser);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(savedUser.getUsername());
            
            // Prepare response
            AuthDTO userResponse = new AuthDTO();
            userResponse.setId(savedUser.getId());
            userResponse.setUsername(savedUser.getUsername());
            userResponse.setEmail(savedUser.getEmail());
            // Don't send password back
            
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", userResponse);
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
            // Find user by username or email
            Optional<Users> userOpt = userRepository.findByUsername(usernameOrEmail);
            if (userOpt.isEmpty()) {
                userOpt = userRepository.findByEmail(usernameOrEmail);
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
                response.put("message", "Invalid credentials");
                return response;
            }
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getUsername());
            
            // Prepare response
            AuthDTO userResponse = new AuthDTO();
            userResponse.setId(user.getId());
            userResponse.setUsername(user.getUsername());
            userResponse.setEmail(user.getEmail());
            
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", userResponse);
            response.put("token", token);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
        }
        
        return response;
    }
}
