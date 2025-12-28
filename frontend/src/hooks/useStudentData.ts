"use client";

import { useEffect, useState } from "react";
import { Student, studentService } from "@/services/api";

interface UseStudentDataOptions {
  studentId: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useStudentData({
  studentId,
  autoRefresh = true,
  refreshInterval = 30000, // 30 segundos
}: UseStudentDataOptions) {
  const [data, setData] = useState<Student | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      const student = await studentService.getProfile(studentId);
      setData(student);
      setProgress(student.progress || 0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      console.error("Erro ao buscar dados do aluno:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (newProgress: number) => {
    try {
      // Implementar atualização de progresso
      setProgress(newProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar progresso");
    }
  };

  const addXP = async (xpAmount: number) => {
    if (!data) return;
    try {
      const updated = await studentService.updateProfile(studentId, {
        xp: (data.xp || 0) + xpAmount,
      });
      setData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao adicionar XP");
    }
  };

  // Auto-refresh
  useEffect(() => {
    fetchStudentData();

    if (autoRefresh) {
      const interval = setInterval(fetchStudentData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [studentId, autoRefresh, refreshInterval]);

  return {
    student: data,
    progress,
    isLoading,
    error,
    refetch: fetchStudentData,
    updateProgress,
    addXP,
  };
}
