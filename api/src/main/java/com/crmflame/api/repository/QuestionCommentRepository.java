package com.crmflame.api.repository;

import com.crmflame.api.model.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionCommentRepository extends JpaRepository<QuestionComment, Long> {
    
    List<QuestionComment> findByQuestionIdOrderByCreatedAtDesc(String questionId);
    
    List<QuestionComment> findByStudentCpfOrderByCreatedAtDesc(String studentCpf);
    
    long countByQuestionId(String questionId);
    
    @Query("SELECT qc FROM QuestionComment qc WHERE qc.questionId = :questionId ORDER BY qc.likes DESC, qc.createdAt DESC")
    List<QuestionComment> findByQuestionIdOrderByLikesDesc(String questionId);
    
    @Query("SELECT qc FROM QuestionComment qc WHERE qc.isHelpful = true AND qc.questionId = :questionId ORDER BY qc.likes DESC")
    List<QuestionComment> findHelpfulCommentsByQuestionId(String questionId);
    
    @Query("SELECT qc FROM QuestionComment qc ORDER BY qc.createdAt DESC")
    List<QuestionComment> findRecentComments();
}
