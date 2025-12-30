import React from 'react';
import { AWSBenefitsCards } from './AWSBenefitsCards';
import { ArrowLeft } from 'lucide-react';

interface BenefitsDemoProps {
  onBack?: () => void;
}

export function BenefitsDemo({ onBack }: BenefitsDemoProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with Back Button */}
      {onBack && (
        <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-semibold"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-8 sm:py-12">
        <AWSBenefitsCards />
      </div>

      {/* Responsive Info Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">
            ✨ Componente 100% Responsivo
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600">
            <p>• <strong>Mobile (&lt; 640px):</strong> 1 coluna - layout vertical otimizado</p>
            <p>• <strong>Tablet (640px - 1024px):</strong> 2 colunas - equilíbrio perfeito</p>
            <p>• <strong>Desktop (&gt; 1024px):</strong> 3 colunas - visualização completa</p>
            <p>• <strong>Breakwords:</strong> Todo texto se adapta sem ultrapassar containers</p>
            <p>• <strong>Overflow:</strong> Proteção contra overflow em todos os elementos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
