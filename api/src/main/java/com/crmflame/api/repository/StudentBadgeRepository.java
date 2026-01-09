package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.crmflame.api.model.Badge;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentBadge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentBadgeRepository extends JpaRepository<StudentBadge, Long> {
    List<StudentBadge> findByLead(Lead lead);
    List<StudentBadge> findByLeadId(UUID leadId);
    Optional<StudentBadge> findByLeadAndBadge(Lead lead, Badge badge);
    List<StudentBadge> findByLeadIdAndUnlockedTrue(UUID leadId);
    long countByLeadIdAndUnlockedTrue(UUID leadId);
}
