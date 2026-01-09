package com.crmflame.api.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.AdminLoginRequest;
import com.crmflame.api.dto.AdminLoginResponse;
import com.crmflame.api.dto.AdminUserDTO;
import com.crmflame.api.dto.CreateAdminRequest;
import com.crmflame.api.service.AdminUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Tag(name = "Admin Users", description = "Gerenciamento de administradores do sistema")
public class AdminController {
    
    private final AdminUserService adminUserService;
    
    @PostMapping("/login")
    @Operation(summary = "Login de admin", description = "Autentica um administrador usando username/email e senha")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas ou conta desativada")
    })
    public ResponseEntity<AdminLoginResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        AdminLoginResponse response = adminUserService.authenticate(request);
        
        if (response.accessToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/users")
    @Operation(summary = "Criar admin", description = "Cria um novo administrador (apenas Super Admin)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Admin criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos ou username/email já em uso")
    })
    public ResponseEntity<?> createAdmin(
            @Valid @RequestBody CreateAdminRequest request,
            @Parameter(description = "ID do admin que está criando") 
            @org.springframework.web.bind.annotation.RequestHeader(value = "X-Admin-Id", required = false) String adminId) {
        try {
            UUID createdBy = adminId != null ? UUID.fromString(adminId) : null;
            AdminUserDTO admin = adminUserService.createAdmin(request, createdBy);
            return ResponseEntity.status(HttpStatus.CREATED).body(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/users")
    @Operation(summary = "Listar admins", description = "Lista todos os administradores")
    public ResponseEntity<List<AdminUserDTO>> getAllAdmins() {
        return ResponseEntity.ok(adminUserService.getAllAdmins());
    }
    
    @GetMapping("/users/active")
    @Operation(summary = "Listar admins ativos", description = "Lista apenas administradores ativos")
    public ResponseEntity<List<AdminUserDTO>> getActiveAdmins() {
        return ResponseEntity.ok(adminUserService.getAllActiveAdmins());
    }
    
    @GetMapping("/users/{id}")
    @Operation(summary = "Buscar admin", description = "Busca um administrador pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Admin encontrado"),
            @ApiResponse(responseCode = "404", description = "Admin não encontrado")
    })
    public ResponseEntity<AdminUserDTO> getAdminById(
            @Parameter(description = "UUID do admin") @PathVariable UUID id) {
        return adminUserService.getAdminById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/users/{id}/password")
    @Operation(summary = "Atualizar senha", description = "Atualiza a senha de um administrador")
    public ResponseEntity<?> updatePassword(
            @Parameter(description = "UUID do admin") @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        try {
            String newPassword = body.get("password");
            if (newPassword == null || newPassword.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Senha é obrigatória"));
            }
            AdminUserDTO admin = adminUserService.updatePassword(id, newPassword);
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PatchMapping("/users/{id}/toggle-active")
    @Operation(summary = "Ativar/Desativar admin", description = "Alterna o status ativo do administrador")
    public ResponseEntity<?> toggleActive(
            @Parameter(description = "UUID do admin") @PathVariable UUID id) {
        try {
            AdminUserDTO admin = adminUserService.toggleActive(id);
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PatchMapping("/users/{id}/role")
    @Operation(summary = "Atualizar role", description = "Atualiza a role do administrador")
    public ResponseEntity<?> updateRole(
            @Parameter(description = "UUID do admin") @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        try {
            String newRole = body.get("role");
            if (newRole == null || newRole.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Role é obrigatória"));
            }
            AdminUserDTO admin = adminUserService.updateRole(id, newRole);
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/users/{id}")
    @Operation(summary = "Deletar admin", description = "Desativa um administrador (soft delete)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Admin deletado"),
            @ApiResponse(responseCode = "400", description = "Não é possível deletar")
    })
    public ResponseEntity<?> deleteAdmin(
            @Parameter(description = "UUID do admin") @PathVariable UUID id) {
        try {
            adminUserService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/stats")
    @Operation(summary = "Estatísticas", description = "Retorna estatísticas de administradores")
    public ResponseEntity<AdminUserService.AdminStats> getStats() {
        return ResponseEntity.ok(adminUserService.getStats());
    }
}
