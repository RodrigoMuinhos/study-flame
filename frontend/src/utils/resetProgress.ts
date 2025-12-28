/**
 * Utilitário para resetar progresso do usuário
 * Execute no console do navegador: window.resetAWSProgress()
 */

export function resetAWSProgress() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('aws_exam_stats');
    console.log('✅ Progresso AWS resetado com sucesso!');
    console.log('🔄 Recarregue a página para ver o progresso zerado.');
    window.location.reload();
  }
}

// Disponibilizar globalmente para debug
if (typeof window !== 'undefined') {
  (window as any).resetAWSProgress = resetAWSProgress;
}
