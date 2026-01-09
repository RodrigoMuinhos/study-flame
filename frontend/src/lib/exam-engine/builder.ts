// ============================================================================
// BUILDER: Gera blueprints de prova
// ============================================================================

import {
  ExamKind,
  ExamMode,
  ExamSettings,
  ExamState,
  MixedExamPlan,
  QuestionBlueprint,
  ExamQuestion,
} from './types';

import { saveExamState } from './persistence';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Embaralha array (Fisher-Yates)
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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

async function fetchRandomQuestions(params: {
  count: number;
  topic?: string;
  domain?: string;
}): Promise<ExamQuestionDTO[]> {
  const url = new URL(`${API_BASE_URL}/exam-questions/random`);
  url.searchParams.set('count', String(params.count));
  url.searchParams.set('status', 'ACTIVE');
  url.searchParams.set('multipleChoice', 'false');
  if (params.topic) url.searchParams.set('topic', params.topic);
  if (params.domain) url.searchParams.set('domain', params.domain);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch random questions (${response.status})`);
  }
  return (await response.json()) as ExamQuestionDTO[];
}

/**
 * Gera blueprint para prova de tópico único
 */
export async function buildSingleTopicBlueprint(
  topic: string,
  count: number = 65
): Promise<QuestionBlueprint[]> {
  const questions = await fetchRandomQuestions({ count, topic });
  if (questions.length === 0) {
    throw new Error(`No questions found for topic: ${topic}`);
  }
  if (questions.length < count) {
    console.warn(`Topic ${topic} has only ${questions.length} questions, requested ${count}`);
  }
  return questions.map((q) => ({ id: q.id }));
}

/**
 * Gera blueprint para prova mista
 */
export async function buildMixedBlueprint(
  mixPlan: MixedExamPlan
): Promise<QuestionBlueprint[]> {
  const blueprintParts: QuestionBlueprint[] = [];
  
  // Carrega e seleciona de cada tópico
  for (const [topic, count] of Object.entries(mixPlan)) {
    try {
      const questions = await fetchRandomQuestions({ count, topic });
      if (questions.length === 0) {
        console.warn(`No questions found for topic: ${topic}`);
        continue;
      }
      if (questions.length < count) {
        console.warn(`Topic ${topic} has only ${questions.length} questions, requested ${count}`);
      }
      blueprintParts.push(...questions.map((q) => ({ id: q.id })));
    } catch (e) {
      console.warn(`Failed to load questions for topic ${topic}:`, e);
    }
  }
  
  // Embaralha tudo junto para misturar os tópicos
  return shuffle(blueprintParts);
}

function defaultSettingsForKind(kind: ExamKind): ExamSettings {
  if (kind === 'official') {
    return {
      kind,
      timerEnabled: true,
      showFeedbackDuringExam: false,
      showExplanationDuringExam: false,
    };
  }

  // Simulator/training defaults (podem ser sobrescritos pelo caller)
  return {
    kind,
    timerEnabled: kind === 'simulator',
    showFeedbackDuringExam: true,
    showExplanationDuringExam: true,
  };
}

function durationForQuestions(count: number): number {
  // Regra do produto: 2min por questão
  return Math.max(0, Math.floor(count * 2 * 60));
}

/**
 * Cria uma nova prova
 */
export async function createExam(
  mode: ExamMode,
  options: {
    topic?: string;
    mixPlan?: MixedExamPlan;
    questionCount?: number;
    durationSec?: number;
    kind?: ExamKind;
    settings?: Partial<ExamSettings>;
  }
): Promise<ExamState> {
  const { topic, mixPlan, questionCount } = options;

  const kind: ExamKind = options.kind ?? options.settings?.kind ?? 'simulator';
  const baseSettings = defaultSettingsForKind(kind);
  const settings: ExamSettings = { ...baseSettings, ...options.settings, kind };

  let blueprint: QuestionBlueprint[];

  if (mode === 'single') {
    if (!topic) {
      throw new Error('Topic is required for single mode');
    }
    const count = questionCount ?? (kind === 'official' ? 65 : 65);
    blueprint = await buildSingleTopicBlueprint(topic, count);
  } else {
    if (!mixPlan) {
      throw new Error('Mix plan is required for mixed mode');
    }
    blueprint = await buildMixedBlueprint(mixPlan);
  }

  const totalQuestions = blueprint.length;

  const durationSec =
    typeof options.durationSec === 'number'
      ? options.durationSec
      : settings.timerEnabled
        ? (kind === 'official' ? 7800 : durationForQuestions(totalQuestions))
        : 0;

  const now = Date.now();
  const examId = `exam_${now}_${Math.random().toString(36).slice(2, 11)}`;

  const state: ExamState = {
    id: examId,
    mode,
    topic,
    mixPlan,
    blueprint,
    answers: {},
    currentIndex: 0,
    startedAt: now,
    durationSec,
    finished: false,
    settings,
  };

  saveExamState(state);
  return state;
}
