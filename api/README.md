# API - CRM FLAME

API REST desenvolvida em Java 21 com Spring Boot 3.5 para gerenciamento de leads e autenticação de alunos.

## 🚀 Tecnologias

- **Java** 21
- **Spring Boot** 3.5.0
- **Spring Data JPA** (Hibernate 6.6.15)
- **PostgreSQL** 42.7.7 (Neon Cloud)
- **Maven** 3.9.11
- **Lombok** - Redução de boilerplate

## 📋 Pré-requisitos

- Java 21 JDK instalado
- Maven 3.9+ instalado
- Conta no Neon PostgreSQL (ou outro PostgreSQL)

## 🔧 Configuração

Configure `src/main/resources/application.properties`:

```properties
spring.application.name=crm-flame-api
server.port=8080
server.servlet.context-path=/api

# PostgreSQL (Neon)
spring.datasource.url=jdbc:postgresql://[SEU-HOST].neon.tech/neondb
spring.datasource.username=neondb_owner
spring.datasource.password=[SUA-SENHA]

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

## 📦 Instalação e Execução

```bash
# Navegue até a pasta api
cd api

# Instale as dependências
mvn clean install

# Execute a aplicação
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080/api`

## 📚 Endpoints

### Leads

- `GET /api/leads` - Lista todos os leads
- `GET /api/leads/{id}` - Busca lead por ID
- `POST /api/leads` - Cria novo lead
- `PUT /api/leads/{id}` - Atualiza lead
- `PATCH /api/leads/{id}/status?status=CONTACTED` - Atualiza status
- `DELETE /api/leads/{id}` - Deleta lead
- `GET /api/leads/status/{status}` - Lista leads por status
- `GET /api/leads/search?name=João` - Busca leads por nome

### Student Access (Credenciais)

- `GET /api/student-access` - Lista todas as credenciais
- `GET /api/student-access/{id}` - Busca credencial por ID
- `POST /api/student-access/generate` - Gera credenciais para um lead
- `PATCH /api/student-access/{id}/regenerate-password` - Regenera senha
- `PATCH /api/student-access/{id}/toggle-access` - Ativa/desativa acesso
- `DELETE /api/student-access/{id}` - Deleta credencial

### Status disponíveis

- NEW
- CONTACTED
- QUALIFIED
- CONVERTED
- LOST

## 📝 Exemplo de Requisição

```json
POST /api/leads
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "85999999999",
  "cpf": "12345678901",
  "experience": "Básico - Conheço o básico",
  "notes": "Interessado em programação"
}
```

## 🗄️ Banco de Dados

O banco de dados PostgreSQL está hospedado no Neon e será criado automaticamente na primeira execução.
