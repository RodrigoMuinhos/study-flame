package com.crmflame.api.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.GamificationDTO;
import com.crmflame.api.model.Badge;
import com.crmflame.api.service.GamificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/gamification")
@CrossOrigin(origins = "*")
@Tag(name = "Gamification", description = "Sistema de gamificação - XP, níveis, badges e conquistas")
public class GamificationController {
    
    @Autowired
    private GamificationService gamificationService;
    
    @GetMapping("/student/{cpf}")
    @Operation(summary = "Buscar gamificação por CPF", description = "Retorna dados de XP, nível e badges do aluno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados de gamificação retornados"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public ResponseEntity<GamificationDTO> getStudentGamification(
            @Parameter(description = "CPF do aluno") @PathVariable String cpf) {
        GamificationDTO data = gamificationService.getGamificationData(cpf);
        return ResponseEntity.ok(data);
    }
    
    @GetMapping("/student/id/{leadId}")
    @Operation(summary = "Buscar gamificação por ID", description = "Retorna dados de gamificação pelo UUID do lead")
    public ResponseEntity<GamificationDTO> getStudentGamificationById(
            @Parameter(description = "UUID do lead") @PathVariable UUID leadId) {
        GamificationDTO data = gamificationService.getGamificationDataByLeadId(leadId);
        return ResponseEntity.ok(data);
    }
    
    @PostMapping("/student/{cpf}/xp")
    @Operation(summary = "Adicionar XP", description = "Adiciona pontos de experiência ao aluno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "XP adicionado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Aluno não encontrado")
    })
    public ResponseEntity<GamificationDTO> addXp(
            @Parameter(description = "CPF do aluno") @PathVariable String cpf,
            @RequestBody Map<String, Integer> body) {
        int xpAmount = body.getOrDefault("xp", 0);
        GamificationDTO data = gamificationService.addXp(cpf, xpAmount);
        return ResponseEntity.ok(data);
    }
    
    @GetMapping("/badges")
    @Operation(summary = "Listar badges", description = "Retorna todos os badges disponíveis no sistema")
    public ResponseEntity<List<Badge>> getAllBadges() {
        List<Badge> badges = gamificationService.getAllBadges();
        return ResponseEntity.ok(badges);
    }
    
    @PostMapping("/badges/init")
    @Operation(summary = "Inicializar badges", description = "Cria badges padrão do sistema (uso admin)")
    public ResponseEntity<Map<String, String>> initializeBadges() {
        gamificationService.initializeDefaultBadges();
        return ResponseEntity.ok(Map.of("message", "Badges inicializados com sucesso"));
    }
}
