package com.crmflame.api.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AwsQuestionThemeResponse {
    private UUID id;
    private String theme;
    private Integer questionCount;
    private LocalDateTime updatedAt;
}