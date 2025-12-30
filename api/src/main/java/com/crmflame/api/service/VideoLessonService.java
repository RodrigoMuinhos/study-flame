package com.crmflame.api.service;

import com.crmflame.api.dto.VideoLessonDTO;
import com.crmflame.api.dto.VideoLessonRequestDTO;
import com.crmflame.api.model.VideoLesson;
import com.crmflame.api.repository.VideoLessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoLessonService {

    private final VideoLessonRepository videoLessonRepository;

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

        VideoLesson saved = videoLessonRepository.save(video);
        return convertToDTO(saved);
    }

    /**
     * Atualizar vídeo
     */
    @Transactional
    public VideoLessonDTO update(Long id, VideoLessonRequestDTO request) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        video.setModuleNumber(request.getModuleNumber());
        video.setLessonNumber(request.getLessonNumber());
        video.setTitle(request.getTitle());
        video.setDescription(request.getDescription());
        video.setYoutubeUrl(request.getYoutubeUrl());
        video.setDurationMinutes(request.getDurationMinutes());
        video.setOrderIndex(request.getOrderIndex());
        video.setIsPublished(request.getIsPublished());
        video.setPageLocation(request.getPageLocation());

        VideoLesson updated = videoLessonRepository.save(video);
        return convertToDTO(updated);
    }

    /**
     * Publicar/Despublicar vídeo
     */
    @Transactional
    public VideoLessonDTO togglePublish(Long id) {
        VideoLesson video = videoLessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        video.setIsPublished(!video.getIsPublished());
        VideoLesson updated = videoLessonRepository.save(video);
        return convertToDTO(updated);
    }

    /**
     * Deletar vídeo
     */
    @Transactional
    public void delete(Long id) {
        if (!videoLessonRepository.existsById(id)) {
            throw new RuntimeException("Vídeo não encontrado");
        }
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
        dto.setCreatedAt(video.getCreatedAt());
        dto.setUpdatedAt(video.getUpdatedAt());
        return dto;
    }
}
