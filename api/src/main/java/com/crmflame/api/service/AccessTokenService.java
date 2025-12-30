package com.crmflame.api.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.crmflame.api.model.AccessToken;
import com.crmflame.api.model.Lead;
import com.crmflame.api.repository.AccessTokenRepository;
import com.crmflame.api.repository.LeadRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessTokenService {
    
    private final AccessTokenRepository accessTokenRepository;
    private final LeadRepository leadRepository;
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    
    /**
     * Gera um token no formato XXXX-XXXXXX-XXXX
     */
    private String generateTokenString() {
        StringBuilder token = new StringBuilder();
        
        // Primeira parte: 4 caracteres
        for (int i = 0; i < 4; i++) {
            token.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        token.append("-");
        
        // Segunda parte: 6 caracteres
        for (int i = 0; i < 6; i++) {
            token.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        token.append("-");
        
        // Terceira parte: 4 caracteres
        for (int i = 0; i < 4; i++) {
            token.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        
        return token.toString();
    }
    
    /**
     * Gera um token único (verifica se já não existe)
     */
    private String generateUniqueToken() {
        String token;
        do {
            token = generateTokenString();
        } while (accessTokenRepository.findByToken(token).isPresent());
        return token;
    }
    
    /**
     * Gera um novo token para um lead baseado no CPF
     */
    @Transactional
    public AccessToken generateTokenByCpf(String cpf) {
        // Busca o lead pelo CPF
        Lead lead = leadRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Lead não encontrado com CPF: " + cpf));
        
        return generateTokenForLead(lead);
    }
    
    /**
     * Gera um novo token para um lead
     */
    @Transactional
    public AccessToken generateTokenForLead(Lead lead) {
        // Desativa todos os tokens anteriores deste lead
        int deactivated = accessTokenRepository.deactivateAllActiveTokensForLead(lead, LocalDateTime.now());
        if (deactivated > 0) {
            log.info("Desativados {} tokens anteriores para lead: {}", deactivated, lead.getCpf());
        }
        
        // Cria novo token
        AccessToken accessToken = new AccessToken();
        accessToken.setToken(generateUniqueToken());
        accessToken.setLead(lead);
        accessToken.setIsActive(true);
        
        AccessToken saved = accessTokenRepository.save(accessToken);
        log.info("Token gerado para lead {}: {}", lead.getCpf(), saved.getToken());
        
        return saved;
    }
    
    /**
     * Valida um token e retorna os dados do lead se válido
     */
    @Transactional
    public Optional<AccessToken> validateToken(String token) {
        Optional<AccessToken> accessTokenOpt = accessTokenRepository.findByTokenAndIsActiveTrue(token);
        
        if (accessTokenOpt.isEmpty()) {
            log.warn("Token não encontrado ou inativo: {}", token);
            return Optional.empty();
        }
        
        AccessToken accessToken = accessTokenOpt.get();
        
        // Verifica se expirou
        if (accessToken.isExpired()) {
            log.warn("Token expirado: {}", token);
            accessToken.setIsActive(false);
            accessToken.setRevokedAt(LocalDateTime.now());
            accessToken.setRevokedReason("EXPIRED");
            accessTokenRepository.save(accessToken);
            return Optional.empty();
        }
        
        // Atualiza último uso
        accessToken.setLastUsedAt(LocalDateTime.now());
        accessTokenRepository.save(accessToken);
        
        log.info("Token validado com sucesso para lead: {}", accessToken.getLead().getCpf());
        return Optional.of(accessToken);
    }
    
    /**
     * Revoga um token manualmente
     */
    @Transactional
    public boolean revokeToken(UUID tokenId, String reason) {
        Optional<AccessToken> tokenOpt = accessTokenRepository.findById(tokenId);
        
        if (tokenOpt.isEmpty()) {
            return false;
        }
        
        AccessToken token = tokenOpt.get();
        token.setIsActive(false);
        token.setRevokedAt(LocalDateTime.now());
        token.setRevokedReason(reason != null ? reason : "MANUALLY_REVOKED");
        accessTokenRepository.save(token);
        
        log.info("Token {} revogado manualmente. Motivo: {}", token.getToken(), reason);
        return true;
    }
    
    /**
     * Revoga token pela string do token
     */
    @Transactional
    public boolean revokeTokenByString(String tokenString, String reason) {
        Optional<AccessToken> tokenOpt = accessTokenRepository.findByToken(tokenString);
        
        if (tokenOpt.isEmpty()) {
            return false;
        }
        
        return revokeToken(tokenOpt.get().getId(), reason);
    }
    
    /**
     * Busca token ativo por CPF
     */
    public Optional<AccessToken> getActiveTokenByCpf(String cpf) {
        return accessTokenRepository.findActiveByLeadCpf(cpf);
    }
    
    /**
     * Busca todos os tokens de um CPF
     */
    public List<AccessToken> getAllTokensByCpf(String cpf) {
        return accessTokenRepository.findByLeadCpf(cpf);
    }
    
    /**
     * Busca token por ID
     */
    public Optional<AccessToken> getTokenById(UUID id) {
        return accessTokenRepository.findById(id);
    }
    
    /**
     * Lista todos os tokens ativos
     */
    public List<AccessToken> getAllActiveTokens() {
        return accessTokenRepository.findAll().stream()
                .filter(AccessToken::isValid)
                .toList();
    }
    
    /**
     * Job agendado para desativar tokens expirados (executa todo dia à meia-noite)
     */
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void deactivateExpiredTokens() {
        int count = accessTokenRepository.deactivateExpiredTokens(LocalDateTime.now());
        if (count > 0) {
            log.info("Job: {} tokens expirados foram desativados", count);
        }
    }
    
    /**
     * Estatísticas de tokens
     */
    public TokenStats getTokenStats() {
        long activeTokens = accessTokenRepository.countByIsActiveTrue();
        long expiredTokens = accessTokenRepository.countExpiredTokens(LocalDateTime.now());
        long totalTokens = accessTokenRepository.count();
        
        return new TokenStats(activeTokens, expiredTokens, totalTokens);
    }
    
    public record TokenStats(long active, long expired, long total) {}
}
