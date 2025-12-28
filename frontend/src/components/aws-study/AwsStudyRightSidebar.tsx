"use client";

import { useState } from 'react';
import { X, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

interface AwsStudyRightSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AwsStudyRightSidebar({ isOpen = true, onClose }: AwsStudyRightSidebarProps) {
  const [activeTab, setActiveTab] = useState<'exam' | 'notes'>('exam');

  const examQuestions = [
    { id: 1, status: 'answered', title: 'Q1: EC2 Instance Types' },
    { id: 2, status: 'answered', title: 'Q2: S3 Storage Classes' },
    { id: 3, status: 'current', title: 'Q3: VPC Networking' },
    { id: 4, status: 'pending', title: 'Q4: IAM Policies' },
    { id: 5, status: 'pending', title: 'Q5: CloudWatch Metrics' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 flex-col border-l border-white/10 bg-slate-900/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <h3 className="font-semibold text-white">Painel de Prova</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition ${
              activeTab === 'exam'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Questões
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 border-b-2 px-4 py-3 text-sm font-medium transition ${
              activeTab === 'notes'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Notas
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'exam' ? (
            <div className="space-y-3">
              {/* Timer */}
              <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-orange-400">Tempo Restante</span>
                  <Clock size={14} className="text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-white">45:30</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                </div>
              </div>

              {/* Question List */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white/60">Navegação de Questões</h4>
                {examQuestions.map((q) => (
                  <button
                    key={q.id}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                      q.status === 'current'
                        ? 'border-orange-500/50 bg-orange-500/10 ring-1 ring-orange-500/30'
                        : q.status === 'answered'
                        ? 'border-white/10 bg-white/5 hover:bg-white/10'
                        : 'border-white/10 bg-transparent hover:bg-white/5'
                    }`}
                  >
                    {q.status === 'answered' ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : q.status === 'current' ? (
                      <AlertCircle size={16} className="text-orange-400" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-white/30" />
                    )}
                    <span className="flex-1 text-sm text-white">{q.title}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4">
                <button className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-orange-500/30 transition hover:shadow-lg">
                  Finalizar Prova
                </button>
                <button className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  Marcar para Revisão
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                placeholder="Anote suas observações durante a prova..."
                className="h-64 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
              />
              <button className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-orange-500/30 transition hover:shadow-lg">
                Salvar Notas
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute right-0 top-0 h-full w-80 border-l border-white/10 bg-slate-900 shadow-2xl">
            {/* Same content as desktop */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <h3 className="font-semibold text-white">Painel de Prova</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            {/* Rest of content... */}
          </div>
        </div>
      )}
    </>
  );
}
