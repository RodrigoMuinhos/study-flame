"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Check,
  Youtube,
  ChevronRight,
  Flame
} from "lucide-react";

interface DashboardHomeProps {
  studentData: {
    progressPercent: number;
    nextPhase: string;
    currentPhase: string;
    streak: number;
  };
  studentName: string;
}

// Componente VideoPlayer placeholder - deve ser importado do componente real
function VideoPlayer({ type, title }: { type: string; title: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
      {title}
    </div>
  );
}

export function DashboardHome({ studentData, studentName }: DashboardHomeProps) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Assistir uma aula", done: false },
    { id: 2, text: "Fazer 1 commit no GitHub", done: false },
    { id: 3, text: "Marcar progresso na trilha", done: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Hero Section - Boas-vindas */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card/80 to-card p-8 shadow-sm">
        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Flame size={16} />
            Bem-vindo ao Bootcamp FLAME
          </div>
          <h1 className="mb-3 text-4xl font-bold text-foreground">
            Olá, {studentName ? studentName.split(' ')[0] : 'Aluno'}! 👋
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Você está começando sua jornada • Próxima fase: <span className="font-semibold text-primary">{studentData.nextPhase}</span>
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              const event = new CustomEvent('navigate-to-aulas');
              window.dispatchEvent(event);
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 font-semibold text-primary-foreground shadow-lg shadow-orange-500/25 transition hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
          >
            Começar agora
            <ChevronRight size={20} className="transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Cards de Ação Rápida */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:scale-105 hover:shadow-lg">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="text-primary" size={24} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-foreground">Aulas</h3>
          <p className="text-sm text-muted-foreground">Assista videoaulas e aprenda no seu ritmo</p>
        </div>

        <div className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:scale-105 hover:shadow-lg">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Target className="text-primary" size={24} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-foreground">Desafios</h3>
          <p className="text-sm text-muted-foreground">Pratique com exercícios reais</p>
        </div>

        <div className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:scale-105 hover:shadow-lg">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Trophy className="text-primary" size={24} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-foreground">Conquistas</h3>
          <p className="text-sm text-muted-foreground">Acompanhe seu progresso e badges</p>
        </div>
      </div>

      {/* Progresso e Tarefas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Progresso Gamificado */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Seu Progresso</h3>
            <span className="text-2xl font-bold text-primary">{studentData.progressPercent}%</span>
          </div>
          <div className="mb-3 h-4 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentData.progressPercent}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Comece agora e acenda a primeira chama 🔥
          </p>
          <div className="flex gap-2">
            {["Faísca", "Combustão", "Chama", "Forja", "Incêndio"].map((phase, index) => (
              <div
                key={phase}
                className={`flex-1 rounded-full py-2 text-center text-xs font-semibold ${
                  index === 0 ? "bg-primary/10 text-primary" : "bg-muted/30 text-muted-foreground"
                }`}
              >
                {phase}
              </div>
            ))}
          </div>
        </div>

        {/* Checklist do dia */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-foreground">Tarefas de hoje ✨</h3>
          <div className="space-y-3">
            {checklist.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 transition hover:border-primary/50 hover:bg-accent"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleCheck(item.id)}
                  className="peer sr-only"
                />
                <div className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-border bg-card transition peer-checked:border-primary peer-checked:bg-primary">
                  {item.done && <Check size={16} className="text-primary-foreground" />}
                </div>
                <span className={`flex-1 font-medium transition ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
            +50 XP por tarefa concluída
          </p>
        </div>
      </div>

      {/* Vídeo de Introdução */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">Comece por aqui</h3>
            <p className="text-sm text-muted-foreground">Assista ao vídeo de boas-vindas</p>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <Youtube className="text-primary" size={24} />
          </div>
        </div>
        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
          <VideoPlayer type="welcome" title="Vídeo de Boas-vindas" />
        </div>
        <a
          href="https://www.youtube.com/@Rodrigomuinhosdev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
        >
          <Youtube size={20} />
          Ver canal completo
          <ChevronRight size={18} />
        </a>
      </div>
    </div>
  );
}
