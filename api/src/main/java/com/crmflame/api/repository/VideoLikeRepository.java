package com.crmflame.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.VideoLike;

@Repository
public interface VideoLikeRepository extends JpaRepository<VideoLike, Long> {
    Optional<VideoLike> findByVideoLessonIdAndStudentCpf(Long videoLessonId, String studentCpf);
    Long countByVideoLessonId(Long videoLessonId);
    void deleteByVideoLessonIdAndStudentCpf(Long videoLessonId, String studentCpf);
    void deleteByVideoLessonId(Long videoLessonId);
    boolean existsByVideoLessonIdAndStudentCpf(Long videoLessonId, String studentCpf);
}
