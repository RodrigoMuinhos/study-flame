package com.crmflame.api.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crmflame.api.dto.AdminLoginRequest;
import com.crmflame.api.dto.AdminLoginResponse;
import com.crmflame.api.dto.AdminUserDTO;
import com.crmflame.api.dto.CreateAdminRequest;
import com.crmflame.api.model.AdminUser;
import com.crmflame.api.model.AdminUser.Role;
import com.crmflame.api.repository.AdminUserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminUserService {
    
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * Inicializa o primeiro super admin se não existir nenhum
     * A senha inicial é definida via variável de ambiente
     */
    @PostConstruct
    @Transactional
    public void initializeDefaultAdmin() {
        if (adminUserRepository.countActiveSuperAdmins() == 0) {
            String defaultPassword = System.getenv("ADMIN_DEFAULT_PASSWORD");
            
            if (defaultPassword == null || defaultPassword.isBlank()) {
                // Gera senha aleatória segura se não definida via variável de ambiente
                defaultPassword = generateSecurePassword();
                log.warn("⚠️ ATENÇÃO: Senha gerada automaticamente: {}", defaultPassword);
                log.warn("⚠️ Defina ADMIN_DEFAULT_PASSWORD como variável de ambiente para produção!");
            }
            
            AdminUser superAdmin = AdminUser.builder()
                    .username("admin")
                    .email("admin@crmflame.com")
                    .password(passwordEncoder.encode(defaultPassword))
                    .name("Administrador")
                    .role(Role.SUPER_ADMIN)
                    .isActive(true)
                    .build();
            
            adminUserRepository.save(superAdmin);
            log.info("✅ Super Admin inicial criado: username='admin', email='admin@crmflame.com'");
        } else {
            // Migrar senhas antigas não criptografadas para BCrypt
            migrateUnencryptedPasswords();
        }
    }
    
    /**
     * Migra senhas antigas que não estão em formato BCrypt
     */
    private void migrateUnencryptedPasswords() {
        List<AdminUser> admins = adminUserRepository.findAll();
        for (AdminUser admin : admins) {
            // Se a senha não começa com $2a$ ou $2b$, não está criptografada
            if (admin.getPassword() != null && !admin.getPassword().startsWith("$2")) {
                String defaultPassword = System.getenv("ADMIN_DEFAULT_PASSWORD");
                if (defaultPassword == null || defaultPassword.isBlank()) {
                    defaultPassword = generateSecurePassword();
                    log.warn("⚠️ Nova senha gerada para {}: {}", admin.getUsername(), defaultPassword);
                }
                admin.setPassword(passwordEncoder.encode(defaultPassword));
                adminUserRepository.save(admin);
                log.info("🔐 Senha migrada para BCrypt: {}", admin.getUsername());
            }
        }
    }
    
    /**
     * Autentica um admin por username/email e senha
     */
    @Transactional
    public AdminLoginResponse authenticate(AdminLoginRequest request) {
        Optional<AdminUser> adminOpt = adminUserRepository
                .findByUsernameOrEmail(request.getUsername(), request.getUsername());
        
        if (adminOpt.isEmpty()) {
            log.warn("Tentativa de login com usuário inexistente: {}", request.getUsername());
            return AdminLoginResponse.error("Credenciais inválidas");
        }
        
        AdminUser admin = adminOpt.get();
        
        if (!admin.getIsActive()) {
            log.warn("Tentativa de login com conta desativada: {}", admin.getUsername());
            return AdminLoginResponse.error("Conta desativada");
        }
        
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            log.warn("Senha incorreta para usuário: {}", admin.getUsername());
            return AdminLoginResponse.error("Credenciais inválidas");
        }
        
        // Atualizar dados de login
        admin.setLastLoginAt(LocalDateTime.now());
        admin.setLoginCount(admin.getLoginCount() + 1);
        adminUserRepository.save(admin);
        
        log.info("Login admin realizado: {} ({})", admin.getUsername(), admin.getRole());
        
        // Gerar tokens (simples por enquanto - pode ser JWT depois)
        String accessToken = UUID.randomUUID().toString();
        String refreshToken = UUID.randomUUID().toString();
        
        return AdminLoginResponse.success(accessToken, refreshToken, AdminUserDTO.fromEntity(admin));
    }
    
    /**
     * Cria um novo admin
     */
    @Transactional
    public AdminUserDTO createAdmin(CreateAdminRequest request, UUID createdBy) {
        if (adminUserRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username já está em uso");
        }
        
        if (adminUserRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso");
        }
        
        Role role;
        try {
            role = Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            role = Role.ADMIN;
        }
        
        AdminUser admin = AdminUser.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(role)
                .isActive(true)
                .createdBy(createdBy)
                .build();
        
        admin = adminUserRepository.save(admin);
        log.info("Novo admin criado: {} ({}) por {}", admin.getUsername(), admin.getRole(), createdBy);
        
        return AdminUserDTO.fromEntity(admin);
    }
    
    /**
     * Lista todos os admins ativos
     */
    public List<AdminUserDTO> getAllActiveAdmins() {
        return adminUserRepository.findByIsActiveTrue()
                .stream()
                .map(AdminUserDTO::fromEntity)
                .toList();
    }
    
    /**
     * Lista todos os admins
     */
    public List<AdminUserDTO> getAllAdmins() {
        return adminUserRepository.findAll()
                .stream()
                .map(AdminUserDTO::fromEntity)
                .toList();
    }
    
    /**
     * Busca admin por ID
     */
    public Optional<AdminUserDTO> getAdminById(UUID id) {
        return adminUserRepository.findById(id)
                .map(AdminUserDTO::fromEntity);
    }
    
    /**
     * Atualiza senha do admin
     */
    @Transactional
    public AdminUserDTO updatePassword(UUID adminId, String newPassword) {
        AdminUser admin = adminUserRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        
        admin.setPassword(passwordEncoder.encode(newPassword));
        admin.setPasswordChangedAt(LocalDateTime.now());
        admin = adminUserRepository.save(admin);
        
        log.info("Senha atualizada para admin: {}", admin.getUsername());
        
        return AdminUserDTO.fromEntity(admin);
    }
    
    /**
     * Ativa/Desativa admin
     */
    @Transactional
    public AdminUserDTO toggleActive(UUID adminId) {
        AdminUser admin = adminUserRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        
        // Não permite desativar o último super admin
        if (admin.getRole() == Role.SUPER_ADMIN && admin.getIsActive()) {
            if (adminUserRepository.countActiveSuperAdmins() <= 1) {
                throw new RuntimeException("Não é possível desativar o último Super Admin");
            }
        }
        
        admin.setIsActive(!admin.getIsActive());
        admin = adminUserRepository.save(admin);
        
        log.info("Admin {} {}", admin.getUsername(), admin.getIsActive() ? "ativado" : "desativado");
        
        return AdminUserDTO.fromEntity(admin);
    }
    
    /**
     * Atualiza role do admin
     */
    @Transactional
    public AdminUserDTO updateRole(UUID adminId, String newRole) {
        AdminUser admin = adminUserRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        
        Role role;
        try {
            role = Role.valueOf(newRole.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Role inválida: " + newRole);
        }
        
        // Não permite rebaixar o último super admin
        if (admin.getRole() == Role.SUPER_ADMIN && role != Role.SUPER_ADMIN) {
            if (adminUserRepository.countActiveSuperAdmins() <= 1) {
                throw new RuntimeException("Não é possível rebaixar o último Super Admin");
            }
        }
        
        admin.setRole(role);
        admin = adminUserRepository.save(admin);
        
        log.info("Role de {} alterada para {}", admin.getUsername(), role);
        
        return AdminUserDTO.fromEntity(admin);
    }
    
    /**
     * Deleta admin (soft delete - apenas desativa)
     */
    @Transactional
    public void deleteAdmin(UUID adminId) {
        AdminUser admin = adminUserRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
        
        if (admin.getRole() == Role.SUPER_ADMIN) {
            if (adminUserRepository.countActiveSuperAdmins() <= 1) {
                throw new RuntimeException("Não é possível deletar o último Super Admin");
            }
        }
        
        admin.setIsActive(false);
        adminUserRepository.save(admin);
        
        log.info("Admin {} deletado (desativado)", admin.getUsername());
    }
    
    /**
     * Estatísticas de admins
     */
    public record AdminStats(
        long total,
        long active,
        long superAdmins,
        long admins,
        long managers,
        long support
    ) {}
    
    public AdminStats getStats() {
        List<AdminUser> all = adminUserRepository.findAll();
        
        return new AdminStats(
            all.size(),
            all.stream().filter(AdminUser::getIsActive).count(),
            all.stream().filter(a -> a.getRole() == Role.SUPER_ADMIN && a.getIsActive()).count(),
            all.stream().filter(a -> a.getRole() == Role.ADMIN && a.getIsActive()).count(),
            all.stream().filter(a -> a.getRole() == Role.MANAGER && a.getIsActive()).count(),
            all.stream().filter(a -> a.getRole() == Role.SUPPORT && a.getIsActive()).count()
        );
    }
    
    /**
     * Gera uma senha aleatória segura de 12 caracteres
     */
    private String generateSecurePassword() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
