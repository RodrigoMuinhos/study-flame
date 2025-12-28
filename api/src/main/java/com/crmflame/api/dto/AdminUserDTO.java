package com.crmflame.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.crmflame.api.model.AdminUser;

public record AdminUserDTO(
    UUID id,
    String username,
    String email,
    String name,
    String role,
    Boolean isActive,
    LocalDateTime lastLoginAt,
    Integer loginCount,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static AdminUserDTO fromEntity(AdminUser admin) {
        return new AdminUserDTO(
            admin.getId(),
            admin.getUsername(),
            admin.getEmail(),
            admin.getName(),
            admin.getRole().name(),
            admin.getIsActive(),
            admin.getLastLoginAt(),
            admin.getLoginCount(),
            admin.getCreatedAt(),
            admin.getUpdatedAt()
        );
    }
}
