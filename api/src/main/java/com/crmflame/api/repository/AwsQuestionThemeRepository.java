package com.crmflame.api.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crmflame.api.model.AwsQuestionTheme;

public interface AwsQuestionThemeRepository extends JpaRepository<AwsQuestionTheme, UUID> {
    Optional<AwsQuestionTheme> findByThemeIgnoreCase(String theme);
}