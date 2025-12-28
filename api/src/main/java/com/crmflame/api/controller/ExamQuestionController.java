package com.crmflame.api.controller;

import com.crmflame.api.dto.ExamQuestionDTO;
import com.crmflame.api.service.ExamQuestionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/exam-questions")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
@Tag(name = "Exam Questions", description = "Gerenciamento de questões para simulados AWS")
public class ExamQuestionController {
    
    @Autowired
    private ExamQuestionService service;
    
    @PostMapping("/bulk")
    @Operation(summary = "Importar questões em lote", description = "Salva múltiplas questões de uma vez")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Questões importadas com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    public ResponseEntity<Map<String, Object>> bulkCreate(@RequestBody List<ExamQuestionDTO> questions) {
        service.saveAll(questions);
        return ResponseEntity.ok(Map.of(
            "message", "Questões salvas com sucesso",
            "count", questions.size()
        ));
    }
    
    @GetMapping
    @Operation(summary = "Listar todas as questões", description = "Retorna todas as questões do banco")
    public ResponseEntity<List<ExamQuestionDTO>> getAllQuestions() {
        return ResponseEntity.ok(service.getAllQuestions());
    }
    
    @GetMapping("/random")
    @Operation(summary = "Questões aleatórias", description = "Retorna questões aleatórias para simulado")
    public ResponseEntity<List<ExamQuestionDTO>> getRandomQuestions() {
        return ResponseEntity.ok(service.getRandomQuestions());
    }
    
    @GetMapping("/domain/{domain}")
    @Operation(summary = "Questões por domínio", description = "Retorna questões filtradas por domínio AWS")
    public ResponseEntity<List<ExamQuestionDTO>> getQuestionsByDomain(
            @Parameter(description = "Domínio AWS (ex: security, compute)") @PathVariable String domain) {
        return ResponseEntity.ok(service.getQuestionsByDomain(domain));
    }
    
    @GetMapping("/stats")
    @Operation(summary = "Estatísticas de questões", description = "Retorna contagens e métricas do banco de questões")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(service.getQuestionStats());
    }
    
    @DeleteMapping("/all")
    @Operation(summary = "Deletar todas as questões", description = "Remove todas as questões do banco (admin)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Questões removidas"),
            @ApiResponse(responseCode = "403", description = "Não autorizado")
    })
    public ResponseEntity<Map<String, String>> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok(Map.of("message", "Todas as questões foram removidas"));
    }
}
