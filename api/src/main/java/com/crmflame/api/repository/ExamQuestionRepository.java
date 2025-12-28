package com.crmflame.api.repository;

import com.crmflame.api.model.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, String> {
    
    List<ExamQuestion> findByDomain(String domain);
    
    List<ExamQuestion> findByDifficulty(String difficulty);
    
    List<ExamQuestion> findByDomainAndDifficulty(String domain, String difficulty);
    
    @Query("SELECT COUNT(q) FROM ExamQuestion q WHERE q.domain = ?1")
    Long countByDomain(String domain);
    
    @Query("SELECT q FROM ExamQuestion q ORDER BY FUNCTION('RANDOM')")
    List<ExamQuestion> findAllRandom();
}
