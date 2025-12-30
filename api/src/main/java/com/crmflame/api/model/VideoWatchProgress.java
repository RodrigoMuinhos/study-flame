package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "video_watch_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoWatchProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_lesson_id", nullable = false)
    private VideoLesson videoLesson;

    @Column(nullable = false, length = 20)
    private String studentCpf;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(nullable = false)
    private Integer watchedSeconds = 0; // Segundos assistidos

    @Column(nullable = false)
    private Integer progressPercentage = 0; // 0-100%

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (completed && completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }
}
