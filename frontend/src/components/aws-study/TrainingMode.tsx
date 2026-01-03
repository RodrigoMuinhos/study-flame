import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, XCircle, Flag } from 'lucide-react';
import { TrainingQuestion, TrainingResult } from '@/types/aws-study';
import { TrainingResultScreen } from './TrainingResultScreen';
import { useAWSStudy } from '@/contexts/AWSStudyContext';
import { awsExamService } from '@/services/api';

interface TrainingModeProps {
  topicId: string;
  onBack: () => void;
}

// Função para converter ExamQuestion para TrainingQuestion
function convertToTrainingQuestion(examQ: any): TrainingQuestion {
  return {
    id: examQ.id,
    question: examQ.question,
    context: examQ.explanation.split('.')[0] + '.', // Usar primeira sentença da explicação como contexto
    options: examQ.options.map((opt: string, idx: number) => ({
      label: String.fromCharCode(65 + idx), // A, B, C, D
      text: opt
    })),
    correctAnswer: Array.isArray(examQ.correctAnswer) 
      ? String.fromCharCode(65 + examQ.correctAnswer[0]) 
      : String.fromCharCode(65 + examQ.correctAnswer),
    explanation: examQ.explanation,
    relatedService: examQ.domain,
    topic: examQ.domain
  };
}

export function TrainingMode({ topicId, onBack }: TrainingModeProps) {
  const { currentCertification } = useAWSStudy();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [questions, setQuestions] = useState<TrainingQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para embaralhar array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Buscar 20 questões do banco ao montar
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar 20 questões aleatórias do backend
        const examQuestions = await awsExamService.getRandomQuestions(20);
        
        console.log('Questões recebidas do backend:', examQuestions);
        console.log('Primeira questão:', examQuestions[0]);
        
        // Converter para formato TrainingQuestion - limitando a 4 opções
        const trainingQs: TrainingQuestion[] = examQuestions.map((q, idx) => {
          // Garantir que options é um array válido e filtrar vazios
          const options = Array.isArray(q.options) 
            ? q.options.filter(opt => opt && opt.trim() !== '') 
            : [];
          
          // Pegar apenas 4 opções e embaralhar
          const fourOptions = options.slice(0, 4);
          const shuffledOptions = shuffleArray(fourOptions);
          
          return {
            id: idx + 1,
            question: q.question,
            context: q.explanation?.split('.')[0] + '.' || '',
            options: shuffledOptions.map((opt, optIdx) => ({
              label: String.fromCharCode(65 + optIdx),
              text: opt
            })),
            correctAnswer: q.correctAnswer, // Mantém o texto da resposta correta
            explanation: q.explanation || '',
            relatedService: q.domain || topicId,
            topic: (q as any).topic || q.domain || topicId
          };
        });
        
        console.log('Questões convertidas:', trainingQs);
        
        setQuestions(trainingQs);
      } catch (err) {
        console.error('Erro ao buscar questões:', err);
        setError('Não foi possível carregar as questões. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId]);
  const currentQuestionData = questions.find(q => q.id === currentQuestion);
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;

    // Converter letra selecionada para texto da opção
    const selectedOption = currentQuestionData?.options.find(opt => opt.label === answer);
    const selectedText = selectedOption?.text || '';
    
    // Comparar texto da opção com texto da resposta correta
    const isCorrect = selectedText === currentQuestionData?.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: { selected: answer, isCorrect }
    }));
    
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      calculateResults();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
      setShowFeedback(!!answers[currentQuestion - 1]);
    }
  };

  const calculateResults = () => {
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const incorrectAnswers = Object.values(answers).filter(a => !a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (score >= 80) {
      strengths.push('Excelente compreensão geral do tópico');
    }
    if (score < 60) {
      weaknesses.push('Revisar conceitos fundamentais');
    }

    const recommendation = score >= 80 
      ? `Parabéns! Você domina ${topicId}. Considere praticar outros tópicos.`
      : score >= 60
      ? `Bom desempenho! Revise as questões erradas e tente novamente para consolidar o conhecimento.`
      : `Recomendamos revisar o diagrama interativo e estudar mais sobre ${topicId} antes de tentar novamente.`;

    const trainingResult: TrainingResult = {
      topic: topicId,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      score,
      strengths,
      weaknesses,
      recommendation
    };

    setResult(trainingResult);
    setIsFinished(true);
  };

  const handleFinish = () => {
    const unansweredCount = totalQuestions - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirmFinish = window.confirm(
        `Você ainda tem ${unansweredCount} questão(ões) não respondida(s). Deseja finalizar mesmo assim?`
      );
      if (!confirmFinish) return;
    }

    calculateResults();
  };

  const handleRetry = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
    setResult(null);
    // Recarregar questões
    setLoading(true);
    awsExamService.getRandomQuestions(20).then(examQuestions => {
      const trainingQs: TrainingQuestion[] = examQuestions.map((q, idx) => {
        // Filtrar opções vazias
        const options = Array.isArray(q.options) 
          ? q.options.filter(opt => opt && opt.trim() !== '') 
          : [];
        
        // Pegar apenas 4 opções e embaralhar
        const fourOptions = options.slice(0, 4);
        const shuffledOptions = shuffleArray(fourOptions);
        
        return {
          id: idx + 1,
          question: q.question,
          context: q.explanation?.split('.')[0] + '.' || '',
          options: shuffledOptions.map((opt, optIdx) => ({
            label: String.fromCharCode(65 + optIdx),
            text: opt
          })),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || '',
          relatedService: q.domain || topicId,
          topic: (q as any).topic || q.domain || topicId
        };
      });
      setQuestions(trainingQs);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError('Erro ao recarregar questões');
      setLoading(false);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando 20 questões de treino...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-gray-600 mb-4">{error || 'Nenhuma questão encontrada'}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (isFinished && result) {
    return (
      <TrainingResultScreen
        result={result}
        questions={questions}
        answers={answers}
        onRetry={handleRetry}
        onBack={onBack}
      />
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Questão não encontrada</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-3 px-3 md:py-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header e Controles - NO TOPO */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-5 lg:p-6 mb-3 md:mb-4">
          {/* Mobile: Stack vertical, Desktop: Grid */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-4">
            {/* Info do Treino */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={18} className="text-orange-600" />
                <h1 className="text-sm font-bold text-gray-900">Modo Treino</h1>
              </div>
              <p className="text-xs text-gray-700 truncate">{topicId}</p>
              <p className="text-[10px] text-blue-700 mt-1">⏱ Sem limite de tempo</p>
            </div>

            {/* Mobile: Row com Progresso e Acertos lado a lado */}
            <div className="grid grid-cols-2 gap-2 md:contents">
              {/* Progresso */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2.5 md:p-3">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <span className="text-[10px] md:text-xs font-semibold text-gray-700">Progresso</span>
                  <span className="text-[10px] md:text-xs font-bold text-blue-600">{Object.keys(answers).length}/{totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2 mb-1 md:mb-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 md:h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
                  />
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-600">
                  Q {currentQuestion}/{totalQuestions}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2.5 md:p-3">
                <div className="text-[10px] md:text-xs font-semibold text-gray-700 mb-0.5 md:mb-1">Acertos</div>
                <div className="text-xl md:text-2xl font-bold text-green-600">
                  {Object.values(answers).filter(a => a.isCorrect).length}
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-600 mt-0.5 md:mt-1">
                  de {Object.keys(answers).length} resp.
                </div>
              </div>
            </div>

            {/* Botão Finalizar */}
            <div className="md:contents">
              <button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Flag size={14} />
                Finalizar
              </button>
            </div>
          </div>

          {/* Navegação de Questões */}
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
            <h3 className="text-[10px] md:text-xs font-semibold text-gray-700 mb-2">Navegação das Questões</h3>
            <div className="grid grid-cols-10 gap-1 md:gap-2">
              {questions.map((q) => {
                const answer = answers[q.id];
                const isCurrent = q.id === currentQuestion;
                
                let bgColor = 'bg-gray-100';
                let textColor = 'text-gray-700';
                
                if (isCurrent) {
                  bgColor = 'bg-blue-600';
                  textColor = 'text-white';
                } else if (answer) {
                  if (answer.isCorrect) {
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-700';
                  } else {
                    bgColor = 'bg-red-100';
                    textColor = 'text-red-700';
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(q.id);
                      setShowFeedback(!!answers[q.id]);
                    }}
                    className={`${bgColor} ${textColor} rounded-lg p-1.5 md:p-2 text-[10px] md:text-xs font-medium transition-all min-h-[28px] md:min-h-[32px] flex items-center justify-center hover:opacity-80 active:scale-95`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-3 md:p-6 lg:p-8 mb-3 md:mb-4">
          <div className="mb-2 md:mb-3">
            <span className="text-xs md:text-sm font-semibold text-orange-600 bg-orange-50 px-2 md:px-3 py-1 rounded-full">
              Questão {currentQuestionData.id}
            </span>
          </div>

          <h2 className="text-base md:text-xl lg:text-2xl text-gray-900 mb-2 md:mb-3 leading-relaxed font-semibold">
            {currentQuestionData.question}
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-2 md:p-3 mb-3 md:mb-4 rounded">
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-700">Contexto: </span>
                {currentQuestionData.context}
              </p>
            </div>

            <div className="space-y-2">
              {currentQuestionData.options.map((option) => {
                const isSelected = currentAnswer?.selected === option.label;
                const isCorrect = option.label === currentQuestionData.correctAnswer;
                
                let borderColor = 'border-gray-300';
                let bgColor = 'bg-white hover:bg-gray-50';
                let textColor = 'text-gray-900';

                if (showFeedback) {
                  if (isCorrect) {
                    borderColor = 'border-green-500';
                    bgColor = 'bg-green-50';
                    textColor = 'text-green-900';
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'border-red-500';
                    bgColor = 'bg-red-50';
                    textColor = 'text-red-900';
                  }
                } else if (isSelected) {
                  borderColor = 'border-orange-500';
                  bgColor = 'bg-orange-50';
                  textColor = 'text-orange-900';
                }

                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={showFeedback}
                    className={`w-full text-left border-2 ${borderColor} ${bgColor} ${textColor} rounded-lg p-3 md:p-4 transition-all ${
                      !showFeedback ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className={`flex-shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-sm md:text-base ${
                        showFeedback && isCorrect 
                          ? 'bg-green-600 text-white' 
                          : showFeedback && isSelected && !isCorrect
                          ? 'bg-red-600 text-white'
                          : isSelected 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {showFeedback && isCorrect ? '✓' : showFeedback && isSelected && !isCorrect ? '✗' : option.label}
                      </div>
                      <p className="flex-1 leading-relaxed pt-0.5 md:pt-1 text-sm md:text-base lg:text-lg">{option.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`mt-3 md:mt-4 border-2 rounded-lg p-3 md:p-4 ${
                currentAnswer?.isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentAnswer?.isCorrect ? (
                    <>
                      <CheckCircle size={18} className="text-green-600" />
                      <h3 className="font-bold text-green-900 text-sm md:text-base">Correto! 🎉</h3>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-red-600" />
                      <h3 className="font-bold text-red-900 text-sm md:text-base">Incorreto</h3>
                    </>
                  )}
                </div>
                
                <div className="bg-white bg-opacity-50 rounded-lg p-2 md:p-3">
                  <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1">💡 Explicação:</p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {currentQuestionData.explanation}
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Navegação Anterior/Próxima */}
        <div className="flex justify-between items-center gap-2 md:gap-3">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 shadow-md hover:shadow-lg"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Anterior</span>
            <span className="sm:hidden">Ant.</span>
          </button>

          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-600">
              {currentQuestion}/{totalQuestions}
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!showFeedback}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 px-3 md:px-6 py-2.5 md:py-3 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
          >
            <span className="hidden sm:inline">{currentQuestion === totalQuestions ? 'Finalizar' : 'Próxima'}</span>
            <span className="sm:hidden">{currentQuestion === totalQuestions ? 'Fim' : 'Próx.'}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
