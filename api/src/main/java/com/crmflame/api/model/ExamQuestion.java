package com.crmflame.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "exam_questions")
public class ExamQuestion {
    
    @Id
    private String id;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;
    
    @ElementCollection
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text", columnDefinition = "TEXT")
    @OrderColumn(name = "option_order")
    private List<String> options;
    
    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer; // Pode ser "0", "1,2", etc
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String explanation;
    
    @Column(nullable = false)
    private String domain; // resilient, performance, secure, cost
    
    @Column(nullable = false)
    private String difficulty; // easy, medium, hard

    // Ex: s3, vpc, iam... (alinha com o "diagrama" e com o modo treino)
    // Mantemos nullable=true por compatibilidade com bancos já populados.
    @Column
    private String topic;

    // DRAFT | ACTIVE | RETIRED | FLAGGED
    // Mantemos nullable=true por compatibilidade; a service normaliza para ACTIVE.
    @Column
    private String status;
    
    @Column(name = "multiple_choice")
    private Boolean multipleChoice = false;
    
    // Constructors
    public ExamQuestion() {}
    
    public ExamQuestion(String id, String question, List<String> options, String correctAnswer, 
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

    public ExamQuestion(String id, String question, List<String> options, String correctAnswer,
                       String explanation, String domain, String difficulty, Boolean multipleChoice,
                       String topic, String status) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.domain = domain;
        this.difficulty = difficulty;
        this.multipleChoice = multipleChoice;
        this.topic = topic;
        this.status = status;
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

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
