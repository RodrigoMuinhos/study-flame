/**
 * API Services - Entry Point
 * 
 * Este arquivo exporta todos os serviços de API organizados por módulo.
 * 
 * Estrutura:
 * - auth.service.ts      → Autenticação (login, logout, refresh token)
 * - admin.service.ts     → Endpoints exclusivos do Admin
 * - student.service.ts   → Endpoints exclusivos do Aluno
 * - aws-study.service.ts → Endpoints do AWS Study
 * - shared.service.ts    → Endpoints compartilhados
 */

export * from './config';
export * from './auth.service';
export * from './admin.service';
export * from './student.service';
export * from './aws-study.service';
export * from './shared.service';
