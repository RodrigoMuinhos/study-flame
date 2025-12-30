'use client';

import { Suspense, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/aws-study/MainLayout';

type View =
  | 'home'
  | 'diagram'
  | 'training'
  | 'simulator'
  | 'official-exam'
  | 'stats'
  | 'study-plan'
  | 'review';

function ExamLayoutInner({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleNavigate = (view: View) => {
    router.push(`/aws-study/study?view=${view}`);
  };

  return (
    <MainLayout currentView="simulator" onNavigate={handleNavigate}>
      {children}
    </MainLayout>
  );
}

export default function ExamLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <MainLayout
          currentView="simulator"
          onNavigate={() => {
            // no-op during suspense fallback
          }}
        >
          {children}
        </MainLayout>
      }
    >
      <ExamLayoutInner>{children}</ExamLayoutInner>
    </Suspense>
  );
}
