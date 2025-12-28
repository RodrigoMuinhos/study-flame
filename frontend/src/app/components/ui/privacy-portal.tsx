"use client";

import { motion } from "motion/react";
import { 
  Shield, 
  Download, 
  Trash2, 
  History, 
  Eye, 
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

interface ConsentRecord {
  type: string;
  granted: boolean;
  date: string;
}

export function PrivacyPortal() {
  const [activeTab, setActiveTab] = useState<'data' | 'consents' | 'requests'>('data');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Simulação de dados do usuário
  const userData = {
    nome: "Rodrigo Silva",
    cpf: "***.***.***-**",
    email: "rodrigo@example.com",
    telefone: "(11) 9****-****",
    dataCadastro: "15/01/2024",
    ultimoAcesso: "02/04/2024",
  };

  const consents: ConsentRecord[] = [
    { type: "Termos de Uso", granted: true, date: "15/01/2024 14:30" },
    { type: "Política de Privacidade", granted: true, date: "15/01/2024 14:30" },
    { type: "Marketing", granted: false, date: "15/01/2024 14:30" },
    { type: "Cookies Analíticos", granted: true, date: "02/04/2024 10:15" },
  ];

  const handleExportData = (format: 'json' | 'pdf') => {
    // Simula exportação
    const data = JSON.stringify(userData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meus-dados.${format}`;
    a.click();
  };

  const handleRequestDeletion = () => {
    setShowDeleteConfirm(true);
    // Lógica de solicitação de exclusão
  };

  const tabs = [
    { id: 'data' as const, label: 'Meus Dados', icon: Eye },
    { id: 'consents' as const, label: 'Consentimentos', icon: Shield },
    { id: 'requests' as const, label: 'Solicitações', icon: FileText },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* Cabeçalho */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Portal de Privacidade</h2>
          <p className="text-sm text-muted-foreground">Gerencie seus dados e consentimentos (LGPD Art. 18)</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "text-orange-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  transition={{ type: "spring", damping: 30, stiffness: 500 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Conteúdo */}
      <div className="min-h-[400px]">
        {activeTab === 'data' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Dados pessoais */}
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <h3 className="mb-4 font-semibold text-foreground">Dados Pessoais</h3>
              <div className="grid gap-3">
                {Object.entries(userData).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border pb-2 last:border-0">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações de exportação */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">Exportar Dados</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Baixe uma cópia de todos os seus dados em formato JSON ou PDF.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExportData('json')}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  <Download className="h-4 w-4" />
                  Exportar JSON
                </button>
                <button
                  onClick={() => handleExportData('pdf')}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <Download className="h-4 w-4" />
                  Exportar PDF
                </button>
              </div>
            </div>

            {/* Zona de perigo */}
            <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-5">
              <h3 className="mb-2 font-semibold text-red-500">Zona de Perigo</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Solicite a exclusão permanente de todos os seus dados. Esta ação é irreversível.
              </p>
              <button
                onClick={handleRequestDeletion}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Solicitar Exclusão de Dados
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'consents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Visualize e gerencie todos os consentimentos que você concedeu.
            </p>
            {consents.map((consent, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  {consent.granted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{consent.type}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {consent.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    consent.granted
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {consent.granted ? "Concedido" : "Negado"}
                </span>
              </div>
            ))}
            <button className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              <History className="inline h-4 w-4 mr-2" />
              Ver Histórico Completo
            </button>
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Acompanhe suas solicitações de acesso, correção ou exclusão de dados.
            </p>
            <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-border">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  Nenhuma solicitação registrada
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Suas solicitações aparecerão aqui
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Confirmar Exclusão</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Tem certeza que deseja solicitar a exclusão de todos os seus dados? 
              Esta ação é irreversível e você perderá acesso à plataforma.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  // Lógica de exclusão
                }}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Confirmar Exclusão
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
