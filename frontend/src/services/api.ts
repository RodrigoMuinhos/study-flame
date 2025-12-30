import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token se necessário
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para renovar token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('access_token', response.data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// =====================
// Tipos
// =====================

export interface LoginRequest {
  cpf: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  student: Student;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phase: string;
  progress: number;
  streak: number;
  xp: number;
  modulesCompleted: number;
  lastAccess: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProgress {
  studentId: number;
  moduleId: number;
  progress: number;
  completedAt?: string;
}

export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  isPublished: boolean;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isPublished: boolean;
}

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
// Auth Service
// =====================

export const authService = {
  login: async (cpf: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { cpf, password });
    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
    localStorage.setItem('student_id', response.data.student.id.toString());
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignora erro se backend não estiver disponível
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('student_id');
    }
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/refresh', { refreshToken });
    localStorage.setItem('access_token', response.data.accessToken);
    return response.data;
  },

  getCurrentUser: async (): Promise<Student> => {
    const response = await api.get<Student>('/auth/me');
    return response.data;
  },
};

// =====================
// Student Service
// =====================

export const studentService = {
  getProfile: async (studentId: number): Promise<Student> => {
    const response = await api.get<Student>(`/students/${studentId}`);
    return response.data;
  },

  updateProfile: async (studentId: number, data: Partial<Student>): Promise<Student> => {
    const response = await api.put<Student>(`/students/${studentId}`, data);
    return response.data;
  },

  getProgress: async (studentId: number): Promise<StudentProgress[]> => {
    const response = await api.get<StudentProgress[]>(`/students/${studentId}/progress`);
    return response.data;
  },

  updateProgress: async (studentId: number, moduleId: number, progress: number): Promise<StudentProgress> => {
    const response = await api.post<StudentProgress>(
      `/students/${studentId}/progress`,
      { moduleId, progress }
    );
    return response.data;
  },

  getLessonsCompleted: async (studentId: number): Promise<number[]> => {
    const response = await api.get<number[]>(`/students/${studentId}/lessons-completed`);
    return response.data;
  },

  markLessonComplete: async (studentId: number, lessonId: number): Promise<StudentProgress> => {
    const response = await api.post<StudentProgress>(
      `/students/${studentId}/lessons/${lessonId}/complete`
    );
    return response.data;
  },
};

// =====================
// Modules & Lessons Service
// =====================

export const moduleService = {
  getAll: async (): Promise<Module[]> => {
    const response = await api.get<Module[]>('/modules');
    return response.data;
  },

  getById: async (moduleId: number): Promise<Module> => {
    const response = await api.get<Module>(`/modules/${moduleId}`);
    return response.data;
  },

  getLessons: async (moduleId: number): Promise<Lesson[]> => {
    const response = await api.get<Lesson[]>(`/modules/${moduleId}/lessons`);
    return response.data;
  },
};

// =====================
// Lead Service (Legacy)
// =====================

// Lead endpoints
export const leadService = {
  // Buscar todos os leads
  getAll: async (): Promise<Lead[]> => {
    const response = await api.get<Lead[]>('/leads');
    return response.data;
  },

  // Buscar lead por ID
  getById: async (id: number): Promise<Lead> => {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  // Criar novo lead
  create: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
    const response = await api.post<Lead>('/leads', lead);
    return response.data;
  },

  // Atualizar lead
  update: async (id: number, lead: Partial<Lead>): Promise<Lead> => {
    const response = await api.put<Lead>(`/leads/${id}`, lead);
    return response.data;
  },

  // Deletar lead
  delete: async (id: number): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  // Buscar leads por status
  getByStatus: async (status: Lead['status']): Promise<Lead[]> => {
    const response = await api.get<Lead[]>(`/leads/status/${status}`);
    return response.data;
  },

  // Importar leads do JSON
  importLeads: async (leads: LeadImportDTO[]): Promise<ImportResult> => {
    const response = await api.post<ImportResult>('/leads/import', leads);
    return response.data;
  },
};

// =====================
// Admin Service
// =====================

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string;
  loginCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  accessToken: string;
  refreshToken: string;
  admin: AdminUser;
  message: string;
}

export const adminService = {
  login: async (username: string, password: string): Promise<AdminLoginResponse> => {
    const response = await api.post<AdminLoginResponse>('/admin/login', { username, password });
    if (response.data.accessToken) {
      localStorage.setItem('admin_access_token', response.data.accessToken);
      localStorage.setItem('admin_refresh_token', response.data.refreshToken);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
  },

  getAll: async (): Promise<AdminUser[]> => {
    const response = await api.get<AdminUser[]>('/admin/users');
    return response.data;
  },

  getStats: async (): Promise<{ total: number; active: number; superAdmins: number }> => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  updatePassword: async (id: string, password: string): Promise<AdminUser> => {
    const response = await api.put<AdminUser>(`/admin/users/${id}/password`, { password });
    return response.data;
  },
};

// =====================
// AWS Exam Service
// =====================

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  domain?: string;
  difficulty?: string;
  category?: string;
  multipleChoice?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface RandomQuestionsRequest {
  quantity: number;
}

export interface MixedQuestionsRequest {
  topics: {
    topic: string;
    quantity: number;
  }[];
}

export const awsExamService = {
  getRandomQuestions: async (quantity: number): Promise<ExamQuestion[]> => {
    const response = await api.post<ExamQuestion[]>('/exam-questions/random', { quantity });
    return response.data;
  },
  
  getMixedQuestions: async (topicMix: { topic: string; quantity: number }[]): Promise<ExamQuestion[]> => {
    const response = await api.post<ExamQuestion[]>('/exam-questions/mixed', { topics: topicMix });
    return response.data;
  },
};

export default api;
