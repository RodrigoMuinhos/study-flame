"use client";

import { AWSStudyProvider } from '@/contexts/AWSStudyContext';

export default function AwsStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AWSStudyProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {children}
      </div>
    </AWSStudyProvider>
  );
}
