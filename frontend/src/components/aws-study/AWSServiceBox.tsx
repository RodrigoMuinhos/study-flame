import React, { forwardRef } from 'react';

interface AWSServiceBoxProps {
  title: string;
  description?: string[];
  icon?: React.ReactNode;
  color?: string;
  variant?: 'default' | 'compact' | 'small';
  onClick?: () => void;
  isHighlighted?: boolean;
  serviceId?: string;
}

export const AWSServiceBox = forwardRef<HTMLDivElement, AWSServiceBoxProps>(({ 
  title, 
  description = [], 
  icon, 
  color = 'bg-white',
  variant = 'default',
  onClick,
  isHighlighted = false,
  serviceId
}, ref) => {
  const baseClasses = onClick ? 'cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1' : '';
  const highlightClasses = isHighlighted ? 'ring-4 ring-orange-500 shadow-xl scale-105' : '';

  if (variant === 'compact') {
    return (
      <div 
        ref={ref}
        data-service-id={serviceId}
        title={title}
        className={`group ${color} border-2 border-gray-300 rounded-lg px-3 py-2.5 shadow-sm ${baseClasses} ${highlightClasses}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-start gap-2">
          {icon && <div className="text-orange-600 flex-shrink-0 transition-transform group-hover:scale-110">{icon}</div>}
          <h3 className="text-gray-900 text-xs sm:text-sm font-medium leading-tight truncate transition-all group-hover:text-base group-hover:font-semibold">{title}</h3>
        </div>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div 
        ref={ref}
        data-service-id={serviceId}
        title={title}
        className={`group ${color} border-2 border-gray-300 rounded-lg px-2 py-2 shadow-sm ${baseClasses} ${highlightClasses}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-start gap-2">
          {icon && <div className="text-orange-600 flex-shrink-0 transition-transform group-hover:scale-110">{icon}</div>}
          <h4 className="text-gray-900 text-xs sm:text-sm font-medium leading-tight truncate transition-all group-hover:text-base group-hover:font-semibold">{title}</h4>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      data-service-id={serviceId}
      title={title}
      className={`group ${color} border-2 border-gray-300 rounded-lg p-3 sm:p-4 shadow-md ${baseClasses} ${highlightClasses}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-start gap-3">
        {icon && <div className="text-orange-600 flex-shrink-0 transition-transform group-hover:scale-110">{icon}</div>}
        <h3 className="text-gray-900 text-sm sm:text-base font-medium leading-tight transition-all group-hover:text-lg group-hover:font-semibold">{title}</h3>
      </div>
    </div>
  );
});

AWSServiceBox.displayName = 'AWSServiceBox';
