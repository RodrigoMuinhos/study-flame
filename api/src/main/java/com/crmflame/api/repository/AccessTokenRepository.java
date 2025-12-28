package com.crmflame.api.repository;

import com.crmflame.api.model.AccessToken;
import com.crmflame.api.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccessTokenRepository extends JpaRepository<AccessToken, UUID> {
    
    /**
     * Busca token pela string do token
     */
    Optional<AccessToken> findByToken(String token);
    
    /**
     * Busca token ativo pela string do token
     */
    Optional<AccessToken> findByTokenAndIsActiveTrue(String token);
    
    /**
     * Busca todos os tokens de um lead
     */
    List<AccessToken> findByLeadOrderByCreatedAtDesc(Lead lead);
    
    /**
     * Busca token ativo de um lead
     */
    Optional<AccessToken> findByLeadAndIsActiveTrue(Lead lead);
    
    /**
     * Busca tokens por CPF do lead
     */
    @Query("SELECT t FROM AccessToken t WHERE t.lead.cpf = :cpf ORDER BY t.createdAt DESC")
    List<AccessToken> findByLeadCpf(@Param("cpf") String cpf);
    
    /**
     * Busca token ativo por CPF do lead
     */
    @Query("SELECT t FROM AccessToken t WHERE t.lead.cpf = :cpf AND t.isActive = true")
    Optional<AccessToken> findActiveByLeadCpf(@Param("cpf") String cpf);
    
    /**
     * Verifica se existe token ativo para o lead
     */
    boolean existsByLeadAndIsActiveTrue(Lead lead);
    
    /**
     * Busca todos os tokens expirados que ainda estão ativos
     */
    @Query("SELECT t FROM AccessToken t WHERE t.isActive = true AND t.expiresAt < :now")
    List<AccessToken> findExpiredActiveTokens(@Param("now") LocalDateTime now);
    
    /**
     * Desativa todos os tokens expirados
     */
    @Modifying
    @Query("UPDATE AccessToken t SET t.isActive = false, t.revokedAt = :now, t.revokedReason = 'EXPIRED' WHERE t.isActive = true AND t.expiresAt < :now")
    int deactivateExpiredTokens(@Param("now") LocalDateTime now);
    
    /**
     * Desativa todos os tokens ativos de um lead (usado antes de gerar novo token)
     */
    @Modifying
    @Query("UPDATE AccessToken t SET t.isActive = false, t.revokedAt = :now, t.revokedReason = 'NEW_TOKEN_GENERATED' WHERE t.lead = :lead AND t.isActive = true")
    int deactivateAllActiveTokensForLead(@Param("lead") Lead lead, @Param("now") LocalDateTime now);
    
    /**
     * Conta tokens ativos
     */
    long countByIsActiveTrue();
    
    /**
     * Conta tokens expirados
     */
    @Query("SELECT COUNT(t) FROM AccessToken t WHERE t.expiresAt < :now")
    long countExpiredTokens(@Param("now") LocalDateTime now);
}
