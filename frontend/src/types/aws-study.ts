export interface ExamQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  relatedService: string;
  category: string;
}

export interface ExamState {
  answers: Record<number, string>;
  currentQuestion: number;
  timeRemaining: number;
  isFinished: boolean;
  startTime: number;
}

export interface ExamResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  timeSpent: number;
  answers: Record<number, {
    selected: string;
    correct: string;
    isCorrect: boolean;
  }>;
}

export interface TrainingQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
  relatedService: string;
  topic: string;
}

export interface TrainingTopic {
  id: string;
  name?: string;
  title?: string;
  description: string;
  category?: string;
  domain?: string;
  icon: string;
  color: string;
  questionCount: number;
  topics?: string[];
}

export interface TrainingResult {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface ExamHistory {
  id: string;
  date: Date;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  timeSpent: number;
  questionsCount: 10 | 20 | 40 | 65;
  timerEnabled: boolean;
  categoryPerformance?: Record<string, { correct: number; total: number }>;
}

export interface CategoryStats {
  category: string;
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  averageTime?: number;
  lastAttempt?: number;
}

export interface UserStats {
  totalExams: number;
  totalQuestions: number;
  totalCorrect: number;
  overallAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  badges: Badge[];
  categoryStats: Record<string, CategoryStats>;
  examHistory: ExamHistory[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  icon: string;
}
