package com.crmflame.api.controller;

import com.crmflame.api.dto.StudentAccessDTO;
import com.crmflame.api.service.StudentAccessService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentAccessController.class)
@DisplayName("StudentAccessController Tests")
class StudentAccessControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StudentAccessService studentAccessService;

    private StudentAccessDTO studentAccessDTO;
    private UUID accessId;
    private UUID leadId;

    @BeforeEach
    void setUp() {
        accessId = UUID.randomUUID();
        leadId = UUID.randomUUID();

        studentAccessDTO = new StudentAccessDTO();
        studentAccessDTO.setId(accessId);
        studentAccessDTO.setLeadId(leadId);
        studentAccessDTO.setLeadName("João Silva");
        studentAccessDTO.setLeadEmail("joao@email.com");
        studentAccessDTO.setLeadCpf("12345678901");
        studentAccessDTO.setLeadPhone("11999998888");
        studentAccessDTO.setPassword("ABC12345");
        studentAccessDTO.setIsActive(true);
        studentAccessDTO.setCredentialsSent(false);
        studentAccessDTO.setLoginCount(0);
        studentAccessDTO.setCreatedAt(LocalDateTime.now());
        studentAccessDTO.setUpdatedAt(LocalDateTime.now());
    }

    // ==================== GET /student-access ====================

    @Nested
    @DisplayName("GET /student-access")
    class GetAllCredentialsTests {

        @Test
        @DisplayName("Deve retornar lista de credenciais")
        void shouldReturnListOfCredentials() throws Exception {
            StudentAccessDTO dto2 = new StudentAccessDTO();
            dto2.setId(UUID.randomUUID());
            dto2.setLeadId(UUID.randomUUID());
            dto2.setLeadName("Maria Santos");
            dto2.setPassword("XYZ98765");
            dto2.setIsActive(true);

            when(studentAccessService.getAllCredentials()).thenReturn(List.of(studentAccessDTO, dto2));

            mockMvc.perform(get("/student-access"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].leadName").value("João Silva"))
                    .andExpect(jsonPath("$[1].leadName").value("Maria Santos"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia")
        void shouldReturnEmptyList() throws Exception {
            when(studentAccessService.getAllCredentials()).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/student-access"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== GET /student-access/{id} ====================

    @Nested
    @DisplayName("GET /student-access/{id}")
    class GetCredentialsByIdTests {

        @Test
        @DisplayName("Deve retornar credenciais por ID")
        void shouldReturnCredentialsById() throws Exception {
            when(studentAccessService.getCredentialsById(accessId)).thenReturn(studentAccessDTO);

            mockMvc.perform(get("/student-access/{id}", accessId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(accessId.toString()))
                    .andExpect(jsonPath("$.leadName").value("João Silva"))
                    .andExpect(jsonPath("$.password").value("ABC12345"));
        }

        @Test
        @DisplayName("Deve retornar 404 para ID não encontrado")
        void shouldReturn404WhenNotFound() throws Exception {
            when(studentAccessService.getCredentialsById(accessId))
                    .thenThrow(new RuntimeException("Credenciais não encontradas"));

            mockMvc.perform(get("/student-access/{id}", accessId))
                    .andExpect(status().isNotFound());
        }
    }

    // ==================== POST /student-access/generate/{leadId} ====================

    @Nested
    @DisplayName("POST /student-access/generate/{leadId}")
    class GenerateCredentialsTests {

        @Test
        @DisplayName("Deve gerar credenciais com sucesso")
        void shouldGenerateCredentialsSuccessfully() throws Exception {
            when(studentAccessService.generateCredentials(leadId)).thenReturn(studentAccessDTO);

            mockMvc.perform(post("/student-access/generate/{leadId}", leadId))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").value(accessId.toString()))
                    .andExpect(jsonPath("$.leadId").value(leadId.toString()))
                    .andExpect(jsonPath("$.password").value("ABC12345"));
        }

        @Test
        @DisplayName("Deve retornar 400 para lead não encontrado")
        void shouldReturn400WhenLeadNotFound() throws Exception {
            when(studentAccessService.generateCredentials(leadId))
                    .thenThrow(new RuntimeException("Lead não encontrado"));

            mockMvc.perform(post("/student-access/generate/{leadId}", leadId))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Lead não encontrado"));
        }

        @Test
        @DisplayName("Deve retornar 400 para lead que já possui credenciais")
        void shouldReturn400WhenLeadAlreadyHasCredentials() throws Exception {
            when(studentAccessService.generateCredentials(leadId))
                    .thenThrow(new RuntimeException("Lead já possui credenciais"));

            mockMvc.perform(post("/student-access/generate/{leadId}", leadId))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Lead já possui credenciais"));
        }
    }

    // ==================== PUT /student-access/{id}/password ====================

    @Nested
    @DisplayName("PUT /student-access/{id}/password")
    class UpdatePasswordTests {

        @Test
        @DisplayName("Deve atualizar senha com sucesso")
        void shouldUpdatePasswordSuccessfully() throws Exception {
            String newPassword = "NEWPASS123";
            StudentAccessDTO updatedDTO = new StudentAccessDTO();
            updatedDTO.setId(accessId);
            updatedDTO.setPassword(newPassword);

            when(studentAccessService.updatePassword(eq(accessId), any())).thenReturn(updatedDTO);

            mockMvc.perform(put("/student-access/{id}/password", accessId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(newPassword))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.password").value(newPassword));
        }

        @Test
        @DisplayName("Deve retornar 400 para credenciais não encontradas")
        void shouldReturn400WhenNotFound() throws Exception {
            when(studentAccessService.updatePassword(eq(accessId), any()))
                    .thenThrow(new RuntimeException("Credenciais não encontradas"));

            mockMvc.perform(put("/student-access/{id}/password", accessId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("newpass"))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Credenciais não encontradas"));
        }
    }

    // ==================== POST /student-access/{id}/regenerate-password ====================

    @Nested
    @DisplayName("POST /student-access/{id}/regenerate-password")
    class RegeneratePasswordTests {

        @Test
        @DisplayName("Deve regenerar senha com sucesso")
        void shouldRegeneratePasswordSuccessfully() throws Exception {
            StudentAccessDTO regeneratedDTO = new StudentAccessDTO();
            regeneratedDTO.setId(accessId);
            regeneratedDTO.setPassword("NEWRNDM88");

            when(studentAccessService.regeneratePassword(accessId)).thenReturn(regeneratedDTO);

            mockMvc.perform(post("/student-access/{id}/regenerate-password", accessId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.password").value("NEWRNDM88"));
        }

        @Test
        @DisplayName("Deve retornar 400 para credenciais não encontradas")
        void shouldReturn400WhenNotFound() throws Exception {
            when(studentAccessService.regeneratePassword(accessId))
                    .thenThrow(new RuntimeException("Credenciais não encontradas"));

            mockMvc.perform(post("/student-access/{id}/regenerate-password", accessId))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Credenciais não encontradas"));
        }
    }

    // ==================== PATCH /student-access/{id}/toggle-access ====================

    @Nested
    @DisplayName("PATCH /student-access/{id}/toggle-access")
    class ToggleAccessTests {

        @Test
        @DisplayName("Deve alternar acesso para inativo")
        void shouldToggleAccessToInactive() throws Exception {
            StudentAccessDTO toggledDTO = new StudentAccessDTO();
            toggledDTO.setId(accessId);
            toggledDTO.setIsActive(false);

            when(studentAccessService.toggleAccess(accessId)).thenReturn(toggledDTO);

            mockMvc.perform(patch("/student-access/{id}/toggle-access", accessId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.isActive").value(false));
        }

        @Test
        @DisplayName("Deve alternar acesso para ativo")
        void shouldToggleAccessToActive() throws Exception {
            StudentAccessDTO toggledDTO = new StudentAccessDTO();
            toggledDTO.setId(accessId);
            toggledDTO.setIsActive(true);

            when(studentAccessService.toggleAccess(accessId)).thenReturn(toggledDTO);

            mockMvc.perform(patch("/student-access/{id}/toggle-access", accessId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.isActive").value(true));
        }

        @Test
        @DisplayName("Deve retornar 400 para credenciais não encontradas")
        void shouldReturn400WhenNotFound() throws Exception {
            when(studentAccessService.toggleAccess(accessId))
                    .thenThrow(new RuntimeException("Credenciais não encontradas"));

            mockMvc.perform(patch("/student-access/{id}/toggle-access", accessId))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Credenciais não encontradas"));
        }
    }

    // ==================== PATCH /student-access/{id}/mark-sent ====================

    @Nested
    @DisplayName("PATCH /student-access/{id}/mark-sent")
    class MarkAsSentTests {

        @Test
        @DisplayName("Deve marcar como enviadas com sucesso")
        void shouldMarkAsSentSuccessfully() throws Exception {
            StudentAccessDTO sentDTO = new StudentAccessDTO();
            sentDTO.setId(accessId);
            sentDTO.setCredentialsSent(true);

            when(studentAccessService.markAsSent(accessId)).thenReturn(sentDTO);

            mockMvc.perform(patch("/student-access/{id}/mark-sent", accessId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.credentialsSent").value(true));
        }

        @Test
        @DisplayName("Deve retornar 400 para credenciais não encontradas")
        void shouldReturn400WhenNotFound() throws Exception {
            when(studentAccessService.markAsSent(accessId))
                    .thenThrow(new RuntimeException("Credenciais não encontradas"));

            mockMvc.perform(patch("/student-access/{id}/mark-sent", accessId))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().string("Credenciais não encontradas"));
        }
    }

    // ==================== DELETE /student-access/{id} ====================

    @Nested
    @DisplayName("DELETE /student-access/{id}")
    class DeleteCredentialsTests {

        @Test
        @DisplayName("Deve deletar credenciais com sucesso")
        void shouldDeleteCredentialsSuccessfully() throws Exception {
            doNothing().when(studentAccessService).deleteCredentials(accessId);

            mockMvc.perform(delete("/student-access/{id}", accessId))
                    .andExpect(status().isNoContent());

            verify(studentAccessService).deleteCredentials(accessId);
        }

        @Test
        @DisplayName("Deve retornar 404 em caso de erro")
        void shouldReturn404OnError() throws Exception {
            doThrow(new RuntimeException("Erro ao deletar")).when(studentAccessService).deleteCredentials(accessId);

            mockMvc.perform(delete("/student-access/{id}", accessId))
                    .andExpect(status().isNotFound());
        }
    }
}
