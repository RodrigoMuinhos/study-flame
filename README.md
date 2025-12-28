
  # CRM FLAME - Bootcamp Platform

Sistema de gerenciamento de alunos para o Bootcamp FLAME com autenticação e trilha de aprendizado.

## 📁 Estrutura do Projeto

```
CRM-Flame/
├── frontend/          # Aplicação Next.js 15
│   ├── src/
│   │   ├── app/       # Páginas e componentes Next.js
│   │   ├── components/# Componentes AWS Study
│   │   ├── contexts/  # AuthContext, AWSStudyContext
│   │   ├── data/      # Dados estáticos (questões, etc)
│   │   ├── hooks/     # Custom hooks
│   │   ├── services/  # API services organizados
│   │   ├── styles/    # CSS global e temas
│   │   ├── types/     # TypeScript types
│   │   └── utils/     # Funções utilitárias
│   ├── public/        # Arquivos estáticos
│   └── package.json   # Dependências
│
├── api/               # API Spring Boot 3.5
│   ├── src/           # Código-fonte Java
│   └── pom.xml        # Dependências Maven
│
└── docs/              # Documentação do projeto
    ├── ENDPOINTS_STATUS.md
    ├── BACKEND_INTEGRATION.md
    └── ...
```

## 🚀 Como Executar

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev         # Desenvolvimento (porta 3000)
npm run build       # Produção
npm start           # Servidor produção
```

### API (Spring Boot)
```bash
cd api
mvn clean install
mvn spring-boot:run # Inicia na porta 8080
```

## 🔧 Configuração

- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080/api
- **Database**: PostgreSQL (Neon Cloud)

## 📚 Stack Tecnológica

### Frontend
- Next.js 15.5.9 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS 3.4.17
- Framer Motion 12.23.24
- Axios 1.7.9

### Backend
- Spring Boot 3.5.0
- Java 21
- Maven 3.9.11
- PostgreSQL Driver 42.7.7
- Hibernate ORM 6.6.15

## 🔐 Credenciais de Acesso

### Admin
- Email: Configurado no banco de dados
- Usuário padrão: `admin` ou `admin@crmflame.com`
- Senha inicial: Definida via variável de ambiente `ADMIN_DEFAULT_PASSWORD`

### Aluno
- CPF: 11 dígitos (sem formatação)
- Senha: Gerada automaticamente pelo sistema

## 🎯 Funcionalidades

- ✅ Autenticação de alunos via CPF
- ✅ Dashboard personalizado com nome do aluno
- ✅ Geração automática de credenciais
- ✅ Importação de leads via JSON
- ✅ Sidebar colapsável
- ✅ Sistema de trilha de aprendizado
- ✅ Painel administrativo completo

## 📦 Deploy

### Estrutura Pronta para Deploy

O projeto está organizado em duas pastas independentes:

1. **`frontend/`** - Deploy em Vercel, Netlify, etc
2. **`api/`** - Deploy em Railway, Render, AWS, etc

### Variáveis de Ambiente Necessárias

#### API (Backend)
```bash
DATABASE_URL=jdbc:postgresql://host:5432/database?sslmode=require
DATABASE_USERNAME=usuario
DATABASE_PASSWORD=senha
CORS_ORIGINS=https://seudominio.com
SWAGGER_ENABLED=false
ADMIN_DEFAULT_PASSWORD=senha_admin_segura
```

#### Frontend
```bash
NEXT_PUBLIC_API_URL=https://api.seudominio.com/api
```

### Docker (Opcional)
```bash
docker-compose up -d
```

### Segurança
- ✅ Senhas criptografadas com BCrypt
- ✅ CORS configurável via variáveis de ambiente
- ✅ Swagger desabilitável em produção
- ✅ Sem credenciais hardcoded no código

  