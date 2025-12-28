package com.crmflame.api.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String cpf;
    private String password;
}
