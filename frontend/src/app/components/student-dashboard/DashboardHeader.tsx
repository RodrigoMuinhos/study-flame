"use client";

import { Menu, Flame } from "lucide-react";
import { NotificationCenter } from "../ui/notification-center";

interface DashboardHeaderProps {
  studentName: string | null;
  studentCpf?: string;
  currentPhase: string;
  streak: number;
  onMenuClick: () => void;
}

export function DashboardHeader({ studentName, studentCpf, currentPhase, streak, onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background/70 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div>
            <h2 className="font-semibold text-foreground">Olá, {studentName ? studentName.split(' ')[0] : 'Aluno'}! 👋</h2>
            <p className="text-muted-foreground">Fase {currentPhase}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 ring-1 ring-orange-500/20 sm:flex">
            <Flame size={16} className="text-orange-400" />
            <span className="font-semibold text-orange-400">{streak} dias</span>
          </div>
          <NotificationCenter studentCpf={studentCpf} />
        </div>
      </div>
    </header>
  );
}
