package com.crmflame.api.controller;

import com.crmflame.api.dto.ExamQuestionDTO;
import com.crmflame.api.model.ExamQuestion;
import com.crmflame.api.service.ExamQuestionService;
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

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExamQuestionController.class)
@DisplayName("ExamQuestionController Tests")
class ExamQuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ExamQuestionService examQuestionService;

    private ExamQuestionDTO examQuestionDTO;
    private ExamQuestion examQuestion;

    @BeforeEach
    void setUp() {
        List<String> options = Arrays.asList(
                "Amazon S3",
                "Amazon EC2",
                "Amazon RDS",
                "Amazon Lambda"
        );

        examQuestionDTO = new ExamQuestionDTO(
                "Q001",
                "Qual serviço AWS é usado para armazenamento de objetos?",
                options,
                "0",
                "Amazon S3 é o serviço de armazenamento de objetos da AWS.",
                "resilient",
                "easy",
                false
        );

        examQuestion = new ExamQuestion();
        examQuestion.setId("Q001");
        examQuestion.setQuestion("Qual serviço AWS é usado para armazenamento de objetos?");
        examQuestion.setOptions(options);
        examQuestion.setCorrectAnswer("0");
        examQuestion.setExplanation("Amazon S3 é o serviço de armazenamento de objetos.");
        examQuestion.setDomain("resilient");
        examQuestion.setDifficulty("easy");
        examQuestion.setMultipleChoice(false);
    }

    // ==================== POST /exam-questions/bulk ====================

    @Nested
    @DisplayName("POST /exam-questions/bulk")
    class BulkCreateTests {

        @Test
        @DisplayName("Deve importar questões em lote com sucesso")
        void shouldBulkCreateSuccessfully() throws Exception {
            when(examQuestionService.saveAll(anyList())).thenReturn(List.of(examQuestion));

            mockMvc.perform(post("/exam-questions/bulk")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(examQuestionDTO))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message").value("Questões salvas com sucesso"))
                    .andExpect(jsonPath("$.count").value(1));
        }

        @Test
        @DisplayName("Deve importar múltiplas questões")
        void shouldBulkCreateMultipleQuestions() throws Exception {
            ExamQuestionDTO dto2 = new ExamQuestionDTO(
                    "Q002", "Outra pergunta?", List.of("A", "B"), "1",
                    "Explicação", "secure", "medium", true
            );
            ExamQuestion question2 = new ExamQuestion();
            question2.setId("Q002");

            when(examQuestionService.saveAll(anyList())).thenReturn(List.of(examQuestion, question2));

            mockMvc.perform(post("/exam-questions/bulk")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(List.of(examQuestionDTO, dto2))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.count").value(2));
        }

        @Test
        @DisplayName("Deve importar lista vazia")
        void shouldBulkCreateEmptyList() throws Exception {
            when(examQuestionService.saveAll(anyList())).thenReturn(Collections.emptyList());

            mockMvc.perform(post("/exam-questions/bulk")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("[]"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.count").value(0));
        }
    }

    // ==================== GET /exam-questions ====================

    @Nested
    @DisplayName("GET /exam-questions")
    class GetAllQuestionsTests {

        @Test
        @DisplayName("Deve retornar lista de questões")
        void shouldReturnListOfQuestions() throws Exception {
            when(examQuestionService.getAllQuestions()).thenReturn(List.of(examQuestionDTO));

            mockMvc.perform(get("/exam-questions"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(1))
                    .andExpect(jsonPath("$[0].id").value("Q001"))
                    .andExpect(jsonPath("$[0].domain").value("resilient"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia")
        void shouldReturnEmptyList() throws Exception {
            when(examQuestionService.getAllQuestions()).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/exam-questions"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== GET /exam-questions/random ====================

    @Nested
    @DisplayName("GET /exam-questions/random")
    class GetRandomQuestionsTests {

        @Test
        @DisplayName("Deve retornar questões aleatórias")
        void shouldReturnRandomQuestions() throws Exception {
            ExamQuestionDTO dto2 = new ExamQuestionDTO(
                    "Q002", "Outra pergunta?", List.of("A", "B"), "1",
                    "Explicação", "performance", "hard", false
            );

            when(examQuestionService.getRandomQuestions()).thenReturn(List.of(examQuestionDTO, dto2));

            mockMvc.perform(get("/exam-questions/random"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2));
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há questões")
        void shouldReturnEmptyListWhenNoQuestions() throws Exception {
            when(examQuestionService.getRandomQuestions()).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/exam-questions/random"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }
    }

    // ==================== GET /exam-questions/domain/{domain} ====================

    @Nested
    @DisplayName("GET /exam-questions/domain/{domain}")
    class GetQuestionsByDomainTests {

        @Test
        @DisplayName("Deve retornar questões por domínio")
        void shouldReturnQuestionsByDomain() throws Exception {
            when(examQuestionService.getQuestionsByDomain("resilient")).thenReturn(List.of(examQuestionDTO));

            mockMvc.perform(get("/exam-questions/domain/{domain}", "resilient"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(1))
                    .andExpect(jsonPath("$[0].domain").value("resilient"));
        }

        @Test
        @DisplayName("Deve retornar lista vazia para domínio sem questões")
        void shouldReturnEmptyListForEmptyDomain() throws Exception {
            when(examQuestionService.getQuestionsByDomain("unknown")).thenReturn(Collections.emptyList());

            mockMvc.perform(get("/exam-questions/domain/{domain}", "unknown"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(0));
        }

        @Test
        @DisplayName("Deve buscar por domínio secure")
        void shouldSearchBySecureDomain() throws Exception {
            ExamQuestionDTO secureDTO = new ExamQuestionDTO(
                    "Q002", "Segurança?", List.of("A", "B"), "0",
                    "Explicação", "secure", "medium", false
            );

            when(examQuestionService.getQuestionsByDomain("secure")).thenReturn(List.of(secureDTO));

            mockMvc.perform(get("/exam-questions/domain/{domain}", "secure"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].domain").value("secure"));
        }
    }

    // ==================== GET /exam-questions/stats ====================

    @Nested
    @DisplayName("GET /exam-questions/stats")
    class GetStatsTests {

        @Test
        @DisplayName("Deve retornar estatísticas das questões")
        void shouldReturnStats() throws Exception {
            Map<String, Object> stats = Map.of(
                    "total", 100L,
                    "resilient", 25L,
                    "performance", 25L,
                    "secure", 25L,
                    "cost", 25L
            );

            when(examQuestionService.getQuestionStats()).thenReturn(stats);

            mockMvc.perform(get("/exam-questions/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.total").value(100))
                    .andExpect(jsonPath("$.resilient").value(25))
                    .andExpect(jsonPath("$.secure").value(25));
        }

        @Test
        @DisplayName("Deve retornar estatísticas zeradas")
        void shouldReturnZeroStats() throws Exception {
            Map<String, Object> stats = Map.of(
                    "total", 0L,
                    "resilient", 0L,
                    "performance", 0L,
                    "secure", 0L,
                    "cost", 0L
            );

            when(examQuestionService.getQuestionStats()).thenReturn(stats);

            mockMvc.perform(get("/exam-questions/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.total").value(0));
        }
    }

    // ==================== DELETE /exam-questions/all ====================

    @Nested
    @DisplayName("DELETE /exam-questions/all")
    class DeleteAllTests {

        @Test
        @DisplayName("Deve deletar todas as questões com sucesso")
        void shouldDeleteAllSuccessfully() throws Exception {
            doNothing().when(examQuestionService).deleteAll();

            mockMvc.perform(delete("/exam-questions/all"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message").value("Todas as questões foram removidas"));

            verify(examQuestionService).deleteAll();
        }
    }
}
