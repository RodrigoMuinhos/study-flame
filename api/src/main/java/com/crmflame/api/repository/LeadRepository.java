package com.crmflame.api.repository;

import com.crmflame.api.model.Lead;
import com.crmflame.api.model.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LeadRepository extends JpaRepository<Lead, UUID> {
    
    Optional<Lead> findByEmail(String email);
    
    Optional<Lead> findByCpf(String cpf);
    
    List<Lead> findByStatus(LeadStatus status);
    
    boolean existsByEmail(String email);
    
    boolean existsByCpf(String cpf);
    
    List<Lead> findByNameContainingIgnoreCase(String name);
}
