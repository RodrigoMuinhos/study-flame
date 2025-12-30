'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ExamRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const kind = searchParams.get('kind');
    let view = 'simulator';
    if (kind === 'official') view = 'official-exam';
    else if (kind === 'training') view = 'training';
    else if (kind === 'simulator') view = 'simulator';
    router.replace(`/aws-study/study?view=${view}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecionando...</p>
      </div>
    </div>
  );
}

export default function ExamRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    }>
      <ExamRedirectContent />
    </Suspense>
  );
}
