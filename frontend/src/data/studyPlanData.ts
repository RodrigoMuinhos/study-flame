// Types
export type PlanDuration = 4 | 8 | 12;

export interface WeekContent {
  week: number;
  title: string;
  topics: string[];
  activities: string[];
  estimatedHours: number;
}

// SAA Plans
export const SAA_4_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "Fundamentos e Compute",
    topics: ["EC2", "ELB", "Auto Scaling", "Lambda", "Elastic Beanstalk"],
    activities: [
      "Estudar tipos de instâncias EC2 e casos de uso",
      "Praticar configuração de Load Balancers",
      "Resolver 40 questões sobre Compute",
      "Criar diagrama mental dos serviços de computação"
    ],
    estimatedHours: 20
  },
  {
    week: 2,
    title: "Storage e Database",
    topics: ["S3", "EBS", "EFS", "RDS", "DynamoDB", "ElastiCache", "Aurora"],
    activities: [
      "Entender classes de armazenamento S3",
      "Comparar RDS vs DynamoDB",
      "Resolver 40 questões sobre Storage e Database",
      "Praticar políticas de ciclo de vida S3"
    ],
    estimatedHours: 20
  },
  {
    week: 3,
    title: "Networking e Security",
    topics: ["VPC", "Route 53", "CloudFront", "IAM", "Security Groups", "KMS"],
    activities: [
      "Desenhar arquiteturas VPC completas",
      "Estudar políticas IAM e roles",
      "Resolver 40 questões sobre Networking e Security",
      "Praticar configuração de Security Groups"
    ],
    estimatedHours: 20
  },
  {
    week: 4,
    title: "Review e Simulados",
    topics: ["Revisão geral", "Well-Architected Framework", "Simulados"],
    activities: [
      "Realizar 2 simulados completos (65 questões cada)",
      "Revisar todos os tópicos fracos",
      "Estudar casos práticos de arquitetura",
      "Preparação mental para a prova"
    ],
    estimatedHours: 25
  }
];

export const SAA_8_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "EC2 e Fundamentos",
    topics: ["EC2 Básico", "Tipos de Instâncias", "AMI", "User Data"],
    activities: [
      "Estudar tipos de instâncias e famílias",
      "Entender modelos de precificação",
      "Resolver 20 questões sobre EC2",
      "Praticar criação de AMIs"
    ],
    estimatedHours: 12
  },
  {
    week: 2,
    title: "Load Balancing e Auto Scaling",
    topics: ["ELB (ALB, NLB, CLB)", "Auto Scaling Groups", "CloudWatch"],
    activities: [
      "Comparar tipos de Load Balancers",
      "Configurar Auto Scaling Policies",
      "Resolver 20 questões sobre HA e Scaling",
      "Estudar métricas CloudWatch"
    ],
    estimatedHours: 12
  },
  {
    week: 3,
    title: "Storage - S3 e EBS",
    topics: ["S3", "S3 Classes", "S3 Lifecycle", "EBS", "EFS"],
    activities: [
      "Entender classes de armazenamento S3",
      "Estudar versionamento e replicação",
      "Resolver 20 questões sobre Storage",
      "Comparar EBS vs EFS vs S3"
    ],
    estimatedHours: 12
  },
  {
    week: 4,
    title: "Databases",
    topics: ["RDS", "Aurora", "DynamoDB", "ElastiCache", "Redshift"],
    activities: [
      "Comparar bancos relacionais vs NoSQL",
      "Estudar Multi-AZ e Read Replicas",
      "Resolver 20 questões sobre Databases",
      "Entender casos de uso de cada DB"
    ],
    estimatedHours: 12
  },
  {
    week: 5,
    title: "Networking - VPC",
    topics: ["VPC", "Subnets", "Route Tables", "NAT", "VPC Peering"],
    activities: [
      "Desenhar arquiteturas VPC do zero",
      "Estudar público vs privado",
      "Resolver 20 questões sobre VPC",
      "Praticar configuração de Route Tables"
    ],
    estimatedHours: 12
  },
  {
    week: 6,
    title: "Security e DNS",
    topics: ["IAM", "Security Groups", "NACLs", "KMS", "Route 53"],
    activities: [
      "Estudar políticas IAM avançadas",
      "Comparar SG vs NACLs",
      "Resolver 20 questões sobre Security",
      "Entender routing policies Route 53"
    ],
    estimatedHours: 12
  },
  {
    week: 7,
    title: "Application Services",
    topics: ["Lambda", "SQS", "SNS", "CloudFront", "API Gateway"],
    activities: [
      "Estudar arquiteturas serverless",
      "Entender mensageria (SQS/SNS)",
      "Resolver 20 questões sobre Application Services",
      "Praticar integração Lambda + API Gateway"
    ],
    estimatedHours: 12
  },
  {
    week: 8,
    title: "Review Final e Simulados",
    topics: ["Well-Architected Framework", "Revisão Completa", "Simulados"],
    activities: [
      "Realizar 3 simulados completos",
      "Revisar todos os tópicos fracos",
      "Estudar 5 pilares Well-Architected",
      "Prática com cenários reais"
    ],
    estimatedHours: 15
  }
];

export const SAA_12_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "Introdução e EC2 Básico",
    topics: ["Fundamentos AWS", "EC2 Básico", "Tipos de Instâncias"],
    activities: [
      "Estudar conceitos de Cloud Computing",
      "Entender tipos de instâncias EC2",
      "Resolver 15 questões sobre fundamentos",
      "Assistir vídeos sobre arquitetura AWS"
    ],
    estimatedHours: 8
  },
  {
    week: 2,
    title: "EC2 Avançado",
    topics: ["AMI", "User Data", "Placement Groups", "EC2 Instance Store"],
    activities: [
      "Estudar storage options EC2",
      "Praticar com User Data scripts",
      "Resolver 15 questões sobre EC2",
      "Criar laboratório prático EC2"
    ],
    estimatedHours: 8
  },
  {
    week: 3,
    title: "Load Balancers",
    topics: ["ALB", "NLB", "CLB", "Target Groups", "Health Checks"],
    activities: [
      "Comparar tipos de ELB",
      "Estudar SSL/TLS termination",
      "Resolver 15 questões sobre ELB",
      "Configurar ALB com múltiplos targets"
    ],
    estimatedHours: 8
  },
  {
    week: 4,
    title: "Auto Scaling",
    topics: ["Auto Scaling Groups", "Scaling Policies", "CloudWatch Alarms"],
    activities: [
      "Estudar tipos de scaling policies",
      "Configurar Auto Scaling com ELB",
      "Resolver 15 questões sobre Auto Scaling",
      "Praticar com CloudWatch metrics"
    ],
    estimatedHours: 8
  },
  {
    week: 5,
    title: "S3 - Parte 1",
    topics: ["S3 Basics", "Storage Classes", "Versioning", "Encryption"],
    activities: [
      "Entender todas as classes S3",
      "Estudar métodos de criptografia",
      "Resolver 15 questões sobre S3",
      "Configurar bucket policies"
    ],
    estimatedHours: 8
  },
  {
    week: 6,
    title: "S3 - Parte 2 e EBS/EFS",
    topics: ["S3 Lifecycle", "Replication", "EBS", "EFS", "FSx"],
    activities: [
      "Estudar S3 Replication (CRR/SRR)",
      "Comparar EBS vs EFS",
      "Resolver 15 questões sobre Storage",
      "Criar políticas de lifecycle"
    ],
    estimatedHours: 8
  },
  {
    week: 7,
    title: "RDS e Aurora",
    topics: ["RDS", "Multi-AZ", "Read Replicas", "Aurora", "Backups"],
    activities: [
      "Estudar RDS Multi-AZ vs Read Replicas",
      "Entender Aurora Global Database",
      "Resolver 15 questões sobre RDS",
      "Comparar estratégias de backup"
    ],
    estimatedHours: 8
  },
  {
    week: 8,
    title: "NoSQL e Cache",
    topics: ["DynamoDB", "DAX", "ElastiCache", "MemoryDB"],
    activities: [
      "Estudar DynamoDB capacidades",
      "Entender casos de uso cache",
      "Resolver 15 questões sobre NoSQL",
      "Comparar Redis vs Memcached"
    ],
    estimatedHours: 8
  },
  {
    week: 9,
    title: "VPC - Fundamentos",
    topics: ["VPC", "Subnets", "Route Tables", "Internet Gateway", "NAT"],
    activities: [
      "Desenhar VPC do zero",
      "Estudar CIDR blocks",
      "Resolver 15 questões sobre VPC",
      "Praticar subnet calculation"
    ],
    estimatedHours: 8
  },
  {
    week: 10,
    title: "VPC Avançado e Security",
    topics: ["VPC Peering", "Transit Gateway", "Security Groups", "NACLs", "IAM"],
    activities: [
      "Estudar VPC connectivity options",
      "Comparar Security Groups vs NACLs",
      "Resolver 15 questões sobre Security",
      "Criar políticas IAM complexas"
    ],
    estimatedHours: 8
  },
  {
    week: 11,
    title: "Application Services",
    topics: ["Lambda", "SQS", "SNS", "API Gateway", "CloudFront", "Route 53"],
    activities: [
      "Estudar arquiteturas serverless",
      "Entender event-driven architecture",
      "Resolver 15 questões sobre serviços de aplicação",
      "Praticar integração de serviços"
    ],
    estimatedHours: 8
  },
  {
    week: 12,
    title: "Review e Simulados Finais",
    topics: ["Well-Architected Framework", "Todos os tópicos", "Simulados"],
    activities: [
      "Realizar 4 simulados completos",
      "Revisar todos os pontos fracos",
      "Estudar whitepapers essenciais",
      "Preparação final para o exame"
    ],
    estimatedHours: 12
  }
];

// CLF Plans
export const CLF_4_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "Cloud Concepts",
    topics: ["Conceitos de Cloud", "Modelos de Cloud", "Benefícios AWS"],
    activities: [
      "Estudar CAPEX vs OPEX",
      "Entender modelos IaaS, PaaS, SaaS",
      "Resolver 30 questões sobre Cloud Concepts",
      "Assistir AWS Cloud Practitioner Essentials"
    ],
    estimatedHours: 10
  },
  {
    week: 2,
    title: "Core Services",
    topics: ["EC2", "S3", "RDS", "VPC", "Lambda", "CloudFront"],
    activities: [
      "Estudar serviços principais AWS",
      "Entender casos de uso básicos",
      "Resolver 30 questões sobre Core Services",
      "Criar comparativo de serviços"
    ],
    estimatedHours: 10
  },
  {
    week: 3,
    title: "Security e Billing",
    topics: ["IAM", "Security Groups", "AWS Organizations", "Billing", "Cost Explorer"],
    activities: [
      "Estudar modelo de responsabilidade compartilhada",
      "Entender IAM users, groups, roles",
      "Resolver 30 questões sobre Security e Billing",
      "Praticar com AWS Free Tier"
    ],
    estimatedHours: 10
  },
  {
    week: 4,
    title: "Review e Simulados",
    topics: ["Revisão Completa", "Well-Architected Framework", "Simulados"],
    activities: [
      "Realizar 2 simulados completos (65 questões cada)",
      "Revisar todos os conceitos",
      "Estudar AWS Global Infrastructure",
      "Preparação final"
    ],
    estimatedHours: 12
  }
];

export const CLF_8_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "Introdução à AWS Cloud",
    topics: ["Conceitos básicos", "Benefícios da Cloud", "CAPEX vs OPEX"],
    activities: [
      "Estudar vantagens da nuvem",
      "Entender modelos de deployment",
      "Resolver 15 questões introdutórias",
      "Assistir vídeos AWS"
    ],
    estimatedHours: 6
  },
  {
    week: 2,
    title: "Compute Services",
    topics: ["EC2", "Lambda", "Elastic Beanstalk", "ECS"],
    activities: [
      "Estudar tipos de compute",
      "Entender serverless",
      "Resolver 15 questões sobre Compute",
      "Comparar serviços de computação"
    ],
    estimatedHours: 6
  },
  {
    week: 3,
    title: "Storage Services",
    topics: ["S3", "EBS", "EFS", "S3 Glacier"],
    activities: [
      "Entender tipos de storage",
      "Estudar classes de armazenamento",
      "Resolver 15 questões sobre Storage",
      "Criar tabela comparativa"
    ],
    estimatedHours: 6
  },
  {
    week: 4,
    title: "Database Services",
    topics: ["RDS", "DynamoDB", "Aurora", "ElastiCache"],
    activities: [
      "Comparar bancos de dados AWS",
      "Entender casos de uso",
      "Resolver 15 questões sobre Databases",
      "Estudar quando usar cada DB"
    ],
    estimatedHours: 6
  },
  {
    week: 5,
    title: "Networking",
    topics: ["VPC", "CloudFront", "Route 53", "Direct Connect"],
    activities: [
      "Estudar conceitos de rede",
      "Entender VPC basics",
      "Resolver 15 questões sobre Networking",
      "Desenhar arquitetura de rede simples"
    ],
    estimatedHours: 6
  },
  {
    week: 6,
    title: "Security e IAM",
    topics: ["IAM", "Security Groups", "KMS", "Shared Responsibility"],
    activities: [
      "Estudar modelo de segurança AWS",
      "Entender IAM em profundidade",
      "Resolver 15 questões sobre Security",
      "Criar políticas IAM básicas"
    ],
    estimatedHours: 6
  },
  {
    week: 7,
    title: "Billing e Pricing",
    topics: ["AWS Pricing", "Cost Explorer", "Budgets", "TCO Calculator"],
    activities: [
      "Estudar modelos de precificação",
      "Entender Free Tier",
      "Resolver 15 questões sobre Billing",
      "Praticar com calculadoras AWS"
    ],
    estimatedHours: 6
  },
  {
    week: 8,
    title: "Review e Simulados",
    topics: ["Revisão Geral", "Support Plans", "Simulados"],
    activities: [
      "Realizar 3 simulados completos",
      "Revisar pontos fracos",
      "Estudar AWS Support tiers",
      "Preparação final"
    ],
    estimatedHours: 10
  }
];

export const CLF_12_WEEKS: WeekContent[] = [
  {
    week: 1,
    title: "Introdução Cloud Computing",
    topics: ["O que é Cloud", "Benefícios", "Tipos de Cloud"],
    activities: [
      "Estudar conceitos fundamentais",
      "Entender público vs privado vs híbrido",
      "Resolver 10 questões básicas",
      "Assistir introdução AWS"
    ],
    estimatedHours: 4
  },
  {
    week: 2,
    title: "AWS Global Infrastructure",
    topics: ["Regions", "Availability Zones", "Edge Locations"],
    activities: [
      "Estudar infraestrutura global",
      "Entender alta disponibilidade",
      "Resolver 10 questões sobre infrastructure",
      "Explorar mapa de regiões AWS"
    ],
    estimatedHours: 4
  },
  {
    week: 3,
    title: "EC2 Basics",
    topics: ["EC2 Instances", "Instance Types", "Pricing Models"],
    activities: [
      "Estudar tipos de instâncias",
      "Entender On-Demand vs Reserved vs Spot",
      "Resolver 10 questões sobre EC2",
      "Comparar modelos de pricing"
    ],
    estimatedHours: 4
  },
  {
    week: 4,
    title: "Storage - S3",
    topics: ["S3 Basics", "Storage Classes", "S3 Use Cases"],
    activities: [
      "Estudar S3 fundamentos",
      "Entender classes de armazenamento",
      "Resolver 10 questões sobre S3",
      "Praticar com S3 console"
    ],
    estimatedHours: 4
  },
  {
    week: 5,
    title: "Databases Basics",
    topics: ["RDS", "DynamoDB", "Database Types"],
    activities: [
      "Entender SQL vs NoSQL",
      "Estudar serviços de banco AWS",
      "Resolver 10 questões sobre Databases",
      "Comparar RDS engines"
    ],
    estimatedHours: 4
  },
  {
    week: 6,
    title: "Networking Fundamentals",
    topics: ["VPC Basics", "CloudFront", "Route 53"],
    activities: [
      "Estudar conceitos de rede",
      "Entender CDN e DNS",
      "Resolver 10 questões sobre Networking",
      "Desenhar arquitetura básica"
    ],
    estimatedHours: 4
  },
  {
    week: 7,
    title: "IAM Fundamentals",
    topics: ["Users", "Groups", "Roles", "Policies"],
    activities: [
      "Estudar IAM em profundidade",
      "Entender least privilege",
      "Resolver 10 questões sobre IAM",
      "Criar políticas simples"
    ],
    estimatedHours: 4
  },
  {
    week: 8,
    title: "Security Services",
    topics: ["Security Groups", "Shield", "WAF", "KMS"],
    activities: [
      "Estudar serviços de segurança",
      "Entender modelo de responsabilidade",
      "Resolver 10 questões sobre Security",
      "Revisar compliance AWS"
    ],
    estimatedHours: 4
  },
  {
    week: 9,
    title: "Monitoring e Management",
    topics: ["CloudWatch", "CloudTrail", "Trusted Advisor"],
    activities: [
      "Estudar ferramentas de monitoramento",
      "Entender logs e métricas",
      "Resolver 10 questões sobre Monitoring",
      "Explorar Trusted Advisor"
    ],
    estimatedHours: 4
  },
  {
    week: 10,
    title: "Pricing e Billing",
    topics: ["Pricing Models", "Cost Explorer", "Budgets", "TCO"],
    activities: [
      "Estudar modelos de precificação",
      "Entender ferramentas de custo",
      "Resolver 10 questões sobre Billing",
      "Calcular TCO exemplo"
    ],
    estimatedHours: 4
  },
  {
    week: 11,
    title: "Support e Resources",
    topics: ["Support Plans", "AWS Marketplace", "Documentation"],
    activities: [
      "Estudar planos de suporte",
      "Entender recursos disponíveis",
      "Resolver 10 questões sobre Support",
      "Explorar AWS Marketplace"
    ],
    estimatedHours: 4
  },
  {
    week: 12,
    title: "Review Final",
    topics: ["Todos os tópicos", "Simulados", "Well-Architected"],
    activities: [
      "Realizar 4 simulados completos",
      "Revisar todos os conceitos",
      "Estudar Well-Architected Framework",
      "Preparação final para prova"
    ],
    estimatedHours: 8
  }
];
