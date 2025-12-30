package com.crmflame.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.QuestionInteractionDTO;
import com.crmflame.api.dto.QuestionInteractionSummaryDTO;
import com.crmflame.api.model.QuestionComment;
import com.crmflame.api.model.QuestionLike;
import com.crmflame.api.model.QuestionRating;
import com.crmflame.api.model.QuestionStats;
import com.crmflame.api.repository.QuestionCommentRepository;
import com.crmflame.api.repository.QuestionLikeRepository;
import com.crmflame.api.repository.QuestionRatingRepository;
import com.crmflame.api.repository.QuestionStatsRepository;

@RestController
@RequestMapping("/api/question-interactions")
@CrossOrigin(origins = "*")
public class QuestionInteractionController {
    
    @Autowired
    private QuestionLikeRepository likeRepository;
    
    @Autowired
    private QuestionCommentRepository commentRepository;
    
    @Autowired
    private QuestionRatingRepository ratingRepository;
    
    @Autowired
    private QuestionStatsRepository statsRepository;
    
    // ==================== CURTIDAS ====================
    
    @PostMapping("/likes")
    @Transactional
    public ResponseEntity<?> toggleLike(@RequestBody QuestionInteractionDTO dto) {
        try {
            Optional<QuestionLike> existing = likeRepository.findByQuestionIdAndStudentCpf(
                dto.getQuestionId(), dto.getStudentCpf());
            
            if (existing.isPresent()) {
                // Remove like
                likeRepository.delete(existing.get());
                return ResponseEntity.ok(Map.of("message", "Like removido", "liked", false));
            } else {
                // Adiciona like
                QuestionLike like = new QuestionLike();
                like.setQuestionId(dto.getQuestionId());
                like.setStudentName(dto.getStudentName());
                like.setStudentCpf(dto.getStudentCpf());
                likeRepository.save(like);
                return ResponseEntity.ok(Map.of("message", "Like adicionado", "liked", true));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao processar like: " + e.getMessage()));
        }
    }
    
    @GetMapping("/likes/{questionId}")
    public ResponseEntity<?> getLikes(@PathVariable String questionId) {
        try {
            long count = likeRepository.countByQuestionId(questionId);
            List<QuestionLike> likes = likeRepository.findByQuestionId(questionId);
            return ResponseEntity.ok(Map.of("count", count, "likes", likes));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar likes: " + e.getMessage()));
        }
    }
    
    @GetMapping("/likes/{questionId}/user/{cpf}")
    public ResponseEntity<?> checkUserLike(@PathVariable String questionId, @PathVariable String cpf) {
        try {
            boolean hasLiked = likeRepository.existsByQuestionIdAndStudentCpf(questionId, cpf);
            return ResponseEntity.ok(Map.of("hasLiked", hasLiked));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao verificar like: " + e.getMessage()));
        }
    }
    
    // ==================== COMENTÁRIOS ====================
    
    @PostMapping("/comments")
    @Transactional
    public ResponseEntity<?> addComment(@RequestBody QuestionInteractionDTO dto) {
        try {
            QuestionComment comment = new QuestionComment();
            comment.setQuestionId(dto.getQuestionId());
            comment.setStudentName(dto.getStudentName());
            comment.setStudentCpf(dto.getStudentCpf());
            comment.setComment(dto.getComment());
            
            QuestionComment saved = commentRepository.save(comment);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao adicionar comentário: " + e.getMessage()));
        }
    }
    
    @GetMapping("/comments/{questionId}")
    public ResponseEntity<?> getComments(@PathVariable String questionId) {
        try {
            List<QuestionComment> comments = commentRepository.findByQuestionIdOrderByCreatedAtDesc(questionId);
            long count = commentRepository.countByQuestionId(questionId);
            return ResponseEntity.ok(Map.of("count", count, "comments", comments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar comentários: " + e.getMessage()));
        }
    }
    
    @GetMapping("/comments/{questionId}/top")
    public ResponseEntity<?> getTopComments(@PathVariable String questionId) {
        try {
            List<QuestionComment> comments = commentRepository.findByQuestionIdOrderByLikesDesc(questionId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar comentários: " + e.getMessage()));
        }
    }
    
    @PutMapping("/comments/{commentId}")
    @Transactional
    public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody Map<String, String> updates) {
        try {
            Optional<QuestionComment> commentOpt = commentRepository.findById(commentId);
            if (commentOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            QuestionComment comment = commentOpt.get();
            if (updates.containsKey("comment")) {
                comment.setComment(updates.get("comment"));
            }
            
            QuestionComment updated = commentRepository.save(comment);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao atualizar comentário: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/comments/{commentId}")
    @Transactional
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            commentRepository.deleteById(commentId);
            return ResponseEntity.ok(Map.of("message", "Comentário removido"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao remover comentário: " + e.getMessage()));
        }
    }
    
    // ==================== AVALIAÇÕES ====================
    
    @PostMapping("/ratings")
    @Transactional
    public ResponseEntity<?> addOrUpdateRating(@RequestBody QuestionInteractionDTO dto) {
        try {
            Optional<QuestionRating> existing = ratingRepository.findByQuestionIdAndStudentCpf(
                dto.getQuestionId(), dto.getStudentCpf());
            
            QuestionRating rating;
            if (existing.isPresent()) {
                rating = existing.get();
            } else {
                rating = new QuestionRating();
                rating.setQuestionId(dto.getQuestionId());
                rating.setStudentCpf(dto.getStudentCpf());
            }
            
            rating.setDifficultyRating(dto.getDifficultyRating());
            rating.setQualityRating(dto.getQualityRating());
            rating.setExplanationRating(dto.getExplanationRating());
            rating.setFeedback(dto.getFeedback());
            
            QuestionRating saved = ratingRepository.save(rating);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao salvar avaliação: " + e.getMessage()));
        }
    }
    
    @GetMapping("/ratings/{questionId}")
    public ResponseEntity<?> getRatings(@PathVariable String questionId) {
        try {
            List<QuestionRating> ratings = ratingRepository.findByQuestionId(questionId);
            long count = ratingRepository.countByQuestionId(questionId);
            
            Double avgDifficulty = ratingRepository.getAverageDifficultyRating(questionId);
            Double avgQuality = ratingRepository.getAverageQualityRating(questionId);
            Double avgExplanation = ratingRepository.getAverageExplanationRating(questionId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("count", count);
            response.put("ratings", ratings);
            response.put("averages", Map.of(
                "difficulty", avgDifficulty != null ? avgDifficulty : 0.0,
                "quality", avgQuality != null ? avgQuality : 0.0,
                "explanation", avgExplanation != null ? avgExplanation : 0.0
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar avaliações: " + e.getMessage()));
        }
    }
    
    @GetMapping("/ratings/{questionId}/user/{cpf}")
    public ResponseEntity<?> getUserRating(@PathVariable String questionId, @PathVariable String cpf) {
        try {
            Optional<QuestionRating> rating = ratingRepository.findByQuestionIdAndStudentCpf(questionId, cpf);
            return rating.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar avaliação: " + e.getMessage()));
        }
    }
    
    // ==================== ESTATÍSTICAS ====================
    
    @GetMapping("/stats/{questionId}")
    public ResponseEntity<?> getQuestionStats(@PathVariable String questionId) {
        try {
            Optional<QuestionStats> stats = statsRepository.findByQuestionId(questionId);
            return stats.map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new QuestionStats()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar estatísticas: " + e.getMessage()));
        }
    }
    
    @GetMapping("/summary/{questionId}")
    public ResponseEntity<?> getQuestionSummary(
            @PathVariable String questionId,
            @RequestParam(required = false) String userCpf) {
        try {
            long totalLikes = likeRepository.countByQuestionId(questionId);
            long totalComments = commentRepository.countByQuestionId(questionId);
            long totalRatings = ratingRepository.countByQuestionId(questionId);
            
            Double avgDifficulty = ratingRepository.getAverageDifficultyRating(questionId);
            Double avgQuality = ratingRepository.getAverageQualityRating(questionId);
            Double avgExplanation = ratingRepository.getAverageExplanationRating(questionId);
            
            QuestionInteractionSummaryDTO summary = new QuestionInteractionSummaryDTO(
                questionId, totalLikes, totalComments, totalRatings,
                avgDifficulty, avgQuality, avgExplanation
            );
            
            if (userCpf != null) {
                boolean hasLiked = likeRepository.existsByQuestionIdAndStudentCpf(questionId, userCpf);
                summary.setUserHasLiked(hasLiked);
            }
            
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar resumo: " + e.getMessage()));
        }
    }
    
    @GetMapping("/top/liked")
    public ResponseEntity<?> getMostLikedQuestions() {
        try {
            List<QuestionStats> stats = statsRepository.findMostLikedQuestions();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar questões: " + e.getMessage()));
        }
    }
    
    @GetMapping("/top/commented")
    public ResponseEntity<?> getMostCommentedQuestions() {
        try {
            List<QuestionStats> stats = statsRepository.findMostCommentedQuestions();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erro ao buscar questões: " + e.getMessage()));
        }
    }
}
