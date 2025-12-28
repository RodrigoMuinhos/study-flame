import React, { forwardRef } from 'react';

interface SubnetColumnProps {
  title: string;
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
  isHighlighted?: boolean;
  serviceId?: string;
}

export const SubnetColumn = forwardRef<HTMLDivElement, SubnetColumnProps>(({ title, color, children, onClick, isHighlighted, serviceId }, ref) => {
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique chegue no VPC Container
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div 
        ref={ref}
        data-service-id={serviceId}
        className={`${color} border-2 border-gray-400 rounded-lg p-2 md:p-4 lg:p-6 h-full transition-all duration-300 ${
          isHighlighted ? 'ring-4 ring-orange-400 shadow-xl scale-[1.02]' : ''
        }`}
      >
        <div 
          className={`bg-white border border-gray-400 rounded px-2 md:px-3 py-1 md:py-1.5 mb-2 md:mb-3 lg:mb-4 inline-block ${
            onClick ? 'cursor-pointer hover:border-orange-500 hover:shadow-md transition-all' : ''
          }`}
          onClick={handleTitleClick}
        >
          <h3 className="text-[10px] sm:text-xs md:text-sm text-gray-900">{title}</h3>
        </div>
        <div className="space-y-2 md:space-y-3 lg:space-y-4" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
});

SubnetColumn.displayName = 'SubnetColumn';
