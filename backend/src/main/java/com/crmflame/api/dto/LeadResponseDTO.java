package com.crmflame.api.dto;

import com.crmflame.api.model.LeadStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class LeadResponseDTO {
    
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String cpf;
    private String experience;
    private LeadStatus status;
    private String notes;
    private LocalDateTime createdAt;
}
