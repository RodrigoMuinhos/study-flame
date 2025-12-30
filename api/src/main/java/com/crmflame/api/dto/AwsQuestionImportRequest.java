package com.crmflame.api.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AwsQuestionImportRequest {
    @NotEmpty(message = "Informe ao menos um tema para importação")
    private List<AwsQuestionThemeImportDTO> themes;
}