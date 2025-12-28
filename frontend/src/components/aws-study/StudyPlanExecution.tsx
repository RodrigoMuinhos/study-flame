import React from 'react';
import { Clock, CheckCircle2, Circle, Trophy, Bell, BellOff, ArrowLeft } from 'lucide-react';
import { PlanDuration, WeekContent } from '@/data/studyPlanData';

interface StudyPlanExecutionProps {
  selectedDuration: PlanDuration;
  planContent: WeekContent[];
  currentWeek: number;
  completedWeeks: Set<number>;
  completedActivities: Record<number, Set<number>>;
  notificationsEnabled: boolean;
  daysRemaining: number | null;
  certificationFullName: string;
  onBackToSelection: () => void;
  onSetCurrentWeek: (week: number) => void;
  onCompleteWeek: (week: number) => void;
  onCompleteActivity: (week: number, activityIndex: number) => void;
  onToggleNotifications: () => void;
  onBackToDashboard: () => void;
}

export function StudyPlanExecution({
  selectedDuration,
  planContent,
  currentWeek,
  completedWeeks,
  completedActivities,
  notificationsEnabled,
  daysRemaining,
  certificationFullName,
  onBackToSelection,
  onSetCurrentWeek,
  onCompleteWeek,
  onCompleteActivity,
  onToggleNotifications,
  onBackToDashboard
}: StudyPlanExecutionProps) {
  const calculateProgress = () => {
    const progress = (completedWeeks.size / selectedDuration) * 100;
    return Math.round(progress);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <button
              onClick={onBackToSelection}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
              Trocar Plano
            </button>

            <button
              onClick={onToggleNotifications}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                notificationsEnabled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
              }`}
            >
              {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
              {notificationsEnabled ? 'Notificações Ativas' : 'Ativar Notificações'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Plano de {selectedDuration} Semanas
                </h1>
                <p className="text-gray-600">{certificationFullName}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center min-w-[140px]">
                  <div className="text-3xl font-bold">{progress}%</div>
                  <div className="text-sm opacity-90">Concluído</div>
                </div>
                
                {daysRemaining !== null && (
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center min-w-[140px]">
                    <div className="text-3xl font-bold">{daysRemaining}</div>
                    <div className="text-sm opacity-90">Dias restantes</div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{completedWeeks.size} de {selectedDuration} semanas</span>
                <span>{completedWeeks.size}/{selectedDuration} ✓</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Content */}
        <div className="space-y-6">
          {planContent.map((week) => {
            const isCompleted = completedWeeks.has(week.week);
            const isCurrent = week.week === currentWeek;
            const completedCount = completedActivities[week.week]?.size || 0;
            const totalActivities = week.activities.length;
            const weekProgress = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

            return (
              <div
                key={week.week}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                  isCurrent ? 'ring-4 ring-blue-500' : ''
                } ${isCompleted ? 'opacity-75' : ''}`}
              >
                <div 
                  className={`p-6 md:p-8 cursor-pointer ${
                    isCompleted ? 'bg-gradient-to-r from-green-50 to-green-100' : 'bg-white'
                  }`}
                  onClick={() => onSetCurrentWeek(week.week)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          isCompleted ? 'bg-green-600' : 'bg-blue-600'
                        } text-white font-bold text-lg`}>
                          {isCompleted ? <CheckCircle2 size={24} /> : week.week}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                            Semana {week.week}: {week.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {week.estimatedHours}h estimadas
                            </span>
                            {isCurrent && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                                SEMANA ATUAL
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">📚 Tópicos:</h4>
                        <div className="flex flex-wrap gap-2">
                          {week.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-700">✅ Atividades:</h4>
                          {completedCount > 0 && (
                            <span className="text-sm text-gray-600">
                              {completedCount}/{totalActivities} concluídas ({weekProgress}%)
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {week.activities.map((activity, idx) => {
                            const isActivityCompleted = completedActivities[week.week]?.has(idx) || false;
                            return (
                              <li 
                                key={idx} 
                                className="flex items-start gap-3 text-gray-700 group cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCompleteActivity(week.week, idx);
                                }}
                              >
                                <button
                                  className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isActivityCompleted 
                                      ? 'bg-blue-600 border-blue-600' 
                                      : 'border-gray-300 hover:border-blue-400'
                                  }`}
                                >
                                  {isActivityCompleted && <CheckCircle2 size={14} className="text-white" />}
                                </button>
                                <span className={isActivityCompleted ? 'line-through text-gray-500' : ''}>
                                  {activity}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    {/* Complete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompleteWeek(week.week);
                      }}
                      className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all ${
                        isCompleted
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="inline mr-2" size={20} />
                          Concluído
                        </>
                      ) : (
                        <>
                          <Circle className="inline mr-2" size={20} />
                          Marcar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {completedWeeks.size === selectedDuration && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white text-center">
            <Trophy size={64} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">🎉 Parabéns!</h2>
            <p className="text-xl mb-4">
              Você completou todo o roteiro de estudos de {selectedDuration} semanas!
            </p>
            <p className="text-lg opacity-90 mb-6">
              Agora você está pronto para fazer a prova {certificationFullName}
            </p>
            <button
              onClick={onBackToDashboard}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Ir para o Simulador
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
