# 🚀 Deploy Guide - CRM FLAME

Guia completo para deploy do CRM FLAME em produção.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Deploy com Docker](#deploy-com-docker)
3. [Deploy Manual](#deploy-manual)
4. [Plataformas de Hospedagem](#plataformas-de-hospedagem)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

### Para Docker Deploy
- Docker 20.10+
- Docker Compose 2.0+

### Para Deploy Manual
- **API**: Java 21, Maven 3.9+
- **Frontend**: Node.js 20+, npm 10+
- **Database**: PostgreSQL 15+ (pode usar Neon Cloud)

---

## 🐳 Deploy com Docker

### 1. Configurar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env

# Editar .env com seus valores
nano .env
```

**Exemplo de `.env`:**
```env
# Database (PostgreSQL)
DATABASE_URL=jdbc:postgresql://your-host:5432/your-db?sslmode=require
DATABASE_USER=your-user
DATABASE_PASSWORD=your-password

# API URL (para o frontend)
NEXT_PUBLIC_API_URL=https://your-api.com/api

# CORS (domínio do frontend)
CORS_ORIGINS=https://your-frontend.com
```

### 2. Executar Deploy

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows:**
```batch
deploy.bat
```

**Ou manualmente:**
```bash
# Build das imagens
docker-compose build

# Iniciar serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

### 3. Verificar Saúde

```bash
# API Health
curl http://localhost:8080/api/health

# Frontend
curl http://localhost:3000
```

---

## 🔨 Deploy Manual

### API (Spring Boot)

```bash
cd api

# Build
mvn clean package -DskipTests

# Rodar com profile de produção
java -jar target/crm-api-1.0.0.jar --spring.profiles.active=prod
```

**Variáveis necessárias:**
```bash
export DATABASE_URL="jdbc:postgresql://..."
export DATABASE_USER="user"
export DATABASE_PASSWORD="password"
export CORS_ORIGINS="https://your-frontend.com"
```

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
npm ci

# Build
NEXT_PUBLIC_API_URL=https://your-api.com/api npm run build

# Iniciar
npm start
```

---

## ☁️ Plataformas de Hospedagem

### Opção 1: Railway (Recomendado)

**API:**
1. Conectar repositório GitHub
2. Selecionar pasta `/api`
3. Definir variáveis de ambiente
4. Deploy automático

**Frontend:**
1. Conectar repositório GitHub
2. Selecionar pasta `/frontend`
3. Build Command: `npm run build`
4. Start Command: `npm start`

### Opção 2: Vercel (Frontend) + Railway (API)

**Frontend no Vercel:**
```bash
cd frontend
npx vercel --prod
```

**API no Railway:**
- Use o Dockerfile em `/api`

### Opção 3: Azure Container Apps

```bash
# Login
az login

# Criar resource group
az group create --name crm-flame-rg --location eastus

# Criar environment
az containerapp env create \
  --name crm-flame-env \
  --resource-group crm-flame-rg \
  --location eastus

# Deploy API
az containerapp create \
  --name crm-api \
  --resource-group crm-flame-rg \
  --environment crm-flame-env \
  --image your-registry/crm-api:latest \
  --target-port 8080 \
  --env-vars "DATABASE_URL=..." "DATABASE_USER=..." "DATABASE_PASSWORD=..."

# Deploy Frontend
az containerapp create \
  --name crm-frontend \
  --resource-group crm-flame-rg \
  --environment crm-flame-env \
  --image your-registry/crm-frontend:latest \
  --target-port 3000 \
  --env-vars "NEXT_PUBLIC_API_URL=https://crm-api.azurecontainerapps.io/api"
```

---

## 🔐 Variáveis de Ambiente

### API (Spring Boot)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL do PostgreSQL | `jdbc:postgresql://host:5432/db` |
| `DATABASE_USER` | Usuário do banco | `postgres` |
| `DATABASE_PASSWORD` | Senha do banco | `secret123` |
| `CORS_ORIGINS` | Domínios permitidos | `https://app.com` |
| `PORT` | Porta do servidor | `8080` |

### Frontend (Next.js)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL da API | `https://api.app.com/api` |
| `NODE_ENV` | Ambiente | `production` |
| `PORT` | Porta do servidor | `3000` |

---

## 🔥 Troubleshooting

### API não inicia

```bash
# Verificar logs
docker-compose logs api

# Problemas comuns:
# 1. DATABASE_URL incorreta
# 2. Porta 8080 em uso
# 3. Senha do banco incorreta
```

### Frontend não conecta na API

```bash
# Verificar se API está rodando
curl http://localhost:8080/api/health

# Verificar CORS
# - CORS_ORIGINS deve incluir domínio do frontend

# Verificar NEXT_PUBLIC_API_URL
# - Deve apontar para URL pública da API
```

### Build falha

```bash
# Limpar cache Docker
docker system prune -a

# Rebuild sem cache
docker-compose build --no-cache
```

---

## ✅ Checklist de Deploy

- [ ] `.env` configurado com valores de produção
- [ ] Database PostgreSQL acessível
- [ ] CORS configurado corretamente
- [ ] SSL/HTTPS habilitado (em produção)
- [ ] Health checks passando
- [ ] Logs sem erros críticos
- [ ] Frontend consegue acessar API
