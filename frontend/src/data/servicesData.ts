import { ServiceInfo } from '../components/aws-study/SidePanel';

export const servicesData: Record<string, ServiceInfo> = {
  'user-browser': {
    id: 'user-browser',
    title: 'Usuário / Browser',
    step: 1,
    totalSteps: 18,
    nextStepId: 'route53',
    whatIs: {
      description: 'O ponto de partida de toda aplicação web: o usuário acessando através do navegador (Chrome, Firefox, Safari, etc).',
      examples: [
        'Usuário digita www.exemplo.com no navegador',
        'Navegador envia requisição HTTP/HTTPS',
        'Aguarda resposta do servidor'
      ]
    },
    hierarchy: {
      layer: 'Camada de Apresentação (Cliente)',
      position: 'É o primeiro componente externo à AWS, representa o dispositivo do usuário final.',
      flow: 'Usuário → DNS → CDN → Load Balancer → Servidor'
    },
    whyExists: [
      'Todo sistema web precisa de um ponto de entrada (usuário)',
      'Navegador é a interface universal para acessar aplicações web',
      'Responsável por renderizar HTML, CSS e executar JavaScript'
    ],
    realCase: {
      scenario: 'Um cliente acessa sua loja online para comprar um produto.',
      actions: [
        'Usuário digita www.minhaloja.com',
        'Navegador resolve DNS e faz requisição HTTPS',
        'Recebe página HTML, CSS e JavaScript',
        'Renderiza interface da loja'
      ],
      impact: 'Experiência do usuário depende da velocidade de resposta e qualidade da interface.'
    }
  },
  
  'route53': {
    id: 'route53',
    title: 'Amazon Route 53 (DNS)',
    step: 2,
    totalSteps: 18,
    prevStepId: 'user-browser',
    nextStepId: 'cloudfront',
    awsDocsUrl: 'https://docs.aws.amazon.com/route53/',
    whatIs: {
      description: 'Serviço de DNS (Domain Name System) que traduz nomes de domínio legíveis (exemplo.com) em endereços IP que computadores usam.',
      examples: [
        'Traduz www.exemplo.com → 203.0.113.5',
        'Roteamento de tráfego com base em latência',
        'Health checks automáticos',
        'Failover para servidores backup'
      ]
    },
    hierarchy: {
      layer: 'Camada de Roteamento Global',
      position: 'Primeiro serviço AWS que o usuário "toca". Resolve o domínio antes de qualquer requisição.',
      flow: 'Usuário → [Route 53 resolve DNS] → CloudFront/ALB'
    },
    whyExists: [
      'Usuários não decoram endereços IP (203.0.113.5), mas sim nomes (www.exemplo.com)',
      'Permite roteamento inteligente baseado em geolocalização e latência',
      'Altamente disponível (99.99% SLA) e distribuído globalmente',
      'Integra-se nativamente com outros serviços AWS'
    ],
    realCase: {
      scenario: 'Sua aplicação está em múltiplas regiões (EUA, Europa, Brasil).',
      actions: [
        'Usuário do Brasil acessa www.app.com',
        'Route 53 detecta localização e roteia para servidor brasileiro',
        'Menor latência = experiência mais rápida',
        'Se servidor BR cair, Route 53 redireciona para EUA automaticamente'
      ],
      impact: 'Redução de 200ms para 20ms no tempo de resposta inicial.'
    }
  },

  'cloudfront': {
    id: 'cloudfront',
    title: 'Amazon CloudFront (CDN)',
    step: 3,
    totalSteps: 18,
    prevStepId: 'route53',
    nextStepId: 's3',
    awsDocsUrl: 'https://docs.aws.amazon.com/cloudfront/',
    whatIs: {
      description: 'Rede de distribuição de conteúdo (CDN) que armazena cópias de arquivos estáticos em servidores ao redor do mundo (edge locations).',
      examples: [
        'Cache de imagens, CSS, JavaScript',
        'Distribuição global com +400 pontos de presença',
        'Redução de latência para usuários distantes',
        'Proteção DDoS integrada com AWS Shield'
      ]
    },
    hierarchy: {
      layer: 'Camada de Cache Global',
      position: 'Entre o usuário e a origem (S3/ALB). Intercepta requisições e serve conteúdo cacheado.',
      flow: 'Usuário → Route 53 → [CloudFront cache] → S3/ALB'
    },
    whyExists: [
      'Servidor principal pode estar longe do usuário (latência alta)',
      'Servir o mesmo arquivo milhões de vezes desperdiça recursos',
      'CDN armazena arquivos estáticos perto do usuário',
      'Reduz carga no servidor de origem e custos de transferência'
    ],
    realCase: {
      scenario: 'E-commerce com imagens de produtos servidas da região us-east-1 para usuário no Japão.',
      actions: [
        'Sem CDN: Cada imagem viaja 18.000km (300ms)',
        'Com CloudFront: Imagem servida de edge location em Tóquio (5ms)',
        'Cache de 24 horas: 95% das requisições nunca chegam ao S3',
        'Economia de 80% em custos de transferência'
      ],
      impact: 'Página carrega 10x mais rápido para usuários internacionais.'
    }
  },

  's3': {
    id: 's3',
    title: 'Amazon S3 (Static Frontend)',
    step: 4,
    totalSteps: 18,
    prevStepId: 'cloudfront',
    nextStepId: 'alb',
    awsDocsUrl: 'https://docs.aws.amazon.com/s3/',
    whatIs: {
      description: 'Armazenamento de objetos para hospedar arquivos estáticos (HTML, CSS, JS, imagens). Pode servir sites estáticos completos.',
      examples: [
        'Frontend React/Vue/Angular compilado',
        'Imagens e assets',
        'Arquivos CSS e JavaScript',
        'Durabilidade de 99.999999999% (11 noves)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Armazenamento',
      position: 'Origem dos arquivos estáticos. CloudFront busca aqui quando cache expira.',
      flow: 'CloudFront → [S3 busca arquivo] → Retorna para CDN'
    },
    whyExists: [
      'Separar frontend estático do backend dinâmico',
      'S3 é infinitamente escalável e barato para arquivos',
      'Não precisa de servidor EC2 para hospedar HTML/CSS/JS',
      'Integração nativa com CloudFront e Route 53'
    ],
    realCase: {
      scenario: 'Aplicação React com 50 mil arquivos estáticos (imagens, bundles JS).',
      actions: [
        'Build do React gera pasta /dist',
        'Upload para bucket S3',
        'CloudFront aponta para S3 como origem',
        'Usuário acessa → CDN serve → S3 só recebe 5% das requisições'
      ],
      impact: 'Custo de $0.023/GB vs $0.09/GB em EC2. Economia de 75%.'
    }
  },

  'alb': {
    id: 'alb',
    title: 'Application Load Balancer (ALB)',
    step: 5,
    totalSteps: 18,
    prevStepId: 's3',
    nextStepId: 'vpc',
    awsDocsUrl: 'https://docs.aws.amazon.com/elasticloadbalancing/',
    whatIs: {
      description: 'Distribui requisições HTTP/HTTPS entre múltiplos servidores (EC2, containers) na camada de aplicação (Layer 7).',
      examples: [
        'Roteamento baseado em path (/api → backend, /images → S3)',
        'Health checks automáticos',
        'Sticky sessions (cookies)',
        'TLS/SSL termination'
      ]
    },
    hierarchy: {
      layer: 'Camada de Distribuição de Tráfego',
      position: 'Entre usuário/CDN e servidores backend. Decide qual servidor atenderá cada requisição.',
      flow: 'CloudFront → [ALB distribui] → EC2-1, EC2-2, EC2-3'
    },
    whyExists: [
      'Um servidor único é ponto de falha',
      'Tráfego varia: precisa adicionar/remover servidores dinamicamente',
      'ALB distribui carga uniformemente e remove servidores ruins',
      'Permite deploy sem downtime (blue-green deployment)'
    ],
    realCase: {
      scenario: 'API REST com 3 servidores EC2 em subnets privadas.',
      actions: [
        '10 mil requisições/segundo chegam no ALB',
        'ALB distribui 3.3k req/s para cada EC2',
        'Um EC2 falha no health check',
        'ALB remove servidor ruim e redistribui: 5k req/s para cada sobrevivente'
      ],
      impact: 'Zero downtime durante falhas. Alta disponibilidade garantida.'
    }
  },

  'ec2': {
    id: 'ec2',
    title: 'Amazon EC2 Instances',
    step: 10,
    totalSteps: 18,
    prevStepId: 'auto-scaling',
    nextStepId: 'sqs',
    awsDocsUrl: 'https://docs.aws.amazon.com/ec2/',
    whatIs: {
      description: 'Servidores virtuais escaláveis na nuvem AWS. Você escolhe sistema operacional, CPU, RAM, disco e configurações de rede.',
      examples: [
        'Servidor de aplicação (Java, Python, Node.js)',
        'Workers de processamento',
        'Instâncias em Auto Scaling Group',
        'Tipos: t3.micro (dev) até m5.24xlarge (produção)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Computação',
      position: 'Roda dentro da VPC em subnets privadas. Recebe requisições do ALB e processa lógica de negócio.',
      flow: 'ALB → [EC2 processa] → Consulta RDS/S3'
    },
    whyExists: [
      'Necessidade de executar código backend (APIs, workers)',
      'Controle total sobre sistema operacional e software',
      'Escalabilidade horizontal (adicionar mais instâncias)',
      'Isolamento de rede (subnets privadas sem acesso direto à internet)'
    ],
    realCase: {
      scenario: 'API REST em Spring Boot que processa pedidos de e-commerce.',
      actions: [
        'ALB distribui 1000 req/s entre 5 instâncias EC2',
        'Cada EC2 processa ~200 req/s',
        'Pico de Black Friday: Auto Scaling adiciona +10 instâncias automaticamente',
        'Após pico: Remove instâncias extras para economizar'
      ],
      impact: 'Elasticidade: paga apenas pelos recursos usados. Custo variável conforme demanda.'
    }
  },

  'rds': {
    id: 'rds',
    title: 'Amazon RDS (Multi-AZ)',
    step: 12,
    totalSteps: 18,
    prevStepId: 'isolated-subnet',
    nextStepId: 'iam',
    awsDocsUrl: 'https://docs.aws.amazon.com/rds/',
    whatIs: {
      description: 'Banco de dados relacional gerenciado. AWS cuida de backups, patches, replicação e failover automático.',
      examples: [
        'PostgreSQL, MySQL, MariaDB, Oracle, SQL Server',
        'Multi-AZ: réplica síncrona em outra zona',
        'Failover automático em 1-2 minutos',
        'Backups automáticos com retenção de 7-35 dias'
      ]
    },
    hierarchy: {
      layer: 'Camada de Dados',
      position: 'Fica em subnet isolada (sem acesso à internet). Apenas EC2 na VPC consegue acessar.',
      flow: 'EC2 → [RDS responde queries SQL] → Retorna dados'
    },
    whyExists: [
      'Dados relacionais exigem ACID (transações)',
      'Gerenciar banco on-premise é complexo (backups, HA, segurança)',
      'RDS automatiza tarefas operacionais',
      'Multi-AZ protege contra falha de datacenter'
    ],
    realCase: {
      scenario: 'E-commerce com banco PostgreSQL de 500GB.',
      actions: [
        'RDS Multi-AZ: instância primary em us-east-1a + standby em us-east-1b',
        'Zona 1a tem problema de energia',
        'RDS detecta falha e promove standby para primary (90 segundos)',
        'Aplicação reconecta automaticamente sem perda de dados'
      ],
      impact: 'RPO=0 (zero perda de dados) e RTO<2min (recuperação rápida).'
    }
  },

  'sqs': {
    id: 'sqs',
    title: 'Amazon SQS',
    step: 11,
    totalSteps: 18,
    prevStepId: 'ec2',
    nextStepId: 'isolated-subnet',
    awsDocsUrl: 'https://docs.aws.amazon.com/sqs/',
    whatIs: {
      description: 'Fila de mensagens gerenciada para desacoplar microsserviços. Producer envia mensagem, consumer processa de forma assíncrona.',
      examples: [
        'Envio de emails em background',
        'Processamento de imagens/vídeos',
        'Integração entre microsserviços',
        'Retenção de mensagens: 1 min a 14 dias'
      ]
    },
    hierarchy: {
      layer: 'Camada de Integração',
      position: 'Entre serviços que não precisam comunicação síncrona. Permite retry e processamento em lote.',
      flow: 'API envia → [SQS armazena] → Worker consome quando disponível'
    },
    whyExists: [
      'Evitar perda de tarefas quando serviço destino está sobrecarregado',
      'Desacoplar produtor de consumidor',
      'Retry automático em caso de falha',
      'Escalabilidade independente de produtores e consumidores'
    ],
    realCase: {
      scenario: 'Upload de 10 mil fotos de usuários para processamento.',
      actions: [
        'API recebe upload e envia 10k mensagens para SQS (rápido)',
        'Retorna "Em processamento" para usuário',
        '10 workers EC2 consomem fila (1k mensagens cada)',
        'Processamento paralelo: resize, watermark, upload para S3',
        'Mensagens com erro voltam para fila (retry automático)'
      ],
      impact: 'API responde em 100ms vs 5min se processasse síncrono. Melhor UX.'
    }
  },

  'vpc': {
    id: 'vpc',
    title: 'Amazon VPC',
    step: 6,
    totalSteps: 18,
    prevStepId: 'alb',
    nextStepId: 'public-subnet',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/',
    whatIs: {
      description: 'Rede virtual isolada na AWS. Define range de IPs, subnets, roteamento e controle de acesso de rede.',
      examples: [
        'CIDR: 10.0.0.0/16 (65.536 IPs)',
        'Subnets: Public (internet), Private (NAT), Isolated (sem saída)',
        'Internet Gateway (saída pública)',
        'NAT Gateway (private → internet)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede',
      position: 'Container lógico de todos os recursos. Define perímetro de segurança.',
      flow: 'Tudo na AWS roda dentro de uma VPC (EC2, RDS, ALB, etc)'
    },
    whyExists: [
      'Isolamento de rede (não compartilha rede com outros clientes AWS)',
      'Controle fino de tráfego (Security Groups, NACLs)',
      'Conectividade híbrida (VPN/Direct Connect)',
      'Segmentação: public, private, isolated subnets'
    ],
    realCase: {
      scenario: 'Arquitetura 3-tier com VPC.',
      actions: [
        'Public subnet: ALB (acesso internet)',
        'Private subnet: EC2 (acessa internet via NAT)',
        'Isolated subnet: RDS (sem saída internet)',
        'Security Groups bloqueiam tráfego não autorizado',
        'Route tables direcionam tráfego corretamente'
      ],
      impact: 'Defesa em profundidade: múltiplas camadas de segurança de rede.'
    }
  },

  'iam': {
    id: 'iam',
    title: 'AWS IAM',
    step: 13,
    totalSteps: 18,
    prevStepId: 'rds',
    nextStepId: 'iam-role',
    awsDocsUrl: 'https://docs.aws.amazon.com/iam/',
    whatIs: {
      description: 'Gerenciamento de identidades e permissões. Controla quem pode acessar o quê na AWS.',
      examples: [
        'Users: pessoas ou aplicações',
        'Groups: conjunto de users',
        'Roles: permissões temporárias para serviços',
        'Policies: regras JSON (Allow/Deny)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Segurança',
      position: 'Transversal: afeta todos os serviços. Avaliado antes de qualquer operação AWS.',
      flow: 'Request → IAM verifica permissão → Allow/Deny → Ação'
    },
    whyExists: [
      'Princípio do menor privilégio (least privilege)',
      'Auditoria: quem fez o quê e quando',
      'Sem IAM: todos teriam acesso root (perigoso)',
      'Compliance: PCI-DSS, HIPAA exigem controle de acesso'
    ],
    realCase: {
      scenario: 'Desenvolvedor precisa acessar apenas buckets S3 de desenvolvimento.',
      actions: [
        'Cria IAM User "dev-joao"',
        'Anexa policy: s3:GetObject, s3:PutObject apenas em dev-*',
        'Dev tenta deletar bucket de produção → Denied',
        'CloudTrail registra tentativa para auditoria'
      ],
      impact: 'Segurança: limita danos de credenciais vazadas ou insiders maliciosos.'
    }
  },

  'cloudwatch': {
    id: 'cloudwatch',
    title: 'Amazon CloudWatch',
    step: 17,
    totalSteps: 18,
    prevStepId: 'sns',
    awsDocsUrl: 'https://docs.aws.amazon.com/cloudwatch/',
    whatIs: {
      description: 'Monitoramento e observabilidade. Coleta logs, métricas e eventos de todos os serviços AWS.',
      examples: [
        'Métricas: CPU, memória, rede, latência',
        'Logs: aplicação, sistema, VPC Flow Logs',
        'Alarmes: notifica quando métrica ultrapassa threshold',
        'Dashboards: visualização centralizada'
      ]
    },
    hierarchy: {
      layer: 'Camada de Observabilidade',
      position: 'Monitora todos os serviços. Essencial para detectar problemas antes dos usuários.',
      flow: 'Serviços → CloudWatch coleta → Alarmes → SNS notifica equipe'
    },
    whyExists: [
      'Aplicações falham: precisa detectar e reagir rápido',
      'Logs distribuídos são difíceis de analisar',
      'Métricas de negócio (ex: vendas/hora) informam decisões',
      'Compliance: auditoria de logs por 1-7 anos'
    ],
    realCase: {
      scenario: 'API com latência alta às 2h da manhã.',
      actions: [
        'CloudWatch Alarm: p99 latency > 500ms',
        'Trigger: envia notificação via SNS',
        'Equipe analisa dashboard: RDS com CPU 95%',
        'Identifica query lenta (missing index)',
        'Cria índice: latência volta para 50ms'
      ],
      impact: 'MTTR (mean time to repair) reduz de horas para minutos.'
    }
  },

  'sns': {
    id: 'sns',
    title: 'Amazon SNS',
    step: 16,
    totalSteps: 18,
    prevStepId: 'security-groups',
    nextStepId: 'cloudwatch',
    awsDocsUrl: 'https://docs.aws.amazon.com/sns/',
    whatIs: {
      description: 'Pub/Sub gerenciado para notificações. Um publicador envia, múltiplos assinantes recebem.',
      examples: [
        'Email, SMS, Push notifications',
        'HTTP/HTTPS endpoints',
        'Integração com SQS, Lambda',
        'Fan-out: 1 mensagem → N destinos'
      ]
    },
    hierarchy: {
      layer: 'Camada de Notificações',
      position: 'Desacopla serviços via eventos. CloudWatch Alarms → SNS → Email/Slack.',
      flow: 'Publisher → Topic → Subscribers (Email, SMS, Lambda, SQS)'
    },
    whyExists: [
      'Notificar equipe de operações sobre problemas',
      'Alertas para usuários (SMS: seu pedido foi enviado)',
      'Arquiteturas orientadas a eventos',
      'Desacoplar produtor de consumidor (pub/sub)'
    ],
    realCase: {
      scenario: 'Sistema de pedidos notifica múltiplos sistemas downstream.',
      actions: [
        'Order Service publica "OrderCreated" no SNS Topic',
        'Assinantes: Email (cliente), SQS (estoque), Lambda (nota fiscal)',
        'Cada sistema processa independentemente',
        'Adicionar novo assinante não afeta publicador'
      ],
      impact: 'Acoplamento fraco: fácil adicionar/remover integrações.'
    }
  },

  'security-groups': {
    id: 'security-groups',
    title: 'Security Groups',
    step: 15,
    totalSteps: 18,
    prevStepId: 'iam-role',
    nextStepId: 'sns',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html',
    whatIs: {
      description: 'Firewall virtual de instância. Controla tráfego de entrada (inbound) e saída (outbound) por protocolo/porta/IP.',
      examples: [
        'Inbound: permitir porta 443 (HTTPS) de 0.0.0.0/0',
        'Outbound: permitir porta 3306 (MySQL) apenas para RDS SG',
        'Stateful: resposta é automaticamente permitida',
        'Default: nega tudo inbound, permite tudo outbound'
      ]
    },
    hierarchy: {
      layer: 'Camada de Segurança de Rede',
      position: 'Anexado a recursos (EC2, ALB, RDS). Age como firewall de instância.',
      flow: 'Request → Security Group avalia regras → Allow/Deny'
    },
    whyExists: [
      'Princípio do menor privilégio aplicado à rede',
      'Isolamento: RDS só aceita conexões de EC2 específicos',
      'Defesa em profundidade: mesmo dentro da VPC, há controle',
      'Previne movimentação lateral de atacantes'
    ],
    realCase: {
      scenario: 'RDS PostgreSQL precisa aceitar apenas conexões de instâncias EC2 da aplicação.',
      actions: [
        'Cria SG "app-sg" para EC2',
        'Cria SG "db-sg" para RDS',
        'db-sg inbound: porta 5432 de source "app-sg"',
        'Ataque compromete EC2: não consegue acessar RDS de outras instâncias'
      ],
      impact: 'Redução de superfície de ataque. Compliance com PCI-DSS.'
    }
  },

  'auto-scaling': {
    id: 'auto-scaling',
    title: 'Auto Scaling Group',
    step: 9,
    totalSteps: 18,
    prevStepId: 'private-subnet',
    nextStepId: 'ec2',
    awsDocsUrl: 'https://docs.aws.amazon.com/autoscaling/',
    whatIs: {
      description: 'Gerenciamento automático de capacidade. Adiciona/remove instâncias EC2 baseado em métricas (CPU, requests, etc).',
      examples: [
        'Min: 2, Max: 10, Desired: 4 instâncias',
        'Scale out: CPU > 70% por 5min → +2 instâncias',
        'Scale in: CPU < 30% por 10min → -1 instância',
        'Health checks: substitui instâncias não saudáveis'
      ]
    },
    hierarchy: {
      layer: 'Camada de Elasticidade',
      position: 'Gerencia grupo de EC2 atrás do ALB. Monitora saúde e ajusta capacidade.',
      flow: 'CloudWatch métrica → Alarm → Auto Scaling → Adiciona/Remove EC2'
    },
    whyExists: [
      'Tráfego varia: horário comercial vs madrugada',
      'Over-provisioning desperdiça dinheiro',
      'Under-provisioning causa lentidão/downtime',
      'Auto Scaling otimiza custo e performance automaticamente'
    ],
    realCase: {
      scenario: 'E-commerce com tráfego 10x maior na Black Friday.',
      actions: [
        'Dia normal: 4 instâncias t3.medium (~$100/mês)',
        'Black Friday 00:00: tráfego dispara',
        'Auto Scaling: 4 → 20 instâncias em 10min',
        'Pico passa: 20 → 6 instâncias em 1 hora',
        'Custo extra: apenas $50 nas 24h de pico'
      ],
      impact: 'Elasticidade: infraestrutura acompanha demanda real. ROI 5x melhor.'
    }
  },

  'iam-role': {
    id: 'iam-role',
    title: 'IAM Role',
    step: 14,
    totalSteps: 18,
    prevStepId: 'iam',
    nextStepId: 'security-groups',
    awsDocsUrl: 'https://docs.aws.amazon.com/iam/latest/UserGuide/id_roles.html',
    whatIs: {
      description: 'Conjunto de permissões que serviços AWS podem assumir temporariamente. Credenciais rotacionadas automaticamente.',
      examples: [
        'EC2 assume role para acessar S3',
        'Lambda assume role para escrever em DynamoDB',
        'Evita hardcoded credentials no código',
        'Credenciais temporárias (15min - 12h)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Segurança',
      position: 'Anexado a recursos (EC2, Lambda, ECS). Permite acesso cross-service sem passwords.',
      flow: 'EC2 com Role → AWS SDK usa credenciais temporárias → Acessa S3'
    },
    whyExists: [
      'Credenciais no código são inseguras (commits vazados)',
      'Rotação manual de passwords é trabalhosa',
      'Roles usam credenciais temporárias auto-renovadas',
      'Princípio do menor privilégio por serviço'
    ],
    realCase: {
      scenario: 'Aplicação EC2 precisa ler/escrever em bucket S3.',
      actions: [
        'Cria IAM Role "ec2-s3-access" com policy S3:GetObject, S3:PutObject',
        'Anexa role ao EC2 (instance profile)',
        'Código usa AWS SDK sem configurar credentials',
        'SDK automaticamente usa credenciais da role',
        'Credenciais temporárias renovadas a cada hora'
      ],
      impact: 'Zero credenciais hardcoded. Auditoria via CloudTrail. Segurança 10x melhor.'
    }
  },

  'public-subnet': {
    id: 'public-subnet',
    title: 'Public Subnet',
    step: 7,
    totalSteps: 18,
    prevStepId: 'vpc',
    nextStepId: 'private-subnet',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html',
    whatIs: {
      description: 'Subnet com rota para Internet Gateway. Recursos aqui podem ter IPs públicos e aceitar tráfego direto da internet.',
      examples: [
        'Application Load Balancer (ALB)',
        'NAT Gateway',
        'Bastion Host (jump server)',
        'CIDR exemplo: 10.0.1.0/24'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede - Zona Pública',
      position: 'Primeira camada dentro da VPC. Exposta à internet via Internet Gateway.',
      flow: 'Internet → Internet Gateway → Public Subnet → ALB/NAT'
    },
    whyExists: [
      'Load balancers precisam aceitar conexões da internet',
      'NAT Gateway permite que private subnets acessem internet',
      'Separação de responsabilidades: apenas recursos públicos aqui',
      'Reduz superfície de ataque (menos recursos expostos)'
    ],
    realCase: {
      scenario: 'Arquitetura web com ALB na public subnet.',
      actions: [
        'ALB recebe tráfego HTTPS da internet (porta 443)',
        'Tem IP público e Elastic IP',
        'Roteia requisições para EC2 em private subnet',
        'EC2 nunca exposto diretamente à internet'
      ],
      impact: 'Segurança: backend protegido por camada de load balancer público.'
    }
  },

  'private-subnet': {
    id: 'private-subnet',
    title: 'Private Subnet',
    step: 8,
    totalSteps: 18,
    prevStepId: 'public-subnet',
    nextStepId: 'auto-scaling',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html',
    whatIs: {
      description: 'Subnet sem acesso direto à internet. Pode acessar internet via NAT Gateway, mas não recebe conexões de entrada.',
      examples: [
        'Instâncias EC2 de aplicação',
        'Workers de processamento',
        'Lambda functions em VPC',
        'CIDR exemplo: 10.0.10.0/24'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede - Zona Privada',
      position: 'Camada intermediária. Recebe tráfego do ALB, pode iniciar conexões para internet via NAT.',
      flow: 'ALB → Private Subnet → EC2 → NAT Gateway → Internet'
    },
    whyExists: [
      'Backend não precisa ser acessível da internet',
      'Reduz superfície de ataque (principle of least exposure)',
      'Permite atualizações de software (via NAT)',
      'Isolamento: mesmo se VPC for comprometida, private subnet tem controle extra'
    ],
    realCase: {
      scenario: 'API REST em EC2 que precisa chamar APIs externas mas não ser acessada diretamente.',
      actions: [
        'EC2 em private subnet (sem IP público)',
        'ALB em public subnet roteia requisições para EC2',
        'EC2 faz chamada para API externa (ex: payment gateway)',
        'Tráfego sai via NAT Gateway na public subnet',
        'Internet não consegue iniciar conexão com EC2'
      ],
      impact: 'Segurança máxima: zero exposição direta à internet. Compliance PCI-DSS.'
    }
  },

  'isolated-subnet': {
    id: 'isolated-subnet',
    title: 'Isolated Subnet',
    step: 18,
    totalSteps: 18,
    prevStepId: 'sqs',
    nextStepId: 'rds',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html',
    whatIs: {
      description: 'Subnet completamente isolada. Sem rota para internet (nem via NAT). Apenas comunicação interna na VPC.',
      examples: [
        'Amazon RDS (bancos de dados)',
        'ElastiCache (Redis/Memcached)',
        'Recursos ultra-sensíveis',
        'CIDR exemplo: 10.0.20.0/24'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede - Zona Isolada',
      position: 'Camada mais protegida. Zero acesso à internet (entrada ou saída).',
      flow: 'EC2 (Private) → Isolated Subnet → RDS (apenas tráfego interno)'
    },
    whyExists: [
      'Dados sensíveis não devem sair da VPC',
      'Compliance: PCI-DSS, HIPAA exigem isolamento de dados',
      'Proteção contra exfiltração de dados',
      'Arquitetura zero-trust: camadas de defesa'
    ],
    realCase: {
      scenario: 'Banco de dados PostgreSQL com dados de cartões de crédito.',
      actions: [
        'RDS em isolated subnet (sem rota para internet)',
        'Apenas EC2 em private subnet pode conectar',
        'Security Group: aceita apenas porta 5432 de app-sg',
        'Mesmo se atacante comprometer EC2, não consegue exfiltrar dados via internet',
        'Backups: via AWS Backup (conexão privada AWS)'
      ],
      impact: 'Compliance PCI-DSS Level 1. Dados nunca saem da AWS backbone.'
    }
  }
};
