package com.crmflame.api.repository;

import com.crmflame.api.model.StudentAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentAccessRepository extends JpaRepository<StudentAccess, UUID> {
    
    Optional<StudentAccess> findByLeadId(UUID leadId);
    
    boolean existsByLeadId(UUID leadId);
}
