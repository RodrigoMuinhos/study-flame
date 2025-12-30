"use client";

import React from 'react';

interface AwsStudyContentProps {
  currentSection?: string;
}

export function AwsStudyContent({ currentSection = 'home' }: AwsStudyContentProps) {
  return (
    <div data-testid="aws-study-content">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          {currentSection === 'home' && 'AWS Learning Platform - Home'}
          {currentSection === 'diagram' && 'Diagrama Interativo AWS'}
          {currentSection === 'training' && 'Modo Treinamento'}
          {currentSection === 'exam' && 'Simulador de Exame'}
          {currentSection === 'stats' && 'Estatísticas de Estudo'}
          {currentSection === 'study-plan' && 'Plano de Estudos'}
          {currentSection === 'review' && 'Revisão de Erros'}
        </h2>
        <p className="text-gray-600">
          Conteúdo da seção: {currentSection}
        </p>
      </div>
    </div>
  );
}
