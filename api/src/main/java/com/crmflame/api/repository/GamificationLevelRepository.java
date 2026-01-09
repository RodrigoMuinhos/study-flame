package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crmflame.api.model.GamificationLevel;

public interface GamificationLevelRepository extends JpaRepository<GamificationLevel, Long> {
    List<GamificationLevel> findAllByOrderByLevelNumberAsc();
    Optional<GamificationLevel> findByLevelNumber(Integer levelNumber);
}
