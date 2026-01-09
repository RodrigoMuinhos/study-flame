package com.crmflame.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crmflame.api.dto.VideoLessonDTO;
import com.crmflame.api.dto.VideoLessonRequestDTO;
import com.crmflame.api.model.Notification;
import com.crmflame.api.model.VideoLesson;
import com.crmflame.api.repository.VideoCommentRepository;
import com.crmflame.api.repository.VideoLikeRepository;
import com.crmflame.api.repository.VideoRatingRepository;
import com.crmflame.api.repository.VideoLessonRepository;
import com.crmflame.api.repository.VideoWatchProgressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoLessonService {

    private final VideoLessonRepository videoLessonRepository;
    private final VideoLikeRepository videoLikeRepository;
    private final VideoCommentRepository videoCommentRepository;
    private final VideoRatingRepository videoRatingRepository;
    private final VideoWatchProgressRepository videoWatchProgressRepository;
    private final NotificationService notificationService;

    /**
     * Listar todos os vídeos (para admin)
     */
    public List<VideoLessonDTO> findAll() {
        return videoLessonRepository.findAllByOrderByModuleNumberAscLessonNumberAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Listar apenas vídeos publicados (para alunos)
     */
    public List<VideoLessonDTO> findPublished() {
        return videoLessonRepository.findByIsPublishedTrueOrderByModuleNumberAscLessonNumberAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Buscar vídeo por ID
     */
    public VideoLessonDTO findById(Long id) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));
        return convertToDTO(video);
    }

    /**
     * Buscar vídeo por módulo e aula (apenas publicados)
     */
    public VideoLessonDTO findByModuleAndLesson(Integer moduleNumber, Integer lessonNumber) {
        VideoLesson video = videoLessonRepository
                .findByModuleNumberAndLessonNumberAndIsPublishedTrue(moduleNumber, lessonNumber)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado ou não publicado"));
        return convertToDTO(video);
    }

    /**
     * Criar novo vídeo
     */
    @Transactional
    public VideoLessonDTO create(VideoLessonRequestDTO request) {
        // Verificar se já existe vídeo com mesmo módulo e aula
        if (videoLessonRepository.existsByModuleNumberAndLessonNumber(
                request.getModuleNumber(), request.getLessonNumber())) {
            throw new RuntimeException("Já existe um vídeo para este módulo e aula");
        }

        VideoLesson video = new VideoLesson();
        video.setModuleNumber(request.getModuleNumber());
        video.setLessonNumber(request.getLessonNumber());
        video.setTitle(request.getTitle());
        video.setDescription(request.getDescription());
        video.setYoutubeUrl(request.getYoutubeUrl());
        video.setDurationMinutes(request.getDurationMinutes());
        video.setOrderIndex(request.getOrderIndex());
        video.setIsPublished(request.getIsPublished());
        video.setPageLocation(request.getPageLocation());
        video.setXpReward(request.getXpReward());

        VideoLesson saved = videoLessonRepository.save(video);

        if (Boolean.TRUE.equals(saved.getIsPublished())) {
            notifyVideoPublished(saved);
        }
        return convertToDTO(saved);
    }

    /**
     * Atualizar vídeo
     */
    @Transactional
    public VideoLessonDTO update(Long id, VideoLessonRequestDTO request) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        boolean wasPublished = Boolean.TRUE.equals(video.getIsPublished());

        video.setModuleNumber(request.getModuleNumber());
        video.setLessonNumber(request.getLessonNumber());
        video.setTitle(request.getTitle());
        video.setDescription(request.getDescription());
        video.setYoutubeUrl(request.getYoutubeUrl());
        video.setDurationMinutes(request.getDurationMinutes());
        video.setOrderIndex(request.getOrderIndex());
        video.setIsPublished(request.getIsPublished());
        video.setPageLocation(request.getPageLocation());
        video.setXpReward(request.getXpReward());

        VideoLesson updated = videoLessonRepository.save(video);

        boolean isPublishedNow = Boolean.TRUE.equals(updated.getIsPublished());
        if (!wasPublished && isPublishedNow) {
            notifyVideoPublished(updated);
        }
        return convertToDTO(updated);
    }

    /**
     * Publicar/Despublicar vídeo
     */
    @Transactional
    public VideoLessonDTO togglePublish(Long id) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        boolean wasPublished = Boolean.TRUE.equals(video.getIsPublished());
        video.setIsPublished(!video.getIsPublished());
        VideoLesson updated = videoLessonRepository.save(video);

        boolean isPublishedNow = Boolean.TRUE.equals(updated.getIsPublished());
        if (!wasPublished && isPublishedNow) {
            notifyVideoPublished(updated);
        }
        return convertToDTO(updated);
    }

    /**
     * Dispara manualmente uma notificação para um vídeo já publicado.
     */
    @Transactional
    public void notifyPublished(Long id) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        if (!Boolean.TRUE.equals(video.getIsPublished())) {
            throw new IllegalStateException("Vídeo não está publicado");
        }

        notifyVideoPublished(video);
    }

    private void notifyVideoPublished(VideoLesson video) {
        notificationService.create(
                Notification.Type.INFO,
                "📚 Novo conteúdo disponível",
                buildVideoPublishedMessage(video),
                "📚"
        );
    }

    private String buildVideoPublishedMessage(VideoLesson video) {
        String title = video.getTitle() != null ? video.getTitle() : "Nova aula";
        Integer module = video.getModuleNumber();
        Integer lesson = video.getLessonNumber();
        if (module != null && lesson != null) {
            return "Foi publicada a aula \"" + title + "\" (Módulo " + module + ", Aula " + lesson + ").";
        }
        return "Foi publicado um novo conteúdo: \"" + title + "\".";
    }

    /**
     * Deletar vídeo
     */
    @Transactional
    public void delete(Long id) {
        if (!videoLessonRepository.existsById(id)) {
            throw new RuntimeException("Vídeo não encontrado");
        }

        // Some databases may not have FK ON DELETE CASCADE configured.
        // Delete interaction rows explicitly to avoid FK violations.
        videoLikeRepository.deleteByVideoLessonId(id);
        videoCommentRepository.deleteByVideoLessonId(id);
        videoRatingRepository.deleteByVideoLessonId(id);
        videoWatchProgressRepository.deleteByVideoLessonId(id);

        videoLessonRepository.deleteById(id);
    }

    /**
     * Converter entidade para DTO
     */
    private VideoLessonDTO convertToDTO(VideoLesson video) {
        VideoLessonDTO dto = new VideoLessonDTO();
        dto.setId(video.getId());
        dto.setModuleNumber(video.getModuleNumber());
        dto.setLessonNumber(video.getLessonNumber());
        dto.setTitle(video.getTitle());
        dto.setDescription(video.getDescription());
        dto.setYoutubeUrl(video.getYoutubeUrl());
        dto.setDurationMinutes(video.getDurationMinutes());
        dto.setOrderIndex(video.getOrderIndex());
        dto.setIsPublished(video.getIsPublished());
        dto.setPageLocation(video.getPageLocation());
        dto.setXpReward(video.getXpReward());
        dto.setCreatedAt(video.getCreatedAt());
        dto.setUpdatedAt(video.getUpdatedAt());
        return dto;
    }
}
