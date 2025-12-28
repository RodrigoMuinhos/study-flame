import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ExamTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export function ExamTimer({ initialMinutes, onTimeUp }: ExamTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, onTimeUp]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Determinar cor baseado no tempo restante
  const totalMinutes = secondsRemaining / 60;
  let colorClass = 'text-green-600 bg-green-50';
  
  if (totalMinutes <= 20) {
    colorClass = 'text-red-600 bg-red-50';
  } else if (totalMinutes <= 60) {
    colorClass = 'text-yellow-600 bg-yellow-50';
  }

  return (
    <div className={`rounded-lg p-4 ${colorClass} transition-colors duration-300`}>
      <div className="flex items-center gap-2 mb-1">
        <Clock size={18} />
        <span className="text-sm font-medium">Tempo restante</span>
      </div>
      <div className="text-3xl font-mono font-bold">{formatTime}</div>
    </div>
  );
}
