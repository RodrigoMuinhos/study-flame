package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAccessDTO {
    private UUID id;
    private UUID leadId;
    private String leadName;
    private String leadEmail;
    private String leadCpf;
    private String leadPhone;
    private String password;
    private Boolean isActive;
    private Boolean credentialsSent;
    private LocalDateTime lastLoginAt;
    private Integer loginCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
