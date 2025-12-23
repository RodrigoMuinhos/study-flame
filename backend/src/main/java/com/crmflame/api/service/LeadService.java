package com.crmflame.api.service;

import com.crmflame.api.dto.LeadRequestDTO;
import com.crmflame.api.dto.LeadResponseDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;

    @Transactional(readOnly = true)
    public List<LeadResponseDTO> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LeadResponseDTO getLeadById(UUID id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead não encontrado com id: " + id));
        return convertToDTO(lead);
    }

    @Transactional
    public LeadResponseDTO createLead(LeadRequestDTO dto) {
        if (leadRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado: " + dto.getEmail());
        }
        if (leadRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado: " + dto.getCpf());
        }

        Lead lead = new Lead();
        lead.setName(dto.getName());
        lead.setEmail(dto.getEmail());
        lead.setPhone(dto.getPhone());
        lead.setCpf(dto.getCpf());
        lead.setExperience(dto.getExperience());
        lead.setNotes(dto.getNotes());
        lead.setStatus(LeadStatus.NEW);

        Lead savedLead = leadRepository.save(lead);
        return convertToDTO(savedLead);
    }

    @Transactional
    public LeadResponseDTO updateLead(UUID id, LeadRequestDTO dto) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead não encontrado com id: " + id));

        // Verifica se email já existe (exceto para o próprio lead)
        if (!lead.getEmail().equals(dto.getEmail()) && leadRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado: " + dto.getEmail());
        }

        // Verifica se CPF já existe (exceto para o próprio lead)
        if (!lead.getCpf().equals(dto.getCpf()) && leadRepository.existsByCpf(dto.getCpf())) {
            throw new RuntimeException("CPF já cadastrado: " + dto.getCpf());
        }

        lead.setName(dto.getName());
        lead.setEmail(dto.getEmail());
        lead.setPhone(dto.getPhone());
        lead.setCpf(dto.getCpf());
        lead.setExperience(dto.getExperience());
        lead.setNotes(dto.getNotes());

        Lead updatedLead = leadRepository.save(lead);
        return convertToDTO(updatedLead);
    }

    @Transactional
    public LeadResponseDTO updateLeadStatus(UUID id, LeadStatus status) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead não encontrado com id: " + id));
        
        lead.setStatus(status);
        Lead updatedLead = leadRepository.save(lead);
        return convertToDTO(updatedLead);
    }

    @Transactional
    public void deleteLead(UUID id) {
        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead não encontrado com id: " + id);
        }
        leadRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<LeadResponseDTO> getLeadsByStatus(LeadStatus status) {
        return leadRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LeadResponseDTO> searchLeadsByName(String name) {
        return leadRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private LeadResponseDTO convertToDTO(Lead lead) {
        LeadResponseDTO dto = new LeadResponseDTO();
        dto.setId(lead.getId());
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCpf(lead.getCpf());
        dto.setExperience(lead.getExperience());
        dto.setStatus(lead.getStatus());
        dto.setNotes(lead.getNotes());
        dto.setCreatedAt(lead.getCreatedAt());
        return dto;
    }
}
