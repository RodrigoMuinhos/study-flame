package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessTokenDTO {
    private UUID id;
    private String token;
    private UUID leadId;
    private String leadName;
    private String leadEmail;
    private String leadCpf;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime lastUsedAt;
    private long daysUntilExpiration;
    private boolean expired;
}
