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
        className={`${color} border-2 border-gray-300 rounded-lg px-2 sm:px-3 md:px-4 py-2 md:py-3 shadow-sm ${baseClasses} ${highlightClasses}`}
        onClick={onClick}
      >
        <div className="flex items-start gap-2">
          {icon && <div className="text-orange-600 flex-shrink-0">{icon}</div>}
          <div className="min-w-0 flex-1">
            <h3 className="text-gray-900 text-xs sm:text-sm md:text-base leading-tight">{title}</h3>
            {description.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {description.map((item, index) => (
                  <li key={index} className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-tight">• {item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div 
        ref={ref}
        data-service-id={serviceId}
        className={`${color} border-2 border-gray-300 rounded-lg px-2 md:px-3 py-1.5 md:py-2 shadow-sm ${baseClasses} ${highlightClasses}`}
        onClick={onClick}
      >
        <div className="flex items-start gap-1.5 sm:gap-2">
          {icon && <div className="text-orange-600 flex-shrink-0">{icon}</div>}
          <h4 className="text-gray-900 text-[10px] sm:text-xs md:text-sm leading-tight">{title}</h4>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      data-service-id={serviceId}
      className={`${color} border-2 border-gray-300 rounded-lg p-3 sm:p-4 md:p-6 shadow-md ${baseClasses} ${highlightClasses}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {icon && <div className="text-orange-600 flex-shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg leading-tight">{title}</h3>
          {description.length > 0 && (
            <ul className="space-y-0.5 sm:space-y-1">
              {description.map((item, index) => (
                <li key={index} className="text-gray-600 text-[10px] sm:text-xs md:text-sm leading-tight">• {item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
});

AWSServiceBox.displayName = 'AWSServiceBox';
