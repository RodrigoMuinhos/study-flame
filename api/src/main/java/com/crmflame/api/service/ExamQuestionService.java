package com.crmflame.api.service;

import com.crmflame.api.dto.ExamQuestionDTO;
import com.crmflame.api.model.ExamQuestion;
import com.crmflame.api.repository.ExamQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExamQuestionService {
    
    @Autowired
    private ExamQuestionRepository repository;
    
    @Transactional
    public List<ExamQuestion> saveAll(List<ExamQuestionDTO> questionsDTO) {
        List<ExamQuestion> questions = questionsDTO.stream()
            .map(this::convertToEntity)
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
    
    public Map<String, Object> getQuestionStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long total = repository.count();
        stats.put("total", total);
        stats.put("resilient", repository.countByDomain("resilient"));
        stats.put("performance", repository.countByDomain("performance"));
        stats.put("secure", repository.countByDomain("secure"));
        stats.put("cost", repository.countByDomain("cost"));
        
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
            dto.getMultipleChoice()
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
            entity.getMultipleChoice()
        );
    }
}
