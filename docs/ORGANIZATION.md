# Frontend CRM Flame - Guia de Organização

## 📁 Estrutura de Pastas

```
frontend/src/
│
├── 📂 modules/                    # Módulos da aplicação
│   │
│   ├── 📂 admin/                  # 🔒 PAINEL ADMINISTRATIVO
│   │   ├── index.ts               # Exportações do módulo
│   │   ├── 📂 layout/             # Layouts específicos
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── 📂 pages/              # Páginas do admin
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── StudentsPage.tsx
│   │   │   ├── LeadsPage.tsx
│   │   │   ├── TokensPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── 📂 components/         # Componentes do admin
│   │   │   ├── StatsCard.tsx
│   │   │   ├── StudentTable.tsx
│   │   │   ├── LeadImporter.tsx
│   │   │   └── TokenGenerator.tsx
│   │   └── 📂 hooks/              # Hooks do admin
│   │       └── useAdminData.ts
│   │
│   ├── 📂 student/                # 👨‍🎓 PAINEL DO ALUNO
│   │   ├── index.ts
│   │   ├── 📂 layout/
│   │   │   ├── StudentLayout.tsx
│   │   │   └── StudentSidebar.tsx
│   │   ├── 📂 pages/
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── TrailPage.tsx
│   │   │   ├── LessonsPage.tsx
│   │   │   ├── AchievementsPage.tsx
│   │   │   └── AccountPage.tsx
│   │   ├── 📂 components/
│   │   │   ├── ProgressCard.tsx
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── LessonPlayer.tsx
│   │   │   ├── GamificationPanel.tsx
│   │   │   └── AwsTokenModal.tsx
│   │   └── 📂 hooks/
│   │       ├── useStudentProgress.ts
│   │       └── useGamification.ts
│   │
│   └── 📂 aws-study/              # ☁️ PLATAFORMA AWS STUDY
│       ├── index.ts
│       ├── 📂 layout/
│       │   └── AwsStudyLayout.tsx
│       ├── 📂 pages/
│       │   ├── StudyHomePage.tsx
│       │   ├── ExamSimulatorPage.tsx
│       │   ├── QuestionsPage.tsx
│       │   └── ResultsPage.tsx
│       ├── 📂 components/
│       │   ├── CertificationSelector.tsx
│       │   ├── QuestionCard.tsx
│       │   ├── ExamTimer.tsx
│       │   ├── ResultsChart.tsx
│       │   └── ServiceBox.tsx
│       ├── 📂 hooks/
│       │   ├── useExamSimulator.ts
│       │   └── useAwsAccess.ts
│       └── 📂 data/
│           └── questions/
│
├── 📂 shared/                     # 🔄 COMPONENTES COMPARTILHADOS
│   ├── index.ts
│   ├── 📂 components/
│   │   ├── 📂 ui/                 # Componentes base (shadcn)
│   │   └── ...                    # Componentes customizados
│   ├── 📂 hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   ├── 📂 contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   └── 📂 utils/
│       ├── cn.ts
│       └── formatters.ts
│
├── 📂 services/                   # 🔌 SERVIÇOS DE API
│   └── 📂 api/
│       ├── index.ts               # Exportações centralizadas
│       ├── config.ts              # Configuração Axios
│       ├── auth.service.ts        # Autenticação
│       ├── admin.service.ts       # Endpoints Admin
│       ├── student.service.ts     # Endpoints Aluno
│       ├── aws-study.service.ts   # Endpoints AWS Study
│       └── shared.service.ts      # Endpoints compartilhados
│
├── 📂 styles/                     # 🎨 ESTILOS GLOBAIS
│   ├── globals.css
│   ├── theme.css
│   └── fonts.css
│
└── 📂 types/                      # 📝 TIPOS TYPESCRIPT
    ├── auth.ts
    ├── admin.ts
    ├── student.ts
    └── aws-study.ts
```

---

## 🎯 Onde encontrar cada coisa

### Se você precisa mexer no ADMIN:
```
src/modules/admin/
```
- Dashboard, gerenciamento de alunos, tokens, leads

### Se você precisa mexer no ALUNO:
```
src/modules/student/
```
- Dashboard do aluno, aulas, conquistas, gamificação

### Se você precisa mexer no AWS STUDY:
```
src/modules/aws-study/
```
- Simulados, questões, progresso AWS

### Se você precisa de componentes reutilizáveis:
```
src/shared/
```
- Buttons, Cards, Modals, Hooks genéricos

### Se você precisa mexer em chamadas de API:
```
src/services/api/
```
- Cada arquivo é um "serviço" que agrupa endpoints relacionados

---

## 📋 Como importar

### Importar serviços de API:
```typescript
// Importar serviço específico
import { leadService, awsTokenService } from '@/services/api';

// Usar
const leads = await leadService.getAll();
const token = await awsTokenService.generate({ cpf: '123', userName: 'João' });
```

### Importar componentes compartilhados:
```typescript
import { Button, Card, useToast } from '@/shared';
```

### Importar de um módulo específico:
```typescript
// Componente do Admin
import { TokenGenerator } from '@/modules/admin';

// Componente do Aluno
import { GamificationPanel } from '@/modules/student';

// Componente do AWS Study
import { QuestionCard } from '@/modules/aws-study';
```

---

## 🔌 Endpoints por Módulo

### ADMIN usa:
| Endpoint | Descrição |
|----------|-----------|
| `/api/leads/*` | CRUD de leads |
| `/api/tokens/*` | Geração de tokens AWS |
| `/api/students/access/*` | Controle de acessos |
| `/api/admin/dashboard/*` | Métricas e analytics |
| `/api/admin/videos/*` | Gerenciamento de vídeos |
| `/api/admin/messages/*` | Sistema de mensagens |

### ALUNO usa:
| Endpoint | Descrição |
|----------|-----------|
| `/api/students/me/*` | Perfil e progresso |
| `/api/gamification/*` | XP, níveis, badges |
| `/api/modules/*` | Módulos e aulas |
| `/api/lessons/*` | Aulas individuais |

### AWS STUDY usa:
| Endpoint | Descrição |
|----------|-----------|
| `/api/tokens/validate` | Validar acesso |
| `/api/exam/questions/*` | Questões de exame |
| `/api/exam/simulations/*` | Simulados |
| `/api/exam/progress/*` | Progresso AWS |

---

## ✅ Boas Práticas

1. **Cada módulo é independente** - Um módulo não deve importar de outro
2. **Use shared para reutilizar** - Componentes usados em mais de um módulo vão em `shared/`
3. **Serviços tipados** - Todos os endpoints têm tipos TypeScript
4. **Imports absolutos** - Use `@/` ao invés de `../../`

---

## 🚀 Próximos Passos

1. Mover arquivos existentes para nova estrutura
2. Atualizar imports
3. Implementar endpoints faltantes no backend
4. Testar integração
