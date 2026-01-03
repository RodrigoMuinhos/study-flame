import React from 'react';

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  domain?: string;
  difficulty?: string;
  category?: string;
  multipleChoice?: boolean;
  topic?: string;
  status?: string;
}

interface ExamQuestionCardProps {
  question: ExamQuestion;
  questionNumber: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showResults?: boolean;
}

export function ExamQuestionCard({ 
  question,
  questionNumber,
  selectedAnswer, 
  onAnswerSelect,
  showResults = false 
}: ExamQuestionCardProps) {
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
      {/* Número da questão */}
      <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
        <span className="text-xs md:text-sm font-semibold text-orange-600 bg-orange-50 px-2 md:px-3 py-1 rounded-full">
          Questão {questionNumber}
        </span>
        {question.difficulty && (
          <span className={`text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 rounded-full ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {question.difficulty === 'easy' ? 'Fácil' : 
             question.difficulty === 'medium' ? 'Médio' : 'Difícil'}
          </span>
        )}
      </div>

      {/* Enunciado */}
      <h2 className="text-base md:text-xl lg:text-2xl text-gray-900 mb-4 md:mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Alternativas */}
      <div className="space-y-2 md:space-y-3">
        {question.options
          .filter(opt => opt && opt.trim() !== '')
          .slice(0, 4)
          .map((optionText, index) => {
          const optionLabel = optionLabels[index];
          const isSelected = selectedAnswer === optionLabel;
          const isCorrect = optionLabel === question.correctAnswer;
          
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
              key={optionLabel}
              onClick={() => !showResults && onAnswerSelect(optionLabel)}
              disabled={showResults}
              className={`w-full text-left border-2 ${borderColor} ${bgColor} ${textColor} rounded-lg p-3 md:p-4 transition-all ${
                !showResults ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
                  showResults && isCorrect 
                    ? 'bg-green-600 text-white' 
                    : showResults && isSelected && !isCorrect
                    ? 'bg-red-600 text-white'
                    : isSelected 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {optionLabel}
                </div>
                <p className="flex-1 leading-relaxed text-sm md:text-base pt-0.5 md:pt-1">{optionText}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explicação (apenas quando mostrando resultados) */}
      {showResults && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Explicação:</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Informações adicionais */}
      {showResults && (question.domain || question.topic) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {question.domain && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              Domínio: {question.domain}
            </span>
          )}
          {question.topic && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              Tópico: {question.topic}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
