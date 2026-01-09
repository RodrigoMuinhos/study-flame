"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { StudentDashboard } from "./components/StudentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import LoginPage from "./components/ui/gaming-login";
import { authService, adminService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./components/ui/toast";
import { Loader } from "lucide-react";

const ADMIN_SESSION_KEY = 'admin_session';

export default function App() {
  const [userType, setUserType] = useState<"aluno" | "admin">("aluno");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  
  const { student, isLoading, isAuthenticated, logout, login: loginContext } = useAuth();
  const { addToast } = useToast();

  // Verificar sessão admin ao carregar
  useEffect(() => {
    const checkAdminSession = () => {
      const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
      const adminToken = localStorage.getItem('admin_token');
      
      if (adminSession && adminToken) {
        try {
          const session = JSON.parse(adminSession);
          const now = Date.now();
          // Sessão válida por 30 minutos
          if (now - session.loginTime < 30 * 60 * 1000) {
            setAdminLoggedIn(true);
            setUserType("admin");
          } else {
            // Sessão expirada
            localStorage.removeItem(ADMIN_SESSION_KEY);
            localStorage.removeItem('admin_token');
          }
        } catch (e) {
          console.error('Erro ao restaurar sessão admin:', e);
        }
      }
      setAdminChecked(true);
    };
    
    checkAdminSession();
  }, []);

  // Login de admin via API
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    
    try {
      const response = await adminService.login(adminEmail, adminPassword);
      
      if (response.accessToken) {
        // Salvar sessão admin
        const adminSession = {
          loginTime: Date.now(),
          adminName: response.admin?.name || 'Admin'
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
        
        setAdminLoggedIn(true);
        setUserType("admin");
        addToast({
          type: "success",
          title: "Bem-vindo Admin!",
          description: `Olá ${response.admin.name}, acesso concedido`,
        });
      } else {
        setAdminError(response.message || "Credenciais de administrador inválidas");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setAdminError(err.response?.data?.message || "Credenciais de administrador inválidas");
    }
  };

  const handleAdminLogout = () => {
    adminService.logout();
    // Limpar sessão admin do localStorage
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem('admin_token');
    
    setAdminLoggedIn(false);
    setUserType("aluno");
    setAdminEmail("");
    setAdminPassword("");
    setAdminError("");
  };

  const handleStudentLogout = async () => {
    await logout();
    setUserType("aluno");
  };

  const handleStudentLogin = async (cpf: string, password: string, remember: boolean) => {
    try {
      const cleanCPF = cpf.replace(/\D/g, "");
      const response = await authService.login(cleanCPF, password);
      
      // Atualizar o AuthContext com os dados do aluno
      loginContext(response.student);
      
      setUserType("aluno");
    
      addToast({
        type: "success",
        title: "Bem-vindo!",
        description: `Olá ${response.student.name}! 🔥`,
      });

      if (remember) {
        localStorage.setItem("remember_me", "true");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login";
      addToast({
        type: "error",
        title: "Erro no login",
        description: message,
      });
    }
  };

  // Se está carregando autenticação (aluno ou admin)
  if (isLoading || !adminChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#070A12] via-[#0A0F1F] to-[#070A12]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="h-12 w-12 text-orange-500" />
        </motion.div>
      </div>
    );
  }

  // Se está logado como admin (verificar primeiro pois admin tem prioridade)
  if (adminLoggedIn && userType === "admin") {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Se está logado como aluno (via AuthContext)
  if (isAuthenticated && student) {
    return <StudentDashboard studentName={student.name} studentCpf={student.cpf} onLogout={handleStudentLogout} />;
  }

  // Tela de Login
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <LoginPage.VideoBackground videoUrl="/videologin.mp4" />

      <div className="relative z-20 w-full max-w-md">
        <div className="mb-4 flex rounded-full bg-white/10 p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setUserType("aluno")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              userType === "aluno"
                ? "bg-white text-gray-900 shadow"
                : "text-white/80 hover:text-white"
            }`}
          >
            Aluno
          </button>
          <button
            type="button"
            onClick={() => setUserType("admin")}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              userType === "admin"
                ? "bg-white text-gray-900 shadow"
                : "text-white/80 hover:text-white"
            }`}
          >
            Admin
          </button>
        </div>

        {userType === "aluno" ? (
          <LoginPage.LoginForm onSubmit={handleStudentLogin} isLoading={isLoading} />
        ) : (
          <form
            onSubmit={handleAdminLogin}
            className="space-y-3 rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-sm"
          >
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/90">E-mail admin</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50"
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-white/90">Senha</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50"
                placeholder="••••••••"
                required
              />
            </div>

            {adminError && (
              <div className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">
                {adminError}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:from-orange-400 hover:to-red-400 focus:ring-2 focus:ring-orange-400/60"
            >
              Entrar como Admin
            </button>
          </form>
        )}
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
        © 2025 FLAME Bootcamp. Transformando carreiras tech
      </footer>
    </div>
  );
}