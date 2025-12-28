package com.crmflame.api.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.crmflame.api.dto.AdminLoginRequest;
import com.crmflame.api.dto.AdminLoginResponse;
import com.crmflame.api.dto.AdminUserDTO;
import com.crmflame.api.dto.CreateAdminRequest;
import com.crmflame.api.service.AdminUserService;
import com.crmflame.api.service.AdminUserService.AdminStats;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AdminController.class)
@DisplayName("AdminController Tests")
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AdminUserService adminUserService;

    private AdminUserDTO adminDTO;
    private AdminUserDTO superAdminDTO;
    private UUID adminId;
    private UUID superAdminId;

    @BeforeEach
    void setUp() {
        adminId = UUID.randomUUID();
        superAdminId = UUID.randomUUID();

        adminDTO = new AdminUserDTO(
                adminId,
                "testadmin",
                "testadmin@crmflame.com",
                "Test Admin",
                "ADMIN",
                true,
                LocalDateTime.now(),
                5,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        superAdminDTO = new AdminUserDTO(
                superAdminId,
                "superadmin",
                "superadmin@crmflame.com",
                "Super Admin",
                "SUPER_ADMIN",
                true,
                LocalDateTime.now(),
                10,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    @Nested
    @DisplayName("POST /admin/login")
    class LoginTests {

        @Test
        @DisplayName("Deve retornar 200 e tokens para login válido")
        void shouldReturn200AndTokensForValidLogin() throws Exception {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("password123");

            AdminLoginResponse response = AdminLoginResponse.success(
                    "access-token-uuid",
                    "refresh-token-uuid",
                    adminDTO
            );

            when(adminUserService.authenticate(any(AdminLoginRequest.class)))
                    .thenReturn(response);

            mockMvc.perform(post("/admin/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.accessToken").value("access-token-uuid"))
                    .andExpect(jsonPath("$.refreshToken").value("refresh-token-uuid"))
                    .andExpect(jsonPath("$.admin.username").value("testadmin"));
        }

        @Test
        @DisplayName("Deve retornar 401 para credenciais inválidas")
        void shouldReturn401ForInvalidCredentials() throws Exception {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("wrongpassword");

            AdminLoginResponse response = AdminLoginResponse.error("Credenciais inválidas");

            when(adminUserService.authenticate(any(AdminLoginRequest.class)))
                    .thenReturn(response);

            mockMvc.perform(post("/admin/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("Credenciais inválidas"));
        }

        @Test
        @DisplayName("Deve retornar 401 para conta desativada")
        void shouldReturn401ForDeactivatedAccount() throws Exception {
            AdminLoginRequest request = new AdminLoginRequest();
            request.setUsername("testadmin");
            request.setPassword("password123");

            AdminLoginResponse response = AdminLoginResponse.error("Conta desativada");

            when(adminUserService.authenticate(any(AdminLoginRequest.class)))
                    .thenReturn(response);

            mockMvc.perform(post("/admin/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isUnauthorized())
                    .andExpect(jsonPath("$.message").value("Conta desativada"));
        }

        @Test
        @DisplayName("Deve retornar 400 para request sem username")
        void shouldReturn400ForMissingUsername() throws Exception {
            String invalidRequest = "{\"password\": \"password123\"}";

            mockMvc.perform(post("/admin/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidRequest))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para request sem senha")
        void shouldReturn400ForMissingPassword() throws Exception {
            String invalidRequest = "{\"username\": \"testadmin\"}";

            mockMvc.perform(post("/admin/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidRequest))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("POST /admin/users")
    class CreateAdminTests {

        @Test
        @DisplayName("Deve retornar 201 ao criar admin com sucesso")
        void shouldReturn201WhenCreatingAdminSuccessfully() throws Exception {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("newadmin");
            request.setEmail("newadmin@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");
            request.setRole("ADMIN");

            when(adminUserService.createAdmin(any(CreateAdminRequest.class), any()))
                    .thenReturn(adminDTO);

            mockMvc.perform(post("/admin/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header("X-Admin-Id", superAdminId.toString())
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.username").exists());
        }

        @Test
        @DisplayName("Deve retornar 400 para username duplicado")
        void shouldReturn400ForDuplicateUsername() throws Exception {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("existingadmin");
            request.setEmail("new@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");

            when(adminUserService.createAdmin(any(CreateAdminRequest.class), any()))
                    .thenThrow(new RuntimeException("Username já está em uso"));

            mockMvc.perform(post("/admin/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Username já está em uso"));
        }

        @Test
        @DisplayName("Deve retornar 400 para email duplicado")
        void shouldReturn400ForDuplicateEmail() throws Exception {
            CreateAdminRequest request = new CreateAdminRequest();
            request.setUsername("newadmin");
            request.setEmail("existing@crmflame.com");
            request.setPassword("password123");
            request.setName("New Admin");

            when(adminUserService.createAdmin(any(CreateAdminRequest.class), any()))
                    .thenThrow(new RuntimeException("Email já está em uso"));

            mockMvc.perform(post("/admin/users")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Email já está em uso"));
        }
    }

    @Nested
    @DisplayName("GET /admin/users")
    class GetAllAdminsTests {

        @Test
        @DisplayName("Deve retornar lista de admins")
        void shouldReturnListOfAdmins() throws Exception {
            when(adminUserService.getAllAdmins())
                    .thenReturn(List.of(adminDTO, superAdminDTO));

            mockMvc.perform(get("/admin/users"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].username").exists())
                    .andExpect(jsonPath("$[1].username").exists());
        }

        @Test
        @DisplayName("Deve retornar lista vazia")
        void shouldReturnEmptyList() throws Exception {
            when(adminUserService.getAllAdmins()).thenReturn(List.of());

            mockMvc.perform(get("/admin/users"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    @Nested
    @DisplayName("GET /admin/users/active")
    class GetActiveAdminsTests {

        @Test
        @DisplayName("Deve retornar apenas admins ativos")
        void shouldReturnOnlyActiveAdmins() throws Exception {
            when(adminUserService.getAllActiveAdmins())
                    .thenReturn(List.of(adminDTO));

            mockMvc.perform(get("/admin/users/active"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(1))
                    .andExpect(jsonPath("$[0].isActive").value(true));
        }
    }

    @Nested
    @DisplayName("GET /admin/users/{id}")
    class GetAdminByIdTests {

        @Test
        @DisplayName("Deve retornar admin por ID")
        void shouldReturnAdminById() throws Exception {
            when(adminUserService.getAdminById(adminId))
                    .thenReturn(Optional.of(adminDTO));

            mockMvc.perform(get("/admin/users/" + adminId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(adminId.toString()))
                    .andExpect(jsonPath("$.username").value("testadmin"));
        }

        @Test
        @DisplayName("Deve retornar 404 para admin inexistente")
        void shouldReturn404ForNonExistentAdmin() throws Exception {
            UUID nonExistentId = UUID.randomUUID();
            when(adminUserService.getAdminById(nonExistentId))
                    .thenReturn(Optional.empty());

            mockMvc.perform(get("/admin/users/" + nonExistentId))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("PUT /admin/users/{id}/password")
    class UpdatePasswordTests {

        @Test
        @DisplayName("Deve atualizar senha com sucesso")
        void shouldUpdatePasswordSuccessfully() throws Exception {
            when(adminUserService.updatePassword(eq(adminId), eq("newPassword123")))
                    .thenReturn(adminDTO);

            mockMvc.perform(put("/admin/users/" + adminId + "/password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"password\": \"newPassword123\"}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username").value("testadmin"));
        }

        @Test
        @DisplayName("Deve retornar 400 para senha vazia")
        void shouldReturn400ForEmptyPassword() throws Exception {
            mockMvc.perform(put("/admin/users/" + adminId + "/password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"password\": \"\"}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Senha é obrigatória"));
        }

        @Test
        @DisplayName("Deve retornar 400 para senha null")
        void shouldReturn400ForNullPassword() throws Exception {
            mockMvc.perform(put("/admin/users/" + adminId + "/password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Senha é obrigatória"));
        }

        @Test
        @DisplayName("Deve retornar 400 para admin inexistente")
        void shouldReturn400ForNonExistentAdmin() throws Exception {
            UUID nonExistentId = UUID.randomUUID();
            when(adminUserService.updatePassword(eq(nonExistentId), any()))
                    .thenThrow(new RuntimeException("Admin não encontrado"));

            mockMvc.perform(put("/admin/users/" + nonExistentId + "/password")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"password\": \"newPassword123\"}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Admin não encontrado"));
        }
    }

    @Nested
    @DisplayName("PATCH /admin/users/{id}/toggle-active")
    class ToggleActiveTests {

        @Test
        @DisplayName("Deve alternar status ativo")
        void shouldToggleActiveStatus() throws Exception {
            AdminUserDTO inactiveAdmin = new AdminUserDTO(
                    adminId, "testadmin", "testadmin@crmflame.com", "Test Admin",
                    "ADMIN", false, null, 5, LocalDateTime.now(), LocalDateTime.now()
            );

            when(adminUserService.toggleActive(adminId)).thenReturn(inactiveAdmin);

            mockMvc.perform(patch("/admin/users/" + adminId + "/toggle-active"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.isActive").value(false));
        }

        @Test
        @DisplayName("Deve retornar 400 ao tentar desativar último super admin")
        void shouldReturn400WhenDeactivatingLastSuperAdmin() throws Exception {
            when(adminUserService.toggleActive(superAdminId))
                    .thenThrow(new RuntimeException("Não é possível desativar o último Super Admin"));

            mockMvc.perform(patch("/admin/users/" + superAdminId + "/toggle-active"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Não é possível desativar o último Super Admin"));
        }
    }

    @Nested
    @DisplayName("PATCH /admin/users/{id}/role")
    class UpdateRoleTests {

        @Test
        @DisplayName("Deve atualizar role com sucesso")
        void shouldUpdateRoleSuccessfully() throws Exception {
            AdminUserDTO managerAdmin = new AdminUserDTO(
                    adminId, "testadmin", "testadmin@crmflame.com", "Test Admin",
                    "MANAGER", true, null, 5, LocalDateTime.now(), LocalDateTime.now()
            );

            when(adminUserService.updateRole(adminId, "MANAGER")).thenReturn(managerAdmin);

            mockMvc.perform(patch("/admin/users/" + adminId + "/role")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"role\": \"MANAGER\"}"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.role").value("MANAGER"));
        }

        @Test
        @DisplayName("Deve retornar 400 para role vazia")
        void shouldReturn400ForEmptyRole() throws Exception {
            mockMvc.perform(patch("/admin/users/" + adminId + "/role")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"role\": \"\"}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Role é obrigatória"));
        }

        @Test
        @DisplayName("Deve retornar 400 para role inválida")
        void shouldReturn400ForInvalidRole() throws Exception {
            when(adminUserService.updateRole(adminId, "INVALID"))
                    .thenThrow(new RuntimeException("Role inválida: INVALID"));

            mockMvc.perform(patch("/admin/users/" + adminId + "/role")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"role\": \"INVALID\"}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Role inválida: INVALID"));
        }

        @Test
        @DisplayName("Deve retornar 400 ao rebaixar último super admin")
        void shouldReturn400WhenDemotingLastSuperAdmin() throws Exception {
            when(adminUserService.updateRole(superAdminId, "ADMIN"))
                    .thenThrow(new RuntimeException("Não é possível rebaixar o último Super Admin"));

            mockMvc.perform(patch("/admin/users/" + superAdminId + "/role")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"role\": \"ADMIN\"}"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Não é possível rebaixar o último Super Admin"));
        }
    }

    @Nested
    @DisplayName("DELETE /admin/users/{id}")
    class DeleteAdminTests {

        @Test
        @DisplayName("Deve deletar admin com sucesso")
        void shouldDeleteAdminSuccessfully() throws Exception {
            doNothing().when(adminUserService).deleteAdmin(adminId);

            mockMvc.perform(delete("/admin/users/" + adminId))
                    .andExpect(status().isNoContent());
        }

        @Test
        @DisplayName("Deve retornar 400 ao deletar último super admin")
        void shouldReturn400WhenDeletingLastSuperAdmin() throws Exception {
            doThrow(new RuntimeException("Não é possível deletar o último Super Admin"))
                    .when(adminUserService).deleteAdmin(superAdminId);

            mockMvc.perform(delete("/admin/users/" + superAdminId))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Não é possível deletar o último Super Admin"));
        }

        @Test
        @DisplayName("Deve retornar 400 para admin inexistente")
        void shouldReturn400ForNonExistentAdmin() throws Exception {
            UUID nonExistentId = UUID.randomUUID();
            doThrow(new RuntimeException("Admin não encontrado"))
                    .when(adminUserService).deleteAdmin(nonExistentId);

            mockMvc.perform(delete("/admin/users/" + nonExistentId))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("Admin não encontrado"));
        }
    }

    @Nested
    @DisplayName("GET /admin/stats")
    class GetStatsTests {

        @Test
        @DisplayName("Deve retornar estatísticas")
        void shouldReturnStats() throws Exception {
            AdminStats stats = new AdminStats(10, 8, 2, 3, 2, 1);
            when(adminUserService.getStats()).thenReturn(stats);

            mockMvc.perform(get("/admin/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.total").value(10))
                    .andExpect(jsonPath("$.active").value(8))
                    .andExpect(jsonPath("$.superAdmins").value(2))
                    .andExpect(jsonPath("$.admins").value(3))
                    .andExpect(jsonPath("$.managers").value(2))
                    .andExpect(jsonPath("$.support").value(1));
        }

        @Test
        @DisplayName("Deve retornar zeros quando não há admins")
        void shouldReturnZerosWhenNoAdmins() throws Exception {
            AdminStats stats = new AdminStats(0, 0, 0, 0, 0, 0);
            when(adminUserService.getStats()).thenReturn(stats);

            mockMvc.perform(get("/admin/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.total").value(0))
                    .andExpect(jsonPath("$.active").value(0));
        }
    }
}
