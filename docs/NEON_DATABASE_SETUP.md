# CRM Flame - Configuração do Neon Database

## 🗄️ Configuração do Banco de Dados

Este projeto usa **Neon PostgreSQL** como banco de dados em produção.

### 📋 Pré-requisitos

1. Conta no [Neon](https://neon.tech) (grátis)
2. Criar um novo projeto no Neon
3. Obter a connection string

### 🔧 Configuração

#### 1. Criar arquivo .env.local

Copie o arquivo de exemplo:
```bash
cp api/.env.neon.example api/.env.local
```

#### 2. Configurar variáveis de ambiente

Edite `api/.env.local` e preencha com seus dados do Neon:

```properties
# Obtenha do Neon Dashboard > Connection Details
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
DATABASE_USERNAME=seu_usuario
DATABASE_PASSWORD=sua_senha
```

**Exemplo real:**
```properties
DATABASE_URL=postgresql://rodrigo:abc123@ep-cool-cloud-123456.us-east-2.aws.neon.tech/crmflame?sslmode=require
DATABASE_USERNAME=rodrigo
DATABASE_PASSWORD=abc123
```

### 📊 Migrations (Flyway)

As migrations serão executadas automaticamente ao iniciar a aplicação.

**Ordem de execução:**

1. `V1__create_admin_users_table.sql` - Administradores
2. `V2__create_leads_and_access_tables.sql` - Leads e acessos
3. `V3__create_progress_and_badges_tables.sql` - Progresso e badges
4. `V4__create_video_lessons_table.sql` - Videoaulas
5. `V5__create_video_interactions_tables.sql` - Interações (likes, comentários, avaliações)

### 🚀 Executar Aplicação

```bash
cd api
mvn spring-boot:run
```

A aplicação irá:
1. Conectar no Neon
2. Executar migrations pendentes
3. Iniciar o servidor na porta 8080

### 📍 Endpoints Disponíveis

#### Video Interactions
```
POST   /api/videos/{videoId}/like
GET    /api/videos/{videoId}/likes/count
POST   /api/videos/{videoId}/comments
GET    /api/videos/{videoId}/comments
POST   /api/videos/{videoId}/rating
GET    /api/videos/{videoId}/rating/average
POST   /api/videos/{videoId}/progress
GET    /api/videos/{videoId}/stats
```

#### Video Lessons (Admin)
```
GET    /api/video-lessons
POST   /api/video-lessons
PUT    /api/video-lessons/{id}
DELETE /api/video-lessons/{id}
```

#### Leads & Access
```
POST   /api/leads
GET    /api/leads
POST   /api/students/validate-access
```

### 🔍 Verificar Conexão

Acesse o Swagger UI:
```
http://localhost:8080/api/swagger-ui.html
```

### ⚠️ Troubleshooting

**Erro de conexão:**
- Verifique se a connection string está correta
- Certifique-se de que `?sslmode=require` está no final da URL
- Confirme que o usuário e senha estão corretos

**Migrations falhando:**
- Verifique os logs: `tail -f api/logs/spring.log`
- Confirme que o usuário tem permissões para criar tabelas
- Se necessário, limpe o histórico: `DELETE FROM flyway_schema_history;`

**Erro de SSL:**
- Certifique-se de usar `?sslmode=require` na connection string
- Neon requer SSL para todas as conexões

### 📊 Visualizar Dados

Você pode usar o Neon Console para visualizar as tabelas:
1. Acesse [console.neon.tech](https://console.neon.tech)
2. Selecione seu projeto
3. Vá em "Tables" para ver os dados

### 🔒 Segurança

- ❌ **NUNCA** commite o arquivo `.env.local`
- ❌ **NUNCA** exponha suas credenciais
- ✅ Use variáveis de ambiente em produção
- ✅ Rotacione senhas regularmente

### 🌐 Deploy

Para deploy em produção:

1. Configure as variáveis de ambiente no seu provedor (Heroku, Railway, etc.):
   ```
   DATABASE_URL=sua_connection_string_neon
   DATABASE_USERNAME=seu_usuario
   DATABASE_PASSWORD=sua_senha
   CORS_ORIGINS=https://seu-frontend.com
   ```

2. O Spring Boot irá usar automaticamente essas variáveis

3. As migrations rodarão automaticamente no primeiro deploy

### 📝 Notas

- Neon free tier: 0.5 GB storage, 1 GB transfer/mês
- Conexão automática com pool de 10 conexões máximo
- Timeout de conexão: 20 segundos
- Idle timeout: 30 segundos
