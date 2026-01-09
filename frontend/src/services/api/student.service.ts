/**
 * Student Service
 * Endpoints exclusivos do painel do aluno
 * 
 * Funcionalidades:
 * - Perfil do Aluno
 * - Progresso de Estudos
 * - Aulas e Módulos
 * - Gamificação (XP, Badges, Níveis)
 * - Notificações
 */

import { apiClient } from './config';

// =====================
// Types - Student (Alias for backward compatibility)
// =====================

export interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  avatarUrl?: string;
  role?: 'STUDENT';
}

// =====================
// Types - Profile
// =====================

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

// =====================
// Types - Progress
// =====================

export interface StudyProgress {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  overallProgress: number; // 0-100
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: string;
}

export interface ModuleProgress {
  moduleId: number;
  moduleName: string;
  totalLessons: number;
  completedLessons: number;
  progress: number; // 0-100
  isCompleted: boolean;
}

export interface LessonStatus {
  lessonId: number;
  isCompleted: boolean;
  completedAt?: string;
  watchTime?: number; // em segundos
}

// =====================
// Types - Lessons & Modules
// =====================

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  totalLessons: number;
  isPublished: boolean;
  thumbnailUrl?: string;
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // em minutos
  order: number;
  isPublished: boolean;
}

// =====================
// Types - Gamification
// =====================

export interface GamificationData {
  level: LevelInfo;
  badges: Badge[];
  stats: GamificationStats;
}

export interface LevelInfo {
  current: number;
  xp: number;
  xpToNext: number;
  xpCurrentLevelMin?: number;
  xpCurrentLevelMax?: number;
  title: string;
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}

export interface GamificationStats {
  totalBadges: number;
  unlockedBadges: number;
  totalXp: number;
  streakDays: number;
  lessonsCompleted: number;
  studyHours: number;
}

// =====================
// Types - Notifications
// =====================

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ACHIEVEMENT';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// =====================
// Profile Service
// =====================

export const studentProfileService = {
  /**
   * Obter perfil do aluno
   */
  getProfile: async (): Promise<StudentProfile> => {
    const response = await apiClient.get<StudentProfile>('/students/me/profile');
    return response.data;
  },

  /**
   * Atualizar perfil
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<StudentProfile> => {
    const response = await apiClient.put<StudentProfile>('/students/me/profile', data);
    return response.data;
  },

  /**
   * Alterar senha
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/students/me/change-password', { currentPassword, newPassword });
  },
};

// =====================
// Progress Service
// =====================

export const progressService = {
  /**
   * Obter progresso geral
   */
  getOverallProgress: async (): Promise<StudyProgress> => {
    const response = await apiClient.get<StudyProgress>('/students/me/progress');
    return response.data;
  },

  /**
   * Obter progresso por módulo
   */
  getModuleProgress: async (): Promise<ModuleProgress[]> => {
    const response = await apiClient.get<ModuleProgress[]>('/students/me/progress/modules');
    return response.data;
  },

  /**
   * Marcar aula como concluída
   */
  markLessonComplete: async (lessonId: number): Promise<LessonStatus> => {
    const response = await apiClient.post<LessonStatus>(`/students/me/lessons/${lessonId}/complete`);
    return response.data;
  },

  /**
   * Atualizar tempo de visualização
   */
  updateWatchTime: async (lessonId: number, watchTime: number): Promise<void> => {
    await apiClient.post(`/students/me/lessons/${lessonId}/watch-time`, { watchTime });
  },

  /**
   * Obter status das aulas
   */
  getLessonsStatus: async (): Promise<LessonStatus[]> => {
    const response = await apiClient.get<LessonStatus[]>('/students/me/lessons/status');
    return response.data;
  },
};

// =====================
// Modules & Lessons Service
// =====================

export const courseService = {
  /**
   * Listar todos os módulos
   */
  getModules: async (): Promise<Module[]> => {
    const response = await apiClient.get<Module[]>('/modules');
    return response.data;
  },

  /**
   * Obter módulo por ID
   */
  getModuleById: async (moduleId: number): Promise<Module> => {
    const response = await apiClient.get<Module>(`/modules/${moduleId}`);
    return response.data;
  },

  /**
   * Listar aulas de um módulo
   */
  getLessons: async (moduleId: number): Promise<Lesson[]> => {
    const response = await apiClient.get<Lesson[]>(`/modules/${moduleId}/lessons`);
    return response.data;
  },

  /**
   * Obter aula por ID
   */
  getLessonById: async (lessonId: number): Promise<Lesson> => {
    const response = await apiClient.get<Lesson>(`/lessons/${lessonId}`);
    return response.data;
  },
};

// =====================
// Gamification Service
// =====================

export const gamificationService = {
  /**
   * Obter dados de gamificação do aluno logado
   */
  getData: async (): Promise<GamificationData> => {
    const cpf = localStorage.getItem('studentData');
    if (!cpf) throw new Error('CPF não encontrado');
    const studentData = JSON.parse(cpf);
    const response = await apiClient.get<GamificationData>(`/gamification/student/${studentData.cpf}`);
    return response.data;
  },

  /**
   * Obter dados por CPF (usado internamente)
   */
  getDataByCpf: async (cpf: string): Promise<GamificationData> => {
    const response = await apiClient.get<GamificationData>(`/gamification/student/${cpf}`);
    return response.data;
  },

  /**
   * Listar todos os badges disponíveis
   */
  getAllBadges: async (): Promise<Badge[]> => {
    const response = await apiClient.get<Badge[]>('/gamification/badges');
    return response.data;
  },
};

// =====================
// Notifications Service
// =====================

export const notificationService = {
  /**
   * Listar notificações
   */
  getAll: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/students/me/notifications');
    return response.data;
  },

  /**
   * Marcar como lida
   */
  markAsRead: async (notificationId: string): Promise<void> => {
    await apiClient.patch(`/students/me/notifications/${notificationId}/read`);
  },

  /**
   * Marcar todas como lidas
   */
  markAllAsRead: async (): Promise<void> => {
    await apiClient.post('/students/me/notifications/read-all');
  },

  /**
   * Contar não lidas
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<{ count: number }>('/students/me/notifications/unread-count');
    return response.data.count;
  },
};
