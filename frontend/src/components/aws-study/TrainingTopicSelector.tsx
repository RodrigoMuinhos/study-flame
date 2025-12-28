import React from 'react';
import { 
  Cloud, Globe, HardDrive, Network, Layers, Shield, Server, 
  TrendingUp, Workflow, GitBranch, Bell, Database, Lock, 
  Activity, Box, ArrowLeft 
} from 'lucide-react';
import { trainingTopics } from '@/data/trainingTopics';
import { practitionerTrainingTopics } from '@/data/practitionerTrainingTopics';
import { useAWSStudy } from '@/contexts/AWSStudyContext';

interface TrainingTopicSelectorProps {
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud size={32} />,
  Globe: <Globe size={32} />,
  HardDrive: <HardDrive size={32} />,
  Network: <Network size={32} />,
  Layers: <Layers size={32} />,
  Shield: <Shield size={32} />,
  Server: <Server size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Workflow: <Workflow size={32} />,
  GitBranch: <GitBranch size={32} />,
  Bell: <Bell size={32} />,
  Database: <Database size={32} />,
  Lock: <Lock size={32} />,
  Activity: <Activity size={32} />,
  Box: <Box size={32} />
};

export function TrainingTopicSelector({ onSelectTopic, onBack }: TrainingTopicSelectorProps) {
  const { currentCertification } = useAWSStudy();
  const topics = currentCertification === 'practitioner' ? practitionerTrainingTopics : trainingTopics;

  // Agrupar por categoria
  const groupedTopics = topics.reduce((acc, topic) => {
    const groupKey = topic.domain || topic.category || 'Outros';
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(topic);
    return acc;
  }, {} as Record<string, typeof topics>);

  // Função para renderizar o ícone corretamente
  const renderIcon = (icon: string) => {
    // Se for emoji (começar com caractere emoji), renderiza diretamente
    if (icon.length <= 2 || /\p{Emoji}/u.test(icon)) {
      return <span className="text-4xl">{icon}</span>;
    }
    // Se for nome de ícone Lucide, busca no iconMap
    return iconMap[icon] || <Box size={32} />;
  };

  // Função para obter o nome do tópico
  const getTopicName = (topic: typeof topics[0]) => {
    return topic.name || topic.title || 'Sem título';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Modo Treino — Escolha o Assunto
            </h1>
            <p className="text-lg text-gray-600">
              Treine um tópico específico com 20 questões focadas, explicações completas e progresso acompanhado.
            </p>
            
            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">20</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">20 questões focadas</div>
                  <div className="text-sm text-gray-600">Por tópico específico</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">∞</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sem limite de tempo</div>
                  <div className="text-sm text-gray-600">Aprenda no seu ritmo</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Feedback imediato</div>
                  <div className="text-sm text-gray-600">Explicações detalhadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics por Categoria */}
        <div className="space-y-8">
          {Object.entries(groupedTopics).map(([category, categoryTopics]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-1 bg-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-500 p-6 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {renderIcon(topic.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                            {topic.questionCount} questões
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {getTopicName(topic)}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {topic.description}
                    </p>
                    
                    <button className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors flex items-center gap-1">
                      Iniciar Treino →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
