'use client';

// ============================================================================
// PÁGINA: PROVA ATIVA
// ============================================================================
// Tela principal onde o usuário faz a prova com timer, sidebar e navegação

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  loadExamState,
  updateAnswer,
  navigateToQuestion,
  finishExam,
  getRemainingTime,
  getAnsweredCount,
  hydrateBlueprint,
  formatTime,
  type ExamState,
  type ExamQuestion
} from '@/lib/exam-engine';

interface Props {
  params: Promise<{ examId: string }>;
}

export default function ActiveExamPage({ params }: Props) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [state, setState] = useState<ExamState | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(true);

  // Carrega estado e questões
  useEffect(() => {
    const loadExam = async () => {
      const savedState = loadExamState();
      
      if (!savedState || savedState.id !== resolvedParams.examId) {
        alert('Prova não encontrada ou expirada');
        router.push('/aws-study/exam');
        return;
      }
      
      if (savedState.finished) {
        router.push(`/aws-study/exam/${resolvedParams.examId}/review`);
        return;
      }
      
      setState(savedState);
      setRemainingTime(getRemainingTime(savedState));
      
      // Carrega questões
      const loadedQuestions = await hydrateBlueprint(savedState.blueprint);
      setQuestions(loadedQuestions);
      setCurrentQuestion(loadedQuestions[savedState.currentIndex]);
      setSelectedAnswer(savedState.answers[savedState.currentIndex] || null);
      
      setLoading(false);
    };
    
    loadExam();
  }, [resolvedParams.examId, router]);

  const timerEnabled = !!state?.settings?.timerEnabled && state.durationSec > 0;

  // Timer countdown
  useEffect(() => {
    if (!state || state.finished || !timerEnabled) return;

    const interval = setInterval(() => {
      const remaining = getRemainingTime(state);
      setRemainingTime(remaining);

      if (remaining <= 0) {
        handleFinish();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state, timerEnabled]);

  const handleSelectAnswer = (answer: string) => {
    if (!state) return;
    
    setSelectedAnswer(answer);
    const newState = updateAnswer(state, state.currentIndex, answer);
    setState(newState);
  };

  const handleNavigate = (index: number) => {
    if (!state || index < 0 || index >= questions.length) return;
    
    const newState = navigateToQuestion(state, index);
    setState(newState);
    setCurrentQuestion(questions[index]);
    setSelectedAnswer(newState.answers[index] || null);
  };

  const handleNext = () => {
    if (state && state.currentIndex < questions.length - 1) {
      handleNavigate(state.currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (state && state.currentIndex > 0) {
      handleNavigate(state.currentIndex - 1);
    }
  };

  const handleFinish = () => {
    if (!state) return;
    
    const unanswered = questions.length - getAnsweredCount(state);
    
    if (unanswered > 0) {
      const confirm = window.confirm(
        `Você tem ${unanswered} questões não respondidas. Deseja finalizar mesmo assim?`
      );
      if (!confirm) return;
    }
    
    finishExam(state);
    router.push(`/aws-study/exam/${resolvedParams.examId}/review`);
  };

  if (loading || !state || !currentQuestion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-700 text-xl">Carregando prova...</div>
      </div>
    );
  }

  const answeredCount = getAnsweredCount(state);
  const isLowTime = timerEnabled && remainingTime < 600; // Menos de 10 minutos

  const currentAnswer = state.answers[state.currentIndex] ?? null;
  const showFeedbackDuringExam = !!state.settings?.showFeedbackDuringExam;
  const showExplanationDuringExam = !!state.settings?.showExplanationDuringExam;
  const isCurrentCorrect =
    currentAnswer !== null && currentAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header fixo com tudo */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <h2 className="text-base font-semibold text-slate-800">
              Questão {state.currentIndex + 1} <span className="text-slate-400">/ {questions.length}</span>
            </h2>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium border border-purple-200">
              {currentQuestion.topic}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-200 rounded-full h-1.5">
                <div
                  className="bg-green-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-700">{answeredCount}/{questions.length}</span>
            </div>
            
            {/* Timer */}
            {timerEnabled && (
              <div className={`px-3 py-1 rounded-md font-mono font-semibold text-sm ${
                isLowTime ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {formatTime(remainingTime)}
              </div>
            )}
            
            {/* Botão Finalizar */}
            <button
              onClick={handleFinish}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-all"
            >
              Finalizar
            </button>
          </div>
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Apenas navegação */}
        <aside className="w-44 bg-slate-50 border-r border-slate-200 p-2 flex flex-col overflow-y-auto">
          {/* Grid de questões */}
          <div className="grid grid-cols-6 gap-1">
            {questions.map((_, index) => {
              const isAnswered = state.answers[index] !== null && state.answers[index] !== undefined;
              const isCurrent = index === state.currentIndex;
              
              // Verifica se a resposta está correta (apenas se feedback estiver ativo)
              const questionAnswer = state.answers[index];
              const isCorrect = questionAnswer !== null && questionAnswer === questions[index]?.correctAnswer;
              const isIncorrect = questionAnswer !== null && questionAnswer !== questions[index]?.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleNavigate(index)}
                  className={`aspect-square rounded text-xs font-medium transition-all relative ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : isAnswered
                      ? showFeedbackDuringExam && isCorrect
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : showFeedbackDuringExam && isIncorrect
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-slate-400 text-white hover:bg-slate-500'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {index + 1}
                  {/* Indicador visual ao lado */}
                  {isAnswered && showFeedbackDuringExam && (
                    <span className={`absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full ${
                      isCorrect ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white p-4">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Corpo da Questão */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex-1 flex flex-col">
              {/* Contexto (se houver) */}
              {currentQuestion.context && (
                <div className="bg-blue-50 border-l-2 border-blue-400 p-3 mb-4 rounded text-sm">
                  <div className="text-blue-700 font-medium text-xs mb-1 uppercase tracking-wide">Contexto</div>
                  <div className="text-slate-700 text-xs leading-relaxed">{currentQuestion.context}</div>
                </div>
              )}

              {/* Pergunta */}
              <div className="text-slate-800 text-sm mb-4 leading-relaxed font-medium">
                {currentQuestion.question}
              </div>

              {/* Opções */}
              <div className="space-y-2 flex-1">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.label;
                  const isAnswerLocked = selectedAnswer !== null;
                  
                  return (
                    <button
                      key={option.label}
                      onClick={() => !isAnswerLocked && handleSelectAnswer(option.label)}
                      disabled={isAnswerLocked && !isSelected}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-50 border-blue-400 shadow-sm'
                          : isAnswerLocked
                          ? 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {option.label}
                        </span>
                        <span className="flex-1 text-xs text-slate-700 leading-relaxed">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback imediato */}
              {showFeedbackDuringExam && currentAnswer !== null && (
                <div className={`mt-3 p-2 rounded-lg border ${
                  isCurrentCorrect
                    ? 'bg-green-50 border-green-400 text-green-800'
                    : 'bg-red-50 border-red-400 text-red-800'
                }`}>
                  <div className="font-medium text-xs">
                    {isCurrentCorrect ? '✅ Correta' : '❌ Incorreta'}
                    {!isCurrentCorrect && <span className="ml-2">Resposta: {currentQuestion.correctAnswer}</span>}
                  </div>
                </div>
              )}

              {showExplanationDuringExam && currentAnswer !== null && (
                <div className="mt-2 bg-blue-50 border-l-2 border-blue-400 p-2 rounded text-xs">
                  <div className="text-blue-700 font-medium mb-1">💡 Explicação</div>
                  <div className="text-slate-700 leading-relaxed">
                    {currentQuestion.explanation}
                  </div>
                </div>
              )}
              
              {/* Navegação inline */}
              <div className="flex justify-between mt-4 pt-3 border-t border-slate-200">
                <button
                  onClick={handlePrevious}
                  disabled={state.currentIndex === 0}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed text-slate-700 text-xs font-medium rounded transition-all"
                >
                  ← Anterior
                </button>
                <button
                  onClick={handleNext}
                  disabled={state.currentIndex === questions.length - 1}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-medium rounded transition-all"
                >
                  Próxima →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
