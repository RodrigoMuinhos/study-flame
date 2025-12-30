import React from 'react';
import { X, ChevronRight, ArrowRight, ArrowLeft, BookOpen, PlayCircle } from 'lucide-react';

export interface ServiceInfo {
  id: string;
  title: string;
  step: number;
  totalSteps: number;
  nextStepId?: string;
  prevStepId?: string;
  awsDocsUrl?: string;
  whatIs: {
    description: string;
    examples: string[];
  };
  hierarchy: {
    layer: string;
    position: string;
    flow: string;
  };
  whyExists: string[];
  realCase: {
    scenario: string;
    actions: string[];
    impact: string;
  };
}

interface SidePanelProps {
  serviceInfo: ServiceInfo | null;
  onClose: () => void;
  onNext?: (nextId: string) => void;
  onPrev?: (prevId: string) => void;
  onTraining?: (serviceId: string) => void;
}

export function SidePanel({ serviceInfo, onClose, onNext, onPrev, onTraining }: SidePanelProps) {
  if (!serviceInfo) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-x-0 bottom-0 md:top-0 md:right-0 md:left-auto md:bottom-auto h-[85vh] md:h-full w-full md:w-[380px] bg-white shadow-2xl border-t-2 md:border-t-0 md:border-l-2 border-orange-500 overflow-y-auto z-50 animate-in slide-in-from-bottom md:slide-in-from-right duration-300 rounded-t-2xl md:rounded-none">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 md:p-6 z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="text-xs opacity-90 mb-1">
                Passo {serviceInfo.step} de {serviceInfo.totalSteps}
              </div>
              <h2 className="text-lg md:text-xl pr-8">{serviceInfo.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(serviceInfo.step / serviceInfo.totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 pb-6">
          {/* O que é */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h3 className="text-blue-600">O que é</h3>
            </div>
            <p className="text-gray-700 mb-3 text-sm md:text-base">{serviceInfo.whatIs.description}</p>
            <ul className="space-y-2">
              {serviceInfo.whatIs.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-600 text-sm md:text-base">{example}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Posição na hierarquia */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              <h3 className="text-purple-600">Posição na hierarquia</h3>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 md:p-4">
              <div className="text-sm text-purple-900 mb-2">
                📍 {serviceInfo.hierarchy.layer}
              </div>
              <p className="text-gray-700 text-sm mb-3">{serviceInfo.hierarchy.position}</p>
              <div className="bg-white rounded px-3 py-2 text-xs md:text-sm text-gray-600 font-mono overflow-x-auto">
                {serviceInfo.hierarchy.flow}
              </div>
            </div>
          </section>

          {/* Por que existe */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-green-500 rounded-full" />
              <h3 className="text-green-600">Por que existe</h3>
            </div>
            <p className="text-gray-700 mb-3 text-sm md:text-base">Porque toda arquitetura nasce de uma necessidade:</p>
            <ul className="space-y-2">
              {serviceInfo.whyExists.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-600 text-sm md:text-base">{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Caso real */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
              <h3 className="text-orange-600">Caso real (exemplo prático)</h3>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 md:p-4">
              <p className="text-gray-700 mb-3 text-sm md:text-base">{serviceInfo.realCase.scenario}</p>
              <ul className="space-y-2 mb-3">
                {serviceInfo.realCase.actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-600 text-sm md:text-base">{action}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white rounded-lg p-3 text-sm text-gray-700 italic">
                {serviceInfo.realCase.impact}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onTraining?.(serviceInfo.id)}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <PlayCircle size={20} />
              Responder simulado
            </button>
            <button
              onClick={() => serviceInfo.awsDocsUrl && window.open(serviceInfo.awsDocsUrl, '_blank')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <BookOpen size={20} />
              Saber mais
            </button>
          </div>

          {/* Navigation Arrows */}
          {(serviceInfo.prevStepId || serviceInfo.nextStepId) && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 md:-mx-6 -mb-6 mt-6">
              <div className="flex justify-between items-center">
                {serviceInfo.prevStepId && onPrev ? (
                  <button
                    onClick={() => onPrev(serviceInfo.prevStepId!)}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-all border border-gray-300 shadow-sm hover:shadow-md"
                    aria-label="Voltar"
                  >
                    <ArrowLeft size={24} />
                  </button>
                ) : (
                  <div className="w-12 h-12" />
                )}
                {serviceInfo.nextStepId && onNext ? (
                  <button
                    onClick={() => onNext(serviceInfo.nextStepId!)}
                    className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                    aria-label="Próximo"
                  >
                    <ArrowRight size={24} />
                  </button>
                ) : (
                  <div className="w-12 h-12" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
