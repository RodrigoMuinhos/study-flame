package com.crmflame.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuração do Swagger/OpenAPI
 * 
 * Acesse a documentação em:
 * - Swagger UI: http://localhost:8080/api/swagger-ui.html
 * - OpenAPI JSON: http://localhost:8080/api/v3/api-docs
 */
@Configuration
public class OpenApiConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(
                        new Server()
                                .url("http://localhost:" + serverPort + "/api")
                                .description("Servidor de Desenvolvimento"),
                        new Server()
                                .url("https://api.crmflame.com/api")
                                .description("Servidor de Produção")
                ))
                .tags(List.of(
                        new Tag().name("Health").description("Endpoints de saúde da aplicação"),
                        new Tag().name("Admin Users").description("Gerenciamento de administradores do sistema"),
                        new Tag().name("Auth").description("Autenticação de alunos"),
                        new Tag().name("Leads").description("Gerenciamento de leads/alunos"),
                        new Tag().name("Student Access").description("Controle de acesso de alunos"),
                        new Tag().name("AWS Tokens").description("Geração e validação de tokens AWS Study"),
                        new Tag().name("Gamification").description("Sistema de gamificação (XP, badges, níveis)"),
                        new Tag().name("Exam Questions").description("Questões de exames AWS")
                ))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Token JWT obtido via login")
                        )
                )
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }

    private Info apiInfo() {
        return new Info()
                .title("CRM Flame API")
                .version("1.0.0")
                .description("""
                        ## API REST do Bootcamp FLAME
                        
                        Esta API fornece endpoints para:
                        
                        - **Gerenciamento de Leads**: CRUD completo de leads/alunos
                        - **Autenticação**: Login via CPF/senha com JWT
                        - **AWS Study**: Geração de tokens para plataforma de estudos
                        - **Gamificação**: XP, badges, níveis e conquistas
                        - **Exames**: Sistema de questões para simulados AWS
                        
                        ### Fluxo de Autenticação
                        
                        1. `POST /auth/login` com CPF e senha
                        2. Receba o `accessToken` no response
                        3. Use o token no header: `Authorization: Bearer {token}`
                        
                        ### Códigos de Status
                        
                        | Código | Significado |
                        |--------|-------------|
                        | 200 | Sucesso |
                        | 201 | Criado com sucesso |
                        | 400 | Dados inválidos |
                        | 401 | Não autenticado |
                        | 403 | Sem permissão |
                        | 404 | Não encontrado |
                        | 500 | Erro interno |
                        """)
                .contact(new Contact()
                        .name("Equipe CRM Flame")
                        .email("suporte@crmflame.com")
                        .url("https://crmflame.com")
                )
                .license(new License()
                        .name("Proprietária")
                        .url("https://crmflame.com/termos")
                );
    }
}
