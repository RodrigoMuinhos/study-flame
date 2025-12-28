package com.crmflame.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminLoginRequest {
    
    @NotBlank(message = "Username ou email é obrigatório")
    private String username; // Pode ser username ou email
    
    @NotBlank(message = "Senha é obrigatória")
    private String password;
}
