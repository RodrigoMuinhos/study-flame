package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.VideoWatchProgress;

@Repository
public interface VideoWatchProgressRepository extends JpaRepository<VideoWatchProgress, Long> {
    Optional<VideoWatchProgress> findByVideoLessonIdAndStudentCpf(Long videoLessonId, String studentCpf);
    List<VideoWatchProgress> findByStudentCpf(String studentCpf);
    List<VideoWatchProgress> findByStudentCpfAndCompleted(String studentCpf, Boolean completed);
    Long countByVideoLessonIdAndCompleted(Long videoLessonId, Boolean completed);

    void deleteByVideoLessonId(Long videoLessonId);
}
