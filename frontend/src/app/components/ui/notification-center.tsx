"use client";

import { motion, AnimatePresence } from "motion/react";
import { Bell, X, CheckCheck, Trash2, Settings } from "lucide-react";
import { useState, useEffect } from "react";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: '🏆 Nova conquista desbloqueada!',
      message: 'Você completou 5 cursos e ganhou o badge "Estudante Dedicado"',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      icon: '🏆'
    },
    {
      id: '2',
      type: 'info',
      title: '📚 Novo conteúdo disponível',
      message: 'O curso "React Avançado" teve uma nova aula adicionada',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      icon: '📚'
    },
    {
      id: '3',
      type: 'success',
      title: '✅ Tarefa concluída',
      message: 'Você completou o exercício "Hooks Avançados" com 100% de acerto',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      icon: '✅'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
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

  return (
    <>
      {/* Botão do sino */}
      <button
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

      {/* Painel de notificações */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Painel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-12 z-50 w-96 rounded-2xl border border-border bg-card shadow-2xl"
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
                  {notifications.length > 0 && (
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
                        className={`relative px-4 py-3 transition hover:bg-muted/50 ${
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
                            <span className="text-xl">{notification.icon}</span>
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
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                    title="Marcar como lida"
                                  >
                                    <CheckCheck className="h-3.5 w-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(notification.id)}
                                  className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-red-500"
                                  title="Excluir"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rodapé */}
              {notifications.length > 0 && (
                <div className="border-t border-border px-4 py-2 flex gap-2">
                  <button
                    onClick={handleClearAll}
                    className="flex-1 rounded-lg py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <Trash2 className="inline h-3.5 w-3.5 mr-1" />
                    Limpar tudo
                  </button>
                  <button
                    className="flex-1 rounded-lg py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <Settings className="inline h-3.5 w-3.5 mr-1" />
                    Configurar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
