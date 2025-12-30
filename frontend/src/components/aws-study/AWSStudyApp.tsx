"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/aws-study/MainLayout';
import { DashboardHome } from '@/components/aws-study/DashboardHome';
import { TrainingDomainSelector } from '@/components/aws-study/TrainingDomainSelector';
import { TrainingMode } from '@/components/aws-study/TrainingMode';
import { PracticeConfigScreen, PracticeConfig } from '@/components/aws-study/PracticeConfigScreen';
import { OfficialExamScreen } from '@/components/aws-study/OfficialExamScreen';
import { StatsDashboard } from '@/components/aws-study/StatsDashboard';
import { DiagramView } from '@/components/aws-study/DiagramView';
import { SimulatorMode } from '@/components/aws-study/SimulatorMode';
import { StudyPlan } from '@/components/aws-study/StudyPlan';
import { Review } from '@/components/aws-study/Review';
import { ExamConfigScreen, ExamConfig } from '@/components/aws-study/ExamConfigScreen';
import { ExamSimulatorNew } from '@/components/aws-study/ExamSimulatorNew';

type Screen = 'home' | 'diagram' | 'training-select' | 'training' | 'simulator' | 'simulator-config' | 'simulator-active' | 'official-exam' | 'stats' | 'study-plan' | 'review';

export function AWSStudyApp() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [practiceConfig, setPracticeConfig] = useState<PracticeConfig | null>(null);
  const [examConfig, setExamConfig] = useState<ExamConfig | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Permite deep-link direto via /aws-study/study?view=stats (usado pelo sidebar durante o exame)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (!view) return;

    const allowed = new Set([
      'home',
      'diagram',
      'training',
      'simulator',
      'official-exam',
      'stats',
      'study-plan',
      'review'
    ]);

    if (!allowed.has(view)) return;

    if (view === 'training') {
      setCurrentScreen('training-select');
      return;
    }

    setCurrentScreen(view as Screen);
  }, []);

  // Navigation handler para o MainLayout
  const handleNavigate = (view: 'home' | 'diagram' | 'training' | 'simulator' | 'official-exam' | 'stats' | 'study-plan' | 'review') => {
    if (view === 'training') {
      setCurrentScreen('training-select');
    } else {
      setCurrentScreen(view);
    }
  };

  // Diagram Screen handlers
  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleNextStep = (nextId: string) => {
    setSelectedService(nextId);
    setTimeout(() => {
      const element = document.querySelector(`[data-service-id="${nextId}"]`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  const handlePrevStep = (prevId: string) => {
    setSelectedService(prevId);
    setTimeout(() => {
      const element = document.querySelector(`[data-service-id="${prevId}"]`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  const handleTraining = (serviceId: string) => {
    setSelectedDomain(serviceId);
    setCurrentScreen('training');
  };

  // Home Screen
  if (currentScreen === 'home') {
    return (
      <MainLayout currentView="home" onNavigate={handleNavigate}>
        <DashboardHome
          onSelectDiagram={() => setCurrentScreen('diagram')}
          onSelectTraining={() => setCurrentScreen('training-select')}
          onSelectExam={() => setCurrentScreen('simulator')}
          onSelectOfficialExam={() => setCurrentScreen('official-exam')}
          onSelectStats={() => setCurrentScreen('stats')}
          onSelectStudyPlan={() => setCurrentScreen('study-plan')}
          onSelectReview={() => setCurrentScreen('review')}
        />
      </MainLayout>
    );
  }

  // Training Domain Selection
  if (currentScreen === 'training-select') {
    return (
      <MainLayout currentView="training" onNavigate={handleNavigate}>
        <TrainingDomainSelector
          onSelectDomain={(domainId) => {
            setSelectedDomain(domainId);
            setCurrentScreen('training');
          }}
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Training Mode
  if (currentScreen === 'training' && selectedDomain) {
    return (
      <MainLayout currentView="training" onNavigate={handleNavigate}>
        <TrainingMode
          topicId={selectedDomain}
          onBack={() => {
            setSelectedDomain(null);
            setCurrentScreen('training-select');
          }}
        />
      </MainLayout>
    );
  }

  // Simulator Config
  if (currentScreen === 'simulator') {
    return (
      <MainLayout currentView="simulator" onNavigate={handleNavigate}>
        <ExamConfigScreen
          onStartExam={(config) => {
            setExamConfig(config);
            setCurrentScreen('simulator-active');
          }}
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Simulator Active
  if (currentScreen === 'simulator-active' && examConfig) {
    return (
      <ExamSimulatorNew
        config={examConfig}
        onBackToConfig={() => {
          setCurrentScreen('simulator');
          setExamConfig(null);
        }}
        onBackToDiagram={() => {
          setCurrentScreen('home');
          setExamConfig(null);
        }}
      />
    );
  }

  // Official Exam
  if (currentScreen === 'official-exam') {
    return (
      <MainLayout currentView="official-exam" onNavigate={handleNavigate}>
        <OfficialExamScreen
          onStart={() => {}}
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Stats
  if (currentScreen === 'stats') {
    return (
      <MainLayout currentView="stats" onNavigate={handleNavigate}>
        <StatsDashboard
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Study Plan
  if (currentScreen === 'study-plan') {
    return (
      <MainLayout currentView="study-plan" onNavigate={handleNavigate}>
        <StudyPlan
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Review
  if (currentScreen === 'review') {
    return (
      <MainLayout currentView="review" onNavigate={handleNavigate}>
        <Review
          onBack={() => setCurrentScreen('home')}
        />
      </MainLayout>
    );
  }

  // Diagram
  if (currentScreen === 'diagram') {
    return (
      <MainLayout currentView="diagram" onNavigate={handleNavigate}>
        <DiagramView
          selectedService={selectedService}
          isPanelOpen={isPanelOpen}
          onServiceClick={handleServiceClick}
          onClosePanel={handleClosePanel}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          onTraining={handleTraining}
          onBack={() => setCurrentScreen('home')}
          onGoToSimulator={() => setCurrentScreen('simulator')}
        />
      </MainLayout>
    );
  }

  return null;
}
