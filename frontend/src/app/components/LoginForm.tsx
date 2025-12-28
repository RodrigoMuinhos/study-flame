"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { LogIn, AlertCircle, Loader, Eye, EyeOff } from "lucide-react";
import { authService, LoginResponse } from "@/services/api";
import { useToast } from "./ui/toast";

interface LoginFormProps {
  onLoginSuccess: (student: LoginResponse['student']) => void;
  isLoading?: boolean;
}

export function LoginForm({ onLoginSuccess, isLoading: externalLoading }: LoginFormProps) {
  const [cpf, setCpf] = useState("023.983.043-10"); // CPF de exemplo
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Remove formatting from CPF
      const cleanCPF = cpf.replace(/\D/g, "");

      if (!cleanCPF || cleanCPF.length !== 11) {
        throw new Error("CPF inválido");
      }

      if (!password) {
        throw new Error("Senha é obrigatória");
      }

      const response = await authService.login(cleanCPF, password);
      
      addToast({
        type: "success",
        title: "Bem-vindo!",
        description: `Olá ${response.student.name}! 🔥`,
      });

      // Se marcou "Permanecer logado", salva no localStorage
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      }

      onLoginSuccess(response.student);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao fazer login";
      setError(message);
      addToast({
        type: "error",
        title: "Erro no login",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
      addToast({
        type: "error",
        title: "CPF necessário",
        description: "Digite seu CPF para recuperar a senha",
      });
      return;
    }

    try {
      // Simulação de envio de email
      addToast({
        type: "info",
        title: "Email enviado!",
        description: `Solicitação enviada para rodrigomuinhodev@gmail.com. Você receberá um email com instruções para redefinir sua senha.`,
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro",
        description: "Não foi possível enviar o email. Tente novamente.",
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* CPF */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          CPF
        </label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          placeholder="000.000.000-00"
          disabled={isLoading || externalLoading}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:bg-white/15 disabled:opacity-50"
        />
      </div>

      {/* Senha */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading || externalLoading}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 pr-12 text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:bg-white/15 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
            disabled={isLoading || externalLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-500">{error}</p>
        </motion.div>
      )}

      {/* Lembrar-me */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading || externalLoading}
          className="h-4 w-4 rounded border-white/20 bg-white/10 cursor-pointer accent-orange-500"
        />
        <span className="text-sm text-white/80">Permanecer logado</span>
      </label>

      {/* Botão de Login */}
      <button
        type="submit"
        disabled={isLoading || externalLoading}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-semibold text-white transition hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || externalLoading ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            Entrando...
          </>
        ) : (
          <>
            <LogIn className="h-5 w-5" />
            Entrar
          </>
        )}
      </button>

      {/* Links auxiliares */}
      <div className="flex justify-center text-sm pt-2">
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading || externalLoading}
          className="text-white/70 hover:text-orange-400 transition underline-offset-4 hover:underline disabled:opacity-50"
        >
          Esqueceu a senha?
        </button>
      </div>
    </motion.form>
  );
}
