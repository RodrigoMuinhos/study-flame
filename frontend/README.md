# Frontend - CRM FLAME

Aplicação Next.js do Bootcamp FLAME com dashboard de alunos e painel administrativo.

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Servidor de produção
npm start
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (porta 3000)
- `npm run build` - Cria build otimizado
- `npm start` - Inicia servidor de produção
- `npm run lint` - Verifica código

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🎨 Estrutura

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes React
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AccessSection.tsx
│   │   │   └── SplashScreen.tsx
│   │   ├── page.tsx        # Página de login
│   │   └── layout.tsx      # Layout principal
│   ├── styles/             # Estilos CSS
│   └── main.tsx
├── public/
│   └── icon.png           # Logo FLAME
├── package.json
└── next.config.js
```

## 🔧 Tecnologias

- **Next.js** 15.5.9 - Framework React
- **React** 19.2.3 - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** 3.4.17 - Estilização
- **Framer Motion** 12.23.24 - Animações
- **shadcn/ui** - Componentes UI
- **Axios** 1.7.9 - Cliente HTTP
- **Lucide React** - Ícones

## 📱 Funcionalidades

### Dashboard do Aluno
- Login via CPF e senha
- Saudação personalizada com nome
- Sidebar colapsável
- Trilha de aprendizado
- Sistema de conquistas
- Área de materiais

### Painel Admin
- Gerenciamento de leads
- Geração de credenciais
- Importação JSON
- Envio de emails/WhatsApp
- Controle de acesso

## 🚀 Deploy

### Vercel (Recomendado)
```bash
vercel deploy
```

### Netlify
```bash
npm run build
# Deploy pasta .next/
```

### Build Manual
```bash
npm run build
npm start
```

## 🔗 API

Conecta-se à API Spring Boot em:
- **Dev**: http://localhost:8080/api
- **Prod**: Configure `NEXT_PUBLIC_API_URL`

## 📝 Notas

- Sidebar colapsável (ícones + texto)
- Logo SVG com gradiente laranja/amarelo
- Responsivo para mobile e desktop
- Dark theme por padrão
- Autenticação via credenciais do backend
