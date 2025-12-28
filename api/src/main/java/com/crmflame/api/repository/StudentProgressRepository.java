package com.crmflame.api.repository;

import com.crmflame.api.model.StudentProgress;
import com.crmflame.api.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentProgressRepository extends JpaRepository<StudentProgress, Long> {
    Optional<StudentProgress> findByLead(Lead lead);
    Optional<StudentProgress> findByLeadId(UUID leadId);
}
