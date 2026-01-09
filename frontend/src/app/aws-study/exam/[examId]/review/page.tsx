'use client';

// ============================================================================
// PÁGINA: REVIEW PÓS-PROVA
// ============================================================================
// Mostra resultado, permite filtrar e revisar questões com explicações

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  loadExamState,
  clearExamState,
  scoreExam,
  filterResults,
  formatTimeDetailed,
  type ExamState,
  type ExamResult,
  type ReviewFilter,
  type QuestionResult
} from '@/lib/exam-engine';

interface Props {
  params: Promise<{ examId: string }>;
}

export default function ReviewPage({ params }: Props) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [examState, setExamState] = useState<ExamState | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showSmartReview, setShowSmartReview] = useState(false);

  useEffect(() => {
    const loadReview = async () => {
      const state = loadExamState();
      
      if (!state || state.id !== resolvedParams.examId) {
        alert('Prova não encontrada');
        router.push('/aws-study/exam');
        return;
      }
      
      if (!state.finished) {
        router.push(`/aws-study/exam/${resolvedParams.examId}`);
        return;
      }
      
      setExamState(state);
      const examResult = await scoreExam(state);
      setResult(examResult);
      setLoading(false);
    };
    
    loadReview();
  }, [resolvedParams.examId, router]);

  const handleNewExam = () => {
    clearExamState();
    router.push('/aws-study/exam');
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-800 text-2xl">📊 Processando resultado...</div>
      </div>
    );
  }

  const filteredQuestions = filterResults(result.questions, filter);
  const currentQuestion = filteredQuestions[selectedIndex];
  const isPassed = result.score >= 72; // 72% = nota de corte AWS

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Score e Grid de Questões */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col p-6">
        {/* Botão Sair */}
        <button
          onClick={() => router.push('/aws-study')}
          className="w-full py-2.5 mb-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition text-sm border border-slate-300"
        >
          ← Sair da Revisão
        </button>

        {/* Botão Revisão Inteligente */}
        <button
          onClick={() => setShowSmartReview(true)}
          className="w-full py-2.5 mb-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition text-sm shadow-sm"
        >
          🎯 Revisão Inteligente
        </button>

        {/* Score Card */}
        <div className={`rounded-xl p-4 text-center mb-6 border-2 ${
          isPassed ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
        }`}>
          <div className="text-3xl font-bold mb-1" style={{
            color: isPassed ? '#22c55e' : '#ef4444'
          }}>
            {result.score}%
          </div>
          <div className="text-sm font-bold" style={{
            color: isPassed ? '#22c55e' : '#ef4444'
          }}>
            {isPassed ? '✅ APROVADO' : '❌ REPROVADO'}
          </div>
          {result.timeSpent && (
            <div className="mt-3 pt-3 border-t border-slate-300 text-slate-600 text-xs">
              ⏱️ {formatTimeDetailed(result.timeSpent)}
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className="mb-4">
          <div className="text-sm text-slate-700 mb-3 font-bold">Filtros</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'all', label: 'Todas', count: result.total },
              { id: 'correct', label: 'Corretas', count: result.correct },
              { id: 'incorrect', label: 'Erradas', count: result.incorrect },
              { id: 'unanswered', label: 'Branco', count: result.unanswered }
            ].map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => {
                  setFilter(id as ReviewFilter);
                  setSelectedIndex(0);
                }}
                className={`p-3 rounded-lg text-left transition text-xs ${
                  filter === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="font-bold">{label}</div>
                <div className="text-xl font-bold">{count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Questões */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-xs text-slate-700 mb-2 font-bold uppercase">Questões</div>
          <div className="grid grid-cols-5 gap-1.5">
            {filteredQuestions.map((q, idx) => (
              <button
                key={q.index}
                onClick={() => setSelectedIndex(idx)}
                className={`aspect-square rounded-md font-bold transition flex items-center justify-center text-xs ${
                  idx === selectedIndex
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-105'
                    : q.isCorrect
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : q.userAnswer
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                }`}
              >
                {q.index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Card de Informações da Prova */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="text-xs text-slate-500 uppercase mb-2">Última Prova</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700">
              {(() => {
                const kind = examState?.settings?.kind;
                if (kind === 'training') return '🎯 Treino';
                if (kind === 'simulator') return '📝 Simulador';
                return '🏆 Prova Oficial';
              })()}
            </span>
            <span className="text-xs text-slate-500">
              {(() => {
                if (!examState?.finishedAt) return '';
                const date = new Date(examState.finishedAt);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear()).slice(-2);
                return `${day}/${month}/${year}`;
              })()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={`font-bold ${result.score >= 72 ? 'text-green-600' : 'text-red-600'}`}>
              {result.score}%
            </span>
            <span className="text-slate-600 text-xs">
              {(() => {
                if (!result.timeSpent) return '';
                const mins = Math.floor(result.timeSpent / 60);
                const secs = result.timeSpent % 60;
                return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}m`;
              })()}
            </span>
          </div>
        </div>

        {/* Botão Nova Prova */}
        <div className="mt-6">
          <button
            onClick={handleNewExam}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition text-sm"
          >
            🚀 Nova Prova
          </button>
        </div>
      </aside>

      {/* Main Content - Detalhe da Questão */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
        {currentQuestion ? (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-t-xl p-5 border-b border-slate-200 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">
                  Questão {currentQuestion.index + 1} de {result.total}
                </h2>
                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold border border-purple-300">
                  {currentQuestion.question.topic}
                </span>
              </div>
            </div>

            {/* Corpo */}
            <div className="bg-white p-6 shadow-sm">
              {/* Contexto */}
              {currentQuestion.question.context && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-5 rounded">
                  <div className="text-blue-700 font-bold text-xs mb-1.5">📋 Contexto:</div>
                  <div className="text-slate-700 text-sm">{currentQuestion.question.context}</div>
                </div>
              )}

              {/* Pergunta */}
              <div className="text-slate-900 text-lg mb-6 leading-relaxed">
                {currentQuestion.question.question}
              </div>

              {/* Opções */}
              <div className="space-y-4 mb-8">
                {currentQuestion.question.options.map((option) => {
                  const isCorrect = option.label === currentQuestion.question.correctAnswer;
                  const isUserAnswer = option.label === currentQuestion.userAnswer;
                  
                  return (
                    <div
                      key={option.label}
                      className={`p-6 rounded-xl border-2 ${
                        isCorrect
                          ? 'bg-green-50 border-green-400'
                          : isUserAnswer
                          ? 'bg-red-50 border-red-400'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className={`text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg ${
                          isCorrect
                            ? 'bg-green-500 text-white'
                            : isUserAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-300 text-slate-700'
                        }`}>
                          {option.label}
                        </span>
                        <div className="flex-1">
                          <div className="text-lg text-slate-800">{option.text}</div>
                          {(isCorrect || isUserAnswer) && (
                            <div className="mt-2 text-sm font-bold">
                              {isCorrect && <span className="text-green-600">✓ Resposta Correta</span>}
                              {isUserAnswer && !isCorrect && <span className="text-red-600">✗ Sua Resposta</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explicação */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <div className="text-blue-700 font-bold text-lg mb-3">💡 Explicação</div>
                <div className="text-slate-800 leading-relaxed">
                  {currentQuestion.question.explanation}
                </div>
              </div>
            </div>

            {/* Navegação */}
            <div className="bg-white rounded-b-xl p-6 flex justify-between border-t border-slate-200 shadow-sm">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="px-8 py-3 bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 text-slate-900 font-bold rounded-lg transition"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setSelectedIndex(Math.min(filteredQuestions.length - 1, selectedIndex + 1))}
                disabled={selectedIndex === filteredQuestions.length - 1}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-lg transition"
              >
                Próxima →
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-600 text-xl mt-20">
            Nenhuma questão neste filtro
          </div>
        )}
      </main>

      {/* Modal de Revisão Inteligente */}
      {showSmartReview && (() => {
        // Calcular estatísticas por tópico
        const topicStats: { [topic: string]: { correct: number; total: number; percent: number; errors: number } } = {};
        
        result.questions.forEach(q => {
          const topic = q.question.topic || 'Outros';
          if (!topicStats[topic]) {
            topicStats[topic] = { correct: 0, total: 0, percent: 0, errors: 0 };
          }
          topicStats[topic].total++;
          if (q.isCorrect) {
            topicStats[topic].correct++;
          } else if (q.userAnswer) {
            topicStats[topic].errors++;
          }
        });
        
        // Calcular percentuais e ordenar por fraqueza
        const topicsArray = Object.entries(topicStats)
          .map(([topic, stats]) => ({
            topic,
            ...stats,
            percent: Math.round((stats.correct / stats.total) * 100)
          }))
          .sort((a, b) => a.percent - b.percent);
        
        const weakTopics = topicsArray.filter(t => t.percent < 80);
        const totalErrors = result.incorrect;
        const questionsReviewed = 0; // Futura feature
        
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSmartReview(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🔄</span>
                    <h2 className="text-2xl font-bold">Revisão Inteligente</h2>
                  </div>
                  <button onClick={() => setShowSmartReview(false)} className="text-white/80 hover:text-white text-2xl">
                    ×
                  </button>
                </div>
                <p className="text-white/90 text-sm">Foque nos seus pontos fracos e melhore sua performance</p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <div className="text-red-500 text-3xl mb-1">📉</div>
                  <div className="text-2xl font-bold text-red-600">{weakTopics.length}</div>
                  <div className="text-xs text-slate-600 mt-1">Categorias para Revisar</div>
                  <div className="text-xs text-slate-500">Acurácia abaixo de 80%</div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                  <div className="text-orange-500 text-3xl mb-1">⚠️</div>
                  <div className="text-2xl font-bold text-orange-600">{totalErrors}</div>
                  <div className="text-xs text-slate-600 mt-1">Erros Totais</div>
                  <div className="text-xs text-slate-500">Em todas as categorias</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="text-green-500 text-3xl mb-1">🔥</div>
                  <div className="text-2xl font-bold text-green-600">{questionsReviewed}</div>
                  <div className="text-xs text-slate-600 mt-1">Questões Revisadas</div>
                  <div className="text-xs text-slate-500">Total acumulado</div>
                </div>
              </div>
              
              {/* Categorias que Precisam de Atenção */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="text-lg font-bold text-slate-900">Categorias que Precisam de Atenção</h3>
                </div>
                
                <div className="space-y-3">
                  {weakTopics.slice(0, 5).map((topic, index) => (
                    <div key={topic.topic} className="bg-white border-2 border-slate-200 rounded-xl p-4 hover:border-orange-300 transition">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{topic.topic}</div>
                            <div className="text-xs text-slate-500">Progresso de Revisão</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{topic.percent}%</div>
                          <div className="text-xs text-slate-500">Acurácia</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">0/{topic.errors}</span>
                        <span className="text-sm font-bold text-orange-600">{topic.errors} Erros</span>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }} />
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowSmartReview(false);
                          // Filtrar por tópico clicando em "Todas" e depois navegando manualmente
                          setFilter('incorrect');
                          const firstIncorrectOfTopic = result.questions.findIndex(
                            q => !q.isCorrect && q.userAnswer && q.question.topic === topic.topic
                          );
                          if (firstIncorrectOfTopic !== -1) {
                            const filteredIdx = filterResults(result.questions, 'incorrect')
                              .findIndex(q => q.question.topic === topic.topic);
                            if (filteredIdx !== -1) setSelectedIndex(filteredIdx);
                          }
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition text-sm"
                      >
                        🔄 Começar Revisão
                      </button>
                    </div>
                  ))}
                  
                  {weakTopics.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <div className="text-5xl mb-3">🎉</div>
                      <div className="font-bold text-lg text-slate-700">Parabéns!</div>
                      <div className="text-sm">Você não tem categorias abaixo de 80% de acurácia</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
