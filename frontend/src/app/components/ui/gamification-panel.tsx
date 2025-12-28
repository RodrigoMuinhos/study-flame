"use client";

import { motion } from "motion/react";
import { Trophy, Star, Zap, Award, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface LevelInfo {
  current: number;
  xp: number;
  xpToNext: number;
  title: string;
}

interface Stats {
  totalBadges: number;
  unlockedBadges: number;
  totalXp: number;
  streakDays: number;
  lessonsCompleted: number;
  studyHours: number;
}

interface GamificationData {
  level: LevelInfo;
  badges: Badge[];
  stats: Stats;
}

export function GamificationPanel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GamificationData | null>(null);
  
  useEffect(() => {
    fetchGamificationData();
  }, []);
  
  const fetchGamificationData = async () => {
    try {
      // Buscar CPF do localStorage
      const studentDataStr = localStorage.getItem('studentData');
      if (!studentDataStr) {
        setLoading(false);
        return;
      }
      
      const studentData = JSON.parse(studentDataStr);
      const cpf = studentData.cpf;
      
      if (!cpf) {
        setLoading(false);
        return;
      }
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await axios.get(`${API_URL}/gamification/student/${cpf}`);
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de gamificação:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getRarityStyles = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-500 to-orange-500 shadow-yellow-500/50';
      case 'epic':
        return 'from-purple-500 to-pink-500 shadow-purple-500/50';
      case 'rare':
        return 'from-blue-500 to-cyan-500 shadow-blue-500/50';
      default:
        return 'from-gray-500 to-gray-600 shadow-gray-500/50';
    }
  };

  const getRarityLabel = (rarity: Badge['rarity']) => {
    const labels = {
      common: 'Comum',
      rare: 'Raro',
      epic: 'Épico',
      legendary: 'Lendário'
    };
    return labels[rarity];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Se não tem dados, mostra estado inicial
  const level = data?.level || { current: 1, xp: 0, xpToNext: 250, title: "Iniciante" };
  const badges = data?.badges || [];
  const stats = data?.stats || { totalBadges: 0, unlockedBadges: 0, totalXp: 0, streakDays: 0, lessonsCompleted: 0, studyHours: 0 };

  const progressPercentage = (level.xp / level.xpToNext) * 100;

  return (
    <div className="space-y-6">
      {/* Painel de nível */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6"
      >
        <div className="absolute right-0 top-0 opacity-10">
          <Zap className="h-32 w-32 text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Nível {level.current}
              </h3>
              <p className="text-sm text-muted-foreground">{level.title}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-semibold text-foreground">
                {level.xp} / {level.xpToNext} XP
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary/70"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {level.xpToNext - level.xp} XP para o próximo nível
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid de badges */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Conquistas ({stats.unlockedBadges}/{stats.totalBadges})
          </h3>
        </div>

        {badges.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/10 p-8 text-center">
            <Trophy className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">Nenhuma conquista disponível ainda</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Complete atividades para desbloquear badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl border ${
                  badge.unlocked
                    ? 'border-border bg-card'
                    : 'border-dashed border-border bg-muted/20'
                }`}
              >
                <div className="p-4">
                  {/* Ícone do badge */}
                  <div
                    className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
                      badge.unlocked
                        ? `bg-gradient-to-br ${getRarityStyles(badge.rarity)} shadow-lg`
                        : 'bg-muted grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  {/* Informações */}
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          badge.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {badge.name}
                      </h4>
                      {badge.unlocked && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r ${getRarityStyles(
                            badge.rarity
                          )}`}
                        >
                          {getRarityLabel(badge.rarity)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {badge.description}
                    </p>

                    {/* Barra de progresso (para badges não desbloqueados) */}
                    {!badge.unlocked && badge.progress !== undefined && badge.maxProgress !== undefined && (
                      <div className="space-y-1">
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {badge.progress} / {badge.maxProgress}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Badge desbloqueado recentemente */}
                  {badge.unlocked && index < 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-2 top-2"
                    >
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Award className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">
            {stats.unlockedBadges}
          </p>
          <p className="text-xs text-muted-foreground">Badges</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Zap className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{stats.totalXp}</p>
          <p className="text-xs text-muted-foreground">XP Total</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <TrendingUp className="mx-auto h-8 w-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{level.current}</p>
          <p className="text-xs text-muted-foreground">Nível</p>
        </div>
      </div>
    </div>
  );
}
