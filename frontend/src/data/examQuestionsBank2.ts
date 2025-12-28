// AWS SAA-C03 Exam Questions Bank - Part 2 (Questions 101-200)
// Domain Distribution: 30% Resilient, 28% Performance, 24% Secure, 18% Cost

import { ExamQuestion } from './examQuestionsBank1';

export const examQuestionsBank2: ExamQuestion[] = [
  // Questions 101-110: Advanced Networking and Edge Services
  {
    id: 101,
    question: "Uma aplicação precisa de aceleração global de tráfego TCP/UDP com failover automático entre regiões. Qual serviço usar?",
    options: [
      "Amazon CloudFront",
      "AWS Global Accelerator",
      "Route 53 Latency routing",
      "Elastic Load Balancer"
    ],
    correctAnswer: 1,
    explanation: "Global Accelerator fornece dois IPs Anycast estáticos que roteiam tráfego para endpoints em múltiplas regiões via rede global AWS. Health checks automáticos com failover. CloudFront é para HTTP/S (cache), não TCP/UDP genérico.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 102,
    question: "Uma aplicação usa CloudFront. Como invalidar cache de objetos específicos após atualização no S3?",
    options: [
      "Esperar cache expirar naturalmente (TTL)",
      "Criar CloudFront Invalidation",
      "Deletar e recriar distribuição",
      "Usar versioning nos nomes de arquivos"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Invalidation força remoção de objetos do cache de edge locations. Pode especificar paths específicos ou wildcards. Primeiras 1000 invalidations/mês são grátis. Alternativa: versioning de arquivos (ex: style_v2.css) evita invalidação.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 103,
    question: "Uma aplicação precisa proteger origem (EC2/ALB) garantindo que tráfego venha apenas do CloudFront. Como implementar?",
    options: [
      "Security Group permitindo apenas IPs do CloudFront",
      "CloudFront Origin Custom Headers validados pela aplicação",
      "WAF no ALB",
      "Tornar ALB privado"
    ],
    correctAnswer: 1,
    explanation: "Custom Headers no CloudFront (secret header) validados pela origem garantem que requests diretos sejam rejeitados. Security Group com IPs CloudFront funcionaria mas IPs mudam. Para ALB, pode usar AWS WAF também. Para S3, usar OAC/OAI.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 104,
    question: "Uma aplicação usa Route 53. Como rotear tráfego para endpoints baseado em geolocalização do usuário?",
    options: [
      "Latency routing",
      "Geolocation routing",
      "Geoproximity routing",
      "Failover routing"
    ],
    correctAnswer: 1,
    explanation: "Geolocation routing roteia baseado em localização geográfica do usuário (continente, país, estado). Útil para compliance regional ou content localizado. Geoproximity usa bias para shift tráfego. Latency roteia para endpoint com menor latência (não localização).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 105,
    question: "Uma aplicação precisa executar código JavaScript no edge (CloudFront) para personalizar conteúdo por usuário. Qual serviço usar?",
    options: [
      "Lambda@Edge",
      "CloudFront Functions",
      "API Gateway",
      "Lambda regular"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Functions executa JavaScript leve no edge com latência sub-millisecond. Ideal para manipulação simples (headers, redirects, URL rewrites). Lambda@Edge para lógica complexa (Node.js/Python, acesso network). Functions é mais rápido e barato para casos simples.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 106,
    question: "Uma aplicação web está sofrendo ataques de bots que consomem recursos. Como mitigar sem impactar usuários legítimos?",
    options: [
      "Bloquear todos IPs suspeitos manualmente",
      "Usar AWS WAF com managed rule group para bot control",
      "Reduzir capacidade do servidor",
      "Usar CloudFront com cache agressivo"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF Bot Control managed rule group identifica e bloqueia bots maliciosos usando machine learning, permitindo bots legítimos (search engines). Challenge de verificação para bots suspeitos. Rate limiting também ajuda mas Bot Control é mais sofisticado.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 107,
    question: "Uma aplicação usa múltiplos ALBs em regiões diferentes. Como fornecer um único endpoint DNS global com failover?",
    options: [
      "Usar Route 53 health checks com failover routing",
      "Usar Global Accelerator",
      "Usar CloudFront",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Tanto Route 53 failover routing quanto Global Accelerator resolvem. Route 53: DNS-based com health checks (failover em minutos). Global Accelerator: IPs Anycast estáticos, network-layer failover (segundos), melhor performance. Ambas soluções válidas com trade-offs.",
    domain: 'resilient',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 108,
    question: "Uma aplicação CloudFront precisa servir conteúdo diferente baseado no tipo de dispositivo (mobile/desktop). Como implementar?",
    options: [
      "Criar distribuições CloudFront separadas",
      "Configurar CloudFront para forward Device Type headers para origem",
      "Detectar no cliente com JavaScript",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "CloudFront pode detectar tipo de dispositivo (CloudFront-Is-Mobile-Viewer, etc.) e forward para origem. Origem serve conteúdo apropriado. CloudFront pode cachear versões diferentes por device type. Alternativa: CloudFront Functions para lógica no edge.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 109,
    question: "Uma aplicação precisa distribuir conteúdo apenas para usuários em países específicos (compliance). Como restringir geograficamente?",
    options: [
      "CloudFront Geographic Restrictions (Geo-blocking)",
      "WAF IP set por país",
      "Route 53 Geolocation routing",
      "Security Groups por região"
    ],
    correctAnswer: 0,
    explanation: "CloudFront Geo Restrictions (whitelist ou blacklist de países) bloqueia/permite países usando geolocalização de IP. WAF também pode mas CloudFront Geo Restrictions é built-in e mais simples para caso de uso de compliance geográfico.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 110,
    question: "Uma aplicação precisa rotear tráfego baseado em peso (75% para versão nova, 25% para versão antiga) para testes A/B. Qual routing do Route 53 usar?",
    options: [
      "Simple routing",
      "Weighted routing",
      "Latency routing",
      "Failover routing"
    ],
    correctAnswer: 1,
    explanation: "Weighted routing distribui tráfego entre múltiplos recursos baseado em pesos relativos. Perfeito para A/B testing, blue/green deployments graduais e migrações de versão. 75/25 configurado via registros DNS com weights.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  // Questions 111-120: Migration and Hybrid Architecture
  {
    id: 111,
    question: "Uma empresa quer estender datacenter on-premises para AWS para capacidade adicional temporária. Qual arquitetura?",
    options: [
      "Migração completa para AWS",
      "Hybrid Cloud com AWS Outposts",
      "VPN ou Direct Connect com workloads compartilhados",
      "Usar apenas on-premises"
    ],
    correctAnswer: 2,
    explanation: "Hybrid cloud via VPN/Direct Connect permite burst to cloud - usa AWS para capacidade adicional mantendo core on-premises. Outposts traz infraestrutura AWS on-premises. Para capacidade temporária (cloud bursting), conectividade híbrida é ideal.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 112,
    question: "Uma aplicação legada on-premises usa storage NFS. Como estender para AWS com acesso de baixa latência?",
    options: [
      "AWS Storage Gateway - File Gateway",
      "Migrar tudo para EFS",
      "AWS DataSync",
      "S3"
    ],
    correctAnswer: 0,
    explanation: "File Gateway apresenta interface NFS/SMB local com storage no S3. Cache local para baixa latência em arquivos frequentes. Transparente para aplicações (mount point NFS padrão). DataSync é para migração/sync, não acesso contínuo.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 113,
    question: "Uma empresa quer migrar VMware workloads para AWS mantendo ferramentas VMware existentes. Qual solução?",
    options: [
      "Migrar VMs para EC2",
      "AWS VMware Cloud on AWS",
      "Reescrever aplicações para serverless",
      "Usar containers"
    ],
    correctAnswer: 1,
    explanation: "VMware Cloud on AWS fornece VMware infrastructure gerenciada na AWS. Usa mesmas ferramentas VMware (vSphere, vCenter, NSX). Permite migração lift-and-shift de VMs sem refatoração. Integra com serviços AWS nativos.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 114,
    question: "Uma aplicação on-premises precisa backup para AWS com recuperação rápida. Qual serviço?",
    options: [
      "AWS Storage Gateway - Tape Gateway",
      "AWS Storage Gateway - Volume Gateway",
      "AWS Backup",
      "S3 uploads diretos"
    ],
    correctAnswer: 1,
    explanation: "Volume Gateway fornece volumes iSCSI backed por S3 com snapshots EBS. Stored mode: dados primários on-premises, backup assíncrono para AWS. Cached mode: dados primários em S3, cache local. Permite restore rápido via EBS snapshot.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 115,
    question: "Uma aplicação usa Active Directory on-premises. Como estender AD para AWS para autenticação de EC2?",
    options: [
      "Criar novo AD na AWS",
      "AWS Directory Service - AD Connector",
      "Cognito",
      "IAM"
    ],
    correctAnswer: 1,
    explanation: "AD Connector é proxy que redireciona requests de autenticação para AD on-premises via VPN/Direct Connect. Não replica dados. Permite EC2 domain join e SSO com credenciais corporativas. AWS Managed Microsoft AD replica AD na AWS (opção mais isolada).",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 116,
    question: "Uma migração de banco de dados Oracle on-premises para RDS precisa conversão de schema. Qual ferramenta usar?",
    options: [
      "AWS DMS apenas",
      "AWS Schema Conversion Tool (SCT) + DMS",
      "Dump e restore manual",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    explanation: "SCT converte database schema (stored procedures, views) de um engine para outro (ex: Oracle → PostgreSQL). DMS migra dados. Para migrações heterogêneas (engines diferentes), SCT + DMS é padrão. DMS sozinho para migrações homogêneas (Oracle → Oracle).",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 117,
    question: "Uma aplicação on-premises acessa S3 frequentemente mas link internet é lento. Como melhorar throughput?",
    options: [
      "Usar S3 Transfer Acceleration",
      "AWS Direct Connect",
      "Multipart Upload",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "S3 Transfer Acceleration usa edge locations CloudFront para acelerar uploads de longa distância. Direct Connect fornece conexão dedicada (mais bandwidth, latência consistente). Multipart Upload paraleliza uploads. Combinar estratégias maximiza throughput.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 118,
    question: "Uma aplicação precisa de consistência de baixa latência entre storage on-premises e S3. Qual gateway type usar?",
    options: [
      "File Gateway",
      "Volume Gateway - Stored mode",
      "Volume Gateway - Cached mode",
      "Tape Gateway"
    ],
    correctAnswer: 2,
    explanation: "Volume Gateway Cached mode armazena dados primários no S3 com cache local de dados frequentes. Baixa latência para hot data, storage infinito no S3. Stored mode: primário local (latência mais baixa mas capacidade limitada). File Gateway é NFS/SMB.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 119,
    question: "Uma empresa quer infraestrutura AWS on-premises para baixa latência e data residency. Qual serviço?",
    options: [
      "AWS Local Zones",
      "AWS Outposts",
      "AWS Wavelength",
      "Direct Connect"
    ],
    correctAnswer: 1,
    explanation: "Outposts traz racks AWS fisicamente on-premises com mesmas APIs AWS. Para data residency e latência sub-millisecond. Local Zones são extensions AWS em cidades. Wavelength em redes 5G. Direct Connect é conectividade, não infrastructure local.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 120,
    question: "Uma migração de aplicação precisa replicação inicial de 50TB e depois replicação contínua de mudanças. Qual solução?",
    options: [
      "AWS DMS com replicação contínua",
      "AWS DataSync inicial + DMS contínuo",
      "AWS Snowball + DMS",
      "Upload direto"
    ],
    correctAnswer: 2,
    explanation: "Snowball para carga inicial (50TB) mais rápido que internet. Após Snowball, DMS para CDC (Change Data Capture) contínuo. Combina speed de Snowball com sincronização contínua de DMS. DataSync é para file systems, não bancos de dados.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  // Questions 121-130
  {
    id: 121,
    question: "Uma aplicação usa Aurora MySQL. Como criar cópia de banco para desenvolvimento sem impactar produção?",
    options: [
      "Criar snapshot e restaurar",
      "Usar Aurora Cloning",
      "Dump manual",
      "DMS"
    ],
    correctAnswer: 1,
    explanation: "Aurora Cloning usa copy-on-write para criar clone em minutos sem impacto em produção. Clone inicial não duplica dados (usa pointers). Mudanças após clone são armazenadas separadamente. Muito mais rápido que snapshot/restore.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 122,
    question: "Uma aplicação usa Auto Scaling. Durante scale-out, novas instâncias demoram para estar prontas. Como aquecer instâncias mais rápido?",
    options: [
      "Aumentar desired capacity permanentemente",
      "Usar AMI customizada com aplicação pré-instalada",
      "Desabilitar health checks",
      "Usar Spot Instances"
    ],
    correctAnswer: 1,
    explanation: "AMI customizada com aplicação, dependências e configurações pré-instaladas reduz drasticamente tempo de bootstrap. Golden AMI approach. Lifecycle hooks também ajudam para warmup antes de receber tráfego.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 123,
    question: "Uma aplicação precisa processar imagens enviadas por usuários. Como arquitetura serverless para resize automático?",
    options: [
      "EC2 com polling do S3",
      "S3 event → Lambda para resize → salvar no S3",
      "ECS Task agendado",
      "CloudFront resize on-the-fly"
    ],
    correctAnswer: 1,
    explanation: "S3 Event Notification invoca Lambda automaticamente quando imagem é uploaded. Lambda processa (resize) e salva resultado no S3. Totalmente serverless, escala automaticamente, paga por uso.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 124,
    question: "Uma aplicação RDS está com storage cheio. Como aumentar storage sem downtime?",
    options: [
      "Criar snapshot, restaurar com storage maior",
      "RDS permite aumentar storage online sem downtime",
      "Migrar para instância maior",
      "Não é possível sem downtime"
    ],
    correctAnswer: 1,
    explanation: "RDS permite modificar storage online. Processo acontece durante janela de manutenção mas sem downtime. Storage Autoscaling pode fazer isso automaticamente quando threshold é atingido.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 125,
    question: "Uma aplicação precisa enviar emails transacionais. Qual serviço AWS usar?",
    options: [
      "SNS",
      "SES (Simple Email Service)",
      "SQS",
      "Lambda com SMTP externo"
    ],
    correctAnswer: 1,
    explanation: "SES é serviço gerenciado para envio de emails (transacionais e marketing). Alta deliverability, custo baixo, APIs simples. SNS é pub/sub notifications. SQS é message queue.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 126,
    question: "Uma aplicação DynamoDB tem hot partition com muito tráfego. Como resolver?",
    options: [
      "Aumentar RCU/WCU",
      "Redesenhar partition key para distribuir melhor",
      "Usar cache com ElastiCache",
      "B e C"
    ],
    correctAnswer: 3,
    explanation: "Hot partition causa throttling. Soluções: (1) Redesenhar partition key para distribuir uniformemente (ex: adicionar suffix aleatório). (2) Cache para reduzir reads na hot partition. Apenas aumentar capacity não resolve distribuição desigual.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 127,
    question: "Uma aplicação precisa executar batch jobs mensalmente. Como minimizar custos?",
    options: [
      "EC2 On-Demand 24/7",
      "Lambda agendado",
      "EC2 Spot com AWS Batch agendado",
      "Fargate 24/7"
    ],
    correctAnswer: 2,
    explanation: "Batch jobs mensais se beneficiam de Spot (até 90% desconto). AWS Batch gerencia provisionamento e scheduling. Lambda tem limite de 15min. Manter EC2/Fargate rodando 24/7 para job mensal é desperdício.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 128,
    question: "Uma aplicação precisa garantir que mensagens SQS sejam processadas exatamente uma vez. Como configurar?",
    options: [
      "Usar SQS Standard",
      "Usar SQS FIFO com deduplicação",
      "Implementar idempotência na aplicação",
      "B e C"
    ],
    correctAnswer: 3,
    explanation: "SQS FIFO com content-based deduplication previne duplicatas durante 5 minutos. Mas para garantia absoluta, aplicação deve ser idempotente (processar mesma mensagem múltiplas vezes sem efeito colateral). Defense in depth.",
    domain: 'resilient',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 129,
    question: "Uma aplicação usa múltiplos microservices. Como descobrir dependências e latência entre serviços?",
    options: [
      "Logs do CloudWatch",
      "AWS X-Ray service map",
      "CloudTrail",
      "Documentação manual"
    ],
    correctAnswer: 1,
    explanation: "X-Ray service map visualiza automaticamente dependências entre serviços, latência de cada hop, taxa de erro. Identifica gargalos e problemas. Requer instrumentação (SDK) nos serviços.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 130,
    question: "Uma aplicação web está lenta devido a queries complexas no RDS. Como adicionar cache sem modificar aplicação?",
    options: [
      "ElastiCache com cache-aside pattern (requer modificação)",
      "RDS Proxy com query caching",
      "DynamoDB Accelerator (DAX)",
      "Não é possível sem modificar aplicação"
    ],
    correctAnswer: 3,
    explanation: "Cache geralmente requer modificação de aplicação (cache-aside pattern). RDS Proxy faz connection pooling mas não query caching. Read replicas ajudam mas requerem mudança de connection string. Para cache transparente, modificação é necessária.",
    domain: 'performance',
    difficulty: 'hard'
  },
  // Questions 131-200
  {
    id: 131,
    question: "Uma aplicação usa SNS para notificações. Como garantir que mensagens não sejam perdidas se subscriber falhar?",
    options: [
      "SNS garante entrega automaticamente",
      "Configurar Dead Letter Queue (DLQ) no SNS subscription",
      "Aumentar retries",
      "Usar SQS ao invés"
    ],
    correctAnswer: 1,
    explanation: "SNS subscription pode ter DLQ (SQS) para mensagens que falharam após retries. Preserva mensagens para processamento posterior. SNS com SQS subscription (fan-out pattern) oferece durabilidade adicional.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 132,
    question: "Uma aplicação precisa executar workloads GPU-intensive para machine learning. Qual tipo de instância EC2?",
    options: [
      "T3 (General Purpose)",
      "C5 (Compute Optimized)",
      "P4/P3 (Accelerated Computing com GPU)",
      "R5 (Memory Optimized)"
    ],
    correctAnswer: 2,
    explanation: "Instâncias P4, P3, G5 incluem GPUs NVIDIA para ML, deep learning, rendering. P4d tem 8 GPUs A100. T3/C5/R5 são CPU-only. Inf1 tem AWS Inferentia chips para inferência otimizada.",
    domain: 'performance',
    difficulty: 'easy'
  }
];
