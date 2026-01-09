// ============================================================================
// HYDRATOR: Converte blueprint em questões reais
// ============================================================================

import { ExamQuestion, QuestionBlueprint } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

type ExamQuestionDTO = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  difficulty: string;
  multipleChoice?: boolean;
  topic?: string;
  status?: string;
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

function toExamQuestion(dto: ExamQuestionDTO): ExamQuestion {
  return {
    id: dto.id,
    topic: dto.topic ?? dto.domain,
    question: dto.question,
    options: (dto.options ?? []).slice(0, 4).map((text, idx) => ({
      label: OPTION_LABELS[idx] ?? String(idx + 1),
      text,
    })),
    correctAnswer: dto.correctAnswer,
    explanation: dto.explanation,
  };
}

// Cache por ID (banco único)
const questionCache = new Map<string, ExamQuestion>();

async function fetchQuestionsByIds(ids: string[]): Promise<ExamQuestion[]> {
  const response = await fetch(`${API_BASE_URL}/exam-questions/by-ids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch questions by ids (${response.status})`);
  }

  const dtos = (await response.json()) as ExamQuestionDTO[];
  return dtos.map(toExamQuestion);
}

/**
 * Hidrata um blueprint em questões reais
 * Carrega apenas os tópicos necessários
 */
export async function hydrateBlueprint(
  blueprint: QuestionBlueprint[]
): Promise<ExamQuestion[]> {
  const ids = blueprint.map((bp) => bp.id);

  const missing = ids.filter((id) => !questionCache.has(id));
  if (missing.length > 0) {
    try {
      const fetched = await fetchQuestionsByIds(missing);
      fetched.forEach((q) => questionCache.set(q.id, q));
    } catch (e) {
      console.error('Failed to hydrate blueprint from API:', e);
    }
  }

  const hydrated: ExamQuestion[] = [];
  for (const id of ids) {
    const q = questionCache.get(id);
    if (!q) {
      console.warn(`Question id ${id} not found`);
      continue;
    }
    hydrated.push(q);
  }
  return hydrated;
}

/**
 * Limpa cache (útil para recarregar dados)
 */
export function clearCache(): void {
  questionCache.clear();
}

/**
 * Carrega uma questão específica
 */
export async function loadSingleQuestion(
  _topic: string,
  id: string
): Promise<ExamQuestion | null> {
  if (questionCache.has(id)) {
    return questionCache.get(id) ?? null;
  }
  const questions = await fetchQuestionsByIds([id]);
  const q = questions[0] ?? null;
  if (q) questionCache.set(q.id, q);
  return q;
}
