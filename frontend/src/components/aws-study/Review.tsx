import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, AlertCircle, TrendingDown, BookOpen, CheckCircle, XCircle, Flame, Target } from 'lucide-react';
import { StatisticsManager } from '@/utils/statisticsManager';
import { useCertification } from '@/contexts/AWSStudyContext';

interface ReviewProps {
  onBack: () => void;
}

interface ErrorPattern {
  category: string;
  errorCount: number;
  totalAttempts: number;
  accuracy: number;
  commonMistakes: string[];
}

export function Review({ onBack }: ReviewProps) {
  const { currentCertification } = useCertification();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showingQuestion, setShowingQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewProgress, setReviewProgress] = useState<Record<string, number>>({});

  const stats = StatisticsManager.getStats();
  
  // Analisar padrões de erro
  const getErrorPatterns = (): ErrorPattern[] => {
    return Object.values(stats.categoryStats)
      .filter(cat => cat.totalAttempts > 0 && cat.accuracy < 80)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map(cat => ({
        category: cat.category,
        errorCount: cat.totalAttempts - cat.correctAnswers,
        totalAttempts: cat.totalAttempts,
        accuracy: cat.accuracy,
        commonMistakes: [] // Poderia ser expandido com análise mais detalhada
      }));
  };

  const errorPatterns = getErrorPatterns();

  // Carregar progresso da revisão
  useEffect(() => {
    const saved = localStorage.getItem(`review-progress-${currentCertification}`);
    if (saved) {
      setReviewProgress(JSON.parse(saved));
    }
  }, [currentCertification]);

  // Salvar progresso
  useEffect(() => {
    localStorage.setItem(`review-progress-${currentCertification}`, JSON.stringify(reviewProgress));
  }, [reviewProgress, currentCertification]);

  const handleStartReview = (category: string) => {
    setSelectedCategory(category);
    setShowingQuestion(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
    // Atualizar progresso
    if (selectedCategory) {
      setReviewProgress(prev => ({
        ...prev,
        [selectedCategory]: (prev[selectedCategory] || 0) + 1
      }));
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleBackToCategories = () => {
    setShowingQuestion(false);
    setSelectedCategory(null);
  };

  // Mock de questões (substituir com dados reais)
  const getMockQuestions = (category: string) => {
    return [
      {
        question: `Questão de revisão sobre ${category}. Você errou questões similares anteriormente.`,
        options: [
          'Opção A - Resposta incorreta comum',
          'Opção B - Resposta correta',
          'Opção C - Resposta incorreta',
          'Opção D - Resposta incorreta'
        ],
        correctAnswer: 1,
        explanation: 'Esta é a explicação detalhada da resposta correta.'
      }
    ];
  };

  const totalErrorQuestions = errorPatterns.reduce((acc, pattern) => acc + pattern.errorCount, 0);
  const totalReviewedQuestions = Object.values(reviewProgress).reduce((acc, count) => acc + count, 0);

  if (showingQuestion && selectedCategory) {
    const questions = getMockQuestions(selectedCategory);
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Categoria Revisada!
            </h2>
            <p className="text-gray-600 mb-8">
              Você completou a revisão de <strong>{selectedCategory}</strong>
            </p>
            <button
              onClick={handleBackToCategories}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Voltar às Categorias
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={handleBackToCategories}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all mb-4"
            >
              <ArrowLeft size={20} />
              Voltar às Categorias
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
                  <p className="text-gray-600">Questão {currentQuestionIndex + 1} de {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">{reviewProgress[selectedCategory] || 0}</div>
                  <div className="text-sm text-gray-600">Revisadas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="text-orange-600" size={20} />
                </div>
                <p className="text-gray-900 text-lg leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showAnswer && isCorrect;
                const showIncorrect = showAnswer && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    } ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showCorrect
                          ? 'border-green-500 bg-green-500'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {showCorrect && <CheckCircle className="text-white" size={16} />}
                        {showIncorrect && <XCircle className="text-white" size={16} />}
                      </div>
                      <span className={`${
                        showCorrect ? 'text-green-900 font-semibold' : showIncorrect ? 'text-red-900' : 'text-gray-900'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Explicação:</h4>
                    <p className="text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {!showAnswer ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Verificar Resposta
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Próxima Questão' : 'Finalizar'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all mb-6"
          >
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RefreshCw className="text-orange-600" size={48} />
              <h1 className="text-gray-900 text-3xl md:text-4xl">Revisão Inteligente</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Foque nos seus pontos fracos e melhore sua performance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <TrendingDown className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{errorPatterns.length}</div>
              <div className="text-sm text-gray-600">Categorias para Revisar</div>
              <div className="text-xs text-gray-500 mt-2">
                Acurácia abaixo de 80%
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalErrorQuestions}</div>
              <div className="text-sm text-gray-600">Erros Totais</div>
              <div className="text-xs text-gray-500 mt-2">
                Em todas as categorias
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Flame className="text-white" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalReviewedQuestions}</div>
              <div className="text-sm text-gray-600">Questões Revisadas</div>
              <div className="text-xs text-gray-500 mt-2">
                Total acumulado
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {errorPatterns.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Parabéns! 🎉
            </h2>
            <p className="text-gray-600 mb-2">
              Você não tem categorias com acurácia abaixo de 80%.
            </p>
            <p className="text-gray-500 text-sm">
              Continue treinando para manter o excelente desempenho!
            </p>
          </div>
        )}

        {/* Error Patterns Grid */}
        {errorPatterns.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-orange-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">
                Categorias que Precisam de Atenção
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {errorPatterns.map((pattern, index) => {
                const progressCount = reviewProgress[pattern.category] || 0;
                const progressPercentage = pattern.errorCount > 0 
                  ? Math.min((progressCount / pattern.errorCount) * 100, 100) 
                  : 0;

                return (
                  <div
                    key={pattern.category}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-300 transition-all hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-red-600' : index === 1 ? 'bg-orange-600' : 'bg-yellow-600'
                          }`}>
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{pattern.category}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-2xl font-bold text-red-600">{pattern.accuracy.toFixed(1)}%</div>
                            <div className="text-xs text-gray-600">Acurácia</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-600">{pattern.errorCount}</div>
                            <div className="text-xs text-gray-600">Erros</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progresso de Revisão</span>
                            <span>{progressCount}/{pattern.errorCount}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartReview(pattern.category)}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Começar Revisão
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips Section */}
        {errorPatterns.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <BookOpen size={32} className="flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-3">💡 Dicas de Estudo Eficiente</h3>
                <ul className="space-y-2 text-blue-50">
                  <li>• Foque primeiro nas categorias com menor acurácia</li>
                  <li>• Revise cada questão com atenção à explicação</li>
                  <li>• Anote os conceitos que ainda estão confusos</li>
                  <li>• Retorne periodicamente para reforçar o aprendizado</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
