import React from 'react';
import { Calendar, Clock, Book, TrendingUp, Target, Trophy, Award, ArrowLeft } from 'lucide-react';
import { PlanDuration } from '@/data/studyPlanData';

interface StudyPlanSelectionProps {
  certificationName: string;
  certificationFullName: string;
  onSelectDuration: (duration: PlanDuration) => void;
  onBack: () => void;
}

export function StudyPlanSelection({ 
  certificationName, 
  certificationFullName, 
  onSelectDuration, 
  onBack 
}: StudyPlanSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all mb-6"
          >
            <ArrowLeft size={20} />
            Voltar ao Início
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="text-blue-600" size={48} />
              <h1 className="text-gray-900 text-3xl md:text-4xl font-bold">Roteiro de Estudos</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Escolha o plano ideal para sua preparação - {certificationFullName}
            </p>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 4 Weeks - Intensivo */}
          <div 
            onClick={() => onSelectDuration(4)}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-500 group"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-red-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Plano Intensivo</h2>
              <div className="text-4xl font-bold text-red-600 mb-2">4 Semanas</div>
              <p className="text-gray-600">Para quem tem pressa e disponibilidade</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock className="text-red-600 flex-shrink-0" size={18} />
                <span>20-25 horas por semana</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Book className="text-red-600 flex-shrink-0" size={18} />
                <span>Conteúdo concentrado</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <TrendingUp className="text-red-600 flex-shrink-0" size={18} />
                <span>Ritmo acelerado</span>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-800 font-medium">
                ⚡ Ideal para quem já tem experiência com AWS
              </p>
            </div>
          </div>

          {/* 8 Weeks - Balanceado */}
          <div 
            onClick={() => onSelectDuration(8)}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 group relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              RECOMENDADO
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="text-blue-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Plano Balanceado</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">8 Semanas</div>
              <p className="text-gray-600">Equilíbrio perfeito</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock className="text-blue-600 flex-shrink-0" size={18} />
                <span>12-15 horas por semana</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Book className="text-blue-600 flex-shrink-0" size={18} />
                <span>Conteúdo bem distribuído</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <TrendingUp className="text-blue-600 flex-shrink-0" size={18} />
                <span>Ritmo moderado</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">
                ⭐ Melhor relação tempo/aprendizado
              </p>
            </div>
          </div>

          {/* 12 Weeks - Completo */}
          <div 
            onClick={() => onSelectDuration(12)}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-500 group"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Plano Completo</h2>
              <div className="text-4xl font-bold text-green-600 mb-2">12 Semanas</div>
              <p className="text-gray-600">Aprendizado profundo</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock className="text-green-600 flex-shrink-0" size={18} />
                <span>8-10 horas por semana</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Book className="text-green-600 flex-shrink-0" size={18} />
                <span>Conteúdo detalhado</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <TrendingUp className="text-green-600 flex-shrink-0" size={18} />
                <span>Ritmo confortável</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">
                🌱 Ideal para iniciantes em AWS
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comparação dos Planos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 text-gray-700">Característica</th>
                  <th className="text-center p-4 text-red-600">4 Semanas</th>
                  <th className="text-center p-4 text-blue-600">8 Semanas</th>
                  <th className="text-center p-4 text-green-600">12 Semanas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Horas por semana</td>
                  <td className="text-center p-4">20-25h</td>
                  <td className="text-center p-4 font-bold">12-15h</td>
                  <td className="text-center p-4">8-10h</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Profundidade</td>
                  <td className="text-center p-4">Essencial</td>
                  <td className="text-center p-4 font-bold">Completo</td>
                  <td className="text-center p-4">Detalhado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Experiência recomendada</td>
                  <td className="text-center p-4">Intermediária</td>
                  <td className="text-center p-4 font-bold">Básica</td>
                  <td className="text-center p-4">Nenhuma</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700">Simulados completos</td>
                  <td className="text-center p-4">2</td>
                  <td className="text-center p-4 font-bold">3</td>
                  <td className="text-center p-4">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
