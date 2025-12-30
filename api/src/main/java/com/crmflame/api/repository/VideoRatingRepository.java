package com.crmflame.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.crmflame.api.model.VideoRating;

@Repository
public interface VideoRatingRepository extends JpaRepository<VideoRating, Long> {
    Optional<VideoRating> findByVideoLessonIdAndStudentCpf(Long videoLessonId, String studentCpf);
    List<VideoRating> findByVideoLessonId(Long videoLessonId);
    
    @Query("SELECT AVG(vr.contentRating) FROM VideoRating vr WHERE vr.videoLesson.id = :videoLessonId")
    Double getAverageContentRating(Long videoLessonId);
    
    @Query("SELECT AVG(vr.audioRating) FROM VideoRating vr WHERE vr.videoLesson.id = :videoLessonId")
    Double getAverageAudioRating(Long videoLessonId);
    
    @Query("SELECT AVG(vr.videoQualityRating) FROM VideoRating vr WHERE vr.videoLesson.id = :videoLessonId")
    Double getAverageVideoQualityRating(Long videoLessonId);
    
    Long countByVideoLessonId(Long videoLessonId);
}
