# CRM Flame API - Backend

API REST desenvolvida em Java 21 com Spring Boot para gerenciamento de leads.

## 🚀 Tecnologias

- Java 21
- Spring Boot 3.2.1
- Spring Data JPA
- PostgreSQL (Neon)
- Maven
- Lombok

## 📋 Pré-requisitos

- Java 21 instalado
- Maven instalado
- Conta no Neon (PostgreSQL)

## 🔧 Configuração

As configurações do banco de dados estão em `src/main/resources/application.properties`.

## 📦 Instalação e Execução

```bash
# Clone o repositório
cd backend

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
- `PATCH /api/leads/{id}/status?status=CONTACTED` - Atualiza status do lead
- `DELETE /api/leads/{id}` - Deleta lead
- `GET /api/leads/status/{status}` - Lista leads por status
- `GET /api/leads/search?name=João` - Busca leads por nome

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
