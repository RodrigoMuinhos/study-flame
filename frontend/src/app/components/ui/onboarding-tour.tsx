"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

interface OnboardingTourProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  storageKey?: string;
  forceShow?: boolean;
}

export function OnboardingTour({ 
  steps, 
  onComplete, 
  storageKey = 'onboarding_completed',
  forceShow = false
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      setCurrentStep(0); // Reset para o primeiro passo
    } else {
      const completed = localStorage.getItem(storageKey);
      if (!completed) {
        setIsVisible(true);
      }
    }
  }, [storageKey, forceShow]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'skipped');
    setIsVisible(false);
    onComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'completed');
    setIsVisible(false);
    onComplete();
  };

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Modal de tour */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Passo {currentStep + 1} de {steps.length}
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="Fechar tour"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {step.image && (
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
              
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="mb-3 text-2xl font-bold text-foreground">
                  {step.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>

            {/* Indicadores de progresso */}
            <div className="flex gap-1.5 px-6 pb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : index < currentStep
                      ? "bg-orange-500/50"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>

            {/* Rodapé com navegação */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                Pular tour
              </button>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition hover:from-orange-600 hover:to-red-600"
                >
                  {isLastStep ? (
                    <>
                      <Check className="h-4 w-4" />
                      Concluir
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Componente de exemplo com steps pré-definidos
export function WelcomeTour({ onComplete, forceShow }: { onComplete: () => void; forceShow?: boolean }) {
  const steps: OnboardingStep[] = [
    {
      title: "🔥 Bem-vindo ao Bootcamp Flame!",
      description: "Estamos felizes em tê-lo conosco! Este tour rápido vai te ajudar a começar sua jornada de aprendizado.",
    },
    {
      title: "📚 Acesse seus cursos",
      description: "Navegue pela sua lista de cursos ativos e acompanhe seu progresso em tempo real. Cada curso tem videoaulas, exercícios e certificados.",
    },
    {
      title: "🏆 Sistema de gamificação",
      description: "Complete desafios, ganhe badges e suba de nível! Seu progresso é recompensado com conquistas que você pode compartilhar.",
    },
    {
      title: "⚙️ Personalize sua experiência",
      description: "Acesse as configurações para escolher seu tema favorito, gerenciar notificações e ajustar suas preferências de privacidade.",
    },
    {
      title: "🚀 Pronto para começar!",
      description: "Você está pronto para começar sua jornada! Clique em 'Concluir' e comece a explorar a plataforma.",
    },
  ];

  return <OnboardingTour steps={steps} onComplete={onComplete} storageKey="welcome_tour" forceShow={forceShow} />;
}
