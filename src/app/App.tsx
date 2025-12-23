"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { StudentDashboard } from "./components/StudentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"aluno" | "admin">("aluno");
  const [studentName, setStudentName] = useState("");
  
  // Estados do login
  const [loginCPF, setLoginCPF] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
    return value;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (userType === "aluno") {
      // Login de aluno - aceita qualquer CPF/senha
      if (loginCPF && loginPassword) {
        // Remove formatação do CPF para obter apenas números
        const cpfNumbers = loginCPF.replace(/\D/g, "");
        
        // Usa os últimos dígitos do CPF como nome simulado
        const name = `Aluno ${cpfNumbers.slice(-4)}`;
        setStudentName(name);
        setIsLoggedIn(true);
      } else {
        setLoginError("Preencha todos os campos");
      }
    } else {
      // Login de admin - credenciais específicas
      if (loginCPF === "admin@flame.com" && loginPassword === "flame2024") {
        setIsLoggedIn(true);
      } else {
        setLoginError("Credenciais de administrador inválidas");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentName("");
    setLoginCPF("");
    setLoginPassword("");
    setLoginError("");
    setUserType("aluno");
  };

  // Se está logado como aluno
  if (isLoggedIn && userType === "aluno") {
    return <StudentDashboard studentName={studentName} onLogout={handleLogout} />;
  }

  // Se está logado como admin
  if (isLoggedIn && userType === "admin") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <>
      {/* Splash Screen */}
      {!splashDone && (
        <SplashScreen
          durationMs={2200}
          showText={true}
          onFinish={() => setSplashDone(true)}
        />
      )}

      {/* Tela de Login */}
      {splashDone && (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#070A12] via-[#0A0F1F] to-[#070A12] p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo FLAME */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-8 flex justify-center"
            >
              <svg width="80" height="80" viewBox="0 0 180 180" fill="none">
                <defs>
                  <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="50%" stopColor="#F7931E" />
                    <stop offset="100%" stopColor="#FFC837" />
                  </linearGradient>
                </defs>
                <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="url(#flameGradient)" />
                <path d="M90 45C80 55 75 65 75 80C75 95 82 105 90 105C98 105 105 95 105 80C105 65 100 55 90 45Z" fill="#FFE66D" opacity="0.8" />
                <ellipse cx="90" cy="75" rx="8" ry="15" fill="#FFF9E6" opacity="0.6" />
              </svg>
            </motion.div>

            {/* Título */}
            <h1 className="mb-2 text-center font-bold text-white">Portal do Aluno</h1>
            <p className="mb-8 text-center text-white/60">Bootcamp FLAME</p>

            {/* Seletor: Aluno ou Administrador */}
            <div className="mb-6 w-full">
              <div className="relative flex rounded-lg border border-white/10 bg-white/5 p-1">
                {/* Background animado */}
                <div
                  className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-md bg-gradient-to-r from-orange-500 to-red-500 shadow-lg transition-all duration-300 ${
                    userType === "aluno" ? "left-1" : "left-[calc(50%+4px-4px)]"
                  }`}
                />
                
                {/* Botão Aluno */}
                <button
                  type="button"
                  onClick={() => {
                    setUserType("aluno");
                    setLoginError("");
                  }}
                  className={`relative z-10 flex-1 rounded-md py-2.5 font-semibold transition-colors duration-300 ${
                    userType === "aluno" ? "text-white" : "text-white/50"
                  }`}
                >
                  Aluno
                </button>
                
                {/* Botão Administrador */}
                <button
                  type="button"
                  onClick={() => {
                    setUserType("admin");
                    setLoginError("");
                  }}
                  className={`relative z-10 flex-1 rounded-md py-2.5 font-semibold transition-colors duration-300 ${
                    userType === "admin" ? "text-white" : "text-white/50"
                  }`}
                >
                  Administrador
                </button>
              </div>
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#F5F1E8]/5 p-8">
                <div className="mb-4">
                  <label htmlFor="cpf" className="mb-2 block font-medium text-white/90">
                    {userType === "aluno" ? "CPF" : "E-mail"}
                  </label>
                  <input
                    type={userType === "aluno" ? "text" : "email"}
                    id="cpf"
                    value={loginCPF}
                    onChange={(e) => setLoginCPF(userType === "aluno" ? formatCPF(e.target.value) : e.target.value)}
                    placeholder={userType === "admin" ? "admin@flame.com" : "000.000.000-00"}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="mb-2 block font-medium text-white/90">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    required
                  />
                </div>

                {loginError && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-red-400">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
                >
                  Entrar
                </button>

                {userType === "admin" && (
                  <p className="mt-4 text-center text-xs text-white/40">
                    Credenciais: admin@flame.com / flame2024
                  </p>
                )}
              </div>

              <p className="text-center text-white/40">
                {userType === "aluno" 
                  ? "Bem-vindo ao bootcamp que vai transformar sua carreira"
                  : "Área administrativa do Bootcamp FLAME"
                }
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}