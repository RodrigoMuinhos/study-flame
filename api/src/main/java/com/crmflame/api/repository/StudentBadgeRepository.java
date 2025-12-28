package com.crmflame.api.repository;

import com.crmflame.api.model.StudentBadge;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentBadgeRepository extends JpaRepository<StudentBadge, Long> {
    List<StudentBadge> findByLead(Lead lead);
    List<StudentBadge> findByLeadId(UUID leadId);
    Optional<StudentBadge> findByLeadAndBadge(Lead lead, Badge badge);
    List<StudentBadge> findByLeadIdAndUnlockedTrue(UUID leadId);
    long countByLeadIdAndUnlockedTrue(UUID leadId);
}
