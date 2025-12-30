# Sistema de Interações com Questões - CRM Flame

## 📋 Visão Geral

Sistema completo para gerenciar curtidas, comentários e avaliações nas questões de exame, permitindo que todos os usuários visualizem e interajam com o conteúdo.

## 🗄️ Estrutura do Banco de Dados

### Tabelas Criadas

#### 1. **question_likes**
Armazena as curtidas dos alunos nas questões.
- `id` (BIGSERIAL PRIMARY KEY)
- `question_id` (VARCHAR 100)
- `student_name` (VARCHAR 100)
- `student_cpf` (VARCHAR 20)
- `created_at` (TIMESTAMP)
- UNIQUE constraint: (question_id, student_cpf)

#### 2. **question_comments**
Armazena comentários dos alunos nas questões.
- `id` (BIGSERIAL PRIMARY KEY)
- `question_id` (VARCHAR 100)
- `student_name` (VARCHAR 100)
- `student_cpf` (VARCHAR 20)
- `comment` (TEXT)
- `likes` (INTEGER) - atualizado automaticamente via trigger
- `is_helpful` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

#### 3. **comment_likes**
Armazena curtidas em comentários.
- `id` (BIGSERIAL PRIMARY KEY)
- `comment_id` (BIGINT) - FK para question_comments
- `student_cpf` (VARCHAR 20)
- `created_at` (TIMESTAMP)
- UNIQUE constraint: (comment_id, student_cpf)

#### 4. **question_ratings**
Armazena avaliações de dificuldade e qualidade das questões.
- `id` (BIGSERIAL PRIMARY KEY)
- `question_id` (VARCHAR 100)
- `student_cpf` (VARCHAR 20)
- `difficulty_rating` (INTEGER 1-5)
- `quality_rating` (INTEGER 1-5)
- `explanation_rating` (INTEGER 1-5)
- `feedback` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)
- UNIQUE constraint: (question_id, student_cpf)

#### 5. **question_bookmarks**
Armazena questões marcadas para revisão.
- `id` (BIGSERIAL PRIMARY KEY)
- `question_id` (VARCHAR 100)
- `student_cpf` (VARCHAR 20)
- `notes` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)
- UNIQUE constraint: (question_id, student_cpf)

#### 6. **question_stats**
Armazena estatísticas agregadas das questões (atualizada via triggers).
- `id` (BIGSERIAL PRIMARY KEY)
- `question_id` (VARCHAR 100 UNIQUE)
- `total_attempts` (INTEGER)
- `correct_attempts` (INTEGER)
- `incorrect_attempts` (INTEGER)
- `average_time_seconds` (INTEGER)
- `total_likes` (INTEGER)
- `total_comments` (INTEGER)
- `average_difficulty` (DECIMAL 3,2)
- `average_quality` (DECIMAL 3,2)
- `updated_at` (TIMESTAMP)

### ⚙️ Triggers Automáticos

1. **update_comment_likes_count**: Atualiza contador de curtidas em comentários
2. **trigger_update_question_stats_***: Atualizam estatísticas agregadas automaticamente

## 🚀 API Endpoints

### Curtidas

#### Toggle Like (Adicionar/Remover)
```http
POST /api/question-interactions/likes
Content-Type: application/json

{
  "questionId": "1",
  "studentName": "João Silva",
  "studentCpf": "12345678900"
}
```

#### Buscar Curtidas de uma Questão
```http
GET /api/question-interactions/likes/{questionId}
```

#### Verificar se Usuário Curtiu
```http
GET /api/question-interactions/likes/{questionId}/user/{cpf}
```

### Comentários

#### Adicionar Comentário
```http
POST /api/question-interactions/comments
Content-Type: application/json

{
  "questionId": "1",
  "studentName": "João Silva",
  "studentCpf": "12345678900",
  "comment": "Excelente questão! Me ajudou muito a entender o conceito."
}
```

#### Buscar Comentários de uma Questão
```http
GET /api/question-interactions/comments/{questionId}
```

#### Buscar Top Comentários (mais curtidos)
```http
GET /api/question-interactions/comments/{questionId}/top
```

#### Atualizar Comentário
```http
PUT /api/question-interactions/comments/{commentId}
Content-Type: application/json

{
  "comment": "Comentário atualizado"
}
```

#### Deletar Comentário
```http
DELETE /api/question-interactions/comments/{commentId}
```

### Avaliações

#### Adicionar/Atualizar Avaliação
```http
POST /api/question-interactions/ratings
Content-Type: application/json

{
  "questionId": "1",
  "studentCpf": "12345678900",
  "difficultyRating": 4,
  "qualityRating": 5,
  "explanationRating": 5,
  "feedback": "Questão bem elaborada!"
}
```

#### Buscar Avaliações de uma Questão
```http
GET /api/question-interactions/ratings/{questionId}
```
Retorna: contagem, lista de avaliações e médias

#### Buscar Avaliação do Usuário
```http
GET /api/question-interactions/ratings/{questionId}/user/{cpf}
```

### Estatísticas

#### Buscar Estatísticas de uma Questão
```http
GET /api/question-interactions/stats/{questionId}
```

#### Resumo Completo da Questão
```http
GET /api/question-interactions/summary/{questionId}?userCpf={cpf}
```
Retorna: total de curtidas, comentários, avaliações e médias

#### Top Questões Mais Curtidas
```http
GET /api/question-interactions/top/liked
```

#### Top Questões Mais Comentadas
```http
GET /api/question-interactions/top/commented
```

## 📁 Estrutura de Arquivos Criados

```
api/src/main/
├── java/com/crmflame/api/
│   ├── controller/
│   │   └── QuestionInteractionController.java
│   ├── model/
│   │   ├── QuestionLike.java
│   │   ├── QuestionComment.java
│   │   ├── QuestionRating.java
│   │   └── QuestionStats.java
│   ├── repository/
│   │   ├── QuestionLikeRepository.java
│   │   ├── QuestionCommentRepository.java
│   │   ├── QuestionRatingRepository.java
│   │   └── QuestionStatsRepository.java
│   └── dto/
│       ├── QuestionInteractionDTO.java
│       └── QuestionInteractionSummaryDTO.java
└── resources/db/migration/
    └── V6__create_exam_question_interactions_tables.sql
```

## 🔧 Como Usar

### 1. Executar Migration no Neon

Execute o arquivo SQL de migração no seu banco Neon:
```bash
# Acesse o console do Neon e execute:
api/src/main/resources/db/migration/V6__create_exam_question_interactions_tables.sql
```

### 2. Reiniciar a API
```bash
cd api
mvn spring-boot:run
```

### 3. Testar os Endpoints

Use o Postman ou curl para testar:
```bash
# Adicionar uma curtida
curl -X POST http://localhost:8080/api/question-interactions/likes \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "1",
    "studentName": "João Silva",
    "studentCpf": "12345678900"
  }'

# Buscar resumo de uma questão
curl http://localhost:8080/api/question-interactions/summary/1?userCpf=12345678900
```

## 💡 Próximos Passos

1. **Frontend**: Criar componentes React para exibir e interagir com curtidas/comentários
2. **Notificações**: Sistema de notificações quando alguém comentar
3. **Moderação**: Painel para admins moderarem comentários
4. **Gamificação**: Badges para usuários mais ativos
5. **Relatórios**: Dashboard com estatísticas das interações

## 🔐 Segurança

- Validar CPF do usuário antes de permitir interações
- Implementar rate limiting para prevenir spam
- Sanitizar comentários para prevenir XSS
- Adicionar autenticação JWT para proteger endpoints

## 📊 Índices Criados

Todos os endpoints estão otimizados com índices:
- Busca por questão
- Busca por CPF do aluno
- Ordenação por data de criação
- Contadores agregados

## 🎯 Benefícios

✅ Comunidade ativa de estudantes
✅ Feedback valioso sobre qualidade das questões
✅ Identificação de questões problemáticas
✅ Colaboração entre alunos
✅ Estatísticas em tempo real
✅ Sistema escalável e performático
