package com.crmflame.api.dto;

public class QuestionInteractionSummaryDTO {
    private String questionId;
    private Long totalLikes;
    private Long totalComments;
    private Long totalRatings;
    private Double averageDifficulty;
    private Double averageQuality;
    private Double averageExplanation;
    private Boolean userHasLiked;
    
    public QuestionInteractionSummaryDTO() {}
    
    public QuestionInteractionSummaryDTO(String questionId, Long totalLikes, Long totalComments, 
                                         Long totalRatings, Double averageDifficulty, 
                                         Double averageQuality, Double averageExplanation) {
        this.questionId = questionId;
        this.totalLikes = totalLikes;
        this.totalComments = totalComments;
        this.totalRatings = totalRatings;
        this.averageDifficulty = averageDifficulty;
        this.averageQuality = averageQuality;
        this.averageExplanation = averageExplanation;
    }
    
    // Getters and Setters
    public String getQuestionId() {
        return questionId;
    }
    
    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
    
    public Long getTotalLikes() {
        return totalLikes;
    }
    
    public void setTotalLikes(Long totalLikes) {
        this.totalLikes = totalLikes;
    }
    
    public Long getTotalComments() {
        return totalComments;
    }
    
    public void setTotalComments(Long totalComments) {
        this.totalComments = totalComments;
    }
    
    public Long getTotalRatings() {
        return totalRatings;
    }
    
    public void setTotalRatings(Long totalRatings) {
        this.totalRatings = totalRatings;
    }
    
    public Double getAverageDifficulty() {
        return averageDifficulty;
    }
    
    public void setAverageDifficulty(Double averageDifficulty) {
        this.averageDifficulty = averageDifficulty;
    }
    
    public Double getAverageQuality() {
        return averageQuality;
    }
    
    public void setAverageQuality(Double averageQuality) {
        this.averageQuality = averageQuality;
    }
    
    public Double getAverageExplanation() {
        return averageExplanation;
    }
    
    public void setAverageExplanation(Double averageExplanation) {
        this.averageExplanation = averageExplanation;
    }
    
    public Boolean getUserHasLiked() {
        return userHasLiked;
    }
    
    public void setUserHasLiked(Boolean userHasLiked) {
        this.userHasLiked = userHasLiked;
    }
}
