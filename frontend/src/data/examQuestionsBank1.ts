// AWS SAA-C03 Exam Questions Bank - Part 1 (Questions 1-100)
// Domain Distribution: 30% Resilient, 28% Performance, 24% Secure, 18% Cost

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | number[]; // Single number or array for multiple correct answers
  explanation: string;
  domain: 'resilient' | 'performance' | 'secure' | 'cost';
  difficulty: 'easy' | 'medium' | 'hard';
  multipleChoice?: boolean; // true if multiple answers are correct
}

export const examQuestionsBank1: ExamQuestion[] = [
  // Questions 1-10: Design Resilient Architectures
  {
    id: 1,
    question: "Uma empresa está desenvolvendo uma aplicação web de três camadas na AWS. A aplicação precisa ser altamente disponível e tolerante a falhas em múltiplas zonas de disponibilidade. Qual arquitetura atende a esses requisitos?",
    options: [
      "Usar EC2 em uma única zona de disponibilidade com Auto Scaling",
      "Usar EC2 em múltiplas zonas de disponibilidade atrás de um Application Load Balancer",
      "Usar Lambda em uma única região com CloudFront",
      "Usar EC2 em múltiplas regiões sem load balancer"
    ],
    correctAnswer: 1,
    explanation: "Application Load Balancer distribui tráfego entre múltiplas zonas de disponibilidade, garantindo alta disponibilidade. EC2 em múltiplas AZs com ALB é a arquitetura padrão para aplicações resilientes de três camadas.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Uma aplicação armazena dados críticos em um bucket S3. A empresa precisa proteger esses dados contra exclusão acidental e manter versões históricas. Quais recursos do S3 devem ser habilitados? (Escolha 2)",
    options: [
      "S3 Versioning",
      "S3 Transfer Acceleration",
      "S3 Object Lock",
      "S3 Intelligent-Tiering",
      "MFA Delete"
    ],
    correctAnswer: [0, 4],
    explanation: "S3 Versioning mantém versões históricas dos objetos. MFA Delete adiciona camada extra de proteção exigindo autenticação multifator para excluir versões de objetos ou desabilitar o versionamento.",
    domain: 'resilient',
    difficulty: 'medium',
    multipleChoice: true
  },
  {
    id: 3,
    question: "Uma empresa precisa migrar um banco de dados MySQL on-premises para a AWS com o mínimo de downtime possível. Qual serviço é mais apropriado para esta migração?",
    options: [
      "AWS Storage Gateway",
      "AWS Database Migration Service (DMS)",
      "AWS DataSync",
      "AWS Transfer Family"
    ],
    correctAnswer: 1,
    explanation: "AWS DMS é projetado especificamente para migrações de bancos de dados com mínimo downtime. Ele suporta migração contínua mantendo a base de dados de origem operacional durante a migração.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "Uma aplicação usa Amazon RDS MySQL Multi-AZ. Durante uma manutenção, a equipe observou que houve failover automático para a instância standby. Quanto tempo tipicamente leva um failover do RDS Multi-AZ?",
    options: [
      "Menos de 1 minuto",
      "1-2 minutos",
      "5-10 minutos",
      "15-30 minutos"
    ],
    correctAnswer: 1,
    explanation: "O failover automático do RDS Multi-AZ geralmente completa em 1-2 minutos. Durante o failover, o RDS atualiza automaticamente o registro DNS para apontar para a instância standby.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "Uma empresa quer implementar disaster recovery para aplicações críticas com RTO de 1 hora e RPO de 15 minutos. Qual estratégia de DR é mais apropriada?",
    options: [
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Multi-Site Active/Active"
    ],
    correctAnswer: 2,
    explanation: "Warm Standby mantém uma versão reduzida da infraestrutura rodando continuamente, permitindo RTO de 1 hora. Com snapshots frequentes (a cada 15 minutos), atende ao RPO de 15 minutos. Pilot Light seria muito lento, e Multi-Site seria mais caro que o necessário.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 6,
    question: "Uma aplicação serverless usa Lambda, API Gateway e DynamoDB. Como garantir que a aplicação seja resiliente a falhas de zona de disponibilidade?",
    options: [
      "Configurar Lambda para executar em múltiplas AZs manualmente",
      "Ativar DynamoDB Global Tables",
      "Não é necessário configuração adicional - Lambda, API Gateway e DynamoDB são automaticamente multi-AZ",
      "Criar múltiplas APIs no API Gateway, uma por AZ"
    ],
    correctAnswer: 2,
    explanation: "Lambda, API Gateway e DynamoDB são serviços gerenciados que automaticamente operam em múltiplas zonas de disponibilidade. Não requer configuração adicional do usuário para resiliência multi-AZ.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 7,
    question: "Uma empresa precisa armazenar backups de banco de dados com retenção de 7 anos para conformidade regulatória. Qual solução de armazenamento é mais econômica?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Glacier Deep Archive",
      "EBS Snapshots"
    ],
    correctAnswer: 2,
    explanation: "S3 Glacier Deep Archive é a opção mais econômica para dados de longo prazo (7+ anos) que são raramente acessados. Oferece o menor custo de armazenamento, ideal para arquivamento de conformidade e backups de longa retenção.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 8,
    question: "Uma aplicação precisa processar mensagens de forma assíncrona com garantia de que cada mensagem seja processada pelo menos uma vez e na ordem correta. Qual solução atende esses requisitos?",
    options: [
      "Amazon SQS Standard Queue",
      "Amazon SQS FIFO Queue",
      "Amazon SNS",
      "Amazon Kinesis Data Streams"
    ],
    correctAnswer: 1,
    explanation: "SQS FIFO Queue garante processamento na ordem exata (FIFO - First In First Out) e exactly-once processing (com deduplicação). SQS Standard não garante ordem. SNS é pub/sub, não queue. Kinesis é para streaming em tempo real.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 9,
    question: "Uma aplicação web está sofrendo ataques DDoS. Quais serviços AWS podem ajudar a mitigar esses ataques? (Escolha 2)",
    options: [
      "AWS Shield",
      "AWS GuardDuty",
      "AWS WAF",
      "AWS Inspector",
      "AWS Config"
    ],
    correctAnswer: [0, 2],
    explanation: "AWS Shield fornece proteção contra ataques DDoS (Shield Standard é grátis, Shield Advanced para ataques maiores). AWS WAF permite criar regras para filtrar tráfego malicioso. GuardDuty é detecção de ameaças, Inspector é avaliação de vulnerabilidades, Config monitora configurações.",
    domain: 'secure',
    difficulty: 'medium',
    multipleChoice: true
  },
  {
    id: 10,
    question: "Uma empresa quer otimizar custos de EC2 para workloads previsíveis que rodam continuamente por 3 anos. Qual modelo de compra oferece maior economia?",
    options: [
      "On-Demand Instances",
      "Reserved Instances (1 ano, pagamento total antecipado)",
      "Reserved Instances (3 anos, pagamento total antecipado)",
      "Spot Instances"
    ],
    correctAnswer: 2,
    explanation: "Reserved Instances de 3 anos com pagamento total antecipado oferece até 72% de desconto comparado a On-Demand. Para workloads previsíveis e de longo prazo, esta é a opção mais econômica. Spot é mais barato mas pode ser interrompido.",
    domain: 'cost',
    difficulty: 'easy'
  },
  // Questions 11-20: Performance and Security
  {
    id: 11,
    question: "Uma aplicação precisa de cache de sessão distribuído com latência de milissegundos. Qual serviço é mais apropriado?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon ElastiCache",
      "Amazon S3"
    ],
    correctAnswer: 2,
    explanation: "ElastiCache (Redis ou Memcached) é otimizado para cache em memória com latência de sub-milissegundos. É ideal para cache de sessão, cache de banco de dados e armazenamento de dados temporários de alta performance.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 12,
    question: "Uma empresa precisa criptografar dados em repouso em volumes EBS. Qual é a forma mais simples de implementar isso?",
    options: [
      "Usar software de terceiros para criptografar dados antes de armazenar",
      "Habilitar EBS encryption ao criar o volume",
      "Configurar criptografia a nível de aplicação",
      "Usar AWS CloudHSM"
    ],
    correctAnswer: 1,
    explanation: "EBS oferece criptografia nativa integrada com AWS KMS. Ao habilitar encryption durante criação do volume, todos os dados são automaticamente criptografados em repouso sem impacto na aplicação.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 13,
    question: "Uma aplicação global precisa distribuir conteúdo estático (imagens, vídeos) para usuários ao redor do mundo com baixa latência. Qual serviço AWS deve ser usado?",
    options: [
      "Amazon S3 com replicação cross-region",
      "Amazon CloudFront",
      "Amazon Route 53",
      "AWS Global Accelerator"
    ],
    correctAnswer: 1,
    explanation: "CloudFront é a CDN da AWS, otimizada para distribuir conteúdo estático globalmente com cache em edge locations. Reduz latência servindo conteúdo do ponto mais próximo do usuário.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 14,
    question: "Uma aplicação usa IAM roles para EC2 acessarem S3. As credenciais temporárias estão expirando muito rapidamente. Como aumentar a duração das credenciais?",
    options: [
      "Modificar a MaxSessionDuration da IAM role",
      "Usar IAM users ao invés de roles",
      "Configurar credenciais permanentes no EC2",
      "Não é possível modificar a duração"
    ],
    correctAnswer: 0,
    explanation: "IAM roles para EC2 permitem configurar MaxSessionDuration de 1 hora até 12 horas. Isso define quanto tempo as credenciais temporárias são válidas antes de precisarem ser renovadas.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 15,
    question: "Uma aplicação usa RDS MySQL. Durante picos de tráfego, o banco está atingindo 100% de CPU. Qual solução melhora performance sem alterar a aplicação?",
    options: [
      "Criar índices adicionais no banco de dados",
      "Implementar RDS Read Replicas e direcionar queries de leitura para elas",
      "Migrar para Aurora Serverless",
      "Aumentar o tamanho da instância RDS"
    ],
    correctAnswer: 1,
    explanation: "RDS Read Replicas distribuem carga de leitura, reduzindo CPU da instância principal. É a solução mais eficiente para workloads read-heavy. Requer apenas alterar connection string para leituras, sem mudanças na aplicação.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 16,
    question: "Uma empresa precisa auditar todas as chamadas de API feitas em sua conta AWS para conformidade. Qual serviço deve ser habilitado?",
    options: [
      "AWS Config",
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "AWS X-Ray"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail registra todas as chamadas de API na conta AWS, incluindo quem, quando, de onde e quais ações foram realizadas. É essencial para auditoria, conformidade e análise de segurança.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 17,
    question: "Uma aplicação precisa processar grandes volumes de dados em batch com requisitos de computação variáveis. A empresa quer minimizar custos. Qual solução é mais apropriada?",
    options: [
      "EC2 On-Demand com Auto Scaling",
      "EC2 Reserved Instances",
      "EC2 Spot Instances com AWS Batch",
      "Lambda com Step Functions"
    ],
    correctAnswer: 2,
    explanation: "Spot Instances com AWS Batch oferece até 90% de desconto comparado a On-Demand. AWS Batch gerencia automaticamente provisionamento, scaling e agendamento. Ideal para batch processing tolerante a interrupções.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 18,
    question: "Uma aplicação serverless precisa acessar secrets como senhas de banco de dados. Onde armazenar esses secrets de forma segura?",
    options: [
      "Variáveis de ambiente do Lambda",
      "AWS Systems Manager Parameter Store ou AWS Secrets Manager",
      "Hardcoded no código da função Lambda",
      "Em um arquivo de configuração no S3"
    ],
    correctAnswer: 1,
    explanation: "Parameter Store e Secrets Manager são projetados para armazenar secrets com criptografia. Secrets Manager oferece rotação automática. Ambos integram com Lambda via IAM roles sem expor credenciais no código.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 19,
    question: "Uma empresa quer implementar blue/green deployment para aplicação em EC2 com mínimo downtime. Qual serviço facilita isso?",
    options: [
      "AWS CloudFormation",
      "AWS CodeDeploy",
      "AWS Elastic Beanstalk",
      "AWS Systems Manager"
    ],
    correctAnswer: 1,
    explanation: "CodeDeploy suporta nativamente blue/green deployments, gerenciando o tráfego entre ambientes. Permite rollback instantâneo se houver problemas. Integra com ELB para switching automático de tráfego.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 20,
    question: "Uma aplicação precisa analisar logs de aplicação em tempo real e criar alarmes baseados em padrões específicos. Quais serviços AWS devem ser usados? (Escolha 2)",
    options: [
      "Amazon CloudWatch Logs",
      "AWS CloudTrail",
      "Amazon CloudWatch Alarms",
      "AWS Config Rules",
      "Amazon EventBridge"
    ],
    correctAnswer: [0, 2],
    explanation: "CloudWatch Logs coleta e analisa logs em tempo real. CloudWatch Alarms cria alertas baseados em métricas e filtros de log. Juntos permitem monitoramento proativo e resposta a padrões específicos nos logs.",
    domain: 'performance',
    difficulty: 'medium',
    multipleChoice: true
  },
  // Questions 21-30: Cost Optimization and Advanced Architecture
  {
    id: 21,
    question: "Uma empresa tem workloads de desenvolvimento que rodam apenas durante horário comercial (9h-18h, segunda a sexta). Como otimizar custos de EC2?",
    options: [
      "Usar Reserved Instances",
      "Usar Spot Instances",
      "Usar Instance Scheduler para parar instâncias fora do horário comercial",
      "Migrar para Lambda"
    ],
    correctAnswer: 2,
    explanation: "Instance Scheduler permite automatizar start/stop de EC2 baseado em schedule. Para ambientes de dev/test com uso previsível e limitado, economiza ~60% parando instâncias quando não estão em uso. Paga apenas pelas horas rodando.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 22,
    question: "Uma aplicação armazena dados de IoT com milhões de writes por segundo. Qual banco de dados é mais apropriado?",
    options: [
      "Amazon RDS MySQL",
      "Amazon DynamoDB",
      "Amazon Aurora",
      "Amazon Redshift"
    ],
    correctAnswer: 1,
    explanation: "DynamoDB é NoSQL totalmente gerenciado otimizado para workloads de altíssima throughput (milhões de requests/segundo). Escala horizontalmente sem limites. RDS e Aurora têm limites verticais. Redshift é para analytics, não OLTP.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 23,
    question: "Uma empresa precisa garantir que dados no S3 nunca sejam excluídos, mesmo por administradores, durante 7 anos. Qual recurso usar?",
    options: [
      "S3 Versioning",
      "S3 Object Lock em modo Governance",
      "S3 Object Lock em modo Compliance",
      "MFA Delete"
    ],
    correctAnswer: 2,
    explanation: "S3 Object Lock em modo Compliance impede exclusão ou modificação de objetos durante período definido, mesmo pelo root user. Governance permite usuários com permissões especiais sobrescrever. Compliance é ideal para requisitos regulatórios imutáveis.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 24,
    question: "Uma aplicação web está recebendo tráfego malicioso de IPs específicos. Como bloquear esses IPs rapidamente?",
    options: [
      "Configurar Security Group para negar IPs",
      "Configurar Network ACL para negar IPs",
      "Usar AWS WAF com IP set",
      "Usar AWS Shield Advanced"
    ],
    correctAnswer: 2,
    explanation: "AWS WAF permite criar regras para bloquear IPs específicos rapidamente. Security Groups só permitem allow rules (não deny). NACLs funcionam mas WAF é mais flexível e oferece regras avançadas. Shield é para DDoS, não filtragem de IP.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 25,
    question: "Uma aplicação usa EFS para armazenamento compartilhado entre múltiplas instâncias EC2. O acesso está lento. Como melhorar performance?",
    options: [
      "Migrar para EBS",
      "Habilitar EFS Max I/O performance mode",
      "Usar EFS Provisioned Throughput",
      "Adicionar mais instâncias EC2"
    ],
    correctAnswer: 2,
    explanation: "EFS Provisioned Throughput permite especificar throughput independente do tamanho armazenado. EFS usa Bursting por padrão (throughput baseado em tamanho). Para workloads com alto throughput e pouco armazenamento, Provisioned é ideal.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 26,
    question: "Uma empresa quer migrar aplicação on-premises para AWS mantendo endereços IP existentes. Qual serviço permite isso?",
    options: [
      "AWS Direct Connect",
      "AWS Global Accelerator",
      "Bring Your Own IP (BYOIP)",
      "Elastic IP"
    ],
    correctAnswer: 2,
    explanation: "BYOIP permite trazer blocos de IP públicos próprios para AWS. Mantém endereços IP existentes durante migração, evitando necessidade de atualizar DNS ou certificados. Elastic IP são IPs da AWS, não próprios.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 27,
    question: "Uma aplicação serverless Lambda está timeout após 15 minutos. Como resolver para processos mais longos?",
    options: [
      "Aumentar timeout do Lambda para 30 minutos",
      "Dividir processamento em múltiplas invocações Lambda com Step Functions",
      "Migrar para Fargate",
      "Usar Lambda com Provisioned Concurrency"
    ],
    correctAnswer: 1,
    explanation: "Lambda tem timeout máximo de 15 minutos (não configurável acima disso). Step Functions orquestra múltiplas funções Lambda, permitindo workflows longos. Para processos >15min, Step Functions ou migração para Fargate/ECS são necessários.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 28,
    question: "Uma empresa precisa análise de big data em petabytes de dados. Qual serviço é mais econômico para queries analíticas?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon Athena"
    ],
    correctAnswer: 3,
    explanation: "Athena é serverless e cobra por quantidade de dados escaneados. Para queries analíticas ocasionais em grandes volumes no S3, é mais econômico que Redshift (que cobra por cluster sempre rodando). Redshift é melhor para analytics contínua.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 29,
    question: "Uma aplicação precisa garantir que usuários acessem apenas seus próprios dados no DynamoDB. Como implementar controle de acesso granular?",
    options: [
      "Criar uma tabela DynamoDB separada por usuário",
      "Usar IAM policies com condições de fine-grained access control",
      "Implementar lógica na aplicação",
      "Usar Cognito User Pools"
    ],
    correctAnswer: 1,
    explanation: "IAM policies com condições permitem fine-grained access control no DynamoDB. Usando atributos como cognito:sub, garante que usuários só acessem items onde partition key corresponde ao seu ID. Mais seguro e escalável que lógica de aplicação.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 30,
    question: "Uma aplicação está rodando em ECS Fargate. A empresa quer otimizar custos mantendo alta disponibilidade. Quais estratégias usar? (Escolha 2)",
    options: [
      "Usar Fargate Spot para tasks não críticas",
      "Reduzir número de availability zones",
      "Usar Savings Plans para Fargate",
      "Desabilitar Auto Scaling",
      "Migrar para EC2"
    ],
    correctAnswer: [0, 2],
    explanation: "Fargate Spot oferece até 70% desconto para cargas tolerantes a interrupção. Savings Plans para Compute oferecem até 50% desconto em Fargate com commitment de 1-3 anos. Ambos mantêm alta disponibilidade e reduzem custos significativamente.",
    domain: 'cost',
    difficulty: 'medium',
    multipleChoice: true
  },
  // Questions 31-40: VPC, Networking and Hybrid Cloud
  {
    id: 31,
    question: "Uma aplicação em VPC privada precisa acessar S3 sem tráfego passar pela internet. Qual solução usar?",
    options: [
      "NAT Gateway",
      "Internet Gateway",
      "VPC Endpoint (Gateway Endpoint para S3)",
      "VPN"
    ],
    correctAnswer: 2,
    explanation: "VPC Gateway Endpoint para S3 permite acesso direto ao S3 sem tráfego sair da rede AWS. Não cobra por transferência, é mais seguro e performático que NAT Gateway. Gateway Endpoints são gratuitos.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 32,
    question: "Uma empresa precisa conectar VPC AWS com datacenter on-premises com conexão dedicada e privada. Qual serviço usar?",
    options: [
      "VPN Site-to-Site",
      "AWS Direct Connect",
      "VPC Peering",
      "Transit Gateway"
    ],
    correctAnswer: 1,
    explanation: "Direct Connect fornece conexão de rede dedicada privada entre datacenter e AWS. Oferece maior bandwidth, latência consistente e mais segurança que VPN pela internet. VPN é alternativa mais barata mas usa internet pública.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 33,
    question: "Uma aplicação usa ALB para distribuir tráfego. Durante análise de logs, detectou-se que alguns clients estão fazendo requisições excessivas. Como limitar taxa de requisições por IP?",
    options: [
      "Configurar rate limiting no Security Group",
      "Usar AWS WAF com rate-based rule no ALB",
      "Implementar rate limiting na aplicação",
      "Usar Network ACL"
    ],
    correctAnswer: 1,
    explanation: "AWS WAF suporta rate-based rules que limitam número de requisições por IP em período de tempo. Integra diretamente com ALB. Security Groups e NACLs não suportam rate limiting.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 34,
    question: "Uma empresa tem 50 VPCs que precisam se comunicar entre si. Qual é a solução mais escalável e gerenciável?",
    options: [
      "Criar VPC Peering entre todas as VPCs (malha completa)",
      "Usar AWS Transit Gateway",
      "Usar VPN entre todas VPCs",
      "Consolidar tudo em uma única VPC"
    ],
    correctAnswer: 1,
    explanation: "Transit Gateway atua como hub central conectando múltiplas VPCs. Evita complexidade de malha completa de peering (50 VPCs = 1225 conexões). Simplifica gerenciamento, roteamento e adiciona VPCs facilmente.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 35,
    question: "Uma aplicação precisa resolver nomes DNS de serviços on-premises de dentro da VPC AWS. Como configurar?",
    options: [
      "Usar Route 53 Public Hosted Zone",
      "Usar Route 53 Resolver com regras de forwarding",
      "Configurar DNS server no EC2",
      "Usar VPC DNS resolver padrão"
    ],
    correctAnswer: 1,
    explanation: "Route 53 Resolver permite criar regras de forwarding para encaminhar queries DNS de domínios específicos para resolvers on-premises. Integra DNS híbrido entre AWS e datacenter de forma gerenciada.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 36,
    question: "Uma aplicação em subnet privada precisa fazer updates de sistema operacional de repositórios da internet. Qual solução mais econômica?",
    options: [
      "Criar Internet Gateway",
      "Criar NAT Gateway em cada AZ",
      "Criar NAT Gateway em uma AZ e rotear de outras AZs",
      "Usar VPC Endpoint"
    ],
    correctAnswer: 2,
    explanation: "NAT Gateway cobra por hora e por GB transferido. Usar um NAT Gateway em uma AZ e rotear de outras reduz custo (um NAT ao invés de múltiplos). Trade-off: se a AZ falhar, outras AZs perdem acesso internet. Para alta disponibilidade, um NAT por AZ é recomendado.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 37,
    question: "Uma empresa quer bloquear todo tráfego de saída exceto para domínios específicos (whitelist). Como implementar no nível de VPC?",
    options: [
      "Configurar Security Group com regras de saída",
      "Configurar Network ACL",
      "Usar AWS Network Firewall",
      "Usar WAF"
    ],
    correctAnswer: 2,
    explanation: "AWS Network Firewall permite filtragem stateful avançada incluindo filtragem por domínio (DNS filtering). Security Groups e NACLs trabalham com IPs/portas, não domínios. Network Firewall é ideal para políticas de segurança granulares a nível de VPC.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 38,
    question: "Uma aplicação usa CloudFront para distribuir conteúdo. Como garantir que usuários acessem S3 apenas através do CloudFront, não diretamente?",
    options: [
      "Tornar bucket S3 privado",
      "Usar Origin Access Identity (OAI) ou Origin Access Control (OAC)",
      "Usar S3 bucket policy bloqueando IPs públicos",
      "Habilitar S3 Block Public Access"
    ],
    correctAnswer: 1,
    explanation: "OAI (legado) ou OAC (recomendado) cria identidade especial para CloudFront acessar S3. Bucket policy permite apenas OAI/OAC, bloqueando acesso direto. OAC é mais novo e suporta todos bucket configurations incluindo SSE-KMS.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 39,
    question: "Uma aplicação global precisa de failover automático entre regiões. Qual configuração do Route 53 usar?",
    options: [
      "Simple routing",
      "Weighted routing",
      "Failover routing com health checks",
      "Geolocation routing"
    ],
    correctAnswer: 2,
    explanation: "Failover routing com health checks monitora saúde do endpoint primário. Se health check falhar, Route 53 automaticamente roteia tráfego para endpoint secundário em outra região. Essencial para disaster recovery multi-região.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 40,
    question: "Uma aplicação usa NLB (Network Load Balancer). Qual é a principal diferença entre NLB e ALB?",
    options: [
      "NLB opera em Layer 4 (TCP/UDP), ALB em Layer 7 (HTTP/HTTPS)",
      "NLB é mais barato que ALB",
      "NLB não suporta múltiplas AZs",
      "ALB tem maior latência que NLB"
    ],
    correctAnswer: 0,
    explanation: "NLB opera na camada 4 (transporte - TCP/UDP) com latência ultra-baixa e milhões de req/s. ALB opera na camada 7 (aplicação - HTTP/HTTPS) com roteamento avançado baseado em path, host, headers. NLB preserva IP source, ALB não.",
    domain: 'performance',
    difficulty: 'medium'
  },
  // Questions 41-50: Database Services and Data Management
  {
    id: 41,
    question: "Uma aplicação precisa de banco de dados relacional com escalabilidade automática para lidar com tráfego imprevisível. Qual serviço usar?",
    options: [
      "Amazon RDS MySQL",
      "Amazon Aurora Serverless",
      "Amazon DynamoDB",
      "Amazon Redshift"
    ],
    correctAnswer: 1,
    explanation: "Aurora Serverless escala automaticamente capacidade de computação baseado na demanda real. Ideal para cargas imprevisíveis ou intermitentes. Paga apenas pelo uso (por ACU-hour), não por instância sempre rodando como RDS tradicional.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 42,
    question: "Uma empresa precisa migrar Oracle on-premises para AWS mantendo compatibilidade total. Qual opção oferece melhor compatibilidade?",
    options: [
      "Amazon RDS Oracle",
      "Amazon Aurora PostgreSQL",
      "Amazon DynamoDB",
      "Oracle no EC2"
    ],
    correctAnswer: 0,
    explanation: "RDS Oracle oferece Oracle gerenciado com compatibilidade total (procedimentos, packages, triggers). Aurora PostgreSQL é compatível com PostgreSQL, não Oracle. Oracle no EC2 oferece controle total mas requer gerenciamento manual (patches, backups).",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 43,
    question: "Uma aplicação usa DynamoDB. Algumas queries estão lentas pois filtram por atributos que não são partition key nem sort key. Como otimizar?",
    options: [
      "Criar Global Secondary Index (GSI) nos atributos filtrados",
      "Aumentar Read Capacity Units",
      "Migrar para RDS",
      "Usar Scan ao invés de Query"
    ],
    correctAnswer: 0,
    explanation: "GSI permite queries eficientes em atributos alternativos. Evita Scan (lento e caro). GSI tem sua própria partition key e sort key, permitindo queries rápidas em diferentes padrões de acesso sem redesenhar tabela principal.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 44,
    question: "Uma empresa precisa de data warehouse para analytics com dados estruturados de múltiplas fontes. Qual serviço é mais apropriado?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon ElastiCache"
    ],
    correctAnswer: 2,
    explanation: "Redshift é data warehouse otimizado para OLAP (analytics) com queries complexas em petabytes. Usa armazenamento colunar e processamento paralelo massivo (MPP). RDS é OLTP, não otimizado para analytics de grande escala.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 45,
    question: "Uma aplicação usa RDS com automated backups. Após um problema, a equipe precisa restaurar o banco para 30 minutos atrás. Isso é possível?",
    options: [
      "Não, apenas snapshots manuais podem ser restaurados",
      "Sim, Point-in-Time Recovery permite restaurar para qualquer momento dentro do período de retenção",
      "Não, apenas para momento exato dos snapshots automáticos",
      "Sim, mas apenas para hora cheia (ex: 10:00, 11:00)"
    ],
    correctAnswer: 1,
    explanation: "RDS automated backups incluem Point-in-Time Recovery (PITR) permitindo restaurar para qualquer segundo dentro do período de retenção (até 35 dias). Usa transaction logs para reconstruir estado exato do banco em momento específico.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 46,
    question: "Uma aplicação precisa cache distribuído com suporte a estruturas de dados complexas (listas, sets, sorted sets). Qual opção do ElastiCache usar?",
    options: [
      "Memcached",
      "Redis",
      "Tanto Memcached quanto Redis suportam",
      "Nenhum suporta estruturas complexas"
    ],
    correctAnswer: 1,
    explanation: "Redis suporta estruturas de dados avançadas (strings, hashes, lists, sets, sorted sets, bitmaps). Memcached é mais simples, apenas key-value. Redis também oferece persistência, replicação, pub/sub e transações.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 47,
    question: "Uma empresa quer replicar dados do DynamoDB para outra região para disaster recovery com latência mínima. Qual recurso usar?",
    options: [
      "DynamoDB Streams com Lambda para replicação manual",
      "DynamoDB Global Tables",
      "AWS Database Migration Service",
      "Backup e restore manual"
    ],
    correctAnswer: 1,
    explanation: "Global Tables fornece replicação multi-região totalmente gerenciada com replicação automática e latência típica de menos de 1 segundo. Multi-master permite writes em qualquer região. Ideal para DR e aplicações globais.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 48,
    question: "Uma aplicação precisa armazenar documentos JSON com schemas variáveis e fazer queries complexas. Qual banco de dados é mais apropriado?",
    options: [
      "Amazon RDS MySQL",
      "Amazon DocumentDB (compatível com MongoDB)",
      "Amazon Redshift",
      "Amazon ElastiCache"
    ],
    correctAnswer: 1,
    explanation: "DocumentDB é banco de documentos gerenciado compatível com MongoDB. Otimizado para armazenar, consultar e indexar documentos JSON. Schemas flexíveis e queries ricas em documentos semi-estruturados.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 49,
    question: "Uma empresa tem read-heavy workload no RDS. Adicionou 5 Read Replicas mas ainda há alta latência. Qual pode ser o problema?",
    options: [
      "Aplicação não está distribuindo leituras entre replicas",
      "Read Replicas não funcionam para reduzir latência",
      "Precisa de mais Read Replicas",
      "RDS não suporta Read Replicas"
    ],
    correctAnswer: 0,
    explanation: "Read Replicas não distribuem tráfego automaticamente. Aplicação precisa configurar connection strings para direcionar queries de leitura para endpoints das replicas. Sem essa configuração, todo tráfego vai para instância principal.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 50,
    question: "Uma aplicação usa DynamoDB com reads previsíveis mas writes muito variáveis. Como otimizar custos de capacidade?",
    options: [
      "Usar Provisioned capacity mode com auto scaling",
      "Usar On-Demand capacity mode",
      "Usar Reserved Capacity",
      "Usar Provisioned sem auto scaling"
    ],
    correctAnswer: 1,
    explanation: "On-Demand mode é ideal para workloads imprevisíveis ou com spikes. Paga por request sem precisar provisionar capacidade. Para writes muito variáveis, evita over-provisioning (desperdício) ou under-provisioning (throttling). Provisioned é melhor para uso constante e previsível.",
    domain: 'cost',
    difficulty: 'medium'
  },
  // Questions 51-60: Storage Services and Data Transfer
  {
    id: 51,
    question: "Uma empresa precisa transferir 100 TB de dados de datacenter on-premises para S3. A conexão de internet é lenta (100 Mbps). Qual solução mais rápida?",
    options: [
      "Upload direto via internet",
      "AWS Direct Connect",
      "AWS Snowball",
      "AWS DataSync"
    ],
    correctAnswer: 2,
    explanation: "Snowball é dispositivo físico que comporta até 80 TB. Para 100 TB com conexão lenta, Snowball é mais rápido (envio físico ~1 semana) que upload pela internet (100TB a 100Mbps = ~3 meses). Para >10 TB com conexão limitada, Snowball é recomendado.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 52,
    question: "Uma aplicação armazena imagens no S3. Algumas imagens são acessadas frequentemente, outras raramente. Como otimizar custos automaticamente?",
    options: [
      "Usar S3 Standard para todas",
      "Usar S3 Intelligent-Tiering",
      "Mover manualmente para S3 Glacier",
      "Usar lifecycle policies com tempo fixo"
    ],
    correctAnswer: 1,
    explanation: "S3 Intelligent-Tiering monitora padrões de acesso e move objetos automaticamente entre tiers (Frequent, Infrequent, Archive, Deep Archive) sem impacto de performance. Ideal para padrões de acesso desconhecidos ou variáveis. Sem taxas de recuperação.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 53,
    question: "Uma aplicação usa EC2 com EBS volumes. A empresa precisa backup automatizado dos volumes. Qual solução?",
    options: [
      "Configurar scripts cron no EC2 para copiar dados",
      "Usar AWS Backup para gerenciar backups de EBS",
      "Criar snapshots manualmente todos os dias",
      "Usar RAID para redundância"
    ],
    correctAnswer: 1,
    explanation: "AWS Backup centraliza e automatiza backups de múltiplos serviços incluindo EBS. Define políticas de backup, retenção e lifecycle. Mais gerenciável e confiável que scripts manuais. Suporta backup cross-region e cross-account.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 54,
    question: "Uma aplicação precisa armazenar arquivos que devem ser acessíveis imediatamente mas são raramente acessados (menos de 1 vez/mês). Qual storage class S3 usar?",
    options: [
      "S3 Standard",
      "S3 Standard-IA (Infrequent Access)",
      "S3 Glacier Flexible Retrieval",
      "S3 One Zone-IA"
    ],
    correctAnswer: 1,
    explanation: "S3 Standard-IA é para dados acessados raramente mas que requerem acesso imediato quando necessário. Mais barato que Standard (~50% menos). Glacier tem delay de minutos/horas. One Zone-IA não tem redundância multi-AZ.",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 55,
    question: "Uma empresa quer sincronizar arquivos entre NFS on-premises e S3 automaticamente. Qual serviço usar?",
    options: [
      "AWS Storage Gateway - File Gateway",
      "AWS DataSync",
      "AWS Transfer Family",
      "S3 Transfer Acceleration"
    ],
    correctAnswer: 1,
    explanation: "DataSync automatiza transferência de dados entre on-premises e AWS (S3, EFS, FSx). Otimizado para grandes volumes com criptografia, validação de integridade e scheduling. File Gateway é para acesso contínuo via NFS/SMB, não sincronização agendada.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 56,
    question: "Uma aplicação precisa armazenar arquivos de vídeo grandes (>5 GB) no S3. Qual método de upload usar para melhor performance e confiabilidade?",
    options: [
      "Upload padrão PUT Object",
      "Multipart Upload",
      "S3 Transfer Acceleration",
      "AWS DataSync"
    ],
    correctAnswer: 1,
    explanation: "Multipart Upload divide objetos grandes em partes menores enviadas em paralelo. Obrigatório para objetos >5GB, recomendado para >100MB. Benefícios: melhor throughput (paralelo), recuperação de falhas (reenvio apenas da parte falhada), upload durante criação do objeto.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 57,
    question: "Uma aplicação usa EBS io2 volumes mas está cara. Análise mostra que IOPS requerido varia muito ao longo do dia. Como otimizar custos?",
    options: [
      "Migrar para EBS gp3 com IOPS configurável",
      "Migrar para EBS st1",
      "Usar EBS Snapshots",
      "Adicionar mais volumes"
    ],
    correctAnswer: 0,
    explanation: "gp3 permite configurar IOPS independente do tamanho do volume (até 16.000 IOPS) com custo previsível. Mais barato que io2 para a maioria dos casos. io2 é para aplicações que precisam >16.000 IOPS ou sub-millisecond latency. st1 é HDD (throughput otimizado, não IOPS).",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 58,
    question: "Uma empresa precisa compartilhar terabytes de dados com parceiros externos que não têm conta AWS. Qual método mais seguro e controlado?",
    options: [
      "Tornar bucket S3 público",
      "Criar IAM users para parceiros",
      "Usar S3 Presigned URLs com expiração",
      "Enviar dados por email"
    ],
    correctAnswer: 2,
    explanation: "Presigned URLs permitem acesso temporário a objetos S3 específicos sem expor bucket ou requerer conta AWS. URLs expiram automaticamente. Controla exatamente qual objeto e por quanto tempo pode ser acessado. Mais seguro que bucket público.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 59,
    question: "Uma aplicação usa FSx for Windows File Server. Como garantir alta disponibilidade e recuperação de desastres?",
    options: [
      "FSx é automaticamente resiliente, não requer configuração",
      "Configurar Multi-AZ deployment e backups automáticos",
      "Criar snapshots manuais diariamente",
      "Usar RAID entre múltiplos FSx"
    ],
    correctAnswer: 1,
    explanation: "FSx Multi-AZ replica dados sincronamente em duas AZs com failover automático. Backups automáticos diários para ponto de recuperação. Multi-AZ protege contra falha de AZ, backups protegem contra exclusão/corrupção de dados.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 60,
    question: "Uma aplicação precisa de filesystem compartilhado POSIX-compliant acessível por múltiplas instâncias EC2 Linux. Qual serviço usar?",
    options: [
      "Amazon EBS",
      "Amazon EFS",
      "Amazon FSx for Windows",
      "Amazon S3"
    ],
    correctAnswer: 1,
    explanation: "EFS é filesystem NFS totalmente gerenciado POSIX-compliant. Pode ser montado simultaneamente por milhares de EC2 Linux. Escala automaticamente. EBS é block storage anexado a uma EC2 por vez. FSx Windows é para SMB. S3 não é filesystem mountável.",
    domain: 'performance',
    difficulty: 'easy'
  },
  // Questions 61-70: Monitoring, Logging and Automation
  {
    id: 61,
    question: "Uma aplicação precisa ser notificada quando CPU de EC2 exceder 80% por 5 minutos consecutivos. Quais serviços usar? (Escolha 2)",
    options: [
      "CloudWatch Metrics",
      "CloudWatch Alarms",
      "Amazon SNS",
      "AWS Config",
      "AWS X-Ray"
    ],
    correctAnswer: [1, 2],
    explanation: "CloudWatch Alarms monitora métricas e trigger quando thresholds são atingidos. SNS envia notificações (email, SMS, Lambda). CloudWatch Metrics coleta dados, Alarms avalia condições, SNS notifica. X-Ray é tracing, Config monitora configurações.",
    domain: 'performance',
    difficulty: 'easy',
    multipleChoice: true
  },
  {
    id: 62,
    question: "Uma empresa precisa rastrear chamadas entre microservices para debug de performance. Qual serviço usar?",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch Logs",
      "AWS X-Ray",
      "AWS Config"
    ],
    correctAnswer: 2,
    explanation: "X-Ray fornece distributed tracing, mostrando chamadas entre serviços, latência de cada componente e erros. Gera mapa de serviços visual. CloudTrail é audit de API calls. CloudWatch Logs são logs de aplicação. Config monitora configurações.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 63,
    question: "Uma aplicação Lambda precisa ser executada sempre que um novo objeto for criado no S3. Como configurar?",
    options: [
      "Configurar CloudWatch Events",
      "Configurar S3 Event Notification para invocar Lambda",
      "Polling manual do S3",
      "Usar Step Functions"
    ],
    correctAnswer: 1,
    explanation: "S3 Event Notifications invoca Lambda automaticamente quando eventos ocorrem (PUT, POST, DELETE). Configuração direta no bucket S3 ou via EventBridge. Sem necessidade de polling ou infraestrutura adicional.",
    domain: 'performance',
    difficulty: 'easy'
  },
  {
    id: 64,
    question: "Uma empresa precisa automatizar patch management de centenas de instâncias EC2 e on-premises. Qual serviço usar?",
    options: [
      "AWS CloudFormation",
      "AWS Systems Manager Patch Manager",
      "AWS CodeDeploy",
      "Scripts manuais com cron"
    ],
    correctAnswer: 1,
    explanation: "Systems Manager Patch Manager automatiza patching de OS em escala para EC2 e on-premises. Define baselines de patches, schedules de manutenção e compliance tracking. Gerenciado e auditável.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 65,
    question: "Uma aplicação precisa executar comandos em múltiplas instâncias EC2 simultaneamente sem SSH. Como fazer?",
    options: [
      "SSM Run Command",
      "SSH em loop",
      "Lambda com boto3",
      "CloudFormation"
    ],
    correctAnswer: 0,
    explanation: "Systems Manager Run Command executa comandos remotamente em múltiplas instâncias simultaneamente sem SSH/RDP. Requer SSM Agent instalado. Auditável via CloudTrail, controlado por IAM. Mais seguro e escalável que SSH manual.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 66,
    question: "Uma empresa quer visualizar custos AWS por projeto, ambiente (dev/prod) e departamento. Como implementar?",
    options: [
      "Criar contas AWS separadas",
      "Usar AWS Cost Explorer com Cost Allocation Tags",
      "Analisar faturas manualmente",
      "Usar AWS Budgets"
    ],
    correctAnswer: 1,
    explanation: "Cost Allocation Tags categorizam custos por dimensões customizadas (projeto, ambiente, departamento). Cost Explorer visualiza e analisa custos por tags. AWS Budgets define limites, mas tags são essenciais para categorização granular.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 67,
    question: "Uma aplicação usa múltiplos serviços AWS (Lambda, DynamoDB, SQS). Como obter visibilidade completa de todas as interações?",
    options: [
      "CloudWatch Logs em cada serviço",
      "AWS X-Ray com instrumentação de aplicação",
      "CloudTrail",
      "Logs customizados"
    ],
    correctAnswer: 1,
    explanation: "X-Ray com instrumentação (AWS SDK) traça requests através de serviços gerenciados (Lambda, DynamoDB, SQS, SNS) automaticamente. Service map mostra dependências. Segmentos mostram tempo gasto em cada serviço. CloudWatch Logs não correlaciona entre serviços.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 68,
    question: "Uma empresa precisa garantir que todos os buckets S3 tenham criptografia habilitada. Como enforçar essa política?",
    options: [
      "Configurar manualmente cada bucket",
      "Usar AWS Config Rules para detectar e remediar",
      "Usar CloudWatch Alarms",
      "Auditar mensalmente"
    ],
    correctAnswer: 1,
    explanation: "AWS Config monitora configurações continuamente. Regras (managed ou custom) detectam non-compliance (ex: s3-bucket-server-side-encryption-enabled). Pode trigger automação de remediação via SSM documents ou Lambda para enforçar política.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 69,
    question: "Uma aplicação usa CloudWatch Logs. Os logs estão crescendo rapidamente e aumentando custos. Como otimizar?",
    options: [
      "Deletar logs manualmente",
      "Configurar Log Retention policies e exportar para S3",
      "Parar de enviar logs",
      "Usar CloudTrail"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch Logs permite definir retention period (1 dia a 10 anos ou indefinido). Exportar logs antigos para S3 (muito mais barato) para arquivo de longo prazo. Mantém logs recentes no CloudWatch para busca rápida, antigos no S3 por custo.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 70,
    question: "Uma aplicação serverless tem cold starts lentos. Como reduzir latência de cold starts em Lambda?",
    options: [
      "Aumentar memória alocada",
      "Usar Provisioned Concurrency",
      "Reduzir tamanho do deployment package",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Múltiplas estratégias: Provisioned Concurrency mantém funções warm (elimina cold start mas aumenta custo). Aumentar memória dá mais CPU (init mais rápido). Reduzir package size acelera download/init. Combinar estratégias para melhor resultado.",
    domain: 'performance',
    difficulty: 'hard',
    multipleChoice: false
  },
  // Questions 71-80: Containers and Serverless Compute
  {
    id: 71,
    question: "Uma aplicação containerizada precisa rodar sem gerenciar servidores EC2. Quais opções serverless estão disponíveis? (Escolha 2)",
    options: [
      "Amazon ECS com EC2 launch type",
      "Amazon ECS com Fargate launch type",
      "Amazon EKS com Fargate",
      "Amazon EC2 com Docker",
      "Lambda Container Images"
    ],
    correctAnswer: [1, 2],
    explanation: "ECS Fargate e EKS Fargate são serverless para containers - não gerencia EC2. Lambda Container Images permite até 10GB mas tem limitações (15min timeout). ECS com EC2 e EC2 com Docker requerem gerenciar servidores.",
    domain: 'cost',
    difficulty: 'medium',
    multipleChoice: true
  },
  {
    id: 72,
    question: "Uma aplicação ECS precisa pull de imagens Docker de repositório privado. Como armazenar credenciais do registry de forma segura?",
    options: [
      "Hardcoded na task definition",
      "Armazenar em Secrets Manager e referenciar na task definition",
      "Variáveis de ambiente em plaintext",
      "Arquivo de configuração no S3"
    ],
    correctAnswer: 1,
    explanation: "Secrets Manager armazena credenciais criptografadas. ECS task definition pode referenciar secrets que são injetados em runtime. Suporta rotação automática. Mais seguro que plaintext ou hardcoded.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 73,
    question: "Uma aplicação Lambda processa mensagens de SQS queue. Durante picos, muitas mensagens falham devido ao timeout de 15 minutos do Lambda. Qual solução?",
    options: [
      "Aumentar timeout do Lambda para 30 minutos",
      "Quebrar processamento em mensagens menores ou usar Step Functions",
      "Aumentar memória do Lambda",
      "Usar múltiplas funções Lambda"
    ],
    correctAnswer: 1,
    explanation: "Lambda tem timeout máximo fixo de 15 minutos. Para processos mais longos: dividir trabalho em mensagens menores (cada <15min) ou usar Step Functions para orquestrar múltiplas Lambdas. Outra opção: migrar para Fargate/ECS para processos longos.",
    domain: 'performance',
    difficulty: 'hard'
  },
  {
    id: 74,
    question: "Uma aplicação Kubernetes on-premises precisa ser migrada para AWS. A equipe quer manter compatibilidade total com Kubernetes. Qual serviço usar?",
    options: [
      "Amazon ECS",
      "Amazon EKS",
      "AWS Fargate",
      "Lambda"
    ],
    correctAnswer: 1,
    explanation: "EKS (Elastic Kubernetes Service) é Kubernetes gerenciado compatível com upstream Kubernetes. Suporta ferramentas Kubernetes padrão (kubectl, Helm). Permite migração fácil de clusters existentes. ECS é orquestrador AWS-específico.",
    domain: 'resilient',
    difficulty: 'easy'
  },
  {
    id: 75,
    question: "Uma aplicação Lambda acessa RDS em VPC privada. Como configurar Lambda para acessar RDS?",
    options: [
      "Lambda não pode acessar VPC",
      "Configurar Lambda VPC settings com security groups e subnets privadas",
      "Tornar RDS público",
      "Usar NAT Gateway"
    ],
    correctAnswer: 1,
    explanation: "Lambda pode ser configurado para rodar em VPC especificando subnets e security groups. Lambda cria ENIs na VPC para acessar recursos privados como RDS. Importante: usar NAT Gateway se Lambda precisar acesso internet também.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 76,
    question: "Uma aplicação ECS Fargate está cara. Algumas tasks podem ser interrompidas. Como reduzir custos?",
    options: [
      "Migrar para ECS EC2",
      "Usar Fargate Spot",
      "Reduzir CPU/memória",
      "Usar Lambda"
    ],
    correctAnswer: 1,
    explanation: "Fargate Spot oferece até 70% desconto comparado a Fargate regular. Ideal para tasks tolerantes a interrupção (batch, CI/CD, stateless). AWS avisa 2 minutos antes de interromper. Para tasks críticas, manter Fargate regular.",
    domain: 'cost',
    difficulty: 'medium'
  },
  {
    id: 77,
    question: "Uma aplicação usa API Gateway com Lambda backend. Como implementar rate limiting por usuário?",
    options: [
      "Configurar throttling no API Gateway",
      "Usar API Gateway Usage Plans com API Keys",
      "Implementar rate limiting no Lambda",
      "Usar WAF"
    ],
    correctAnswer: 1,
    explanation: "Usage Plans no API Gateway permitem definir throttling e quotas por API key (usuário). Cada cliente recebe API key com limites específicos. API Gateway enforça automaticamente. Throttling global não diferencia usuários.",
    domain: 'secure',
    difficulty: 'hard'
  },
  {
    id: 78,
    question: "Uma aplicação containerizada precisa armazenar imagens Docker de forma privada e segura. Onde armazenar?",
    options: [
      "Docker Hub público",
      "Amazon ECR (Elastic Container Registry)",
      "Amazon S3",
      "GitHub"
    ],
    correctAnswer: 1,
    explanation: "ECR é registry de imagens Docker/OCI totalmente gerenciado e privado. Integra com IAM para controle de acesso. Escaneia vulnerabilidades. Replicação cross-region. Integração nativa com ECS/EKS. S3 não é registry de containers.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 79,
    question: "Uma função Lambda é invocada milhões de vezes por dia processando eventos do S3. Como otimizar custos?",
    options: [
      "Aumentar memória para execução mais rápida",
      "Processar múltiplos eventos em batch",
      "Usar ARM Graviton2 (arm64 architecture)",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "Lambda cobra por GB-segundo. Otimizações: (1) Aumentar memória pode reduzir tempo (paradoxalmente reduzindo custo total). (2) Batch processing reduz invocações. (3) ARM Graviton2 é 20% mais barato que x86 com mesma performance. Combinar todas estratégias maximiza economia.",
    domain: 'cost',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 80,
    question: "Uma aplicação EKS precisa escalar pods automaticamente baseado em CPU. Qual recurso do Kubernetes usar?",
    options: [
      "Cluster Autoscaler",
      "Horizontal Pod Autoscaler (HPA)",
      "Vertical Pod Autoscaler",
      "Fargate Autoscaler"
    ],
    correctAnswer: 1,
    explanation: "HPA escala número de pods baseado em métricas (CPU, memória, custom). Cluster Autoscaler escala nodes (EC2) quando pods não cabem. VPA ajusta recursos de pods existentes. Para escalar pods por CPU, HPA é correto.",
    domain: 'performance',
    difficulty: 'medium'
  },
  // Questions 81-100: Security, Identity and Compliance
  {
    id: 81,
    question: "Uma aplicação web precisa autenticar usuários via Google e Facebook. Qual serviço AWS facilita isso?",
    options: [
      "IAM Users",
      "Amazon Cognito",
      "AWS SSO",
      "AWS Directory Service"
    ],
    correctAnswer: 1,
    explanation: "Cognito User Pools fornece autenticação com suporte a identity providers sociais (Google, Facebook, Amazon) e SAML. Gerencia sign-up, sign-in, tokens JWT. Cognito Identity Pools fornece credenciais AWS temporárias para usuários autenticados.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 82,
    question: "Uma empresa precisa criptografar dados sensíveis no DynamoDB. A empresa quer controle total sobre chaves de criptografia. Qual opção usar?",
    options: [
      "DynamoDB default encryption",
      "AWS Managed Keys (AWS KMS)",
      "Customer Managed Keys (CMK) no KMS",
      "Client-side encryption"
    ],
    correctAnswer: 2,
    explanation: "Customer Managed CMK no KMS dá controle total sobre chaves (rotação, políticas de acesso, audit). AWS Managed Keys são gerenciadas pela AWS. Client-side encryption funciona mas requer gerenciar chaves na aplicação. CMK oferece melhor balanço controle/conveniência.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 83,
    question: "Uma aplicação EC2 precisa acessar S3. Qual é a forma MAIS segura de fornecer credenciais?",
    options: [
      "Hardcoded access keys no código",
      "Variáveis de ambiente com access keys",
      "IAM Role anexado à instância EC2",
      "Armazenar keys em arquivo no EC2"
    ],
    correctAnswer: 2,
    explanation: "IAM Roles para EC2 fornecem credenciais temporárias automaticamente via instance metadata. Sem necessidade de gerenciar/rotacionar keys manualmente. Mais seguro que qualquer método envolvendo long-term credentials hardcoded.",
    domain: 'secure',
    difficulty: 'easy'
  },
  {
    id: 84,
    question: "Uma empresa quer detectar configurações inseguras como security groups abertas para internet. Qual serviço usar?",
    options: [
      "AWS CloudTrail",
      "Amazon GuardDuty",
      "AWS Config",
      "AWS Security Hub"
    ],
    correctAnswer: 2,
    explanation: "AWS Config avalia configurações de recursos contra regras (managed ou custom). Regra 'restricted-ssh' detecta security groups com porta 22 aberta para 0.0.0.0/0. GuardDuty é detecção de ameaças em runtime. Security Hub agrega findings mas usa Config como fonte.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 85,
    question: "Uma aplicação precisa rotacionar senha do banco de dados RDS automaticamente a cada 30 dias. Como implementar?",
    options: [
      "Lambda com EventBridge schedule",
      "AWS Secrets Manager com automatic rotation",
      "Rotação manual mensal",
      "Scripts cron no EC2"
    ],
    correctAnswer: 1,
    explanation: "Secrets Manager suporta rotação automática de secrets incluindo senhas RDS. Define schedule (ex: 30 dias), Secrets Manager invoca Lambda rotation function automaticamente. Atualiza banco e secret sem downtime. Integração nativa com RDS.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 86,
    question: "Uma empresa precisa compliance com PCI-DSS. Qual serviço ajuda a verificar conformidade de configurações AWS?",
    options: [
      "AWS Artifact",
      "AWS Config Conformance Packs",
      "AWS Audit Manager",
      "Todas as anteriores"
    ],
    correctAnswer: 3,
    explanation: "AWS Artifact fornece relatórios de compliance AWS. Config Conformance Packs implementa checks de conformidade (incluindo PCI-DSS templates). Audit Manager automatiza coleta de evidências para auditorias. Usar todos juntos fornece compliance abrangente.",
    domain: 'secure',
    difficulty: 'hard',
    multipleChoice: false
  },
  {
    id: 87,
    question: "Uma aplicação detectou atividade suspeita de uma instância EC2 (mineração de criptomoeda). Qual serviço AWS detecta essas ameaças?",
    options: [
      "AWS Config",
      "Amazon GuardDuty",
      "AWS CloudTrail",
      "AWS Inspector"
    ],
    correctAnswer: 1,
    explanation: "GuardDuty usa machine learning para detectar comportamento anômalo e ameaças (cryptocurrency mining, command & control, exfiltração de dados). Analisa CloudTrail, VPC Flow Logs e DNS logs. Inspector é vulnerability scanning, não threat detection.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 88,
    question: "Uma empresa quer federar acesso AWS com Active Directory corporativo on-premises. Qual solução usar?",
    options: [
      "Criar IAM users para cada funcionário",
      "AWS SSO integrado com AD via AWS Directory Service",
      "Usar root account",
      "Cognito User Pools"
    ],
    correctAnswer: 1,
    explanation: "AWS SSO (Identity Center) integra com Active Directory via AWS Managed Microsoft AD ou AD Connector. Permite single sign-on com credenciais corporativas. Não precisa criar IAM users duplicados. Cognito é para aplicações web/mobile, não acesso console AWS.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 89,
    question: "Uma aplicação precisa ser auditada para vulnerabilidades de sistema operacional e problemas de segurança de rede. Qual serviço usar?",
    options: [
      "Amazon GuardDuty",
      "AWS Config",
      "Amazon Inspector",
      "AWS Security Hub"
    ],
    correctAnswer: 2,
    explanation: "Inspector faz assessment automatizado de vulnerabilidades em EC2 (CVEs do OS, network exposure). Instala agent, escaneia vulnerabilidades, gera findings prioritizados. GuardDuty é threat detection, Config monitora configurações.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 90,
    question: "Uma empresa precisa implementar MFA para todos os usuários IAM. Como enforçar essa política?",
    options: [
      "Pedir para usuários habilitarem MFA voluntariamente",
      "Usar IAM Policy com condição aws:MultiFactorAuthPresent",
      "AWS Config rule",
      "Não é possível enforçar MFA"
    ],
    correctAnswer: 1,
    explanation: "IAM Policy pode incluir condição aws:MultiFactorAuthPresent que nega acesso se MFA não estiver presente. Anexar policy a todos usuários/grupos força MFA para qualquer ação. SCP (Service Control Policy) em Organizations também pode enforçar.",
    domain: 'secure',
    difficulty: 'hard'
  },
  // Questions 91-100: Advanced Topics and Best Practices
  {
    id: 91,
    question: "Uma aplicação usa múltiplas contas AWS. Como centralizar logs de todas as contas para auditoria?",
    options: [
      "Copiar logs manualmente",
      "Configurar CloudTrail organizacional com logging para S3 bucket central",
      "Usar CloudWatch Logs em cada conta",
      "Não é possível centralizar"
    ],
    correctAnswer: 1,
    explanation: "CloudTrail organizacional (via AWS Organizations) centraliza logs de todas contas em bucket S3 central. Management account configura organization trail que aplica a todas member accounts automaticamente. Simplifica auditoria e compliance multi-conta.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 92,
    question: "Uma aplicação precisa processar streams de dados em tempo real (milhões de eventos/segundo) com análise. Qual serviço usar?",
    options: [
      "Amazon SQS",
      "Amazon Kinesis Data Streams",
      "AWS Lambda",
      "Amazon SNS"
    ],
    correctAnswer: 1,
    explanation: "Kinesis Data Streams é para ingestão e processamento de streaming data em tempo real em escala massiva. Suporta múltiplos consumidores, replay de dados, integração com Lambda/Firehose/Analytics. SQS é messaging, não streaming. SNS é pub/sub.",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 93,
    question: "Uma aplicação global usa RDS MySQL primary em us-east-1. Como adicionar read replicas em outras regiões para menor latência?",
    options: [
      "RDS não suporta cross-region replicas",
      "Criar RDS Read Replica cross-region",
      "Usar DynamoDB Global Tables",
      "Migrar para Aurora"
    ],
    correctAnswer: 1,
    explanation: "RDS suporta cross-region Read Replicas para MySQL, PostgreSQL, MariaDB. Replica assíncronamente para outra região. Reduz latência de leitura globalmente. Pode ser promovida a standalone em DR. Aurora oferece funcionalidade similar com Global Database.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 94,
    question: "Uma aplicação precisa garantir que alterações de infraestrutura sejam revisadas antes de serem aplicadas. Como implementar?",
    options: [
      "Revisão manual antes de cada deploy",
      "Usar CloudFormation Change Sets",
      "Testar em produção",
      "Não fazer mudanças"
    ],
    correctAnswer: 1,
    explanation: "CloudFormation Change Sets permite preview de mudanças antes de executar stack update. Mostra quais recursos serão criados, modificados ou deletados. Permite revisão e aprovação antes de aplicar. Reduz risco de mudanças inesperadas em produção.",
    domain: 'resilient',
    difficulty: 'medium'
  },
  {
    id: 95,
    question: "Uma aplicação usa S3 para armazenar logs. Após 90 dias, logs devem ser arquivados de forma mais econômica. Como automatizar?",
    options: [
      "Script Lambda para mover arquivos",
      "S3 Lifecycle Policy para transição para Glacier",
      "Mover manualmente a cada 90 dias",
      "Deletar logs após 90 dias"
    ],
    correctAnswer: 1,
    explanation: "S3 Lifecycle Policies automatizam transições entre storage classes e expiração. Regra: após 90 dias, transicionar para Glacier Deep Archive (storage mais barato). Totalmente automatizado, sem código. Pode combinar múltiplas regras (ex: IA após 30 dias, Glacier após 90).",
    domain: 'cost',
    difficulty: 'easy'
  },
  {
    id: 96,
    question: "Uma aplicação usa Lambda triggers por API Gateway. Durante análise de custos, descobriu-se muitas invocações Lambda falhando. Como reduzir custos?",
    options: [
      "Lambda não cobra por invocações falhadas",
      "Implementar validação no API Gateway antes de invocar Lambda",
      "Aumentar timeout do Lambda",
      "Aumentar memória do Lambda"
    ],
    correctAnswer: 1,
    explanation: "Lambda cobra por invocação (mesmo falhadas) e tempo de execução. API Gateway pode fazer request validation (schema validation) antes de invocar Lambda, rejeitando requests inválidos sem custo de Lambda. Reduz invocações desnecessárias e custos.",
    domain: 'cost',
    difficulty: 'hard'
  },
  {
    id: 97,
    question: "Uma aplicação precisa garantir que dados sejam criptografados em trânsito entre cliente e S3. Como enforçar?",
    options: [
      "S3 criptografa automaticamente em trânsito",
      "S3 Bucket Policy negando requests não-HTTPS (aws:SecureTransport)",
      "Usar VPN",
      "Client-side encryption"
    ],
    correctAnswer: 1,
    explanation: "S3 Bucket Policy pode negar requests se aws:SecureTransport for false, forçando HTTPS. S3 suporta HTTPS mas não força por padrão. Essa policy garante que apenas conexões criptografadas (TLS) sejam permitidas.",
    domain: 'secure',
    difficulty: 'medium'
  },
  {
    id: 98,
    question: "Uma aplicação tem componentes stateful (sessões) rodando em EC2 atrás de ALB. Como garantir que usuários sejam roteados sempre para mesma instância?",
    options: [
      "Usar NLB ao invés de ALB",
      "Habilitar sticky sessions (session affinity) no ALB",
      "Usar instância EC2 única",
      "Não é possível com ALB"
    ],
    correctAnswer: 1,
    explanation: "ALB suporta sticky sessions via cookies (duration-based ou application-based). Roteia requests do mesmo cliente para mesma target por período especificado. Útil para aplicações stateful. Alternativa melhor: externalizar sessões para ElastiCache/DynamoDB (stateless).",
    domain: 'performance',
    difficulty: 'medium'
  },
  {
    id: 99,
    question: "Uma empresa quer implementar chaos engineering para testar resiliência. Qual serviço AWS facilita isso?",
    options: [
      "AWS CloudFormation",
      "AWS Systems Manager",
      "AWS Fault Injection Simulator (FIS)",
      "AWS Config"
    ],
    correctAnswer: 2,
    explanation: "AWS FIS é serviço gerenciado para chaos engineering. Permite criar experimentos controlados injetando falhas (terminar EC2, throttle API calls, stress CPU). Testa resiliência e observa comportamento durante falhas. Integra com CloudWatch para monitoramento.",
    domain: 'resilient',
    difficulty: 'hard'
  },
  {
    id: 100,
    question: "Uma aplicação precisa garantir que recursos AWS estejam em conformidade com tags obrigatórias (CostCenter, Environment). Como enforçar?",
    options: [
      "Auditoria manual mensal",
      "AWS Config Rules para detectar recursos sem tags obrigatórias",
      "CloudWatch Alarms",
      "IAM Policies"
    ],
    correctAnswer: 1,
    explanation: "AWS Config Rules (managed rule: required-tags) monitora continuamente e detecta recursos sem tags obrigatórias. SCP (Service Control Policy) pode prevenir criação de recursos sem tags. Config detecta non-compliance, SCP previne. Combinar ambos para enforcement completo.",
    domain: 'cost',
    difficulty: 'medium'
  }
];
