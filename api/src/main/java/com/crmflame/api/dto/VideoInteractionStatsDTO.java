package com.crmflame.api.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoInteractionStatsDTO {
    private Long videoLessonId;
    private Long totalLikes;
    private Long totalComments;
    private Long totalRatings;
    private Long totalCompletions;
    private Double averageContentRating;
    private Double averageAudioRating;
    private Double averageVideoQualityRating;
    private Boolean userLiked;
    private Boolean userCompleted;
    private List<CommentResponseDTO> recentComments;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommentResponseDTO {
        private Long id;
        private String studentName;
        private String comment;
        private Integer likes;
        private LocalDateTime createdAt;
    }
}
