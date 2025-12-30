/**
 * Banco de Questões - Auto Scaling Group (Multi-AZ)
 * Total: 20 questões
 */

export interface AutoScalingQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const autoScalingQuestions: AutoScalingQuestion[] = [
  {
    id: 1,
    question: "Uma empresa precisa garantir que sua aplicação web sempre tenha entre 2 e 10 instâncias EC2 rodando, dependendo da carga. Qual serviço AWS deve ser usado?",
    options: [
      "Amazon EC2 Auto Recovery",
      "AWS Auto Scaling Group",
      "Elastic Load Balancer",
      "AWS Lambda"
    ],
    correctAnswer: 1,
    explanation: "Auto Scaling Group (ASG) permite definir capacidade mínima, desejada e máxima de instâncias EC2, escalando automaticamente baseado em políticas de escalabilidade. ASG pode adicionar ou remover instâncias conforme a demanda.",
    difficulty: 'easy',
    topic: 'Conceitos Básicos'
  },
  {
    id: 2,
    question: "Qual é o principal benefício de usar Auto Scaling Group em múltiplas Zonas de Disponibilidade (Multi-AZ)?",
    options: [
      "Reduz custos de instâncias EC2",
      "Aumenta a velocidade de processamento",
      "Fornece alta disponibilidade e tolerância a falhas",
      "Melhora a performance de rede"
    ],
    correctAnswer: 2,
    explanation: "Multi-AZ no Auto Scaling Group distribui instâncias em diferentes zonas de disponibilidade, garantindo que se uma AZ falhar, as instâncias em outras AZs continuam funcionando. Isso proporciona alta disponibilidade e resiliência.",
    difficulty: 'easy',
    topic: 'Alta Disponibilidade'
  },
  {
    id: 3,
    question: "Uma aplicação está usando Auto Scaling e precisa escalar quando o uso de CPU ultrapassar 70%. Como isso pode ser configurado?",
    options: [
      "CloudWatch Alarm com política de Target Tracking",
      "AWS Config Rule",
      "VPC Flow Logs",
      "EC2 Instance Metadata"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch Alarms podem monitorar métricas como CPU e acionar políticas de Auto Scaling. Target Tracking Policy mantém a métrica em um valor específico (como 70% de CPU), escalando automaticamente para cima ou para baixo conforme necessário.",
    difficulty: 'medium',
    topic: 'Políticas de Escalabilidade'
  },
  {
    id: 4,
    question: "Qual é a diferença entre capacidade 'Desired', 'Minimum' e 'Maximum' em um Auto Scaling Group?",
    options: [
      "Desired = número atual, Minimum = mínimo permitido, Maximum = máximo permitido",
      "Todas funcionam da mesma forma",
      "Desired = custo, Minimum = performance, Maximum = disponibilidade",
      "Desired = região primária, Minimum = região secundária, Maximum = global"
    ],
    correctAnswer: 0,
    explanation: "Desired Capacity é o número de instâncias que o ASG tenta manter. Minimum Capacity é o número mínimo de instâncias que sempre devem estar rodando. Maximum Capacity é o limite máximo de instâncias que podem ser criadas durante escalabilidade.",
    difficulty: 'medium',
    topic: 'Configuração'
  },
  {
    id: 5,
    question: "Uma empresa precisa escalar sua aplicação de 4 para 20 instâncias durante a Black Friday, e depois reduzir para 4. Qual política de Auto Scaling é mais adequada?",
    options: [
      "Simple Scaling Policy",
      "Step Scaling Policy",
      "Target Tracking Scaling Policy",
      "Scheduled Scaling Policy"
    ],
    correctAnswer: 3,
    explanation: "Scheduled Scaling Policy permite definir escalabilidade baseada em horários específicos. Para eventos previsíveis como Black Friday, você pode programar o aumento de capacidade antes do evento e a redução depois.",
    difficulty: 'medium',
    topic: 'Políticas de Escalabilidade'
  },
  {
    id: 6,
    question: "O que acontece quando uma instância EC2 em um Auto Scaling Group falha o health check?",
    options: [
      "A instância é reiniciada automaticamente",
      "O ASG termina a instância e lança uma nova",
      "Um alerta é enviado, mas nada é feito",
      "A instância é movida para quarentena"
    ],
    correctAnswer: 1,
    explanation: "Quando uma instância falha o health check (EC2 ou ELB), o Auto Scaling Group automaticamente termina a instância não saudável e lança uma nova para manter a capacidade desejada, garantindo que apenas instâncias saudáveis estejam servindo tráfego.",
    difficulty: 'easy',
    topic: 'Health Checks'
  },
  {
    id: 7,
    question: "Qual componente é necessário para usar Auto Scaling Group com um Load Balancer?",
    options: [
      "VPC Peering",
      "Target Group",
      "Route 53",
      "CloudFront"
    ],
    correctAnswer: 1,
    explanation: "Target Group é o componente que conecta o Application Load Balancer (ALB) ou Network Load Balancer (NLB) ao Auto Scaling Group. O ASG registra automaticamente novas instâncias no Target Group.",
    difficulty: 'medium',
    topic: 'Integração com ELB'
  },
  {
    id: 8,
    question: "Uma aplicação precisa de 5 minutos para inicializar após o boot. Como configurar o Auto Scaling para aguardar antes de enviar tráfego?",
    options: [
      "Usar Health Check Grace Period",
      "Aumentar o timeout do Load Balancer",
      "Usar User Data script com sleep",
      "Configurar CloudWatch Logs"
    ],
    correctAnswer: 0,
    explanation: "Health Check Grace Period define quanto tempo o Auto Scaling aguarda antes de começar a verificar o health check de uma nova instância. Isso permite que a aplicação complete sua inicialização antes de ser marcada como não saudável.",
    difficulty: 'medium',
    topic: 'Health Checks'
  },
  {
    id: 9,
    question: "Qual é o cooldown period padrão do Auto Scaling e para que serve?",
    options: [
      "300 segundos; previne escalabilidade excessiva",
      "60 segundos; acelera a escalabilidade",
      "900 segundos; economiza custos",
      "30 segundos; melhora performance"
    ],
    correctAnswer: 0,
    explanation: "Cooldown period (padrão: 300 segundos/5 minutos) é o tempo que o ASG aguarda antes de executar outra ação de escalabilidade. Isso previne que o ASG escale excessivamente em resposta a picos temporários, permitindo que instâncias recém-lançadas se estabilizem.",
    difficulty: 'medium',
    topic: 'Configuração'
  },
  {
    id: 10,
    question: "Uma empresa quer garantir que sempre haja pelo menos uma instância em cada uma das 3 Zonas de Disponibilidade. Como configurar o ASG?",
    options: [
      "Minimum Capacity = 3, usar AZ Rebalancing",
      "Minimum Capacity = 1 por AZ",
      "Maximum Capacity = 3",
      "Desired Capacity = 3"
    ],
    correctAnswer: 0,
    explanation: "Definir Minimum Capacity como 3 e habilitar múltiplas AZs garante distribuição. O ASG automaticamente distribui as instâncias igualmente entre as AZs configuradas. Se usar 3 AZs, cada uma terá pelo menos 1 instância quando Minimum = 3.",
    difficulty: 'hard',
    topic: 'Multi-AZ'
  },
  {
    id: 11,
    question: "Qual tipo de health check o Auto Scaling Group suporta?",
    options: [
      "Apenas EC2 Status Check",
      "Apenas ELB Health Check",
      "EC2 Status Check e ELB Health Check",
      "EC2, ELB e Custom Health Checks via API"
    ],
    correctAnswer: 3,
    explanation: "Auto Scaling Group suporta múltiplos tipos de health checks: EC2 Status Checks (verifica estado da instância), ELB Health Checks (verifica disponibilidade via Load Balancer), e Custom Health Checks (via API para verificações personalizadas).",
    difficulty: 'medium',
    topic: 'Health Checks'
  },
  {
    id: 12,
    question: "O que é um Launch Template no Auto Scaling Group?",
    options: [
      "Um script de inicialização da instância",
      "Uma configuração que define AMI, tipo de instância, security groups, etc.",
      "Um backup da configuração do ASG",
      "Um log de todas as instâncias criadas"
    ],
    correctAnswer: 1,
    explanation: "Launch Template (ou Launch Configuration) define todos os parâmetros necessários para lançar instâncias EC2: AMI, tipo de instância, key pair, security groups, user data, IAM role, etc. O ASG usa isso como modelo para criar novas instâncias.",
    difficulty: 'easy',
    topic: 'Conceitos Básicos'
  },
  {
    id: 13,
    question: "Como otimizar custos usando Auto Scaling Group?",
    options: [
      "Usar apenas instâncias Reserved",
      "Desabilitar Multi-AZ",
      "Usar Step Scaling com métricas de utilização",
      "Manter capacidade máxima sempre ativa"
    ],
    correctAnswer: 2,
    explanation: "Step Scaling com métricas de utilização (CPU, memória, requests) permite escalar apenas quando necessário, reduzindo custos ao evitar capacidade ociosa. Combinar ASG com Spot Instances e Target Tracking também otimiza custos enquanto mantém performance.",
    difficulty: 'hard',
    topic: 'Otimização de Custos'
  },
  {
    id: 14,
    question: "O que acontece quando o Auto Scaling precisa remover uma instância durante scale-in?",
    options: [
      "Remove aleatoriamente",
      "Remove a instância mais antiga primeiro",
      "Segue a Termination Policy configurada",
      "Remove a instância com maior CPU"
    ],
    correctAnswer: 2,
    explanation: "Auto Scaling segue a Termination Policy configurada. Opções incluem: OldestInstance, NewestInstance, OldestLaunchConfiguration, ClosestToNextInstanceHour, Default (equilibra AZs primeiro, depois aplica outras regras). Isso garante controle sobre quais instâncias são terminadas.",
    difficulty: 'medium',
    topic: 'Configuração'
  },
  {
    id: 15,
    question: "Uma aplicação usa ASG com Target Tracking para manter CPU em 50%. Durante um pico, a CPU sobe para 80%. O que acontece?",
    options: [
      "Nada, aguarda manual intervention",
      "ASG adiciona instâncias até CPU voltar próximo de 50%",
      "ASG envia apenas um alerta",
      "ASG reinicia todas as instâncias"
    ],
    correctAnswer: 1,
    explanation: "Target Tracking Scaling Policy monitora continuamente a métrica (CPU em 50%) e automaticamente adiciona ou remove instâncias para manter o valor alvo. Se CPU sobe para 80%, o ASG adiciona instâncias até a CPU média do grupo voltar próximo de 50%.",
    difficulty: 'easy',
    topic: 'Políticas de Escalabilidade'
  },
  {
    id: 16,
    question: "Qual é a diferença entre Step Scaling e Simple Scaling?",
    options: [
      "Não há diferença",
      "Step Scaling pode escalar em múltiplos incrementos, Simple Scaling em apenas um",
      "Simple Scaling é mais rápido",
      "Step Scaling só funciona com CloudWatch"
    ],
    correctAnswer: 1,
    explanation: "Simple Scaling adiciona/remove um número fixo de instâncias por vez e aguarda o cooldown period. Step Scaling pode ter múltiplos steps (ex: +1 instância se CPU 60-70%, +2 se 70-80%, +4 se >80%) e pode executar durante cooldown period.",
    difficulty: 'hard',
    topic: 'Políticas de Escalabilidade'
  },
  {
    id: 17,
    question: "Como proteger instâncias específicas de serem terminadas durante scale-in?",
    options: [
      "Mover para outro Auto Scaling Group",
      "Usar Instance Protection",
      "Desabilitar health checks",
      "Não é possível proteger instâncias individuais"
    ],
    correctAnswer: 1,
    explanation: "Instance Protection pode ser habilitada em instâncias específicas para prevenir que sejam terminadas durante scale-in. Isso é útil para instâncias que estão processando tarefas críticas ou que precisam ser mantidas por outros motivos.",
    difficulty: 'medium',
    topic: 'Configuração'
  },
  {
    id: 18,
    question: "Uma empresa quer testar uma nova versão da aplicação em 10% das instâncias antes de implantar em todas. Como fazer isso com ASG?",
    options: [
      "Criar dois ASGs com Load Balancer weighted routing",
      "Não é possível com Auto Scaling",
      "Usar Launch Template versions",
      "Usar apenas CloudFormation"
    ],
    correctAnswer: 0,
    explanation: "Criar dois ASGs (um com versão atual, outro com nova versão) e usar weighted target groups no ALB permite distribuir tráfego proporcionalmente (90% versão antiga, 10% nova). Também pode usar Launch Template com diferentes versions em um único ASG.",
    difficulty: 'hard',
    topic: 'Deployment Strategies'
  },
  {
    id: 19,
    question: "Qual métrica CloudWatch é mais usada para acionar políticas de Auto Scaling?",
    options: [
      "NetworkIn",
      "DiskReadOps",
      "CPUUtilization",
      "StatusCheckFailed"
    ],
    correctAnswer: 2,
    explanation: "CPUUtilization é a métrica mais comum para Auto Scaling porque indica diretamente a carga de trabalho das instâncias. No entanto, métricas customizadas (como request count, latência, tamanho de fila SQS) também são muito usadas dependendo da aplicação.",
    difficulty: 'easy',
    topic: 'CloudWatch Integration'
  },
  {
    id: 20,
    question: "O que é Warm Pool no Auto Scaling Group?",
    options: [
      "Um pool de instâncias pré-inicializadas em stopped state",
      "Um backup de configurações do ASG",
      "Um cache de dados compartilhado",
      "Uma métrica de performance"
    ],
    correctAnswer: 0,
    explanation: "Warm Pool mantém instâncias pré-inicializadas em estado stopped ou hibernated. Quando o ASG precisa escalar, ele pode rapidamente iniciar instâncias do warm pool ao invés de lançar novas do zero, reduzindo o tempo de escalabilidade (útil para apps com boot lento).",
    difficulty: 'hard',
    topic: 'Performance Optimization'
  }
];
