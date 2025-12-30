// ============================================================================
// EXAM GENERATOR - LEGACY (OBSOLETO)
// ============================================================================
// Este arquivo foi substituido pelo novo exam-engine modular
// Mantido apenas para compatibilidade temporaria
// 
// MIGRACAO:
// - Antes: import { allExamQuestions } from '@/utils/examGenerator'
// - Depois: import { createExam, hydrateBlueprint } from '@/lib/exam-engine'

export interface ExamQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  domain?: string;
  topic?: string;
  category?: string;
}

// Array vazio - dados movidos para JSON em /public/questions/
export const allExamQuestions: ExamQuestion[] = [];

// Funcoes obsoletas - use exam-engine
export function generateRandomExam(): ExamQuestion[] {
  console.warn('generateRandomExam() esta obsoleto. Use createExam() do exam-engine');
  return [];
}

export function generateMixedExam(_questionCount?: number): ExamQuestion[] {
  // Legacy signature aceita opcionalmente quantidade de questões
  console.warn('generateMixedExam() esta obsoleto. Use createExam() do exam-engine');
  return [];
}

export function convertTrainingToSimulatorFormat(): ExamQuestion[] {
  console.warn('convertTrainingToSimulatorFormat() esta obsoleto. Use hydrateBlueprint() do exam-engine');
  return [];
}

export function getQuestionsByDomain(domain: string): ExamQuestion[] {
  console.warn('getQuestionsByDomain() esta obsoleto. Use filtros do exam-engine');
  return [];
}

export function getQuestionBankStats() {
  console.warn('getQuestionBankStats() esta obsoleto. Use exam-engine');
  return { total: 0, byDomain: {} };
}
