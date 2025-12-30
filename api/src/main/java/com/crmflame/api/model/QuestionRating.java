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
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "question_ratings",
       uniqueConstraints = @UniqueConstraint(columnNames = {"question_id", "student_cpf"}))
public class QuestionRating {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "question_id", nullable = false, length = 100)
    private String questionId;
    
    @Column(name = "student_cpf", nullable = false, length = 20)
    private String studentCpf;
    
    @Column(name = "difficulty_rating", nullable = false)
    private Integer difficultyRating;
    
    @Column(name = "quality_rating", nullable = false)
    private Integer qualityRating;
    
    @Column(name = "explanation_rating", nullable = false)
    private Integer explanationRating;
    
    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
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
    
    public String getStudentCpf() {
        return studentCpf;
    }
    
    public void setStudentCpf(String studentCpf) {
        this.studentCpf = studentCpf;
    }
    
    public Integer getDifficultyRating() {
        return difficultyRating;
    }
    
    public void setDifficultyRating(Integer difficultyRating) {
        this.difficultyRating = difficultyRating;
    }
    
    public Integer getQualityRating() {
        return qualityRating;
    }
    
    public void setQualityRating(Integer qualityRating) {
        this.qualityRating = qualityRating;
    }
    
    public Integer getExplanationRating() {
        return explanationRating;
    }
    
    public void setExplanationRating(Integer explanationRating) {
        this.explanationRating = explanationRating;
    }
    
    public String getFeedback() {
        return feedback;
    }
    
    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
