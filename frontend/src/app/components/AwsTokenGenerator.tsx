import { useState } from "react";
import {
  Key,
  Search,
  Copy,
  Clock,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
  Cloud,
  Shield,
  MessageCircle
} from "lucide-react";
import { motion } from "motion/react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface AccessTokenData {
  id: string;
  token: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadCpf: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  lastUsedAt: string | null;
  daysUntilExpiration: number;
  expired: boolean;
}

interface LeadSearchResult {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export function AwsTokenGenerator() {
  const [tokenSearchCpf, setTokenSearchCpf] = useState('');
  const [searchingLead, setSearchingLead] = useState(false);
  const [foundLead, setFoundLead] = useState<LeadSearchResult | null>(null);
  const [activeToken, setActiveToken] = useState<AccessTokenData | null>(null);
  const [generatingToken, setGeneratingToken] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<AccessTokenData | null>(null);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Buscar lead por CPF para geração de token
  const searchLeadByCpf = async () => {
    if (!tokenSearchCpf || tokenSearchCpf.length !== 11) {
      alert('Digite um CPF válido com 11 dígitos');
      return;
    }
    
    try {
      setSearchingLead(true);
      setFoundLead(null);
      setActiveToken(null);
      setGeneratedToken(null);
      
      // Buscar lead pelo CPF
      const leadsResponse = await axios.get(`${API_BASE_URL}/leads`);
      const lead = leadsResponse.data.find((l: any) => l.cpf === tokenSearchCpf);
      
      if (!lead) {
        alert('Aluno não encontrado com este CPF');
        return;
      }
      
      setFoundLead({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        cpf: lead.cpf,
        phone: lead.phone
      });
      
      // Verificar se já tem token ativo
      try {
        const tokenResponse = await axios.get(`${API_BASE_URL}/tokens/cpf/${tokenSearchCpf}`);
        if (tokenResponse.data.hasActiveToken) {
          setActiveToken(tokenResponse.data.token);
        }
      } catch (error) {
        console.log('Nenhum token ativo encontrado');
      }
      
    } catch (error) {
      console.error('Erro ao buscar lead:', error);
      alert('Erro ao buscar aluno');
    } finally {
      setSearchingLead(false);
    }
  };

  // Gerar novo token para o lead
  const generateAccessToken = async () => {
    if (!foundLead) return;
    
    try {
      setGeneratingToken(true);
      const response = await axios.post(`${API_BASE_URL}/tokens/generate`, {
        cpf: foundLead.cpf
      });
      
      setGeneratedToken(response.data);
      setActiveToken(response.data);
      setTokenCopied(false);
      
    } catch (error: any) {
      console.error('Erro ao gerar token:', error);
      alert(error.response?.data?.error || 'Erro ao gerar token');
    } finally {
      setGeneratingToken(false);
    }
  };

  // Copiar token para área de transferência
  const copyTokenToClipboard = () => {
    if (!generatedToken && !activeToken) return;
    const tokenToCopy = generatedToken?.token || activeToken?.token;
    if (tokenToCopy) {
      navigator.clipboard.writeText(tokenToCopy);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    }
  };

  // Enviar token via WhatsApp
  const sendToWhatsApp = () => {
    if (!foundLead || (!generatedToken && !activeToken)) return;
    
    const token = generatedToken?.token || activeToken?.token;
    const validUntil = formatDate((generatedToken || activeToken)!.expiresAt);
    const phone = foundLead.phone?.replace(/\D/g, '') || '';
    
    const message = `AWS Study - Token de Acesso

Ola, ${foundLead.name.split(' ')[0]}!

Seu token de acesso a area AWS Study foi gerado com sucesso.

Token: ${token}

Valido ate: ${validUntil}

Acesse o sistema e digite o token para entrar.

Bons estudos!`;
    
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Revogar token
  const revokeAccessToken = async (tokenId: string) => {
    if (!confirm('Tem certeza que deseja revogar este token? O aluno perderá o acesso ao AWS Study.')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/tokens/${tokenId}`);
      setActiveToken(null);
      setGeneratedToken(null);
      alert('Token revogado com sucesso!');
    } catch (error) {
      console.error('Erro ao revogar token:', error);
      alert('Erro ao revogar token');
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Mascarar CPF para LGPD (oculta 5 dígitos do meio)
  const maskCpf = (cpf: string) => {
    if (!cpf || cpf.length !== 11) return cpf;
    // Formato: XXX.***.***-XX (mostra 3 primeiros e 2 últimos)
    return `${cpf.slice(0, 3)}.*****${cpf.slice(-2)}`;
  };

  // Limpar busca de token
  const clearTokenSearch = () => {
    setTokenSearchCpf('');
    setFoundLead(null);
    setActiveToken(null);
    setGeneratedToken(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/30">
            <Cloud className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gerador de Tokens AWS Study</h1>
            <p className="text-sm text-muted-foreground">Gere tokens de acesso para a área exclusiva de estudos AWS</p>
          </div>
        </div>
      </div>

      {/* Card Principal */}
      <div className="rounded-2xl bg-card p-6 shadow-lg border border-border">
        <div className="mb-6 flex items-center gap-2">
          <Key className="text-primary" size={24} />
          <h3 className="text-xl font-semibold text-foreground">
            🔐 Gerar Token de Acesso
          </h3>
        </div>

        {/* Campo de busca por CPF */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Buscar Aluno por CPF
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={tokenSearchCpf}
                onChange={(e) => setTokenSearchCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
                onKeyDown={(e) => e.key === 'Enter' && searchLeadByCpf()}
                placeholder="Digite o CPF (apenas números)"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {tokenSearchCpf && (
                <button
                  onClick={clearTokenSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              onClick={searchLeadByCpf}
              disabled={searchingLead || tokenSearchCpf.length !== 11}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {searchingLead ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              Buscar
            </button>
          </div>
        </div>

        {/* Card com dados do aluno encontrado */}
        {foundLead && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-muted/30 border border-border p-6"
          >
            {/* Dados do Aluno */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {foundLead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{foundLead.name}</h4>
                  <p className="text-sm text-muted-foreground">{foundLead.email}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    CPF: <code className="rounded bg-primary/10 px-2 py-0.5 font-mono text-primary">{maskCpf(foundLead.cpf)}</code>
                    <span className="text-xs text-primary">(LGPD)</span>
                  </p>
                </div>
              </div>
              
              {/* Status do Token */}
              {activeToken ? (
                <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${
                  activeToken.expired 
                    ? 'bg-red-500/20 ring-1 ring-red-500/30' 
                    : 'bg-green-500/20 ring-1 ring-green-500/30'
                }`}>
                  {activeToken.expired ? (
                    <>
                      <AlertTriangle size={16} className="text-red-400" />
                      <span className="text-sm font-medium text-red-400">Token Expirado</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-sm font-medium text-green-400">Token Ativo</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2 ring-1 ring-yellow-500/30">
                  <XCircle size={16} className="text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Sem Token</span>
                </div>
              )}
            </div>

            {/* Token Ativo ou Gerado */}
            {(activeToken || generatedToken) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 rounded-xl bg-green-500/10 border border-green-500/30 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="font-semibold text-green-600">
                    {generatedToken ? '✅ Token Gerado com Sucesso!' : 'Token Atual'}
                  </span>
                </div>
                
                {/* Token Display */}
                <div className="mb-4 flex flex-col items-center gap-4">
                  <code className="rounded-xl bg-primary/10 px-6 py-4 text-2xl font-bold tracking-widest text-primary shadow-inner border border-primary/20">
                    {generatedToken?.token || activeToken?.token}
                  </code>
                  <div className="flex gap-3">
                    <button
                      onClick={copyTokenToClipboard}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
                        tokenCopied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-muted/50 text-foreground hover:bg-muted'
                      }`}
                    >
                      <Copy size={18} />
                      {tokenCopied ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button
                      onClick={sendToWhatsApp}
                      className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                      <MessageCircle size={18} />
                      Enviar WhatsApp
                    </button>
                  </div>
                </div>

                {/* Informações do Token */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={16} />
                    <span>Válido até: <strong className="text-foreground">{formatDate((generatedToken || activeToken)!.expiresAt)}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Dias restantes: <strong className={`${
                      (generatedToken || activeToken)!.daysUntilExpiration < 7 ? 'text-yellow-600' : 'text-green-600'
                    }`}>{(generatedToken || activeToken)!.daysUntilExpiration}</strong></span>
                  </div>
                  {(generatedToken || activeToken)!.lastUsedAt && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>Último uso: <strong className="text-foreground">{formatDate((generatedToken || activeToken)!.lastUsedAt!)}</strong></span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generateAccessToken}
                disabled={generatingToken}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generatingToken ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Key size={18} />
                    {activeToken ? 'Gerar Novo Token' : 'Gerar Token de Acesso'}
                  </>
                )}
              </button>
              
              {activeToken && !activeToken.expired && (
                <button
                  onClick={() => revokeAccessToken(activeToken.id)}
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-500 transition hover:bg-red-500/20"
                >
                  <Trash2 size={18} />
                  Revogar
                </button>
              )}
            </div>

            {activeToken && !generatedToken && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                ⚠️ Ao gerar um novo token, o anterior será automaticamente revogado
              </p>
            )}

            {generatedToken && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
              >
                <p className="text-center text-sm text-green-600">
                  ✅ Token salvo com sucesso! Envie ao aluno para acesso ao AWS Study.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Informações sobre o Token */}
        {!foundLead && (
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <Shield className="text-primary mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Como funciona o Token AWS Study</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• O token é único e vinculado ao aluno</li>
                  <li>• Formato: XXXX-XXXXXX-XXXX (alfanumérico)</li>
                  <li>• Validade de 90 dias após geração</li>
                  <li>• Ao gerar novo token, o anterior é revogado automaticamente</li>
                  <li>• O aluno usa o token para acessar a área AWS Study</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
