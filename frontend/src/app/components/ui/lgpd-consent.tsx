"use client";

import { motion, AnimatePresence } from "motion/react";
import { Shield, Check, X } from "lucide-react";
import { useState } from "react";

interface LGPDConsentProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function LGPDConsent({ isOpen, onAccept, onDecline }: LGPDConsentProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedMarketing, setAcceptedMarketing] = useState(false);

  const canProceed = acceptedTerms && acceptedPrivacy;

  const handleAccept = () => {
    if (canProceed) {
      // Salva preferências no localStorage
      localStorage.setItem('lgpd_consent', JSON.stringify({
        terms: true,
        privacy: true,
        marketing: acceptedMarketing,
        timestamp: new Date().toISOString()
      }));
      onAccept();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl"
            >
              {/* Header */}
              <div className="border-b border-border bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Privacidade e Proteção de Dados</h2>
                    <p className="text-sm text-muted-foreground">Conforme LGPD (Lei 13.709/2018)</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 max-h-[60vh]">
                <div className="space-y-6">
                  {/* Introdução */}
                  <div>
                    <p className="text-foreground leading-relaxed">
                      Para utilizar o <strong>Bootcamp FLAME</strong>, precisamos do seu consentimento para coletar e 
                      processar seus dados pessoais. Valorizamos sua privacidade e garantimos transparência total.
                    </p>
                  </div>

                  {/* Dados coletados */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="font-semibold text-foreground mb-2">📋 Dados que coletamos:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Nome completo e CPF (para identificação)</li>
                      <li>• E-mail (para comunicação e acesso)</li>
                      <li>• Progresso de aprendizado (para acompanhamento)</li>
                      <li>• Dados de acesso (para segurança)</li>
                    </ul>
                  </div>

                  {/* Finalidade */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="font-semibold text-foreground mb-2">🎯 Para que usamos:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Gerenciar seu acesso à plataforma</li>
                      <li>• Acompanhar seu progresso educacional</li>
                      <li>• Enviar notificações importantes</li>
                      <li>• Melhorar sua experiência de aprendizado</li>
                    </ul>
                  </div>

                  {/* Direitos do titular */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="font-semibold text-foreground mb-2">✅ Seus direitos (Art. 18 LGPD):</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Confirmar se tratamos seus dados</li>
                      <li>• Acessar seus dados a qualquer momento</li>
                      <li>• Corrigir dados incompletos ou desatualizados</li>
                      <li>• Solicitar exclusão de dados (direito ao esquecimento)</li>
                      <li>• Revogar consentimento a qualquer momento</li>
                      <li>• Portabilidade dos seus dados</li>
                    </ul>
                  </div>

                  {/* Checkboxes obrigatórios */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-border bg-card transition-all checked:border-orange-500 checked:bg-orange-500"
                        />
                        {acceptedTerms && (
                          <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none" />
                        )}
                      </div>
                      <span className="text-sm text-foreground group-hover:text-foreground/80">
                        <strong className="text-orange-500">*</strong> Li e aceito os{" "}
                        <a href="/termos" target="_blank" className="text-orange-500 underline hover:text-orange-400">
                          Termos de Uso
                        </a>{" "}
                        da plataforma.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={acceptedPrivacy}
                          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-border bg-card transition-all checked:border-orange-500 checked:bg-orange-500"
                        />
                        {acceptedPrivacy && (
                          <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none" />
                        )}
                      </div>
                      <span className="text-sm text-foreground group-hover:text-foreground/80">
                        <strong className="text-orange-500">*</strong> Autorizo o tratamento dos meus dados pessoais conforme a{" "}
                        <a href="/privacidade" target="_blank" className="text-orange-500 underline hover:text-orange-400">
                          Política de Privacidade
                        </a>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={acceptedMarketing}
                          onChange={(e) => setAcceptedMarketing(e.target.checked)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-border bg-card transition-all checked:border-orange-500 checked:bg-orange-500"
                        />
                        {acceptedMarketing && (
                          <Check className="absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none" />
                        )}
                      </div>
                      <span className="text-sm text-foreground group-hover:text-foreground/80">
                        (Opcional) Aceito receber novidades, promoções e conteúdos educacionais por e-mail.
                      </span>
                    </label>
                  </div>

                  {/* Info adicional */}
                  <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-3">
                    <p className="text-xs text-muted-foreground">
                      <strong>📧 DPO (Encarregado):</strong> privacidade@bootcampflame.com<br />
                      Você pode revogar este consentimento a qualquer momento através das configurações da conta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-muted/30 p-6">
                <div className="flex gap-3">
                  <button
                    onClick={onDecline}
                    className="flex-1 rounded-lg border-2 border-border bg-card px-4 py-3 font-medium text-foreground transition hover:bg-muted"
                  >
                    <X className="inline h-4 w-4 mr-2" />
                    Não Aceito
                  </button>
                  <button
                    onClick={handleAccept}
                    disabled={!canProceed}
                    className={`flex-1 rounded-lg px-4 py-3 font-medium text-white transition ${
                      canProceed
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30"
                        : "bg-muted cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Check className="inline h-4 w-4 mr-2" />
                    Aceitar e Continuar
                  </button>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  <strong className="text-orange-500">*</strong> Campos obrigatórios
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
