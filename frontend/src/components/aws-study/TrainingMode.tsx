import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, XCircle, Flag } from 'lucide-react';
import { TrainingQuestion, TrainingResult } from '@/types/aws-study';
import { TrainingResultScreen } from './TrainingResultScreen';
import { useAWSStudy } from '@/contexts/AWSStudyContext';
import { allExamQuestions } from '@/utils/examGenerator';
import { trainingQuestions } from '@/data/trainingQuestions';

interface TrainingModeProps {
  topicId: string;
  onBack: () => void;
}

// Função para converter ExamQuestion para TrainingQuestion
function convertToTrainingQuestion(examQ: any): TrainingQuestion {
  return {
    id: examQ.id,
    question: examQ.question,
    context: examQ.explanation.split('.')[0] + '.', // Usar primeira sentença da explicação como contexto
    options: examQ.options.map((opt: string, idx: number) => ({
      label: String.fromCharCode(65 + idx), // A, B, C, D
      text: opt
    })),
    correctAnswer: Array.isArray(examQ.correctAnswer) 
      ? String.fromCharCode(65 + examQ.correctAnswer[0]) 
      : String.fromCharCode(65 + examQ.correctAnswer),
    explanation: examQ.explanation,
    relatedService: examQ.domain,
    topic: examQ.domain
  };
}

export function TrainingMode({ topicId, onBack }: TrainingModeProps) {
  const { currentCertification } = useAWSStudy();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [sessionSeed, setSessionSeed] = useState(0); // força re-randomização

  // Util helpers
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const shuffleQuestion = (q: TrainingQuestion, newId?: number): TrainingQuestion => {
    // Descobrir o texto correto antes de embaralhar
    const currentCorrect = q.correctAnswer;
    const correctText = q.options.find(o => o.label === currentCorrect)?.text ?? q.options[0]?.text;

    const shuffled = shuffleArray(q.options).map((opt, idx) => ({
      label: String.fromCharCode(65 + idx),
      text: opt.text
    }));

    const correctIdx = Math.max(0, shuffled.findIndex(o => o.text === correctText));
    const correctLetter = String.fromCharCode(65 + correctIdx);

    return {
      ...q,
      id: newId ?? q.id,
      options: shuffled,
      correctAnswer: correctLetter
    };
  };

  // Filtrar questões por tópico e selecionar até 20 aleatórias
  const questions = useMemo(() => {
    // 1) Preferir banco dedicado de treino, se existir para o tópico
    const topicBank = trainingQuestions[topicId as keyof typeof trainingQuestions];
    if (topicBank && topicBank.length > 0) {
      // Embaralhar, selecionar 20 e também embaralhar alternativas por questão
      const selected = shuffleArray(topicBank).slice(0, Math.min(20, topicBank.length));
      return selected.map((q, idx) => shuffleQuestion({ ...q }, idx + 1));
    }

    // Mapeamento de tópicos para tags/palavras-chave na questão
    const topicKeywords: Record<string, string[]> = {
      'cloudfront': ['cloudfront', 'cdn', 'edge location', 'cache'],
      'route53': ['route 53', 'route53', 'dns', 'hosted zone'],
      's3': ['s3', 'bucket', 'object storage', 'simple storage'],
      'vpc': ['vpc', 'virtual private cloud'],
      'subnets': ['subnet', 'nat gateway', 'internet gateway'],
      'security-groups': ['security group', 'firewall'],
      'ec2': ['ec2', 'elastic compute', 'instance'],
      'auto-scaling': ['auto scaling', 'asg', 'scaling group'],
      'alb': ['application load balancer', 'alb', 'load balancer'],
      'sqs': ['sqs', 'simple queue', 'queue'],
      'sns': ['sns', 'simple notification', 'topic'],
      'rds': ['rds', 'relational database'],
      'iam': ['iam', 'identity', 'access management', 'policy', 'user', 'group'],
      'iam-roles': ['role', 'assume role', 'instance profile'],
      'cloudwatch': ['cloudwatch', 'metric', 'alarm', 'log'],
      'architecture': ['architecture', 'high availability', 'well-architected', 'resilient']
    };

    const keywords = topicKeywords[topicId] || [];
    
    // Se não houver keywords, retornar questões aleatórias
    if (keywords.length === 0) {
      const shuffled = [...allExamQuestions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 20).map(convertToTrainingQuestion);
    }
    
    // Filtrar questões que contenham as keywords
    const filtered = allExamQuestions.filter(q => {
      const searchText = `${q.question} ${q.explanation}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });
    
    // Embaralhar e pegar até 20
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(20, shuffled.length));
    
    // Converter para TrainingQuestion, normalizar IDs e embaralhar alternativas
    return selected
      .map(convertToTrainingQuestion)
      .map((q, idx) => shuffleQuestion(q, idx + 1));
  }, [topicId, sessionSeed]);
  const currentQuestionData = questions.find(q => q.id === currentQuestion);
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion];

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;

    const isCorrect = answer === currentQuestionData?.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: { selected: answer, isCorrect }
    }));
    
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      calculateResults();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
      setShowFeedback(!!answers[currentQuestion - 1]);
    }
  };

  const calculateResults = () => {
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const incorrectAnswers = Object.values(answers).filter(a => !a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (score >= 80) {
      strengths.push('Excelente compreensão geral do tópico');
    }
    if (score < 60) {
      weaknesses.push('Revisar conceitos fundamentais');
    }

    const recommendation = score >= 80 
      ? `Parabéns! Você domina ${topicId}. Considere praticar outros tópicos.`
      : score >= 60
      ? `Bom desempenho! Revise as questões erradas e tente novamente para consolidar o conhecimento.`
      : `Recomendamos revisar o diagrama interativo e estudar mais sobre ${topicId} antes de tentar novamente.`;

    const trainingResult: TrainingResult = {
      topic: topicId,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      score,
      strengths,
      weaknesses,
      recommendation
    };

    setResult(trainingResult);
    setIsFinished(true);
  };

  const handleFinish = () => {
    const unansweredCount = totalQuestions - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirmFinish = window.confirm(
        `Você ainda tem ${unansweredCount} questão(ões) não respondida(s). Deseja finalizar mesmo assim?`
      );
      if (!confirmFinish) return;
    }

    calculateResults();
  };

  const handleRetry = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
    setResult(null);
    setSessionSeed((s) => s + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  if (isFinished && result) {
    return (
      <TrainingResultScreen
        result={result}
        questions={questions}
        answers={answers}
        onRetry={handleRetry}
        onBack={onBack}
      />
    );
  }

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Tópico não encontrado</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-white border-r border-gray-200 p-6 lg:overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={28} className="text-orange-600" />
              <h1 className="text-xl font-bold text-gray-900">Modo Treino</h1>
            </div>
            <p className="text-sm font-medium text-gray-700">{topicId}</p>
          </div>

          <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium mb-2">⏱ Sem limite de tempo</p>
            <p className="text-xs text-blue-700">Aprenda no seu ritmo com feedback imediato após cada resposta.</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Progresso</span>
              <span className="text-sm text-gray-600">
                {Object.keys(answers).length}/{totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(answers).length / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Questão {currentQuestion} de {totalQuestions}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Questões</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q) => {
                const answer = answers[q.id];
                const isCurrent = q.id === currentQuestion;
                
                let bgColor = 'bg-gray-100';
                let textColor = 'text-gray-700';
                
                if (isCurrent) {
                  bgColor = 'bg-blue-600';
                  textColor = 'text-white';
                } else if (answer) {
                  if (answer.isCorrect) {
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-700';
                  } else {
                    bgColor = 'bg-red-100';
                    textColor = 'text-red-700';
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(q.id);
                      setShowFeedback(!!answers[q.id]);
                    }}
                    className={`${bgColor} ${textColor} rounded-lg p-2 text-xs font-medium transition-all min-h-[36px] flex items-center justify-center`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Flag size={20} />
            Finalizar Treino
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-80 p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
            <div className="mb-4">
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Questão {currentQuestionData.id}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl text-gray-900 mb-4 leading-relaxed">
              {currentQuestionData.question}
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-700">Contexto: </span>
                {currentQuestionData.context}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestionData.options.map((option) => {
                const isSelected = currentAnswer?.selected === option.label;
                const isCorrect = option.label === currentQuestionData.correctAnswer;
                
                let borderColor = 'border-gray-300';
                let bgColor = 'bg-white hover:bg-gray-50';
                let textColor = 'text-gray-900';

                if (showFeedback) {
                  if (isCorrect) {
                    borderColor = 'border-green-500';
                    bgColor = 'bg-green-50';
                    textColor = 'text-green-900';
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'border-red-500';
                    bgColor = 'bg-red-50';
                    textColor = 'text-red-900';
                  }
                } else if (isSelected) {
                  borderColor = 'border-orange-500';
                  bgColor = 'bg-orange-50';
                  textColor = 'text-orange-900';
                }

                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={showFeedback}
                    className={`w-full text-left border-2 ${borderColor} ${bgColor} ${textColor} rounded-lg p-4 transition-all ${
                      !showFeedback ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        showFeedback && isCorrect 
                          ? 'bg-green-600 text-white' 
                          : showFeedback && isSelected && !isCorrect
                          ? 'bg-red-600 text-white'
                          : isSelected 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {showFeedback && isCorrect ? '✓' : showFeedback && isSelected && !isCorrect ? '✗' : option.label}
                      </div>
                      <p className="flex-1 leading-relaxed pt-1">{option.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`mt-6 border-2 rounded-lg p-5 ${
                currentAnswer?.isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {currentAnswer?.isCorrect ? (
                    <>
                      <CheckCircle size={24} className="text-green-600" />
                      <h3 className="font-bold text-green-900">Correto! 🎉</h3>
                    </>
                  ) : (
                    <>
                      <XCircle size={24} className="text-red-600" />
                      <h3 className="font-bold text-red-900">Incorreto</h3>
                    </>
                  )}
                </div>
                
                <div className="bg-white bg-opacity-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">💡 Explicação:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentQuestionData.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 shadow-md hover:shadow-lg"
            >
              <ChevronLeft size={20} />
              Anterior
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentQuestion} de {totalQuestions}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={!showFeedback}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
            >
              {currentQuestion === totalQuestions ? 'Finalizar' : 'Próxima'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
