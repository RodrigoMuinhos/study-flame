package com.crmflame.api.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "question_stats")
public class QuestionStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "question_id", nullable = false, unique = true, length = 100)
    private String questionId;
    
    @Column(name = "total_attempts", nullable = false)
    private Integer totalAttempts = 0;
    
    @Column(name = "correct_attempts", nullable = false)
    private Integer correctAttempts = 0;
    
    @Column(name = "incorrect_attempts", nullable = false)
    private Integer incorrectAttempts = 0;
    
    @Column(name = "average_time_seconds", nullable = false)
    private Integer averageTimeSeconds = 0;
    
    @Column(name = "total_likes", nullable = false)
    private Integer totalLikes = 0;
    
    @Column(name = "total_comments", nullable = false)
    private Integer totalComments = 0;
    
    @Column(name = "average_difficulty", nullable = false, precision = 3, scale = 2)
    private BigDecimal averageDifficulty = BigDecimal.ZERO;
    
    @Column(name = "average_quality", nullable = false, precision = 3, scale = 2)
    private BigDecimal averageQuality = BigDecimal.ZERO;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
    
    public Integer getTotalAttempts() {
        return totalAttempts;
    }
    
    public void setTotalAttempts(Integer totalAttempts) {
        this.totalAttempts = totalAttempts;
    }
    
    public Integer getCorrectAttempts() {
        return correctAttempts;
    }
    
    public void setCorrectAttempts(Integer correctAttempts) {
        this.correctAttempts = correctAttempts;
    }
    
    public Integer getIncorrectAttempts() {
        return incorrectAttempts;
    }
    
    public void setIncorrectAttempts(Integer incorrectAttempts) {
        this.incorrectAttempts = incorrectAttempts;
    }
    
    public Integer getAverageTimeSeconds() {
        return averageTimeSeconds;
    }
    
    public void setAverageTimeSeconds(Integer averageTimeSeconds) {
        this.averageTimeSeconds = averageTimeSeconds;
    }
    
    public Integer getTotalLikes() {
        return totalLikes;
    }
    
    public void setTotalLikes(Integer totalLikes) {
        this.totalLikes = totalLikes;
    }
    
    public Integer getTotalComments() {
        return totalComments;
    }
    
    public void setTotalComments(Integer totalComments) {
        this.totalComments = totalComments;
    }
    
    public BigDecimal getAverageDifficulty() {
        return averageDifficulty;
    }
    
    public void setAverageDifficulty(BigDecimal averageDifficulty) {
        this.averageDifficulty = averageDifficulty;
    }
    
    public BigDecimal getAverageQuality() {
        return averageQuality;
    }
    
    public void setAverageQuality(BigDecimal averageQuality) {
        this.averageQuality = averageQuality;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
