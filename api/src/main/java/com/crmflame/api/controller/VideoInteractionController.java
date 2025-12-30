package com.crmflame.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.VideoCommentDTO;
import com.crmflame.api.dto.VideoInteractionStatsDTO;
import com.crmflame.api.dto.VideoProgressDTO;
import com.crmflame.api.dto.VideoRatingDTO;
import com.crmflame.api.model.VideoComment;
import com.crmflame.api.model.VideoLesson;
import com.crmflame.api.model.VideoLike;
import com.crmflame.api.model.VideoRating;
import com.crmflame.api.model.VideoWatchProgress;
import com.crmflame.api.repository.VideoCommentRepository;
import com.crmflame.api.repository.VideoLessonRepository;
import com.crmflame.api.repository.VideoLikeRepository;
import com.crmflame.api.repository.VideoRatingRepository;
import com.crmflame.api.repository.VideoWatchProgressRepository;

import jakarta.transaction.Transactional;

import java.util.Map;

@RestController
@RequestMapping("/videos")
@CrossOrigin(origins = "*")
public class VideoInteractionController {

    @Autowired
    private VideoLessonRepository videoLessonRepository;

    @Autowired
    private VideoCommentRepository commentRepository;

    @Autowired
    private VideoRatingRepository ratingRepository;

    @Autowired
    private VideoLikeRepository likeRepository;

    @Autowired
    private VideoWatchProgressRepository progressRepository;

    // ========== LIKES ==========

    @PostMapping("/{videoId}/like")
    @Transactional
    public ResponseEntity<?> toggleLike(@PathVariable Long videoId, @RequestParam String studentCpf) {
        VideoLesson video = videoLessonRepository.findById(videoId).orElse(null);
        if (video == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Vídeo não encontrado"));
        }

        boolean nowLiked;
        if (likeRepository.existsByVideoLessonIdAndStudentCpf(videoId, studentCpf)) {
            likeRepository.deleteByVideoLessonIdAndStudentCpf(videoId, studentCpf);
            nowLiked = false;
        } else {
            VideoLike like = new VideoLike();
            like.setVideoLesson(video);
            like.setStudentCpf(studentCpf);
            likeRepository.save(like);
            nowLiked = true;
        }

        long totalLikes = likeRepository.countByVideoLessonId(videoId);
        return ResponseEntity.ok(Map.of(
                "liked", nowLiked,
                "totalLikes", totalLikes
        ));
    }

    @GetMapping("/{videoId}/likes/count")
    public ResponseEntity<Long> getLikesCount(@PathVariable Long videoId) {
        Long count = likeRepository.countByVideoLessonId(videoId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/{videoId}/likes/check")
    public ResponseEntity<Boolean> checkUserLike(@PathVariable Long videoId, @RequestParam String studentCpf) {
        boolean liked = likeRepository.existsByVideoLessonIdAndStudentCpf(videoId, studentCpf);
        return ResponseEntity.ok(liked);
    }

    // ========== COMMENTS ==========

    @PostMapping("/{videoId}/comments")
    public ResponseEntity<VideoComment> addComment(@PathVariable Long videoId, @RequestBody VideoCommentDTO commentDTO) {
        VideoLesson video = videoLessonRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        VideoComment comment = new VideoComment();
        comment.setVideoLesson(video);
        comment.setStudentName(commentDTO.getStudentName());
        comment.setStudentCpf(commentDTO.getStudentCpf());
        comment.setComment(commentDTO.getComment());

        VideoComment savedComment = commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{videoId}/comments")
    public ResponseEntity<List<VideoComment>> getComments(@PathVariable Long videoId) {
        List<VideoComment> comments = commentRepository.findByVideoLessonIdOrderByCreatedAtDesc(videoId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @RequestParam String studentCpf) {
        VideoComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));

        if (!comment.getStudentCpf().equals(studentCpf)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você não pode deletar este comentário");
        }

        commentRepository.delete(comment);
        return ResponseEntity.ok().body("{\"message\": \"Comentário removido\"}");
    }

    // ========== RATINGS ==========

    @PostMapping("/{videoId}/rating")
    public ResponseEntity<VideoRating> addOrUpdateRating(@PathVariable Long videoId, @RequestBody VideoRatingDTO ratingDTO) {
        VideoLesson video = videoLessonRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        VideoRating rating = ratingRepository
                .findByVideoLessonIdAndStudentCpf(videoId, ratingDTO.getStudentCpf())
                .orElse(new VideoRating());

        rating.setVideoLesson(video);
        rating.setStudentCpf(ratingDTO.getStudentCpf());
        rating.setContentRating(ratingDTO.getContentRating());
        rating.setAudioRating(ratingDTO.getAudioRating());
        rating.setVideoQualityRating(ratingDTO.getVideoQualityRating());

        VideoRating savedRating = ratingRepository.save(rating);
        return ResponseEntity.ok(savedRating);
    }

    @GetMapping("/{videoId}/rating")
    public ResponseEntity<VideoRating> getUserRating(@PathVariable Long videoId, @RequestParam String studentCpf) {
        return ratingRepository.findByVideoLessonIdAndStudentCpf(videoId, studentCpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{videoId}/rating/average")
    public ResponseEntity<?> getAverageRatings(@PathVariable Long videoId) {
        Double contentAvg = ratingRepository.getAverageContentRating(videoId);
        Double audioAvg = ratingRepository.getAverageAudioRating(videoId);
        Double videoAvg = ratingRepository.getAverageVideoQualityRating(videoId);
        Long count = ratingRepository.countByVideoLessonId(videoId);

        return ResponseEntity.ok().body(String.format(
            "{\"contentAvg\": %.1f, \"audioAvg\": %.1f, \"videoAvg\": %.1f, \"count\": %d}",
            contentAvg != null ? contentAvg : 0.0,
            audioAvg != null ? audioAvg : 0.0,
            videoAvg != null ? videoAvg : 0.0,
            count
        ));
    }

    // ========== PROGRESS ==========

    @PostMapping("/{videoId}/progress")
    public ResponseEntity<VideoWatchProgress> updateProgress(@PathVariable Long videoId, @RequestBody VideoProgressDTO progressDTO) {
        VideoLesson video = videoLessonRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        VideoWatchProgress progress = progressRepository
                .findByVideoLessonIdAndStudentCpf(videoId, progressDTO.getStudentCpf())
                .orElse(new VideoWatchProgress());

        progress.setVideoLesson(video);
        progress.setStudentCpf(progressDTO.getStudentCpf());
        progress.setCompleted(progressDTO.getCompleted());
        progress.setWatchedSeconds(progressDTO.getWatchedSeconds());
        progress.setProgressPercentage(progressDTO.getProgressPercentage());

        VideoWatchProgress savedProgress = progressRepository.save(progress);
        return ResponseEntity.ok(savedProgress);
    }

    @GetMapping("/{videoId}/progress")
    public ResponseEntity<VideoWatchProgress> getProgress(@PathVariable Long videoId, @RequestParam String studentCpf) {
        return progressRepository.findByVideoLessonIdAndStudentCpf(videoId, studentCpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/progress/student/{studentCpf}")
    public ResponseEntity<List<VideoWatchProgress>> getStudentProgress(@PathVariable String studentCpf) {
        List<VideoWatchProgress> progress = progressRepository.findByStudentCpf(studentCpf);
        return ResponseEntity.ok(progress);
    }

    // ========== STATS COMPLETO ==========

    @GetMapping("/{videoId}/stats")
    public ResponseEntity<VideoInteractionStatsDTO> getVideoStats(
            @PathVariable Long videoId,
            @RequestParam String studentCpf) {

        VideoInteractionStatsDTO stats = new VideoInteractionStatsDTO();
        stats.setVideoLessonId(videoId);
        stats.setTotalLikes(likeRepository.countByVideoLessonId(videoId));
        stats.setTotalComments(commentRepository.countByVideoLessonId(videoId));
        stats.setTotalRatings(ratingRepository.countByVideoLessonId(videoId));
        stats.setTotalCompletions(progressRepository.countByVideoLessonIdAndCompleted(videoId, true));
        
        stats.setAverageContentRating(ratingRepository.getAverageContentRating(videoId));
        stats.setAverageAudioRating(ratingRepository.getAverageAudioRating(videoId));
        stats.setAverageVideoQualityRating(ratingRepository.getAverageVideoQualityRating(videoId));
        
        stats.setUserLiked(likeRepository.existsByVideoLessonIdAndStudentCpf(videoId, studentCpf));
        stats.setUserCompleted(
            progressRepository.findByVideoLessonIdAndStudentCpf(videoId, studentCpf)
                .map(VideoWatchProgress::getCompleted)
                .orElse(false)
        );

        // Últimos 5 comentários
        List<VideoInteractionStatsDTO.CommentResponseDTO> recentComments = 
            commentRepository.findByVideoLessonIdOrderByCreatedAtDesc(videoId)
                .stream()
                .limit(5)
                .map(c -> new VideoInteractionStatsDTO.CommentResponseDTO(
                    c.getId(),
                    c.getStudentName(),
                    c.getComment(),
                    c.getLikes(),
                    c.getCreatedAt()
                ))
                .collect(Collectors.toList());
        
        stats.setRecentComments(recentComments);

        return ResponseEntity.ok(stats);
    }
}
