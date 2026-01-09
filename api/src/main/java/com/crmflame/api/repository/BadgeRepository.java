package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.Badge;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
    Optional<Badge> findByCode(String code);
    List<Badge> findByIsActiveTrue();
}
