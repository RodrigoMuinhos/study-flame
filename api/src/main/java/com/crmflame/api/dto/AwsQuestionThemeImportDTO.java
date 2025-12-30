package com.crmflame.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AwsQuestionThemeImportDTO {
    @NotBlank(message = "Tema é obrigatório")
    private String theme;

    @NotNull(message = "Conteúdo de questões é obrigatório")
    private Object questions;

    private Integer questionCount;
}