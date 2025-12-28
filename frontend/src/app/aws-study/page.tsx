"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AwsStudyPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Verificar se tem acesso salvo no localStorage (validado pelo StudentDashboard)
    const savedAccess = localStorage.getItem('aws_study_access');
    
    if (savedAccess) {
      try {
        const accessData = JSON.parse(savedAccess);
        // Verificar se o acesso ainda é válido (não expirou)
        if (accessData.expiresAt && new Date(accessData.expiresAt) > new Date()) {
          // Tem acesso válido, redirecionar para área de estudos
          router.replace('/aws-study/study');
          return;
        }
      } catch (e) {
        // Dados inválidos, limpar
        localStorage.removeItem('aws_study_access');
      }
    }
    
    // Não tem acesso, voltar para o dashboard
    router.replace('/');
  }, [router]);

  // Tela de carregamento enquanto verifica
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a1a]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500/30 border-t-purple-500" />
        <p className="text-white/60">Verificando acesso...</p>
      </div>
    </div>
  );
}
