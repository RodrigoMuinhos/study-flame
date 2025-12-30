import React, { useState, useEffect } from 'react';
import { ExamQuestionCard, ExamQuestion } from './ExamQuestionCard';
import { ExamTimer } from './ExamTimer';
import { ExamResultsScreen, ExamResult } from './ExamResultsScreen';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface ExamSimulatorProps {
  questions: ExamQuestion[];
  timerMinutes: number;
  onFinish: (result: ExamResult) => void;
}

// Função para embaralhar array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function ExamSimulator({ questions, timerMinutes, onFinish }: ExamSimulatorProps) {
  const [shuffledQuestions] = useState<ExamQuestion[]>(() => shuffleArray(questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [startTime] = useState(Date.now());
  const [timerExpired, setTimerExpired] = useState(false);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;

  // Navegação de questões
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  // Quando o timer acabar
  const handleTimeUp = () => {
    setTimerExpired(true);
    finishExam();
  };

  // Finalizar prova
  const finishExam = () => {
    const endTime = Date.now();
    const timeSpentMs = endTime - startTime;
    const timeSpentMinutes = Math.floor(timeSpentMs / 60000);
    const timeSpentSeconds = Math.floor((timeSpentMs % 60000) / 1000);
    const timeSpent = `${timeSpentMinutes}min ${timeSpentSeconds}s`;

    // Calcular resultados
    let correctCount = 0;
    const questionsReview = shuffledQuestions.map(q => {
      const selectedAnswer = answers[q.id] || '';
      const wasCorrect = selectedAnswer === q.correctAnswer;
      if (wasCorrect) correctCount++;

      return {
        id: q.id,
        question: q.question,
        wasCorrect,
        selectedAnswer,
        correctAnswer: q.correctAnswer
      };
    });

    const percentage = Math.round((correctCount / shuffledQuestions.length) * 100);
    const passed = percentage >= 72;

    const result: ExamResult = {
      totalQuestions: shuffledQuestions.length,
      correctAnswers: correctCount,
      timeSpent,
      passed,
      percentage,
      questionsReview
    };

    setExamResult(result);
    setShowResults(true);
    onFinish(result);
  };

  // Se já mostrou resultados, renderizar tela de resultados
  if (showResults && examResult) {
    return (
      <ExamResultsScreen
        result={examResult}
        onReviewQuestion={(questionId) => {
          const index = shuffledQuestions.findIndex(q => q.id === questionId);
          if (index !== -1) {
            setCurrentQuestionIndex(index);
            // Não sair da tela de resultados, apenas scroll para a questão
          }
        }}
        onRetakeExam={() => {
          setAnswers({});
          setCurrentQuestionIndex(0);
          setShowResults(false);
          setExamResult(null);
          setTimerExpired(false);
        }}
        onBackToHome={() => window.location.reload()}
      />
    );
  }

  // Navegador de questões (mini barra com números)
  const QuestionNavigator = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">
          Navegação das Questões
        </span>
        <span className="text-sm text-gray-600">
          {Object.keys(answers).length} de {shuffledQuestions.length} respondidas
        </span>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {shuffledQuestions.map((q, index) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                isCurrent
                  ? 'bg-orange-600 text-white scale-110 shadow-lg'
                  : isAnswered
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header com Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Simulado AWS SAA-C03</h1>
              <p className="text-gray-600">
                Questão {currentQuestionIndex + 1} de {shuffledQuestions.length}
              </p>
            </div>
            <ExamTimer initialMinutes={timerMinutes} onTimeUp={handleTimeUp} />
          </div>
        </div>

        {/* Navegador de questões */}
        <QuestionNavigator />

        {/* Questão atual */}
        <div className="mb-6">
          <ExamQuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            showResults={false}
          />
        </div>

        {/* Botões de navegação */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-900 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          <div className="flex gap-3">
            {currentQuestionIndex === shuffledQuestions.length - 1 ? (
              <button
                onClick={finishExam}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Flag size={20} />
                Finalizar Prova
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Próxima
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
