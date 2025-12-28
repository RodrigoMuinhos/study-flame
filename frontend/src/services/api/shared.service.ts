/**
 * Shared Service
 * Endpoints compartilhados entre Admin e Aluno
 * 
 * Funcionalidades:
 * - Temas e Preferências
 * - Utilitários
 */

import { apiClient } from './config';

// =====================
// Types - Preferences
// =====================

export interface UserPreferences {
  theme: 'theme-fire-dark' | 'theme-fire-light' | 'theme-ember';
  notifications: boolean;
  emailNotifications: boolean;
  language: string;
}

// =====================
// Types - Health Check
// =====================

export interface HealthCheck {
  status: 'UP' | 'DOWN';
  timestamp: string;
  version: string;
  database: 'UP' | 'DOWN';
}

// =====================
// Preferences Service
// =====================

export const preferencesService = {
  /**
   * Obter preferências do usuário
   */
  get: async (): Promise<UserPreferences> => {
    const response = await apiClient.get<UserPreferences>('/users/preferences');
    return response.data;
  },

  /**
   * Atualizar preferências
   */
  update: async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
    const response = await apiClient.put<UserPreferences>('/users/preferences', preferences);
    return response.data;
  },

  /**
   * Obter preferências do localStorage (fallback offline)
   */
  getLocal: (): UserPreferences => {
    const saved = localStorage.getItem('user_preferences');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      theme: 'theme-fire-dark',
      notifications: true,
      emailNotifications: true,
      language: 'pt-BR'
    };
  },

  /**
   * Salvar preferências no localStorage
   */
  saveLocal: (preferences: UserPreferences): void => {
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
  },
};

// =====================
// Health Check Service
// =====================

export const healthService = {
  /**
   * Verificar status da API
   */
  check: async (): Promise<HealthCheck> => {
    const response = await apiClient.get<HealthCheck>('/health');
    return response.data;
  },

  /**
   * Verificar se a API está online
   */
  isOnline: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  },
};

// =====================
// Utility Functions
// =====================

/**
 * Formatar CPF para exibição
 */
export const formatCpf = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Limpar CPF para envio
 */
export const cleanCpf = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

/**
 * Formatar telefone
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

/**
 * Formatar data
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

/**
 * Formatar data e hora
 */
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('pt-BR');
};
