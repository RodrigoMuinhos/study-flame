package com.crmflame.api.service;

import com.crmflame.api.dto.GamificationDTO;
import com.crmflame.api.model.Badge;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.model.StudentBadge;
import com.crmflame.api.model.StudentProgress;
import com.crmflame.api.repository.BadgeRepository;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentBadgeRepository;
import com.crmflame.api.repository.StudentProgressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("GamificationService Tests")
class GamificationServiceTest {

    @Mock
    private StudentProgressRepository progressRepository;

    @Mock
    private BadgeRepository badgeRepository;

    @Mock
    private StudentBadgeRepository studentBadgeRepository;

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private GamificationService gamificationService;

    private Lead lead;
    private StudentProgress studentProgress;
    private Badge badge;
    private StudentBadge studentBadge;
    private UUID leadId;
    private String cpf;

    @BeforeEach
    void setUp() {
        leadId = UUID.randomUUID();
        cpf = "12345678901";

        lead = new Lead();
        lead.setId(leadId);
        lead.setName("João Silva");
        lead.setEmail("joao@email.com");
        lead.setCpf(cpf);
        lead.setPhone("11999998888");
        lead.setStatus(LeadStatus.NEW);

        studentProgress = new StudentProgress();
        studentProgress.setId(1L);
        studentProgress.setLead(lead);
        studentProgress.setXpTotal(500);
        studentProgress.setLevel(3);
        studentProgress.setStreakDays(5);
        studentProgress.setLessonsCompleted(10);
        studentProgress.setExercisesCompleted(5);
        studentProgress.setPerfectScores(2);
        studentProgress.setStudyHours(8.5);

        badge = new Badge();
        badge.setId(1L);
        badge.setCode("FIRST_LESSON");
        badge.setName("Primeira Aula");
        badge.setDescription("Complete sua primeira aula");
        badge.setIcon("🎯");
        badge.setRarity(Badge.BadgeRarity.COMMON);
        badge.setMaxProgress(1);
        badge.setXpReward(50);
        badge.setIsActive(true);

        studentBadge = new StudentBadge();
        studentBadge.setId(1L);
        studentBadge.setLead(lead);
        studentBadge.setBadge(badge);
        studentBadge.setUnlocked(true);
        studentBadge.setProgress(1);
    }

    // ==================== getGamificationData ====================

    @Nested
    @DisplayName("getGamificationData()")
    class GetGamificationDataTests {

        @Test
        @DisplayName("Deve retornar dados de gamificação para CPF existente")
        void shouldReturnGamificationDataForExistingCpf() {
            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.of(lead));
            when(progressRepository.findByLead(lead)).thenReturn(Optional.of(studentProgress));
            when(studentBadgeRepository.findByLead(lead)).thenReturn(List.of(studentBadge));

            GamificationDTO result = gamificationService.getGamificationData(cpf);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(3);
            assertThat(result.getLevel().getXp()).isEqualTo(500);
            assertThat(result.getStats().getStreakDays()).isEqualTo(5);
            assertThat(result.getBadges()).hasSize(1);
        }

        @Test
        @DisplayName("Deve retornar dados vazios para CPF não encontrado")
        void shouldReturnEmptyDataForNotFoundCpf() {
            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.empty());

            GamificationDTO result = gamificationService.getGamificationData(cpf);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(1);
            assertThat(result.getLevel().getXp()).isEqualTo(0);
            assertThat(result.getBadges()).isEmpty();
        }

        @Test
        @DisplayName("Deve criar progresso inicial para novo aluno")
        void shouldCreateInitialProgressForNewStudent() {
            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.of(lead));
            when(progressRepository.findByLead(lead)).thenReturn(Optional.empty());
            when(progressRepository.save(any(StudentProgress.class))).thenAnswer(inv -> {
                StudentProgress sp = inv.getArgument(0);
                sp.setId(1L);
                return sp;
            });
            when(studentBadgeRepository.findByLead(lead)).thenReturn(Collections.emptyList());
            when(badgeRepository.findByIsActiveTrue()).thenReturn(List.of(badge));
            when(studentBadgeRepository.save(any(StudentBadge.class))).thenAnswer(inv -> inv.getArgument(0));

            GamificationDTO result = gamificationService.getGamificationData(cpf);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(1);
            verify(progressRepository).save(any(StudentProgress.class));
        }
    }

    // ==================== getGamificationDataByLeadId ====================

    @Nested
    @DisplayName("getGamificationDataByLeadId()")
    class GetGamificationDataByLeadIdTests {

        @Test
        @DisplayName("Deve retornar dados de gamificação por leadId")
        void shouldReturnGamificationDataByLeadId() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.of(lead));
            when(progressRepository.findByLead(lead)).thenReturn(Optional.of(studentProgress));
            when(studentBadgeRepository.findByLead(lead)).thenReturn(List.of(studentBadge));

            GamificationDTO result = gamificationService.getGamificationDataByLeadId(leadId);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(3);
            assertThat(result.getStats().getLessonsCompleted()).isEqualTo(10);
        }

        @Test
        @DisplayName("Deve retornar dados vazios para leadId não encontrado")
        void shouldReturnEmptyDataForNotFoundLeadId() {
            when(leadRepository.findById(leadId)).thenReturn(Optional.empty());

            GamificationDTO result = gamificationService.getGamificationDataByLeadId(leadId);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(1);
            assertThat(result.getLevel().getXp()).isEqualTo(0);
        }
    }

    // ==================== addXp ====================

    @Nested
    @DisplayName("addXp()")
    class AddXpTests {

        @Test
        @DisplayName("Deve adicionar XP com sucesso")
        void shouldAddXpSuccessfully() {
            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.of(lead));
            when(progressRepository.findByLead(lead)).thenReturn(Optional.of(studentProgress));
            when(progressRepository.save(any(StudentProgress.class))).thenAnswer(inv -> inv.getArgument(0));
            when(studentBadgeRepository.findByLead(lead)).thenReturn(List.of(studentBadge));

            GamificationDTO result = gamificationService.addXp(cpf, 100);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getXp()).isEqualTo(600); // 500 + 100
            verify(progressRepository).save(any(StudentProgress.class));
        }

        @Test
        @DisplayName("Deve retornar dados vazios para CPF não encontrado")
        void shouldReturnEmptyDataForNotFoundCpf() {
            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.empty());

            GamificationDTO result = gamificationService.addXp(cpf, 100);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getCurrent()).isEqualTo(1);
            assertThat(result.getLevel().getXp()).isEqualTo(0);
        }

        @Test
        @DisplayName("Deve subir de nível ao atingir XP necessário")
        void shouldLevelUpWhenXpReached() {
            studentProgress.setLevel(2);
            studentProgress.setXpTotal(700); // Falta 50 para nível 3 (750)

            when(leadRepository.findByCpf(cpf)).thenReturn(Optional.of(lead));
            when(progressRepository.findByLead(lead)).thenReturn(Optional.of(studentProgress));
            when(progressRepository.save(any(StudentProgress.class))).thenAnswer(inv -> inv.getArgument(0));
            when(studentBadgeRepository.findByLead(lead)).thenReturn(List.of(studentBadge));

            GamificationDTO result = gamificationService.addXp(cpf, 100);

            assertThat(result).isNotNull();
            assertThat(result.getLevel().getXp()).isEqualTo(800);
            // XP 800 >= 750 (nível 3), e 800 < 1000 (nível 4), então nível = 3
            assertThat(result.getLevel().getCurrent()).isGreaterThanOrEqualTo(3);
        }
    }

    // ==================== getAllBadges ====================

    @Nested
    @DisplayName("getAllBadges()")
    class GetAllBadgesTests {

        @Test
        @DisplayName("Deve retornar lista de badges ativos")
        void shouldReturnActiveBadges() {
            Badge badge2 = new Badge();
            badge2.setId(2L);
            badge2.setCode("MARATHONER");
            badge2.setName("Maratonista");
            badge2.setIsActive(true);

            when(badgeRepository.findByIsActiveTrue()).thenReturn(List.of(badge, badge2));

            List<Badge> result = gamificationService.getAllBadges();

            assertThat(result).hasSize(2);
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há badges")
        void shouldReturnEmptyListWhenNoBadges() {
            when(badgeRepository.findByIsActiveTrue()).thenReturn(Collections.emptyList());

            List<Badge> result = gamificationService.getAllBadges();

            assertThat(result).isEmpty();
        }
    }

    // ==================== initializeDefaultBadges ====================

    @Nested
    @DisplayName("initializeDefaultBadges()")
    class InitializeDefaultBadgesTests {

        @Test
        @DisplayName("Deve inicializar badges quando não existem")
        void shouldInitializeBadgesWhenNoneExist() {
            when(badgeRepository.count()).thenReturn(0L);
            when(badgeRepository.save(any(Badge.class))).thenAnswer(inv -> inv.getArgument(0));

            gamificationService.initializeDefaultBadges();

            verify(badgeRepository, atLeast(1)).save(any(Badge.class));
        }

        @Test
        @DisplayName("Não deve inicializar badges quando já existem")
        void shouldNotInitializeBadgesWhenAlreadyExist() {
            when(badgeRepository.count()).thenReturn(6L);

            gamificationService.initializeDefaultBadges();

            verify(badgeRepository, never()).save(any(Badge.class));
        }
    }
}
