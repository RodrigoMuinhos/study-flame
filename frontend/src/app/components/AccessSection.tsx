import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Lock,
  Upload,
  Key,
  Copy,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Users,
  RefreshCw,
  Send,
  Shield,
  Plus,
  X,
  Clock,
  LogIn
} from "lucide-react";
import { motion } from "motion/react";
import { LeadImportDTO } from "@/services/api";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface ImportResult {
  totalProcessed: number;
  successCount: number;
  errorCount: number;
  errors: string[];
  message: string;
}

interface StudentCredentials {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  leadCpf: string;
  leadPhone: string;
  password: string;
  isActive: boolean;
  credentialsSent: boolean;
  lastLoginAt: string | null;
  loginCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
  progress: number;
  phase: string;
  streak: number;
  lastAccess: string;
  modulesCompleted: number;
  accessEnabled: boolean;
  password?: string;
  credentialsSent?: boolean;
  whatsapp?: string;
}

interface AccessSectionProps {
  students: Student[];
  setStudents: (students: Student[]) => void;
  onToggleAccess: (id: number) => void;
}

export function AccessSection({ students, setStudents, onToggleAccess }: AccessSectionProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: number]: boolean }>({});
  const [importing, setImporting] = useState(false);
  const [importedLeads, setImportedLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [credentials, setCredentials] = useState<StudentCredentials[]>([]);
  const [loadingCredentials, setLoadingCredentials] = useState(false);
  const [visiblePasswordsCred, setVisiblePasswordsCred] = useState<{ [key: string]: boolean }>({});
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentCredentials | null>(null);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    experience: '',
    status: 'NEW'
  });
  const [addingLead, setAddingLead] = useState(false);

  // Formatar data para exibição
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Tempo desde último login
  const getTimeSinceLogin = (dateString: string | null) => {
    if (!dateString) return 'Nunca acessou';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} minutos`;
    if (diffHours < 24) return `Há ${diffHours} horas`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `Há ${diffDays} dias`;
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`;
    return `Há ${Math.floor(diffDays / 30)} meses`;
  };

  // Buscar leads do backend ao carregar o componente
  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const response = await axios.get(`${API_BASE_URL}/leads`);
      setImportedLeads(response.data);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setLoadingLeads(false);
    }
  };

  // Buscar credenciais
  const fetchCredentials = async () => {
    try {
      setLoadingCredentials(true);
      const response = await axios.get(`${API_BASE_URL}/student-access`);
      setCredentials(response.data);
    } catch (error) {
      console.error('Erro ao buscar credenciais:', error);
    } finally {
      setLoadingCredentials(false);
    }
  };

  // Adicionar lead manualmente
  const addLeadManually = async () => {
    try {
      setAddingLead(true);
      const response = await axios.post(`${API_BASE_URL}/leads`, newLead);
      await fetchLeads(); // Recarregar lista
      setShowAddModal(false);
      setNewLead({ name: '', email: '', phone: '', cpf: '', experience: '', status: 'NEW' });
      alert('Lead adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
      alert('Erro ao adicionar lead. Verifique os dados e tente novamente.');
    } finally {
      setAddingLead(false);
    }
  };

  // Gerar credenciais para um lead
  const generateCredentials = async (leadId: string) => {
    try {
      setGeneratingFor(leadId);
      const response = await axios.post(`${API_BASE_URL}/student-access/generate/${leadId}`);
      await fetchCredentials(); // Atualizar lista
      alert('✅ Credenciais geradas com sucesso!');
    } catch (error: any) {
      alert(`Erro: ${error.response?.data || error.message}`);
    } finally {
      setGeneratingFor(null);
    }
  };

  // Regenerar senha
  const regeneratePassword = async (id: string) => {
    try {
      await axios.post(`${API_BASE_URL}/student-access/${id}/regenerate-password`);
      await fetchCredentials();
      alert('✅ Senha regenerada com sucesso!');
    } catch (error: any) {
      alert(`Erro: ${error.response?.data || error.message}`);
    }
  };

  // Ativar/Desativar acesso
  const toggleAccess = async (id: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/student-access/${id}/toggle-access`);
      await fetchCredentials();
    } catch (error: any) {
      alert(`Erro: ${error.response?.data || error.message}`);
    }
  };

  // Marcar como enviado
  const markAsSent = async (id: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/student-access/${id}/mark-sent`);
      await fetchCredentials();
    } catch (error: any) {
      alert(`Erro: ${error.response?.data || error.message}`);
    }
  };

  // Copiar credenciais
  const copyCredentials = (cred: StudentCredentials) => {
    const text = `CPF: ${cred.leadCpf}\nSenha: ${cred.password}`;
    navigator.clipboard.writeText(text);
    alert('✅ Credenciais copiadas!');
  };

  // Enviar por email
  const sendEmail = (cred: StudentCredentials) => {
    const subject = encodeURIComponent('Suas credenciais - Bootcamp FLAME');
    const body = encodeURIComponent(
      `Olá ${cred.leadName}!\n\nSuas credenciais de acesso ao Bootcamp FLAME:\n\nCPF: ${cred.leadCpf}\nSenha: ${cred.password}\n\nAcesse o portal e comece sua jornada!\n\nEquipe FLAME`
    );
    window.open(`mailto:${cred.leadEmail}?subject=${subject}&body=${body}`);
    markAsSent(cred.id);
  };

  // Enviar por WhatsApp
  const sendWhatsApp = (cred: StudentCredentials) => {
    const phone = cred.leadPhone.replace(/\D/g, ''); // Remove caracteres não numéricos
    const text = encodeURIComponent(
      `Olá, ${cred.leadName}!
Seja muito bem-vindo(a) ao Bootcamp FLAME - do Zero ao Deploy.

Você foi selecionado(a) para usar nossa plataforma de estudos (a trilha completa com aulas, desafios e progresso).

*Banner do Bootcamp:*
https://study-flame.vercel.app/Flamebanner.png

*Entre no grupo oficial (avisos + suporte + materiais):*
https://chat.whatsapp.com/BMoAhtm2ofhCRPxCgAcFmB

*Acesse a plataforma:*
https://studycamp-flame.vercel.app/

*Suas credenciais de acesso:*
CPF: ${cred.leadCpf}
Senha: ${cred.password}

Qualquer dúvida (acesso, trilha, exercícios, deploy), me chama aqui sem medo - vou te ajudar.

Bem-vindo(a) à jornada!`
    );
    window.open(`https://wa.me/55${phone}?text=${text}`);
    markAsSent(cred.id);
  };

  useEffect(() => {
    fetchLeads();
    fetchCredentials();
  }, []);

  const handleImportStudents = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setImporting(true);
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        let leadsToImport: LeadImportDTO[] = [];

        if (Array.isArray(data)) {
          leadsToImport = data;
        } else if (data.students && Array.isArray(data.students)) {
          leadsToImport = data.students;
        } else {
          alert('Formato de JSON inválido. Esperado um array de leads.');
          setImporting(false);
          return;
        }

        // Enviar para o backend com URL absoluta (temporário para contornar cache do browser)
        const response = await fetch(`${API_BASE_URL}/leads/import`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadsToImport),
        });
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const result: ImportResult = await response.json();
        
        // Atualizar a lista de leads após importação
        await fetchLeads();
        
        if (result.errorCount > 0) {
          alert(
            `Importação concluída com avisos:\n\n` +
            `Total processado: ${result.totalProcessed}\n` +
            `Sucesso: ${result.successCount}\n` +
            `Erros: ${result.errorCount}\n\n` +
            `Detalhes dos erros:\n${result.errors.join('\n')}`
          );
        } else {
          alert(
            `✅ Importação concluída com sucesso!\n\n` +
            `Total processado: ${result.totalProcessed}\n` +
            `Importados: ${result.successCount}`
          );
        }

        // Atualizar a lista local se necessário
        // Você pode buscar os leads atualizados do backend aqui
        
      } catch (error: any) {
        console.error('Erro ao importar:', error);
        alert(`Erro ao importar JSON: ${error.message || 'Verifique se o arquivo está correto.'}`);
      } finally {
        setImporting(false);
        // Limpar o input para permitir reimportar o mesmo arquivo
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGeneratePassword = (studentId: number) => {
    const updatedStudents = students.map(s =>
      s.id === studentId ? { ...s, password: generatePassword() } : s
    );
    setStudents(updatedStudents);
  };

  const handleCopyCredentials = (student: Student) => {
    const credentials = `Portal FLAME - Credenciais de Acesso\n\nNome: ${student.name}\nCPF: ${student.cpf}\nSenha: ${student.password || 'Não gerada'}\n\nAcesse: portal.flame.com`;
    
    navigator.clipboard.writeText(credentials).then(() => {
      alert('Credenciais copiadas para a área de transferência!');
    }).catch(() => {
      alert('Erro ao copiar. Tente novamente.');
    });
  };

  const handleSendEmail = (student: Student) => {
    // Simulação de envio de email
    const updatedStudents = students.map(s =>
      s.id === student.id ? { ...s, credentialsSent: true } : s
    );
    setStudents(updatedStudents);
    alert(`Email enviado com sucesso para ${student.email}!`);
  };

  const handleSendWhatsApp = (student: Student) => {
    // Envio de WhatsApp com mensagem completa
    const message = encodeURIComponent(
      `Olá, ${student.name}!
Seja muito bem-vindo(a) ao Bootcamp FLAME - do Zero ao Deploy.

Você foi selecionado(a) para usar nossa plataforma de estudos (a trilha completa com aulas, desafios e progresso).

*Banner do Bootcamp:*
https://study-flame.vercel.app/Flamebanner.png

*Entre no grupo oficial (avisos + suporte + materiais):*
https://chat.whatsapp.com/BMoAhtm2ofhCRPxCgAcFmB

*Acesse a plataforma:*
https://Study-flame.vercel.app/

*Suas credenciais de acesso:*
CPF: ${student.cpf}
Senha: ${student.password}

Qualquer dúvida (acesso, trilha, exercícios, deploy), me chama aqui sem medo - vou te ajudar.

Bem-vindo(a) à jornada!`
    );
    
    const updatedStudents = students.map(s =>
      s.id === student.id ? { ...s, credentialsSent: true } : s
    );
    setStudents(updatedStudents);
    
    window.open(`https://wa.me/${student.whatsapp?.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const togglePasswordVisibility = (studentId: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8"
    >
      <input
        type="file"
        accept=".json"
        onChange={handleImportStudents}
        className="hidden"
        id="import-students-json"
        disabled={importing}
      />

      {/* Seção de Gerador de Credenciais */}
      {importedLeads.length > 0 && (
        <div className="mb-8 rounded-2xl bg-card p-6 border border-border shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="text-primary" size={22} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Gerador de Credenciais ({importedLeads.length} leads)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="import-students-json"
                className={`flex cursor-pointer items-center rounded-xl bg-primary p-2.5 text-primary-foreground shadow-md transition hover:bg-primary/90 ${
                  importing ? 'cursor-not-allowed opacity-50' : ''
                }`}
                title={importing ? 'Importando...' : 'Importar JSON'}
              >
                <Upload size={20} />
              </label>
              <button
                onClick={() => setShowAddModal(true)}
                className="rounded-xl bg-primary p-2.5 text-primary-foreground shadow-md transition hover:bg-primary/90"
                title="Adicionar Lead"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">Aluno</th>
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">CPF</th>
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">Senha</th>
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">Ações</th>
                  <th className="px-4 py-3 text-sm font-semibold text-foreground">Acesso</th>
                </tr>
              </thead>
              <tbody>
                {loadingLeads || loadingCredentials ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      Carregando...
                    </td>
                  </tr>
                ) : (
                  importedLeads.map((lead) => {
                    const cred = credentials.find(c => c.leadId === lead.id);
                    const isGenerating = generatingFor === lead.id;
                    
                    return (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-border transition hover:bg-muted"
                      >
                        {/* Aluno */}
                        <td className="px-4 py-3">
                          <div 
                            className={`${cred ? 'cursor-pointer hover:bg-primary/10 rounded-lg p-1 -m-1 transition' : ''}`}
                            onClick={() => cred && setSelectedStudent(cred)}
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground hover:text-primary transition">{lead.name}</p>
                              {cred && cred.lastLoginAt && (
                                <span className="flex items-center gap-1 text-xs text-green-600" title={`Último acesso: ${formatDate(cred.lastLoginAt)}`}>
                                  <Clock size={10} />
                                </span>
                              )}
                              {cred && !cred.lastLoginAt && (
                                <span className="flex items-center gap-1 text-xs text-yellow-600" title="Nunca acessou">
                                  <Clock size={10} />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </td>

                        {/* CPF */}
                        <td className="px-4 py-3">
                          <code className="rounded bg-muted px-2 py-1 text-sm font-mono font-medium text-foreground">{lead.cpf}</code>
                        </td>

                        {/* Senha */}
                        <td className="px-4 py-3">
                          {cred ? (
                            <div className="flex items-center gap-2">
                              <code className="rounded-lg bg-primary/10 px-3 py-1.5 font-mono text-sm font-semibold text-primary shadow-sm">
                                {visiblePasswordsCred[cred.id] ? cred.password : '••••••••'}
                              </code>
                              <button
                                onClick={() => setVisiblePasswordsCred({
                                  ...visiblePasswordsCred,
                                  [cred.id]: !visiblePasswordsCred[cred.id]
                                })}
                                className="text-muted-foreground transition hover:text-foreground"
                              >
                                {visiblePasswordsCred[cred.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <button
                                onClick={() => regeneratePassword(cred.id)}
                                className="text-muted-foreground transition hover:text-primary"
                                title="Regenerar senha"
                              >
                                <RefreshCw size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => generateCredentials(lead.id)}
                              disabled={isGenerating}
                              className={`rounded-xl bg-primary p-2.5 text-primary-foreground shadow-md transition hover:bg-primary/90 ${
                                isGenerating ? 'cursor-not-allowed opacity-50' : ''
                              }`}
                              title={isGenerating ? 'Gerando...' : 'Gerar credenciais'}
                            >
                              <Key size={16} />
                            </button>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          {cred ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-500/20 px-3 py-1 ring-1 ring-green-400/30">
                                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">OK</span>
                              </div>
                              {cred.credentialsSent && (
                                <div className="flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-500/20 px-3 py-1 ring-1 ring-blue-400/30">
                                  <Send size={16} className="text-blue-600 dark:text-blue-400" />
                                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Enviado</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 px-3 py-1 ring-1 ring-yellow-400/30">
                              <XCircle size={16} className="text-yellow-600 dark:text-yellow-400" />
                              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">Pendente</span>
                            </div>
                          )}
                        </td>

                        {/* Ações */}
                        <td className="px-4 py-3">
                          {cred && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyCredentials(cred)}
                                className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:border-orange-500/50 hover:bg-muted hover:text-foreground"
                                title="Copiar Credenciais"
                              >
                                <Copy size={16} />
                              </button>
                              <button
                                onClick={() => sendEmail(cred)}
                                className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:border-blue-500/50 hover:bg-muted hover:text-foreground"
                                title="Enviar por Email"
                              >
                                <Mail size={16} />
                              </button>
                              <button
                                onClick={() => sendWhatsApp(cred)}
                                className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:border-green-500/50 hover:bg-muted hover:text-foreground"
                                title="Enviar por WhatsApp"
                              >
                                <Smartphone size={16} />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Acesso */}
                        <td className="px-4 py-3">
                          {cred && (
                            <button
                              onClick={() => toggleAccess(cred.id)}
                              className={`rounded-lg p-2 transition ${
                                cred.isActive
                                  ? 'border border-red-500/30 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20'
                                  : 'border border-green-500/30 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20'
                              }`}
                              title={cred.isActive ? 'Bloquear acesso' : 'Liberar acesso'}
                            >
                              {cred.isActive ? <Lock size={18} /> : <CheckCircle size={18} />}
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Adicionar Lead</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground transition hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Nome Completo</label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Ex: João Silva"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Ex: joao@email.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Telefone</label>
                <input
                  type="text"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Ex: 11999999999"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">CPF</label>
                <input
                  type="text"
                  value={newLead.cpf}
                  onChange={(e) => setNewLead({ ...newLead, cpf: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Ex: 12345678900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Experiência</label>
                <select
                  value={newLead.experience}
                  onChange={(e) => setNewLead({ ...newLead, experience: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="">Selecione...</option>
                  <option value="Básico - Conheço o básico">Básico - Conheço o básico</option>
                  <option value="Iniciante - Nunca programei">Iniciante - Nunca programei</option>
                  <option value="Intermediário - Já fiz alguns projetos">Intermediário - Já fiz alguns projetos</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  onClick={addLeadManually}
                  disabled={addingLead || !newLead.name || !newLead.email || !newLead.cpf}
                  className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {addingLead ? 'Adicionando...' : 'Adicionar'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Informações do Aluno */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/30">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedStudent.leadName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.leadEmail}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Informações de Acesso */}
            <div className="space-y-4">
              {/* Último Login */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <LogIn className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Último Login</span>
                </div>
                <div className="ml-8">
                  {selectedStudent.lastLoginAt ? (
                    <>
                      <p className="text-lg font-medium text-green-600">{getTimeSinceLogin(selectedStudent.lastLoginAt)}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(selectedStudent.lastLoginAt)}</p>
                    </>
                  ) : (
                    <p className="text-lg font-medium text-yellow-600">Nunca acessou</p>
                  )}
                </div>
              </div>

              {/* Total de Acessos */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-foreground">Total de Acessos</span>
                </div>
                <div className="ml-8">
                  <p className="text-2xl font-bold text-blue-600">{selectedStudent.loginCount || 0}</p>
                  <p className="text-xs text-muted-foreground">vezes na plataforma</p>
                </div>
              </div>

              {/* Credenciais Criadas */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-foreground">Credenciais Criadas</span>
                </div>
                <div className="ml-8">
                  <p className="text-sm text-muted-foreground">{formatDate(selectedStudent.createdAt)}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-foreground">Status do Acesso</span>
                </div>
                <button
                  onClick={async () => {
                    await toggleAccess(selectedStudent.id);
                    // Atualizar o estado local
                    setSelectedStudent({
                      ...selectedStudent,
                      isActive: !selectedStudent.isActive
                    });
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
                    selectedStudent.isActive 
                      ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400' 
                      : 'bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400'
                  }`}
                  title={selectedStudent.isActive ? 'Clique para desativar' : 'Clique para ativar'}
                >
                  {selectedStudent.isActive ? '✓ Ativo' : '✗ Inativo'}
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={async () => {
                  await toggleAccess(selectedStudent.id);
                  setSelectedStudent({
                    ...selectedStudent,
                    isActive: !selectedStudent.isActive
                  });
                }}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  selectedStudent.isActive
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                }`}
              >
                {selectedStudent.isActive ? (
                  <>
                    <XCircle size={16} />
                    Desativar Acesso
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Ativar Acesso
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
