"use client";

import { Cloud, Menu, Bell, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAWSStudy } from '@/contexts/AWSStudyContext';

interface AwsStudyHeaderProps {
  onMenuToggle?: () => void;
}

export function AwsStudyHeader({ onMenuToggle }: AwsStudyHeaderProps) {
  const { clearToken } = useAWSStudy();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <Cloud size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-white">AWS Study Hub</h1>
              <p className="text-xs text-white/60">Simulador e treinamento certificação</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white sm:block">
            <Bell size={20} />
          </button>
          
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          
          <button className="hidden rounded-lg p-2 text-white/60 transition hover:bg-white/5 hover:text-white sm:block">
            <User size={20} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            title="Sair do AWS Study"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}
