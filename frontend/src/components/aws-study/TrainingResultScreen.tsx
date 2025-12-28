import React from 'react';
import { Target, TrendingUp, TrendingDown, RefreshCw, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { TrainingResult, TrainingQuestion } from '@/types/aws-study';

interface TrainingResultScreenProps {
  result: TrainingResult;
  questions: TrainingQuestion[];
  answers: Record<number, { selected: string; isCorrect: boolean }>;
  onRetry: () => void;
  onBack: () => void;
}

export function TrainingResultScreen({ 
  result, 
  questions,
  answers,
  onRetry, 
  onBack 
}: TrainingResultScreenProps) {
  const percentage = result.score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`rounded-xl p-8 mb-8 text-white ${
          percentage >= 80 
            ? 'bg-gradient-to-r from-green-500 to-green-600' 
            : percentage >= 60
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
            : 'bg-gradient-to-r from-red-500 to-red-600'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <Target size={48} />
            <div>
              <h1 className="text-3xl font-bold">
                {percentage >= 80 ? 'Excelente! 🎉' : percentage >= 60 ? 'Bom trabalho! 👍' : 'Continue praticando! 💪'}
              </h1>
              <p className="text-lg opacity-90">{result.topic}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target size={20} />
                <span className="text-sm">Pontuação</span>
              </div>
              <p className="text-3xl font-bold">{percentage}%</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={20} />
                <span className="text-sm">Acertos</span>
              </div>
              <p className="text-3xl font-bold">{result.correctAnswers}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <XCircle size={20} />
                <span className="text-sm">Erros</span>
              </div>
              <p className="text-3xl font-bold">{result.incorrectAnswers}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">Total</span>
              </div>
              <p className="text-3xl font-bold">{result.totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Diagnóstico</h2>
          
          {result.strengths.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-green-600" />
                <h3 className="font-semibold text-green-900">Pontos Fortes</h3>
              </div>
              <ul className="space-y-1 ml-7">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-700">✓ {strength}</li>
                ))}
              </ul>
            </div>
          )}

          {result.weaknesses.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={20} className="text-red-600" />
                <h3 className="font-semibold text-red-900">Áreas para Melhorar</h3>
              </div>
              <ul className="space-y-1 ml-7">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-sm text-gray-700">• {weakness}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm font-semibold text-blue-900 mb-1">💡 Recomendação:</p>
            <p className="text-sm text-blue-700 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={onRetry}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Refazer Treino
          </button>
          <button
            onClick={onBack}
            className="flex-1 min-w-[200px] bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Escolher Outro Tópico
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Revisão das Questões</h2>

          <div className="space-y-4">
            {questions.map((question) => {
              const answer = answers[question.id];
              if (!answer) return null;

              return (
                <div
                  key={question.id}
                  className={`border-2 rounded-lg p-4 ${
                    answer.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      answer.isCorrect ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {answer.isCorrect ? (
                        <CheckCircle size={24} className="text-white" />
                      ) : (
                        <XCircle size={24} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">Questão {question.id}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {question.question}
                      </p>
                      {!answer.isCorrect && (
                        <div className="bg-white bg-opacity-50 rounded p-3 mb-2">
                          <p className="text-xs text-gray-600 mb-1">
                            <span className="font-medium">Sua resposta:</span> {answer.selected}
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Resposta correta:</span> {question.correctAnswer}
                          </p>
                        </div>
                      )}
                      <details className="text-sm">
                        <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
                          Ver explicação
                        </summary>
                        <p className="mt-2 text-gray-700 leading-relaxed bg-white bg-opacity-50 p-3 rounded">
                          {question.explanation}
                        </p>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
