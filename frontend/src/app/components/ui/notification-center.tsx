"use client";

import { motion, AnimatePresence } from "motion/react";
import { Bell, X, CheckCheck } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import { createPortal } from "react-dom";
import { API_BASE_URL } from "@/services/api/config";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
}

export function NotificationCenter({ studentCpf }: { studentCpf?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [resolvedCpf, setResolvedCpf] = useState<string | undefined>(studentCpf);
  const bellButtonRef = useRef<HTMLButtonElement | null>(null);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (studentCpf?.trim()) {
      setResolvedCpf(studentCpf.trim());
      return;
    }

    try {
      const tryParse = (key: string): any => {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      };

      const fromStudentData = tryParse('student_data')?.cpf;
      const fromUserData = tryParse('user_data')?.cpf;
      const fromLegacySession = tryParse('crm_flame_session')?.studentCpf;
      const fromStudentDataLegacy = tryParse('studentData')?.cpf;

      const cpfCandidate =
        (typeof fromStudentData === 'string' && fromStudentData) ||
        (typeof fromUserData === 'string' && fromUserData) ||
        (typeof fromLegacySession === 'string' && fromLegacySession) ||
        (typeof fromStudentDataLegacy === 'string' && fromStudentDataLegacy) ||
        undefined;

      if (cpfCandidate) setResolvedCpf(cpfCandidate);
    } catch {
      // ignore
    }
  }, [studentCpf]);

  const loadNotifications = async () => {
    if (!resolvedCpf) {
      setNotifications([]);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/students/me/notifications?cpf=${encodeURIComponent(resolvedCpf)}`);
    if (!res.ok) {
      setNotifications([]);
      return;
    }

    const data = (await res.json()) as Array<{
      id: number;
      type: string;
      title: string;
      message: string;
      icon?: string;
      createdAt: string;
      read: boolean;
    }>;

    const normalized: Notification[] = data.map((n) => ({
      id: String(n.id),
      type: toUiType(n.type),
      title: n.title,
      message: n.message,
      icon: n.icon,
      timestamp: new Date(n.createdAt),
      read: !!n.read,
    }));

    // UX: manter somente não lidas na lista.
    // Assim, ao marcar como lida (ou clicar), ela desaparece.
    setNotifications(normalized.filter((n) => !n.read));
  };

  useEffect(() => {
    loadNotifications();
    const intervalId = window.setInterval(loadNotifications, 15000);
    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedCpf]);

  useEffect(() => {
    if (!isOpen) return;
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updatePanelPosition = useCallback(() => {
    const el = bellButtonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const padding = 8;
    const panelWidth = 384; // Tailwind w-96 = 24rem

    const top = rect.bottom + 8;
    const minLeft = padding;
    const maxLeft = Math.max(padding, viewportW - panelWidth - padding);
    const left = Math.min(Math.max(rect.right - panelWidth, minLeft), maxLeft);

    setPanelPosition({ top, left });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);
    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [isOpen, updatePanelPosition]);

  const handleMarkAsRead = async (id: string) => {
    if (!resolvedCpf) return;

    // Remove imediatamente da lista
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await fetch(
        `${API_BASE_URL}/students/me/notifications/${encodeURIComponent(id)}/read?cpf=${encodeURIComponent(resolvedCpf)}`,
        { method: 'PATCH' }
      );
    } catch {
      // Se falhar, recarrega do servidor
      void loadNotifications();
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!resolvedCpf) return;

    // Remove imediatamente todas da lista
    setNotifications([]);
    try {
      await fetch(`${API_BASE_URL}/students/me/notifications/read-all?cpf=${encodeURIComponent(resolvedCpf)}`,
        { method: 'POST' }
      );
    } catch {
      void loadNotifications();
    }
  };

  const handleOpenNotification = async (notification: Notification, e?: React.MouseEvent) => {
    if (e) {
      const target = e.target;
      if (target instanceof Element && target.closest('button')) return;
    }

    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }

    // Try to navigate to the specific lesson if message contains module/lesson.
    // Example: "(Módulo 0, Aula 1)"
    try {
      const match = notification.message.match(/M[oó]dulo\s*(\d+)\s*,\s*Aula\s*(\d+)/i);
      if (match) {
        const moduleNumber = Number(match[1]);
        const lessonNumber = Number(match[2]);
        if (!Number.isNaN(moduleNumber) && !Number.isNaN(lessonNumber)) {
          localStorage.setItem('pending_lesson_nav', JSON.stringify({ moduleNumber, lessonNumber }));
          window.dispatchEvent(new CustomEvent('navigate-to-lesson', { detail: { moduleNumber, lessonNumber } }));
        }
      }
    } catch {
      // ignore
    }

    // Always navigate to aulas page (even if parsing fails)
    try {
      window.dispatchEvent(new CustomEvent('navigate-to-aulas'));
    } catch {
      // ignore
    }

    setIsOpen(false);
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'agora mesmo';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
    return `${Math.floor(seconds / 86400)}d atrás`;
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const toUiType = (type: string): Notification['type'] => {
    const t = (type || '').toUpperCase();
    if (t === 'ACHIEVEMENT') return 'achievement';
    if (t === 'SUCCESS') return 'success';
    if (t === 'WARNING') return 'warning';
    return 'info';
  };

  return (
    <>
      {/* Botão do sino */}
      <button
        ref={bellButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Painel de notificações (portal para evitar stacking/overflow do layout) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-[9998]"
                />

                {/* Painel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed z-[9999] w-96 max-w-[calc(100vw-1rem)] rounded-2xl border border-border bg-card shadow-2xl"
                  style={{
                    top: panelPosition?.top ?? 64,
                    left: panelPosition?.left ?? 8,
                  }}
                >
              {/* Cabeçalho */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <h3 className="font-bold text-foreground">Notificações</h3>
                  {unreadCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {unreadCount} não {unreadCount === 1 ? 'lida' : 'lidas'}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      title="Marcar todas como lidas"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Lista de notificações */}
              <div className="max-h-[500px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Nenhuma notificação
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Você está em dia!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={(e) => void handleOpenNotification(notification, e)}
                        className={`relative cursor-pointer px-4 py-3 transition hover:bg-muted/50 ${
                          !notification.read ? 'bg-muted/30' : ''
                        }`}
                      >
                        {/* Indicador de não lida */}
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-orange-500" />
                        )}

                        <div className="flex gap-3">
                          {/* Ícone */}
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${getTypeStyles(
                              notification.type
                            )}`}
                          >
                            <span className="text-xl">{notification.icon || '🔔'}</span>
                          </div>

                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-foreground mb-1 leading-tight">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      void handleMarkAsRead(notification.id);
                                    }}
                                    className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                    title="Marcar como lida"
                                  >
                                    <CheckCheck className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
