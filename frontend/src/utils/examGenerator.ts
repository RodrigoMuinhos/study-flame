// Exam Generator - Gera exames aleatórios a partir dos bancos de questões
// Garante distribuição correta por domínios (SAA-C03): 30% Resilient, 28% Performance, 24% Secure, 18% Cost

import { examQuestionsBank1, ExamQuestion } from '@/data/examQuestionsBank1';
import { examQuestionsBank2 } from '@/data/examQuestionsBank2';
import { examQuestionsBank3 } from '@/data/examQuestionsBank3';
import { trainingQuestions } from '@/data/trainingQuestions';

// Consolidar todos os bancos de questões
export const allExamQuestions: ExamQuestion[] = [
  ...examQuestionsBank1,
  ...examQuestionsBank2,
  ...examQuestionsBank3
];

// Mapeamento de tópicos de treino para domínios de exame
const topicToDomain: Record<string, 'resilient' | 'performance' | 'secure' | 'cost'> = {
  'vpc': 'secure',
  'subnets': 'secure',
  'security-groups': 'secure',
  'iam': 'secure',
  'iam-roles': 'secure',
  'ec2': 'resilient',
  'auto-scaling': 'resilient',
  'alb': 'resilient',
  'route53': 'resilient',
  'rds': 'resilient',
  'sqs': 'resilient',
  'sns': 'resilient',
  'cloudfront': 'performance',
  's3': 'cost',
  'cloudwatch': 'performance',
  'architecture': 'resilient'
};

/**
 * Converte questões de treino para formato compatível com SimulatorMode
 * Mantém o formato { label, text } das opções
 */
function convertTrainingToSimulatorFormat(): any[] {
  const converted: any[] = [];
  let idOffset = 10000; // Offset para evitar conflito de IDs
  
  Object.entries(trainingQuestions).forEach(([topic, questions]) => {
    questions.forEach((q) => {
      converted.push({
        id: idOffset + q.id,
        question: q.question,
        options: q.options, // Manter formato { label, text }
        correctAnswer: q.correctAnswer, // Manter 'A', 'B', 'C', 'D'
        explanation: q.explanation,
        domain: topicToDomain[topic] || 'resilient',
        difficulty: 'medium',
        category: topic
      });
    });
    idOffset += 1000;
  });
  
  return converted;
}

/**
 * Converte questões de exame para formato compatível com SimulatorMode
 */
function convertExamToSimulatorFormat(): any[] {
  const labels = ['A', 'B', 'C', 'D', 'E'];
  return allExamQuestions.map(q => ({
    ...q,
    options: q.options.map((text, index) => ({ label: labels[index], text })),
    correctAnswer: labels[q.correctAnswer as number] || q.correctAnswer,
    category: q.domain
  }));
}

// Todas as questões combinadas no formato do simulador
export const allSimulatorQuestions: any[] = [
  ...convertExamToSimulatorFormat(),
  ...convertTrainingToSimulatorFormat()
];

interface DomainDistribution {
  resilient: number;
  performance: number;
  secure: number;
  cost: number;
}

/**
 * Calcula quantas questões devem ser selecionadas de cada domínio
 * @param totalQuestions Número total de questões do exame
 * @returns Distribuição de questões por domínio
 */
export function calculateDomainDistribution(totalQuestions: number): DomainDistribution {
  return {
    resilient: Math.round(totalQuestions * 0.30),    // 30%
    performance: Math.round(totalQuestions * 0.28),  // 28%
    secure: Math.round(totalQuestions * 0.24),       // 24%
    cost: Math.round(totalQuestions * 0.18)          // 18%
  };
}

/**
 * Embaralha um array usando Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gera um exame aleatório com distribuição correta de domínios
 * @param questionCount Número de questões (padrão: 65 para exame oficial)
 * @returns Array de questões embaralhadas
 */
export function generateRandomExam(questionCount: number = 65): ExamQuestion[] {
  const distribution = calculateDomainDistribution(questionCount);
  
  // Separar questões por domínio
  const questionsByDomain: Record<string, ExamQuestion[]> = {
    resilient: allExamQuestions.filter(q => q.domain === 'resilient'),
    performance: allExamQuestions.filter(q => q.domain === 'performance'),
    secure: allExamQuestions.filter(q => q.domain === 'secure'),
    cost: allExamQuestions.filter(q => q.domain === 'cost')
  };

  // Embaralhar questões de cada domínio
  Object.keys(questionsByDomain).forEach(domain => {
    questionsByDomain[domain] = shuffleArray(questionsByDomain[domain]);
  });

  // Selecionar questões de acordo com a distribuição
  const selectedQuestions: ExamQuestion[] = [
    ...questionsByDomain.resilient.slice(0, distribution.resilient),
    ...questionsByDomain.performance.slice(0, distribution.performance),
    ...questionsByDomain.secure.slice(0, distribution.secure),
    ...questionsByDomain.cost.slice(0, distribution.cost)
  ];

  // Embaralhar todas as questões selecionadas
  return shuffleArray(selectedQuestions);
}

/**
 * Gera exame aleatório usando TODAS as questões disponíveis (exame + treino)
 * Ideal para o simulador que deve ter questões variadas de todos os tópicos
 * @param questionCount Número de questões desejadas
 * @returns Array de questões embaralhadas
 */
export function generateMixedExam(questionCount: number = 20): any[] {
  // Embaralhar todas as questões combinadas
  const shuffled = shuffleArray(allSimulatorQuestions);
  
  // Selecionar a quantidade desejada
  return shuffled.slice(0, Math.min(questionCount, shuffled.length));
}

/**
 * Gera múltiplas versões de exames únicas
 * @param count Número de versões a gerar
 * @param questionCount Questões por exame
 * @returns Array de exames únicos
 */
export function generateMultipleExamVersions(count: number = 30, questionCount: number = 65): ExamQuestion[][] {
  const exams: ExamQuestion[][] = [];
  
  for (let i = 0; i < count; i++) {
    exams.push(generateRandomExam(questionCount));
  }
  
  return exams;
}

/**
 * Valida se um exame tem a distribuição correta de domínios
 */
export function validateExamDistribution(questions: ExamQuestion[]): {
  valid: boolean;
  distribution: Record<string, number>;
  expected: DomainDistribution;
} {
  const distribution: Record<string, number> = {
    resilient: questions.filter(q => q.domain === 'resilient').length,
    performance: questions.filter(q => q.domain === 'performance').length,
    secure: questions.filter(q => q.domain === 'secure').length,
    cost: questions.filter(q => q.domain === 'cost').length
  };

  const expected = calculateDomainDistribution(questions.length);
  
  // Validar se está próximo da distribuição esperada (±2 questões de tolerância)
  const valid = 
    Math.abs(distribution.resilient - expected.resilient) <= 2 &&
    Math.abs(distribution.performance - expected.performance) <= 2 &&
    Math.abs(distribution.secure - expected.secure) <= 2 &&
    Math.abs(distribution.cost - expected.cost) <= 2;

  return { valid, distribution, expected };
}

/**
 * Obtém estatísticas dos bancos de questões
 */
export function getQuestionBankStats() {
  const byDomain: Record<string, number> = {
    resilient: allExamQuestions.filter(q => q.domain === 'resilient').length,
    performance: allExamQuestions.filter(q => q.domain === 'performance').length,
    secure: allExamQuestions.filter(q => q.domain === 'secure').length,
    cost: allExamQuestions.filter(q => q.domain === 'cost').length
  };

  const byDifficulty: Record<string, number> = {
    easy: allExamQuestions.filter(q => q.difficulty === 'easy').length,
    medium: allExamQuestions.filter(q => q.difficulty === 'medium').length,
    hard: allExamQuestions.filter(q => q.difficulty === 'hard').length
  };

  return {
    total: allExamQuestions.length,
    byDomain,
    byDifficulty,
    multipleChoice: allExamQuestions.filter(q => q.multipleChoice).length,
    singleChoice: allExamQuestions.filter(q => !q.multipleChoice).length
  };
}
