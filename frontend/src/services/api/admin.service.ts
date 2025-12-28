/**
 * Admin Service
 * Endpoints exclusivos do painel administrativo
 * 
 * Funcionalidades:
 * - Gerenciamento de Leads/Alunos
 * - Geração de Tokens AWS
 * - Controle de Acessos
 * - Dashboard Analytics
 * - Gerenciamento de Vídeos/Aulas
 * - Sistema de Mensagens
 */

import { apiClient } from './config';

// =====================
// Types - Leads
// =====================

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  experience: string;
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadImportDTO {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  experience: string;
  created_at?: string;
}

export interface ImportResult {
  totalProcessed: number;
  successCount: number;
  errorCount: number;
  errors: string[];
  message: string;
}

// =====================
// Types - AWS Tokens
// =====================

export interface AwsToken {
  id: string;
  token: string;
  cpf: string;
  userName: string;
  isUsed: boolean;
  usedAt?: string;
  expiresAt: string;
  createdAt: string;
}

export interface GenerateTokenRequest {
  cpf: string;
  userName: string;
  expirationDays?: number;
}

export interface GenerateTokenResponse {
  token: string;
  expiresAt: string;
}

// =====================
// Types - Student Access
// =====================

export interface StudentAccess {
  id: string;
  leadId: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  isActive: boolean;
  credentialsSent: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface CreateAccessRequest {
  leadId: string;
  generatePassword?: boolean;
  customPassword?: string;
}

// =====================
// Types - Analytics
// =====================

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalLessonsCompleted: number;
  averageProgress: number;
  newStudentsThisWeek: number;
  engagementRate: number;
}

// =====================
// Types - Videos/Aulas
// =====================

export interface VideoLesson {
  id: string;
  moduleId: number;
  title: string;
  description?: string;
  youtubeUrl: string;
  duration: number; // em minutos
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export interface CreateVideoRequest {
  moduleId: number;
  title: string;
  description?: string;
  youtubeUrl: string;
  duration: number;
  order: number;
}

// =====================
// Types - Messages
// =====================

export interface Message {
  id: string;
  title: string;
  content: string;
  link?: string;
  recipientType: 'ALL' | 'SPECIFIC';
  recipientIds?: string[];
  createdAt: string;
  sentAt?: string;
}

export interface SendMessageRequest {
  title: string;
  content: string;
  link?: string;
  recipientType: 'ALL' | 'SPECIFIC';
  recipientIds?: string[];
}

// =====================
// Lead Service
// =====================

export const leadService = {
  /**
   * Buscar todos os leads
   */
  getAll: async (): Promise<Lead[]> => {
    const response = await apiClient.get<Lead[]>('/leads');
    return response.data;
  },

  /**
   * Buscar lead por ID
   */
  getById: async (id: string): Promise<Lead> => {
    const response = await apiClient.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  /**
   * Buscar lead por CPF
   */
  getByCpf: async (cpf: string): Promise<Lead> => {
    const response = await apiClient.get<Lead>(`/leads/cpf/${cpf}`);
    return response.data;
  },

  /**
   * Criar novo lead
   */
  create: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
    const response = await apiClient.post<Lead>('/leads', lead);
    return response.data;
  },

  /**
   * Atualizar lead
   */
  update: async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.put<Lead>(`/leads/${id}`, lead);
    return response.data;
  },

  /**
   * Deletar lead
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  },

  /**
   * Buscar leads por status
   */
  getByStatus: async (status: Lead['status']): Promise<Lead[]> => {
    const response = await apiClient.get<Lead[]>(`/leads/status/${status}`);
    return response.data;
  },

  /**
   * Importar leads do JSON
   */
  import: async (leads: LeadImportDTO[]): Promise<ImportResult> => {
    const response = await apiClient.post<ImportResult>('/leads/import', leads);
    return response.data;
  },
};

// =====================
// AWS Token Service (Admin)
// =====================

export const awsTokenService = {
  /**
   * Gerar novo token AWS para um aluno
   */
  generate: async (request: GenerateTokenRequest): Promise<GenerateTokenResponse> => {
    const response = await apiClient.post<GenerateTokenResponse>('/tokens/generate', request);
    return response.data;
  },

  /**
   * Listar todos os tokens
   */
  getAll: async (): Promise<AwsToken[]> => {
    const response = await apiClient.get<AwsToken[]>('/tokens');
    return response.data;
  },

  /**
   * Buscar token por CPF
   */
  getByCpf: async (cpf: string): Promise<AwsToken | null> => {
    const response = await apiClient.get<AwsToken>(`/tokens/cpf/${cpf}`);
    return response.data;
  },

  /**
   * Revogar token
   */
  revoke: async (tokenId: string): Promise<void> => {
    await apiClient.delete(`/tokens/${tokenId}`);
  },

  /**
   * Verificar status do token
   */
  checkStatus: async (token: string): Promise<{ valid: boolean; expiresAt?: string }> => {
    const response = await apiClient.get(`/tokens/status/${token}`);
    return response.data;
  },
};

// =====================
// Student Access Service (Admin)
// =====================

export const studentAccessService = {
  /**
   * Listar todos os acessos de alunos
   */
  getAll: async (): Promise<StudentAccess[]> => {
    const response = await apiClient.get<StudentAccess[]>('/students/access');
    return response.data;
  },

  /**
   * Criar acesso para um lead
   */
  createAccess: async (request: CreateAccessRequest): Promise<StudentAccess> => {
    const response = await apiClient.post<StudentAccess>('/students/access', request);
    return response.data;
  },

  /**
   * Ativar/Desativar acesso
   */
  toggleAccess: async (accessId: string, isActive: boolean): Promise<StudentAccess> => {
    const response = await apiClient.patch<StudentAccess>(`/students/access/${accessId}`, { isActive });
    return response.data;
  },

  /**
   * Resetar senha
   */
  resetPassword: async (accessId: string): Promise<{ newPassword: string }> => {
    const response = await apiClient.post(`/students/access/${accessId}/reset-password`);
    return response.data;
  },

  /**
   * Marcar credenciais como enviadas
   */
  markCredentialsSent: async (accessId: string): Promise<StudentAccess> => {
    const response = await apiClient.patch<StudentAccess>(`/students/access/${accessId}/credentials-sent`);
    return response.data;
  },
};

// =====================
// Dashboard Analytics Service
// =====================

export const dashboardService = {
  /**
   * Obter estatísticas do dashboard
   */
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/admin/dashboard/stats');
    return response.data;
  },

  /**
   * Obter alunos mais ativos
   */
  getTopStudents: async (limit: number = 10): Promise<{ id: string; name: string; xp: number; level: number }[]> => {
    const response = await apiClient.get(`/admin/dashboard/top-students?limit=${limit}`);
    return response.data;
  },

  /**
   * Obter métricas de engajamento
   */
  getEngagementMetrics: async (): Promise<{ date: string; activeUsers: number; lessonsCompleted: number }[]> => {
    const response = await apiClient.get('/admin/dashboard/engagement');
    return response.data;
  },
};

// =====================
// Video Management Service
// =====================

export const videoService = {
  /**
   * Listar todos os vídeos
   */
  getAll: async (): Promise<VideoLesson[]> => {
    const response = await apiClient.get<VideoLesson[]>('/admin/videos');
    return response.data;
  },

  /**
   * Criar vídeo
   */
  create: async (video: CreateVideoRequest): Promise<VideoLesson> => {
    const response = await apiClient.post<VideoLesson>('/admin/videos', video);
    return response.data;
  },

  /**
   * Atualizar vídeo
   */
  update: async (id: string, video: Partial<CreateVideoRequest>): Promise<VideoLesson> => {
    const response = await apiClient.put<VideoLesson>(`/admin/videos/${id}`, video);
    return response.data;
  },

  /**
   * Deletar vídeo
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/videos/${id}`);
  },

  /**
   * Publicar/Despublicar vídeo
   */
  togglePublish: async (id: string, isPublished: boolean): Promise<VideoLesson> => {
    const response = await apiClient.patch<VideoLesson>(`/admin/videos/${id}/publish`, { isPublished });
    return response.data;
  },
};

// =====================
// Message Service
// =====================

export const messageService = {
  /**
   * Enviar mensagem
   */
  send: async (message: SendMessageRequest): Promise<Message> => {
    const response = await apiClient.post<Message>('/admin/messages', message);
    return response.data;
  },

  /**
   * Listar mensagens enviadas
   */
  getAll: async (): Promise<Message[]> => {
    const response = await apiClient.get<Message[]>('/admin/messages');
    return response.data;
  },

  /**
   * Deletar mensagem
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/messages/${id}`);
  },
};
