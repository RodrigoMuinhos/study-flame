# Estrutura do Frontend - CRM Flame

## Visão Geral

O frontend é dividido em três módulos principais:

```
src/
├── modules/
│   ├── admin/          # 🔒 Painel Administrativo
│   ├── student/        # 👨‍🎓 Painel do Aluno
│   └── aws-study/      # ☁️ Plataforma AWS Study
├── shared/             # 🔄 Componentes e hooks compartilhados
├── services/           # 🔌 Serviços de API
└── styles/             # 🎨 Estilos globais
```

---

## 🔒 Módulo Admin (`/modules/admin/`)

### Descrição
Painel administrativo para gerenciamento do CRM Flame.

### Páginas
- `DashboardPage` - Visão geral com métricas
- `StudentsPage` - Gerenciamento de alunos
- `LeadsPage` - Gerenciamento de leads
- `VideosPage` - Gerenciamento de vídeos/aulas
- `TokensPage` - Geração de tokens AWS
- `MessagesPage` - Envio de mensagens
- `SettingsPage` - Configurações

### Componentes
- `AdminLayout` - Layout principal com sidebar
- `AdminSidebar` - Menu de navegação
- `StatsCard` - Cards de estatísticas
- `StudentTable` - Tabela de alunos
- `LeadImporter` - Importador de leads
- `TokenGenerator` - Gerador de tokens AWS

### Endpoints Utilizados
```typescript
// Leads
GET    /api/leads
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
POST   /api/leads/import

// Tokens AWS
POST   /api/tokens/generate
GET    /api/tokens
DELETE /api/tokens/:id

// Acessos
GET    /api/students/access
POST   /api/students/access
PATCH  /api/students/access/:id

// Dashboard
GET    /api/admin/dashboard/stats
GET    /api/admin/dashboard/top-students
GET    /api/admin/dashboard/engagement
```

---

## 👨‍🎓 Módulo Student (`/modules/student/`)

### Descrição
Painel do aluno para acompanhamento de estudos.

### Páginas
- `HomePage` - Página inicial com resumo
- `TrailPage` - Trilha de aprendizado
- `LessonsPage` - Aulas e módulos
- `ChallengesPage` - Desafios
- `AchievementsPage` - Conquistas e badges
- `MaterialsPage` - Materiais de apoio
- `CommunityPage` - Comunidade
- `AwsAccessPage` - Acesso ao AWS Study
- `AccountPage` - Conta e configurações

### Componentes
- `StudentLayout` - Layout principal com sidebar
- `StudentSidebar` - Menu de navegação
- `ProgressCard` - Card de progresso
- `LevelBadge` - Badge de nível
- `ModuleCard` - Card de módulo
- `LessonPlayer` - Player de vídeo
- `GamificationPanel` - Painel de gamificação
- `AwsTokenModal` - Modal de token AWS

### Endpoints Utilizados
```typescript
// Perfil
GET    /api/students/me/profile
PUT    /api/students/me/profile
POST   /api/students/me/change-password

// Progresso
GET    /api/students/me/progress
GET    /api/students/me/progress/modules
POST   /api/students/me/lessons/:id/complete

// Gamificação
GET    /api/gamification/student/:cpf
GET    /api/gamification/badges

// Notificações
GET    /api/students/me/notifications
PATCH  /api/students/me/notifications/:id/read
```

---

## ☁️ Módulo AWS Study (`/modules/aws-study/`)

### Descrição
Plataforma de estudos para certificações AWS.

### Páginas
- `StudyHomePage` - Dashboard de estudos AWS
- `ExamSimulatorPage` - Simulador de exames
- `QuestionsPage` - Banco de questões
- `ResultsPage` - Resultados de simulados
- `ProgressPage` - Progresso por certificação
- `ServicesPage` - Guia de serviços AWS

### Componentes
- `AwsStudyLayout` - Layout principal
- `CertificationSelector` - Seletor de certificação
- `QuestionCard` - Card de questão
- `ExamTimer` - Timer do simulado
- `ResultsChart` - Gráficos de resultados
- `ServiceBox` - Box de serviço AWS
- `DomainProgress` - Progresso por domínio

### Endpoints Utilizados
```typescript
// Validação de Acesso
POST   /api/tokens/validate

// Questões
GET    /api/exam/questions
GET    /api/exam/questions/:id
GET    /api/exam/questions/random
GET    /api/exam/domains/:certification

// Simulados
POST   /api/exam/simulations
POST   /api/exam/simulations/:id/submit
GET    /api/exam/simulations/history
GET    /api/exam/simulations/:id/result

// Progresso
GET    /api/exam/progress
GET    /api/exam/progress/:certification
POST   /api/exam/progress/answer
```

---

## 🔄 Shared (`/shared/`)

### Componentes Compartilhados
- `Button`, `Input`, `Select` - Componentes de formulário
- `Card`, `Modal`, `Dialog` - Containers
- `Toast`, `Alert` - Feedback
- `Loading`, `Skeleton` - Estados de carregamento
- `Avatar`, `Badge` - Elementos visuais
- `Sidebar`, `Header` - Layout

### Hooks Compartilhados
- `useAuth` - Autenticação
- `useTheme` - Temas
- `useToast` - Notificações toast
- `useLocalStorage` - Persistência local

### Contextos
- `AuthContext` - Estado de autenticação
- `ThemeContext` - Tema atual

---

## 🔌 Services (`/services/api/`)

### Organização
```
services/api/
├── index.ts              # Exportações centralizadas
├── config.ts             # Configuração do Axios
├── auth.service.ts       # Autenticação
├── admin.service.ts      # Endpoints do Admin
├── student.service.ts    # Endpoints do Aluno
├── aws-study.service.ts  # Endpoints do AWS Study
└── shared.service.ts     # Endpoints compartilhados
```

---

## 🗄️ Estrutura de Dados (Backend)

### Entidades Principais

```
Lead (Leads/Alunos)
├── id (UUID)
├── name
├── email
├── phone
├── cpf
├── experience
├── status
└── timestamps

StudentProgress (Progresso)
├── id
├── leadId (FK)
├── xpTotal
├── level
├── streakDays
├── lessonsCompleted
└── timestamps

Badge (Conquistas)
├── id
├── code
├── name
├── description
├── icon
├── rarity
├── maxProgress
└── xpReward

StudentBadge (Conquistas do Aluno)
├── id
├── leadId (FK)
├── badgeId (FK)
├── unlocked
├── progress
└── unlockedAt

AccessToken (Tokens AWS)
├── id
├── token
├── cpf
├── userName
├── isUsed
├── expiresAt
└── timestamps
```

---

## 🎨 Temas Disponíveis

| Tema | ID | Descrição |
|------|-----|-----------|
| 🔥 Escuro | `theme-fire-dark` | Tema escuro padrão |
| ☀️ Claro | `theme-fire-light` | Tema claro suave |
| 💥 Brasa | `theme-ember` | Tema escuro intenso |

---

## 📋 Checklist de Implementação

### Admin
- [x] Dashboard com métricas
- [x] Gerenciamento de leads
- [x] Gerador de tokens AWS
- [x] Controle de acessos
- [ ] Gerenciamento de vídeos (parcial)
- [ ] Sistema de mensagens (parcial)

### Aluno
- [x] Dashboard inicial
- [x] Sistema de gamificação
- [x] Validação de token AWS
- [ ] Aulas e módulos (parcial)
- [ ] Desafios
- [ ] Materiais de apoio
- [ ] Comunidade

### AWS Study
- [x] Validação de acesso por token
- [ ] Simulador de exames
- [ ] Banco de questões
- [ ] Progresso por certificação
