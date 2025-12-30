// ============================================================================
// SCORER: Corrige prova e gera resultados
// ============================================================================

import { ExamState, ExamResult, QuestionResult, ReviewFilter, ExamQuestion } from './types';
import { hydrateBlueprint } from './hydrator';

/**
 * Corrige a prova e gera resultado completo
 */
export async function scoreExam(state: ExamState): Promise<ExamResult> {
  // Hidrata questões do blueprint
  const questions = await hydrateBlueprint(state.blueprint);
  
  const questionResults: QuestionResult[] = [];
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  
  questions.forEach((question, index) => {
    const userAnswer = state.answers[index] || null;
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (userAnswer === null) {
      unanswered++;
    } else if (isCorrect) {
      correct++;
    } else {
      incorrect++;
    }
    
    questionResults.push({
      index,
      question,
      userAnswer,
      isCorrect
    });
  });
  
  const total = questions.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  const timeSpent = state.finishedAt
    ? Math.floor((state.finishedAt - state.startedAt) / 1000)
    : undefined;
  
  return {
    total,
    correct,
    incorrect,
    unanswered,
    score,
    timeSpent,
    questions: questionResults,
    state // Adiciona o estado original
  };
}

/**
 * Filtra resultados por tipo
 */
export function filterResults(
  results: QuestionResult[],
  filter: ReviewFilter
): QuestionResult[] {
  switch (filter) {
    case 'all':
      return results;
    case 'correct':
      return results.filter(r => r.isCorrect);
    case 'incorrect':
      return results.filter(r => !r.isCorrect && r.userAnswer !== null);
    case 'unanswered':
      return results.filter(r => r.userAnswer === null);
    default:
      return results;
  }
}

/**
 * Formata tempo em MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formata tempo detalhado (HH:MM:SS ou MM:SS)
 */
export function formatTimeDetailed(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}
