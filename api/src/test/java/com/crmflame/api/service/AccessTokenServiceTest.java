package com.crmflame.api.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.crmflame.api.model.AccessToken;
import com.crmflame.api.model.Lead;
import com.crmflame.api.repository.AccessTokenRepository;
import com.crmflame.api.repository.LeadRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("AccessTokenService Unit Tests")
class AccessTokenServiceTest {

    @Mock
    private AccessTokenRepository accessTokenRepository;

    @Mock
    private LeadRepository leadRepository;

    @InjectMocks
    private AccessTokenService accessTokenService;

    private Lead mockLead;
    private AccessToken mockToken;
    private static final String CPF = "12345678901";
    private static final String TOKEN_STRING = "ABCD-123456-EFGH";

    @BeforeEach
    void setUp() {
        mockLead = createMockLead();
        mockToken = createMockToken(mockLead);
    }

    // ==================== HELPER METHODS ====================

    private Lead createMockLead() {
        Lead lead = new Lead();
        lead.setId(UUID.randomUUID());
        lead.setName("João da Silva");
        lead.setEmail("joao.silva@email.com");
        lead.setCpf(CPF);
        lead.setPhone("11999998888");
        lead.setExperience("Iniciante");
        lead.setCreatedAt(LocalDateTime.now());
        return lead;
    }

    private AccessToken createMockToken(Lead lead) {
        AccessToken token = new AccessToken();
        token.setId(UUID.randomUUID());
        token.setToken(TOKEN_STRING);
        token.setLead(lead);
        token.setIsActive(true);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusDays(90));
        return token;
    }

    private AccessToken createExpiredToken(Lead lead) {
        AccessToken token = new AccessToken();
        token.setId(UUID.randomUUID());
        token.setToken("XXXX-EXPIRED-YYYY");
        token.setLead(lead);
        token.setIsActive(true);
        token.setCreatedAt(LocalDateTime.now().minusDays(100));
        token.setExpiresAt(LocalDateTime.now().minusDays(10)); // Expirado há 10 dias
        return token;
    }

    // ==================== generateTokenByCpf TESTS ====================

    @Nested
    @DisplayName("generateTokenByCpf()")
    class GenerateTokenByCpfTests {

        @Test
        @DisplayName("Deve gerar token quando lead existe")
        void shouldGenerateTokenWhenLeadExists() {
            // Arrange
            when(leadRepository.findByCpf(CPF)).thenReturn(Optional.of(mockLead));
            when(accessTokenRepository.deactivateAllActiveTokensForLead(eq(mockLead), any(LocalDateTime.class)))
                    .thenReturn(1);
            when(accessTokenRepository.findByToken(anyString())).thenReturn(Optional.empty());
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            AccessToken result = accessTokenService.generateTokenByCpf(CPF);

            // Assert
            assertNotNull(result);
            assertNotNull(result.getToken());
            assertTrue(result.getIsActive());
            assertEquals(mockLead, result.getLead());

            // Verifica formato do token: XXXX-XXXXXX-XXXX
            String tokenPattern = "^[A-Z0-9]{4}-[A-Z0-9]{6}-[A-Z0-9]{4}$";
            assertTrue(result.getToken().matches(tokenPattern),
                    "Token deve seguir o formato XXXX-XXXXXX-XXXX, mas foi: " + result.getToken());

            // Verifica que desativou tokens anteriores
            verify(accessTokenRepository).deactivateAllActiveTokensForLead(eq(mockLead), any(LocalDateTime.class));

            // Verifica que salvou o novo token
            verify(accessTokenRepository).save(any(AccessToken.class));
        }

        @Test
        @DisplayName("Deve gerar token sem desativar quando não há tokens anteriores")
        void shouldGenerateTokenWithoutDeactivatingWhenNoPreviousTokens() {
            // Arrange
            when(leadRepository.findByCpf(CPF)).thenReturn(Optional.of(mockLead));
            when(accessTokenRepository.deactivateAllActiveTokensForLead(eq(mockLead), any(LocalDateTime.class)))
                    .thenReturn(0); // Nenhum token desativado
            when(accessTokenRepository.findByToken(anyString())).thenReturn(Optional.empty());
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            AccessToken result = accessTokenService.generateTokenByCpf(CPF);

            // Assert
            assertNotNull(result);
            assertTrue(result.getIsActive());
            verify(accessTokenRepository).save(any(AccessToken.class));
        }

        @Test
        @DisplayName("Deve lançar RuntimeException quando lead não existe")
        void shouldThrowRuntimeExceptionWhenLeadNotFound() {
            // Arrange
            when(leadRepository.findByCpf(CPF)).thenReturn(Optional.empty());

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class,
                    () -> accessTokenService.generateTokenByCpf(CPF));

            assertTrue(exception.getMessage().contains("Lead não encontrado"));

            // Verifica que não salvou nada
            verify(accessTokenRepository, never()).save(any(AccessToken.class));
            verify(accessTokenRepository, never()).deactivateAllActiveTokensForLead(any(), any());
        }

        @Test
        @DisplayName("Deve gerar token único quando primeira tentativa já existe")
        void shouldGenerateUniqueTokenWhenFirstAttemptExists() {
            // Arrange
            when(leadRepository.findByCpf(CPF)).thenReturn(Optional.of(mockLead));
            when(accessTokenRepository.deactivateAllActiveTokensForLead(eq(mockLead), any(LocalDateTime.class)))
                    .thenReturn(0);
            // Primeira tentativa retorna token existente, segunda retorna vazio
            when(accessTokenRepository.findByToken(anyString()))
                    .thenReturn(Optional.of(mockToken))
                    .thenReturn(Optional.empty());
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            AccessToken result = accessTokenService.generateTokenByCpf(CPF);

            // Assert
            assertNotNull(result);
            // Verifica que buscou pelo menos 2 vezes (para garantir unicidade)
            verify(accessTokenRepository, atLeast(2)).findByToken(anyString());
        }
    }

    // ==================== validateToken TESTS ====================

    @Nested
    @DisplayName("validateToken()")
    class ValidateTokenTests {

        @Test
        @DisplayName("Deve retornar Optional.empty quando token não existe")
        void shouldReturnEmptyWhenTokenNotFound() {
            // Arrange
            when(accessTokenRepository.findByTokenAndIsActiveTrue(TOKEN_STRING))
                    .thenReturn(Optional.empty());

            // Act
            Optional<AccessToken> result = accessTokenService.validateToken(TOKEN_STRING);

            // Assert
            assertTrue(result.isEmpty());
            verify(accessTokenRepository, never()).save(any(AccessToken.class));
        }

        @Test
        @DisplayName("Deve retornar Optional.empty e desativar quando token está expirado")
        void shouldReturnEmptyAndDeactivateWhenTokenExpired() {
            // Arrange
            AccessToken expiredToken = createExpiredToken(mockLead);
            when(accessTokenRepository.findByTokenAndIsActiveTrue(expiredToken.getToken()))
                    .thenReturn(Optional.of(expiredToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            Optional<AccessToken> result = accessTokenService.validateToken(expiredToken.getToken());

            // Assert
            assertTrue(result.isEmpty());

            // Captura o token que foi salvo
            ArgumentCaptor<AccessToken> tokenCaptor = ArgumentCaptor.forClass(AccessToken.class);
            verify(accessTokenRepository).save(tokenCaptor.capture());

            AccessToken savedToken = tokenCaptor.getValue();
            assertFalse(savedToken.getIsActive());
            assertNotNull(savedToken.getRevokedAt());
            assertEquals("EXPIRED", savedToken.getRevokedReason());
        }

        @Test
        @DisplayName("Deve retornar token válido e atualizar lastUsedAt")
        void shouldReturnValidTokenAndUpdateLastUsedAt() {
            // Arrange
            when(accessTokenRepository.findByTokenAndIsActiveTrue(TOKEN_STRING))
                    .thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            Optional<AccessToken> result = accessTokenService.validateToken(TOKEN_STRING);

            // Assert
            assertTrue(result.isPresent());
            assertEquals(mockToken.getId(), result.get().getId());

            // Verifica que atualizou lastUsedAt
            ArgumentCaptor<AccessToken> tokenCaptor = ArgumentCaptor.forClass(AccessToken.class);
            verify(accessTokenRepository).save(tokenCaptor.capture());

            AccessToken savedToken = tokenCaptor.getValue();
            assertNotNull(savedToken.getLastUsedAt());
        }

        @Test
        @DisplayName("Deve retornar dados do lead associado ao token válido")
        void shouldReturnLeadDataWhenTokenValid() {
            // Arrange
            when(accessTokenRepository.findByTokenAndIsActiveTrue(TOKEN_STRING))
                    .thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            Optional<AccessToken> result = accessTokenService.validateToken(TOKEN_STRING);

            // Assert
            assertTrue(result.isPresent());
            Lead leadFromToken = result.get().getLead();
            assertNotNull(leadFromToken);
            assertEquals(mockLead.getId(), leadFromToken.getId());
            assertEquals(mockLead.getName(), leadFromToken.getName());
            assertEquals(mockLead.getEmail(), leadFromToken.getEmail());
            assertEquals(mockLead.getCpf(), leadFromToken.getCpf());
        }
    }

    // ==================== revokeToken TESTS ====================

    @Nested
    @DisplayName("revokeToken()")
    class RevokeTokenTests {

        @Test
        @DisplayName("Deve retornar false quando token não existe")
        void shouldReturnFalseWhenTokenNotFound() {
            // Arrange
            UUID tokenId = UUID.randomUUID();
            when(accessTokenRepository.findById(tokenId)).thenReturn(Optional.empty());

            // Act
            boolean result = accessTokenService.revokeToken(tokenId, "TEST_REASON");

            // Assert
            assertFalse(result);
            verify(accessTokenRepository, never()).save(any(AccessToken.class));
        }

        @Test
        @DisplayName("Deve revogar token e retornar true quando token existe")
        void shouldRevokeTokenAndReturnTrueWhenTokenExists() {
            // Arrange
            UUID tokenId = mockToken.getId();
            when(accessTokenRepository.findById(tokenId)).thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            String reason = "REVOKED_BY_ADMIN";

            // Act
            boolean result = accessTokenService.revokeToken(tokenId, reason);

            // Assert
            assertTrue(result);

            ArgumentCaptor<AccessToken> tokenCaptor = ArgumentCaptor.forClass(AccessToken.class);
            verify(accessTokenRepository).save(tokenCaptor.capture());

            AccessToken savedToken = tokenCaptor.getValue();
            assertFalse(savedToken.getIsActive());
            assertNotNull(savedToken.getRevokedAt());
            assertEquals(reason, savedToken.getRevokedReason());
        }

        @Test
        @DisplayName("Deve usar motivo padrão quando reason é null")
        void shouldUseDefaultReasonWhenReasonIsNull() {
            // Arrange
            UUID tokenId = mockToken.getId();
            when(accessTokenRepository.findById(tokenId)).thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            boolean result = accessTokenService.revokeToken(tokenId, null);

            // Assert
            assertTrue(result);

            ArgumentCaptor<AccessToken> tokenCaptor = ArgumentCaptor.forClass(AccessToken.class);
            verify(accessTokenRepository).save(tokenCaptor.capture());

            AccessToken savedToken = tokenCaptor.getValue();
            assertEquals("MANUALLY_REVOKED", savedToken.getRevokedReason());
        }
    }

    // ==================== revokeTokenByString TESTS ====================

    @Nested
    @DisplayName("revokeTokenByString()")
    class RevokeTokenByStringTests {

        @Test
        @DisplayName("Deve retornar false quando token string não existe")
        void shouldReturnFalseWhenTokenStringNotFound() {
            // Arrange
            when(accessTokenRepository.findByToken(TOKEN_STRING)).thenReturn(Optional.empty());

            // Act
            boolean result = accessTokenService.revokeTokenByString(TOKEN_STRING, "TEST_REASON");

            // Assert
            assertFalse(result);
            verify(accessTokenRepository, never()).save(any(AccessToken.class));
        }

        @Test
        @DisplayName("Deve revogar token pela string e retornar true quando existe")
        void shouldRevokeTokenByStringWhenExists() {
            // Arrange
            when(accessTokenRepository.findByToken(TOKEN_STRING)).thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.findById(mockToken.getId())).thenReturn(Optional.of(mockToken));
            when(accessTokenRepository.save(any(AccessToken.class)))
                    .thenAnswer(invocation -> invocation.getArgument(0));

            // Act
            boolean result = accessTokenService.revokeTokenByString(TOKEN_STRING, "REVOKED_BY_ADMIN");

            // Assert
            assertTrue(result);
            verify(accessTokenRepository).save(any(AccessToken.class));
        }
    }

    // ==================== getActiveTokenByCpf TESTS ====================

    @Nested
    @DisplayName("getActiveTokenByCpf()")
    class GetActiveTokenByCpfTests {

        @Test
        @DisplayName("Deve retornar Optional.empty quando não há token ativo")
        void shouldReturnEmptyWhenNoActiveToken() {
            // Arrange
            when(accessTokenRepository.findActiveByLeadCpf(CPF)).thenReturn(Optional.empty());

            // Act
            Optional<AccessToken> result = accessTokenService.getActiveTokenByCpf(CPF);

            // Assert
            assertTrue(result.isEmpty());
        }

        @Test
        @DisplayName("Deve retornar token ativo quando existe")
        void shouldReturnActiveTokenWhenExists() {
            // Arrange
            when(accessTokenRepository.findActiveByLeadCpf(CPF)).thenReturn(Optional.of(mockToken));

            // Act
            Optional<AccessToken> result = accessTokenService.getActiveTokenByCpf(CPF);

            // Assert
            assertTrue(result.isPresent());
            assertEquals(mockToken.getId(), result.get().getId());
        }
    }

    // ==================== getAllTokensByCpf TESTS ====================

    @Nested
    @DisplayName("getAllTokensByCpf()")
    class GetAllTokensByCpfTests {

        @Test
        @DisplayName("Deve retornar lista vazia quando não há tokens")
        void shouldReturnEmptyListWhenNoTokens() {
            // Arrange
            when(accessTokenRepository.findByLeadCpf(CPF)).thenReturn(List.of());

            // Act
            List<AccessToken> result = accessTokenService.getAllTokensByCpf(CPF);

            // Assert
            assertNotNull(result);
            assertTrue(result.isEmpty());
        }

        @Test
        @DisplayName("Deve retornar todos os tokens do CPF")
        void shouldReturnAllTokensForCpf() {
            // Arrange
            AccessToken token2 = createMockToken(mockLead);
            token2.setId(UUID.randomUUID());
            token2.setToken("YYYY-654321-ZZZZ");
            token2.setIsActive(false);

            List<AccessToken> tokens = Arrays.asList(mockToken, token2);
            when(accessTokenRepository.findByLeadCpf(CPF)).thenReturn(tokens);

            // Act
            List<AccessToken> result = accessTokenService.getAllTokensByCpf(CPF);

            // Assert
            assertEquals(2, result.size());
        }
    }

    // ==================== getTokenStats TESTS ====================

    @Nested
    @DisplayName("getTokenStats()")
    class GetTokenStatsTests {

        @Test
        @DisplayName("Deve retornar estatísticas corretas")
        void shouldReturnCorrectStats() {
            // Arrange
            when(accessTokenRepository.countByIsActiveTrue()).thenReturn(10L);
            when(accessTokenRepository.countExpiredTokens(any(LocalDateTime.class))).thenReturn(5L);
            when(accessTokenRepository.count()).thenReturn(20L);

            // Act
            AccessTokenService.TokenStats stats = accessTokenService.getTokenStats();

            // Assert
            assertNotNull(stats);
            assertEquals(10L, stats.active());
            assertEquals(5L, stats.expired());
            assertEquals(20L, stats.total());
        }

        @Test
        @DisplayName("Deve retornar zeros quando não há tokens")
        void shouldReturnZerosWhenNoTokens() {
            // Arrange
            when(accessTokenRepository.countByIsActiveTrue()).thenReturn(0L);
            when(accessTokenRepository.countExpiredTokens(any(LocalDateTime.class))).thenReturn(0L);
            when(accessTokenRepository.count()).thenReturn(0L);

            // Act
            AccessTokenService.TokenStats stats = accessTokenService.getTokenStats();

            // Assert
            assertEquals(0L, stats.active());
            assertEquals(0L, stats.expired());
            assertEquals(0L, stats.total());
        }
    }

    // ==================== getAllActiveTokens TESTS ====================

    @Nested
    @DisplayName("getAllActiveTokens()")
    class GetAllActiveTokensTests {

        @Test
        @DisplayName("Deve retornar apenas tokens válidos")
        void shouldReturnOnlyValidTokens() {
            // Arrange
            AccessToken expiredToken = createExpiredToken(mockLead);
            AccessToken inactiveToken = createMockToken(mockLead);
            inactiveToken.setIsActive(false);

            List<AccessToken> allTokens = Arrays.asList(mockToken, expiredToken, inactiveToken);
            when(accessTokenRepository.findAll()).thenReturn(allTokens);

            // Act
            List<AccessToken> result = accessTokenService.getAllActiveTokens();

            // Assert
            // Apenas mockToken é válido (ativo e não expirado)
            assertEquals(1, result.size());
            assertEquals(mockToken.getId(), result.get(0).getId());
        }

        @Test
        @DisplayName("Deve retornar lista vazia quando não há tokens válidos")
        void shouldReturnEmptyListWhenNoValidTokens() {
            // Arrange
            when(accessTokenRepository.findAll()).thenReturn(List.of());

            // Act
            List<AccessToken> result = accessTokenService.getAllActiveTokens();

            // Assert
            assertTrue(result.isEmpty());
        }
    }

    // ==================== getTokenById TESTS ====================

    @Nested
    @DisplayName("getTokenById()")
    class GetTokenByIdTests {

        @Test
        @DisplayName("Deve retornar token quando existe")
        void shouldReturnTokenWhenExists() {
            // Arrange
            UUID tokenId = mockToken.getId();
            when(accessTokenRepository.findById(tokenId)).thenReturn(Optional.of(mockToken));

            // Act
            Optional<AccessToken> result = accessTokenService.getTokenById(tokenId);

            // Assert
            assertTrue(result.isPresent());
            assertEquals(tokenId, result.get().getId());
        }

        @Test
        @DisplayName("Deve retornar Optional.empty quando não existe")
        void shouldReturnEmptyWhenNotExists() {
            // Arrange
            UUID tokenId = UUID.randomUUID();
            when(accessTokenRepository.findById(tokenId)).thenReturn(Optional.empty());

            // Act
            Optional<AccessToken> result = accessTokenService.getTokenById(tokenId);

            // Assert
            assertTrue(result.isEmpty());
        }
    }
}
