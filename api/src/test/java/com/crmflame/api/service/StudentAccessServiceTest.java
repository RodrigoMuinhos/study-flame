package com.crmflame.api.service;

import com.crmflame.api.dto.StudentAccessDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.model.StudentAccess;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentAccessRepository;
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
@DisplayName("StudentAccessService Tests")
class StudentAccessServiceTest {

    @Mock
    private StudentAccessRepository studentAccessRepository;

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private StudentAccessService studentAccessService;

    private Lead lead;
    private StudentAccess studentAccess;
    private UUID leadId;
    private UUID accessId;

    @BeforeEach
    void setUp() {
        leadId = UUID.randomUUID();
        accessId = UUID.randomUUID();

        lead = new Lead();
        lead.setId(leadId);
        lead.setName("João Silva");
        lead.setEmail("joao@email.com");
        lead.setPhone("11999998888");
        lead.setCpf("12345678901");
        lead.setExperience("Iniciante");
        lead.setStatus(LeadStatus.NEW);

        studentAccess = new StudentAccess();
        studentAccess.setId(accessId);
        studentAccess.setLead(lead);
        studentAccess.setPassword("ABC12345");
        studentAccess.setIsActive(true);
        studentAccess.setCredentialsSent(false);
        studentAccess.setLoginCount(0);
        studentAccess.setCreatedAt(LocalDateTime.now());
        studentAccess.setUpdatedAt(LocalDateTime.now());
    }

    // ==================== generateCredentials ====================

    @Nested
    @DisplayName("generateCredentials()")
    class GenerateCredentialsTests {

        @Test
        @DisplayName("Deve gerar credenciais com sucesso")
        void shouldGenerateCredentialsSuccessfully() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(studentAccessRepository.existsByLeadId(leadId)).thenReturn(false);
            when(studentAccessRepository.save(any(StudentAccess.class))).thenReturn(studentAccess);

            StudentAccessDTO result = studentAccessService.generateCredentials(leadId);

            assertThat(result).isNotNull();
            assertThat(result.getLeadId()).isEqualTo(leadId);
            assertThat(result.getLeadName()).isEqualTo("João Silva");
            assertThat(result.getPassword()).isNotNull();
            assertThat(result.getIsActive()).isTrue();
            verify(studentAccessRepository).save(any(StudentAccess.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para lead não encontrado")
        void shouldThrowExceptionWhenLeadNotFound() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.generateCredentials(leadId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Lead não encontrado");

            verify(studentAccessRepository, never()).save(any());
        }

        @Test
        @DisplayName("Deve lançar exceção se lead já possui credenciais")
        void shouldThrowExceptionWhenLeadAlreadyHasCredentials() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(studentAccessRepository.existsByLeadId(leadId)).thenReturn(true);

            assertThatThrownBy(() -> studentAccessService.generateCredentials(leadId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("já possui credenciais");

            verify(studentAccessRepository, never()).save(any());
        }
    }

    // ==================== getAllCredentials ====================

    @Nested
    @DisplayName("getAllCredentials()")
    class GetAllCredentialsTests {

        @Test
        @DisplayName("Deve retornar lista de credenciais")
        void shouldReturnListOfCredentials() {
            StudentAccess access2 = new StudentAccess();
            access2.setId(UUID.randomUUID());
            access2.setLead(lead);
            access2.setPassword("XYZ98765");
            access2.setIsActive(true);
            access2.setCredentialsSent(true);
            access2.setLoginCount(5);
            access2.setCreatedAt(LocalDateTime.now());

            when(studentAccessRepository.findAll()).thenReturn(List.of(studentAccess, access2));

            List<StudentAccessDTO> result = studentAccessService.getAllCredentials();

            assertThat(result).hasSize(2);
            verify(studentAccessRepository).findAll();
        }

        @Test
        @DisplayName("Deve retornar lista vazia")
        void shouldReturnEmptyList() {
            when(studentAccessRepository.findAll()).thenReturn(Collections.emptyList());

            List<StudentAccessDTO> result = studentAccessService.getAllCredentials();

            assertThat(result).isEmpty();
        }
    }

    // ==================== getCredentialsById ====================

    @Nested
    @DisplayName("getCredentialsById()")
    class GetCredentialsByIdTests {

        @Test
        @DisplayName("Deve retornar credenciais quando encontradas")
        void shouldReturnCredentialsWhenFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));

            StudentAccessDTO result = studentAccessService.getCredentialsById(accessId);

            assertThat(result).isNotNull();
            assertThat(result.getId()).isEqualTo(accessId);
            assertThat(result.getLeadName()).isEqualTo("João Silva");
            assertThat(result.getPassword()).isEqualTo("ABC12345");
        }

        @Test
        @DisplayName("Deve lançar exceção quando não encontradas")
        void shouldThrowExceptionWhenNotFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.getCredentialsById(accessId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Credenciais não encontradas");
        }
    }

    // ==================== updatePassword ====================

    @Nested
    @DisplayName("updatePassword()")
    class UpdatePasswordTests {

        @Test
        @DisplayName("Deve atualizar senha com sucesso")
        void shouldUpdatePasswordSuccessfully() {
            String newPassword = "NEWPASS123";
            StudentAccess updatedAccess = new StudentAccess();
            updatedAccess.setId(accessId);
            updatedAccess.setLead(lead);
            updatedAccess.setPassword(newPassword);
            updatedAccess.setIsActive(true);
            updatedAccess.setCreatedAt(LocalDateTime.now());

            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));
            when(studentAccessRepository.save(any(StudentAccess.class))).thenReturn(updatedAccess);

            StudentAccessDTO result = studentAccessService.updatePassword(accessId, newPassword);

            assertThat(result.getPassword()).isEqualTo(newPassword);
            verify(studentAccessRepository).save(any(StudentAccess.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para credenciais não encontradas")
        void shouldThrowExceptionWhenCredentialsNotFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.updatePassword(accessId, "newpass"))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Credenciais não encontradas");

            verify(studentAccessRepository, never()).save(any());
        }
    }

    // ==================== regeneratePassword ====================

    @Nested
    @DisplayName("regeneratePassword()")
    class RegeneratePasswordTests {

        @Test
        @DisplayName("Deve regenerar senha com sucesso")
        void shouldRegeneratePasswordSuccessfully() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));
            when(studentAccessRepository.save(any(StudentAccess.class))).thenAnswer(inv -> inv.getArgument(0));

            StudentAccessDTO result = studentAccessService.regeneratePassword(accessId);

            assertThat(result).isNotNull();
            assertThat(result.getPassword()).isNotEqualTo("ABC12345"); // Deve ter nova senha
            assertThat(result.getPassword()).hasSize(8);
            verify(studentAccessRepository).save(any(StudentAccess.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para credenciais não encontradas")
        void shouldThrowExceptionWhenCredentialsNotFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.regeneratePassword(accessId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Credenciais não encontradas");
        }
    }

    // ==================== toggleAccess ====================

    @Nested
    @DisplayName("toggleAccess()")
    class ToggleAccessTests {

        @Test
        @DisplayName("Deve desativar acesso quando ativo")
        void shouldDeactivateWhenActive() {
            studentAccess.setIsActive(true);
            StudentAccess toggledAccess = new StudentAccess();
            toggledAccess.setId(accessId);
            toggledAccess.setLead(lead);
            toggledAccess.setIsActive(false);
            toggledAccess.setPassword("ABC12345");
            toggledAccess.setCreatedAt(LocalDateTime.now());

            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));
            when(studentAccessRepository.save(any(StudentAccess.class))).thenReturn(toggledAccess);

            StudentAccessDTO result = studentAccessService.toggleAccess(accessId);

            assertThat(result.getIsActive()).isFalse();
        }

        @Test
        @DisplayName("Deve ativar acesso quando inativo")
        void shouldActivateWhenInactive() {
            studentAccess.setIsActive(false);
            StudentAccess toggledAccess = new StudentAccess();
            toggledAccess.setId(accessId);
            toggledAccess.setLead(lead);
            toggledAccess.setIsActive(true);
            toggledAccess.setPassword("ABC12345");
            toggledAccess.setCreatedAt(LocalDateTime.now());

            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));
            when(studentAccessRepository.save(any(StudentAccess.class))).thenReturn(toggledAccess);

            StudentAccessDTO result = studentAccessService.toggleAccess(accessId);

            assertThat(result.getIsActive()).isTrue();
        }

        @Test
        @DisplayName("Deve lançar exceção para credenciais não encontradas")
        void shouldThrowExceptionWhenCredentialsNotFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.toggleAccess(accessId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Credenciais não encontradas");
        }
    }

    // ==================== markAsSent ====================

    @Nested
    @DisplayName("markAsSent()")
    class MarkAsSentTests {

        @Test
        @DisplayName("Deve marcar credenciais como enviadas")
        void shouldMarkCredentialsAsSent() {
            StudentAccess sentAccess = new StudentAccess();
            sentAccess.setId(accessId);
            sentAccess.setLead(lead);
            sentAccess.setPassword("ABC12345");
            sentAccess.setIsActive(true);
            sentAccess.setCredentialsSent(true);
            sentAccess.setCreatedAt(LocalDateTime.now());

            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.of(studentAccess));
            when(studentAccessRepository.save(any(StudentAccess.class))).thenReturn(sentAccess);

            StudentAccessDTO result = studentAccessService.markAsSent(accessId);

            assertThat(result.getCredentialsSent()).isTrue();
            verify(studentAccessRepository).save(any(StudentAccess.class));
        }

        @Test
        @DisplayName("Deve lançar exceção para credenciais não encontradas")
        void shouldThrowExceptionWhenCredentialsNotFound() {
            when(studentAccessRepository.findById(accessId)).thenReturn(Optional.empty());

            assertThatThrownBy(() -> studentAccessService.markAsSent(accessId))
                    .isInstanceOf(RuntimeException.class)
                    .hasMessageContaining("Credenciais não encontradas");
        }
    }

    // ==================== deleteCredentials ====================

    @Nested
    @DisplayName("deleteCredentials()")
    class DeleteCredentialsTests {

        @Test
        @DisplayName("Deve deletar credenciais com sucesso")
        void shouldDeleteCredentialsSuccessfully() {
            doNothing().when(studentAccessRepository).deleteById(accessId);

            studentAccessService.deleteCredentials(accessId);

            verify(studentAccessRepository).deleteById(accessId);
        }
    }
}
