package com.crmflame.api.dto;

import java.util.List;

public class ExamQuestionDTO {
    private String id;
    private String question;
    private List<String> options;
    private String correctAnswer;
    private String explanation;
    private String domain;
    private String difficulty;
    private Boolean multipleChoice;
    
    // Constructors
    public ExamQuestionDTO() {}
    
    public ExamQuestionDTO(String id, String question, List<String> options, String correctAnswer,
                          String explanation, String domain, String difficulty, Boolean multipleChoice) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.domain = domain;
        this.difficulty = difficulty;
        this.multipleChoice = multipleChoice;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getQuestion() {
        return question;
    }
    
    public void setQuestion(String question) {
        this.question = question;
    }
    
    public List<String> getOptions() {
        return options;
    }
    
    public void setOptions(List<String> options) {
        this.options = options;
    }
    
    public String getCorrectAnswer() {
        return correctAnswer;
    }
    
    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
    
    public String getExplanation() {
        return explanation;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
    public String getDomain() {
        return domain;
    }
    
    public void setDomain(String domain) {
        this.domain = domain;
    }
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    public Boolean getMultipleChoice() {
        return multipleChoice;
    }
    
    public void setMultipleChoice(Boolean multipleChoice) {
        this.multipleChoice = multipleChoice;
    }
}
