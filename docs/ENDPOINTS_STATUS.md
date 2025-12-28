# Endpoints API - Status de Implementação

## Legenda
- ✅ Implementado e funcionando
- 🔨 Parcialmente implementado
- ❌ Não implementado (precisa criar)

---

## 🔐 Autenticação (`/api/auth/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| POST | `/auth/login` | 🔨 | Login (simulado no frontend) |
| POST | `/auth/logout` | ❌ | Logout |
| POST | `/auth/refresh` | ❌ | Renovar token |
| GET | `/auth/me` | ❌ | Dados do usuário logado |

---

## 👥 Leads (`/api/leads/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/leads` | ✅ | Listar todos os leads |
| GET | `/leads/:id` | ✅ | Buscar lead por ID |
| GET | `/leads/cpf/:cpf` | ✅ | Buscar lead por CPF |
| POST | `/leads` | ✅ | Criar lead |
| PUT | `/leads/:id` | ✅ | Atualizar lead |
| DELETE | `/leads/:id` | ✅ | Deletar lead |
| GET | `/leads/status/:status` | ✅ | Leads por status |
| POST | `/leads/import` | ✅ | Importar leads |

---

## 🎫 Tokens AWS (`/api/tokens/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| POST | `/tokens/generate` | ✅ | Gerar token |
| POST | `/tokens/validate` | ✅ | Validar token |
| GET | `/tokens` | ❌ | Listar todos tokens |
| GET | `/tokens/cpf/:cpf` | ❌ | Token por CPF |
| GET | `/tokens/status/:token` | ❌ | Status do token |
| DELETE | `/tokens/:id` | ❌ | Revogar token |

---

## 🔑 Acessos de Alunos (`/api/students/access/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/students/access` | 🔨 | Listar acessos |
| POST | `/students/access` | 🔨 | Criar acesso |
| PATCH | `/students/access/:id` | ❌ | Toggle ativo/inativo |
| POST | `/students/access/:id/reset-password` | ❌ | Resetar senha |
| PATCH | `/students/access/:id/credentials-sent` | ❌ | Marcar credenciais enviadas |

---

## 🎮 Gamificação (`/api/gamification/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/gamification/student/:cpf` | ✅ | Dados do aluno |
| GET | `/gamification/student/id/:leadId` | ✅ | Dados por ID |
| POST | `/gamification/student/:cpf/xp` | ✅ | Adicionar XP |
| GET | `/gamification/badges` | ✅ | Listar badges |
| POST | `/gamification/badges/init` | ✅ | Inicializar badges |

---

## 👨‍🎓 Perfil do Aluno (`/api/students/me/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/students/me/profile` | ❌ | Obter perfil |
| PUT | `/students/me/profile` | ❌ | Atualizar perfil |
| POST | `/students/me/change-password` | ❌ | Alterar senha |
| GET | `/students/me/progress` | ❌ | Progresso geral |
| GET | `/students/me/progress/modules` | ❌ | Progresso por módulo |
| POST | `/students/me/lessons/:id/complete` | ❌ | Marcar aula concluída |
| GET | `/students/me/lessons/status` | ❌ | Status das aulas |
| GET | `/students/me/notifications` | ❌ | Listar notificações |
| PATCH | `/students/me/notifications/:id/read` | ❌ | Marcar como lida |

---

## 📚 Módulos e Aulas (`/api/modules/`, `/api/lessons/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/modules` | ❌ | Listar módulos |
| GET | `/modules/:id` | ❌ | Módulo por ID |
| GET | `/modules/:id/lessons` | ❌ | Aulas do módulo |
| GET | `/lessons/:id` | ❌ | Aula por ID |

---

## 📊 Dashboard Admin (`/api/admin/dashboard/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/admin/dashboard/stats` | ❌ | Estatísticas gerais |
| GET | `/admin/dashboard/top-students` | ❌ | Ranking de alunos |
| GET | `/admin/dashboard/engagement` | ❌ | Métricas de engajamento |

---

## 🎬 Gerenciamento de Vídeos (`/api/admin/videos/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/admin/videos` | ❌ | Listar vídeos |
| POST | `/admin/videos` | ❌ | Criar vídeo |
| PUT | `/admin/videos/:id` | ❌ | Atualizar vídeo |
| DELETE | `/admin/videos/:id` | ❌ | Deletar vídeo |
| PATCH | `/admin/videos/:id/publish` | ❌ | Publicar/despublicar |

---

## 📨 Mensagens (`/api/admin/messages/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/admin/messages` | ❌ | Listar mensagens |
| POST | `/admin/messages` | ❌ | Enviar mensagem |
| DELETE | `/admin/messages/:id` | ❌ | Deletar mensagem |

---

## 📝 Questões de Exame (`/api/exam/`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/exam/questions` | ❌ | Listar questões (com filtros) |
| GET | `/exam/questions/:id` | ❌ | Questão por ID |
| GET | `/exam/questions/random` | ❌ | Questões aleatórias |
| GET | `/exam/domains/:certification` | ❌ | Domínios por certificação |
| POST | `/exam/simulations` | ❌ | Criar simulado |
| POST | `/exam/simulations/:id/submit` | ❌ | Submeter respostas |
| GET | `/exam/simulations/history` | ❌ | Histórico de simulados |
| GET | `/exam/simulations/:id/result` | ❌ | Resultado do simulado |
| GET | `/exam/progress` | ❌ | Progresso geral |
| GET | `/exam/progress/:certification` | ❌ | Progresso por certificação |
| POST | `/exam/progress/answer` | ❌ | Registrar resposta |

---

## 🏥 Health Check (`/api/health`)

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/health` | ❌ | Status da API |

---

## 📈 Resumo

| Categoria | Implementados | Parciais | Pendentes | Total |
|-----------|---------------|----------|-----------|-------|
| Auth | 0 | 1 | 3 | 4 |
| Leads | 8 | 0 | 0 | 8 |
| Tokens | 2 | 0 | 4 | 6 |
| Acessos | 0 | 2 | 3 | 5 |
| Gamificação | 5 | 0 | 0 | 5 |
| Perfil Aluno | 0 | 0 | 9 | 9 |
| Módulos/Aulas | 0 | 0 | 4 | 4 |
| Dashboard Admin | 0 | 0 | 3 | 3 |
| Vídeos Admin | 0 | 0 | 5 | 5 |
| Mensagens | 0 | 0 | 3 | 3 |
| Exame AWS | 0 | 0 | 11 | 11 |
| Health | 0 | 0 | 1 | 1 |
| **TOTAL** | **15** | **3** | **46** | **64** |

---

## 🎯 Prioridades de Implementação

### Alta Prioridade
1. ~~Gamificação~~ ✅
2. ~~Tokens AWS~~ ✅ (parcial)
3. Autenticação completa
4. Perfil do Aluno
5. Progresso de Estudos

### Média Prioridade
1. Módulos e Aulas
2. Dashboard Admin
3. Exame AWS (simulados)

### Baixa Prioridade
1. Vídeos Admin
2. Mensagens
3. Notificações
