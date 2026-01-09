package com.crmflame.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentProgress;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {
    Optional<StudentProgress> findByLead(Lead lead);
    Optional<StudentProgress> findByLeadId(UUID leadId);
}
