"use client";

import { motion, AnimatePresence } from "motion/react";
import { Cookie, Settings, X } from "lucide-react";
import { useState, useEffect } from "react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleReject = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(minimalConsent));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border-2 border-border bg-card shadow-2xl backdrop-blur-sm">
            {!showSettings ? (
              // Banner simples
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                    <Cookie className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 font-bold text-foreground">🍪 Este site usa cookies</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Utilizamos cookies essenciais para o funcionamento da plataforma e, com seu consentimento, 
                      cookies de análise e marketing para melhorar sua experiência.{" "}
                      <a href="/politica-cookies" target="_blank" className="text-orange-500 underline hover:text-orange-400">
                        Saiba mais
                      </a>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleAcceptAll}
                        className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 text-sm font-medium text-white transition hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30"
                      >
                        Aceitar Todos
                      </button>
                      <button
                        onClick={handleReject}
                        className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        Apenas Necessários
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Personalizar
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground transition"
                    aria-label="Fechar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              // Configurações detalhadas
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Preferências de Cookies</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  {/* Cookies necessários */}
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Cookies Necessários</h4>
                      <p className="text-xs text-muted-foreground">
                        Essenciais para o funcionamento básico da plataforma. Não podem ser desativados.
                      </p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-orange-500">
                      <div className="h-5 w-5 rounded-full bg-white ml-auto mr-0.5 shadow" />
                    </div>
                  </div>

                  {/* Cookies de análise */}
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Cookies de Análise</h4>
                      <p className="text-xs text-muted-foreground">
                        Ajudam a entender como você usa a plataforma para melhorarmos a experiência.
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`flex h-6 w-11 items-center rounded-full transition ${
                        preferences.analytics ? "bg-orange-500" : "bg-border"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white shadow transition ${
                          preferences.analytics ? "ml-auto mr-0.5" : "ml-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Cookies de marketing */}
                  <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">Cookies de Marketing</h4>
                      <p className="text-xs text-muted-foreground">
                        Usados para personalizar anúncios e medir a eficácia de campanhas.
                      </p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`flex h-6 w-11 items-center rounded-full transition ${
                        preferences.marketing ? "bg-orange-500" : "bg-border"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full bg-white shadow transition ${
                          preferences.marketing ? "ml-auto mr-0.5" : "ml-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:from-orange-600 hover:to-red-600"
                  >
                    Aceitar Todos
                  </button>
                  <button
                    onClick={handleAcceptSelected}
                    className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    Confirmar Seleção
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
