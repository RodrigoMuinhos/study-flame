"use client";

import { useState, useEffect } from "react";
import * as React from "react";
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
  Bell,
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
import { useToast } from "./ui/toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

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
  moduleNumber: number;
  lessonNumber: number;
  durationMinutes?: number;
  xpReward?: number;
  pageLocation?: string;
  orderIndex?: number;
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

type AdminSection = "dashboard" | "students" | "invites" | "videos" | "awsquest" | "access" | "awstoken" | "messages" | "settings" | "maintenance";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Para mobile
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

  // Carregar vídeos da API
  useEffect(() => {
    const carregarVideos = async () => {
      try {
        setVideosLoading(true);
        const response = await fetch(`${API_BASE_URL}/videos`);
        if (response.ok) {
          const data = await response.json();
          // Converter formato da API para o formato do componente
          const videosFormatados = data.map((v: any) => ({
            id: v.id,
            module: `Módulo ${v.moduleNumber} • Aula ${v.lessonNumber}`,
            title: v.title,
            youtubeUrl: v.youtubeUrl,
            duration: `${v.durationMinutes} min`,
            durationMinutes: v.durationMinutes,
            xpReward: typeof v.xpReward === "number" ? v.xpReward : 0,
            isPublished: v.isPublished,
            moduleNumber: v.moduleNumber,
            lessonNumber: v.lessonNumber,
            pageLocation: v.pageLocation,
            orderIndex: v.orderIndex
          }));
          setVideos(videosFormatados);
        }
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
      } finally {
        setVideosLoading(false);
      }
    };
    carregarVideos();
  }, []);

  type AdminStudentApi = {
    id?: string;
    name?: string;
    email?: string;
    cpf?: string;
    progress?: number;
    phase?: string;
    streak?: number;
    xp?: number;
    modulesCompleted?: number;
    lastAccess?: string;
  };

  const toStableNumberId = (id?: string, fallbackSeed?: string): number => {
    const raw = (id ?? fallbackSeed ?? "").replace(/-/g, "");
    const hex = raw.slice(0, 8);
    const n = parseInt(hex, 16);
    if (Number.isFinite(n)) return n;
    return Date.now();
  };

  const formatLastAccess = (iso?: string): string => {
    if (!iso) return "Nunca";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "Nunca";

    const diffMs = Date.now() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "0 min atrás";
    if (diffMin < 60) return `${diffMin} min atrás`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} hora${diffHours === 1 ? "" : "s"} atrás`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} dia${diffDays === 1 ? "" : "s"} atrás`;
  };

  // Integrar com backend: carregar alunos com métricas reais
  useEffect(() => {
    const carregarAlunos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/students`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: AdminStudentApi[] = await res.json();

        const alunosConvertidos: Student[] = (Array.isArray(data) ? data : []).map((s) => ({
          id: toStableNumberId(s.id, s.cpf),
          name: s.name ?? "",
          email: s.email ?? "",
          cpf: s.cpf ?? "",
          progress: Number(s.progress ?? 0),
          phase: s.phase ?? "Início",
          streak: Number(s.streak ?? 0),
          lastAccess: formatLastAccess(s.lastAccess),
          modulesCompleted: Number(s.modulesCompleted ?? 0),
          accessEnabled: true,
        }));

        setStudents(alunosConvertidos);
      } catch (e) {
        console.error("Falha ao carregar alunos do backend", e);
      }
    };

    carregarAlunos();
  }, []);

  useEffect(() => {
    const carregarAwsStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/aws-questions/stats`);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          const counts: Record<string, number> = {};
          let total = 0;
          data.forEach((item: any) => {
            if (!item?.theme) return;
            const qty = Number(item.questionCount || 0);
            counts[item.theme] = qty;
            total += qty;
          });
          setAwsQuestionStats({ byTheme: counts, total });
        }
      } catch (e) {
        console.error("Falha ao carregar stats AWS Quest", e);
      }
    };

    carregarAwsStats();
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
  const [newVideoXpReward, setNewVideoXpReward] = useState("0");
  const [newVideoPage, setNewVideoPage] = useState("aulas");
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);

  // Dados simulados de alunos
  const [students, setStudents] = useState<Student[]>([]);

  const [videos, setVideos] = useState<VideoLesson[]>([]);

  const [invites, setInvites] = useState<Invite[]>([]);

  const [awsQuestionStats, setAwsQuestionStats] = useState<{ byTheme: Record<string, number>; total: number }>({ byTheme: {}, total: 0 });
  const [awsImportError, setAwsImportError] = useState<string | null>(null);
  const [awsLastImportName, setAwsLastImportName] = useState<string>("");
  const [awsImportLoading, setAwsImportLoading] = useState<boolean>(false);
  const [videosLoading, setVideosLoading] = useState<boolean>(false);

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

  const toggleVideoPublish = async (videoId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const updated = await response.json();
        setVideos(videos.map(v =>
          v.id === videoId ? { ...v, isPublished: updated.isPublished } : v
        ));
      } else {
        console.error('Erro ao publicar vídeo');
      }
    } catch (error) {
      console.error('Erro ao publicar vídeo:', error);
    }
  };

  const notifyVideoPublished = async (videoId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}/notify`, {
        method: 'POST'
      });

      if (response.ok || response.status === 204) {
        addToast({
          title: "Notificação enviada",
          description: "Os alunos serão avisados na campainha.",
          type: "success"
        });
      } else if (response.status === 400) {
        addToast({
          title: "Não foi possível notificar",
          description: "Publique o vídeo antes de notificar os alunos.",
          type: "warning"
        });
      } else {
        addToast({
          title: "Erro ao notificar",
          description: "Tente novamente em instantes.",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Erro ao notificar vídeo:', error);
      addToast({
        title: "Erro ao notificar",
        description: "Tente novamente em instantes.",
        type: "error"
      });
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (!confirm('Tem certeza que deseja deletar este vídeo?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
        method: 'DELETE'
      });
      
      if (response.ok || response.status === 204) {
        setVideos(videos.filter(v => v.id !== videoId));
      } else {
        alert('Erro ao deletar vídeo');
      }
    } catch (error) {
      console.error('Erro ao deletar vídeo:', error);
      alert('Erro ao deletar vídeo');
    }
  };

  const resetVideoForm = () => {
    setNewVideoModule("0");
    setNewVideoNumber("1");
    setNewVideoTitle("");
    setNewVideoUrl("");
    setNewVideoDuration("");
    setNewVideoXpReward("0");
    setNewVideoPage("aulas");
    setEditingVideoId(null);
  };

  const openAddVideoModal = () => {
    resetVideoForm();
    setShowVideoModal(true);
  };

  const openEditVideoModal = (video: VideoLesson) => {
    setEditingVideoId(video.id);

    const inferredPage =
      video.pageLocation || (video.moduleNumber === 0 && video.lessonNumber === 0 ? "inicio" : "aulas");

    setNewVideoPage(inferredPage);
    setNewVideoModule(String(video.moduleNumber ?? 0));
    setNewVideoNumber(String(video.lessonNumber ?? 1));
    setNewVideoTitle(video.title || "");
    setNewVideoUrl(video.youtubeUrl || "");

    const xpReward = typeof video.xpReward === "number" ? video.xpReward : 0;
    setNewVideoXpReward(String(xpReward));

    const durationMinutes =
      typeof video.durationMinutes === "number"
        ? video.durationMinutes
        : Number.parseInt(video.duration || "", 10);
    setNewVideoDuration(Number.isFinite(durationMinutes) ? String(durationMinutes) : "");

    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    resetVideoForm();
  };

  const handleAddVideo = async () => {
    if (newVideoTitle && newVideoUrl && newVideoDuration) {
      try {
        const xpReward = Number.parseInt(newVideoXpReward || "0", 10);
        const videoData = {
          moduleNumber: newVideoPage === "inicio" ? 0 : parseInt(newVideoModule),
          lessonNumber: newVideoPage === "inicio" ? 0 : parseInt(newVideoNumber),
          title: newVideoTitle,
          description: '',
          youtubeUrl: newVideoUrl,
          durationMinutes: parseInt(newVideoDuration),
          xpReward: Number.isFinite(xpReward) ? xpReward : 0,
          orderIndex: newVideoPage === "inicio" ? 0 : parseInt(newVideoNumber),
          isPublished: false,
          pageLocation: newVideoPage
        };
        
        const response = await fetch(`${API_BASE_URL}/videos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(videoData)
        });
        
        if (response.ok) {
          const created = await response.json();
          const newVideo: VideoLesson = {
            id: created.id,
            module: `Módulo ${created.moduleNumber} • Aula ${created.lessonNumber}`,
            title: created.title,
            youtubeUrl: created.youtubeUrl,
            duration: `${created.durationMinutes} min`,
            durationMinutes: created.durationMinutes,
            xpReward: typeof created.xpReward === "number" ? created.xpReward : 0,
            isPublished: created.isPublished,
            moduleNumber: created.moduleNumber,
            lessonNumber: created.lessonNumber,
            pageLocation: created.pageLocation,
            orderIndex: created.orderIndex
          };
          setVideos([...videos, newVideo]);
        } else {
          const error = await response.text();
          console.error('Erro ao criar vídeo:', error);
          alert('Erro ao criar vídeo. Verifique se já existe um vídeo para este módulo/aula.');
          return;
        }
      } catch (error) {
        console.error('Erro ao criar vídeo:', error);
        alert('Erro ao criar vídeo');
        return;
      }

      closeVideoModal();
    }
  };

  const handleUpdateVideo = async () => {
    if (editingVideoId === null) return;
    if (!newVideoTitle || !newVideoUrl || !newVideoDuration) return;

    const existing = videos.find((v) => v.id === editingVideoId);
    const existingIsPublished = existing?.isPublished ?? false;

    try {
      const xpReward = Number.parseInt(newVideoXpReward || "0", 10);
      const videoData = {
        moduleNumber: newVideoPage === "inicio" ? 0 : parseInt(newVideoModule),
        lessonNumber: newVideoPage === "inicio" ? 0 : parseInt(newVideoNumber),
        title: newVideoTitle,
        description: '',
        youtubeUrl: newVideoUrl,
        durationMinutes: parseInt(newVideoDuration),
        xpReward: Number.isFinite(xpReward) ? xpReward : 0,
        orderIndex: newVideoPage === "inicio" ? 0 : parseInt(newVideoNumber),
        isPublished: existingIsPublished,
        pageLocation: newVideoPage
      };

      const response = await fetch(`${API_BASE_URL}/videos/${editingVideoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro ao atualizar vídeo:', errorText);
        alert('Erro ao atualizar vídeo. Verifique se já existe um vídeo para este módulo/aula.');
        return;
      }

      const updated = await response.json();
      setVideos((prev) =>
        prev.map((v) =>
          v.id === updated.id
            ? {
                ...v,
                module: `Módulo ${updated.moduleNumber} • Aula ${updated.lessonNumber}`,
                title: updated.title,
                youtubeUrl: updated.youtubeUrl,
                duration: `${updated.durationMinutes} min`,
                durationMinutes: updated.durationMinutes,
                xpReward: typeof updated.xpReward === "number" ? updated.xpReward : 0,
                isPublished: updated.isPublished,
                moduleNumber: updated.moduleNumber,
                lessonNumber: updated.lessonNumber,
                pageLocation: updated.pageLocation,
                orderIndex: updated.orderIndex
              }
            : v
        )
      );

      closeVideoModal();
    } catch (error) {
      console.error('Erro ao atualizar vídeo:', error);
      alert('Erro ao atualizar vídeo');
    }
  };

  const handleSaveVideo = async () => {
    if (editingVideoId !== null) {
      await handleUpdateVideo();
    } else {
      await handleAddVideo();
    }
  };

  const normalizeAwsImport = (parsed: any) => {
    const counts: Record<string, number> = {};
    const themesPayload: Array<{ theme: string; questions: any; questionCount: number }> = [];
    let total = 0;

    const addTheme = (theme: string, questions: any) => {
      const safeTheme = theme && theme.trim() ? theme.trim() : "Sem tema";
      let questionCount = 0;
      if (Array.isArray(questions)) {
        questionCount = questions.length;
      } else if (questions && typeof questions === "object" && Array.isArray((questions as any).questions)) {
        questionCount = (questions as any).questions.length;
        questions = (questions as any).questions;
      } else if (questions) {
        questionCount = 1;
        questions = [questions];
      }

      if (questionCount === 0) return;

      counts[safeTheme] = (counts[safeTheme] || 0) + questionCount;
      total += questionCount;
      themesPayload.push({ theme: safeTheme, questions, questionCount });
    };

    if (Array.isArray(parsed)) {
      parsed.forEach((item: any) => {
        if (!item) return;
        const theme = item.theme || item.assunto || item.categoria;
        const questions = item.questions || item.perguntas || item.items || item.questoes || [];
        addTheme(theme, questions);
      });
    } else if (parsed && typeof parsed === "object") {
      Object.entries(parsed as Record<string, any>).forEach(([theme, value]) => {
        if (Array.isArray(value)) {
          addTheme(theme, value);
        } else {
          addTheme(theme, (value as any).questions || value);
        }
      });
    }

    return { counts, total, themesPayload };
  };

  const handleAwsQuestionImport = async (file: File) => {
    try {
      setAwsImportError(null);
      setAwsImportLoading(true);
      const text = await file.text();
      const parsed = JSON.parse(text);

      const { counts, total, themesPayload } = normalizeAwsImport(parsed);

      if (total === 0 || themesPayload.length === 0) {
        throw new Error("Nenhuma questão encontrada no arquivo.");
      }

      setAwsQuestionStats({ byTheme: counts, total });
      setAwsLastImportName(file.name);

      try {
        const res = await fetch(`${API_BASE_URL}/aws-questions/import`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ themes: themesPayload }),
        });

        if (!res.ok) {
          const textError = await res.text();
          throw new Error(textError || `Erro ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          const apiCounts: Record<string, number> = {};
          let apiTotal = 0;
          data.forEach((item: any) => {
            if (!item?.theme) return;
            const qty = Number(item.questionCount || 0);
            apiCounts[item.theme] = qty;
            apiTotal += qty;
          });
          if (apiTotal > 0) {
            setAwsQuestionStats({ byTheme: apiCounts, total: apiTotal });
          }
        }
      } catch (err: any) {
        console.error("Falha ao salvar no backend", err);
        setAwsImportError(err?.message || "Erro ao salvar no backend");
      }
    } catch (error: any) {
      console.error("Falha ao importar banco AWS Quest", error);
      setAwsImportError(error?.message || "Erro ao ler o JSON");
    } finally {
      setAwsImportLoading(false);
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

  // Função para navegar e fechar sidebar mobile
  const handleNavigation = (section: AdminSection) => {
    setCurrentSection(section);
    setSidebarOpen(false); // Fechar sidebar no mobile
  };

  // Conteúdo do menu (reutilizado em desktop e mobile)
  const MenuContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      <SidebarButton icon={<Home size={20} />} label="Dashboard" active={currentSection === "dashboard"} onClick={() => handleNavigation("dashboard")} collapsed={collapsed} />
      <SidebarButton icon={<Users size={20} />} label="Alunos" active={currentSection === "students"} onClick={() => handleNavigation("students")} collapsed={collapsed} />
      <SidebarButton icon={<UserPlus size={20} />} label="Convites" active={currentSection === "invites"} onClick={() => handleNavigation("invites")} collapsed={collapsed} />
      <SidebarButton icon={<Video size={20} />} label="Vídeos & Aulas" active={currentSection === "videos"} onClick={() => handleNavigation("videos")} collapsed={collapsed} />
      <SidebarButton icon={<MessageSquare size={20} />} label="Mensagens" active={currentSection === "messages"} onClick={() => handleNavigation("messages")} collapsed={collapsed} />
      <SidebarButton icon={<Lock size={20} />} label="Controle de Acesso" active={currentSection === "access"} onClick={() => handleNavigation("access")} collapsed={collapsed} />
      <SidebarButton icon={<Cloud size={20} />} label="Token AWS Study" active={currentSection === "awstoken"} onClick={() => handleNavigation("awstoken")} collapsed={collapsed} />
      <SidebarButton icon={<Settings size={20} />} label="Configurações" active={currentSection === "settings"} onClick={() => handleNavigation("settings")} collapsed={collapsed} />
      <SidebarButton icon={<Wrench size={20} />} label="Manutenção" active={currentSection === "maintenance"} onClick={() => handleNavigation("maintenance")} collapsed={collapsed} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm p-3 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-foreground text-sm">Boot Camp FLAME</h1>
        <button
          onClick={onLogout}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          title="Sair"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
            />
            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 border-r border-border bg-background md:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Logo Mobile */}
                <div className="border-b border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <svg width="24" height="24" viewBox="0 0 180 180" fill="none">
                          <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="white" />
                        </svg>
                      </div>
                      <div>
                        <h1 className="font-bold text-foreground text-sm">Boot Camp FLAME</h1>
                        <p className="text-xs text-muted-foreground/70">Admin</p>
                      </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Menu Mobile */}
                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                  <MenuContent collapsed={false} />
                </nav>

                {/* Logout Mobile */}
                <div className="border-t border-border p-4">
                  <button
                    onClick={() => { setSidebarOpen(false); onLogout(); }}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-foreground/70 transition hover:bg-muted hover:text-foreground"
                  >
                    <LogOut size={20} />
                    <span>Sair do Painel</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 288 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block border-r border-border bg-background/70 backdrop-blur-sm flex-shrink-0 overflow-hidden"
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

          {/* Menu Desktop */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            <MenuContent collapsed={sidebarCollapsed} />
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
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
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
              onNotifyVideo={notifyVideoPublished}
              onDeleteVideo={handleDeleteVideo}
              onAddVideo={openAddVideoModal}
              onEditVideo={openEditVideoModal}
            />
          )}

          {/* AWS-Quest section removida - agora usamos banco de dados via API */}
          {/* {currentSection === "awsquest" && (
            <AwsQuestSection
              key="awsquest"
              questionStats={awsQuestionStats}
              importError={awsImportError}
              lastImportName={awsLastImportName}
              importLoading={awsImportLoading}
              onImportQuestions={handleAwsQuestionImport}
            />
          )} */}

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
            onClick={closeVideoModal}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-4 z-50 m-auto flex h-fit max-h-[90vh] w-full max-w-2xl items-center justify-center"
          >
            <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Video className="text-primary" size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">
                      {editingVideoId !== null ? 'Editar Vídeo/Aula' : 'Adicionar Vídeo/Aula'}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {editingVideoId !== null ? 'Atualize os dados desta aula' : 'Configure a nova aula do bootcamp'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeVideoModal}
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
                    className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
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

                {/* Só mostra Módulo e Aula se NÃO for página "Início" */}
                {newVideoPage !== "inicio" && (
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-foreground">Módulo</label>
                      <select
                        value={newVideoModule}
                        onChange={(e) => setNewVideoModule(e.target.value)}
                        className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
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
                        className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-foreground">Título da Aula</label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Ex: Bem-vindo ao Jogo Real"
                    className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-foreground">URL do YouTube</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... ou https://youtu.be/..."
                    className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
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
                    className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-foreground">XP por Conclusão</label>
                  <input
                    type="number"
                    min="0"
                    value={newVideoXpReward}
                    onChange={(e) => setNewVideoXpReward(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-xl border border-primary/30 bg-input px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    XP concedido quando o aluno concluir esta aula
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeVideoModal}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-input bg-background px-6 py-3 font-semibold text-foreground transition hover:bg-accent"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveVideo}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                  >
                    {editingVideoId !== null ? <Edit size={18} /> : <Plus size={18} />}
                    {editingVideoId !== null ? 'Salvar alterações' : 'Adicionar Vídeo'}
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex items-start justify-between">
        <div>
        <h1 className="mb-1 md:mb-2 text-xl md:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">Visão geral do Bootcamp FLAME</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="mb-6 md:mb-8 grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-4">
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
      <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3">
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
            <Users size={20} className="text-primary md:hidden" />
            <Users size={24} className="text-primary hidden md:block" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Gerenciar Alunos</h1>
            <p className="text-sm text-muted-foreground">Lista completa de alunos cadastrados</p>
          </div>
        </div>
        <button 
          onClick={onAddStudent}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus size={18} />
          Adicionar Aluno
        </button>
      </div>

      {/* Mobile: Cards view */}
      <div className="md:hidden space-y-3">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{student.name}</p>
                <p className="text-xs text-muted-foreground truncate">{student.email}</p>
              </div>
              {student.accessEnabled ? (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                  <CheckCircle size={12} />
                  Ativo
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
                  <XCircle size={12} />
                  Bloqueado
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${student.progress}%` }} />
              </div>
              <span className="text-xs font-medium text-primary">{student.progress}%</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2 py-1 text-primary font-medium">{student.phase}</span>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {student.lastAccess}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Table view */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
          <UserPlus size={20} className="text-primary md:hidden" />
          <UserPlus size={24} className="text-primary hidden md:block" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Convites</h1>
          <p className="text-sm text-muted-foreground">Lista de convites enviados</p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {invites.map((invite) => (
          <motion.div
            key={invite.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full shrink-0 ${
                invite.status === "accepted" ? "bg-green-500/20" : "bg-red-500/20"
              }`}>
                {invite.status === "accepted" ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-foreground truncate">{invite.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground truncate">{invite.email}</p>
                <p className="text-xs text-muted-foreground md:hidden">{invite.cpf}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 border-t border-border sm:border-0 pt-2 sm:pt-0">
              <span className="text-[10px] md:text-xs text-muted-foreground">Status:</span>
              <span
                className={`text-xs md:text-sm font-medium px-2 py-0.5 rounded-full ${
                  invite.status === "accepted"
                    ? "text-green-600 bg-green-500/10"
                    : invite.status === "pending"
                    ? "text-yellow-600 bg-yellow-500/10"
                    : "text-red-500 bg-red-500/10"
                }`}
              >
                {invite.status === "accepted" ? "Aceito" : invite.status === "pending" ? "Pendente" : "Expirado"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function VideosSection({ videos, onTogglePublish, onNotifyVideo, onDeleteVideo, onAddVideo, onEditVideo }: { 
  videos: VideoLesson[]; 
  onTogglePublish: (id: number) => void; 
  onNotifyVideo: (id: number) => void;
  onDeleteVideo: (id: number) => void;
  onAddVideo: () => void;
  onEditVideo: (video: VideoLesson) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
            <Video size={20} className="text-primary md:hidden" />
            <Video size={24} className="text-primary hidden md:block" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Gerenciar Vídeos</h1>
            <p className="text-sm text-muted-foreground">Administre o conteúdo do YouTube</p>
          </div>
        </div>
        <button
          onClick={onAddVideo}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus size={18} />
          Adicionar Vídeo
        </button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium text-primary">
                    {video.module}
                  </span>
                  {video.isPublished ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium text-green-600">
                      <CheckCircle size={10} className="md:hidden" />
                      <CheckCircle size={12} className="hidden md:block" />
                      Publicado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium text-yellow-600">
                      <Clock size={10} className="md:hidden" />
                      <Clock size={12} className="hidden md:block" />
                      Rascunho
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-sm md:text-base font-semibold text-foreground truncate">{video.title}</h3>
                <div className="mb-2 md:mb-3 flex flex-wrap items-center gap-3 md:gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Play size={12} className="md:hidden" />
                    <Play size={14} className="hidden md:block" />
                    <span className="text-xs md:text-sm">{video.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={12} className="md:hidden" />
                    <Award size={14} className="hidden md:block" />
                    <span className="text-xs md:text-sm">{video.xpReward ?? 0} XP</span>
                  </div>
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs md:text-sm text-primary hover:underline">
                    <Eye size={12} className="md:hidden" />
                    <Eye size={14} className="hidden md:block" />
                    Ver no YouTube
                  </a>
                </div>
                <p className="hidden md:block text-sm text-muted-foreground/70 truncate">{video.youtubeUrl}</p>
              </div>

              <div className="flex items-center gap-2 border-t border-border md:border-0 pt-3 md:pt-0">
                <button
                  onClick={() => onTogglePublish(video.id)}
                  className={`flex-1 md:flex-none rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition ${
                    video.isPublished
                      ? "border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                      : "border border-green-500/30 bg-green-500/10 text-green-600 hover:bg-green-500/20"
                  }`}
                >
                  {video.isPublished ? "Despublicar" : "Publicar"}
                </button>

                <button
                  onClick={() => onNotifyVideo(video.id)}
                  disabled={!video.isPublished}
                  className={`rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground ${
                    !video.isPublished ? 'opacity-40 cursor-not-allowed hover:bg-card hover:text-muted-foreground' : ''
                  }`}
                  title={video.isPublished ? 'Notificar alunos' : 'Publique o vídeo para notificar'}
                >
                  <Bell size={16} className="md:hidden" />
                  <Bell size={18} className="hidden md:block" />
                </button>

                <button
                  onClick={() => onEditVideo(video)}
                  className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  title="Editar vídeo"
                >
                  <Edit size={16} className="md:hidden" />
                  <Edit size={18} className="hidden md:block" />
                </button>
                <button 
                  onClick={() => onDeleteVideo(video.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-600 transition hover:bg-red-500/20"
                  title="Deletar vídeo"
                >
                  <Trash2 size={16} className="md:hidden" />
                  <Trash2 size={18} className="hidden md:block" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AwsQuestSection({ questionStats, importError, lastImportName, importLoading, onImportQuestions }: {
  questionStats: { byTheme: Record<string, number>; total: number };
  importError: string | null;
  lastImportName: string;
  importLoading: boolean;
  onImportQuestions: (file: File) => void;
}) {
  const [selectedTheme, setSelectedTheme] = React.useState("");
  const [subtopic, setSubtopic] = React.useState("");
  const [questionJson, setQuestionJson] = React.useState("");
  const [addError, setAddError] = React.useState<string | null>(null);
  const [adding, setAdding] = React.useState(false);

  const awsThemes = [
    "Edge & Acesso",
    "Frontend & Conteúdo",
    "Compute & Escala",
    "Rede & Segurança",
    "Identidade & Segurança",
    "Mensageria & Eventos",
    "Banco de Dados",
    "Observabilidade",
    "Arquitetura (Nível Prova)"
  ];

  const subtopicsByTheme: Record<string, string[]> = {
    "Edge & Acesso": ["Route 53", "CloudFront"],
    "Frontend & Conteúdo": ["S3 Static Website", "Amplify"],
    "Compute & Escala": ["EC2", "Lambda", "Auto Scaling", "Elastic Load Balancer (ALB/NLB)", "ECS", "EKS"],
    "Rede & Segurança": ["VPC", "Security Groups", "NACLs", "VPN", "Direct Connect", "Transit Gateway", "Subnets (Public/Private/Isolated)"],
    "Identidade & Segurança": ["IAM", "IAM Roles", "IAM Policies", "Cognito", "Secrets Manager", "KMS"],
    "Mensageria & Eventos": ["SQS", "SNS", "EventBridge", "Kinesis"],
    "Banco de Dados": ["RDS (Multi-AZ)", "Aurora", "DynamoDB", "ElastiCache", "Redshift"],
    "Observabilidade": ["CloudWatch", "CloudWatch Logs", "X-Ray", "CloudTrail"],
    "Arquitetura (Nível Prova)": ["Well-Architected Framework", "Multi-AZ", "High Availability", "Disaster Recovery", "Cost Optimization"]
  };

  const availableSubtopics = selectedTheme ? (subtopicsByTheme[selectedTheme] || []) : [];

  const handleAddQuestion = async () => {
    if (!selectedTheme || !questionJson.trim()) {
      setAddError("Selecione um tema e insira o JSON da questão.");
      return;
    }

    try {
      setAddError(null);
      setAdding(true);
      const parsed = JSON.parse(questionJson);
      const themeLabel = subtopic ? `${selectedTheme} > ${subtopic}` : selectedTheme;

      const payload = {
        themes: [
          {
            theme: themeLabel,
            questions: Array.isArray(parsed) ? parsed : [parsed],
            questionCount: Array.isArray(parsed) ? parsed.length : 1
          }
        ]
      };

      const res = await fetch(`${API_BASE_URL}/aws-questions/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Erro ${res.status}`);
      }

      setQuestionJson("");
      setSubtopic("");
      window.location.reload();
    } catch (err: any) {
      setAddError(err?.message || "Erro ao adicionar questão");
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 font-bold text-foreground">AWS-Quest</h1>
          <p className="text-muted-foreground">Acompanhe desafios e materiais da trilha AWS neste espaço dedicado.</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          Use este painel para organizar checkpoints, links e anotações do programa AWS Quest.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Award size={20} className="text-primary" />
            <span className="font-semibold text-foreground">Status geral</span>
          </div>
          <p className="text-sm text-muted-foreground">Anote conquistas, bloqueios ou metas semanais da jornada AWS.</p>
          <div className="mt-4 rounded-xl bg-muted/40 p-4 text-xs text-muted-foreground">
            Personalize este bloco com os próximos objetivos ou entregas esperadas.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            <span className="font-semibold text-foreground">Checkpoints</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Cadastre desafios ou quizzes semanais e marque o andamento.</li>
            <li>Liste links de laboratórios, repositórios ou formulários de entrega.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Cloud size={20} className="text-primary" />
            <span className="font-semibold text-foreground">Recursos AWS</span>
          </div>
          <p className="text-sm text-muted-foreground">Cole URLs úteis (console, docs, dashboards) para acesso rápido.</p>
          <div className="mt-3 rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground">
            Mantenha aqui o material de referência que os alunos precisam durante a missão.
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Adicionar Questões AWS SAA-C03</h3>
            <p className="text-sm text-muted-foreground">Selecione tema, subtema (opcional) e insira o JSON da questão estruturada.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Tema (Nível 1)</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Selecione o tema AWS...</option>
                {awsThemes.map((theme) => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Subtema / Serviço (Nível 2)</label>
              <select
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
                disabled={!selectedTheme}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Selecione o subtema/serviço...</option>
                {availableSubtopics.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">JSON da Questão (Nível 3+)</label>
              <p className="mb-2 text-xs text-muted-foreground">Inclua: question, options, answer, explanation, level, tags</p>
              <textarea
                value={questionJson}
                onChange={(e) => setQuestionJson(e.target.value)}
                placeholder={`{ "question": "Qual routing policy...", "options": ["A", "B", "C", "D"], "answer": "C", "explanation": "Latency routing direciona...", "level": 3, "tags": ["Route 53", "Routing Policy"] }`}
                rows={10}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              onClick={handleAddQuestion}
              disabled={adding || !selectedTheme || !questionJson.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={18} />
              {adding ? "Salvando..." : "Adicionar Questão"}
            </button>

            {addError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                {addError}
              </div>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">💡 Estrutura hierárquica AWS SAA-C03:</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>🟦 <strong>Nível 1:</strong> Tema oficial da prova (Edge & Acesso, Compute & Escala...)</li>
              <li>🟩 <strong>Nível 2:</strong> Subtema/Serviço (Route 53, Lambda, RDS...)</li>
              <li>🟨 <strong>Nível 3+:</strong> Sub-assuntos, regras, componentes (Routing Policy, Health Checks...)</li>
            </ul>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-muted-foreground">Ver exemplo de JSON (clique para expandir)</summary>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-background/80 p-3 text-left text-[11px] leading-tight text-foreground">{`{
  "question": "Qual routing policy do Route 53 direciona tráfego baseado em latência?",
  "options": ["Simple", "Weighted", "Latency", "Failover"],
  "answer": "Latency",
  "explanation": "Latency routing policy roteia para a região com menor latência.",
  "level": 3,
  "tags": ["Route 53", "Routing Policy", "Latency"]
}`}</pre>
          </details>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            <h4 className="font-semibold text-foreground">Contagem por tema</h4>
          </div>
          {questionStats.total === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum JSON importado ainda.</p>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm font-semibold text-foreground">
                <span>Total de questões</span>
                <span>{questionStats.total}</span>
              </div>
              <div className="max-h-64 space-y-2 overflow-y-auto pr-1 text-sm">
                {Object.entries(questionStats.byTheme).map(([theme, count]) => (
                  <div key={theme} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-2">
                    <span className="text-foreground">{theme}</span>
                    <span className="font-semibold text-primary">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare size={20} className="text-primary md:hidden" />
            <MessageSquare size={24} className="text-primary hidden md:block" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Mensagens</h1>
            <p className="text-sm text-muted-foreground">Comunique-se com os alunos</p>
          </div>
        </div>
        <button
          onClick={onSendMessage}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 w-full sm:w-auto"
        >
          <Send size={18} />
          Nova Mensagem
        </button>
      </div>

      <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
        {messages.length === 0 ? (
          <div className="py-8 md:py-12 text-center text-muted-foreground">
            <MessageSquare className="mx-auto mb-3" size={40} />
            <p className="text-sm md:text-base">Nenhuma mensagem enviada ainda</p>
            <button
              onClick={onSendMessage}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Enviar primeira mensagem
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-lg md:rounded-xl border border-border bg-muted/30 p-3 md:p-4">
                <div className="mb-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <h3 className="text-sm md:text-base font-semibold text-foreground">{msg.title}</h3>
                  <span className="text-[10px] md:text-xs text-muted-foreground">{msg.createdAt}</span>
                </div>
                <p className="mb-2 text-xs md:text-sm text-muted-foreground">{msg.content}</p>
                {msg.link && (
                  <a href={msg.link} className="text-xs md:text-sm text-primary hover:underline break-all">
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
          <Settings size={20} className="text-primary md:hidden" />
          <Settings size={24} className="text-primary hidden md:block" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-sm text-muted-foreground">Configure a plataforma</p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Aparência */}
        <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          <h3 className="mb-4 text-sm md:text-base font-semibold text-foreground flex items-center gap-2">
            <span className="text-xl md:text-2xl">🎨</span>
            Tema do Sistema
          </h3>
          
          {/* Grid de Temas - responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {temas.map((tema) => (
              <button
                key={tema.id}
                onClick={() => aplicarTema(tema.id)}
                className={`group relative overflow-hidden rounded-xl border-2 p-3 md:p-4 text-center transition-all hover:scale-105 ${
                  temaSelecionado === tema.id
                    ? 'border-primary shadow-lg shadow-primary/30 ring-2 ring-primary/20'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                {/* Mobile: Layout horizontal, Desktop: Layout vertical */}
                <div className="flex items-center gap-3 sm:flex-col sm:gap-0">
                  {/* Ícone */}
                  <div className="text-3xl sm:text-4xl sm:mb-2">{tema.icon}</div>
                  
                  <div className="flex-1 sm:flex-none text-left sm:text-center">
                    {/* Nome do tema */}
                    <p className="text-sm font-bold text-foreground sm:mb-1">{tema.nome}</p>
                    
                    {/* Paleta de cores */}
                    <div className="flex gap-1 mt-1 sm:mt-0 sm:justify-center sm:mb-2">
                      {tema.cores.map((cor, idx) => (
                        <div
                          key={idx}
                          className="h-4 w-4 sm:h-6 sm:w-6 rounded-full shadow-md ring-1 ring-black/10"
                          style={{ backgroundColor: cor }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Descrição - apenas desktop */}
                <p className="hidden sm:block text-[10px] leading-tight text-muted-foreground mt-2">{tema.descricao}</p>
                
                {/* Indicador ativo */}
                {temaSelecionado === tema.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-primary p-1 sm:p-1.5 shadow-lg">
                    <svg className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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

        <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          <h3 className="mb-4 text-sm md:text-base font-semibold text-foreground">Configurações Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-foreground">Nome do Bootcamp</label>
              <input
                type="text"
                defaultValue="Bootcamp FLAME"
                className="w-full rounded-lg md:rounded-xl border border-border bg-muted/30 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-foreground">Canal do YouTube</label>
              <input
                type="text"
                defaultValue="@Rodrigomuinhosdev"
                className="w-full rounded-lg md:rounded-xl border border-border bg-muted/30 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          <h3 className="mb-4 text-sm md:text-base font-semibold text-foreground">Credenciais de Administrador</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-foreground">E-mail Admin</label>
              <input
                type="email"
                placeholder="Digite o email do admin"
                className="w-full rounded-lg md:rounded-xl border border-border bg-muted/30 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-foreground">Alterar Senha</label>
              <input
                type="password"
                placeholder="Nova senha"
                className="w-full rounded-lg md:rounded-xl border border-border bg-muted/30 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-foreground placeholder-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <button className="w-full rounded-lg md:rounded-xl bg-primary px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90">
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
      className="p-4 md:p-8"
    >
      <div className="mb-6 md:mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10">
          <Wrench size={20} className="text-primary md:hidden" />
          <Wrench size={24} className="text-primary hidden md:block" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Manutenção</h1>
          <p className="text-sm text-muted-foreground">Ferramentas de backup e admin</p>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          <h3 className="mb-4 text-sm md:text-base font-semibold text-foreground">Backup e Restauração</h3>
          <div className="space-y-3">
            <button
              onClick={onExportData}
              className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl border border-border bg-muted/30 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium text-foreground transition hover:bg-muted"
            >
              <Upload size={16} className="md:hidden" />
              <Upload size={18} className="hidden md:block" />
              Fazer Backup
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
              className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl border border-border bg-muted/30 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium text-foreground transition hover:bg-muted cursor-pointer"
            >
              <Upload size={16} className="md:hidden" />
              <Upload size={18} className="hidden md:block" />
              Restaurar Backup
            </label>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
          <h3 className="mb-4 text-sm md:text-base font-semibold text-foreground">Limpeza de Dados</h3>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl border border-border bg-muted/30 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium text-foreground transition hover:bg-muted">
              Limpar Cache
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg md:rounded-xl border border-red-500/30 bg-red-500/10 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium text-red-500 transition hover:bg-red-500/20">
              <Trash2 size={16} className="md:hidden" />
              <Trash2 size={18} className="hidden md:block" />
              Limpar Mensagens
            </button>
          </div>
        </div>

        <div className="rounded-xl md:rounded-2xl border border-primary/30 bg-primary/10 p-4 md:p-6 shadow-sm">
          <h3 className="mb-2 text-sm md:text-base font-semibold text-primary">⚠️ Zona de Perigo</h3>
          <p className="mb-4 text-xs md:text-sm text-muted-foreground">Ações irreversíveis que afetam toda a plataforma</p>
          <button className="w-full rounded-lg md:rounded-xl border border-red-500/50 bg-red-500/20 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-semibold text-red-500 transition hover:bg-red-500/30">
            Resetar Todos os Dados
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl md:rounded-2xl border border-border bg-card p-3 md:p-6 shadow-sm">
      <div className="mb-2 md:mb-3">{icon}</div>
      <h3 className="mb-0.5 md:mb-1 text-xs md:text-sm text-muted-foreground">{title}</h3>
      <p className="mb-0.5 md:mb-1 text-lg md:text-2xl font-bold text-foreground">{value}</p>
      <p className="text-[10px] md:text-xs text-muted-foreground truncate">{subtitle}</p>
    </div>
  );
}
