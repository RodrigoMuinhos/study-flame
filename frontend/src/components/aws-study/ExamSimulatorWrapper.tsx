import React, { useState } from 'react';
import { ExamConfigScreen, ExamConfig } from './ExamConfigScreen';
import { ExamSimulator } from './ExamSimulator';

interface ExamSimulatorWrapperProps {
  onBackToDiagram: () => void;
}

export function ExamSimulatorWrapper({ onBackToDiagram }: ExamSimulatorWrapperProps) {
  const [examConfig, setExamConfig] = useState<ExamConfig | null>(null);

  if (!examConfig) {
    return (
      <ExamConfigScreen
        onStartExam={setExamConfig}
        onBack={onBackToDiagram}
      />
    );
  }

  return (
    <ExamSimulator
      config={examConfig}
      onBackToConfig={() => setExamConfig(null)}
      onBackToDiagram={onBackToDiagram}
    />
  );
}
