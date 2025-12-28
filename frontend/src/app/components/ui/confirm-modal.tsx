"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";
import { ReactNode } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  icon?: ReactNode;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  icon,
}: ConfirmModalProps) {
  const variants = {
    danger: {
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
      buttonBg: "bg-red-500 hover:bg-red-600",
    },
    warning: {
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
      buttonBg: "bg-yellow-500 hover:bg-yellow-600",
    },
    info: {
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      buttonBg: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const style = variants[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${style.iconBg} mb-4`}>
                {icon || <AlertTriangle className={`h-6 w-6 ${style.iconColor}`} />}
              </div>

              {/* Content */}
              <h2 className="mb-2 text-xl font-bold text-foreground">{title}</h2>
              <p className="mb-6 text-muted-foreground">{description}</p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 font-medium text-foreground transition hover:bg-muted"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-medium text-white transition ${style.buttonBg}`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
