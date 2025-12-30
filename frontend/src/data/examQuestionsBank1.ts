// STUB - Banco legacy removido. Use exam-engine com JSON em public/questions/.
export interface ExamQuestion {
  id: number;
  question: string;
  context: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
  relatedService: string;
  category: string;
  domain?: string;
  difficulty?: string;
  multipleChoice?: boolean;
}

export const examQuestionsBank1: ExamQuestion[] = [];
