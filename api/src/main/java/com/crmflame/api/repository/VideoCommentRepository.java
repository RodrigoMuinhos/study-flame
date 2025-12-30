package com.crmflame.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.VideoComment;

@Repository
public interface VideoCommentRepository extends JpaRepository<VideoComment, Long> {
    List<VideoComment> findByVideoLessonIdOrderByCreatedAtDesc(Long videoLessonId);
    List<VideoComment> findByStudentCpf(String studentCpf);
    Long countByVideoLessonId(Long videoLessonId);
}
