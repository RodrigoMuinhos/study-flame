package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.QuestionLike;

@Repository
public interface QuestionLikeRepository extends JpaRepository<QuestionLike, Long> {
    
    Optional<QuestionLike> findByQuestionIdAndStudentCpf(String questionId, String studentCpf);
    
    List<QuestionLike> findByQuestionId(String questionId);
    
    List<QuestionLike> findByStudentCpf(String studentCpf);
    
    long countByQuestionId(String questionId);
    
    boolean existsByQuestionIdAndStudentCpf(String questionId, String studentCpf);
    
    void deleteByQuestionIdAndStudentCpf(String questionId, String studentCpf);
    
    @Query("SELECT ql.questionId, COUNT(ql) as likeCount FROM QuestionLike ql GROUP BY ql.questionId ORDER BY likeCount DESC")
    List<Object[]> findMostLikedQuestions();
}
