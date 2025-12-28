import { ServiceInfo } from '../components/SidePanel';

// Diagrama simplificado para Cloud Practitioner (foco em conceitos básicos)
export const practitionerServicesData: Record<string, ServiceInfo> = {
  'user-browser': {
    id: 'user-browser',
    title: 'Usuário / Cliente',
    step: 1,
    totalSteps: 10,
    nextStepId: 'route53',
    whatIs: {
      description: 'O usuário representa qualquer pessoa ou sistema que acessa aplicações na nuvem AWS:',
      examples: [
        'Navegador web (Chrome, Firefox, Safari)',
        'Aplicativo móvel (iOS, Android)',
        'Sistema externo consumindo APIs'
      ]
    },
    hierarchy: {
      layer: 'Camada de Cliente (Client Layer)',
      position: 'Ponto inicial do fluxo - está fora da AWS',
      flow: 'Cliente → DNS → CDN → Serviços AWS'
    },
    whyExists: [
      'Acessar aplicações hospedadas na nuvem',
      'Consumir dados e serviços',
      'Interagir com sistemas',
      'Todo sistema na nuvem existe para servir usuários'
    ],
    realCase: {
      scenario: 'Um cliente acessa uma loja online hospedada na AWS pelo navegador:',
      actions: [
        'Visualizar produtos no catálogo',
        'Adicionar itens ao carrinho',
        'Realizar pagamento com segurança'
      ],
      impact: 'Esse acesso inicial dispara toda a infraestrutura AWS, desde DNS até banco de dados, de forma transparente para o usuário.'
    }
  },
  'route53': {
    id: 'route53',
    title: 'Amazon Route 53',
    step: 2,
    totalSteps: 10,
    nextStepId: 'cloudfront',
    whatIs: {
      description: 'Route 53 é o serviço de DNS da AWS que traduz nomes de domínio em endereços IP:',
      examples: [
        'Traduz "meusite.com" em endereço IP',
        'Gerencia registros DNS globalmente',
        'Roteia tráfego com inteligência'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede (Network Layer)',
      position: 'Primeiro serviço AWS no fluxo',
      flow: 'Usuário digita URL → Route 53 resolve → Direciona para serviços AWS'
    },
    whyExists: [
      'Traduzir nomes amigáveis em endereços IP',
      'Garantir alta disponibilidade com SLA de 100%',
      'Rotear usuários para o servidor mais próximo',
      'Realizar health checks e failover automático'
    ],
    realCase: {
      scenario: 'Empresa possui site com clientes em Brasil, EUA e Europa:',
      actions: [
        'Route 53 direciona brasileiros para servidores em São Paulo',
        'Usuários nos EUA são roteados para Virginia',
        'Europeus acessam servidores em Frankfurt'
      ],
      impact: 'Reduz latência drasticamente e melhora experiência do usuário em todas as regiões.'
    }
  },
  'cloudfront': {
    id: 'cloudfront',
    title: 'Amazon CloudFront',
    step: 3,
    totalSteps: 10,
    nextStepId: 's3',
    whatIs: {
      description: 'CloudFront é a CDN (Content Delivery Network) da AWS que distribui conteúdo globalmente:',
      examples: [
        'Cache de imagens, vídeos e arquivos',
        'Distribuição de conteúdo estático',
        'Aceleração de APIs e streaming'
      ]
    },
    hierarchy: {
      layer: 'Camada de Distribuição (Distribution Layer)',
      position: 'Entre o usuário e os serviços de origem',
      flow: 'Route 53 → CloudFront (cache) → S3 ou Servidores'
    },
    whyExists: [
      'Reduzir latência servindo conteúdo de edge locations próximas',
      'Economizar custos reduzindo tráfego para origem',
      'Proteger contra ataques DDoS com AWS Shield',
      'Melhorar performance com cache inteligente'
    ],
    realCase: {
      scenario: 'Site de e-commerce com milhares de imagens de produtos:',
      actions: [
        'Primeira requisição busca imagem do S3',
        'CloudFront armazena em cache nas 450+ edge locations',
        'Próximos acessos servem diretamente do cache'
      ],
      impact: 'Latência cai de 500ms para 20ms. Custos de transferência reduzem 80%.'
    }
  },
  's3': {
    id: 's3',
    title: 'Amazon S3',
    step: 4,
    totalSteps: 10,
    nextStepId: 'ec2',
    whatIs: {
      description: 'S3 (Simple Storage Service) é o serviço de armazenamento de objetos da AWS:',
      examples: [
        'Armazenar arquivos, imagens e vídeos',
        'Backup e arquivamento de dados',
        'Hospedar sites estáticos'
      ]
    },
    hierarchy: {
      layer: 'Camada de Armazenamento (Storage Layer)',
      position: 'Armazena dados de forma durável e escalável',
      flow: 'CloudFront → S3 (busca arquivos) ou EC2 → S3 (armazena/recupera dados)'
    },
    whyExists: [
      'Armazenar dados com durabilidade de 99.999999999% (11 noves)',
      'Escalar automaticamente sem limites',
      'Otimizar custos com classes de armazenamento',
      'Disponibilizar dados globalmente'
    ],
    realCase: {
      scenario: 'Startup de streaming precisa armazenar 100TB de vídeos:',
      actions: [
        'Upload de vídeos diretamente para S3',
        'Lifecycle policy move vídeos antigos para Glacier',
        'CloudFront distribui conteúdo globalmente'
      ],
      impact: 'Economia de 70% em custos vs armazenamento tradicional. Zero gerenciamento de hardware.'
    }
  },
  'ec2': {
    id: 'ec2',
    title: 'Amazon EC2',
    step: 5,
    totalSteps: 10,
    nextStepId: 'rds',
    whatIs: {
      description: 'EC2 (Elastic Compute Cloud) fornece servidores virtuais na nuvem:',
      examples: [
        'Hospedar aplicações web e APIs',
        'Processar dados e executar jobs',
        'Executar bancos de dados e containers'
      ]
    },
    hierarchy: {
      layer: 'Camada de Computação (Compute Layer)',
      position: 'Processa lógica de negócio e aplicações',
      flow: 'Load Balancer → EC2 (processa requisições) → RDS (banco de dados)'
    },
    whyExists: [
      'Executar aplicações e processar dados',
      'Escalar capacidade para cima ou para baixo',
      'Pagar apenas pelo que usar (por hora/segundo)',
      'Controlar completamente o servidor virtual'
    ],
    realCase: {
      scenario: 'E-commerce tem pico de vendas na Black Friday:',
      actions: [
        'Auto Scaling adiciona 20 instâncias EC2 automaticamente',
        'Durante a madrugada, reduz para 5 instâncias',
        'Aplicação continua funcionando perfeitamente'
      ],
      impact: 'Suporta 100x mais tráfego sem cair. Paga apenas pelo tempo de uso extra.'
    }
  },
  'rds': {
    id: 'rds',
    title: 'Amazon RDS',
    step: 6,
    totalSteps: 10,
    nextStepId: 'vpc',
    whatIs: {
      description: 'RDS (Relational Database Service) é banco de dados relacional gerenciado:',
      examples: [
        'MySQL, PostgreSQL, Oracle, SQL Server',
        'Backups automáticos e snapshots',
        'Alta disponibilidade com Multi-AZ'
      ]
    },
    hierarchy: {
      layer: 'Camada de Dados (Data Layer)',
      position: 'Armazena dados estruturados e relacionais',
      flow: 'EC2 (aplicação) → RDS (consulta/persiste dados)'
    },
    whyExists: [
      'Gerenciar banco de dados sem gerenciar hardware',
      'Backups automáticos e recuperação point-in-time',
      'Alta disponibilidade com failover automático',
      'Escalar verticalmente com poucos cliques'
    ],
    realCase: {
      scenario: 'Sistema bancário precisa de altíssima disponibilidade:',
      actions: [
        'RDS Multi-AZ mantém réplica síncrona em outra zona',
        'Zona principal falha às 3h da manhã',
        'Failover automático em menos de 60 segundos'
      ],
      impact: 'Sistema continua funcionando. Clientes nem percebem a falha.'
    }
  },
  'vpc': {
    id: 'vpc',
    title: 'Amazon VPC',
    step: 7,
    totalSteps: 10,
    nextStepId: 'iam',
    whatIs: {
      description: 'VPC (Virtual Private Cloud) é sua rede privada virtual na AWS:',
      examples: [
        'Isolar recursos em rede privada',
        'Controlar IPs, subnets e roteamento',
        'Conectar com datacenter on-premises'
      ]
    },
    hierarchy: {
      layer: 'Camada de Rede (Network Layer)',
      position: 'Envolve e isola todos os recursos',
      flow: 'Internet → Internet Gateway → VPC → Subnets → EC2/RDS'
    },
    whyExists: [
      'Isolar recursos em rede privada e segura',
      'Controlar tráfego com Security Groups e NACLs',
      'Criar arquiteturas multi-tier (public/private subnets)',
      'Conectividade híbrida (VPN, Direct Connect)'
    ],
    realCase: {
      scenario: 'Banco precisa manter banco de dados completamente isolado:',
      actions: [
        'RDS em subnet privada sem acesso à internet',
        'EC2 em subnet pública recebe requisições',
        'Security Groups permitem apenas EC2 → RDS'
      ],
      impact: 'Banco de dados inacessível da internet. Conformidade e segurança garantidas.'
    }
  },
  'iam': {
    id: 'iam',
    title: 'AWS IAM',
    step: 8,
    totalSteps: 10,
    nextStepId: 'cloudwatch',
    whatIs: {
      description: 'IAM (Identity and Access Management) gerencia acessos e permissões na AWS:',
      examples: [
        'Criar usuários, grupos e roles',
        'Definir políticas de permissão',
        'Implementar MFA (autenticação multifator)'
      ]
    },
    hierarchy: {
      layer: 'Camada de Segurança (Security Layer)',
      position: 'Perpassa todos os serviços AWS',
      flow: 'Controla quem pode fazer o quê em cada recurso'
    },
    whyExists: [
      'Controlar acesso aos recursos AWS de forma granular',
      'Implementar princípio do menor privilégio',
      'Autenticar e autorizar usuários e aplicações',
      'Garantir segurança e conformidade'
    ],
    realCase: {
      scenario: 'Empresa tem desenvolvedores, QA e administradores:',
      actions: [
        'Devs podem criar EC2 apenas em ambiente dev',
        'QA pode ler logs mas não alterar configurações',
        'Admins têm acesso total com MFA obrigatório'
      ],
      impact: 'Zero chance de desenvolvedor apagar produção por acidente. Auditoria completa de acessos.'
    }
  },
  'cloudwatch': {
    id: 'cloudwatch',
    title: 'Amazon CloudWatch',
    step: 9,
    totalSteps: 10,
    nextStepId: 'lambda',
    whatIs: {
      description: 'CloudWatch é o serviço de monitoramento e observabilidade da AWS:',
      examples: [
        'Coletar métricas (CPU, memória, latência)',
        'Armazenar e analisar logs',
        'Criar alarmes e notificações'
      ]
    },
    hierarchy: {
      layer: 'Camada de Monitoramento (Observability Layer)',
      position: 'Monitora todos os serviços AWS',
      flow: 'Serviços AWS → CloudWatch (métricas/logs) → Alarmes → SNS'
    },
    whyExists: [
      'Monitorar saúde e performance dos recursos',
      'Detectar problemas antes dos usuários',
      'Automatizar respostas com alarmes',
      'Analisar logs para troubleshooting'
    ],
    realCase: {
      scenario: 'API começa a responder lentamente às 2h da manhã:',
      actions: [
        'CloudWatch detecta latência acima de 500ms',
        'Alarme dispara e envia notificação via SNS',
        'Auto Scaling adiciona mais instâncias EC2 automaticamente'
      ],
      impact: 'Problema resolvido em 3 minutos. Equipe só descobre de manhã lendo os logs.'
    }
  },
  'lambda': {
    id: 'lambda',
    title: 'AWS Lambda',
    step: 10,
    totalSteps: 10,
    nextStepId: 'user-browser',
    whatIs: {
      description: 'Lambda permite executar código sem provisionar ou gerenciar servidores:',
      examples: [
        'Processar eventos em tempo real',
        'Criar APIs serverless',
        'Automatizar tarefas e workflows'
      ]
    },
    hierarchy: {
      layer: 'Camada de Computação Serverless',
      position: 'Executa código sob demanda',
      flow: 'Evento (S3, API Gateway, etc) → Lambda executa → Retorna resultado'
    },
    whyExists: [
      'Executar código sem gerenciar servidores',
      'Pagar apenas pelo tempo de execução',
      'Escalar automaticamente de 0 a milhares de execuções',
      'Responder a eventos em tempo real'
    ],
    realCase: {
      scenario: 'Todo upload de imagem no S3 precisa gerar thumbnail:',
      actions: [
        'Usuário faz upload de foto para S3',
        'S3 dispara evento que invoca Lambda',
        'Lambda gera thumbnail e salva de volta no S3'
      ],
      impact: 'Zero servidores para gerenciar. Processa 10 ou 10.000 imagens pagando apenas pelo que usar.'
    }
  }
};
