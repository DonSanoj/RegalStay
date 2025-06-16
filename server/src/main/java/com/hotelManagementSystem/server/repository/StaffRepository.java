package com.hotelManagementSystem.server.repository;

import com.hotelManagementSystem.server.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByStaffMemberName(String staffMemberName);
    Optional<Staff> findByStaffMemberEmail(String staffMemberEmail);
    Optional<Staff> findByStaffMemberNameOrStaffMemberEmail(String staffMemberName, String staffMemberEmail);
}
