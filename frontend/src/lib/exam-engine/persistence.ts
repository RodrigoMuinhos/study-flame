// ============================================================================
// PERSISTENCE: Salva e carrega estado no localStorage
// ============================================================================

import { ExamState } from './types';

const STORAGE_KEY = 'aws_exam_state';

/**
 * Salva estado da prova no localStorage
 */
export function saveExamState(state: ExamState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save exam state:', error);
  }
}

/**
 * Carrega estado da prova do localStorage
 */
export function loadExamState(): ExamState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    const state: ExamState = JSON.parse(saved);
    
    // Valida se a prova ainda é válida (não expirou)
    // Importante: provas sem timer usam durationSec=0 e NÃO devem expirar.
    if (!state.finished && state.durationSec > 0) {
      const now = Date.now();
      const elapsed = (now - state.startedAt) / 1000; // segundos
      
      if (elapsed > state.durationSec) {
        // Prova expirou - marca como finalizada
        state.finished = true;
        state.finishedAt = state.startedAt + (state.durationSec * 1000);
        saveExamState(state);
      }
    }
    
    return state;
  } catch (error) {
    console.error('Failed to load exam state:', error);
    return null;
  }
}

/**
 * Remove estado da prova do localStorage
 */
export function clearExamState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear exam state:', error);
  }
}

/**
 * Atualiza resposta de uma questão
 */
export function updateAnswer(
  state: ExamState,
  questionIndex: number,
  answer: string | null
): ExamState {
  const newState = {
    ...state,
    answers: {
      ...state.answers,
      [questionIndex]: answer
    }
  };
  
  saveExamState(newState);
  return newState;
}

/**
 * Navega para uma questão
 */
export function navigateToQuestion(
  state: ExamState,
  index: number
): ExamState {
  const newState = {
    ...state,
    currentIndex: index
  };
  
  saveExamState(newState);
  return newState;
}

/**
 * Finaliza a prova
 */
export function finishExam(state: ExamState): ExamState {
  const newState = {
    ...state,
    finished: true,
    finishedAt: Date.now()
  };
  
  saveExamState(newState);
  return newState;
}

/**
 * Verifica se existe uma prova em andamento
 */
export function hasActiveExam(): boolean {
  const state = loadExamState();
  return state !== null && !state.finished;
}

/**
 * Calcula tempo restante em segundos
 */
export function getRemainingTime(state: ExamState): number {
  if (state.finished) return 0;
  
  const now = Date.now();
  const elapsed = (now - state.startedAt) / 1000;
  const remaining = state.durationSec - elapsed;
  
  return Math.max(0, Math.floor(remaining));
}

/**
 * Calcula tempo decorrido em segundos
 */
export function getElapsedTime(state: ExamState): number {
  const endTime = state.finishedAt || Date.now();
  const elapsed = (endTime - state.startedAt) / 1000;
  return Math.floor(elapsed);
}

/**
 * Conta questões respondidas
 */
export function getAnsweredCount(state: ExamState): number {
  return Object.values(state.answers).filter(a => a !== null).length;
}
