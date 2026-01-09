package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoLessonDTO {
    private Long id;
    private Integer moduleNumber;
    private Integer lessonNumber;
    private String title;
    private String description;
    private String youtubeUrl;
    private Integer durationMinutes;
    private Integer orderIndex;
    private Boolean isPublished;
    private String pageLocation;
    private Integer xpReward;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Campo calculado para exibição
    private String moduleLabel; // "Módulo 0 • Aula 1"

    public String getModuleLabel() {
        return String.format("Módulo %d • Aula %d", moduleNumber, lessonNumber);
    }
}
