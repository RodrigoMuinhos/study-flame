"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Student, authService } from "@/services/api";

interface AuthContextType {
  student: Student | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (student: Student) => void;
  logout: () => Promise<void>;
  refreshStudent: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário ao montar
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const studentData = localStorage.getItem("student_data");
        // Se houver token e dados salvos, restaurar sem fazer chamada à API
        if (token && studentData) {
          try {
            setStudent(JSON.parse(studentData));
          } catch (e) {
            console.error("Erro ao parsear dados do aluno", e);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("student_data");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: Student) => {
    setStudent(userData);
    // Salvar dados do aluno para restauração na próxima inicialização
    localStorage.setItem("student_data", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setStudent(null);
      localStorage.removeItem("student_data");
    }
  };

  const refreshStudent = async () => {
    try {
      const user = await authService.getCurrentUser();
      setStudent(user);
    } catch (error) {
      console.error("Erro ao atualizar dados do aluno:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isLoading,
        isAuthenticated: !!student,
        login,
        logout,
        refreshStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
