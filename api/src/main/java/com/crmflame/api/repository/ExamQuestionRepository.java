package com.crmflame.api.repository;

import javaautilsList

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
comcrmflameapi.model.ExamQuestion
import com.crmflame.api.model.ExamQuestion;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, String> {
    
    List<ExamQuestion> findByDomain(String domain);
    
    List<ExamQuestion> findByDifficulty(String difficulty);
    
    List<ExamQuestion> findByDomainAndDifficulty(String domain, String difficulty);

    List<ExamQuestion> findByIdIn(List<String> ids);

    @Query("SELECT q FROM ExamQuestion q " +
           "WHERE (:status IS NULL OR q.status = :status) " +
           "AND (:topic IS NULL OR q.topic = :topic) " +
           "AND (:domain IS NULL OR q.domain = :domain) " +
           "AND (:difficulty IS NULL OR q.difficulty = :difficulty) " +
           "AND (:multipleChoice IS NULL OR q.multipleChoice = :multipleChoice) " +
           "ORDER BY FUNCTION('RANDOM')")
    List<ExamQuestion> findRandomFiltered(
        @Param("status") String status,
        @Param("topic") String topic,
        @Param("domain") String domain,
        @Param("difficulty") String difficulty,
        @Param("multipleChoice") Boolean multipleChoice,
        Pageable pageable
    );
    
    @Query("SELECT COUNT(q) FROM ExamQuestion q WHERE q.domain = ?1")
    Long countByDomain(String domain);
    
    @Query("SELECT q FROM ExamQuestion q ORDER BY FUNCTION('RANDOM')")
    List<ExamQuestion> findAllRandom();
}
