package com.crmflame.api.service;

import com.crmflame.api.dto.StudentAccessDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentAccess;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentAccessRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentAccessService {
    
    private final StudentAccessRepository studentAccessRepository;
    private final LeadRepository leadRepository;
    
    private static final String CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    
    /**
     * Gera uma senha aleatória de 8 caracteres
     */
    private String generatePassword() {
        StringBuilder password = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            password.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return password.toString();
    }
    
    /**
     * Gera credenciais para um lead
     */
    @Transactional
    public StudentAccessDTO generateCredentials(UUID leadId) {
        // Verificar se o lead existe
        Lead lead = leadRepository.findById(leadId)
            .orElseThrow(() -> new RuntimeException("Lead não encontrado"));
        
        // Verificar se já tem credenciais
        if (studentAccessRepository.existsByLeadId(leadId)) {
            throw new RuntimeException("Lead já possui credenciais");
        }
        
        // Criar credenciais
        StudentAccess access = new StudentAccess();
        access.setLead(lead);
        access.setPassword(generatePassword());
        access.setIsActive(true);
        access.setCredentialsSent(false);
        
        StudentAccess saved = studentAccessRepository.save(access);
        
        log.info("Credenciais geradas para lead: {}", lead.getName());
        
        return toDTO(saved);
    }
    
    /**
     * Buscar todas as credenciais
     */
    public List<StudentAccessDTO> getAllCredentials() {
        return studentAccessRepository.findAll()
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    /**
     * Buscar credenciais por ID
     */
    public StudentAccessDTO getCredentialsById(UUID id) {
        StudentAccess access = studentAccessRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Credenciais não encontradas"));
        return toDTO(access);
    }
    
    /**
     * Atualizar senha
     */
    @Transactional
    public StudentAccessDTO updatePassword(UUID id, String newPassword) {
        StudentAccess access = studentAccessRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Credenciais não encontradas"));
        
        access.setPassword(newPassword);
        StudentAccess updated = studentAccessRepository.save(access);
        
        log.info("Senha atualizada para: {}", access.getLead().getName());
        
        return toDTO(updated);
    }
    
    /**
     * Regenerar senha
     */
    @Transactional
    public StudentAccessDTO regeneratePassword(UUID id) {
        StudentAccess access = studentAccessRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Credenciais não encontradas"));
        
        access.setPassword(generatePassword());
        StudentAccess updated = studentAccessRepository.save(access);
        
        log.info("Senha regenerada para: {}", access.getLead().getName());
        
        return toDTO(updated);
    }
    
    /**
     * Ativar/Desativar acesso
     */
    @Transactional
    public StudentAccessDTO toggleAccess(UUID id) {
        StudentAccess access = studentAccessRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Credenciais não encontradas"));
        
        access.setIsActive(!access.getIsActive());
        StudentAccess updated = studentAccessRepository.save(access);
        
        log.info("Acesso {} para: {}", 
            access.getIsActive() ? "ativado" : "desativado", 
            access.getLead().getName());
        
        return toDTO(updated);
    }
    
    /**
     * Marcar credenciais como enviadas
     */
    @Transactional
    public StudentAccessDTO markAsSent(UUID id) {
        StudentAccess access = studentAccessRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Credenciais não encontradas"));
        
        access.setCredentialsSent(true);
        StudentAccess updated = studentAccessRepository.save(access);
        
        log.info("Credenciais marcadas como enviadas para: {}", access.getLead().getName());
        
        return toDTO(updated);
    }
    
    /**
     * Deletar credenciais
     */
    @Transactional
    public void deleteCredentials(UUID id) {
        studentAccessRepository.deleteById(id);
        log.info("Credenciais deletadas: {}", id);
    }
    
    /**
     * Converter entidade para DTO
     */
    private StudentAccessDTO toDTO(StudentAccess access) {
        StudentAccessDTO dto = new StudentAccessDTO();
        dto.setId(access.getId());
        dto.setLeadId(access.getLead().getId());
        dto.setLeadName(access.getLead().getName());
        dto.setLeadEmail(access.getLead().getEmail());
        dto.setLeadCpf(access.getLead().getCpf());
        dto.setLeadPhone(access.getLead().getPhone());
        dto.setPassword(access.getPassword());
        dto.setIsActive(access.getIsActive());
        dto.setCredentialsSent(access.getCredentialsSent());
        dto.setLastLoginAt(access.getLastLoginAt());
        dto.setLoginCount(access.getLoginCount() != null ? access.getLoginCount() : 0);
        dto.setCreatedAt(access.getCreatedAt());
        dto.setUpdatedAt(access.getUpdatedAt());
        return dto;
    }
}
