import React, { useState, useEffect } from 'react';
import { Home, Target, BookOpen, GraduationCap, Trophy, BarChart3, Menu, Settings, TrendingUp, Flame, Star, Calendar, RefreshCw, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StatisticsManager } from '@/utils/statisticsManager';
import { UserStats } from '@/types/aws-study';

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: 'home' | 'diagram' | 'training' | 'simulator' | 'official-exam' | 'stats' | 'study-plan' | 'review';
  onNavigate: (view: 'home' | 'diagram' | 'training' | 'simulator' | 'official-exam' | 'stats' | 'study-plan' | 'review') => void;
}

export function MainLayout({ children, currentView, onNavigate }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    { id: 'diagram' as const, icon: Target, label: 'Diagrama', color: 'text-orange-500' },
    { id: 'training' as const, icon: BookOpen, label: 'Treino', color: 'text-green-500' },
    { id: 'simulator' as const, icon: GraduationCap, label: 'Simulador', color: 'text-blue-500' },
    { id: 'official-exam' as const, icon: Trophy, label: 'Prova', color: 'text-red-500' },
    { id: 'stats' as const, icon: BarChart3, label: 'Stats', color: 'text-pink-500' },
    { id: 'study-plan' as const, icon: Calendar, label: 'Plano', color: 'text-gray-500' },
    { id: 'review' as const, icon: RefreshCw, label: 'Revisão', color: 'text-indigo-500' },
  ];

  const handleNavigate = (view: typeof currentView) => {
    onNavigate(view);
    setSidebarOpen(false);
  };

  // Menu Content Component (reusado em desktop e mobile)
  const MenuContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl transition-all ${
              isActive
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                : 'hover:bg-slate-100 text-slate-700'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon size={20} className={isActive ? 'text-white' : item.color} />
            {!collapsed && (
              <span className="font-medium text-sm">{item.label}</span>
            )}
          </button>
        );
      })}
      
      {/* Bootcamp - Voltar ao CRM */}
      <button
        onClick={() => router.push('/')}
        className={`w-full flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl transition-all bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30 mt-4 ${collapsed ? 'justify-center' : ''}`}
      >
        <Flame size={20} className="text-yellow-300" />
        {!collapsed && (
          <span className="font-medium text-sm">Bootcamp</span>
        )}
      </button>
    </>
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="text-slate-600" size={22} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-lg">
              🎓
            </div>
            <span className="font-bold text-slate-900 text-sm">AWS Study</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 px-2 py-1 rounded-full flex items-center gap-1">
              <Trophy className="text-purple-600" size={14} />
              <span className="text-xs font-bold text-purple-600">{stats.level}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-xl">
                🎓
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-sm">AWS Study</h2>
                <p className="text-xs text-slate-500">Solutions Architect</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Level Progress Mobile */}
          <div className="px-4 py-4 border-b border-slate-200">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="text-yellow-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-purple-200">Nível {stats.level}</div>
                  <div className="font-bold text-white">{stats.totalXP} XP</div>
                </div>
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Mobile */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <MenuContent collapsed={false} />
          </nav>

          {/* Stats Summary Mobile */}
          <div className="px-4 py-3 border-t border-slate-200 grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">{stats.totalExams}</div>
              <div className="text-[10px] text-slate-500">Provas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">{stats.overallAccuracy.toFixed(0)}%</div>
              <div className="text-[10px] text-slate-500">Acurácia</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-900">{stats.currentStreak}</div>
              <div className="text-[10px] text-slate-500">Streak</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-xl">
              🎓
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-slate-900 font-bold text-sm">AWS Study</h2>
                <p className="text-xs text-slate-500">Solutions Architect</p>
              </div>
            )}
          </div>
        </div>

        {/* Level Progress Desktop */}
        <div className="px-3 py-4 border-b border-slate-200">
          {!sidebarCollapsed ? (
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Trophy className="text-yellow-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-purple-200">Nível {stats.level}</div>
                  <div className="font-bold text-white">{stats.totalXP} XP</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Próximo nível</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <div className="w-full bg-purple-900/50 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Trophy className="text-yellow-400" size={20} />
              </div>
              <div className="text-xs font-bold text-purple-600 mt-1">{stats.level}</div>
            </div>
          )}
        </div>

        {/* Navigation Desktop */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <MenuContent collapsed={sidebarCollapsed} />
        </nav>

        {/* Stats Summary Desktop */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Trophy size={14} className="text-yellow-500" />
                <span className="text-xs">Provas</span>
              </div>
              <span className="font-bold text-slate-900 text-sm">{stats.totalExams}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-xs">Acurácia</span>
              </div>
              <span className="font-bold text-slate-900 text-sm">{stats.overallAccuracy.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Flame size={14} className="text-orange-500" />
                <span className="text-xs">Streak</span>
              </div>
              <span className="font-bold text-slate-900 text-sm">{stats.currentStreak} dias</span>
            </div>
          </div>
        )}

        {/* Toggle Button Desktop */}
        <div className="p-3 border-t border-slate-200">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <Menu size={18} />
            {!sidebarCollapsed && <span className="text-sm">Recolher</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0">
        {/* Desktop Top Bar */}
        <header className="hidden md:block bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {menuItems.find(item => item.id === currentView)?.label || 'Dashboard'}
              </h2>
              <p className="text-xs text-slate-600">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-full border border-purple-200">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={16} />
                <span className="text-xs text-slate-600">Badges</span>
                <span className="font-bold text-slate-900 text-sm">{unlockedBadges}/{totalBadges}</span>
              </div>
              <div className="w-px h-6 bg-purple-300" />
              <div className="flex items-center gap-2">
                <Star className="text-blue-500" size={16} />
                <span className="text-xs text-slate-600">Nível</span>
                <span className="font-bold text-slate-900 text-sm">{stats.level}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
