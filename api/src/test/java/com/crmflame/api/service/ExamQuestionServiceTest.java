package com.crmflame.api.service;

import com.crmflame.api.dto.ExamQuestionDTO;
import com.crmflame.api.model.ExamQuestion;
import com.crmflame.api.repository.ExamQuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ExamQuestionService Tests")
class ExamQuestionServiceTest {

    @Mock
    private ExamQuestionRepository repository;

    @InjectMocks
    private ExamQuestionService examQuestionService;

    private ExamQuestion examQuestion;
    private ExamQuestionDTO examQuestionDTO;

    @BeforeEach
    void setUp() {
        List<String> options = Arrays.asList(
                "Amazon S3",
                "Amazon EC2",
                "Amazon RDS",
                "Amazon Lambda"
        );

        examQuestion = new ExamQuestion();
        examQuestion.setId("Q001");
        examQuestion.setQuestion("Qual serviço AWS é usado para armazenamento de objetos?");
        examQuestion.setOptions(options);
        examQuestion.setCorrectAnswer("0");
        examQuestion.setExplanation("Amazon S3 é o serviço de armazenamento de objetos da AWS.");
        examQuestion.setDomain("resilient");
        examQuestion.setDifficulty("easy");
        examQuestion.setMultipleChoice(false);

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
    }

    // ==================== saveAll ====================

    @Nested
    @DisplayName("saveAll()")
    class SaveAllTests {

        @Test
        @DisplayName("Deve salvar lista de questões com sucesso")
        void shouldSaveQuestionsSuccessfully() {
            List<ExamQuestionDTO> questionsDTO = List.of(examQuestionDTO);
            when(repository.saveAll(anyList())).thenReturn(List.of(examQuestion));

            List<ExamQuestion> result = examQuestionService.saveAll(questionsDTO);

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getId()).isEqualTo("Q001");
            verify(repository).saveAll(anyList());
        }

        @Test
        @DisplayName("Deve salvar lista vazia")
        void shouldSaveEmptyList() {
            when(repository.saveAll(anyList())).thenReturn(Collections.emptyList());

            List<ExamQuestion> result = examQuestionService.saveAll(Collections.emptyList());

            assertThat(result).isEmpty();
        }

        @Test
        @DisplayName("Deve salvar múltiplas questões")
        void shouldSaveMultipleQuestions() {
            ExamQuestionDTO dto2 = new ExamQuestionDTO(
                    "Q002", "Outra pergunta?", List.of("A", "B"), "1",
                    "Explicação", "secure", "medium", true
            );
            ExamQuestion question2 = new ExamQuestion();
            question2.setId("Q002");
            question2.setQuestion("Outra pergunta?");

            when(repository.saveAll(anyList())).thenReturn(List.of(examQuestion, question2));

            List<ExamQuestion> result = examQuestionService.saveAll(List.of(examQuestionDTO, dto2));

            assertThat(result).hasSize(2);
        }
    }

    // ==================== getAllQuestions ====================

    @Nested
    @DisplayName("getAllQuestions()")
    class GetAllQuestionsTests {

        @Test
        @DisplayName("Deve retornar lista de questões")
        void shouldReturnListOfQuestions() {
            when(repository.findAll()).thenReturn(List.of(examQuestion));

            List<ExamQuestionDTO> result = examQuestionService.getAllQuestions();

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getId()).isEqualTo("Q001");
            assertThat(result.get(0).getQuestion()).contains("armazenamento de objetos");
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há questões")
        void shouldReturnEmptyListWhenNoQuestions() {
            when(repository.findAll()).thenReturn(Collections.emptyList());

            List<ExamQuestionDTO> result = examQuestionService.getAllQuestions();

            assertThat(result).isEmpty();
        }
    }

    // ==================== getQuestionsByDomain ====================

    @Nested
    @DisplayName("getQuestionsByDomain()")
    class GetQuestionsByDomainTests {

        @Test
        @DisplayName("Deve retornar questões por domínio")
        void shouldReturnQuestionsByDomain() {
            when(repository.findByDomain("resilient")).thenReturn(List.of(examQuestion));

            List<ExamQuestionDTO> result = examQuestionService.getQuestionsByDomain("resilient");

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getDomain()).isEqualTo("resilient");
        }

        @Test
        @DisplayName("Deve retornar lista vazia para domínio inexistente")
        void shouldReturnEmptyListForUnknownDomain() {
            when(repository.findByDomain("unknown")).thenReturn(Collections.emptyList());

            List<ExamQuestionDTO> result = examQuestionService.getQuestionsByDomain("unknown");

            assertThat(result).isEmpty();
        }

        @Test
        @DisplayName("Deve buscar por domínio secure")
        void shouldSearchBySecureDomain() {
            ExamQuestion secureQuestion = new ExamQuestion();
            secureQuestion.setId("Q002");
            secureQuestion.setDomain("secure");
            secureQuestion.setQuestion("Segurança?");
            secureQuestion.setOptions(List.of("A", "B"));
            secureQuestion.setCorrectAnswer("0");
            secureQuestion.setExplanation("Explicação");
            secureQuestion.setDifficulty("medium");

            when(repository.findByDomain("secure")).thenReturn(List.of(secureQuestion));

            List<ExamQuestionDTO> result = examQuestionService.getQuestionsByDomain("secure");

            assertThat(result).hasSize(1);
            assertThat(result.get(0).getDomain()).isEqualTo("secure");
        }
    }

    // ==================== getRandomQuestions ====================

    @Nested
    @DisplayName("getRandomQuestions()")
    class GetRandomQuestionsTests {

        @Test
        @DisplayName("Deve retornar questões aleatórias")
        void shouldReturnRandomQuestions() {
            ExamQuestion question2 = new ExamQuestion();
            question2.setId("Q002");
            question2.setQuestion("Pergunta 2?");
            question2.setOptions(List.of("A", "B"));
            question2.setCorrectAnswer("1");
            question2.setExplanation("Explicação 2");
            question2.setDomain("performance");
            question2.setDifficulty("hard");

            when(repository.findAllRandom()).thenReturn(List.of(examQuestion, question2));

            List<ExamQuestionDTO> result = examQuestionService.getRandomQuestions();

            assertThat(result).hasSize(2);
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há questões")
        void shouldReturnEmptyListWhenNoQuestions() {
            when(repository.findAllRandom()).thenReturn(Collections.emptyList());

            List<ExamQuestionDTO> result = examQuestionService.getRandomQuestions();

            assertThat(result).isEmpty();
        }
    }

    // ==================== getQuestionStats ====================

    @Nested
    @DisplayName("getQuestionStats()")
    class GetQuestionStatsTests {

        @Test
        @DisplayName("Deve retornar estatísticas das questões")
        void shouldReturnQuestionStats() {
            when(repository.count()).thenReturn(100L);
            when(repository.countByDomain("resilient")).thenReturn(25L);
            when(repository.countByDomain("performance")).thenReturn(25L);
            when(repository.countByDomain("secure")).thenReturn(25L);
            when(repository.countByDomain("cost")).thenReturn(25L);

            Map<String, Object> result = examQuestionService.getQuestionStats();

            assertThat(result).containsEntry("total", 100L);
            assertThat(result).containsEntry("resilient", 25L);
            assertThat(result).containsEntry("performance", 25L);
            assertThat(result).containsEntry("secure", 25L);
            assertThat(result).containsEntry("cost", 25L);
        }

        @Test
        @DisplayName("Deve retornar estatísticas zeradas quando não há questões")
        void shouldReturnZeroStatsWhenNoQuestions() {
            when(repository.count()).thenReturn(0L);
            when(repository.countByDomain(anyString())).thenReturn(0L);

            Map<String, Object> result = examQuestionService.getQuestionStats();

            assertThat(result).containsEntry("total", 0L);
        }
    }

    // ==================== deleteAll ====================

    @Nested
    @DisplayName("deleteAll()")
    class DeleteAllTests {

        @Test
        @DisplayName("Deve deletar todas as questões")
        void shouldDeleteAllQuestions() {
            doNothing().when(repository).deleteAll();

            examQuestionService.deleteAll();

            verify(repository).deleteAll();
        }
    }
}
