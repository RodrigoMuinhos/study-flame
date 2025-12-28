/**
 * AWS Study Service
 * Endpoints exclusivos da plataforma AWS Study
 * 
 * Funcionalidades:
 * - Validação de Token de Acesso
 * - Questões de Exames
 * - Simulados
 * - Progresso AWS
 */

import { apiClient } from './config';

// =====================
// Types - Token Validation
// =====================

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  cpf?: string;
  userName?: string;
  expiresAt?: string;
  message?: string;
}

export interface AwsStudyAccess {
  cpf: string;
  token: string;
  expiresAt: number; // timestamp
  userName: string;
}

// =====================
// Types - Exam Questions
// =====================

export interface ExamQuestion {
  id: string;
  certification: 'PRACTITIONER' | 'SOLUTIONS_ARCHITECT' | 'DEVELOPER' | 'SYSOPS';
  domain: string;
  question: string;
  options: ExamOption[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  tags: string[];
}

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamFilter {
  certification?: string;
  domain?: string;
  difficulty?: string;
  limit?: number;
}

// =====================
// Types - Exam Simulation
// =====================

export interface ExamSimulation {
  id: string;
  certification: string;
  totalQuestions: number;
  timeLimit: number; // em minutos
  questions: ExamQuestion[];
  startedAt?: string;
  completedAt?: string;
}

export interface ExamResult {
  simulationId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number; // 0-100
  passed: boolean;
  timeSpent: number; // em segundos
  completedAt: string;
  detailedResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface SubmitExamRequest {
  simulationId: string;
  answers: { questionId: string; selectedAnswer: string }[];
  timeSpent: number;
}

// =====================
// Types - AWS Progress
// =====================

export interface AwsStudyProgress {
  certification: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  averageScore: number;
  simulationsCompleted: number;
  lastStudyDate?: string;
  strongDomains: string[];
  weakDomains: string[];
}

// =====================
// Token Validation Service
// =====================

export const awsAccessService = {
  /**
   * Validar token de acesso
   */
  validateToken: async (token: string): Promise<ValidateTokenResponse> => {
    const response = await apiClient.post<ValidateTokenResponse>('/tokens/validate', {
      token: token.trim().toUpperCase()
    });
    return response.data;
  },

  /**
   * Verificar se o acesso está válido (no localStorage)
   */
  hasValidAccess: (cpf?: string): boolean => {
    const accessStr = localStorage.getItem('aws_study_access');
    if (!accessStr) return false;

    const access: AwsStudyAccess = JSON.parse(accessStr);
    
    // Verificar expiração
    if (access.expiresAt < Date.now()) {
      localStorage.removeItem('aws_study_access');
      return false;
    }

    // Verificar CPF se fornecido
    if (cpf && access.cpf !== cpf) {
      return false;
    }

    return true;
  },

  /**
   * Salvar acesso
   */
  saveAccess: (data: ValidateTokenResponse, token: string): void => {
    if (!data.valid || !data.cpf || !data.expiresAt) return;

    const accessData: AwsStudyAccess = {
      cpf: data.cpf,
      token: token.trim().toUpperCase(),
      expiresAt: new Date(data.expiresAt).getTime(),
      userName: data.userName || ''
    };

    localStorage.setItem('aws_study_access', JSON.stringify(accessData));
  },

  /**
   * Remover acesso
   */
  clearAccess: (): void => {
    localStorage.removeItem('aws_study_access');
  },

  /**
   * Obter dados do acesso atual
   */
  getAccessData: (): AwsStudyAccess | null => {
    const accessStr = localStorage.getItem('aws_study_access');
    if (!accessStr) return null;
    return JSON.parse(accessStr);
  },
};

// =====================
// Exam Questions Service
// =====================

export const examQuestionService = {
  /**
   * Buscar questões com filtros
   */
  getQuestions: async (filters?: ExamFilter): Promise<ExamQuestion[]> => {
    const params = new URLSearchParams();
    if (filters?.certification) params.append('certification', filters.certification);
    if (filters?.domain) params.append('domain', filters.domain);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get<ExamQuestion[]>(`/exam/questions?${params.toString()}`);
    return response.data;
  },

  /**
   * Buscar questão por ID
   */
  getById: async (id: string): Promise<ExamQuestion> => {
    const response = await apiClient.get<ExamQuestion>(`/exam/questions/${id}`);
    return response.data;
  },

  /**
   * Buscar questões aleatórias para simulado
   */
  getRandomQuestions: async (certification: string, count: number): Promise<ExamQuestion[]> => {
    const response = await apiClient.get<ExamQuestion[]>(
      `/exam/questions/random?certification=${certification}&count=${count}`
    );
    return response.data;
  },

  /**
   * Listar domínios disponíveis
   */
  getDomains: async (certification: string): Promise<string[]> => {
    const response = await apiClient.get<string[]>(`/exam/domains/${certification}`);
    return response.data;
  },
};

// =====================
// Exam Simulation Service
// =====================

export const examSimulationService = {
  /**
   * Criar novo simulado
   */
  create: async (certification: string, questionCount?: number): Promise<ExamSimulation> => {
    const response = await apiClient.post<ExamSimulation>('/exam/simulations', {
      certification,
      questionCount: questionCount || 65
    });
    return response.data;
  },

  /**
   * Submeter respostas do simulado
   */
  submit: async (request: SubmitExamRequest): Promise<ExamResult> => {
    const response = await apiClient.post<ExamResult>(
      `/exam/simulations/${request.simulationId}/submit`,
      request
    );
    return response.data;
  },

  /**
   * Obter histórico de simulados
   */
  getHistory: async (): Promise<ExamResult[]> => {
    const response = await apiClient.get<ExamResult[]>('/exam/simulations/history');
    return response.data;
  },

  /**
   * Obter resultado de um simulado
   */
  getResult: async (simulationId: string): Promise<ExamResult> => {
    const response = await apiClient.get<ExamResult>(`/exam/simulations/${simulationId}/result`);
    return response.data;
  },
};

// =====================
// AWS Progress Service
// =====================

export const awsProgressService = {
  /**
   * Obter progresso geral
   */
  getProgress: async (): Promise<AwsStudyProgress[]> => {
    const response = await apiClient.get<AwsStudyProgress[]>('/exam/progress');
    return response.data;
  },

  /**
   * Obter progresso por certificação
   */
  getProgressByCertification: async (certification: string): Promise<AwsStudyProgress> => {
    const response = await apiClient.get<AwsStudyProgress>(`/exam/progress/${certification}`);
    return response.data;
  },

  /**
   * Registrar resposta de questão (para tracking)
   */
  recordAnswer: async (questionId: string, isCorrect: boolean): Promise<void> => {
    await apiClient.post('/exam/progress/answer', { questionId, isCorrect });
  },
};
