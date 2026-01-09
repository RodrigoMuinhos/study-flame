package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "gamification_levels")
public class GamificationLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level_number", nullable = false, unique = true)
    private Integer levelNumber;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "min_xp", nullable = false)
    private Integer minXp;

    @Column(name = "max_xp", nullable = false)
    private Integer maxXp;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getLevelNumber() { return levelNumber; }
    public void setLevelNumber(Integer levelNumber) { this.levelNumber = levelNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getMinXp() { return minXp; }
    public void setMinXp(Integer minXp) { this.minXp = minXp; }

    public Integer getMaxXp() { return maxXp; }
    public void setMaxXp(Integer maxXp) { this.maxXp = maxXp; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
