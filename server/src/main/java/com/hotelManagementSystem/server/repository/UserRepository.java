package com.hotelManagementSystem.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelManagementSystem.server.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    
    Optional<Users> findByEmail(String email);
    
    Optional<Users> findByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
}
