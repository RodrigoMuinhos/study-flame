"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, Lock, ChevronRight, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { useAWSStudy } from '@/contexts/AWSStudyContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface TokenValidationResponse {
  valid: boolean;
  message: string;
  leadId?: string;
  leadName?: string;
  leadEmail?: string;
  leadCpf?: string;
  expiresAt?: string;
  daysUntilExpiration?: number;
}

export function AwsStudyTokenGate() {
  const [tokenInput, setTokenInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<TokenValidationResponse | null>(null);
  const { setToken, setUserInfo } = useAWSStudy();
  const router = useRouter();

  const validateToken = async (token: string): Promise<TokenValidationResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tokens/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao validar token');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao validar token:', error);
      throw error;
    }
  };

  const handleAccess = async () => {
    setError(null);
    
    // Se o token estiver vazio, permite acesso livre (modo dev/demo)
    if (!tokenInput.trim()) {
      setToken('');
      router.push('/aws-study/study');
      return;
    }
    
    // Validar o token no backend
    setIsValidating(true);
    
    try {
      const result = await validateToken(tokenInput.trim());
      setValidationResult(result);
      
      if (result.valid) {
        // Token válido - salvar informações e redirecionar
        setToken(tokenInput.trim());
        
        // Salvar informações do usuário se disponíveis
        if (result.leadName && setUserInfo) {
          setUserInfo({
            id: result.leadId || '',
            name: result.leadName,
            email: result.leadEmail || '',
            cpf: result.leadCpf || '',
            expiresAt: result.expiresAt || '',
            daysUntilExpiration: result.daysUntilExpiration || 0
          });
        }
        
        // Pequeno delay para mostrar mensagem de sucesso
        setTimeout(() => {
          router.push('/aws-study/study');
        }, 1000);
      } else {
        // Token inválido
        setError(result.message || 'Token inválido ou expirado');
      }
    } catch (err) {
      setError('Erro ao validar token. Verifique sua conexão.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isValidating) {
      handleAccess();
    }
  };

  const formatToken = (value: string) => {
    // Formatar para XXXX-XXXXXX-XXXX
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const parts = [];
    
    if (cleaned.length > 0) parts.push(cleaned.slice(0, 4));
    if (cleaned.length > 4) parts.push(cleaned.slice(4, 10));
    if (cleaned.length > 10) parts.push(cleaned.slice(10, 14));
    
    return parts.join('-');
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatToken(e.target.value);
    setTokenInput(formatted);
    setError(null);
    setValidationResult(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {/* Logo/Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 ring-2 ring-orange-500/30">
              <Cloud className="h-10 w-10 text-orange-400" />
            </div>
          </div>
          
          <h1 className="mb-2 text-3xl font-bold text-white">Acesso AWS Study</h1>
          <p className="text-white/60">
            Área exclusiva de estudos e simulados AWS
          </p>
        </div>

        {/* Card de acesso */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-6">
            <label htmlFor="token" className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
              <Lock size={16} className="text-orange-400" />
              Token de acesso
            </label>
            <input
              id="token"
              type="text"
              value={tokenInput}
              onChange={handleTokenChange}
              onKeyDown={handleKeyDown}
              disabled={isValidating}
              placeholder="XXXX-XXXXXX-XXXX"
              maxLength={16}
              data-testid="token-input"
              className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-center font-mono text-lg tracking-widest text-white placeholder-white/40 outline-none transition ${
                error 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                  : validationResult?.valid 
                    ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                    : 'border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20'
              } focus:ring-2 disabled:opacity-50`}
            />
            
            {/* Mensagem de erro */}
            {error && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400" data-testid="token-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            {/* Mensagem de sucesso */}
            {validationResult?.valid && (
              <div className="mt-3 rounded-lg bg-green-500/10 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle size={16} />
                  Token válido! Bem-vindo(a), {validationResult.leadName}!
                </div>
                <p className="mt-1 text-xs text-green-400/70">
                  Redirecionando para a área de estudos...
                </p>
              </div>
            )}
            
            {!tokenInput && (
              <p className="mt-2 text-xs text-white/50">
                Digite seu token de acesso ou deixe vazio para modo demonstração.
              </p>
            )}
          </div>

          <button
            onClick={handleAccess}
            disabled={isValidating}
            data-testid="token-submit"
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Validando token...
              </>
            ) : (
              <>
                Acessar AWS Study
                <ChevronRight size={18} className="transition group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">O que você encontrará:</h3>
            <ul className="space-y-1 text-xs text-white/70">
              <li>• Simulador de provas AWS (CLF-C02 e SAA)</li>
              <li>• Diagramas de arquitetura de referência</li>
              <li>• Trilha de estudos guiada</li>
              <li>• Laboratórios práticos seguros (Free Tier)</li>
              <li>• Review e estatísticas detalhadas</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-white/50 transition hover:text-white/80"
          >
            ← Voltar ao dashboard principal
          </a>
        </div>
      </div>
    </div>
  );
}
