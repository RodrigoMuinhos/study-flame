package com.crmflame.api.controller;

import com.crmflame.api.dto.ImportResultDTO;
import com.crmflame.api.dto.LeadImportDTO;
import com.crmflame.api.dto.LeadRequestDTO;
import com.crmflame.api.dto.LeadResponseDTO;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.service.LeadImportService;
import com.crmflame.api.service.LeadService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LeadController.class)
@DisplayName("LeadController Tests")
class LeadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private LeadService leadService;

    @MockBean
    private LeadImportService leadImportService;

    private LeadResponseDTO leadResponseDTO;
    private LeadRequestDTO leadRequestDTO;
    private UUID leadId;

    @BeforeEach
    void setUp() {
        leadId = UUID.randomUUID();

        leadResponseDTO = new LeadResponseDTO();
        leadResponseDTO.setId(leadId);
        leadResponseDTO.setName("João Silva");
        leadResponseDTO.setEmail("joao@email.com");
        leadResponseDTO.setPhone("11999998888");
        leadResponseDTO.setCpf("12345678901");
        leadResponseDTO.setExperience("Iniciante");
        leadResponseDTO.setStatus(LeadStatus.NEW);
        leadResponseDTO.setNotes("Notas do lead");
        leadResponseDTO.setCreatedAt(LocalDateTime.now());

        leadRequestDTO = new LeadRequestDTO();
        leadRequestDTO.setName("João Silva");
        leadRequestDTO.setEmail("joao@email.com");
        leadRequestDTO.setPhone("11999998888");
        leadRequestDTO.setCpf("12345678901");
        leadRequestDTO.setExperience("Iniciante");
        leadRequestDTO.setNotes("Notas do lead");
    }

    // ==================== GET /leads ====================

    @Nested
    @DisplayName("GET /leads")
    class GetAllLeadsTests {

        @Test
        @DisplayName("Deve retornar lista de leads")
        void shouldReturnListOfLeads() throws Exception {
            LeadResponseDTO lead2 = new LeadResponseDTO();
            lead2.setId(UUID.randomUUID());
            lead2.setName("Maria Santos");
            lead2.setEmail("maria@email.com");
            lead2.setStatus(LeadStatus.QUALIFIED);

            when(leadService.getAllLeads()).thenReturn(List.of(leadResponseDTO, lead2));

            mockMvc.perform(get("/leads"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].name").value("João Silva"))
                    .andExpect(jsonPath("$[1].name").value("Maria Santos"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia")
        void shouldReturnEmptyList() throws Exception {
            when(leadService.getAllLeads()).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/leads"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== GET /leads/{id} ====================

    @Nested
    @DisplayName("GET /leads/{id}")
    class GetLeadByIdTests {

        @Test
        @DisplayName("Deve retornar lead quando encontrado")
        void shouldReturnLeadWhenFound() throws Exception {
            when(leadService.getLeadById(leadId)).thenReturn(leadResponseDTO);

            mockMvc.perform(get("/leads/{id}", leadId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(leadId.toString()))
                    .andExpect(jsonPath("$.name").value("João Silva"))
                    .andExpect(jsonPath("$.email").value("joao@email.com"))
                    .andExpect(jsonPath("$.cpf").value("12345678901"))
                    .andExpect(jsonPath("$.status").value("NEW"));
        }

        @Test
        @DisplayName("Deve retornar 404 quando lead não encontrado")
        void shouldReturn404WhenLeadNotFound() throws Exception {
            when(leadService.getLeadById(leadId))
                    .thenThrow(new RuntimeException("Lead não encontrado"));

            mockMvc.perform(get("/leads/{id}", leadId))
                    .andExpect(status().isNotFound());
        }
    }

    // ==================== POST /leads ====================

    @Nested
    @DisplayName("POST /leads")
    class CreateLeadTests {

        @Test
        @DisplayName("Deve criar lead com sucesso")
        void shouldCreateLeadSuccessfully() throws Exception {
            when(leadService.createLead(any(LeadRequestDTO.class))).thenReturn(leadResponseDTO);

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.name").value("João Silva"))
                    .andExpect(jsonPath("$.email").value("joao@email.com"))
                    .andExpect(jsonPath("$.status").value("NEW"));
        }

        @Test
        @DisplayName("Deve retornar 400 para email duplicado")
        void shouldReturn400ForDuplicateEmail() throws Exception {
            when(leadService.createLead(any(LeadRequestDTO.class)))
                    .thenThrow(new RuntimeException("Email já cadastrado: joao@email.com"));

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para CPF duplicado")
        void shouldReturn400ForDuplicateCpf() throws Exception {
            when(leadService.createLead(any(LeadRequestDTO.class)))
                    .thenThrow(new RuntimeException("CPF já cadastrado: 12345678901"));

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para request inválido - sem nome")
        void shouldReturn400ForMissingName() throws Exception {
            leadRequestDTO.setName(null);

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para CPF inválido")
        void shouldReturn400ForInvalidCpf() throws Exception {
            leadRequestDTO.setCpf("123");

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para email inválido")
        void shouldReturn400ForInvalidEmail() throws Exception {
            leadRequestDTO.setEmail("emailinvalido");

            mockMvc.perform(post("/leads")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }
    }

    // ==================== PUT /leads/{id} ====================

    @Nested
    @DisplayName("PUT /leads/{id}")
    class UpdateLeadTests {

        @Test
        @DisplayName("Deve atualizar lead com sucesso")
        void shouldUpdateLeadSuccessfully() throws Exception {
            LeadResponseDTO updatedResponse = new LeadResponseDTO();
            updatedResponse.setId(leadId);
            updatedResponse.setName("João Silva Atualizado");
            updatedResponse.setEmail("joao@email.com");
            updatedResponse.setPhone("11999997777");
            updatedResponse.setCpf("12345678901");
            updatedResponse.setExperience("Intermediário");
            updatedResponse.setStatus(LeadStatus.CONTACTED);

            when(leadService.updateLead(eq(leadId), any(LeadRequestDTO.class)))
                    .thenReturn(updatedResponse);

            mockMvc.perform(put("/leads/{id}", leadId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.name").value("João Silva Atualizado"))
                    .andExpect(jsonPath("$.experience").value("Intermediário"));
        }

        @Test
        @DisplayName("Deve retornar 400 para lead não encontrado")
        void shouldReturn400WhenLeadNotFound() throws Exception {
            when(leadService.updateLead(eq(leadId), any(LeadRequestDTO.class)))
                    .thenThrow(new RuntimeException("Lead não encontrado"));

            mockMvc.perform(put("/leads/{id}", leadId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 para dados inválidos")
        void shouldReturn400ForInvalidData() throws Exception {
            leadRequestDTO.setEmail("emailinvalido");

            mockMvc.perform(put("/leads/{id}", leadId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(leadRequestDTO)))
                    .andExpect(status().isBadRequest());
        }
    }

    // ==================== PATCH /leads/{id}/status ====================

    @Nested
    @DisplayName("PATCH /leads/{id}/status")
    class UpdateLeadStatusTests {

        @Test
        @DisplayName("Deve atualizar status para CONTACTED")
        void shouldUpdateStatusToContacted() throws Exception {
            leadResponseDTO.setStatus(LeadStatus.CONTACTED);

            when(leadService.updateLeadStatus(leadId, LeadStatus.CONTACTED))
                    .thenReturn(leadResponseDTO);

            mockMvc.perform(patch("/leads/{id}/status", leadId)
                            .param("status", "CONTACTED"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("CONTACTED"));
        }

        @Test
        @DisplayName("Deve atualizar status para QUALIFIED")
        void shouldUpdateStatusToQualified() throws Exception {
            leadResponseDTO.setStatus(LeadStatus.QUALIFIED);

            when(leadService.updateLeadStatus(leadId, LeadStatus.QUALIFIED))
                    .thenReturn(leadResponseDTO);

            mockMvc.perform(patch("/leads/{id}/status", leadId)
                            .param("status", "QUALIFIED"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("QUALIFIED"));
        }

        @Test
        @DisplayName("Deve atualizar status para CONVERTED")
        void shouldUpdateStatusToConverted() throws Exception {
            leadResponseDTO.setStatus(LeadStatus.CONVERTED);

            when(leadService.updateLeadStatus(leadId, LeadStatus.CONVERTED))
                    .thenReturn(leadResponseDTO);

            mockMvc.perform(patch("/leads/{id}/status", leadId)
                            .param("status", "CONVERTED"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("CONVERTED"));
        }

        @Test
        @DisplayName("Deve atualizar status para LOST")
        void shouldUpdateStatusToLost() throws Exception {
            leadResponseDTO.setStatus(LeadStatus.LOST);

            when(leadService.updateLeadStatus(leadId, LeadStatus.LOST))
                    .thenReturn(leadResponseDTO);

            mockMvc.perform(patch("/leads/{id}/status", leadId)
                            .param("status", "LOST"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.status").value("LOST"));
        }

        @Test
        @DisplayName("Deve retornar 400 para lead não encontrado")
        void shouldReturn400WhenLeadNotFound() throws Exception {
            when(leadService.updateLeadStatus(leadId, LeadStatus.CONTACTED))
                    .thenThrow(new RuntimeException("Lead não encontrado"));

            mockMvc.perform(patch("/leads/{id}/status", leadId)
                            .param("status", "CONTACTED"))
                    .andExpect(status().isBadRequest());
        }
    }

    // ==================== DELETE /leads/{id} ====================

    @Nested
    @DisplayName("DELETE /leads/{id}")
    class DeleteLeadTests {

        @Test
        @DisplayName("Deve deletar lead com sucesso")
        void shouldDeleteLeadSuccessfully() throws Exception {
            doNothing().when(leadService).deleteLead(leadId);

            mockMvc.perform(delete("/leads/{id}", leadId))
                    .andExpect(status().isNoContent());
        }

        @Test
        @DisplayName("Deve retornar 404 quando lead não encontrado")
        void shouldReturn404WhenLeadNotFound() throws Exception {
            doThrow(new RuntimeException("Lead não encontrado")).when(leadService).deleteLead(leadId);

            mockMvc.perform(delete("/leads/{id}", leadId))
                    .andExpect(status().isNotFound());
        }
    }

    // ==================== GET /leads/status/{status} ====================

    @Nested
    @DisplayName("GET /leads/status/{status}")
    class GetLeadsByStatusTests {

        @Test
        @DisplayName("Deve retornar leads com status NEW")
        void shouldReturnLeadsWithNewStatus() throws Exception {
            when(leadService.getLeadsByStatus(LeadStatus.NEW))
                    .thenReturn(List.of(leadResponseDTO));

            mockMvc.perform(get("/leads/status/{status}", "NEW"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(1))
                    .andExpect(jsonPath("$[0].status").value("NEW"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia para status sem leads")
        void shouldReturnEmptyListForStatusWithNoLeads() throws Exception {
            when(leadService.getLeadsByStatus(LeadStatus.LOST))
                    .thenReturn(Collections.emptyList());

            mockMvc.perform(get("/leads/status/{status}", "LOST"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== GET /leads/search ====================

    @Nested
    @DisplayName("GET /leads/search")
    class SearchLeadsByNameTests {

        @Test
        @DisplayName("Deve encontrar leads por nome")
        void shouldFindLeadsByName() throws Exception {
            when(leadService.searchLeadsByName("João"))
                    .thenReturn(List.of(leadResponseDTO));

            mockMvc.perform(get("/leads/search")
                            .param("name", "João"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(1))
                    .andExpect(jsonPath("$[0].name").value("João Silva"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia para nome não encontrado")
        void shouldReturnEmptyListForNameNotFound() throws Exception {
            when(leadService.searchLeadsByName("Inexistente"))
                    .thenReturn(Collections.emptyList());

            mockMvc.perform(get("/leads/search")
                            .param("name", "Inexistente"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== POST /leads/import ====================

    @Nested
    @DisplayName("POST /leads/import")
    class ImportLeadsTests {

        @Test
        @DisplayName("Deve importar leads com sucesso")
        void shouldImportLeadsSuccessfully() throws Exception {
            LeadImportDTO importDTO = new LeadImportDTO();
            importDTO.setName("Lead Importado");
            importDTO.setEmail("importado@email.com");
            importDTO.setPhone("11988887777");
            importDTO.setCpf("99988877766");
            importDTO.setExperience("Iniciante");

            ImportResultDTO result = new ImportResultDTO();
            result.setSuccessCount(1);
            result.setErrorCount(0);
            result.setMessage("Importação realizada com sucesso");

            when(leadImportService.importLeads(any())).thenReturn(result);

            mockMvc.perform(post("/leads/import")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(importDTO))))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.successCount").value(1))
                    .andExpect(jsonPath("$.errorCount").value(0));
        }

        @Test
        @DisplayName("Deve importar múltiplos leads")
        void shouldImportMultipleLeads() throws Exception {
            LeadImportDTO import1 = new LeadImportDTO();
            import1.setName("Lead 1");
            import1.setEmail("lead1@email.com");
            import1.setPhone("11988881111");
            import1.setCpf("11111111111");
            import1.setExperience("Iniciante");

            LeadImportDTO import2 = new LeadImportDTO();
            import2.setName("Lead 2");
            import2.setEmail("lead2@email.com");
            import2.setPhone("11988882222");
            import2.setCpf("22222222222");
            import2.setExperience("Avançado");

            ImportResultDTO result = new ImportResultDTO();
            result.setSuccessCount(2);
            result.setErrorCount(0);

            when(leadImportService.importLeads(any())).thenReturn(result);

            mockMvc.perform(post("/leads/import")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(import1, import2))))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.successCount").value(2));
        }

        @Test
        @DisplayName("Deve reportar erros na importação")
        void shouldReportImportErrors() throws Exception {
            LeadImportDTO importDTO = new LeadImportDTO();
            importDTO.setName("Lead Erro");
            importDTO.setEmail("existente@email.com");
            importDTO.setPhone("11988889999");
            importDTO.setCpf("12345678901");
            importDTO.setExperience("Iniciante");

            ImportResultDTO result = new ImportResultDTO();
            result.setSuccessCount(0);
            result.setErrorCount(1);
            result.setErrors(List.of("Lead com email ou CPF já existe"));

            when(leadImportService.importLeads(any())).thenReturn(result);

            mockMvc.perform(post("/leads/import")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(importDTO))))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.successCount").value(0))
                    .andExpect(jsonPath("$.errorCount").value(1));
        }

        @Test
        @DisplayName("Deve retornar 400 para erro de processamento")
        void shouldReturn400ForProcessingError() throws Exception {
            LeadImportDTO importDTO = new LeadImportDTO();
            importDTO.setName("Lead");

            when(leadImportService.importLeads(any()))
                    .thenThrow(new RuntimeException("Erro ao processar"));

            mockMvc.perform(post("/leads/import")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(importDTO))))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.errorCount").value(1));
        }
    }
}
