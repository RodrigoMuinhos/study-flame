"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Send, 
  BarChart3, 
  Clock,
  Award,
  MessageSquare,
  X,
  Home,
  Video,
  Lock,
  Settings,
  Wrench,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Upload,
  Play,
  Eye,
  Mail,
  UserPlus,
  Copy,
  Smartphone,
  Key,
  Cloud,
  PanelLeftClose,
  PanelLeftOpen,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AccessSection } from "./AccessSection";
import { AwsTokenGenerator } from "./AwsTokenGenerator";
import { leadService, type Lead } from "@/services/api";
import { NotificationCenter } from "./ui/notification-center";
import { useToast } from "./ui/toast";

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
  progress: number;
  phase: string;
  streak: number;
  lastAccess: string;
  modulesCompleted: number;
  accessEnabled: boolean;
  password?: string;
  credentialsSent?: boolean;
  whatsapp?: string;
}

interface Message {
  id: number;
  title: string;
  content: string;
  link?: string;
  createdAt: string;
}

interface VideoLesson {
  id: number;
  module: string;
  title: string;
  youtubeUrl: string;
  duration: string;
  isPublished: boolean;
}

interface Invite {
  id: number;
  name: string;
  email: string;
  cpf: string;
  inviteCode: string;
  status: "pending" | "accepted" | "expired";
  sentAt: string;
  expiresAt: string;
}

type AdminSection = "dashboard" | "students" | "invites" | "videos" | "access" | "awstoken" | "messages" | "settings" | "maintenance";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState<AdminSection>("dashboard");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageLink, setMessageLink] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<"all" | "specific">("all");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [temaSelecionado, setTemaSelecionado] = useState<string>('theme-fire-dark');
  const { addToast } = useToast();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Integrar com backend: carregar leads e popular alunos do painel
  useEffect(() => {
    const carregarLeads = async () => {
      try {
        const leads: Lead[] = await leadService.getAll();
        const alunosConvertidos: Student[] = leads.map((l) => ({
          id: Date.parse(l.createdAt ?? new Date().toISOString()) || Date.now(),
          name: l.name,
          email: l.email,
          cpf: l.cpf,
          progress: 0,
          phase: "Início",
          streak: 0,
          lastAccess: "Nunca",
          modulesCompleted: 0,
          accessEnabled: true,
        }));
        setStudents(alunosConvertidos);
      } catch (e) {
        console.error("Falha ao carregar leads do backend", e);
      }
    };
    carregarLeads();
  }, []);

  // Form de adicionar aluno
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentCPF, setNewStudentCPF] = useState("");

  // Form de adicionar vídeo
  const [newVideoModule, setNewVideoModule] = useState("0");
  const [newVideoNumber, setNewVideoNumber] = useState("1");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoDuration, setNewVideoDuration] = useState("");
  const [newVideoPage, setNewVideoPage] = useState("aulas");

  // Dados simulados de alunos
  const [students, setStudents] = useState<Student[]>([]);

  const [videos, setVideos] = useState<VideoLesson[]>([]);

  const [invites, setInvites] = useState<Invite[]>([]);

  const handleSendMessage = () => {
    if (messageTitle && messageContent) {
      const newMessage: Message = {
        id: Date.now(),
        title: messageTitle,
        content: messageContent,
        link: messageLink || undefined,
        createdAt: new Date().toLocaleString('pt-BR')
      };
      
      setMessages([newMessage, ...messages]);
      
      // Simular envio para localStorage para ser lido pelo aluno
      const existingMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
      localStorage.setItem('adminMessages', JSON.stringify([newMessage, ...existingMessages]));
      
      // Limpar form
      setMessageTitle("");
      setMessageContent("");
      setMessageLink("");
      setShowMessageModal(false);
    }
  };

  const toggleStudentAccess = (studentId: number) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, accessEnabled: !s.accessEnabled } : s
    ));
  };

  const toggleVideoPublish = (videoId: number) => {
    setVideos(videos.map(v =>
      v.id === videoId ? { ...v, isPublished: !v.isPublished } : v
    ));
  };

  const handleAddVideo = () => {
    if (newVideoTitle && newVideoUrl && newVideoDuration) {
      const newVideo: VideoLesson = {
        id: Date.now(),
        module: `Módulo ${newVideoModule} • Aula ${newVideoNumber}`,
        title: newVideoTitle,
        youtubeUrl: newVideoUrl,
        duration: newVideoDuration,
        isPublished: false
      };
      
      setVideos([...videos, newVideo]);
      
      // Limpar form
      setNewVideoModule("0");
      setNewVideoNumber("1");
      setNewVideoTitle("");
      setNewVideoUrl("");
      setNewVideoDuration("");
      setShowVideoModal(false);
    }
  };

  // Backup e Restauração
  const handleExportData = () => {
    const data = {
      students,
      videos,
      invites,
      messages,
      exportedAt: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flame-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'Backup criado!',
      description: 'Os dados foram exportados com sucesso.'
    });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Nenhum arquivo selecionado.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.students) setStudents(data.students);
        if (data.videos) setVideos(data.videos);
        if (data.invites) setInvites(data.invites);
        if (data.messages) setMessages(data.messages);
        
        addToast({
          type: 'success',
          title: 'Dados importados!',
          description: 'Os dados foram restaurados com sucesso.'
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro na importação',
          description: 'Verifique se o arquivo está no formato correto.'
        });
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  // Estatísticas gerais
  const totalStudents = students.length;
  const avgProgress = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length) 
    : 0;
  const activeToday = students.filter(s => s.lastAccess.includes('hora') || s.lastAccess.includes('min')).length;
  const avgStreak = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.streak, 0) / students.length) 
    : 0;
  const activeStudents = students.filter(s => s.accessEnabled).length;
  const totalVideos = videos.length;
  const publishedVideos = videos.filter(v => v.isPublished).length;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="border-r border-border bg-background/70 backdrop-blur-sm flex-shrink-0 overflow-hidden"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              {/* Logo Chama - clicável para colapsar */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary flex-shrink-0 transition hover:scale-105"
                title={sidebarCollapsed ? "Expandir menu" : "Colapsar menu"}
              >
                <svg width="28" height="28" viewBox="0 0 180 180" fill="none">
                  <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="white" />
                </svg>
              </button>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <h1 className="font-bold text-foreground">Boot Camp FLAME</h1>
                    <p className="text-xs text-muted-foreground/70">Bem-vindo</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            <SidebarButton
              icon={<Home size={20} />}
              label="Dashboard"
              active={currentSection === "dashboard"}
              onClick={() => setCurrentSection("dashboard")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Users size={20} />}
              label="Alunos"
              active={currentSection === "students"}
              onClick={() => setCurrentSection("students")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<UserPlus size={20} />}
              label="Convites"
              active={currentSection === "invites"}
              onClick={() => setCurrentSection("invites")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Video size={20} />}
              label="Vídeos & Aulas"
              active={currentSection === "videos"}
              onClick={() => setCurrentSection("videos")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<MessageSquare size={20} />}
              label="Mensagens"
              active={currentSection === "messages"}
              onClick={() => setCurrentSection("messages")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Lock size={20} />}
              label="Controle de Acesso"
              active={currentSection === "access"}
              onClick={() => setCurrentSection("access")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Cloud size={20} />}
              label="Token AWS Study"
              active={currentSection === "awstoken"}
              onClick={() => setCurrentSection("awstoken")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Settings size={20} />}
              label="Configurações"
              active={currentSection === "settings"}
              onClick={() => setCurrentSection("settings")}
              collapsed={sidebarCollapsed}
            />
            <SidebarButton
              icon={<Wrench size={20} />}
              label="Manutenção"
              active={currentSection === "maintenance"}
              onClick={() => setCurrentSection("maintenance")}
              collapsed={sidebarCollapsed}
            />
          </nav>

          {/* Logout */}
          <div className="border-t border-border p-4">
            <button
              onClick={onLogout}
              className={`flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-foreground/70 transition hover:bg-muted hover:text-foreground ${sidebarCollapsed ? 'justify-center' : ''}`}
              title="Sair do Painel"
            >
              <LogOut size={20} className="flex-shrink-0" />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Sair do Painel
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentSection === "dashboard" && (
            <DashboardSection
              key="dashboard"
              totalStudents={totalStudents}
              avgProgress={avgProgress}
              activeToday={activeToday}
              avgStreak={avgStreak}
              activeStudents={activeStudents}
              totalVideos={totalVideos}
              publishedVideos={publishedVideos}
            />
          )}

          {currentSection === "students" && (
            <StudentsSection 
              key="students" 
              students={students} 
              onAddStudent={() => setShowAddStudentModal(true)}
            />
          )}

          {currentSection === "invites" && (
            <InvitesSection key="invites" invites={invites} />
          )}

          {currentSection === "videos" && (
            <VideosSection
              key="videos"
              videos={videos}
              onTogglePublish={toggleVideoPublish}
              onAddVideo={() => setShowVideoModal(true)}
            />
          )}

          {currentSection === "access" && (
            <AccessSection
              key="access"
              students={students}
              setStudents={setStudents}
              onToggleAccess={toggleStudentAccess}
            />
          )}

          {currentSection === "awstoken" && (
            <AwsTokenGenerator key="awstoken" />
          )}

          {currentSection === "messages" && (
            <MessagesSection
              key="messages"
              messages={messages}
              onSendMessage={() => setShowMessageModal(true)}
            />
          )}

          {currentSection === "settings" && (
            <SettingsSection 
              key="settings" 
              temas={temas} 
              temaSelecionado={temaSelecionado} 
              aplicarTema={aplicarTema} 
            />
          )}

          {currentSection === "maintenance" && (
            <MaintenanceSection 
              key="maintenance" 
              onExportData={handleExportData}
              onImportData={handleImportData}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Modal de Enviar Mensagem */}
      {showMessageModal && (
        <>
          <div
            onClick={() => setShowMessageModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="rounded-2xl border border-primary/30 bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Send className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Enviar Mensagem aos Alunos</h2>
                    <p className="text-xs text-muted-foreground">A mensagem aparecerá na caixa de informações</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* Select de Destinatários */}
                <div className="mb-4">
                  <label className="mb-2 block text-foreground">Enviar para</label>
                  <select
                    value={selectedRecipients}
                    onChange={(e) => {
                      setSelectedRecipients(e.target.value as "all" | "specific");
                      setSelectedStudents([]);
                    }}
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="all">Todos os alunos</option>
                    <option value="specific">Alunos específicos</option>
                  </select>
                </div>

                {/* Multi-select de Alunos Específicos */}
                {selectedRecipients === "specific" && (
                  <div className="mb-4">
                    <label className="mb-2 block text-foreground">Selecione os alunos</label>
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-border bg-muted/30 p-3">
                      {students.map((student) => (
                        <label
                          key={student.id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-muted"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents([...selectedStudents, student.id]);
                              } else {
                                setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                              }
                            }}
                            className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-2 focus:ring-primary/50"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                          <span className="text-xs text-primary">{student.phase}</span>
                        </label>
                      ))}
                    </div>
                    {selectedStudents.length > 0 && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {selectedStudents.length} aluno(s) selecionado(s)
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="mb-2 block text-foreground">Título</label>
                  <input
                    type="text"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Ex: Nova aula disponível!"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-foreground">Mensagem</label>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Escreva a mensagem para os alunos..."
                    rows={4}
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-foreground">Link (opcional)</label>
                  <input
                    type="url"
                    value={messageLink}
                    onChange={(e) => setMessageLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                  <Send size={18} />
                  {selectedRecipients === "all" 
                    ? "Enviar para todos os alunos" 
                    : `Enviar para ${selectedStudents.length} aluno(s)`
                  }
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Modal de Adicionar Aluno */}
      {showAddStudentModal && (
        <>
          <div
            onClick={() => setShowAddStudentModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="rounded-2xl border border-primary/30 bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <UserPlus className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Adicionar Aluno</h2>
                    <p className="text-xs text-muted-foreground">Preencha os dados do novo aluno</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="mb-2 block text-foreground">Nome</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-foreground">E-mail</label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    placeholder="Ex: joao.silva@example.com"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-foreground">CPF</label>
                  <input
                    type="text"
                    value={newStudentCPF}
                    onChange={(e) => setNewStudentCPF(e.target.value)}
                    placeholder="Ex: 123.456.789-00"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  onClick={() => {
                    if (newStudentName && newStudentEmail && newStudentCPF) {
                      const newStudent: Student = {
                        id: Date.now(),
                        name: newStudentName,
                        email: newStudentEmail,
                        cpf: newStudentCPF,
                        progress: 0,
                        phase: "Início",
                        streak: 0,
                        lastAccess: "Nunca",
                        modulesCompleted: 0,
                        accessEnabled: true
                      };
                      setStudents([...students, newStudent]);
                      setShowAddStudentModal(false);
                      setNewStudentName("");
                      setNewStudentEmail("");
                      setNewStudentCPF("");
                    } else {
                      alert("Preencha todos os campos para adicionar o aluno.");
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                  <Plus size={18} />
                  Adicionar Aluno
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Modal de Adicionar Vídeo */}
      {showVideoModal && (
        <>
          <div
            onClick={() => setShowVideoModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-4 z-50 m-auto flex h-fit max-h-[90vh] w-full max-w-2xl items-center justify-center"
          >
            <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-primary/30 bg-card shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Video className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Adicionar Vídeo/Aula</h2>
                    <p className="text-xs text-muted-foreground">Configure a nova aula do bootcamp</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* Página onde o vídeo aparecerá */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    Página do Portal
                  </label>
                  <select
                    value={newVideoPage}
                    onChange={(e) => setNewVideoPage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="inicio">Início</option>
                    <option value="trilha">Trilha de Aprendizado</option>
                    <option value="aulas">Aulas (Padrão)</option>
                    <option value="desafios">Desafios</option>
                    <option value="materiais">Materiais</option>
                  </select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Escolha onde este vídeo aparecerá no portal do aluno
                  </p>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Módulo</label>
                    <select
                      value={newVideoModule}
                      onChange={(e) => setNewVideoModule(e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="0">Módulo 0 - Preparação</option>
                      <option value="1">Módulo 1 - Fundamentos</option>
                      <option value="2">Módulo 2 - Frontend Básico</option>
                      <option value="3">Módulo 3 - Backend Básico</option>
                      <option value="4">Módulo 4 - Banco de Dados</option>
                      <option value="5">Módulo 5 - Autenticação</option>
                      <option value="6">Módulo 6 - CRUD Completo</option>
                      <option value="7">Módulo 7 - API REST</option>
                      <option value="8">Módulo 8 - Frontend Avançado</option>
                      <option value="9">Módulo 9 - Integração</option>
                      <option value="10">Módulo 10 - Testes</option>
                      <option value="11">Módulo 11 - Deploy</option>
                      <option value="12">Módulo 12 - Finalização</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Aula Nº</label>
                    <input
                      type="number"
                      min="1"
                      value={newVideoNumber}
                      onChange={(e) => setNewVideoNumber(e.target.value)}
                      placeholder="1"
                      className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-foreground">Título da Aula</label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Ex: Bem-vindo ao Jogo Real"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-foreground">URL do YouTube</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... ou https://youtu.be/..."
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Cole a URL completa do vídeo no YouTube
                  </p>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-foreground">Duração</label>
                  <input
                    type="text"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    placeholder="Ex: 8 min"
                    className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3 font-semibold text-foreground transition hover:bg-muted"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddVideo}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                  >
                    <Plus size={18} />
                    Adicionar Vídeo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

// Componentes de Seção

function SidebarButton({ icon, label, active, onClick, collapsed = false }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; collapsed?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
        active
          ? "bg-primary text-primary-foreground shadow-lg"
          : "text-foreground/60 hover:bg-muted hover:text-foreground"
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="font-medium overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function DashboardSection({ totalStudents, avgProgress, activeToday, avgStreak, activeStudents, totalVideos, publishedVideos }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
        <h1 className="mb-2 font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do Bootcamp FLAME</p>
        </div>
        <NotificationCenter />
      </div>

      {/* Cards de Estatísticas */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="text-primary" size={24} />}
          title="Total de Alunos"
          value={totalStudents.toString()}
          subtitle="Cadastrados no bootcamp"
        />
        <StatCard
          icon={<TrendingUp className="text-green-600" size={24} />}
          title="Progresso Médio"
          value={`${avgProgress}%`}
          subtitle="Conclusão média da trilha"
        />
        <StatCard
          icon={<Activity className="text-blue-600" size={24} />}
          title="Ativos Hoje"
          value={activeToday.toString()}
          subtitle={totalStudents > 0 ? `${Math.round((activeToday / totalStudents) * 100)}% dos alunos` : "0% dos alunos"}
        />
        <StatCard
          icon={<Award className="text-purple-600" size={24} />}
          title="Streak Médio"
          value={`${avgStreak} dias`}
          subtitle="Dias consecutivos"
        />
      </div>

      {/* Cards Secundários */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<CheckCircle className="text-green-600" size={24} />}
          title="Acessos Ativos"
          value={activeStudents.toString()}
          subtitle={`${totalStudents - activeStudents} bloqueados`}
        />
        <StatCard
          icon={<Video className="text-primary" size={24} />}
          title="Total de Vídeos"
          value={totalVideos.toString()}
          subtitle={`${publishedVideos} publicados`}
        />
        <StatCard
          icon={<MessageSquare className="text-blue-600" size={24} />}
          title="Comunicação"
          value="0"
          subtitle="Mensagens enviadas hoje"
        />
      </div>
    </motion.div>
  );
}

function StudentsSection({ students, onAddStudent }: { students: Student[]; onAddStudent: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Users size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gerenciar Alunos</h1>
            <p className="text-muted-foreground">Lista completa de alunos cadastrados</p>
          </div>
        </div>
        <button 
          onClick={onAddStudent}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90"
        >
          <Plus size={18} />
          Adicionar Aluno
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Aluno</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Progresso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Fase</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Streak</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Último Acesso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border transition hover:bg-muted"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-28 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-primary">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                      {student.phase}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground">{student.streak}</span>
                      <span className="text-xs text-muted-foreground">dias</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={14} />
                      <span className="text-sm">{student.lastAccess}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.accessEnabled ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} />
                        Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <XCircle size={16} />
                        Bloqueado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                        <Edit size={16} />
                      </button>
                      <button className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500/20">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function InvitesSection({ invites }: { invites: Invite[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-foreground">Convites</h1>
        <p className="text-muted-foreground">Lista de convites enviados</p>
      </div>

      <div className="space-y-4">
        {invites.map((invite) => (
          <motion.div
            key={invite.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                invite.status === "accepted" ? "bg-green-500/20" : "bg-red-500/20"
              }`}>
                {invite.status === "accepted" ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{invite.name}</h3>
                <p className="text-sm text-muted-foreground">{invite.email} • {invite.cpf}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status:</span>
              <span
                className={`text-sm font-medium ${
                  invite.status === "accepted"
                    ? "text-green-600"
                    : invite.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                {invite.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function VideosSection({ videos, onTogglePublish, onAddVideo }: { videos: VideoLesson[]; onTogglePublish: (id: number) => void; onAddVideo: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-bold text-foreground">Gerenciar Vídeos & Aulas</h1>
          <p className="text-muted-foreground">Administre o conteúdo do YouTube</p>
        </div>
        <button
          onClick={onAddVideo}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
        >
          <Plus size={18} />
          Adicionar Vídeo
        </button>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {video.module}
                  </span>
                  {video.isPublished ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                      <CheckCircle size={12} />
                      Publicado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600">
                      <Clock size={12} />
                      Rascunho
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{video.title}</h3>
                <div className="mb-3 flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Play size={14} />
                    <span className="text-sm">{video.duration}</span>
                  </div>
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <Eye size={14} />
                    Ver no YouTube
                  </a>
                </div>
                <p className="text-sm text-muted-foreground/70">{video.youtubeUrl}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTogglePublish(video.id)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    video.isPublished
                      ? "border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                      : "border border-green-500/30 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                  }`}
                >
                  {video.isPublished ? "Despublicar" : "Publicar"}
                </button>
                <button className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  <Edit size={18} />
                </button>
                <button className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500/20">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MessagesSection({ messages, onSendMessage }: { messages: Message[]; onSendMessage: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground">Comunique-se com os alunos</p>
        </div>
        <button
          onClick={onSendMessage}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
        >
          <Send size={18} />
          Nova Mensagem
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {messages.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <MessageSquare className="mx-auto mb-3" size={48} />
            <p>Nenhuma mensagem enviada ainda</p>
            <button
              onClick={onSendMessage}
              className="mt-4 text-primary hover:underline"
            >
              Enviar primeira mensagem
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-semibold text-foreground">{msg.title}</h3>
                  <span className="text-xs text-muted-foreground">{msg.createdAt}</span>
                </div>
                <p className="mb-2 text-muted-foreground">{msg.content}</p>
                {msg.link && (
                  <a href={msg.link} className="text-sm text-primary hover:underline">
                    {msg.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SettingsSection({ temas, temaSelecionado, aplicarTema }: {
  temas: Array<{ id: string; nome: string; descricao: string; icon: string; cores: string[] }>;
  temaSelecionado: string;
  aplicarTema: (temaId: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Configure a plataforma</p>
      </div>

      <div className="space-y-6">
        {/* Aparência */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
                    ? 'border-primary shadow-lg shadow-primary/30 ring-2 ring-primary/20'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                {/* Ícone grande */}
                <div className="mb-2 text-4xl">{tema.icon}</div>
                
                {/* Paleta de cores */}
                <div className="mb-3 flex justify-center gap-1.5">
                  {tema.cores.map((cor, idx) => (
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
                  <div className="absolute right-2 top-2 rounded-full bg-primary p-1.5 shadow-lg">
                    <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                {/* Efeito hover */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br transition-opacity ${
                  temaSelecionado === tema.id
                    ? 'from-primary/10 to-primary/5 opacity-100'
                    : 'from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100'
                }`} />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Configurações Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-foreground">Nome do Bootcamp</label>
              <input
                type="text"
                defaultValue="Bootcamp FLAME"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-foreground">Canal do YouTube</label>
              <input
                type="text"
                defaultValue="@Rodrigomuinhosdev"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Credenciais de Administrador</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-foreground">E-mail Admin</label>
              <input
                type="email"
                placeholder="Digite o email do admin"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-foreground">Alterar Senha</label>
              <input
                type="password"
                placeholder="Nova senha"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90">
          Salvar Configurações
        </button>
      </div>
    </motion.div>
  );
}

function MaintenanceSection({ onExportData, onImportData }: { onExportData: () => void; onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-foreground">Manutenção da Plataforma</h1>
        <p className="text-muted-foreground">Ferramentas de administração e backup</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Backup e Restauração</h3>
          <div className="space-y-3">
            <button
              onClick={onExportData}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3 font-medium text-foreground transition hover:bg-muted"
            >
              <Upload size={18} />
              Fazer Backup dos Dados
            </button>
            <input
              type="file"
              accept=".json"
              onChange={onImportData}
              className="hidden"
              id="import-data"
            />
            <label
              htmlFor="import-data"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3 font-medium text-foreground transition hover:bg-muted cursor-pointer"
            >
              <Upload size={18} />
              Restaurar Backup
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Limpeza de Dados</h3>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3 font-medium text-foreground transition hover:bg-muted">
              Limpar Cache do Sistema
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-medium text-red-500 transition hover:bg-red-500/20">
              <Trash2 size={18} />
              Limpar Mensagens Antigas
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 shadow-sm">
          <h3 className="mb-2 font-semibold text-primary">⚠️ Zona de Perigo</h3>
          <p className="mb-4 text-sm text-muted-foreground">Ações irreversíveis que afetam toda a plataforma</p>
          <button className="w-full rounded-xl border border-red-500/50 bg-red-500/20 px-6 py-3 font-semibold text-red-500 transition hover:bg-red-500/30">
            Resetar Todos os Dados
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-3">{icon}</div>
      <h3 className="mb-1 text-muted-foreground">{title}</h3>
      <p className="mb-1 font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
