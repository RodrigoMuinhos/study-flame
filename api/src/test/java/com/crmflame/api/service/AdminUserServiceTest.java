package com.crmflame.api.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.crmflame.api.dto.AdminLoginRequest;
import com.crmflame.api.dto.AdminLoginResponse;
import com.crmflame.api.dto.AdminUserDTO;
import com.crmflame.api.dto.CreateAdminRequest;
import com.crmflame.api.model.AdminUser;
import com.crmflame.api.model.AdminUser.Role;
import com.crmflame.api.repository.AdminUserRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("AdminUserService Tests")
class AdminUserServiceTest {

    @Mock
    private AdminUserRepository adminUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminUserService adminUserService;

    private AdminUser adminUser;
    private AdminUser superAdmin;
    private UUID adminId;
    private UUID superAdminId;

    @BeforeEach
    void setUp() {
        adminId = UUID.randomUUID();
        superAdminId = UUID.randomUUID();

        adminUser = AdminUser.builder()
                .id(adminId)
                .username("testadmin")
                .email("testadmin@crmflame.com")
                .password("$2a$10$encodedPassword")
                .name("Test Admin")
                .role(Role.ADMIN)
                .isActive(true)
                .loginCount(0)
                .createdAt(LocalDateTime.now())
                .build();

        superAdmin = AdminUser.builder()
                .id(superAdminId)
                .username("superadmin")
                .email("superadmin@crmflame.com")
                .password("$2a$10$encodedPassword")
                .name("Super Admin")
                .role(Role.SUPER_ADMIN)
                .isActive(true)
                .loginCount(5)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Nested
    @DisplayName("authenticate()")
    class AuthenticateTests {

        @Test
        @DisplayName("Deve autenticar com username e senha corretos")
        void shouldAuthenticateWithValidCredentials() {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("password123");

            when(adminUserRepository.findByUsernameOrEmail("testadmin", "testadmin"))
                    .thenReturn(Optional.of(adminUser));
            when(passwordEncoder.matches("password123", adminUser.getPassword()))
                    .thenReturn(true);
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenReturn(adminUser);

            AdminLoginResponse response = adminUserService.authenticate(request);

            assertThat(response.accessToken()).isNotNull();
            assertThat(response.refreshToken()).isNotNull();
            assertThat(response.admin()).isNotNull();
            assertThat(response.admin().username()).isEqualTo("testadmin");
        }

        @Test
        @DisplayName("Deve autenticar com email e senha corretos")
        void shouldAuthenticateWithEmailAndValidPassword() {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin@crmflame.com");
            request.setPassword("password123");

            when(adminUserRepository.findByUsernameOrEmail("testadmin@crmflame.com", "testadmin@crmflame.com"))
                    .thenReturn(Optional.of(adminUser));
            when(passwordEncoder.matches("password123", adminUser.getPassword()))
                    .thenReturn(true);
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenReturn(adminUser);

            AdminLoginResponse response = adminUserService.authenticate(request);

            assertThat(response.accessToken()).isNotNull();
            assertThat(response.admin()).isNotNull();
        }

        @Test
        @DisplayName("Deve retornar erro para usuário inexistente")
        void shouldReturnErrorForNonExistentUser() {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("nonexistent");
            request.setPassword("password123");

            when(adminUserRepository.findByUsernameOrEmail("nonexistent", "nonexistent"))
                    .thenReturn(Optional.empty());

            AdminLoginResponse response = adminUserService.authenticate(request);

            assertThat(response.accessToken()).isNull();
            assertThat(response.message()).isEqualTo("Credenciais inválidas");
        }

        @Test
        @DisplayName("Deve retornar erro para senha incorreta")
        void shouldReturnErrorForWrongPassword() {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("wrongpassword");

            when(adminUserRepository.findByUsernameOrEmail("testadmin", "testadmin"))
                    .thenReturn(Optional.of(adminUser));
            when(passwordEncoder.matches("wrongpassword", adminUser.getPassword()))
                    .thenReturn(false);

            AdminLoginResponse response = adminUserService.authenticate(request);

            assertThat(response.accessToken()).isNull();
            assertThat(response.message()).isEqualTo("Credenciais inválidas");
        }

        @Test
        @DisplayName("Deve retornar erro para conta desativada")
        void shouldReturnErrorForInactiveAccount() {
            adminUser.setIsActive(false);
            
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("password123");

            when(adminUserRepository.findByUsernameOrEmail("testadmin", "testadmin"))
                    .thenReturn(Optional.of(adminUser));

            AdminLoginResponse response = adminUserService.authenticate(request);

            assertThat(response.accessToken()).isNull();
            assertThat(response.message()).isEqualTo("Conta desativada");
        }

        @Test
        @DisplayName("Deve incrementar loginCount após login bem-sucedido")
        void shouldIncrementLoginCountAfterSuccessfulLogin() {
            int initialCount = adminUser.getLoginCount();
            
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("password123");

            when(adminUserRepository.findByUsernameOrEmail("testadmin", "testadmin"))
                    .thenReturn(Optional.of(adminUser));
            when(passwordEncoder.matches("password123", adminUser.getPassword()))
                    .thenReturn(true);
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            adminUserService.authenticate(request);

            assertThat(adminUser.getLoginCount()).isEqualTo(initialCount + 1);
            assertThat(adminUser.getLastLoginAt()).isNotNull();
        }
    }

    @Nested
    @DisplayName("createAdmin()")
    class CreateAdminTests {

        @Test
        @DisplayName("Deve criar novo admin com sucesso")
        void shouldCreateAdminSuccessfully() {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("newadmin");
            request.setEmail("newadmin@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");
            request.setRole("ADMIN");

            when(adminUserRepository.existsByUsername("newadmin")).thenReturn(false);
            when(adminUserRepository.existsByEmail("newadmin@crmflame.com")).thenReturn(false);
            when(passwordEncoder.encode("password123")).thenReturn("$2a$10$encoded");
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> {
                        AdminUser saved = inv.getArgument(0);
                        saved.setId(UUID.randomUUID());
                        saved.setCreatedAt(LocalDateTime.now());
                        return saved;
                    });

            AdminUserDTO result = adminUserService.createAdmin(request, superAdminId);

            assertThat(result).isNotNull();
            assertThat(result.username()).isEqualTo("newadmin");
            assertThat(result.email()).isEqualTo("newadmin@crmflame.com");
            assertThat(result.role()).isEqualTo("ADMIN");
        }

        @Test
        @DisplayName("Deve lançar exceção para username duplicado")
        void shouldThrowExceptionForDuplicateUsername() {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("existingadmin");
            request.setEmail("new@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");

            when(adminUserRepository.existsByUsername("existingadmin")).thenReturn(true);

            assertThatThrownBy(() -> adminUserService.createAdmin(request, superAdminId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Username já está em uso");
        }

        @Test
        @DisplayName("Deve lançar exceção para email duplicado")
        void shouldThrowExceptionForDuplicateEmail() {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("newadmin");
            request.setEmail("existing@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");

            when(adminUserRepository.existsByUsername("newadmin")).thenReturn(false);
            when(adminUserRepository.existsByEmail("existing@crmflame.com")).thenReturn(true);

            assertThatThrownBy(() -> adminUserService.createAdmin(request, superAdminId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Email já está em uso");
        }

        @Test
        @DisplayName("Deve usar ADMIN como role padrão para role inválida")
        void shouldDefaultToAdminRoleForInvalidRole() {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("newadmin");
            request.setEmail("newadmin@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");
            request.setRole("INVALID_ROLE");

            when(adminUserRepository.existsByUsername("newadmin")).thenReturn(false);
            when(adminUserRepository.existsByEmail("newadmin@crmflame.com")).thenReturn(false);
            when(passwordEncoder.encode(anyString())).thenReturn("$2a$10$encoded");
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> {
                        AdminUser saved = inv.getArgument(0);
                        saved.setId(UUID.randomUUID());
                        return saved;
                    });

            AdminUserDTO result = adminUserService.createAdmin(request, null);

            assertThat(result.role()).isEqualTo("ADMIN");
        }
    }

    @Nested
    @DisplayName("getAllAdmins()")
    class GetAllAdminsTests {

        @Test
        @DisplayName("Deve retornar lista de todos os admins")
        void shouldReturnAllAdmins() {
            when(adminUserRepository.findAll()).thenReturn(List.of(adminUser, superAdmin));

            List<AdminUserDTO> result = adminUserService.getAllAdmins();

            assertThat(result).hasSize(2);
            assertThat(result).extracting(AdminUserDTO::username)
                    .containsExactlyInAnyOrder("testadmin", "superadmin");
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há admins")
        void shouldReturnEmptyListWhenNoAdmins() {
            when(adminUserRepository.findAll()).thenReturn(List.of());

            List<AdminUserDTO> result = adminUserService.getAllAdmins();

            assertThat(result).isEmpty();
        }
    }

    @Nested
    @DisplayName("getAllActiveAdmins()")
    class GetAllActiveAdminsTests {

        @Test
        @DisplayName("Deve retornar apenas admins ativos")
        void shouldReturnOnlyActiveAdmins() {
            when(adminUserRepository.findByIsActiveTrue()).thenReturn(List.of(adminUser));

            List<AdminUserDTO> result = adminUserService.getAllActiveAdmins();

            assertThat(result).hasSize(1);
            assertThat(result.get(0).username()).isEqualTo("testadmin");
        }
    }

    @Nested
    @DisplayName("getAdminById()")
    class GetAdminByIdTests {

        @Test
        @DisplayName("Deve retornar admin por ID")
        void shouldReturnAdminById() {
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));

            Optional<AdminUserDTO> result = adminUserService.getAdminById(adminId);

            assertThat(result).isPresent();
            assertThat(result.get().id()).isEqualTo(adminId);
        }

        @Test
        @DisplayName("Deve retornar empty para ID inexistente")
        void shouldReturnEmptyForNonExistentId() {
            UUID nonExistentId = UUID.randomUUID();
            when(adminUserRepository.findById(nonExistentId)).thenReturn(Optional.empty());

            Optional<AdminUserDTO> result = adminUserService.getAdminById(nonExistentId);

            assertThat(result).isEmpty();
        }
    }

    @Nested
    @DisplayName("updatePassword()")
    class UpdatePasswordTests {

        @Test
        @DisplayName("Deve atualizar senha do admin")
        void shouldUpdatePassword() {
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));
            when(passwordEncoder.encode("newPassword123")).thenReturn("$2a$10$newEncodedPassword");
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            AdminUserDTO result = adminUserService.updatePassword(adminId, "newPassword123");

            assertThat(result).isNotNull();
            assertThat(adminUser.getPasswordChangedAt()).isNotNull();
            verify(passwordEncoder).encode("newPassword123");
        }

        @Test
        @DisplayName("Deve lançar exceção para admin inexistente")
        void shouldThrowExceptionForNonExistentAdmin() {
            UUID nonExistentId = UUID.randomUUID();
            when(adminUserRepository.findById(nonExistentId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> adminUserService.updatePassword(nonExistentId, "newPassword"))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Admin não encontrado");
        }
    }

    @Nested
    @DisplayName("toggleActive()")
    class ToggleActiveTests {

        @Test
        @DisplayName("Deve desativar admin ativo")
        void shouldDeactivateActiveAdmin() {
            adminUser.setIsActive(true);
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            AdminUserDTO result = adminUserService.toggleActive(adminId);

            assertThat(result.isActive()).isFalse();
        }

        @Test
        @DisplayName("Deve ativar admin inativo")
        void shouldActivateInactiveAdmin() {
            adminUser.setIsActive(false);
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            AdminUserDTO result = adminUserService.toggleActive(adminId);

            assertThat(result.isActive()).isTrue();
        }

        @Test
        @DisplayName("Deve lançar exceção ao desativar último super admin")
        void shouldThrowExceptionWhenDeactivatingLastSuperAdmin() {
            when(adminUserRepository.findById(superAdminId)).thenReturn(Optional.of(superAdmin));
            when(adminUserRepository.countActiveSuperAdmins()).thenReturn(1L);

            assertThatThrownBy(() -> adminUserService.toggleActive(superAdminId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Não é possível desativar o último Super Admin");
        }

        @Test
        @DisplayName("Deve permitir desativar super admin se houver outros")
        void shouldAllowDeactivatingSuperAdminIfOthersExist() {
            when(adminUserRepository.findById(superAdminId)).thenReturn(Optional.of(superAdmin));
            when(adminUserRepository.countActiveSuperAdmins()).thenReturn(2L);
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            AdminUserDTO result = adminUserService.toggleActive(superAdminId);

            assertThat(result.isActive()).isFalse();
        }
    }

    @Nested
    @DisplayName("updateRole()")
    class UpdateRoleTests {

        @Test
        @DisplayName("Deve atualizar role do admin")
        void shouldUpdateRole() {
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            AdminUserDTO result = adminUserService.updateRole(adminId, "MANAGER");

            assertThat(result.role()).isEqualTo("MANAGER");
        }

        @Test
        @DisplayName("Deve lançar exceção para role inválida")
        void shouldThrowExceptionForInvalidRole() {
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));

            assertThatThrownBy(() -> adminUserService.updateRole(adminId, "INVALID"))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Role inválida");
        }

        @Test
        @DisplayName("Deve lançar exceção ao rebaixar último super admin")
        void shouldThrowExceptionWhenDemotingLastSuperAdmin() {
            when(adminUserRepository.findById(superAdminId)).thenReturn(Optional.of(superAdmin));
            when(adminUserRepository.countActiveSuperAdmins()).thenReturn(1L);

            assertThatThrownBy(() -> adminUserService.updateRole(superAdminId, "ADMIN"))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Não é possível rebaixar o último Super Admin");
        }
    }

    @Nested
    @DisplayName("deleteAdmin()")
    class DeleteAdminTests {

        @Test
        @DisplayName("Deve deletar (desativar) admin")
        void shouldDeleteAdmin() {
            when(adminUserRepository.findById(adminId)).thenReturn(Optional.of(adminUser));
            when(adminUserRepository.save(any(AdminUser.class)))
                    .thenAnswer(inv -> inv.getArgument(0));

            adminUserService.deleteAdmin(adminId);

            assertThat(adminUser.getIsActive()).isFalse();
            verify(adminUserRepository).save(adminUser);
        }

        @Test
        @DisplayName("Deve lançar exceção ao deletar último super admin")
        void shouldThrowExceptionWhenDeletingLastSuperAdmin() {
            when(adminUserRepository.findById(superAdminId)).thenReturn(Optional.of(superAdmin));
            when(adminUserRepository.countActiveSuperAdmins()).thenReturn(1L);

            assertThatThrownBy(() -> adminUserService.deleteAdmin(superAdminId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Não é possível deletar o último Super Admin");
        }

        @Test
        @DisplayName("Deve lançar exceção para admin inexistente")
        void shouldThrowExceptionForNonExistentAdmin() {
            UUID nonExistentId = UUID.randomUUID();
            when(adminUserRepository.findById(nonExistentId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> adminUserService.deleteAdmin(nonExistentId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessage("Admin não encontrado");
        }
    }

    @Nested
    @DisplayName("getStats()")
    class GetStatsTests {

        @Test
        @DisplayName("Deve retornar estatísticas corretas")
        void shouldReturnCorrectStats() {
            AdminUser manager = AdminUser.builder()
                    .id(UUID.randomUUID())
                    .role(Role.MANAGER)
                    .isActive(true)
                    .build();
            
            AdminUser support = AdminUser.builder()
                    .id(UUID.randomUUID())
                    .role(Role.SUPPORT)
                    .isActive(true)
                    .build();
            
            AdminUser inactiveAdmin = AdminUser.builder()
                    .id(UUID.randomUUID())
                    .role(Role.ADMIN)
                    .isActive(false)
                    .build();

            when(adminUserRepository.findAll())
                    .thenReturn(List.of(superAdmin, adminUser, manager, support, inactiveAdmin));

            AdminUserService.AdminStats stats = adminUserService.getStats();

            assertThat(stats.total()).isEqualTo(5);
            assertThat(stats.active()).isEqualTo(4);
            assertThat(stats.superAdmins()).isEqualTo(1);
            assertThat(stats.admins()).isEqualTo(1);
            assertThat(stats.managers()).isEqualTo(1);
            assertThat(stats.support()).isEqualTo(1);
        }

        @Test
        @DisplayName("Deve retornar zeros quando não há admins")
        void shouldReturnZerosWhenNoAdmins() {
            when(adminUserRepository.findAll()).thenReturn(List.of());

            AdminUserService.AdminStats stats = adminUserService.getStats();

            assertThat(stats.total()).isZero();
            assertThat(stats.active()).isZero();
            assertThat(stats.superAdmins()).isZero();
        }
    }
}
