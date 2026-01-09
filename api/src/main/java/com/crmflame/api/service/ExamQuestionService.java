package com.crmflame.api.service;

import com.crmflame.api.dto.ExamQuestionDTO;
import com.crmflame.api.model.ExamQuestion;
import com.crmflame.api.repository.ExamQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ExamQuestionService {
    
    @Autowired
    private ExamQuestionRepository repository;
    
    @Transactional
    public List<ExamQuestion> saveAll(List<ExamQuestionDTO> questionsDTO) {
        List<ExamQuestion> questions = questionsDTO.stream()
            .map(this::convertToEntity)
            .peek(this::validateAndNormalize)
            .collect(Collectors.toList());
        return repository.saveAll(questions);
    }
    
    public List<ExamQuestionDTO> getAllQuestions() {
        return repository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ExamQuestionDTO> getQuestionsByDomain(String domain) {
        return repository.findByDomain(domain).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ExamQuestionDTO> getRandomQuestions() {
        return repository.findAllRandom().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<ExamQuestionDTO> getQuestionsByIds(List<String> ids) {
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }

        Map<String, ExamQuestion> found = repository.findByIdIn(ids).stream()
            .collect(Collectors.toMap(ExamQuestion::getId, q -> q));

        List<ExamQuestionDTO> ordered = new ArrayList<>();
        for (String id : ids) {
            ExamQuestion q = found.get(id);
            if (q != null) {
                ordered.add(convertToDTO(q));
            }
        }
        return ordered;
    }

    public List<ExamQuestionDTO> getRandomQuestionsFiltered(
        Integer count,
        String status,
        String topic,
        String domain,
        String difficulty,
        Boolean multipleChoice
    ) {
        int size = (count == null || count <= 0) ? 65 : Math.min(count, 200);
        String effectiveStatus = (status == null || status.isBlank()) ? "ACTIVE" : status;

        return repository.findRandomFiltered(
                effectiveStatus,
                isBlankToNull(topic),
                isBlankToNull(domain),
                isBlankToNull(difficulty),
                multipleChoice,
                org.springframework.data.domain.PageRequest.of(0, size)
            ).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public Map<String, Object> getQuestionStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long total = repository.count();
        stats.put("total", total);
        stats.put("resilient", repository.countByDomain("resilient"));
        stats.put("performance", repository.countByDomain("performance"));
        stats.put("secure", repository.countByDomain("secure"));
        stats.put("cost", repository.countByDomain("cost"));

        // contagens simples por status (útil para admin)
        stats.put("active", repository.findAll().stream().filter(q -> "ACTIVE".equalsIgnoreCase(nullToDefault(q.getStatus(), "ACTIVE"))).count());
        stats.put("draft", repository.findAll().stream().filter(q -> "DRAFT".equalsIgnoreCase(nullToDefault(q.getStatus(), "ACTIVE"))).count());
        
        return stats;
    }
    
    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }
    
    private ExamQuestion convertToEntity(ExamQuestionDTO dto) {
        return new ExamQuestion(
            dto.getId(),
            dto.getQuestion(),
            dto.getOptions(),
            dto.getCorrectAnswer(),
            dto.getExplanation(),
            dto.getDomain(),
            dto.getDifficulty(),
            dto.getMultipleChoice(),
            dto.getTopic(),
            dto.getStatus()
        );
    }
    
    private ExamQuestionDTO convertToDTO(ExamQuestion entity) {
        return new ExamQuestionDTO(
            entity.getId(),
            entity.getQuestion(),
            entity.getOptions(),
            entity.getCorrectAnswer(),
            entity.getExplanation(),
            entity.getDomain(),
            entity.getDifficulty(),
            entity.getMultipleChoice(),
            entity.getTopic(),
            nullToDefault(entity.getStatus(), "ACTIVE")
        );
    }

    private void validateAndNormalize(ExamQuestion q) {
        if (q.getId() == null || q.getId().isBlank()) {
            q.setId(UUID.randomUUID().toString());
        }

        if (q.getOptions() == null || q.getOptions().size() != 4) {
            throw new IllegalArgumentException("Cada questão deve ter exatamente 4 opções");
        }

        q.setStatus(nullToDefault(q.getStatus(), "ACTIVE").toUpperCase());
        q.setCorrectAnswer(normalizeCorrectAnswer(q.getCorrectAnswer()));

        if (q.getDomain() == null || q.getDomain().isBlank()) {
            throw new IllegalArgumentException("domain é obrigatório");
        }

        if (q.getDifficulty() == null || q.getDifficulty().isBlank()) {
            throw new IllegalArgumentException("difficulty é obrigatório");
        }
    }

    private String normalizeCorrectAnswer(String raw) {
        if (raw == null || raw.isBlank()) {
            throw new IllegalArgumentException("correctAnswer é obrigatório");
        }

        String trimmed = raw.trim().toUpperCase();

        // multi-choice ainda não suportado na UI (single-select)
        if (trimmed.contains(",")) {
            throw new IllegalArgumentException("multiple correct answers ainda não suportado (correctAnswer com vírgula)");
        }

        if (Set.of("A", "B", "C", "D").contains(trimmed)) {
            return trimmed;
        }

        if (trimmed.matches("^[0-3]$")) {
            return switch (trimmed) {
                case "0" -> "A";
                case "1" -> "B";
                case "2" -> "C";
                default -> "D";
            };
        }

        throw new IllegalArgumentException("correctAnswer inválido (use A-D ou 0-3)");
    }

    private String isBlankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }

    private String nullToDefault(String s, String def) {
        return (s == null || s.isBlank()) ? def : s;
    }
}
