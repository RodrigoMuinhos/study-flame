import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flag, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { ExamTimer } from './ExamTimer';
import { QuestionNavigator } from './QuestionNavigator';
import { ExamQuestionCard } from './ExamQuestionCard';
import { ExamResultsScreenNew } from './ExamResultsScreenNew';
import { examQuestions } from '@/data/examQuestions';
import { ExamResult, ExamQuestion } from '@/types/aws-study';
import { ExamConfig } from './ExamConfigScreen';
import { StatisticsManager } from '@/utils/statisticsManager';
import { ExamHistory } from '@/types/aws-study';

interface ExamSimulatorNewProps {
  config: ExamConfig;
  onBackToConfig: () => void;
  onBackToDiagram: () => void;
}

export function ExamSimulatorNew({ config, onBackToConfig, onBackToDiagram }: ExamSimulatorNewProps) {
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getQuestions = () => {
    let questions = [...examQuestions];

    // Filtrar por pontos fracos se ativado
    if (config.focusOnWeakness) {
      const weakCategories = StatisticsManager.getRecommendedTopics();
      const weakQuestions = questions.filter(q => weakCategories.includes(q.category));
      const otherQuestions = questions.filter(q => !weakCategories.includes(q.category));
      
      // 70% de questões fracas, 30% de outras
      const weakCount = Math.floor(config.questionsCount * 0.7);
      const otherCount = config.questionsCount - weakCount;
      
      questions = [
        ...shuffleArray(weakQuestions).slice(0, weakCount),
        ...shuffleArray(otherQuestions).slice(0, otherCount)
      ];
    }

    // Limitar quantidade
    questions = shuffleArray(questions).slice(0, config.questionsCount);
    
    return questions;
  };

  const [shuffledQuestions] = useState(() => getQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [startTime] = useState(Date.now());

  const totalQuestions = shuffledQuestions.length;
  const answeredQuestions = new Set(Object.keys(answers).map(Number));
  const currentQuestionData = shuffledQuestions.find(q => q.id === currentQuestion);

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionSelect = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const calculateResults = (): ExamResult => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctAnswers = 0;
    const resultAnswers: ExamResult['answers'] = {};
    const categoryPerformance: Record<string, { correct: number; total: number }> = {};

    shuffledQuestions.forEach(question => {
      const selectedAnswer = answers[question.id] || '';
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      resultAnswers[question.id] = {
        selected: selectedAnswer,
        correct: question.correctAnswer,
        isCorrect
      };

      // Estatísticas por categoria
      if (!categoryPerformance[question.category]) {
        categoryPerformance[question.category] = { correct: 0, total: 0 };
      }
      categoryPerformance[question.category].total++;
      if (isCorrect) categoryPerformance[question.category].correct++;
    });

    const score = correctAnswers;
    const passed = (correctAnswers / totalQuestions) >= 0.72;

    // Salvar no histórico
    const examHistory: ExamHistory = {
      id: `exam_${Date.now()}`,
      date: Date.now(),
      score,
      totalQuestions,
      correctAnswers,
      passed,
      timeSpent,
      questionsCount: config.questionsCount,
      timerEnabled: config.timerEnabled,
      categoryPerformance
    };

    StatisticsManager.addExamResult(examHistory);

    return {
      score,
      totalQuestions,
      correctAnswers,
      passed,
      timeSpent,
      answers: resultAnswers
    };
  };

  const handleFinishExam = () => {
    const unansweredCount = totalQuestions - answeredQuestions.size;
    
    if (unansweredCount > 0) {
      const confirmFinish = window.confirm(
        `Você ainda tem ${unansweredCount} questão(ões) não respondida(s). Deseja finalizar mesmo assim?`
      );
      if (!confirmFinish) return;
    }

    const result = calculateResults();
    setExamResult(result);
    setIsFinished(true);
  };

  const handleTimeUp = () => {
    const result = calculateResults();
    setExamResult(result);
    setIsFinished(true);
  };

  const handleReviewQuestion = (questionId: number) => {
    setReviewMode(true);
    setCurrentQuestion(questionId);
  };

  const handleRetakeExam = () => {
    onBackToConfig();
  };

  // Resultados
  if (isFinished && examResult && !reviewMode) {
    return (
      <ExamResultsScreenNew
        result={examResult}
        questions={shuffledQuestions}
        onReviewQuestion={handleReviewQuestion}
        onRetakeExam={handleRetakeExam}
        onBackToDiagram={onBackToDiagram}
      />
    );
  }

  // Scroll para o topo ao mudar de questão
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-white border-r border-gray-200 p-6 lg:overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={28} className="text-orange-600" />
              <h1 className="text-xl font-bold text-gray-900">AWS SAA-C03</h1>
            </div>
            <p className="text-sm text-gray-600">
              {config.questionsCount} questões • {config.timerEnabled ? `${config.timerMinutes}min` : 'Sem limite'}
            </p>
            {config.focusOnWeakness && (
              <div className="mt-2 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>Modo Inteligente</span>
              </div>
            )}
          </div>

          {/* Timer */}
          {!reviewMode && config.timerEnabled && (
            <div className="mb-6">
              <ExamTimer initialMinutes={config.timerMinutes} onTimeUp={handleTimeUp} />
            </div>
          )}

          {reviewMode && (
            <div className="mb-6 bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <BookOpen size={20} />
                <span className="font-semibold">Modo Revisão</span>
              </div>
            </div>
          )}

          {/* Progresso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progresso</span>
              <span className="text-sm text-gray-600">
                {answeredQuestions.size}/{totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredQuestions.size / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Questão {currentQuestion} de {totalQuestions}
            </p>
          </div>

          {/* Navegador de questões */}
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            answeredQuestions={answeredQuestions}
            onQuestionSelect={handleQuestionSelect}
          />

          {/* Botão finalizar */}
          {!reviewMode && (
            <button
              onClick={handleFinishExam}
              className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Flag size={20} />
              Finalizar Prova
            </button>
          )}

          {reviewMode && (
            <button
              onClick={() => {
                setReviewMode(false);
                setIsFinished(false);
              }}
              className="w-full mt-6 bg-white hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border-2 border-gray-200"
            >
              ← Voltar aos Resultados
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-80 p-4 md:p-8">
          {currentQuestionData && (
            <>
              <ExamQuestionCard
                question={currentQuestionData}
                selectedAnswer={answers[currentQuestion] || null}
                onAnswerSelect={handleAnswerSelect}
                showResults={reviewMode}
              />

              {/* Navegação */}
              <div className="flex justify-between items-center mt-6 gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 shadow-md hover:shadow-lg"
                >
                  <ChevronLeft size={20} />
                  Anterior
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Questão {currentQuestion} de {totalQuestions}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === totalQuestions}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
                >
                  Próxima
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
