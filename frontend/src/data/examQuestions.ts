import { ExamQuestion } from '@/types/aws-study';

// Mock exam questions - replace with real questions later
export const examQuestions: ExamQuestion[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  question: `Questão ${i + 1}: Qual é a melhor prática para o cenário apresentado?`,
  context: 'Uma empresa precisa de uma solução que seja altamente disponível, escalável e otimizada em custos.',
  options: [
    { label: 'A', text: 'Usar uma única instância EC2 grande em uma única AZ' },
    { label: 'B', text: 'Usar múltiplas instâncias EC2 com Auto Scaling em múltiplas AZs' },
    { label: 'C', text: 'Usar Lambda Functions com API Gateway' },
    { label: 'D', text: 'Usar containers ECS sem Load Balancer' }
  ],
  correctAnswer: 'B',
  explanation: 'A opção B oferece alta disponibilidade através de múltiplas AZs e escalabilidade através do Auto Scaling Group, alinhando-se com as melhores práticas AWS.',
  relatedService: 'ec2',
  category: ['Design Resiliente', 'Alta Performance', 'Segurança', 'Otimização de Custos'][i % 4]
}));
