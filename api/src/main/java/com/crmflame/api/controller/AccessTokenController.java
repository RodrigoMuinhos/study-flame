package com.crmflame.api.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.AccessTokenDTO;
import com.crmflame.api.dto.GenerateTokenRequest;
import com.crmflame.api.dto.ValidateTokenRequest;
import com.crmflame.api.dto.ValidateTokenResponse;
import com.crmflame.api.model.AccessToken;
import com.crmflame.api.model.Lead;
import com.crmflame.api.service.AccessTokenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/tokens")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "AWS Tokens", description = "Geração e validação de tokens para AWS Study")
public class AccessTokenController {
    
    private final AccessTokenService accessTokenService;
    
    @PostMapping("/generate")
    @Operation(summary = "Gerar token AWS", description = "Gera um novo token de acesso ao AWS Study para um aluno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token gerado com sucesso"),
            @ApiResponse(responseCode = "400", description = "CPF inválido ou aluno não encontrado")
    })
    public ResponseEntity<?> generateToken(@Valid @RequestBody GenerateTokenRequest request) {
        try {
            AccessToken token = accessTokenService.generateTokenByCpf(request.getCpf());
            return ResponseEntity.ok(convertToDTO(token));
        } catch (RuntimeException e) {
            log.error("Erro ao gerar token para CPF {}: {}", request.getCpf(), e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/validate")
    @Operation(summary = "Validar token", description = "Valida um token e retorna dados do usuário se válido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resultado da validação")
    })
    public ResponseEntity<ValidateTokenResponse> validateToken(@Valid @RequestBody ValidateTokenRequest request) {
        Optional<AccessToken> tokenOpt = accessTokenService.validateToken(request.getToken());
        
        if (tokenOpt.isEmpty()) {
            return ResponseEntity.ok(ValidateTokenResponse.invalid("Token inválido ou expirado"));
        }
        
        AccessToken token = tokenOpt.get();
        Lead lead = token.getLead();
        
        return ResponseEntity.ok(ValidateTokenResponse.valid(
                lead.getId(),
                lead.getName(),
                lead.getEmail(),
                lead.getCpf(),
                token.getExpiresAt(),
                token.getDaysUntilExpiration()
        ));
    }
    
    @GetMapping("/cpf/{cpf}")
    @Operation(summary = "Buscar token por CPF", description = "Retorna token ativo de um aluno pelo CPF")
    public ResponseEntity<?> getTokenByCpf(
            @Parameter(description = "CPF do aluno") @PathVariable String cpf) {
        Optional<AccessToken> tokenOpt = accessTokenService.getActiveTokenByCpf(cpf);
        
        if (tokenOpt.isEmpty()) {
            return ResponseEntity.ok(Map.of(
                    "hasActiveToken", false,
                    "message", "Nenhum token ativo encontrado"
            ));
        }
        
        return ResponseEntity.ok(Map.of(
                "hasActiveToken", true,
                "token", convertToDTO(tokenOpt.get())
        ));
    }
    
    @GetMapping("/cpf/{cpf}/history")
    @Operation(summary = "Histórico de tokens", description = "Retorna todos os tokens de um aluno")
    public ResponseEntity<List<AccessTokenDTO>> getTokenHistoryByCpf(
            @Parameter(description = "CPF do aluno") @PathVariable String cpf) {
        List<AccessToken> tokens = accessTokenService.getAllTokensByCpf(cpf);
        return ResponseEntity.ok(tokens.stream().map(this::convertToDTO).toList());
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Revogar token por ID", description = "Revoga um token específico pelo UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token revogado"),
            @ApiResponse(responseCode = "404", description = "Token não encontrado")
    })
    public ResponseEntity<?> revokeToken(
            @Parameter(description = "UUID do token") @PathVariable UUID id,
            @Parameter(description = "Motivo da revogação") 
            @RequestParam(required = false, defaultValue = "REVOGADO_PELO_ADMIN") String reason) {
        
        boolean revoked = accessTokenService.revokeToken(id, reason);
        
        if (!revoked) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Token revogado com sucesso"
        ));
    }
    
    @DeleteMapping("/revoke/{token}")
    @Operation(summary = "Revogar token por string", description = "Revoga um token pela string do token")
    public ResponseEntity<?> revokeTokenByString(
            @Parameter(description = "String do token") @PathVariable String token,
            @Parameter(description = "Motivo da revogação") 
            @RequestParam(required = false, defaultValue = "REVOGADO_PELO_ADMIN") String reason) {
        
        boolean revoked = accessTokenService.revokeTokenByString(token, reason);
        
        if (!revoked) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Token revogado com sucesso"
        ));
    }
    
    @GetMapping("/stats")
    @Operation(summary = "Estatísticas de tokens", description = "Retorna contagem de tokens ativos, expirados e total")
    public ResponseEntity<?> getStats() {
        AccessTokenService.TokenStats stats = accessTokenService.getTokenStats();
        return ResponseEntity.ok(Map.of(
                "activeTokens", stats.active(),
                "expiredTokens", stats.expired(),
                "totalTokens", stats.total()
        ));
    }
    
    /**
     * Lista todos os tokens ativos
     */
    @GetMapping("/active")
    public ResponseEntity<List<AccessTokenDTO>> getAllActiveTokens() {
        List<AccessToken> tokens = accessTokenService.getAllActiveTokens();
        return ResponseEntity.ok(tokens.stream().map(this::convertToDTO).toList());
    }
    
    /**
     * Converte entidade para DTO
     */
    private AccessTokenDTO convertToDTO(AccessToken token) {
        Lead lead = token.getLead();
        return new AccessTokenDTO(
                token.getId(),
                token.getToken(),
                lead.getId(),
                lead.getName(),
                lead.getEmail(),
                lead.getCpf(),
                token.getIsActive(),
                token.getCreatedAt(),
                token.getExpiresAt(),
                token.getLastUsedAt(),
                token.getDaysUntilExpiration(),
                token.isExpired()
        );
    }
}
