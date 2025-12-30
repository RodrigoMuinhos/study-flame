import React from 'react';
import { useCertification } from '@/contexts/AWSStudyContext';
import { servicesData } from '@/data/servicesData';
import { practitionerServicesData } from '@/data/practitionerServicesData';
import { SidePanel } from './SidePanel';
import { PractitionerDiagram } from './PractitionerDiagram';
import { SolutionsArchitectDiagram } from './SolutionsArchitectDiagram';

interface DiagramViewProps {
  selectedService: string | null;
  isPanelOpen: boolean;
  onServiceClick: (serviceId: string) => void;
  onClosePanel: () => void;
  onNextStep: (nextId: string) => void;
  onPrevStep: (prevId: string) => void;
  onTraining?: (serviceId: string) => void;
  onBack: () => void;
  onGoToSimulator: () => void;
}

export function DiagramView({
  selectedService,
  isPanelOpen,
  onServiceClick,
  onClosePanel,
  onNextStep,
  onPrevStep,
  onTraining,
  onBack,
  onGoToSimulator
}: DiagramViewProps) {
  const { currentCertification } = useCertification();

  // Seleciona os dados corretos baseado na certificação
  const currentServicesData = currentCertification === 'practitioner' 
    ? practitionerServicesData 
    : servicesData;

  const currentServiceInfo = selectedService ? currentServicesData[selectedService] : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`transition-all duration-300 ${isPanelOpen ? 'md:mr-[380px]' : ''}`}>
        {currentCertification === 'practitioner' ? (
          <PractitionerDiagram
            selectedService={selectedService}
            onServiceClick={onServiceClick}
            onBack={onBack}
            onGoToSimulator={onGoToSimulator}
          />
        ) : (
          <SolutionsArchitectDiagram
            selectedService={selectedService}
            onServiceClick={onServiceClick}
            onBack={onBack}
            onGoToSimulator={onGoToSimulator}
          />
        )}
      </div>

      {/* Side Panel */}
      {isPanelOpen && currentServiceInfo && (
        <SidePanel
          serviceInfo={currentServiceInfo}
          onClose={onClosePanel}
          onNext={onNextStep}
          onPrev={onPrevStep}
          onTraining={onTraining}
        />
      )}
    </div>
  );
}
