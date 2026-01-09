package com.crmflame.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoLessonRequestDTO {

    @NotNull(message = "Número do módulo é obrigatório")
    @Min(value = 0, message = "Número do módulo deve ser maior ou igual a 0")
    private Integer moduleNumber;

    @NotNull(message = "Número da aula é obrigatório")
    @Min(value = 0, message = "Número da aula deve ser maior ou igual a 0")
    private Integer lessonNumber;

    @NotBlank(message = "Título é obrigatório")
    private String title;

    private String description;

    @NotBlank(message = "URL do YouTube é obrigatória")
    private String youtubeUrl;

    @NotNull(message = "Duração é obrigatória")
    @Min(value = 1, message = "Duração deve ser maior que 0")
    private Integer durationMinutes;

    private Integer orderIndex = 0;

    private Boolean isPublished = false;

    private String pageLocation = "aulas"; // inicio, trilha, aulas, desafios, materiais

    // XP concedido quando o aluno conclui esta aula (definido no DB, não em código)
    private int xpReward = 0;
}
