import React from 'react';
import { Check, Circle, CircleDot } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (questionNumber: number) => void;
}

export function QuestionNavigator({ 
  totalQuestions, 
  currentQuestion, 
  answeredQuestions,
  onQuestionSelect 
}: QuestionNavigatorProps) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Navegação Rápida</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((questionNum) => {
          const isAnswered = answeredQuestions.has(questionNum);
          const isCurrent = questionNum === currentQuestion;

          let bgColor = 'bg-gray-100 hover:bg-gray-200';
          let textColor = 'text-gray-700';
          let icon = <Circle size={12} />;

          if (isCurrent) {
            bgColor = 'bg-blue-600 hover:bg-blue-700';
            textColor = 'text-white';
            icon = <CircleDot size={12} className="text-white" />;
          } else if (isAnswered) {
            bgColor = 'bg-green-100 hover:bg-green-200';
            textColor = 'text-green-700';
            icon = <Check size={12} className="text-green-600" />;
          }

          return (
            <button
              key={questionNum}
              onClick={() => onQuestionSelect(questionNum)}
              className={`${bgColor} ${textColor} rounded-lg p-2 text-xs font-medium transition-all flex items-center justify-center gap-1 min-h-[36px]`}
              title={`Questão ${questionNum}${isAnswered ? ' (respondida)' : ''}`}
            >
              {questionNum}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-4 space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <CircleDot size={12} className="text-white" />
          </div>
          <span>Atual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
            <Check size={12} className="text-green-600" />
          </div>
          <span>Respondida</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <Circle size={12} className="text-gray-400" />
          </div>
          <span>Não respondida</span>
        </div>
      </div>
    </div>
  );
}
