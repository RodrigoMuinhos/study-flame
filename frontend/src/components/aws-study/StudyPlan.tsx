import React, { useState, useEffect } from 'react';
import { useCertification } from '@/contexts/AWSStudyContext';
import { 
  PlanDuration, 
  WeekContent,
  SAA_4_WEEKS, 
  SAA_8_WEEKS, 
  SAA_12_WEEKS,
  CLF_4_WEEKS,
  CLF_8_WEEKS,
  CLF_12_WEEKS
} from '../../data/studyPlanData';
import { StudyPlanSelection } from './StudyPlanSelection';
import { StudyPlanExecution } from './StudyPlanExecution';

interface StudyPlanProps {
  onBack: () => void;
}

export function StudyPlan({ onBack }: StudyPlanProps) {
  const { currentCertification } = useCertification();
  
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [completedWeeks, setCompletedWeeks] = useState<Set<number>>(new Set());
  const [completedActivities, setCompletedActivities] = useState<Record<number, Set<number>>>({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [startDate, setStartDate] = useState<string>('');

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`study-plan-${currentCertification}`);
    if (saved) {
      const data = JSON.parse(saved);
      setSelectedDuration(data.duration);
      setCurrentWeek(data.currentWeek);
      setCompletedWeeks(new Set(data.completedWeeks));
      
      // Convert saved array back to Sets
      const activitiesMap: Record<number, Set<number>> = {};
      if (data.completedActivities) {
        Object.entries(data.completedActivities).forEach(([week, activities]) => {
          activitiesMap[Number(week)] = new Set(activities as number[]);
        });
      }
      setCompletedActivities(activitiesMap);
      
      setNotificationsEnabled(data.notificationsEnabled);
      setStartDate(data.startDate);
    }
  }, [currentCertification]);

  // Save progress
  useEffect(() => {
    if (selectedDuration) {
      // Convert Sets to Arrays for JSON serialization
      const activitiesForSaving: Record<number, number[]> = {};
      Object.entries(completedActivities).forEach(([week, activities]) => {
        activitiesForSaving[Number(week)] = Array.from(activities);
      });
      
      localStorage.setItem(`study-plan-${currentCertification}`, JSON.stringify({
        duration: selectedDuration,
        currentWeek,
        completedWeeks: Array.from(completedWeeks),
        completedActivities: activitiesForSaving,
        notificationsEnabled,
        startDate
      }));
    }
  }, [selectedDuration, currentWeek, completedWeeks, completedActivities, notificationsEnabled, startDate, currentCertification]);

  const getPlanContent = (): WeekContent[] => {
    if (currentCertification === 'architect') {
      if (selectedDuration === 4) return SAA_4_WEEKS;
      if (selectedDuration === 8) return SAA_8_WEEKS;
      return SAA_12_WEEKS;
    } else {
      if (selectedDuration === 4) return CLF_4_WEEKS;
      if (selectedDuration === 8) return CLF_8_WEEKS;
      return CLF_12_WEEKS;
    }
  };

  const handleSelectDuration = (duration: PlanDuration) => {
    setSelectedDuration(duration);
    setCurrentWeek(1);
    setCompletedWeeks(new Set());
    setCompletedActivities({});
    setStartDate(new Date().toISOString());
  };

  const handleCompleteWeek = (week: number) => {
    const newCompleted = new Set(completedWeeks);
    if (newCompleted.has(week)) {
      newCompleted.delete(week);
    } else {
      newCompleted.add(week);
      
      if (notificationsEnabled) {
        showNotification(`🎉 Semana ${week} concluída!`, 'Continue assim! Você está no caminho certo.');
      }
    }
    setCompletedWeeks(newCompleted);
  };

  const handleCompleteActivity = (week: number, activityIndex: number) => {
    const newCompletedActivities = { ...completedActivities };
    if (!newCompletedActivities[week]) {
      newCompletedActivities[week] = new Set();
    }
    const weekActivities = newCompletedActivities[week];
    if (weekActivities.has(activityIndex)) {
      weekActivities.delete(activityIndex);
    } else {
      weekActivities.add(activityIndex);
    }
    setCompletedActivities(newCompletedActivities);
  };

  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/aws-icon.png' });
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    setNotificationsEnabled(!notificationsEnabled);
  };

  const getDaysRemaining = () => {
    if (!startDate || !selectedDuration) return null;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + (selectedDuration * 7));
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getCertificationInfo = () => {
    if (currentCertification === 'architect') {
      return {
        name: 'SAA-C03',
        fullName: 'AWS Certified Solutions Architect - Associate'
      };
    } else {
      return {
        name: 'CLF-C02',
        fullName: 'AWS Certified Cloud Practitioner'
      };
    }
  };

  const certInfo = getCertificationInfo();

  if (!selectedDuration) {
    return (
      <StudyPlanSelection
        certificationName={certInfo.name}
        certificationFullName={certInfo.fullName}
        onSelectDuration={handleSelectDuration}
        onBack={onBack}
      />
    );
  }

  const planContent = getPlanContent();
  const daysRemaining = getDaysRemaining();

  return (
    <StudyPlanExecution
      selectedDuration={selectedDuration}
      planContent={planContent}
      currentWeek={currentWeek}
      completedWeeks={completedWeeks}
      completedActivities={completedActivities}
      notificationsEnabled={notificationsEnabled}
      daysRemaining={daysRemaining}
      certificationFullName={certInfo.fullName}
      onBackToSelection={() => setSelectedDuration(null)}
      onSetCurrentWeek={setCurrentWeek}
      onCompleteWeek={handleCompleteWeek}
      onCompleteActivity={handleCompleteActivity}
      onToggleNotifications={requestNotificationPermission}
      onBackToDashboard={onBack}
    />
  );
}
