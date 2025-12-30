package com.crmflame.api.service;

import com.crmflame.api.dto.AwsQuestionImportRequest;
import com.crmflame.api.dto.AwsQuestionThemeImportDTO;
import com.crmflame.api.dto.AwsQuestionThemeResponse;
import com.crmflame.api.model.AwsQuestionTheme;
import com.crmflame.api.repository.AwsQuestionThemeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AwsQuestionThemeService {

    private final AwsQuestionThemeRepository repository;
    private final ObjectMapper objectMapper;

    @Transactional
    public List<AwsQuestionThemeResponse> importThemes(AwsQuestionImportRequest request) {
        if (request == null || CollectionUtils.isEmpty(request.getThemes())) {
            throw new IllegalArgumentException("Nenhum tema fornecido para importação");
        }

        List<AwsQuestionThemeResponse> responses = new ArrayList<>();

        for (AwsQuestionThemeImportDTO dto : request.getThemes()) {
            if (dto == null || dto.getTheme() == null || dto.getTheme().isBlank()) {
                throw new IllegalArgumentException("Tema inválido ou em branco");
            }

            int questionCount = deriveCount(dto);
            String payload = toJson(dto.getQuestions());

            Optional<AwsQuestionTheme> existingOpt = repository.findByThemeIgnoreCase(dto.getTheme());
            AwsQuestionTheme theme = existingOpt.orElseGet(() -> AwsQuestionTheme.builder()
                    .theme(dto.getTheme().trim())
                    .build());

            theme.setQuestionCount(questionCount);
            theme.setPayload(payload);

            AwsQuestionTheme saved = repository.save(theme);
            responses.add(mapToResponse(saved));
        }

        return responses;
    }

    @Transactional(readOnly = true)
    public List<AwsQuestionThemeResponse> listStats() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .sorted((a, b) -> a.getTheme().compareToIgnoreCase(b.getTheme()))
                .collect(Collectors.toList());
    }

    private AwsQuestionThemeResponse mapToResponse(AwsQuestionTheme theme) {
        return AwsQuestionThemeResponse.builder()
                .id(theme.getId())
                .theme(theme.getTheme())
                .questionCount(theme.getQuestionCount())
                .updatedAt(theme.getUpdatedAt())
                .build();
    }

    private int deriveCount(AwsQuestionThemeImportDTO dto) {
        if (dto.getQuestionCount() != null && dto.getQuestionCount() > 0) {
            return dto.getQuestionCount();
        }

        Object questions = dto.getQuestions();
        if (questions instanceof Collection<?> collection) {
            return collection.size();
        }
        if (questions instanceof Map<?, ?> map) {
            Object q = map.get("questions");
            if (q instanceof Collection<?> collection) {
                return collection.size();
            }
        }
        return 0;
    }

    private String toJson(Object payload) {
        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Erro ao serializar JSON do tema: " + e.getMessage());
        }
    }
}