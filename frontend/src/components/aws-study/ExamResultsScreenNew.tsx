import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Clock, Award, ChevronLeft, BarChart3, Sparkles, X, CheckCircle, XCircle } from 'lucide-react';
import { ExamResult, ExamQuestion } from '@/types/aws-study';
import { StatisticsManager } from '@/utils/statisticsManager';

interface ExamResultsScreenNewProps {
  result: ExamResult;
  questions: ExamQuestion[];
  onReviewQuestion: (questionId: number) => void;
  onRetakeExam: () => void;
  onBackToDiagram: () => void;
}

export function ExamResultsScreenNew({ 
  result, 
  questions,
  onReviewQuestion, 
  onRetakeExam, 
  onBackToDiagram 
}: ExamResultsScreenNewProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<ExamQuestion | null>(null);
  const stats = StatisticsManager.getStats();
  
  const percentage = (result.correctAnswers / result.totalQuestions) * 100;
  const passed = result.passed;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const lastExam = stats.examHistory[0];
  const xpGained = lastExam ? (
    lastExam.correctAnswers * 10 +
    (lastExam.passed ? 50 : 0) +
    (percentage >= 90 ? 100 : percentage >= 80 ? 50 : 0)
  ) : 0;

  const newBadges = stats.badges.filter(b => 
    b.unlockedAt && new Date(b.unlockedAt).getTime() > (Date.now() - 10000)
  );

  const categoryPerformance = questions.reduce((acc, q) => {
    const answer = result.answers[q.id];
    if (!acc[q.category]) {
      acc[q.category] = { correct: 0, total: 0, accuracy: 0 };
    }
    acc[q.category].total++;
    if (answer?.isCorrect) acc[q.category].correct++;
    acc[q.category].accuracy = (acc[q.category].correct / acc[q.category].total) * 100;
    return acc;
  }, {} as Record<string, { correct: number; total: number; accuracy: number }>);

  const sortedCategories = Object.entries(categoryPerformance).sort(
    (a, b) => b[1].accuracy - a[1].accuracy
  );

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [passed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 py-8 px-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        </div>
      )}

      {/* Painel Lateral de Revisão */}
      {selectedQuestion && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSelectedQuestion(null)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-screen w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Revisão</h3>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Questão */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {selectedQuestion.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-4 leading-relaxed">
                  {selectedQuestion.question}
                </h4>
              </div>

              {/* Opções compactas - Apenas A-D */}
              <div className="space-y-2 mb-6">
                {selectedQuestion.options
                  .filter(opt => opt && opt.text && opt.text.trim() !== '')
                  .slice(0, 4)
                  .map((option, index) => {
                    const isCorrect = selectedQuestion.correctAnswer.split(',').includes(option.label);
                    const userAnswer = result.answers[selectedQuestion.id];
                    const wasSelected = userAnswer?.selected === option.label || 
                                       userAnswer?.selected?.includes(option.label);

                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          isCorrect
                            ? 'bg-green-50 border-green-500'
                            : wasSelected
                            ? 'bg-red-50 border-red-500'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                          isCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : wasSelected
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          {option.label}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 leading-relaxed">{option.text}</p>
                          {isCorrect && (
                            <div className="flex items-center gap-1 mt-1 text-green-700">
                              <CheckCircle size={14} />
                              <span className="text-xs font-semibold">Correta</span>
                            </div>
                          )}
                          {wasSelected && !isCorrect && (
                            <div className="flex items-center gap-1 mt-1 text-red-700">
                              <XCircle size={14} />
                              <span className="text-xs font-semibold">Sua resposta</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explicação compacta */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg">💡</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-blue-900 mb-2">Explicação</h5>
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBackToDiagram}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Voltar ao Menu
        </button>

        <div className={`rounded-3xl p-12 text-center mb-8 shadow-2xl border-4 ${
          passed 
            ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400' 
            : 'bg-gradient-to-br from-red-500 to-red-600 border-red-400'
        }`}>
          <div className="text-8xl mb-4">{passed ? '🎉' : '💪'}</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {passed ? 'Parabéns!' : 'Continue Tentando!'}
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            {passed 
              ? 'Você está pronto para a certificação AWS!' 
              : 'Revise os assuntos e tente novamente!'}
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6">
              <div className="text-6xl font-bold text-white">{percentage.toFixed(1)}%</div>
              <div className="text-white/80">Acurácia</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6">
              <div className="text-6xl font-bold text-white">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-white/80">Acertos</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              ⏱️ Tempo: {formatTime(result.timeSpent)}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              ⭐ +{xpGained} XP
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              🏆 Nível {stats.level}
            </div>
          </div>
        </div>

        {newBadges.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 mb-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={32} className="text-yellow-900" />
              <h2 className="text-3xl font-bold text-yellow-900">Novas Conquistas!</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {newBadges.map(badge => (
                <div key={badge.id} className="bg-white rounded-xl p-6 text-center shadow-lg animate-bounce">
                  <div className="text-6xl mb-3">{badge.icon}</div>
                  <div className="font-bold text-gray-900 text-lg">{badge.name}</div>
                  <div className="text-sm text-gray-600">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 size={28} className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Performance por Categoria</h2>
            </div>
            <div className="space-y-4">
              {sortedCategories.map(([category, perf]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{category}</span>
                    <span className={`text-sm font-bold ${
                      perf.accuracy >= 80 ? 'text-green-600' :
                      perf.accuracy >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {perf.accuracy.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        perf.accuracy >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        perf.accuracy >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${perf.accuracy}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {perf.correct}/{perf.total} questões
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={28} className="text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Seu Progresso Geral</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Trophy size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total de Simulados</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalExams}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Acurácia Geral</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.overallAccuracy.toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Streak Atual</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.currentStreak} dias</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Nível / XP</div>
                    <div className="text-2xl font-bold text-gray-900">Nv. {stats.level} • {stats.totalXP} XP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={28} className="text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Revisar Questões</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {questions.map((q, index) => {
              const answer = result.answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all hover:scale-105 ${
                    answer?.isCorrect
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : answer?.selected
                      ? 'bg-red-50 border-red-500 text-red-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {answer?.isCorrect ? '✓' : answer?.selected ? '✗' : '○'}
                  </div>
                  <div className="text-xs">Questão {index + 1}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onRetakeExam}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            🔄 Novo Simulado
          </button>
          <button
            onClick={onBackToDiagram}
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200"
          >
            ← Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
