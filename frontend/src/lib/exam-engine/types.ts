// ============================================================================
// TIPOS CENTRAIS DO MOTOR DE EXAME
// ============================================================================

/**
 * Estrutura de uma questão no banco de dados (JSON)
 */
export interface ExamQuestion {
  id: string;
  topic?: string;
  question: string;
  context?: string;
  options: {
    label: string; // 'A', 'B', 'C', 'D'
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  relatedService?: string;
}

/**
 * Tipo de execução (o "nome" do produto/experiência)
 * - official: prova oficial (65, mista, com timer, sem feedback durante)
 * - simulator: simulador configurável
 * - training: modo treino (quizzes curtos)
 */
export type ExamKind = 'official' | 'simulator' | 'training';

/**
 * Ajustes de UX/comportamento durante a prova.
 * Esses flags não mudam o banco de questões — só mudam como a prova se comporta.
 */
export interface ExamSettings {
  kind: ExamKind;
  timerEnabled: boolean;
  showFeedbackDuringExam: boolean; // mostra "certa/errada" após responder
  showExplanationDuringExam: boolean; // mostra explicação após responder
}

/**
 * Blueprint: representa apenas o ID da questão sorteada no banco.
 * Isso é o que salvamos no localStorage - leve e estável.
 */
export interface QuestionBlueprint {
  id: string;
}

/**
 * Modo de prova
 */
export type ExamMode = 'single' | 'mixed';

/**
 * Configuração de prova mista (quantas questões de cada tópico)
 */
export interface MixedExamPlan {
  [topic: string]: number; // ex: { cloudfront: 20, s3: 20, vpc: 25 }
}

/**
 * Estado completo de uma prova em andamento
 */
export interface ExamState {
  id: string; // ID único da prova
  mode: ExamMode;
  topic?: string; // para modo single
  mixPlan?: MixedExamPlan; // para modo mixed
  blueprint: QuestionBlueprint[]; // ordem exata das questões
  answers: Record<string, string | null>; // { "0": "A", "1": null, ... } - índice no blueprint
  currentIndex: number; // questão atual
  startedAt: number; // timestamp de início
  durationSec: number; // duração total em segundos (padrão 130min = 7800s)
  finished: boolean;
  finishedAt?: number; // timestamp de finalização

  // Configurações de comportamento/UX
  settings?: ExamSettings;
}

/**
 * Resultado da correção
 */
export interface ExamResult {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number; // percentual 0-100
  timeSpent?: number; // segundos gastos
  questions: QuestionResult[];
  state?: ExamState; // Estado original do exame
}

/**
 * Resultado de uma questão individual
 */
export interface QuestionResult {
  index: number; // posição na prova
  question: ExamQuestion;
  userAnswer: string | null;
  isCorrect: boolean;
}

/**
 * Filtros para review
 */
export type ReviewFilter = 'all' | 'correct' | 'incorrect' | 'unanswered';

/**
 * Metadados de tópico disponível
 */
export interface TopicMetadata {
  id: string;
  name: string;
  questionCount: number;
  icon?: string;
}
