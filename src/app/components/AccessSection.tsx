import { useState } from "react";
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
  EyeOff
} from "lucide-react";
import { motion } from "motion/react";

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

  const handleImportStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.students && Array.isArray(data.students)) {
          setStudents(data.students);
          alert(`${data.students.length} aluno(s) importado(s) com sucesso!`);
        } else if (Array.isArray(data)) {
          setStudents(data);
          alert(`${data.length} aluno(s) importado(s) com sucesso!`);
        } else {
          alert('Formato de JSON inválido. Esperado um array de alunos.');
        }
      } catch (error) {
        alert('Erro ao importar JSON. Verifique se o arquivo está correto.');
        console.error(error);
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
    // Simulação de envio de WhatsApp
    const message = encodeURIComponent(
      `Olá ${student.name}! 🔥\n\nSuas credenciais de acesso ao Portal FLAME:\n\nCPF: ${student.cpf}\nSenha: ${student.password}\n\nAcesse: portal.flame.com`
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
      <div className="mb-6 flex justify-end">
        <input
          type="file"
          accept=".json"
          onChange={handleImportStudents}
          className="hidden"
          id="import-students-json"
        />
        <label
          htmlFor="import-students-json"
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
        >
          <Upload size={18} />
          Importar JSON
        </label>
      </div>

      {students.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#F5F1E8]/5 p-12 text-center">
          <Upload className="mx-auto mb-4 text-white/40" size={48} />
          <h3 className="mb-2 font-semibold text-white">Nenhum aluno cadastrado</h3>
          <p className="mb-4 text-white/60">Importe um arquivo JSON com os dados dos alunos</p>
          <label
            htmlFor="import-students-json"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:shadow-orange-500/40"
          >
            <Upload size={18} />
            Selecionar Arquivo JSON
          </label>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#F5F1E8]/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-3 text-left text-white/70">Aluno</th>
                  <th className="px-6 py-3 text-left text-white/70">Senha</th>
                  <th className="px-6 py-3 text-left text-white/70">Status</th>
                  <th className="px-6 py-3 text-left text-white/70">Ações</th>
                  <th className="px-6 py-3 text-left text-white/70">Acesso</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 transition hover:bg-white/5"
                  >
                    {/* Aluno */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-xs text-white/50">{student.email}</p>
                      </div>
                    </td>

                    {/* Senha */}
                    <td className="px-6 py-4">
                      {student.password ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-orange-400">
                            {visiblePasswords[student.id] ? student.password : '••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(student.id)}
                            className="text-orange-400/60 transition hover:text-orange-400"
                          >
                            {visiblePasswords[student.id] ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleGeneratePassword(student.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-400 transition hover:bg-orange-500/20"
                        >
                          <Key size={14} />
                          Gerar
                        </button>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {student.credentialsSent ? (
                        <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                          <CheckCircle size={12} />
                          Enviado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                          <XCircle size={12} />
                          Pendente
                        </span>
                      )}
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4">
                      {student.password ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleGeneratePassword(student.id)}
                            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                            title="Regerar senha"
                          >
                            <Key size={16} />
                          </button>
                          <button
                            onClick={() => handleCopyCredentials(student)}
                            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                            title="Copiar credenciais"
                          >
                            <Copy size={16} />
                          </button>
                          <button
                            onClick={() => handleSendEmail(student)}
                            className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500/20"
                            title="Enviar por email"
                          >
                            <Mail size={16} />
                          </button>
                          {student.whatsapp && (
                            <button
                              onClick={() => handleSendWhatsApp(student)}
                              className="rounded-lg border border-green-500/30 bg-green-500/10 p-2 text-green-400 transition hover:bg-green-500/20"
                              title="Enviar por WhatsApp"
                            >
                              <Smartphone size={16} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-white/40">Gere a senha primeiro</span>
                      )}
                    </td>

                    {/* Acesso */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onToggleAccess(student.id)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                          student.accessEnabled
                            ? "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            : "border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        }`}
                      >
                        {student.accessEnabled ? (
                          <>
                            <Lock size={14} />
                            Bloquear
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} />
                            Liberar
                          </>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}