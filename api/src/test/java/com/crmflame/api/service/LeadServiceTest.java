package com.crmflame.api.service;

import com.crmflame.api.dto.LeadRequestDTO;
import com.crmflame.api.dto.LeadResponseDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.repository.LeadRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("LeadService Tests")
class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private LeadService leadService;

    private Lead lead;
    private LeadRequestDTO leadRequestDTO;
    private UUID leadId;

    @BeforeEach
    void setUp() {
        leadId = UUID.randomUUID();

        lead = new Lead();
        lead.setId(leadId);
        lead.setName("João Silva");
        lead.setEmail("joao@email.com");
        lead.setPhone("11999998888");
        lead.setCpf("12345678901");
        lead.setExperience("Iniciante");
        lead.setStatus(LeadStatus.NEW);
        lead.setNotes("Notas do lead");
        lead.setCreatedAt(LocalDateTime.now());

        leadRequestDTO = new LeadRequestDTO();
        leadRequestDTO.setName("João Silva");
        leadRequestDTO.setEmail("joao@email.com");
        leadRequestDTO.setPhone("11999998888");
        leadRequestDTO.setCpf("12345678901");
        leadRequestDTO.setExperience("Iniciante");
        leadRequestDTO.setNotes("Notas do lead");
    }

    // ==================== getAllLeads ====================

    @Nested
    @DisplayName("getAllLeads()")
    class GetAllLeadsTests {

        @Test
        @DisplayName("Deve retornar lista de leads")
        void shouldReturnListOfLeads() {
            Lead lead2 = new Lead();
            lead2.setId(UUID.randomUUID());
            lead2.setName("Maria Santos");
            lead2.setEmail("maria@email.com");
            lead2.setPhone("11988887777");
            lead2.setCpf("98765432109");
            lead2.setExperience("Avançado");
            lead2.setStatus(LeadStatus.QUALIFIED);
            lead2.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findAll()).thenReturn(List.of(lead, lead2));

            List<LeadResponseDTO> result = leadService.getAllLeads();

            assertThat(result).hasSize(2);
            assertThat(result.get(0).getName()).isEqualTo("João Silva");
            assertThat(result.get(1).getName()).isEqualTo("Maria Santos");
            verify(leadRepository).findAll();
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há leads")
        void shouldReturnEmptyListWhenNoLeads() {
            when(leadRepository.findAll()).thenReturn(Collections.emptyList());

            List<LeadResponseDTO> result = leadService.getAllLeads();

            assertThat(result).isEmpty();
            verify(leadRepository).findAll();
        }
    }

    // ==================== getLeadById ====================

    @Nested
    @DisplayName("getLeadById()")
    class GetLeadByIdTests {

        @Test
        @DisplayName("Deve retornar lead quando encontrado")
        void shouldReturnLeadWhenFound() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));

            LeadResponseDTO result = leadService.getLeadById(leadId);

            assertThat(result).isNotNull();
            assertThat(result.getId()).isEqualTo(leadId);
            assertThat(result.getName()).isEqualTo("João Silva");
            assertThat(result.getEmail()).isEqualTo("joao@email.com");
            assertThat(result.getCpf()).isEqualTo("12345678901");
            verify(leadRepository).findById(leadId);
        }

        @Test
        @DisplayName("Deve lançar exceção quando lead não encontrado")
        void shouldThrowExceptionWhenLeadNotFound() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> leadService.getLeadById(leadId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Lead não encontrado com id");

            verify(leadRepository).findById(leadId);
        }
    }

    // ==================== createLead ====================

    @Nested
    @DisplayName("createLead()")
    class CreateLeadTests {

        @Test
        @DisplayName("Deve criar lead com sucesso")
        void shouldCreateLeadSuccessfully() {
            when(leadRepository.existsByEmail(leadRequestDTO.getEmail())).thenReturn(false);
            when(leadRepository.existsByCpf(leadRequestDTO.getCpf())).thenReturn(false);
            when(leadRepository.save(any(Lead.class))).thenReturn(lead);

            LeadResponseDTO result = leadService.createLead(leadRequestDTO);

            assertThat(result).isNotNull();
            assertThat(result.getName()).isEqualTo("João Silva");
            assertThat(result.getEmail()).isEqualTo("joao@email.com");
            assertThat(result.getStatus()).isEqualTo(LeadStatus.NEW);
            verify(leadRepository).existsByEmail(leadRequestDTO.getEmail());
            verify(leadRepository).existsByCpf(leadRequestDTO.getCpf());
            verify(leadRepository).save(any(Lead.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para email duplicado")
        void shouldThrowExceptionForDuplicateEmail() {
            when(leadRepository.existsByEmail(leadRequestDTO.getEmail())).thenReturn(true);

            assertThatThrownBy(() -> leadService.createLead(leadRequestDTO))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Email já cadastrado");

            verify(leadRepository).existsByEmail(leadRequestDTO.getEmail());
            verify(leadRepository, never()).save(any());
        }

        @Test
        @DisplayName("Deve lançar exceção para CPF duplicado")
        void shouldThrowExceptionForDuplicateCpf() {
            when(leadRepository.existsByEmail(leadRequestDTO.getEmail())).thenReturn(false);
            when(leadRepository.existsByCpf(leadRequestDTO.getCpf())).thenReturn(true);

            assertThatThrownBy(() -> leadService.createLead(leadRequestDTO))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("CPF já cadastrado");

            verify(leadRepository).existsByCpf(leadRequestDTO.getCpf());
            verify(leadRepository, never()).save(any());
        }
    }

    // ==================== updateLead ====================

    @Nested
    @DisplayName("updateLead()")
    class UpdateLeadTests {

        @Test
        @DisplayName("Deve atualizar lead com sucesso")
        void shouldUpdateLeadSuccessfully() {
            LeadRequestDTO updateDTO = new LeadRequestDTO();
            updateDTO.setName("João Silva Atualizado");
            updateDTO.setEmail("joao@email.com");  // mesmo email
            updateDTO.setPhone("11999997777");
            updateDTO.setCpf("12345678901");  // mesmo CPF
            updateDTO.setExperience("Intermediário");
            updateDTO.setNotes("Novas notas");

            Lead updatedLead = new Lead();
            updatedLead.setId(leadId);
            updatedLead.setName("João Silva Atualizado");
            updatedLead.setEmail("joao@email.com");
            updatedLead.setPhone("11999997777");
            updatedLead.setCpf("12345678901");
            updatedLead.setExperience("Intermediário");
            updatedLead.setStatus(LeadStatus.NEW);
            updatedLead.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.save(any(Lead.class))).thenReturn(updatedLead);

            LeadResponseDTO result = leadService.updateLead(leadId, updateDTO);

            assertThat(result.getName()).isEqualTo("João Silva Atualizado");
            assertThat(result.getExperience()).isEqualTo("Intermediário");
            verify(leadRepository).findById(leadId);
            verify(leadRepository).save(any(Lead.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para lead não encontrado")
        void shouldThrowExceptionWhenLeadNotFound() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> leadService.updateLead(leadId, leadRequestDTO))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Lead não encontrado");

            verify(leadRepository, never()).save(any());
        }

        @Test
        @DisplayName("Deve lançar exceção ao tentar usar email já existente")
        void shouldThrowExceptionForExistingEmail() {
            LeadRequestDTO updateDTO = new LeadRequestDTO();
            updateDTO.setName("João");
            updateDTO.setEmail("outro@email.com"); // email diferente
            updateDTO.setPhone("11999998888");
            updateDTO.setCpf("12345678901");
            updateDTO.setExperience("Iniciante");

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.existsByEmail("outro@email.com")).thenReturn(true);

            assertThatThrownBy(() -> leadService.updateLead(leadId, updateDTO))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Email já cadastrado");

            verify(leadRepository, never()).save(any());
        }

        @Test
        @DisplayName("Deve lançar exceção ao tentar usar CPF já existente")
        void shouldThrowExceptionForExistingCpf() {
            LeadRequestDTO updateDTO = new LeadRequestDTO();
            updateDTO.setName("João");
            updateDTO.setEmail("joao@email.com");
            updateDTO.setPhone("11999998888");
            updateDTO.setCpf("99999999999"); // CPF diferente
            updateDTO.setExperience("Iniciante");

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.existsByCpf("99999999999")).thenReturn(true);

            assertThatThrownBy(() -> leadService.updateLead(leadId, updateDTO))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("CPF já cadastrado");

            verify(leadRepository, never()).save(any());
        }
    }

    // ==================== updateLeadStatus ====================

    @Nested
    @DisplayName("updateLeadStatus()")
    class UpdateLeadStatusTests {

        @Test
        @DisplayName("Deve atualizar status para CONTACTED")
        void shouldUpdateStatusToContacted() {
            Lead updatedLead = new Lead();
            updatedLead.setId(leadId);
            updatedLead.setName(lead.getName());
            updatedLead.setEmail(lead.getEmail());
            updatedLead.setPhone(lead.getPhone());
            updatedLead.setCpf(lead.getCpf());
            updatedLead.setExperience(lead.getExperience());
            updatedLead.setStatus(LeadStatus.CONTACTED);
            updatedLead.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.save(any(Lead.class))).thenReturn(updatedLead);

            LeadResponseDTO result = leadService.updateLeadStatus(leadId, LeadStatus.CONTACTED);

            assertThat(result.getStatus()).isEqualTo(LeadStatus.CONTACTED);
            verify(leadRepository).findById(leadId);
            verify(leadRepository).save(any(Lead.class));
        }

        @Test
        @DisplayName("Deve atualizar status para QUALIFIED")
        void shouldUpdateStatusToQualified() {
            Lead updatedLead = new Lead();
            updatedLead.setId(leadId);
            updatedLead.setStatus(LeadStatus.QUALIFIED);
            updatedLead.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.save(any(Lead.class))).thenReturn(updatedLead);

            LeadResponseDTO result = leadService.updateLeadStatus(leadId, LeadStatus.QUALIFIED);

            assertThat(result.getStatus()).isEqualTo(LeadStatus.QUALIFIED);
        }

        @Test
        @DisplayName("Deve atualizar status para CONVERTED")
        void shouldUpdateStatusToConverted() {
            Lead updatedLead = new Lead();
            updatedLead.setId(leadId);
            updatedLead.setStatus(LeadStatus.CONVERTED);
            updatedLead.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.save(any(Lead.class))).thenReturn(updatedLead);

            LeadResponseDTO result = leadService.updateLeadStatus(leadId, LeadStatus.CONVERTED);

            assertThat(result.getStatus()).isEqualTo(LeadStatus.CONVERTED);
        }

        @Test
        @DisplayName("Deve atualizar status para LOST")
        void shouldUpdateStatusToLost() {
            Lead updatedLead = new Lead();
            updatedLead.setId(leadId);
            updatedLead.setStatus(LeadStatus.LOST);
            updatedLead.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(leadRepository.save(any(Lead.class))).thenReturn(updatedLead);

            LeadResponseDTO result = leadService.updateLeadStatus(leadId, LeadStatus.LOST);

            assertThat(result.getStatus()).isEqualTo(LeadStatus.LOST);
        }

        @Test
        @DisplayName("Deve lançar exceção para lead não encontrado")
        void shouldThrowExceptionWhenLeadNotFound() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> leadService.updateLeadStatus(leadId, LeadStatus.CONTACTED))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Lead não encontrado");

            verify(leadRepository, never()).save(any());
        }
    }

    // ==================== deleteLead ====================

    @Nested
    @DisplayName("deleteLead()")
    class DeleteLeadTests {

        @Test
        @DisplayName("Deve deletar lead com sucesso")
        void shouldDeleteLeadSuccessfully() {
            when(leadRepository.existsById(leadId)).thenReturn(true);
            doNothing().when(leadRepository).deleteById(leadId);

            leadService.deleteLead(leadId);

            verify(leadRepository).existsById(leadId);
            verify(leadRepository).deleteById(leadId);
        }

        @Test
        @DisplayName("Deve lançar exceção para lead não encontrado")
        void shouldThrowExceptionWhenLeadNotFound() {
            when(leadRepository.existsById(leadId)).thenReturn(false);

            assertThatThrownBy(() -> leadService.deleteLead(leadId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Lead não encontrado");

            verify(leadRepository, never()).deleteById(any());
        }
    }

    // ==================== getLeadsByStatus ====================

    @Nested
    @DisplayName("getLeadsByStatus()")
    class GetLeadsByStatusTests {

        @Test
        @DisplayName("Deve retornar leads com status NEW")
        void shouldReturnLeadsWithNewStatus() {
            when(leadRepository.findByStatus(LeadStatus.NEW)).thenReturn(List.of(lead));

            List<LeadResponseDTO> result = leadService.getLeadsByStatus(LeadStatus.NEW);

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getStatus()).isEqualTo(LeadStatus.NEW);
            verify(leadRepository).findByStatus(LeadStatus.NEW);
        }

        @Test
        @DisplayName("Deve retornar lista vazia para status sem leads")
        void shouldReturnEmptyListForStatusWithNoLeads() {
            when(leadRepository.findByStatus(LeadStatus.LOST)).thenReturn(Collections.emptyList());

            List<LeadResponseDTO> result = leadService.getLeadsByStatus(LeadStatus.LOST);

            assertThat(result).isEmpty();
            verify(leadRepository).findByStatus(LeadStatus.LOST);
        }

        @Test
        @DisplayName("Deve retornar múltiplos leads com mesmo status")
        void shouldReturnMultipleLeadsWithSameStatus() {
            Lead lead2 = new Lead();
            lead2.setId(UUID.randomUUID());
            lead2.setName("Maria");
            lead2.setEmail("maria@email.com");
            lead2.setStatus(LeadStatus.QUALIFIED);
            lead2.setCreatedAt(LocalDateTime.now());

            Lead lead3 = new Lead();
            lead3.setId(UUID.randomUUID());
            lead3.setName("Pedro");
            lead3.setEmail("pedro@email.com");
            lead3.setStatus(LeadStatus.QUALIFIED);
            lead3.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findByStatus(LeadStatus.QUALIFIED)).thenReturn(List.of(lead2, lead3));

            List<LeadResponseDTO> result = leadService.getLeadsByStatus(LeadStatus.QUALIFIED);

            assertThat(result).hasSize(2);
            assertThat(result).allMatch(l -> l.getStatus() == LeadStatus.QUALIFIED);
        }
    }

    // ==================== searchLeadsByName ====================

    @Nested
    @DisplayName("searchLeadsByName()")
    class SearchLeadsByNameTests {

        @Test
        @DisplayName("Deve encontrar leads por nome exato")
        void shouldFindLeadsByExactName() {
            when(leadRepository.findByNameContainingIgnoreCase("João Silva")).thenReturn(List.of(lead));

            List<LeadResponseDTO> result = leadService.searchLeadsByName("João Silva");

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getName()).isEqualTo("João Silva");
            verify(leadRepository).findByNameContainingIgnoreCase("João Silva");
        }

        @Test
        @DisplayName("Deve encontrar leads por nome parcial")
        void shouldFindLeadsByPartialName() {
            when(leadRepository.findByNameContainingIgnoreCase("João")).thenReturn(List.of(lead));

            List<LeadResponseDTO> result = leadService.searchLeadsByName("João");

            assertThat(result).hasSize(1);
            verify(leadRepository).findByNameContainingIgnoreCase("João");
        }

        @Test
        @DisplayName("Deve retornar lista vazia para nome não encontrado")
        void shouldReturnEmptyListForNameNotFound() {
            when(leadRepository.findByNameContainingIgnoreCase("Inexistente")).thenReturn(Collections.emptyList());

            List<LeadResponseDTO> result = leadService.searchLeadsByName("Inexistente");

            assertThat(result).isEmpty();
        }

        @Test
        @DisplayName("Deve encontrar múltiplos leads com nomes similares")
        void shouldFindMultipleLeadsWithSimilarNames() {
            Lead lead2 = new Lead();
            lead2.setId(UUID.randomUUID());
            lead2.setName("João Pedro");
            lead2.setEmail("joaopedro@email.com");
            lead2.setCreatedAt(LocalDateTime.now());

            when(leadRepository.findByNameContainingIgnoreCase("João")).thenReturn(List.of(lead, lead2));

            List<LeadResponseDTO> result = leadService.searchLeadsByName("João");

            assertThat(result).hasSize(2);
            assertThat(result).extracting(LeadResponseDTO::getName)
                    .allMatch(name -> name.contains("João"));
        }
    }
}
