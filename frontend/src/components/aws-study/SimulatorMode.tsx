import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, Trophy } from 'lucide-react';
import { PracticeConfig } from './PracticeConfigScreen';
import { StatisticsManager } from '@/utils/statisticsManager';
import { ExamHistory } from '@/types/aws-study';

interface SimulatorModeProps {
  config: PracticeConfig;
  onBack: () => void;
  questions: any[]; // In real app would import ExamQuestion type
}

export function SimulatorMode({ config, onBack, questions }: SimulatorModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [answerConfirmed, setAnswerConfirmed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(config.hasTimer && config.timeLimit ? config.timeLimit * 60 : 0);
  const [isFinished, setIsFinished] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const resultsSavedRef = useRef<boolean>(false);

  // Select questions based on config
  const selectedQuestions = questions.slice(0, config.questionCount);
  const currentQuestion = selectedQuestions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (!config.hasTimer || isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.hasTimer, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    if (!answerConfirmed) {
      setSelectedAnswer(answer);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer) {
      setUserAnswers({ ...userAnswers, [currentQuestion.id]: selectedAnswer });
      setAnswerConfirmed(true);
    }
  };

  const moveToNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswerConfirmed(false);
    
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };
  
  const isCorrect = answerConfirmed && selectedAnswer === currentQuestion.correctAnswer;

  const calculateScore = () => {
    let correct = 0;
    selectedQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: selectedQuestions.length,
      percentage: Math.round((correct / selectedQuestions.length) * 100)
    };
  };

  // Save results when finished
  const saveResults = () => {
    if (resultsSavedRef.current) return;
    resultsSavedRef.current = true;
    
    const score = calculateScore();
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    
    // Calculate category performance from answered questions
    const categoryPerformance: Record<string, { correct: number; total: number }> = {};
    selectedQuestions.forEach((q) => {
      const category = q.topic || q.category || q.domain || 'Simulador';
      if (!categoryPerformance[category]) {
        categoryPerformance[category] = { correct: 0, total: 0 };
      }
      categoryPerformance[category].total++;
      if (userAnswers[q.id] === q.correctAnswer) {
        categoryPerformance[category].correct++;
      }
    });
    
    const examHistory: ExamHistory = {
      id: `sim-${Date.now()}`,
      date: new Date(),
      score: score.percentage,
      totalQuestions: score.total,
      correctAnswers: score.correct,
      passed: score.percentage >= 72,
      timeSpent,
      questionsCount: score.total as 10 | 20 | 40 | 65,
      timerEnabled: config.hasTimer,
      categoryPerformance,
    };
    
    StatisticsManager.addExamResult(examHistory);
  };

  // Final Result Screen
  if (isFinished) {
    const score = calculateScore();
    
    // Save results to statistics
    saveResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score.percentage >= 70 ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              <Trophy className={score.percentage >= 70 ? 'text-green-600' : 'text-orange-600'} size={48} />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Simulador Concluído!
            </h1>
            
            <div className="text-6xl font-bold mb-6" style={{
              background: score.percentage >= 70 ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {score.percentage}%
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-gray-900">{score.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">{score.correct}</div>
                <div className="text-sm text-gray-600">Corretas</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-red-600">{score.total - score.correct}</div>
                <div className="text-sm text-gray-600">Erradas</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Sair
            </button>
            
            {config.hasTimer && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock size={20} />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Progresso</div>
              <div className="text-2xl font-bold text-gray-900">
                {currentQuestionIndex + 1} / {selectedQuestions.length}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Context */}
        {currentQuestion.context && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Contexto:</h3>
                <p className="text-blue-800 leading-relaxed">{currentQuestion.context}</p>
              </div>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option: any) => {
              const isThisOptionCorrect = option.label === currentQuestion.correctAnswer;
              const isThisOptionSelected = selectedAnswer === option.label;
              
              let optionStyle = 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white';
              let circleStyle = 'bg-gray-100 text-gray-600';
              
              if (answerConfirmed) {
                if (isThisOptionCorrect) {
                  optionStyle = 'border-green-500 bg-green-50 shadow-lg';
                  circleStyle = 'bg-green-600 text-white';
                } else if (isThisOptionSelected && !isThisOptionCorrect) {
                  optionStyle = 'border-red-500 bg-red-50 shadow-lg';
                  circleStyle = 'bg-red-600 text-white';
                }
              } else if (isThisOptionSelected) {
                optionStyle = 'border-blue-500 bg-blue-50 shadow-lg';
                circleStyle = 'bg-blue-600 text-white';
              }
              
              return (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.label)}
                  disabled={answerConfirmed}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${optionStyle} ${answerConfirmed ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${circleStyle}`}>
                      {answerConfirmed && isThisOptionCorrect ? (
                        <CheckCircle size={20} />
                      ) : answerConfirmed && isThisOptionSelected && !isThisOptionCorrect ? (
                        <XCircle size={20} />
                      ) : (
                        option.label
                      )}
                    </div>
                    <p className="text-gray-900 leading-relaxed flex-1">{option.text}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inline Feedback */}
          {answerConfirmed && config.showFeedback && (
            <div className={`mt-6 rounded-xl p-6 ${isCorrect ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'}`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <CheckCircle className="text-green-600" size={32} />
                ) : (
                  <XCircle className="text-red-600" size={32} />
                )}
                <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correto! 🎉' : 'Incorreto'}
                </h3>
              </div>
              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Explicação:</h4>
                <p className="text-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Confirm/Next Button */}
        {!answerConfirmed ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedAnswer}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              selectedAnswer
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-2xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            onClick={moveToNextQuestion}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-2xl"
          >
            {currentQuestionIndex < selectedQuestions.length - 1 ? 'Próxima Questão →' : 'Ver Resultado Final'}
          </button>
        )}
      </div>
    </div>
  );
}
