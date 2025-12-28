"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type SplashScreenProps = {
  onFinish?: () => void;   // chama quando a splash termina
  durationMs?: number;     // default 2200
  showText?: boolean;      // opcional
};

export function SplashScreen({
  onFinish,
  durationMs = 2200,
  showText = true,
}: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#070A12] to-[#0A0F1F]">
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
      
      {/* Glow atrás da logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.25, 0.35, 0.15],
            scale: [0.8, 1, 1.1, 1]
          }}
          transition={{
            duration: durationMs / 1000,
            times: [0, 0.35, 0.7, 1],
            ease: ["easeOut", "easeInOut", "easeIn"],
          }}
          className="h-72 w-72 rounded-full bg-gradient-to-br from-orange-500 via-rose-500 to-red-500 blur-3xl"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo FLAME animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.92, 1, 1.03, 1],
            y: [10, 0, -2, -8],
          }}
          transition={{
            duration: durationMs / 1000,
            times: [0, 0.35, 0.7, 1],
            ease: ["easeOut", "easeInOut", "easeIn"],
          }}
          className="relative flex items-center justify-center"
        >
          {/* Logo SVG - Ícone de Chama */}
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="50%" stopColor="#F7931E" />
                <stop offset="100%" stopColor="#FFC837" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Chama principal */}
            <path
              d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z"
              fill="url(#flameGradient)"
              filter="url(#glow)"
            />
            
            {/* Núcleo interno da chama */}
            <path
              d="M90 45C80 55 75 65 75 80C75 95 82 105 90 105C98 105 105 95 105 80C105 65 100 55 90 45Z"
              fill="#FFE66D"
              opacity="0.8"
            />
            
            {/* Destaque */}
            <ellipse
              cx="90"
              cy="75"
              rx="8"
              ry="15"
              fill="#FFF9E6"
              opacity="0.6"
            />
            
            {/* Base da chama */}
            <path
              d="M70 125C70 125 80 135 90 135C100 135 110 125 110 125"
              stroke="url(#flameGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </motion.div>

        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [6, 0, 0, -6] }}
            transition={{
              duration: durationMs / 1000,
              times: [0, 0.35, 0.7, 1],
              ease: ["easeOut", "easeInOut", "easeIn"],
            }}
            className="mt-6 text-center"
          >
            <div className="font-semibold text-white/80">
              Portal do Aluno
            </div>
            <div className="mt-1.5 text-white/55">
              A chama está acendendo…
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
