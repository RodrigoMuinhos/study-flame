# 🎥 Sistema de Vídeos com Banco de Dados - Guia de Implementação

## 📋 O que foi criado

### ✅ Backend (API Java - Spring Boot)

1. **Modelo** (`VideoLesson.java`)
   - Entidade JPA com todos os campos necessários
   - Timestamps automáticos
   - Validações

2. **Repository** (`VideoLessonRepository.java`)
   - Métodos para buscar vídeos publicados
   - Busca por módulo e aula
   - Verificações de existência

3. **Service** (`VideoLessonService.java`)
   - Lógica de negócio
   - CRUD completo
   - Toggle de publicação

4. **Controller** (`VideoLessonController.java`)
   - Endpoints REST documentados com Swagger
   - Validações
   - CORS configurado

5. **Migração SQL** (`video_lessons_migration.sql`)
   - Criação da tabela
   - Índices para performance
   - Documentação com comentários

---

## 🚀 Como Implementar

### Passo 1: Criar a Tabela no Banco de Dados

Execute o script SQL no seu PostgreSQL:

```bash
# Via psql
psql -U seu_usuario -d crm_flame -f api/src/main/resources/db/video_lessons_migration.sql

# Ou via PgAdmin
# Copie e execute o conteúdo do arquivo video_lessons_migration.sql
```

### Passo 2: Iniciar o Backend

```bash
cd api
./mvnw spring-boot:run
```

O backend irá:
- ✅ Carregar a nova entidade VideoLesson
- ✅ Criar os endpoints em `/api/videos`
- ✅ Documentar no Swagger: http://localhost:8080/swagger-ui.html

### Passo 3: Testar os Endpoints

#### 📍 Endpoints Disponíveis:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/videos` | Listar todos (admin) |
| GET | `/api/videos/published` | Listar publicados (aluno) |
| GET | `/api/videos/{id}` | Buscar por ID |
| GET | `/api/videos/module/{moduleNumber}/lesson/{lessonNumber}` | Buscar específico |
| POST | `/api/videos` | Criar novo vídeo |
| PUT | `/api/videos/{id}` | Atualizar vídeo |
| PATCH | `/api/videos/{id}/publish` | Publicar/despublicar |
| DELETE | `/api/videos/{id}` | Deletar vídeo |

#### 🧪 Testar com cURL:

```bash
# Criar um vídeo
curl -X POST http://localhost:8080/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "moduleNumber": 0,
    "lessonNumber": 1,
    "title": "Bem-vindo ao Bootcamp",
    "description": "Vídeo de introdução",
    "youtubeUrl": "https://www.youtube.com/watch?v=ZW2JLtX4Dag",
    "durationMinutes": 8,
    "orderIndex": 1,
    "isPublished": false,
    "pageLocation": "inicio"
  }'

# Publicar o vídeo
curl -X PATCH http://localhost:8080/api/videos/1/publish

# Listar vídeos publicados
curl http://localhost:8080/api/videos/published
```

---

## 🎨 Atualizar o Frontend

### Opção 1: Usar o service já criado

O arquivo `frontend/src/services/api/admin.service.ts` já tem as interfaces prontas:

```typescript
import { videoService } from '@/services/api/admin.service';

// Listar todos
const videos = await videoService.getAll();

// Criar vídeo
await videoService.create({
  moduleId: 0,
  title: "Título",
  youtubeUrl: "https://youtube.com/...",
  duration: 10,
  order: 1
});

// Publicar
await videoService.togglePublish(id, true);
```

### Opção 2: Atualizar AdminDashboard

Substituir o localStorage por chamadas à API:

```typescript
// Ao invés de:
localStorage.setItem('adminVideos', JSON.stringify(videos));

// Usar:
await videoService.create(videoData);
await videoService.togglePublish(videoId, isPublished);
```

---

## 📊 Estrutura do Banco

```sql
CREATE TABLE video_lessons (
    id BIGSERIAL PRIMARY KEY,
    module_number INTEGER NOT NULL,        -- 0, 1, 2, etc.
    lesson_number INTEGER NOT NULL,        -- 1, 2, 3, etc.
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    youtube_url VARCHAR(500) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    page_location VARCHAR(50) NOT NULL DEFAULT 'aulas',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    
    CONSTRAINT uk_module_lesson UNIQUE (module_number, lesson_number)
);
```

---

## ✅ Benefícios da Implementação

1. ✅ **Persistência Real** - Dados não se perdem
2. ✅ **Multi-usuário** - Vários admins podem gerenciar
3. ✅ **Segurança** - Validações no backend
4. ✅ **Performance** - Índices no banco
5. ✅ **Escalabilidade** - Suporta milhares de vídeos
6. ✅ **Rastreamento** - Logs e auditoria
7. ✅ **API REST** - Pode ser consumida por mobile/outros sistemas

---

## 🔍 Próximos Passos (Opcional)

### 1. Rastreamento de Visualizações

```sql
CREATE TABLE video_watch_history (
    id BIGSERIAL PRIMARY KEY,
    student_id UUID NOT NULL,
    video_id BIGINT NOT NULL,
    watch_time_seconds INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES video_lessons(id)
);
```

### 2. Sistema de Progresso

```sql
ALTER TABLE student_progress 
ADD COLUMN videos_watched INTEGER DEFAULT 0,
ADD COLUMN total_watch_time_minutes INTEGER DEFAULT 0;
```

### 3. Gamificação

- XP por assistir vídeos
- Badges por completar módulos
- Ranking de quem mais assiste

---

## 🐛 Troubleshooting

### Erro: "Tabela não existe"
```bash
# Executar migração SQL novamente
psql -U postgres -d crm_flame -f api/src/main/resources/db/video_lessons_migration.sql
```

### Erro: "CORS"
- Verificar `@CrossOrigin` no Controller
- Adicionar origem do frontend na lista

### Backend não inicia
- Verificar se o PostgreSQL está rodando
- Conferir credenciais em `application.properties`

---

## 📚 Documentação

Após iniciar o backend, acesse:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/v3/api-docs

Procure por "Video Lessons" na lista de controllers.

---

## 💡 Dica Final

**Migração gradual:**
1. Manter localStorage funcionando
2. Implementar API em paralelo
3. Testar bem a API
4. Migrar dados do localStorage para o banco
5. Remover código do localStorage

Assim você não quebra o que está funcionando! 🚀
