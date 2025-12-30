import React from 'react';
import { BookOpen, GraduationCap, Network, Clock, CheckCircle, Target, BarChart3 } from 'lucide-react';

export interface HomeScreenProps {
  onSelectDiagram?: () => void;
  onSelectTraining?: () => void;
  onSelectExam?: () => void;
  onSelectStats?: () => void;
}

export function HomeScreen({ 
  onSelectDiagram = () => {}, 
  onSelectTraining = () => {}, 
  onSelectExam = () => {}, 
  onSelectStats = () => {} 
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap size={48} className="text-orange-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              AWS Learning Platform
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma completa de estudo para AWS Solutions Architect Associate
          </p>
        </div>

        {/* Cards de Opções */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Diagrama Interativo */}
          <div
            onClick={onSelectDiagram}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-500 p-8 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Network size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Diagrama Interativo</h2>
                <p className="text-gray-600">Aprenda visualmente</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Explore uma arquitetura AWS completa com todos os componentes principais.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle size={18} className="text-green-600" />
                <span>18 componentes AWS explicados</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CheckCircle size={18} className="text-green-600" />
                <span>Tour guiado passo a passo</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Explorar Diagrama →
            </button>
          </div>

          {/* Modo Treino */}
          <div
            onClick={onSelectTraining}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-500 p-8 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Modo Treino</h2>
                <p className="text-gray-600">Pratique por tópico</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Escolha um assunto específico e pratique com questões focadas.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <BookOpen size={18} className="text-green-600" />
                <span>20 questões por tópico</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock size={18} className="text-green-600" />
                <span>Sem limite de tempo</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Iniciar Treino →
            </button>
          </div>

          {/* Simulador de Prova */}
          <div
            onClick={onSelectExam}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 p-8 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Simulador de Prova</h2>
                <p className="text-gray-600">Teste seus conhecimentos</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Pratique com questões no formato oficial da certificação AWS.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock size={18} className="text-blue-600" />
                <span>130 minutos (tempo oficial)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <GraduationCap size={18} className="text-blue-600" />
                <span>65 questões com explicações</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Iniciar Simulado →
            </button>
          </div>

          {/* Estatísticas */}
          <div
            onClick={onSelectStats}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500 p-8 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Estatísticas</h2>
                <p className="text-gray-600">Acompanhe seu progresso</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Dashboard completo com histórico, conquistas e análise de performance.
            </p>

            <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Ver Estatísticas →
            </button>
          </div>
        </div>

        {/* Informações da Certificação */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">🎯 Sobre a Certificação SAA-C03</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold mb-2">Formato da Prova</p>
              <ul className="space-y-1 opacity-90">
                <li>• 65 questões múltipla escolha</li>
                <li>• Duração: 130 minutos</li>
                <li>• Nota de corte: 72%</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Domínios</p>
              <ul className="space-y-1 opacity-90">
                <li>• Design de Arquiteturas Resilientes</li>
                <li>• Design de Alta Performance</li>
                <li>• Design Seguro</li>
                <li>• Design com Otimização de Custos</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Serviços Principais</p>
              <ul className="space-y-1 opacity-90">
                <li>• EC2, VPC, S3, RDS</li>
                <li>• CloudFront, Route 53, ALB</li>
                <li>• IAM, CloudWatch, Auto Scaling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
