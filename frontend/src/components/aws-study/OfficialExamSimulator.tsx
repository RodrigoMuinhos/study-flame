// Official Exam Simulator - Simulador específico para o exame oficial SAA-C03
// Usa os bancos de questões reais e simula experiência idêntica à prova AWS

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flag, BookOpen, AlertTriangle } from 'lucide-react';
import { ExamTimer } from './ExamTimer';
import { ExamResultsScreenNew } from './ExamResultsScreenNew';
import { ExamQuestion as BankExamQuestion } from '@/data/examQuestionsBank1';
import { ExamQuestion as TypeExamQuestion, ExamResult, ExamHistory } from '@/types/aws-study';
import { StatisticsManager } from '@/utils/statisticsManager';

interface OfficialExamSimulatorProps {
  examQuestions: BankExamQuestion[];
  timeLimit: number; // em minutos
  onBack: () => void;
}

// Função para converter BankExamQuestion para TypeExamQuestion (para compatibilidade com ExamResultsScreenNew)
function convertToTypeQuestion(q: BankExamQuestion): TypeExamQuestion {
  return {
    id: q.id,
    question: q.question,
    context: `Domínio: ${q.domain} | Dificuldade: ${q.difficulty}`,
    options: q.options.map((text, index) => ({
      label: String.fromCharCode(65 + index), // A, B, C, D
      text
    })),
    correctAnswer: Array.isArray(q.correctAnswer) 
      ? q.correctAnswer.map(i => String.fromCharCode(65 + i)).join(',')
      : String.fromCharCode(65 + q.correctAnswer),
    explanation: q.explanation,
    relatedService: q.domain,
    category: q.domain
  };
}

export function OfficialExamSimulator({ examQuestions, timeLimit, onBack }: OfficialExamSimulatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [startTime] = useState(Date.now());

  const totalQuestions = examQuestions.length;
  const currentQuestion = examQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  // Scroll to top quando mudar questão
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (optionIndex: number) => {
    const question = currentQuestion;
    
    if (question.multipleChoice) {
      // Múltipla escolha: toggle selection
      const current = (selectedAnswer as number[]) || [];
      const newAnswer = current.includes(optionIndex)
        ? current.filter(i => i !== optionIndex)
        : [...current, optionIndex];
      
      setAnswers(prev => ({
        ...prev,
        [question.id]: newAnswer
      }));
    } else {
      // Escolha simples
      setAnswers(prev => ({
        ...prev,
        [question.id]: optionIndex
      }));
    }
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
      } else {
        newSet.add(currentQuestion.id);
      }
      return newSet;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const calculateResults = (): ExamResult => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctAnswers = 0;

    const categoryPerformance: Record<string, { correct: number; total: number }> = {};

    examQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      const isCorrect = Array.isArray(q.correctAnswer)
        ? JSON.stringify([...(userAnswer as number[] || [])].sort()) === JSON.stringify([...q.correctAnswer].sort())
        : userAnswer === q.correctAnswer;

      if (isCorrect) correctAnswers++;

      // Atualizar performance por categoria/domínio
      const category = q.domain;
      if (!categoryPerformance[category]) {
        categoryPerformance[category] = { correct: 0, total: 0 };
      }
      categoryPerformance[category].total++;
      if (isCorrect) categoryPerformance[category].correct++;
    });

    const score = correctAnswers;
    const passed = (correctAnswers / totalQuestions) >= 0.72;

    // Salvar no histórico
    const examHistory: ExamHistory = {
      id: `official_exam_${Date.now()}`,
      date: new Date(),
      score,
      totalQuestions,
      correctAnswers,
      passed,
      timeSpent,
      questionsCount: totalQuestions as 10 | 20 | 40 | 65,
      timerEnabled: true,
      categoryPerformance
    };

    StatisticsManager.addExamResult(examHistory);

    return {
      score,
      totalQuestions,
      correctAnswers,
      passed,
      timeSpent,
      answers: {}
    };
  };

  const handleFinishExam = () => {
    const unansweredCount = totalQuestions - Object.keys(answers).length;
    
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
    alert('⏰ Tempo esgotado! O exame será finalizado automaticamente.');
    const result = calculateResults();
    setExamResult(result);
    setIsFinished(true);
  };

  const handleReviewQuestion = (questionId: number) => {
    const index = examQuestions.findIndex(q => q.id === questionId);
    if (index !== -1) {
      setCurrentQuestionIndex(index);
      setIsFinished(false);
    }
  };

  const handleRetakeExam = () => {
    onBack();
  };

  // Resultados
  if (isFinished && examResult) {
    // Converter questões para o formato esperado
    const convertedQuestions = examQuestions.map(convertToTypeQuestion);
    
    return (
      <ExamResultsScreenNew
        result={examResult}
        questions={convertedQuestions}
        onReviewQuestion={handleReviewQuestion}
        onRetakeExam={handleRetakeExam}
        onBackToDiagram={onBack}
      />
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Question Card - NO TOPO */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Question - Destaque Principal */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Header compacto */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-bold text-sm">
              Questão {currentQuestionIndex + 1} de {totalQuestions}
            </div>
            
            <button
              onClick={toggleMarkForReview}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                markedForReview.has(currentQuestion.id)
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Flag size={16} />
              {markedForReview.has(currentQuestion.id) ? 'Marcada' : 'Marcar'}
            </button>
          </div>

          {currentQuestion.multipleChoice && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-lg flex items-start gap-3">
              <AlertTriangle className="text-orange-600 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-orange-700">Atenção:</span> Esta questão possui múltiplas respostas corretas. Selecione TODAS as opções corretas.
              </p>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.multipleChoice
                ? (selectedAnswer as number[] || []).includes(index)
                : selectedAnswer === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`
                    w-full text-left p-5 rounded-xl border-2 transition-all
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300 text-gray-400'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-900 leading-relaxed flex-1">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel de Controle - ABAIXO DA QUESTÃO */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Timer */}
            <div>
              <ExamTimer
                initialMinutes={timeLimit}
                onTimeUp={handleTimeUp}
              />
            </div>

            {/* Progresso */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">Progresso</span>
                <span className="text-xs font-bold text-blue-600">{answeredCount}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-600">
                {totalQuestions - answeredCount} questões restantes
              </div>
            </div>

            {/* Legenda */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-gray-600">Respondida</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-500"></div>
                <span className="text-gray-600">Marcada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gray-200"></div>
                <span className="text-gray-600">Não respondida</span>
              </div>
            </div>

            {/* Botão Finalizar */}
            <div>
              <button
                onClick={handleFinishExam}
                className="w-full h-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Flag size={16} />
                Finalizar Exame
              </button>
            </div>
          </div>

          {/* Navegador de questões - 15 colunas */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-3">Navegação</h3>
            <div className="grid grid-cols-15 gap-1">
              {examQuestions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedForReview.has(q.id);
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionNavigate(index)}
                    className={`
                      w-full aspect-square rounded text-[9px] font-semibold transition-all flex items-center justify-center
                      ${isCurrent ? 'ring-1 ring-blue-500' : ''}
                      ${isAnswered && !isMarked ? 'bg-green-500 text-white hover:bg-green-600' : ''}
                      ${isMarked ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}
                      ${!isAnswered && !isMarked ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : ''}
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
