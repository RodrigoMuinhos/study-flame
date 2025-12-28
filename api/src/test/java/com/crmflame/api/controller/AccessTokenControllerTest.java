package com.crmflame.api.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.crmflame.api.model.AccessToken;
import com.crmflame.api.model.Lead;
import com.crmflame.api.service.AccessTokenService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(AccessTokenController.class)
@AutoConfigureMockMvc
@DisplayName("AccessTokenController Integration Tests")
class AccessTokenControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
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
        token.setLastUsedAt(LocalDateTime.now());
        return token;
    }

    private AccessToken createInactiveToken(Lead lead) {
        AccessToken token = createMockToken(lead);
        token.setId(UUID.randomUUID());
        token.setToken("XXXX-INACTIVE-YYYY");
        token.setIsActive(false);
        token.setRevokedAt(LocalDateTime.now());
        token.setRevokedReason("MANUALLY_REVOKED");
        return token;
    }

    // ==================== POST /tokens/generate ====================

    @Nested
    @DisplayName("POST /tokens/generate")
    class GenerateTokenTests {

        @Test
        @DisplayName("Deve retornar 200 e AccessTokenDTO quando sucesso")
        void shouldReturn200AndDTOWhenSuccess() throws Exception {
            // Arrange
            when(accessTokenService.generateTokenByCpf(CPF)).thenReturn(mockToken);

            String requestBody = objectMapper.writeValueAsString(
                    new GenerateTokenRequestTest(CPF)
            );

            // Act & Assert
            mockMvc.perform(post("/tokens/generate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.id").value(mockToken.getId().toString()))
                    .andExpect(jsonPath("$.token").value(TOKEN_STRING))
                    .andExpect(jsonPath("$.leadId").value(mockLead.getId().toString()))
                    .andExpect(jsonPath("$.leadName").value(mockLead.getName()))
                    .andExpect(jsonPath("$.leadEmail").value(mockLead.getEmail()))
                    .andExpect(jsonPath("$.leadCpf").value(mockLead.getCpf()))
                    .andExpect(jsonPath("$.isActive").value(true))
                    .andExpect(jsonPath("$.createdAt").exists())
                    .andExpect(jsonPath("$.expiresAt").exists())
                    .andExpect(jsonPath("$.daysUntilExpiration").exists())
                    .andExpect(jsonPath("$.expired").value(false));

            verify(accessTokenService).generateTokenByCpf(CPF);
        }

        @Test
        @DisplayName("Deve retornar 400 com erro quando lead não encontrado")
        void shouldReturn400WhenLeadNotFound() throws Exception {
            // Arrange
            String errorMessage = "Lead não encontrado com CPF: " + CPF;
            when(accessTokenService.generateTokenByCpf(CPF))
                    .thenThrow(new RuntimeException(errorMessage));

            String requestBody = objectMapper.writeValueAsString(
                    new GenerateTokenRequestTest(CPF)
            );

            // Act & Assert
            mockMvc.perform(post("/tokens/generate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.error").value(errorMessage));
        }

        @Test
        @DisplayName("Deve retornar 400 quando CPF inválido")
        void shouldReturn400WhenInvalidCpf() throws Exception {
            // Arrange - CPF com formato inválido
            String requestBody = "{\"cpf\": \"123\"}";

            // Act & Assert
            mockMvc.perform(post("/tokens/generate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Deve retornar 400 quando CPF ausente")
        void shouldReturn400WhenCpfMissing() throws Exception {
            // Arrange
            String requestBody = "{}";

            // Act & Assert
            mockMvc.perform(post("/tokens/generate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }
    }

    // ==================== POST /tokens/validate ====================

    @Nested
    @DisplayName("POST /tokens/validate")
    class ValidateTokenTests {

        @Test
        @DisplayName("Deve retornar 200 com valid=false quando token inválido")
        void shouldReturn200WithInvalidWhenTokenInvalid() throws Exception {
            // Arrange
            when(accessTokenService.validateToken(TOKEN_STRING)).thenReturn(Optional.empty());

            String requestBody = objectMapper.writeValueAsString(
                    new ValidateTokenRequestTest(TOKEN_STRING)
            );

            // Act & Assert
            mockMvc.perform(post("/tokens/validate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.valid").value(false))
                    .andExpect(jsonPath("$.message").value("Token inválido ou expirado"));
        }

        @Test
        @DisplayName("Deve retornar 200 com dados do lead quando token válido")
        void shouldReturn200WithLeadDataWhenTokenValid() throws Exception {
            // Arrange
            when(accessTokenService.validateToken(TOKEN_STRING)).thenReturn(Optional.of(mockToken));

            String requestBody = objectMapper.writeValueAsString(
                    new ValidateTokenRequestTest(TOKEN_STRING)
            );

            // Act & Assert
            mockMvc.perform(post("/tokens/validate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.valid").value(true))
                    .andExpect(jsonPath("$.message").value("Token válido"))
                    .andExpect(jsonPath("$.leadId").value(mockLead.getId().toString()))
                    .andExpect(jsonPath("$.leadName").value(mockLead.getName()))
                    .andExpect(jsonPath("$.leadEmail").value(mockLead.getEmail()))
                    .andExpect(jsonPath("$.leadCpf").value(mockLead.getCpf()))
                    .andExpect(jsonPath("$.expiresAt").exists())
                    .andExpect(jsonPath("$.daysUntilExpiration").exists());
        }

        @Test
        @DisplayName("Deve retornar 400 quando token ausente")
        void shouldReturn400WhenTokenMissing() throws Exception {
            // Arrange
            String requestBody = "{}";

            // Act & Assert
            mockMvc.perform(post("/tokens/validate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }
    }

    // ==================== GET /tokens/cpf/{cpf} ====================

    @Nested
    @DisplayName("GET /tokens/cpf/{cpf}")
    class GetTokenByCpfTests {

        @Test
        @DisplayName("Deve retornar 200 com hasActiveToken=false quando não há token")
        void shouldReturn200WithNoTokenWhenNotExists() throws Exception {
            // Arrange
            when(accessTokenService.getActiveTokenByCpf(CPF)).thenReturn(Optional.empty());

            // Act & Assert
            mockMvc.perform(get("/tokens/cpf/{cpf}", CPF))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.hasActiveToken").value(false))
                    .andExpect(jsonPath("$.message").value("Nenhum token ativo encontrado"));
        }

        @Test
        @DisplayName("Deve retornar 200 com hasActiveToken=true e token quando existe")
        void shouldReturn200WithTokenWhenExists() throws Exception {
            // Arrange
            when(accessTokenService.getActiveTokenByCpf(CPF)).thenReturn(Optional.of(mockToken));

            // Act & Assert
            mockMvc.perform(get("/tokens/cpf/{cpf}", CPF))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.hasActiveToken").value(true))
                    .andExpect(jsonPath("$.token").exists())
                    .andExpect(jsonPath("$.token.id").value(mockToken.getId().toString()))
                    .andExpect(jsonPath("$.token.token").value(TOKEN_STRING))
                    .andExpect(jsonPath("$.token.leadName").value(mockLead.getName()))
                    .andExpect(jsonPath("$.token.leadEmail").value(mockLead.getEmail()))
                    .andExpect(jsonPath("$.token.leadCpf").value(mockLead.getCpf()))
                    .andExpect(jsonPath("$.token.isActive").value(true));
        }
    }

    // ==================== GET /tokens/cpf/{cpf}/history ====================

    @Nested
    @DisplayName("GET /tokens/cpf/{cpf}/history")
    class GetTokenHistoryTests {

        @Test
        @DisplayName("Deve retornar 200 com lista vazia quando não há histórico")
        void shouldReturn200WithEmptyListWhenNoHistory() throws Exception {
            // Arrange
            when(accessTokenService.getAllTokensByCpf(CPF)).thenReturn(List.of());

            // Act & Assert
            mockMvc.perform(get("/tokens/cpf/{cpf}/history", CPF))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$.length()").value(0));
        }

        @Test
        @DisplayName("Deve retornar 200 com lista de AccessTokenDTO quando existe histórico")
        void shouldReturn200WithTokenListWhenHistoryExists() throws Exception {
            // Arrange
            AccessToken inactiveToken = createInactiveToken(mockLead);
            List<AccessToken> tokens = Arrays.asList(mockToken, inactiveToken);
            when(accessTokenService.getAllTokensByCpf(CPF)).thenReturn(tokens);

            // Act & Assert
            mockMvc.perform(get("/tokens/cpf/{cpf}/history", CPF))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].id").value(mockToken.getId().toString()))
                    .andExpect(jsonPath("$[0].token").value(TOKEN_STRING))
                    .andExpect(jsonPath("$[0].isActive").value(true))
                    .andExpect(jsonPath("$[1].id").value(inactiveToken.getId().toString()))
                    .andExpect(jsonPath("$[1].isActive").value(false));
        }
    }

    // ==================== DELETE /tokens/{id} ====================

    @Nested
    @DisplayName("DELETE /tokens/{id}")
    class RevokeTokenByIdTests {

        @Test
        @DisplayName("Deve retornar 200 com success=true quando token revogado")
        void shouldReturn200WithSuccessWhenTokenRevoked() throws Exception {
            // Arrange
            UUID tokenId = mockToken.getId();
            when(accessTokenService.revokeToken(eq(tokenId), anyString())).thenReturn(true);

            // Act & Assert
            mockMvc.perform(delete("/tokens/{id}", tokenId)
                            .param("reason", "REVOGADO_PELO_ADMIN"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.message").value("Token revogado com sucesso"));
        }

        @Test
        @DisplayName("Deve retornar 200 com success=true usando reason padrão")
        void shouldReturn200WithDefaultReason() throws Exception {
            // Arrange
            UUID tokenId = mockToken.getId();
            when(accessTokenService.revokeToken(eq(tokenId), eq("REVOGADO_PELO_ADMIN"))).thenReturn(true);

            // Act & Assert
            mockMvc.perform(delete("/tokens/{id}", tokenId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true));
        }

        @Test
        @DisplayName("Deve retornar 404 quando token não encontrado")
        void shouldReturn404WhenTokenNotFound() throws Exception {
            // Arrange
            UUID tokenId = UUID.randomUUID();
            when(accessTokenService.revokeToken(eq(tokenId), anyString())).thenReturn(false);

            // Act & Assert
            mockMvc.perform(delete("/tokens/{id}", tokenId)
                            .param("reason", "TEST"))
                    .andExpect(status().isNotFound());
        }
    }

    // ==================== DELETE /tokens/revoke/{token} ====================

    @Nested
    @DisplayName("DELETE /tokens/revoke/{token}")
    class RevokeTokenByStringTests {

        @Test
        @DisplayName("Deve retornar 200 com success=true quando token revogado")
        void shouldReturn200WithSuccessWhenTokenRevoked() throws Exception {
            // Arrange
            when(accessTokenService.revokeTokenByString(eq(TOKEN_STRING), anyString())).thenReturn(true);

            // Act & Assert
            mockMvc.perform(delete("/tokens/revoke/{token}", TOKEN_STRING)
                            .param("reason", "REVOGADO_PELO_ADMIN"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.message").value("Token revogado com sucesso"));
        }

        @Test
        @DisplayName("Deve retornar 404 quando token não encontrado")
        void shouldReturn404WhenTokenNotFound() throws Exception {
            // Arrange
            String unknownToken = "XXXX-UNKNOWN-YYYY";
            when(accessTokenService.revokeTokenByString(eq(unknownToken), anyString())).thenReturn(false);

            // Act & Assert
            mockMvc.perform(delete("/tokens/revoke/{token}", unknownToken)
                            .param("reason", "TEST"))
                    .andExpect(status().isNotFound());
        }
    }

    // ==================== GET /tokens/stats ====================

    @Nested
    @DisplayName("GET /tokens/stats")
    class GetStatsTests {

        @Test
        @DisplayName("Deve retornar 200 com estatísticas de tokens")
        void shouldReturn200WithTokenStats() throws Exception {
            // Arrange
            AccessTokenService.TokenStats stats = new AccessTokenService.TokenStats(10, 5, 20);
            when(accessTokenService.getTokenStats()).thenReturn(stats);

            // Act & Assert
            mockMvc.perform(get("/tokens/stats"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.activeTokens").value(10))
                    .andExpect(jsonPath("$.expiredTokens").value(5))
                    .andExpect(jsonPath("$.totalTokens").value(20));
        }

        @Test
        @DisplayName("Deve retornar 200 com zeros quando não há tokens")
        void shouldReturn200WithZerosWhenNoTokens() throws Exception {
            // Arrange
            AccessTokenService.TokenStats stats = new AccessTokenService.TokenStats(0, 0, 0);
            when(accessTokenService.getTokenStats()).thenReturn(stats);

            // Act & Assert
            mockMvc.perform(get("/tokens/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.activeTokens").value(0))
                    .andExpect(jsonPath("$.expiredTokens").value(0))
                    .andExpect(jsonPath("$.totalTokens").value(0));
        }
    }

    // ==================== GET /tokens/active ====================

    @Nested
    @DisplayName("GET /tokens/active")
    class GetActiveTokensTests {

        @Test
        @DisplayName("Deve retornar 200 com lista vazia quando não há tokens ativos")
        void shouldReturn200WithEmptyListWhenNoActiveTokens() throws Exception {
            // Arrange
            when(accessTokenService.getAllActiveTokens()).thenReturn(List.of());

            // Act & Assert
            mockMvc.perform(get("/tokens/active"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$.length()").value(0));
        }

        @Test
        @DisplayName("Deve retornar 200 com lista de AccessTokenDTO quando existem tokens ativos")
        void shouldReturn200WithTokenListWhenActiveTokensExist() throws Exception {
            // Arrange
            Lead lead2 = createMockLead();
            lead2.setId(UUID.randomUUID());
            lead2.setName("Maria Santos");
            lead2.setEmail("maria.santos@email.com");
            lead2.setCpf("98765432109");

            AccessToken token2 = createMockToken(lead2);
            token2.setId(UUID.randomUUID());
            token2.setToken("YYYY-654321-ZZZZ");

            List<AccessToken> tokens = Arrays.asList(mockToken, token2);
            when(accessTokenService.getAllActiveTokens()).thenReturn(tokens);

            // Act & Assert
            mockMvc.perform(get("/tokens/active"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].id").value(mockToken.getId().toString()))
                    .andExpect(jsonPath("$[0].token").value(TOKEN_STRING))
                    .andExpect(jsonPath("$[0].leadName").value(mockLead.getName()))
                    .andExpect(jsonPath("$[0].isActive").value(true))
                    .andExpect(jsonPath("$[1].id").value(token2.getId().toString()))
                    .andExpect(jsonPath("$[1].token").value("YYYY-654321-ZZZZ"))
                    .andExpect(jsonPath("$[1].leadName").value("Maria Santos"))
                    .andExpect(jsonPath("$[1].isActive").value(true));
        }
    }

    // ==================== INNER CLASSES FOR REQUEST BODIES ====================

    /**
     * Classe auxiliar para simular o GenerateTokenRequest
     */
    private static class GenerateTokenRequestTest {
        private String cpf;

        public GenerateTokenRequestTest(String cpf) {
            this.cpf = cpf;
        }

        public String getCpf() {
            return cpf;
        }

        public void setCpf(String cpf) {
            this.cpf = cpf;
        }
    }

    /**
     * Classe auxiliar para simular o ValidateTokenRequest
     */
    private static class ValidateTokenRequestTest {
        private String token;

        public ValidateTokenRequestTest(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
