package com.crmflame.api.repository;

import javaautilsList
import java.util.Optional;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import comscrmflamegapimodelQuestionStats
import com.crmflame.api.model.QuestionStats;

@Repository
public interface QuestionStatsRepository extends JpaRepository<QuestionStats, Long> {
    
    Optional<QuestionStats> findByQuestionId(String questionId);
    
    @Query("SELECT qs FROM QuestionStats qs ORDER BY qs.totalLikes DESC")
    List<QuestionStats> findMostLikedQuestions();
    
    @Query("SELECT qs FROM QuestionStats qs ORDER BY qs.totalComments DESC")
    List<QuestionStats> findMostCommentedQuestions();
    
    @Query("SELECT qs FROM QuestionStats qs WHERE qs.totalAttempts > 0 ORDER BY (qs.correctAttempts * 1.0 / qs.totalAttempts) ASC")
    List<QuestionStats> findMostDifficultQuestions();
    
    @Query("SELECT qs FROM QuestionStats qs WHERE qs.totalAttempts > 0 ORDER BY (qs.correctAttempts * 1.0 / qs.totalAttempts) DESC")
    List<QuestionStats> findEasiestQuestions();
    
    @Query("SELECT qs FROM QuestionStats qs ORDER BY qs.averageQuality DESC")
    List<QuestionStats> findBestRatedQuestions();
}
