package com.crmflame.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateTokenResponse {
    private boolean valid;
    private String message;
    private UUID leadId;
    private String leadName;
    private String leadEmail;
    private String leadCpf;
    private LocalDateTime expiresAt;
    private long daysUntilExpiration;
    
    public static ValidateTokenResponse invalid(String message) {
        ValidateTokenResponse response = new ValidateTokenResponse();
        response.setValid(false);
        response.setMessage(message);
        return response;
    }
    
    public static ValidateTokenResponse valid(UUID leadId, String name, String email, String cpf, 
                                               LocalDateTime expiresAt, long daysUntilExpiration) {
        ValidateTokenResponse response = new ValidateTokenResponse();
        response.setValid(true);
        response.setMessage("Token válido");
        response.setLeadId(leadId);
        response.setLeadName(name);
        response.setLeadEmail(email);
        response.setLeadCpf(cpf);
        response.setExpiresAt(expiresAt);
        response.setDaysUntilExpiration(daysUntilExpiration);
        return response;
    }
}
