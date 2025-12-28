import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ArrowProps {
  type?: 'single' | 'double' | 'vertical';
  label?: string;
}

export function Arrow({ type = 'single', label }: ArrowProps) {
  if (type === 'double') {
    return (
      <div className="flex items-center justify-center gap-8 my-4">
        <div className="flex-1 flex flex-col items-center">
          <ArrowDown className="text-gray-500" size={28} strokeWidth={2.5} />
          {label && <span className="text-xs text-gray-500 mt-1">{label}</span>}
        </div>
        <div className="flex-1 flex flex-col items-center">
          <ArrowDown className="text-gray-500" size={28} strokeWidth={2.5} />
          {label && <span className="text-xs text-gray-500 mt-1">{label}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-4">
      <ArrowDown className="text-gray-500" size={28} strokeWidth={2.5} />
      {label && <span className="text-xs text-gray-500 mt-1">{label}</span>}
    </div>
  );
}
