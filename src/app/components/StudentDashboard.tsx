"use client";

import { useState, useEffect } from "react";
import { 
  House, 
  BookOpen, 
  Play, 
  Target, 
  Trophy, 
  Folder, 
  MessageCircle, 
  Settings,
  Flame,
  Lock,
  Check,
  Youtube,
  Menu,
  X,
  Award,
  ChevronRight,
  Bell,
  Inbox,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type PageType = "inicio" | "trilha" | "aulas" | "desafios" | "conquistas" | "materiais" | "comunidade" | "conta";

interface StudentDashboardProps {
  studentName: string;
  onLogout: () => void;
}

export function StudentDashboard({ studentName, onLogout }: StudentDashboardProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Listen for navigation events
  useEffect(() => {
    const handleNavigateToAulas = () => setCurrentPage("aulas");
    window.addEventListener('navigate-to-aulas', handleNavigateToAulas);
    return () => window.removeEventListener('navigate-to-aulas', handleNavigateToAulas);
  }, []);
  
  // Dados de progresso do aluno
  const studentData = {
    currentPhase: "Iniciante",
    nextPhase: "Faísca",
    progressPercent: 0,
    streak: 0,
    xp: 0,
    nextLevelXp: 500,
  };

  const menuItems = [
    { id: "inicio" as PageType, icon: House, label: "Início" },
    { id: "trilha" as PageType, icon: BookOpen, label: "Trilha" },
    { id: "aulas" as PageType, icon: Play, label: "Aulas" },
    { id: "desafios" as PageType, icon: Target, label: "Desafios" },
    { id: "conquistas" as PageType, icon: Trophy, label: "Conquistas" },
    { id: "materiais" as PageType, icon: Folder, label: "Materiais" },
    { id: "comunidade" as PageType, icon: MessageCircle, label: "Comunidade", locked: true },
    { id: "conta" as PageType, icon: Settings, label: "Conta" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#070A12] via-[#0A0F1F] to-[#070A12]">
      {/* Sidebar Desktop */}
      <aside className="hidden w-20 flex-col border-r border-white/5 bg-[#0A0F1F]/50 backdrop-blur-sm lg:flex">
        <div className="flex h-16 items-center justify-center border-b border-white/5">
          {/* Logo FLAME */}
          <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
            <defs>
              <linearGradient id="sidebarFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="50%" stopColor="#F7931E" />
                <stop offset="100%" stopColor="#FFC837" />
              </linearGradient>
            </defs>
            <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="url(#sidebarFlame)" />
          </svg>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => !item.locked && setCurrentPage(item.id)}
                disabled={item.locked}
                className={`relative flex w-full flex-col items-center gap-1 rounded-lg p-3 transition ${
                  isActive
                    ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400"
                    : item.locked
                    ? "cursor-not-allowed text-white/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
                }`}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 ring-1 ring-orange-500/30"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon className="relative z-10" size={20} />
                <span className="relative z-10 text-[10px] font-medium">{item.label}</span>
                {item.locked && <Lock className="absolute right-2 top-2" size={10} />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#0A0F1F] lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
                <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
                  <defs>
                    <linearGradient id="mobileFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="50%" stopColor="#F7931E" />
                      <stop offset="100%" stopColor="#FFC837" />
                    </linearGradient>
                  </defs>
                  <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="url(#mobileFlame)" />
                </svg>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1 p-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (!item.locked) {
                          setCurrentPage(item.id);
                          setSidebarOpen(false);
                        }
                      }}
                      disabled={item.locked}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400"
                          : item.locked
                          ? "cursor-not-allowed text-white/20"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {item.locked && <Lock className="ml-auto" size={14} />}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/5 bg-[#0A0F1F]/30 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white/60 hover:text-white lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div>
                <h2 className="font-semibold text-white">Olá, {studentName}! 👋</h2>
                <p className="text-white/50">Fase {studentData.currentPhase}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 ring-1 ring-orange-500/20 sm:flex">
                <Flame size={16} className="text-orange-400" />
                <span className="font-semibold text-orange-400">{studentData.streak} dias</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 lg:p-6"
            >
              {currentPage === "inicio" && <HomePage studentData={studentData} />}
              {currentPage === "trilha" && <TrilhaPage />}
              {currentPage === "aulas" && <AulasPage />}
              {currentPage === "desafios" && <DesafiosPage />}
              {currentPage === "conquistas" && <ConquistasPage />}
              {currentPage === "materiais" && <MateriaisPage />}
              {currentPage === "conta" && <ContaPage studentName={studentName} onLogout={onLogout} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#0A0F1F]/30 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-4 px-6 py-4 text-white/40 sm:flex-row">
            <div className="flex flex-wrap items-center gap-4 text-center text-xs sm:text-left">
              <a
                href="https://www.youtube.com/@Rodrigomuinhosdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition hover:text-orange-400"
              >
                <Youtube size={14} />
                Canal YouTube
              </a>
              <button className="transition hover:text-white">Suporte</button>
              <button className="transition hover:text-white">Termos</button>
            </div>
            <div className="text-xs">Bootcamp FLAME © 2024</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ===== PÁGINAS =====

function HomePage({ studentData }: { studentData: any }) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Assistir uma aula", done: false },
    { id: 2, text: "Fazer 1 commit no GitHub", done: false },
    { id: 3, text: "Marcar progresso na trilha", done: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#F5F1E8]/5 via-transparent to-orange-500/5 p-6 lg:p-8">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">
              <Flame size={16} className="text-white/60" />
              <span className="font-semibold text-white/60">Comece sua sequência</span>
            </div>
          </div>
          <h1 className="mb-2 font-bold text-white">Bem-vindo ao Bootcamp FLAME</h1>
          <p className="mb-6 text-white/70">
            Você está começando sua jornada • Próxima fase: <span className="text-white/90">{studentData.nextPhase}</span>
          </p>
          <a
            href="#aulas"
            onClick={(e) => {
              e.preventDefault();
              const event = new CustomEvent('navigate-to-aulas');
              window.dispatchEvent(event);
            }}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
          >
            Começar agora
            <ChevronRight size={18} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Vídeo do YouTube */}
        <div className="rounded-2xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Youtube className="text-red-500" size={24} />
            <h3 className="font-semibold text-white">Comece por aqui</h3>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-black/20">
            <div className="flex h-full items-center justify-center text-white/40">
              <div className="text-center">
                <div className="mb-2 text-4xl">▶</div>
                <p>Este vídeo não está disponível</p>
              </div>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@Rodrigomuinhosdev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-medium text-white/90 transition hover:bg-white/10"
          >
            Ver canal completo
            <ChevronRight size={16} />
          </a>
        </div>

        {/* Progresso Gamificado */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Seu Progresso</h3>
              <span className="text-orange-400">{studentData.progressPercent}%</span>
            </div>
            <div className="mb-2 h-3 overflow-hidden rounded-full bg-black/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${studentData.progressPercent}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              />
            </div>
            <p className="mb-4 text-white/60">
              Comece agora e acenda a primeira chama 🔥
            </p>
            <div className="flex gap-2">
              {["Faísca", "Combustão", "Chama", "Forja", "Incêndio"].map((phase) => (
                <div
                  key={phase}
                  className="flex-1 rounded-full bg-white/5 py-1 text-center text-xs font-medium text-white/30"
                >
                  {phase}
                </div>
              ))}
            </div>
          </div>

          {/* Checklist do dia */}
          <div className="rounded-2xl border border-white/10 bg-[#F5F1E8]/5 p-6">
            <h3 className="mb-4 font-semibold text-white">Tarefas de hoje ✨</h3>
            <div className="space-y-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 transition hover:bg-white/10"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleCheck(item.id)}
                    className="peer sr-only"
                  />
                  <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-white/20 bg-transparent transition peer-checked:border-orange-500 peer-checked:bg-orange-500">
                    {item.done && <Check size={14} className="text-white" />}
                  </div>
                  <span className={`flex-1 transition ${item.done ? "text-white/40 line-through" : "text-white/90"}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 text-center text-white/50">
              +50 XP por tarefa concluída
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrilhaPage() {
  const modulos = [
    {
      numero: 0,
      nome: "Acendendo a Chama",
      subtitulo: "Comece por aqui — Mentalidade e visão antes do código",
      emoji: "🔥",
      conteudo: [
        "Bem-vindo ao Jogo Real",
        "Como funciona sua jornada aqui dentro",
        "Antes de começar: 5 verdades sobre aprender programação"
      ],
      entrega: "Mindset alinhado + entendimento da jornada",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Preparação",
      destaque: true,
      gratuito: true
    },
    {
      numero: 1,
      nome: "Onboarding & Mentalidade Dev",
      subtitulo: "Alinhar base técnica e visão de mercado",
      emoji: "⚡",
      conteudo: [
        "Como funciona o mercado de tecnologia",
        "Diferença entre faculdade × mercado",
        "O que é frontend, backend, API, banco e deploy",
        "Setup completo: VS Code, Git & GitHub, Java, Node.js, Docker",
        "Organização do repositório (monorepo ou multi-repo)"
      ],
      entrega: "Ambiente funcionando + primeiro commit profissional",
      progresso: 0,
      desbloqueado: false,
      concluido: false,
      fase: "Faísca"
    },
    {
      numero: 2,
      nome: "UX/UI & Figma",
      subtitulo: "Produto antes do código",
      emoji: "🎨",
      conteudo: [
        "Introdução a UX/UI para devs",
        "Fluxo de usuário",
        "Wireframes no Figma",
        "Design simples, funcional e vendável",
        "Preparação do layout do CRM"
      ],
      entrega: "Protótipo do CRM-Start no Figma",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Faísca"
    },
    {
      numero: 3,
      nome: "Frontend com Next.js",
      subtitulo: "Construir a interface do sistema",
      emoji: "⚛️",
      conteudo: [
        "Estrutura do Next.js",
        "Rotas e páginas",
        "Consumo de API REST",
        "Formulários e listagens",
        "Integração frontend ↔ backend"
      ],
      entrega: "Frontend funcional consumindo a API",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Combustão"
    },
    {
      numero: 4,
      nome: "Fundamentos de Programação",
      subtitulo: "Backend – Java",
      emoji: "☕",
      conteudo: [
        "Lógica aplicada ao backend",
        "Estrutura de classes",
        "Organização de pacotes",
        "Boas práticas iniciais",
        "Leitura e entendimento de código"
      ],
      entrega: "Base do projeto CRM-Start (backend estruturado)",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Combustão"
    },
    {
      numero: 5,
      nome: "APIs REST com Spring Boot",
      subtitulo: "Comunicação entre sistemas",
      emoji: "🔗",
      conteudo: [
        "O que é API REST",
        "HTTP, rotas e status",
        "Controllers no Spring Boot",
        "Testes com Postman / Insomnia"
      ],
      entrega: "Primeiros endpoints REST funcionando",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Chama"
    },
    {
      numero: 6,
      nome: "CRUD Profissional & Arquitetura",
      subtitulo: "Construir funcionalidades reais",
      emoji: "🏗️",
      conteudo: [
        "Controller → Service → Repository",
        "DTOs e validações",
        "Tratamento global de erros",
        "Boas práticas de arquitetura"
      ],
      entrega: "CRUD completo de Clientes",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Chama"
    },
    {
      numero: 7,
      nome: "Banco de Dados & Persistência",
      subtitulo: "Trabalhar com dados corretamente",
      emoji: "🗄️",
      conteudo: [
        "PostgreSQL",
        "Modelagem de dados",
        "Relacionamentos",
        "JPA / Hibernate",
        "Migrations com Flyway"
      ],
      entrega: "Banco estruturado + dados persistidos",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Chama"
    },
    {
      numero: 8,
      nome: "Auth, Segurança & LGPD",
      subtitulo: "Tornar o sistema real e responsável",
      emoji: "🔒",
      conteudo: [
        "Login e auth",
        "JWT",
        "Perfis de usuário",
        "Proteção de rotas",
        "LGPD aplicada ao sistema",
        "Dados sensíveis e responsabilidade do desenvolvedor"
      ],
      entrega: "Sistema seguro, autenticado e alinhado à LGPD",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Forja"
    },
    {
      numero: 9,
      nome: "Docker & Ambientes",
      subtitulo: "Padronizar execução e preparo para produção",
      emoji: "🐳",
      conteudo: [
        "Dockerfile (frontend e backend)",
        "Docker Compose",
        "Variáveis de ambiente",
        "Diferença entre dev, staging e prod"
      ],
      entrega: "Sistema full stack rodando com um comando",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Forja"
    },
    {
      numero: 10,
      nome: "Documentação, Qualidade & IA",
      subtitulo: "Deixar o projeto apresentável e profissional",
      emoji: "📚",
      conteudo: [
        "Swagger / OpenAPI",
        "README profissional",
        "Boas práticas de commit",
        "Uso de IA: Debug, revisão de código e refatoração orientada"
      ],
      entrega: "Projeto documentado como produto real",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Forja"
    },
    {
      numero: 11,
      nome: "Deploy em Produção",
      subtitulo: "Colocar o sistema no ar + Aula Especial",
      emoji: "🚀",
      conteudo: [
        "Conceito de cloud",
        "Variáveis sensíveis",
        "Deploy do backend",
        "Deploy do frontend",
        "Testes em produção",
        "Como sistemas funcionam em produção",
        "Redes, firewalls e segurança",
        "Erros comuns de devs iniciantes",
        "O que empresas realmente esperam"
      ],
      convidado: "Murilo Muinhos — Especialista Sênior em Infraestrutura e Redes",
      entrega: "CRM-Start online com URL pública",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Incêndio"
    },
    {
      numero: 12,
      nome: "Portfólio, Mercado & Próximos Passos",
      subtitulo: "Transformar aprendizado em oportunidade",
      emoji: "🎯",
      conteudo: [
        "Como apresentar o projeto",
        "Simulação de entrevista técnica",
        "Como explicar decisões técnicas",
        "Evolução do CRM para SaaS",
        "Próximos passos na carreira"
      ],
      entrega: "✔ Sistema no ar • ✔ GitHub profissional • ✔ Projeto forte para vagas júnior",
      progresso: 0,
      desbloqueado: true,
      concluido: false,
      fase: "Incêndio"
    }
  ];

  const [moduloExpandido, setModuloExpandido] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-white">Trilha de Aprendizado</h1>
        <p className="text-white/60">12 módulos para se tornar um desenvolvedor Full Stack profissional</p>
      </div>

      {/* Indicador de progresso geral */}
      <div className="mb-8 rounded-xl border border-white/10 bg-gradient-to-br from-[#F5F1E8]/10 via-transparent to-orange-500/5 p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-white">Progresso Geral</span>
          <span className="text-orange-400">0 de 12 módulos</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-black/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
          />
        </div>
      </div>

      {/* Lista de módulos */}
      <div className="space-y-4">
        {modulos.map((modulo) => (
          <motion.div
            key={modulo.numero}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: modulo.numero * 0.05 }}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#F5F1E8]/5 transition hover:border-orange-500/30"
          >
            {/* Header do módulo */}
            <button
              onClick={() => setModuloExpandido(moduloExpandido === modulo.numero ? null : modulo.numero)}
              className="w-full p-6 text-left transition hover:bg-white/5"
            >
              <div className="flex items-start gap-4">
                {/* Número e emoji */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-2xl">
                  {modulo.emoji}
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-orange-400">Módulo {modulo.numero}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                      {modulo.fase}
                    </span>
                  </div>
                  <h3 className="mb-1 font-semibold text-white">{modulo.nome}</h3>
                  <p className="mb-3 text-white/60">{modulo.subtitulo}</p>

                  {/* Barra de progresso */}
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/20">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                        style={{ width: `${modulo.progresso}%` }}
                      />
                    </div>
                    <span className="text-xs text-orange-400">{modulo.progresso}%</span>
                  </div>
                </div>

                {/* Ícone de expandir */}
                <ChevronRight
                  className={`shrink-0 text-white/40 transition ${
                    moduloExpandido === modulo.numero ? "rotate-90" : ""
                  }`}
                  size={20}
                />
              </div>
            </button>

            {/* Conteúdo expandido */}
            <AnimatePresence>
              {moduloExpandido === modulo.numero && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="space-y-4 p-6 pt-4">
                    {/* Conteúdo do módulo */}
                    <div>
                      <h4 className="mb-2 font-semibold text-white">Conteúdo:</h4>
                      <ul className="space-y-1.5">
                        {modulo.conteudo.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Convidado especial */}
                    {modulo.convidado && (
                      <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
                        <div className="mb-1 flex items-center gap-2">
                          <Award className="text-orange-400" size={16} />
                          <span className="font-semibold text-orange-400">Aula Especial</span>
                        </div>
                        <p className="text-white/80">{modulo.convidado}</p>
                      </div>
                    )}

                    {/* Entrega */}
                    <div className="rounded-lg bg-white/5 p-4">
                      <h4 className="mb-1 font-semibold text-white">🎯 Entrega:</h4>
                      <p className="text-white/70">{modulo.entrega}</p>
                    </div>

                    {/* Botão de ação */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40">
                      Iniciar módulo
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Card final motivacional */}
      <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 p-6 text-center">
        <div className="mx-auto mb-4 text-4xl">🔥</div>
        <h3 className="mb-2 font-semibold text-white">Bem-vindo ao Bootcamp FLAME!</h3>
        <p className="text-white/60">
          Comece sua jornada agora e torne-se um desenvolvedor Full Stack profissional
        </p>
      </div>
    </div>
  );
}

function AulasPage() {
  const [aulaAtual, setAulaAtual] = useState<number | null>(null);
  const [aulasCompletas, setAulasCompletas] = useState<number[]>([]);

  const aulas = [
    {
      id: 1,
      modulo: 0,
      titulo: "Bem-vindo ao Jogo Real",
      duracao: "8 min",
      desbloqueada: true,
      conteudo: {
        apresentacao: "Aqui você não aprende tecnologia. Você aprende a construir sistemas.",
        topicos: [
          {
            titulo: "Quem é Rodrigo Muinhos",
            descricao: "Desenvolvedor Full Stack, educador e criador do Bootcamp FLAME. Minha missão é transformar iniciantes em desenvolvedores profissionais através de projetos reais."
          },
          {
            titulo: "Por que a maioria desiste de programação",
            descricao: "Cursos soltos, sem projeto real, sem progressão clara. Você assiste 50 horas de vídeo e não sabe fazer nada sozinho."
          },
          {
            titulo: "O erro dos 'cursos soltos'",
            descricao: "Você aprende JavaScript. Depois React. Depois Node. Mas nunca conecta tudo. Nunca constrói um sistema completo do zero ao deploy."
          },
          {
            titulo: "O conceito de trilha: do zero ao deploy",
            descricao: "Aqui você constrói UM projeto real do início ao fim. Frontend + Backend + Banco + Deploy. Você sai com um CRM funcional no portfólio."
          },
          {
            titulo: "O que você vai construir: CRM-Start",
            descricao: "Um sistema de gerenciamento de clientes profissional. Com autenticação, CRUD completo, arquitetura em camadas, banco PostgreSQL e deploy em produção."
          }
        ],
        fraseChave: "Aqui você não aprende tecnologia. Você aprende a construir sistemas.",
        proximoPasso: "Avançar para entender como tudo funciona"
      }
    },
    {
      id: 2,
      modulo: 0,
      titulo: "Como Funciona Sua Jornada Aqui Dentro",
      duracao: "10 min",
      desbloqueada: true,
      conteudo: {
        apresentacao: "Você não corre aqui. Você avança.",
        topicos: [
          {
            titulo: "Explicação do Portal do Aluno",
            descricao: "Este portal é seu mapa. Cada módulo é uma etapa. Cada aula é um passo. Você sempre sabe onde está e para onde vai."
          },
          {
            titulo: "O que são módulos",
            descricao: "12 módulos sequenciais, do setup ao deploy. Cada módulo tem aulas teóricas e práticas focadas em uma parte do CRM."
          },
          {
            titulo: "O que são fases",
            descricao: "Faísca → Combustão → Chama → Forja → Incêndio. Conforme você avança nos módulos, sua chama cresce. Isso representa sua evolução real."
          },
          {
            titulo: "Como funciona a progressão",
            descricao: "Você completa aulas → ganha XP → avança no módulo → desbloqueia o próximo. Simples, claro, gamificado."
          },
          {
            titulo: "Por que não dá pra pular etapas",
            descricao: "Porque o módulo 7 depende do 6. O backend depende do frontend. O deploy depende de tudo. Pular = não entender."
          },
          {
            titulo: "Como usar o portal (20-40 min/dia)",
            descricao: "Consistência > Intensidade. Melhor 30 minutos todo dia do que 5 horas no sábado. O portal está sempre aqui esperando você."
          }
        ],
        fraseChave: "Você não corre aqui. Você avança.",
        proximoPasso: "Ver a trilha completa do CRM-Start"
      }
    },
    {
      id: 3,
      modulo: 0,
      titulo: "Antes de Começar: 5 Verdades Sobre Aprender Programação",
      duracao: "12 min",
      desbloqueada: true,
      conteudo: {
        apresentacao: "Nunca foi sobre ser rápido. Sempre foi sobre não parar.",
        topicos: [
          {
            titulo: "1. Você não vai entender tudo de primeira (e está tudo bem)",
            descricao: "Ninguém entende 100% na primeira vez. Ver código pela segunda ou terceira vez é normal. É assim que você aprende de verdade."
          },
          {
            titulo: "2. Copiar código não é aprender — explicar é",
            descricao: "Você pode copiar e colar. Mas se não consegue explicar o que fez, não aprendeu. Nosso foco é fazer você entender, não decorar."
          },
          {
            titulo: "3. Errar faz parte do processo real",
            descricao: "Desenvolvedores sêniors erram todo dia. A diferença é que eles sabem debugar. Você vai aprender isso aqui."
          },
          {
            titulo: "4. Consistência vence intensidade",
            descricao: "30 minutos por dia durante 3 meses > 8 horas no final de semana. Seu cérebro precisa de tempo para processar."
          },
          {
            titulo: "5. O projeto é mais importante que a tecnologia",
            descricao: "Empresas não contratam quem 'sabe React'. Elas contratam quem 'construiu um sistema real'. O CRM é seu diferencial."
          }
        ],
        fraseChave: "Nunca foi sobre ser rápido. Sempre foi sobre não parar.",
        proximoPasso: "Estou pronto para começar o Módulo 1"
      }
    }
  ];

  const marcarComoConcluida = (id: number) => {
    if (!aulasCompletas.includes(id)) {
      setAulasCompletas([...aulasCompletas, id]);
    }
  };

  const progressoModulo0 = Math.round((aulasCompletas.length / aulas.length) * 100);

  if (aulaAtual !== null) {
    const aula = aulas.find(a => a.id === aulaAtual);
    if (!aula) return null;

    return (
      <div className="mx-auto max-w-4xl">
        {/* Botão voltar */}
        <button
          onClick={() => setAulaAtual(null)}
          className="mb-6 flex items-center gap-2 text-white/60 transition hover:text-white"
        >
          <ChevronRight size={16} className="rotate-180" />
          Voltar para aulas
        </button>

        {/* Conteúdo da aula */}
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 lg:p-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-400">
                Módulo {aula.modulo} • Aula {aula.id}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white/60">{aula.duracao}</span>
            </div>
            <h1 className="mb-4 font-bold text-white">{aula.titulo}</h1>
            <p className="text-xl italic text-[#F5F1E8]">"{aula.conteudo.apresentacao}"</p>
          </div>

          {/* Tópicos */}
          <div className="space-y-4">
            {aula.conteudo.topicos.map((topico, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6"
              >
                <h3 className="mb-2 font-semibold text-white">{topico.titulo}</h3>
                <p className="text-white/70">{topico.descricao}</p>
              </motion.div>
            ))}
          </div>

          {/* Frase chave */}
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#F5F1E8]/10 to-transparent p-6 text-center">
            <div className="mx-auto mb-3 text-3xl">💡</div>
            <p className="font-semibold text-[#F5F1E8]">"{aula.conteudo.fraseChave}"</p>
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                marcarComoConcluida(aula.id);
                setAulaAtual(null);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
            >
              <Check size={18} />
              {aulasCompletas.includes(aula.id) ? "Aula concluída" : "Marcar como concluída"}
            </button>
            {aula.id < aulas.length && (
              <button
                onClick={() => setAulaAtual(aula.id + 1)}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Próxima aula
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-white">Aulas</h1>
        <p className="text-white/60">Comece pelo Módulo 0 — Acendendo a Chama</p>
      </div>

      {/* Card do Módulo 0 */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10">
        <div className="border-b border-white/10 p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/30 text-2xl">
              🔥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-white">Módulo 0 — Acendendo a Chama</h2>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400">
                  GRATUITO
                </span>
              </div>
              <p className="text-white/60">Comece por aqui — Mentalidade e visão antes do código</p>
            </div>
          </div>

          {/* Progresso do módulo */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressoModulo0}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              />
            </div>
            <span className="text-sm font-semibold text-orange-400">{progressoModulo0}%</span>
          </div>
        </div>

        {/* Lista de aulas */}
        <div className="divide-y divide-white/5">
          {aulas.map((aula, index) => {
            const concluida = aulasCompletas.includes(aula.id);
            return (
              <button
                key={aula.id}
                onClick={() => setAulaAtual(aula.id)}
                className="flex w-full items-center gap-4 p-6 text-left transition hover:bg-white/5"
              >
                {/* Número/Check */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-semibold ${
                  concluida
                    ? "bg-green-500/20 text-green-400"
                    : "bg-white/5 text-white/40"
                }`}>
                  {concluida ? <Check size={18} /> : index + 1}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">{aula.titulo}</h3>
                  <div className="flex items-center gap-2 text-white/60">
                    <Play size={14} />
                    <span className="text-xs">{aula.duracao}</span>
                    {concluida && (
                      <>
                        <span>•</span>
                        <span className="text-xs text-green-400">Concluída</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Ícone */}
                <ChevronRight className="shrink-0 text-white/40" size={20} />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        {progressoModulo0 === 100 && (
          <div className="border-t border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎉</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">Módulo 0 completo!</h4>
                <p className="text-white/60">Você está pronto para começar o Módulo 1</p>
              </div>
              <button className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40">
                Ir para Módulo 1
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Próximos módulos (bloqueados) */}
      <div className="rounded-xl border border-white/10 bg-black/20 p-8 text-center opacity-50">
        <Lock className="mx-auto mb-4 text-white/40" size={48} />
        <h3 className="mb-2 font-semibold text-white">Outros módulos em breve</h3>
        <p className="text-white/60">Complete o Módulo 0 para desbloquear o Módulo 1</p>
      </div>
    </div>
  );
}

function DesafiosPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 font-bold text-white">Desafios</h1>
      <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-8 text-center">
        <Target className="mx-auto mb-4 text-orange-400" size={48} />
        <h3 className="mb-2 font-semibold text-white">Desafios em desenvolvimento</h3>
        <p className="text-white/60">Novos desafios técnicos serão adicionados em breve</p>
      </div>
    </div>
  );
}

function ConquistasPage() {
  const conquistas = [
    { nome: "Primeira Aula", icone: "🎓", desbloqueado: false },
    { nome: "Primeiro Commit", icone: "💻", desbloqueado: false },
    { nome: "Primeira API", icone: "🚀", desbloqueado: false },
    { nome: "Front + Back", icone: "🔗", desbloqueado: false },
    { nome: "Deploy em Produção", icone: "🌐", desbloqueado: false },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 font-bold text-white">Conquistas</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {conquistas.map((conquista) => (
          <div
            key={conquista.nome}
            className="rounded-xl border border-white/10 bg-black/20 p-6 text-center opacity-40 transition"
          >
            <div className="mb-3 text-4xl grayscale">
              🔒
            </div>
            <h3 className="font-semibold text-white">{conquista.nome}</h3>
            <p className="mt-1 text-xs text-white/40">Bloqueado</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MateriaisPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 font-bold text-white">Materiais</h1>
      <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-8 text-center">
        <Folder className="mx-auto mb-4 text-orange-400" size={48} />
        <h3 className="mb-2 font-semibold text-white">Materiais em breve</h3>
        <p className="text-white/60">Downloads e recursos complementares estarão disponíveis em breve</p>
      </div>
    </div>
  );
}

function ContaPage({ studentName, onLogout }: { studentName: string; onLogout: () => void }) {
  const [notificacoes, setNotificacoes] = useState(true);
  const [lembreteDiario, setLembreteDiario] = useState(true);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-bold text-white">Minha Conta</h1>
      
      <div className="space-y-4">
        {/* Informações pessoais */}
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Informações pessoais</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-white/60">Nome</label>
              <input
                type="text"
                value={studentName}
                readOnly
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-white/60">E-mail</label>
              <input
                type="email"
                value="aluno@bootcamp.com"
                readOnly
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Segurança</h3>
          <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
            <div>
              <p className="font-medium text-white">Alterar senha</p>
              <p className="text-xs text-white/50">Última alteração: há 30 dias</p>
            </div>
            <ChevronRight className="text-white/40" size={20} />
          </button>
        </div>

        {/* Notificações */}
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Notificações</h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <div>
                <p className="font-medium text-white">E-mail de notificações</p>
                <p className="text-xs text-white/50">Receber atualizações sobre novos conteúdos</p>
              </div>
              <input
                type="checkbox"
                checked={notificacoes}
                onChange={(e) => setNotificacoes(e.target.checked)}
                className="peer sr-only"
              />
              <div className={`relative h-6 w-11 rounded-full transition ${
                notificacoes ? "bg-orange-500" : "bg-white/20"
              }`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  notificacoes ? "left-5" : "left-0.5"
                }`} />
              </div>
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
              <div>
                <p className="font-medium text-white">Lembrete diário</p>
                <p className="text-xs text-white/50">Receber lembrete para estudar</p>
              </div>
              <input
                type="checkbox"
                checked={lembreteDiario}
                onChange={(e) => setLembreteDiario(e.target.checked)}
                className="peer sr-only"
              />
              <div className={`relative h-6 w-11 rounded-full transition ${
                lembreteDiario ? "bg-orange-500" : "bg-white/20"
              }`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  lembreteDiario ? "left-5" : "left-0.5"
                }`} />
              </div>
            </label>
          </div>
        </div>

        {/* Preferências de estudo */}
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Preferências de estudo</h3>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
              <div>
                <p className="font-medium text-white">Meta diária</p>
                <p className="text-xs text-white/50">30 minutos por dia</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </button>

            <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
              <div>
                <p className="font-medium text-white">Horário preferido</p>
                <p className="text-xs text-white/50">Noite (19h - 22h)</p>
              </div>
              <ChevronRight className="text-white/40" size={20} />
            </button>
          </div>
        </div>

        {/* Links úteis */}
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Suporte & Ajuda</h3>
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/@Rodrigomuinhosdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              <Youtube size={18} className="text-red-500" />
              Canal no YouTube
            </a>
            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-white/70 transition hover:bg-white/5 hover:text-white">
              <MessageCircle size={18} />
              Central de Ajuda
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-white/70 transition hover:bg-white/5 hover:text-white">
              <Folder size={18} />
              Política de Privacidade
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-white/70 transition hover:bg-white/5 hover:text-white">
              <BookOpen size={18} />
              Termos de Uso
            </button>
          </div>
        </div>

        {/* Botão de logout */}
        <button
          onClick={onLogout}
          className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
        >
          Sair da conta
        </button>

        {/* Footer com versão */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-xs text-white/40">Bootcamp FLAME © 2024 • Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}