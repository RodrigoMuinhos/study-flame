package com.crmflame.api.dto;

public class QuestionInteractionDTO {
    private String questionId;
    private String studentName;
    private String studentCpf;
    private String comment;
    private Integer difficultyRating;
    private Integer qualityRating;
    private Integer explanationRating;
    private String feedback;
    
    // Getters and Setters
    public String getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
    
    public String getStudentName() {
        return studentName;
    }
    
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    
    public String getStudentCpf() {
        return studentCpf;
    }
    
    public void setStudentCpf(String studentCpf) {
        this.studentCpf = studentCpf;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
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
}
