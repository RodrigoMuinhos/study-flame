import React, { useState, useEffect } from 'react';
import { Home, Target, BookOpen, GraduationCap, Trophy, BarChart3, Menu, Settings, TrendingUp, Flame, Star, Calendar, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StatisticsManager } from '@/utils/statisticsManager';
import { UserStats } from '@/types/aws-study';

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: 'home' | 'diagram' | 'training' | 'simulator' | 'official-exam' | 'stats' | 'study-plan' | 'review';
  onNavigate: (view: 'home' | 'diagram' | 'training' | 'simulator' | 'official-exam' | 'stats' | 'study-plan' | 'review') => void;
}

export function MainLayout({ children, currentView, onNavigate }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalExams: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    overallAccuracy: 0,
    badges: [],
    examHistory: [],
    categoryStats: {}
  });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Load stats on client side only
  useEffect(() => {
    setMounted(true);
    setStats(StatisticsManager.getStats());
    
    const interval = setInterval(() => {
      setStats(StatisticsManager.getStats());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calcular XP necessário para próximo nível usando mesma fórmula do StatisticsManager
  const nextLevel = stats.level + 1;
  const xpForNextLevel = nextLevel * nextLevel * 50;
  const xpForCurrentLevel = stats.level * stats.level * 50;
  const xpInCurrentLevel = stats.totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = Math.max(0, (xpInCurrentLevel / xpNeededForNextLevel) * 100);
  const unlockedBadges = stats.badges.filter(b => b.unlockedAt).length;
  const totalBadges = stats.badges.length;

  const menuItems = [
    { id: 'home' as const, icon: Home, label: 'Dashboard', color: 'text-purple-500' },
    { id: 'diagram' as const, icon: Target, label: 'Diagrama Interativo', color: 'text-orange-500' },
    { id: 'training' as const, icon: BookOpen, label: 'Modo Treino', color: 'text-green-500' },
    { id: 'simulator' as const, icon: GraduationCap, label: 'Simulador', color: 'text-blue-500' },
    { id: 'official-exam' as const, icon: Trophy, label: 'Prova Oficial', color: 'text-red-500' },
    { id: 'stats' as const, icon: BarChart3, label: 'Estatísticas', color: 'text-pink-500' },
    { id: 'study-plan' as const, icon: Calendar, label: 'Plano de Estudos', color: 'text-gray-500' },
    { id: 'review' as const, icon: RefreshCw, label: 'Revisão', color: 'text-indigo-500' },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'w-72' : 'w-20'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          {sidebarOpen ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2">
                🎓
              </div>
              <h2 className="text-slate-900 font-bold">AWS Study</h2>
              <p className="text-xs text-slate-500">Solutions Architect</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                🎓
              </div>
            </div>
          )}
        </div>

        {/* Level Progress */}
        <div className="px-4 py-6 border-b border-slate-200">
          {sidebarOpen ? (
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="text-yellow-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-purple-200">Nível {stats.level}</div>
                  <div className="font-bold text-lg text-white">{stats.totalXP} XP</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Próximo nível</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <div className="w-full bg-purple-900/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-2">
                <Trophy className="text-yellow-400" size={24} />
              </div>
              <div className="text-xs font-bold text-white">{stats.level}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-white' : item.color} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
          
          {/* Bootcamp - Voltar ao CRM */}
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30 mt-4"
          >
            <Flame size={22} className="text-yellow-300" />
            {sidebarOpen && (
              <span className="font-medium">Bootcamp</span>
            )}
          </button>
        </nav>

        {/* Stats Summary */}
        {sidebarOpen && (
          <div className="px-6 py-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Trophy size={16} className="text-yellow-500" />
                <span>Provas</span>
              </div>
              <span className="font-bold text-slate-900">{stats.totalExams}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingUp size={16} className="text-green-500" />
                <span>Acurácia</span>
              </div>
              <span className="font-bold text-slate-900">{stats.overallAccuracy.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Flame size={16} className="text-orange-500" />
                <span>Streak</span>
              </div>
              <span className="font-bold text-slate-900">{stats.currentStreak} dias</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          {sidebarOpen ? (
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
              <Settings size={20} className="text-slate-700" />
              <span>Configurações</span>
            </button>
          ) : (
            <button className="w-full flex justify-center p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
              <Settings size={20} className="text-slate-700" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="text-slate-600" size={24} />
              </button>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {menuItems.find(item => item.id === currentView)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-slate-600">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 rounded-full border border-purple-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Trophy className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Badges</div>
                    <div className="font-bold text-slate-900">
                      {unlockedBadges}/{totalBadges}
                    </div>
                  </div>
                </div>
                <div className="w-px h-8 bg-purple-300" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600">Nível</div>
                    <div className="font-bold text-slate-900">{stats.level}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
