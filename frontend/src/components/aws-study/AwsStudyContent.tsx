"use client";

import { HomeScreen } from '@/components/aws-study/HomeScreen';
import { DiagramView } from '@/components/aws-study/DiagramView';
import { TrainingMode } from '@/components/aws-study/TrainingMode';
import { ExamSimulator } from '@/components/aws-study/ExamSimulator';
import { StatsDashboard } from '@/components/aws-study/StatsDashboard';
import { StudyPlan } from '@/components/aws-study/StudyPlan';
import { Review } from '@/components/aws-study/Review';

interface AwsStudyContentProps {
  currentSection?: string;
}

export function AwsStudyContent({ currentSection = 'home' }: AwsStudyContentProps) {
  // Renderizar componentes reais baseado na seção
  const content = (() => {
    switch (currentSection) {
      case 'home':
        return <HomeScreen />;
      
      case 'diagram':
        return <DiagramView />;
      
      case 'training':
        return <TrainingMode />;
      
      case 'exam':
        return <ExamSimulator />;
      
      case 'stats':
        return <StatsDashboard />;
      
      case 'study-plan':
        return <StudyPlan />;
      
      case 'review':
        return <Review />;
      
      default:
        return <HomeScreen />;
    }
  })();

  return (
    <div data-testid="aws-study-content">
      {content}
    </div>
  );
}
