"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAWSStudy } from '@/contexts/AWSStudyContext';
import { AWSStudyApp } from '@/components/aws-study/AWSStudyApp';

export default function StudyPage() {
  const { hasAccess } = useAWSStudy();
  const router = useRouter();

  useEffect(() => {
    if (!hasAccess) {
      router.push('/aws-study');
    }
  }, [hasAccess, router]);

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-slate-600">Verificando acesso...</div>
      </div>
    );
  }

  return <AWSStudyApp />;
}
