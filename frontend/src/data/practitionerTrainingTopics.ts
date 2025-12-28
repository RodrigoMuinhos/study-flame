import { TrainingTopic } from '@/types/aws-study';

export const practitionerTrainingTopics: TrainingTopic[] = [
  {
    id: 'cloud-concepts',
    name: 'Conceitos de Nuvem',
    description: 'Fundamentos da computação em nuvem AWS',
    icon: '☁️',
    color: 'from-blue-400 to-blue-600',
    questionCount: 24,
    domain: 'Conceitos de Nuvem',
    topics: [
      'Definição de nuvem AWS',
      'Modelos de implantação (público, privado, híbrido)',
      'Benefícios da nuvem AWS',
      'Economia de escala'
    ]
  },
  {
    id: 'aws-global-infrastructure',
    name: 'Infraestrutura Global AWS',
    description: 'Regiões, zonas de disponibilidade e edge locations',
    icon: '🌍',
    color: 'from-green-400 to-green-600',
    questionCount: 20,
    domain: 'Conceitos de Nuvem',
    topics: [
      'Regiões AWS',
      'Availability Zones',
      'Edge Locations',
      'Latência e proximidade'
    ]
  },
  {
    id: 'shared-responsibility',
    name: 'Modelo de Responsabilidade Compartilhada',
    description: 'Responsabilidades AWS vs Cliente',
    icon: '🤝',
    color: 'from-purple-400 to-purple-600',
    questionCount: 18,
    domain: 'Segurança e Conformidade',
    topics: [
      'Segurança DA nuvem (AWS)',
      'Segurança NA nuvem (Cliente)',
      'Controles compartilhados',
      'Responsabilidades por serviço'
    ]
  },
  {
    id: 'security-compliance',
    name: 'Segurança e Conformidade',
    description: 'IAM, criptografia, conformidade',
    icon: '🔐',
    color: 'from-red-400 to-red-600',
    questionCount: 30,
    domain: 'Segurança e Conformidade',
    topics: [
      'AWS IAM (usuários, grupos, roles, políticas)',
      'MFA e credenciais',
      'Criptografia (em repouso e em trânsito)',
      'Programas de conformidade'
    ]
  },
  {
    id: 'compute-services',
    name: 'Serviços de Computação',
    description: 'EC2, Lambda, ECS, e mais',
    icon: '💻',
    color: 'from-orange-400 to-orange-600',
    questionCount: 25,
    domain: 'Tecnologia e Serviços',
    topics: [
      'Amazon EC2',
      'AWS Lambda',
      'Amazon ECS/EKS',
      'Elastic Beanstalk'
    ]
  },
  {
    id: 'storage-services',
    name: 'Serviços de Armazenamento',
    description: 'S3, EBS, EFS, Glacier',
    icon: '💾',
    color: 'from-blue-400 to-blue-600',
    questionCount: 22,
    domain: 'Tecnologia e Serviços',
    topics: [
      'Amazon S3',
      'Amazon EBS',
      'Amazon EFS',
      'Amazon Glacier'
    ]
  },
  {
    id: 'database-services',
    name: 'Serviços de Banco de Dados',
    description: 'RDS, DynamoDB, Redshift',
    icon: '🗄️',
    color: 'from-green-400 to-green-600',
    questionCount: 20,
    domain: 'Tecnologia e Serviços',
    topics: [
      'Amazon RDS',
      'Amazon DynamoDB',
      'Amazon Redshift',
      'ElastiCache'
    ]
  },
  {
    id: 'networking-cdn',
    name: 'Rede e Entrega de Conteúdo',
    description: 'VPC, CloudFront, Route 53',
    icon: '🌐',
    color: 'from-purple-400 to-purple-600',
    questionCount: 23,
    domain: 'Tecnologia e Serviços',
    topics: [
      'Amazon VPC',
      'CloudFront',
      'Route 53',
      'ELB'
    ]
  },
  {
    id: 'monitoring-management',
    name: 'Monitoramento e Gerenciamento',
    description: 'CloudWatch, CloudTrail, Config',
    icon: '📊',
    color: 'from-orange-400 to-orange-600',
    questionCount: 18,
    domain: 'Tecnologia e Serviços',
    topics: [
      'Amazon CloudWatch',
      'AWS CloudTrail',
      'AWS Config',
      'AWS Systems Manager'
    ]
  },
  {
    id: 'pricing-billing',
    name: 'Modelos de Precificação',
    description: 'Sob demanda, reservado, spot',
    icon: '💰',
    color: 'from-green-400 to-green-600',
    questionCount: 15,
    domain: 'Faturamento, Preços e Suporte',
    topics: [
      'Modelos de precificação',
      'On-Demand vs Reserved vs Spot',
      'Savings Plans',
      'Free Tier'
    ]
  },
  {
    id: 'billing-tools',
    name: 'Ferramentas de Faturamento',
    description: 'Cost Explorer, Budgets, TCO',
    icon: '📈',
    color: 'from-blue-400 to-blue-600',
    questionCount: 20,
    domain: 'Faturamento, Preços e Suporte',
    topics: [
      'AWS Cost Explorer',
      'AWS Budgets',
      'TCO Calculator',
      'Billing Dashboard'
    ]
  },
  {
    id: 'support-plans',
    name: 'Planos de Suporte AWS',
    description: 'Basic, Developer, Business, Enterprise',
    icon: '🎧',
    color: 'from-purple-400 to-purple-600',
    questionCount: 15,
    domain: 'Faturamento, Preços e Suporte',
    topics: [
      'Níveis de suporte',
      'TAM (Technical Account Manager)',
      'Tempos de resposta',
      'Trusted Advisor'
    ]
  }
];
