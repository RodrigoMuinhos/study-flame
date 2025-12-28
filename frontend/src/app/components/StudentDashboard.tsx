"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

import { 
  House, 
  BookOpen, 
  Play, 
  Target, 
  Trophy, 
  Folder, 
  Cloud,
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
  ExternalLink,
  BarChart3,
  Shield,
  Brain,
  Clock,
  Key,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NotificationCenter } from "./ui/notification-center";
import { WelcomeTour } from "./ui/onboarding-tour";
import { useToast } from "./ui/toast";
import { PrivacyPortal } from "./ui/privacy-portal";
import { GamificationPanel } from "./ui/gamification-panel";
import { EmptyState } from "./ui/empty-state";

// Helper para obter URL de vídeo da aula. Retorna null se não houver mapeamento.
const getVideoUrl = (modulo: number | string, id: number | string): string | null => {
  // TODO: Mapear URLs reais por módulo/aula quando disponíveis
  // Exemplo de mapeamento (comente/descomente quando tiver URLs reais):
  // if (modulo === 1 && id === 1) return "https://www.youtube.com/embed/VIDEO_ID";
  return null;
};

// Handler global para conclusão do tour de boas-vindas
const handleWelcomeComplete = () => {
  // Placeholder: implementar notificação quando necessário
};

type PageType = "inicio" | "trilha" | "aulas" | "desafios" | "conquistas" | "materiais" | "comunidade" | "aws" | "conta";

interface StudentDashboardProps {
  studentName: string;
  studentCpf?: string;
  onLogout: () => void;
}

export function StudentDashboard({ studentName, studentCpf, onLogout }: StudentDashboardProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [temaSelecionado, setTemaSelecionado] = useState<string>('theme-fire-dark');
  const { addToast } = useToast();
  
  // Estados para validação de token AWS
  const [showAwsTokenModal, setShowAwsTokenModal] = useState(false);
  const [awsToken, setAwsToken] = useState('');
  const [awsTokenError, setAwsTokenError] = useState('');
  const [validatingToken, setValidatingToken] = useState(false);
  const [awsAccessGranted, setAwsAccessGranted] = useState(false);
  const [showAwsWelcomeModal, setShowAwsWelcomeModal] = useState(false);
  
  // Verificar se já tem acesso AWS salvo
  useEffect(() => {
    const awsAccess = localStorage.getItem('aws_study_access');
    if (awsAccess) {
      const access = JSON.parse(awsAccess);
      // Verificar se o acesso é do mesmo CPF e ainda é válido
      if (access.cpf === studentCpf && access.expiresAt > Date.now()) {
        setAwsAccessGranted(true);
      } else {
        localStorage.removeItem('aws_study_access');
      }
    }
  }, [studentCpf]);


  const temas = [
    { 
      id: 'theme-fire-dark', 
      nome: 'Escuro', 
      descricao: 'Tema escuro padrão',
      icon: '🔥',
      cores: ['#1a0f0a', '#ff6b35', '#f7931e']
    },
    { 
      id: 'theme-fire-light', 
      nome: 'Claro', 
      descricao: 'Tema claro suave',
      icon: '☀️',
      cores: ['#fff5f0', '#ff8c5a', '#ffd4b8']
    },
    { 
      id: 'theme-ember', 
      nome: 'Brasa', 
      descricao: 'Tema escuro intenso',
      icon: '💥',
      cores: ['#2a1510', '#e63946', '#ff9f1c']
    }
  ];

  const aplicarTema = (temaId: string) => {
    console.log('Aplicando tema:', temaId);
    setTemaSelecionado(temaId);
    // Remove todas as classes de tema
    document.documentElement.classList.remove('dark', 'theme-fire-dark', 'theme-fire-light', 'theme-ember');
    // Aplica o novo tema
    document.documentElement.classList.add(temaId);
    // Salva no localStorage
    localStorage.setItem('theme', temaId);
    console.log('Classes atuais:', document.documentElement.className);
  };
  
  // Carrega o tema salvo ao montar o componente
  useEffect(() => {
    const temaSalvo = localStorage.getItem('theme') || 'theme-fire-dark';
    console.log('Carregando tema salvo:', temaSalvo);
    aplicarTema(temaSalvo);
  }, []);
  
  // Carrega a página salva ao montar o componente
  useEffect(() => {
    const paginaSalva = localStorage.getItem('currentPage') as PageType || 'inicio';
    console.log('Carregando página salva:', paginaSalva);
    setCurrentPage(paginaSalva);
  }, []);

  // Salva a página atual sempre que muda
  useEffect(() => {
    console.log('Salvando página:', currentPage);
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);
  
  // Listen for navigation events
  useEffect(() => {
    const handleNavigateToAulas = () => setCurrentPage("aulas");
    window.addEventListener('navigate-to-aulas', handleNavigateToAulas);
    return () => window.removeEventListener('navigate-to-aulas', handleNavigateToAulas);
  }, []);

  // Função para validar token AWS
  const validateAwsToken = async () => {
    if (!awsToken.trim()) {
      setAwsTokenError('Digite o token de acesso');
      return;
    }
    
    try {
      setValidatingToken(true);
      setAwsTokenError('');
      
      const response = await axios.post(`${API_BASE_URL}/tokens/validate`, {
        token: awsToken.trim().toUpperCase()
      });
      
      if (response.data.valid) {
        // Verificar se o token pertence ao CPF do usuário logado
        if (studentCpf && response.data.cpf !== studentCpf) {
          setAwsTokenError('Este token não pertence a esta conta');
          return;
        }
        
        // Salvar acesso
        const accessData = {
          cpf: response.data.cpf,
          token: awsToken.trim().toUpperCase(),
          expiresAt: new Date(response.data.expiresAt).getTime(),
          userName: response.data.userName
        };
        localStorage.setItem('aws_study_access', JSON.stringify(accessData));
        setAwsAccessGranted(true);
        setShowAwsTokenModal(false);
        setAwsToken('');
        
        addToast({
          title: 'Acesso liberado!',
          description: 'Você agora tem acesso ao AWS Study.',
          type: 'success'
        });
        
        // Mostrar modal de boas-vindas antes de redirecionar
        setShowAwsWelcomeModal(true);
      } else {
        setAwsTokenError(response.data.message || 'Token inválido ou expirado');
      }
    } catch (error: any) {
      console.error('Erro ao validar token:', error);
      setAwsTokenError(error.response?.data?.message || 'Erro ao validar token. Tente novamente.');
    } finally {
      setValidatingToken(false);
    }
  };
  
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
    { id: "aws" as PageType, icon: Cloud, label: "AWS-Study", locked: !awsAccessGranted, requiresToken: true },
    { id: "comunidade" as PageType, icon: MessageCircle, label: "Comunidade", locked: true },
    { id: "conta" as PageType, icon: Settings, label: "Conta" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar Desktop */}
      <aside className={`hidden flex-col border-r border-border bg-background/70 backdrop-blur-sm transition-all duration-300 lg:flex ${
        sidebarCollapsed ? "w-20" : "w-64"
      }`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-3">
            {/* Logo FLAME */}
            <svg width="32" height="32" viewBox="0 0 180 180" fill="none" className="flex-shrink-0">
              <defs>
                <linearGradient id="sidebarFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="50%" stopColor="#F7931E" />
                  <stop offset="100%" stopColor="#FFC837" />
                </linearGradient>
              </defs>
              <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="url(#sidebarFlame)" />
            </svg>
            {!sidebarCollapsed && (
              <span className="font-bold text-foreground">FLAME</span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-muted-foreground hover:text-foreground transition"
            title={sidebarCollapsed ? "Expandir" : "Recolher"}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            const handleClick = () => {
              if (item.locked && !item.requiresToken) return;
              if (item.id === 'aws') {
                if (awsAccessGranted) {
                  window.location.href = '/aws-study/study';
                } else {
                  setShowAwsTokenModal(true);
                }
              } else {
                setCurrentPage(item.id);
              }
            };
            
            return (
              <button
                key={item.id}
                onClick={handleClick}
                disabled={item.locked && !item.requiresToken}
                className={`relative flex w-full items-center gap-3 rounded-lg p-3 transition ${
                  sidebarCollapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400"
                    : (item.locked && !item.requiresToken)
                    ? "cursor-not-allowed text-muted-foreground/30"
                    : item.locked && item.requiresToken
                    ? "text-muted-foreground hover:bg-card hover:text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
                title={sidebarCollapsed ? item.label : ""}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 ring-1 ring-orange-500/30"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <Icon className="relative z-10 flex-shrink-0" size={20} />
                {!sidebarCollapsed && (
                  <span className="relative z-10 text-sm font-medium">{item.label}</span>
                )}
                {item.locked && !sidebarCollapsed && <Lock className="ml-auto" size={14} />}
                {item.locked && sidebarCollapsed && <Lock className="absolute right-2 top-2" size={10} />}
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
              className="fixed left-0 top-0 z-50 h-full w-72 border-r border-border bg-background lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
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
                <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1 p-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  const handleClick = () => {
                    if (item.locked && !item.requiresToken) return;
                    if (item.id === 'aws') {
                      if (awsAccessGranted) {
                        window.location.href = '/aws-study/study';
                      } else {
                        setShowAwsTokenModal(true);
                        setSidebarOpen(false);
                      }
                    } else {
                      setCurrentPage(item.id);
                      setSidebarOpen(false);
                    }
                  };
                  
                  return (
                    <button
                      key={item.id}
                      onClick={handleClick}
                      disabled={item.locked && !item.requiresToken}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400"
                          : (item.locked && !item.requiresToken)
                          ? "cursor-not-allowed text-muted-foreground/30"
                          : item.requiresToken && !awsAccessGranted
                          ? "text-muted-foreground hover:bg-card hover:text-foreground"
                          : "text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {(item.locked || (item.requiresToken && !awsAccessGranted)) && <Lock className="ml-auto" size={14} />}
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
        <header className="border-b border-border bg-background/70 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white/60 hover:text-white lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div>
                <h2 className="font-semibold text-white">Olá, {studentName ? studentName.split(' ')[0] : 'Aluno'}! 👋</h2>
                <p className="text-white/50">Fase {studentData.currentPhase}</p>
              </div>
            </div>
              <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 ring-1 ring-orange-500/20 sm:flex">
                <Flame size={16} className="text-orange-400" />
                <span className="font-semibold text-orange-400">{studentData.streak} dias</span>
              </div>
                <NotificationCenter />
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
              {currentPage === "inicio" && <HomePage studentData={studentData} studentName={studentName} />}
              {currentPage === "trilha" && <TrilhaPage />}
              {currentPage === "aulas" && <AulasPage />}
              {currentPage === "desafios" && <DesafiosPage />}
              {currentPage === "conquistas" && <ConquistasPage />}
              {currentPage === "materiais" && <MateriaisPage />}
              {currentPage === "aws" && <AwsStudyPage />}
              {currentPage === "conta" && <ContaPage studentName={studentName} onLogout={onLogout} temas={temas} temaSelecionado={temaSelecionado} aplicarTema={aplicarTema} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background/30 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-4 px-6 py-4 text-muted-foreground sm:flex-row">
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
              <button className="transition hover:text-foreground">Suporte</button>
              <button className="transition hover:text-foreground">Termos</button>
            </div>
            <div className="text-xs">Bootcamp FLAME © 2024</div>
          </div>
        </footer>
      </div>

      {/* Modal de Token AWS Study */}
      <AnimatePresence>
        {showAwsTokenModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowAwsTokenModal(false);
                setAwsToken('');
                setAwsTokenError('');
              }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-muted/30 p-6 shadow-2xl">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/30">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">AWS Study</h3>
                  <p className="text-sm text-muted-foreground">Digite seu token de acesso</p>
                </div>
                <button
                  onClick={() => {
                    setShowAwsTokenModal(false);
                    setAwsToken('');
                    setAwsTokenError('');
                  }}
                  className="ml-auto text-muted-foreground hover:text-foreground transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Input de Token */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Token de Acesso
                </label>
                <input
                  type="text"
                  value={awsToken}
                  onChange={(e) => {
                    setAwsToken(e.target.value.toUpperCase());
                    setAwsTokenError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && validateAwsToken()}
                  placeholder="XXXX-XXXXXX-XXXX"
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 text-center text-lg font-mono tracking-widest text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  maxLength={16}
                  autoFocus
                  data-testid="aws-token-modal-input"
                />
                {awsTokenError && (
                  <p className="mt-2 text-sm text-red-400" data-testid="aws-token-modal-error">{awsTokenError}</p>
                )}
              </div>

              {/* Botão de Validar */}
              <button
                onClick={validateAwsToken}
                disabled={validatingToken || !awsToken.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="aws-token-modal-submit"
              >
                {validatingToken ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Validando...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Acessar AWS Study
                  </>
                )}
              </button>

              {/* Info */}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                O token foi enviado pelo administrador do curso.
                <br />
                Caso não tenha recebido, entre em contato.
              </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Boas-vindas AWS Study */}
      <AnimatePresence>
        {showAwsWelcomeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-lg rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-muted/20 p-8 shadow-2xl">
                {/* Header com Ícone */}
                <div className="mb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/40"
                  >
                    <Cloud className="h-10 w-10 text-primary" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    Bem-vindo ao AWS Study! 🚀
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-muted-foreground"
                  >
                    Olá, <span className="font-semibold text-primary">{studentName.split(' ')[0]}</span>!
                  </motion.p>
                </div>

                {/* Descrição */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 rounded-xl bg-muted/30 p-4 text-center"
                >
                  <p className="text-sm leading-relaxed text-foreground/90">
                    O <strong className="text-primary">AWS Study</strong> é sua área exclusiva de estudos para 
                    <strong className="text-primary"> Computação em Nuvem</strong>. Aqui você vai dominar os 
                    serviços da Amazon Web Services e se preparar para as certificações mais valorizadas do mercado.
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 grid grid-cols-2 gap-3"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Conteúdo Completo</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Simulados Reais</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Progresso Detalhado</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Flashcards Interativos</span>
                  </div>
                </motion.div>

                {/* Botão de Entrar */}
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.location.href = '/aws-study/study';
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-4 font-bold text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/50"
                >
                  <span>Entrar no AWS Study</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                {/* Dica */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center text-xs text-muted-foreground"
                >
                  💡 Sua sessão permanece ativa por 10 minutos
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== PÁGINAS =====

function HomePage({ studentData, studentName }: { studentData: any; studentName: string }) {
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
          <h1 className="mb-2 font-bold text-white">
            Olá, {studentName ? studentName.split(' ')[0] : 'Aluno'}!
          </h1>
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
            <div className="rounded-xl border border-border bg-card/80 p-6">
              <h3 className="mb-4 font-semibold text-foreground">Informações pessoais</h3>
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

          {/* Player de Vídeo */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-2xl">
            <div className="relative aspect-video w-full">
              {getVideoUrl(aula.modulo, aula.id) ? (
                <iframe
                  src={getVideoUrl(aula.modulo, aula.id)!}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={aula.titulo}
                />
              ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-center">
                  <Youtube className="mx-auto mb-4 text-orange-500" size={64} />
                  <p className="text-lg font-semibold text-white">Vídeo da Aula</p>
                  <p className="mt-2 text-sm text-white/60">
                    Duração: {aula.duracao}
                  </p>
                  <p className="mt-4 text-xs text-white/40">
                    Vídeo será adicionado em breve
                  </p>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
            <h2 className="mb-4 font-bold text-white">Conteúdo:</h2>
            <div className="space-y-3">
              {aula.conteudo.topicos.map((topico, i) => (
                <div key={i} className="border-l-2 border-orange-500/30 pl-4">
                  <h3 className="mb-1 font-semibold text-white">{topico.titulo}</h3>
                  <p className="text-sm text-white/70">{topico.descricao}</p>
                </div>
              ))}
            </div>
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
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 font-bold text-white">Conquistas</h1>
      <GamificationPanel />
    </div>
  );
}

function MateriaisPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 font-bold text-white">Materiais</h1>
      <EmptyState
        icon={Folder}
        title="Materiais em breve"
        description="Downloads e recursos complementares estarão disponíveis em breve. Acompanhe suas aulas para acessar material exclusivo!"
        action={{
          label: "Ver Aulas",
          onClick: () => window.location.href = "#aulas"
        }}
      />
    </div>
  );
}

function AwsStudyPage() {
  const figmaUrl = process.env.NEXT_PUBLIC_AWS_FIGMA_URL || "https://www.figma.com/embed";

  const resources = [
    {
      title: "Cloud Practitioner (CLF-C02)",
      desc: "Fundamentos, billing e responsabilidade compartilhada. Use o roteiro oficial.",
      link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      badge: "Fundamentos",
    },
    {
      title: "AWS Skill Builder Free", 
      desc: "Trilhas gratuitas com labs guiados. Ideal para prática rápida.",
      link: "https://skillbuilder.aws/",
      badge: "Hands-on",
    },
    {
      title: "Well-Architected", 
      desc: "Pilares para custo, segurança, confiabilidade, performance e operação.",
      link: "https://wa.aws.amazon.com/",
      badge: "Arquitetura",
    },
    {
      title: "Free Tier Checklist", 
      desc: "O que usar sem estourar custos. Monitore budgets e billing alerts.",
      link: "https://aws.amazon.com/free",
      badge: "Custo",
    },
  ];

  const tracks = [
    { name: "Foundations", progress: 55, focus: "Cloud, global infra, IAM, billing" },
    { name: "Core Services", progress: 32, focus: "EC2, S3, RDS, networking" },
    { name: "Security & Cost", progress: 20, focus: "IAM guardrails, budgets, alerts" },
    { name: "Exam Prep", progress: 10, focus: "Banco de questões, simulados" },
  ];

  const labs = [
    { title: "Static site + CDN", desc: "S3 + CloudFront + DNS", safe: true },
    { title: "Serverless API", desc: "Lambda + API Gateway + DynamoDB", safe: true },
    { title: "Orquestração simples", desc: "Step Functions + SNS/SQS", safe: true },
  ];

  const practicePresets = [
    { title: "Simulado rápido", questions: 20, timer: 30, target: "72%" },
    { title: "Exame completo", questions: 65, timer: 130, target: "72%" },
  ];

  const diagramServices = [
    "Front: CloudFront + S3 (Static)",
    "App: API Gateway + Lambda",
    "Dados: DynamoDB + S3 backups",
    "Segurança: IAM roles + WAF",
    "Observabilidade: CloudWatch + X-Ray",
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 p-6">
        <div className="mb-2 flex flex-wrap items-center gap-3 text-orange-300">
          <Cloud size={18} />
          <span className="text-sm font-semibold">AWS Study Hub</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">CLF + arquitetura segura</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Prática guiada e simulados</h1>
            <p className="text-white/70">Sequência inspirada no protótipo AWS-FIGMA: fundamentos, diagramas, labs seguros e simulador.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-orange-500/30 transition hover:shadow-lg">
              <Play size={16} /> Iniciar simulado
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-orange-400/60">
              <BookOpen size={16} /> Ver trilha
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center justify-between text-sm text-white/70">
            <span>Taxa de acerto</span>
            <BarChart3 size={16} className="text-orange-300" />
          </div>
          <div className="text-3xl font-bold text-white">78%</div>
          <p className="text-xs text-white/60">Meta 72%+ (CLF). Treine fraquezas primeiro.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center justify-between text-sm text-white/70">
            <span>Simulados feitos</span>
            <Trophy size={16} className="text-yellow-300" />
          </div>
          <div className="text-3xl font-bold text-white">3</div>
          <p className="text-xs text-white/60">Use modo rápido de 20 questões para revisão diária.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center justify-between text-sm text-white/70">
            <span>Média de tempo</span>
            <Clock size={16} className="text-blue-300" />
          </div>
          <div className="text-3xl font-bold text-white">1m 05s</div>
          <p className="text-xs text-white/60">Por questão. Priorize leitura das palavras-chave.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Trilha inspirada no protótipo AWSFIGMA</h3>
                <p className="text-sm text-white/70">Foundations → Core Services → Segurança/Custo → Exam Prep</p>
              </div>
              <Brain size={20} className="text-orange-300" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {tracks.map((track) => (
                <div key={track.name} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-orange-200/80 font-semibold">{track.name}</p>
                      <p className="text-sm text-white/80">{track.focus}</p>
                    </div>
                    <span className="text-sm font-semibold text-white/80">{track.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${track.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Configurações de simulado</h3>
                <p className="text-sm text-white/70">Use o fluxo de Exam Simulator do AWSFIGMA: timer + aprovação 72%.</p>
              </div>
              <Target size={20} className="text-orange-300" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {practicePresets.map((preset) => (
                <div key={preset.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{preset.title}</p>
                    <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs text-orange-200">Meta {preset.target}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">{preset.questions} questões • {preset.timer} min</p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:border-orange-400/60">Praticar</button>
                    <button className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 text-xs font-semibold text-white shadow-orange-500/30 hover:shadow-lg">Simulado</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Arquitetura de referência</h3>
              <Shield size={20} className="text-orange-200" />
            </div>
            <p className="text-sm text-white/70">Snapshot do Diagram View (AWSFIGMA): serviços e guardrails para Free Tier seguro.</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {diagramServices.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Labs rápidos (seguros)</h3>
            <p className="text-sm text-white/70">Guia inspirado na Study Plan do protótipo.</p>
            <div className="mt-3 space-y-3">
              {labs.map((lab) => (
                <div key={lab.title} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{lab.title}</p>
                    {lab.safe ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-[11px] font-semibold text-green-200">
                        <Shield size={12} /> Free Tier safe
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-white/60">{lab.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Plano de estudo</h3>
          <p className="text-sm text-white/70">Siga a ordem: Foundations → Core Services → Segurança/Custo → Simulados + revisão.</p>
          <div className="mt-3 space-y-2 text-sm text-white/80">
            <p>1) Revisar notas dos simulados e reforçar tópicos fracos.</p>
            <p>2) Criar um diagrama simples da arquitetura de referência.</p>
            <p>3) Rodar 1 simulado rápido por dia (20 questões).</p>
            <p>4) Rodar exame completo no fim de semana.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Checklist de segurança e custo</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• Ativar MFA no root e criar usuário IAM administrativo.</li>
            <li>• Criar budgets + billing alerts antes do primeiro lab.</li>
            <li>• Usar roles específicas por lab (princípio do mínimo privilégio).</li>
            <li>• Encerrar recursos após cada sessão (CloudWatch alarm opcional).</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Protótipo AWS Study (Figma)</h3>
          <p className="mb-4 text-sm text-white/70">Embed do fluxo AWSFIGMA para visualizar diagramas, simulador e review.</p>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
            <iframe
              src={figmaUrl}
              className="h-72 w-full"
              allowFullScreen
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-2 text-lg font-semibold text-white">Recursos oficiais</h3>
          <p className="mb-4 text-sm text-white/70">Links espelhando a seção "Resources" do protótipo.</p>
          <div className="space-y-3">
            {resources.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-orange-400/60 hover:bg-black/40"
              >
                <div>
                  <p>{item.title}</p>
                  <p className="text-xs font-normal text-white/60">{item.desc}</p>
                </div>
                <span className="rounded-full bg-orange-500/15 px-2 py-1 text-[11px] font-semibold text-orange-200">{item.badge}</span>
              </a>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <h4 className="text-sm font-semibold text-white">Portal AWS Training</h4>
            <p className="text-xs text-white/70 mb-3">Aulas, eventos ao vivo e certificações.</p>
            <a
              href="https://aws.amazon.com/training/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white shadow-orange-500/30 transition hover:shadow-lg"
            >
              Ir para o portal
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContaPage({ studentName, onLogout, temas, temaSelecionado, aplicarTema }: { studentName: string; onLogout: () => void; temas: any[]; temaSelecionado: string; aplicarTema: (temaId: string) => void }) {
  const [notificacoes, setNotificacoes] = useState(true);
  const [lembreteDiario, setLembreteDiario] = useState(true);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-bold text-foreground">Minha Conta</h1>
      
      <div className="space-y-4">
        {/* Aparência */}
        <div className="rounded-xl border border-border bg-card/80 p-6">
          <h3 className="mb-4 font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            Tema do Sistema
          </h3>
          
          {/* Grid de Temas */}
          <div className="grid grid-cols-3 gap-3">
            {temas.map((tema) => (
              <button
                key={tema.id}
                onClick={() => aplicarTema(tema.id)}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all hover:scale-105 ${
                  temaSelecionado === tema.id
                    ? 'border-orange-500 shadow-lg shadow-orange-500/30 ring-2 ring-orange-500/20'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                {/* Ícone grande */}
                <div className="mb-2 text-4xl">{tema.icon}</div>
                
                {/* Paleta de cores */}
                <div className="mb-3 flex justify-center gap-1.5">
                  {tema.cores.map((cor: string, idx: number) => (
                    <div
                      key={idx}
                      className="h-6 w-6 rounded-full shadow-md ring-1 ring-black/10"
                      style={{ backgroundColor: cor }}
                    />
                  ))}
                </div>
                
                {/* Nome do tema */}
                <p className="mb-1 text-sm font-bold text-foreground">{tema.nome}</p>
                
                {/* Descrição menor */}
                <p className="text-[10px] leading-tight text-muted-foreground">{tema.descricao}</p>
                
                {/* Indicador ativo */}
                {temaSelecionado === tema.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-1.5 shadow-lg">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                {/* Efeito hover */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br transition-opacity ${
                  temaSelecionado === tema.id
                    ? 'from-orange-500/10 to-red-500/10 opacity-100'
                    : 'from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Informações pessoais */}
        <div className="rounded-xl border border-border bg-card/80 p-6">
          <h3 className="mb-4 font-semibold text-foreground">Informações pessoais</h3>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-muted-foreground">Nome</label>
              <input
                type="text"
                value={studentName}
                readOnly
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-muted-foreground">E-mail</label>
              <input
                type="email"
                value="aluno@bootcamp.com"
                readOnly
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none"
              />
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="rounded-xl border border-border bg-card/80 p-6">
          <h3 className="mb-4 font-semibold text-foreground">Segurança</h3>
          <button className="flex w-full items-center justify-between rounded-lg border border-border bg-card/60 px-4 py-3 text-left transition hover:bg-card/80">
            <div>
              <p className="font-medium text-foreground">Alterar senha</p>
              <p className="text-xs text-foreground/60">Última alteração: há 30 dias</p>
            </div>
            <ChevronRight className="text-white/40" size={20} />
          </button>
        </div>

        {/* Privacidade */}
        <div className="rounded-xl border border-border bg-card/80 p-6">
          <h3 className="mb-4 font-semibold text-foreground">Privacidade</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Acesse nosso portal de privacidade para gerenciar seus dados pessoais e consentimentos de acordo com a LGPD.
          </p>
          <a
            href="/privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 bg-orange-500 text-white transition hover:bg-orange-600"
          >
            <ChevronRight size={16} />
            Portal de Privacidade
          </a>
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
      
      {/* Onboarding Tour */}
      <WelcomeTour onComplete={handleWelcomeComplete} />

    </div>
  );
}