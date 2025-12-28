/**
 * Auth Service
 * Serviço de autenticação - usado por Admin e Aluno
 * 
 * Endpoints:
 * - POST /auth/login        → Login de usuário
 * - POST /auth/logout       → Logout
 * - POST /auth/refresh      → Renovar token
 * - GET  /auth/me           → Dados do usuário logado
 */

import { apiClient } from './config';

// =====================
// Types
// =====================

export interface LoginRequest {
  cpf: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: 'ADMIN' | 'STUDENT';
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: 'ADMIN' | 'STUDENT';
}

// =====================
// Auth Service
// =====================

export const authService = {
  /**
   * Login de usuário
   */
  login: async (cpf: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', { cpf, password });
    localStorage.setItem('access_token', response.data.accessToken);
    localStorage.setItem('refresh_token', response.data.refreshToken);
    localStorage.setItem('user_data', JSON.stringify(response.data.user));
    return response.data;
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignora erro se backend não estiver disponível
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('studentData');
      localStorage.removeItem('aws_study_access');
    }
  },

  /**
   * Renovar token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', { refreshToken });
    localStorage.setItem('access_token', response.data.accessToken);
    return response.data;
  },

  /**
   * Obter dados do usuário logado
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Verificar se está logado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Obter role do usuário
   */
  getUserRole: (): 'ADMIN' | 'STUDENT' | null => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role;
    }
    return null;
  },
};
