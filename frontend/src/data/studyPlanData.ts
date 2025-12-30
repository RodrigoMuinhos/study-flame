// STUB - Arquivo removido para reduzir peso do bundle
// Dados movidos para: public/questions/*.json
// Use: import { createExam } from '@/lib/exam-engine'

export type PlanDuration = 4 | 8 | 12;

export interface WeekContent {
  week: number;
  title: string;
  description?: string;
  estimatedHours: number;
  topics: string[];
  activities: string[];
}

export interface StudyPlanData {
  [key: string]: unknown;
}

export const studyPlanData: StudyPlanData = {};

// Planos de estudo legacy (vazios)
export const SAA_4_WEEKS: WeekContent[] = [];
export const SAA_8_WEEKS: WeekContent[] = [];
export const SAA_12_WEEKS: WeekContent[] = [];
export const CLF_4_WEEKS: WeekContent[] = [];
export const CLF_8_WEEKS: WeekContent[] = [];
export const CLF_12_WEEKS: WeekContent[] = [];
