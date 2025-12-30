import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Clock, AlertCircle, CheckCircle, Trophy, Play, Shield } from 'lucide-react';
import { PreExamInstructions } from './PreExamInstructions';
import { OfficialExamSimulator } from './OfficialExamSimulator';
import { awsExamService } from '@/services/api';

interface OfficialExamScreenProps {
  onStart: () => void;
  onBack: () => void;
}

type ExamScreen = 'info' | 'instructions' | 'exam';

export function OfficialExamScreen({ onStart, onBack }: OfficialExamScreenProps) {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<ExamScreen>('info');
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dados da certificação
  const certification = {
    fullName: 'AWS Certified Solutions Architect - Associate',
    name: 'SAA-C03'
  };

  const examDetails = {
    totalQuestions: 65,
    timeLimit: 130,
    passingScore: 72,
    domains: [
      { name: 'Design de Arquiteturas Resilientes', percentage: 30, color: 'blue' },
      { name: 'Design de Alta Performance', percentage: 28, color: 'green' },
      { name: 'Design Seguro', percentage: 24, color: 'orange' },
      { name: 'Design com Otimização de Custos', percentage: 18, color: 'purple' }
    ]
  };

  // Handler para avançar para instruções
  const handleGoToInstructions = () => {
    setCurrentScreen('instructions');
  };

  // Handler para iniciar o exame
  const handleStartExam = async () => {
    try {
      setLoading(true);
      // Buscar 65 questões aleatórias do backend
      const questions = await awsExamService.getRandomQuestions(65);
      setExamQuestions(questions);
      setCurrentScreen('exam');
    } catch (err) {
      console.error('Erro ao carregar questões:', err);
      alert('Erro ao carregar questões. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Handler para voltar
  const handleBack = () => {
    if (currentScreen === 'instructions') {
      setCurrentScreen('info');
    } else {
      onBack();
    }
  };

  // Tela do Exame
  if (currentScreen === 'exam') {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Prova Oficial</h2>
            <p className="text-gray-600">Preparando suas 65 questões...</p>
          </div>
        </div>
      );
    }

    return (
      <OfficialExamSimulator
        examQuestions={examQuestions}
        timeLimit={examDetails.timeLimit}
        onBack={onBack}
      />
    );
  }

  // Tela de Instruções Pré-Exame
  if (currentScreen === 'instructions') {
    return (
      <PreExamInstructions
        onStartExam={handleStartExam}
        onBack={handleBack}
        timeLimit={examDetails.timeLimit}
        totalQuestions={examDetails.totalQuestions}
        loading={loading}
      />
    );
  }

  // Tela de Informações (padrão)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 items-center gap-2 justify-center mx-auto w-fit">
          <Shield size={16} />
          MODO PROVA OFICIAL
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          {certification.fullName}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {certification.name}
        </p>
        <p className="text-lg text-gray-500">
          Experiência idêntica à certificação oficial
        </p>
      </div>

      {/* Warning Card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl mb-6">
        <div className="flex items-start gap-4">
          <AlertCircle size={32} className="flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2">Atenção: Simulação Real</h3>
            <p className="text-amber-50">
              Esta é uma simulação oficial com as mesmas condições da prova de certificação AWS. 
              Não é possível pausar ou modificar as configurações após o início.
            </p>
          </div>
        </div>
      </div>

      {/* Exam Details */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-100 p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Especificações da Prova</h2>
            <p className="text-gray-600">Formato oficial AWS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Questões */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="text-purple-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Questões</h3>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">{examDetails.totalQuestions}</div>
            <div className="text-sm text-gray-700">Questões de múltipla escolha</div>
            <div className="mt-3 text-xs text-gray-600">
              • Escolha simples e múltipla<br />
              • Baseadas em cenários reais<br />
              • Distribuição por domínios AWS
            </div>
          </div>

          {/* Tempo */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-blue-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Tempo Limite</h3>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{examDetails.timeLimit}</div>
            <div className="text-sm text-gray-700">minutos ({Math.floor(examDetails.timeLimit / 60)}h {examDetails.timeLimit % 60}min)</div>
            <div className="mt-3 text-xs text-gray-600">
              • Cronômetro regressivo<br />
              • Aproximadamente {Math.round(examDetails.timeLimit / examDetails.totalQuestions)} min/questão<br />
              • Tempo oficial da certificação
            </div>
          </div>

          {/* Nota de Aprovação */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="text-green-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Aprovação</h3>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">{examDetails.passingScore}%</div>
            <div className="text-sm text-gray-700">Nota mínima para passar</div>
            <div className="mt-3 text-xs text-gray-600">
              • {Math.ceil(examDetails.totalQuestions * (examDetails.passingScore / 100))} de {examDetails.totalQuestions} questões corretas<br />
              • Score de {examDetails.passingScore * 10}/1000 pontos<br />
              • Padrão oficial AWS
            </div>
          </div>

          {/* Regras */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="text-red-600" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Regras</h3>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Sem feedback durante a prova</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Possível marcar questões para revisão</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Resultados detalhados ao final</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Não é possível pausar o timer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domains Coverage */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Domínios da Certificação</h3>
        
        <div className="space-y-4">
          {examDetails.domains.map((domain) => (
            <div key={domain.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">{domain.name}</span>
                <span className="text-gray-700 font-bold">{domain.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r from-${domain.color}-500 to-${domain.color}-600 h-3 rounded-full`}
                  style={{ width: `${domain.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Pronto para começar?</h3>
          <p className="text-blue-100">
            Certifique-se de ter {examDetails.timeLimit} minutos disponíveis sem interrupções
          </p>
        </div>

        <button
          onClick={handleGoToInstructions}
          className="w-full bg-white text-blue-600 px-8 py-5 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 hover:scale-105"
        >
          <Play size={28} />
          Continuar para Instruções
        </button>

        <div className="mt-4 text-center text-sm text-blue-100">
          ⚠️ Você verá as instruções finais antes de iniciar o exame
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900 underline"
        >
          Voltar ao menu
        </button>
      </div>
    </div>
  );
}
