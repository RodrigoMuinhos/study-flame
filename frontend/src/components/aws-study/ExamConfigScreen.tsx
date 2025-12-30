import React, { useState } from 'react';
import { Clock, Zap, Target, TrendingUp, ChevronLeft } from 'lucide-react';

interface ExamConfigScreenProps {
  onStartExam: (config: ExamConfig) => void;
  onBack: () => void;
}

export interface ExamConfig {
  questionsCount: 10 | 20 | 30 | 40 | 50 | 65;
  timerEnabled: boolean;
  timerMinutes: number;
  feedbackEnabled: boolean;
  mixedMode?: boolean;
  topicMix?: {
    topic: string;
    quantity: number;
  }[];
}

export function ExamConfigScreen({ onStartExam, onBack }: ExamConfigScreenProps) {
  const [questionsCount, setQuestionsCount] = useState<10 | 20 | 30 | 40 | 50 | 65>(30);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [feedbackEnabled, setFeedbackEnabled] = useState(false);

  const getTimerMinutes = () => {
    switch (questionsCount) {
      case 10: return 20;
      case 20: return 40;
      case 30: return 60;
      case 40: return 80;
      case 50: return 100;
      case 65: return 130;
    }
  };

  const handleStartExam = () => {
    onStartExam({
      questionsCount,
      timerEnabled,
      timerMinutes: getTimerMinutes(),
      feedbackEnabled,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Voltar
        </button>

        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            SIMULADOR AWS
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Simulador AWS
          </h1>
          <p className="text-lg text-gray-600">
            Simulados configuráveis (quantidade, tempo e feedback)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
          {/* Quantidade de Questões */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Target size={24} className="text-orange-600" />
              Quantas questões você quer?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[10, 20, 30, 40, 50, 65].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionsCount(count as 10 | 20 | 30 | 40 | 50 | 65)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    questionsCount === count
                      ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/30'
                  }`}
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">{count}</div>
                  <div className="text-xs text-gray-600">questões</div>
                  <div className="text-xs text-orange-600 mt-1">≈{Math.round(count * 2)} min</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Clock size={24} className="text-blue-600" />
              Cronômetro
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setTimerEnabled(true)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  timerEnabled
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Com Timer</span>
                </div>
                <div className="text-sm text-gray-600">
                  {getTimerMinutes()} minutos ({Math.round(getTimerMinutes() / questionsCount * 10) / 10} min/questão)
                </div>
              </button>

              <button
                onClick={() => setTimerEnabled(false)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  !timerEnabled
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap size={20} className="text-blue-600" />
                  <span className="font-semibold text-gray-900">Sem Limite</span>
                </div>
                <div className="text-sm text-gray-600">
                  Aprenda no seu ritmo
                </div>
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <TrendingUp size={24} className="text-purple-600" />
              Feedback
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setFeedbackEnabled(true)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  feedbackEnabled
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-purple-600" />
                  <span className="font-semibold text-gray-900">Feedback Imediato</span>
                </div>
                <div className="text-sm text-gray-600">
                  Ver se acertou após cada questão
                </div>
              </button>

              <button
                onClick={() => setFeedbackEnabled(false)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  !feedbackEnabled
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target size={20} className="text-purple-600" />
                  <span className="font-semibold text-gray-900">Somente no Review</span>
                </div>
                <div className="text-sm text-gray-600">
                  Ver respostas apenas no final
                </div>
              </button>
            </div>
          </div>

          {/* Botão Iniciar */}
          <button
            onClick={handleStartExam}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            🚀 Iniciar Simulado ({questionsCount} questões • {timerEnabled ? `~${getTimerMinutes()} min` : 'Sem limite'})
          </button>
        </div>

        {/* Dica */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> A prova real da AWS tem 65 questões em 130 minutos. Pratique com timer para simular a experiência real!
          </p>
        </div>
      </div>
    </div>
  );
}
