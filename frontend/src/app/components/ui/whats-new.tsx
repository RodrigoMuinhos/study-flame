"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "whats_new_seen_version";

// Bump this value whenever you want to show the update notice again.
// Prefer setting via env in deployments: NEXT_PUBLIC_WHATS_NEW_VERSION
const WHATS_NEW_VERSION = process.env.NEXT_PUBLIC_WHATS_NEW_VERSION ?? "2026-01-08";

const UPDATES: string[] = [
  "Você agora recebe avisos de novidades direto no sino (com contagem de não lidas).",
  "Ao clicar em um aviso, você vai direto para a aula relacionada (mais rápido e sem procurar).",
  "Quando um novo vídeo for publicado, você fica sabendo imediatamente pelo sino.",
];

export function WhatsNew() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    try {
      const seenVersion = localStorage.getItem(STORAGE_KEY);
      if (seenVersion !== WHATS_NEW_VERSION) {
        // Mark as seen as soon as it opens to avoid recurring prompts.
        localStorage.setItem(STORAGE_KEY, WHATS_NEW_VERSION);
        setIsOpen(true);
      }
    } catch {
      // If storage is blocked, fail silently (no recurring UI guarantees).
    }
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="fixed inset-4 z-[120] m-auto flex h-fit max-h-[90vh] w-full max-w-2xl items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="O que mudou"
      >
        <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-6">
            <div>
              <h2 className="font-semibold text-foreground">Boas notícias</h2>
              <p className="text-xs text-muted-foreground">Novidades disponíveis no seu portal</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="mb-4 text-sm text-muted-foreground">
              Atualizamos o sistema para você acompanhar os conteúdos com mais praticidade.
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              {UPDATES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex flex-1 items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
