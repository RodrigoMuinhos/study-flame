package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "video_lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer moduleNumber; // 0 = Módulo 0, 1 = Módulo 1, etc.

    @Column(nullable = false)
    private Integer lessonNumber; // 1 = Aula 1, 2 = Aula 2, etc.

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 500)
    private String youtubeUrl;

    @Column(nullable = false)
    private Integer durationMinutes; // Duração em minutos

    @Column(nullable = false)
    private Integer orderIndex; // Ordem de exibição

    @Column(nullable = false)
    private Boolean isPublished = false;

    @Column(nullable = false)
    private String pageLocation = "aulas"; // inicio, trilha, aulas, desafios, materiais

    @Column(name = "xp_reward")
    private Integer xpReward = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public int getXpReward() {
        return xpReward != null ? xpReward : 0;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }
}
