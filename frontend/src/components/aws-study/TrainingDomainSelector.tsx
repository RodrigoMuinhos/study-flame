import React from 'react';
import { ArrowLeft, Cloud, Globe, HardDrive, Network, Layers, Shield, Server, TrendingUp, Workflow, GitBranch, Bell, Database, Lock, Activity, Box } from 'lucide-react';
import { trainingTopics } from '@/data/trainingTopics';

interface TrainingDomainSelectorProps {
  onSelectDomain: (domainId: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, any> = {
  Cloud,
  Globe,
  HardDrive,
  Network,
  Layers,
  Shield,
  Server,
  TrendingUp,
  Workflow,
  GitBranch,
  Bell,
  Database,
  Lock,
  Activity,
  Box
};

export function TrainingDomainSelector({ onSelectDomain, onBack }: TrainingDomainSelectorProps) {
  // Agrupar tópicos por categoria
  const categories = trainingTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, typeof trainingTopics>);

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Modo Treino — Escolha o Tema
            </h1>
            <p className="text-lg text-gray-600">
              Pratique de <strong className="text-blue-600">1 a 20 questões</strong> por tema baseado no diagrama AWS
            </p>
          </div>
        </div>

        {/* Topics por Categoria */}
        {Object.entries(categories).map(([categoryName, topics]) => (
          <div key={categoryName} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
              {categoryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => {
                const IconComponent = iconMap[topic.icon];
                return (
                  <div
                    key={topic.id}
                    onClick={() => onSelectDomain(topic.id)}
                    className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg group"
                  >
                    {/* Icon e Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {IconComponent && <IconComponent size={24} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">
                          {topic.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          1-20 questões
                        </span>
                      </div>
                    </div>
                    
                    {/* Descrição */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center mt-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-gray-900">Dica:</strong> Os temas seguem a estrutura do diagrama AWS. Pratique cada serviço separadamente para dominar a arquitetura completa.
          </p>
        </div>
      </div>
    </div>
  );
}
