package com.crmflame.api.controller;

import com.crmflame.api.dto.GamificationDTO;
import com.crmflame.api.dto.GamificationDTO.BadgeDTO;
import com.crmflame.api.dto.GamificationDTO.LevelInfo;
import com.crmflame.api.dto.GamificationDTO.Stats;
import com.crmflame.api.model.Badge;
import com.crmflame.api.service.GamificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("GamificationController Tests")
class GamificationControllerTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private GamificationService gamificationService;

    @InjectMocks
    private GamificationController gamificationController;

    private GamificationDTO gamificationDTO;
    private String cpf;
    private UUID leadId;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(gamificationController).build();
        
        cpf = "12345678901";
        leadId = UUID.randomUUID();

        // Build GamificationDTO
        gamificationDTO = new GamificationDTO();

        LevelInfo levelInfo = new LevelInfo(5, 1200, 1500, "Faísca Brilhante");
        gamificationDTO.setLevel(levelInfo);

        BadgeDTO badge = new BadgeDTO();
        badge.setId("FIRST_LESSON");
        badge.setName("Primeira Aula");
        badge.setDescription("Complete sua primeira aula");
        badge.setIcon("🎯");
        badge.setRarity("common");
        badge.setUnlocked(true);
        badge.setProgress(1);
        badge.setMaxProgress(1);
        gamificationDTO.setBadges(List.of(badge));

        Stats stats = new Stats();
        stats.setTotalBadges(6);
        stats.setUnlockedBadges(1);
        stats.setTotalXp(1200);
        stats.setStreakDays(7);
        stats.setLessonsCompleted(15);
        stats.setStudyHours(12.5);
        gamificationDTO.setStats(stats);
    }

    // ==================== GET /api/gamification/student/{cpf} ====================

    @Nested
    @DisplayName("GET /api/gamification/student/{cpf}")
    class GetStudentGamificationTests {

        @Test
        @DisplayName("Deve retornar dados de gamificação por CPF")
        void shouldReturnGamificationDataByCpf() throws Exception {
            when(gamificationService.getGamificationData(cpf)).thenReturn(gamificationDTO);

            mockMvc.perform(get("/api/gamification/student/{cpf}", cpf))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.level.current").value(5))
                    .andExpect(jsonPath("$.level.xp").value(1200))
                    .andExpect(jsonPath("$.level.title").value("Faísca Brilhante"))
                    .andExpect(jsonPath("$.badges.length()").value(1))
                    .andExpect(jsonPath("$.stats.streakDays").value(7));
        }

        @Test
        @DisplayName("Deve retornar dados vazios para CPF não encontrado")
        void shouldReturnEmptyDataForNotFoundCpf() throws Exception {
            GamificationDTO emptyDTO = new GamificationDTO();
            emptyDTO.setLevel(new LevelInfo(1, 0, 250, "Iniciante"));
            emptyDTO.setBadges(Collections.emptyList());
            Stats emptyStats = new Stats();
            emptyStats.setTotalBadges(0);
            emptyStats.setUnlockedBadges(0);
            emptyStats.setTotalXp(0);
            emptyStats.setStreakDays(0);
            emptyStats.setLessonsCompleted(0);
            emptyStats.setStudyHours(0.0);
            emptyDTO.setStats(emptyStats);

            when(gamificationService.getGamificationData("99999999999")).thenReturn(emptyDTO);

            mockMvc.perform(get("/api/gamification/student/{cpf}", "99999999999"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.level.current").value(1))
                    .andExpect(jsonPath("$.level.xp").value(0))
                    .andExpect(jsonPath("$.badges.length()").value(0));
        }
    }

    // ==================== GET /api/gamification/student/id/{leadId} ====================

    @Nested
    @DisplayName("GET /api/gamification/student/id/{leadId}")
    class GetStudentGamificationByIdTests {

        @Test
        @DisplayName("Deve retornar dados de gamificação por leadId")
        void shouldReturnGamificationDataByLeadId() throws Exception {
            when(gamificationService.getGamificationDataByLeadId(leadId)).thenReturn(gamificationDTO);

            mockMvc.perform(get("/api/gamification/student/id/{leadId}", leadId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.level.current").value(5))
                    .andExpect(jsonPath("$.stats.lessonsCompleted").value(15));
        }

        @Test
        @DisplayName("Deve retornar dados vazios para leadId não encontrado")
        void shouldReturnEmptyDataForNotFoundLeadId() throws Exception {
            UUID unknownId = UUID.randomUUID();
            GamificationDTO emptyDTO = new GamificationDTO();
            emptyDTO.setLevel(new LevelInfo(1, 0, 250, "Iniciante"));
            emptyDTO.setBadges(Collections.emptyList());
            emptyDTO.setStats(new Stats());

            when(gamificationService.getGamificationDataByLeadId(unknownId)).thenReturn(emptyDTO);

            mockMvc.perform(get("/api/gamification/student/id/{leadId}", unknownId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.level.current").value(1));
        }
    }

    // ==================== POST /api/gamification/student/{cpf}/xp ====================

    @Nested
    @DisplayName("POST /api/gamification/student/{cpf}/xp")
    class AddXpTests {

        @Test
        @DisplayName("Deve adicionar XP com sucesso")
        void shouldAddXpSuccessfully() throws Exception {
            GamificationDTO updatedDTO = new GamificationDTO();
            updatedDTO.setLevel(new LevelInfo(5, 1300, 1500, "Faísca Brilhante"));
            updatedDTO.setBadges(gamificationDTO.getBadges());
            Stats updatedStats = new Stats();
            updatedStats.setTotalXp(1300);
            updatedDTO.setStats(updatedStats);

            when(gamificationService.addXp(eq(cpf), eq(100))).thenReturn(updatedDTO);

            mockMvc.perform(post("/api/gamification/student/{cpf}/xp", cpf)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(Map.of("xp", 100))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.level.xp").value(1300))
                    .andExpect(jsonPath("$.stats.totalXp").value(1300));
        }

        @Test
        @DisplayName("Deve adicionar 0 XP quando não especificado")
        void shouldAddZeroXpWhenNotSpecified() throws Exception {
            when(gamificationService.addXp(eq(cpf), eq(0))).thenReturn(gamificationDTO);

            mockMvc.perform(post("/api/gamification/student/{cpf}/xp", cpf)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isOk());
        }
    }

    // ==================== GET /api/gamification/badges ====================

    @Nested
    @DisplayName("GET /api/gamification/badges")
    class GetAllBadgesTests {

        @Test
        @DisplayName("Deve retornar lista de badges")
        void shouldReturnListOfBadges() throws Exception {
            Badge badge1 = new Badge();
            badge1.setId(1L);
            badge1.setCode("FIRST_LESSON");
            badge1.setName("Primeira Aula");
            badge1.setIsActive(true);

            Badge badge2 = new Badge();
            badge2.setId(2L);
            badge2.setCode("MARATHONER");
            badge2.setName("Maratonista");
            badge2.setIsActive(true);

            when(gamificationService.getAllBadges()).thenReturn(List.of(badge1, badge2));

            mockMvc.perform(get("/api/gamification/badges"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].code").value("FIRST_LESSON"))
                    .andExpect(jsonPath("$[1].code").value("MARATHONER"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há badges")
        void shouldReturnEmptyListWhenNoBadges() throws Exception {
            when(gamificationService.getAllBadges()).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/api/gamification/badges"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== POST /api/gamification/badges/init ====================

    @Nested
    @DisplayName("POST /api/gamification/badges/init")
    class InitializeBadgesTests {

        @Test
        @DisplayName("Deve inicializar badges com sucesso")
        void shouldInitializeBadgesSuccessfully() throws Exception {
            doNothing().when(gamificationService).initializeDefaultBadges();

            mockMvc.perform(post("/api/gamification/badges/init"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message").value("Badges inicializados com sucesso"));

            verify(gamificationService).initializeDefaultBadges();
        }
    }
}
