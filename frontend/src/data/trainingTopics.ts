import { TrainingTopic } from '@/types/aws-study';

export const trainingTopics: TrainingTopic[] = [
  {
    id: 'cloudfront',
    title: 'CloudFront (CDN)',
    description: 'Cache global, edge locations, redução de latência',
    category: 'Edge & Acesso',
    icon: 'Cloud',
    color: 'from-orange-500 to-orange-600',
    questionCount: 90
  },
  {
    id: 'route53',
    title: 'Route 53 (DNS)',
    description: 'Políticas de roteamento, health checks, failover',
    category: 'Edge & Acesso',
    icon: 'Globe',
    color: 'from-blue-500 to-blue-600',
    questionCount: 90
  },
  {
    id: 's3',
    title: 'Amazon S3',
    description: 'Object storage, versionamento, lifecycle, static website',
    category: 'Frontend & Conteúdo',
    icon: 'HardDrive',
    color: 'from-green-500 to-green-600',
    questionCount: 90
  },
  {
    id: 'vpc',
    title: 'Amazon VPC',
    description: 'Redes isoladas, subnets, route tables, CIDR',
    category: 'Rede & Segurança',
    icon: 'Network',
    color: 'from-indigo-500 to-indigo-600',
    questionCount: 90
  },
  {
    id: 'subnets',
    title: 'Subnets (Public/Private/Isolated)',
    description: 'Segmentação de rede, NAT Gateway, Internet Gateway',
    category: 'Rede & Segurança',
    icon: 'Layers',
    color: 'from-purple-500 to-purple-600',
    questionCount: 90
  },
  {
    id: 'security-groups',
    title: 'Security Groups',
    description: 'Firewall stateful, regras de entrada e saída',
    category: 'Rede & Segurança',
    icon: 'Shield',
    color: 'from-red-500 to-red-600',
    questionCount: 90
  },
  {
    id: 'ec2',
    title: 'Amazon EC2',
    description: 'Instâncias, tipos, EBS, user data, metadata',
    category: 'Compute & Escala',
    icon: 'Server',
    color: 'from-cyan-500 to-cyan-600',
    questionCount: 90
  },
  {
    id: 'auto-scaling',
    title: 'Auto Scaling Group',
    description: 'Escalabilidade automática, políticas, health checks',
    category: 'Compute & Escala',
    icon: 'TrendingUp',
    color: 'from-teal-500 to-teal-600',
    questionCount: 90
  },
  {
    id: 'alb',
    title: 'Application Load Balancer',
    description: 'Balanceamento Layer 7, target groups, health checks',
    category: 'Compute & Escala',
    icon: 'Workflow',
    color: 'from-lime-500 to-lime-600',
    questionCount: 90
  },
  {
    id: 'sqs',
    title: 'Amazon SQS',
    description: 'Filas de mensagens, desacoplamento, visibility timeout',
    category: 'Mensageria & Integração',
    icon: 'GitBranch',
    color: 'from-yellow-500 to-yellow-600',
    questionCount: 90
  },
  {
    id: 'sns',
    title: 'Amazon SNS',
    description: 'Pub/Sub, tópicos, fan-out, notificações',
    category: 'Mensageria & Integração',
    icon: 'Bell',
    color: 'from-pink-500 to-pink-600',
    questionCount: 90
  },
  {
    id: 'rds',
    title: 'Amazon RDS',
    description: 'Banco relacional, Multi-AZ, Read Replicas, backups',
    category: 'Banco de Dados',
    icon: 'Database',
    color: 'from-violet-500 to-violet-600',
    questionCount: 90
  },
  {
    id: 'iam',
    title: 'IAM (Identidade e Acesso)',
    description: 'Usuários, grupos, políticas, princípio do menor privilégio',
    category: 'Observabilidade & Controle',
    icon: 'Lock',
    color: 'from-gray-600 to-gray-700',
    questionCount: 90
  },
  {
    id: 'iam-roles',
    title: 'IAM Roles',
    description: 'Assumir roles, credenciais temporárias, instance profiles',
    category: 'Observabilidade & Controle',
    icon: 'Shield',
    color: 'from-slate-500 to-slate-600',
    questionCount: 90
  },
  {
    id: 'cloudwatch',
    title: 'Amazon CloudWatch',
    description: 'Métricas, logs, alarmes, dashboards',
    category: 'Observabilidade & Controle',
    icon: 'Activity',
    color: 'from-amber-500 to-amber-600',
    questionCount: 90
  },
  {
    id: 'architecture',
    title: 'Arquitetura AWS (Nível Prova)',
    description: 'Alta disponibilidade, escalabilidade, Well-Architected',
    category: 'Arquitetura',
    icon: 'Box',
    color: 'from-emerald-500 to-emerald-600',
    questionCount: 90
  }
];
