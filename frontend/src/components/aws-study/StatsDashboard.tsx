import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Target, Award, Clock, Flame, BarChart3, Star } from 'lucide-react';
import { StatisticsManager } from '@/utils/statisticsManager';
import { UserStats } from '@/types/aws-study';

interface StatsDashboardProps {
  onBack: () => void;
}

export function StatsDashboard({ onBack }: StatsDashboardProps) {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const userStats = StatisticsManager.getStats();
    setStats(userStats);
  }, []);

  if (!stats) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 flex items-center justify-center">
      <p className="text-gray-600">Carregando estatísticas...</p>
    </div>;
  }

  const weakCategories = StatisticsManager.getWeakestCategories(3);
  const strongCategories = StatisticsManager.getStrongestCategories(3);
  const unlockedBadges = stats.badges.filter(b => b.unlockedAt);
  const lockedBadges = stats.badges.filter(b => !b.unlockedAt);

  // Calcular XP necessário para próximo nível usando mesma fórmula do StatisticsManager
  const nextLevel = stats.level + 1;
  const xpForNextLevel = nextLevel * nextLevel * 50;
  const xpForCurrentLevel = stats.level * stats.level * 50;
  const xpInCurrentLevel = stats.totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = Math.max(0, (xpInCurrentLevel / xpNeededForNextLevel) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Voltar
        </button>

        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            SEU PROGRESSO
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Dashboard de Performance
          </h1>
          <p className="text-lg text-gray-600">
            Acompanhe seu crescimento e conquistas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Trophy size={32} />
              <span className="text-3xl">🏆</span>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.totalExams}</div>
            <div className="text-orange-100">Simulados Completos</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Target size={32} />
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.overallAccuracy.toFixed(1)}%</div>
            <div className="text-blue-100">Acurácia Geral</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Flame size={32} />
              <span className="text-3xl">🔥</span>
            </div>
            <div className="text-4xl font-bold mb-1">{stats.currentStreak}</div>
            <div className="text-green-100">Dias de Streak</div>
            <div className="text-xs text-green-100 mt-1">Recorde: {stats.longestStreak} dias</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <Star size={32} />
              <span className="text-3xl">⭐</span>
            </div>
            <div className="text-4xl font-bold mb-1">Nv. {stats.level}</div>
            <div className="text-purple-100">{stats.totalXP} XP Total</div>
            <div className="mt-3 bg-purple-400 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-purple-100 mt-1">
              {Math.round(xpProgress)}% para Nv. {stats.level + 1}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award size={28} className="text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Conquistas</h2>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
              {unlockedBadges.length}/{stats.badges.length}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">DESBLOQUEADAS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unlockedBadges.map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl border-2 border-yellow-300 bg-yellow-50">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="font-bold text-gray-900 text-sm">Badge {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {lockedBadges.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">A DESBLOQUEAR</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {lockedBadges.map((_, idx) => (
                  <div key={idx} className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-60">
                    <div className="text-4xl mb-2 grayscale">🔒</div>
                    <div className="font-bold text-gray-700 text-sm">Badge {idx + 9}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weak Categories */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={28} className="text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Onde Focar</h2>
            </div>
            <div className="space-y-4">
              {weakCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{cat.category}</span>
                    <span className="text-sm font-bold text-red-600">{cat.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                      style={{ width: `${cat.accuracy}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cat.correctAnswers}/{cat.totalAttempts} questões certas
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strong Categories */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 size={28} className="text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Seus Pontos Fortes</h2>
            </div>
            <div className="space-y-4">
              {strongCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{cat.category}</span>
                    <span className="text-sm font-bold text-green-600">{cat.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${cat.accuracy}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cat.correctAnswers}/{cat.totalAttempts} questões certas
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exam History */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={28} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Histórico de Simulados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Data</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Questões</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Nota</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Tempo</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.examHistory.map((exam) => (
                  <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {new Date(exam.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-center">{exam.totalQuestions}</td>
                    <td className="py-3 px-4 text-sm font-bold text-center">
                      <span className={exam.score >= 72 ? 'text-green-600' : 'text-red-600'}>
                        {exam.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-center">
                      {formatTime(exam.timeSpent)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {exam.passed ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Passou
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                          ✗ Reprovou
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
