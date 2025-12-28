package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.AdminUser;
import com.crmflame.api.model.AdminUser.Role;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, UUID> {
    
    Optional<AdminUser> findByUsername(String username);
    
    Optional<AdminUser> findByEmail(String email);
    
    Optional<AdminUser> findByUsernameOrEmail(String username, String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    List<AdminUser> findByIsActiveTrue();
    
    List<AdminUser> findByRole(Role role);
    
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE a.isActive = true")
    long countActiveAdmins();
    
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE a.role = 'SUPER_ADMIN' AND a.isActive = true")
    long countActiveSuperAdmins();
}
