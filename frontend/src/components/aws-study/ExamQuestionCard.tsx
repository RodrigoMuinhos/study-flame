import React from 'react';

export interface ExamQuestion {
  id: number;
  question: string;
  context: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  category: string;
  relatedService: string;
}

interface ExamQuestionCardProps {
  question: ExamQuestion;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResults?: boolean;
}

export function ExamQuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  showResults = false 
}: ExamQuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Número da questão */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
          Questão {question.id}
        </span>
      </div>

      {/* Enunciado */}
      <h2 className="text-xl md:text-2xl text-gray-900 mb-4 leading-relaxed">
        {question.question}
      </h2>

      {/* Contexto/Cenário */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-blue-700">Contexto: </span>
          {question.context}
        </p>
      </div>

      {/* Alternativas */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.label;
          const isCorrect = option.label === question.correctAnswer;
          
          let borderColor = 'border-gray-300';
          let bgColor = 'bg-white hover:bg-gray-50';
          let textColor = 'text-gray-900';

          if (showResults) {
            if (isCorrect) {
              borderColor = 'border-green-500 bg-green-50';
              bgColor = 'bg-green-50';
              textColor = 'text-green-900';
            } else if (isSelected && !isCorrect) {
              borderColor = 'border-red-500 bg-red-50';
              bgColor = 'bg-red-50';
              textColor = 'text-red-900';
            }
          } else if (isSelected) {
            borderColor = 'border-orange-500 bg-orange-50';
            bgColor = 'bg-orange-50';
            textColor = 'text-orange-900';
          }

          return (
            <button
              key={option.label}
              onClick={() => !showResults && onAnswerSelect(option.label)}
              disabled={showResults}
              className={`w-full text-left border-2 ${borderColor} ${bgColor} ${textColor} rounded-lg p-4 transition-all ${
                !showResults ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  showResults && isCorrect 
                    ? 'bg-green-600 text-white' 
                    : showResults && isSelected && !isCorrect
                    ? 'bg-red-600 text-white'
                    : isSelected 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {option.label}
                </div>
                <p className="flex-1 leading-relaxed pt-1">{option.text}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explicação (apenas em modo resultado) */}
      {showResults && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Explicação
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {question.explanation}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-blue-600 text-white px-2 py-1 rounded font-medium">
              {question.category}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">
              Serviço relacionado: {question.relatedService}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
