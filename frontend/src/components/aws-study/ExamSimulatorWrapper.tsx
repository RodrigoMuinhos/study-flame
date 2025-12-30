import React, { useState } from 'react';
import { ExamConfigScreen, ExamConfig } from './ExamConfigScreen';
import { ExamSimulatorNew } from './ExamSimulatorNew';

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
    <ExamSimulatorNew
      config={examConfig}
      onBackToConfig={() => setExamConfig(null)}
      onBackToDiagram={onBackToDiagram}
    />
  );
}
