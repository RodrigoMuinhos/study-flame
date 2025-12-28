import React from 'react';
import { Droplet, Eye, Heart, Rocket, Clock, CheckCircle } from 'lucide-react';

interface PreExamInstructionsProps {
  onStartExam: () => void;
  onBack: () => void;
  timeLimit: number;
  totalQuestions: number;
}

export function PreExamInstructions({ onStartExam, onBack, timeLimit, totalQuestions }: PreExamInstructionsProps) {
  const instructions = [
    {
      icon: Droplet,
      title: "Beba água",
      description: "Hidrate-se antes de começar. Isso ajuda a manter o foco e a concentração durante toda a prova.",
      color: "blue",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      icon: Eye,
      title: "Leia com atenção",
      description: "Cada palavra importa. Leia cuidadosamente cada questão e todas as alternativas antes de responder.",
      color: "green",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-600"
    },
    {
      icon: Heart,
      title: "Sinta-se confiante",
      description: "Você estudou e está preparado. Confie no seu conhecimento e mantenha a calma durante toda a prova.",
      color: "red",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      iconColor: "text-red-600"
    },
    {
      icon: Rocket,
      title: "Vamos lá!",
      description: "É hora de mostrar tudo que você aprendeu. Boa sorte e faça uma excelente prova!",
      color: "purple",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          INSTRUÇÕES PRÉ-PROVA
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          Prepare-se para o sucesso
        </h1>
        <p className="text-xl text-gray-600">
          Algumas dicas importantes antes de começar sua prova
        </p>
      </div>

      {/* Timer Info Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Clock size={40} className="flex-shrink-0" />
            <div>
              <div className="text-2xl font-bold mb-1">
                {timeLimit} minutos ({Math.floor(timeLimit / 60)}h {timeLimit % 60}min)
              </div>
              <div className="text-blue-100">
                {totalQuestions} questões • Aproximadamente {Math.round(timeLimit / totalQuestions)} min/questão
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100 mb-1">O cronômetro iniciará</div>
            <div className="text-lg font-bold">Automaticamente</div>
          </div>
        </div>
      </div>

      {/* Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {instructions.map((instruction, index) => {
          const Icon = instruction.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${instruction.bgColor} rounded-xl p-6 border-2 ${instruction.borderColor} shadow-lg hover:shadow-xl transition-all hover:scale-105`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Icon className={instruction.iconColor} size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {instruction.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {instruction.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <CheckCircle className="text-green-600" size={32} />
          Checklist Final
        </h3>
        
        <div className="space-y-4">
          {[
            'Tenho pelo menos 2 horas e 10 minutos disponíveis sem interrupções',
            'Estou em um ambiente tranquilo e adequado para fazer a prova',
            'Li todas as instruções e estou ciente das regras',
            'Estou hidratado e mentalmente preparado',
            'Tenho papel e caneta disponíveis para anotações (opcional)'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="text-green-600" size={16} />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-200 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Lembre-se:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span>Não será possível pausar a prova após o início</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span>Você pode marcar questões para revisão e voltar nelas depois</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span>Não haverá feedback durante a prova, apenas ao final</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <span>Gerencie bem seu tempo: {Math.round(timeLimit / totalQuestions)} minutos por questão em média</span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold mb-2">Está pronto?</h3>
          <p className="text-green-100 text-lg">
            Ao clicar no botão abaixo, o cronômetro começará imediatamente
          </p>
        </div>

        <button
          onClick={onStartExam}
          className="w-full bg-white text-green-600 px-8 py-6 rounded-xl font-bold text-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 hover:scale-105"
        >
          <Rocket size={32} />
          Começar Agora
        </button>

        <div className="mt-6 text-center">
          <div className="text-sm text-green-100 mb-4">
            🔥 Você consegue! Confie no seu conhecimento e boa prova!
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 underline font-medium"
        >
          Voltar para especificações da prova
        </button>
      </div>
    </div>
  );
}
