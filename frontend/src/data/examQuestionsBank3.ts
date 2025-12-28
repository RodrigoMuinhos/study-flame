// AWS SAA-C03 Exam Questions Bank - Part 3 (Questions 201-325)
// Domain Distribution: 30% Resilient, 28% Performance, 24% Secure, 18% Cost

import { ExamQuestion } from './examQuestionsBank1';

export const examQuestionsBank3: ExamQuestion[] = [
  // Questions 201-210
  {
    id: 201,
    question: "Uma aplicação precisa processar streaming data com análise SQL em tempo real. Qual serviço?",
    options: [
      "Kinesis Data Streams + Lambda",
      "Kinesis Data Analytics",
      "EMR",
      "Athena"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Data Analytics permite queries SQL em streaming data em tempo real. Processa dados de Kinesis Streams ou Firehose. EMR é batch processing. Athena é queries em dados estáticos no S3.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 202,
    question: "Uma empresa quer prevenir que usuários IAM criem recursos caros (EC2 instâncias grandes). Como enforçar?",
    options: [
      "AWS Budgets Alerts",
      "IAM Policy com condições negando instance types específicos",
      "AWS Config Rules",
      "Educação dos usuários"
    ],
    correctAnswer: 1,
    explanation: "IAM Policy pode usar condições para negar criação de instance types específicos (ex: negar se instance type for r5.24xlarge). Preventivo. Config detecta mas não previne. Budgets alerta mas não bloqueia.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 203,
    question: "Uma aplicação usa EventBridge para processar eventos. Como garantir eventos não sejam perdidos se target falhar?",
    options: [
      "Configurar retry policy e DLQ",
      "EventBridge garante entrega automaticamente",
      "Usar SNS",
      "Aumentar timeout"
    ],
    correctAnswer: 0,
    explanation: "EventBridge permite configurar retry policy (até 24h) e Dead Letter Queue para eventos que falharam. DLQ preserva eventos para análise e reprocessamento. Targets podem ser Lambda, SQS, SNS, etc.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 204,
    question: "Uma aplicação precisa executar containers Windows. Qual opção é válida?",
    options: [
      "ECS com Windows containers no EC2",
      "ECS Fargate não suporta Windows",
      "EKS com Windows nodes",
      "A e C"
    ],
    correctAnswer: 3,
    explanation: "ECS suporta Windows containers no EC2 (não Fargate ainda). EKS suporta Windows nodes para Windows containers. Lambda não suporta Windows. Para Windows, EC2-based solutions (ECS/EKS).",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 205,
    question: "Uma aplicação precisa acessar recursos em múltiplas contas AWS. Como centralizar autenticação?",
    options: [
      "Criar IAM users em cada conta",
      "IAM Roles com cross-account access",
      "Compartilhar root credentials",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "IAM Roles permitem cross-account access. Conta A assume role na conta B. Trust policy na conta B permite conta A. Mais seguro que duplicar users. AWS SSO (Identity Center) também facilita multi-account.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 206,
    question: "Uma aplicação serverless tem custos altos com Lambda. Análise mostra muitas invocações de cold start. Como otimizar custos?",
    options: [
      "Provisioned Concurrency (aumenta custo fixo)",
      "Reduzir frequência de invocações",
      "Aumentar memória para execução mais rápida",
      "B e C"
    ],
    correctAnswer: 3,
    explanation: "Para reduzir custos: (1) Batch processing para menos invocações. (2) Aumentar memória pode reduzir tempo de execução (paradoxalmente menor custo total GB-second). Provisioned Concurrency elimina cold start mas AUMENTA custo.",
    domain: 'cost',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 207,
    question: "Uma aplicação precisa de throughput consistente de 500 MB/s em EFS. Como garantir?",
    options: [
      "EFS Bursting mode",
      "EFS Provisioned Throughput mode com 500 MB/s",
      "Adicionar mais arquivos para aumentar burst credits",
      "Migrar para EBS"
    ],
    correctAnswer: 1,
    explanation: "EFS Provisioned Throughput permite especificar throughput independente de tamanho. Bursting mode depende do tamanho armazenado (50 MB/s por TB). Para 500 MB/s consistente com pouco armazenamento, Provisioned é necessário.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 208,
    question: "Uma aplicação usa ALB. Como rotear requests baseado no valor de header HTTP específico?",
    options: [
      "Não é possível",
      "ALB routing rules baseado em headers",
      "NLB",
      "CloudFront"
    ],
    correctAnswer: 1,
    explanation: "ALB suporta content-based routing incluindo headers, path, query strings, host, source IP. Pode rotear para target groups diferentes baseado em header values. Layer 7 routing avançado.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 209,
    question: "Uma empresa precisa compliance HIPAA. Quais serviços AWS são HIPAA eligible? (Escolha 2)",
    options: [
      "S3",
      "Lambda",
      "Mechanical Turk",
      "RDS",
      "Amazon Honeycode"
    ],
    correctAnswer: [0, 3],
    explanation: "S3, RDS, Lambda (desde 2023), EC2, EBS são HIPAA eligible (após assinar BAA). Mechanical Turk e Honeycode NÃO são HIPAA eligible. Lista completa em AWS Compliance page.",
    domain: 'secure',
    difficulty: 'hard',
    multipleChoice: true
  },
  {
    id: 210,
    question: "Uma aplicação precisa analisar logs de aplicação para troubleshooting. Logs estão no CloudWatch. Como fazer queries SQL?",
    options: [
      "Exportar para S3 e usar Athena",
      "CloudWatch Logs Insights",
      "ElasticSearch",
      "Lambda para processar"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch Logs Insights permite queries interativas em logs com linguagem de query própria (similar a SQL). Análise rápida sem exportação. Para análise histórica complexa, exportar para S3 e usar Athena.",
    domain: 'performance',
    difficulty: 'medium'
  },
  // Questions 211-325
  {
    id: 211,
    question: "Uma aplicação usa RDS Aurora. Como criar réplicas globais para disaster recovery?",
    options: [
      "Aurora Global Database",
      "Cross-region snapshots",
      "DMS replication",
      "Manual export/import"
    ],
    correctAnswer: 0,
    explanation: "Aurora Global Database replica dados para múltiplas regiões com latência <1 segundo. Até 5 regiões secundárias. Promoção de região em <1 minuto para DR. Ideal para aplicações globais e disaster recovery.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 212,
    question: "Uma aplicação precisa enviar 1 milhão de emails. Qual serviço usar?",
    options: [
      "SNS",
      "SES (Simple Email Service)",
      "SQS",
      "WorkMail"
    ],
    correctAnswer: 1,
    explanation: "SES é otimizado para envio em massa de emails (transacionais e marketing). Alta deliverability, templates, analytics. SNS é notifications curtas. WorkMail é email corporativo (não bulk sending).",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 213,
    question: "Uma aplicação usa WAF no ALB. Como bloquear SQL injection attacks?",
    options: [
      "Security Groups",
      "WAF Managed Rules - SQL injection rule group",
      "Network ACL",
      "CloudFront"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF tem managed rule groups incluindo SQL injection protection. Analisa requests e bloqueia padrões maliciosos. Security Groups e NACLs são network layer. CloudFront pode usar WAF também.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 214,
    question: "Uma aplicação Lambda tem timeout frequente aos 15 minutos. Qual alternativa para processos longos?",
    options: [
      "Aumentar timeout para 30 minutos",
      "Dividir em múltiplas Lambdas com Step Functions",
      "Migrar para Fargate",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Lambda máximo é 15min (não configurável acima). Soluções: Step Functions para orquestrar múltiplas Lambdas ou migrar para Fargate/ECS para processos >15min. Ambas estratégias válidas.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 215,
    question: "Uma aplicação precisa de cache Redis com failover automático. Como configurar ElastiCache?",
    options: [
      "Redis cluster mode disabled com réplica",
      "Redis cluster mode enabled",
      "Memcached",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "ElastiCache Redis: Cluster mode disabled com replica oferece Multi-AZ failover automático. Cluster mode enabled oferece sharding + HA. Ambos suportam failover. Memcached não tem persistência/replicação.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 216,
    question: "Uma aplicação precisa de IP fixo que não muda se instância EC2 for substituída. O que usar?",
    options: [
      "Public IP",
      "Elastic IP",
      "Private IP",
      "Elastic Network Interface (ENI)"
    ],
    correctAnswer: 1,
    explanation: "Elastic IP permanece mesmo após parar/iniciar EC2 ou trocar instância. Public IP muda. ENI pode ser movido entre instâncias mantendo IPs privados. Para IP público fixo, Elastic IP é correto.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 217,
    question: "Uma aplicação usa CloudFormation. Como garantir que stack não seja deletada acidentalmente?",
    options: [
      "IAM policies negando DeleteStack",
      "Stack termination protection",
      "Fazer backup da stack",
      "A e B"
    ],
    correctAnswer: 3,
    explanation: "Termination protection previne deleção acidental da stack. IAM policies restringem quem pode deletar. Combinar ambos para defense in depth. Backups (export template) para recovery.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 218,
    question: "Uma aplicação precisa processar imagens com OpenCV (biblioteca pesada). Lambda ou Fargate?",
    options: [
      "Lambda com Lambda Layer",
      "Lambda Container Image (até 10 GB)",
      "Fargate para mais flexibilidade",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "OpenCV é pesado. Lambda Container Image suporta até 10 GB (pode funcionar). Fargate sem limites de tamanho e tempo. Para processamento pesado, Fargate oferece mais flexibilidade. Ambas opções viáveis.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 219,
    question: "Uma aplicação usa S3 para data lake. Como catalogar e fazer queries sem ETL?",
    options: [
      "AWS Glue Data Catalog + Athena",
      "Redshift Spectrum",
      "EMR",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Glue Crawler descobre schema e popula Data Catalog. Athena faz queries SQL direto no S3. Redshift Spectrum também faz queries no S3 de dentro do Redshift. Ambas soluções serverless sem ETL.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 220,
    question: "Uma aplicação precisa garantir que dados no EBS sejam criptografados. Como enforçar para todos volumes novos?",
    options: [
      "AWS Config rule",
      "Habilitar EBS encryption by default na região",
      "IAM policy",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "EBS encryption by default: todos volumes novos são criptografados automaticamente. IAM policy pode negar criação de volumes não criptografados. Config rule detecta non-compliance. Múltiplas camadas de enforcement.",
    domain: 'secure',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 221,
    question: "Uma aplicação usa ALB para distribuir tráfego. Como implementar canary deployment (5% tráfego para nova versão)?",
    options: [
      "Criar dois target groups com weights 95/5",
      "Route 53 weighted routing",
      "CloudFront com Lambda@Edge",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "ALB suporta weighted target groups (enviar 5% para novo grupo, 95% para antigo). Route 53 weighted routing também funciona. Ambas soluções válidas para canary deployments.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 222,
    question: "Uma aplicação precisa de filesystem Lustre para HPC workloads. Qual serviço AWS?",
    options: [
      "EFS",
      "FSx for Lustre",
      "FSx for Windows",
      "S3"
    ],
    correctAnswer: 1,
    explanation: "FSx for Lustre é filesystem de alta performance para HPC, ML training, analytics. Centenas de GB/s throughput, milhões de IOPS. Integra com S3. EFS é para uso geral. FSx Windows é SMB.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 223,
    question: "Uma aplicação usa múltiplas Lambdas que compartilham código comum. Como reutilizar código?",
    options: [
      "Copiar código em cada função",
      "Lambda Layers",
      "Container images",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Lambda Layers permitem compartilhar código, dependências entre funções. Até 5 layers por função. Container images também permitem reutilização. Layers são mais simples para bibliotecas comuns.",
    domain: 'cost',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 224,
    question: "Uma aplicação precisa de notificação quando custo AWS exceder $1000. Como configurar?",
    options: [
      "AWS Budgets com alert",
      "CloudWatch billing alarm",
      "Cost Explorer",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "AWS Budgets permite definir budgets com alerts (email/SNS) quando threshold é atingido. CloudWatch billing alarms também funcionam. Ambas soluções para alertas de custo. Cost Explorer é apenas visualização.",
    domain: 'cost',
    difficulty: 'easy',
    multipleChoice: false
  },
  {
    id: 225,
    question: "Uma aplicação precisa executar containers em wavelength zones para ultra-baixa latência 5G. O que usar?",
    options: [
      "ECS/EKS em Wavelength Zones",
      "Lambda",
      "Fargate em região normal",
      "EC2 em Local Zones"
    ],
    correctAnswer: 0,
    explanation: "Wavelength Zones: infrastructure AWS em redes 5G para latência sub-10ms. ECS e EKS suportam Wavelength. Lambda não disponível. Local Zones são diferentes (cidades, não 5G).",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 226,
    question: "Uma aplicação usa Cognito User Pools. Como adicionar MFA?",
    options: [
      "Habilitar MFA setting no User Pool",
      "Implementar MFA custom na aplicação",
      "Usar IAM",
      "Não é possível"
    ],
    correctAnswer: 0,
    explanation: "Cognito User Pools tem MFA built-in (SMS, TOTP). Configuração simples no pool settings. Pode ser opcional ou obrigatório. Cognito gerencia todo fluxo de MFA.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 227,
    question: "Uma aplicação precisa de banco de dados grafo para rede social. Qual serviço AWS?",
    options: [
      "DynamoDB",
      "Neptune",
      "RDS",
      "DocumentDB"
    ],
    correctAnswer: 1,
    explanation: "Neptune é banco de dados grafo gerenciado. Suporta Property Graph (Gremlin) e RDF (SPARQL). Otimizado para queries de relacionamentos complexos. Ideal para redes sociais, recomendações, grafos de conhecimento.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 228,
    question: "Uma aplicação usa EC2 em Auto Scaling. Como garantir logs sejam preservados após instância terminar?",
    options: [
      "Armazenar logs localmente no EC2",
      "Enviar logs para CloudWatch Logs",
      "EBS volume persistente",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch Logs Agent envia logs para CloudWatch em tempo real. Logs persistem após instância terminar. EBS também termina com instância por padrão em Auto Scaling. CloudWatch Logs é solução correta.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 229,
    question: "Uma aplicação precisa de time series database para IoT metrics. Qual serviço?",
    options: [
      "DynamoDB",
      "RDS",
      "Amazon Timestream",
      "Redshift"
    ],
    correctAnswer: 2,
    explanation: "Timestream é database serverless para time series. Otimizado para IoT, operational metrics, analytics. Queries rápidas em trilhões de eventos/dia. Mais eficiente que DynamoDB/RDS para time series.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 230,
    question: "Uma aplicação usa S3. Como garantir que objetos sejam deletados automaticamente após 30 dias?",
    options: [
      "Lambda agendado para deletar",
      "S3 Lifecycle Policy com expiration",
      "Deletar manualmente",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "S3 Lifecycle Policies automatizam transições e expiração. Regra de expiration deleta objetos após período especificado. Totalmente gerenciado, sem código. Lambda seria over-engineering.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 231,
    question: "Uma aplicação precisa de ledger database imutável para audit trail. Qual serviço?",
    options: [
      "DynamoDB",
      "Amazon QLDB (Quantum Ledger Database)",
      "RDS",
      "Blockchain"
    ],
    correctAnswer: 1,
    explanation: "QLDB é ledger database totalmente gerenciado e imutável. Histórico completo verificável criptograficamente. Ideal para audit trails, compliance, histórico de transações. DynamoDB/RDS não garantem imutabilidade.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 232,
    question: "Uma aplicação usa API Gateway. Como cachear responses para reduzir latência?",
    options: [
      "Habilitar API Gateway caching",
      "CloudFront na frente",
      "ElastiCache",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "API Gateway tem caching built-in (TTL configurável). CloudFront na frente do API Gateway também cacheia. Combinar ambos: CloudFront para edge caching, API Gateway para caching de backend. Ambas soluções válidas.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 233,
    question: "Uma aplicação precisa processar arquivos CSV grandes (100 GB) e carregar em Redshift. Qual serviço?",
    options: [
      "Lambda",
      "Glue ETL job",
      "EMR",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "AWS Glue é ETL serverless ideal para transformar e carregar dados no Redshift. EMR também funciona para processamento customizado. Lambda tem limites (15min, memória). Para 100 GB, Glue ou EMR.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 234,
    question: "Uma aplicação usa ECS. Como passar secrets para containers de forma segura?",
    options: [
      "Variáveis de ambiente em plaintext",
      "Secrets Manager referenciado na task definition",
      "Hardcoded no código",
      "Arquivo no S3"
    ],
    correctAnswer: 1,
    explanation: "ECS task definition pode referenciar secrets do Secrets Manager ou Parameter Store. Secrets são injetados como variáveis de ambiente em runtime. Nunca plaintext ou hardcoded.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 235,
    question: "Uma aplicação precisa de message broker compatível com RabbitMQ. Qual serviço AWS?",
    options: [
      "SQS",
      "Amazon MQ",
      "SNS",
      "Kinesis"
    ],
    correctAnswer: 1,
    explanation: "Amazon MQ é message broker gerenciado compatível com RabbitMQ e ActiveMQ. Para migrar aplicações existentes sem refatorar. SQS/SNS são AWS-native (melhores para novos projetos).",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 236,
    question: "Uma aplicação usa Lambda com muitas dependências Python. Como otimizar cold start?",
    options: [
      "Usar Lambda Layers para dependências",
      "Reduzir tamanho do package",
      "Provisioned Concurrency",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Múltiplas otimizações: Layers reduz tamanho do function package. Package menor = download mais rápido. Provisioned Concurrency elimina cold start. Combinar estratégias para melhor resultado.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 237,
    question: "Uma aplicação precisa de in-memory database com persistence. Redis ou Memcached?",
    options: [
      "Memcached",
      "ElastiCache Redis com persistence",
      "DynamoDB DAX",
      "RDS"
    ],
    correctAnswer: 1,
    explanation: "Redis suporta persistence (snapshots e AOF). Memcached é apenas in-memory (sem persistence). Para cache com backup, Redis é correto. DAX é cache específico para DynamoDB.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 238,
    question: "Uma aplicação usa CloudFront. Como adicionar headers de segurança (CSP, HSTS) em todas responses?",
    options: [
      "Configurar na origem",
      "CloudFront Functions ou Lambda@Edge",
      "WAF",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Functions (edge) pode adicionar/modificar headers. Lambda@Edge também. Ideal para adicionar security headers (Content-Security-Policy, Strict-Transport-Security) em todas responses.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 239,
    question: "Uma aplicação precisa de workflow orchestration com estados visuais. Qual serviço?",
    options: [
      "Lambda",
      "Step Functions",
      "SWF",
      "CloudFormation"
    ],
    correctAnswer: 1,
    explanation: "Step Functions é workflow orchestration serverless com visual workflow designer. Orquestra Lambdas, ECS, Glue, etc. SWF é legado (mais complexo). Step Functions é recomendado para novos projetos.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 240,
    question: "Uma aplicação usa DynamoDB. Como fazer backup automático diário?",
    options: [
      "DynamoDB on-demand backup manual",
      "Habilitar Point-in-Time Recovery (PITR)",
      "AWS Backup",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "PITR: backup contínuo com restore para qualquer ponto nos últimos 35 dias. AWS Backup: agendamento de backups com lifecycle policies. Ambas soluções para backup automatizado de DynamoDB.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 241,
    question: "Uma aplicação precisa de VPN gerenciada para acesso remoto. Qual serviço?",
    options: [
      "VPN Site-to-Site",
      "AWS Client VPN",
      "Direct Connect",
      "VPC Peering"
    ],
    correctAnswer: 1,
    explanation: "Client VPN é VPN gerenciada para usuários remotos acessarem VPC. Site-to-Site conecta networks (datacenter-VPC). Direct Connect é conexão dedicada. Client VPN para remote access.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 242,
    question: "Uma aplicação usa EC2. Como automatizar patching de OS?",
    options: [
      "Scripts cron",
      "Systems Manager Patch Manager",
      "Lambda",
      "Manual updates"
    ],
    correctAnswer: 1,
    explanation: "Systems Manager Patch Manager automatiza patching em escala. Define patch baselines, maintenance windows. Suporta EC2 e on-premises. Mais gerenciável que scripts manuais.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 243,
    question: "Uma aplicação precisa de search engine para full-text search. Qual serviço AWS?",
    options: [
      "RDS",
      "Amazon OpenSearch Service (ex-Elasticsearch)",
      "DynamoDB",
      "CloudSearch"
    ],
    correctAnswer: 1,
    explanation: "OpenSearch Service (anteriormente Elasticsearch) é search engine gerenciado. Full-text search, analytics, visualização (Kibana/OpenSearch Dashboards). CloudSearch também é opção mas OpenSearch mais popular.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 244,
    question: "Uma aplicação usa ALB. Como implementar sticky sessions baseado em application cookie?",
    options: [
      "Não é possível",
      "Habilitar application-based cookie stickiness no target group",
      "Usar NLB",
      "CloudFront"
    ],
    correctAnswer: 1,
    explanation: "ALB suporta application-based cookie stickiness. Target group pode usar cookie da aplicação para routing. Duration-based stickiness usa cookie do ALB. Ambas opções disponíveis.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 245,
    question: "Uma aplicação precisa converter vídeos para múltiplos formatos. Qual serviço gerenciado?",
    options: [
      "Lambda com FFmpeg",
      "Amazon Elastic Transcoder ou MediaConvert",
      "EC2 com FFmpeg",
      "Fargate"
    ],
    correctAnswer: 1,
    explanation: "Elastic Transcoder e MediaConvert são serviços gerenciados para transcoding de vídeo. MediaConvert é mais novo e feature-rich. Lambda tem limites. Para vídeo, serviços gerenciados são ideais.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 246,
    question: "Uma aplicação usa S3. Como habilitar versionamento para proteger contra deleção acidental?",
    options: [
      "S3 Versioning",
      "MFA Delete",
      "Object Lock",
      "A e B"
    ],
    correctAnswer: 3,
    explanation: "Versioning mantém versões históricas. MFA Delete adiciona autenticação para deletar versões ou desabilitar versioning. Combinar ambos para máxima proteção. Object Lock para compliance (imutabilidade).",
    domain: 'resilient',
    difficulty: 'easy',
    multipleChoice: false
  },
  {
    id: 247,
    question: "Uma aplicação precisa de database compatível com MongoDB. Qual serviço AWS?",
    options: [
      "DynamoDB",
      "DocumentDB",
      "RDS",
      "Neptune"
    ],
    correctAnswer: 1,
    explanation: "DocumentDB é database de documentos compatível com MongoDB (API e drivers). Totalmente gerenciado, escalável. Para migrar apps MongoDB para AWS sem refatorar.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 248,
    question: "Uma aplicação usa Lambda. Como debugar e profilear performance?",
    options: [
      "CloudWatch Logs",
      "AWS X-Ray",
      "Lambda Insights",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "CloudWatch Logs para logs. X-Ray para tracing distribuído. Lambda Insights para métricas de performance detalhadas. Combinar todas ferramentas para observabilidade completa.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 249,
    question: "Uma aplicação precisa de DNS privado para recursos na VPC. Como configurar?",
    options: [
      "Route 53 Public Hosted Zone",
      "Route 53 Private Hosted Zone",
      "DNS server no EC2",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "Route 53 Private Hosted Zone fornece DNS privado para recursos na VPC. Não acessível da internet. Associado a VPCs específicas. Ideal para resolução interna.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 250,
    question: "Uma aplicação usa RDS. Como implementar read scaling para milhares de concurrent connections?",
    options: [
      "Aumentar instância RDS",
      "Criar múltiplas Read Replicas e usar RDS Proxy",
      "Migrar para Aurora",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Read Replicas distribuem reads. RDS Proxy faz connection pooling (reduz overhead). Aurora suporta 15 replicas vs 5 no RDS. Para milhares de connections, Proxy + Replicas ou Aurora.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 251,
    question: "Uma aplicação usa EC2 com userData script. Como passar secrets de forma segura?",
    options: [
      "Hardcoded no userData",
      "Buscar de Systems Manager Parameter Store no userData",
      "Variáveis de ambiente",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "userData pode fazer AWS CLI/SDK calls para buscar secrets do Parameter Store/Secrets Manager. IAM role da instância autoriza acesso. Nunca hardcode secrets em userData (visível em metadata).",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 252,
    question: "Uma aplicação precisa de queue com prioridade de mensagens. SQS suporta?",
    options: [
      "SQS FIFO com prioridade",
      "SQS não suporta prioridade nativamente - usar múltiplas queues",
      "SQS Standard com prioridade",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "SQS não tem conceito de prioridade de mensagem. Workaround: múltiplas queues (high/medium/low priority) com consumers processando high primeiro. Ou usar EventBridge com routing para diferentes targets.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 253,
    question: "Uma aplicação precisa de managed Apache Kafka. Qual serviço AWS?",
    options: [
      "Kinesis Data Streams",
      "Amazon MSK (Managed Streaming for Kafka)",
      "SQS",
      "EventBridge"
    ],
    correctAnswer: 1,
    explanation: "MSK é Apache Kafka gerenciado. Para migrar aplicações Kafka existentes ou quando Kafka ecosystem tools são necessários. Kinesis é AWS-native (mais simples mas não Kafka).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 254,
    question: "Uma aplicação usa S3. Como notificar aplicação quando objeto é deletado?",
    options: [
      "S3 Event Notification para DELETE event",
      "CloudWatch Events",
      "Polling do S3",
      "Não é possível"
    ],
    correctAnswer: 0,
    explanation: "S3 Event Notifications suportam eventos de DELETE. Pode invocar Lambda, SNS, SQS, ou EventBridge. Configuração simples no bucket S3.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 255,
    question: "Uma aplicação precisa de IP whitelist mas IPs mudam frequentemente. Como gerenciar?",
    options: [
      "Atualizar Security Group manualmente",
      "Usar prefix lists gerenciadas",
      "Lambda para atualizar Security Groups automaticamente",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Managed Prefix Lists: lista de CIDRs centralizadas usadas em Security Groups/NACLs. Atualizar prefix list atualiza todas SGs. Lambda com EventBridge para automação também funciona. Ambas soluções válidas.",
    domain: 'secure',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 256,
    question: "Uma aplicação usa Aurora. Como escalar read capacity automaticamente?",
    options: [
      "Aurora Auto Scaling para Read Replicas",
      "Adicionar replicas manualmente",
      "Aumentar instância",
      "Não é possível"
    ],
    correctAnswer: 0,
    explanation: "Aurora Auto Scaling adiciona/remove read replicas automaticamente baseado em métricas (CPU, connections). Escala de 1-15 replicas. Define min/max replicas e target metric.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 257,
    question: "Uma aplicação precisa de object storage on-premises com acesso S3 API. Qual solução?",
    options: [
      "AWS Storage Gateway - File Gateway",
      "AWS Outposts com S3",
      "AWS Snowball Edge",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "File Gateway: interface S3 local com storage no cloud. Outposts: S3 rodando on-premises. Snowball Edge: storage local temporário com S3 API. Diferentes casos de uso mas todas oferecem S3 API on-premises.",
    domain: 'resilient',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 258,
    question: "Uma aplicação usa CloudFormation. Como compartilhar outputs entre stacks?",
    options: [
      "Hardcoded values",
      "Export outputs e usar Fn::ImportValue em outras stacks",
      "S3",
      "SSM Parameter Store"
    ],
    correctAnswer: 1,
    explanation: "CloudFormation Exports permite compartilhar outputs entre stacks na mesma região. Stack A exporta value, Stack B importa com Fn::ImportValue. Cross-region: usar SSM Parameter Store.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 259,
    question: "Uma aplicação precisa processar arquivos assim que chegam no S3, mas pode demorar horas. Qual arquitetura?",
    options: [
      "S3 event → Lambda (15min limite)",
      "S3 event → SQS → ECS Fargate via EventBridge",
      "S3 event → Step Functions → Fargate",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Lambda tem limite de 15min. Para processamento longo: S3 event para SQS, workers Fargate/ECS processam da queue. Ou Step Functions orquestrando Fargate tasks. Ambas soluções para processos longos.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 260,
    question: "Uma aplicação usa DynamoDB. Como implementar TTL (Time To Live) para expirar items automaticamente?",
    options: [
      "Lambda agendado para deletar",
      "Habilitar DynamoDB TTL no atributo timestamp",
      "Application logic",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB TTL deleta items automaticamente baseado em timestamp attribute. Sem custo adicional. Expiração ocorre em background (não instantânea mas dentro de 48h). Ideal para dados temporários.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 261,
    question: "Uma aplicação precisa garantir disaster recovery cross-region para S3. Como replicar?",
    options: [
      "S3 Cross-Region Replication (CRR)",
      "AWS DataSync",
      "Lambda para copiar",
      "Manual sync"
    ],
    correctAnswer: 0,
    explanation: "S3 CRR replica objetos automaticamente para bucket em outra região. Assíncrono (segundos-minutos). Suporta replicação de objetos existentes e novos. Versioning obrigatório. Ideal para DR cross-region.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 262,
    question: "Uma aplicação usa Lambda. Como garantir que função sempre use versão específica de Layer?",
    options: [
      "Referenciar Layer ARN com version number",
      "Usar $LATEST",
      "Nome do Layer",
      "Não é possível"
    ],
    correctAnswer: 0,
    explanation: "Layer ARN inclui version number (ex: arn:aws:lambda:::layer:my-layer:3). Especificar versão garante imutabilidade. $LATEST aponta para versão mais recente (pode mudar). Usar versão específica para estabilidade.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 263,
    question: "Uma aplicação precisa de CI/CD pipeline para deployar em ECS. Quais serviços AWS?",
    options: [
      "CodePipeline + CodeBuild + CodeDeploy",
      "Jenkins",
      "CloudFormation",
      "A é AWS-native"
    ],
    correctAnswer: 0,
    explanation: "CodePipeline: orchestration. CodeBuild: build container images. CodeDeploy: deploy para ECS com blue/green. AWS-native CI/CD. Jenkins também funciona mas CodePipeline é gerenciado.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 264,
    question: "Uma aplicação usa CloudWatch. Como criar dashboard unificado com métricas de múltiplas regiões?",
    options: [
      "CloudWatch Dashboard com cross-region queries",
      "Não é possível - dashboards são por região",
      "CloudWatch cross-region observability",
      "Exportar métricas centralmente"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch Dashboards suportam widgets cross-region. Pode adicionar métricas de múltiplas regiões em um único dashboard. CloudWatch cross-region observability simplifica monitoring multi-região.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 265,
    question: "Uma aplicação precisa garantir que AMI customizada seja criptografada. Como enforçar?",
    options: [
      "Criptografar snapshots manualmente",
      "AMI deve ter encrypted snapshots - enforçar via IAM policy",
      "AWS Config rule",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "IAM policy pode negar criação de AMI de snapshots não criptografados. AWS Config rule detecta AMIs não criptografadas. Combinar enforcement preventivo (IAM) e detective (Config).",
    domain: 'secure',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 266,
    question: "Uma aplicação usa API Gateway com backend Lambda. Lambda retorna erro 500. Como debug?",
    options: [
      "CloudWatch Logs do Lambda",
      "API Gateway execution logs",
      "X-Ray",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "CloudWatch Logs: logs da função Lambda. API Gateway logs: requests/responses detalhados. X-Ray: tracing end-to-end mostrando latência de cada componente. Usar todas ferramentas para debugging completo.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 267,
    question: "Uma aplicação precisa de desktop virtual na AWS. Qual serviço?",
    options: [
      "EC2 com RDP",
      "Amazon WorkSpaces",
      "AppStream 2.0",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "WorkSpaces: desktop virtual persistente (VDI). AppStream 2.0: streaming de aplicações (não desktop completo). Ambos para diferentes casos. EC2 com RDP funciona mas WorkSpaces é gerenciado e otimizado.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 268,
    question: "Uma aplicação usa S3. Como otimizar custos para dados acessados raramente mas que requerem acesso imediato?",
    options: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 Glacier",
      "S3 Intelligent-Tiering"
    ],
    correctAnswer: 1,
    explanation: "S3 Standard-IA (Infrequent Access): dados acessados <1x/mês mas acesso imediato necessário. ~50% mais barato que Standard. Glacier tem retrieval delay. Intelligent-Tiering move automaticamente mas S3-IA para padrão conhecido.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 269,
    question: "Uma aplicação precisa de private connection entre VPC e serviços AWS (S3, DynamoDB) sem internet. Como?",
    options: [
      "NAT Gateway",
      "VPC Gateway Endpoint (S3, DynamoDB)",
      "VPC Interface Endpoint",
      "Internet Gateway"
    ],
    correctAnswer: 1,
    explanation: "Gateway Endpoints (para S3 e DynamoDB): rota privada via route table, sem tráfego sair da AWS network. Gratuito. Interface Endpoints para outros serviços AWS (cobrado). NAT/IGW usam internet.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 270,
    question: "Uma aplicação usa Auto Scaling. Como garantir que pelo menos 2 instâncias estejam sempre rodando?",
    options: [
      "Desired capacity = 2",
      "Minimum capacity = 2",
      "Maximum capacity = 2",
      "Health check"
    ],
    correctAnswer: 1,
    explanation: "Minimum capacity define número mínimo de instâncias. Auto Scaling nunca vai abaixo desse valor. Desired é target (pode mudar). Maximum é limite superior. Para garantir mínimo, configurar min capacity.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 271,
    question: "Uma aplicação usa CloudFront para servir API. Como proteger API de acessos diretos (bypass CloudFront)?",
    options: [
      "Custom header secret validado pela API",
      "WAF no ALB verificando origin",
      "Tornar ALB privado",
      "Todas podem funcionar"
    ],
    correctAnswer: 3,
    explanation: "Custom header do CloudFront validado pela API. WAF verificando headers CloudFront. ALB privado acessível apenas via VPC (CloudFront via PrivateLink). Múltiplas estratégias possíveis dependendo da arquitetura.",
    domain: 'secure',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 272,
    question: "Uma aplicação precisa de DNS failover automático. Como configurar Route 53?",
    options: [
      "Failover routing policy com health checks",
      "Simple routing",
      "Weighted routing",
      "Geolocation routing"
    ],
    correctAnswer: 0,
    explanation: "Failover routing policy com health checks monitora primary endpoint. Se health check falhar, Route 53 roteia para secondary automaticamente. Essencial para DR automation.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 273,
    question: "Uma aplicação usa RDS MySQL. Como migrar para Aurora com downtime mínimo?",
    options: [
      "Snapshot e restore",
      "Criar Aurora Read Replica do RDS, promover quando sincronizado",
      "DMS",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "Aurora Read Replica de RDS MySQL: cria replica Aurora do RDS, quando sincronizado promove (downtime ~minutos). DMS para replicação contínua também funciona. Snapshot/restore tem downtime maior.",
    domain: 'resilient',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 274,
    question: "Uma aplicação usa Lambda. Como enviar logs customizados para CloudWatch?",
    options: [
      "print() em Python / console.log() em Node.js",
      "CloudWatch API",
      "Ambas funcionam",
      "Não é possível"
    ],
    correctAnswer: 2,
    explanation: "Lambda automaticamente envia stdout/stderr para CloudWatch Logs. print()/console.log() funcionam. Para logs estruturados customizados, usar CloudWatch Logs SDK. Ambas abordagens válidas.",
    domain: 'performance',
    difficulty: 'easy',
    multipleChoice: false
  },
  {
    id: 275,
    question: "Uma aplicação precisa de database que scale writes automaticamente. Qual opção?",
    options: [
      "RDS com Read Replicas",
      "DynamoDB On-Demand",
      "Aurora",
      "B (DynamoDB escala writes automaticamente)"
    ],
    correctAnswer: 3,
    explanation: "DynamoDB On-Demand escala read e write capacity automaticamente. RDS/Aurora escalam verticalmente (instância maior) mas não horizontalmente para writes. DynamoDB escala horizontalmente para writes.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 276,
    question: "Uma aplicação usa EC2. Como descobrir metadata da instância (instance ID, IP privado)?",
    options: [
      "AWS CLI",
      "Instance Metadata Service (IMDS) em http://169.254.169.254",
      "Tags",
      "CloudWatch"
    ],
    correctAnswer: 1,
    explanation: "Instance Metadata Service (IMDS) fornece informações sobre a instância acessível de dentro da instância via link-local address 169.254.169.254. IMDSv2 requer session token para segurança adicional.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 277,
    question: "Uma aplicação precisa de queue com delay para processar mensagens após 15 minutos. SQS suporta?",
    options: [
      "Não é possível",
      "SQS Delay Queue (até 15 minutos)",
      "SQS Visibility Timeout",
      "Lambda com EventBridge schedule"
    ],
    correctAnswer: 1,
    explanation: "SQS Delay Queue adia disponibilidade de mensagens por até 15 minutos. Delay pode ser configurado por queue ou por mensagem. Visibility timeout é diferente (após consumir, quanto tempo fica invisível).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 278,
    question: "Uma aplicação usa CloudWatch Logs. Logs estão custando caro. Como otimizar?",
    options: [
      "Reduzir retenção period",
      "Exportar logs antigos para S3",
      "Usar log sampling (enviar apenas % dos logs)",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "CloudWatch Logs cobra por GB ingerido e armazenado. Otimizações: retention period menor, exportar para S3 (mais barato para long-term), sampling para reduzir volume. Combinar estratégias.",
    domain: 'cost',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 279,
    question: "Uma aplicação precisa de WAF rules customizadas baseadas em geolocalização e rate limiting. Como implementar?",
    options: [
      "Geo match rule + Rate-based rule no WAF",
      "Security Groups",
      "NACLs",
      "CloudFront"
    ],
    correctAnswer: 0,
    explanation: "AWS WAF suporta geo match rules (allow/block países) e rate-based rules (limite requests/IP). Pode combinar múltiplas rules em web ACL. Security Groups/NACLs não têm essas capacidades.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 280,
    question: "Uma aplicação usa S3 para data lake com acesso frequente. Como otimizar performance?",
    options: [
      "S3 Transfer Acceleration",
      "Usar prefix/partitioning strategy",
      "CloudFront",
      "B (partitioning para paralelismo)"
    ],
    correctAnswer: 3,
    explanation: "S3 performance escala por prefix. Usar prefixes diferentes (ex: /data/2024/01/, /data/2024/02/) permite paralelismo. S3 suporta 3500 PUT/s e 5500 GET/s POR PREFIX. Transfer Acceleration para uploads distantes.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 281,
    question: "Uma aplicação precisa de notification quando EC2 instance state muda (stop, terminate). Como configurar?",
    options: [
      "CloudWatch Events (EventBridge) com EC2 state change events",
      "SNS",
      "CloudTrail",
      "CloudWatch Alarms"
    ],
    correctAnswer: 0,
    explanation: "EventBridge captura EC2 state change events automaticamente. Pode trigger Lambda, SNS, etc. CloudTrail registra API calls mas não é event-driven. EventBridge é solução correta para state changes.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 282,
    question: "Uma aplicação usa containers. Como fazer service discovery para microservices?",
    options: [
      "Hardcoded endpoints",
      "AWS Cloud Map",
      "Route 53",
      "Load Balancers"
    ],
    correctAnswer: 1,
    explanation: "AWS Cloud Map é service discovery para aplicações cloud. Registra services dinamicamente (API, DNS). ECS integra nativamente. Para microservices, Cloud Map é ideal. Route 53 também funciona mas Cloud Map é mais feature-rich.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 283,
    question: "Uma aplicação precisa de VPN com throughput de 10 Gbps. Site-to-Site VPN suporta?",
    options: [
      "Sim, Site-to-Site VPN suporta até 10 Gbps",
      "Não, máximo é 1.25 Gbps por tunnel - usar múltiplos tunnels ou Direct Connect",
      "Usar Client VPN",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "Site-to-Site VPN: cada tunnel até 1.25 Gbps. Para >1.25 Gbps, usar múltiplos tunnels com ECMP ou migrar para Direct Connect (até 100 Gbps). VPN é IPsec over internet (limitações de throughput).",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 284,
    question: "Uma aplicação usa Lambda triggered por API Gateway. Como warm up Lambdas antes de pico de tráfego?",
    options: [
      "Provisioned Concurrency",
      "Scheduled Lambda executions",
      "Aumentar memória",
      "A é correto"
    ],
    correctAnswer: 0,
    explanation: "Provisioned Concurrency mantém N instâncias Lambda warm e ready. Elimina cold starts. Configurar antes de picos previsíveis. Scheduled executions não garantem que funções fiquem warm para API Gateway.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 285,
    question: "Uma aplicação usa DynamoDB com sparse index (muitos items sem attribute indexado). Como otimizar custos do GSI?",
    options: [
      "Projections de apenas attributes necessários",
      "Sparse index economiza automaticamente (só items com attribute são indexados)",
      "Provisioned capacity menor",
      "Todas corretas"
    ],
    correctAnswer: 3,
    explanation: "Sparse indexes só indexam items que têm o attribute (economiza storage/throughput). Projections seletivas reduzem tamanho do index. Provisioned capacity otimizada. Todas estratégias reduzem custos de GSI.",
    domain: 'cost',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 286,
    question: "Uma aplicação precisa de shared filesystem para ML training jobs. EFS ou FSx for Lustre?",
    options: [
      "EFS para uso geral",
      "FSx for Lustre para HPC/ML (maior performance)",
      "Ambos funcionam mas FSx for Lustre oferece throughput muito maior",
      "C está correto"
    ],
    correctAnswer: 3,
    explanation: "FSx for Lustre oferece centenas de GB/s throughput, otimizado para HPC/ML. EFS é uso geral (até 10 GB/s). Para ML training intensivo, FSx for Lustre é melhor escolha. Ambos são shared filesystem mas performance muito diferente.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 287,
    question: "Uma aplicação usa API Gateway REST API. Como implementar throttling por usuário?",
    options: [
      "Usage Plans com API Keys",
      "Lambda authorizer com rate limiting custom",
      "WAF rate-based rule",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Usage Plans com API Keys: throttling nativo por chave (usuário). Lambda authorizer: lógica custom de rate limiting (DynamoDB para tracking). Ambas soluções válidas dependendo de requisitos.",
    domain: 'secure',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 288,
    question: "Uma aplicação usa EC2 spot instances. Como lidar com interrupções?",
    options: [
      "Spot Instance interruption notices (2 minutos aviso)",
      "Checkpointing e graceful shutdown",
      "Spot Fleet mix com On-Demand",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "CloudWatch Events notifica 2min antes de interrupção. Aplicação deve fazer graceful shutdown e checkpointing. Spot Fleet com On-Demand fallback garante capacidade. Combinar estratégias para resiliência.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 289,
    question: "Uma aplicação precisa garantir que Lambda execute dentro de VPC mas também acesse internet. Como configurar networking?",
    options: [
      "Lambda em public subnet",
      "Lambda em private subnet + NAT Gateway em public subnet",
      "Lambda com Elastic IP",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "Lambda em VPC deve estar em private subnet. Para acesso internet, private subnet precisa route para NAT Gateway em public subnet. Lambda em public subnet NÃO funciona (Lambda não pode ter IGW).",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 290,
    question: "Uma aplicação usa Aurora Global Database. Durante failover para região secundária, quanto tempo tipicamente leva?",
    options: [
      "< 1 minuto (Recovery Time Objective)",
      "5-10 minutos",
      "30 minutos",
      "Horas"
    ],
    correctAnswer: 0,
    explanation: "Aurora Global Database: promover região secundária tipicamente <1 minuto (RTO <1min). Replicação tem latência <1 segundo (RPO <1s). Ideal para DR de aplicações críticas.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 291,
    question: "Uma aplicação usa CloudFront. Como cachear responses diferentes baseadas em query strings?",
    options: [
      "Habilitar 'Query String Forwarding and Caching'",
      "CloudFront não suporta",
      "Lambda@Edge",
      "A é correto"
    ],
    correctAnswer: 0,
    explanation: "CloudFront pode cachear baseado em query strings. Configurar quais query strings usar como cache key. Pode ser 'All', 'None', ou específicas. Aumenta variações de cache mas oferece personalização.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 292,
    question: "Uma aplicação precisa de database com in-memory caching integrado. Qual opção?",
    options: [
      "RDS com ElastiCache separado",
      "DynamoDB com DAX",
      "Aurora",
      "B (DAX é cache integrado para DynamoDB)"
    ],
    correctAnswer: 3,
    explanation: "DynamoDB Accelerator (DAX) é in-memory cache gerenciado especificamente para DynamoDB. Microsecond latency. API-compatible (mudança mínima de código). Para DynamoDB, DAX é cache nativo integrado.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 293,
    question: "Uma aplicação usa S3. Como prevenir deleção acidental de bucket inteiro?",
    options: [
      "S3 Block Public Access",
      "MFA Delete",
      "Bucket policy negando s3:DeleteBucket",
      "C (policy nega DeleteBucket)"
    ],
    correctAnswer: 2,
    explanation: "Bucket policy pode explicitamente negar s3:DeleteBucket action. MFA Delete protege objetos, não bucket. Block Public Access é para prevenir acesso público. Para proteger bucket, policy com Deny DeleteBucket.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 294,
    question: "Uma aplicação usa ECS. Como persistir logs após task terminar?",
    options: [
      "Armazenar logs no container",
      "Enviar logs para CloudWatch Logs via awslogs driver",
      "EFS volume",
      "B é correto"
    ],
    correctAnswer: 1,
    explanation: "ECS awslogs log driver envia logs automaticamente para CloudWatch Logs. Logs persistem após task terminar. Configuração simples na task definition. Container storage é efêmero (perde ao terminar).",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 295,
    question: "Uma aplicação precisa de message queue com exatamente-uma-vez delivery e ordenação. Configuração SQS?",
    options: [
      "SQS Standard",
      "SQS FIFO com content-based deduplication",
      "SNS",
      "Kinesis"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO: First-In-First-Out ordering. Content-based deduplication ou message deduplication ID garante exactly-once processing. Standard não garante ordem nem deduplicação. FIFO é correto para requisitos de ordenação.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 296,
    question: "Uma aplicação usa Lambda com RDS connection pooling. Como implementar pool eficientemente?",
    options: [
      "Criar connection em cada invocação",
      "RDS Proxy",
      "Connection pool em código Lambda (variável global)",
      "B ou C"
    ],
    correctAnswer: 3,
    explanation: "RDS Proxy faz connection pooling gerenciado, reduz overhead de connections. Variável global em Lambda reutiliza connection entre invocações warm. Ambas estratégias válidas. RDS Proxy é mais robusto para alta concorrência.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 297,
    question: "Uma aplicação precisa de analytics em tempo real com SQL em streaming data. Qual serviço?",
    options: [
      "Kinesis Data Streams",
      "Kinesis Data Analytics",
      "Kinesis Data Firehose",
      "Athena"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Data Analytics permite queries SQL em streaming data em tempo real. Data Streams: ingestão/storage de streams. Firehose: delivery para destinos (S3, Redshift). Athena: queries em dados estáticos. Analytics é para SQL em real-time streams.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 298,
    question: "Uma aplicação usa Auto Scaling. Como escalar baseado em schedule previsível (ex: 8am aumentar)?",
    options: [
      "Target Tracking",
      "Scheduled Scaling",
      "Step Scaling",
      "Manual scaling"
    ],
    correctAnswer: 1,
    explanation: "Scheduled Scaling permite definir scaling actions baseado em schedule (cron). Ideal para padrões previsíveis (horário comercial, fins de semana). Target/Step Scaling são reativos. Scheduled é proativo.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 299,
    question: "Uma aplicação precisa de encryption em trânsito entre ALB e targets EC2. Como habilitar?",
    options: [
      "ALB listener HTTPS",
      "HTTPS nos targets com certificates",
      "Security Groups",
      "B (HTTPS backend)"
    ],
    correctAnswer: 1,
    explanation: "Para encryption ALB→targets: configurar HTTPS nos targets com certificates. ALB HTTPS listener criptografa client→ALB. Para end-to-end encryption, ambos (HTTPS listener + HTTPS targets) necessários.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 300,
    question: "Uma aplicação usa S3. Como fazer audit de todas operações de acesso a objetos?",
    options: [
      "S3 Server Access Logging",
      "CloudTrail data events para S3",
      "CloudWatch Logs",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "S3 Server Access Logs: registra requests ao bucket. CloudTrail S3 data events: registra object-level API calls. Ambas para auditoria. Server Access Logs mais detalhado por request, CloudTrail integra com AWS audit.",
    domain: 'secure',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 301,
    question: "Uma aplicação Lambda tem cold start de 10 segundos. Como reduzir sem Provisioned Concurrency?",
    options: [
      "Aumentar memória",
      "Reduzir tamanho deployment package",
      "Remover dependencies desnecessários",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Cold start = init time. Otimizações: (1) Mais memória = mais CPU = init mais rápido. (2) Package menor = download mais rápido. (3) Menos dependencies = menos código para carregar. Combinar todas.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 302,
    question: "Uma aplicação usa RDS. Como implementar automated backups cross-region?",
    options: [
      "Snapshot manual e copiar",
      "Habilitar automated backups e copiar snapshots automaticamente",
      "DMS",
      "B (automated backup + copy)"
    ],
    correctAnswer: 1,
    explanation: "RDS automated backups: snapshots diários + transaction logs. Pode configurar automated snapshot copy para outra região. Lambda/EventBridge pode automatizar cópia. Backup retention até 35 dias.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 303,
    question: "Uma aplicação precisa de filesystem shared entre EC2 Windows. Qual serviço?",
    options: [
      "EFS (Linux NFS)",
      "FSx for Windows File Server",
      "EBS Multi-Attach",
      "S3"
    ],
    correctAnswer: 1,
    explanation: "FSx for Windows File Server: SMB filesystem gerenciado para Windows. Active Directory integration. EFS é NFS (Linux). EBS Multi-Attach é block storage (não filesystem). FSx Windows é correto.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 304,
    question: "Uma aplicação usa DynamoDB. Como exportar dados para S3 para analytics sem impactar produção?",
    options: [
      "Scan table (impacta performance)",
      "DynamoDB Export to S3 (sem impacto)",
      "DMS",
      "B (Export to S3)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Export to S3: exporta dados para S3 usando point-in-time snapshot. Sem impacto em throughput ou performance da tabela. Dados em Parquet/JSON. Ideal para analytics offline.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 305,
    question: "Uma aplicação precisa de queue FIFO mas throughput de 300 mensagens/segundo. SQS FIFO suporta?",
    options: [
      "Não, FIFO tem limite de 300 msg/s (batch) ou 3000 (com group ID)",
      "Sim, sem limites",
      "Usar Standard",
      "A (FIFO tem limites, usar batching e group IDs)"
    ],
    correctAnswer: 0,
    explanation: "SQS FIFO: 300 msgs/s sem batching, 3000 com batching (10 msgs/batch). Usar message group IDs para paralelizar. Para >3000 msgs/s, múltiplas queues ou Standard (sem ordenação garantida).",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 306,
    question: "Uma aplicação usa EKS. Como automatizar patching de nodes?",
    options: [
      "Managed node groups com auto-update",
      "Systems Manager Patch Manager",
      "Manual updates",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Managed node groups: AWS gerencia updates de AMI/Kubernetes. Systems Manager: patch management para EC2 nodes. Ambas soluções. Fargate profiles eliminam necessidade de gerenciar nodes.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 307,
    question: "Uma aplicação precisa de notification quando billing threshold é atingido. Como configurar?",
    options: [
      "AWS Budgets com SNS notification",
      "CloudWatch billing alarm",
      "Cost Explorer",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "AWS Budgets: define budgets com alertas (threshold, forecast). CloudWatch billing alarms: alerta quando custo excede. Ambos funcionam. Budgets é mais feature-rich (forecasts, multiple dimensions).",
    domain: 'cost',
    difficulty: 'easy',
    multipleChoice: false
  },
  {
    id: 308,
    question: "Uma aplicação usa API Gateway HTTP API (não REST). Quais autorizadores são suportados?",
    options: [
      "Lambda Authorizer e JWT Authorizer",
      "Cognito Authorizer",
      "IAM",
      "A e C"
    ],
    correctAnswer: 3,
    explanation: "HTTP API suporta: Lambda authorizer, JWT (OIDC/OAuth2), IAM. REST API suporta: Lambda, Cognito, IAM. HTTP API é mais simples e barato que REST, mas menos features.",
    domain: 'secure',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 309,
    question: "Uma aplicação usa Aurora. Como melhorar performance de queries analíticas sem impactar OLTP?",
    options: [
      "Criar read replica",
      "Usar Aurora Parallel Query",
      "Migrar analytics para Redshift",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Read replica: isola analytics de OLTP. Parallel Query: executa queries analíticas em paralelo (100x faster). Redshift: data warehouse dedicado. Múltiplas estratégias dependendo de escala.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 310,
    question: "Uma aplicação precisa garantir que EC2 instances tenham software específico instalado. Como validar compliance?",
    options: [
      "AWS Config rule com SSM inventory",
      "Inspector",
      "Manual audit",
      "A (Config + SSM)"
    ],
    correctAnswer: 0,
    explanation: "Systems Manager Inventory coleta metadata de software instalado. AWS Config rule valida compliance comparando inventory. Automação completa. Inspector é para vulnerabilidades, não compliance de software.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 311,
    question: "Uma aplicação usa S3. Como garantir que todos uploads sejam feitos via SSL/TLS?",
    options: [
      "S3 bucket policy com condição aws:SecureTransport",
      "CloudFront HTTPS",
      "WAF",
      "A (bucket policy)"
    ],
    correctAnswer: 0,
    explanation: "Bucket policy com Deny quando aws:SecureTransport = false força HTTPS. Nega requests HTTP. Enforcement a nível de bucket. CloudFront/WAF não enforçam direto no S3.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 312,
    question: "Uma aplicação Lambda processa mensagens SQS mas algumas falham repetidamente. Como lidar com poison messages?",
    options: [
      "Retry indefinidamente",
      "Configurar DLQ (Dead Letter Queue) na SQS queue",
      "Deletar mensagens",
      "B (DLQ para poison messages)"
    ],
    correctAnswer: 1,
    explanation: "DLQ recebe mensagens que falharam após maxReceiveCount attempts. Isola poison messages para análise sem bloquear queue. Lambda também pode ter DLQ próprio. SQS DLQ é recomendado.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 313,
    question: "Uma aplicação precisa de storage class S3 para backup de 10 anos com acesso raro. Qual classe?",
    options: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 Glacier Deep Archive",
      "C (Deep Archive para long-term)"
    ],
    correctAnswer: 2,
    explanation: "S3 Glacier Deep Archive: storage mais barato AWS, ideal para arquivamento de longo prazo (7-10+ anos). Retrieval em 12 horas. Standard-IA é para acesso mensal. Deep Archive para raramente acessado.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 314,
    question: "Uma aplicação usa CloudFormation. Como fazer rollback automático se deployment falhar?",
    options: [
      "CloudFormation rollback automático por padrão",
      "Configurar rollback triggers com CloudWatch Alarms",
      "Manual rollback",
      "A e B"
    ],
    correctAnswer: 3,
    explanation: "CloudFormation: rollback automático se CREATE/UPDATE falhar. Rollback triggers com CloudWatch Alarms para rollback baseado em métricas (ex: erro rate alto). Ambos mecanismos de proteção.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 315,
    question: "Uma aplicação precisa de IP estático para comunicação com sistema externo que whitelist IPs. Como garantir IP fixo para Lambda?",
    options: [
      "Lambda não suporta IP fixo",
      "Lambda em VPC com NAT Gateway + Elastic IP",
      "Lambda não pode ter Elastic IP",
      "B (via NAT Gateway)"
    ],
    correctAnswer: 1,
    explanation: "Lambda em VPC sai via NAT Gateway. NAT Gateway tem Elastic IP fixo. Sistema externo whitelist Elastic IP do NAT. Única forma de Lambda ter IP fixo de saída.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 316,
    question: "Uma aplicação usa ElastiCache Redis. Como garantir high availability?",
    options: [
      "Multi-AZ com automatic failover",
      "Cluster mode enabled",
      "Read replicas",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Redis Multi-AZ: replicação automática com failover. Cluster mode: sharding + HA. Ambos oferecem high availability. Cluster mode para maior escala. Multi-AZ para single-shard HA.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 317,
    question: "Uma aplicação precisa de storage para containers com lifecycle curto. Qual volume type ECS?",
    options: [
      "EBS volumes",
      "EFS volumes",
      "Ephemeral storage (container layer)",
      "C (ephemeral para lifecycle curto)"
    ],
    correctAnswer: 2,
    explanation: "Container storage é efêmero por padrão. Para dados temporários do container, usar storage local. EBS/EFS para persistência entre tasks. Para lifecycle curto, ephemeral storage suficiente e sem custo adicional.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 318,
    question: "Uma aplicação usa S3. Como detectar se objetos foram acessados nos últimos 90 dias?",
    options: [
      "S3 Storage Class Analysis",
      "S3 Inventory reports com Last Access Time",
      "CloudWatch metrics",
      "A (Storage Class Analysis)"
    ],
    correctAnswer: 0,
    explanation: "S3 Storage Class Analysis monitora padrões de acesso e recomenda lifecycle policies. Mostra objetos acessados/não-acessados. Inventory reports têm metadata mas não tracking de acesso otimizado.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 319,
    question: "Uma aplicação usa Route 53. Como implementar blue/green deployment gradual (canary)?",
    options: [
      "Weighted routing policy",
      "Failover routing",
      "Latency routing",
      "A (weighted)"
    ],
    correctAnswer: 0,
    explanation: "Weighted routing distribui tráfego por peso. Pode começar 95% blue / 5% green (canary), depois 50/50, finalmente 100% green. Ideal para deployments graduais e A/B testing.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 320,
    question: "Uma aplicação precisa de logging estruturado em formato JSON no CloudWatch. Como implementar em Lambda?",
    options: [
      "print(json.dumps(log_data))",
      "Usar library de logging estruturado (ex: aws-lambda-powertools)",
      "CloudWatch Logs Insights parse",
      "A ou B"
    ],
    correctAnswer: 3,
    explanation: "Ambas funcionam: print JSON ou usar library (Powertools, structlog). Logs estruturados facilitam queries no Logs Insights. Powertools oferece tracing integrado e best practices.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: false
  },
  {
    id: 321,
    question: "Uma aplicação usa DynamoDB. Como implementar atomic counters?",
    options: [
      "Read, increment, write (race condition)",
      "UpdateItem com ADD action",
      "Transactions",
      "B (UPDATE ADD é atomic)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB UpdateItem com ADD action é atomic. Incrementa/decrementa número sem race conditions. Não requer read-before-write. Transactions também funcionam mas ADD é mais simples para counters.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 322,
    question: "Uma aplicação usa EC2 com Auto Scaling. Como garantir graceful shutdown (drain connections antes de terminar)?",
    options: [
      "Lifecycle hooks",
      "Health checks",
      "Termination delay",
      "A (lifecycle hooks)"
    ],
    correctAnswer: 0,
    explanation: "Auto Scaling lifecycle hooks pausam before terminating. Aplicação pode fazer graceful shutdown (drain connections, salvar estado). Hook completa após timeout ou manual. Essencial para stateful apps.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 323,
    question: "Uma aplicação precisa de object storage com acesso de baixa latência para ML training. S3 ou FSx for Lustre?",
    options: [
      "S3 (object storage)",
      "FSx for Lustre com S3 repository",
      "EFS",
      "B (FSx for Lustre)"
    ],
    correctAnswer: 1,
    explanation: "FSx for Lustre com S3 repository: high performance filesystem (GB/s throughput) linked to S3. Ideal para ML training. Lê dados do S3, cache local para baixa latência. S3 direto tem latência maior.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 324,
    question: "Uma aplicação usa API Gateway. Como implementar request/response transformation sem Lambda?",
    options: [
      "VTL (Velocity Template Language) em integration request/response",
      "Lambda",
      "Não é possível",
      "A (VTL mapping templates)"
    ],
    correctAnswer: 0,
    explanation: "API Gateway suporta VTL mapping templates para transformar requests/responses sem Lambda. Adiciona headers, modifica body, etc. Mais eficiente que Lambda para transformations simples.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 325,
    question: "Uma aplicação usa CloudWatch Logs. Como alertar quando padrão específico aparece nos logs (ex: ERROR)?",
    options: [
      "CloudWatch Logs metric filter + CloudWatch Alarm",
      "Lambda parsing logs",
      "X-Ray",
      "A (metric filter + alarm)"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch Logs metric filter extrai métricas de logs (ex: conta 'ERROR'). CloudWatch Alarm dispara quando métrica excede threshold. SNS notification para alert. Solução nativa sem Lambda.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 326,
    question: "Uma empresa precisa distribuir aplicações em contêineres com gerenciamento automático de infraestrutura. Qual serviço oferece serverless containers?",
    options: [
      "ECS com EC2",
      "ECS com Fargate",
      "EKS com node groups",
      "Lambda apenas"
    ],
    correctAnswer: 1,
    explanation: "ECS Fargate é serverless - AWS gerencia infraestrutura (sem EC2 para gerenciar). Escala automático, paga apenas por recursos usados. ECS/EKS com EC2 requerem gerenciar nodes. Lambda é para funções, não containers completos.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 327,
    question: "Qual é a diferença principal entre ALB e NLB em termos de performance?",
    options: [
      "ALB opera na camada 7 com latência maior; NLB na camada 4 com latência ultra-baixa",
      "Ambos têm mesma performance",
      "NLB não suporta TLS",
      "ALB é mais rápido"
    ],
    correctAnswer: 0,
    explanation: "NLB (Network Load Balancer) opera na camada 4 (TCP/UDP) com latência ultra-baixa (microsegundos) e milhões de req/s. ALB opera na camada 7 (HTTP/HTTPS) com mais features mas latência maior. NLB para performance extrema.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 328,
    question: "Uma empresa precisa criptografar dados em trânsito entre VPCs em regiões diferentes. Qual solução garante criptografia?",
    options: [
      "VPC Peering com TLS",
      "Transit Gateway com VPN attachment",
      "Internet direto com HTTPS",
      "B (Transit Gateway VPN)"
    ],
    correctAnswer: 1,
    explanation: "Transit Gateway com VPN attachment criptografa dados entre regiões usando IPsec. VPC Peering usa rede privada AWS mas não criptografa automaticamente. Site-to-Site VPN ou TLS na aplicação são alternativas.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 329,
    question: "Uma aplicação tem picos de tráfego previsíveis. Como economizar com EC2?",
    options: [
      "Usar apenas On-Demand",
      "Reserved Instances para baseline + On-Demand para picos",
      "Apenas Spot Instances",
      "B (RI + On-Demand)"
    ],
    correctAnswer: 1,
    explanation: "Reserved Instances (1-3 anos) para carga baseline (até 72% desconto). On-Demand para picos imprevisíveis. Spot para workloads tolerantes a interrupção. Combinar tipos otimiza custo vs. disponibilidade.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 330,
    question: "Uma aplicação usa RDS Multi-AZ. Qual é o RTO (Recovery Time Objective) em caso de falha da AZ primária?",
    options: [
      "Horas",
      "Minutos (1-2 minutos típico)",
      "Segundos",
      "B (1-2 minutos)"
    ],
    correctAnswer: 1,
    explanation: "RDS Multi-AZ: failover automático em 1-2 minutos quando AZ primária falha. Sincronous replication para standby. DNS automaticamente aponta para standby. RPO ~0 (sem perda de dados). Read Replicas não fazem failover automático.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 331,
    question: "Uma aplicação usa ElastiCache Redis. Como melhorar disponibilidade cross-AZ?",
    options: [
      "Redis Cluster Mode com multiple shards e replicas em AZs diferentes",
      "Single node",
      "Backup apenas",
      "A (Cluster Mode multi-AZ)"
    ],
    correctAnswer: 0,
    explanation: "Redis Cluster Mode: múltiplos shards (particionamento) e replicas (read scaling + HA). Distribuir replicas em múltiplas AZs. Failover automático. Memcached: multi-node mas sem replicação (usa client-side sharding).",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 332,
    question: "Qual serviço AWS permite análise de performance de queries SQL em RDS?",
    options: [
      "CloudWatch Metrics",
      "RDS Performance Insights",
      "X-Ray",
      "B (Performance Insights)"
    ],
    correctAnswer: 1,
    explanation: "RDS Performance Insights: visualiza database load, top SQL queries, wait events. Identifica bottlenecks. CloudWatch tem métricas básicas (CPU, connections). Enhanced Monitoring: métricas OS-level. Combinar todos para visão completa.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 333,
    question: "Uma empresa precisa auditar todas as chamadas de API na conta AWS. Qual serviço deve ativar?",
    options: [
      "CloudWatch Logs",
      "AWS CloudTrail",
      "Config",
      "B (CloudTrail)"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail registra todas API calls (console, CLI, SDK) na conta. Logs entregues para S3. Integra com CloudWatch Logs para alertas. Config monitora configurações de recursos. GuardDuty detecta threats. CloudTrail é essencial para compliance.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 334,
    question: "Uma aplicação usa Lambda que processa milhões de eventos/dia. Como reduzir custos?",
    options: [
      "Aumentar memória",
      "Reduzir memória e otimizar código para executar mais rápido",
      "Usar EC2",
      "B (reduzir memória + otimizar)"
    ],
    correctAnswer: 1,
    explanation: "Lambda cobra por GB-second (memória x tempo). Reduzir memória e tempo de execução reduz custo. Atenção: menos memória pode aumentar tempo. Benchmark para achar sweet spot. Provisioned Concurrency para latência previsível (mais caro).",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 335,
    question: "Uma aplicação precisa processar imagens enviadas para S3. Qual arquitetura é mais resiliente?",
    options: [
      "S3 → Lambda → processo",
      "S3 → SQS → Lambda → processo",
      "S3 → EC2 polling",
      "B (S3 → SQS → Lambda)"
    ],
    correctAnswer: 1,
    explanation: "S3 event → SQS → Lambda: desacopla upload de processamento. SQS buffer protege Lambda de throttling. Dead Letter Queue para falhas. Retries automáticos. S3 direto para Lambda pode throttle com muitos uploads simultâneos.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 336,
    question: "Uma aplicação global usa Route 53 com health checks. Qual routing policy garante failover automático?",
    options: [
      "Simple",
      "Weighted",
      "Failover",
      "C (Failover)"
    ],
    correctAnswer: 2,
    explanation: "Failover routing: define primary e secondary. Health checks monitoram primary. Falha detectada → Route 53 roteia para secondary. Simple: sem health checks. Weighted/Latency: distribuem mas não fazem failover automático.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 337,
    question: "Uma aplicação usa CloudFront com S3. Como invalidar cache de arquivo específico imediatamente?",
    options: [
      "Aguardar TTL expirar",
      "Criar CloudFront invalidation",
      "Deletar distribuição",
      "B (invalidation)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront invalidation remove objetos do cache de edge locations. Útil para updates urgentes. Cobrado após 1000 invalidations/mês gratuitas. Alternativa: versionamento de arquivos (styles.v2.css) para cache busting.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 338,
    question: "Uma empresa precisa implementar MFA para acesso root account. Qual tipo de MFA é mais seguro?",
    options: [
      "SMS",
      "Virtual MFA (app)",
      "Hardware MFA device (U2F)",
      "C (Hardware U2F)"
    ],
    correctAnswer: 2,
    explanation: "Hardware MFA (U2F/FIDO): físico, mais seguro contra phishing. Virtual MFA (Google Authenticator): conveniente, secure. SMS: menos seguro (SIM swap). AWS recomenda MFA para root e IAM users privilegiados. Root account: usar minimamente.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 339,
    question: "Uma aplicação usa DynamoDB. Como reduzir custos de leitura para dados raramente acessados?",
    options: [
      "On-Demand apenas",
      "Provisioned Capacity com Auto Scaling",
      "DynamoDB Standard-IA (Infrequent Access)",
      "C (Standard-IA)"
    ],
    correctAnswer: 2,
    explanation: "DynamoDB Standard-IA: storage mais barato, read/write mais caros. Ideal para dados raramente acessados. DynamoDB automaticamente move dados entre Standard e IA. On-Demand: paga por request (caro para alto volume). Provisioned: previsível.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 340,
    question: "Uma aplicação precisa de mensageria com garantia de ordem FIFO. Qual serviço usar?",
    options: [
      "SQS Standard",
      "SQS FIFO",
      "SNS",
      "B (SQS FIFO)"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO: ordem garantida (First-In-First-Out), exactly-once processing. Throughput: 300 msg/s (3000 com batching). Message Group ID para paralelizar. SQS Standard: ordem best-effort, unlimited throughput. SNS: pub/sub sem ordem garantida.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 341,
    question: "Uma aplicação usa API Gateway. Como reduzir latência e custos de backend?",
    options: [
      "Aumentar timeout",
      "API Gateway caching",
      "Mais Lambda memory",
      "B (caching)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway caching: armazena responses por TTL configurável (300s default, max 3600s). Reduz chamadas ao backend e latência. Cobrado por cache size e requests. Invalidar cache: CacheKeyParameters ou flush completo.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 342,
    question: "Uma empresa precisa detectar configurações inseguras de recursos AWS automaticamente. Qual serviço usar?",
    options: [
      "CloudTrail",
      "AWS Config Rules",
      "GuardDuty",
      "B (Config Rules)"
    ],
    correctAnswer: 1,
    explanation: "AWS Config Rules: avalia continuamente configurações contra regras (managed ou custom). Ex: S3 buckets públicos, SG com 0.0.0.0/0. Remediação automática com Systems Manager. CloudTrail: logs API. GuardDuty: threat detection.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 343,
    question: "Uma aplicação usa S3 para backups. Como automatizar transição para Glacier após 90 dias?",
    options: [
      "Lambda agendado",
      "S3 Lifecycle Policy",
      "Manual",
      "B (Lifecycle)"
    ],
    correctAnswer: 1,
    explanation: "S3 Lifecycle Policy: transições automáticas entre storage classes (S3 Standard → IA → Glacier → Deep Archive). Define rules por prefix/tag. Expiration para deletar automaticamente. Sem custo de gerenciamento. Lambda seria overhead desnecessário.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 344,
    question: "Uma aplicação multi-tier precisa de isolamento de rede. Qual estratégia de subnets usar?",
    options: [
      "Todas public",
      "Public subnet para web, private para app/db",
      "Todas private",
      "B (public web, private backend)"
    ],
    correctAnswer: 1,
    explanation: "Public subnets: web tier com Internet Gateway. Private subnets: app/db tiers sem acesso direto internet. NAT Gateway em public para private iniciar outbound. Security Groups controlam tráfego entre tiers. Bastion host para admin access.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 345,
    question: "Uma aplicação usa Aurora. Como escalar leituras globalmente com latência mínima?",
    options: [
      "Read Replicas na mesma região",
      "Aurora Global Database",
      "DynamoDB Global Tables",
      "B (Global Database)"
    ],
    correctAnswer: 1,
    explanation: "Aurora Global Database: replicação cross-region (latência <1s), até 5 regiões secundárias, 16 read replicas por região. Disaster recovery (RPO <1s, RTO <1min). Leituras locais reduzem latência global. DynamoDB Global Tables para NoSQL.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 346,
    question: "Uma aplicação Lambda precisa acessar RDS em VPC. Como configurar?",
    options: [
      "Lambda não suporta VPC",
      "Lambda VPC configuration com subnets e security groups",
      "RDS público",
      "B (Lambda VPC config)"
    ],
    correctAnswer: 1,
    explanation: "Lambda VPC: especifica subnets (private recomendado) e security groups. ENI criada para acesso VPC. RDS SG permite Lambda SG. Cold start aumenta (ENI creation). Lambda PrivateLink (Hyperplane) melhora performance. RDS público é inseguro.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 347,
    question: "Uma aplicação usa EC2 com workload variável mas previsível por hora do dia. Como otimizar custos?",
    options: [
      "On-Demand apenas",
      "Scheduled Reserved Instances",
      "Spot apenas",
      "B (Scheduled RI)"
    ],
    correctAnswer: 1,
    explanation: "Scheduled Reserved Instances: reserva capacidade para janelas de tempo recorrentes (ex: 9h-18h workdays). Desconto vs. On-Demand. Descontinuado pela AWS, alternativa: Savings Plans ou On-Demand com Auto Scaling schedule.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 348,
    question: "Uma aplicação precisa de file system compartilhado entre múltiplas instâncias EC2 Linux. Qual serviço usar?",
    options: [
      "EBS",
      "EFS",
      "S3",
      "B (EFS)"
    ],
    correctAnswer: 1,
    explanation: "EFS (Elastic File System): NFS compartilhado, múltiplas AZs, múltiplas EC2 simultâneas. Elástico, paga por uso. EBS: block storage, uma EC2 por vez (multi-attach limitado a específicos tipos). S3: object storage, não file system.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 349,
    question: "Uma aplicação usa CloudFront. Como servir conteúdo dinâmico com cache seletivo?",
    options: [
      "Desabilitar cache completamente",
      "Cache behaviors com TTL 0 para dynamic, TTL alto para static",
      "Usar apenas S3",
      "B (cache behaviors)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront cache behaviors: path patterns diferentes (/* vs. /api/*) com configurações distintas. Static: TTL alto. Dynamic: TTL 0 ou query string forwarding. Origin override headers (Cache-Control). Lambda@Edge para lógica complexa.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 350,
    question: "Uma empresa precisa garantir que dados em S3 nunca sejam deletados por 7 anos (compliance). Qual feature usar?",
    options: [
      "Versioning apenas",
      "S3 Object Lock em Compliance Mode",
      "Bucket policy",
      "B (Object Lock Compliance)"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Lock: WORM (Write-Once-Read-Many). Compliance Mode: nem root pode deletar durante retention period. Governance Mode: usuários com permissão especial podem deletar. Legal Hold: indefinido. Versioning obrigatório com Object Lock.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 351,
    question: "Uma aplicação usa DynamoDB com acesso previsível. Como reduzir custos?",
    options: [
      "On-Demand sempre",
      "Provisioned Capacity com Auto Scaling",
      "Reduzir storage",
      "B (Provisioned + Auto Scaling)"
    ],
    correctAnswer: 1,
    explanation: "Provisioned Capacity: pré-paga RCUs/WCUs (mais barato que On-Demand para uso consistente). Auto Scaling ajusta automaticamente. On-Demand: paga por request, ideal para tráfego imprevisível/spiky. Reserved Capacity: desconto adicional (1-3 anos).",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 352,
    question: "Uma aplicação precisa processar logs em tempo real de múltiplas fontes. Qual serviço usar?",
    options: [
      "S3 batch",
      "Kinesis Data Streams",
      "SQS",
      "B (Kinesis)"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Data Streams: real-time streaming (latência <1s), múltiplos consumers, replay de dados. Shards para throughput. Kinesis Firehose: delivery para S3/Redshift. SQS: mensageria, não streaming. Kafka alternativa (MSK).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 353,
    question: "Uma aplicação usa ALB. Como rotear requisições baseado em headers HTTP?",
    options: [
      "ALB não suporta",
      "ALB Listener Rules com host/path/header conditions",
      "Route 53",
      "B (Listener Rules)"
    ],
    correctAnswer: 1,
    explanation: "ALB Listener Rules: condições baseadas em path, host headers, HTTP headers, HTTP methods, query strings, source IP. Actions: forward, redirect, fixed response. Weighted target groups para canary deployment. NLB não tem layer 7 awareness.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 354,
    question: "Uma empresa precisa criptografar EBS volumes de todas EC2 automaticamente. Como enforçar?",
    options: [
      "Manual por instância",
      "AWS Config rule + remediation",
      "Não possível",
      "B (Config rule)"
    ],
    correctAnswer: 1,
    explanation: "AWS Config: rule 'encrypted-volumes' detecta EBS não criptografados. Systems Manager remediation cria snapshot, cria volume criptografado, troca. Alternativamente: SCP (Service Control Policy) bloqueia criação de EBS não criptografado. Account setting: EBS encryption by default.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 355,
    question: "Uma aplicação usa Auto Scaling. Qual métrica garante melhor responsividade para workload CPU-intensive?",
    options: [
      "NetworkIn",
      "CPUUtilization",
      "RequestCount",
      "B (CPUUtilization)"
    ],
    correctAnswer: 1,
    explanation: "Target tracking scaling policy com CPUUtilization para CPU-intensive. ALB RequestCountPerTarget para web apps. Custom metrics (CloudWatch) para lógica específica. Step scaling para múltiplos thresholds. Predictive scaling para padrões previsíveis.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 356,
    question: "Uma aplicação usa S3 com milhões de objetos pequenos. Como reduzir custos de armazenamento?",
    options: [
      "S3 Standard apenas",
      "S3 Intelligent-Tiering",
      "Deletar arquivos",
      "B (Intelligent-Tiering)"
    ],
    correctAnswer: 1,
    explanation: "S3 Intelligent-Tiering: move automaticamente objetos entre access tiers (Frequent, Infrequent, Archive) baseado em padrões de acesso. Sem taxas de retrieval. Pequena taxa de monitoring. Ideal para padrões desconhecidos. Lifecycle policies para padrões previsíveis.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 357,
    question: "Uma aplicação precisa garantir que mensagens SQS sejam processadas exatamente uma vez. Como configurar?",
    options: [
      "SQS Standard com idempotência na aplicação",
      "SQS FIFO",
      "SNS",
      "B (FIFO)"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO: exactly-once processing através de deduplication (5 minutos window). Content-based ou MessageDeduplicationId. SQS Standard: at-least-once delivery (pode duplicar). Aplicação sempre deve ser idempotente como best practice.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 358,
    question: "Uma aplicação usa RDS. Como automatizar backups cross-region para DR?",
    options: [
      "Manual snapshots",
      "Automated backups com snapshot copy para outra região",
      "Não possível",
      "B (snapshot copy)"
    ],
    correctAnswer: 1,
    explanation: "RDS automated backups: cria snapshots diários. Configurar snapshot copy para região secundária (automático). Aurora: usar Global Database para replicação contínua. Manual snapshots para pontos específicos. Retenção: 0-35 dias.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 359,
    question: "Uma aplicação API Gateway + Lambda tem latência alta no primeiro request (cold start). Como melhorar?",
    options: [
      "Aumentar Lambda memory",
      "Lambda Provisioned Concurrency",
      "Mais API Gateway throttling",
      "B (Provisioned Concurrency)"
    ],
    correctAnswer: 1,
    explanation: "Provisioned Concurrency: mantém Lambda instances warm (sem cold start). Cobra por instâncias provisionadas continuamente (mais caro). Alternatives: aumentar memory (init mais rápido), reduzir package size, usar runtime compiled (Go, Rust vs. interpreted).",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 360,
    question: "Uma empresa precisa garantir que apenas IPs corporativos acessem recursos AWS. Como implementar?",
    options: [
      "Security Groups com source IPs",
      "IAM policy condition com aws:SourceIp",
      "WAF",
      "B (IAM policy condition)"
    ],
    correctAnswer: 1,
    explanation: "IAM policy condition 'aws:SourceIp': restringe acesso por IP. SCP para aplicar organization-wide. Security Groups: para recursos VPC. WAF: para web apps (ALB/CloudFront). VPN/Direct Connect para acesso privado. Combinar múltiplas camadas.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 361,
    question: "Uma aplicação usa DynamoDB com queries frequentes por atributo não-key. Como otimizar?",
    options: [
      "Scan com filter",
      "Global Secondary Index (GSI) no atributo",
      "Mais RCUs",
      "B (GSI)"
    ],
    correctAnswer: 1,
    explanation: "GSI (Global Secondary Index): índice em atributo não-key, queries eficientes. RCUs/WCUs separados. LSI (Local Secondary Index): mesma partition key. Scan: lê toda tabela (ineficiente, caro). Query: usa partition key (eficiente).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 362,
    question: "Uma aplicação precisa de IP público estático para EC2. Qual solução usar?",
    options: [
      "Public IP (muda ao restart)",
      "Elastic IP",
      "Private IP apenas",
      "B (Elastic IP)"
    ],
    correctAnswer: 1,
    explanation: "Elastic IP: IP público estático, sobrevive stop/start. Associar/desassociar de instâncias. Cobrado quando não associado. Public IP: dinâmico, muda ao stop/start. NAT Gateway tem Elastic IP builtin. IPv6 para evitar necessidade de IPs públicos.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 363,
    question: "Uma aplicação usa Kinesis Data Streams. Como garantir processamento ordenado por customer ID?",
    options: [
      "Usar partition key = customer ID",
      "Ordenar no consumer",
      "Kinesis não garante ordem",
      "A (partition key)"
    ],
    correctAnswer: 0,
    explanation: "Kinesis partition key: determina shard. Mesma partition key → mesmo shard → ordem garantida dentro do shard. Múltiplos shards processam paralelamente. Enhanced fan-out consumers para throughput. Kinesis retém dados 24h-365 dias.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 364,
    question: "Uma aplicação precisa detectar vulnerabilidades em AMIs EC2. Qual serviço usar?",
    options: [
      "GuardDuty",
      "Amazon Inspector",
      "CloudTrail",
      "B (Inspector)"
    ],
    correctAnswer: 1,
    explanation: "Amazon Inspector: escaneia EC2/ECR/Lambda para vulnerabilities e network exposure. CVE assessment, CIS benchmarks. Integra com Security Hub. GuardDuty: threat detection (runtime). Systems Manager Patch Manager: patching.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 365,
    question: "Uma aplicação usa S3 com acesso frequente por 30 dias, depois raramente. Como otimizar custos automaticamente?",
    options: [
      "Manual move",
      "S3 Lifecycle policy: transition para IA após 30 dias",
      "Lambda scheduled",
      "B (Lifecycle policy)"
    ],
    correctAnswer: 1,
    explanation: "S3 Lifecycle policy: transitions automáticas (Standard → IA após 30 dias → Glacier após 90 → Deep Archive após 180). Expiration rules. Por prefix/tag. Intelligent-Tiering também funciona mas tem monitoring cost. Lifecycle é gratuito.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 366,
    question: "Uma aplicação multi-region precisa de database global com replicação <1s. Qual solução?",
    options: [
      "RDS Cross-Region Read Replica",
      "Aurora Global Database",
      "DynamoDB single region",
      "B (Aurora Global)"
    ],
    correctAnswer: 1,
    explanation: "Aurora Global Database: replicação cross-region <1s, 5 regiões secundárias, 16 read replicas/região. Failover <1 min. RDS read replicas: async (mais latência). DynamoDB Global Tables: multi-master, eventual consistency.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 367,
    question: "Uma aplicação usa Lambda que faz chamadas HTTP externas lentas. Como melhorar performance?",
    options: [
      "Aumentar memory apenas",
      "Aumentar memory + timeout, usar connection pooling",
      "Reduzir memory",
      "B (memory + timeout + pooling)"
    ],
    correctAnswer: 1,
    explanation: "Lambda performance: aumentar memory (mais CPU), aumentar timeout para operações lentas, connection pooling (reusar conexões HTTP). Async invoke para long-running. Step Functions para orchestration. Lambda não é ideal para long-running sync.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 368,
    question: "Uma empresa precisa auditar mudanças em configurações de Security Groups. Qual serviço usar?",
    options: [
      "CloudWatch",
      "AWS Config",
      "GuardDuty",
      "B (Config)"
    ],
    correctAnswer: 1,
    explanation: "AWS Config: registra configurações e mudanças de recursos ao longo do tempo. Config Rules detectam non-compliance. CloudTrail: logs API calls (quem fez mudança). Combinar Config (o que mudou) + CloudTrail (quem/quando) para auditoria completa.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 369,
    question: "Uma aplicação usa EC2 com EBS. Como garantir backups cross-region automaticamente?",
    options: [
      "Manual snapshots",
      "Data Lifecycle Manager com snapshot copy para outra região",
      "Não possível",
      "B (DLM snapshot copy)"
    ],
    correctAnswer: 1,
    explanation: "Data Lifecycle Manager (DLM): automatiza criação de EBS snapshots com schedule. Cross-region copy. Retenção automática. Tags para organizar. AMI backups também. AWS Backup: serviço centralizado para backups de múltiplos recursos.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 370,
    question: "Uma aplicação usa ALB com certificado SSL. Como renovar certificado automaticamente?",
    options: [
      "Manual upload",
      "AWS Certificate Manager (ACM) com auto-renewal",
      "Lambda scheduled",
      "B (ACM)"
    ],
    correctAnswer: 1,
    explanation: "ACM (Certificate Manager): provisiona e renova certificados SSL/TLS automaticamente (gratuito para ALB/CloudFront). Integra com Route 53 para DNS validation. Expira em 13 meses, renova 60 dias antes. Imported certificates: manual renewal.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 371,
    question: "Uma aplicação tem 1000 microservices. Como gerenciar service discovery dinamicamente?",
    options: [
      "Hardcode IPs",
      "AWS Cloud Map",
      "Route 53 apenas",
      "B (Cloud Map)"
    ],
    correctAnswer: 1,
    explanation: "AWS Cloud Map: service discovery para microservices (ECS/EKS/EC2). Registro automático via health checks. DNS ou API lookups. Route 53: DNS público. App Mesh: service mesh com Cloud Map integration. ECS Service Discovery usa Cloud Map.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 372,
    question: "Uma aplicação armazena logs sensíveis em CloudWatch. Como garantir criptografia?",
    options: [
      "CloudWatch não criptografa",
      "KMS key para CloudWatch Logs encryption",
      "Apenas HTTPS",
      "B (KMS encryption)"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch Logs: criptografia at-rest com KMS (CMK). Criptografia in-transit via HTTPS (padrão). Log group level encryption. IAM controls acesso. S3 export também criptografado. Encryption padrão usa AWS managed key.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 373,
    question: "Uma aplicação usa Lambda processando S3 events. Como evitar throttling com uploads massivos?",
    options: [
      "Aumentar Lambda concurrent executions",
      "S3 → SQS → Lambda com reserved concurrency",
      "Mais memory",
      "B (S3 → SQS → Lambda)"
    ],
    correctAnswer: 1,
    explanation: "S3 → SQS → Lambda: buffer desacopla. SQS queue absorve spikes. Lambda processa em ritmo controlado (batch size). Reserved concurrency limita Lambda para não consumir account limit. Dead letter queue para failures. S3 direct pode throttle.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 374,
    question: "Uma empresa precisa reduzir custos de NAT Gateway (tráfego alto). Qual alternativa?",
    options: [
      "Manter NAT Gateway",
      "NAT Instance em EC2 (menor custo mas menos gerenciado)",
      "Remover NAT",
      "B (NAT Instance)"
    ],
    correctAnswer: 1,
    explanation: "NAT Gateway: gerenciado, alta disponibilidade, caro ($/hour + $/GB). NAT Instance: EC2 com NAT, mais barato (instância pequena), menos disponível (single AZ), requer gerenciamento. VPC Endpoints (S3/DynamoDB) eliminam NAT para alguns serviços.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 375,
    question: "Uma aplicação precisa de database com schema flexível e queries complexas. Qual escolher?",
    options: [
      "RDS (relational)",
      "DocumentDB (MongoDB compatible)",
      "S3",
      "B (DocumentDB)"
    ],
    correctAnswer: 1,
    explanation: "DocumentDB: schema flexível (JSON), queries complexas, indexes. Compatível com MongoDB. RDS: schema rígido. DynamoDB: NoSQL key-value, queries limitadas (GSI/LSI). S3: object storage. Neptune: graph database. Escolha depende do access pattern.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 376,
    question: "Uma aplicação usa ECS Fargate. Como escalar automaticamente baseado em CPU?",
    options: [
      "Manual",
      "ECS Service Auto Scaling com CloudWatch CPU alarm",
      "Não possível",
      "B (Service Auto Scaling)"
    ],
    correctAnswer: 1,
    explanation: "ECS Service Auto Scaling: target tracking (CPU/memory/custom), step scaling, scheduled. Fargate auto-provision infraestrutura. EC2 launch type: cluster auto scaling também. Application Auto Scaling service. CloudWatch alarms trigger scaling.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 377,
    question: "Uma aplicação global usa CloudFront. Como rotear users para origin mais próximo?",
    options: [
      "CloudFront não suporta",
      "CloudFront com multiple origins e origin groups com failover",
      "Route 53 apenas",
      "B (multiple origins)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront multiple origins: cache behaviors por path, routing por geolocation headers. Origin Groups: primary/secondary failover. Lambda@Edge: custom routing logic. Route 53 geolocation antes CloudFront também funciona. Edge locations já servem cache próximo.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 378,
    question: "Uma empresa precisa detectar acessos anômalos à conta AWS. Qual serviço usar?",
    options: [
      "CloudTrail apenas",
      "Amazon GuardDuty",
      "Config",
      "B (GuardDuty)"
    ],
    correctAnswer: 1,
    explanation: "GuardDuty: threat detection usando ML (CloudTrail, VPC Flow Logs, DNS logs). Detecta: credential compromise, cryptocurrency mining, unusual API calls. Findings em Security Hub. Automação com EventBridge → Lambda. CloudTrail: logs, não análise.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 379,
    question: "Uma aplicação usa RDS com reads intensivos. Como escalar leituras sem mudar código?",
    options: [
      "Vertical scaling apenas",
      "Read Replicas com reader endpoint",
      "Mais iops",
      "B (Read Replicas)"
    ],
    correctAnswer: 1,
    explanation: "RDS Read Replicas: cópias async read-only, até 5 replicas. Reader endpoint load balances automaticamente. Aurora: até 15 replicas, reader endpoint builtin. Replica promotion para DR. ElastiCache para caching reduz load ainda mais.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 380,
    question: "Uma aplicação armazena secrets em código. Como melhorar segurança?",
    options: [
      "Environment variables",
      "AWS Secrets Manager ou Systems Manager Parameter Store",
      "S3",
      "B (Secrets Manager/Parameter Store)"
    ],
    correctAnswer: 1,
    explanation: "Secrets Manager: rotation automática, encryption KMS, versionamento, audit (CloudTrail). Parameter Store: secrets simples (SecureString), gratuito até 10k params. Nunca hardcode credentials. IAM roles para aplicações. Env vars melhor que código mas não ideal.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 381,
    question: "Uma aplicação usa DynamoDB com writes ocasionais de 100k itens. On-Demand ou Provisioned?",
    options: [
      "Provisioned sempre",
      "On-Demand (paga por request)",
      "Ambos iguais",
      "B (On-Demand)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB On-Demand: ideal para tráfego imprevisível/spiky (2x custo de Provisioned mas sem pre-provisioning). Writes ocasionais: On-Demand evita over-provisioning. Provisioned: previsível, pode usar Reserved Capacity (desconto). Auto Scaling Provisioned para middle ground.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 382,
    question: "Uma aplicação multi-AZ usa ALB. Como garantir health checks corretos?",
    options: [
      "ALB health check para target group",
      "CloudWatch alarm",
      "Manual monitoring",
      "A (ALB health check)"
    ],
    correctAnswer: 0,
    explanation: "ALB health check: HTTP/HTTPS path (ex: /health), interval (5-300s), timeout, healthy/unhealthy thresholds. Failed targets removidos de rotation. ECS/Auto Scaling integra com ALB health. CloudWatch alarms para métricas adicionais. Connection draining para graceful shutdown.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 383,
    question: "Uma aplicação usa API Gateway REST API. Como adicionar caching por query parameter?",
    options: [
      "API Gateway não suporta",
      "Enable caching e adicionar query parameters aos cache keys",
      "CloudFront apenas",
      "B (cache keys)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway caching: TTL 300-3600s, cache capacity (0.5-237 GB). Cache keys: path, query strings, headers. Invalidate cache por request ou flush. CloudFront na frente adiciona edge caching. Custo por GB e requests.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 384,
    question: "Uma aplicação precisa de encryption at-rest para EBS. Como habilitar para nova instância?",
    options: [
      "Manual por volume",
      "Launch instance com EBS encryption habilitado",
      "Não possível",
      "B (EBS encryption na launch)"
    ],
    correctAnswer: 1,
    explanation: "EBS encryption: especificar na criação do volume ou launch template. KMS key (AWS managed ou CMK). Snapshots de volumes encrypted são encrypted. Account setting: EBS encryption by default. Não pode criptografar volume existente (criar snapshot criptografado → volume).",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 385,
    question: "Uma aplicação usa Step Functions orquestrando Lambdas. Como reduzir custos de state transitions?",
    options: [
      "Express Workflows para high-volume workloads",
      "Standard Workflows sempre",
      "Remover Step Functions",
      "A (Express Workflows)"
    ],
    correctAnswer: 0,
    explanation: "Step Functions Express: high-volume (100k/s), at-least-once execution, max 5 min duration, cheaper ($/request vs. $/state transition). Standard: exactly-once, até 1 ano, mais caro mas auditável. Express para streaming/IoT. Standard para long-running workflows.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 386,
    question: "Uma aplicação usa S3 para website estático. Como melhorar disponibilidade cross-region?",
    options: [
      "Single region apenas",
      "S3 Cross-Region Replication + Route 53 failover",
      "Manual copy",
      "B (CRR + Route 53)"
    ],
    correctAnswer: 1,
    explanation: "S3 CRR (Cross-Region Replication): replica objetos automaticamente para bucket em outra região. Route 53 failover routing: primary/secondary buckets com health checks. CloudFront multi-region origin groups também funciona. Versioning obrigatório para CRR.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 387,
    question: "Uma aplicação Lambda precisa acessar internet e RDS em VPC privada. Qual configuração?",
    options: [
      "Lambda em public subnet",
      "Lambda em private subnet com NAT Gateway",
      "RDS público",
      "B (private + NAT)"
    ],
    correctAnswer: 1,
    explanation: "Lambda VPC em private subnet: acesso RDS via private IP. NAT Gateway em public subnet: permite Lambda acessar internet (outbound). Security Groups: Lambda → RDS permitted. Internet Gateway: não dá acesso direto para private subnet. VPC Endpoints para AWS services sem NAT.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 388,
    question: "Uma aplicação usa EC2 com predictable usage 24/7 por 3 anos. Qual pricing model?",
    options: [
      "On-Demand",
      "Reserved Instances (3 anos)",
      "Spot",
      "B (Reserved 3 anos)"
    ],
    correctAnswer: 1,
    explanation: "Reserved Instances: até 72% desconto vs. On-Demand (1 ou 3 anos). Standard RI: região específica. Convertible RI: troca instance type. Compute Savings Plans: flexível entre EC2/Fargate/Lambda. 3 anos + All Upfront = máximo desconto.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 389,
    question: "Uma aplicação usa Aurora. Como garantir zero downtime durante upgrades?",
    options: [
      "Blue/Green deployments",
      "Manual snapshot/restore",
      "Não possível",
      "A (Blue/Green)"
    ],
    correctAnswer: 0,
    explanation: "RDS/Aurora Blue/Green Deployments: cria clone do DB (green), aplica changes, testa, faz switchover (1 min downtime). Rollback rápido. Alternativa: criar read replica, promover para standalone, update DNS. Aurora zero-downtime patching para minor versions.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 390,
    question: "Uma aplicação usa DynamoDB com hot partition key. Como resolver?",
    options: [
      "Mais RCUs",
      "Usar write sharding (adicionar random suffix ao partition key)",
      "Mudar para RDS",
      "B (write sharding)"
    ],
    correctAnswer: 1,
    explanation: "Hot partition: um partition key recebe muito mais tráfego. Soluções: write sharding (suffix aleatório), composite keys, cache (DAX). DynamoDB distribui por partition key - design influencia performance. Partition key com high cardinality (muitos valores únicos) é ideal.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 391,
    question: "Uma aplicação precisa de auditoria completa de acessos a objetos S3. Como habilitar?",
    options: [
      "CloudWatch apenas",
      "S3 Server Access Logging + CloudTrail data events",
      "Não possível",
      "B (Access Logging + CloudTrail)"
    ],
    correctAnswer: 1,
    explanation: "S3 Server Access Logging: logs detalhados de requests para bucket. CloudTrail data events: logs API calls (GetObject, PutObject). Ambos complementares. CloudWatch metrics para alertas. Object Lock para compliance. Combinar para auditoria completa.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 392,
    question: "Uma aplicação usa ECS com tarefas de longa duração (12 horas). Fargate ou EC2?",
    options: [
      "Fargate (mais caro)",
      "EC2 Spot (mais barato para long-running)",
      "Ambos iguais",
      "B (EC2 Spot)"
    ],
    correctAnswer: 1,
    explanation: "ECS EC2: controla instâncias, pode usar Spot (até 90% desconto) para long-running fault-tolerant. Fargate: serverless, conveniente mas mais caro (cobra por vCPU-hour + GB-hour). Fargate Spot: desconto mas pode interromper. EC2 com Spot placement score.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 393,
    question: "Uma aplicação multi-tier precisa isolar tráfego entre tiers. Qual solução?",
    options: [
      "Security Groups com rules source = outro SG",
      "NACL apenas",
      "Todos na mesma subnet",
      "A (SG com SG source)"
    ],
    correctAnswer: 0,
    explanation: "Security Groups: stateful, permite referenciar outro SG como source (ex: app tier SG permite web tier SG). NACL: stateless, subnet-level (backup defense). Micro-segmentation: cada tier em SG separado. Private subnets para backend tiers.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 394,
    question: "Uma aplicação usa Lambda com RDS connection pooling. Como gerenciar conexões?",
    options: [
      "Lambda cria conexão por invocation",
      "RDS Proxy",
      "Aumentar RDS max_connections",
      "B (RDS Proxy)"
    ],
    correctAnswer: 1,
    explanation: "RDS Proxy: connection pooling para Lambda, reduz connection overhead, failover automático (35s), IAM authentication. Lambda high concurrency pode esgotar RDS connections. Proxy multiplexes connections. Aurora Serverless v2 também escala automaticamente.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 395,
    question: "Uma aplicação armazena dados PII em S3. Como garantir compliance com encryption?",
    options: [
      "Não criptografar",
      "S3 SSE-S3, SSE-KMS ou SSE-C",
      "Apenas HTTPS",
      "B (SSE)"
    ],
    correctAnswer: 1,
    explanation: "S3 encryption: SSE-S3 (AWS managed), SSE-KMS (CMK, audit), SSE-C (client provided key). Bucket policy: deny PutObject sem encryption. Default encryption para bucket. Client-side encryption para controle total. HTTPS encrypts in-transit.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 396,
    question: "Uma aplicação usa Auto Scaling com múltiplos AZs. Como garantir distribuição balanceada?",
    options: [
      "Manual placement",
      "Auto Scaling AZRebalance process habilitado",
      "Apenas 1 AZ",
      "B (AZRebalance)"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling AZRebalance: monitora distribuição entre AZs, lança instâncias em AZs com menos instâncias, termina em AZs com mais. Launch template: lista de AZs. Múltiplas AZs para HA. Scheduled actions para eventos previsíveis.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 397,
    question: "Uma aplicação usa CloudFront com S3. Como prevenir acesso direto ao S3?",
    options: [
      "Bucket público",
      "Origin Access Identity (OAI) ou Origin Access Control (OAC)",
      "Não possível",
      "B (OAI/OAC)"
    ],
    correctAnswer: 1,
    explanation: "OAI (Origin Access Identity) ou OAC (Origin Access Control - mais novo): CloudFront assume identidade especial, S3 bucket policy permite apenas essa identidade. Bucket fica privado. OAC suporta SSE-KMS encryption. Signed URLs/cookies para conteúdo privado.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 398,
    question: "Uma aplicação usa Lambda processando SQS. Como escalar processamento automaticamente?",
    options: [
      "Lambda não escala",
      "Lambda event source mapping escala automaticamente baseado em queue depth",
      "Manual scaling",
      "B (auto scaling)"
    ],
    correctAnswer: 1,
    explanation: "Lambda + SQS event source mapping: Lambda polls SQS, escala automaticamente até concurrency limit ou queue vazia. Batch size: 1-10. Max concurrency: 1000 (pode aumentar com quota request). Dead letter queue para failures. Visibility timeout > Lambda timeout.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 399,
    question: "Uma aplicação usa EC2 com EBS. Como migrar para instância maior sem downtime?",
    options: [
      "Stop, change instance type, start (downtime)",
      "Create AMI, launch novo instance type, migrate traffic (menos downtime)",
      "Não possível",
      "B (AMI migration)"
    ],
    correctAnswer: 1,
    explanation: "Zero downtime migration: criar AMI, launch nova instância (tipo maior), testar, adicionar ao ALB, remover antiga. Alternativamente: snapshot EBS, launch new. Stop/start instance muda instance type (downtime). Auto Scaling facilita rolling updates.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 400,
    question: "Uma aplicação usa API Gateway com Lambda. Como reduzir custos de invocações Lambda?",
    options: [
      "Não há como reduzir",
      "API Gateway caching + Lambda batching",
      "Mais timeout",
      "B (caching + batching)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway caching: reduz invocações Lambda para respostas idênticas. Lambda batching: processar múltiplos itens por invocação. Provisioned Concurrency: elimina cold start mas mais caro. Otimizar código: menos tempo = menos custo. Lambda free tier: 1M requests/mês.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 401,
    question: "Uma aplicação precisa de notificação quando RDS storage fica baixo. Como configurar?",
    options: [
      "CloudWatch alarm para FreeStorageSpace metric",
      "Manual monitoring",
      "Não possível",
      "A (CloudWatch alarm)"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch alarm: métrica 'FreeStorageSpace', threshold (ex: <10%), SNS notification. RDS storage auto-scaling: aumenta automaticamente. Enhanced Monitoring: métricas detalhadas. CloudWatch Events para RDS events (backup, failover). Combinar alarmes preventivos.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 402,
    question: "Uma aplicação usa DynamoDB com leituras eventually consistent. Como mudar para strongly consistent?",
    options: [
      "Mudar table type",
      "Especificar ConsistentRead=true no GetItem/Query",
      "Não possível",
      "B (ConsistentRead flag)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB consistency: eventual (padrão, metade do custo) ou strong (ConsistentRead=true, 2x custo). GetItem/Query/Scan suportam. Strong: lê mais recente, maior latência. Eventual: pode ser stale por segundos. GSI: apenas eventual. Transações: strong.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 403,
    question: "Uma empresa precisa bloquear ataques DDoS Layer 7 (HTTP flood). Qual serviço usar?",
    options: [
      "Security Groups",
      "AWS Shield Advanced + WAF",
      "NACL",
      "B (Shield Advanced + WAF)"
    ],
    correctAnswer: 1,
    explanation: "AWS Shield: Standard (gratuito, Layer 3/4 protection) e Advanced (Layer 7, DDoS Response Team, cost protection). WAF: regras custom para HTTP attacks (rate limiting, geo-blocking). CloudFront + Shield + WAF = proteção completa. Security Groups: instância-level.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 404,
    question: "Uma aplicação usa Kinesis Data Firehose para delivery S3. Como transformar dados antes de salvar?",
    options: [
      "Firehose não transforma",
      "Lambda transformation function",
      "ETL separado",
      "B (Lambda transform)"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Firehose: Lambda transformation (data format conversion, enrichment, filtering). Delivery para S3/Redshift/Elasticsearch/HTTP. Compression (GZIP), encryption. Buffer size/interval. Failed records para S3 backup. Near real-time (60s buffer min).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 405,
    question: "Uma aplicação usa EC2 em Auto Scaling. Como garantir graceful shutdown antes de terminar?",
    options: [
      "Immediate termination",
      "Lifecycle hooks + script para graceful shutdown",
      "Não possível",
      "B (lifecycle hooks)"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling lifecycle hooks: pause antes de terminate, executa script (drain connections, save state), completa lifecycle. CloudWatch Events + Lambda para automation. Termination policies: OldestInstance, NewestInstance, ClosestToNextInstanceHour (cost optimization).",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 406,
    question: "Uma aplicação usa S3. Como garantir que objetos sejam imutáveis por período definido?",
    options: [
      "Versioning apenas",
      "S3 Object Lock com retention period",
      "Bucket policy",
      "B (Object Lock)"
    ],
    correctAnswer: 1,
    explanation: "S3 Object Lock: WORM (Write-Once-Read-Many). Retention period (dias/anos) em Compliance (nem root deleta) ou Governance mode. Legal hold: indefinido até remover. Versioning obrigatório. Use case: compliance (SEC, FINRA).",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 407,
    question: "Uma aplicação usa Lambda com dependências grandes (500MB). Como otimizar cold start?",
    options: [
      "Nada a fazer",
      "Lambda Layers + container image + Provisioned Concurrency",
      "Reduzir memory",
      "B (Layers + container)"
    ],
    correctAnswer: 1,
    explanation: "Lambda cold start optimization: Layers para bibliotecas comuns (compartilhadas entre functions), container image para >250MB, Provisioned Concurrency (warm instances), usar runtime compilado (Go, Rust), minify code, remove unused dependencies.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 408,
    question: "Uma aplicação multi-account precisa de billing consolidado. Como configurar?",
    options: [
      "Contas separadas",
      "AWS Organizations com consolidated billing",
      "Manual merge",
      "B (Organizations)"
    ],
    correctAnswer: 1,
    explanation: "AWS Organizations: agrupa accounts, consolidated billing (single bill, volume discounts), Service Control Policies (SCPs) para governance. OU (Organizational Units) para hierarquia. Cost allocation tags. Reserved Instance sharing cross-account.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 409,
    question: "Uma aplicação usa RDS. Como escalar write capacity sem downtime?",
    options: [
      "Vertical scaling (downtime)",
      "Sharding ou migrar para Aurora Serverless",
      "Read Replicas (apenas reads)",
      "B (sharding/Aurora)"
    ],
    correctAnswer: 1,
    explanation: "RDS write scaling: vertical (maior instance, downtime), sharding (application-level, múltiplos DBs), migrar para Aurora (escala automaticamente). Multi-AZ não escala writes. Read replicas: reads apenas. DynamoDB/Cassandra para horizontal write scaling.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 410,
    question: "Uma aplicação precisa detectar malware em arquivos uploaded para S3. Qual solução?",
    options: [
      "Manual scan",
      "S3 event → Lambda → antivirus scan (ClamAV ou third-party)",
      "Não possível",
      "B (Lambda antivirus)"
    ],
    correctAnswer: 1,
    explanation: "S3 malware scanning: S3 event → Lambda → antivirus (ClamAV open-source ou commercial solutions). Quarantine bucket para infected files. SNS notification. Third-party: Trend Micro, McAfee integrations. GuardDuty para runtime threat detection.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 411,
    question: "Uma aplicação usa ECS com tasks que precisam de IP público persistente. Como configurar?",
    options: [
      "Fargate não suporta",
      "ECS awsvpc network mode + Elastic IP (limitado)",
      "NAT apenas",
      "B (awsvpc + EIP)"
    ],
    correctAnswer: 1,
    explanation: "ECS awsvpc mode: cada task tem ENI próprio. Elastic IP: pode associar para IP público persistente (complexo, limitações). Alternativa: NAT Gateway (IP persistente, outbound) + ALB/NLB (inbound). Fargate: public IP efêmero ou usar NAT.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 412,
    question: "Uma aplicação usa CloudWatch Logs com retenção indefinida. Como reduzir custos?",
    options: [
      "Manter indefinido",
      "Definir retention period + exportar para S3 Glacier",
      "Deletar logs",
      "B (retention + S3)"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch Logs: cobra por GB stored. Retention period (1 dia-10 anos ou indefinido). Exportar logs antigos para S3 (muito mais barato) + Glacier/Deep Archive. Logs Insights para queries. Athena para S3 archived logs. Sampling para reduzir volume.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 413,
    question: "Uma aplicação usa API Gateway REST. Como migrar para HTTP API (mais barato)?",
    options: [
      "Não migrar",
      "Criar HTTP API, migrar endpoints gradualmente, testar",
      "Não possível",
      "B (gradual migration)"
    ],
    correctAnswer: 1,
    explanation: "HTTP API: até 71% mais barato que REST, mais performático (latência menor). Features: JWT, CORS, OpenID. REST tem mais features (caching, request validation, SDK generation). HTTP API ideal para proxy simples Lambda/HTTP backends. Migração: criar novo, test, cutover.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 414,
    question: "Uma aplicação multi-region precisa de failover automático com health checks. Qual Route 53 policy?",
    options: [
      "Simple",
      "Failover routing policy",
      "Geolocation",
      "B (Failover)"
    ],
    correctAnswer: 1,
    explanation: "Route 53 Failover: primary/secondary records, health checks (endpoint, CloudWatch alarm, calculated), failover automático quando primary unhealthy. Latency/geolocation para performance. Weighted para canary. Combinar: failover + latency para multi-region HA.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 415,
    question: "Uma aplicação usa Lambda que processa imagens grandes (10MB). Como otimizar?",
    options: [
      "Lambda apenas",
      "Lambda com EFS para storage temporário",
      "EC2",
      "B (Lambda + EFS)"
    ],
    correctAnswer: 1,
    explanation: "Lambda /tmp: 512MB-10GB storage temporário (configurável). EFS mount: persistent storage, compartilhado entre invocations. Para processamento pesado: Fargate/ECS (sem time limit). Lambda max payload: 6MB sync, 256KB async. S3 pre-signed URLs para uploads grandes.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 416,
    question: "Uma aplicação usa DynamoDB. Como implementar TTL (Time To Live) para expirar itens automaticamente?",
    options: [
      "Lambda scheduled delete",
      "DynamoDB TTL attribute (epoch timestamp)",
      "Manual deletion",
      "B (TTL attribute)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB TTL: atributo com epoch timestamp, itens expirados deletados automaticamente (background, até 48h após expiration). Sem custo adicional. DynamoDB Streams captura deletions para processamento. Use case: session data, logs temporários, cache expiration.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 417,
    question: "Uma aplicação usa EKS. Como fornecer credenciais AWS para pods sem hardcode?",
    options: [
      "Environment variables",
      "IAM Roles for Service Accounts (IRSA)",
      "Secrets em ConfigMap",
      "B (IRSA)"
    ],
    correctAnswer: 1,
    explanation: "IRSA (IAM Roles for Service Accounts): associa IAM role a Kubernetes service account, pods assumem role automaticamente. OIDC provider + trust relationship. Sem credentials em código/env. EKS Pod Identity (mais novo) simplifica. Alternative: kube2iam, kiam (third-party).",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 418,
    question: "Uma aplicação usa Aurora. Como melhorar performance de queries analíticas sem impactar OLTP?",
    options: [
      "Mais IOPS",
      "Aurora Read Replica ou migrar para Redshift",
      "Bigger instance",
      "B (Read Replica/Redshift)"
    ],
    correctAnswer: 1,
    explanation: "Aurora Read Replica: offload analytical queries (até 15 replicas). Redshift: data warehouse para analytics complexos (columnar storage). Aurora parallel query: melhora analíticos sem replica. Athena para S3 data lakes. Separar OLTP (Aurora) e OLAP (Redshift) workloads.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 419,
    question: "Uma aplicação precisa de encryption in-transit entre EC2 e RDS. Como garantir?",
    options: [
      "SSL/TLS connection com force_ssl parameter",
      "Não possível",
      "Security Groups",
      "A (SSL/TLS)"
    ],
    correctAnswer: 0,
    explanation: "RDS encryption in-transit: SSL/TLS connection (application configura). RDS parameter group: rds.force_ssl=1 (obriga SSL). Certificate validation para evitar MITM. Encryption at-rest: KMS. Security Groups: network-level, não criptografa dados.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 420,
    question: "Uma aplicação usa S3 com uploads diretos do browser. Como permitir uploads seguros?",
    options: [
      "Bucket público",
      "S3 pre-signed POST URLs com expiration",
      "Sem autenticação",
      "B (pre-signed POST)"
    ],
    correctAnswer: 1,
    explanation: "S3 pre-signed URLs: backend gera URL assinada temporária (expiration), client faz upload direto para S3. POST policy: define condições (size, content-type). Evita backend proxy (saves bandwidth). CORS configuration obrigatória para browser. STS temporary credentials alternativa.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 421,
    question: "Uma aplicação usa SQS Standard com processamento idempotente. Como reduzir custos?",
    options: [
      "SQS FIFO (mais caro)",
      "Long polling (reduz empty receives)",
      "Mais API calls",
      "B (long polling)"
    ],
    correctAnswer: 1,
    explanation: "SQS long polling: ReceiveMessage espera até mensagem chegar (1-20s), reduz empty receives (cobrados). Short polling: retorna imediatamente. Batch operations: SendMessageBatch, DeleteMessageBatch. ReceiveMessage max 10 messages por call. Visibility timeout otimização.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 422,
    question: "Uma aplicação usa Auto Scaling. Como garantir que instâncias novas estejam prontas antes de receber tráfego?",
    options: [
      "Immediate",
      "ELB health check grace period",
      "Não possível",
      "B (health check grace period)"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling health check grace period: tempo antes de iniciar health checks (300s default). Instância tem tempo para boot, app start. ALB target group health checks: determine readiness. User data script: signal CloudFormation quando ready. Connection draining para remoção graceful.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 423,
    question: "Uma aplicação usa CloudFront com origem ALB. Como permitir apenas CloudFront acessar ALB?",
    options: [
      "ALB público",
      "ALB Security Group permite apenas CloudFront IPs + custom header verification",
      "Não possível",
      "B (SG + custom header)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront → ALB security: SG permite CloudFront managed prefix list (AWS IPs). Custom header secret (CloudFront Origin custom headers → ALB verifica). WAF para extra validation. S3: usa OAI/OAC. CloudFront IPs em managed prefix list (atualizado automaticamente).",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 424,
    question: "Uma aplicação usa Lambda com múltiplos ambientes (dev/prod). Como gerenciar configurações?",
    options: [
      "Hardcode",
      "Lambda environment variables + Systems Manager Parameter Store",
      "Código duplicado",
      "B (env vars + Parameter Store)"
    ],
    correctAnswer: 1,
    explanation: "Lambda environment variables: configurações simples, encrypted com KMS. Parameter Store: configs complexas, secrets, versionamento, hierarchical (/dev/, /prod/). Secrets Manager: rotation automática. Lambda alias/versions para múltiplos ambientes. Infrastructure as Code (CDK/SAM/Terraform) para deployment.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 425,
    question: "Uma aplicação multi-region precisa de database global com multi-master writes. Qual solução?",
    options: [
      "Aurora Global (single master)",
      "DynamoDB Global Tables",
      "RDS read replicas",
      "B (DynamoDB Global Tables)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Global Tables: multi-region, multi-master, active-active writes em todas regiões. Replicação <1s, conflict resolution (last-writer-wins). Aurora Global: single master (writes em primary, reads em secondary). Aurora multi-master (single region deprecated).",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 426,
    question: "Uma aplicação usa S3 com compliance requirement de 99.999999999% durability. Qual storage class?",
    options: [
      "S3 Standard apenas",
      "S3 qualquer class (todas 11 nines durability)",
      "Glacier apenas",
      "B (qualquer class)"
    ],
    correctAnswer: 1,
    explanation: "Todas S3 storage classes têm 11 nines (99.999999999%) durability. Diferença: availability e custo. Standard: 99.99% availability. One Zone-IA: 99.5%. Glacier: minutos-horas retrieval. Escolha baseada em access pattern e custo.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 427,
    question: "Uma aplicação usa EC2 com workload batch preemptible. Qual tipo de instância usar?",
    options: [
      "On-Demand",
      "Spot Instances",
      "Reserved",
      "B (Spot)"
    ],
    correctAnswer: 1,
    explanation: "Spot Instances: até 90% desconto, pode ser interrompido (2 min warning). Ideal para: batch processing, data analysis, fault-tolerant workloads. Spot Fleet: mix de instance types. Spot placement score: probabilidade de interrupção. Checkpointing para recovery.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 428,
    question: "Uma aplicação usa API Gateway com backend latency variável. Como evitar timeout errors?",
    options: [
      "Aumentar API Gateway timeout (max 29s)",
      "Async processing: API aceita, processa em background (Lambda async, SQS)",
      "Reduzir timeout",
      "B (async processing)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway timeout: max 29s (limite fixo). Workloads >29s: usar async pattern (API retorna job ID, client polls status), Step Functions para orchestration, SQS + Lambda. WebSockets para real-time updates. ALB timeout: 4000s.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 429,
    question: "Uma aplicação precisa de compliance com criptografia FIPS 140-2. Como configurar S3?",
    options: [
      "S3 não suporta",
      "FIPS endpoints + SSE-KMS com CloudHSM",
      "SSE-S3 apenas",
      "B (FIPS + KMS CloudHSM)"
    ],
    correctAnswer: 1,
    explanation: "FIPS 140-2 compliance: usar FIPS endpoints (fips.s3.amazonaws.com), SSE-KMS com CloudHSM (Level 3). CloudHSM: hardware security module dedicado. KMS padrão: FIPS 140-2 Level 2. Client-side encryption com FIPS-validated libraries.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 430,
    question: "Uma aplicação usa RDS PostgreSQL. Como implementar read scaling com lag mínimo?",
    options: [
      "Read Replicas (async, lag)",
      "Aurora com reader endpoint (lag <100ms típico)",
      "Vertical scaling",
      "B (Aurora)"
    ],
    correctAnswer: 1,
    explanation: "Aurora: replicação shared storage (lag mínimo <100ms), até 15 read replicas, reader endpoint auto-balancing. RDS read replicas: async (segundos lag), até 5 replicas. Aurora Serverless v2: auto-scaling. ElastiCache para cache layer (zero lag mas eventual).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 431,
    question: "Uma aplicação usa Lambda. Como compartilhar código comum entre múltiplas functions?",
    options: [
      "Duplicar código",
      "Lambda Layers",
      "Não possível",
      "B (Layers)"
    ],
    correctAnswer: 1,
    explanation: "Lambda Layers: bibliotecas compartilhadas, versionadas, até 5 layers/function, max 250MB unzipped total. Use cases: shared libraries, dependencies, custom runtimes. Deploy layer separadamente. Reduz package size e deployment time.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 432,
    question: "Uma aplicação usa CloudTrail. Como garantir que logs não sejam modificados ou deletados?",
    options: [
      "Bucket público",
      "S3 bucket com MFA Delete + Object Lock + restrictive bucket policy",
      "Apenas bucket policy",
      "B (MFA Delete + Object Lock)"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail log protection: S3 bucket com MFA Delete (requer MFA para deletar), Object Lock Compliance mode (WORM), bucket policy deny delete sem MFA, CloudTrail log validation (detect tampering), cross-region backup. CloudWatch Logs para monitoring.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 433,
    question: "Uma aplicação usa DynamoDB com acesso global. Como reduzir latência cross-region?",
    options: [
      "Single region",
      "DynamoDB Global Tables com replicas em múltiplas regiões",
      "CloudFront",
      "B (Global Tables)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Global Tables: multi-region, multi-master, replicação <1s. Local reads/writes em cada região (baixa latência). Conflict resolution automático. DAX (cache) para latência sub-millisecond. CloudFront: para static content apenas.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 434,
    question: "Uma aplicação usa EC2 Auto Scaling. Como escalar preventivamente antes de picos conhecidos?",
    options: [
      "Reactive scaling apenas",
      "Scheduled scaling actions",
      "Não possível",
      "B (scheduled scaling)"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling scheduled actions: define capacidade por schedule (cron). Use case: picos previsíveis (Black Friday, business hours). Predictive scaling: usa ML para prever e escalar. Target tracking: reactive. Combinar scheduled + target tracking.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 435,
    question: "Uma aplicação usa S3 com requisitos de compliance para retenção de 10 anos. Como implementar?",
    options: [
      "Manual management",
      "S3 Object Lock retention mode + Lifecycle transition para Glacier Deep Archive",
      "Deletar após 10 anos",
      "B (Object Lock + Glacier)"
    ],
    correctAnswer: 1,
    explanation: "Compliance retenção: S3 Object Lock (10 anos retention), Lifecycle transition para Glacier Deep Archive após X dias (mais barato). Compliance mode: nem root pode deletar. Vault Lock para Glacier. Legal hold para indefinido. MFA Delete como proteção extra.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 436,
    question: "Uma aplicação usa Lambda atrás de ALB. Como implementar canary deployment?",
    options: [
      "Deploy tudo de uma vez",
      "ALB weighted target groups + Lambda aliases",
      "Não possível",
      "B (weighted target groups)"
    ],
    correctAnswer: 1,
    explanation: "Canary deployment: ALB weighted target groups (90% prod version, 10% new version), Lambda aliases ($LATEST, versioned), gradual traffic shift. CodeDeploy para automation. CloudWatch metrics para monitoring. Rollback rápido se errors.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 437,
    question: "Uma aplicação usa RDS com backups. Como garantir backups em região diferente para DR?",
    options: [
      "Backups single region",
      "Automated backup snapshot copy para região secundária",
      "Manual apenas",
      "B (snapshot copy)"
    ],
    correctAnswer: 1,
    explanation: "RDS cross-region DR: automated backups com snapshot copy automático para região secundária. Aurora: usar Global Database (replicação contínua). RPO: último snapshot. RTO: restore time. Retention: 0-35 dias. AWS Backup para centralização.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 438,
    question: "Uma aplicação usa CloudFront. Como servir conteúdo diferente por país (geo-restriction)?",
    options: [
      "CloudFront não suporta",
      "CloudFront geo-restriction (whitelist/blacklist) + Lambda@Edge para custom logic",
      "Route 53 apenas",
      "B (geo-restriction + Lambda@Edge)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront geo-restriction: whitelist/blacklist países (compliance). Lambda@Edge: custom logic viewer-request (redirect, rewrite URL, serve different content). CloudFront-Viewer-Country header. WAF geo-blocking. Route 53 geolocation para routing.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 439,
    question: "Uma aplicação usa ECS Fargate com custos altos. Como otimizar?",
    options: [
      "Manter Fargate",
      "Fargate Spot (70% desconto) para fault-tolerant + rightsizing tasks",
      "Só EC2",
      "B (Fargate Spot + rightsizing)"
    ],
    correctAnswer: 1,
    explanation: "Fargate cost optimization: Fargate Spot (até 70% desconto, pode interromper), rightsizing (CPU/memory adequados), Graviton2 (20% cheaper), Savings Plans. Comparar com ECS EC2 + Spot para long-running. CloudWatch Container Insights para métricas.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 440,
    question: "Uma aplicação usa DynamoDB com queries que retornam muitos itens. Como paginar eficientemente?",
    options: [
      "Retornar tudo",
      "Usar LastEvaluatedKey para pagination",
      "Múltiplas queries",
      "B (LastEvaluatedKey)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB pagination: Query/Scan retorna max 1MB, LastEvaluatedKey indica mais itens. Client envia ExclusiveStartKey=LastEvaluatedKey para próxima página. Limit parameter: controla items/page. FilterExpression aplicado após read (não reduz RCUs). Parallel scan para throughput.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 441,
    question: "Uma aplicação precisa de DNS privado para recursos em VPC. Qual solução?",
    options: [
      "Route 53 public hosted zone",
      "Route 53 private hosted zone associada à VPC",
      "Sem DNS",
      "B (private hosted zone)"
    ],
    correctAnswer: 1,
    explanation: "Route 53 private hosted zone: DNS interno para VPC, não resolvível publicamente. Associar múltiplas VPCs (mesma ou cross-account). VPC DNS resolution habilitado. Use case: service discovery, internal APIs. Resolver endpoint para hybrid (on-prem ↔ VPC).",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 442,
    question: "Uma aplicação usa Lambda com invocações síncronas frequentes. Como melhorar performance?",
    options: [
      "Aumentar memory apenas",
      "Provisioned Concurrency + aumentar memory",
      "Timeout maior",
      "B (Provisioned Concurrency + memory)"
    ],
    correctAnswer: 1,
    explanation: "Lambda sync performance: Provisioned Concurrency (elimina cold start), aumentar memory (mais CPU, faster execution). Otimizar código, minify dependencies, connection pooling. Async invocation para workloads tolerantes. SQS para decoupling. Monitoring: CloudWatch duration/cold start metrics.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 443,
    question: "Uma aplicação armazena PII em RDS. Como auditar todos os acessos?",
    options: [
      "Não possível",
      "RDS Database Activity Streams (Kinesis) + Lake Formation",
      "CloudTrail apenas",
      "B (Database Activity Streams)"
    ],
    correctAnswer: 1,
    explanation: "RDS Database Activity Streams: near real-time audit (Aurora/RDS), envia para Kinesis Data Streams. Monitora: queries, connections, schema changes. Imutável (KMS encrypted). CloudTrail: API calls (create DB). Combinar para auditoria completa. AWS Lake Formation para compliance.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 444,
    question: "Uma aplicação usa S3 com milhares de GET requests/segundo. Como otimizar performance?",
    options: [
      "Nada a fazer",
      "CloudFront CDN + S3 Transfer Acceleration",
      "Mais storage",
      "B (CloudFront + Transfer Acceleration)"
    ],
    correctAnswer: 1,
    explanation: "S3 high request rate: CloudFront CDN (cache, offload), S3 Transfer Acceleration (uploads rápidos via edge), key distribution (prefixos aleatórios para sharding). S3: 3500 PUT/5500 GET per prefix/sec. Multipart upload para >100MB. Byte-range fetches.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 445,
    question: "Uma aplicação usa Auto Scaling com EBS volumes. Como garantir que volumes sejam deletados ao terminar instância?",
    options: [
      "Manual deletion",
      "EBS DeleteOnTermination flag = true",
      "Lambda scheduled",
      "B (DeleteOnTermination)"
    ],
    correctAnswer: 1,
    explanation: "EBS DeleteOnTermination: flag no block device mapping, deleta volume automaticamente quando EC2 termina. Root volume: true default. Additional volumes: false default. Launch template configura. Snapshots para backup antes delete. Evita custos de volumes órfãos.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 446,
    question: "Uma aplicação precisa processar eventos S3 em ordem. Como garantir?",
    options: [
      "S3 events não são ordenados",
      "S3 → SQS FIFO → Lambda com message group ID = object key",
      "S3 direto Lambda",
      "B (SQS FIFO)"
    ],
    correctAnswer: 1,
    explanation: "S3 events ordering: S3 → SQS FIFO (message group ID = object key garante ordem por objeto), Lambda processa. S3 direto Lambda: sem ordem. Use case: process file versions in order. SQS Standard: não garante ordem. Kinesis alternativa.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 447,
    question: "Uma aplicação usa CloudWatch. Como criar dashboard compartilhado cross-account?",
    options: [
      "Não possível",
      "CloudWatch cross-account cross-region dashboards",
      "Duplicar dashboards",
      "B (cross-account dashboards)"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch cross-account: dashboard visualiza métricas de múltiplas contas/regiões. Monitoring account setup. IAM roles para cross-account access. CloudWatch Metrics sharing. Use case: central monitoring, multi-account Organizations. CloudWatch Contributor Insights para analysis.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 448,
    question: "Uma aplicação usa EKS. Como garantir pods tenham recursos adequados (CPU/memory)?",
    options: [
      "Sem limites",
      "Kubernetes resource requests (garantido) + limits (máximo)",
      "Overprovisioning",
      "B (requests + limits)"
    ],
    correctAnswer: 1,
    explanation: "Kubernetes resources: requests (guaranteed, scheduler usa para placement), limits (max, pod killed se exceder memory). QoS classes: Guaranteed, Burstable, BestEffort. Vertical Pod Autoscaler: ajusta automaticamente. Horizontal Pod Autoscaler: escala replicas. Cluster Autoscaler: nodes.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 449,
    question: "Uma aplicação usa RDS Multi-AZ. Qual é o impacto de failover no endpoint?",
    options: [
      "Endpoint muda",
      "Endpoint permanece igual (DNS aponta para standby)",
      "Application reconfiguration",
      "B (DNS automático)"
    ],
    correctAnswer: 1,
    explanation: "RDS Multi-AZ failover: DNS automaticamente aponta para standby (1-2 min). Application connection string não muda. Application deve ter retry logic (connections fail durante failover). Promove standby para primary. Aurora: failover mais rápido (30s típico).",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 450,
    question: "Uma aplicação usa Lambda. Como debugar erros em produção?",
    options: [
      "Console.log apenas",
      "CloudWatch Logs + X-Ray tracing + CloudWatch Insights",
      "Não debugar prod",
      "B (Logs + X-Ray + Insights)"
    ],
    correctAnswer: 1,
    explanation: "Lambda debugging: CloudWatch Logs (structured logging), X-Ray (distributed tracing, latency), CloudWatch Logs Insights (queries), Lambda metrics (errors, duration, throttles). Error handling com Dead Letter Queue. Canary/synthetic monitoring. Development: SAM local, Lambda console test.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 451,
    question: "Uma aplicação usa S3 para data lake. Como catalogar e consultar dados sem ETL?",
    options: [
      "Manual queries",
      "AWS Glue Crawler + Athena",
      "RDS",
      "B (Glue + Athena)"
    ],
    correctAnswer: 1,
    explanation: "Data lake S3: Glue Crawler descobre schema e popula Glue Data Catalog, Athena consulta dados diretamente em S3 (SQL). Serverless, paga por query. Formatos: Parquet, ORC (columnar, eficiente). Partitioning para performance. QuickSight para visualização.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 452,
    question: "Uma aplicação usa DynamoDB com preço On-Demand alto. Como identificar tables para migrar para Provisioned?",
    options: [
      "Migrar todas",
      "CloudWatch metrics: consistent traffic = Provisioned, spiky = On-Demand",
      "Random choice",
      "B (analisar métricas)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB pricing optimization: analisar ConsumedReadCapacityUnits/WriteCapacityUnits métricas. Tráfego consistente: Provisioned cheaper (Reserved Capacity = -53%). Spiky/imprevisível: On-Demand. Auto Scaling Provisioned para middle ground. Cost Explorer para análise histórica.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 453,
    question: "Uma aplicação usa API Gateway. Como implementar rate limiting por API key?",
    options: [
      "WAF apenas",
      "API Gateway usage plans com throttling (rate + burst limits)",
      "Não possível",
      "B (usage plans)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway throttling: usage plans (rate limit + burst, por API key/stage). Default: 10k req/s account-wide. WAF rate-based rules: adicional protection. Lambda authorizer: custom logic. CloudFront: rate limiting via WAF. Monitoring: CloudWatch 4xx/5xx metrics.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 454,
    question: "Uma aplicação usa EC2 com EBS gp3. Como otimizar custo vs performance?",
    options: [
      "Usar gp2 sempre",
      "gp3: ajustar IOPS/throughput independentemente (cheaper que gp2 >1TB)",
      "io2 sempre",
      "B (gp3 tuning)"
    ],
    correctAnswer: 1,
    explanation: "EBS gp3: baseline 3000 IOPS / 125 MB/s, customizar independentemente (cheaper que gp2 para volumes grandes). gp2: IOPS escala com tamanho (3 IOPS/GB). io2 Block Express: max performance (256k IOPS), caro. st1/sc1: throughput-optimized (HDD). Cold HDD sc1: cheapest.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 455,
    question: "Uma aplicação multi-tier precisa de service mesh para observability. Qual solução AWS?",
    options: [
      "Não disponível",
      "AWS App Mesh",
      "Load balancers apenas",
      "B (App Mesh)"
    ],
    correctAnswer: 1,
    explanation: "AWS App Mesh: service mesh (sidecar proxy Envoy), traffic management, observability, security. Integra com ECS/EKS/EC2. X-Ray tracing, CloudWatch metrics. Alternativas: Istio, Linkerd (self-managed). Cloud Map para service discovery. Application Load Balancer para simple routing.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 456,
    question: "Uma aplicação usa RDS. Como identificar queries lentas?",
    options: [
      "Manual testing",
      "RDS Performance Insights + Enhanced Monitoring",
      "Não possível",
      "B (Performance Insights)"
    ],
    correctAnswer: 1,
    explanation: "RDS slow queries: Performance Insights (top SQL, wait events, db load), Enhanced Monitoring (OS metrics), slow query log (PostgreSQL/MySQL). CloudWatch Logs para analysis. Query tuning: indexes, explain plans. Aurora query editor. Third-party: Datadog, New Relic.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 457,
    question: "Uma aplicação usa Lambda com secrets. Como rotacionar secrets automaticamente?",
    options: [
      "Manual rotation",
      "Secrets Manager com Lambda rotation function",
      "Hardcode",
      "B (Secrets Manager rotation)"
    ],
    correctAnswer: 1,
    explanation: "Secrets Manager: automatic rotation (Lambda function triggered periodically), versionamento, KMS encryption. Templates para RDS/Redshift. Custom rotation para outros. Parameter Store: sem rotation automática (manual via Lambda). IAM roles para Lambda acessar secrets. CloudTrail audit.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 458,
    question: "Uma aplicação usa S3 com arquivos grandes (10GB). Como otimizar uploads?",
    options: [
      "Single PUT",
      "S3 Multipart Upload + Transfer Acceleration",
      "FTP",
      "B (Multipart + Acceleration)"
    ],
    correctAnswer: 1,
    explanation: "S3 large files: Multipart Upload (>100MB recomendado, obrigatório >5GB), parallel parts, resume failed uploads. Transfer Acceleration: upload via edge locations (50-500% faster). Byte-range uploads. AWS CLI/SDK automatiza multipart. S3 Batch Operations para bulk.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 459,
    question: "Uma aplicação usa Aurora. Como minimizar downtime durante major version upgrade?",
    options: [
      "Direct upgrade (downtime)",
      "Blue/Green Deployment",
      "Não possível",
      "B (Blue/Green)"
    ],
    correctAnswer: 1,
    explanation: "Aurora version upgrade: Blue/Green Deployment (clone, upgrade green, test, switchover <1 min). Read replicas: upgrade replica, promover, update DNS (manual). Snapshot: restore para nova versão. Minor versions: zero-downtime patching. Test em staging primeiro.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 460,
    question: "Uma aplicação usa DynamoDB. Como implementar cache para reduzir read costs?",
    options: [
      "Mais RCUs",
      "DAX (DynamoDB Accelerator)",
      "ElastiCache manual",
      "B (DAX)"
    ],
    correctAnswer: 1,
    explanation: "DAX: in-memory cache para DynamoDB (microsegundos latency), write-through, item/query cache, fully managed. Reduz read costs. ElastiCache: cache genérico (Redis/Memcached), requer código. DAX: drop-in replacement (minimal code). CloudFront para API Gateway cache.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 461,
    question: "Uma aplicação usa ECS. Como implementar service discovery automaticamente?",
    options: [
      "Hardcode IPs",
      "ECS Service Discovery (AWS Cloud Map integration)",
      "Manual DNS",
      "B (Service Discovery)"
    ],
    correctAnswer: 1,
    explanation: "ECS Service Discovery: integra Cloud Map, DNS automático (A/SRV records), health checks. Tasks registram automaticamente. Namespace público ou privado. API-based discovery alternativa. ALB/NLB para load balancing. App Mesh para service mesh.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 462,
    question: "Uma aplicação precisa garantir que EC2 instances em Auto Scaling tenham software específico. Como?",
    options: [
      "Manual installation",
      "Custom AMI ou User Data script",
      "Não possível",
      "B (AMI ou User Data)"
    ],
    correctAnswer: 1,
    explanation: "EC2 bootstrapping: Custom AMI (pre-baked, fast launch) ou User Data script (instala on boot, flexível). Launch Template configura. Systems Manager Run Command para post-launch. AMI Builder para automation. CloudFormation cfn-init. Container: ECS/EKS com Docker images.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 463,
    question: "Uma aplicação usa API Gateway REST API com OpenAPI spec. Como deployar?",
    options: [
      "Console manual",
      "Import OpenAPI spec com extensões AWS (x-amazon-apigateway-integration)",
      "Não suporta OpenAPI",
      "B (OpenAPI import)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway OpenAPI: import/export specs, x-amazon-apigateway-* extensions (integrations, authorizers). IaC: SAM, CDK, Terraform. Stages para ambientes. Canary deployments. Export para documentation. HTTP API: OpenAPI 3 support.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 464,
    question: "Uma aplicação usa Lambda processando Kinesis. Como garantir exactly-once processing?",
    options: [
      "Lambda retries = duplicates",
      "Idempotência na aplicação + DynamoDB dedupe table",
      "Não possível",
      "B (idempotência + dedupe)"
    ],
    correctAnswer: 1,
    explanation: "Kinesis + Lambda: at-least-once delivery. Exactly-once: aplicação idempotente, dedupe table (DynamoDB com record ID), transacional processing. Lambda retries em failures. Checkpointing via shard iterator. Kinesis Data Analytics: exactly-once para SQL streaming.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 465,
    question: "Uma aplicação usa CloudFront com múltiplas origins. Como rotear por path?",
    options: [
      "CloudFront não suporta",
      "Cache behaviors com path patterns",
      "Lambda@Edge apenas",
      "B (cache behaviors)"
    ],
    correctAnswer: 1,
    explanation: "CloudFront routing: cache behaviors (path patterns), ex: /api/* → ALB origin, /static/* → S3 origin, /* → default. Precedence order. TTL, headers, query strings por behavior. Lambda@Edge para custom routing. Origin groups para failover.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 466,
    question: "Uma aplicação precisa de compliance com retenção de CloudTrail logs por 7 anos. Como?",
    options: [
      "CloudTrail apenas (max 90 dias)",
      "CloudTrail → S3 com Object Lock + Lifecycle → Glacier Deep Archive",
      "Não possível",
      "B (S3 Object Lock + Glacier)"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail compliance: delivery para S3, Object Lock (WORM, 7 anos), Lifecycle transition para Glacier Deep Archive (cheapest). MFA Delete. CloudWatch Logs para monitoring. Cross-region backup. Log File Validation. Athena para queries históricas.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 467,
    question: "Uma aplicação usa EC2 com persistent storage. EBS ou EFS?",
    options: [
      "EBS sempre",
      "EBS para single instance, EFS para shared multi-instance",
      "EFS sempre",
      "B (depende do uso)"
    ],
    correctAnswer: 1,
    explanation: "EBS: block storage, single EC2 (multi-attach limitado), provisioned IOPS, snapshots. EFS: file system, shared NFS, múltiplas EC2/AZs, elastic, paga por uso. FSx: Windows (SMB) ou Lustre (HPC). S3: object storage. Escolha depende de access pattern.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 468,
    question: "Uma aplicação usa SQS com mensagens que expiram em 5 minutos. Como configurar?",
    options: [
      "SQS não suporta expiration",
      "Message Timer ou receiveMessage com VisibilityTimeout curto",
      "Lambda deletion",
      "B (usar timestamps + lógica)"
    ],
    correctAnswer: 1,
    explanation: "SQS message expiration: não há TTL nativo. Soluções: incluir timestamp em message, consumer verifica e ignora expired, ou usar MessageRetentionPeriod para queue-level. VisibilityTimeout: temporarily hide message. DLQ para messages não processadas após max receives.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 469,
    question: "Uma aplicação precisa de database para time-series data (IoT metrics). Qual serviço?",
    options: [
      "RDS",
      "Amazon Timestream",
      "DynamoDB",
      "B (Timestream)"
    ],
    correctAnswer: 1,
    explanation: "Timestream: purpose-built time-series database, auto-scaling, data tiering (memory → magnetic), SQL queries. Alternativas: DynamoDB (NoSQL), RDS (relational), OpenSearch (search), Redshift (warehouse). InfluxDB on EC2. CloudWatch Metrics para AWS services.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 470,
    question: "Uma aplicação usa Lambda com VPC. Como reduzir cold start causado por ENI creation?",
    options: [
      "Não há solução",
      "Hyperplane ENIs (Lambda usa shared ENIs, não por function)",
      "Provisioned Concurrency apenas",
      "B (Hyperplane)"
    ],
    correctAnswer: 1,
    explanation: "Lambda VPC cold start: Hyperplane ENIs (shared across functions/invocations, seconds vs minutes). Provisioned Concurrency: pre-warmed. VPC-to-VPC NAT: via PrivateLink endpoints. Security Groups: função-level. ENI scaling automático. Non-VPC Lambda: sem ENI overhead.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 471,
    question: "Uma aplicação usa S3. Como notificar aplicação externa (não AWS) quando arquivo é uploaded?",
    options: [
      "Polling",
      "S3 Event → SNS → HTTPS endpoint subscription",
      "Não possível",
      "B (SNS HTTPS)"
    ],
    correctAnswer: 1,
    explanation: "S3 external notification: S3 Event → SNS topic → HTTPS subscription (webhook). SNS entrega para endpoint externo. Retry policy, DLQ. Alternativas: S3 Event → SQS (external polls), EventBridge → external destinations. Lambda → API call para external system.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 472,
    question: "Uma aplicação usa Aurora Serverless v1. Quando considerar migrar para v2?",
    options: [
      "v1 sempre melhor",
      "v2: scaling mais rápido (seconds vs minutes), mais features",
      "v2 não existe",
      "B (v2 melhora scaling)"
    ],
    correctAnswer: 1,
    explanation: "Aurora Serverless v2: scaling instantâneo (seconds), fine-grained (0.5 ACU increments), suporta read replicas/Global Database/Multi-AZ. v1: scaling minutes, pausa quando idle (v2 não). v2 recomendado para production. v1: deprecated eventualmente.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 473,
    question: "Uma aplicação usa DynamoDB. Como implementar filtering sem consumir RCUs?",
    options: [
      "Query com FilterExpression (consome RCUs antes filter)",
      "Design schema para usar Query/Scan com menos items",
      "Não possível",
      "B (schema design)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB RCU optimization: FilterExpression aplicado após read (consome RCUs de items lidos, não filtrados). Solução: schema design (partition key que reduz items, GSI), aplicação-level filtering. Projection expression: reduz network, não RCUs. Sparse indexes.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 474,
    question: "Uma aplicação usa EC2 com Auto Scaling cross-AZ. Como equilibrar custos de data transfer?",
    options: [
      "Single AZ (sem HA)",
      "ALB cross-zone load balancing + minimizar cross-AZ traffic no backend",
      "Aceitar custos",
      "B (ALB + otimizar backend)"
    ],
    correctAnswer: 1,
    explanation: "Cross-AZ data transfer: cobrado (exc. ALB/NLB). ALB cross-zone load balancing: gratuito. Otimizar: cache (ElastiCache/CloudFront), VPC Endpoints (S3/DynamoDB), process locally. HA requer múltiplas AZs (custo vs resiliência trade-off).",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 475,
    question: "Uma aplicação usa CloudFormation. Como prevenir accidental deletion de stack?",
    options: [
      "Não há proteção",
      "Stack termination protection + IAM policies",
      "Backup apenas",
      "B (termination protection)"
    ],
    correctAnswer: 1,
    explanation: "CloudFormation protection: termination protection (must disable before delete), IAM policies (deny cloudformation:DeleteStack), DeletionPolicy: Retain para recursos críticos, Stack Policy (prevent updates). Change sets para preview. Version control (Git) para templates.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 476,
    question: "Uma aplicação usa Lambda. Como implementar circuit breaker para chamadas externas?",
    options: [
      "Lambda não suporta",
      "Implementar circuit breaker na aplicação (try/catch, counter, timeout)",
      "API Gateway apenas",
      "B (implementar na app)"
    ],
    correctAnswer: 1,
    explanation: "Circuit breaker pattern: detecta failures consecutivos, abre circuit (fail fast), tenta periodicamente. Lambda: implementar em código, usar library (resilience4j), DynamoDB para state sharing. API Gateway: retry/throttling básico. Step Functions para orchestration with retry.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 477,
    question: "Uma aplicação usa S3 Glacier. Qual retrieval option para dados urgentes?",
    options: [
      "Standard (3-5h)",
      "Expedited (1-5 min)",
      "Bulk (5-12h)",
      "B (Expedited)"
    ],
    correctAnswer: 1,
    explanation: "Glacier retrieval: Expedited (1-5 min, mais caro), Standard (3-5h, médio), Bulk (5-12h, cheapest). Provisioned capacity para Expedited garantido. Glacier Deep Archive: Standard (12h), Bulk (48h). S3 Intelligent-Tiering Instant Retrieval: milliseconds.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 478,
    question: "Uma aplicação usa RDS PostgreSQL. Como implementar read scaling sem replicação?",
    options: [
      "Vertical scaling",
      "ElastiCache para query results caching",
      "Impossible sem replica",
      "B (ElastiCache)"
    ],
    correctAnswer: 1,
    explanation: "RDS read scaling: Read Replicas (replicação) ou ElastiCache (cache). Cache: Redis/Memcached, offload reads, aplicação gerencia invalidação. DAX para DynamoDB. CloudFront para APIs. Database query optimization (indexes) reduz load. Vertical scaling: limite.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 479,
    question: "Uma aplicação precisa de network firewall stateful inspection. Qual serviço?",
    options: [
      "Security Groups (stateless)",
      "AWS Network Firewall",
      "NACL apenas",
      "B (Network Firewall)"
    ],
    correctAnswer: 1,
    explanation: "Network Firewall: stateful inspection, IDS/IPS, domain filtering, managed rules. VPC-level protection. Security Groups: stateful mas instance-level. NACL: stateless, subnet-level. WAF: web application (Layer 7). Third-party: Palo Alto, Fortinet on EC2.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 480,
    question: "Uma aplicação usa ECS Fargate. Como persistir dados entre task restarts?",
    options: [
      "Não possível",
      "EFS volume mount ou S3",
      "EBS (não suporta Fargate)",
      "B (EFS ou S3)"
    ],
    correctAnswer: 1,
    explanation: "Fargate persistent storage: EFS (file system, mount), S3 (object storage, app writes). EBS: apenas ECS EC2. FSx: Windows/Lustre. Ephemeral: /tmp (max 20GB). Stateless containers preferíveis. Database (RDS/DynamoDB) para persistent data.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 481,
    question: "Uma aplicação usa API Gateway com autorização. Qual opção oferece menos latência?",
    options: [
      "Lambda authorizer",
      "Cognito User Pools",
      "IAM",
      "C (IAM - sem latência adicional)"
    ],
    correctAnswer: 2,
    explanation: "API Gateway auth latency: IAM (SigV4, sem latência), Cognito (JWT validation, baixa latência + cache), Lambda authorizer (invoca função, maior latência mas cache 5m-1h). Lambda custom: flexível mas mais lento. Resource policy: IP-based sem auth.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 482,
    question: "Uma aplicação usa DynamoDB com global secondary index. Como otimizar custos?",
    options: [
      "Remover GSI",
      "Sparse index (apenas itens com atributo), projection apenas required attributes",
      "Mais RCUs",
      "B (sparse + projection)"
    ],
    correctAnswer: 1,
    explanation: "GSI cost optimization: sparse indexes (índice apenas itens com atributo GSI key, reduz storage), projection (KEYS_ONLY/INCLUDE específicos, não ALL). On-Demand GSI. Evitar GSIs desnecessários. Base table query quando possível. LSI: não consome WCUs adicionais.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 483,
    question: "Uma aplicação precisa de DNS failover automático entre regiões. Como configurar Route 53?",
    options: [
      "Failover routing com health checks",
      "Simple routing",
      "Não possível",
      "A (Failover routing)"
    ],
    correctAnswer: 0,
    explanation: "Route 53 multi-region failover: Failover routing (primary/secondary), health checks (endpoint, CloudWatch alarm), automatic failover quando primary unhealthy. Combinar com latency routing para performance. Global Accelerator alternativa. Aurora Global Database: auto-failover.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 484,
    question: "Uma aplicação usa Lambda com 15 minutos timeout mas executa em 2 minutos. Como otimizar custos?",
    options: [
      "Manter 15 min",
      "Reduzir timeout para ~3 min (buffer) + otimizar memory",
      "Aumentar timeout",
      "B (reduzir timeout)"
    ],
    correctAnswer: 1,
    explanation: "Lambda cost: não cobra timeout unused (apenas execution time). Mas timeout adequado: evita stuck functions (cobradas até timeout). Best practice: timeout = expected time + buffer. Otimizar memory para faster execution (menos time = menos custo). Monitor CloudWatch duration.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 485,
    question: "Uma aplicação usa S3 com objetos compartilhados publicamente. Como proteger de bandwidth abuse?",
    options: [
      "Bucket público sem proteção",
      "CloudFront + signed URLs/cookies + WAF rate limiting",
      "Não proteger",
      "B (CloudFront + signed URLs + WAF)"
    ],
    correctAnswer: 1,
    explanation: "S3 bandwidth protection: CloudFront (cache reduz requests), signed URLs/cookies (controle acesso), WAF rate limiting (DDoS), Origin Access Control (previne direct S3 access), CloudWatch metrics + alarms. Requester Pays para custos compartilhados.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 486,
    question: "Uma aplicação usa ECS com ALB health checks. Como health check funciona?",
    options: [
      "ECS internal apenas",
      "ALB target group health check + ECS usa para task replacement",
      "Manual monitoring",
      "B (ALB health check)"
    ],
    correctAnswer: 1,
    explanation: "ECS + ALB health: ALB target group health check (HTTP path), ECS service monitora, substitui unhealthy tasks. Health check grace period (tempo para task ficar ready). Container health check (Docker HEALTHCHECK). CloudWatch alarms. Connection draining para graceful shutdown.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 487,
    question: "Uma aplicação usa Aurora. Como implementar disaster recovery cross-region com RPO <1s?",
    options: [
      "Snapshots diários",
      "Aurora Global Database",
      "Read Replicas",
      "B (Global Database)"
    ],
    correctAnswer: 1,
    explanation: "Aurora Global Database: replicação cross-region <1s (RPO), failover manual <1 min (RTO), até 5 regiões secundárias. Read replicas: async (mais lag). Snapshots: RPO horas. Aurora Backtrack: rollback até 72h (não DR). Multi-region DR: Global Database obrigatório.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 488,
    question: "Uma aplicação usa Lambda processando DynamoDB Streams. Como garantir ordem de processamento?",
    options: [
      "Lambda não garante ordem",
      "DynamoDB Streams mantém ordem por partition key, Lambda processa sequencialmente por shard",
      "Reprocessar tudo",
      "B (ordem por partition key)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Streams + Lambda: ordem garantida por partition key (dentro do shard). Lambda processa records sequencialmente por shard. ParallelizationFactor para throughput (processa múltiplos batches em paralelo mas ordem mantida). Kinesis alternativa para custom sharding.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 489,
    question: "Uma aplicação usa CloudFormation nested stacks. Qual vantagem?",
    options: [
      "Sem vantagens",
      "Reusabilidade de templates, organização, superar limite de 500 resources",
      "Mais complexo",
      "B (reusabilidade + organização)"
    ],
    correctAnswer: 1,
    explanation: "Nested stacks: reusabilidade (VPC template reusado), organização (separar infra por camada), superar limite 500 resources/stack. Stack outputs compartilhados. Cross-stack references alternativa. CDK: constructs abstraem complexity. Modules Terraform equivalente.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 490,
    question: "Uma aplicação usa S3 Transfer Acceleration. Quando NÃO usar?",
    options: [
      "Sempre usar",
      "Cliente próximo da região S3 (não melhora)",
      "Nunca usar",
      "B (cliente próximo)"
    ],
    correctAnswer: 1,
    explanation: "Transfer Acceleration: acelera uploads via edge locations (50-500% faster) para clientes geograficamente distantes. Não melhora se cliente próximo da região. Custo adicional. Teste com speed comparison tool. CloudFront para downloads. Direct Connect para on-prem consistente.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 491,
    question: "Uma aplicação usa Auto Scaling. Como evitar scale-in durante deploy?",
    options: [
      "Não evitar",
      "Suspend scaling processes durante deploy",
      "Scale-in sempre ok",
      "B (suspend processes)"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling deploy: suspend processes (ReplaceUnhealthy, TerminateInstance) durante deploy, lifecycle hooks para graceful shutdown, rolling deployment com pause. CodeDeploy integration. Blue/Green: novo ASG. CloudFormation UpdatePolicy. Monitoring: CloudWatch durante deploy.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 492,
    question: "Uma aplicação precisa de database ACID transactions cross-table. DynamoDB ou RDS?",
    options: [
      "Apenas RDS",
      "DynamoDB Transactions ou RDS (depende de outros requisitos)",
      "DynamoDB não suporta",
      "B (ambos suportam)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB Transactions: ACID cross-items/tables (até 100 items, 4MB). RDS: full SQL transactions. Escolha: DynamoDB (NoSQL, scale horizontal), RDS (SQL, relational). Aurora: transactions + performance. Considerar access patterns, scale requirements, complexity.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 493,
    question: "Uma aplicação usa Lambda com SQS FIFO. Como maximizar throughput?",
    options: [
      "Single queue",
      "Multiple message group IDs para paralelizar",
      "Standard queue",
      "B (multiple group IDs)"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO throughput: 300 msg/s (3000 com batching) por message group ID. Paralelizar: múltiplos groups (ex: group por customer ID). Lambda processa groups em paralelo. Standard queue: unlimited throughput mas sem ordem. Kinesis: shards para partition.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 494,
    question: "Uma aplicação usa EBS com snapshots. Como reduzir custos de snapshot storage?",
    options: [
      "Não fazer snapshots",
      "Lifecycle Manager para deletar old snapshots + incremental snapshots",
      "Manter todos",
      "B (lifecycle + incremental)"
    ],
    correctAnswer: 1,
    explanation: "EBS snapshot cost: incremental (apenas blocos mudados cobrados), DLM (Data Lifecycle Manager) automatiza retenção, cross-region copy para DR. Amazon Data Lifecycle Manager policies. Fast snapshot restore: performance mas custo. Archive tier: até 75% cheaper.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 495,
    question: "Uma aplicação usa API Gateway REST API. Como implementar CORS?",
    options: [
      "API Gateway não suporta",
      "Enable CORS no API Gateway (OPTIONS method + headers)",
      "Só no backend",
      "B (enable CORS)"
    ],
    correctAnswer: 1,
    explanation: "API Gateway CORS: enable via console (cria OPTIONS method, Access-Control headers), ou manual setup. Preflight requests (OPTIONS). Backend também pode adicionar headers. HTTP API: CORS builtin simplificado. Lambda proxy: backend controla headers. CloudFront: adicionar headers.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 496,
    question: "Uma aplicação usa RDS com conexões frequentes/curtas (connection churn). Como otimizar?",
    options: [
      "Mais max_connections",
      "RDS Proxy (connection pooling)",
      "Restart RDS",
      "B (RDS Proxy)"
    ],
    correctAnswer: 1,
    explanation: "RDS connection pooling: RDS Proxy (reduce overhead, failover <35s, IAM auth). Lambda: essencial (high concurrency). Application connection pooling alternativa. Aurora Serverless v2: auto-scaling inclui connections. CloudWatch: DatabaseConnections metric monitoring.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 497,
    question: "Uma aplicação usa S3 com versionamento. Como reduzir custos de versões antigas?",
    options: [
      "Manter todas versões",
      "Lifecycle policy: delete noncurrent versions após X dias",
      "Sem versionamento",
      "B (lifecycle noncurrent)"
    ],
    correctAnswer: 1,
    explanation: "S3 versioning cost: noncurrent versions cobradas. Lifecycle: NoncurrentVersionExpiration (delete após X dias), NoncurrentVersionTransition (move para IA/Glacier). MFA Delete protege. Versioning necessário para CRR/Object Lock. S3 Storage Lens: analytics.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 498,
    question: "Uma aplicação precisa de alertas quando Lambda throttling ocorre. Como configurar?",
    options: [
      "Não possível detectar",
      "CloudWatch alarm na métrica Throttles",
      "Manual checking",
      "B (CloudWatch alarm)"
    ],
    correctAnswer: 1,
    explanation: "Lambda monitoring: CloudWatch métricas (Throttles, Errors, Duration, ConcurrentExecutions), alarmes (SNS notification), X-Ray tracing. Throttling: reserved concurrency, request quota increase. Async: automatic retry 2x. Sync: client retry. DLQ para failed async.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 499,
    question: "Uma aplicação usa VPC com múltiplos subnets. Como simplificar routing tables?",
    options: [
      "Route table por subnet",
      "Shared route table para subnets com mesmas rotas",
      "Não simplificar",
      "B (shared route table)"
    ],
    correctAnswer: 1,
    explanation: "VPC routing: route table compartilhada por múltiplos subnets (mesmas rotas), route table por subnet para custom. Main route table: default. Gateway route table: IGW/VGW. Local routes automáticas. Prefix lists para CIDR groups. Transit Gateway: central routing.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 500,
    question: "Uma aplicação usa DynamoDB com hot partition. Como diagnosticar e resolver?",
    options: [
      "Ignorar",
      "CloudWatch Contributor Insights para identificar hot keys, redesign partition key ou write sharding",
      "Mais WCUs",
      "B (Contributor Insights + redesign)"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB hot partition: CloudWatch Contributor Insights (identifica top keys), CloudWatch metrics (ConsumedReadCapacity por table). Soluções: composite partition key (high cardinality), write sharding (random suffix), cache (DAX), scatter-gather pattern. Design preventivo melhor.",
    domain: 'performance',
    difficulty: 'hard'
  }
];
