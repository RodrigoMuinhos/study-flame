package com.crmflame.api.dto;

import java.time.LocalDateTime;

import com.crmflame.api.model.Notification;

import lombok.Data;

@Data
public class StudentNotificationDTO {

    private Long id;
    private String type;
    private String title;
    private String message;
    private String icon;
    private LocalDateTime createdAt;
    private boolean read;

    public static StudentNotificationDTO from(Notification n, boolean read) {
        StudentNotificationDTO dto = new StudentNotificationDTO();
        dto.setId(n.getId());
        dto.setType(n.getType() != null ? n.getType().name() : Notification.Type.INFO.name());
        dto.setTitle(n.getTitle());
        dto.setMessage(n.getMessage());
        dto.setIcon(n.getIcon());
        dto.setCreatedAt(n.getCreatedAt());
        dto.setRead(read);
        return dto;
    }
}
