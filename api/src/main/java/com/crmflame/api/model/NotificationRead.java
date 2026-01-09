package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "notification_reads",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_notification_read", columnNames = { "notification_id", "student_cpf" })
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "notification_id", nullable = false)
    private Notification notification;

    @Column(name = "student_cpf", nullable = false, length = 20)
    private String studentCpf;

    @Column(nullable = false, updatable = false)
    private LocalDateTime readAt;

    @Column(name = "dismissed_at")
    private LocalDateTime dismissedAt;

    @PrePersist
    protected void onCreate() {
        readAt = LocalDateTime.now();
    }
}
