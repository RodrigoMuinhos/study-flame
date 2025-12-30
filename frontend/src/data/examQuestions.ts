// STUB - Arquivo removido para reduzir peso do bundle
// Questões movidas para: public/questions/*.json
// Use: import { createExam } from '@/lib/exam-engine'

export interface ExamQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  domain?: string;
  category: string;
  topic?: string;
  context: string;
  relatedService: string;
}

export const examQuestions: ExamQuestion[] = [];
export const examQuestionsBank1: ExamQuestion[] = [];
export const examQuestionsBank2: ExamQuestion[] = [];
export const examQuestionsBank3: ExamQuestion[] = [];
