# Sistema de Interação com Aulas - CRM Flame

## 📋 Visão Geral

Sistema completo de interação dos alunos com as videoaulas, incluindo:
- ❤️ **Curtidas** (Likes)
- 💬 **Comentários**
- ⭐ **Avaliações** (Conteúdo, Áudio, Vídeo)
- ✅ **Progresso** (Marcação de aulas concluídas)

## 🎯 Funcionalidades

### 1. Curtidas (Likes)
- Alunos podem curtir/descurtir aulas
- Contador de curtidas visível para todos
- Botão com estado visual (preenchido quando curtido)

### 2. Comentários
- Alunos podem deixar comentários em qualquer aula
- Nome do aluno e data aparecem no comentário
- Lista mostra os 5 comentários mais recentes
- Aluno pode deletar apenas seus próprios comentários

### 3. Avaliações
- Sistema de 1-5 estrelas para:
  - **Qualidade do Conteúdo**
  - **Qualidade do Áudio**
  - **Qualidade da Imagem**
- Média das avaliações exibida na aula
- Aluno pode atualizar sua avaliação a qualquer momento
- Estatísticas agregadas visíveis para todos

### 4. Progresso de Visualização
- Acompanhamento automático do tempo assistido
- Marcação manual de "Aula Concluída"
- Percentual de progresso por aula
- Histórico de conclusões do aluno

## 🔌 Endpoints da API

### Curtidas
```
POST   /api/videos/{videoId}/like?studentCpf={cpf}     - Toggle like/unlike
GET    /api/videos/{videoId}/likes/count                - Total de likes
GET    /api/videos/{videoId}/likes/check?studentCpf={cpf} - Verificar se aluno curtiu
```

### Comentários
```
POST   /api/videos/{videoId}/comments                   - Adicionar comentário
GET    /api/videos/{videoId}/comments                   - Listar comentários
DELETE /api/videos/comments/{commentId}?studentCpf={cpf} - Deletar comentário
```

### Avaliações
```
POST   /api/videos/{videoId}/rating                     - Adicionar/Atualizar avaliação
GET    /api/videos/{videoId}/rating?studentCpf={cpf}    - Buscar avaliação do aluno
GET    /api/videos/{videoId}/rating/average             - Média das avaliações
```

### Progresso
```
POST   /api/videos/{videoId}/progress                   - Atualizar progresso
GET    /api/videos/{videoId}/progress?studentCpf={cpf}  - Buscar progresso do aluno
GET    /api/videos/progress/student/{studentCpf}        - Todo progresso do aluno
```

### Estatísticas Completas
```
GET    /api/videos/{videoId}/stats?studentCpf={cpf}     - Todas estatísticas da aula
```

Retorna:
```json
{
  "videoLessonId": 1,
  "totalLikes": 45,
  "totalComments": 12,
  "totalRatings": 30,
  "totalCompletions": 50,
  "averageContentRating": 4.5,
  "averageAudioRating": 4.2,
  "averageVideoQualityRating": 4.8,
  "userLiked": true,
  "userCompleted": true,
  "recentComments": [...]
}
```

## 💾 Estrutura do Banco de Dados

### Tabela: video_likes
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT | ID único |
| video_lesson_id | BIGINT | FK para video_lessons |
| student_cpf | VARCHAR(20) | CPF do aluno |
| created_at | TIMESTAMP | Data da curtida |

### Tabela: video_comments
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT | ID único |
| video_lesson_id | BIGINT | FK para video_lessons |
| student_name | VARCHAR(100) | Nome do aluno |
| student_cpf | VARCHAR(20) | CPF do aluno |
| comment | TEXT | Texto do comentário |
| likes | INTEGER | Curtidas no comentário |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Última atualização |

### Tabela: video_ratings
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT | ID único |
| video_lesson_id | BIGINT | FK para video_lessons |
| student_cpf | VARCHAR(20) | CPF do aluno |
| content_rating | INTEGER | Avaliação do conteúdo (1-5) |
| audio_rating | INTEGER | Avaliação do áudio (1-5) |
| video_quality_rating | INTEGER | Avaliação da imagem (1-5) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Última atualização |

### Tabela: video_watch_progress
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT | ID único |
| video_lesson_id | BIGINT | FK para video_lessons |
| student_cpf | VARCHAR(20) | CPF do aluno |
| completed | BOOLEAN | Aula concluída |
| watched_seconds | INTEGER | Segundos assistidos |
| progress_percentage | INTEGER | Percentual (0-100) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Última atualização |
| completed_at | TIMESTAMP | Data de conclusão |

## 🎨 Interface do Usuário

### Componente: VideoInteractionPanel

Localizado em: `frontend/src/app/components/StudentDashboard.tsx`

**Funcionalidades:**
1. **Barra de Ações**
   - Botão de curtir com contador
   - Botão de avaliar
   - Média de avaliações exibida

2. **Seção de Comentários**
   - Input para novo comentário
   - Lista de comentários recentes
   - Nome do autor e data

3. **Modal de Avaliação**
   - 3 categorias de avaliação com estrelas
   - Validação (todas devem ser preenchidas)
   - Feedback visual ao avaliar

## 🚀 Como Usar

### No Backend
1. Execute a migration para criar as tabelas
2. O Spring Boot vai detectar automaticamente as novas entidades
3. Os endpoints estarão disponíveis em `http://localhost:8080/api/videos/`

### No Frontend
1. O componente `VideoInteractionPanel` é renderizado automaticamente ao assistir uma aula
2. Todas interações são salvas em tempo real
3. CPF do aluno é obtido do contexto de autenticação

## 📊 Métricas e Analytics

O sistema permite acompanhar:
- Aulas mais curtidas
- Média de avaliações por aula
- Taxa de conclusão
- Engajamento dos alunos (comentários)
- Feedback de qualidade (áudio, vídeo, conteúdo)

## 🔒 Segurança

- CPF do aluno é validado em todas operações
- Aluno só pode deletar seus próprios comentários
- Aluno só pode ter uma avaliação por vídeo (atualização permitida)
- Validação de ratings (1-5 estrelas)
- Validação de percentual de progresso (0-100%)

## 🎯 Próximos Passos

- [ ] Notificações quando alguém responde um comentário
- [ ] Sistema de curtidas em comentários
- [ ] Badges por conquistas (primeira aula concluída, etc)
- [ ] Relatório de progresso do aluno
- [ ] Gamificação baseada em engajamento
