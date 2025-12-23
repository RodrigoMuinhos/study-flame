"use client";

import { useState } from "react";
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
  Key
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AccessSection } from "./AccessSection";

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

type AdminSection = "dashboard" | "students" | "invites" | "videos" | "access" | "messages" | "settings" | "maintenance";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
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

  // Form de adicionar aluno
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentCPF, setNewStudentCPF] = useState("");

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
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.students) setStudents(data.students);
        if (data.videos) setVideos(data.videos);
        if (data.invites) setInvites(data.invites);
        if (data.messages) setMessages(data.messages);
        
        alert('Dados importados com sucesso!');
      } catch (error) {
        alert('Erro ao importar dados. Verifique se o arquivo JSON está correto.');
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#070A12] via-[#0A0F1F] to-[#070A12]">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-[#0A0F1F]/50 backdrop-blur-sm">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <svg width="28" height="28" viewBox="0 0 180 180" fill="none">
                  <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="white" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-white">FLAME Admin</h1>
                <p className="text-xs text-white/50">Painel de Controle</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1 p-4">
            <SidebarButton
              icon={<Home size={20} />}
              label="Dashboard"
              active={currentSection === "dashboard"}
              onClick={() => setCurrentSection("dashboard")}
            />
            <SidebarButton
              icon={<Users size={20} />}
              label="Alunos"
              active={currentSection === "students"}
              onClick={() => setCurrentSection("students")}
            />
            <SidebarButton
              icon={<UserPlus size={20} />}
              label="Convites"
              active={currentSection === "invites"}
              onClick={() => setCurrentSection("invites")}
            />
            <SidebarButton
              icon={<Video size={20} />}
              label="Vídeos & Aulas"
              active={currentSection === "videos"}
              onClick={() => setCurrentSection("videos")}
            />
            <SidebarButton
              icon={<MessageSquare size={20} />}
              label="Mensagens"
              active={currentSection === "messages"}
              onClick={() => setCurrentSection("messages")}
            />
            <SidebarButton
              icon={<Lock size={20} />}
              label="Controle de Acesso"
              active={currentSection === "access"}
              onClick={() => setCurrentSection("access")}
            />
            <SidebarButton
              icon={<Settings size={20} />}
              label="Configurações"
              active={currentSection === "settings"}
              onClick={() => setCurrentSection("settings")}
            />
            <SidebarButton
              icon={<Wrench size={20} />}
              label="Manutenção"
              active={currentSection === "maintenance"}
              onClick={() => setCurrentSection("maintenance")}
            />
          </nav>

          {/* Logout */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut size={20} />
              <span>Sair do Painel</span>
            </button>
          </div>
        </div>
      </aside>

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

          {currentSection === "messages" && (
            <MessagesSection
              key="messages"
              messages={messages}
              onSendMessage={() => setShowMessageModal(true)}
            />
          )}

          {currentSection === "settings" && (
            <SettingsSection key="settings" />
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
            <div className="rounded-2xl border border-orange-500/30 bg-[#0A0F1F] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                    <Send className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">Enviar Mensagem aos Alunos</h2>
                    <p className="text-xs text-white/50">A mensagem aparecerá na caixa de informações</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-white/60 transition hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* Select de Destinatários */}
                <div className="mb-4">
                  <label className="mb-2 block text-white/90">Enviar para</label>
                  <select
                    value={selectedRecipients}
                    onChange={(e) => {
                      setSelectedRecipients(e.target.value as "all" | "specific");
                      setSelectedStudents([]);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50"
                  >
                    <option value="all">Todos os alunos</option>
                    <option value="specific">Alunos específicos</option>
                  </select>
                </div>

                {/* Multi-select de Alunos Específicos */}
                {selectedRecipients === "specific" && (
                  <div className="mb-4">
                    <label className="mb-2 block text-white/90">Selecione os alunos</label>
                    <div className="max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
                      {students.map((student) => (
                        <label
                          key={student.id}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
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
                            className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-2 focus:ring-orange-500/50"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-white">{student.name}</p>
                            <p className="text-xs text-white/50">{student.email}</p>
                          </div>
                          <span className="text-xs text-orange-400">{student.phase}</span>
                        </label>
                      ))}
                    </div>
                    {selectedStudents.length > 0 && (
                      <p className="mt-2 text-xs text-white/50">
                        {selectedStudents.length} aluno(s) selecionado(s)
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="mb-2 block text-white/90">Título</label>
                  <input
                    type="text"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Ex: Nova aula disponível!"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-white/90">Mensagem</label>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Escreva a mensagem para os alunos..."
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-white/90">Link (opcional)</label>
                  <input
                    type="url"
                    value={messageLink}
                    onChange={(e) => setMessageLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
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
            <div className="rounded-2xl border border-orange-500/30 bg-[#0A0F1F] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                    <UserPlus className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">Adicionar Aluno</h2>
                    <p className="text-xs text-white/50">Preencha os dados do novo aluno</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="text-white/60 transition hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="mb-2 block text-white/90">Nome</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-white/90">E-mail</label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    placeholder="Ex: joao.silva@example.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-white/90">CPF</label>
                  <input
                    type="text"
                    value={newStudentCPF}
                    onChange={(e) => setNewStudentCPF(e.target.value)}
                    placeholder="Ex: 123.456.789-00"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
                >
                  <Plus size={18} />
                  Adicionar Aluno
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

// Componentes de Seção

function SidebarButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
        active
          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
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
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-white">Dashboard</h1>
        <p className="text-white/60">Visão geral do Bootcamp FLAME</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="text-orange-400" size={24} />}
          title="Total de Alunos"
          value={totalStudents.toString()}
          subtitle="Cadastrados no bootcamp"
        />
        <StatCard
          icon={<TrendingUp className="text-green-400" size={24} />}
          title="Progresso Médio"
          value={`${avgProgress}%`}
          subtitle="Conclusão média da trilha"
        />
        <StatCard
          icon={<Activity className="text-blue-400" size={24} />}
          title="Ativos Hoje"
          value={activeToday.toString()}
          subtitle={totalStudents > 0 ? `${Math.round((activeToday / totalStudents) * 100)}% dos alunos` : "0% dos alunos"}
        />
        <StatCard
          icon={<Award className="text-purple-400" size={24} />}
          title="Streak Médio"
          value={`${avgStreak} dias`}
          subtitle="Dias consecutivos"
        />
      </div>

      {/* Cards Secundários */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<CheckCircle className="text-green-400" size={24} />}
          title="Acessos Ativos"
          value={activeStudents.toString()}
          subtitle={`${totalStudents - activeStudents} bloqueados`}
        />
        <StatCard
          icon={<Video className="text-orange-400" size={24} />}
          title="Total de Vídeos"
          value={totalVideos.toString()}
          subtitle={`${publishedVideos} publicados`}
        />
        <StatCard
          icon={<MessageSquare className="text-blue-400" size={24} />}
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
        <div>
          <h1 className="mb-2 font-bold text-white">Gerenciar Alunos</h1>
          <p className="text-white/60">Lista completa de alunos cadastrados</p>
        </div>
        <button 
          onClick={onAddStudent}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
        >
          <Plus size={18} />
          Adicionar Aluno
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#F5F1E8]/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-3 text-left text-white/70">Aluno</th>
                <th className="px-6 py-3 text-left text-white/70">Progresso</th>
                <th className="px-6 py-3 text-left text-white/70">Fase</th>
                <th className="px-6 py-3 text-left text-white/70">Streak</th>
                <th className="px-6 py-3 text-left text-white/70">Último Acesso</th>
                <th className="px-6 py-3 text-left text-white/70">Status</th>
                <th className="px-6 py-3 text-left text-white/70">Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{student.name}</p>
                      <p className="text-xs text-white/50">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-orange-400">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
                      {student.phase}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-white">{student.streak}</span>
                      <span className="text-xs text-white/50">dias</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-white/60">
                      <Clock size={14} />
                      <span className="text-sm">{student.lastAccess}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.accessEnabled ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle size={16} />
                        Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <XCircle size={16} />
                        Bloqueado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
                        <Edit size={16} />
                      </button>
                      <button className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20">
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
        <h1 className="mb-2 font-bold text-white">Convites</h1>
        <p className="text-white/60">Lista de convites enviados</p>
      </div>

      <div className="space-y-4">
        {invites.map((invite) => (
          <motion.div
            key={invite.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                invite.status === "accepted" ? "bg-green-500/20" : "bg-red-500/20"
              }`}>
                {invite.status === "accepted" ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : (
                  <XCircle className="text-red-400" size={24} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{invite.name}</h3>
                <p className="text-sm text-white/60">{invite.email} • {invite.cpf}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">Status:</span>
              <span
                className={`text-sm ${
                  invite.status === "accepted"
                    ? "text-green-400"
                    : invite.status === "pending"
                    ? "text-yellow-400"
                    : "text-red-400"
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
          <h1 className="mb-2 font-bold text-white">Gerenciar Vídeos & Aulas</h1>
          <p className="text-white/60">Administre o conteúdo do YouTube</p>
        </div>
        <button
          onClick={onAddVideo}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
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
            className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                    {video.module}
                  </span>
                  {video.isPublished ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                      <CheckCircle size={12} />
                      Publicado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                      <Clock size={12} />
                      Rascunho
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-white">{video.title}</h3>
                <div className="mb-3 flex items-center gap-4 text-white/60">
                  <div className="flex items-center gap-1">
                    <Play size={14} />
                    <span className="text-sm">{video.duration}</span>
                  </div>
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-orange-400 hover:underline">
                    <Eye size={14} />
                    Ver no YouTube
                  </a>
                </div>
                <p className="text-sm text-white/40">{video.youtubeUrl}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTogglePublish(video.id)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    video.isPublished
                      ? "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                      : "border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  }`}
                >
                  {video.isPublished ? "Despublicar" : "Publicar"}
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white">
                  <Edit size={18} />
                </button>
                <button className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20">
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
          <h1 className="mb-2 font-bold text-white">Mensagens</h1>
          <p className="text-white/60">Comunique-se com os alunos</p>
        </div>
        <button
          onClick={onSendMessage}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
        >
          <Send size={18} />
          Nova Mensagem
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
        {messages.length === 0 ? (
          <div className="py-12 text-center text-white/40">
            <MessageSquare className="mx-auto mb-3" size={48} />
            <p>Nenhuma mensagem enviada ainda</p>
            <button
              onClick={onSendMessage}
              className="mt-4 text-orange-400 hover:underline"
            >
              Enviar primeira mensagem
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-semibold text-white">{msg.title}</h3>
                  <span className="text-xs text-white/40">{msg.createdAt}</span>
                </div>
                <p className="mb-2 text-white/70">{msg.content}</p>
                {msg.link && (
                  <a href={msg.link} className="text-sm text-orange-400 hover:underline">
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

function SettingsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-white">Configurações</h1>
        <p className="text-white/60">Configure a plataforma</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Configurações Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-white/90">Nome do Bootcamp</label>
              <input
                type="text"
                defaultValue="Bootcamp FLAME"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="mb-2 block text-white/90">Canal do YouTube</label>
              <input
                type="text"
                defaultValue="@Rodrigomuinhosdev"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Credenciais de Administrador</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-white/90">E-mail Admin</label>
              <input
                type="email"
                defaultValue="admin@flame.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50"
              />
            </div>
            <div>
              <label className="mb-2 block text-white/90">Alterar Senha</label>
              <input
                type="password"
                placeholder="Nova senha"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40">
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
        <h1 className="mb-2 font-bold text-white">Manutenção da Plataforma</h1>
        <p className="text-white/60">Ferramentas de administração e backup</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Backup e Restauração</h3>
          <div className="space-y-3">
            <button
              onClick={onExportData}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10 cursor-pointer"
            >
              <Upload size={18} />
              Restaurar Backup
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-6">
          <h3 className="mb-4 font-semibold text-white">Limpeza de Dados</h3>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
              Limpar Cache do Sistema
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-3 font-medium text-red-400 transition hover:bg-red-500/20">
              <Trash2 size={18} />
              Limpar Mensagens Antigas
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-6">
          <h3 className="mb-2 font-semibold text-orange-400">⚠️ Zona de Perigo</h3>
          <p className="mb-4 text-sm text-white/70">Ações irreversíveis que afetam toda a plataforma</p>
          <button className="w-full rounded-lg border border-red-500/50 bg-red-500/20 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500/30">
            Resetar Todos os Dados
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#F5F1E8]/5 to-transparent p-6">
      <div className="mb-3">{icon}</div>
      <h3 className="mb-1 text-white/60">{title}</h3>
      <p className="mb-1 font-bold text-white">{value}</p>
      <p className="text-xs text-white/40">{subtitle}</p>
    </div>
  );
}