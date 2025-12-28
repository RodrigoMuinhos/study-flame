import { TrainingQuestion } from '../types/training';

// Questões do Cloud Practitioner (CLF-C02) organizadas por tópico
export const practitionerQuestions: Record<string, TrainingQuestion[]> = {
  'cloud-concepts': [
    {
      id: 1,
      topic: 'cloud-concepts',
      question: 'Qual é uma das principais vantagens da computação em nuvem AWS?',
      context: 'Empresa comparando datacenter on-premises com AWS.',
      options: [
        { label: 'A', text: 'Investimento inicial alto (CAPEX) necessário' },
        { label: 'B', text: 'Trocar CAPEX fixo por OPEX variável' },
        { label: 'C', text: 'Comprar hardware próprio' },
        { label: 'D', text: 'Manter equipe grande de infraestrutura' }
      ],
      correctAnswer: 'B',
      explanation: 'Na nuvem AWS, você troca Capital Expense (CAPEX - comprar servidores) por Operational Expense (OPEX - pagar pelo que usa). Elasticidade: pague apenas recursos utilizados, escale sob demanda. Reduz custos upfront e evita overprovisioning.',
      relatedService: 'cloud-concepts'
    },
    {
      id: 2,
      topic: 'cloud-concepts',
      question: 'O que significa "Elasticidade" no contexto de cloud computing?',
      context: 'Startup com crescimento imprevisível.',
      options: [
        { label: 'A', text: 'Sistema nunca falha' },
        { label: 'B', text: 'Capacidade de escalar recursos automaticamente para cima ou para baixo conforme demanda' },
        { label: 'C', text: 'Backup automático' },
        { label: 'D', text: 'Segurança máxima' }
      ],
      correctAnswer: 'B',
      explanation: 'Elasticidade = escalar recursos dinamicamente. Tráfego aumenta? Mais instâncias. Diminui? Reduz instâncias. Auto Scaling implementa elasticidade. Diferente de escalabilidade (capacidade de crescer) - elasticidade é crescer E reduzir automaticamente.',
      relatedService: 'cloud-concepts'
    },
    {
      id: 3,
      topic: 'cloud-concepts',
      question: 'Qual modelo de deployment de nuvem oferece isolamento completo mas requer gestão total da infraestrutura?',
      context: 'Banco avaliando modelos de cloud.',
      options: [
        { label: 'A', text: 'Nuvem Pública (AWS, Azure, GCP)' },
        { label: 'B', text: 'Nuvem Privada (on-premises cloud)' },
        { label: 'C', text: 'Nuvem Híbrida' },
        { label: 'D', text: 'Multi-cloud' }
      ],
      correctAnswer: 'B',
      explanation: 'Nuvem Privada: infraestrutura dedicada apenas para uma organização, geralmente on-premises. Máximo controle e isolamento, mas você gerencia tudo (hardware, virtualization, etc). Público: AWS gerencia infraestrutura. Híbrido: combina ambos.',
      relatedService: 'cloud-concepts'
    },
    {
      id: 4,
      topic: 'cloud-concepts',
      question: 'Qual benefício da AWS permite parar de adivinhar capacidade necessária?',
      context: 'Lançamento de produto com demanda desconhecida.',
      options: [
        { label: 'A', text: 'Economia de escala' },
        { label: 'B', text: 'Elasticidade e Auto Scaling' },
        { label: 'C', text: 'Global reach' },
        { label: 'D', text: 'Segurança' }
      ],
      correctAnswer: 'B',
      explanation: 'Elasticity + Auto Scaling = não precisa adivinhar capacidade. Inicie pequeno, escale conforme necessário. Evita over/under provisioning. On-premises: comprar servidores antecipadamente = risco de desperdício ou insuficiência.',
      relatedService: 'cloud-concepts'
    }
  ],

  'aws-global-infrastructure': [
    {
      id: 1,
      topic: 'aws-global-infrastructure',
      question: 'O que é uma AWS Region?',
      context: 'Escolhendo onde hospedar aplicação.',
      options: [
        { label: 'A', text: 'Um único datacenter' },
        { label: 'B', text: 'Cluster de datacenters em área geográfica específica' },
        { label: 'C', text: 'Um servidor' },
        { label: 'D', text: 'Software de gerenciamento' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Region = cluster geográfico de datacenters (ex: us-east-1 Virgínia, sa-east-1 São Paulo). Cada região isolada fisicamente, com múltiplas Availability Zones. Escolha baseada em: latência, compliance, serviços disponíveis.',
      relatedService: 'aws-global-infrastructure'
    },
    {
      id: 2,
      topic: 'aws-global-infrastructure',
      question: 'O que é uma Availability Zone (AZ)?',
      context: 'Projetando aplicação altamente disponível.',
      options: [
        { label: 'A', text: 'Um datacenter isolado dentro de uma região' },
        { label: 'B', text: 'Uma região AWS' },
        { label: 'C', text: 'Um edge location' },
        { label: 'D', text: 'Um tipo de instância' }
      ],
      correctAnswer: 'A',
      explanation: 'Availability Zone = um ou mais datacenters discretos com redundância de energia, rede, conectividade. Múltiplas AZs em cada região (mínimo 3), fisicamente separadas mas conectadas com baixa latência. Alta disponibilidade: distribuir recursos em múltiplas AZs.',
      relatedService: 'aws-global-infrastructure'
    },
    {
      id: 3,
      topic: 'aws-global-infrastructure',
      question: 'O que são Edge Locations?',
      context: 'Servindo conteúdo globalmente com baixa latência.',
      options: [
        { label: 'A', text: 'Regiões AWS' },
        { label: 'B', text: 'Pontos de presença para cache de conteúdo (CloudFront, Route 53)' },
        { label: 'C', text: 'Availability Zones' },
        { label: 'D', text: 'Datacenters principais' }
      ],
      correctAnswer: 'B',
      explanation: 'Edge Locations: pontos de presença globais (200+) onde CloudFront cacheia conteúdo próximo aos usuários. Também usados por Route 53. Não são regiões full AWS, mas CDN endpoints. Reduzem latência para usuários finais.',
      relatedService: 'aws-global-infrastructure'
    },
    {
      id: 4,
      topic: 'aws-global-infrastructure',
      question: 'Quantas Availability Zones mínimas uma região AWS tem?',
      context: 'Planejando alta disponibilidade.',
      options: [
        { label: 'A', text: '1' },
        { label: 'B', text: '2' },
        { label: 'C', text: '3' },
        { label: 'D', text: '5' }
      ],
      correctAnswer: 'C',
      explanation: 'Cada região AWS tem mínimo 3 AZs, geralmente mais. Distribuir recursos em pelo menos 2 AZs para alta disponibilidade. Se uma AZ falhar, outra continua operando.',
      relatedService: 'aws-global-infrastructure'
    }
  ],

  'shared-responsibility': [
    {
      id: 1,
      topic: 'shared-responsibility',
      question: 'No Modelo de Responsabilidade Compartilhada, quem é responsável pela segurança DA nuvem (infraestrutura física)?',
      context: 'Definindo responsabilidades de segurança.',
      options: [
        { label: 'A', text: 'Cliente' },
        { label: 'B', text: 'AWS' },
        { label: 'C', text: 'Ambos' },
        { label: 'D', text: 'Terceiros' }
      ],
      correctAnswer: 'B',
      explanation: 'Segurança DA nuvem (OF the cloud) = AWS. AWS protege infraestrutura física (datacenters, rede, hardware, software host). Segurança NA nuvem (IN the cloud) = cliente (dados, IAM, SO guest, aplicações, firewalls).',
      relatedService: 'shared-responsibility'
    },
    {
      id: 2,
      topic: 'shared-responsibility',
      question: 'Quem é responsável por aplicar patches no sistema operacional de uma instância EC2?',
      context: 'Gerenciando segurança EC2.',
      options: [
        { label: 'A', text: 'AWS automaticamente' },
        { label: 'B', text: 'Cliente (você)' },
        { label: 'C', text: 'Terceiros' },
        { label: 'D', text: 'Não é necessário' }
      ],
      correctAnswer: 'B',
      explanation: 'EC2 = IaaS. Cliente gerencia guest OS, patches, security updates, aplicações. AWS gerencia hypervisor e infraestrutura física. Para serviços gerenciados (RDS, Lambda), AWS faz patches automaticamente.',
      relatedService: 'shared-responsibility'
    },
    {
      id: 3,
      topic: 'shared-responsibility',
      question: 'Para Amazon S3, quem é responsável pela criptografia dos dados?',
      context: 'Protegendo arquivos no S3.',
      options: [
        { label: 'A', text: 'Apenas AWS' },
        { label: 'B', text: 'Cliente escolhe ativar criptografia (client-side ou server-side)' },
        { label: 'C', text: 'Criptografia não disponível' },
        { label: 'D', text: 'Automático sempre' }
      ],
      correctAnswer: 'B',
      explanation: 'Cliente decide se quer criptografia: server-side (SSE-S3, SSE-KMS, SSE-C) ou client-side. AWS fornece ferramentas, cliente configura. Default: S3 agora criptografa automaticamente com SSE-S3, mas cliente pode escolher outros métodos.',
      relatedService: 'shared-responsibility'
    }
  ],

  'security-compliance': [
    {
      id: 1,
      topic: 'security-compliance',
      question: 'O que é AWS IAM (Identity and Access Management)?',
      context: 'Controlando acesso a recursos AWS.',
      options: [
        { label: 'A', text: 'Serviço de backup' },
        { label: 'B', text: 'Serviço para gerenciar usuários, permissões e acesso a recursos AWS' },
        { label: 'C', text: 'Firewall' },
        { label: 'D', text: 'Monitoramento' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM gerencia identidades (users, groups, roles) e suas permissões (policies) para acessar recursos AWS. Princípio do menor privilégio. Sem custo adicional. Root user = evite usar, crie IAM users.',
      relatedService: 'security-compliance'
    },
    {
      id: 2,
      topic: 'security-compliance',
      question: 'O que é MFA (Multi-Factor Authentication) e por que usar?',
      context: 'Protegendo contas AWS.',
      options: [
        { label: 'A', text: 'Apenas senha' },
        { label: 'B', text: 'Autenticação com senha + dispositivo/token adicional' },
        { label: 'C', text: 'Apenas biometria' },
        { label: 'D', text: 'Backup de senha' }
      ],
      correctAnswer: 'B',
      explanation: 'MFA = senha (algo que você sabe) + código de dispositivo/app (algo que você tem). Camada adicional de segurança. Recomendado para root account e contas privilegiadas. Tipos: virtual MFA app, U2F security key, hardware key fob.',
      relatedService: 'security-compliance'
    },
    {
      id: 3,
      topic: 'security-compliance',
      question: 'O que é AWS Artifact?',
      context: 'Obtendo relatórios de conformidade.',
      options: [
        { label: 'A', text: 'Serviço de backup' },
        { label: 'B', text: 'Portal para acessar relatórios de conformidade e certificações AWS' },
        { label: 'C', text: 'Ferramenta de deploy' },
        { label: 'D', text: 'Serviço de IA' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Artifact: portal self-service para baixar relatórios de auditoria de segurança/conformidade (SOC, PCI, ISO, HIPAA). Útil para compliance. Acesso sob demanda, sem custo.',
      relatedService: 'security-compliance'
    }
  ],

  'compute-services': [
    {
      id: 1,
      topic: 'compute-services',
      question: 'Qual serviço AWS fornece servidores virtuais escaláveis?',
      context: 'Hospedando aplicação web.',
      options: [
        { label: 'A', text: 'Amazon S3' },
        { label: 'B', text: 'Amazon EC2 (Elastic Compute Cloud)' },
        { label: 'C', text: 'Amazon RDS' },
        { label: 'D', text: 'Amazon VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'EC2 = Elastic Compute Cloud. Servidores virtuais (instâncias) on-demand. Variedade de tipos (t2, m5, c5, etc) para diferentes workloads. Controle completo sobre OS. Pay-as-you-go ou Reserved/Spot para economia.',
      relatedService: 'compute-services'
    },
    {
      id: 2,
      topic: 'compute-services',
      question: 'O que é AWS Lambda?',
      context: 'Executando código sem gerenciar servidores.',
      options: [
        { label: 'A', text: 'Serviço de banco de dados' },
        { label: 'B', text: 'Computação serverless: executa código em resposta a eventos sem gerenciar servidores' },
        { label: 'C', text: 'Serviço de storage' },
        { label: 'D', text: 'Serviço de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda = serverless compute. Você escreve código (function), AWS executa automaticamente quando triggado (S3 upload, API call, schedule). Paga apenas por tempo de execução (ms). Escala automaticamente. Sem gestão de servidores.',
      relatedService: 'compute-services'
    },
    {
      id: 3,
      topic: 'compute-services',
      question: 'Qual serviço AWS facilita deploy de aplicações web sem gerenciar infraestrutura subjacente?',
      context: 'Desenvolvedor quer focar em código, não infra.',
      options: [
        { label: 'A', text: 'Amazon EC2' },
        { label: 'B', text: 'AWS Elastic Beanstalk' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'AWS Direct Connect' }
      ],
      correctAnswer: 'B',
      explanation: 'Elastic Beanstalk = PaaS (Platform as a Service). Upload código, Beanstalk provisiona automaticamente EC2, load balancer, auto scaling, monitoring. Gerencia infra, você controla aplicação. Suporta Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker.',
      relatedService: 'compute-services'
    }
  ],

  'storage-services': [
    {
      id: 1,
      topic: 'storage-services',
      question: 'O que é Amazon S3 (Simple Storage Service)?',
      context: 'Armazenando arquivos na nuvem.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'Armazenamento de objetos escalável para qualquer tipo de dado' },
        { label: 'C', text: 'Serviço de computação' },
        { label: 'D', text: 'Firewall' }
      ],
      correctAnswer: 'B',
      explanation: 'S3 = object storage. Armazena arquivos (objetos) em buckets. Durabilidade 11 9s (99.999999999%). Casos de uso: backup, data lake, website estático, arquivos de mídia. Storage classes para otimizar custo (Standard, IA, Glacier).',
      relatedService: 'storage-services'
    },
    {
      id: 2,
      topic: 'storage-services',
      question: 'Qual serviço AWS fornece armazenamento de blocos para EC2?',
      context: 'Adicionando disco persistente a EC2.',
      options: [
        { label: 'A', text: 'Amazon S3' },
        { label: 'B', text: 'Amazon EBS (Elastic Block Store)' },
        { label: 'C', text: 'Amazon Glacier' },
        { label: 'D', text: 'Amazon CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'EBS = block storage para EC2. Volumes persistentes anexados a instâncias (como HD/SSD). Tipos: gp3 (SSD geral), io2 (SSD alta performance), st1 (HDD throughput), sc1 (HDD frio). Snapshots para backup.',
      relatedService: 'storage-services'
    },
    {
      id: 3,
      topic: 'storage-services',
      question: 'Qual storage class do S3 é mais barato para arquivamento de longo prazo com acesso raro?',
      context: 'Arquivando logs antigos.',
      options: [
        { label: 'A', text: 'S3 Standard' },
        { label: 'B', text: 'S3 Intelligent-Tiering' },
        { label: 'C', text: 'S3 Glacier / Glacier Deep Archive' },
        { label: 'D', text: 'S3 One Zone-IA' }
      ],
      correctAnswer: 'C',
      explanation: 'S3 Glacier: arquivamento de longo prazo, acesso infrequente, muito barato. Retrieval em minutos a horas. Glacier Deep Archive: ainda mais barato, retrieval em 12h. Standard: acesso frequente, mais caro. Use lifecycle policies para mover dados automaticamente.',
      relatedService: 'storage-services'
    }
  ],

  'database-services': [
    {
      id: 1,
      topic: 'database-services',
      question: 'O que é Amazon RDS (Relational Database Service)?',
      context: 'Banco de dados gerenciado.',
      options: [
        { label: 'A', text: 'NoSQL database' },
        { label: 'B', text: 'Serviço gerenciado de bancos de dados relacionais (MySQL, PostgreSQL, Oracle, SQL Server, MariaDB)' },
        { label: 'C', text: 'Object storage' },
        { label: 'D', text: 'Data warehouse' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS = managed relational database. AWS gerencia: backups, patches, alta disponibilidade (Multi-AZ), read replicas. Você gerencia: queries, schema, otimizações. Engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora.',
      relatedService: 'database-services'
    },
    {
      id: 2,
      topic: 'database-services',
      question: 'O que é Amazon DynamoDB?',
      context: 'Banco NoSQL serverless.',
      options: [
        { label: 'A', text: 'Banco relacional' },
        { label: 'B', text: 'Banco de dados NoSQL totalmente gerenciado (key-value, document)' },
        { label: 'C', text: 'Data warehouse' },
        { label: 'D', text: 'Cache' }
      ],
      correctAnswer: 'B',
      explanation: 'DynamoDB = NoSQL serverless. Key-value e document database. Latência single-digit milissegundos, escala automática, alta disponibilidade built-in. Casos de uso: mobile, web, gaming, IoT. Alternativa a MongoDB gerenciado.',
      relatedService: 'database-services'
    },
    {
      id: 3,
      topic: 'database-services',
      question: 'Qual serviço AWS é otimizado para análise de grandes volumes de dados (data warehousing)?',
      context: 'Analytics e BI.',
      options: [
        { label: 'A', text: 'Amazon RDS' },
        { label: 'B', text: 'Amazon DynamoDB' },
        { label: 'C', text: 'Amazon Redshift' },
        { label: 'D', text: 'Amazon S3' }
      ],
      correctAnswer: 'C',
      explanation: 'Redshift = data warehouse service. Otimizado para análises (OLAP), queries em petabytes de dados. Integra com ferramentas de BI (Tableau, Power BI). Columnar storage. Diferente de RDS (OLTP transacional).',
      relatedService: 'database-services'
    }
  ],

  'networking-cdn': [
    {
      id: 1,
      topic: 'networking-cdn',
      question: 'O que é Amazon VPC (Virtual Private Cloud)?',
      context: 'Isolando recursos na nuvem.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'Rede virtual isolada logicamente na AWS' },
        { label: 'C', text: 'Serviço de CDN' },
        { label: 'D', text: 'Load balancer' }
      ],
      correctAnswer: 'B',
      explanation: 'VPC = sua rede privada na AWS. Controle completo: CIDR blocks, subnets, route tables, gateways. Isola recursos, controla tráfego (Security Groups, NACLs). Cada conta tem VPC padrão, mas pode criar customizadas.',
      relatedService: 'networking-cdn'
    },
    {
      id: 2,
      topic: 'networking-cdn',
      question: 'O que é Amazon CloudFront?',
      context: 'Entregando conteúdo globalmente.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'CDN (Content Delivery Network) para entregar conteúdo com baixa latência' },
        { label: 'C', text: 'Servidor web' },
        { label: 'D', text: 'Firewall' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront = CDN da AWS. Cacheia conteúdo (estático e dinâmico) em edge locations globalmente. Reduz latência para usuários finais. Integra com S3, ALB, EC2. Útil para websites, APIs, streaming de vídeo.',
      relatedService: 'networking-cdn'
    },
    {
      id: 3,
      topic: 'networking-cdn',
      question: 'O que é Elastic Load Balancing (ELB)?',
      context: 'Distribuindo tráfego entre instâncias.',
      options: [
        { label: 'A', text: 'Serviço de backup' },
        { label: 'B', text: 'Distribui tráfego automaticamente entre múltiplos targets (EC2, containers, IPs)' },
        { label: 'C', text: 'Firewall' },
        { label: 'D', text: 'Banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'ELB distribui tráfego de entrada entre targets saudáveis em múltiplas AZs. Tipos: ALB (Layer 7, HTTP/HTTPS), NLB (Layer 4, TCP/UDP, ultra performance), GWLB (Layer 3, appliances). Aumenta disponibilidade e fault tolerance.',
      relatedService: 'networking-cdn'
    }
  ],

  'monitoring-management': [
    {
      id: 1,
      topic: 'monitoring-management',
      question: 'O que é Amazon CloudWatch?',
      context: 'Monitorando recursos AWS.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'Serviço de monitoramento e observabilidade (metrics, logs, alarms)' },
        { label: 'C', text: 'Backup service' },
        { label: 'D', text: 'CDN' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch coleta e monitora: métricas (CPU, latência), logs (application, system), events/alarms. Dashboards para visualização. Alarmes disparam ações (SNS, Auto Scaling). Essencial para observabilidade.',
      relatedService: 'monitoring-management'
    },
    {
      id: 2,
      topic: 'monitoring-management',
      question: 'O que é AWS CloudTrail?',
      context: 'Auditoria de ações na conta AWS.',
      options: [
        { label: 'A', text: 'Monitoramento de performance' },
        { label: 'B', text: 'Registra chamadas de API e ações em sua conta AWS (auditoria)' },
        { label: 'C', text: 'Backup service' },
        { label: 'D', text: 'CDN' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail = auditoria. Registra QUEM fez O QUE, QUANDO, de ONDE (API calls). Logs para S3. Compliance, troubleshooting, análise de segurança. Habilitado por padrão. CloudWatch = performance. CloudTrail = auditoria.',
      relatedService: 'monitoring-management'
    }
  ],

  'pricing-billing': [
    {
      id: 1,
      topic: 'pricing-billing',
      question: 'Qual modelo de precificação EC2 oferece maior desconto (até 90%) mas instâncias podem ser interrompidas pela AWS?',
      context: 'Otimizando custos para workload tolerante a falhas.',
      options: [
        { label: 'A', text: 'On-Demand' },
        { label: 'B', text: 'Reserved Instances' },
        { label: 'C', text: 'Spot Instances' },
        { label: 'D', text: 'Dedicated Hosts' }
      ],
      correctAnswer: 'C',
      explanation: 'Spot Instances: até 90% desconto vs On-Demand. AWS pode reclamar instâncias com 2 min de aviso. Ideal para: batch processing, data analysis, workloads fault-tolerant. Reserved: desconto por compromisso 1-3 anos. On-Demand: sem compromisso.',
      relatedService: 'pricing-billing'
    },
    {
      id: 2,
      topic: 'pricing-billing',
      question: 'O que são Reserved Instances?',
      context: 'Workload estável de longo prazo.',
      options: [
        { label: 'A', text: 'Instâncias temporárias' },
        { label: 'B', text: 'Compromisso de 1 ou 3 anos com desconto significativo (até 72%)' },
        { label: 'C', text: 'Instâncias que podem ser interrompidas' },
        { label: 'D', text: 'Instâncias gratuitas' }
      ],
      correctAnswer: 'B',
      explanation: 'Reserved Instances: compromisso 1 ou 3 anos, desconto até 72% vs On-Demand. Pague upfront (all, partial, no) para mais desconto. Ideal para workloads previsíveis, steady-state. Tipos: Standard RI, Convertible RI.',
      relatedService: 'pricing-billing'
    },
    {
      id: 3,
      topic: 'pricing-billing',
      question: 'O que é AWS Free Tier?',
      context: 'Testando AWS sem custo.',
      options: [
        { label: 'A', text: 'Tudo na AWS é grátis' },
        { label: 'B', text: 'Ofertas grátis de serviços AWS: Always Free, 12 Months Free, Trials' },
        { label: 'C', text: 'Apenas para empresas' },
        { label: 'D', text: 'Desconto permanente' }
      ],
      correctAnswer: 'B',
      explanation: 'Free Tier: Always Free (Lambda 1M requests/mês, DynamoDB 25GB), 12 Months Free (EC2 t2.micro 750h/mês, S3 5GB), Trials (curto prazo). Ótimo para aprender e testar. Cuidado: exceder limites gera cobranças.',
      relatedService: 'pricing-billing'
    }
  ],

  'billing-tools': [
    {
      id: 1,
      topic: 'billing-tools',
      question: 'Qual ferramenta AWS permite visualizar e analisar custos e uso ao longo do tempo?',
      context: 'Analisando gastos mensais.',
      options: [
        { label: 'A', text: 'AWS CloudTrail' },
        { label: 'B', text: 'AWS Cost Explorer' },
        { label: 'C', text: 'AWS CloudWatch' },
        { label: 'D', text: 'AWS Artifact' }
      ],
      correctAnswer: 'B',
      explanation: 'Cost Explorer: ferramenta visual para analisar custos e uso. Filtrar por serviço, região, tag. Ver tendências, previsões. Identificar picos de custo. Gratuito. Billing Dashboard mostra total, Cost Explorer detalha.',
      relatedService: 'billing-tools'
    },
    {
      id: 2,
      topic: 'billing-tools',
      question: 'O que é AWS Budgets?',
      context: 'Controlando gastos.',
      options: [
        { label: 'A', text: 'Serviço de backup' },
        { label: 'B', text: 'Define orçamentos e envia alertas quando custos/uso excedem threshold' },
        { label: 'C', text: 'Banco de dados' },
        { label: 'D', text: 'CDN' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Budgets: cria alertas de custo/uso. Ex: "alerta se custo mensal > $100". Notificações via SNS/email. Tipos: cost budgets, usage budgets, reservation budgets. Prevenção de surpresas na fatura.',
      relatedService: 'billing-tools'
    }
  ],

  'support-plans': [
    {
      id: 1,
      topic: 'support-plans',
      question: 'Qual plano de suporte AWS inclui acesso a Technical Account Manager (TAM)?',
      context: 'Empresa precisa de suporte dedicado.',
      options: [
        { label: 'A', text: 'Basic' },
        { label: 'B', text: 'Developer' },
        { label: 'C', text: 'Business' },
        { label: 'D', text: 'Enterprise' }
      ],
      correctAnswer: 'D',
      explanation: 'Enterprise Support: inclui TAM (Technical Account Manager) dedicado, arquitetura reviews, suporte 24/7, resposta < 15min para sistemas down. Business: 24/7 mas sem TAM. Developer: horário comercial. Basic: apenas billing e account.',
      relatedService: 'support-plans'
    },
    {
      id: 2,
      topic: 'support-plans',
      question: 'O que é AWS Trusted Advisor?',
      context: 'Otimizando infraestrutura AWS.',
      options: [
        { label: 'A', text: 'Serviço de backup' },
        { label: 'B', text: 'Recomendações automáticas para otimizar custos, performance, segurança, fault tolerance' },
        { label: 'C', text: 'Banco de dados' },
        { label: 'D', text: 'CDN' }
      ],
      correctAnswer: 'B',
      explanation: 'Trusted Advisor: analisa sua conta AWS e sugere melhorias em 5 categorias: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Basic/Developer: checks limitados. Business/Enterprise: todos checks.',
      relatedService: 'support-plans'
    }
  ]
};
