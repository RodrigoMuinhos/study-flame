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
@Table(name = "video_ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_lesson_id", nullable = false)
    private VideoLesson videoLesson;

    @Column(nullable = false, length = 20)
    private String studentCpf;

    @Column(nullable = false)
    private Integer contentRating; // 1-5 estrelas para qualidade do conteúdo

    @Column(nullable = false)
    private Integer audioRating; // 1-5 estrelas para qualidade do áudio

    @Column(nullable = false)
    private Integer videoQualityRating; // 1-5 estrelas para qualidade da imagem

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
}
