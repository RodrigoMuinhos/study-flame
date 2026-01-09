package com.crmflame.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crmflame.api.model.GamificationXpRule;

public interface GamificationXpRuleRepository extends JpaRepository<GamificationXpRule, Long> {
    Optional<GamificationXpRule> findByActionCodeAndIsActiveTrue(String actionCode);

    Optional<GamificationXpRule> findByActionCodeIgnoreCase(String actionCode);
}
