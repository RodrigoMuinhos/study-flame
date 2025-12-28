import React, { forwardRef } from 'react';

interface VPCContainerProps {
  children: React.ReactNode;
  onClick?: () => void;
  isHighlighted?: boolean;
  serviceId?: string;
}

export const VPCContainer = forwardRef<HTMLDivElement, VPCContainerProps>(({ children, onClick, isHighlighted, serviceId }, ref) => {
  const handleHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      ref={ref}
      data-service-id={serviceId}
      className={`border-4 border-blue-600 rounded-xl p-3 md:p-6 lg:p-8 bg-blue-50/30 shadow-lg my-4 md:my-6 lg:my-8 transition-all duration-300 ${
        isHighlighted ? 'ring-4 ring-orange-400 shadow-2xl scale-[1.02]' : ''
      }`}
    >
      <div 
        className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 md:mb-4 lg:mb-6 ${
          onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
        onClick={handleHeaderClick}
      >
        <div className="bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
          <h2 className="text-sm md:text-base lg:text-lg">Amazon VPC</h2>
        </div>
        <p className="text-gray-600 text-xs md:text-sm">Rede Privada Isolada</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
});

VPCContainer.displayName = 'VPCContainer';
