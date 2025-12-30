import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flag, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { ExamTimer } from './ExamTimer';
import { QuestionNavigator } from './QuestionNavigator';
import { ExamQuestionCard } from './ExamQuestionCard';
import { ExamResultsScreenNew } from './ExamResultsScreenNew';
import { ExamResult, ExamQuestion } from '@/types/aws-study';
import { ExamConfig } from './ExamConfigScreen';
import { StatisticsManager } from '@/utils/statisticsManager';
import { ExamHistory } from '@/types/aws-study';
import { awsExamService } from '@/services/api';

interface ExamSimulatorNewProps {
  config: ExamConfig;
  onBackToConfig: () => void;
  onBackToDiagram: () => void;
}

export function ExamSimulatorNew({ config, onBackToConfig, onBackToDiagram }: ExamSimulatorNewProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [startTime] = useState(Date.now());

  // Função para embaralhar array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Buscar questões do banco ao montar o componente
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        
        let questions: ExamQuestion[] = [];
        
        // Se modo misto estiver habilitado e tiver topicMix configurado
        if (config.mixedMode && config.topicMix && config.topicMix.length > 0) {
          questions = await awsExamService.getMixedQuestions(config.topicMix);
        } else {
          // Modo simples - busca questões aleatórias
          questions = await awsExamService.getRandomQuestions(config.questionsCount);
        }
        
        // Embaralhar as opções de cada questão
        const questionsWithShuffledOptions = questions.map(q => {
          const filteredOptions = q.options.filter(opt => opt && opt.trim() !== '').slice(0, 4);
          const shuffledOptions = shuffleArray(filteredOptions);
          
          return {
            ...q,
            options: shuffledOptions
          };
        });
        
        setShuffledQuestions(questionsWithShuffledOptions);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar questões:', err);
        setError('Erro ao carregar questões. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [config.questionsCount, config.mixedMode, config.topicMix]);

  // Scroll para o topo ao mudar de questão
  useEffect(() => {
    if (!loading && shuffledQuestions.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex, loading, shuffledQuestions.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando questões...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao Carregar</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onBackToConfig}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = shuffledQuestions.length;
  const answeredQuestions = new Set(Object.keys(answers));
  const currentQuestionData = shuffledQuestions[currentQuestionIndex];
  const currentQuestion = currentQuestionIndex + 1; // 1-based para display

  // Calcular questões corretas e incorretas para o navegador
  const correctQuestions = new Set<number>();
  const incorrectQuestions = new Set<number>();
  if (config.feedbackEnabled) {
    shuffledQuestions.forEach((q, index) => {
      if (answers[q.id]) {
        const questionNumber = index + 1;
        const optionLabels = ['A', 'B', 'C', 'D'];
        const selectedLetter = answers[q.id];
        const letterIndex = optionLabels.indexOf(selectedLetter);
        
        // Pegar o texto da opção selecionada
        const filteredOptions = q.options.filter(opt => opt && opt.trim() !== '').slice(0, 4);
        const selectedOptionText = letterIndex >= 0 && letterIndex < filteredOptions.length 
          ? filteredOptions[letterIndex] 
          : '';
        
        // Encontrar qual letra corresponde à resposta correta
        const correctIndex = filteredOptions.findIndex(opt => opt === q.correctAnswer);
        const correctLetter = correctIndex >= 0 ? optionLabels[correctIndex] : 'N/A';
        
        console.log('Questão', questionNumber, ':', {
          'Opções filtradas': filteredOptions,
          'Letra selecionada': selectedLetter,
          'Índice da letra': letterIndex,
          'Texto selecionado': selectedOptionText,
          'Resposta correta (texto)': q.correctAnswer,
          'Índice da resposta correta': correctIndex,
          'Letra correta': correctLetter,
          'Acertou?': selectedOptionText === q.correctAnswer
        });
        
        if (selectedOptionText === q.correctAnswer) {
          correctQuestions.add(questionNumber);
        } else {
          incorrectQuestions.add(questionNumber);
        }
      }
    });
  }

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestionData) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: answer
    }));
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

  const handleQuestionSelect = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const calculateResults = (): ExamResult => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctAnswers = 0;
    const resultAnswers: ExamResult['answers'] = {};
    const categoryPerformance: Record<string, { correct: number; total: number }> = {};

    shuffledQuestions.forEach(question => {
      const selectedLetter = answers[question.id] || '';
      const optionLabels = ['A', 'B', 'C', 'D'];
      const letterIndex = optionLabels.indexOf(selectedLetter);
      
      // Converter letra para texto da opção
      const filteredOptions = question.options.filter(opt => opt && opt.trim() !== '').slice(0, 4);
      const selectedAnswerText = letterIndex >= 0 && letterIndex < filteredOptions.length 
        ? filteredOptions[letterIndex] 
        : '';
      
      const isCorrect = selectedAnswerText === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;

      resultAnswers[question.id] = {
        selected: selectedLetter,
        correct: question.correctAnswer,
        isCorrect
      };

      // Estatísticas por domínio
      const domainKey = question.domain ?? 'general';
      if (!categoryPerformance[domainKey]) {
        categoryPerformance[domainKey] = { correct: 0, total: 0 };
      }
      categoryPerformance[domainKey].total++;
      if (isCorrect) categoryPerformance[domainKey].correct++;
    });

    const score = correctAnswers;
    const passed = (correctAnswers / totalQuestions) >= 0.72;

    // Salvar no histórico
    const examHistory: ExamHistory = {
      id: `exam_${Date.now()}`,
      date: new Date(),
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

  const handleReviewQuestion = (questionId: string) => {
    setReviewMode(true);
    const index = shuffledQuestions.findIndex(q => q.id === questionId);
    if (index !== -1) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleRetakeExam = () => {
    onBackToConfig();
  };

  // Converter ExamQuestion para formato compatível com ExamResultsScreenNew
  const convertQuestionsForResults = (questions: ExamQuestion[]) => {
    return questions.map(q => ({
      ...q,
      context: `${q.domain || 'AWS'} | ${q.difficulty || 'Medium'}`,
      category: q.domain || q.category || 'AWS',
      options: q.options
        .filter(opt => opt && opt.trim() !== '')
        .slice(0, 4)
        .map((text, index) => ({
          label: String.fromCharCode(65 + index), // A, B, C, D
          text: text
        }))
    }));
  };

  // Resultados
  if (isFinished && examResult && !reviewMode) {
    const convertedQuestions = convertQuestionsForResults(shuffledQuestions);
    
    return (
      <ExamResultsScreenNew
        result={examResult}
        questions={convertedQuestions as any}
        onReviewQuestion={handleReviewQuestion}
        onRetakeExam={handleRetakeExam}
        onBackToDiagram={onBackToDiagram}
      />
    );
  }

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
            correctQuestions={correctQuestions}
            incorrectQuestions={incorrectQuestions}
            showFeedback={config.feedbackEnabled && !reviewMode}
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
                questionNumber={currentQuestion}
                selectedAnswer={answers[currentQuestionData.id] || null}
                onAnswerSelect={handleAnswerSelect}
                showResults={reviewMode || (config.feedbackEnabled && !!answers[currentQuestionData.id])}
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
