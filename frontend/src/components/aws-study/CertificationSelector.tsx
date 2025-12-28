import React, { useState } from 'react';
import { Flame, X } from 'lucide-react';
import { useCertification } from '@/contexts/AWSStudyContext';
import { certifications, CertificationType } from '@/types/certifications';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/aws-study/ui/alert-dialog';

export function CertificationSelector() {
  const { currentCertification, setCertification } = useCertification();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);

  const currentCert = certifications[currentCertification];

  const handleOpenChange = (certId: CertificationType) => {
    if (certId === currentCertification) {
      return; // Não faz nada se já for o certificado atual
    }
    setSelectedCert(certId);
  };

  const handleConfirm = () => {
    if (selectedCert) {
      setCertification(selectedCert);
      setSelectedCert(null);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setSelectedCert(null);
  };

  const getGradientClasses = (color: string) => {
    const gradients: Record<string, string> = {
      orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
      blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    };
    return gradients[color] || 'bg-gradient-to-br from-orange-500 to-orange-600';
  };

  const targetCert = selectedCert ? certifications[selectedCert] : null;

  return (
    <>
      <div className="relative">
        {/* Flame Button to Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 ${getGradientClasses(currentCert.color)} rounded-xl flex items-center justify-center`}>
              <Flame size={24} className="text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-sm">{currentCert.name}</div>
              <div className="text-xs text-slate-400">{currentCert.fullName}</div>
            </div>
          </div>
          <Flame
            size={20}
            className={`text-orange-400 group-hover:text-orange-300 transition-all ${isOpen ? 'animate-pulse' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-20">
              {Object.values(certifications).map((cert) => {
                const isSelected = cert.id === currentCertification;

                return (
                  <button
                    key={cert.id}
                    onClick={() => handleOpenChange(cert.id)}
                    disabled={isSelected}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                      isSelected
                        ? 'bg-slate-700 border-l-4 border-orange-500 cursor-default'
                        : 'hover:bg-slate-700/50 cursor-pointer'
                    }`}
                  >
                    <div className={`w-10 h-10 ${getGradientClasses(cert.color)} rounded-xl flex items-center justify-center`}>
                      <Flame size={24} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-bold text-sm">{cert.name}</div>
                      <div className="text-xs text-slate-400">{cert.fullName}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedCert} onOpenChange={(open) => !open && handleCancel()}>
        <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 text-white">
              <Flame className="text-orange-500" size={28} />
              <span>Alternar Certificação</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Você gostaria de alternar seu certificado?
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Current vs New Certification */}
          {targetCert && (
            <div className="my-4 space-y-3">
              {/* Current */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <div className="text-xs text-slate-400 mb-2">ATUAL</div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getGradientClasses(currentCert.color)} rounded-xl flex items-center justify-center`}>
                    <Flame size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{currentCert.name}</div>
                    <div className="text-xs text-slate-400">{currentCert.fullName}</div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="text-orange-500 text-2xl">↓</div>
              </div>

              {/* New */}
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border-2 border-orange-500">
                <div className="text-xs text-orange-400 mb-2 font-bold">NOVO</div>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getGradientClasses(targetCert.color)} rounded-xl flex items-center justify-center`}>
                    <Flame size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{targetCert.name}</div>
                    <div className="text-xs text-slate-300">{targetCert.fullName}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleCancel}
              className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              Confirmar Alteração
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
