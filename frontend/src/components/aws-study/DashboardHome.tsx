import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Flame, 
  Star,
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart3
} from 'lucide-react';
import { StatisticsManager } from '@/utils/statisticsManager';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AWSBenefitsCards } from './AWSBenefitsCards';
import { loadExamState } from '@/lib/exam-engine';
import { useRouter } from 'next/navigation';

interface DashboardHomeProps {
  onSelectDiagram: () => void;
  onSelectTraining: () => void;
  onSelectExam: () => void;
  onSelectOfficialExam: () => void;
  onSelectStats: () => void;
  onSelectStudyPlan: () => void;
  onSelectReview: () => void;
}

export function DashboardHome({ onSelectDiagram, onSelectTraining, onSelectExam, onSelectOfficialExam, onSelectStats, onSelectStudyPlan, onSelectReview }: DashboardHomeProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Evita hydration error com dados do localStorage
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const stats = mounted ? StatisticsManager.getStats() : {
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    level: 1,
    totalXP: 0,
    overallAccuracy: 0,
    examHistory: [],
    categoryStats: {},
    badges: []
  };
  const weakCategories = mounted ? StatisticsManager.getWeakestCategories(5) : [];
  
  // Carregar última prova do localStorage
  const lastExam = mounted ? loadExamState() : null;
  const hasLastExam = lastExam && lastExam.finished;
  
  // Calcular XP necessário para próximo nível usando mesma fórmula do StatisticsManager
  const nextLevel = stats.level + 1;
  const xpForNextLevel = nextLevel * nextLevel * 50;
  const xpForCurrentLevel = stats.level * stats.level * 50;
  const xpInCurrentLevel = stats.totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = Math.max(0, (xpInCurrentLevel / xpNeededForNextLevel) * 100);

  // Dados para gráficos
  const recentExams = stats.examHistory.slice(0, 7).reverse().map((exam, idx) => ({
    name: `#${stats.examHistory.length - idx}`,
    score: (exam.correctAnswers / exam.totalQuestions) * 100,
    date: new Date(exam.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }));

  const categoryData = Object.values(stats.categoryStats)
    .filter(cat => cat.totalAttempts > 0)
    .slice(0, 6)
    .map(cat => ({
      name: cat.category.substring(0, 20),
      accuracy: cat.accuracy,
      total: cat.totalAttempts
    }));

  const performanceData = [
    { name: 'Excelente (90-100%)', value: stats.examHistory.filter(e => (e.correctAnswers/e.totalQuestions)*100 >= 90).length, color: '#10b981' },
    { name: 'Bom (72-89%)', value: stats.examHistory.filter(e => (e.correctAnswers/e.totalQuestions)*100 >= 72 && (e.correctAnswers/e.totalQuestions)*100 < 90).length, color: '#3b82f6' },
    { name: 'Regular (50-71%)', value: stats.examHistory.filter(e => (e.correctAnswers/e.totalQuestions)*100 >= 50 && (e.correctAnswers/e.totalQuestions)*100 < 72).length, color: '#f59e0b' },
    { name: 'Abaixo (0-49%)', value: stats.examHistory.filter(e => (e.correctAnswers/e.totalQuestions)*100 < 50).length, color: '#ef4444' },
  ].filter(d => d.value > 0);

  const unlockedBadges = stats.badges.filter(b => b.unlockedAt);
  const nextBadges = stats.badges.filter(b => !b.unlockedAt).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Bem-vindo de volta! 👋</h1>
            <p className="text-orange-100 text-lg mb-6">
              Continue sua jornada rumo à certificação AWS Solutions Architect Associate
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Flame className="text-yellow-300" size={20} />
                <span className="font-bold">{mounted ? stats.currentStreak : 0} dias de streak!</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Trophy className="text-yellow-300" size={20} />
                <span className="font-bold">Nível {mounted ? stats.level : 1}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/30">
              <Award className="text-yellow-300" size={64} />
            </div>
          </div>
        </div>
      </div>

      {/* AWS Benefits Section */}
      <AWSBenefitsCards />

      {/* Última Prova - Seção destacada */}
      {hasLastExam && lastExam && lastExam.blueprint?.questionIds && (() => {
        const totalQuestions = lastExam.blueprint.questionIds.length;
        const answeredCount = lastExam.answers?.filter(a => a !== null && a !== undefined).length || 0;
        
        const score = lastExam.finishedAt && stats.examHistory.length > 0 
          ? Math.round((stats.examHistory[stats.examHistory.length - 1].correctAnswers / stats.examHistory[stats.examHistory.length - 1].totalQuestions) * 100)
          : 0;
        
        const timeSpent = lastExam.finishedAt 
          ? Math.floor((lastExam.finishedAt - lastExam.startedAt) / 1000)
          : 0;
        
        const mins = Math.floor(timeSpent / 60);
        const secs = timeSpent % 60;
        
        const examMode = lastExam.settings?.kind === 'training' ? '🎯 Treino' : 
                        lastExam.settings?.kind === 'simulator' ? '📝 Simulador' : 
                        '🏆 Prova Oficial';
        
        const dateStr = lastExam.finishedAt 
          ? new Date(lastExam.finishedAt).toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: '2-digit' 
            })
          : '';
        
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-500 uppercase mb-1">Última Prova</div>
                <h3 className="text-xl font-bold text-slate-900">{examMode}</h3>
              </div>
              <button
                onClick={() => router.push(`/aws-study/exam/${lastExam.id}/review`)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition text-sm"
              >
                🔄 Revisão Inteligente
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${score >= 72 ? 'text-green-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <div className="text-xs text-slate-600">Acurácia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </div>
                <div className="text-xs text-slate-600">Tempo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-700 mb-1">
                  {dateStr}
                </div>
                <div className="text-xs text-slate-600">Data</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all cursor-pointer hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.totalExams}</div>
          <div className="text-sm text-slate-600">Provas Realizadas</div>
          {stats.totalExams > 0 && (
            <div className="mt-3 text-xs text-green-600 font-semibold">
              +{stats.examHistory.filter(e => new Date(e.date).getTime() > Date.now() - 7*24*60*60*1000).length} esta semana
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all cursor-pointer hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.overallAccuracy.toFixed(1)}%</div>
          <div className="text-sm text-slate-600">Acurácia Geral</div>
          <div className="mt-3 flex items-center gap-1">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${stats.overallAccuracy}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all cursor-pointer hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <Zap className="text-yellow-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.totalCorrect}</div>
          <div className="text-sm text-slate-600">Questões Corretas</div>
          <div className="mt-3 text-xs text-slate-500">
            de {stats.totalQuestions} respondidas
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100 hover:border-yellow-300 transition-all cursor-pointer hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <Trophy className="text-white" size={24} />
            </div>
            <Star className="text-yellow-500" size={20} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{unlockedBadges.length}/{stats.badges.length}</div>
          <div className="text-sm text-slate-600">Conquistas</div>
          <div className="mt-3 flex -space-x-2">
            {unlockedBadges.slice(0, 4).map((badge, idx) => (
              <div key={idx} className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-2 border-white text-xs">
                {badge.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Performance Recente</h3>
              <p className="text-sm text-slate-600">Últimas 7 provas realizadas</p>
            </div>
            <BarChart3 className="text-purple-500" size={24} />
          </div>
          {recentExams.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recentExams}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto mb-3 text-slate-300" />
                <p>Nenhuma prova realizada ainda</p>
              </div>
            </div>
          )}
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Distribuição</h3>
            <p className="text-sm text-slate-600">Notas por faixa</p>
          </div>
          {performanceData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {performanceData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700">{item.name.split(' ')[0]}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Target size={48} className="mx-auto mb-3 text-slate-300" />
                <p>Sem dados ainda</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Performance */}
      {categoryData.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Performance por Categoria</h3>
              <p className="text-sm text-slate-600">Top categorias estudadas</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Acurácia']}
              />
              <Bar dataKey="accuracy" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={onSelectDiagram}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <Target size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Diagrama Interativo</h3>
          <p className="text-orange-100 text-sm mb-4">Explore 18 componentes AWS</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Explorar</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectTraining}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <BookOpen size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Modo Treino</h3>
          <p className="text-green-100 text-sm mb-4">320 questões em 16 tópicos</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Treinar</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectExam}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <GraduationCap size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Simulador</h3>
          <p className="text-blue-100 text-sm mb-4">Provas configuráveis com timer</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Simular</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectOfficialExam}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <GraduationCap size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Prova Oficial</h3>
          <p className="text-red-100 text-sm mb-4">Prova oficial com timer</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Prova Oficial</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectStats}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <BarChart3 size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Estatísticas</h3>
          <p className="text-purple-100 text-sm mb-4">Histórico e análises detalhadas</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Ver mais</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectStudyPlan}
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <BookOpen size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Plano de Estudos</h3>
          <p className="text-indigo-100 text-sm mb-4">Crie e gerencie seu plano de estudos</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Plano de Estudos</span>
            <span>→</span>
          </div>
        </div>

        <div
          onClick={onSelectReview}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <BookOpen size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Revisão</h3>
          <p className="text-yellow-100 text-sm mb-4">Foco em erros recorrentes</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Revisar</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Badges & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Badges */}
        {nextBadges.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-600" size={24} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Próximas Conquistas</h3>
                <p className="text-sm text-slate-600">Continue estudando para desbloquear</p>
              </div>
            </div>
            <div className="space-y-3">
              {nextBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-3xl grayscale opacity-60">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{badge.name}</div>
                    <div className="text-sm text-slate-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weak Categories */}
        {weakCategories.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Focar Atenção</h3>
                <p className="text-sm text-slate-600">Categorias que precisam de mais estudo</p>
              </div>
            </div>
            <div className="space-y-4">
              {weakCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-900">{cat.category}</span>
                    <span className="text-sm font-bold text-red-600">{cat.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${cat.accuracy}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {cat.correctAnswers}/{cat.totalAttempts} corretas
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
