import { ServiceInfo } from '../components/SidePanel';

export const servicesData: Record<string, ServiceInfo> = {
  'user-browser': {
    id: 'user-browser',
    title: 'Usuário / Browser',
    step: 1,
    totalSteps: 13,
    nextStepId: 'route53',
    whatIs: {
      description: 'O Usuário representa qualquer cliente final acessando sua aplicação:',
      examples: [
        'Navegador web',
        'Celular',
        'Sistema externo (API consumer)'
      ]
    },
    hierarchy: {
      layer: 'Camada de acesso (Client Layer)',
      position: 'Está fora da AWS, mas é quem inicia todo o fluxo.',
      flow: 'Usuário → DNS → CDN → Frontend / API → Backend → Banco'
    },
    whyExists: [
      'Acessar um sistema',
      'Consumir uma informação',
      'Executar uma ação',
      'Sem o usuário, nenhuma infraestrutura faz sentido'
    ],
    realCase: {
      scenario: 'Um paciente acessa o sistema de uma clínica pelo celular para:',
      actions: [
        'Ver um agendamento',
        'Realizar um pagamento',
        'Consultar um histórico'
      ],
      impact: 'Esse clique inicia toda a cadeia de serviços da AWS, mesmo que o usuário nunca perceba.'
    }
  },
  'route53': {
    id: 'route53',
    title: 'Amazon Route 53 (DNS)',
    step: 2,
    totalSteps: 13,
    prevStepId: 'user-browser',
    nextStepId: 'cloudfront',
    awsDocsUrl: 'https://docs.aws.amazon.com/route53/',
    whatIs: {
      description: 'O Route 53 é o serviço de DNS (Domain Name System) da AWS que traduz nomes de domínio em endereços IP:',
      examples: [
        'Converte "minhaapp.com" em "192.168.1.1"',
        'Gerencia registros DNS (A, CNAME, MX, etc.)',
        'Roteamento inteligente de tráfego'
      ]
    },
    hierarchy: {
      layer: 'Camada de roteamento (Routing Layer)',
      position: 'Primeiro serviço AWS tocado pelo usuário. Faz a ponte entre o mundo externo e sua infraestrutura.',
      flow: 'Usuário → **Route 53** → CDN → Frontend / API'
    },
    whyExists: [
      'Humanos não decoram IPs, decoram nomes',
      'Alta disponibilidade (99.99% SLA)',
      'Roteamento baseado em latência, geolocalização ou health checks',
      'Integração nativa com outros serviços AWS'
    ],
    realCase: {
      scenario: 'Usuário digita "clinica.com.br" no navegador:',
      actions: [
        'Route 53 recebe a requisição DNS',
        'Verifica health check dos servidores',
        'Retorna o IP do CloudFront mais próximo',
        'Usuário é direcionado automaticamente'
      ],
      impact: 'Tudo isso acontece em milissegundos, antes mesmo da página começar a carregar.'
    }
  },
  'cloudfront': {
    id: 'cloudfront',
    title: 'Amazon CloudFront (CDN)',
    step: 3,
    totalSteps: 13,
    prevStepId: 'route53',
    nextStepId: 's3',
    awsDocsUrl: 'https://docs.aws.amazon.com/cloudfront/',
    whatIs: {
      description: 'CloudFront é a CDN (Content Delivery Network) da AWS que distribui conteúdo globalmente:',
      examples: [
        'Cache em 400+ edge locations ao redor do mundo',
        'Reduz latência entregando conteúdo do servidor mais próximo',
        'Protege contra ataques DDoS'
      ]
    },
    hierarchy: {
      layer: 'Camada de distribuição (Distribution Layer)',
      position: 'Recebe tráfego do Route 53 e distribui para múltiplas origens (S3, ALB, etc.)',
      flow: 'Route 53 → **CloudFront** → S3 / ALB'
    },
    whyExists: [
      'Reduzir latência global',
      'Diminuir carga nos servidores de origem',
      'Economizar banda e custos',
      'Melhorar segurança com AWS Shield e WAF'
    ],
    realCase: {
      scenario: 'Paciente em São Paulo acessa a clínica, outro em Lisboa acessa simultaneamente:',
      actions: [
        'CloudFront identifica localização de cada usuário',
        'Serve o conteúdo do edge location mais próximo',
        'Cache já está populado (carregamento instantâneo)',
        'Requisições dinâmicas são redirecionadas ao backend'
      ],
      impact: 'Mesmo que seu servidor esteja em Virginia (EUA), a experiência é rápida globalmente.'
    }
  },
  's3': {
    id: 's3',
    title: 'Amazon S3 (Static Frontend)',
    step: 4,
    totalSteps: 13,
    prevStepId: 'cloudfront',
    nextStepId: 'alb',
    awsDocsUrl: 'https://docs.aws.amazon.com/s3/',
    whatIs: {
      description: 'S3 (Simple Storage Service) é o armazenamento de objetos da AWS, ideal para hospedar sites estáticos:',
      examples: [
        'HTML, CSS, JavaScript (React, Vue, Angular)',
        'Imagens, vídeos, PDFs',
        'Assets estáticos (fontes, ícones, etc.)'
      ]
    },
    hierarchy: {
      layer: 'Camada de origem estática (Static Origin)',
      position: 'Uma das origens do CloudFront. Serve arquivos que não mudam dinamicamente.',
      flow: 'CloudFront → **S3** (para arquivos estáticos)'
    },
    whyExists: [
      'Custo extremamente baixo',
      'Escalabilidade infinita',
      'Durabilidade de 99.999999999% (11 noves)',
      'Integração perfeita com CloudFront'
    ],
    realCase: {
      scenario: 'Frontend React da clínica precisa ser servido:',
      actions: [
        'Build do React gera arquivos estáticos',
        'Upload para bucket S3',
        'CloudFront faz cache automaticamente',
        'Usuário recebe a interface em milissegundos'
      ],
      impact: 'Você paga apenas pelo armazenamento e transferência. Sem servidores para gerenciar.'
    }
  },
  'alb': {
    id: 'alb',
    title: 'Application Load Balancer (ALB)',
    step: 5,
    totalSteps: 13,
    prevStepId: 's3',
    nextStepId: 'vpc',
    awsDocsUrl: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/',
    whatIs: {
      description: 'ALB é um balanceador de carga da camada 7 (HTTP/HTTPS) que distribui tráfego entre múltiplos servidores:',
      examples: [
        'Roteamento baseado em path (/api, /admin)',
        'Roteamento por hostname (api.app.com)',
        'Health checks automáticos'
      ]
    },
    hierarchy: {
      layer: 'Camada de entrada de API (API Gateway Layer)',
      position: 'Recebe tráfego do CloudFront e distribui para instâncias EC2 na Private Subnet.',
      flow: 'CloudFront → **ALB** → EC2 Instances'
    },
    whyExists: [
      'Distribuir carga entre múltiplos servidores',
      'Garantir alta disponibilidade',
      'Detectar e isolar servidores com problemas',
      'Suportar SSL/TLS termination'
    ],
    realCase: {
      scenario: 'API da clínica recebe 10.000 requisições simultâneas:',
      actions: [
        'ALB distribui entre 5 instâncias EC2',
        'Uma instância falha (health check negativo)',
        'ALB para de enviar tráfego para ela',
        'Auto Scaling cria nova instância automaticamente'
      ],
      impact: 'Usuários nem percebem a falha. Sistema continua funcionando normalmente.'
    }
  },
  'vpc': {
    id: 'vpc',
    title: 'Amazon VPC (Virtual Private Cloud)',
    step: 5.5,
    totalSteps: 13,
    prevStepId: 'alb',
    nextStepId: 'public-subnet',
    awsDocsUrl: 'https://docs.aws.amazon.com/vpc/',
    whatIs: {
      description: 'VPC é sua rede privada isolada dentro da AWS:',
      examples: [
        'Rede 10.0.0.0/16 (65.536 endereços IP)',
        'Controle total de subnets, rotas e gateways',
        'Isolamento lógico entre ambientes (dev/prod)',
        'Conexão VPN com datacenter on-premises'
      ]
    },
    hierarchy: {
      layer: 'Camada de rede (Network Layer)',
      position: 'Isola TODOS os recursos de computação, banco e mensageria.',
      flow: 'Internet → Internet Gateway → **VPC** → Subnets → Recursos'
    },
    whyExists: [
      'Isolamento de segurança',
      'Controle de tráfego de rede',
      'Separação de camadas (public/private/isolated)',
      'Compliance e regulamentações'
    ],
    realCase: {
      scenario: 'Clínica precisa cumprir LGPD: dados de pacientes isolados:',
      actions: [
        'VPC dedicada para ambiente produção',
        'Banco de dados NUNCA acessível da internet',
        'Logs de rede auditáveis',
        'Firewalls (Security Groups + NACLs) em cada camada'
      ],
      impact: 'Dados protegidos por padrão. Auditoria completa de tráfego de rede.'
    }
  },
  'public-subnet': {
    id: 'public-subnet',
    title: 'Public Subnet',
    step: 5.6,
    totalSteps: 13,
    prevStepId: 'vpc',
    nextStepId: 'private-subnet',
    whatIs: {
      description: 'Public Subnet é a camada de entrada da sua rede, acessível da internet:',
      examples: [
        'Load Balancers (ALB/NLB)',
        'NAT Gateways (para saída de internet)',
        'Bastion Hosts (acesso SSH seguro)',
        'Route para Internet Gateway'
      ]
    },
    hierarchy: {
      layer: 'Camada de borda (Edge Layer)',
      position: 'Primeira camada dentro da VPC. Única com acesso direto à internet.',
      flow: 'Internet → Internet Gateway → **Public Subnet** → Private Subnet'
    },
    whyExists: [
      'Ponto de entrada controlado',
      'Terminação SSL/TLS',
      'DDoS protection (Shield + WAF)',
      'Isolamento: backend nunca exposto'
    ],
    realCase: {
      scenario: 'Ataque DDoS tenta derrubar o site da clínica:',
      actions: [
        'Tráfego malicioso chega no ALB (Public Subnet)',
        'AWS Shield detecta padrão anormal',
        'CloudFront + WAF bloqueiam IPs suspeitos',
        'EC2 na Private Subnet nunca é impactado'
      ],
      impact: 'Aplicação continua funcionando. Ataque bloqueado na borda.'
    }
  },
  'private-subnet': {
    id: 'private-subnet',
    title: 'Private Subnet',
    step: 5.7,
    totalSteps: 13,
    prevStepId: 'public-subnet',
    nextStepId: 'isolated-subnet',
    whatIs: {
      description: 'Private Subnet é onde vive sua aplicação, SEM acesso direto da internet:',
      examples: [
        'Instâncias EC2 (backend/API)',
        'Containers ECS/Fargate',
        'Serviços de mensageria (SQS)',
        'NAT Gateway para saída (updates, APIs externas)'
      ]
    },
    hierarchy: {
      layer: 'Camada de aplicação (Application Layer)',
      position: 'Protegida da internet. Acesso APENAS via Load Balancer da Public Subnet.',
      flow: 'Public Subnet → **Private Subnet** → Isolated Subnet (banco)'
    },
    whyExists: [
      'Segurança: zero acesso direto da internet',
      'Controle: apenas Load Balancer pode acessar',
      'Escalabilidade: Auto Scaling sem expor IPs',
      'Defesa em profundidade'
    ],
    realCase: {
      scenario: 'Hacker tenta acessar diretamente o servidor da aplicação:',
      actions: [
        'EC2 não tem IP público (Private Subnet)',
        'Tentativa de conexão direta falha',
        'Único caminho: ALB → Security Group → EC2',
        'Security Group valida origem = ALB'
      ],
      impact: 'Impossível atacar servidor diretamente. Apenas entrada controlada pelo ALB.'
    }
  },
  'isolated-subnet': {
    id: 'isolated-subnet',
    title: 'Isolated Subnet',
    step: 5.8,
    totalSteps: 13,
    prevStepId: 'private-subnet',
    nextStepId: 'auto-scaling',
    whatIs: {
      description: 'Isolated Subnet é a camada mais segura, sem saída para internet:',
      examples: [
        'Bancos de dados (RDS, Aurora)',
        'Caches (ElastiCache)',
        'Dados sensíveis (LGPD/HIPAA)',
        'SEM route para NAT Gateway ou Internet Gateway'
      ]
    },
    hierarchy: {
      layer: 'Camada de dados (Data Layer)',
      position: 'Totalmente isolada. Acesso APENAS de EC2 na Private Subnet.',
      flow: 'Private Subnet EC2 → **Isolated Subnet** → RDS (fim da linha)'
    },
    whyExists: [
      'Máxima segurança para dados críticos',
      'Compliance (LGPD, HIPAA, PCI-DSS)',
      'Zero risco de vazamento para internet',
      'Auditoria: apenas aplicação acessa'
    ],
    realCase: {
      scenario: 'Dados de pacientes (LGPD) precisam de máxima proteção:',
      actions: [
        'RDS está na Isolated Subnet (zero saída internet)',
        'Security Group: apenas EC2 específico pode conectar',
        'Criptografia em repouso (KMS)',
        'Backups automáticos em S3 privado',
        'VPC Flow Logs auditam todo acesso'
      ],
      impact: 'Dados nunca vazam. Auditoria completa. Compliance garantido.'
    }
  },
  'auto-scaling': {
    id: 'auto-scaling',
    title: 'Auto Scaling Group (Multi-AZ)',
    step: 6.5,
    totalSteps: 13,
    nextStepId: 'ec2',
    whatIs: {
      description: 'Auto Scaling Group gerencia automaticamente a quantidade de instâncias EC2:',
      examples: [
        'Adiciona instâncias quando CPU > 70%',
        'Remove instâncias quando CPU < 30%',
        'Distribui instâncias em múltiplas Availability Zones',
        'Substitui instâncias com falha automaticamente'
      ]
    },
    hierarchy: {
      layer: 'Camada de escalabilidade (Scalability Layer)',
      position: 'Gerencia as instâncias EC2 dentro da Private Subnet.',
      flow: 'CloudWatch métricas → **Auto Scaling** → Adiciona/Remove EC2'
    },
    whyExists: [
      'Elasticidade: pagar apenas pelo necessário',
      'Alta disponibilidade: substituir instâncias com falha',
      'Performance: escalar antes de ficar lento',
      'Multi-AZ: resiliência contra falhas de datacenter'
    ],
    realCase: {
      scenario: 'Segunda-feira 8h: pico de agendamentos na clínica:',
      actions: [
        '2 instâncias EC2 rodando (carga baixa)',
        'CloudWatch detecta CPU 80% às 7:50h',
        'Auto Scaling adiciona 3 instâncias em 2 minutos',
        'Carga distribuída: CPU volta para 50%',
        'Às 10h, carga diminui: Auto Scaling remove 2 instâncias'
      ],
      impact: 'Sistema sempre rápido. Economia: paga apenas pelas horas de pico.'
    }
  },
  'ec2': {
    id: 'ec2',
    title: 'Amazon EC2 (Elastic Compute Cloud)',
    step: 7,
    totalSteps: 13,
    nextStepId: 'sqs',
    awsDocsUrl: 'https://docs.aws.amazon.com/ec2/',
    whatIs: {
      description: 'EC2 são servidores virtuais que executam seu backend e aplicações:',
      examples: [
        'Node.js API executando em Linux',
        'Processamento de dados em Python',
        'Microsserviços Docker'
      ]
    },
    hierarchy: {
      layer: 'Camada de computação (Compute Layer)',
      position: 'Dentro da Private Subnet, protegido do acesso direto da internet.',
      flow: 'ALB → **EC2** → RDS / SQS'
    },
    whyExists: [
      'Executar lógica de negócio',
      'Processar requisições HTTP',
      'Orquestrar comunicação entre serviços',
      'Garantir controle total do ambiente de execução'
    ],
    realCase: {
      scenario: 'API da clínica recebe 10.000 requisições/minuto durante pico de agendamentos:',
      actions: [
        'ALB distribui carga entre 5 instâncias EC2',
        'Cada EC2 processa ~2.000 req/min',
        'Auto Scaling monitora CPU',
        'Se CPU > 70%, adiciona mais instâncias'
      ],
      impact: 'Sistema nunca fica lento, mesmo com carga imprevisível.'
    }
  },
  'sqs': {
    id: 'sqs',
    title: 'Amazon SQS (Simple Queue Service)',
    step: 7.5,
    totalSteps: 13,
    nextStepId: 'rds',
    whatIs: {
      description: 'SQS é uma fila de mensagens gerenciada que permite processamento assíncrono:',
      examples: [
        'Envio de emails em background',
        'Processamento de imagens/vídeos',
        'Integração entre microsserviços',
        'Tarefas agendadas (cron jobs)'
      ]
    },
    hierarchy: {
      layer: 'Camada de mensageria (Messaging Layer)',
      position: 'Dentro da Private Subnet, conectado entre EC2 e outros serviços.',
      flow: 'EC2 → **SQS** → Worker EC2 (processamento assíncrono)'
    },
    whyExists: [
      'Desacoplar sistemas (produtor ≠ consumidor)',
      'Resiliência: mensagens não são perdidas',
      'Escalabilidade: processar milhões de mensagens',
      'Retry automático em caso de falha'
    ],
    realCase: {
      scenario: 'Clínica precisa enviar 5.000 emails de confirmação de consulta:',
      actions: [
        'EC2 recebe requisição de agendamento',
        'Responde HTTP 200 OK em 50ms (rápido!)',
        'Coloca mensagem na fila SQS',
        'Worker EC2 processa fila em background',
        'Se falhar, SQS tenta reenviar automaticamente'
      ],
      impact: 'Usuário não espera. Sistema desacoplado. Zero perda de mensagens.'
    }
  },
  'rds': {
    id: 'rds',
    title: 'Amazon RDS (Multi-AZ)',
    step: 8,
    totalSteps: 13,
    nextStepId: 'iam',
    whatIs: {
      description: 'RDS (Relational Database Service) é um banco de dados gerenciado com alta disponibilidade:',
      examples: [
        'PostgreSQL, MySQL, MariaDB',
        'Replicação automática (Multi-AZ)',
        'Backups automatizados'
      ]
    },
    hierarchy: {
      layer: 'Camada de dados (Data Layer)',
      position: 'Dentro da Isolated Subnet, completamente isolado da internet.',
      flow: 'EC2 → **RDS** (sem acesso direto externo)'
    },
    whyExists: [
      'Persistência de dados transacionais',
      'Alta disponibilidade com failover automático',
      'Backups e recuperação de desastres',
      'Escalabilidade de leitura (Read Replicas)'
    ],
    realCase: {
      scenario: 'Banco de dados da clínica precisa de 99.95% de disponibilidade:',
      actions: [
        'RDS Multi-AZ mantém réplica em outra zona',
        'Primary instance falha',
        'Failover automático para standby em ~60 segundos',
        'Aplicação reconecta automaticamente'
      ],
      impact: 'Dados nunca são perdidos e o downtime é mínimo.'
    }
  },
  'iam': {
    id: 'iam',
    title: 'IAM (Identity and Access Management)',
    step: 9,
    totalSteps: 13,
    nextStepId: 'iam-role',
    whatIs: {
      description: 'IAM é o serviço de gerenciamento de identidade e acesso da AWS:',
      examples: [
        'Usuários, grupos e permissões',
        'Políticas de acesso granulares (JSON)',
        'Autenticação multi-fator (MFA)',
        'Integração com diretórios corporativos'
      ]
    },
    hierarchy: {
      layer: 'Camada de segurança transversal (Security Layer)',
      position: 'Permeia todos os serviços da AWS. Controla QUEM pode fazer O QUÊ.',
      flow: 'IAM → Todos os serviços AWS'
    },
    whyExists: [
      'Controle granular de acesso',
      'Princípio do menor privilégio',
      'Auditoria e compliance',
      'Separação de responsabilidades'
    ],
    realCase: {
      scenario: 'Equipe de desenvolvimento da clínica precisa acessar recursos AWS:',
      actions: [
        'Dev Junior: apenas leitura em S3 e CloudWatch',
        'Dev Senior: deploy de aplicações via EC2',
        'DBA: acesso total ao RDS, bloqueado em outros serviços',
        'Cada ação é logada no CloudTrail'
      ],
      impact: 'Zero acesso não autorizado. Auditoria completa de quem fez o quê.'
    }
  },
  'iam-role': {
    id: 'iam-role',
    title: 'IAM Role',
    step: 10,
    totalSteps: 13,
    nextStepId: 'security-groups',
    whatIs: {
      description: 'IAM Roles são identidades temporárias assumidas por serviços AWS:',
      examples: [
        'EC2 assume role para acessar S3',
        'Lambda assume role para escrever em DynamoDB',
        'Credenciais temporárias (rotação automática)',
        'Sem necessidade de armazenar senhas no código'
      ]
    },
    hierarchy: {
      layer: 'Camada de segurança transversal (Security Layer)',
      position: 'Permite comunicação segura entre serviços sem expor credenciais.',
      flow: 'Serviço A → Assume Role → Serviço B'
    },
    whyExists: [
      'Eliminar credenciais hardcoded',
      'Rotação automática de credenciais',
      'Acesso cross-account (entre contas AWS)',
      'Segurança zero-trust'
    ],
    realCase: {
      scenario: 'API na EC2 precisa salvar imagens no S3:',
      actions: [
        'EC2 recebe IAM Role com permissão S3:PutObject',
        'Aplicação faz upload SEM usar access keys',
        'AWS SDK assume a role automaticamente',
        'Credenciais são temporárias (expiram em horas)'
      ],
      impact: 'Mesmo que alguém invada o servidor, não encontra credenciais permanentes.'
    }
  },
  'security-groups': {
    id: 'security-groups',
    title: 'Security Groups',
    step: 11,
    totalSteps: 13,
    nextStepId: 'sns',
    whatIs: {
      description: 'Security Groups são firewalls virtuais que controlam tráfego de rede:',
      examples: [
        'Regras de entrada (inbound) e saída (outbound)',
        'Filtragem por IP, porta e protocolo',
        'Stateful (se permitir entrada, saída é automática)',
        'Aplicado por instância EC2/RDS'
      ]
    },
    hierarchy: {
      layer: 'Camada de rede e segurança (Network Security Layer)',
      position: 'Protege cada recurso dentro da VPC. Primeiro filtro de tráfego.',
      flow: 'Internet → Security Group → EC2/RDS'
    },
    whyExists: [
      'Controle de tráfego de rede',
      'Isolamento de camadas (frontend ≠ backend ≠ banco)',
      'Defesa em profundidade',
      'Prevenção de acessos não autorizados'
    ],
    realCase: {
      scenario: 'Banco de dados RDS precisa ser acessível APENAS pelas instâncias EC2:',
      actions: [
        'Security Group do RDS: permite porta 5432 SOMENTE do SG do EC2',
        'Tentativa de acesso externo é bloqueada',
        'Mesmo dentro da VPC, outras instâncias não acessam',
        'Logs de tentativas de conexão são registrados'
      ],
      impact: 'Banco nunca fica exposto, mesmo que alguém invada a VPC.'
    }
  },
  'sns': {
    id: 'sns',
    title: 'Amazon SNS (Simple Notification Service)',
    step: 12,
    totalSteps: 13,
    nextStepId: 'cloudwatch',
    whatIs: {
      description: 'SNS é um serviço de mensageria pub/sub para distribuição de eventos:',
      examples: [
        'Notificações push, SMS, email',
        'Fan-out (1 evento → N destinos)',
        'Integração com SQS, Lambda, HTTP endpoints',
        'Mensagens em tempo real'
      ]
    },
    hierarchy: {
      layer: 'Camada de mensageria (Messaging Layer)',
      position: 'Desacopla sistemas através de eventos assíncronos.',
      flow: 'Produtor → SNS Topic → Múltiplos Consumidores'
    },
    whyExists: [
      'Desacoplamento de sistemas',
      'Notificações em tempo real',
      'Arquitetura orientada a eventos',
      'Escalabilidade de comunicação'
    ],
    realCase: {
      scenario: 'Novo agendamento é criado na clínica:',
      actions: [
        'EC2 publica evento no SNS Topic "NovoAgendamento"',
        'Lambda 1: envia email de confirmação',
        'Lambda 2: envia SMS para o paciente',
        'SQS: enfileira para processamento de estatísticas',
        'Tudo acontece em paralelo e assíncrono'
      ],
      impact: 'Sistema rápido e desacoplado. Se email cair, SMS ainda funciona.'
    }
  },
  'cloudwatch': {
    id: 'cloudwatch',
    title: 'Amazon CloudWatch',
    step: 13,
    totalSteps: 13,
    whatIs: {
      description: 'CloudWatch é a plataforma de observabilidade da AWS:',
      examples: [
        'Logs centralizados de todos os serviços',
        'Métricas de performance (CPU, memória, latência)',
        'Alarmes e notificações automáticas',
        'Dashboards customizados'
      ]
    },
    hierarchy: {
      layer: 'Camada de observabilidade (Observability Layer)',
      position: 'Monitora TODOS os serviços da arquitetura. Visão unificada do sistema.',
      flow: 'Todos os serviços → CloudWatch → Dashboards/Alertas'
    },
    whyExists: [
      'Detectar problemas antes dos usuários',
      'Debugging e troubleshooting',
      'Otimização de performance',
      'Compliance e auditoria'
    ],
    realCase: {
      scenario: 'Sistema da clínica precisa garantir SLA de 99.9%:',
      actions: [
        'CloudWatch detecta: CPU do RDS > 80%',
        'Alarme dispara SNS → equipe recebe notificação',
        'Auto Scaling adiciona mais instâncias EC2',
        'Logs mostram qual query está lenta',
        'Time otimiza ANTES do sistema cair'
      ],
      impact: 'Proatividade ao invés de reatividade. Problemas resolvidos antes de virarem incidentes.'
    }
  }
};
