"use client";

import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Target, 
  Clipboard, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AwsStudyLeftSidebarProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export function AwsStudyLeftSidebar({ 
  currentSection = 'home',
  onSectionChange 
}: AwsStudyLeftSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'diagram', icon: BookOpen, label: 'Diagramas' },
    { id: 'training', icon: Target, label: 'Treinamento' },
    { id: 'simulator', icon: Clipboard, label: 'Simulador' },
    { id: 'stats', icon: BarChart3, label: 'Estatísticas' },
    { id: 'study-plan', icon: Calendar, label: 'Plano de Estudo' },
  ];

  return (
    <aside 
      className={`hidden lg:flex flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
              <span className="text-sm font-bold text-white">AWS</span>
            </div>
            <span className="font-semibold text-white">Study Hub</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white"
          title={collapsed ? "Expandir" : "Recolher"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange?.(item.id)}
              className={`relative flex w-full items-center gap-3 rounded-lg p-3 transition ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 ring-1 ring-orange-500/30'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-orange-500/10 p-3 ring-1 ring-orange-500/20">
            <p className="mb-1 text-xs font-semibold text-orange-400">Progresso Geral</p>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
            <p className="text-xs text-white/60">45% completo</p>
          </div>
        </div>
      )}
    </aside>
  );
}
