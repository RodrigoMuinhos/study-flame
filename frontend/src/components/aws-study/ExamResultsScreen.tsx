import React from 'react';
import { Trophy, Clock, Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  passed: boolean;
  percentage: number;
  questionsReview: Array<{
    id: number;
    question: string;
    wasCorrect: boolean;
    selectedAnswer: string;
    correctAnswer: string;
  }>;
}

interface ExamResultsScreenProps {
  result: ExamResult;
  onReviewQuestion: (questionId: number) => void;
  onRetakeExam: () => void;
  onBackToHome: () => void;
}

export function ExamResultsScreen({ 
  result, 
  onReviewQuestion, 
  onRetakeExam, 
  onBackToHome 
}: ExamResultsScreenProps) {
  const { totalQuestions, correctAnswers, timeSpent, passed, percentage, questionsReview } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com resultado principal */}
        <div className={`rounded-2xl shadow-2xl p-8 md:p-12 mb-8 ${
          passed 
            ? 'bg-gradient-to-br from-green-500 to-green-600' 
            : 'bg-gradient-to-br from-red-500 to-red-600'
        }`}>
          <div className="text-center text-white">
            <div className="mb-6">
              <Trophy size={64} className="mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {passed ? '🎉 Parabéns!' : '📚 Continue Estudando!'}
              </h1>
              <p className="text-xl opacity-90">
                {passed 
                  ? 'Você passou no simulado!' 
                  : 'Você ainda não atingiu a nota mínima.'}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-block">
              <div className="text-7xl font-bold mb-2">{percentage}%</div>
              <div className="text-lg opacity-90">
                {correctAnswers} de {totalQuestions} questões corretas
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Acertos</p>
                <p className="text-2xl font-bold text-gray-900">{correctAnswers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Erros</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuestions - correctAnswers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempo</p>
                <p className="text-2xl font-bold text-gray-900">{timeSpent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota mínima */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center gap-3">
            <Target size={32} />
            <div>
              <p className="font-semibold text-lg">Nota mínima para passar: 72%</p>
              <p className="opacity-90">
                {passed 
                  ? `Você superou a nota mínima em ${percentage - 72}%!` 
                  : `Você precisa de mais ${72 - percentage}% para passar.`}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de questões para revisão */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span>📝</span>
            Revisão das Questões
          </h2>

          <div className="space-y-3">
            {questionsReview.map((q, index) => (
              <div 
                key={q.id}
                onClick={() => onReviewQuestion(q.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                  q.wasCorrect 
                    ? 'border-green-200 bg-green-50 hover:border-green-400' 
                    : 'border-red-200 bg-red-50 hover:border-red-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    q.wasCorrect 
                      ? 'bg-green-600 text-white' 
                      : 'bg-red-600 text-white'
                  }`}>
                    {q.wasCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        Questão {q.id}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        q.wasCorrect 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {q.wasCorrect ? 'Correto' : 'Incorreto'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {q.question}
                    </p>
                    {!q.wasCorrect && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Sua resposta:</span> {q.selectedAnswer} • 
                        <span className="font-medium ml-1">Resposta correta:</span> {q.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onRetakeExam}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Refazer Simulado
          </button>

          <button
            onClick={onBackToHome}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
