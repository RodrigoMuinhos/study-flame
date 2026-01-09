package com.crmflame.api.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.GamificationXpRule;
import com.crmflame.api.model.StudentProgress;
import com.crmflame.api.model.VideoComment;
import com.crmflame.api.model.VideoLesson;
import com.crmflame.api.model.VideoLike;
import com.crmflame.api.model.VideoRating;
import com.crmflame.api.model.VideoWatchProgress;
import com.crmflame.api.repository.VideoCommentRepository;
import com.crmflame.api.repository.GamificationXpRuleRepository;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentProgressRepository;
import com.crmflame.api.repository.VideoLessonRepository;
import com.crmflame.api.repository.VideoLikeRepository;
import com.crmflame.api.repository.VideoRatingRepository;
import com.crmflame.api.repository.VideoWatchProgressRepository;
import com.crmflame.api.service.GamificationService;

import jakarta.transaction.Transactional;

import java.util.Map;

@RestController
@RequestMapping("/videos")
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

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private StudentProgressRepository studentProgressRepository;

    @Autowired
    private GamificationXpRuleRepository xpRuleRepository;

    @Autowired
    private GamificationService gamificationService;

    private int xpForAction(String actionCode) {
        if (actionCode == null || actionCode.isBlank()) return 0;
        return xpRuleRepository.findByActionCodeAndIsActiveTrue(actionCode)
                .map(GamificationXpRule::getXpAmount)
                .orElse(0);
    }

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

            // XP via DB rule (somente ao curtir, não ao descurtir)
            int xp = xpForAction("VIDEO_LIKED");
            if (xp > 0) {
                gamificationService.addXp(studentCpf, xp);
            } else {
                touchStudentActivity(studentCpf);
            }
        }

        if (!nowLiked) {
            touchStudentActivity(studentCpf);
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
        VideoLesson video = videoLessonRepository.findById(videoId).orElse(null);
        if (video == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        VideoComment comment = new VideoComment();
        comment.setVideoLesson(video);
        comment.setStudentName(commentDTO.getStudentName());
        comment.setStudentCpf(commentDTO.getStudentCpf());
        comment.setComment(commentDTO.getComment());

        VideoComment savedComment = commentRepository.save(comment);

        // XP via DB rule
        int xp = xpForAction("COMMENT_CREATED");
        if (xp > 0 && commentDTO.getStudentCpf() != null) {
            gamificationService.addXp(commentDTO.getStudentCpf(), xp);
        } else if (commentDTO.getStudentCpf() != null) {
            touchStudentActivity(commentDTO.getStudentCpf());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{videoId}/comments")
    public ResponseEntity<List<VideoComment>> getComments(@PathVariable Long videoId) {
        List<VideoComment> comments = commentRepository.findByVideoLessonIdOrderByCreatedAtDesc(videoId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @RequestParam String studentCpf) {
        VideoComment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Comentário não encontrado"));
        }

        if (!comment.getStudentCpf().equals(studentCpf)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Você não pode deletar este comentário");
        }

        commentRepository.delete(comment);
        return ResponseEntity.ok().body("{\"message\": \"Comentário removido\"}");
    }

    // ========== RATINGS ==========

    @PostMapping("/{videoId}/rating")
    public ResponseEntity<VideoRating> addOrUpdateRating(@PathVariable Long videoId, @RequestBody VideoRatingDTO ratingDTO) {
        VideoLesson video = videoLessonRepository.findById(videoId).orElse(null);
        if (video == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<VideoRating> existing = ratingRepository
            .findByVideoLessonIdAndStudentCpf(videoId, ratingDTO.getStudentCpf());

        boolean isFirstRating = existing.isEmpty();
        VideoRating rating = existing.orElse(new VideoRating());

        rating.setVideoLesson(video);
        rating.setStudentCpf(ratingDTO.getStudentCpf());
        rating.setContentRating(ratingDTO.getContentRating());
        rating.setAudioRating(ratingDTO.getAudioRating());
        rating.setVideoQualityRating(ratingDTO.getVideoQualityRating());

        VideoRating savedRating = ratingRepository.save(rating);

        // XP via DB rule (apenas no primeiro envio)
        if (isFirstRating) {
            int xp = xpForAction("RATING_SUBMITTED");
            if (xp > 0 && ratingDTO.getStudentCpf() != null) {
                gamificationService.addXp(ratingDTO.getStudentCpf(), xp);
            }
        }

        if (ratingDTO.getStudentCpf() != null) {
            touchStudentActivity(ratingDTO.getStudentCpf());
        }
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
        VideoLesson video = videoLessonRepository.findById(videoId).orElse(null);
        if (video == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (progressDTO.getStudentCpf() == null || progressDTO.getStudentCpf().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        VideoWatchProgress progress = progressRepository
                .findByVideoLessonIdAndStudentCpf(videoId, progressDTO.getStudentCpf())
                .orElse(new VideoWatchProgress());

        boolean wasCompletedTrue = Boolean.TRUE.equals(progress.getCompleted());

        progress.setVideoLesson(video);
        progress.setStudentCpf(progressDTO.getStudentCpf());
        progress.setCompleted(progressDTO.getCompleted());
        progress.setWatchedSeconds(progressDTO.getWatchedSeconds());
        progress.setProgressPercentage(progressDTO.getProgressPercentage());

        VideoWatchProgress savedProgress = progressRepository.save(progress);

        boolean nowCompletedTrue = Boolean.TRUE.equals(progressDTO.getCompleted());
        if (!wasCompletedTrue && nowCompletedTrue) {
            updateStudentProgressOnCompletion(progressDTO.getStudentCpf(), video);
        } else {
            touchStudentActivity(progressDTO.getStudentCpf());
        }

        return ResponseEntity.ok(savedProgress);
    }

    private void updateStudentProgressOnCompletion(String cpf, VideoLesson video) {
        if (cpf == null || cpf.isBlank()) return;

        Optional<Lead> leadOpt = leadRepository.findByCpf(cpf);
        if (leadOpt.isEmpty()) return;

        Lead lead = leadOpt.get();
        StudentProgress studentProgress = studentProgressRepository.findByLead(lead)
                .orElseGet(() -> createInitialProgress(lead));

        // lessons completed
        Integer lessonsCompleted = studentProgress.getLessonsCompleted();
        studentProgress.setLessonsCompleted((lessonsCompleted == null ? 0 : lessonsCompleted) + 1);

        // XP via DB (video_lessons.xp_reward)
        int xpReward = video != null ? Math.max(0, video.getXpReward()) : 0;
        if (xpReward > 0) {
            // usa o serviço para recalcular nível baseado em faixas no DB
            gamificationService.addXp(cpf, xpReward);
        }

        // streak + last activity
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime last = studentProgress.getLastActivityDate();
        Integer streakVal = studentProgress.getStreakDays();
        int currentStreak = streakVal == null ? 0 : streakVal;

        if (last == null) {
            currentStreak = 1;
        } else {
            LocalDate lastDay = last.toLocalDate();
            LocalDate today = now.toLocalDate();

            if (lastDay.equals(today)) {
                currentStreak = Math.max(1, currentStreak);
            } else if (lastDay.plusDays(1).equals(today)) {
                currentStreak = Math.max(1, currentStreak + 1);
            } else {
                currentStreak = 1;
            }
        }

        studentProgress.setStreakDays(currentStreak);
        studentProgress.setLastActivityDate(now);

        studentProgressRepository.save(studentProgress);
    }

    private void touchStudentActivity(String cpf) {
        if (cpf == null || cpf.isBlank()) return;

        Optional<Lead> leadOpt = leadRepository.findByCpf(cpf);
        if (leadOpt.isEmpty()) return;

        Lead lead = leadOpt.get();
        StudentProgress studentProgress = studentProgressRepository.findByLead(lead)
                .orElseGet(() -> createInitialProgress(lead));

        studentProgress.setLastActivityDate(LocalDateTime.now());
        studentProgressRepository.save(studentProgress);
    }

    private StudentProgress createInitialProgress(Lead lead) {
        StudentProgress progress = new StudentProgress();
        progress.setLead(lead);
        return studentProgressRepository.save(progress);
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

        if (!videoLessonRepository.existsById(videoId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

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
