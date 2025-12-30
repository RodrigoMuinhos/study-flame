package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.QuestionRating;

@Repository
public interface QuestionRatingRepository extends JpaRepository<QuestionRating, Long> {
    
    Optional<QuestionRating> findByQuestionIdAndStudentCpf(String questionId, String studentCpf);
    
    List<QuestionRating> findByQuestionId(String questionId);
    
    List<QuestionRating> findByStudentCpf(String studentCpf);
    
    @Query("SELECT AVG(qr.difficultyRating) FROM QuestionRating qr WHERE qr.questionId = :questionId")
    Double getAverageDifficultyRating(String questionId);
    
    @Query("SELECT AVG(qr.qualityRating) FROM QuestionRating qr WHERE qr.questionId = :questionId")
    Double getAverageQualityRating(String questionId);
    
    @Query("SELECT AVG(qr.explanationRating) FROM QuestionRating qr WHERE qr.questionId = :questionId")
    Double getAverageExplanationRating(String questionId);
    
    long countByQuestionId(String questionId);
}
