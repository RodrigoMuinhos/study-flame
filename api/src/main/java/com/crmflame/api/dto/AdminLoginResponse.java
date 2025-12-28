package com.crmflame.api.dto;

import java.util.UUID;

public record AdminLoginResponse(
    String accessToken,
    String refreshToken,
    AdminUserDTO admin,
    String message
) {
    public static AdminLoginResponse success(String accessToken, String refreshToken, AdminUserDTO admin) {
        return new AdminLoginResponse(accessToken, refreshToken, admin, "Login realizado com sucesso");
    }
    
    public static AdminLoginResponse error(String message) {
        return new AdminLoginResponse(null, null, null, message);
    }
}
