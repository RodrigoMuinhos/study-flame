import React, { useState } from 'react';
import { Clock, Zap, CheckCircle, AlertCircle, Play, Timer, BookOpen } from 'lucide-react';

interface PracticeConfigScreenProps {
  mode: 'practice' | 'exam';
  topicId?: string;
  topicName?: string;
  onStart: (config: PracticeConfig) => void;
  onBack: () => void;
}

export interface PracticeConfig {
  questionCount: 10 | 20 | 30;
  hasTimer: boolean;
  timeLimit?: number;
  showFeedback: boolean;
}

export function PracticeConfigScreen({ mode, topicId, topicName, onStart, onBack }: PracticeConfigScreenProps) {
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30>(20);
  const [hasTimer, setHasTimer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  const timeLimit = questionCount * 2;

  const handleStart = () => {
    onStart({
      questionCount,
      hasTimer,
      timeLimit: hasTimer ? timeLimit : undefined,
      showFeedback,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          {mode === 'practice' ? '🎯 SIMULADOR' : '📚 MODO PRÁTICA'}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {topicName || 'Configure sua Sessão'}
        </h1>
        <p className="text-lg text-gray-600">
          Personalize sua experiência de aprendizado
        </p>
      </div>

      {/* Configuration Cards */}
      <div className="space-y-6">
        {/* Número de Questões */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Número de Questões</h2>
              <p className="text-sm text-gray-600">Escolha quantas perguntas deseja responder</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[10, 20, 30].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCount(count as 10 | 20 | 30)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  questionCount === count
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                }`}
              >
                <div className={`text-4xl font-bold mb-2 ${
                  questionCount === count ? 'text-purple-600' : 'text-gray-900'
                }`}>
                  {count}
                </div>
                <div className="text-sm text-gray-600">questões</div>
                {questionCount === count && (
                  <div className="mt-2">
                    <CheckCircle className="text-purple-600 mx-auto" size={20} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Timer className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Cronômetro</h2>
                <p className="text-sm text-gray-600">
                  {hasTimer 
                    ? `Tempo limite: ${timeLimit} minutos (${questionCount * 2} min por ${questionCount} questões)`
                    : 'Sem limite de tempo'
                  }
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setHasTimer(!hasTimer)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                hasTimer ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                hasTimer ? 'transform translate-x-8' : ''
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border-2 ${
              hasTimer ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <Clock className={hasTimer ? 'text-blue-600' : 'text-gray-400'} size={24} />
              <div className={`mt-2 font-semibold ${hasTimer ? 'text-blue-900' : 'text-gray-500'}`}>
                Com Timer
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {timeLimit} minutos para completar
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              !hasTimer ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <Zap className={!hasTimer ? 'text-green-600' : 'text-gray-400'} size={24} />
              <div className={`mt-2 font-semibold ${!hasTimer ? 'text-green-900' : 'text-gray-500'}`}>
                Sem Timer
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Aprenda no seu ritmo
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Feedback Imediato</h2>
                <p className="text-sm text-gray-600">
                  {showFeedback 
                    ? 'Ver explicações após cada resposta'
                    : 'Ver resultados apenas no final'
                  }
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                showFeedback ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                showFeedback ? 'transform translate-x-8' : ''
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border-2 ${
              showFeedback ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <CheckCircle className={showFeedback ? 'text-orange-600' : 'text-gray-400'} size={24} />
              <div className={`mt-2 font-semibold ${showFeedback ? 'text-orange-900' : 'text-gray-500'}`}>
                Com Feedback
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Aprenda com cada resposta
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              !showFeedback ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <AlertCircle className={!showFeedback ? 'text-purple-600' : 'text-gray-400'} size={24} />
              <div className={`mt-2 font-semibold ${!showFeedback ? 'text-purple-900' : 'text-gray-500'}`}>
                Sem Feedback
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Simule condições reais
              </div>
            </div>
          </div>
        </div>

        {/* Summary & Start */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Resumo da Configuração</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-green-100 text-sm mb-1">Questões</div>
              <div className="text-3xl font-bold">{questionCount}</div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-green-100 text-sm mb-1">Tempo</div>
              <div className="text-3xl font-bold">
                {hasTimer ? `${timeLimit}min` : '∞'}
              </div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4">
              <div className="text-green-100 text-sm mb-1">Feedback</div>
              <div className="text-3xl font-bold">
                {showFeedback ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 hover:scale-105"
          >
            <Play size={24} />
            Iniciar Sessão
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 underline"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
