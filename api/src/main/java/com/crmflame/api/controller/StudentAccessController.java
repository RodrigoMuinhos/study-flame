package com.crmflame.api.controller;

import com.crmflame.api.dto.StudentAccessDTO;
import com.crmflame.api.service.StudentAccessService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/student-access")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
@Tag(name = "Student Access", description = "Gerenciamento de credenciais de acesso dos alunos")
public class StudentAccessController {
    
    private final StudentAccessService studentAccessService;
    
    @GetMapping
    @Operation(summary = "Listar credenciais", description = "Retorna todas as credenciais de acesso")
    public ResponseEntity<List<StudentAccessDTO>> getAllCredentials() {
        List<StudentAccessDTO> credentials = studentAccessService.getAllCredentials();
        return ResponseEntity.ok(credentials);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar credencial por ID", description = "Retorna credenciais de um aluno específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Credencial encontrada"),
            @ApiResponse(responseCode = "404", description = "Credencial não encontrada")
    })
    public ResponseEntity<StudentAccessDTO> getCredentialsById(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id) {
        try {
            StudentAccessDTO credentials = studentAccessService.getCredentialsById(id);
            return ResponseEntity.ok(credentials);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/generate/{leadId}")
    @Operation(summary = "Gerar credenciais", description = "Gera novas credenciais para um lead")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Credenciais geradas"),
            @ApiResponse(responseCode = "400", description = "Lead não encontrado ou já possui credenciais")
    })
    public ResponseEntity<?> generateCredentials(
            @Parameter(description = "UUID do lead") @PathVariable UUID leadId) {
        try {
            StudentAccessDTO credentials = studentAccessService.generateCredentials(leadId);
            return ResponseEntity.status(HttpStatus.CREATED).body(credentials);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}/password")
    @Operation(summary = "Atualizar senha", description = "Define uma nova senha para o aluno")
    public ResponseEntity<?> updatePassword(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id, 
            @RequestBody String newPassword) {
        try {
            StudentAccessDTO updated = studentAccessService.updatePassword(id, newPassword);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/{id}/regenerate-password")
    @Operation(summary = "Regenerar senha", description = "Gera uma nova senha aleatória")
    public ResponseEntity<?> regeneratePassword(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id) {
        try {
            StudentAccessDTO updated = studentAccessService.regeneratePassword(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PatchMapping("/{id}/toggle-access")
    @Operation(summary = "Alternar acesso", description = "Ativa ou desativa o acesso do aluno")
    public ResponseEntity<?> toggleAccess(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id) {
        try {
            StudentAccessDTO updated = studentAccessService.toggleAccess(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PatchMapping("/{id}/mark-sent")
    @Operation(summary = "Marcar como enviada", description = "Marca que as credenciais foram enviadas ao aluno")
    public ResponseEntity<?> markAsSent(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id) {
        try {
            StudentAccessDTO updated = studentAccessService.markAsSent(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar credenciais", description = "Remove credenciais de acesso")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Credenciais removidas"),
            @ApiResponse(responseCode = "404", description = "Credenciais não encontradas")
    })
    public ResponseEntity<Void> deleteCredentials(
            @Parameter(description = "UUID da credencial") @PathVariable UUID id) {
        try {
            studentAccessService.deleteCredentials(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
