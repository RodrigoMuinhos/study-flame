package com.crmflame.api.repository;

import com.crmflame.api.model.VideoLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoLessonRepository extends JpaRepository<VideoLesson, Long> {

    // Buscar vídeos publicados
    List<VideoLesson> findByIsPublishedTrueOrderByModuleNumberAscLessonNumberAsc();

    // Buscar todos os vídeos (admin)
    List<VideoLesson> findAllByOrderByModuleNumberAscLessonNumberAsc();

    // Buscar vídeos de um módulo específico (publicados)
    List<VideoLesson> findByModuleNumberAndIsPublishedTrueOrderByLessonNumberAsc(Integer moduleNumber);

    // Buscar vídeo específico por módulo e aula (publicado)
    Optional<VideoLesson> findByModuleNumberAndLessonNumberAndIsPublishedTrue(Integer moduleNumber, Integer lessonNumber);

    // Buscar vídeos por localização de página
    List<VideoLesson> findByPageLocationAndIsPublishedTrueOrderByOrderIndexAsc(String pageLocation);

    // Verificar se existe vídeo com mesmo módulo e aula
    boolean existsByModuleNumberAndLessonNumber(Integer moduleNumber, Integer lessonNumber);
}
