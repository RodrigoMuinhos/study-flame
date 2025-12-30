package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_progress")
public class StudentProgress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "lead_id", unique = true)
    private Lead lead;
    
    @Column(name = "xp_total")
    private Integer xpTotal = 0;
    
    @Column(name = "level")
    private Integer level = 1;
    
    @Column(name = "streak_days")
    private Integer streakDays = 0;
    
    @Column(name = "last_activity_date")
    private LocalDateTime lastActivityDate;
    
    @Column(name = "lessons_completed")
    private Integer lessonsCompleted = 0;
    
    @Column(name = "exercises_completed")
    private Integer exercisesCompleted = 0;
    
    @Column(name = "perfect_scores")
    private Integer perfectScores = 0;
    
    @Column(name = "study_hours")
    private Double studyHours = 0.0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
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
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Lead getLead() { return lead; }
    public void setLead(Lead lead) { this.lead = lead; }
    
    public Integer getXpTotal() { return xpTotal; }
    public void setXpTotal(Integer xpTotal) { this.xpTotal = xpTotal; }
    
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    
    public Integer getStreakDays() { return streakDays; }
    public void setStreakDays(Integer streakDays) { this.streakDays = streakDays; }
    
    public LocalDateTime getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(LocalDateTime lastActivityDate) { this.lastActivityDate = lastActivityDate; }
    
    public Integer getLessonsCompleted() { return lessonsCompleted; }
    public void setLessonsCompleted(Integer lessonsCompleted) { this.lessonsCompleted = lessonsCompleted; }
    
    public Integer getExercisesCompleted() { return exercisesCompleted; }
    public void setExercisesCompleted(Integer exercisesCompleted) { this.exercisesCompleted = exercisesCompleted; }
    
    public Integer getPerfectScores() { return perfectScores; }
    public void setPerfectScores(Integer perfectScores) { this.perfectScores = perfectScores; }
    
    public Double getStudyHours() { return studyHours; }
    public void setStudyHours(Double studyHours) { this.studyHours = studyHours; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
