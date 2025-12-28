import { TrainingQuestion } from '@/types/aws-study';

// 20 questões focadas em CloudFront
export const trainingQuestions: Record<string, TrainingQuestion[]> = {
  cloudfront: [
    {
      id: 1,
      topic: 'cloudfront',
      question: 'Uma empresa precisa reduzir a latência global de um site estático sem alterar a aplicação backend. Qual serviço AWS atende melhor esse cenário?',
      context: 'O site recebe acessos de usuários em todos os continentes. A latência atual é de 800ms para usuários na Ásia acessando servidores na região us-east-1.',
      options: [
        { label: 'A', text: 'Amazon EC2 em múltiplas AZs na mesma região' },
        { label: 'B', text: 'Amazon CloudFront como CDN na frente do S3' },
        { label: 'C', text: 'Application Load Balancer com sticky sessions' },
        { label: 'D', text: 'Amazon RDS Multi-AZ para cache de conteúdo' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront é um CDN que distribui conteúdo em edge locations globalmente (200+ pontos de presença), armazenando cache próximo aos usuários finais. Isso reduz drasticamente a latência sem necessidade de mudança no backend. Opção A não distribui globalmente. Opção C é balanceador regional. Opção D usa banco de dados incorretamente.',
      relatedService: 'cloudfront'
    },
    {
      id: 2,
      topic: 'cloudfront',
      question: 'Qual é a principal diferença entre CloudFront e um Application Load Balancer (ALB)?',
      context: 'Um arquiteto precisa escolher entre usar CloudFront ou ALB para distribuir tráfego de uma aplicação web.',
      options: [
        { label: 'A', text: 'CloudFront opera na camada 7 e ALB na camada 4' },
        { label: 'B', text: 'CloudFront é um CDN global com cache em edge locations; ALB é um balanceador regional sem cache' },
        { label: 'C', text: 'ALB suporta HTTPS mas CloudFront não' },
        { label: 'D', text: 'CloudFront só funciona com S3 como origem' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront é um Content Delivery Network (CDN) que cacheia conteúdo em edge locations distribuídas globalmente. ALB é um balanceador de carga regional (Layer 7) que distribui tráfego entre targets na mesma região sem cache. Opção A está invertida. Opção C: ambos suportam HTTPS. Opção D: CloudFront aceita múltiplas origens (S3, ALB, EC2, custom origins).',
      relatedService: 'cloudfront'
    },
    {
      id: 3,
      topic: 'cloudfront',
      question: 'Uma aplicação usa CloudFront com S3 como origem. Um arquivo importante foi atualizado no S3, mas usuários ainda veem a versão antiga. O que deve ser feito?',
      context: 'O arquivo CSS foi modificado há 10 minutos, mas o cache do CloudFront ainda serve a versão anterior por 24 horas (TTL padrão).',
      options: [
        { label: 'A', text: 'Aguardar o TTL (Time To Live) expirar automaticamente' },
        { label: 'B', text: 'Criar uma invalidação (invalidation) no CloudFront especificando o path do arquivo' },
        { label: 'C', text: 'Deletar a distribuição CloudFront e criar uma nova' },
        { label: 'D', text: 'Reiniciar todas as edge locations manualmente' }
      ],
      correctAnswer: 'B',
      explanation: 'Invalidação (invalidation) do CloudFront remove objetos específicos do cache de todas as edge locations imediatamente. É o método correto para forçar atualização antes do TTL expirar. Opção A demora muito. Opção C é extrema e causa downtime. Opção D não é possível (edge locations são gerenciadas pela AWS).',
      relatedService: 'cloudfront'
    },
    {
      id: 4,
      topic: 'cloudfront',
      question: 'Qual configuração do CloudFront permite restringir acesso a conteúdo do S3 apenas através do CloudFront, bloqueando acesso direto ao bucket?',
      context: 'Uma empresa precisa garantir que vídeos premium sejam acessados apenas via CloudFront com autenticação, nunca diretamente pela URL do S3.',
      options: [
        { label: 'A', text: 'Tornar o bucket S3 totalmente público' },
        { label: 'B', text: 'Configurar Origin Access Identity (OAI) ou Origin Access Control (OAC)' },
        { label: 'C', text: 'Usar Security Groups no S3' },
        { label: 'D', text: 'Criar uma VPN entre CloudFront e S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Access Identity (OAI) ou Origin Access Control (OAC - mais novo) cria uma identidade especial que o CloudFront usa para acessar o S3. O bucket policy do S3 permite acesso apenas dessa identidade, bloqueando acesso direto. Opção A expõe conteúdo publicamente. Opção C: S3 não usa Security Groups (é serviço gerenciado). Opção D não é necessária.',
      relatedService: 'cloudfront'
    },
    {
      id: 5,
      topic: 'cloudfront',
      question: 'Uma distribuição CloudFront precisa servir conteúdo dinâmico (API) e estático (frontend). Qual configuração é recomendada?',
      context: 'O frontend está no S3 (/*.html, /*.css, /*.js) e a API está em um ALB (/api/*).',
      options: [
        { label: 'A', text: 'Criar duas distribuições CloudFront separadas' },
        { label: 'B', text: 'Configurar múltiplas origens com cache behaviors baseados em path pattern' },
        { label: 'C', text: 'CloudFront não suporta múltiplas origens' },
        { label: 'D', text: 'Usar apenas S3 para tudo, migrando a API para Lambda' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront suporta múltiplas origens e cache behaviors. Configuração: origem S3 para path "/*" (frontend) com TTL alto, e origem ALB para "/api/*" com TTL baixo ou sem cache. Isso otimiza cache por tipo de conteúdo. Opção A funciona mas é mais complexo de gerenciar. Opção C está errada. Opção D força arquitetura desnecessária.',
      relatedService: 'cloudfront'
    },
    {
      id: 6,
      topic: 'cloudfront',
      question: 'O que é TTL (Time To Live) no contexto do CloudFront?',
      context: 'Um desenvolvedor precisa configurar quanto tempo arquivos devem permanecer em cache.',
      options: [
        { label: 'A', text: 'Tempo que uma requisição leva para chegar ao origin' },
        { label: 'B', text: 'Tempo que um objeto fica em cache antes de expirar e ser buscado novamente no origin' },
        { label: 'C', text: 'Tempo de vida de uma instância EC2' },
        { label: 'D', text: 'Tempo máximo de uma sessão de usuário' }
      ],
      correctAnswer: 'B',
      explanation: 'TTL (Time To Live) define por quanto tempo (em segundos) o CloudFront mantém um objeto em cache antes de verificar se há nova versão no origin. TTL alto = menos requisições ao origin, mais economia. TTL baixo = conteúdo mais atualizado, mais carga no origin. Pode ser configurado via Cache-Control headers ou CloudFront settings.',
      relatedService: 'cloudfront'
    },
    {
      id: 7,
      topic: 'cloudfront',
      question: 'Uma empresa quer usar CloudFront mas precisa que certas requisições sempre cheguem ao origin (sem cache). Como configurar?',
      context: 'Requisições para /api/user/profile devem sempre buscar dados atualizados no backend, sem cache.',
      options: [
        { label: 'A', text: 'Não é possível, CloudFront sempre cacheia' },
        { label: 'B', text: 'Configurar cache behavior com Minimum TTL = 0 e incluir headers que desabilitam cache' },
        { label: 'C', text: 'Usar Route 53 em vez de CloudFront' },
        { label: 'D', text: 'Desabilitar HTTPS' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront permite configurar cache behavior específico por path com TTL mínimo = 0 e forward de headers como "Cache-Control: no-cache". Isso faz o CloudFront funcionar como proxy sem armazenar cache, sempre buscando do origin. Útil para APIs dinâmicas. Opção A está errada. Opção C perde benefícios de edge locations. Opção D não relaciona com cache.',
      relatedService: 'cloudfront'
    },
    {
      id: 8,
      topic: 'cloudfront',
      question: 'Qual protocolo o CloudFront NÃO suporta nativamente?',
      context: 'Um arquiteto está avaliando se pode usar CloudFront para diferentes tipos de tráfego.',
      options: [
        { label: 'A', text: 'HTTP' },
        { label: 'B', text: 'HTTPS' },
        { label: 'C', text: 'WebSocket' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'D',
      explanation: 'CloudFront suporta HTTP, HTTPS e WebSocket (comunicação bidirecional). NÃO suporta FTP (File Transfer Protocol) - para isso, seria necessário usar S3 Transfer Acceleration ou Direct Connect. CloudFront é focado em distribuição de conteúdo web.',
      relatedService: 'cloudfront'
    },
    {
      id: 9,
      topic: 'cloudfront',
      question: 'Uma aplicação precisa servir conteúdo diferente baseado no país do usuário. Como CloudFront pode ajudar?',
      context: 'Site deve mostrar preços em moeda local e conteúdo traduzido automaticamente baseado em geolocalização.',
      options: [
        { label: 'A', text: 'CloudFront não suporta geolocalização' },
        { label: 'B', text: 'Configurar CloudFront para forward do header "CloudFront-Viewer-Country" para o origin' },
        { label: 'C', text: 'Usar apenas Route 53 geolocation routing' },
        { label: 'D', text: 'Criar uma distribuição CloudFront por país' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront adiciona automaticamente headers de geolocalização (CloudFront-Viewer-Country, CloudFront-Viewer-City, etc.) baseado no IP do usuário. Você configura para forward esses headers ao origin, que pode então servir conteúdo personalizado. Opção A está errada. Opção C não providencia cache global. Opção D é impraticável.',
      relatedService: 'cloudfront'
    },
    {
      id: 10,
      topic: 'cloudfront',
      question: 'O que acontece quando um usuário solicita um objeto que NÃO está no cache de uma edge location?',
      context: 'Primeira vez que um usuário na Europa acessa um arquivo específico através do CloudFront.',
      options: [
        { label: 'A', text: 'A requisição falha com erro 404' },
        { label: 'B', text: 'CloudFront busca o objeto do origin, armazena no cache da edge location e retorna ao usuário' },
        { label: 'C', text: 'O usuário é redirecionado diretamente para o S3' },
        { label: 'D', text: 'CloudFront aguarda até a próxima sincronização (24h)' }
      ],
      correctAnswer: 'B',
      explanation: 'Processo de cache miss: 1) Edge location não tem o objeto, 2) Busca do origin (S3, ALB, etc.), 3) Armazena no cache local da edge, 4) Retorna ao usuário. Próximas requisições (cache hit) são servidas diretamente da edge sem ir ao origin, reduzindo latência. Opção A: CloudFront busca o origin. Opção C: CloudFront faz proxy. Opção D não existe sincronização programada.',
      relatedService: 'cloudfront'
    },
    {
      id: 11,
      topic: 'cloudfront',
      question: 'Uma empresa quer usar certificado SSL customizado (domínio próprio) no CloudFront. Onde o certificado deve ser importado?',
      context: 'Site usa domínio empresa.com em vez de xxxxx.cloudfront.net.',
      options: [
        { label: 'A', text: 'AWS Certificate Manager (ACM) na região us-east-1' },
        { label: 'B', text: 'AWS Certificate Manager (ACM) na mesma região do S3' },
        { label: 'C', text: 'Diretamente no S3 bucket' },
        { label: 'D', text: 'CloudFront não suporta SSL customizado' }
      ],
      correctAnswer: 'A',
      explanation: 'Certificados SSL para CloudFront DEVEM ser importados ou solicitados no AWS Certificate Manager (ACM) especificamente na região us-east-1 (N. Virginia), independente de onde o origin está. Isso é requisito do CloudFront (serviço global). Opção B: região errada. Opção C: S3 não armazena certificados. Opção D: suporta sim.',
      relatedService: 'cloudfront'
    },
    {
      id: 12,
      topic: 'cloudfront',
      question: 'Qual método de autenticação permite que URLs do CloudFront sejam acessíveis apenas por tempo limitado?',
      context: 'Uma plataforma de vídeo quer gerar links de download que expiram em 2 horas.',
      options: [
        { label: 'A', text: 'Security Groups' },
        { label: 'B', text: 'Signed URLs ou Signed Cookies do CloudFront' },
        { label: 'C', text: 'IAM Policies' },
        { label: 'D', text: 'VPC Endpoint' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront Signed URLs e Signed Cookies permitem acesso temporário a conteúdo privado com expiração configurável. Funcionam com par de chaves (key pair) gerenciado pelo root account. Ideal para conteúdo premium, vídeos sob demanda, downloads autorizados. Opção A: firewall de rede. Opção C: permissões AWS. Opção D: acesso privado VPC.',
      relatedService: 'cloudfront'
    },
    {
      id: 13,
      topic: 'cloudfront',
      question: 'Uma distribuição CloudFront está recebendo ataques DDoS. Qual serviço AWS se integra automaticamente para proteção?',
      context: 'Picos de tráfego malicioso tentando derrubar a aplicação.',
      options: [
        { label: 'A', text: 'Amazon GuardDuty' },
        { label: 'B', text: 'AWS Shield Standard (incluído automaticamente)' },
        { label: 'C', text: 'Amazon Inspector' },
        { label: 'D', text: 'AWS Config' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Shield Standard está automaticamente habilitado em todas as distribuições CloudFront sem custo adicional, protegendo contra ataques DDoS comuns (SYN/UDP floods, reflection attacks). Para proteção avançada, existe Shield Advanced (pago). Opção A: detecção de ameaças. Opção C: vulnerabilidades em EC2. Opção D: conformidade de recursos.',
      relatedService: 'cloudfront'
    },
    {
      id: 14,
      topic: 'cloudfront',
      question: 'Como CloudFront lida com requisições de diferentes dispositivos (mobile vs desktop)?',
      context: 'Uma aplicação responsiva precisa servir imagens otimizadas por tipo de dispositivo.',
      options: [
        { label: 'A', text: 'CloudFront não diferencia dispositivos' },
        { label: 'B', text: 'Configurar para forward headers de device type (CloudFront-Is-Mobile-Viewer, etc.) para o origin' },
        { label: 'C', text: 'Criar distribuições separadas por dispositivo' },
        { label: 'D', text: 'Usar Route 53 para detecção de dispositivo' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront detecta automaticamente tipo de dispositivo e adiciona headers: CloudFront-Is-Mobile-Viewer, CloudFront-Is-Desktop-Viewer, CloudFront-Is-Tablet-Viewer. Configurando forward desses headers, o origin pode servir conteúdo otimizado por dispositivo. Também pode criar cache keys diferentes por header. Opção A está errada. Opção C: desnecessário. Opção D: DNS não faz isso.',
      relatedService: 'cloudfront'
    },
    {
      id: 15,
      topic: 'cloudfront',
      question: 'Qual é o impacto de aumentar o TTL do cache do CloudFront?',
      context: 'Time está considerando mudar TTL de 1 hora para 24 horas.',
      options: [
        { label: 'A', text: 'Aumento de latência para usuários' },
        { label: 'B', text: 'Redução de custos e carga no origin, mas conteúdo pode ficar desatualizado por mais tempo' },
        { label: 'C', text: 'CloudFront para de funcionar' },
        { label: 'D', text: 'Aumento de custo do CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'TTL maior = objetos ficam em cache por mais tempo = menos requisições ao origin = menor custo de origin (EC2, ALB, S3 requests) e menor latência (mais cache hits). Desvantagem: usuários podem ver conteúdo desatualizado até o TTL expirar. Trade-off entre performance/custo vs freshness. Opção A: reduz latência. Opção D: CloudFront cobra por data transfer, não por TTL.',
      relatedService: 'cloudfront'
    },
    {
      id: 16,
      topic: 'cloudfront',
      question: 'Uma API REST está atrás do CloudFront. Como garantir que query strings sejam consideradas para cache?',
      context: 'URLs como /api/users?page=1 e /api/users?page=2 devem ter cache separado.',
      options: [
        { label: 'A', text: 'CloudFront sempre ignora query strings' },
        { label: 'B', text: 'Configurar cache behavior para "Forward all" ou whitelist específica de query string parameters' },
        { label: 'C', text: 'Query strings não funcionam com CloudFront' },
        { label: 'D', text: 'Usar POST em vez de GET' }
      ],
      correctAnswer: 'B',
      explanation: 'Por padrão, CloudFront pode ignorar query strings no cache key. Para APIs, configure cache behavior: "Forward all query strings" (cada combinação = cache diferente) ou whitelist parâmetros específicos (ex: apenas "page", "sort"). Isso permite cache granular. Opção A: pode ser configurado. Opção C: funciona sim. Opção D: POST geralmente não é cacheável.',
      relatedService: 'cloudfront'
    },
    {
      id: 17,
      topic: 'cloudfront',
      question: 'O que é "Regional Edge Cache" no CloudFront?',
      context: 'Arquitetura de cache do CloudFront tem múltiplas camadas.',
      options: [
        { label: 'A', text: 'Não existe, apenas edge locations' },
        { label: 'B', text: 'Camada intermediária de cache entre edge locations e origin, com maior capacidade e TTL mais longo' },
        { label: 'C', text: 'Substituição do S3' },
        { label: 'D', text: 'Cache dentro da VPC do cliente' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront tem 3 camadas: 1) Edge Locations (~200+, perto dos usuários), 2) Regional Edge Caches (~13, intermediário), 3) Origin. Quando objeto expira em edge location mas ainda está em Regional Edge Cache, é recuperado de lá (mais rápido que buscar do origin). Melhora performance e reduz carga no origin. Gerenciado automaticamente pela AWS.',
      relatedService: 'cloudfront'
    },
    {
      id: 18,
      topic: 'cloudfront',
      question: 'Como habilitar logs de acesso (access logs) no CloudFront?',
      context: 'Equipe de segurança precisa auditar todas as requisições ao CloudFront.',
      options: [
        { label: 'A', text: 'CloudFront não gera logs' },
        { label: 'B', text: 'Configurar Standard Logs (armazenados no S3) ou Real-time Logs (Kinesis Data Streams)' },
        { label: 'C', text: 'Logs são enviados automaticamente para CloudWatch sem configuração' },
        { label: 'D', text: 'Apenas AWS Support tem acesso a logs' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront oferece duas opções: 1) Standard Logs (access logs): arquivos no S3 com delay de alguns minutos, sem custo adicional. 2) Real-time Logs: stream para Kinesis Data Streams em tempo real (pago). Logs incluem IP, user-agent, path, status code, cache hit/miss, etc. Opção C: precisa habilitar manualmente.',
      relatedService: 'cloudfront'
    },
    {
      id: 19,
      topic: 'cloudfront',
      question: 'Uma empresa precisa bloquear acesso ao conteúdo do CloudFront de certos países. Como fazer?',
      context: 'Requisito de compliance exige bloqueio de acesso de alguns países específicos.',
      options: [
        { label: 'A', text: 'CloudFront não suporta geo-restriction' },
        { label: 'B', text: 'Configurar Geo Restriction (whitelist ou blacklist) nas configurações da distribuição' },
        { label: 'C', text: 'Usar Security Groups' },
        { label: 'D', text: 'Bloquear no firewall local' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront possui recurso nativo Geo Restriction (geographic restrictions): permite criar whitelist (apenas países permitidos) ou blacklist (países bloqueados). Baseado no IP geográfico do usuário. Retorna HTTP 403 para países bloqueados. Opção C: Security Groups não aplicam a CloudFront. Opção D: não tem controle sobre edge locations.',
      relatedService: 'cloudfront'
    },
    {
      id: 20,
      topic: 'cloudfront',
      question: 'Qual é a relação entre CloudFront e AWS WAF (Web Application Firewall)?',
      context: 'Empresa quer proteger aplicação contra SQL injection e XSS attacks.',
      options: [
        { label: 'A', text: 'CloudFront não se integra com WAF' },
        { label: 'B', text: 'AWS WAF pode ser anexado a uma distribuição CloudFront para filtrar requisições maliciosas antes de chegarem ao origin' },
        { label: 'C', text: 'WAF substitui CloudFront' },
        { label: 'D', text: 'WAF só funciona com ALB' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS WAF integra nativamente com CloudFront (também ALB, API Gateway). Você associa Web ACLs (regras) à distribuição. WAF filtra requisições nas edge locations ANTES de processar/cachear, bloqueando ataques (SQL injection, XSS, rate limiting, geo-blocking avançado). Reduz carga no origin. Opção D: funciona com CloudFront, ALB e API Gateway.',
      relatedService: 'cloudfront'
    },
    {
      id: 21,
      topic: 'cloudfront',
      question: 'O que é CloudFront Functions e quando usar?',
      context: 'Customização de requisições.',
      options: [
        { label: 'A', text: 'Substituto do Lambda' },
        { label: 'B', text: 'Funções leves JS executadas em edge para manipulação simples de request/response (header, redirect, URL rewrite)' },
        { label: 'C', text: 'Função de backup do S3' },
        { label: 'D', text: 'Serviço de monitoramento' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront Functions são JS leve (<1ms) em edge. Ideal: header manipulation, URL rewrite, A/B testing, normalize cache keys. Lambda@Edge para lógica complexa.',
      relatedService: 'cloudfront'
    },
    {
      id: 22,
      topic: 'cloudfront',
      question: 'Qual diferença entre CloudFront Functions e Lambda@Edge?',
      context: 'Escolhendo entre as duas opções.',
      options: [
        { label: 'A', text: 'São idênticos' },
        { label: 'B', text: 'CF Functions: JS simples, sub-ms, viewer events. Lambda@Edge: Node/Python, até 30s, origin events também' },
        { label: 'C', text: 'Lambda@Edge é mais barato' },
        { label: 'D', text: 'CF Functions suporta banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'CF Functions para manipulação leve; Lambda@Edge para lógica complexa (auth, A/B, image resize, fetch externo).',
      relatedService: 'cloudfront'
    },
    {
      id: 23,
      topic: 'cloudfront',
      question: 'Como servir conteúdo privado S3 via CloudFront?',
      context: 'Streaming de vídeo pago.',
      options: [
        { label: 'A', text: 'Bucket público' },
        { label: 'B', text: 'Usar OAC + bucket privado + Signed URLs/Cookies' },
        { label: 'C', text: 'Usar NAT Gateway' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'OAC bloqueia acesso direto ao S3; Signed URLs/Cookies controlam quem acessa via CloudFront.',
      relatedService: 'cloudfront'
    },
    {
      id: 24,
      topic: 'cloudfront',
      question: 'Como configurar failover entre dois origins (S3 em regiões diferentes)?',
      context: 'Alta disponibilidade.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar Origin Group com origin primário e secundário' },
        { label: 'C', text: 'Criar duas distribuições' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Groups permitem failover automático quando origin primário retorna erros 5xx/4xx.',
      relatedService: 'cloudfront'
    },
    {
      id: 25,
      topic: 'cloudfront',
      question: 'O que é "Price Class" no CloudFront?',
      context: 'Otimização de custo.',
      options: [
        { label: 'A', text: 'Nível de SLA' },
        { label: 'B', text: 'Define quais regiões de edge locations são usadas, impactando custo e latência' },
        { label: 'C', text: 'Tipo de instância' },
        { label: 'D', text: 'Categoria de storage' }
      ],
      correctAnswer: 'B',
      explanation: 'Price Class 100 = apenas edge locations mais baratas (US/EU). Price Class All = global. Trade-off custo vs latência.',
      relatedService: 'cloudfront'
    },
    {
      id: 26,
      topic: 'cloudfront',
      question: 'Como forçar HTTPS no CloudFront?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Configurar Viewer Protocol Policy: HTTPS Only ou Redirect HTTP to HTTPS' },
        { label: 'C', text: 'Usar Security Group' },
        { label: 'D', text: 'Desativar HTTP no origin' }
      ],
      correctAnswer: 'B',
      explanation: 'Viewer Protocol Policy controla conexão entre viewer e CloudFront. "Redirect" converte automaticamente.',
      relatedService: 'cloudfront'
    },
    {
      id: 27,
      topic: 'cloudfront',
      question: 'O que é Origin Protocol Policy?',
      context: 'Conexão CloudFront-Origin.',
      options: [
        { label: 'A', text: 'Política de cache' },
        { label: 'B', text: 'Define protocolo usado na conexão entre CloudFront e origin (HTTP only, HTTPS only, Match Viewer)' },
        { label: 'C', text: 'Política de WAF' },
        { label: 'D', text: 'Política de geo-restriction' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Protocol Policy controla conexão CloudFront→Origin. Match Viewer usa mesmo protocolo do viewer.',
      relatedService: 'cloudfront'
    },
    {
      id: 28,
      topic: 'cloudfront',
      question: 'Como usar domínio próprio (CNAME) no CloudFront?',
      context: 'Branding.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Adicionar Alternate Domain Names (CNAMEs) na distribuição e configurar DNS' },
        { label: 'C', text: 'Usar apenas xxxxxx.cloudfront.net' },
        { label: 'D', text: 'Pagar taxa adicional' }
      ],
      correctAnswer: 'B',
      explanation: 'Adicione CNAMEs (ex: cdn.empresa.com) e configure Route 53/DNS com CNAME ou A alias.',
      relatedService: 'cloudfront'
    },
    {
      id: 29,
      topic: 'cloudfront',
      question: 'Qual limite padrão de invalidações simultâneas?',
      context: 'Deploy frequente.',
      options: [
        { label: 'A', text: 'Ilimitado' },
        { label: 'B', text: 'Limite de 3000 paths em progresso e 15 invalidations em progresso (soft limit)' },
        { label: 'C', text: '1 por dia' },
        { label: 'D', text: '100 por hora' }
      ],
      correctAnswer: 'B',
      explanation: 'Limites podem ser aumentados via Service Quotas. Use versioning (v1,v2) para evitar invalidações frequentes.',
      relatedService: 'cloudfront'
    },
    {
      id: 30,
      topic: 'cloudfront',
      question: 'Como usar CloudFront com ALB como origin?',
      context: 'Aplicação dinâmica.',
      options: [
        { label: 'A', text: 'Não suporta ALB' },
        { label: 'B', text: 'Configurar ALB DNS como custom origin, ajustar cache behavior para TTL baixo' },
        { label: 'C', text: 'Usar IP do ALB' },
        { label: 'D', text: 'Usar Lambda' }
      ],
      correctAnswer: 'B',
      explanation: 'ALB como custom origin: use DNS do ALB, configure headers forward, TTL baixo ou 0 para conteúdo dinâmico.',
      relatedService: 'cloudfront'
    },
    {
      id: 31,
      topic: 'cloudfront',
      question: 'O que é "Field-Level Encryption"?',
      context: 'Proteção de dados sensíveis.',
      options: [
        { label: 'A', text: 'Criptografia de disco' },
        { label: 'B', text: 'Criptografia de campos específicos no POST antes de chegar ao origin, descriptografado apenas no backend' },
        { label: 'C', text: 'SSL/TLS' },
        { label: 'D', text: 'Criptografia do S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Field-Level Encryption protege dados sensíveis (cartão, CPF) no edge; origin descriptografa com chave privada.',
      relatedService: 'cloudfront'
    },
    {
      id: 32,
      topic: 'cloudfront',
      question: 'Como monitorar performance do CloudFront?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Não há métricas' },
        { label: 'B', text: 'CloudWatch Metrics: Requests, BytesDownloaded, CacheHitRate, ErrorRate' },
        { label: 'C', text: 'Apenas logs manuais' },
        { label: 'D', text: 'Usar ping' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch integra com CloudFront oferecendo métricas detalhadas. Dashboards e alarmes disponíveis.',
      relatedService: 'cloudfront'
    },
    {
      id: 33,
      topic: 'cloudfront',
      question: 'Qual métrica indica eficiência do cache?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'BytesUploaded' },
        { label: 'B', text: 'CacheHitRate (percentual de requisições servidas do cache)' },
        { label: 'C', text: 'TotalErrorRate' },
        { label: 'D', text: 'Requests' }
      ],
      correctAnswer: 'B',
      explanation: 'CacheHitRate alto = mais requisições do cache, menos carga no origin, menor latência.',
      relatedService: 'cloudfront'
    },
    {
      id: 34,
      topic: 'cloudfront',
      question: 'Como otimizar imagens automaticamente no CloudFront?',
      context: 'Performance web.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar Lambda@Edge ou CloudFront Functions para redimensionar/converter formato' },
        { label: 'C', text: 'Usar S3 lifecycle' },
        { label: 'D', text: 'Usar EBS' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda@Edge pode chamar serviços de resize ou usar Sharp para otimizar imagens on-the-fly.',
      relatedService: 'cloudfront'
    },
    {
      id: 35,
      topic: 'cloudfront',
      question: 'O que é "Continuous Deployment" no CloudFront?',
      context: 'Canary releases.',
      options: [
        { label: 'A', text: 'Feature inexistente' },
        { label: 'B', text: 'Permite testar nova configuração com percentual de tráfego antes de promover' },
        { label: 'C', text: 'Deploy automático do S3' },
        { label: 'D', text: 'Integração com CodePipeline' }
      ],
      correctAnswer: 'B',
      explanation: 'Continuous Deployment cria staging distribution com percentual de tráfego para validar mudanças.',
      relatedService: 'cloudfront'
    },
    {
      id: 36,
      topic: 'cloudfront',
      question: 'Como limitar rate de requisições por IP?',
      context: 'Proteção contra abuse.',
      options: [
        { label: 'A', text: 'CloudFront não suporta' },
        { label: 'B', text: 'Usar AWS WAF Rate-based rules associado à distribuição' },
        { label: 'C', text: 'Usar Security Group' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'WAF Rate-based rules bloqueiam IPs que excedem threshold de requisições.',
      relatedService: 'cloudfront'
    },
    {
      id: 37,
      topic: 'cloudfront',
      question: 'O que é "Response Headers Policy"?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Política de cache' },
        { label: 'B', text: 'Adiciona headers de segurança (CORS, CSP, HSTS) automaticamente nas respostas' },
        { label: 'C', text: 'Política de SSL' },
        { label: 'D', text: 'Política de compressão' }
      ],
      correctAnswer: 'B',
      explanation: 'Response Headers Policy injeta headers de segurança sem alterar origin. Ex: X-Frame-Options, CSP.',
      relatedService: 'cloudfront'
    },
    {
      id: 38,
      topic: 'cloudfront',
      question: 'Como habilitar compressão automática?',
      context: 'Reduzir transfer.',
      options: [
        { label: 'A', text: 'Origin deve comprimir' },
        { label: 'B', text: 'Habilitar "Compress Objects Automatically" no cache behavior' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront comprime objetos automaticamente (gzip/brotli) se cliente suporta Accept-Encoding.',
      relatedService: 'cloudfront'
    },
    {
      id: 39,
      topic: 'cloudfront',
      question: 'Como fazer redirect de www para apex domain?',
      context: 'SEO.',
      options: [
        { label: 'A', text: 'Configurar no S3' },
        { label: 'B', text: 'Usar CloudFront Function para redirect 301' },
        { label: 'C', text: 'Configurar no Route 53' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront Function pode verificar Host header e retornar 301 redirect. Simples e rápido.',
      relatedService: 'cloudfront'
    },
    {
      id: 40,
      topic: 'cloudfront',
      question: 'O que é "Origin Shield"?',
      context: 'Proteção do origin.',
      options: [
        { label: 'A', text: 'Firewall' },
        { label: 'B', text: 'Camada adicional de cache entre edge locations e origin, reduzindo carga no origin' },
        { label: 'C', text: 'DDoS protection' },
        { label: 'D', text: 'SSL termination' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Shield agrega requisições de múltiplas edge locations, aumentando cache hit ratio no origin.',
      relatedService: 'cloudfront'
    },
    {
      id: 41,
      topic: 'cloudfront',
      question: 'Como usar CloudFront para streaming de vídeo ao vivo?',
      context: 'Live streaming.',
      options: [
        { label: 'A', text: 'Não suporta live' },
        { label: 'B', text: 'Usar MediaLive + MediaPackage como origin com CloudFront na frente' },
        { label: 'C', text: 'Usar S3 para live' },
        { label: 'D', text: 'Usar EC2 diretamente' }
      ],
      correctAnswer: 'B',
      explanation: 'MediaLive processa stream, MediaPackage empacota (HLS/DASH), CloudFront distribui globalmente.',
      relatedService: 'cloudfront'
    },
    {
      id: 42,
      topic: 'cloudfront',
      question: 'Como habilitar HTTP/3 (QUIC)?',
      context: 'Performance moderna.',
      options: [
        { label: 'A', text: 'Não suporta' },
        { label: 'B', text: 'Habilitar HTTP/3 nas configurações da distribuição' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Configurar no origin' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront suporta HTTP/3 para conexões viewer-edge. Melhora performance em conexões instáveis.',
      relatedService: 'cloudfront'
    },
    {
      id: 43,
      topic: 'cloudfront',
      question: 'Como invalidar cache programaticamente?',
      context: 'CI/CD.',
      options: [
        { label: 'A', text: 'Apenas console' },
        { label: 'B', text: 'Usar AWS CLI create-invalidation ou SDK' },
        { label: 'C', text: 'Reiniciar distribuição' },
        { label: 'D', text: 'Deletar distribuição' }
      ],
      correctAnswer: 'B',
      explanation: 'CLI/SDK permite automatizar invalidações no pipeline. Ex: aws cloudfront create-invalidation.',
      relatedService: 'cloudfront'
    },
    {
      id: 44,
      topic: 'cloudfront',
      question: 'O que é "Cache Key"?',
      context: 'Controle de cache.',
      options: [
        { label: 'A', text: 'Chave de criptografia' },
        { label: 'B', text: 'Identificador único que determina se objeto está em cache (URL + headers + query strings selecionados)' },
        { label: 'C', text: 'Chave de API' },
        { label: 'D', text: 'Chave do S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Cache Key define unicidade do cache. Normalize para aumentar hit ratio (ex: remover query strings irrelevantes).',
      relatedService: 'cloudfront'
    },
    {
      id: 45,
      topic: 'cloudfront',
      question: 'Como servir diferentes versões de site (A/B testing)?',
      context: 'Experimentação.',
      options: [
        { label: 'A', text: 'Criar duas distribuições' },
        { label: 'B', text: 'Usar Lambda@Edge ou CloudFront Functions para roteamento baseado em cookie/header' },
        { label: 'C', text: 'Usar Route 53 weighted' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda@Edge pode avaliar cookie e redirecionar para diferentes origens ou paths.',
      relatedService: 'cloudfront'
    },
    {
      id: 46,
      topic: 'cloudfront',
      question: 'Qual evento de Lambda@Edge executa antes do cache ser verificado?',
      context: 'Lifecycle.',
      options: [
        { label: 'A', text: 'Origin Request' },
        { label: 'B', text: 'Viewer Request' },
        { label: 'C', text: 'Origin Response' },
        { label: 'D', text: 'Viewer Response' }
      ],
      correctAnswer: 'B',
      explanation: 'Viewer Request executa primeiro, antes do cache check. Ideal para auth, redirect, normalize.',
      relatedService: 'cloudfront'
    },
    {
      id: 47,
      topic: 'cloudfront',
      question: 'Qual evento modifica resposta do origin antes de cachear?',
      context: 'Customização.',
      options: [
        { label: 'A', text: 'Viewer Request' },
        { label: 'B', text: 'Origin Response' },
        { label: 'C', text: 'Viewer Response' },
        { label: 'D', text: 'Origin Request' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Response executa após origin responder, antes de cachear. Pode adicionar headers, modificar body.',
      relatedService: 'cloudfront'
    },
    {
      id: 48,
      topic: 'cloudfront',
      question: 'Como proteger origin EC2/ALB de acesso direto?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Bucket policy' },
        { label: 'B', text: 'Usar custom header secreto + WAF/Security Group para aceitar apenas requisições com esse header' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Configure custom header no CloudFront origin; SG/WAF no ALB aceita apenas com esse header.',
      relatedService: 'cloudfront'
    },
    {
      id: 49,
      topic: 'cloudfront',
      question: 'Como usar múltiplos certificados SSL na mesma distribuição?',
      context: 'Multi-tenant.',
      options: [
        { label: 'A', text: 'Um certificado por distribuição' },
        { label: 'B', text: 'Usar certificado wildcard ou SAN (Subject Alternative Names) com múltiplos domínios' },
        { label: 'C', text: 'Criar alias' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Certificados SAN ou wildcard (*.empresa.com) cobrem múltiplos domínios na mesma distribuição.',
      relatedService: 'cloudfront'
    },
    {
      id: 50,
      topic: 'cloudfront',
      question: 'O que acontece se origin retorna erro 5xx?',
      context: 'Failover.',
      options: [
        { label: 'A', text: 'CloudFront retorna erro imediatamente' },
        { label: 'B', text: 'Com Origin Group, CloudFront tenta origin secundário automaticamente' },
        { label: 'C', text: 'CloudFront cacheia o erro para sempre' },
        { label: 'D', text: 'CloudFront reinicia' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Groups permitem failover automático em erros. Configure error caching TTL baixo.',
      relatedService: 'cloudfront'
    },
    {
      id: 51,
      topic: 'cloudfront',
      question: 'Como configurar página de erro customizada?',
      context: 'UX.',
      options: [
        { label: 'A', text: 'Configurar no origin' },
        { label: 'B', text: 'Definir Custom Error Response no CloudFront para redirecionar erros para página específica' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Custom Error Responses permitem retornar página diferente (ex: /404.html) e definir TTL de cache do erro.',
      relatedService: 'cloudfront'
    },
    {
      id: 52,
      topic: 'cloudfront',
      question: 'Qual é o SLA do CloudFront?',
      context: 'Garantia.',
      options: [
        { label: 'A', text: 'Sem SLA' },
        { label: 'B', text: '99.9% de uptime' },
        { label: 'C', text: '99% de uptime' },
        { label: 'D', text: '100% de uptime' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront oferece SLA de 99.9% de disponibilidade com créditos em caso de falha.',
      relatedService: 'cloudfront'
    },
    {
      id: 53,
      topic: 'cloudfront',
      question: 'Como usar CloudFront com API Gateway?',
      context: 'APIs globais.',
      options: [
        { label: 'A', text: 'Não é compatível' },
        { label: 'B', text: 'Configurar API Gateway como custom origin; usar edge-optimized ou regional endpoint' },
        { label: 'C', text: 'Usar apenas Lambda' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront na frente de API Gateway melhora cache e reduz latência. Use regional endpoint para evitar double hop.',
      relatedService: 'cloudfront'
    },
    {
      id: 54,
      topic: 'cloudfront',
      question: 'O que é "Trusted Key Groups"?',
      context: 'Signed URLs.',
      options: [
        { label: 'A', text: 'Grupos de usuários IAM' },
        { label: 'B', text: 'Chaves públicas para validar Signed URLs/Cookies (substitui CloudFront Key Pairs)' },
        { label: 'C', text: 'Grupos de segurança' },
        { label: 'D', text: 'Grupos de origins' }
      ],
      correctAnswer: 'B',
      explanation: 'Trusted Key Groups permitem gerenciar chaves via API (não precisa root). Mais flexível que key pairs legacy.',
      relatedService: 'cloudfront'
    },
    {
      id: 55,
      topic: 'cloudfront',
      question: 'Como debugar problemas de cache?',
      context: 'Troubleshooting.',
      options: [
        { label: 'A', text: 'Não há ferramentas' },
        { label: 'B', text: 'Verificar headers de resposta X-Cache, X-Amz-Cf-Pop, Age; usar CloudWatch Logs' },
        { label: 'C', text: 'Usar ping' },
        { label: 'D', text: 'Reiniciar distribuição' }
      ],
      correctAnswer: 'B',
      explanation: 'X-Cache indica Hit/Miss. X-Amz-Cf-Pop mostra edge location. Age mostra tempo em cache.',
      relatedService: 'cloudfront'
    },
    {
      id: 56,
      topic: 'cloudfront',
      question: 'O que significa "X-Cache: Miss from cloudfront"?',
      context: 'Headers.',
      options: [
        { label: 'A', text: 'Erro de cache' },
        { label: 'B', text: 'Objeto não estava em cache, foi buscado do origin' },
        { label: 'C', text: 'Cache desabilitado' },
        { label: 'D', text: 'Origin indisponível' }
      ],
      correctAnswer: 'B',
      explanation: 'Miss indica cache miss; próximas requisições serão Hit se TTL válido.',
      relatedService: 'cloudfront'
    },
    {
      id: 57,
      topic: 'cloudfront',
      question: 'Como forçar HTTP/2?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'Já é padrão para HTTPS' },
        { label: 'B', text: 'Configurar manualmente' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Não suporta' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudFront usa HTTP/2 automaticamente para conexões HTTPS com clientes compatíveis.',
      relatedService: 'cloudfront'
    },
    {
      id: 58,
      topic: 'cloudfront',
      question: 'Como melhorar upload performance?',
      context: 'Uploads grandes.',
      options: [
        { label: 'A', text: 'CloudFront não ajuda em uploads' },
        { label: 'B', text: 'Usar S3 Transfer Acceleration ou POST direto via CloudFront para origin' },
        { label: 'C', text: 'Usar FTP' },
        { label: 'D', text: 'Desativar cache' }
      ],
      correctAnswer: 'B',
      explanation: 'Transfer Acceleration usa edge network para uploads rápidos ao S3. CloudFront também pode proxy POSTs.',
      relatedService: 'cloudfront'
    },
    {
      id: 59,
      topic: 'cloudfront',
      question: 'O que é "Cache Policy"?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Política de segurança' },
        { label: 'B', text: 'Define TTL e quais headers/query strings/cookies fazem parte da cache key' },
        { label: 'C', text: 'Política de WAF' },
        { label: 'D', text: 'Política de billing' }
      ],
      correctAnswer: 'B',
      explanation: 'Cache Policy separa configuração de cache da origin request policy. Reutilizável entre behaviors.',
      relatedService: 'cloudfront'
    },
    {
      id: 60,
      topic: 'cloudfront',
      question: 'O que é "Origin Request Policy"?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Política de cache' },
        { label: 'B', text: 'Define quais headers/query strings/cookies são enviados ao origin (independente de cache key)' },
        { label: 'C', text: 'Política de SSL' },
        { label: 'D', text: 'Política de logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Request Policy controla o que vai ao origin. Separado de Cache Policy para flexibilidade.',
      relatedService: 'cloudfront'
    },
    {
      id: 61,
      topic: 'cloudfront',
      question: 'Como servir conteúdo baseado em Accept-Language header?',
      context: 'Internacionalização.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Forward Accept-Language ao origin e incluir no cache key para cache por idioma' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Criar distribuição por idioma' }
      ],
      correctAnswer: 'B',
      explanation: 'Forward header + cache key separado por valor = cache diferente por idioma.',
      relatedService: 'cloudfront'
    },
    {
      id: 62,
      topic: 'cloudfront',
      question: 'Como configurar timeout de conexão com origin?',
      context: 'Origins lentos.',
      options: [
        { label: 'A', text: 'Não é configurável' },
        { label: 'B', text: 'Ajustar Origin Connection Timeout e Origin Read Timeout' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Aumentar TTL' }
      ],
      correctAnswer: 'B',
      explanation: 'Connection Timeout (1-10s) e Read Timeout (4-60s) ajustáveis por origin. Evita espera excessiva.',
      relatedService: 'cloudfront'
    },
    {
      id: 63,
      topic: 'cloudfront',
      question: 'Como usar CloudFront com WebSocket?',
      context: 'Real-time.',
      options: [
        { label: 'A', text: 'Não suporta' },
        { label: 'B', text: 'WebSocket suportado nativamente; conexão mantida entre edge e origin' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront suporta WebSocket passthrough. Conexões persistentes funcionam normalmente.',
      relatedService: 'cloudfront'
    },
    {
      id: 64,
      topic: 'cloudfront',
      question: 'Como integrar CloudFront com AWS Global Accelerator?',
      context: 'Complementares.',
      options: [
        { label: 'A', text: 'São mutuamente exclusivos' },
        { label: 'B', text: 'Não precisam; CloudFront já usa edge. Global Accelerator é para TCP/UDP genérico' },
        { label: 'C', text: 'Usar ambos sempre' },
        { label: 'D', text: 'Global Accelerator substitui CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront para HTTP/S com cache. Global Accelerator para TCP/UDP sem cache (gaming, IoT, VoIP).',
      relatedService: 'cloudfront'
    },
    {
      id: 65,
      topic: 'cloudfront',
      question: 'Como restringir acesso por IP no CloudFront?',
      context: 'Whitelist.',
      options: [
        { label: 'A', text: 'Security Groups' },
        { label: 'B', text: 'Usar AWS WAF IP Set para bloquear/permitir ranges específicos' },
        { label: 'C', text: 'NACL' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'WAF IP Sets permitem whitelist/blacklist de CIDRs. Aplicado nas edge locations.',
      relatedService: 'cloudfront'
    },
    {
      id: 66,
      topic: 'cloudfront',
      question: 'O que é "Managed Cache Policy"?',
      context: 'Convenience.',
      options: [
        { label: 'A', text: 'Política customizada' },
        { label: 'B', text: 'Políticas pré-configuradas pela AWS para cenários comuns (ex: CachingOptimized, CachingDisabled)' },
        { label: 'C', text: 'Política de billing' },
        { label: 'D', text: 'Política de logs' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS oferece managed policies prontas. CachingOptimized para estático, CachingDisabled para dinâmico.',
      relatedService: 'cloudfront'
    },
    {
      id: 67,
      topic: 'cloudfront',
      question: 'Como evitar hotlinking de imagens?',
      context: 'Proteção de conteúdo.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar CloudFront Function/Lambda@Edge para verificar Referer header' },
        { label: 'C', text: 'Usar S3 policy' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda@Edge pode bloquear requisições com Referer de domínios não autorizados.',
      relatedService: 'cloudfront'
    },
    {
      id: 68,
      topic: 'cloudfront',
      question: 'Como funciona o billing do CloudFront?',
      context: 'Custo.',
      options: [
        { label: 'A', text: 'Preço fixo mensal' },
        { label: 'B', text: 'Cobra por data transfer out, requests HTTP/HTTPS, invalidations (após free tier)' },
        { label: 'C', text: 'Grátis' },
        { label: 'D', text: 'Cobra por edge location' }
      ],
      correctAnswer: 'B',
      explanation: 'Paga por GB out, número de requests (HTTPS mais caro), invalidations após 1000/mês grátis.',
      relatedService: 'cloudfront'
    },
    {
      id: 69,
      topic: 'cloudfront',
      question: 'Qual recurso reduz custo de requests frequentes?',
      context: 'FinOps.',
      options: [
        { label: 'A', text: 'Aumentar TTL e cache hit ratio' },
        { label: 'B', text: 'Usar HTTP em vez de HTTPS' },
        { label: 'C', text: 'Diminuir TTL' },
        { label: 'D', text: 'Desativar compressão' }
      ],
      correctAnswer: 'A',
      explanation: 'Maior cache hit = menos requests ao origin = menos custo. Otimize cache keys e TTLs.',
      relatedService: 'cloudfront'
    },
    {
      id: 70,
      topic: 'cloudfront',
      question: 'Como usar CloudFront com autenticação Cognito?',
      context: 'Auth.',
      options: [
        { label: 'A', text: 'Não integra' },
        { label: 'B', text: 'Usar Lambda@Edge para validar JWT token do Cognito antes de servir conteúdo' },
        { label: 'C', text: 'Usar Signed URLs' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda@Edge no Viewer Request valida token JWT. Se inválido, retorna 401/403.',
      relatedService: 'cloudfront'
    },
    {
      id: 71,
      topic: 'cloudfront',
      question: 'O que é "Origin Failover"?',
      context: 'HA.',
      options: [
        { label: 'A', text: 'Failover de DNS' },
        { label: 'B', text: 'Recurso de Origin Groups que muda para origin secundário quando primário falha' },
        { label: 'C', text: 'Failover de edge location' },
        { label: 'D', text: 'Backup de cache' }
      ],
      correctAnswer: 'B',
      explanation: 'Origin Groups detectam erros (5xx, 4xx configuráveis) e tentam origin secundário automaticamente.',
      relatedService: 'cloudfront'
    },
    {
      id: 72,
      topic: 'cloudfront',
      question: 'Como excluir cookies do cache key?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Configurar Cache Policy para não incluir cookies ou whitelist específicos' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Desativar cookies no browser' }
      ],
      correctAnswer: 'B',
      explanation: 'Cache Policy define quais cookies (None, Whitelist, All) fazem parte da cache key.',
      relatedService: 'cloudfront'
    },
    {
      id: 73,
      topic: 'cloudfront',
      question: 'Como servir arquivos grandes (streaming)?',
      context: 'Vídeo.',
      options: [
        { label: 'A', text: 'Download completo apenas' },
        { label: 'B', text: 'Usar Range requests; CloudFront suporta byte-range fetching do origin' },
        { label: 'C', text: 'Usar FTP' },
        { label: 'D', text: 'Limite de 100MB' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront suporta Range requests para streaming. Busca parcial do origin se não em cache.',
      relatedService: 'cloudfront'
    },
    {
      id: 74,
      topic: 'cloudfront',
      question: 'Qual limite de tamanho de objeto no CloudFront?',
      context: 'Limites.',
      options: [
        { label: 'A', text: '5GB' },
        { label: 'B', text: '30GB para cache, até 20GB via single PUT' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: '100MB' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront cacheia objetos até 30GB. Para arquivos maiores, use Range requests ou streaming.',
      relatedService: 'cloudfront'
    },
    {
      id: 75,
      topic: 'cloudfront',
      question: 'Como replicar configuração entre distribuições?',
      context: 'Multi-environment.',
      options: [
        { label: 'A', text: 'Configurar manualmente cada uma' },
        { label: 'B', text: 'Usar IaC (CloudFormation/Terraform) ou copiar via CLI/API' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'IaC permite replicar configuração idêntica. CLI get-distribution + create-distribution.',
      relatedService: 'cloudfront'
    },
    {
      id: 76,
      topic: 'cloudfront',
      question: 'Como usar CloudFront com S3 Access Points?',
      context: 'Permissões granulares.',
      options: [
        { label: 'A', text: 'Não compatível' },
        { label: 'B', text: 'Configurar S3 Access Point ARN como origin' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Usar VPC endpoint' }
      ],
      correctAnswer: 'B',
      explanation: 'Access Points como origin permitem controle granular de permissões por aplicação.',
      relatedService: 'cloudfront'
    },
    {
      id: 77,
      topic: 'cloudfront',
      question: 'O que é SNI (Server Name Indication)?',
      context: 'SSL.',
      options: [
        { label: 'A', text: 'Protocolo de roteamento' },
        { label: 'B', text: 'Extensão TLS que permite múltiplos certificados no mesmo IP (padrão CloudFront)' },
        { label: 'C', text: 'Tipo de compressão' },
        { label: 'D', text: 'Política de cache' }
      ],
      correctAnswer: 'B',
      explanation: 'SNI permite servir múltiplos domínios SSL no mesmo IP. Dedicated IP é alternativa para clientes antigos.',
      relatedService: 'cloudfront'
    },
    {
      id: 78,
      topic: 'cloudfront',
      question: 'Quando usar Dedicated IP SSL?',
      context: 'Compatibilidade.',
      options: [
        { label: 'A', text: 'Sempre' },
        { label: 'B', text: 'Apenas para clientes legacy que não suportam SNI (custo $600/mês)' },
        { label: 'C', text: 'Para melhor performance' },
        { label: 'D', text: 'Para WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'Dedicated IP necessário apenas para browsers muito antigos. SNI é padrão e sem custo extra.',
      relatedService: 'cloudfront'
    },
    {
      id: 79,
      topic: 'cloudfront',
      question: 'Como atualizar certificado SSL sem downtime?',
      context: 'Renovação.',
      options: [
        { label: 'A', text: 'Precisa de downtime' },
        { label: 'B', text: 'ACM renova automaticamente certificados gerenciados; para importados, substitua antes de expirar' },
        { label: 'C', text: 'Criar nova distribuição' },
        { label: 'D', text: 'Usar HTTP' }
      ],
      correctAnswer: 'B',
      explanation: 'ACM managed certs renovam automaticamente. Para importados, atualize com antecedência.',
      relatedService: 'cloudfront'
    },
    {
      id: 80,
      topic: 'cloudfront',
      question: 'Como testar nova configuração antes de produção?',
      context: 'Staging.',
      options: [
        { label: 'A', text: 'Testar direto em prod' },
        { label: 'B', text: 'Usar Continuous Deployment (staging config) ou criar distribuição separada para teste' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Continuous Deployment permite canary com % de tráfego. Ou use distribuição staging separada.',
      relatedService: 'cloudfront'
    },
    {
      id: 81,
      topic: 'cloudfront',
      question: 'Como configurar CORS no CloudFront?',
      context: 'APIs cross-origin.',
      options: [
        { label: 'A', text: 'Configurar no CloudFront' },
        { label: 'B', text: 'Forward Origin header ao origin; origin retorna Access-Control-Allow-Origin. Ou usar Response Headers Policy' },
        { label: 'C', text: 'Usar WAF' },
        { label: 'D', text: 'Desativar cache' }
      ],
      correctAnswer: 'B',
      explanation: 'Forward Origin header para cache correto por origin. Response Headers Policy pode adicionar CORS headers.',
      relatedService: 'cloudfront'
    },
    {
      id: 82,
      topic: 'cloudfront',
      question: 'Como integrar com CloudFormation?',
      context: 'IaC.',
      options: [
        { label: 'A', text: 'Não suporta' },
        { label: 'B', text: 'Usar AWS::CloudFront::Distribution resource com configuração completa' },
        { label: 'C', text: 'Apenas CLI' },
        { label: 'D', text: 'Apenas console' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFormation suporta todas as configurações de CloudFront. Ideal para reprodutibilidade.',
      relatedService: 'cloudfront'
    },
    {
      id: 83,
      topic: 'cloudfront',
      question: 'Qual log format está disponível?',
      context: 'Análise.',
      options: [
        { label: 'A', text: 'Apenas JSON' },
        { label: 'B', text: 'Standard logs em W3C format no S3; Real-time logs em JSON para Kinesis' },
        { label: 'C', text: 'Apenas CSV' },
        { label: 'D', text: 'Apenas CloudWatch' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard logs: W3C extended format no S3. Real-time: JSON para Kinesis Data Streams.',
      relatedService: 'cloudfront'
    },
    {
      id: 84,
      topic: 'cloudfront',
      question: 'Como analisar logs com Athena?',
      context: 'Analytics.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Criar tabela externa no Athena apontando para bucket de logs do CloudFront' },
        { label: 'C', text: 'Usar Lambda' },
        { label: 'D', text: 'Usar CloudWatch' }
      ],
      correctAnswer: 'B',
      explanation: 'Athena permite queries SQL sobre logs no S3. Use particionamento por data para performance.',
      relatedService: 'cloudfront'
    },
    {
      id: 85,
      topic: 'cloudfront',
      question: 'O que é CloudFront KeyValueStore?',
      context: 'Edge data.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'Key-value store global para CloudFront Functions acessarem dados sem ir ao origin' },
        { label: 'C', text: 'Cache de sessão' },
        { label: 'D', text: 'Substituição do S3' }
      ],
      correctAnswer: 'B',
      explanation: 'KeyValueStore permite lookup rápido de dados (redirects, feature flags) em CloudFront Functions.',
      relatedService: 'cloudfront'
    },
    {
      id: 86,
      topic: 'cloudfront',
      question: 'Como fazer redirect 301/302?',
      context: 'SEO/migração.',
      options: [
        { label: 'A', text: 'Configurar no origin' },
        { label: 'B', text: 'Usar CloudFront Function para retornar redirect response' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Invalidação' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront Function pode retornar 301/302 com Location header. Simples e rápido.',
      relatedService: 'cloudfront'
    },
    {
      id: 87,
      topic: 'cloudfront',
      question: 'Como limitar acesso a arquivos específicos?',
      context: 'Granular access.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar cache behaviors diferentes por path com autenticação (Signed URLs, Lambda@Edge auth)' },
        { label: 'C', text: 'Usar S3 policy apenas' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Behaviors permitem configuração por path. /private/* pode exigir auth enquanto /* é público.',
      relatedService: 'cloudfront'
    },
    {
      id: 88,
      topic: 'cloudfront',
      question: 'Qual é a latência típica de cache hit?',
      context: 'Performance.',
      options: [
        { label: 'A', text: '500ms' },
        { label: 'B', text: '10-50ms dependendo da proximidade da edge location' },
        { label: 'C', text: '1s' },
        { label: 'D', text: 'Igual ao origin' }
      ],
      correctAnswer: 'B',
      explanation: 'Cache hit servido da edge location mais próxima. Latência muito menor que ir ao origin.',
      relatedService: 'cloudfront'
    },
    {
      id: 89,
      topic: 'cloudfront',
      question: 'Como monitorar real-time usage?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Apenas logs diários' },
        { label: 'B', text: 'CloudWatch Real-time Metrics ou Real-time Logs para Kinesis' },
        { label: 'C', text: 'Ping' },
        { label: 'D', text: 'Console apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch métricas a cada minuto. Real-time Logs permitem streaming para análise imediata.',
      relatedService: 'cloudfront'
    },
    {
      id: 90,
      topic: 'cloudfront',
      question: 'Como estimar custo antes de implementar?',
      context: 'Planejamento.',
      options: [
        { label: 'A', text: 'Implementar e ver' },
        { label: 'B', text: 'Usar AWS Pricing Calculator estimando data transfer, requests por tipo, invalidações' },
        { label: 'C', text: 'Preço fixo' },
        { label: 'D', text: 'Free tier ilimitado' }
      ],
      correctAnswer: 'B',
      explanation: 'Pricing Calculator projeta custo baseado em volume esperado. Free tier: 1TB out, 10M requests/mês.',
      relatedService: 'cloudfront'
    }
  ],
  
  // Questões RDS que estavam incorretamente aqui, removidas para manter estrutura correta
  
  // S3 embedded questions (foram adicionadas anteriormente por engano, mas topic: 's3' as identifica)
  // A seção s3: [] correta está mais abaixo no arquivo
  
  dummy_placeholder_for_structure: [
    {
      id: 63,
      topic: 's3',
      question: 'Como publicar relatórios diários do S3 Inventory para análise por Athena?',
      context: 'Governança de objetos e criptografia.',
      options: [
        { label: 'A', text: 'Habilitar S3 Inventory e apontar saída em formato Parquet para um prefixo; criar tabela no Glue/Athena' },
        { label: 'B', text: 'Ativar CloudTrail Lake' },
        { label: 'C', text: 'Usar somente LIST diário' },
        { label: 'D', text: 'Exportar manualmente pelo console' }
      ],
      correctAnswer: 'A',
      explanation: 'Inventory em Parquet + Glue/Athena oferece consulta eficiente sobre bilhões de objetos.',
      relatedService: 's3'
    },
    {
      id: 3,
      topic: 'rds',
      question: 'Qual recurso reduz tempo de failover para ~35s no RDS?',
      context: 'HA mais rápida.',
      options: [
        { label: 'A', text: 'Single-AZ' },
        { label: 'B', text: 'Multi-AZ com standby' },
        { label: 'C', text: 'Multi-AZ DB Cluster (novo)' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'C',
      explanation: 'Multi-AZ DB Cluster (x2 ou x3 nós) usa storage compartilhado e failover mais rápido (~35s).',
      relatedService: 'rds'
    },
    {
      id: 4,
      topic: 'rds',
      question: 'Qual diferença de propósito entre Multi-AZ e Read Replica?',
      context: 'HA vs escala.',
      options: [
        { label: 'A', text: 'Nenhuma' },
        { label: 'B', text: 'Multi-AZ é HA síncrona; Read Replica é escala de leitura assíncrona' },
        { label: 'C', text: 'Ambos são síncronos' },
        { label: 'D', text: 'Read Replica faz failover automático' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-AZ protege contra falha; Read Replica é para leitura e DR manual.',
      relatedService: 'rds'
    },
    {
      id: 5,
      topic: 'rds',
      question: 'Como reduzir conexões abertas no banco e melhorar utilização?',
      context: 'Muitas conexões curtas.',
      options: [
        { label: 'A', text: 'Aumentar max_connections' },
        { label: 'B', text: 'Usar RDS Proxy para pooling e reuse de conexões' },
        { label: 'C', text: 'Diminuir instância' },
        { label: 'D', text: 'Desativar SSL' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS Proxy mantém pool e reduz overhead de criação de conexões, protegendo o banco.',
      relatedService: 'rds'
    },
    {
      id: 6,
      topic: 'rds',
      question: 'Como autenticar no RDS sem armazenar senha?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Hardcode user/password' },
        { label: 'B', text: 'IAM Database Authentication com tokens temporários' },
        { label: 'C', text: 'Chaves de acesso IAM' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM DB Auth gera token temporário via IAM; evita senha persistente.',
      relatedService: 'rds'
    },
    {
      id: 7,
      topic: 'rds',
      question: 'Qual benefício do Performance Insights?',
      context: 'Tuning.',
      options: [
        { label: 'A', text: 'Substitui backups' },
        { label: 'B', text: 'Mostra waits, carga DB e top SQL para diagnosticar gargalos' },
        { label: 'C', text: 'Cria replicas' },
        { label: 'D', text: 'Criptografa dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Performance Insights coleta métricas profundas de waits/SQL para otimização.',
      relatedService: 'rds'
    },
    {
      id: 8,
      topic: 'rds',
      question: 'Como aplicar parâmetros customizados (ex: max_connections)?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Alterar diretamente no banco' },
        { label: 'B', text: 'Criar DB parameter group e associar à instância' },
        { label: 'C', text: 'Alterar SG' },
        { label: 'D', text: 'Usar CloudTrail' }
      ],
      correctAnswer: 'B',
      explanation: 'Parameter group controla configs do engine; alguns parâmetros exigem reboot.',
      relatedService: 'rds'
    },
    {
      id: 9,
      topic: 'rds',
      question: 'Para habilitar TDE no SQL Server RDS, qual recurso usar?',
      context: 'Criptografia.',
      options: [
        { label: 'A', text: 'Option Group com TDE' },
        { label: 'B', text: 'Parameter group' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'A',
      explanation: 'Features como TDE/SQLSERVER_AGENT exigem option group apropriado.',
      relatedService: 'rds'
    },
    {
      id: 10,
      topic: 'rds',
      question: 'Como aumentar storage automaticamente sem downtime?',
      context: 'Crescimento imprevisível.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Habilitar Storage Auto Scaling no RDS' },
        { label: 'C', text: 'Reduzir IOPS' },
        { label: 'D', text: 'Trocar engine' }
      ],
      correctAnswer: 'B',
      explanation: 'Storage Auto Scaling expande storage quando atinge thresholds, sem interrupção.',
      relatedService: 'rds'
    },
    {
      id: 11,
      topic: 'rds',
      question: 'Como fazer migração rápida sem downtime longo?',
      context: 'Troca de versão.',
      options: [
        { label: 'A', text: 'Upgrade direto em produção' },
        { label: 'B', text: 'Usar RDS Blue/Green Deployments para swap de endpoint' },
        { label: 'C', text: 'Criar snapshot manual' },
        { label: 'D', text: 'Exportar CSV' }
      ],
      correctAnswer: 'B',
      explanation: 'Blue/Green cria ambiente paralelo replicado e troca endpoints quase sem downtime.',
      relatedService: 'rds'
    },
    {
      id: 12,
      topic: 'rds',
      question: 'Como restaurar para um ponto no tempo?',
      context: 'Erro lógico.',
      options: [
        { label: 'A', text: 'Usar apenas snapshots manuais' },
        { label: 'B', text: 'Point-In-Time Recovery (PITR) usando backups automáticos + binlogs' },
        { label: 'C', text: 'Multi-AZ' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'B',
      explanation: 'Backups automáticos + logs permitem restaurar a um timestamp recente (até retenção).',
      relatedService: 'rds'
    },
    {
      id: 13,
      topic: 'rds',
      question: 'Qual limite de retenção de backups automáticos?',
      context: 'Política.',
      options: [
        { label: 'A', text: '1-7 dias' },
        { label: 'B', text: '1-35 dias' },
        { label: 'C', text: 'Até 1 ano' },
        { label: 'D', text: 'Sem limite' }
      ],
      correctAnswer: 'B',
      explanation: 'Retenção configurável entre 1 e 35 dias.',
      relatedService: 'rds'
    },
    {
      id: 14,
      topic: 'rds',
      question: 'Como fazer backup fora da região?',
      context: 'DR.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Copiar snapshot manual para outra região ou habilitar cross-region automated backups (MySQL/Postgres)' },
        { label: 'C', text: 'Usar S3 Transfer' },
        { label: 'D', text: 'Usar SG' }
      ],
      correctAnswer: 'B',
      explanation: 'Snapshots podem ser copiados; alguns engines suportam backups automáticos cross-region.',
      relatedService: 'rds'
    },
    {
      id: 15,
      topic: 'rds',
      question: 'Qual storage escolher para workloads gerais?',
      context: 'Custo/performance.',
      options: [
        { label: 'A', text: 'Magnetic' },
        { label: 'B', text: 'gp3 (ou gp2) é padrão para equilíbrio custo/performance' },
        { label: 'C', text: 'io1 sempre' },
        { label: 'D', text: 'Cold storage' }
      ],
      correctAnswer: 'B',
      explanation: 'gp3/gp2 são SSD balanceados; io1/io2 para IOPS altos, magnetic legado.',
      relatedService: 'rds'
    },
    {
      id: 16,
      topic: 'rds',
      question: 'Quando escolher io1/io2?',
      context: 'IOPS consistente.',
      options: [
        { label: 'A', text: 'Sempre' },
        { label: 'B', text: 'Quando precisa IOPS provisionado e latência previsível (OLTP pesado)' },
        { label: 'C', text: 'Para dev barato' },
        { label: 'D', text: 'Para backups' }
      ],
      correctAnswer: 'B',
      explanation: 'io1/io2 fornece IOPS dedicados; útil para cargas intensivas.',
      relatedService: 'rds'
    },
    {
      id: 17,
      topic: 'rds',
      question: 'Como limitar exposição pública do RDS?',
      context: 'Segurança de rede.',
      options: [
        { label: 'A', text: 'Publicar na internet' },
        { label: 'B', text: 'Colocar em subnets privadas, SG restritivo e sem IP público' },
        { label: 'C', text: 'Usar NACL apenas' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS deve ficar em subnet privada acessível somente via SG/VPC endpoints ou bastion.',
      relatedService: 'rds'
    },
    {
      id: 18,
      topic: 'rds',
      question: 'Como reduzir downtime ao aplicar patches?',
      context: 'Janela de manutenção.',
      options: [
        { label: 'A', text: 'Qualquer horário' },
        { label: 'B', text: 'Definir maintenance window fora do horário crítico; Multi-AZ minimiza impacto' },
        { label: 'C', text: 'Desligar backups' },
        { label: 'D', text: 'Usar S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Escolha janela controlada e use Multi-AZ para failover durante patch.',
      relatedService: 'rds'
    },
    {
      id: 19,
      topic: 'rds',
      question: 'Como forçar SSL/TLS para conexões?',
      context: 'Criptografia em trânsito.',
      options: [
        { label: 'A', text: 'Security Group' },
        { label: 'B', text: 'Parametrizar require_ssl (MySQL) ou rds.force_ssl (Postgres) no parameter group' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Usar KMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Force SSL via parâmetro do engine e certificado RDS CA.',
      relatedService: 'rds'
    },
    {
      id: 20,
      topic: 'rds',
      question: 'Como rotacionar credenciais automaticamente?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Hardcode senha' },
        { label: 'B', text: 'AWS Secrets Manager com rotation integrada para RDS' },
        { label: 'C', text: 'Planilhas' },
        { label: 'D', text: 'Email' }
      ],
      correctAnswer: 'B',
      explanation: 'Secrets Manager suporta rotação nativa para engines RDS.',
      relatedService: 'rds'
    },
    {
      id: 64,
      topic: 's3',
      question: 'Como garantir isolamento de tráfego entre workloads que compartilham um mesmo bucket?',
      context: 'Segurança por VPC.',
      options: [
        { label: 'A', text: 'Criar Access Points separados por VPC e aplicar políticas distintas' },
        { label: 'B', text: 'Usar somente IAM users' },
        { label: 'C', text: 'Ativar FTP' },
        { label: 'D', text: 'Criar ACL public-read para todos' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Points por VPC permitem políticas com aws:SourceVpc/SourceVpce por consumidor.',
      relatedService: 's3'
    },
    {
      id: 65,
      topic: 's3',
      question: 'Qual a melhor forma de validar integridade de objetos grandes após upload?',
      context: 'Detecção de corrupção.',
      options: [
        { label: 'A', text: 'Comparar hash calculado pelo cliente com metadados/ETag (com cautela em multipart)' },
        { label: 'B', text: 'Confiar apenas no HTTP 200' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Ativar FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Para uploads únicos, o ETag normalmente é MD5; em multipart, gerencie hash composto ou guarde hash próprio.',
      relatedService: 's3'
    },
    {
      id: 66,
      topic: 's3',
      question: 'Como proteger chaves de API embutidas em objetos públicos servidos por CloudFront?',
      context: 'Conteúdo estático com segredos acidentais.',
      options: [
        { label: 'A', text: 'Evitar embutir segredos; usar variáveis/headers dinâmicos no backend' },
        { label: 'B', text: 'Usar ACL private apenas' },
        { label: 'C', text: 'Ativar Transfer Acceleration' },
        { label: 'D', text: 'Habilitar website hosting' }
      ],
      correctAnswer: 'A',
      explanation: 'Segredos não devem ir a artefatos estáticos. Use variáveis em build-time sem segredos ou headers gerados no backend.',
      relatedService: 's3'
    },
    {
      id: 67,
      topic: 's3',
      question: 'Como mitigar hot partitions em padrões de chaveamento previsíveis (ex.: timestamps)?',
      context: 'Lotes com prefixos sequenciais.',
      options: [
        { label: 'A', text: 'Pré-embaralhar prefixos (hash/prefix random) no nome do objeto' },
        { label: 'B', text: 'Criar 1 bucket por minuto' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Migrar para EFS' }
      ],
      correctAnswer: 'A',
      explanation: 'Chaves distribuídas evitam concentração de tráfego em poucos prefixos e maximizam paralelismo.',
      relatedService: 's3'
    },
    {
      id: 68,
      topic: 's3',
      question: 'Como expor objetos para download temporário somente a clientes autenticados?',
      context: 'Acesso controlado a conteúdo premium.',
      options: [
        { label: 'A', text: 'Gerar presigned URLs por usuário com expiração curta' },
        { label: 'B', text: 'Tornar o bucket público' },
        { label: 'C', text: 'Compartilhar a key KMS' },
        { label: 'D', text: 'Usar ACL public-read' }
      ],
      correctAnswer: 'A',
      explanation: 'URL assinada com TTL pequeno limita janela de acesso por usuário autenticado.',
      relatedService: 's3'
    },
    {
      id: 69,
      topic: 's3',
      question: 'Como aplicar política de retenção legal (legal hold) sem alterar a retenção global?',
      context: 'Caso específico em investigação.',
      options: [
        { label: 'A', text: 'S3 Object Lock com legal hold em objetos específicos' },
        { label: 'B', text: 'Versioning apenas' },
        { label: 'C', text: 'ACL read' },
        { label: 'D', text: 'CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'Legal hold bloqueia alterações sem mudar a política de retenção do bucket como um todo.',
      relatedService: 's3'
    },
    {
      id: 70,
      topic: 's3',
      question: 'Como reduzir tempo de indexação por serviços downstream após grandes cargas de upload?',
      context: 'Backfill massivo.',
      options: [
        { label: 'A', text: 'Publicar um manifesto e processar em paralelo via SQS' },
        { label: 'B', text: 'Aumentar TTL do DNS' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Mover para RDS' }
      ],
      correctAnswer: 'A',
      explanation: 'Um manifesto (lista de objetos) permite particionar trabalho e controlar paralelismo com filas.',
      relatedService: 's3'
    },
    {
      id: 71,
      topic: 's3',
      question: 'Como permitir que um job EMR leia dados do S3 de forma consistente e econômica?',
      context: 'Analytics sobre data lake.',
      options: [
        { label: 'A', text: 'Formato columnar (Parquet), partições por data e uso de S3 Select quando aplicável' },
        { label: 'B', text: 'CSV sem partição' },
        { label: 'C', text: 'JSON sem compressão' },
        { label: 'D', text: 'FTP com compressão' }
      ],
      correctAnswer: 'A',
      explanation: 'Parquet reduz I/O e custo. Particionar por data amplia eficiência de scans.',
      relatedService: 's3'
    },
    {
      id: 72,
      topic: 's3',
      question: 'Como isolar cargas de download do tráfego de upload sem criar múltiplos buckets?',
      context: 'Políticas distintas por direção.',
      options: [
        { label: 'A', text: 'Criar Access Points distintos com políticas adequadas' },
        { label: 'B', text: 'Usar apenas IAM users' },
        { label: 'C', text: 'ACL públicas' },
        { label: 'D', text: 'Habilitar website hosting' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Points permitem políticas separadas para produtores e consumidores de dados.',
      relatedService: 's3'
    },
    {
      id: 73,
      topic: 's3',
      question: 'Qual prática reduz latência de first-byte para objetos grandes através do CloudFront?',
      context: 'Downloads globais de mídia.',
      options: [
        { label: 'A', text: 'Pré-aquecer (pre-warm) cache com Invalidation + Lambda@Edge/Jobs' },
        { label: 'B', text: 'Subir para Deep Archive' },
        { label: 'C', text: 'Desabilitar HTTPS' },
        { label: 'D', text: 'Ativar FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Pre-warm reduz cache miss inicial em lançamentos grandes/virais.',
      relatedService: 's3'
    },
    {
      id: 74,
      topic: 's3',
      question: 'Como garantir que eventos de remoção (DELETE) não apaguem dados críticos no destino replicado?',
      context: 'Proteção contra exclusão acidental.',
      options: [
        { label: 'A', text: 'Configurar replicação para não replicar delete markers e habilitar Object Lock no destino' },
        { label: 'B', text: 'Permitir todos deletes' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Migrar para EBS' }
      ],
      correctAnswer: 'A',
      explanation: 'Ignorar deletes na replicação evita apagar acidentalmente o destino; Object Lock agrega WORM.',
      relatedService: 's3'
    },
    {
      id: 75,
      topic: 's3',
      question: 'Qual mecanismo permite versionar e reter esquemas de dados junto com arquivos?',
      context: 'Compatibilidade evolutiva.',
      options: [
        { label: 'A', text: 'Guardar manifestos e schemas (ex.: Avro/Parquet) no mesmo prefixo com versioning' },
        { label: 'B', text: 'Somente CSV' },
        { label: 'C', text: 'ACL public-read' },
        { label: 'D', text: 'Desabilitar versioning' }
      ],
      correctAnswer: 'A',
      explanation: 'Esquemas versionados e manifestos controlam evolução e reproducibilidade de pipelines.',
      relatedService: 's3'
    },
    {
      id: 76,
      topic: 's3',
      question: 'Como minimizar custo de “request charges” para analytics em múltiplos jobs concorrentes?',
      context: 'Vários consumidores lendo o mesmo dataset.',
      options: [
        { label: 'A', text: 'CloudFront na frente do S3 para cache de GETs quentes' },
        { label: 'B', text: 'LIST em loop' },
        { label: 'C', text: 'ACL pública' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Cache intermediário reduz GETs no S3 e custo quando há padrão de leitura repetida.',
      relatedService: 's3'
    },
    {
      id: 77,
      topic: 's3',
      question: 'Qual prática simplifica GDPR/LPD para remoção de dados por usuário?',
      context: 'Right-to-be-forgotten.',
      options: [
        { label: 'A', text: 'Key naming por usuário e tags para localização rápida + lifecycle/expiração' },
        { label: 'B', text: 'Guardar tudo sem metadados' },
        { label: 'C', text: 'Compactar sem índice' },
        { label: 'D', text: 'Transfer Acceleration' }
      ],
      correctAnswer: 'A',
      explanation: 'Naming/tagging por usuário facilita identificar e operar sobre os dados daquele sujeito.',
      relatedService: 's3'
    },
    {
      id: 78,
      topic: 's3',
      question: 'Como lidar com objetos mutáveis (overwrite) em pipelines que esperam imutabilidade?',
      context: 'Dados reprocessados com correções.',
      options: [
        { label: 'A', text: 'Usar versioning e apontar consumidores para versões específicas' },
        { label: 'B', text: 'Desligar versioning' },
        { label: 'C', text: 'ACLs' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Versioning preserva histórico e permite reproduzir jobs com referências imutáveis (versionId).',
      relatedService: 's3'
    },
    {
      id: 79,
      topic: 's3',
      question: 'Como evitar vazamento de dados sensíveis em logs de acesso?',
      context: 'PII em URLs e headers.',
      options: [
        { label: 'A', text: 'Não incluir PII em nomes de objetos/paths; usar Object Lambda para mascarar quando necessário' },
        { label: 'B', text: 'Publicar logs publicamente' },
        { label: 'C', text: 'Desabilitar HTTPS' },
        { label: 'D', text: 'Usar ACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'Evite PII em chaves/URLs. Para respostas, use transformações em Object Lambda ou backend.',
      relatedService: 's3'
    },
    {
      id: 80,
      topic: 's3',
      question: 'Como tornar o acesso a objetos auditável por identidade e origem?',
      context: 'Requisitos SOX/PCI.',
      options: [
        { label: 'A', text: 'CloudTrail data events + condição aws:PrincipalOrgID e aws:SourceIp/SourceVpce' },
        { label: 'B', text: 'Somente Server Access Logs' },
        { label: 'C', text: 'ACL pública' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Data events mostram quem acessou o quê; políticas condicionais restringem origem e organização.',
      relatedService: 's3'
    },
    {
      id: 81,
      topic: 's3',
      question: 'Como reduzir custo de pequenas leituras repetidas por API gateway/edge?',
      context: 'Catálogos e JSONs populares.',
      options: [
        { label: 'A', text: 'CloudFront com cache por headers/query e invalidações seletivas' },
        { label: 'B', text: 'Migrar para DynamoDB sempre' },
        { label: 'C', text: 'Desligar HTTPS' },
        { label: 'D', text: 'Usar ACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'Edge cache reduz GETs no S3 e latência percebida.',
      relatedService: 's3'
    },
    {
      id: 82,
      topic: 's3',
      question: 'Como permitir upload de clientes web diretamente ao S3 com validações de tipo/tamanho?',
      context: 'Upload controlado no browser.',
      options: [
        { label: 'A', text: 'Usar presigned POST com condições de policy (content-type, tamanho máximo)' },
        { label: 'B', text: 'Usar PUT sem restrições' },
        { label: 'C', text: 'ACL pública' },
        { label: 'D', text: 'Ativar FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Presigned POST inclui condições no formulário, rejeitando uploads fora do contrato.',
      relatedService: 's3'
    },
    {
      id: 83,
      topic: 's3',
      question: 'Como garantir que dados críticos sejam replicados entre regiões com SLA?',
      context: 'Requisitos de continuidade.',
      options: [
        { label: 'A', text: 'CRR com S3 Replication Time Control (RTC)' },
        { label: 'B', text: 'Somente Deep Archive' },
        { label: 'C', text: 'Interface Endpoint' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'RTC oferece SLA de replicação e métricas, adequado para RPO agressivo.',
      relatedService: 's3'
    },
    {
      id: 84,
      topic: 's3',
      question: 'Como tratar headers e metadata customizados ao servir via CloudFront?',
      context: 'Cache por variações.',
      options: [
        { label: 'A', text: 'Incluir headers relevantes na cache key e forward seletivo' },
        { label: 'B', text: 'Ignorar todos headers' },
        { label: 'C', text: 'Desabilitar cache' },
        { label: 'D', text: 'Usar ACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'Cache keys customizadas evitam servir conteúdo incorreto entre variações de header.',
      relatedService: 's3'
    },
    {
      id: 85,
      topic: 's3',
      question: 'Como disponibilizar dados para contas externas com faturamento de requests pelo consumidor?',
      context: 'Custos repassados ao leitor.',
      options: [
        { label: 'A', text: 'Ativar Requester Pays no bucket' },
        { label: 'B', text: 'Tornar público' },
        { label: 'C', text: 'Interface Endpoint' },
        { label: 'D', text: 'ACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'Requester Pays cobra requests e data transfer do lado do consumidor.',
      relatedService: 's3'
    },
    {
      id: 86,
      topic: 's3',
      question: 'Como controlar acesso a um subconjunto de objetos por tags de recurso?',
      context: 'Governança por projeto.',
      options: [
        { label: 'A', text: 'Políticas com Conditions s3:ExistingObjectTag/s3:RequestObjectTag' },
        { label: 'B', text: 'Somente IAM users' },
        { label: 'C', text: 'ACL public-read' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Conditions baseadas em tags permitem restringir por projeto/ambiente/owner.',
      relatedService: 's3'
    },
    {
      id: 87,
      topic: 's3',
      question: 'Como compartilhar dados com latência muito baixa para aplicações on-premises em múltiplas localidades?',
      context: 'Caches locais.',
      options: [
        { label: 'A', text: 'Usar AWS Storage Gateway (File Gateway) como cache para S3' },
        { label: 'B', text: 'Somente CloudFront' },
        { label: 'C', text: 'Glacier Deep Archive' },
        { label: 'D', text: 'ACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'File Gateway expõe NFS/SMB local com cache de objetos S3 para ambientes on-premises.',
      relatedService: 's3'
    },
    {
      id: 88,
      topic: 's3',
      question: 'Como publicar catálogos estáticos multilíngue com invalidação seletiva por idioma?',
      context: 'SEO e mudanças frequentes.',
      options: [
        { label: 'A', text: 'Estruturar prefixos por locale (pt-BR/, en-US/) e invalidar por path' },
        { label: 'B', text: 'Um único arquivo monolíngue' },
        { label: 'C', text: 'Desativar cache' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Organização por locale facilita invalidação e cache por região/idioma.',
      relatedService: 's3'
    },
    {
      id: 89,
      topic: 's3',
      question: 'Como reduzir custo de egress entre regiões para consumidores multi-region?',
      context: 'Downloads de grandes objetos.',
      options: [
        { label: 'A', text: 'Replicar dados e servir pela região mais próxima via CloudFront multi-origin' },
        { label: 'B', text: 'Sempre baixar de us-east-1' },
        { label: 'C', text: 'ACL pública' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Replica e usa origem regional mais próxima, reduzindo egress inter-região e latência.',
      relatedService: 's3'
    },
    {
      id: 90,
      topic: 's3',
      question: 'Como garantir que apenas clientes com TLS moderno possam baixar objetos?',
      context: 'Compliance com versões mínimas de TLS.',
      options: [
        { label: 'A', text: 'Servir via CloudFront e forçar Security Policy com TLS 1.2+' },
        { label: 'B', text: 'Desligar HTTPS' },
        { label: 'C', text: 'ACL pública' },
        { label: 'D', text: 'Interface Endpoint' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudFront permite impor versões mínimas de TLS e ciphers de acordo com compliance.',
      relatedService: 's3'
    },
    {
      id: 3,
      topic: 'vpc',
      question: 'Qual a diferença principal entre Security Groups e NACLs?',
      context: 'Defesa em camadas na VPC.',
      options: [
        { label: 'A', text: 'SG são stateful; NACLs são stateless' },
        { label: 'B', text: 'Ambos são stateless' },
        { label: 'C', text: 'SG são por subnet; NACL por instância' },
        { label: 'D', text: 'NACLs aplicam a ENIs, SG a subnets' }
      ],
      correctAnswer: 'A',
      explanation: 'Security Groups são stateful (respostas são permitidas automaticamente). NACLs são stateless (precisam de regras de ida e volta). SGs aplicam a interfaces (ENI); NACLs aplicam a subnets.',
      relatedService: 'vpc'
    },
    {
      id: 4,
      topic: 'vpc',
      question: 'Para acessar a internet, uma instância em subnet pública precisa de quais requisitos?',
      context: 'Public IP vs IGW.',
      options: [
        { label: 'A', text: 'Internet Gateway na VPC, rota 0.0.0.0/0 na route table e IP público/Elastic IP' },
        { label: 'B', text: 'Apenas Internet Gateway' },
        { label: 'C', text: 'Apenas IP privado' },
        { label: 'D', text: 'Somente um NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnet pública requer IGW + rota default + endereço público associado à ENI para tráfego externo.',
      relatedService: 'vpc'
    },
    {
      id: 5,
      topic: 'vpc',
      question: 'Como permitir acesso OUTBOUND à internet a partir de subnets privadas?',
      context: 'Servidores baixando updates.',
      options: [
        { label: 'A', text: 'Rota 0.0.0.0/0 para NAT Gateway em subnet pública' },
        { label: 'B', text: 'Atribuir Elastic IP às instâncias privadas' },
        { label: 'C', text: 'Criar VPC Peering com a internet' },
        { label: 'D', text: 'Associar IGW diretamente à subnet privada' }
      ],
      correctAnswer: 'A',
      explanation: 'NAT Gateway fica em subnet pública e permite apenas conexões iniciadas internamente. Instâncias privadas não têm IP público.',
      relatedService: 'vpc'
    },
    {
      id: 6,
      topic: 'vpc',
      question: 'Qual recurso conecta VPCs entre contas/regiões com alta escala e roteamento centralizado?',
      context: 'Malha de redes em estrela.',
      options: [
        { label: 'A', text: 'AWS Transit Gateway' },
        { label: 'B', text: 'VPC Peering' },
        { label: 'C', text: 'Site-to-Site VPN' },
        { label: 'D', text: 'Direct Connect gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Transit Gateway consolida roteamento entre múltiplas VPCs e on-premises. VPC Peering é ponto a ponto e não suporta transitive routing.',
      relatedService: 'vpc'
    },
    {
      id: 7,
      topic: 'vpc',
      question: 'Qual afirmação é correta sobre VPC Peering?',
      context: 'Limitações e uso.',
      options: [
        { label: 'A', text: 'Não há roteamento transitivo através do peering' },
        { label: 'B', text: 'Suporta NAT interno automático' },
        { label: 'C', text: 'Requer IGW em ambas VPCs' },
        { label: 'D', text: 'Permite sobreposição de CIDR por padrão' }
      ],
      correctAnswer: 'A',
      explanation: 'Peering é ponto a ponto e não encaminha tráfego para terceiros. Não suporta CIDR sobreposto e não fornece NAT automático.',
      relatedService: 'vpc'
    },
    {
      id: 8,
      topic: 'vpc',
      question: 'Quando usar Gateway VPC Endpoint vs Interface VPC Endpoint?',
      context: 'Acesso privado a serviços AWS.',
      options: [
        { label: 'A', text: 'Gateway para S3/DynamoDB; Interface (PrivateLink) para a maioria dos demais serviços' },
        { label: 'B', text: 'Interface apenas para S3' },
        { label: 'C', text: 'Gateway suporta todos os serviços' },
        { label: 'D', text: 'Interface não funciona com Security Groups' }
      ],
      correctAnswer: 'A',
      explanation: 'S3/DynamoDB usam endpoints de gateway (rota). Serviços restantes usam endpoints de interface (ENI com SG).',
      relatedService: 'vpc'
    },
    {
      id: 9,
      topic: 'vpc',
      question: 'Qual a função do egress-only internet gateway?',
      context: 'IPv6 em subnets privadas.',
      options: [
        { label: 'A', text: 'Permitir apenas tráfego OUTBOUND IPv6, bloqueando inbound da internet' },
        { label: 'B', text: 'Traduzir IPv4 para IPv6' },
        { label: 'C', text: 'Fornecer NAT64' },
        { label: 'D', text: 'Exigir IPs públicos IPv4' }
      ],
      correctAnswer: 'A',
      explanation: 'Em IPv6, todos os endereços são públicos; egress-only gateway permite apenas saídas, semelhante ao NAT para IPv4.',
      relatedService: 'vpc'
    },
    {
      id: 10,
      topic: 'vpc',
      question: 'Onde você associa uma route table?',
      context: 'Alcance das rotas.',
      options: [
        { label: 'A', text: 'À Subnet (associação explícita ou main)' },
        { label: 'B', text: 'Ao Security Group' },
        { label: 'C', text: 'Ao Internet Gateway' },
        { label: 'D', text: 'À ENI' }
      ],
      correctAnswer: 'A',
      explanation: 'Route tables são associadas a subnets; SGs e IGWs não têm route tables próprias.',
      relatedService: 'vpc'
    },
    {
      id: 11,
      topic: 'vpc',
      question: 'Quantos IPs a AWS reserva por subnet e por quê?',
      context: 'Planejamento de endereços.',
      options: [
        { label: 'A', text: '5 IPs por subnet para rede, roteador, DNS e uso futuro' },
        { label: 'B', text: '2 IPs por VPC' },
        { label: 'C', text: 'Nenhum, todos utilizáveis' },
        { label: 'D', text: '10 IPs por AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'AWS reserva .0, .1, .2, .3 e .255 em cada subnet IPv4. Em IPv6 a reserva é diferente.',
      relatedService: 'vpc'
    },
    {
      id: 12,
      topic: 'vpc',
      question: 'Como dividir uma VPC 10.0.0.0/16 em 6 subnets privadas e 2 públicas em 2 AZs?',
      context: 'CIDR, /20 ou /21.',
      options: [
        { label: 'A', text: 'Usar /20 por subnet (4096 IPs) e distribuir 4 privadas + 1 pública por AZ' },
        { label: 'B', text: 'Usar /24 por subnet (256 IPs) sem considerar reserva' },
        { label: 'C', text: 'Usar /30 como em roteamento WAN' },
        { label: 'D', text: 'Usar /8 para todas' }
      ],
      correctAnswer: 'A',
      explanation: 'Tamanho exato depende da demanda; /20 é comum para capacidade. O importante é usar blocos não sobrepostos por AZ e reservar espaço para crescimento.',
      relatedService: 'vpc'
    },
    {
      id: 13,
      topic: 'vpc',
      question: 'Qual é o efeito de uma regra DENY em NACL?',
      context: 'Ordem de avaliação.',
      options: [
        { label: 'A', text: 'Regras são avaliadas por número; primeira que coincidir vence, inclusive DENY' },
        { label: 'B', text: 'Deny é ignorado' },
        { label: 'C', text: 'Apenas allow funciona' },
        { label: 'D', text: 'NACLs são stateful, logo deny não aplica' }
      ],
      correctAnswer: 'A',
      explanation: 'NACLs são stateless e processam regras por ordem numérica; a primeira correspondência (allow/deny) encerra avaliação.',
      relatedService: 'vpc'
    },
    {
      id: 14,
      topic: 'vpc',
      question: 'Como expor um serviço rodando em uma VPC para clientes em outra conta sem abrir internet?',
      context: 'Consumo privado.',
      options: [
        { label: 'A', text: 'AWS PrivateLink (Interface VPC Endpoint Service)' },
        { label: 'B', text: 'VPC Peering e IGW' },
        { label: 'C', text: 'NAT Gateway compartilhado' },
        { label: 'D', text: 'Transit Gateway com rota pública' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink expõe o serviço via endpoints de interface nas VPCs clientes, sem roteamento L3 entre VPCs e sem internet.',
      relatedService: 'vpc'
    },
    {
      id: 15,
      topic: 'vpc',
      question: 'Como habilitar resolução de nomes internos e públicos dentro da VPC?',
      context: 'DNS em VPC.',
      options: [
        { label: 'A', text: 'Ativar DNS Hostnames e DNS Resolution na VPC' },
        { label: 'B', text: 'Criar rota para 8.8.8.8' },
        { label: 'C', text: 'Ativar apenas DNS Hostnames' },
        { label: 'D', text: 'Desabilitar DHCP options set' }
      ],
      correctAnswer: 'A',
      explanation: 'Ambas flags devem estar ativas para nomes resolverem (públicos e privados via Route 53 Resolver).',
      relatedService: 'vpc'
    },
    {
      id: 16,
      topic: 'vpc',
      question: 'Qual solução para conectar on-premises à VPC com baixa latência e alta banda?',
      context: 'Integração híbrida.',
      options: [
        { label: 'A', text: 'AWS Direct Connect (opcionalmente via Direct Connect Gateway)' },
        { label: 'B', text: 'NAT Gateway' },
        { label: 'C', text: 'Egress-only gateway' },
        { label: 'D', text: 'Internet Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Direct Connect fornece link dedicado de baixa latência; pode integrar múltiplas VPCs via DX Gateway.',
      relatedService: 'vpc'
    },
    {
      id: 17,
      topic: 'vpc',
      question: 'Como capturar metadados de tráfego na VPC para auditoria?',
      context: 'Observabilidade de rede.',
      options: [
        { label: 'A', text: 'VPC Flow Logs para CloudWatch Logs ou S3' },
        { label: 'B', text: 'WAF' },
        { label: 'C', text: 'Inspector' },
        { label: 'D', text: 'Config' }
      ],
      correctAnswer: 'A',
      explanation: 'Flow Logs registram aceitos/negados por ENI/subnet/VPC; útil para auditoria e troubleshooting de conectividade.',
      relatedService: 'vpc'
    },
    {
      id: 18,
      topic: 'vpc',
      question: 'Como publicar serviços internos usando DNS privado?',
      context: 'Domínios *.corp.local na VPC.',
      options: [
        { label: 'A', text: 'Route 53 Private Hosted Zone associada à(s) VPC(s)' },
        { label: 'B', text: 'Hosted Zone pública' },
        { label: 'C', text: 'DNS do IGW' },
        { label: 'D', text: 'Resolver Inbound endpoint somente' }
      ],
      correctAnswer: 'A',
      explanation: 'Private Hosted Zone resolve nomes apenas dentro das VPCs associadas, sem exposição pública.',
      relatedService: 'vpc'
    },
    {
      id: 19,
      topic: 'vpc',
      question: 'O que ocorre se você associar duas route tables à mesma subnet?',
      context: 'Escopo de associação.',
      options: [
        { label: 'A', text: 'Não é possível; uma subnet tem no máximo uma route table associada (exceto main por padrão)' },
        { label: 'B', text: 'As rotas combinam' },
        { label: 'C', text: 'A mais específica vence' },
        { label: 'D', text: 'A de menor ID vence' }
      ],
      correctAnswer: 'A',
      explanation: 'A associação é 1:1. Você pode trocar a associação, mas não combinar múltiplas route tables numa subnet.',
      relatedService: 'vpc'
    },
    {
      id: 20,
      topic: 'vpc',
      question: 'Como permitir acesso a um serviço exposto via PrivateLink (endpoint service) em outra conta?',
      context: 'Produtor-consumidor privado.',
      options: [
        { label: 'A', text: 'O provedor aprova conexões e o consumidor cria Interface Endpoint apontando para o serviço' },
        { label: 'B', text: 'Criar peering com IGW' },
        { label: 'C', text: 'Usar NAT Gateway bidirecional' },
        { label: 'D', text: 'Habilitar transitive routing' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink exige aprovação do provedor e cria ENIs no consumidor; não há roteamento entre VPCs.',
      relatedService: 'vpc'
    },
    {
      id: 21,
      topic: 'vpc',
      question: 'Como diagnosticar perda de conectividade para uma porta específica entre duas instâncias?',
      context: 'Bloqueio em rede.',
      options: [
        { label: 'A', text: 'Verificar SGs de origem/destino, NACLs e rotas das subnets' },
        { label: 'B', text: 'Apenas reiniciar as instâncias' },
        { label: 'C', text: 'Remover todas as regras' },
        { label: 'D', text: 'Criar IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Bloqueio pode estar em SG (stateful), NACL (stateless) ou rotas; analisar todos níveis é a abordagem correta.',
      relatedService: 'vpc'
    },
    {
      id: 22,
      topic: 'vpc',
      question: 'Qual declaração sobre subnets isoladas é correta?',
      context: 'Sem internet nem NAT.',
      options: [
        { label: 'A', text: 'Não possuem rota para IGW nem para NAT; comunicação só dentro da VPC/VPN/DX' },
        { label: 'B', text: 'Precisam de Elastic IP' },
        { label: 'C', text: 'São obrigatoriamente privadas IPv6' },
        { label: 'D', text: 'Têm acesso público limitado' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnets isoladas não têm rota para internet. Acesso externo só via peering, TGW, VPN ou DX.',
      relatedService: 'vpc'
    },
    {
      id: 23,
      topic: 'vpc',
      question: 'Como compartilhar uma VPC entre múltiplas contas para hospedar workloads por time?',
      context: 'Modelo hub-and-spoke controlado.',
      options: [
        { label: 'A', text: 'AWS Resource Access Manager (RAM) com VPC compartilhada' },
        { label: 'B', text: 'Criar IGW dedicados' },
        { label: 'C', text: 'Usar apenas peering' },
        { label: 'D', text: 'Criar EC2 NATs' }
      ],
      correctAnswer: 'A',
      explanation: 'VPC sharing via RAM permite subnets compartilhadas com contas participantes, mantendo governança central.',
      relatedService: 'vpc'
    },
    {
      id: 24,
      topic: 'vpc',
      question: 'Como isolar duas aplicações na mesma VPC usando controles de rede?',
      context: 'Separação L3/L4.',
      options: [
        { label: 'A', text: 'Subnets distintas + SGs e NACLs adequados' },
        { label: 'B', text: 'Mesma subnet e SG aberto' },
        { label: 'C', text: 'Apenas route tables' },
        { label: 'D', text: 'Apenas DHCP options set' }
      ],
      correctAnswer: 'A',
      explanation: 'Separar por subnet e aplicar SG/NACL restringe tráfego entre componentes; rotas controlam alcance.',
      relatedService: 'vpc'
    },
    {
      id: 25,
      topic: 'vpc',
      question: 'Qual serviço provê inspeção L7 e proteção web antes de chegar nos serviços da VPC?',
      context: 'Mitigar ataques e filtrar requisições.',
      options: [
        { label: 'A', text: 'AWS WAF integrado a ALB/CloudFront' },
        { label: 'B', text: 'NACL' },
        { label: 'C', text: 'DHCP options' },
        { label: 'D', text: 'Flow Logs' }
      ],
      correctAnswer: 'A',
      explanation: 'WAF opera em L7 e integra a ALB/API GW/CloudFront; NACL é L3/L4 stateless.',
      relatedService: 'vpc'
    },
    {
      id: 26,
      topic: 'vpc',
      question: 'Qual prática evita sobreposição de CIDRs em ambientes multi-conta?',
      context: 'Planejamento de IPs.',
      options: [
        { label: 'A', text: 'Estratégia central de IPAM (AWS VPC IP Address Manager)' },
        { label: 'B', text: 'Escolha livre por time' },
        { label: 'C', text: 'Sempre usar 10.0.0.0/8' },
        { label: 'D', text: 'Desativar IPv6' }
      ],
      correctAnswer: 'A',
      explanation: 'O IPAM gerencia bloco CIDR e evita conflitos entre contas/regiões/times.',
      relatedService: 'vpc'
    },
    {
      id: 27,
      topic: 'vpc',
      question: 'Como dar saída à internet para cargas IPv6-only sem liberar inbound?',
      context: 'Sem NAT64.',
      options: [
        { label: 'A', text: 'Egress-only Internet Gateway com rota ::/0' },
        { label: 'B', text: 'NAT Gateway IPv6' },
        { label: 'C', text: 'Assign Elastic IP' },
        { label: 'D', text: 'VPN' }
      ],
      correctAnswer: 'A',
      explanation: 'Egress-only IGW permite somente conexões de saída em IPv6. Não existe NAT64 gerenciado pelo VPC.',
      relatedService: 'vpc'
    },
    {
      id: 28,
      topic: 'vpc',
      question: 'Como permitir que workloads em subnets privadas acessem S3 sem internet?',
      context: 'Tráfego privado.',
      options: [
        { label: 'A', text: 'Gateway VPC Endpoint para S3 e policies restritivas (aws:SourceVpce)' },
        { label: 'B', text: 'IGW + SG' },
        { label: 'C', text: 'NAT Instance' },
        { label: 'D', text: 'VPC Peering' }
      ],
      correctAnswer: 'A',
      explanation: 'Gateway endpoint cria rota interna para S3 e pode ser restringido por policy.',
      relatedService: 'vpc'
    },
    {
      id: 29,
      topic: 'vpc',
      question: 'Qual recurso facilita publicação de APIs internas de múltiplas VPCs atrás de um único endpoint?',
      context: 'Centralização.',
      options: [
        { label: 'A', text: 'Transit Gateway + NLB/ALB privados, ou PrivateLink por serviço' },
        { label: 'B', text: 'IGW compartilhado' },
        { label: 'C', text: 'NACL somente' },
        { label: 'D', text: 'Flow Logs' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW permite malha e publicação central, ou PrivateLink por serviço sem roteamento L3.',
      relatedService: 'vpc'
    },
    {
      id: 30,
      topic: 'vpc',
      question: 'Como isolar cargas por ambiente (dev/stage/prod) na mesma região mantendo compartilhamento controlado?',
      context: 'Governança multi-conta.',
      options: [
        { label: 'A', text: 'Organizar por contas separadas + VPC sharing/TGW/PrivateLink conforme necessidade' },
        { label: 'B', text: 'Tudo em uma VPC e um SG' },
        { label: 'C', text: 'Uma subnet por ambiente na mesma VPC sem controles' },
        { label: 'D', text: 'Somente DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Multi-conta com VPCs por ambiente melhora isolamento; conectividade controlada via TGW/PrivateLink.',
      relatedService: 'vpc'
    },
    {
      id: 31,
      topic: 'vpc',
      question: 'Como rotear tráfego on-premises↔VPC para várias VPCs sem múltiplas VPNs por VPC?',
      context: 'Escalabilidade de conectividade.',
      options: [
        { label: 'A', text: 'Usar Transit Gateway anexando VPN e VPCs' },
        { label: 'B', text: 'Criar peering entre todas VPCs' },
        { label: 'C', text: 'Usar IGW' },
        { label: 'D', text: 'Atribuir Elastic IP nas privadas' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW centraliza e escala a conectividade L3 entre VPCs e on-premises.',
      relatedService: 'vpc'
    },
    {
      id: 32,
      topic: 'vpc',
      question: 'Como permitir resolução de nomes on-premises para recursos em VPC e vice-versa?',
      context: 'Integração DNS híbrida.',
      options: [
        { label: 'A', text: 'Route 53 Resolver Inbound/Outbound Endpoints com regras de encaminhamento' },
        { label: 'B', text: 'Criar Hosted Zone pública para *.local' },
        { label: 'C', text: 'Usar IGW para DNS' },
        { label: 'D', text: 'Somente DHCP' }
      ],
      correctAnswer: 'A',
      explanation: 'Resolver endpoints permitem encaminhar consultas entre on-premises e VPC com regras por domínio.',
      relatedService: 'vpc'
    },
    {
      id: 33,
      topic: 'vpc',
      question: 'Qual a melhor prática para alta disponibilidade de NAT Gateway?',
      context: 'Egress IPv4 para privadas.',
      options: [
        { label: 'A', text: 'Criar um NAT Gateway por AZ e rotear privadas da mesma AZ' },
        { label: 'B', text: 'Um NAT por região é suficiente' },
        { label: 'C', text: 'NAT em subnet privada' },
        { label: 'D', text: 'Usar IGW direto em privadas' }
      ],
      correctAnswer: 'A',
      explanation: 'Evita tráfego cross-AZ, melhora resiliência e reduz latência/custos.',
      relatedService: 'vpc'
    },
    {
      id: 34,
      topic: 'vpc',
      question: 'Qual diferença entre DHCP options set e Route 53 DNS?',
      context: 'Resolução de nomes.',
      options: [
        { label: 'A', text: 'DHCP options define domain-name-servers e search domain para instâncias' },
        { label: 'B', text: 'DHCP options cria hosted zones públicas' },
        { label: 'C', text: 'Route 53 configura NTP de instâncias' },
        { label: 'D', text: 'DNS interno não depende de DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'DHCP options controla parâmetros como DNS (AmazonProvidedDNS), NTP e domain-name.',
      relatedService: 'vpc'
    },
    {
      id: 35,
      topic: 'vpc',
      question: 'O que o Reachability Analyzer ajuda a validar?',
      context: 'Conectividade entre origem/destino.',
      options: [
        { label: 'A', text: 'Caminho de rede considerando SG, NACL, rotas e endpoints' },
        { label: 'B', text: 'Somente latência' },
        { label: 'C', text: 'Custos de egress' },
        { label: 'D', text: 'Tamanho de CIDR ideal' }
      ],
      correctAnswer: 'A',
      explanation: 'Ferramenta de análise estática que encontra bloqueios de rede.',
      relatedService: 'vpc'
    },
    {
      id: 36,
      topic: 'vpc',
      question: 'Qual serviço provê firewall gerenciado em nível de VPC com regras stateful?',
      context: 'Inspeção central.',
      options: [
        { label: 'A', text: 'AWS Network Firewall' },
        { label: 'B', text: 'NACL' },
        { label: 'C', text: 'SG' },
        { label: 'D', text: 'CloudTrail' }
      ],
      correctAnswer: 'A',
      explanation: 'Network Firewall implementa filtros stateful/IDS/IPS via endpoints em subnets específicas.',
      relatedService: 'vpc'
    },
    {
      id: 37,
      topic: 'vpc',
      question: 'Ao usar VPC Peering, o que é necessário para tráfego fluir?',
      context: 'Rotas e controles.',
      options: [
        { label: 'A', text: 'Rotas em ambas VPCs e SG/NACL permitindo tráfego' },
        { label: 'B', text: 'Somente aceitar a conexão' },
        { label: 'C', text: 'Criar IGW nas duas VPCs' },
        { label: 'D', text: 'Ativar transitive routing' }
      ],
      correctAnswer: 'A',
      explanation: 'Além do peering aceito, cada VPC precisa rotas para o CIDR remoto e SG/NACL adequados.',
      relatedService: 'vpc'
    },
    {
      id: 38,
      topic: 'vpc',
      question: 'Qual afirmação é correta sobre sobreposição de CIDR em VPC Peering?',
      context: 'Planejamento de endereços.',
      options: [
        { label: 'A', text: 'CIDRs não podem se sobrepor' },
        { label: 'B', text: 'Sobreposição é suportada parcialmente' },
        { label: 'C', text: 'Sempre resolve via NAT' },
        { label: 'D', text: 'TGW remove a necessidade de CIDRs únicos' }
      ],
      correctAnswer: 'A',
      explanation: 'Peering não suporta CIDR sobreposto; use IPAM para evitar conflitos.',
      relatedService: 'vpc'
    },
    {
      id: 39,
      topic: 'vpc',
      question: 'Quando usar Gateway Endpoint vs Interface Endpoint para DynamoDB?',
      context: 'Acesso privado.',
      options: [
        { label: 'A', text: 'DynamoDB usa Gateway Endpoint (rotas) em vez de Interface' },
        { label: 'B', text: 'DynamoDB exige Interface Endpoint' },
        { label: 'C', text: 'Ambos são necessários' },
        { label: 'D', text: 'Nenhum suporta DynamoDB' }
      ],
      correctAnswer: 'A',
      explanation: 'Apenas S3 e DynamoDB usam Gateway Endpoint; demais serviços usam Interface Endpoint.',
      relatedService: 'vpc'
    },
    {
      id: 40,
      topic: 'vpc',
      question: 'Qual efeito de desabilitar enableDnsHostnames na VPC?',
      context: 'Resolução interna.',
      options: [
        { label: 'A', text: 'Instâncias não recebem hostnames DNS públicos/privados automaticamente' },
        { label: 'B', text: 'Remove rotas default' },
        { label: 'C', text: 'Desabilita IGW' },
        { label: 'D', text: 'Bloqueia VPC Peering' }
      ],
      correctAnswer: 'A',
      explanation: 'Sem hostnames, resolução/comunicação por nomes pode falhar; mantenha ambas flags de DNS ativas.',
      relatedService: 'vpc'
    },
    {
      id: 41,
      topic: 'vpc',
      question: 'Qual a diferença entre main route table e route table associada?',
      context: 'Associações.',
      options: [
        { label: 'A', text: 'Sem associação explícita, a subnet herda a main; só pode haver uma associada' },
        { label: 'B', text: 'Subnets combinam várias route tables' },
        { label: 'C', text: 'IGW tem route table própria' },
        { label: 'D', text: 'ENI associa route table' }
      ],
      correctAnswer: 'A',
      explanation: 'A subnet usa a main até uma associação específica ser criada.',
      relatedService: 'vpc'
    },
    {
      id: 42,
      topic: 'vpc',
      question: 'Como reduzir egress público para acesso a serviços AWS em privadas?',
      context: 'Egress control.',
      options: [
        { label: 'A', text: 'Criar VPC Endpoints (Gateway/Interface) conforme o serviço' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Colocar IGW em todas subnets' },
        { label: 'D', text: 'Usar peering com a internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoints evitam tráfego via internet/NAT e reduzem custos e riscos.',
      relatedService: 'vpc'
    },
    {
      id: 43,
      topic: 'vpc',
      question: 'Como proteger instâncias privadas que acessam internet via NAT contra destinos maliciosos?',
      context: 'Egress filtering.',
      options: [
        { label: 'A', text: 'Usar AWS Network Firewall ou appliances via GWLB para inspeção/egress policies' },
        { label: 'B', text: 'Apenas NACL inbound' },
        { label: 'C', text: 'Apenas SG outbound qualquer' },
        { label: 'D', text: 'Usar IGW no lugar de NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'Firewall gerenciado/appliances permitem listas/IDS/IPS para controlar egress.',
      relatedService: 'vpc'
    },
    {
      id: 44,
      topic: 'vpc',
      question: 'Qual recurso simplifica inserção transparente de appliances de segurança na malha?',
      context: 'Encaminhamento via LB.',
      options: [
        { label: 'A', text: 'Gateway Load Balancer (GWLB)' },
        { label: 'B', text: 'ALB' },
        { label: 'C', text: 'NLB' },
        { label: 'D', text: 'IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'GWLB provê tráfego encapsulado (GREE) para appliances L3/L4 e escala horizontal.',
      relatedService: 'vpc'
    },
    {
      id: 45,
      topic: 'vpc',
      question: 'Como garantir que somente a VPC correta acesse seu endpoint S3?',
      context: 'Restrição por origem.',
      options: [
        { label: 'A', text: 'Usar condição aws:SourceVpce na bucket policy atrelada ao Gateway Endpoint' },
        { label: 'B', text: 'Abrir ACL pública' },
        { label: 'C', text: 'Colocar SG no bucket' },
        { label: 'D', text: 'Usar peering obrigatório' }
      ],
      correctAnswer: 'A',
      explanation: 'Policies podem restringir o acesso ao endpoint específico (VPCE ID).',
      relatedService: 'vpc'
    },
    {
      id: 46,
      topic: 'vpc',
      question: 'TGW suporta roteamento transitivo entre VPCs?',
      context: 'Conectividade central.',
      options: [
        { label: 'A', text: 'Sim, via route tables do TGW por attachment' },
        { label: 'B', text: 'Não, é ponto a ponto' },
        { label: 'C', text: 'Apenas com IGW' },
        { label: 'D', text: 'Somente intra-conta' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW fornece tables próprias que permitem trânsito controlado entre attachments.',
      relatedService: 'vpc'
    },
    {
      id: 47,
      topic: 'vpc',
      question: 'Qual recomendação para DNS híbrido entre VPC e on-premises?',
      context: 'Resolver endpoints.',
      options: [
        { label: 'A', text: 'Configurar Inbound/Outbound Resolver Endpoints e regras de encaminhamento' },
        { label: 'B', text: 'Criar Hosted Zone pública *.local' },
        { label: 'C', text: 'Usar IGW' },
        { label: 'D', text: 'Desativar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Permite queries bidirecionais privadas entre ambientes por domínio.',
      relatedService: 'vpc'
    },
    {
      id: 48,
      topic: 'vpc',
      question: 'Qual prática evita blackholes ao migrar NAT Gateway?',
      context: 'Mudanças em produção.',
      options: [
        { label: 'A', text: 'Atualizar rotas privadas para o novo NAT antes de remover o antigo' },
        { label: 'B', text: 'Remover primeiro o antigo' },
        { label: 'C', text: 'Resetar SGs' },
        { label: 'D', text: 'Desligar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Troque alvo nas route tables e valide conectividade antes da retirada.',
      relatedService: 'vpc'
    },
    {
      id: 49,
      topic: 'vpc',
      question: 'Para workloads IPv6-only, como acessar serviços AWS privados?',
      context: 'IPv6 endpoints.',
      options: [
        { label: 'A', text: 'Criar Interface Endpoints com IPv6 habilitado' },
        { label: 'B', text: 'Usar NAT64 gerenciado' },
        { label: 'C', text: 'IGW com ACL' },
        { label: 'D', text: 'Apenas TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Muitos endpoints de interface suportam IPv6; configure ENIs IPv6-only e SGs.',
      relatedService: 'vpc'
    },
    {
      id: 50,
      topic: 'vpc',
      question: 'Qual é o efeito de uma NACL muito permissiva e SGs restritivos?',
      context: 'Defesa em camadas.',
      options: [
        { label: 'A', text: 'SGs ainda controlam efetivamente o tráfego; NACL não enfraquece SGs' },
        { label: 'B', text: 'NACL sobrescreve SGs' },
        { label: 'C', text: 'Ambos são ignorados' },
        { label: 'D', text: 'Permite tudo' }
      ],
      correctAnswer: 'A',
      explanation: 'SG é stateful por ENI e normalmente é a camada mais específica de controle.',
      relatedService: 'vpc'
    },
    {
      id: 51,
      topic: 'vpc',
      question: 'Qual ferramenta reduz chance de conflitos de CIDR em larga escala?',
      context: 'Gestão de endereços.',
      options: [
        { label: 'A', text: 'AWS IPAM (VPC IP Address Manager)' },
        { label: 'B', text: 'Flow Logs' },
        { label: 'C', text: 'CloudTrail' },
        { label: 'D', text: 'IAM' }
      ],
      correctAnswer: 'A',
      explanation: 'IPAM provê pools, provisão e tracking de CIDRs multi-conta/região.',
      relatedService: 'vpc'
    },
    {
      id: 52,
      topic: 'vpc',
      question: 'Como garantir que apenas subnets corretas usem um TGW attachment?',
      context: 'Roteamento no TGW.',
      options: [
        { label: 'A', text: 'Configurar route tables do TGW e associações/propagações apropriadas' },
        { label: 'B', text: 'TGW aprende automaticamente tudo' },
        { label: 'C', text: 'Usar IGW' },
        { label: 'D', text: 'Criar várias main route tables' }
      ],
      correctAnswer: 'A',
      explanation: 'Controle de tráfego pelo TGW é feito via suas próprias route tables.',
      relatedService: 'vpc'
    },
    {
      id: 53,
      topic: 'vpc',
      question: 'Qual a recomendação sobre seleção de portas efêmeras em NACLs?',
      context: 'Tráfego de retorno.',
      options: [
        { label: 'A', text: 'Permitir faixa 1024–65535 para tráfego de volta conforme necessário' },
        { label: 'B', text: 'Bloquear todas' },
        { label: 'C', text: 'Apenas 443' },
        { label: 'D', text: 'Apenas 22' }
      ],
      correctAnswer: 'A',
      explanation: 'Como NACL é stateless, portas de retorno precisam ser liberadas.',
      relatedService: 'vpc'
    },
    {
      id: 54,
      topic: 'vpc',
      question: 'Qual prática ao criar subnets públicas para ALB?',
      context: 'Entrada L7.',
      options: [
        { label: 'A', text: 'Usar pelo menos duas AZs e rotas 0.0.0.0/0 → IGW' },
        { label: 'B', text: 'Criar em uma única AZ' },
        { label: 'C', text: 'Sem IGW' },
        { label: 'D', text: 'Apenas IPv6' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB público exige subnets públicas e HA multi-AZ.',
      relatedService: 'vpc'
    },
    {
      id: 55,
      topic: 'vpc',
      question: 'Para workloads internas, onde colocar NLB privado?',
      context: 'L4 interno.',
      options: [
        { label: 'A', text: 'Em subnets privadas com targets privados' },
        { label: 'B', text: 'Em subnets públicas com IP público' },
        { label: 'C', text: 'No IGW' },
        { label: 'D', text: 'No TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'NLB privado atende tráfego interno sem exposição pública.',
      relatedService: 'vpc'
    },
    {
      id: 56,
      topic: 'vpc',
      question: 'Como publicar serviços internos para outras contas com isolamento L7?',
      context: 'Integração cross-account.',
      options: [
        { label: 'A', text: 'PrivateLink (Endpoint Service) atrás de NLB' },
        { label: 'B', text: 'Peering com IGW' },
        { label: 'C', text: 'Abrir SG para 0.0.0.0/0' },
        { label: 'D', text: 'NAT compartilhado' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink usa NLB e ENIs; não há roteamento L3 entre VPCs.',
      relatedService: 'vpc'
    },
    {
      id: 57,
      topic: 'vpc',
      question: 'Qual componente aplica SGs: subnet, VPC ou ENI?',
      context: 'Escopo de SG.',
      options: [
        { label: 'A', text: 'ENI (associado ao recurso)' },
        { label: 'B', text: 'Subnet' },
        { label: 'C', text: 'VPC' },
        { label: 'D', text: 'IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'SGs são aplicados a interfaces de rede dos recursos.',
      relatedService: 'vpc'
    },
    {
      id: 58,
      topic: 'vpc',
      question: 'Qual a definição de subnet pública na prática?',
      context: 'Rota default.',
      options: [
        { label: 'A', text: 'Route table tem 0.0.0.0/0 apontando para IGW' },
        { label: 'B', text: 'Instâncias têm IP público' },
        { label: 'C', text: 'Subnet tem /24' },
        { label: 'D', text: 'Tem NACL aberta' }
      ],
      correctAnswer: 'A',
      explanation: 'A rota para IGW caracteriza a subnet pública; IP público pode ser opcional por instância.',
      relatedService: 'vpc'
    },
    {
      id: 59,
      topic: 'vpc',
      question: 'Para auditoria de tráfego, onde habilitar VPC Flow Logs?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Na VPC, Subnet ou ENI, enviando para CloudWatch Logs ou S3' },
        { label: 'B', text: 'Somente no IGW' },
        { label: 'C', text: 'Somente no NAT' },
        { label: 'D', text: 'Apenas no TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Registra aceitos/negados e metadados, útil para troubleshooting e segurança.',
      relatedService: 'vpc'
    },
    {
      id: 60,
      topic: 'vpc',
      question: 'Qual abordagem para evitar egress público de workloads privadas?',
      context: 'Saída controlada.',
      options: [
        { label: 'A', text: 'Preferir VPC Endpoints para serviços AWS e proxies privados para internet' },
        { label: 'B', text: '0.0.0.0/0 → IGW nas privadas' },
        { label: 'C', text: 'Remover SGs' },
        { label: 'D', text: 'Usar DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'Minimiza exposição e custo usando caminhos privados e inspeção central.',
      relatedService: 'vpc'
    },
    {
      id: 61,
      topic: 'vpc',
      question: 'Como garantir IP público automático em instâncias em subnets públicas?',
      context: 'Atribuição automática.',
      options: [
        { label: 'A', text: 'Ativar auto-assign public IPv4 na subnet ou definir ao lançar a instância' },
        { label: 'B', text: 'Apenas dar EIP manual depois' },
        { label: 'C', text: 'Criar NACL permissiva' },
        { label: 'D', text: 'Usar TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'O atributo da subnet controla a atribuição automática; também pode ser configurado por instância.',
      relatedService: 'vpc'
    },
    {
      id: 62,
      topic: 'vpc',
      question: 'Como segregar ambientes em uma conta mantendo conectividade controlada?',
      context: 'Dev/Stage/Prod.',
      options: [
        { label: 'A', text: 'VPCs separadas por ambiente com TGW/PrivateLink conforme necessário' },
        { label: 'B', text: 'Tudo na mesma subnet' },
        { label: 'C', text: 'Abrir SGs entre todos' },
        { label: 'D', text: 'Compartilhar IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Isolamento por VPC com conectividade explícita melhora segurança e governança.',
      relatedService: 'vpc'
    },
    {
      id: 63,
      topic: 'vpc',
      question: 'Para simplificar rotas a destinos recorrentes (SaaS, on-prem), o que usar?',
      context: 'Manutenção de rotas.',
      options: [
        { label: 'A', text: 'Prefix Lists administradas (AWS ou custom) referenciadas nas route tables' },
        { label: 'B', text: 'Múltiplas rotas individuais duplicadas' },
        { label: 'C', text: 'ACLs somente' },
        { label: 'D', text: 'DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'Prefix lists permitem manter um conjunto de prefixos reutilizável em várias route tables e contas.',
      relatedService: 'vpc'
    },
    {
      id: 64,
      topic: 'vpc',
      question: 'Em VPC Sharing, quem pode alterar route tables/IGW/NAT?',
      context: 'Governança do owner vs participant.',
      options: [
        { label: 'A', text: 'Somente a conta dona da VPC (owner)' },
        { label: 'B', text: 'Qualquer participante' },
        { label: 'C', text: 'Apenas via RAM automático' },
        { label: 'D', text: 'O serviço TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Participantes lançam recursos em subnets compartilhadas, mas o owner administra recursos de VPC (rotas, IGW, NAT).',
      relatedService: 'vpc'
    },
    {
      id: 65,
      topic: 'vpc',
      question: 'Qual rota será usada quando múltiplas entradas combinam um destino?',
      context: 'Seleção de rota.',
      options: [
        { label: 'A', text: 'A de maior especificidade (Longest Prefix Match)' },
        { label: 'B', text: 'A de menor especificidade' },
        { label: 'C', text: 'A adicionada mais recentemente' },
        { label: 'D', text: 'A com menor ID' }
      ],
      correctAnswer: 'A',
      explanation: 'Route tables seguem LPM: a rota mais específica vence.',
      relatedService: 'vpc'
    },
    {
      id: 66,
      topic: 'vpc',
      question: 'Como gerenciar instâncias privadas sem NAT/IGW?',
      context: 'Acesso SSM sem internet.',
      options: [
        { label: 'A', text: 'Criar Interface Endpoints para SSM, SSMMessages e EC2Messages' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Adicionar EIP' },
        { label: 'D', text: 'Usar peering com internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Com endpoints privados, o Systems Manager funciona sem egress público.',
      relatedService: 'vpc'
    },
    {
      id: 67,
      topic: 'vpc',
      question: 'Para tráfego via Transit Gateway, o que configurar?',
      context: 'Associação e propagação.',
      options: [
        { label: 'A', text: 'Associar attachments e propagar rotas nas route tables do TGW' },
        { label: 'B', text: 'Apenas criar o attachment' },
        { label: 'C', text: 'Criar IGW no TGW' },
        { label: 'D', text: 'Adicionar NAT ao TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'As route tables do TGW controlam quem fala com quem via associações e propagações.',
      relatedService: 'vpc'
    },
    {
      id: 68,
      topic: 'vpc',
      question: 'O que VPC Flow Logs não registra?',
      context: 'Limitações de logs.',
      options: [
        { label: 'A', text: 'Payload do pacote' },
        { label: 'B', text: 'Aceito/Negado' },
        { label: 'C', text: 'Portas e protocolos' },
        { label: 'D', text: 'Endereços de origem/destino' }
      ],
      correctAnswer: 'A',
      explanation: 'Flow Logs capturam metadados, não conteúdo do tráfego.',
      relatedService: 'vpc'
    },
    {
      id: 69,
      topic: 'vpc',
      question: 'Quantos Internet Gateways podem estar anexados a uma VPC?',
      context: 'Conectividade pública.',
      options: [
        { label: 'A', text: 'Apenas um por VPC' },
        { label: 'B', text: 'Um por AZ' },
        { label: 'C', text: 'Ilimitados' },
        { label: 'D', text: 'Nenhum, IGW é por conta' }
      ],
      correctAnswer: 'A',
      explanation: 'Uma VPC suporta um único IGW anexado por vez.',
      relatedService: 'vpc'
    },
    {
      id: 70,
      topic: 'vpc',
      question: 'Pode-se alterar o CIDR de uma subnet existente?',
      context: 'Planejamento de endereços.',
      options: [
        { label: 'A', text: 'Não; crie nova subnet e migre recursos' },
        { label: 'B', text: 'Sim, a qualquer momento' },
        { label: 'C', text: 'Apenas reduzir' },
        { label: 'D', text: 'Apenas expandir' }
      ],
      correctAnswer: 'A',
      explanation: 'O CIDR da subnet é imutável; use novas subnets para redimensionar.',
      relatedService: 'vpc'
    },
    {
      id: 71,
      topic: 'vpc',
      question: 'É possível adicionar CIDR secundário a uma VPC?',
      context: 'Expansão de espaço de endereços.',
      options: [
        { label: 'A', text: 'Sim, anexando blocos IPv4/IPv6 adicionais' },
        { label: 'B', text: 'Não, VPC tem CIDR fixo' },
        { label: 'C', text: 'Apenas IPv6' },
        { label: 'D', text: 'Apenas em us-east-1' }
      ],
      correctAnswer: 'A',
      explanation: 'VPC suporta CIDRs adicionais; subnets podem usar qualquer bloco associado.',
      relatedService: 'vpc'
    },
    {
      id: 72,
      topic: 'vpc',
      question: 'O que representa a rota “local” nas route tables da VPC?',
      context: 'Roteamento interno.',
      options: [
        { label: 'A', text: 'Alcance do CIDR da VPC e não pode ser removida' },
        { label: 'B', text: 'Rota default para internet' },
        { label: 'C', text: 'Rota para TGW' },
        { label: 'D', text: 'Rota para endpoints' }
      ],
      correctAnswer: 'A',
      explanation: 'A rota “local” garante conectividade intra-VPC e é fixa.',
      relatedService: 'vpc'
    },
    {
      id: 73,
      topic: 'vpc',
      question: 'Como resolver nomes de uma Private Hosted Zone em outra VPC?',
      context: 'DNS privado multi-VPC.',
      options: [
        { label: 'A', text: 'Associar a PHZ à VPC consumidora ou usar Resolver outbound/inbound' },
        { label: 'B', text: 'Peering sozinho já permite' },
        { label: 'C', text: 'IGW habilita DNS privado' },
        { label: 'D', text: 'NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'PHZ precisa de associação explícita ou de encaminhamento via Route 53 Resolver.',
      relatedService: 'vpc'
    },
    {
      id: 74,
      topic: 'vpc',
      question: 'Interface Endpoints (AWS services) podem ser “compartilhados” entre VPCs?',
      context: 'Consumo de endpoints.',
      options: [
        { label: 'A', text: 'Não; cada VPC cria seu próprio endpoint (ENIs)' },
        { label: 'B', text: 'Sim via peering' },
        { label: 'C', text: 'Sim via IGW' },
        { label: 'D', text: 'Sim via TGW sem mais nada' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoint é por VPC. Para serviços próprios, use PrivateLink (Endpoint Service) cross-account.',
      relatedService: 'vpc'
    },
    {
      id: 75,
      topic: 'vpc',
      question: 'Boa prática para outbound SGs em workloads sensíveis?',
      context: 'Princípio do menor privilégio.',
      options: [
        { label: 'A', text: 'Restringir outbound a destinos/portas necessários' },
        { label: 'B', text: 'Manter allow all default' },
        { label: 'C', text: 'Usar apenas NACL' },
        { label: 'D', text: 'Abrir para 0.0.0.0/0 sempre' }
      ],
      correctAnswer: 'A',
      explanation: 'Limitar outbound reduz superfície de ataque e exfiltração.',
      relatedService: 'vpc'
    },
    {
      id: 76,
      topic: 'vpc',
      question: 'Para publicar um serviço L4 interno com alta performance, o que escolher?',
      context: 'Balanceamento interno.',
      options: [
        { label: 'A', text: 'NLB privado em múltiplas subnets/AZs' },
        { label: 'B', text: 'ALB público' },
        { label: 'C', text: 'IGW' },
        { label: 'D', text: 'DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'NLB lida com TCP/UDP em L4 e escala alto throughput internamente.',
      relatedService: 'vpc'
    },
    {
      id: 77,
      topic: 'vpc',
      question: 'O que é um blackhole em route table?',
      context: 'Rota inválida.',
      options: [
        { label: 'A', text: 'Rota cujo target não existe/está inativo' },
        { label: 'B', text: 'Rota mais específica' },
        { label: 'C', text: 'Rota local' },
        { label: 'D', text: 'Rota default' }
      ],
      correctAnswer: 'A',
      explanation: 'Se o target (ex.: NAT/IGW/TGW) é removido, a rota vira blackhole e não entrega tráfego.',
      relatedService: 'vpc'
    },
    {
      id: 78,
      topic: 'vpc',
      question: 'Como reutilizar listas de destinos em SGs entre contas?',
      context: 'Padronização.',
      options: [
        { label: 'A', text: 'Prefix Lists compartilhadas via RAM referenciadas em SG/rotas' },
        { label: 'B', text: 'Copiar e colar IPs' },
        { label: 'C', text: 'Usar NACLs apenas' },
        { label: 'D', text: 'Criar IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Prefix lists centralizam manutenção de blocos confiáveis referenciáveis.',
      relatedService: 'vpc'
    },
    {
      id: 79,
      topic: 'vpc',
      question: 'Uma ENI pode ser criada desacoplada de instância EC2?',
      context: 'Gerenciamento de interfaces.',
      options: [
        { label: 'A', text: 'Sim; pode ser anexada posteriormente a uma instância na mesma AZ' },
        { label: 'B', text: 'Não, sempre nasce com a instância' },
        { label: 'C', text: 'Apenas em IPv6' },
        { label: 'D', text: 'Apenas com TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'ENIs podem ser criadas e gerenciadas separadamente e reanexadas conforme necessário.',
      relatedService: 'vpc'
    },
    {
      id: 80,
      topic: 'vpc',
      question: 'Para minimizar tráfego cross-AZ, como desenhar egress via NAT?',
      context: 'Arquitetura por AZ.',
      options: [
        { label: 'A', text: 'Um NAT por AZ e rotas das privadas para o NAT da mesma AZ' },
        { label: 'B', text: 'Um NAT único central' },
        { label: 'C', text: 'Usar IGW em privadas' },
        { label: 'D', text: 'NAT em subnets privadas' }
      ],
      correctAnswer: 'A',
      explanation: 'Evita latência/custos cross-AZ e melhora resiliência.',
      relatedService: 'vpc'
    },
    {
      id: 81,
      topic: 'vpc',
      question: 'Como conceder acesso privado a APIs internas entre contas?',
      context: 'Integração L7 privada.',
      options: [
        { label: 'A', text: 'PrivateLink (NLB provider + Interface Endpoints consumers)' },
        { label: 'B', text: 'Abrir 0.0.0.0/0 em SG' },
        { label: 'C', text: 'Peering com IGW' },
        { label: 'D', text: 'NAT compartilhado' }
      ],
      correctAnswer: 'A',
      explanation: 'Fornece acesso privado sem roteamento L3 entre VPCs.',
      relatedService: 'vpc'
    },
    {
      id: 82,
      topic: 'vpc',
      question: 'O que considerar ao criar NACLs para serviços com portas dinâmicas?',
      context: 'Portas efêmeras.',
      options: [
        { label: 'A', text: 'Abrir faixa efêmera de retorno em inbound/outbound conforme fluxo' },
        { label: 'B', text: 'Apenas 80/443' },
        { label: 'C', text: 'Bloquear tudo >1024' },
        { label: 'D', text: 'Usar apenas SG' }
      ],
      correctAnswer: 'A',
      explanation: 'NACLs são stateless e precisam das portas de retorno liberadas.',
      relatedService: 'vpc'
    },
    {
      id: 83,
      topic: 'vpc',
      question: 'Qual a forma correta de aplicar SG de origem “apenas ALB” para backends?',
      context: 'Referência de SG.',
      options: [
        { label: 'A', text: 'Inbound do SG do ALB como origem em vez de CIDR' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Referenciar NACL do ALB' },
        { label: 'D', text: 'Usar IGW como origem' }
      ],
      correctAnswer: 'A',
      explanation: 'Referenciar SG do ALB limita o tráfego estritamente ao load balancer.',
      relatedService: 'vpc'
    },
    {
      id: 84,
      topic: 'vpc',
      question: 'Para workloads IPv6-only, qual rota provê saída sem inbound?',
      context: 'Egress IPv6.',
      options: [
        { label: 'A', text: '::/0 → Egress-only Internet Gateway' },
        { label: 'B', text: '::/0 → IGW' },
        { label: 'C', text: '0.0.0.0/0 → NAT' },
        { label: 'D', text: 'TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'EIGW permite apenas saída IPv6, bloqueando conexões de entrada.',
      relatedService: 'vpc'
    },
    {
      id: 85,
      topic: 'vpc',
      question: 'Como evitar dependência de NAT para acessar serviços AWS em privadas?',
      context: 'Caminhos privados.',
      options: [
        { label: 'A', text: 'Criar VPC Endpoints apropriados e remover 0.0.0.0/0' },
        { label: 'B', text: 'Adicionar mais NATs' },
        { label: 'C', text: 'Criar IGW' },
        { label: 'D', text: 'Usar peering com internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoints evitam egress público e reduzem custos de saída.',
      relatedService: 'vpc'
    },
    {
      id: 86,
      topic: 'vpc',
      question: 'Como centralizar tráfego on-prem↔n múltiplas VPCs com governança?',
      context: 'Hub-and-spoke.',
      options: [
        { label: 'A', text: 'Transit Gateway com route tables dedicadas por domínio' },
        { label: 'B', text: 'Peering total malhado' },
        { label: 'C', text: 'Multiplicar IGWs' },
        { label: 'D', text: 'Abrir SG global' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW provê roteamento centralizado com segmentação por route tables.',
      relatedService: 'vpc'
    },
    {
      id: 87,
      topic: 'vpc',
      question: 'Como permitir que workloads privadas acessem S3 com segurança reforçada?',
      context: 'Restrições no bucket.',
      options: [
        { label: 'A', text: 'Gateway Endpoint + bucket policy restringindo aws:SourceVpce' },
        { label: 'B', text: 'ACL pública' },
        { label: 'C', text: 'NAT apenas' },
        { label: 'D', text: 'IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Restringe acessos ao tráfego vindo do endpoint de VPC específico.',
      relatedService: 'vpc'
    },
    {
      id: 88,
      topic: 'vpc',
      question: 'Qual o efeito de desassociar uma subnet de sua route table?',
      context: 'Herança de main table.',
      options: [
        { label: 'A', text: 'Ela passa a usar a main route table da VPC' },
        { label: 'B', text: 'Fica sem rotas' },
        { label: 'C', text: 'Usa rotas do IGW' },
        { label: 'D', text: 'Usa rotas do TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Sem associação explícita, a subnet herda a main da VPC.',
      relatedService: 'vpc'
    },
    {
      id: 89,
      topic: 'vpc',
      question: 'Para tráfego L7 público, onde posicionar o ALB e backends?',
      context: 'Arquitetura web.',
      options: [
        { label: 'A', text: 'ALB em subnets públicas e backends em privadas' },
        { label: 'B', text: 'Tudo em públicas com IP público' },
        { label: 'C', text: 'ALB em privadas' },
        { label: 'D', text: 'Sem subnets' }
      ],
      correctAnswer: 'A',
      explanation: 'Modelo comum: entrada pública no ALB, serviços internos protegidos em privadas.',
      relatedService: 'vpc'
    },
    {
      id: 90,
      topic: 'vpc',
      question: 'Como validar fim a fim se uma origem alcança um destino específico na VPC?',
      context: 'Troubleshooting.',
      options: [
        { label: 'A', text: 'Usar Reachability Analyzer com source/destination e porta' },
        { label: 'B', text: 'Apenas ping' },
        { label: 'C', text: 'CloudTrail' },
        { label: 'D', text: 'Desligar NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'A ferramenta avalia SG, NACL, rotas e endpoints para o caminho proposto.',
      relatedService: 'vpc'
    },
    {
      id: 41,
      topic: 'sqs',
      question: 'Qual impacto de VisibilityTimeout menor que tempo de processamento?',
      context: 'Processo demora 2 minutos.',
      options: [
        { label: 'A', text: 'Nenhum' },
        { label: 'B', text: 'Mensagem reentra e pode ser processada em paralelo gerando duplicidade' },
        { label: 'C', text: 'Mensagem é deletada automaticamente' },
        { label: 'D', text: 'Fila bloqueia' }
      ],
      correctAnswer: 'B',
      explanation: 'Se o timeout expira antes do fim, a mensagem reaparece e pode gerar processamento duplicado.',
      relatedService: 'sqs'
    },
    {
      id: 42,
      topic: 'sqs',
      question: 'Como estender o visibility timeout dinamicamente?',
      context: 'Tarefas variáveis.',
      options: [
        { label: 'A', text: 'Reenviar mensagem' },
        { label: 'B', text: 'ChangeMessageVisibility durante o processamento' },
        { label: 'C', text: 'Editar queue policy' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'ChangeMessageVisibility aumenta ou reduz o timeout para a mensagem específica.',
      relatedService: 'sqs'
    },
    {
      id: 43,
      topic: 'sqs',
      question: 'Quando usar ReceiveMessage num consumer multi-thread?',
      context: 'Throughput.',
      options: [
        { label: 'A', text: 'Sempre single-thread' },
        { label: 'B', text: 'Usar múltiplas chamadas paralelas com batch para throughput maior' },
        { label: 'C', text: 'Evitar batch' },
        { label: 'D', text: 'Só FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Vários workers com long polling + batch elevam TPS mantendo custo baixo.',
      relatedService: 'sqs'
    },
    {
      id: 44,
      topic: 'sqs',
      question: 'Qual diferença entre DeleteMessage e PurgeQueue?',
      context: 'Limpeza.',
      options: [
        { label: 'A', text: 'Nenhuma' },
        { label: 'B', text: 'Delete remove uma mensagem específica; Purge limpa todas as mensagens da fila em até 60s' },
        { label: 'C', text: 'Purge só apaga DLQ' },
        { label: 'D', text: 'Delete apaga fila inteira' }
      ],
      correctAnswer: 'B',
      explanation: 'PurgeQueue remove todas as mensagens; DeleteMessage remove apenas uma pelo receipt handle.',
      relatedService: 'sqs'
    },
    {
      id: 45,
      topic: 'sqs',
      question: 'Quantas vezes PurgeQueue pode ser chamado?',
      context: 'Limite.',
      options: [
        { label: 'A', text: 'Ilimitado' },
        { label: 'B', text: 'No máximo a cada 60 segundos por fila' },
        { label: 'C', text: 'Uma vez por dia' },
        { label: 'D', text: 'Nunca em FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Existe cooldown de 60 segundos entre purge calls.',
      relatedService: 'sqs'
    },
    {
      id: 46,
      topic: 'sqs',
      question: 'Qual endpoint usar para integração privada?',
      context: 'Sem internet.',
      options: [
        { label: 'A', text: 'NAT Gateway' },
        { label: 'B', text: 'Interface VPC Endpoint (PrivateLink) para SQS' },
        { label: 'C', text: 'Gateway Endpoint' },
        { label: 'D', text: 'Sem suporte' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS suporta Interface VPC Endpoint para tráfego privado.',
      relatedService: 'sqs'
    },
    {
      id: 47,
      topic: 'sqs',
      question: 'Como habilitar SSE com chave gerenciada pelo cliente?',
      context: 'KMS custom.',
      options: [
        { label: 'A', text: 'Não é suportado' },
        { label: 'B', text: 'Selecionar CMK custom no SSE-SQS' },
        { label: 'C', text: 'Usar ACM' },
        { label: 'D', text: 'Apenas chave AWS gerenciada' }
      ],
      correctAnswer: 'B',
      explanation: 'Pode escolher CMK gerenciada pela AWS ou pelo cliente para SSE-SQS.',
      relatedService: 'sqs'
    },
    {
      id: 48,
      topic: 'sqs',
      question: 'Qual API move mensagens para outra fila sem retê-las?',
      context: 'Workflow.',
      options: [
        { label: 'A', text: 'SendMessage' },
        { label: 'B', text: 'Não há move nativo; precisa ler da origem e enviar manualmente para destino' },
        { label: 'C', text: 'MoveMessage' },
        { label: 'D', text: 'CloneMessage' }
      ],
      correctAnswer: 'B',
      explanation: 'Não existe move nativo; faça receive + send + delete.',
      relatedService: 'sqs'
    },
    {
      id: 49,
      topic: 'sqs',
      question: 'Como evitar perda de mensagens se consumer falha após receber?',
      context: 'Falha no meio.',
      options: [
        { label: 'A', text: 'Deletar assim que recebe' },
        { label: 'B', text: 'Somente deletar após processamento concluir' },
        { label: 'C', text: 'Usar PurgeQueue' },
        { label: 'D', text: 'Aumentar retention' }
      ],
      correctAnswer: 'B',
      explanation: 'DeleteMessage só deve ocorrer após sucesso; senão reaparece e permite retry.',
      relatedService: 'sqs'
    },
    {
      id: 50,
      topic: 'sqs',
      question: 'Como calcular concorrência necessária?',
      context: 'Dimensionamento.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Considerar TPS desejado, tempo médio de processamento e visibility timeout para dimensionar workers' },
        { label: 'C', text: 'Depende do tamanho da mensagem apenas' },
        { label: 'D', text: 'Sempre 1 worker' }
      ],
      correctAnswer: 'B',
      explanation: 'Concurrency = throughput alvo * tempo process / batch size. Ajuste autoscaling com métricas.',
      relatedService: 'sqs'
    }
  ],
  
  route53: [
    {
      id: 1,
      topic: 'route53',
      question: 'Uma aplicação precisa rotear usuários automaticamente para a região AWS mais próxima geograficamente. Qual política de roteamento do Route 53 deve ser usada?',
      context: 'A aplicação está implantada em us-east-1, eu-west-1 e ap-southeast-1.',
      options: [
        { label: 'A', text: 'Simple routing' },
        { label: 'B', text: 'Weighted routing' },
        { label: 'C', text: 'Latency-based routing' },
        { label: 'D', text: 'Failover routing' }
      ],
      correctAnswer: 'C',
      explanation: 'Latency-based routing direciona usuários automaticamente para a região AWS com menor latência. Route 53 mede latência de cada região e escolhe a melhor. Opção A: Simple não escolhe dinamicamente. Opção B: Weighted é para teste A/B ou distribuição percentual. Opção D: Failover é para DR.',
      relatedService: 'route53'
    },
    {
      id: 2,
      topic: 'route53',
      question: 'Qual política de roteamento permite distribuir 90% do tráfego para produção e 10% para canary deployment?',
      context: 'Time quer testar nova versão com tráfego real limitado.',
      options: [
        { label: 'A', text: 'Simple routing' },
        { label: 'B', text: 'Weighted routing com peso 90 e 10' },
        { label: 'C', text: 'Geolocation routing' },
        { label: 'D', text: 'Multivalue answer routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Weighted routing permite distribuir tráfego baseado em pesos percentuais. Crie 2 records: um com peso 90 (prod) e outro com peso 10 (canary). Ideal para blue-green deployment e testes A/B. Opção A: Simple envia 100% para um target. Opções C/D não controlam percentuais.',
      relatedService: 'route53'
    },
    {
      id: 3,
      topic: 'route53',
      question: 'Uma aplicação crítica usa arquitetura ativo-passivo com endpoint primário em us-east-1 e backup em us-west-2. Qual política Route 53 implementa failover automático?',
      context: 'Sistema de pagamentos precisa de DR com RTO de 5 minutos.',
      options: [
        { label: 'A', text: 'Simple routing com dois IPs' },
        { label: 'B', text: 'Weighted routing 50/50' },
        { label: 'C', text: 'Failover routing com health check no endpoint primário' },
        { label: 'D', text: 'Latency-based routing' }
      ],
      correctAnswer: 'C',
      explanation: 'Failover routing com health check monitora endpoint primário. Se unhealthy, Route 53 automaticamente roteia para secundário. Configurar: record PRIMARY com health check e record SECONDARY. TTL baixo acelera propagação. Opção A: Simple não faz health check. Opção B: Weighted envia tráfego para ambos (ativo-ativo). Opção D: Latency escolhe por performance, não failover.',
      relatedService: 'route53'
    },
    {
      id: 4,
      topic: 'route53',
      question: 'O que Route 53 Health Check monitora diretamente?',
      context: 'Arquiteto configurando monitoramento para política failover.',
      options: [
        { label: 'A', text: 'CPU e memória da instância EC2' },
        { label: 'B', text: 'Endpoint HTTP/HTTPS/TCP e código de status' },
        { label: 'C', text: 'Logs de aplicação no CloudWatch Logs' },
        { label: 'D', text: 'Métricas de banco de dados RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Health Check do Route 53 envia requisições para endpoint (HTTP/HTTPS/TCP) e verifica: 1) Conectividade, 2) Código de resposta (200-299 = healthy), 3) String específica no body (opcional). Pode monitorar IP, ALB, CloudWatch alarm. Não monitora diretamente métricas de infra (CPU/RAM). Opção A/C/D: use CloudWatch Alarms integrado com health check.',
      relatedService: 'route53'
    },
    {
      id: 5,
      topic: 'route53',
      question: 'Qual política Route 53 permite retornar múltiplos IPs válidos com health check em cada um?',
      context: 'Aplicação precisa de DNS-level load balancing simples sem ELB.',
      options: [
        { label: 'A', text: 'Simple routing (retorna múltiplos IPs mas sem health check)' },
        { label: 'B', text: 'Multivalue answer routing' },
        { label: 'C', text: 'Geoproximity routing' },
        { label: 'D', text: 'Latency-based routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Multivalue answer routing retorna até 8 IPs saudáveis aleatoriamente (checados por health checks). Cliente tenta cada IP até conectar. Simples balanceamento DNS. NÃO substitui ELB (não tem sessão persistente, balanceamento inteligente). Opção A: Simple retorna todos IPs mas sem health check (pode retornar IP down).',
      relatedService: 'route53'
    },
    {
      id: 6,
      topic: 'route53',
      question: 'Uma empresa precisa direcionar usuários do Brasil para us-east-1 e da Europa para eu-west-1, independente de latência. Qual política usar?',
      context: 'Requisito regulatório de soberania de dados por região.',
      options: [
        { label: 'A', text: 'Latency-based routing' },
        { label: 'B', text: 'Geolocation routing' },
        { label: 'C', text: 'Weighted routing' },
        { label: 'D', text: 'Simple routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Geolocation routing roteia baseado em localização geográfica do usuário (país, continente). Garante que usuários de região específica sempre vão para endpoint definido. Ideal para conformidade legal, conteúdo localizado. Opção A: Latency escolhe por performance. Opção C: Weighted distribui percentual. Configurar: default location como fallback.',
      relatedService: 'route53'
    },
    {
      id: 7,
      topic: 'route53',
      question: 'Qual tipo de record Route 53 aponta para recursos AWS (ALB, CloudFront, S3) sem custo por query DNS?',
      context: 'Reduzir custos de DNS queries mensais.',
      options: [
        { label: 'A', text: 'CNAME record' },
        { label: 'B', text: 'A record padrão' },
        { label: 'C', text: 'Alias record' },
        { label: 'D', text: 'MX record' }
      ],
      correctAnswer: 'C',
      explanation: 'Alias record é tipo especial AWS que aponta para recursos AWS (ALB, CloudFront, S3, API Gateway). Vantagens: 1) Sem custo por query, 2) Funciona no apex (example.com), 3) Health check automático do target. CNAME não funciona em apex e tem custo. Use Alias sempre que possível para recursos AWS.',
      relatedService: 'route53'
    },
    {
      id: 8,
      topic: 'route53',
      question: 'Em Geoproximity routing, o que o parâmetro "bias" controla?',
      context: 'Empresa quer expandir área de cobertura de us-east-1.',
      options: [
        { label: 'A', text: 'Latência mínima aceitável' },
        { label: 'B', text: 'Peso da distribuição de tráfego' },
        { label: 'C', text: 'Expansão ou redução da área geográfica de um recurso' },
        { label: 'D', text: 'TTL do registro DNS' }
      ],
      correctAnswer: 'C',
      explanation: 'Geoproximity routing com bias: bias positivo (+1 a +99) expande área geográfica do recurso, atraindo mais usuários. Bias negativo (-1 a -99) reduz área. Baseado em coordenadas (latitude/longitude) ou região AWS. Útil para migração gradual de tráfego geograficamente. Diferente de Geolocation (que usa fronteiras políticas).',
      relatedService: 'route53'
    },
    {
      id: 9,
      topic: 'route53',
      question: 'Qual TTL (Time To Live) é recomendado para registro DNS usado em failover?',
      context: 'Minimizar tempo de propagação durante disaster recovery.',
      options: [
        { label: 'A', text: 'TTL alto (86400s = 24h) para reduzir custos' },
        { label: 'B', text: 'TTL baixo (60s) para failover rápido' },
        { label: 'C', text: 'TTL não afeta failover' },
        { label: 'D', text: 'TTL infinito' }
      ],
      correctAnswer: 'B',
      explanation: 'TTL baixo (60-300s) acelera propagação de mudanças DNS durante failover. Resolvers cacheiam por menos tempo, pegam nova resposta (secondary endpoint) mais rápido. Trade-off: mais queries ao Route 53 = custo ligeiramente maior. TTL alto atrasa failover pois clientes usam cache antigo. Balance custo vs RTO.',
      relatedService: 'route53'
    },
    {
      id: 10,
      topic: 'route53',
      question: 'Route 53 Health Check pode monitorar qual métrica do CloudWatch?',
      context: 'Empresa quer failover baseado em métrica customizada (ex: taxa de erro 5xx).',
      options: [
        { label: 'A', text: 'Apenas métricas de EC2' },
        { label: 'B', text: 'Qualquer CloudWatch Alarm' },
        { label: 'C', text: 'Route 53 não integra com CloudWatch' },
        { label: 'D', text: 'Apenas métricas de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Health Check pode monitorar CloudWatch Alarm, permitindo failover baseado em qualquer métrica: taxa de erro 5xx, CPU, custom metrics, Lambda errors. Crie alarm no CloudWatch, depois health check do tipo "CloudWatch Alarm". Poderoso para DR avançado baseado em saúde real da aplicação, não apenas conectividade.',
      relatedService: 'route53'
    },
    {
      id: 11,
      topic: 'route53',
      question: 'Quantas falhas consecutivas são necessárias (padrão) para health check marcar endpoint como unhealthy?',
      context: 'Configurando sensibilidade de detecção de falhas.',
      options: [
        { label: 'A', text: '1 falha' },
        { label: 'B', text: '2 falhas' },
        { label: 'C', text: '3 falhas' },
        { label: 'D', text: '5 falhas' }
      ],
      correctAnswer: 'C',
      explanation: 'Padrão: 3 falhas consecutivas = unhealthy. Configurável (threshold) entre 1-10. Health check roda a cada 30s (padrão) ou 10s (fast). Total: 90s até detectar falha (3 x 30s). Para RTO baixo: fast interval (10s) + threshold baixo (2) = 20s detecção. Mais sensível = risco de false positives.',
      relatedService: 'route53'
    },
    {
      id: 12,
      topic: 'route53',
      question: 'Private Hosted Zone do Route 53 resolve nomes DNS onde?',
      context: 'Aplicação interna precisa de DNS privado.',
      options: [
        { label: 'A', text: 'Internet pública' },
        { label: 'B', text: 'Apenas dentro de VPCs associadas' },
        { label: 'C', text: 'Apenas em instâncias EC2' },
        { label: 'D', text: 'Apenas com VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Private Hosted Zone resolve nomes DNS apenas dentro de VPCs associadas (pode associar múltiplas VPCs, inclusive cross-account). Não acessível pela internet. Use para: internal APIs (api.internal), microservices, RDS endpoints customizados. Requisito: enableDnsHostnames e enableDnsSupport na VPC.',
      relatedService: 'route53'
    },
    {
      id: 13,
      topic: 'route53',
      question: 'Qual política NÃO requer health check obrigatório?',
      context: 'Cenário simples sem necessidade de monitoramento.',
      options: [
        { label: 'A', text: 'Failover routing' },
        { label: 'B', text: 'Simple routing' },
        { label: 'C', text: 'Multivalue answer routing' },
        { label: 'D', text: 'Latency-based routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Simple routing: policy mais básica, retorna um ou múltiplos IPs, SEM health check (não opcional). Use apenas para endpoints altamente disponíveis. Outras políticas: health check é opcional mas recomendado (Weighted, Latency) ou obrigatório (Failover primary). Multivalue requer health check para funcionar corretamente.',
      relatedService: 'route53'
    },
    {
      id: 14,
      topic: 'route53',
      question: 'Como implementar DR ativo-ativo com Route 53?',
      context: 'Ambas regiões recebem tráfego simultaneamente.',
      options: [
        { label: 'A', text: 'Failover routing' },
        { label: 'B', text: 'Latency-based routing com health checks em ambas regiões' },
        { label: 'C', text: 'Simple routing' },
        { label: 'D', text: 'Geolocation routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Ativo-ativo: ambos endpoints recebem tráfego. Latency-based routing distribui automaticamente baseado em latência. Se região falha (health check unhealthy), tráfego vai 100% para outra. Alternativas: Weighted routing (controle percentual) ou Geoproximity. Opção A: Failover é ativo-passivo. Opção C: Simple não tem health check.',
      relatedService: 'route53'
    },
    {
      id: 15,
      topic: 'route53',
      question: 'Route 53 Resolver Endpoint permite?',
      context: 'Integrar DNS on-premises com AWS.',
      options: [
        { label: 'A', text: 'Apenas queries da AWS para on-premises' },
        { label: 'B', text: 'Queries bidirecionais: AWS↔on-premises via Inbound/Outbound endpoints' },
        { label: 'C', text: 'Route 53 não integra com DNS on-premises' },
        { label: 'D', text: 'Apenas para Public Hosted Zones' }
      ],
      correctAnswer: 'B',
      explanation: 'Resolver Endpoints: Inbound (on-premises query AWS Private Hosted Zones) e Outbound (AWS query DNS on-premises via forwarding rules). Requer VPN/Direct Connect. Use case: workloads híbridas resolvendo nomes internos em ambos ambientes. Exemplo: ec2 query db.onprem.internal ou onprem server query api.vpc.internal.',
      relatedService: 'route53'
    },
    {
      id: 16,
      topic: 'route53',
      question: 'Qual protocolo Route 53 Health Check NÃO suporta?',
      context: 'Planejando monitoramento de diferentes serviços.',
      options: [
        { label: 'A', text: 'HTTP' },
        { label: 'B', text: 'HTTPS' },
        { label: 'C', text: 'TCP' },
        { label: 'D', text: 'UDP' }
      ],
      correctAnswer: 'D',
      explanation: 'Health Check suporta: HTTP, HTTPS (port 80/443 ou custom), TCP (qualquer porta). NÃO suporta UDP, ICMP ping, FTP. Para UDP: use CloudWatch Alarm baseado em métrica customizada e associe ao health check. Health check pode verificar string específica na resposta HTTP (ex: "OK").',
      relatedService: 'route53'
    },
    {
      id: 17,
      topic: 'route53',
      question: 'Calculated Health Check permite?',
      context: 'Monitoramento complexo de múltiplos endpoints.',
      options: [
        { label: 'A', text: 'Apenas monitorar um endpoint' },
        { label: 'B', text: 'Combinar status de múltiplos health checks (AND/OR logic)' },
        { label: 'C', text: 'Route 53 não tem calculated health checks' },
        { label: 'D', text: 'Apenas para CloudWatch' }
      ],
      correctAnswer: 'B',
      explanation: 'Calculated Health Check monitora múltiplos child health checks e avalia status combinado. Configure: número mínimo de healthy children (ex: 2 de 3). Use case: aplicação com múltiplos componentes (app, DB, cache) - só healthy se TODOS OK. Ou: global failover - secondary só ativo se PRIMARY E health check de DR passarem.',
      relatedService: 'route53'
    },
    {
      id: 18,
      topic: 'route53',
      question: 'Qual prática reduz custo de queries DNS no Route 53?',
      context: 'Otimizar custos de aplicação de alto tráfego.',
      options: [
        { label: 'A', text: 'Usar CNAME em vez de Alias' },
        { label: 'B', text: 'Usar Alias records para recursos AWS' },
        { label: 'C', text: 'TTL mais baixo' },
        { label: 'D', text: 'Mais health checks' }
      ],
      correctAnswer: 'B',
      explanation: 'Alias records para recursos AWS: SEM custo por query (vs $0.40 por milhão para records padrão). TTL alto reduz queries (clients cacheiam mais). Opção A: CNAME TEM custo. Opção C: TTL baixo aumenta queries. Opção D: Health checks tem custo ($0.50/mês cada). Outras otimizações: consolidar hosted zones, usar Private HZ para interno.',
      relatedService: 'route53'
    },
    {
      id: 19,
      topic: 'route53',
      question: 'DNSSEC no Route 53 protege contra qual ameaça?',
      context: 'Implementar segurança adicional em DNS crítico.',
      options: [
        { label: 'A', text: 'DDoS attacks' },
        { label: 'B', text: 'DNS spoofing/cache poisoning' },
        { label: 'C', text: 'SQL injection' },
        { label: 'D', text: 'Slow HTTP attacks' }
      ],
      correctAnswer: 'B',
      explanation: 'DNSSEC (DNS Security Extensions) adiciona assinaturas criptográficas às respostas DNS, garantindo autenticidade e integridade. Protege contra DNS spoofing (respostas falsas), cache poisoning (contaminar resolver cache). NÃO protege confidencialidade (não criptografa queries). Route 53 suporta DNSSEC signing e validation. Importante para banking, gov, health.',
      relatedService: 'route53'
    },
    {
      id: 20,
      topic: 'route53',
      question: 'Uma aplicação global precisa migrar gradualmente de us-east-1 para us-west-2. Qual estratégia Route 53 é mais segura?',
      context: 'Rollout controlado com rollback rápido se necessário.',
      options: [
        { label: 'A', text: 'Mudar todos IPs de uma vez (big bang)' },
        { label: 'B', text: 'Weighted routing: iniciar 5% us-west-2, aumentar gradualmente monitorando métricas' },
        { label: 'C', text: 'Failover routing' },
        { label: 'D', text: 'Simple routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Weighted routing permite migração gradual (blue-green deployment): semana 1: 95% us-east-1, 5% us-west-2. Monitore errors, latência. Sem problemas: semana 2: 50/50. Final: 100% us-west-2. Rollback: ajustar pesos. TTL baixo acelera mudanças. Opção A: arriscado. C/D: não permitem controle percentual. Combine com health checks para segurança extra.',
      relatedService: 'route53'
    },
    {
      id: 41,
      topic: 'route53',
      question: 'Uma aplicação usa API Gateway regional em múltiplas regiões. Como configurar domínio customizado global com failover?',
      context: 'api.exemplo.com deve rotear para API Gateway mais próximo com fallback.',
      options: [
        { label: 'A', text: 'API Gateway não suporta domínio customizado' },
        { label: 'B', text: 'Latency-based routing com Alias records apontando para cada API Gateway regional + health checks' },
        { label: 'C', text: 'Apenas CNAME' },
        { label: 'D', text: 'Simple routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Configuração: 1) Certificado ACM em cada região, 2) Custom domain no API Gateway por região, 3) Alias record (sem custo) apontando para API Gateway endpoint, 4) Latency-based routing + health checks. Usuário vai para menor latência; se falhar, próxima região. Alternativa: CloudFront na frente com múltiplas origens.',
      relatedService: 'route53'
    },
    {
      id: 42,
      topic: 'route53',
      question: 'Qual recurso Route 53 permite associar VPCs de contas AWS diferentes a uma Private Hosted Zone?',
      context: 'Multi-account architecture compartilhando DNS interno.',
      options: [
        { label: 'A', text: 'VPC Peering' },
        { label: 'B', text: 'AWS RAM (Resource Access Manager)' },
        { label: 'C', text: 'Autorização direta via CLI/API' },
        { label: 'D', text: 'Não é possível cross-account' }
      ],
      correctAnswer: 'C',
      explanation: 'Cross-account PHZ association: 1) Conta A (dona da PHZ) cria autorização via CLI/API especificando conta B, 2) Conta B aceita e associa VPC. Não usa RAM. Use case: organização com conta central de DNS, múltiplas contas de workload. Todas resolvem nomes internos da mesma PHZ. Também: Transit Gateway + Route 53 Resolver.',
      relatedService: 'route53'
    },
    {
      id: 43,
      topic: 'route53',
      question: 'Health check pode monitorar endpoint dentro de VPC privada sem IP público?',
      context: 'Backend interno precisa de health check para failover.',
      options: [
        { label: 'A', text: 'Não, health check só monitora IPs públicos' },
        { label: 'B', text: 'Sim, via CloudWatch Alarm baseado em métricas do ALB/Target Group interno' },
        { label: 'C', text: 'Apenas com VPN' },
        { label: 'D', text: 'Health check acessa diretamente recursos privados' }
      ],
      correctAnswer: 'B',
      explanation: 'Health check Route 53 fica na internet, não acessa recursos privados diretamente. Solução: CloudWatch Alarm monitora métricas internas (ALB HealthyHostCount, custom metrics) → Health check monitora o alarm. Se alarm = ALARM state, health check = unhealthy. Indireto mas eficaz para resources privados.',
      relatedService: 'route53'
    },
    {
      id: 44,
      topic: 'route53',
      question: 'Uma migração de DNS externo para Route 53 precisa ser seamless. Qual estratégia minimiza risco?',
      context: 'Domínio em produção com milhões de usuários.',
      options: [
        { label: 'A', text: 'Mudar NS records no registrar imediatamente' },
        { label: 'B', text: 'Baixar TTL para 300s, replicar records no Route 53, testar, aguardar TTL expirar, então mudar NS' },
        { label: 'C', text: 'Deletar DNS antigo primeiro' },
        { label: 'D', text: 'Migrar durante horário de pico' }
      ],
      correctAnswer: 'B',
      explanation: 'Migração DNS segura: 1) Semana 1: baixar TTL atual para 5min (propaga cache rapidamente), 2) Criar Hosted Zone no Route 53, copiar todos records exatos, 3) Testar nameservers Route 53 diretamente, 4) Validar por dias, 5) Mudar NS no registrar (24-48h propagação), 6) Monitorar, 7) Após semana: aumentar TTL. NUNCA deletar DNS antigo antes de confirmar.',
      relatedService: 'route53'
    },
    {
      id: 45,
      topic: 'route53',
      question: 'Qual tipo de registro DNS retorna texto livre, usado para verificações de domínio?',
      context: 'Google Workspace precisa verificar ownership do domínio.',
      options: [
        { label: 'A', text: 'A record' },
        { label: 'B', text: 'CNAME' },
        { label: 'C', text: 'TXT record' },
        { label: 'D', text: 'MX record' }
      ],
      correctAnswer: 'C',
      explanation: 'TXT record: armazena texto arbitrário. Use cases: 1) Domain verification (Google, Microsoft), 2) SPF (anti-spam email), 3) DKIM (assinaturas email), 4) DMARC (política email), 5) Site verification tokens. Pode ter múltiplos TXT records no mesmo nome. Formato: "google-site-verification=xxxxx" ou "v=spf1 include:_spf.google.com ~all".',
      relatedService: 'route53'
    },
    {
      id: 46,
      topic: 'route53',
      question: 'MX record com priority 10 e outro com priority 20. Como servidores de email usam?',
      context: 'Configurar email redundante.',
      options: [
        { label: 'A', text: 'Priority menor = maior prioridade; tenta 10 primeiro, 20 se falhar' },
        { label: 'B', text: 'Priority maior = maior prioridade' },
        { label: 'C', text: 'Aleatório' },
        { label: 'D', text: 'Load balancing 50/50' }
      ],
      correctAnswer: 'A',
      explanation: 'MX priority: MENOR número = MAIOR prioridade. Mail server tenta priority 10 primeiro; se falhar/timeout, tenta 20. Mesma priority = load balancing aleatório. Exemplo: 10 mail1.exemplo.com, 20 mail2.exemplo.com (backup). Empresas: múltiplos MX com priorities diferentes para redundância. Google Workspace: 5 MX records priorities 1,5,5,10,10.',
      relatedService: 'route53'
    },
    {
      id: 47,
      topic: 'route53',
      question: 'Route 53 Application Recovery Controller permite?',
      context: 'Controle centralizado de failover multi-aplicação.',
      options: [
        { label: 'A', text: 'Apenas monitoring' },
        { label: 'B', text: 'Readiness checks, routing control e safeguards para DR coordenado' },
        { label: 'C', text: 'Route 53 não tem Recovery Controller' },
        { label: 'D', text: 'Apenas para EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'ARC (Application Recovery Controller): 1) Readiness checks (verifica recursos DR estão prontos), 2) Routing controls (muda tráfego entre células/regiões via API), 3) Safety rules (previne mudanças perigosas simultâneas). Orquestra DR de múltiplas aplicações. Usa cluster multi-região altamente disponível. Integra com Route 53 health checks.',
      relatedService: 'route53'
    },
    {
      id: 48,
      topic: 'route53',
      question: 'Uma empresa precisa rotear tráfego baseado em subnet IP do cliente (mais específico que país). Qual recurso?',
      context: 'ISPs específicos para endpoints diferentes.',
      options: [
        { label: 'A', text: 'Geolocation routing' },
        { label: 'B', text: 'CIDR-based routing (IP-based routing)' },
        { label: 'C', text: 'Latency-based routing' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'IP-based routing (CIDR): roteia baseado em CIDR blocks específicos. Configure: CIDR location (203.0.113.0/24 → endpoint-A). Mais granular que geolocation. Use case: ISPs específicos, clientes corporativos com IPs fixos, CDN peering arrangements. Requer EDNS0 Client Subnet support do resolver para precisão.',
      relatedService: 'route53'
    },
    {
      id: 49,
      topic: 'route53',
      question: 'Route 53 cobra por qual métrica em Hosted Zones?',
      context: 'Estimar custos mensais de DNS.',
      options: [
        { label: 'A', text: 'Apenas por Hosted Zone ($0.50/mês cada)' },
        { label: 'B', text: 'Hosted Zone + número de queries (exceto Alias para recursos AWS)' },
        { label: 'C', text: 'Apenas por GB de dados' },
        { label: 'D', text: 'Sem custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Custos Route 53: 1) $0.50/mês por Hosted Zone, 2) $0.40 por milhão de queries (Standard), $0.60 (Latency/Geo/etc), 3) Health checks $0.50/mês cada, 4) Traffic Flow $50/mês por policy record. Alias para AWS resources: SEM custo por query. Otimização: consolidar zones, usar Alias, aumentar TTL.',
      relatedService: 'route53'
    },
    {
      id: 50,
      topic: 'route53',
      question: 'AAAA record é usado para?',
      context: 'Suportar protocolo moderno da internet.',
      options: [
        { label: 'A', text: 'IPv4 addresses' },
        { label: 'B', text: 'IPv6 addresses (128-bit)' },
        { label: 'C', text: 'Email routing' },
        { label: 'D', text: 'Certificate validation' }
      ],
      correctAnswer: 'B',
      explanation: 'AAAA record: mapeia domain para IPv6 address (2001:0db8:85a3::8a2e:0370:7334). A record = IPv4 (32-bit), AAAA = IPv6 (128-bit). Dual-stack: criar ambos A e AAAA para mesmo domain. Clients IPv6-capable preferem AAAA. Alias AAAA: aponta para CloudFront, ALB com IPv6. IPv6 AWS: VPCs suportam dual-stack.',
      relatedService: 'route53'
    },
    {
      id: 51,
      topic: 'route53',
      question: 'SOA record em Hosted Zone contém qual informação?',
      context: 'Understanding DNS zone configuration.',
      options: [
        { label: 'A', text: 'SSL certificates' },
        { label: 'B', text: 'Primary nameserver, admin email, serial number, refresh/retry timers' },
        { label: 'C', text: 'Lista de IPs do load balancer' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'SOA (Start of Authority): record obrigatório em toda zone. Contém: 1) Primary nameserver (autoritativo), 2) Admin email (formato: admin.exemplo.com = admin@exemplo.com), 3) Serial (versão da zone), 4) Refresh/Retry/Expire timers (slave zones), 5) Negative TTL. Route 53 gerencia SOA automaticamente. Consulte: "dig SOA exemplo.com".',
      relatedService: 'route53'
    },
    {
      id: 52,
      topic: 'route53',
      question: 'NS (Nameserver) records delegam autoridade de subdomínio. Como funciona?',
      context: 'Criar subdomain gerenciado por equipe diferente.',
      options: [
        { label: 'A', text: 'NS records não existem' },
        { label: 'B', text: 'Criar Hosted Zone para subdomain, adicionar NS records no domain pai apontando para nameservers do subdomain' },
        { label: 'C', text: 'Apenas CNAME necessário' },
        { label: 'D', text: 'Subdelegation não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Subdomain delegation: 1) Criar Hosted Zone "api.exemplo.com", 2) Note nameservers (ns-123.awsdns-45.com, etc), 3) Na Hosted Zone pai "exemplo.com", criar NS record: "api.exemplo.com" → lista de nameservers. Agora "api.exemplo.com" é gerenciado independentemente. Use case: equipes autônomas, multi-account, third-party DNS.',
      relatedService: 'route53'
    },
    {
      id: 53,
      topic: 'route53',
      question: 'CAA record especifica quais Certificate Authorities podem emitir certificados para domínio. Benefício?',
      context: 'Prevenir emissão fraudulenta de certificados.',
      options: [
        { label: 'A', text: 'Aumenta velocidade DNS' },
        { label: 'B', text: 'Segurança: apenas CAs listadas podem emitir SSL/TLS certificates' },
        { label: 'C', text: 'Balanceamento de carga' },
        { label: 'D', text: 'CAA não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'CAA (Certification Authority Authorization): especifica quais CAs podem emitir certs. Exemplo: "0 issue amazon.com" permite apenas ACM. Previne: attacker obtendo cert de CA desonesta. CAs verificam CAA antes de emitir. Formato: flag tag value. Opcional mas recomendado para segurança. Subdomains herdam CAA do pai (a menos que override).',
      relatedService: 'route53'
    },
    {
      id: 54,
      topic: 'route53',
      question: 'Uma aplicação global usa CloudFront + Route 53 Latency routing para origins. Como otimizar ainda mais?',
      context: 'Minimizar latência máxima para qualquer usuário.',
      options: [
        { label: 'A', text: 'Configuração já é ótima' },
        { label: 'B', text: 'Adicionar AWS Global Accelerator para anycast IP estático + roteamento AWS backbone' },
        { label: 'C', text: 'Usar apenas EC2' },
        { label: 'D', text: 'Remover CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'Stack completo: Global Accelerator (camada transporte, anycast) → CloudFront (cache HTTP) → Route 53 Latency (escolhe origem) → ALB regional. GA: IPs anycast fixos, tráfego entra na AWS edge mais próxima, rota por backbone AWS. CloudFront: cache de conteúdo. Route 53: escolhe melhor origem. Diferentes camadas OSI, complementares.',
      relatedService: 'route53'
    },
    {
      id: 55,
      topic: 'route53',
      question: 'Route 53 Resolver DNS Firewall protege contra?',
      context: 'Segurança de DNS queries saindo da VPC.',
      options: [
        { label: 'A', text: 'DDoS attacks' },
        { label: 'B', text: 'Queries maliciosas para domínios de malware, phishing, C2 (command and control)' },
        { label: 'C', text: 'SQL injection' },
        { label: 'D', text: 'Port scanning' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS Firewall: filtra queries DNS OUTBOUND de VPCs. Rules: BLOCK/ALLOW/ALERT baseado em domain lists (managed ou custom). Protege contra: malware callbacks, data exfiltration via DNS, acesso a sites maliciosos. Integra com AWS Managed Threat Intelligence. Logs para CloudWatch/S3/Firehose. Defense-in-depth complementando Security Groups.',
      relatedService: 'route53'
    },
    {
      id: 56,
      topic: 'route53',
      question: 'Uma aplicação precisa de consistência total: usuário sempre vai para MESMA região (sessão). Qual política?',
      context: 'Stateful application sem distributed session store.',
      options: [
        { label: 'A', text: 'Route 53 não oferece session affinity (use ALB sticky sessions)' },
        { label: 'B', text: 'Geolocation routing (usuário sempre no mesmo país)' },
        { label: 'C', text: 'Simple routing' },
        { label: 'D', text: 'Weighted routing' }
      ],
      correctAnswer: 'A',
      explanation: 'Route 53 não tem session persistence (DNS stateless). Soluções: 1) ALB sticky sessions (cookie-based), 2) Geolocation (consistência por país mas não usuário específico), 3) Client-side: salvar região escolhida em localStorage, 4) Refatorar app para stateless (DynamoDB session store). Latency/Weighted podem mudar a cada query (TTL expira).',
      relatedService: 'route53'
    },
    {
      id: 57,
      topic: 'route53',
      question: 'Route 53 resolver cache tem qual comportamento padrão?',
      context: 'Understanding DNS caching em VPC.',
      options: [
        { label: 'A', text: 'Não cacheia nada' },
        { label: 'B', text: 'Cacheia responses baseado em TTL do record, melhora performance e reduz queries' },
        { label: 'C', text: 'Cache infinito' },
        { label: 'D', text: 'Apenas para Public Hosted Zones' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53 Resolver (VPC+2 IP, ex: 10.0.0.2) cacheia responses pelo TTL. Benefícios: 1) Queries subsequentes mais rápidas (cache hit), 2) Reduz carga em nameservers autoritativos, 3) Funciona mesmo se upstream DNS temporariamente indisponível. Cache separado por VPC. Para invalidar: aguardar TTL ou usar record com TTL menor.',
      relatedService: 'route53'
    },
    {
      id: 58,
      topic: 'route53',
      question: 'Uma empresa precisa migrar tráfego entre regiões durante janela de manutenção específica. Melhor abordagem?',
      context: 'Manutenção planejada com downtime controlado.',
      options: [
        { label: 'A', text: 'Deletar records manualmente' },
        { label: 'B', text: 'Weighted routing: baixar TTL, peso 0 na região em manutenção, após manutenção restaurar' },
        { label: 'C', text: 'Desligar Route 53' },
        { label: 'D', text: 'Simple routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Manutenção com Weighted: 1) Dias antes: baixar TTL para 60s, 2) Início manutenção: região A peso=0, região B peso=100, 3) Aguardar TTL (60s) - tráfego migra, 4) Realizar manutenção em A, 5) Fim: A=100, B=0, 6) Dias depois: subir TTL. Permite rollback rápido se problemas. Alternativa: ARC routing controls para automação.',
      relatedService: 'route53'
    },
    {
      id: 59,
      topic: 'route53',
      question: 'PTR record (reverse DNS) é usado para?',
      context: 'Email servers verificando remetentes.',
      options: [
        { label: 'A', text: 'Forward DNS lookup' },
        { label: 'B', text: 'Reverse DNS: mapeia IP para hostname (oposto de A record)' },
        { label: 'C', text: 'Load balancing' },
        { label: 'D', text: 'SSL certificates' }
      ],
      correctAnswer: 'B',
      explanation: 'PTR: IP → hostname (reverse de A). Exemplo: 203.0.113.5 → mail.exemplo.com. Uso principal: email (mail servers fazem reverse lookup do IP remetente para verificar autenticidade). Também: logging, security audits. Para criar PTR: necessário controle da range IP (geralmente ISP/AWS). Elastic IP: pode solicitar PTR via support.',
      relatedService: 'route53'
    },
    {
      id: 60,
      topic: 'route53',
      question: 'Qual limite (quota) padrão de records por Hosted Zone?',
      context: 'Planejando aplicação com muitos subdomínios.',
      options: [
        { label: 'A', text: '100 records' },
        { label: 'B', text: '10,000 records' },
        { label: 'C', text: '50,000 records' },
        { label: 'D', text: 'Ilimitado' }
      ],
      correctAnswer: 'B',
      explanation: 'Limite padrão: 10,000 records por Hosted Zone (aumentável via support). Outros limites: 50 Hosted Zones por conta (aumentável), 100 health checks por conta. Large-scale: considerar wildcard records ou subdomain delegation. Alias records não contam múltiplas vezes. Para milhões de subdomínios dinâmicos: considerar Application Load Balancer host-based routing.',
      relatedService: 'route53'
    },
    {
      id: 61,
      topic: 'route53',
      question: 'Uma empresa SaaS usa subdomínios por cliente (cliente1.saas.com). Com 50.000 clientes, qual estratégia Route 53?',
      context: 'Escala massiva de subdomínios dinâmicos.',
      options: [
        { label: 'A', text: 'Criar 50.000 A records individuais' },
        { label: 'B', text: 'Wildcard record (*.saas.com) apontando para ALB que faz host-based routing' },
        { label: 'C', text: 'Route 53 não suporta essa escala' },
        { label: 'D', text: 'Criar 50.000 Hosted Zones' }
      ],
      correctAnswer: 'B',
      explanation: 'Escala massiva: wildcard (*.saas.com) → ALB. ALB listener rules fazem host-based routing (cliente1.saas.com → target group 1). Ou: wildcard → CloudFront → Lambda@Edge (roteamento dinâmico). Records individuais: impraticável (quota 10k/zone, custo, complexidade). Wildcard: 1 record, infinitos subdomínios. ALB suporta milhares de rules via listener rules + path patterns.',
      relatedService: 'route53'
    },
    {
      id: 62,
      topic: 'route53',
      question: 'Health check monitora HTTPS endpoint com certificado SSL auto-assinado. O que acontece?',
      context: 'Ambiente de teste com certificados não confiáveis.',
      options: [
        { label: 'A', text: 'Health check aceita qualquer certificado' },
        { label: 'B', text: 'Health check falha (requer certificado válido de CA confiável)' },
        { label: 'C', text: 'Apenas HTTP funciona' },
        { label: 'D', text: 'Configurar bypass de SSL' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53 health check HTTPS valida certificado SSL (cadeia de confiança). Certificado auto-assinado = falha. Soluções: 1) ACM (gratuito, auto-renovável), 2) Let\'s Encrypt, 3) HTTP health check (menos seguro), 4) Health check CloudWatch Alarm (metrics internas). Produção: SEMPRE use certificados válidos. SSL validation previne MITM attacks.',
      relatedService: 'route53'
    },
    {
      id: 63,
      topic: 'route53',
      question: 'Route 53 Traffic Flow Policy Record pode ser aplicado em quantas Hosted Zones?',
      context: 'Reutilizar configuração complexa entre domínios.',
      options: [
        { label: 'A', text: 'Apenas uma Hosted Zone' },
        { label: 'B', text: 'Múltiplas Hosted Zones (policy é template reutilizável)' },
        { label: 'C', text: 'Apenas Public Hosted Zones' },
        { label: 'D', text: 'Traffic Flow não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'Traffic Flow: 1) Criar policy (template visual), 2) Criar policy records em MÚLTIPLAS Hosted Zones. Policy é reutilizável. Use case: mesma lógica de routing (geo+latency+failover) para exemplo.com, exemplo.net, exemplo.org. Custo: $50/mês por policy record (não por policy). Versionamento: alterar policy, aplicar em todos records.',
      relatedService: 'route53'
    },
    {
      id: 64,
      topic: 'route53',
      question: 'Uma aplicação precisa garantir que usuários em países específicos sejam BLOQUEADOS. Como implementar?',
      context: 'Compliance ou sanções internacionais.',
      options: [
        { label: 'A', text: 'Route 53 não bloqueia países' },
        { label: 'B', text: 'Geolocation routing SEM default location (países não configurados não resolvem)' },
        { label: 'C', text: 'Security Groups' },
        { label: 'D', text: 'IAM Policies' }
      ],
      correctAnswer: 'B',
      explanation: 'Geo-blocking via Route 53: configure Geolocation apenas para países permitidos, SEM default location. Países bloqueados recebem NOERROR (sem resposta). Melhor: CloudFront Geographic Restrictions (WAF) - bloqueia HTTP. Ou: WAF Geo Match rules. Route 53 geo-blocking: limitado (DNS cache pode burlar), mas adiciona camada. Defense-in-depth: DNS + CloudFront + WAF.',
      relatedService: 'route53'
    },
    {
      id: 65,
      topic: 'route53',
      question: 'Qual intervalo de atualização para propagação de mudanças em NS records no registrar?',
      context: 'Mudando nameservers após migração.',
      options: [
        { label: 'A', text: 'Instantâneo' },
        { label: 'B', text: '24-48 horas (depende do TTL do TLD)' },
        { label: 'C', text: '7 dias' },
        { label: 'D', text: '5 minutos' }
      ],
      correctAnswer: 'B',
      explanation: 'NS records no registrar: TTL do TLD (Top-Level Domain) controla propagação. Típico: 24-48h. Durante esse período: alguns resolvers usam NS antigos, outros novos. Mitigação: manter DNS antigo funcionando paralelo por 1 semana. Dentro de Hosted Zone: mudanças propagam rapidamente (baseado em TTL dos records). NS changes são mais lentos que A/CNAME changes.',
      relatedService: 'route53'
    },
    {
      id: 66,
      topic: 'route53',
      question: 'Route 53 Resolver Endpoint (Inbound) permite on-premises resolver queries para?',
      context: 'Servidores on-premises precisam acessar nomes AWS internos.',
      options: [
        { label: 'A', text: 'Apenas internet' },
        { label: 'B', text: 'Private Hosted Zones da AWS via IPs do inbound endpoint' },
        { label: 'C', text: 'Apenas Public Hosted Zones' },
        { label: 'D', text: 'Resolver não tem inbound' }
      ],
      correctAnswer: 'B',
      explanation: 'Inbound Endpoint: cria IPs (ENIs) em VPC que recebem queries DNS de on-premises. On-premises configura conditional forwarders: *.internal → IPs do inbound endpoint. Resolve Private Hosted Zones. Requer: VPN/Direct Connect. Use case: servidores on-prem acessando api.interno.aws, db.vpc.aws. Outbound: oposto (AWS → on-premises).',
      relatedService: 'route53'
    },
    {
      id: 67,
      topic: 'route53',
      question: 'Uma aplicação usa weighted routing 50/50 entre duas regiões. Uma região tem capacidade 3x maior. Como otimizar custos?',
      context: 'Balancear carga proporcionalmente à capacidade.',
      options: [
        { label: 'A', text: 'Manter 50/50 (igual)' },
        { label: 'B', text: 'Ajustar pesos: região maior peso 75, região menor peso 25' },
        { label: 'C', text: 'Usar apenas região grande' },
        { label: 'D', text: 'Failover routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Weighted routing: pesos não precisam ser iguais. Ajuste baseado em capacidade: Region A (60 instâncias) peso=75, Region B (20 instâncias) peso=25. Distribui carga proporcionalmente, otimiza utilização. Peso 0 = desliga. Pesos relativos (75/25 = 75%, 25%). Monitore métricas (CPU, latência) e ajuste dinamicamente. Combine com health checks para failover se saturar.',
      relatedService: 'route53'
    },
    {
      id: 68,
      topic: 'route53',
      question: 'DNSSEC signing keys são gerenciadas por quem no Route 53?',
      context: 'Responsabilidade de key management.',
      options: [
        { label: 'A', text: 'Totalmente gerenciado pela AWS (KSK armazenado em KMS)' },
        { label: 'B', text: 'Cliente deve gerar e rotacionar manualmente' },
        { label: 'C', text: 'DNSSEC não está disponível' },
        { label: 'D', text: 'Apenas para Private Hosted Zones' }
      ],
      correctAnswer: 'A',
      explanation: 'Route 53 DNSSEC: AWS gerencia completamente. 1) Habilita DNSSEC signing, 2) KSK (Key-Signing Key) em AWS KMS (CMK), 3) ZSK (Zone-Signing Key) gerenciado por Route 53, 4) Rotação automática, 5) Você adiciona DS record no registrar (parent zone). Simplifica operação vs DNSSEC manual. Suporta Public Hosted Zones. Custo adicional mínimo.',
      relatedService: 'route53'
    },
    {
      id: 69,
      topic: 'route53',
      question: 'Health check "Calculated" com 3 child health checks e threshold "2 of 3". Quando parent fica healthy?',
      context: 'Lógica de health check agregado.',
      options: [
        { label: 'A', text: 'Todos 3 children healthy' },
        { label: 'B', text: 'Pelo menos 2 de 3 children healthy' },
        { label: 'C', text: 'Qualquer 1 child healthy' },
        { label: 'D', text: 'Nunca fica healthy' }
      ],
      correctAnswer: 'B',
      explanation: 'Calculated health check: parent healthy se threshold atingido. "2 of 3" = pelo menos 2 children healthy. Configurável: "all", "at least N of M", "any". Use cases: 1) App + DB + Cache (todos devem estar UP), 2) Multi-AZ (2 de 3 AZs UP = healthy), 3) Complex dependencies. Combina: AND/OR logic. Pode aninhar calculated checks (multi-level).',
      relatedService: 'route53'
    },
    {
      id: 70,
      topic: 'route53',
      question: 'Route 53 pode ser usado como serviço de registro de domínios (Domain Registrar)?',
      context: 'Consolidar DNS e registro no mesmo serviço.',
      options: [
        { label: 'A', text: 'Não, apenas DNS hosting' },
        { label: 'B', text: 'Sim, suporta centenas de TLDs (.com, .net, .org, .io, etc)' },
        { label: 'C', text: 'Apenas .com' },
        { label: 'D', text: 'Apenas transfers, não novos registros' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53 Domain Registration: registrar + DNS integrado. Suporta: .com, .net, .org, .io, .dev, country codes, etc. Benefícios: 1) Auto-cria Hosted Zone, 2) Auto-renew, 3) Lock de domínio, 4) Privacy protection (WHOIS), 5) Transferências. Pricing: varia por TLD ($11-$50/ano típico). Alternativa: registrar em outro (GoDaddy) + hospedar DNS em Route 53.',
      relatedService: 'route53'
    },
    {
      id: 71,
      topic: 'route53',
      question: 'Uma API precisa responder de diferentes origins baseado em header customizado "X-Client-Type". Route 53 consegue?',
      context: 'Routing baseado em headers HTTP.',
      options: [
        { label: 'A', text: 'Sim, Route 53 analisa headers HTTP' },
        { label: 'B', text: 'Não, DNS é layer 7 mas não vê headers HTTP (use ALB/CloudFront)' },
        { label: 'C', text: 'Apenas com Traffic Flow' },
        { label: 'D', text: 'Apenas geolocation' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53: opera em DNS layer (antes de HTTP). NÃO vê: headers, cookies, URL paths, HTTP methods. Vê: source IP (geo), query name. Para routing HTTP-aware: ALB (path/host/header/method routing) ou CloudFront Functions/Lambda@Edge (header-based). Arquitetura: Route 53 (DNS) → CloudFront (cache) → Lambda@Edge (header routing) → origins.',
      relatedService: 'route53'
    },
    {
      id: 72,
      topic: 'route53',
      question: 'Failover routing com Primary unhealthy há 10 minutos, mas usuários ainda acessam Primary. Causa provável?',
      context: 'Troubleshooting failover lento.',
      options: [
        { label: 'A', text: 'Health check não funciona' },
        { label: 'B', text: 'TTL alto (ex: 3600s) - resolvers ainda cacheiam resposta antiga' },
        { label: 'C', text: 'Secondary não existe' },
        { label: 'D', text: 'Route 53 está offline' }
      ],
      correctAnswer: 'B',
      explanation: 'Failover lento: TTL alto é causa comum. Fluxo: 1) Primary unhealthy (5min detection), 2) Route 53 começa retornar Secondary, 3) Resolvers cacheiam resposta antiga por TTL (ex: 1h). Usuários acessam cache até expirar. Solução: TTL baixo (60-300s) para registros críticos. Pré-mudança: baixar TTL 24h antes. Trade-off: mais queries = maior custo.',
      relatedService: 'route53'
    },
    {
      id: 73,
      topic: 'route53',
      question: 'Route 53 Hosted Zone pode ser exportada/importada entre contas AWS?',
      context: 'Migração de conta ou backup de configuração.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Sim, via CLI/SDK (list-resource-record-sets → change-resource-record-sets)' },
        { label: 'C', text: 'Apenas via console' },
        { label: 'D', text: 'Apenas com AWS Support' }
      ],
      correctAnswer: 'B',
      explanation: 'Migração zone: 1) aws route53 list-resource-record-sets (export JSON), 2) Criar Hosted Zone na conta destino, 3) aws route53 change-resource-record-sets (import). Ferramentas: cli53, terraform. Use case: multi-account architecture, backup, disaster recovery. Também: Associate/Disassociate VPC pode mover Private HZ association cross-account.',
      relatedService: 'route53'
    },
    {
      id: 74,
      topic: 'route53',
      question: 'Uma aplicação precisa de diferentes endpoints para mobile vs desktop. Como implementar camada DNS?',
      context: 'User-Agent based routing.',
      options: [
        { label: 'A', text: 'Route 53 detecta User-Agent' },
        { label: 'B', text: 'Impossível no DNS layer (usar CloudFront Functions/Lambda@Edge)' },
        { label: 'C', text: 'Geolocation routing' },
        { label: 'D', text: 'Weighted routing' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS não vê User-Agent (HTTP header). Soluções: 1) CloudFront Functions (inspect User-Agent, redirect origin), 2) Lambda@Edge (mais complexo), 3) ALB (não suporta User-Agent routing nativamente, precisa custom headers), 4) Nomes diferentes: api-mobile.exemplo.com vs api-desktop.exemplo.com (apps hardcode). Ou: single API adaptável que detecta User-Agent.',
      relatedService: 'route53'
    },
    {
      id: 75,
      topic: 'route53',
      question: 'SRV record é usado para?',
      context: 'Service discovery em aplicações distribuídas.',
      options: [
        { label: 'A', text: 'Email routing' },
        { label: 'B', text: 'Especificar hostname, porta e prioridade para serviços (ex: LDAP, SIP, XMPP)' },
        { label: 'C', text: 'SSL certificates' },
        { label: 'D', text: 'Load balancing HTTP' }
      ],
      correctAnswer: 'B',
      explanation: 'SRV (Service Record): formato "_service._proto.name TTL class SRV priority weight port target". Exemplo: _ldap._tcp.exemplo.com SRV 10 60 389 ldap1.exemplo.com. Campos: priority (failover), weight (load balance), port, target. Use case: service discovery, Kubernetes, VoIP. Menos comum hoje (substituído por service mesh, Consul), mas padrão em protocolos legados.',
      relatedService: 'route53'
    },
    {
      id: 76,
      topic: 'route53',
      question: 'Route 53 suporta EDNS Client Subnet (ECS). Benefício?',
      context: 'Melhorar precisão de geolocation routing.',
      options: [
        { label: 'A', text: 'Reduz latência' },
        { label: 'B', text: 'Revela subnet do cliente final (não apenas resolver), melhora geolocation/geoproximity' },
        { label: 'C', text: 'Criptografa queries' },
        { label: 'D', text: 'ECS não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'ECS (EDNS Client Subnet): resolver inclui subnet do client real na query DNS. Sem ECS: Route 53 vê IP do resolver (pode ser longe do client). Com ECS: vê subnet do client (mais preciso para geo). Google DNS, CloudFlare suportam ECS. Melhora: CDN, Geolocation. Privacy concern: revela localização. Route 53 suporta ECS automaticamente.',
      relatedService: 'route53'
    },
    {
      id: 77,
      topic: 'route53',
      question: 'Uma empresa precisa rotear tráfego entre on-premises e AWS durante migração. Estratégia Route 53?',
      context: 'Migração híbrida cloud com rollback capability.',
      options: [
        { label: 'A', text: 'Mudar DNS de uma vez (big bang)' },
        { label: 'B', text: 'Weighted routing: iniciar 5% AWS, aumentar gradualmente baseado em métricas' },
        { label: 'C', text: 'Route 53 não suporta on-premises' },
        { label: 'D', text: 'Apenas VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Migração híbrida: Weighted routing com IPs públicos (on-prem) e Alias/IPs (AWS). Semana 1: 95% on-prem, 5% AWS. Monitore: errors, latência, costs. Incremente: 10%, 25%, 50%, 75%, 100%. Rollback: ajustar pesos. TTL baixo (60s). Também: Geolocation (migrar região por região) ou blue-green (2 ambientes completos). Database: DMS para replicação contínua.',
      relatedService: 'route53'
    },
    {
      id: 78,
      topic: 'route53',
      question: 'Route 53 Resolver DNS Firewall rule action "BLOCK" retorna qual resposta?',
      context: 'Comportamento de queries bloqueadas.',
      options: [
        { label: 'A', text: 'Timeout' },
        { label: 'B', text: 'NXDOMAIN (domain não existe) ou NODATA (configurable)' },
        { label: 'C', text: 'Redirect para página de aviso' },
        { label: 'D', text: 'Sem resposta' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS Firewall BLOCK: configurable response - NXDOMAIN (não existe) ou NODATA (existe mas sem records). Também: OVERRIDE (retorna IP customizado, ex: walled garden). ALLOW: passa normalmente. ALERT: log mas não bloqueia. Use cases: BLOCK malware domains, OVERRIDE para página educacional "This site blocked". Logs para S3/CloudWatch para análise.',
      relatedService: 'route53'
    },
    {
      id: 79,
      topic: 'route53',
      question: 'Qual a diferença entre Route 53 Resolver Outbound Endpoint e VPC Peering para DNS?',
      context: 'Escolhendo solução de DNS cross-VPC.',
      options: [
        { label: 'A', text: 'São idênticos' },
        { label: 'B', text: 'Outbound Endpoint: forward para IPs externos; VPC Peering: resolve Private HZ de VPCs peered nativamente' },
        { label: 'C', text: 'VPC Peering não afeta DNS' },
        { label: 'D', text: 'Outbound apenas para on-premises' }
      ],
      correctAnswer: 'B',
      explanation: 'VPC Peering + enableDnsResolution: VPCs resolvem Private HZ mutuamente (simples, sem custo adicional). Outbound Endpoint: forward queries para IPs específicos (on-prem, third-party, VPC sem peering). Use cases: Outbound para DNS on-premises via DX/VPN; Peering para VPC-to-VPC simples. Outbound: mais flexível mas tem custo ($0.125/hora/endpoint).',
      relatedService: 'route53'
    },
    {
      id: 80,
      topic: 'route53',
      question: 'Uma aplicação crítica usa Failover routing. Como testar Secondary endpoint sem afetar produção?',
      context: 'DR testing sem downtime.',
      options: [
        { label: 'A', text: 'Desligar Primary em produção' },
        { label: 'B', text: 'Criar test Hosted Zone separada, mudar hosts file local, ou usar "dig @nameserver test-domain.com"' },
        { label: 'C', text: 'Impossível testar' },
        { label: 'D', text: 'Apenas em staging' }
      ],
      correctAnswer: 'B',
      explanation: 'Testar DR sem impacto: 1) Hosted Zone separada (test.exemplo.com) com mesma config, 2) /etc/hosts local override, 3) dig/nslookup especificando nameserver Route 53, 4) Synthetic monitoring (CloudWatch Synthetics, datadog) do secondary. Também: GameDay exercise (force Primary unhealthy via health check string change, monitore failover, restore). NUNCA teste em produção sem plano.',
      relatedService: 'route53'
    },
    {
      id: 81,
      topic: 'route53',
      question: 'Uma empresa precisa rotear APIs públicas e privadas usando mesmo domínio. Como configurar?',
      context: 'api.exemplo.com: público da internet, api.exemplo.com: privado dentro da VPC.',
      options: [
        { label: 'A', text: 'Impossível usar mesmo nome' },
        { label: 'B', text: 'Public Hosted Zone + Private Hosted Zone com mesmo domain (split-horizon DNS)' },
        { label: 'C', text: 'Apenas Public Hosted Zone' },
        { label: 'D', text: 'CNAME records' }
      ],
      correctAnswer: 'B',
      explanation: 'Split-horizon DNS: Public HZ (api.exemplo.com → ALB público) + Private HZ (api.exemplo.com → ALB interno). VPC queries resolvem Private HZ (precedência). Internet resolve Public HZ. Use case: mesma API com backends diferentes (externo/interno), ou domínios internos não expostos publicamente. Private HZ sempre tem precedência em VPC associada.',
      relatedService: 'route53'
    },
    {
      id: 82,
      topic: 'route53',
      question: 'Route 53 health check endpoint está atrás de firewall. Quais IPs devem ser liberados?',
      context: 'Configurar firewall para permitir health checks.',
      options: [
        { label: 'A', text: 'IP fixo da AWS' },
        { label: 'B', text: 'Ranges publicados em ip-ranges.json (service: ROUTE53_HEALTHCHECKS)' },
        { label: 'C', text: 'Qualquer IP' },
        { label: 'D', text: 'Health checks não podem passar por firewall' }
      ],
      correctAnswer: 'B',
      explanation: 'Health checker IPs: publicados em https://ip-ranges.amazonaws.com/ip-ranges.json, filtrar "service": "ROUTE53_HEALTHCHECKS". Checkers distribuídos globalmente (múltiplos IPs). Security Group: criar rules permitindo ranges. Atualização: IPs podem mudar (AWS notifica via SNS). Alternativa: CloudWatch Alarm health check (não precisa inbound access).',
      relatedService: 'route53'
    },
    {
      id: 83,
      topic: 'route53',
      question: 'Qual o impacto de usar query logging em alto volume (1 bilhão queries/mês)?',
      context: 'Estimar custos de observability.',
      options: [
        { label: 'A', text: 'Sem custo adicional' },
        { label: 'B', text: 'CloudWatch Logs ingestion (~$500) + armazenamento pode ser caro - considere exportar para S3' },
        { label: 'C', text: '$10/mês fixo' },
        { label: 'D', text: 'Query logging grátis' }
      ],
      correctAnswer: 'B',
      explanation: 'Query Logging: cada query = 1 log line. 1B queries = ~100GB logs. CloudWatch Logs: $0.50/GB ingestion + $0.03/GB storage = ~$50-500/mês. Otimizações: 1) Export para S3 ($0.023/GB), 2) Retention policy (7-30 dias), 3) Athena/CloudWatch Insights para queries pontuais, 4) Sampling (log apenas %). Para auditoria: necessário. Para debug: pode desabilitar normalmente.',
      relatedService: 'route53'
    },
    {
      id: 84,
      topic: 'route53',
      question: 'Route 53 Application Recovery Controller Zonal Shift permite?',
      context: 'Evacuar tráfego de AZ com problemas.',
      options: [
        { label: 'A', text: 'Apenas DNS routing' },
        { label: 'B', text: 'Desviar tráfego de AZ inteira temporariamente (ex: AZ com degradação)' },
        { label: 'C', text: 'Apenas para EC2' },
        { label: 'D', text: 'Zonal Shift não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'ARC Zonal Shift: afasta tráfego de AZ com problemas (gray failures, degradação) temporariamente. Integra com: ALB, NLB, EIP. Casos: 1) AZ com alta latência, 2) Manutenção AWS, 3) Impairment. Shift pode ser automático (baseado em alarmes) ou manual. Diferente de health checks (endpoint-level) - Zonal Shift é AZ-level. Reduz blast radius.',
      relatedService: 'route53'
    },
    {
      id: 85,
      topic: 'route53',
      question: 'NAPTR record é usado para?',
      context: 'Protocolos de telefonia e ENUM.',
      options: [
        { label: 'A', text: 'Email routing' },
        { label: 'B', text: 'Rewrite rules complexas e ENUM (telefonia VoIP, SIP)' },
        { label: 'C', text: 'Load balancing HTTP' },
        { label: 'D', text: 'SSL certificates' }
      ],
      correctAnswer: 'B',
      explanation: 'NAPTR (Name Authority Pointer): regex-based rewrite rules. Uso principal: ENUM (mapear números telefone para SIP URIs), Dynamic Delegation Discovery (DDDS). Complexo e raro em apps web modernas. Formato: order preference flags service regexp replacement. Se não trabalha com VoIP/telecoms: provavelmente não precisa. SRV records são mais comuns para service discovery.',
      relatedService: 'route53'
    },
    {
      id: 86,
      topic: 'route53',
      question: 'Uma aplicação usa Latency-based routing. Usuário reclama que vai para região longe. Debug?',
      context: 'Troubleshooting latency routing incorreto.',
      options: [
        { label: 'A', text: 'Bug do Route 53' },
        { label: 'B', text: 'VPN/Proxy mascarando localização, ou DNS resolver distante do usuário' },
        { label: 'C', text: 'TTL muito alto' },
        { label: 'D', text: 'Security Groups' }
      ],
      correctAnswer: 'B',
      explanation: 'Latency routing usa IP do DNS resolver (não client final). Problemas: 1) VPN (IP aparece em outro país), 2) Corporate DNS resolver centralizado longe, 3) Google DNS pode resolver de datacenter distante. Debug: 1) dig/nslookup mostrando qual IP Route 53 vê, 2) Verificar se resolver suporta EDNS Client Subnet (melhora precisão). Solução: escolher resolver melhor ou Geoproximity.',
      relatedService: 'route53'
    },
    {
      id: 87,
      topic: 'route53',
      question: 'Route 53 oferece SLA de quantos % de uptime?',
      context: 'Planning service-level agreements.',
      options: [
        { label: 'A', text: '99.9% (three nines)' },
        { label: 'B', text: '100% uptime SLA' },
        { label: 'C', text: '99.99% (four nines)' },
        { label: 'D', text: 'Sem SLA' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53: único serviço AWS com 100% uptime SLA (serviço global crítico). Se downtime: crédito proporcional. Histórico: extremamente confiável (poucos incidents). Por isso é backbone de DR - se Route 53 cair, problema é global. Arquitetura: anycast, múltiplos PoPs, sem single point of failure. Compare: EC2 99.99%, S3 99.9%.',
      relatedService: 'route53'
    },
    {
      id: 88,
      topic: 'route53',
      question: 'Uma aplicação precisa mudar dinamicamente routing baseado em eventos. Como automatizar?',
      context: 'API-driven DNS updates durante incidents.',
      options: [
        { label: 'A', text: 'Mudanças manuais apenas' },
        { label: 'B', text: 'AWS SDK/CLI + Lambda + EventBridge para automação (ex: mudar weighted pesos via API)' },
        { label: 'C', text: 'Route 53 não tem API' },
        { label: 'D', text: 'Apenas console' }
      ],
      correctAnswer: 'B',
      explanation: 'Automação Route 53: API completa (ChangeResourceRecordSets). Use cases: 1) Lambda reage a CloudWatch Alarm, muda pesos, 2) CI/CD ajusta DNS pós-deploy, 3) Runbook automatizado para incidents, 4) ARC Routing Controls (API centralizada). Exemplo: alarm 5xx > threshold → Lambda → weighted routing 0% região problemática. Infrastructure as Code: Terraform, CloudFormation.',
      relatedService: 'route53'
    },
    {
      id: 89,
      topic: 'route53',
      question: 'Qual a diferença entre Route 53 Hosted Zone e Route 53 Resolver?',
      context: 'Entender componentes do serviço.',
      options: [
        { label: 'A', text: 'São idênticos' },
        { label: 'B', text: 'Hosted Zone: armazena DNS records (autoritativo); Resolver: resolve queries DNS (recursive)' },
        { label: 'C', text: 'Hosted Zone apenas para Public, Resolver para Private' },
        { label: 'D', text: 'Resolver não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'Hosted Zone: banco de dados de DNS records (autoritativo para domain). Resolver: serviço que resolve queries (VPC+2, ex: 10.0.0.2) - recursive resolver. HZ responde "sou autoritativo para exemplo.com". Resolver busca: 1) cache local, 2) private HZ, 3) public DNS, 4) forwarding rules. Componentes diferentes mas integrados. Também: Resolver Endpoints (inbound/outbound).',
      relatedService: 'route53'
    },
    {
      id: 90,
      topic: 'route53',
      question: 'Uma empresa usa Route 53 Traffic Policy versionamento. Como rollback se nova versão causa problemas?',
      context: 'Gerenciamento de mudanças em configurações complexas.',
      options: [
        { label: 'A', text: 'Impossível fazer rollback' },
        { label: 'B', text: 'Traffic Policy mantém versões; atualize policy record para versão anterior' },
        { label: 'C', text: 'Deletar tudo e recriar' },
        { label: 'D', text: 'Versionamento não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'Traffic Policy versioning: cada mudança = nova versão (v1, v2, v3). Policy records apontam para versão específica. Rollback: atualizar policy record para versão anterior (segundos). Versões antigas mantidas. Use case: testes A/B (alguns records v2, outros v1), gradual rollout, fast rollback. Best practice: testar nova versão em test domain antes de aplicar em produção.',
      relatedService: 'route53'
    },
    {
      id: 91,
      topic: 'route53',
      question: 'Route 53 pode rotear baseado em ASN (Autonomous System Number)?',
      context: 'Routing para ISPs ou carriers específicos.',
      options: [
        { label: 'A', text: 'Não suporta ASN routing' },
        { label: 'B', text: 'Sim, via IP-based routing (CIDR) mapeando ranges de ASN específico' },
        { label: 'C', text: 'Apenas com BGP' },
        { label: 'D', text: 'ASN não é relevante para DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'ASN routing: não direto, mas via IP-based routing. Mapeie CIDR blocks de ASN específico para endpoint. Use case: CDN peering (ASN do ISP parceiro), carrier-specific routing. Obtenha ranges via whois/RIR databases. Complexo mas possível. Alternativa: trabalhar com ISP para anycast ou BGP announcements (nível rede, não DNS).',
      relatedService: 'route53'
    },
    {
      id: 92,
      topic: 'route53',
      question: 'Uma aplicação precisa de DNS resolution rate > 100k queries/segundo. Route 53 suporta?',
      context: 'Ultra high-scale DNS requirements.',
      options: [
        { label: 'A', text: 'Limite de 1k qps' },
        { label: 'B', text: 'Sim, Route 53 é projetado para milhões de qps (distribuído globalmente)' },
        { label: 'C', text: 'Máximo 10k qps' },
        { label: 'D', text: 'Precisa sharding manual' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53: escala massiva sem sharding. Rede anycast + edge locations (200+) distribuem carga. Suporta milhões qps por conta. Sem throttling em queries públicas. Otimizações: 1) Alias records (sem custo), 2) TTL alto reduz queries, 3) CloudFront na frente (cache reduz DNS queries). Caso DDoS: AWS Shield Standard protege automaticamente. Rate limiting apenas em APIs de gestão (ChangeResourceRecordSets).',
      relatedService: 'route53'
    },
    {
      id: 93,
      topic: 'route53',
      question: 'Qual recurso Route 53 permite compartilhar rules de DNS Firewall entre contas?',
      context: 'Governança centralizada multi-account.',
      options: [
        { label: 'A', text: 'VPC Peering' },
        { label: 'B', text: 'AWS RAM (Resource Access Manager)' },
        { label: 'C', text: 'IAM Policies' },
        { label: 'D', text: 'Sharing não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS Firewall Rules via RAM: conta central cria rules/lists, compartilha com Organization/contas específicas via RAM. Contas associam rules às VPCs. Governança: 1) Security team gerencia blocklists centralmente, 2) Workload accounts aplicam, 3) Updates propagam automaticamente. Também compartilhável via RAM: Resolver Rules (forwarding), Query Logs config.',
      relatedService: 'route53'
    },
    {
      id: 94,
      topic: 'route53',
      question: 'Como implementar canary deployment usando apenas Route 53 sem código de feature flags?',
      context: 'Progressive rollout via DNS routing.',
      options: [
        { label: 'A', text: 'Impossível sem feature flags' },
        { label: 'B', text: 'Weighted routing: 95% prod, 5% canary; aumentar gradualmente monitorando métricas' },
        { label: 'C', text: 'Simple routing' },
        { label: 'D', text: 'Geolocation routing' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS-based canary: weighted routing. Dia 1: 95/5, Dia 2: 90/10, Dia 3: 70/30, Dia 4: 50/50, Dia 5: 0/100. TTL baixo (60s) para mudanças rápidas. Monitore: CloudWatch metrics (errors, latência, business KPIs). Rollback: ajustar pesos. Limitação: não permite targeting específico (user ID, header) - todos usuários podem ir para canary. Para controle fino: feature flags + código.',
      relatedService: 'route53'
    },
    {
      id: 95,
      topic: 'route53',
      question: 'Route 53 Resolver Query Logs podem ser enviados para?',
      context: 'Destinos de logs para análise.',
      options: [
        { label: 'A', text: 'Apenas CloudWatch Logs' },
        { label: 'B', text: 'CloudWatch Logs OU S3 OU Kinesis Data Firehose' },
        { label: 'C', text: 'Apenas S3' },
        { label: 'D', text: 'Query Logs não existem' }
      ],
      correctAnswer: 'B',
      explanation: 'Query Log destinations: 1) CloudWatch Logs (CloudWatch Insights queries), 2) S3 (Athena, cost-effective), 3) Kinesis Firehose (streaming para Elasticsearch, Splunk). Escolha baseada em: volume, análise real-time vs batch, custo. S3+Athena: mais barato para alto volume. CloudWatch: melhor para troubleshooting on-demand. Firehose: SIEM integration.',
      relatedService: 'route53'
    },
    {
      id: 96,
      topic: 'route53',
      question: 'Uma empresa precisa garantir que mudanças DNS sejam auditadas. Qual serviço integrado?',
      context: 'Compliance e auditoria de infraestrutura.',
      options: [
        { label: 'A', text: 'Route 53 não tem auditoria' },
        { label: 'B', text: 'AWS CloudTrail registra todas API calls (ChangeResourceRecordSets, etc)' },
        { label: 'C', text: 'Apenas CloudWatch' },
        { label: 'D', text: 'Manual logging apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail: registra todas API calls Route 53 (quem, quando, o quê). Events: CreateHostedZone, ChangeResourceRecordSets, ChangeTagsForResource. Inclui: IP source, user identity, request parameters. Para compliance: habilitar CloudTrail, S3 bucket encriptado, log validation. Alarmes: EventBridge reage a mudanças críticas (ex: deletar Hosted Zone). Também: AWS Config para compliance rules.',
      relatedService: 'route53'
    },
    {
      id: 97,
      topic: 'route53',
      question: 'Qual política Route 53 oferece melhor controle para disaster recovery multi-região?',
      context: 'Escolher estratégia DR ótima.',
      options: [
        { label: 'A', text: 'Simple routing' },
        { label: 'B', text: 'Failover (ativo-passivo) para RTO baixo, ou Latency (ativo-ativo) para performance' },
        { label: 'C', text: 'Weighted routing' },
        { label: 'D', text: 'Geolocation routing' }
      ],
      correctAnswer: 'B',
      explanation: 'DR strategy depende de requisitos: Failover (ativo-passivo): custo menor, RTO ~2-5min, Secondary idle. Latency (ativo-ativo): ambas regiões ativas, RTO ~segundos (health check), custo maior, melhor performance. Hybrid: Traffic Flow com Geolocation → Latency → Failover (usuários vão para região preferida, se falhar escolhe melhor latência alternativa). Weighted: útil para blue-green, não ideal para DR puro.',
      relatedService: 'route53'
    },
    {
      id: 98,
      topic: 'route53',
      question: 'Como Route 53 integra com AWS Global Accelerator?',
      context: 'Combinar serviços para latência ultra-baixa.',
      options: [
        { label: 'A', text: 'Não integram' },
        { label: 'B', text: 'Route 53 Alias record aponta para Global Accelerator (anycast IPs estáticos)' },
        { label: 'C', text: 'Global Accelerator substitui Route 53' },
        { label: 'D', text: 'Apenas via VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Integration: Route 53 Alias → Global Accelerator. GA fornece 2 IPs anycast globais. Benefícios: 1) DNS resolve para GA (sem custo), 2) GA roteia via AWS backbone, 3) Health checks + failover automático por GA. Use case: aplicações TCP/UDP sensíveis à latência, gaming, VoIP. GA complementa Route 53 (layer 4 vs DNS). Stack: Route 53 (DNS) → GA (anycast) → ALB (HTTP) → Targets.',
      relatedService: 'route53'
    },
    {
      id: 99,
      topic: 'route53',
      question: 'Uma aplicação usa Private Hosted Zone com nome interno.aws. VPC resolve mas EC2 não. Debug?',
      context: 'Troubleshooting Private Hosted Zone resolution.',
      options: [
        { label: 'A', text: 'Private HZ não funciona' },
        { label: 'B', text: 'Verificar enableDnsHostnames e enableDnsSupport na VPC, e associação VPC↔PHZ' },
        { label: 'C', text: 'Reiniciar Route 53' },
        { label: 'D', text: 'Security Groups bloqueando DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Private HZ troubleshooting: 1) VPC settings: enableDnsSupport=true (resolve Route 53), enableDnsHostnames=true (EC2 hostnames DNS), 2) VPC associada à PHZ (verify association), 3) EC2 usa DNS da VPC (169.254.169.253 ou VPC+2), 4) DHCP options set correto. Teste: dig/nslookup de EC2. NACL/SG não bloqueiam DNS (gerenciado AWS). Logs: CloudWatch query logs para debug.',
      relatedService: 'route53'
    },
    {
      id: 100,
      topic: 'route53',
      question: 'Qual afirmação resume melhor o papel do Route 53 em arquiteturas AWS modernas?',
      context: 'Visão holística do serviço.',
      options: [
        { label: 'A', text: 'Apenas um serviço de DNS básico' },
        { label: 'B', text: 'Serviço DNS global altamente disponível (100% SLA) com routing policies avançadas, health checks, integração profunda AWS, e base para DR/HA multi-região' },
        { label: 'C', text: 'Substitui Load Balancers' },
        { label: 'D', text: 'Apenas para hospedar websites estáticos' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53: muito além de DNS básico. Pilares: 1) Global (anycast, 200+ PoPs, 100% SLA), 2) Routing inteligente (latency, geo, weighted, failover), 3) Health checks + failover automático, 4) Integração AWS (Alias sem custo), 5) Híbrido (Resolver Endpoints), 6) Segurança (DNSSEC, Firewall), 7) Base de DR (ARC). Uso: desde sites simples até arquiteturas multi-região enterprise. Serviço fundamental em Well-Architected.',
      relatedService: 'route53'
    }
  ],
  
  /* s3: [
        { label: 'A', text: '5 segundos' },
        { label: 'B', text: '10 segundos (fast interval)' },
        { label: 'C', text: '30 segundos (standard)' },
        { label: 'D', text: '60 segundos' }
      ],
      correctAnswer: 'B',
      explanation: 'Fast interval health check: 10 segundos (custo 5x maior). Standard: 30 segundos. Com threshold=2 e fast interval: detecção em 20s. Com standard: 90s (3x30s). Para aplicações críticas com RTO baixo: fast + threshold baixo. Trade-off: custo vs velocidade de detecção. Health checkers distribuídos globalmente.',
      relatedService: 'route53'
    },
    {
      id: 23,
      topic: 'route53',
      question: 'Route 53 Traffic Flow permite?',
      context: 'Cenário complexo com múltiplas políticas combinadas.',
      options: [
        { label: 'A', text: 'Apenas uma política por record' },
        { label: 'B', text: 'Editor visual para combinar múltiplas políticas (geolocation + weighted + failover)' },
        { label: 'C', text: 'Route 53 não tem Traffic Flow' },
        { label: 'D', text: 'Apenas para IPv6' }
      ],
      correctAnswer: 'B',
      explanation: 'Traffic Flow: editor visual (drag-and-drop) para criar políticas complexas aninhadas. Exemplo: Geolocation (dividir por continente) → Latency (escolher região) → Weighted (canary test) → Failover (DR). Reutilizável via templates. Policy records custam $50/mês cada mas simplificam arquiteturas complexas.',
      relatedService: 'route53'
    },
    {
      id: 24,
      topic: 'route53',
      question: 'Como Route 53 determina localização do usuário em Geolocation routing?',
      context: 'Entender precisão do roteamento geográfico.',
      options: [
        { label: 'A', text: 'GPS do dispositivo' },
        { label: 'B', text: 'IP source da query DNS' },
        { label: 'C', text: 'Header User-Agent' },
        { label: 'D', text: 'Certificado SSL' }
      ],
      correctAnswer: 'B',
      explanation: 'Geolocation usa IP source do DNS resolver (não client). Precisão: nível de continente/país/estado (US). Limitação: VPN/proxy pode mascarar localização real. EDNS0 Client Subnet (ECS) melhora precisão passando subnet do client. Configure default location como fallback para IPs não mapeados.',
      relatedService: 'route53'
    },
    {
      id: 25,
      topic: 'route53',
      question: 'Qual registro DNS é necessário para verificar domínio no AWS Certificate Manager?',
      context: 'Solicitar certificado SSL via DNS validation.',
      options: [
        { label: 'A', text: 'A record' },
        { label: 'B', text: 'CNAME record fornecido pelo ACM' },
        { label: 'C', text: 'MX record' },
        { label: 'D', text: 'NS record' }
      ],
      correctAnswer: 'B',
      explanation: 'ACM DNS validation: ACM fornece CNAME record único (_xxxxx.exemplo.com) que você adiciona no Route 53. ACM verifica presença do record para provar ownership do domínio. Auto-renew funciona enquanto record existir. Alternativa: email validation (menos conveniente). Route 53 pode adicionar record automaticamente.',
      relatedService: 'route53'
    },
    {
      id: 26,
      topic: 'route53',
      question: 'Uma empresa precisa redirecionar www.exemplo.com para exemplo.com. Qual solução Route 53?',
      context: 'Consolidar tráfego no apex domain.',
      options: [
        { label: 'A', text: 'CNAME de www para apex' },
        { label: 'B', text: 'Route 53 não faz redirects, use S3 website redirect + Alias' },
        { label: 'C', text: 'TXT record' },
        { label: 'D', text: 'NS record' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53 não faz HTTP redirects. Solução: 1) Criar bucket S3 "www.exemplo.com" configurado para redirect (301/302) para "exemplo.com", 2) Alias record www.exemplo.com → S3 website endpoint. Alternativa: CloudFront Function/Lambda@Edge para redirects mais avançados. Opção A: CNAME funciona mas não redireciona navegador.',
      relatedService: 'route53'
    },
    {
      id: 27,
      topic: 'route53',
      question: 'Quantas Hosted Zones podem estar associadas a uma VPC?',
      context: 'Planejando arquitetura multi-domain interna.',
      options: [
        { label: 'A', text: 'Apenas 1 Private Hosted Zone' },
        { label: 'B', text: 'Ilimitadas Private Hosted Zones' },
        { label: 'C', text: 'Até 10 Hosted Zones' },
        { label: 'D', text: 'Até 100 Hosted Zones' }
      ],
      correctAnswer: 'B',
      explanation: 'Uma VPC pode associar múltiplas Private Hosted Zones (ilimitado). Útil para: app.internal, db.internal, cache.internal. Precedência: zona mais específica ganha (api.app.internal antes de app.internal). Também: uma Private Hosted Zone pode associar múltiplas VPCs (cross-account via RAM).',
      relatedService: 'route53'
    },
    {
      id: 28,
      topic: 'route53',
      question: 'Health check do tipo "String Matching" verifica?',
      context: 'Validar não apenas conectividade mas resposta correta.',
      options: [
        { label: 'A', text: 'Apenas código HTTP 200' },
        { label: 'B', text: 'Código 200 E presença de string específica nos primeiros 5120 bytes da resposta' },
        { label: 'C', text: 'Tamanho da resposta' },
        { label: 'D', text: 'Header Content-Type' }
      ],
      correctAnswer: 'B',
      explanation: 'String Matching health check: 1) Verifica código 2xx/3xx, 2) Busca string exata nos primeiros 5120 bytes do body (case-sensitive). Use case: verificar se página retorna "OK" ou "healthy" e não erro genérico 200. Mais robusto que apenas status code. Exemplo: API retorna {"status":"up"}.',
      relatedService: 'route53'
    },
    {
      id: 29,
      topic: 'route53',
      question: 'Uma aplicação usa múltiplas regiões com Latency-based routing. Como implementar failover por região?',
      context: 'Combinar baixa latência com alta disponibilidade.',
      options: [
        { label: 'A', text: 'Latency-based routing não suporta failover' },
        { label: 'B', text: 'Criar Latency records com health checks; se região falha, Route 53 escolhe próxima menor latência' },
        { label: 'C', text: 'Usar apenas Failover routing' },
        { label: 'D', text: 'Criar DNS externo' }
      ],
      correctAnswer: 'B',
      explanation: 'Latency-based routing com health checks: crie record por região com health check. Se região unhealthy, Route 53 automaticamente escolhe próxima com menor latência entre as saudáveis. Combina: performance (latency) + resiliência (health). Para DR: Traffic Flow pode aninhar Latency → Failover em cada região.',
      relatedService: 'route53'
    },
    {
      id: 30,
      topic: 'route53',
      question: 'Route 53 Resolver Rules forward queries para onde?',
      context: 'Integração híbrida DNS.',
      options: [
        { label: 'A', text: 'Apenas para DNS AWS' },
        { label: 'B', text: 'Para DNS servers on-premises ou outras VPCs via IP targets' },
        { label: 'C', text: 'Route 53 não tem Resolver Rules' },
        { label: 'D', text: 'Apenas para internet' }
      ],
      correctAnswer: 'B',
      explanation: 'Resolver Rules (forwarding rules): definem para quais IPs encaminhar queries de domínios específicos. Exemplo: queries para *.onprem.local → IPs 10.0.0.5 e 10.0.0.6 (DNS on-premises). Requer Outbound Endpoint. Compartilhável via RAM cross-account. Use case: workloads AWS acessando recursos internos com nomes on-premises.',
      relatedService: 'route53'
    },
    {
      id: 31,
      topic: 'route53',
      question: 'Qual limitação do Simple routing vs outras políticas?',
      context: 'Decidir quando não usar Simple routing.',
      options: [
        { label: 'A', text: 'Não suporta IPv6' },
        { label: 'B', text: 'Não permite health checks e retorna todos IPs mesmo se unhealthy' },
        { label: 'C', text: 'Mais caro que outras políticas' },
        { label: 'D', text: 'Apenas para Public Hosted Zones' }
      ],
      correctAnswer: 'B',
      explanation: 'Simple routing: retorna todos IPs aleatoriamente, SEM health check. Cliente pode receber IP de endpoint down. Única vantagem: simplicidade. Use apenas para: endpoints altamente disponíveis (CloudFront, S3) ou protótipos. Para produção: Multivalue (com health checks) ou outras políticas.',
      relatedService: 'route53'
    },
    {
      id: 32,
      topic: 'route53',
      question: 'Route 53 suporta roteamento baseado em qual métrica de rede?',
      context: 'Entender capacidades avançadas de roteamento.',
      options: [
        { label: 'A', text: 'Throughput' },
        { label: 'B', text: 'Packet loss' },
        { label: 'C', text: 'Latency (medida pela AWS automaticamente)' },
        { label: 'D', text: 'Jitter' }
      ],
      correctAnswer: 'C',
      explanation: 'Latency-based routing: única métrica de rede suportada nativamente. AWS mede latência entre regiões e users continuamente. NÃO mede: throughput, packet loss, jitter, hop count. Para métricas customizadas: use CloudWatch Alarm como health check (ex: se 5xx > threshold, mark unhealthy).',
      relatedService: 'route53'
    },
    {
      id: 33,
      topic: 'route53',
      question: 'Como testar mudanças de DNS antes de aplicar em produção?',
      context: 'Validar configuração sem impactar usuários.',
      options: [
        { label: 'A', text: 'Não é possível testar DNS' },
        { label: 'B', text: 'Usar "dig" ou "nslookup" especificando nameserver do Route 53 diretamente' },
        { label: 'C', text: 'Criar segunda Hosted Zone' },
        { label: 'D', text: 'Apenas em staging environment' }
      ],
      correctAnswer: 'B',
      explanation: 'Teste DNS: "dig @nameserver-route53 exemplo.com" ou "nslookup exemplo.com nameserver". Nameservers listados na Hosted Zone. Valide: IPs retornados, TTL, ordem (weighted/multivalue). Também: Route 53 Test Record Set no console. Ferramentas: dnschecker.org para propagação global. Teste antes de baixar TTL ou mudar production.',
      relatedService: 'route53'
    },
    {
      id: 34,
      topic: 'route53',
      question: 'Qual o comportamento padrão se nenhum Geolocation routing match for encontrado?',
      context: 'Usuário de país não configurado tenta acessar.',
      options: [
        { label: 'A', text: 'Query falha com NXDOMAIN' },
        { label: 'B', text: 'Route 53 usa default location record (se configurado) ou retorna NOERROR sem resposta' },
        { label: 'C', text: 'Redireciona para us-east-1' },
        { label: 'D', text: 'Usa Latency-based routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Geolocation: sempre configure "Default" location como fallback para IPs não mapeados (VPNs, novos países, datacenters). Sem default: query retorna NOERROR sem answer (user vê erro). Com default: funciona como "catch-all". Precedência: continente < país < estado (US) < default.',
      relatedService: 'route53'
    },
    {
      id: 35,
      topic: 'route53',
      question: 'Uma aplicação precisa de DNS failover entre ALBs em 3 regiões. Qual arquitetura Route 53?',
      context: 'Multi-região com prioridade escalonada.',
      options: [
        { label: 'A', text: 'Simple routing com 3 IPs' },
        { label: 'B', text: 'Criar árvore failover: Primary (us-east-1) → Secondary (us-west-2) → Tertiary via Traffic Flow' },
        { label: 'C', text: 'Weighted routing igual' },
        { label: 'D', text: 'Failover suporta apenas 2 endpoints' }
      ],
      correctAnswer: 'B',
      explanation: 'Failover multi-nível via Traffic Flow: Primary com health check → se unhealthy → Secondary com health check → se unhealthy → Tertiary. Ou: combinar Failover com Latency (dentro de cada tier escolhe melhor região). Opção D: Failover nativo só 2 endpoints, mas Traffic Flow permite aninhar.',
      relatedService: 'route53'
    },
    {
      id: 36,
      topic: 'route53',
      question: 'Qual custo adicional ao ativar Query Logging no Route 53?',
      context: 'Compliance requer auditoria de todas queries DNS.',
      options: [
        { label: 'A', text: 'Sem custo adicional' },
        { label: 'B', text: 'Custo de armazenamento no CloudWatch Logs onde logs são enviados' },
        { label: 'C', text: '$100/mês fixo' },
        { label: 'D', text: 'Query Logging não existe' }
      ],
      correctAnswer: 'B',
      explanation: 'Query Logging: envia logs de queries DNS para CloudWatch Logs (Public Hosted Zones). Custo: armazenamento CloudWatch Logs ($0.50/GB) + ingest. Alto volume pode ser caro - considere S3 export + Athena para análise. Logs incluem: query name, type, response code, source IP (edge location). Útil para: debugging, security, analytics.',
      relatedService: 'route53'
    },
    {
      id: 37,
      topic: 'route53',
      question: 'Como Route 53 garante alta disponibilidade do próprio serviço DNS?',
      context: 'SLA 100% uptime do Route 53.',
      options: [
        { label: 'A', text: 'Cluster em uma região' },
        { label: 'B', text: 'Rede global anycast com servidores DNS distribuídos em múltiplas edge locations' },
        { label: 'C', text: 'Backup manual' },
        { label: 'D', text: 'Multi-AZ em us-east-1' }
      ],
      correctAnswer: 'B',
      explanation: 'Route 53 HA: 1) Rede anycast global (mesmo IP responde de múltiplos locais), 2) DNS servers em todas edge locations (200+), 3) Sem single point of failure, 4) SLA 100% uptime. Query vai automaticamente para servidor mais próximo saudável. Por isso é backbone de DR - se Route 53 cair, internet inteira tem problema.',
      relatedService: 'route53'
    },
    {
      id: 38,
      topic: 'route53',
      question: 'Weighted routing com peso 0 em um record causa?',
      context: 'Blue-green deployment: desligar versão antiga.',
      options: [
        { label: 'A', text: 'Erro de configuração' },
        { label: 'B', text: 'Record recebe 0% do tráfego (desligado mas mantido para rollback rápido)' },
        { label: 'C', text: 'Route 53 deleta o record' },
        { label: 'D', text: 'Tráfego dividido igualmente' }
      ],
      correctAnswer: 'B',
      explanation: 'Peso 0 = 0% tráfego, mas record mantido. Use case: desligar endpoint temporariamente sem deletar configuração (rollback rápido só mudando peso). Blue-green: Start: A=100, B=0 → Canary: A=90, B=10 → Full: A=0, B=100. Se problema: A=100, B=0 instantaneamente. TTL baixo essencial.',
      relatedService: 'route53'
    },
    {
      id: 39,
      topic: 'route53',
      question: 'Uma aplicação SaaS multi-tenant precisa rotear cliente-a.exemplo.com e cliente-b.exemplo.com para backends diferentes. Qual record type?',
      context: 'Subdomínios dinâmicos por tenant.',
      options: [
        { label: 'A', text: 'Wildcard record (*.exemplo.com)' },
        { label: 'B', text: 'A record específico para cada tenant' },
        { label: 'C', text: 'CNAME chain' },
        { label: 'D', text: 'Route 53 não suporta multi-tenant' }
      ],
      correctAnswer: 'B',
      explanation: 'Wildcard (*) roteia TODOS subdomínios para mesmo endpoint. Multi-tenant com backends diferentes: criar A/Alias record específico por tenant. Alternativa: wildcard para ALB único que faz routing interno por hostname (ALB host-based routing). Ou: Traffic Flow com rules complexas. Wildcard tem precedência menor que records específicos.',
      relatedService: 'route53'
    },
    {
      id: 40,
      topic: 'route53',
      question: 'Qual melhor prática para RTO (Recovery Time Objective) mínimo em DR com Route 53?',
      context: 'Negócio tolera no máximo 2 minutos de downtime.',
      options: [
        { label: 'A', text: 'TTL alto (3600s) para estabilidade' },
        { label: 'B', text: 'TTL baixo (60s) + Fast health check (10s) + Threshold baixo (2)' },
        { label: 'C', text: 'Simple routing sem health check' },
        { label: 'D', text: 'Manual failover' }
      ],
      correctAnswer: 'B',
      explanation: 'RTO mínimo: 1) TTL=60s (propagação rápida), 2) Fast health check=10s (detecção rápida), 3) Threshold=2 (20s para mark unhealthy), 4) Failover routing automático. Total: ~80s (20s detecção + 60s propagação). Trade-off: custo aumenta (fast health check + mais queries). Para RTO ainda menor: considerar Global Accelerator (failover em segundos via anycast).',
      relatedService: 'route53'
    }
  ],
  
  */
  s3: [
    {
      id: 1,
      topic: 's3',
      question: 'Qual storage class do S3 oferece o menor custo para dados acessados raramente (1-2 vezes/ano) com requisito de recuperação rápida?',
      context: 'Logs de auditoria precisam estar disponíveis imediatamente se solicitados.',
      options: [
        { label: 'A', text: 'S3 Standard' },
        { label: 'B', text: 'S3 Intelligent-Tiering' },
        { label: 'C', text: 'S3 One Zone-IA' },
        { label: 'D', text: 'S3 Glacier Instant Retrieval' }
      ],
      correctAnswer: 'D',
      explanation: 'S3 Glacier Instant Retrieval é mais barato para dados raramente acessados (90+ dias) com recuperação em milissegundos. Opção A: Standard é caro para acesso raro. Opção B: Intelligent tem custo de monitoramento. Opção C: One Zone-IA não oferece redundância multi-AZ.',
      relatedService: 's3'
    },
    {
      id: 2,
      topic: 's3',
      question: 'Como hospedar um site estático no S3 com domínio customizado (www.empresa.com)?',
      context: 'Site HTML/CSS/JS precisa ser acessível publicamente.',
      options: [
        { label: 'A', text: 'Habilitar static website hosting, criar bucket com nome www.empresa.com, configurar Route 53' },
        { label: 'B', text: 'Usar S3 Transfer Acceleration' },
        { label: 'C', text: 'Criar EC2 e montar bucket como volume' },
        { label: 'D', text: 'Não é possível, S3 só aceita domínios cloudfront.net' }
      ],
      correctAnswer: 'A',
      explanation: 'Para domínio customizado: 1) Bucket deve ter exato nome do domínio (www.empresa.com), 2) Habilitar static website hosting, 3) Configurar bucket policy public, 4) Criar record A alias no Route 53 apontando para S3 endpoint. Opção B: Transfer Acceleration é para uploads rápidos. Opção D: é possível com domínio customizado.',
      relatedService: 's3'
    }
    ,
    {
      id: 3,
      topic: 's3',
      question: 'Quando usar S3 Versioning e qual impacto em custo?',
      context: 'Aplicação precisa recuperar acidentalmente arquivos sobrescritos/excluídos.',
      options: [
        { label: 'A', text: 'Ativar versioning só aumenta durabilidade, sem custo extra' },
        { label: 'B', text: 'Ativar versioning mantém múltiplas versões; todas contam para custo de armazenamento' },
        { label: 'C', text: 'Versioning remove versões antigas automaticamente' },
        { label: 'D', text: 'Versioning exige replicação entre regiões' }
      ],
      correctAnswer: 'B',
      explanation: 'Versioning mantém histórico de objetos (PUT/DELETE). Cada versão armazena bytes e gera custo. Combine com Lifecycle para expirar/transitionar versões antigas (IA/Glacier) controlando custo. Ajuda contra deletes acidentais e ransomware (com Object Lock).',
      relatedService: 's3'
    },
    {
      id: 4,
      topic: 's3',
      question: 'Qual diferença entre SSE-S3 e SSE-KMS?',
      context: 'Requisito de criptografia em repouso com chaves gerenciadas.',
      options: [
        { label: 'A', text: 'SSE-S3 usa chaves da AWS; SSE-KMS usa chaves no AWS KMS (CMK)' },
        { label: 'B', text: 'Ambos exigem permissões KMS:Encrypt' },
        { label: 'C', text: 'SSE-KMS não suporta logs CloudTrail' },
        { label: 'D', text: 'SSE-S3 permite rotação de chaves pelo cliente' }
      ],
      correctAnswer: 'A',
      explanation: 'SSE-S3: chaves gerenciadas S3 (AES-256, sem KMS). SSE-KMS: envelope encryption com CMK no KMS, controle granular (key policy, grants), auditoria no CloudTrail e quotas de TPS. SSE-KMS é preferível para compliance e controle de chaves.',
      relatedService: 's3'
    },
    {
      id: 5,
      topic: 's3',
      question: 'Como forçar criptografia padrão para todos os uploads em um bucket?',
      context: 'Política corporativa exige criptografia sempre.',
      options: [
        { label: 'A', text: 'Habilitar default encryption no bucket (SSE-S3 ou SSE-KMS)' },
        { label: 'B', text: 'Usar ACLs de objeto' },
        { label: 'C', text: 'Desabilitar versioning' },
        { label: 'D', text: 'Criar um VPC endpoint' }
      ],
      correctAnswer: 'A',
      explanation: 'Default encryption garante que uploads sem cabeçalhos de criptografia sejam automaticamente criptografados. Opcionalmente, reforce via bucket policy negando put sem a condição de x-amz-server-side-encryption ou KMS key específica.',
      relatedService: 's3'
    },
    {
      id: 6,
      topic: 's3',
      question: 'Como bloquear acesso público acidental ao bucket?',
      context: 'Compliance exige evitar exposição pública.',
      options: [
        { label: 'A', text: 'Habilitar Block Public Access no nível do bucket/conta' },
        { label: 'B', text: 'Remover todas as IAM policies' },
        { label: 'C', text: 'Desabilitar o bucket policy' },
        { label: 'D', text: 'Criar um CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 Block Public Access impede políticas/ACLs que abririam acesso público. Use em conjunto com políticas mínimas necessárias. IAM policies não impedem abertura por ACLs sem o BPA.',
      relatedService: 's3'
    },
    {
      id: 7,
      topic: 's3',
      question: 'Quando usar pre-signed URL?',
      context: 'Usuários externos precisam upload/download temporário sem credenciais AWS.',
      options: [
        { label: 'A', text: 'Para dar acesso temporário controlado a objetos específicos' },
        { label: 'B', text: 'Para listar buckets' },
        { label: 'C', text: 'Para configurar lifecycle' },
        { label: 'D', text: 'Para criar buckets' }
      ],
      correctAnswer: 'A',
      explanation: 'Pre-signed URL assina uma operação (GET/PUT) com expiração e escopo de objeto, sem expor credenciais. Ideal para uploads diretamente ao S3 pelo cliente e downloads controlados.',
      relatedService: 's3'
    },
    {
      id: 8,
      topic: 's3',
      question: 'Melhor prática para servir website estático global com baixa latência e HTTPS no apex?',
      context: 'Frontend global com domínio raiz.',
      options: [
        { label: 'A', text: 'S3 static website + Route 53 A Alias para CloudFront' },
        { label: 'B', text: 'S3 website endpoint direto' },
        { label: 'C', text: 'EC2 com Nginx' },
        { label: 'D', text: 'API Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudFront fornece CDN, HTTPS, OAC/OAI para restringir o S3 e suporta apex via Alias no Route 53. S3 website endpoint não suporta HTTPS custom domain no apex sem CloudFront.',
      relatedService: 's3'
    },
    {
      id: 9,
      topic: 's3',
      question: 'Como permitir que um bucket em outra conta receba replicação de objetos criptografados com KMS?',
      context: 'CRR entre contas com SSE-KMS.',
      options: [
        { label: 'A', text: 'Adicionar permissão à key KMS de destino (key policy/grant) e configurar CRR' },
        { label: 'B', text: 'Desabilitar KMS' },
        { label: 'C', text: 'Usar ACL pública' },
        { label: 'D', text: 'Mover o bucket para a mesma conta' }
      ],
      correctAnswer: 'A',
      explanation: 'CRR com KMS requer que a role de replicação tenha Encrypt na CMK de destino e Decrypt/Encrypt conforme necessário na CMK origem. Ajuste key policy/grants e selecione a key correta na regra de replicação.',
      relatedService: 's3'
    },
    {
      id: 10,
      topic: 's3',
      question: 'Qual classe é ideal para dados raramente acessados, mas que precisam de recuperação em milissegundos?',
      context: 'Logs frios com exigência de recuperação rápida.',
      options: [
        { label: 'A', text: 'S3 Glacier Deep Archive' },
        { label: 'B', text: 'S3 Glacier Instant Retrieval (mínimo 90 dias)' },
        { label: 'C', text: 'S3 Standard-IA (mínimo 30 dias)' },
        { label: 'D', text: 'S3 One Zone-IA' }
      ],
      correctAnswer: 'B',
      explanation: 'Glacier Instant Retrieval tem latência em milissegundos com custo menor que Standard para dados acessados poucas vezes/ano, mas possui mínimo de armazenamento de 90 dias.',
      relatedService: 's3'
    },
    {
      id: 11,
      topic: 's3',
      question: 'Qual opção reduz custo de PUT em objetos pequenos no Intelligent-Tiering?',
      context: 'Milhões de objetos <128KB.',
      options: [
        { label: 'A', text: 'Desabilitar monitoração do Intelligent-Tiering para pequenos objetos' },
        { label: 'B', text: 'Compactar/agrupar objetos pequenos antes do upload' },
        { label: 'C', text: 'Usar One Zone-IA sempre' },
        { label: 'D', text: 'Mover para Glacier Deep Archive' }
      ],
      correctAnswer: 'B',
      explanation: 'O Intelligent-Tiering tem taxa de monitoração por objeto. Agrupar/compactar diminui o número de objetos cobrados e melhora a eficiência para arquivos muito pequenos.',
      relatedService: 's3'
    },
    {
      id: 12,
      topic: 's3',
      question: 'Como impor CORS para permitir que um frontend em domínio A leia objetos de um bucket?',
      context: 'SPA faz fetch de imagens/JSON no S3.',
      options: [
        { label: 'A', text: 'Configurar CORS no bucket permitindo origin específico e headers necessários' },
        { label: 'B', text: 'Criar ACL pública global' },
        { label: 'C', text: 'Habilitar Transfer Acceleration' },
        { label: 'D', text: 'Usar apenas presigned URLs' }
      ],
      correctAnswer: 'A',
      explanation: 'Defina regras CORS no bucket com allowed origins, methods e headers adequados. Evite curingas amplos em produção. Presigned URL não substitui CORS para leitura direta do browser.',
      relatedService: 's3'
    },
    {
      id: 13,
      topic: 's3',
      question: 'Qual estratégia para uploads de arquivos > 100MB com performance?',
      context: 'Uploads grandes e sujeitos a falhas.',
      options: [
        { label: 'A', text: 'Multipart Upload com paralelismo' },
        { label: 'B', text: 'Um único PUT por arquivo' },
        { label: 'C', text: 'FTP para EC2' },
        { label: 'D', text: 'RTR via SQS' }
      ],
      correctAnswer: 'A',
      explanation: 'Multipart Upload divide o arquivo em partes paralelas, melhora throughput, permite retomar e otimizar falhas parciais. Requisite ETag/partes para verificação.',
      relatedService: 's3'
    },
    {
      id: 14,
      topic: 's3',
      question: 'Quando usar S3 Transfer Acceleration?',
      context: 'Clientes globais com upload de alta latência.',
      options: [
        { label: 'A', text: 'Para acelerar uploads via rede da AWS (edge → bucket)' },
        { label: 'B', text: 'Para reduzir custo de armazenamento' },
        { label: 'C', text: 'Para habilitar versioning' },
        { label: 'D', text: 'Para criptografar uploads' }
      ],
      correctAnswer: 'A',
      explanation: 'Transfer Acceleration usa edge locations da AWS para acelerar uploads de longa distância. Bom para uploads globais e aplicações com latência alta até a região do bucket.',
      relatedService: 's3'
    },
    {
      id: 15,
      topic: 's3',
      question: 'Quais mínimos de retenção/custos por classe?',
      context: 'Escolha de classe com lifecycle correto.',
      options: [
        { label: 'A', text: 'Standard-IA: 30 dias; One Zone-IA: 30; Glacier IR: 90; Deep Archive: 180' },
        { label: 'B', text: 'Standard-IA: 7; One Zone-IA: 7; Glacier IR: 30; Deep Archive: 60' },
        { label: 'C', text: 'Todas sem mínimos' },
        { label: 'D', text: 'Apenas Deep Archive tem mínimo' }
      ],
      correctAnswer: 'A',
      explanation: 'Prazos mínimos de armazenamento: Standard-IA e One Zone-IA (30 dias), Glacier Instant Retrieval (90) e Deep Archive (180). Excluir/transitionar antes do mínimo gera cobrança proporcional.',
      relatedService: 's3'
    },
    {
      id: 16,
      topic: 's3',
      question: 'Como auditar mudanças em policies e acessos do S3?',
      context: 'Requisito de auditoria.',
      options: [
        { label: 'A', text: 'CloudTrail para APIs S3 e KMS; S3 Access Analyzer para políticas' },
        { label: 'B', text: 'Somente CloudWatch Logs' },
        { label: 'C', text: 'Somente Config' },
        { label: 'D', text: 'Não é possível auditar' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudTrail registra chamadas de API (PutBucketPolicy, PutObject, KMS Encrypt/Decrypt). Access Analyzer avalia políticas para detectar exposição/contas externas. AWS Config pode avaliar conformidade.',
      relatedService: 's3'
    },
    {
      id: 17,
      topic: 's3',
      question: 'Como processar eventos de criação/remoção de objetos?',
      context: 'Acionar pipelines e notificações.',
      options: [
        { label: 'A', text: 'S3 Event Notifications para SNS/SQS/Lambda' },
        { label: 'B', text: 'CloudFront Functions' },
        { label: 'C', text: 'Step Functions diretamente do bucket' },
        { label: 'D', text: 'Somente logs no CloudWatch' }
      ],
      correctAnswer: 'A',
      explanation: 'Use S3 Event Notifications para eventos de PUT/POST/DELETE/Restore → SNS, SQS ou Lambda. Para escalabilidade elevada, processe via SQS; para baixa latência, Lambda.',
      relatedService: 's3'
    },
    {
      id: 18,
      topic: 's3',
      question: 'O que é S3 Object Lock (WORM)?',
      context: 'Compliance contra deleção/modificação por período.',
      options: [
        { label: 'A', text: 'Impede alterações por retenção legal/tempo definido' },
        { label: 'B', text: 'Apenas acelera uploads' },
        { label: 'C', text: 'Criptografa objetos' },
        { label: 'D', text: 'Exige replicação' }
      ],
      correctAnswer: 'A',
      explanation: 'Object Lock aplica retenção WORM (Governance/Compliance mode), com retention periods e legal holds. Exige versioning habilitado e ajuda em ransomware/compliance.',
      relatedService: 's3'
    },
    {
      id: 19,
      topic: 's3',
      question: 'Como otimizar leitura de colunas específicas em grandes objetos CSV/JSON?',
      context: 'Workloads analíticos com arquivos grandes.',
      options: [
        { label: 'A', text: 'S3 Select para projeção/filtragem no servidor' },
        { label: 'B', text: 'Baixar todo arquivo e filtrar no cliente' },
        { label: 'C', text: 'Glacier para leitura rápida' },
        { label: 'D', text: 'S3 Inventory' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 Select permite consultar subconjuntos de dados de objetos CSV/JSON/Parquet, reduzindo transferência e custo. Inventory lista objetos/metadata, não serve para consulta de conteúdo.',
      relatedService: 's3'
    },
    {
      id: 20,
      topic: 's3',
      question: 'Qual benefício de Access Points?',
      context: 'Múltiplos aplicativos com padrões de acesso distintos.',
      options: [
        { label: 'A', text: 'Endpoints dedicados com políticas específicas por aplicação/VPC' },
        { label: 'B', text: 'Reduz custo de storage' },
        { label: 'C', text: 'Habilita CDN automaticamente' },
        { label: 'D', text: 'Substitui bucket policy' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 Access Points expõem nomes/hosts próprios com policies distintas (inclui restrições por VPC). Simplifica governança para múltiplos consumidores e data lakes.',
      relatedService: 's3'
    },
    {
      id: 21,
      topic: 's3',
      question: 'Qual a consistência de leitura/escrita do S3 atualmente?',
      context: 'Aplicações esperam ler imediatamente após gravar.',
      options: [
        { label: 'A', text: 'Eventual para HEAD/GET e forte para LIST' },
        { label: 'B', text: 'Leitura após gravação forte para PUT/DELETE em todas as regiões' },
        { label: 'C', text: 'Sem garantias' },
        { label: 'D', text: 'Apenas forte para objetos <5MB' }
      ],
      correctAnswer: 'B',
      explanation: 'S3 oferece strong read-after-write para PUTs de novos objetos e DELETE, inclusive em overwrite. Simplifica aplicativos que precisam ler imediatamente após gravar.',
      relatedService: 's3'
    },
    {
      id: 22,
      topic: 's3',
      question: 'Como isolar tráfego S3 sem passar pela internet para workloads em VPC?',
      context: 'Evitar IPs públicos/egress.',
      options: [
        { label: 'A', text: 'Gateway VPC Endpoint para S3 e bucket policy restringindo ao endpoint' },
        { label: 'B', text: 'NAT Gateway obrigatório' },
        { label: 'C', text: 'Interface Endpoint para S3 sempre' },
        { label: 'D', text: 'VPN' }
      ],
      correctAnswer: 'A',
      explanation: 'Use Gateway Endpoint (rota para S3) e bucket policy que permita somente requests pelo endpoint. Interface Endpoint para S3 é raro e específico.',
      relatedService: 's3'
    },
    {
      id: 23,
      topic: 's3',
      question: 'Como garantir replicação de objetos já existentes no bucket?',
      context: 'Precisa copiar histórico além de novos objetos.',
      options: [
        { label: 'A', text: 'S3 Batch Replication (retroativa)' },
        { label: 'B', text: 'Somente CRR padrão' },
        { label: 'C', text: 'Mover manualmente via CLI' },
        { label: 'D', text: 'Desabilitar versioning' }
      ],
      correctAnswer: 'A',
      explanation: 'Batch Replication replica retroativamente objetos já existentes segundo a regra definida, complementando a replicação em tempo real para novos objetos.',
      relatedService: 's3'
    },
    {
      id: 24,
      topic: 's3',
      question: 'Qual abordagem correta para remover dados após o mínimo de retenção?',
      context: 'Controlar custos com Lifecycle.',
      options: [
        { label: 'A', text: 'Lifecycle Rules para expiração/transition pós-mínimo' },
        { label: 'B', text: 'DELETE direto sempre' },
        { label: 'C', text: 'Mover para Standard' },
        { label: 'D', text: 'Usar ACL private' }
      ],
      correctAnswer: 'A',
      explanation: 'Lifecycle automatiza expiração e transição respeitando mínimos de cada classe. Evita cobranças de early deletion e reduz trabalho operacional.',
      relatedService: 's3'
    },
    {
      id: 25,
      topic: 's3',
      question: 'Qual recurso do S3 ajuda a catalogar e reconciliar objetos para governança?',
      context: 'Inventário periódico.',
      options: [
        { label: 'A', text: 'S3 Inventory (CSV/ORC/Parquet em S3)' },
        { label: 'B', text: 'S3 Select' },
        { label: 'C', text: 'Athena' },
        { label: 'D', text: 'Kinesis' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 Inventory gera relatórios periódicos com lista de objetos e metadados (classe, criptografia, replicação), úteis para auditoria e pipelines com Athena/Glue.',
      relatedService: 's3'
    },
    {
      id: 26,
      topic: 's3',
      question: 'Como lidar com delete markers na replicação?',
      context: 'Evitar apagar dados no destino por engano.',
      options: [
        { label: 'A', text: 'Configurar replicação para replicar ou ignorar deletes conforme necessidade' },
        { label: 'B', text: 'Delete markers nunca replicam' },
        { label: 'C', text: 'Sempre replicar para manter consistência' },
        { label: 'D', text: 'Bloquear deletes globalmente' }
      ],
      correctAnswer: 'A',
      explanation: 'Replicação suporta propagar ou não delete markers. Para proteção, muitas equipes optam por não replicar deletes e habilitar Object Lock no destino.',
      relatedService: 's3'
    },
    {
      id: 27,
      topic: 's3',
      question: 'Quando usar Requester Pays?',
      context: 'Compartilhamento de grandes datasets públicos.',
      options: [
        { label: 'A', text: 'Quando o consumidor deve pagar pelo data transfer/requests' },
        { label: 'B', text: 'Para reduzir custo de armazenamento' },
        { label: 'C', text: 'Para habilitar CDN' },
        { label: 'D', text: 'Para impedir uploads' }
      ],
      correctAnswer: 'A',
      explanation: 'Requester Pays transfere custo de requests/transferência para quem consome os dados. Útil em datasets públicos/compartilhados com alto tráfego.',
      relatedService: 's3'
    },
    {
      id: 28,
      topic: 's3',
      question: 'Qual prática substitui o uso de ACLs?',
      context: 'Governança simplificada.',
      options: [
        { label: 'A', text: 'Bucket policies e IAM policies; mantenha ACLs desativadas (bucket owner enforced)' },
        { label: 'B', text: 'Sempre usar ACL public-read' },
        { label: 'C', text: 'Apenas IAM users' },
        { label: 'D', text: 'Somente VPC Endpoint' }
      ],
      correctAnswer: 'A',
      explanation: 'A recomendação atual é evitar ACLs e usar políticas de bucket/IAM. O modo Bucket owner enforced ignora ACLs e simplifica propriedade e controle.',
      relatedService: 's3'
    },
    {
      id: 29,
      topic: 's3',
      question: 'Como controlar throughput em altas taxas de escrita/leitura?',
      context: 'Tráfego massivo, milhares de RPS.',
      options: [
        { label: 'A', text: 'S3 escala automaticamente; use multipart e paralelismo; prefixes não possuem mais limites rígidos' },
        { label: 'B', text: 'Criar 100 buckets' },
        { label: 'C', text: 'Usar ACL para performance' },
        { label: 'D', text: 'Migrar para EBS' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 escala sem limites por prefixo como no passado. Otimize com multipart, paralelismo e ajuste de tamanho de parte (5–64MB). Evite hot keys com nomes uniformemente distribuídos.',
      relatedService: 's3'
    },
    {
      id: 30,
      topic: 's3',
      question: 'Qual mecanismo garante que apenas VPCs autorizadas acessem o bucket?',
      context: 'Restrição de rede.',
      options: [
        { label: 'A', text: 'Bucket policy que permite apenas Principal via aws:SourceVpce ou aws:SourceVpc' },
        { label: 'B', text: 'ACL public-read' },
        { label: 'C', text: 'Role com confiança aberta' },
        { label: 'D', text: 'Security Group no S3' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 suporta condições em políticas para restringir por VPC Endpoint (gateway/interface) ou VPC. Não existem Security Groups em S3.',
      relatedService: 's3'
    },
    {
      id: 31,
      topic: 's3',
      question: 'Como proteger a CMK usada em SSE-KMS contra uso não autorizado por outras contas?',
      context: 'Chave KMS compartilhada inadvertidamente.',
      options: [
        { label: 'A', text: 'Key policy mínima + grants explícitos apenas para roles necessárias' },
        { label: 'B', text: 'Abrir key policy para *' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Desligar criptografia' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja na key policy quem pode Encrypt/Decrypt e utilize grants temporários quando necessário. CloudTrail audita uso de chaves.',
      relatedService: 's3'
    },
    {
      id: 32,
      topic: 's3',
      question: 'Qual recurso permite processamento dinâmico no GET (ex.: mascarar PII) sem alterar o objeto?',
      context: 'Personalização por requisição.',
      options: [
        { label: 'A', text: 'S3 Object Lambda' },
        { label: 'B', text: 'S3 Select' },
        { label: 'C', text: 'CRR' },
        { label: 'D', text: 'Access Analyzer' }
      ],
      correctAnswer: 'A',
      explanation: 'Object Lambda permite interpor uma Lambda entre a requisição e o objeto, transformando a resposta (redação de PII, recorte de imagem, etc.).',
      relatedService: 's3'
    }
    ,
    {
      id: 33,
      topic: 's3',
      question: 'Como evitar cobrança de early deletion ao mover dados para classes IA/Glacier?',
      context: 'Equipe está configurando Lifecycle para reduzir custos.',
      options: [
        { label: 'A', text: 'Aguardar o período mínimo de retenção antes de expirar/transitionar' },
        { label: 'B', text: 'Usar ACLs para pausar cobrança' },
        { label: 'C', text: 'Mover de volta para Standard após 1 dia' },
        { label: 'D', text: 'Desabilitar versioning' }
      ],
      correctAnswer: 'A',
      explanation: 'Cada classe tem mínimos (30/90/180 dias). Lifecycle deve respeitar os prazos para evitar cobrança proporcional de early deletion.',
      relatedService: 's3'
    },
    {
      id: 34,
      topic: 's3',
      question: 'Qual abordagem correta para content-addressable storage (deduplicação) no S3?',
      context: 'Evitar armazenar objetos duplicados com mesmo conteúdo.',
      options: [
        { label: 'A', text: 'Calcular hash (ex.: SHA-256) do conteúdo e usar no objeto/chave' },
        { label: 'B', text: 'Depender do ETag sempre como hash de conteúdo' },
        { label: 'C', text: 'Ativar “dedup” nativo do S3' },
        { label: 'D', text: 'Criar ACL public-read' }
      ],
      correctAnswer: 'A',
      explanation: 'O ETag não é necessariamente hash do conteúdo (multipart muda). Estratégia comum é chavear pelo hash calculado pela aplicação.',
      relatedService: 's3'
    },
    {
      id: 35,
      topic: 's3',
      question: 'Como garantir que uploads PUT falhos não deixem objetos parciais?',
      context: 'Aplicação sofre interrupções durante upload.' ,
      options: [
        { label: 'A', text: 'Usar Multipart Upload e completar somente após todas as partes' },
        { label: 'B', text: 'Enviar em um único PUT sempre' },
        { label: 'C', text: 'Ativar ACLs herdadas' },
        { label: 'D', text: 'Desligar versioning' }
      ],
      correctAnswer: 'A',
      explanation: 'Multipart só materializa o objeto ao “CompleteMultipartUpload”. Falhas podem ser retomadas sem objetos corrompidos visíveis.',
      relatedService: 's3'
    },
    {
      id: 36,
      topic: 's3',
      question: 'Como permitir acesso somente leitura de um data lake S3 a contas parceiras?',
      context: 'Compartilhamento interconta com governança.',
      options: [
        { label: 'A', text: 'S3 Access Points + Resource Access Manager (RAM) ou bucket policy cross-account' },
        { label: 'B', text: 'Criar usuários IAM na conta parceira' },
        { label: 'C', text: 'Tornar o bucket público' },
        { label: 'D', text: 'Usar ACLs antigas' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Points e RAM simplificam compartilhamento com políticas específicas. Alternativa é bucket policy cross-account.',
      relatedService: 's3'
    },
    {
      id: 37,
      topic: 's3',
      question: 'Qual prática reduz custo de listagens massivas (LIST) em buckets com bilhões de objetos?',
      context: 'Operações de inventário e reconciliação.',
      options: [
        { label: 'A', text: 'Usar S3 Inventory periódico e consultar via Athena/Glue' },
        { label: 'B', text: 'Executar LIST recursivo diário pelo cliente' },
        { label: 'C', text: 'Ativar FTP no bucket' },
        { label: 'D', text: 'Criar 1 bucket por dia' }
      ],
      correctAnswer: 'A',
      explanation: 'Inventory gera snapshots eficientes para análise em larga escala, evitando LIST intensivo e caro.',
      relatedService: 's3'
    },
    {
      id: 38,
      topic: 's3',
      question: 'Como proteger acesso de aplicações em VPC ao S3 sem internet pública?',
      context: 'Tráfego privado obrigatório.',
      options: [
        { label: 'A', text: 'Gateway VPC Endpoint + bucket policy restringindo aws:SourceVpce' },
        { label: 'B', text: 'Elastic IP por instância' },
        { label: 'C', text: 'Abrir 0.0.0.0/0 na NACL' },
        { label: 'D', text: 'Usar ACL public-read' }
      ],
      correctAnswer: 'A',
      explanation: 'Gateway Endpoint evita internet e a policy restringe o acesso àquele endpoint específico.',
      relatedService: 's3'
    },
    {
      id: 39,
      topic: 's3',
      question: 'Qual ferramenta consulta colunas específicas de objetos Parquet/CSV no S3, reduzindo transferência?',
      context: 'Seleção de campos em objetos grandes.',
      options: [
        { label: 'A', text: 'S3 Select' },
        { label: 'B', text: 'CloudWatch Logs Insights' },
        { label: 'C', text: 'Glue DataBrew' },
        { label: 'D', text: 'S3 Replication' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 Select executa projeção/filtragem server-side para formatos suportados, reduzindo bytes transferidos.',
      relatedService: 's3'
    },
    {
      id: 40,
      topic: 's3',
      question: 'Como impedir deleção indevida mesmo por administradores?',
      context: 'Requisito de compliance WORM.',
      options: [
        { label: 'A', text: 'Habilitar S3 Object Lock (Compliance mode) com retenção' },
        { label: 'B', text: 'Somente versioning' },
        { label: 'C', text: 'ACL private' },
        { label: 'D', text: 'CloudTrail apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'Object Lock em Compliance mode impede alterações até expirar a retenção; útil contra ransomware e exigências legais.',
      relatedService: 's3'
    },
    {
      id: 41,
      topic: 's3',
      question: 'Qual estratégia reduziria custo para logs que só precisam ser mantidos por 1 ano?',
      context: 'Pipeline de governança de logs.',
      options: [
        { label: 'A', text: 'Lifecycle: Standard → IA → Glacier Deep Archive → Expirar em 365 dias' },
        { label: 'B', text: 'Manter tudo em Standard' },
        { label: 'C', text: 'Mover para EBS' },
        { label: 'D', text: 'Tornar público' }
      ],
      correctAnswer: 'A',
      explanation: 'Lifecycle com transições e expiração após retenção atende custo mínimo e compliance.',
      relatedService: 's3'
    },
    {
      id: 42,
      topic: 's3',
      question: 'Como exigir que clientes façam upload somente com criptografia SSE-KMS específica?',
      context: 'Chave KMS dedicada.',
      options: [
        { label: 'A', text: 'Bucket policy negando PutObject sem x-amz-server-side-encryption e x-amz-server-side-encryption-aws-kms-key-id corretos' },
        { label: 'B', text: 'ACL bucket-owner-full-control' },
        { label: 'C', text: 'Desligar Block Public Access' },
        { label: 'D', text: 'Somente default encryption é suficiente' }
      ],
      correctAnswer: 'A',
      explanation: 'A política pode negar PUTs que não usem SSE-KMS com a CMK esperada, garantindo compliance.',
      relatedService: 's3'
    },
    {
      id: 43,
      topic: 's3',
      question: 'Qual é a forma recomendada de expor evento de upload para múltiplos consumidores?',
      context: 'Fan-out para várias pipelines.',
      options: [
        { label: 'A', text: 'S3 Event → SNS topic → subscribers (SQS/Lambda/HTTP)' },
        { label: 'B', text: 'Lambda chamar todos diretamente' },
        { label: 'C', text: 'S3 → Kinesis Video Streams' },
        { label: 'D', text: 'CloudWatch Alarms' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS facilita pub/sub para múltiplos destinos, desacoplado e escalável.',
      relatedService: 's3'
    },
    {
      id: 44,
      topic: 's3',
      question: 'Como reduzir custo de requests para workloads que listam e leem muitos objetos pequenos?',
      context: 'Milhões de arquivos de poucos KB.',
      options: [
        { label: 'A', text: 'Agrupar objetos (tar/zip) e usar S3 Select/Range GET quando aplicável' },
        { label: 'B', text: 'Aumentar TTL do CloudFront' },
        { label: 'C', text: 'Usar ACLs públicas' },
        { label: 'D', text: 'Migrar para RDS' }
      ],
      correctAnswer: 'A',
      explanation: 'Agrupamento reduz número de PUT/LIST/GET. S3 Select e leitura por intervalo minimizam bytes transferidos.',
      relatedService: 's3'
    },
    {
      id: 45,
      topic: 's3',
      question: 'Qual solução permite política de acesso distinta por aplicativo consumidor sem múltiplos buckets?',
      context: 'Vários times consumindo o mesmo dataset.',
      options: [
        { label: 'A', text: 'S3 Access Points (inclusive por VPC)' },
        { label: 'B', text: '1 bucket por time' },
        { label: 'C', text: 'ACLs herdadas' },
        { label: 'D', text: 'Somente IAM identity policies' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Points simplificam políticas distintas por consumidor sem proliferar buckets e políticas complexas.',
      relatedService: 's3'
    },
    {
      id: 46,
      topic: 's3',
      question: 'Como evitar que aplicações acessem o bucket a partir da internet pública por engano?',
      context: 'Tráfego deve sair apenas via endpoint privado.',
      options: [
        { label: 'A', text: 'Usar condition aws:SourceVpce na bucket policy' },
        { label: 'B', text: 'Liberar 0.0.0.0/0' },
        { label: 'C', text: 'Habilitar ACL public-read em objetos' },
        { label: 'D', text: 'Usar somente default encryption' }
      ],
      correctAnswer: 'A',
      explanation: 'A condição limita acesso ao VPC Endpoint autorizado, bloqueando requests pela internet.',
      relatedService: 's3'
    },
    {
      id: 47,
      topic: 's3',
      question: 'Qual combinação suporta criptografia ponta a ponta em uploads cliente→S3 sem expor chaves do servidor?',
      context: 'Aplicações móveis realizando upload seguro.',
      options: [
        { label: 'A', text: 'Client-side encryption + presigned URL' },
        { label: 'B', text: 'SSE-S3 apenas' },
        { label: 'C', text: 'ACL bucket-owner-full-control' },
        { label: 'D', text: 'S3 Transfer Acceleration' }
      ],
      correctAnswer: 'A',
      explanation: 'Criptografe no cliente e suba via URL assinada; o servidor não toca nos dados em claro.',
      relatedService: 's3'
    },
    {
      id: 48,
      topic: 's3',
      question: 'Como reduzir latência global de downloads de objetos do S3?',
      context: 'Usuários distribuídos mundialmente.',
      options: [
        { label: 'A', text: 'Colocar CloudFront na frente do S3 com OAC/OAI' },
        { label: 'B', text: 'Mudar o bucket para us-east-1 sempre' },
        { label: 'C', text: 'Criar VPC Peering' },
        { label: 'D', text: 'Usar Route 53 geolocation' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudFront cacheia globalmente e reduz a distância física. OAC/OAI garante acesso originado pelo CDN.',
      relatedService: 's3'
    },
    {
      id: 49,
      topic: 's3',
      question: 'Como assegurar que objetos replicados mantenham a mesma classe de armazenamento no destino?',
      context: 'CRR entre regiões.',
      options: [
        { label: 'A', text: 'Configurar na regra de replicação a storage class desejada para o destino' },
        { label: 'B', text: 'Storage class sempre muda para Standard' },
        { label: 'C', text: 'Somente possível com ACLs' },
        { label: 'D', text: 'Requer Deep Archive' }
      ],
      correctAnswer: 'A',
      explanation: 'Regras de replicação permitem escolher a storage class no destino (ex.: IA/Glacier IR), controlando custo e retenção.',
      relatedService: 's3'
    },
    {
      id: 50,
      topic: 's3',
      question: 'O que fazer com uploads multipart incompletos para evitar custos?',
      context: 'Partes órfãs acumulando.',
      options: [
        { label: 'A', text: 'Adicionar Lifecycle para abortar multipart após X dias' },
        { label: 'B', text: 'Habilitar ACL public-read' },
        { label: 'C', text: 'Migrar para EFS' },
        { label: 'D', text: 'Usar apenas PUT único' }
      ],
      correctAnswer: 'A',
      explanation: 'Lifecycle “AbortIncompleteMultipartUpload” remove partes não finalizadas e evita cobrança desnecessária.',
      relatedService: 's3'
    },
    {
      id: 51,
      topic: 's3',
      question: 'Como aplicar tag-based access control no S3?',
      context: 'Acesso por ambiente (env=prod/dev).',
      options: [
        { label: 'A', text: 'Definir tags em objetos/buckets e usar Condition em IAM/bucket policy' },
        { label: 'B', text: 'Usar ACLs herdadas' },
        { label: 'C', text: 'Habilitar FTP' },
        { label: 'D', text: 'Somente possível com CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'Condições como s3:ExistingObjectTag e s3:RequestObjectTag permitem controle por tags em políticas.',
      relatedService: 's3'
    },
    {
      id: 52,
      topic: 's3',
      question: 'Qual vantagem do S3 Storage Lens?',
      context: 'Observabilidade de armazenamento.',
      options: [
        { label: 'A', text: 'Métricas e recomendações em nível de organização/conta/bucket' },
        { label: 'B', text: 'Substitui CloudTrail' },
        { label: 'C', text: 'Fornece WAF nativo' },
        { label: 'D', text: 'Cria VPC automaticamente' }
      ],
      correctAnswer: 'A',
      explanation: 'Storage Lens agrega métricas e mostra insights (ex.: objetos não criptografados, IA elegível, etc.).',
      relatedService: 's3'
    },
    {
      id: 53,
      topic: 's3',
      question: 'Como garantir ordenação de processamento de eventos em alta escala?',
      context: 'Pipeline sensível à ordem.',
      options: [
        { label: 'A', text: 'Encaminhar eventos para SQS FIFO via SNS' },
        { label: 'B', text: 'Usar apenas Lambda direto' },
        { label: 'C', text: 'Replicar objetos' },
        { label: 'D', text: 'Ativar Requester Pays' }
      ],
      correctAnswer: 'A',
      explanation: 'SQS FIFO preserva ordem e exactly-once; útil quando a sequência importa.',
      relatedService: 's3'
    },
    {
      id: 54,
      topic: 's3',
      question: 'Qual mecanismo permite leitura parcial (range) de grandes objetos?',
      context: 'Download retomável e eficiente.',
      options: [
        { label: 'A', text: 'HTTP Range GET (bytes=)' },
        { label: 'B', text: 'S3 sempre envia tudo' },
        { label: 'C', text: 'FTP resumable' },
        { label: 'D', text: 'Glacier Select' }
      ],
      correctAnswer: 'A',
      explanation: 'Range GET baixa apenas partes de um objeto, útil para retomada e paralelismo de download.',
      relatedService: 's3'
    },
    {
      id: 55,
      topic: 's3',
      question: 'Como auditar acessos e mudanças sensíveis no S3 com trilha completa?',
      context: 'Requisitos de auditoria.',
      options: [
        { label: 'A', text: 'CloudTrail (management/data events) + CloudWatch Logs + S3 Access Logs/Server Access' },
        { label: 'B', text: 'Somente CloudWatch Metrics' },
        { label: 'C', text: 'Disable versioning' },
        { label: 'D', text: 'Apenas S3 Inventory' }
      ],
      correctAnswer: 'A',
      explanation: 'Data events rastreiam GetObject/PutObject; Access Logs mapeiam acessos HTTP; combine para trilha robusta.',
      relatedService: 's3'
    },
    {
      id: 56,
      topic: 's3',
      question: 'Qual prática aumenta throughput de leitura em clientes paralelos?',
      context: 'Downstream de big files.',
      options: [
        { label: 'A', text: 'Downloads paralelos com range requests balanceados' },
        { label: 'B', text: 'Aumentar o TTL do DNS' },
        { label: 'C', text: 'Usar ACLs' },
        { label: 'D', text: 'Criar 10 buckets' }
      ],
      correctAnswer: 'A',
      explanation: 'Ranges paralelos permitem múltiplas conexões e maior throughput de leitura por cliente.',
      relatedService: 's3'
    },
    {
      id: 57,
      topic: 's3',
      question: 'Como garantir que apenas um subconjunto de prefixos gere eventos?',
      context: 'Filtrar notificações por pasta/arquivo.',
      options: [
        { label: 'A', text: 'Configurar filtros de prefix/suffix na regra de evento' },
        { label: 'B', text: 'Criar buckets separados sempre' },
        { label: 'C', text: 'Usar ACL read' },
        { label: 'D', text: 'CloudWatch Alarms' }
      ],
      correctAnswer: 'A',
      explanation: 'Filtros reduzem fan-out desnecessário e custos processando apenas caminhos relevantes.',
      relatedService: 's3'
    },
    {
      id: 58,
      topic: 's3',
      question: 'Qual recurso permite acelerar replicação para requisitos de RPO muito baixo?',
      context: 'Near-real-time replication.',
      options: [
        { label: 'A', text: 'Replicação com S3 Replication Time Control (S3 RTC)' },
        { label: 'B', text: 'Somente CRR padrão' },
        { label: 'C', text: 'Athena' },
        { label: 'D', text: 'CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'S3 RTC garante replicação em tempo objetivo de 15 minutos com SLA, reduzindo RPO.',
      relatedService: 's3'
    },
    {
      id: 59,
      topic: 's3',
      question: 'Como reduzir custo de monitoramento do Intelligent-Tiering para bilhões de objetos raramente acessados?',
      context: 'Dataset frio com muitos objetos pequenos.',
      options: [
        { label: 'A', text: 'Habilitar a tier “Archive Instant Access” apenas quando necessário e avaliar custo de monitoração por objeto' },
        { label: 'B', text: 'Migrar tudo para Standard' },
        { label: 'C', text: 'Ativar ACL públicas' },
        { label: 'D', text: 'Usar Glacier Deep Archive sem lifecycle' }
      ],
      correctAnswer: 'A',
      explanation: 'O Intelligent-Tiering cobra por monitoração por objeto; escolha tiers adequadas e considere agrupar objetos muito pequenos.',
      relatedService: 's3'
    },
    {
      id: 60,
      topic: 's3',
      question: 'Como publicar mudanças de política de bucket para auditoria de conformidade?',
      context: 'Time de segurança precisa ser notificado.',
      options: [
        { label: 'A', text: 'CloudTrail event → EventBridge rule → Notificação (SNS/Slack)' },
        { label: 'B', text: 'Somente Console' },
        { label: 'C', text: 'Kinesis Video' },
        { label: 'D', text: 'EC2 cron job' }
      ],
      correctAnswer: 'A',
      explanation: 'EventBridge reage a eventos do CloudTrail e direciona para canais de notificação.',
      relatedService: 's3'
    },
    {
      id: 61,
      topic: 's3',
      question: 'Como manter consistência de metadados gerados após upload (ex.: thumbnails) no mesmo namespace?',
      context: 'Padrões de chaveamento.',
      options: [
        { label: 'A', text: 'Usar nomes derivados (ex.: original.jpg → thumbnails/original_200.jpg)' },
        { label: 'B', text: 'Criar buckets separados por tipo' },
        { label: 'C', text: 'Usar ACLs herdadas' },
        { label: 'D', text: 'Habilitar FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Key naming consistente facilita descoberta e expiração via lifecycle/Inventory.',
      relatedService: 's3'
    },
    {
      id: 62,
      topic: 's3',
      question: 'Como reduzir custo de restore de objetos no Glacier Deep Archive que serão processados em lote?',
      context: 'Relatórios mensais de grandes volumes.',
      options: [
        { label: 'A', text: 'Usar bulk retrieval (mais barato e mais demorado)' },
        { label: 'B', text: 'Sempre expedited (mais caro)' },
        { label: 'C', text: 'Migrar para EBS' },
        { label: 'D', text: 'Desabilitar versioning' }
      ],
      correctAnswer: 'A',
      explanation: 'Para cargas não urgentes, o modo bulk minimiza custos de restore, adequado para processamentos em lote.',
      relatedService: 's3'
    }
  ],
  
  vpc: [
    {
      id: 1,
      topic: 'vpc',
      question: 'Uma VPC foi criada com CIDR 10.0.0.0/16. Quantos endereços IP estão disponíveis para uso?',
      context: 'Arquiteto precisa planejar número de instâncias EC2.',
      options: [
        { label: 'A', text: '65,536 endereços (todos utilizáveis)' },
        { label: 'B', text: '65,531 endereços (AWS reserva 5 IPs por subnet)' },
        { label: 'C', text: '65,536 endereços totais, mas AWS reserva 5 IPs em CADA subnet criada' },
        { label: 'D', text: '256 endereços' }
      ],
      correctAnswer: 'C',
      explanation: '/16 = 65,536 IPs no total na VPC. Porém AWS reserva 5 IPs em CADA SUBNET (não na VPC toda): .0 (rede), .1 (router), .2 (DNS), .3 (futuro), .255 (broadcast). Então IPs utilizáveis dependem de quantas subnets criar. Opção D: 256 seria /24.',
      relatedService: 'vpc'
    },
    {
      id: 2,
      topic: 'vpc',
      question: 'Qual componente permite instâncias EC2 em subnet privada acessarem a internet para updates, mas bloqueia conexões iniciadas da internet?',
      context: 'Instâncias privadas precisam baixar patches do apt/yum.',
      options: [
        { label: 'A', text: 'Internet Gateway' },
        { label: 'B', text: 'NAT Gateway em subnet pública' },
        { label: 'C', text: 'VPC Peering' },
        { label: 'D', text: 'VPN Gateway' }
      ],
      correctAnswer: 'B',
      explanation: 'NAT Gateway permite tráfego OUTBOUND de subnet privada para internet (para updates) mas bloqueia INBOUND. Deve estar em subnet pública. Route table da subnet privada aponta 0.0.0.0/0 para NAT Gateway. Opção A: Internet Gateway é bidirecional (permite inbound). Opções C/D: conectam VPCs/on-premises.',
      relatedService: 'vpc'
    }
  ],
  
  ec2: [
    {
      id: 1,
      topic: 'ec2',
      question: 'Qual tipo de instância EC2 oferece desconto de até 90% para workloads tolerantes a interrupções?',
      context: 'Processamento batch que pode ser pausado e retomado.',
      options: [
        { label: 'A', text: 'On-Demand' },
        { label: 'B', text: 'Reserved Instances' },
        { label: 'C', text: 'Spot Instances' },
        { label: 'D', text: 'Dedicated Hosts' }
      ],
      correctAnswer: 'C',
      explanation: 'Spot Instances oferecem até 90% desconto usando capacidade não utilizada da AWS. Podem ser interrompidas com 2 minutos de aviso quando AWS precisar da capacidade. Ideal para batch, big data, CI/CD. Opção A: On-Demand preço cheio. Opção B: Reserved 75% desconto mas compromisso 1-3 anos. Opção D: Dedicated mais caro.',
      relatedService: 'ec2'
    },
    {
      id: 2,
      topic: 'ec2',
      question: 'Como uma aplicação rodando em EC2 deve obter credenciais AWS sem hardcoded keys?',
      context: 'App precisa acessar S3 e DynamoDB com segurança.',
      options: [
        { label: 'A', text: 'Criar IAM user e colocar access key no código' },
        { label: 'B', text: 'Anexar IAM Role à instância EC2' },
        { label: 'C', text: 'Usar Security Groups' },
        { label: 'D', text: 'Configurar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM Roles fornecem credenciais temporárias automaticamente via instance metadata (169.254.169.254). Credenciais rotacionam automaticamente. NUNCA hardcode access keys. Opção A: inseguro, keys podem vazar. Opção C: Security Groups controlam tráfego de rede. Opção D: VPN conecta redes.',
      relatedService: 'ec2'
    },
    {
      id: 3,
      topic: 'ec2',
      question: 'Quando preferir Launch Templates em vez de Launch Configurations?',
      context: 'Padronizar definições de instância.',
      options: [
        { label: 'A', text: 'Quando precisa de versões, múltiplos grupos de segurança e definições de rede avançadas' },
        { label: 'B', text: 'Quando não quer versionar' },
        { label: 'C', text: 'Quando só usa instance store' },
        { label: 'D', text: 'Quando não precisa de user data' }
      ],
      correctAnswer: 'A',
      explanation: 'Launch Templates suportam versionamento, múltiplos SGs, EBS otimizado, T2/T3 Unlimited, Metal e placement; LCs são legados e mais limitados.',
      relatedService: 'ec2'
    },
    {
      id: 4,
      topic: 'ec2',
      question: 'Quando usar EC2 Fleet ou Spot Fleet?',
      context: 'Buscar capacidade spot em vários pools.',
      options: [
        { label: 'A', text: 'Quando quer misturar On-Demand, Reserved e Spot com estratégias de alocação' },
        { label: 'B', text: 'Quando só usa uma AZ e um tipo' },
        { label: 'C', text: 'Quando precisa de Dedicated Host' },
        { label: 'D', text: 'Quando só quer savings plans' }
      ],
      correctAnswer: 'A',
      explanation: 'EC2/Spot Fleet permite combinar vários instance types/AZs com pesos e alocação diversified/lowestPrice/capacityOptimized.',
      relatedService: 'ec2'
    },
    {
      id: 5,
      topic: 'ec2',
      question: 'Qual placement group prioriza baixa latência e alta banda entre instâncias?',
      context: 'HPC e analytics.',
      options: [
        { label: 'A', text: 'Cluster placement group' },
        { label: 'B', text: 'Spread placement group' },
        { label: 'C', text: 'Partition placement group' },
        { label: 'D', text: 'Nenhum placement' }
      ],
      correctAnswer: 'A',
      explanation: 'Cluster coloca instâncias na mesma rack/AZ para latência baixíssima e alta banda; reduz tolerância a falhas.',
      relatedService: 'ec2'
    },
    {
      id: 6,
      topic: 'ec2',
      question: 'Quando usar Spread placement group?',
      context: 'Reduzir blast radius.',
      options: [
        { label: 'A', text: 'Para distribuir instâncias críticas em racks diferentes' },
        { label: 'B', text: 'Para latência mínima' },
        { label: 'C', text: 'Para workloads single-AZ de baixa banda' },
        { label: 'D', text: 'Para reduzir custo de Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Spread distribui instâncias entre racks/AZ, max 7 por AZ, melhora resiliência a falhas físicas.',
      relatedService: 'ec2'
    },
    {
      id: 7,
      topic: 'ec2',
      question: 'Como evitar throttling em instâncias T3/T4g sob pico?',
      context: 'CPU credit model.',
      options: [
        { label: 'A', text: 'Habilitar T Unlimited ou escolher tipos de performance sustentada (M/C/R)' },
        { label: 'B', text: 'Desativar IMDS' },
        { label: 'C', text: 'Usar Cluster placement' },
        { label: 'D', text: 'Desligar CloudWatch' }
      ],
      correctAnswer: 'A',
      explanation: 'T Unlimited compra créditos extras conforme uso; ou mude para famílias não burstable.',
      relatedService: 'ec2'
    },
    {
      id: 8,
      topic: 'ec2',
      question: 'Quando o hibernation é suportado em EC2?',
      context: 'Retomar mais rápido.',
      options: [
        { label: 'A', text: 'Instâncias compatíveis (Nitro), root EBS encriptado e RAM dentro do limite suportado' },
        { label: 'B', text: 'Sempre em instance store' },
        { label: 'C', text: 'Sempre em Bare Metal' },
        { label: 'D', text: 'Sem necessidade de EBS' }
      ],
      correctAnswer: 'A',
      explanation: 'Hiberna salva RAM em EBS; requer Nitro, root EBS, drivers compatíveis e RAM máxima suportada.',
      relatedService: 'ec2'
    },
    {
      id: 9,
      topic: 'ec2',
      question: 'Quando preferir instance store em vez de EBS?',
      context: 'Performance vs persistência.',
      options: [
        { label: 'A', text: 'Dados efêmeros e altíssima I/O (cache, buffers)' },
        { label: 'B', text: 'Banco relacional durável' },
        { label: 'C', text: 'Backups de longo prazo' },
        { label: 'D', text: 'Logs críticos' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance store é local e some em stop/terminate; útil para cache/temporários de altíssima performance.',
      relatedService: 'ec2'
    },
    {
      id: 10,
      topic: 'ec2',
      question: 'Como aumentar o tamanho de um volume EBS sem downtime?',
      context: 'Crescer disco root.',
      options: [
        { label: 'A', text: 'Usar ModifyVolume e depois estender o filesystem' },
        { label: 'B', text: 'Criar novo volume e terminar a instância' },
        { label: 'C', text: 'Só recriando a AMI' },
        { label: 'D', text: 'Não é possível sem parada' }
      ],
      correctAnswer: 'A',
      explanation: 'ModifyVolume é online; após concluir, expanda a partição/FS no SO.',
      relatedService: 'ec2'
    },
    {
      id: 11,
      topic: 'ec2',
      question: 'Qual diferença principal entre gp2 e gp3?',
      context: 'Escolha de EBS.',
      options: [
        { label: 'A', text: 'gp3 permite provisionar IOPS/throughput independentemente do tamanho e custa menos' },
        { label: 'B', text: 'gp2 sempre mais barato' },
        { label: 'C', text: 'gp3 não suporta boot' },
        { label: 'D', text: 'gp2 permite mais throughput que gp3' }
      ],
      correctAnswer: 'A',
      explanation: 'gp3 separa tamanho de performance (IOPS/MBps) e é mais barato por GB.',
      relatedService: 'ec2'
    },
    {
      id: 12,
      topic: 'ec2',
      question: 'Quando escolher io1/io2 (Provisioned IOPS)?',
      context: 'Bancos críticos.',
      options: [
        { label: 'A', text: 'Workloads de baixa latência e IOPS alto como bancos transacionais' },
        { label: 'B', text: 'Logs frios' },
        { label: 'C', text: 'Backups raros' },
        { label: 'D', text: 'Dados de estática' }
      ],
      correctAnswer: 'A',
      explanation: 'io1/io2 entregam IOPS consistente com SLA, ideal para OLTP e sistemas críticos.',
      relatedService: 'ec2'
    },
    {
      id: 13,
      topic: 'ec2',
      question: 'EBS Multi-Attach é indicado para?',
      context: 'Volumes compartilhados.',
      options: [
        { label: 'A', text: 'Aplicações cluster-aware que gerenciam locking (ex.: alguns FS ou bancos específicos)' },
        { label: 'B', text: 'Qualquer workload sem coordenação' },
        { label: 'C', text: 'Instâncias T2' },
        { label: 'D', text: 'Bare metal apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'Multi-Attach (io1/io2) requer coordenação para evitar corrupção; não é para sistemas que não gerenciam lock.',
      relatedService: 'ec2'
    },
    {
      id: 14,
      topic: 'ec2',
      question: 'Para throughput de rede 10–100 Gbps, o que habilitar?',
      context: 'Rede aprimorada.',
      options: [
        { label: 'A', text: 'Elastic Network Adapter (ENA)' },
        { label: 'B', text: 'IMDSv1' },
        { label: 'C', text: 'DHCP options' },
        { label: 'D', text: 'NTP custom' }
      ],
      correctAnswer: 'A',
      explanation: 'ENA fornece rede aprimorada com alta banda e baixa latência para tipos suportados.',
      relatedService: 'ec2'
    },
    {
      id: 15,
      topic: 'ec2',
      question: 'Quando usar Elastic Fabric Adapter (EFA)?',
      context: 'HPC e MPI.',
      options: [
        { label: 'A', text: 'Aplicações HPC com MPI ou latência ultrabaixa' },
        { label: 'B', text: 'Tráfego web geral' },
        { label: 'C', text: 'Banco relacional' },
        { label: 'D', text: 'Cache Redis' }
      ],
      correctAnswer: 'A',
      explanation: 'EFA oferece latência muito baixa e bypass do kernel para HPC/ML distribuído.',
      relatedService: 'ec2'
    },
    {
      id: 16,
      topic: 'ec2',
      question: 'Por que habilitar IMDSv2?',
      context: 'Segurança de metadata.',
      options: [
        { label: 'A', text: 'Protege contra SSRF exigindo sessão com token' },
        { label: 'B', text: 'Melhora throughput de rede' },
        { label: 'C', text: 'Reduz custo da instância' },
        { label: 'D', text: 'Substitui SGs' }
      ],
      correctAnswer: 'A',
      explanation: 'IMDSv2 exige requests assinados com token TTL e bloqueia simples HTTP SSRF.',
      relatedService: 'ec2'
    },
    {
      id: 17,
      topic: 'ec2',
      question: 'Diferença entre Stop e Terminate em instâncias com root EBS?',
      context: 'Ciclo de vida.',
      options: [
        { label: 'A', text: 'Stop preserva EBS e o endereço privado; Terminate encerra e deleta EBS se deleteOnTermination=true' },
        { label: 'B', text: 'Stop sempre deleta volumes' },
        { label: 'C', text: 'Terminate mantém IP público' },
        { label: 'D', text: 'Stop muda tenancy' }
      ],
      correctAnswer: 'A',
      explanation: 'Stop mantém volume e IP privado; terminate encerra recursos dependendo de flags.',
      relatedService: 'ec2'
    },
    {
      id: 18,
      topic: 'ec2',
      question: 'Reserved Instance vs Savings Plan: qual diferença chave?',
      context: 'Otimização de custo.',
      options: [
        { label: 'A', text: 'RIs são por região/tenancy/instância; Savings Plans (Compute) cobrem mais flexível inclusive Fargate/Lambda' },
        { label: 'B', text: 'RIs sempre cobrem Lambda' },
        { label: 'C', text: 'Savings Plans exigem Dedicated Host' },
        { label: 'D', text: 'Nenhuma diferença' }
      ],
      correctAnswer: 'A',
      explanation: 'RIs fixam atributos; Compute Savings Plans aplicam a EC2, Fargate, Lambda com flexibilidade por família/OS/AZ.',
      relatedService: 'ec2'
    },
    {
      id: 19,
      topic: 'ec2',
      question: 'Quando usar Dedicated Hosts em vez de Dedicated Instances?',
      context: 'Licenciamento e visibilidade de socket/core.',
      options: [
        { label: 'A', text: 'Quando precisa pinagem de host e licenças por socket/core (ex.: Oracle/SQL)' },
        { label: 'B', text: 'Quando quer menor controle de host físico' },
        { label: 'C', text: 'Quando quer spot barato' },
        { label: 'D', text: 'Quando só precisa Nitro' }
      ],
      correctAnswer: 'A',
      explanation: 'Dedicated Host dá visibilidade do host para compliance/licenciamento; Dedicated Instance isola mas sem controle de host.',
      relatedService: 'ec2'
    },
    {
      id: 20,
      topic: 'ec2',
      question: 'Para garantir capacidade em janelas críticas sem desconto, usar o quê?',
      context: 'Garantia de capacidade.',
      options: [
        { label: 'A', text: 'On-Demand Capacity Reservation' },
        { label: 'B', text: 'Spot' },
        { label: 'C', text: 'Savings Plans' },
        { label: 'D', text: 'NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Capacity Reservations garantem slots On-Demand na AZ, úteis para DR/testes datados.',
      relatedService: 'ec2'
    },
    {
      id: 21,
      topic: 'ec2',
      question: 'O que acontece com instance store ao parar (stop) uma instância?',
      context: 'Persistência.',
      options: [
        { label: 'A', text: 'Os dados são perdidos' },
        { label: 'B', text: 'Dados persistem' },
        { label: 'C', text: 'Vira EBS' },
        { label: 'D', text: 'É migrado para S3' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance store é efêmero e some em stop/terminate.',
      relatedService: 'ec2'
    },
    {
      id: 22,
      topic: 'ec2',
      question: 'Para múltiplos IPs na mesma instância, o que usar?',
      context: 'IP secundário.',
      options: [
        { label: 'A', text: 'Atribuir secondary private IPs a uma ENI e opcionalmente EIPs' },
        { label: 'B', text: 'Criar outra VPC' },
        { label: 'C', text: 'Criar outro SG' },
        { label: 'D', text: 'Habilitar DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'ENIs suportam múltiplos IPs privados; EIP pode ser associado a cada IP secundário (dependendo do tipo).',
      relatedService: 'ec2'
    },
    {
      id: 23,
      topic: 'ec2',
      question: 'Como proteger chaves SSH e ainda permitir acesso ao servidor?',
      context: 'Acesso seguro.',
      options: [
        { label: 'A', text: 'Usar SSM Session Manager em vez de expor SSH público' },
        { label: 'B', text: 'Abrir SSH 0.0.0.0/0' },
        { label: 'C', text: 'Colar chave no user data' },
        { label: 'D', text: 'Desativar SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Session Manager evita portas abertas e usa IAM + logging. SSH 0.0.0.0/0 é arriscado.',
      relatedService: 'ec2'
    },
    {
      id: 24,
      topic: 'ec2',
      question: 'Como reutilizar um AMI custom em outra região?',
      context: 'Expansão multi-região.',
      options: [
        { label: 'A', text: 'Copiar a AMI para a outra região via console/CLI' },
        { label: 'B', text: 'AMI é global automaticamente' },
        { label: 'C', text: 'Exportar para CSV' },
        { label: 'D', text: 'Usar apenas marketplace' }
      ],
      correctAnswer: 'A',
      explanation: 'AMIs são regionais; copie para replicar em outras regiões.',
      relatedService: 'ec2'
    },
    {
      id: 25,
      topic: 'ec2',
      question: 'Como aplicar paradas automáticas fora do horário?',
      context: 'Economia.',
      options: [
        { label: 'A', text: 'AWS Instance Scheduler ou EventBridge + SSM para stop/start' },
        { label: 'B', text: 'Deletar instâncias' },
        { label: 'C', text: 'Criar VPN' },
        { label: 'D', text: 'Trocar SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Automatize janelas de stop/start para reduzir custo de dev/test.',
      relatedService: 'ec2'
    },
    {
      id: 26,
      topic: 'ec2',
      question: 'Como reforçar segurança do metadata service?',
      context: 'IMDS.',
      options: [
        { label: 'A', text: 'Exigir IMDSv2 e bloquear hop-count >1 (http tokens=required, h1/ttl=1)' },
        { label: 'B', text: 'Desativar metadata' },
        { label: 'C', text: 'Usar IMDSv1 apenas' },
        { label: 'D', text: 'Abrir porta 80 para internet' }
      ],
      correctAnswer: 'A',
      explanation: 'IMDSv2 com ttl=1 mitiga SSRF; só desative IMDS se não usar.',
      relatedService: 'ec2'
    },
    {
      id: 27,
      topic: 'ec2',
      question: 'Como garantir que user data rode a cada boot?',
      context: 'Inicialização.',
      options: [
        { label: 'A', text: 'Habilitar user data redeployment (cloud-init) ou colocar lógica idempotente' },
        { label: 'B', text: 'User data sempre roda a cada boot por padrão' },
        { label: 'C', text: 'User data nunca roda em reboot' },
        { label: 'D', text: 'Depende do SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Por padrão roda apenas no primeiro boot; use flag em cloud-init ou scripts idempotentes.',
      relatedService: 'ec2'
    },
    {
      id: 28,
      topic: 'ec2',
      question: 'Como reagir a falhas detectadas pelo status check da instância?',
      context: 'Auto Recovery.',
      options: [
        { label: 'A', text: 'Habilitar EC2 Auto Recovery para recriar em hardware saudável' },
        { label: 'B', text: 'Terminar manualmente' },
        { label: 'C', text: 'Nada pode ser feito' },
        { label: 'D', text: 'Mover para outra conta' }
      ],
      correctAnswer: 'A',
      explanation: 'Auto Recovery recria a instância preservando metadata, ENI e EBS na mesma AZ.',
      relatedService: 'ec2'
    },
    {
      id: 29,
      topic: 'ec2',
      question: 'Qual endpoint do metadata retorna credenciais temporárias da role?',
      context: 'Acesso programático.',
      options: [
        { label: 'A', text: '169.254.169.254/latest/meta-data/iam/security-credentials/<role-name>' },
        { label: 'B', text: '169.254.169.254/user-data' },
        { label: 'C', text: 'SSM Parameter Store' },
        { label: 'D', text: 'Secrets Manager' }
      ],
      correctAnswer: 'A',
      explanation: 'IMDS expõe creds temporárias em /iam/security-credentials/<role>.',
      relatedService: 'ec2'
    },
    {
      id: 30,
      topic: 'ec2',
      question: 'Diferença entre Elastic IP e IP público padrão?',
      context: 'Endereçamento.',
      options: [
        { label: 'A', text: 'EIP é estático e persiste após stop/start; IP público padrão muda ao parar' },
        { label: 'B', text: 'IP público padrão é fixo' },
        { label: 'C', text: 'EIP some ao stop' },
        { label: 'D', text: 'EIP não pode ser reassociado' }
      ],
      correctAnswer: 'A',
      explanation: 'EIP é estático e reatribuível; IP público efêmero muda após stop/start.',
      relatedService: 'ec2'
    },
    {
      id: 31,
      topic: 'ec2',
      question: 'Como evitar terminação acidental?',
      context: 'Proteção.',
      options: [
        { label: 'A', text: 'Ativar termination protection na instância' },
        { label: 'B', text: 'Abrir SG' },
        { label: 'C', text: 'Desativar CloudWatch' },
        { label: 'D', text: 'Usar IMDSv1' }
      ],
      correctAnswer: 'A',
      explanation: 'Termination protection bloqueia terminate via API/console até ser desativada.',
      relatedService: 'ec2'
    },
    {
      id: 32,
      topic: 'ec2',
      question: 'Como obter logs de console e screenshots de boot para troubleshooting?',
      context: 'Diagnóstico.',
      options: [
        { label: 'A', text: 'Usar GetConsoleOutput/GetConsoleScreenshot ou via console' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Somente com Elastic IP' },
        { label: 'D', text: 'Apenas com Dedicated Host' }
      ],
      correctAnswer: 'A',
      explanation: 'APIs/console permitem recuperar output e screenshot para analisar falhas de boot.',
      relatedService: 'ec2'
    },
    {
      id: 33,
      topic: 'ec2',
      question: 'Como fixar uma versão específica de Launch Template em um ASG?',
      context: 'Evitar mudanças inesperadas.',
      options: [
        { label: 'A', text: 'Referenciar a versão exata (numérica) ao configurar o ASG' },
        { label: 'B', text: 'Usar “latest” sempre' },
        { label: 'C', text: 'Usar Launch Configuration' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Defina a versão do template no ASG (número ou $Default/$Latest). Para estabilidade, use versão fixa.',
      relatedService: 'ec2'
    },
    {
      id: 34,
      topic: 'ec2',
      question: 'Qual diferença entre Dedicated Instance e Dedicated Host?',
      context: 'Licenciamento e isolamento.',
      options: [
        { label: 'A', text: 'Dedicated Host expõe soquetes/núcleos para BYOL; Dedicated Instance apenas garante hardware exclusivo' },
        { label: 'B', text: 'São idênticos' },
        { label: 'C', text: 'Dedicated Host é compartilhado' },
        { label: 'D', text: 'Dedicated Instance sempre usa Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Dedicated Host dá controle de host para licenças por socket/core; Dedicated Instance só isola hardware.',
      relatedService: 'ec2'
    },
    {
      id: 35,
      topic: 'ec2',
      question: 'Quantas IAM roles uma instância pode ter?',
      context: 'Instance profile.',
      options: [
        { label: 'A', text: 'Apenas uma role por instance profile (pode ser trocada em runtime)' },
        { label: 'B', text: 'Ilimitadas' },
        { label: 'C', text: 'Depende do tipo' },
        { label: 'D', text: 'Somente se IMDSv1' }
      ],
      correctAnswer: 'A',
      explanation: 'Cada instância tem um instance profile com uma role; é possível trocar a role via API.',
      relatedService: 'ec2'
    },
    {
      id: 36,
      topic: 'ec2',
      question: 'Como acessar instâncias privadas via console sem abrir portas?',
      context: 'Acesso seguro.',
      options: [
        { label: 'A', text: 'SSM Session Manager com VPC endpoints (ssm, ssmmessages, ec2messages)' },
        { label: 'B', text: 'SSH 0.0.0.0/0' },
        { label: 'C', text: 'Port forwarding via IGW' },
        { label: 'D', text: 'Abrir RDP público' }
      ],
      correctAnswer: 'A',
      explanation: 'Session Manager evita portas abertas; com endpoints, funciona sem internet.',
      relatedService: 'ec2'
    },
    {
      id: 37,
      topic: 'ec2',
      question: 'Quando um Elastic IP é cobrado?',
      context: 'Custos de rede.',
      options: [
        { label: 'A', text: 'Quando não está associado ou quando associado a instância parada' },
        { label: 'B', text: 'Nunca' },
        { label: 'C', text: 'Apenas em Dedicated Host' },
        { label: 'D', text: 'Só em múltiplas AZs' }
      ],
      correctAnswer: 'A',
      explanation: 'EIPs ociosos ou em instâncias paradas são cobrados; use somente quando necessário.',
      relatedService: 'ec2'
    },
    {
      id: 38,
      topic: 'ec2',
      question: 'Como garantir que todos os volumes novos sejam criptografados por padrão?',
      context: 'Segurança em EBS.',
      options: [
        { label: 'A', text: 'Habilitar EBS encryption by default na região' },
        { label: 'B', text: 'Criar KMS manual para cada volume' },
        { label: 'C', text: 'Usar apenas gp2' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Encryption by default força novos volumes/snapshots a serem criptografados automaticamente.',
      relatedService: 'ec2'
    },
    {
      id: 39,
      topic: 'ec2',
      question: 'Como copiar um snapshot criptografado para outra região?',
      context: 'DR multi-região.',
      options: [
        { label: 'A', text: 'Copiar snapshot e escolher/fornecer uma CMK na região destino' },
        { label: 'B', text: 'Snapshots criptografados não copiam' },
        { label: 'C', text: 'Descriptografar antes' },
        { label: 'D', text: 'Usar apenas KMS default da origem' }
      ],
      correctAnswer: 'A',
      explanation: 'Cópia permite recriptografar com CMK da região alvo; não é necessário descriptografar.',
      relatedService: 'ec2'
    },
    {
      id: 40,
      topic: 'ec2',
      question: 'Qual benefício da arquitetura Nitro?',
      context: 'Segurança e performance.',
      options: [
        { label: 'A', text: 'Offload de virtualização para hardware, maior performance e segurança de isolamento' },
        { label: 'B', text: 'Somente suporta Windows' },
        { label: 'C', text: 'Remove EBS' },
        { label: 'D', text: 'Impede hibernation' }
      ],
      correctAnswer: 'A',
      explanation: 'Nitro separa funções, entrega I/O mais alto, NVMe, melhor segurança.',
      relatedService: 'ec2'
    },
    {
      id: 41,
      topic: 'ec2',
      question: 'É possível mover um Elastic IP entre instâncias?',
      context: 'Failover manual.',
      options: [
        { label: 'A', text: 'Sim, reatribuindo o EIP para outra ENI/instância na mesma região' },
        { label: 'B', text: 'Não, é fixo à instância' },
        { label: 'C', text: 'Apenas via DX' },
        { label: 'D', text: 'Somente com NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'EIPs podem ser reatribuídos rapidamente para failover manual.',
      relatedService: 'ec2'
    },
    {
      id: 42,
      topic: 'ec2',
      question: 'Limitação do cluster placement group:',
      context: 'Escopo AZ.',
      options: [
        { label: 'A', text: 'Precisa estar em uma única AZ' },
        { label: 'B', text: 'Suporta múltiplas regiões' },
        { label: 'C', text: 'É global' },
        { label: 'D', text: 'Exige IPv6' }
      ],
      correctAnswer: 'A',
      explanation: 'Cluster PG é single-AZ para máxima proximidade.',
      relatedService: 'ec2'
    },
    {
      id: 43,
      topic: 'ec2',
      question: 'Quando usar Partition placement group?',
      context: 'Sistemas distribuídos.',
      options: [
        { label: 'A', text: 'Workloads como Hadoop, Kafka, Cassandra para isolar partições em racks distintos' },
        { label: 'B', text: 'Tráfego web simples' },
        { label: 'C', text: 'Instâncias T2' },
        { label: 'D', text: 'Para obrigar uma AZ única' }
      ],
      correctAnswer: 'A',
      explanation: 'Partition PG isola grupos de instâncias por partição/rack, útil para big data distribuído; pode abranger múltiplas AZs.',
      relatedService: 'ec2'
    },
    {
      id: 44,
      topic: 'ec2',
      question: 'Limite de instâncias por AZ em Spread placement group?',
      context: 'Resiliência.',
      options: [
        { label: 'A', text: 'Até 7 por AZ' },
        { label: 'B', text: 'Até 2' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: 'Apenas 1 por região' }
      ],
      correctAnswer: 'A',
      explanation: 'Spread limita 7 por AZ para garantir separação física.',
      relatedService: 'ec2'
    },
    {
      id: 45,
      topic: 'ec2',
      question: 'O que acontece com o IP público ao parar e iniciar uma instância sem EIP?',
      context: 'Endereço público.',
      options: [
        { label: 'A', text: 'O IP público muda; o privado permanece' },
        { label: 'B', text: 'Ambos permanecem' },
        { label: 'C', text: 'Perde o privado' },
        { label: 'D', text: 'EIP é criado' }
      ],
      correctAnswer: 'A',
      explanation: 'IPs públicos padrão são efêmeros; privados permanecem.',
      relatedService: 'ec2'
    },
    {
      id: 46,
      topic: 'ec2',
      question: 'Auto Recovery preserva o quê?',
      context: 'Falha de hardware.',
      options: [
        { label: 'A', text: 'ID da instância, EBS, IP privado e metadados' },
        { label: 'B', text: 'EIP é perdido' },
        { label: 'C', text: 'AMI muda' },
        { label: 'D', text: 'Move entre regiões' }
      ],
      correctAnswer: 'A',
      explanation: 'Auto Recovery recria em hardware novo mantendo identidade e volumes.',
      relatedService: 'ec2'
    },
    {
      id: 47,
      topic: 'ec2',
      question: 'Qual aviso é recebido antes de interrupção Spot?',
      context: 'Spot interruptions.',
      options: [
        { label: 'A', text: 'Aviso de 2 minutos via IMDS/CloudWatch Events' },
        { label: 'B', text: 'Nenhum aviso' },
        { label: 'C', text: '30 minutos' },
        { label: 'D', text: 'E-mail apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'AWS envia aviso de 2 minutos para encerrar/hibernar/stop se configurado.',
      relatedService: 'ec2'
    },
    {
      id: 48,
      topic: 'ec2',
      question: 'Estratégia de alocação Spot com menor taxa de interrupção?',
      context: 'Estabilidade.',
      options: [
        { label: 'A', text: 'capacity-optimized' },
        { label: 'B', text: 'lowest-price' },
        { label: 'C', text: 'all-at-once' },
        { label: 'D', text: 'random' }
      ],
      correctAnswer: 'A',
      explanation: 'capacity-optimized escolhe pools com capacidade sobrando, reduzindo interrupções.',
      relatedService: 'ec2'
    },
    {
      id: 49,
      topic: 'ec2',
      question: 'Um reboot preserva dados em instance store?',
      context: 'Persistência.',
      options: [
        { label: 'A', text: 'Sim, reboot não limpa instance store' },
        { label: 'B', text: 'Não, perde tudo' },
        { label: 'C', text: 'Depende do SG' },
        { label: 'D', text: 'Depende do tipo de AMI' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance store persiste em reboot, mas não em stop/terminate.',
      relatedService: 'ec2'
    },
    {
      id: 50,
      topic: 'ec2',
      question: 'Como proteger licenças BYOL Windows/SQL?',
      context: 'Licenciamento.',
      options: [
        { label: 'A', text: 'Usar Dedicated Hosts para visibilidade de soquetes/núcleos' },
        { label: 'B', text: 'Usar Spot' },
        { label: 'C', text: 'Usar EIP' },
        { label: 'D', text: 'Usar gp3' }
      ],
      correctAnswer: 'A',
      explanation: 'BYOL geralmente requer Dedicated Host para compliance.',
      relatedService: 'ec2'
    },
    {
      id: 51,
      topic: 'ec2',
      question: 'Como obter métricas de memória/disco no CloudWatch sem agente?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'Não é nativo; instale CloudWatch Agent/SSM para métricas detalhadas' },
        { label: 'B', text: 'Disponível por padrão' },
        { label: 'C', text: 'Apenas via VPC Flow Logs' },
        { label: 'D', text: 'Via IAM policy' }
      ],
      correctAnswer: 'A',
      explanation: 'Métricas detalhadas (memória/disk) exigem agente; nativo só CPU/network/disk I/O.',
      relatedService: 'ec2'
    },
    {
      id: 52,
      topic: 'ec2',
      question: 'Como associar SGs a uma ENI em execução?',
      context: 'Alteração dinâmica.',
      options: [
        { label: 'A', text: 'É possível alterar SGs de uma ENI a quente via console/CLI' },
        { label: 'B', text: 'Só ao criar instância' },
        { label: 'C', text: 'Requer parar instância' },
        { label: 'D', text: 'Requer migrar VPC' }
      ],
      correctAnswer: 'A',
      explanation: 'SGs podem ser atualizados em runtime, afetando tráfego imediatamente.',
      relatedService: 'ec2'
    },
    {
      id: 53,
      topic: 'ec2',
      question: 'Qual família escolher para GPU de inferência econômica?',
      context: 'Workload ML.',
      options: [
        { label: 'A', text: 'G-family (ex.: G5/G6) para gráficos e inferência' },
        { label: 'B', text: 'T3' },
        { label: 'C', text: 'R6g' },
        { label: 'D', text: 'C7g' }
      ],
      correctAnswer: 'A',
      explanation: 'G-family foca em GPU para gráficos/inferência; P-family para treino pesado.',
      relatedService: 'ec2'
    },
    {
      id: 54,
      topic: 'ec2',
      question: 'AMI e snapshots são incrementais?',
      context: 'Armazenamento.',
      options: [
        { label: 'A', text: 'Snapshots EBS são incrementais; AMI referencia snapshots' },
        { label: 'B', text: 'AMI copia tudo sem snapshot' },
        { label: 'C', text: 'Snapshots não são incrementais' },
        { label: 'D', text: 'AMI é global' }
      ],
      correctAnswer: 'A',
      explanation: 'Snapshots guardam apenas blocos alterados; AMI associa snapshots para cada volume.',
      relatedService: 'ec2'
    },
    {
      id: 55,
      topic: 'ec2',
      question: 'Como aplicar tags automaticamente a volumes EBS criados pela instância?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Definir tags em Launch Template/ASG para propagarem a volumes' },
        { label: 'B', text: 'Somente manual' },
        { label: 'C', text: 'Usar DHCP' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Launch Templates/ASG podem propagar tags para volumes, mantendo governança.',
      relatedService: 'ec2'
    },
    {
      id: 56,
      topic: 'ec2',
      question: 'O que é Nitro Enclaves?',
      context: 'Isolamento de dados sensíveis.',
      options: [
        { label: 'A', text: 'Ambiente isolado para processamento seguro, sem rede/armazenamento persistente' },
        { label: 'B', text: 'Nova família de instância' },
        { label: 'C', text: 'Substituto de SG' },
        { label: 'D', text: 'Serviço de banco' }
      ],
      correctAnswer: 'A',
      explanation: 'Enclaves isolam processos sensíveis e usam KMS attestation.',
      relatedService: 'ec2'
    },
    {
      id: 57,
      topic: 'ec2',
      question: 'Como migrar uma instância para outra subnet?',
      context: 'Mudança de rede.',
      options: [
        { label: 'A', text: 'Precisar recriar/reattach a ENI em outra subnet ou relançar a instância' },
        { label: 'B', text: 'Alterar subnet diretamente' },
        { label: 'C', text: 'Trocar AZ sem parar' },
        { label: 'D', text: 'Mover com EIP apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnet é fixa à ENI; para mudar, mova/reattribua ENI ou recrie instância na subnet desejada.',
      relatedService: 'ec2'
    },
    {
      id: 58,
      topic: 'ec2',
      question: 'Qual benefício de Capacity Reservations sobre RIs?',
      context: 'Capacidade garantida.',
      options: [
        { label: 'A', text: 'Garantem capacidade On-Demand imediata na AZ, sem compromisso de longo prazo' },
        { label: 'B', text: 'Sempre mais baratos' },
        { label: 'C', text: 'Aplicam em Lambda' },
        { label: 'D', text: 'São globais' }
      ],
      correctAnswer: 'A',
      explanation: 'Reservations garantem slots; preço é On-Demand; podem combinar com RIs/Savings Plans para desconto.',
      relatedService: 'ec2'
    },
    {
      id: 59,
      topic: 'ec2',
      question: 'Como reduzir impacto de perda de dados em instance store?',
      context: 'Resiliência.',
      options: [
        { label: 'A', text: 'Replicar/flush para EBS ou S3 periodicamente' },
        { label: 'B', text: 'Depender do reboot' },
        { label: 'C', text: 'Usar IMDSv1' },
        { label: 'D', text: 'Usar NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance store é efêmero; sincronize para armazenamento durável.',
      relatedService: 'ec2'
    },
    {
      id: 60,
      topic: 'ec2',
      question: 'Qual família otimizada para memória?',
      context: 'Workloads in-memory.',
      options: [
        { label: 'A', text: 'R-family (R6g/R7i etc.)' },
        { label: 'B', text: 'C-family' },
        { label: 'C', text: 'M-family' },
        { label: 'D', text: 'I-family' }
      ],
      correctAnswer: 'A',
      explanation: 'R é otimizada para memória (Redis, SAP HANA). C é compute, M é balanceada, I é storage-optimized.',
      relatedService: 'ec2'
    },
    {
      id: 61,
      topic: 'ec2',
      question: 'Como exigir IMDSv2 em uma instância já existente?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Alterar atributo http-tokens=require e http-put-response-hop-limit=1' },
        { label: 'B', text: 'Recriar a instância' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'Trocar AMI' }
      ],
      correctAnswer: 'A',
      explanation: 'Pode-se alterar atributos IMDS em runtime para exigir v2 e limitar hop.',
      relatedService: 'ec2'
    },
    {
      id: 62,
      topic: 'ec2',
      question: 'O que são ENIs secundárias em failover?',
      context: 'Alta disponibilidade.',
      options: [
        { label: 'A', text: 'Podem ser destacadas e anexadas a outra instância na mesma AZ para failover rápido' },
        { label: 'B', text: 'São fixas à instância' },
        { label: 'C', text: 'Servem só para IPv6' },
        { label: 'D', text: 'Não suportam EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'ENIs podem ser movidas dentro da mesma AZ, permitindo failover manual com IPs/SGs preservados.',
      relatedService: 'ec2'
    },
    {
      id: 63,
      topic: 'ec2',
      question: 'Pré-requisitos para hibernation?',
      context: 'Retomar rápido.',
      options: [
        { label: 'A', text: 'Instância suportada, root EBS criptografado, memória salva no EBS, tamanho de volume adequado' },
        { label: 'B', text: 'Instance store obrigatório' },
        { label: 'C', text: 'Apenas Windows' },
        { label: 'D', text: 'Precisa de EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Hibernation suporta tipos Nitro; estado RAM vai para EBS criptografado.',
      relatedService: 'ec2'
    },
    {
      id: 64,
      topic: 'ec2',
      question: 'Parar vs terminar: qual cobra EBS?',
      context: 'Custos de volume.',
      options: [
        { label: 'A', text: 'Parar mantém e cobra EBS; terminar apaga se delete-on-termination=on' },
        { label: 'B', text: 'Ambos removem EBS' },
        { label: 'C', text: 'Parar é gratuito' },
        { label: 'D', text: 'Terminar mantém EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Stop mantém volumes (custos continuam); terminate remove se flag ativa.',
      relatedService: 'ec2'
    },
    {
      id: 65,
      topic: 'ec2',
      question: 'Como compartilhar uma AMI privada com outra conta?',
      context: 'Reuso de imagem.',
      options: [
        { label: 'A', text: 'Compartilhar AMI e snapshots associados com a conta destino' },
        { label: 'B', text: 'Copiar via S3' },
        { label: 'C', text: 'Somente pública' },
        { label: 'D', text: 'Precisa de EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Permissões devem ser aplicadas na AMI e nos snapshots para a conta destino.',
      relatedService: 'ec2'
    },
    {
      id: 66,
      topic: 'ec2',
      question: 'Qual é a diferença central entre Spot e Reserved?',
      context: 'Modelo de compra.',
      options: [
        { label: 'A', text: 'Spot pode ser interrompido; Reserved garante desconto para uso estável' },
        { label: 'B', text: 'Spot é sempre mais caro' },
        { label: 'C', text: 'Reserved é por segundo' },
        { label: 'D', text: 'Spot exige Dedicated Host' }
      ],
      correctAnswer: 'A',
      explanation: 'Spot usa capacidade ociosa e pode ser interrompida; RIs/Savings Plans reduzem custo de uso contínuo.',
      relatedService: 'ec2'
    },
    {
      id: 67,
      topic: 'ec2',
      question: 'Como funciona CPU credit em T-family?',
      context: 'Burstable.',
      options: [
        { label: 'A', text: 'Acumula créditos quando abaixo do baseline e gasta ao estourar' },
        { label: 'B', text: 'Sempre throttled' },
        { label: 'C', text: 'Sem baseline' },
        { label: 'D', text: 'Só para rede' }
      ],
      correctAnswer: 'A',
      explanation: 'Instâncias T ganham créditos no baseline e usam para picos de CPU.',
      relatedService: 'ec2'
    },
    {
      id: 68,
      topic: 'ec2',
      question: 'O que é T Unlimited?',
      context: 'Controle de custo.',
      options: [
        { label: 'A', text: 'Permite exceder créditos com tarifa adicional se uso médio ultrapassa baseline' },
        { label: 'B', text: 'Remove baseline' },
        { label: 'C', text: 'Exige BYOL' },
        { label: 'D', text: 'Só em VPC default' }
      ],
      correctAnswer: 'A',
      explanation: 'T Unlimited evita throttling cobrando surplus se necessário.',
      relatedService: 'ec2'
    },
    {
      id: 69,
      topic: 'ec2',
      question: 'Quando habilitar ENA (enhanced networking)?',
      context: 'Performance de rede.',
      options: [
        { label: 'A', text: 'Para maior throughput/baixa latência com SR-IOV' },
        { label: 'B', text: 'Para desativar rede' },
        { label: 'C', text: 'Somente em T2' },
        { label: 'D', text: 'Para IPv6 apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'ENA libera alta performance de rede em tipos suportados.',
      relatedService: 'ec2'
    },
    {
      id: 70,
      topic: 'ec2',
      question: 'Quantas ENIs uma instância pode ter?',
      context: 'Limite por tipo.',
      options: [
        { label: 'A', text: 'Depende do tipo/tamanho; cada família tem limites de ENI e IPs por ENI' },
        { label: 'B', text: 'Apenas 1 sempre' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: 'Fixos em 2' }
      ],
      correctAnswer: 'A',
      explanation: 'Limites de ENI/IP variam por tipo e podem ser consultados na doc.',
      relatedService: 'ec2'
    },
    {
      id: 71,
      topic: 'ec2',
      question: 'Como associar EIP a um IP privado secundário?',
      context: 'Multi-IP.',
      options: [
        { label: 'A', text: 'Alocar IP privado secundário na ENI e associar EIP a ele' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Precisa de NAT GW' },
        { label: 'D', text: 'Só com TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'EIPs podem mapear para IPs privados secundários na mesma ENI.',
      relatedService: 'ec2'
    },
    {
      id: 72,
      topic: 'ec2',
      question: 'User data executa quantas vezes por padrão?',
      context: 'Bootstrapping.',
      options: [
        { label: 'A', text: 'Uma vez por boot (cloud-init), a menos que configurado para reexecutar' },
        { label: 'B', text: 'Nunca' },
        { label: 'C', text: 'Toda hora' },
        { label: 'D', text: 'Somente em Windows' }
      ],
      correctAnswer: 'A',
      explanation: 'User data padrão roda em cada boot se não marcado como “per-boot once” via cloud-init.',
      relatedService: 'ec2'
    },
    {
      id: 73,
      topic: 'ec2',
      question: 'Como garantir capacidade imediata em uma AZ?',
      context: 'Disponibilidade.',
      options: [
        { label: 'A', text: 'Criar Capacity Reservation ou zonal RI' },
        { label: 'B', text: 'Usar apenas Spot' },
        { label: 'C', text: 'Criar AMI' },
        { label: 'D', text: 'Ativar IMDSv2' }
      ],
      correctAnswer: 'A',
      explanation: 'Capacity Reservations garantem slots de capacidade On-Demand na AZ.',
      relatedService: 'ec2'
    },
    {
      id: 74,
      topic: 'ec2',
      question: 'Flag delete-on-termination em volumes root faz o quê?',
      context: 'Retenção de dados.',
      options: [
        { label: 'A', text: 'Define se o volume root será removido ao terminar a instância' },
        { label: 'B', text: 'Criptografa volume' },
        { label: 'C', text: 'Aumenta IOPS' },
        { label: 'D', text: 'Muda AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'Delete-on-termination controla retenção do volume root após terminate.',
      relatedService: 'ec2'
    },
    {
      id: 75,
      topic: 'ec2',
      question: 'Como alterar tipo/IOPS de um volume EBS existente?',
      context: 'Reconfiguração.',
      options: [
        { label: 'A', text: 'Usar ModifyVolume para mudar tipo/tamanho/IOPS online na maioria dos casos' },
        { label: 'B', text: 'Precisa recriar volume' },
        { label: 'C', text: 'Somente em stop' },
        { label: 'D', text: 'Só com gp2' }
      ],
      correctAnswer: 'A',
      explanation: 'ModifyVolume permite alterações dinâmicas; alguns tipos podem exigir filesystem resize.',
      relatedService: 'ec2'
    },
    {
      id: 76,
      topic: 'ec2',
      question: 'Qual a granularidade de cobrança On-Demand Linux?',
      context: 'Billing.',
      options: [
        { label: 'A', text: 'Por segundo após o primeiro minuto' },
        { label: 'B', text: 'Por hora sempre' },
        { label: 'C', text: 'Por dia' },
        { label: 'D', text: 'Mensal fixo' }
      ],
      correctAnswer: 'A',
      explanation: 'Linux/Unix On-Demand é faturado por segundo (mínimo 1 min) na maioria dos tipos.',
      relatedService: 'ec2'
    },
    {
      id: 77,
      topic: 'ec2',
      question: 'Como aumentar throughput de rede para HPC?',
      context: 'HPC networking.',
      options: [
        { label: 'A', text: 'Usar placement group de cluster + ENA/EFA em instâncias suportadas' },
        { label: 'B', text: 'Usar T2' },
        { label: 'C', text: 'Desativar SG' },
        { label: 'D', text: 'Usar IPv4 público' }
      ],
      correctAnswer: 'A',
      explanation: 'Cluster PG + ENA/EFA entrega baixa latência e alta largura de banda.',
      relatedService: 'ec2'
    },
    {
      id: 78,
      topic: 'ec2',
      question: 'Quando usar Elastic Fabric Adapter (EFA)?',
      context: 'HPC/ML distribuído.',
      options: [
        { label: 'A', text: 'MPI/HPC ou treinamento distribuído que requer latência ultrabaixa' },
        { label: 'B', text: 'Web server simples' },
        { label: 'C', text: 'Para NAT' },
        { label: 'D', text: 'Para EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'EFA otimiza HPC com libfabric e bypass do kernel para MPI.',
      relatedService: 'ec2'
    },
    {
      id: 79,
      topic: 'ec2',
      question: 'IPv6-only subnet precisa de quê para saída?',
      context: 'Navegação.',
      options: [
        { label: 'A', text: 'Egress-only Internet Gateway para tráfego de saída IPv6' },
        { label: 'B', text: 'NAT Gateway IPv4' },
        { label: 'C', text: 'Não precisa' },
        { label: 'D', text: 'VGW' }
      ],
      correctAnswer: 'A',
      explanation: 'IPv6 usa egress-only IGW para saída sem entrada não solicitada.',
      relatedService: 'ec2'
    },
    {
      id: 80,
      topic: 'ec2',
      question: 'Como proteger acesso ao IMDS?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Exigir IMDSv2 e restringir hop-limit; bloquear 169.254.169.254 se não usado' },
        { label: 'B', text: 'Colocar SG' },
        { label: 'C', text: 'Usar DHCP option set' },
        { label: 'D', text: 'Desativar VPC' }
      ],
      correctAnswer: 'A',
      explanation: 'IMDSv2 + hop-limit e regras locais mitigam SSRF.',
      relatedService: 'ec2'
    },
    {
      id: 81,
      topic: 'ec2',
      question: 'Como compartilhar AMI entre regiões?',
      context: 'DR multi-região.',
      options: [
        { label: 'A', text: 'Copiar AMI para a região destino (copia snapshots também)' },
        { label: 'B', text: 'Usar Route 53' },
        { label: 'C', text: 'Só com Direct Connect' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Copiar AMI replica snapshots para a nova região.',
      relatedService: 'ec2'
    },
    {
      id: 82,
      topic: 'ec2',
      question: 'Limite padrão de Elastic IPs por região?',
      context: 'Governança.',
      options: [
        { label: 'A', text: '5 por região (pode ser aumentado via support)' },
        { label: 'B', text: '1' },
        { label: 'C', text: '50' },
        { label: 'D', text: 'Ilimitado' }
      ],
      correctAnswer: 'A',
      explanation: 'Limite padrão é 5; aumente se necessário.',
      relatedService: 'ec2'
    },
    {
      id: 83,
      topic: 'ec2',
      question: 'Como criptografar volumes existentes não criptografados?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Criar snapshot e copiar/reattach como volume criptografado' },
        { label: 'B', text: 'Marcar checkbox' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Só com EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Precisa copiar snapshot com criptografia e criar volume novo.',
      relatedService: 'ec2'
    },
    {
      id: 84,
      topic: 'ec2',
      question: 'Qual serviço para entregar chaves do BitLocker/TPM virtual?',
      context: 'Segurança Windows.',
      options: [
        { label: 'A', text: 'NitroTPM em instâncias Nitro' },
        { label: 'B', text: 'IAM inline' },
        { label: 'C', text: 'EIP' },
        { label: 'D', text: 'SSM State Manager' }
      ],
      correctAnswer: 'A',
      explanation: 'NitroTPM oferece TPM virtual para BitLocker/secure boot.',
      relatedService: 'ec2'
    },
    {
      id: 85,
      topic: 'ec2',
      question: 'Como visualizar créditos T atuais?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'Metricas CPUCreditBalance/CPUCreditUsage no CloudWatch' },
        { label: 'B', text: 'Logs VPC' },
        { label: 'C', text: 'Route 53 health' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudWatch expõe métricas de créditos para T-family.',
      relatedService: 'ec2'
    },
    {
      id: 86,
      topic: 'ec2',
      question: 'Como distribuir segredos para instâncias sem colocá-los em user data?',
      context: 'Segurança de segredos.',
      options: [
        { label: 'A', text: 'Usar SSM Parameter Store/Secrets Manager com IAM e fetch via IMDS credenciais' },
        { label: 'B', text: 'Colocar em AMI' },
        { label: 'C', text: 'Email' },
        { label: 'D', text: 'User data em clear text' }
      ],
      correctAnswer: 'A',
      explanation: 'Armazene segredos em serviço dedicado e recupere com credenciais temporárias.',
      relatedService: 'ec2'
    },
    {
      id: 87,
      topic: 'ec2',
      question: 'O que é EC2 Instance Connect?',
      context: 'Acesso SSH seguro.',
      options: [
        { label: 'A', text: 'Envio de chave pública temporária via API para login SSH sem gerenciar bastion' },
        { label: 'B', text: 'VPN gerenciada' },
        { label: 'C', text: 'RDS Proxy' },
        { label: 'D', text: 'CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance Connect injeta chave efêmera, auditável, sem deixar portas amplas.',
      relatedService: 'ec2'
    },
    {
      id: 88,
      topic: 'ec2',
      question: 'Como automatizar start/stop fora do horário comercial?',
      context: 'Otimização de custos.',
      options: [
        { label: 'A', text: 'EventBridge Scheduler + SSM Automation/State Manager para start-stop' },
        { label: 'B', text: 'Só manual' },
        { label: 'C', text: 'Lambda não pode' },
        { label: 'D', text: 'Requer Dedicated Host' }
      ],
      correctAnswer: 'A',
      explanation: 'Schedules com EventBridge chamam Automation ou APIs de start/stop.',
      relatedService: 'ec2'
    },
    {
      id: 89,
      topic: 'ec2',
      question: 'Qual serviço registra boot logs completos em sistemas modernos?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'EC2 Serial Console para depurar kernel/boot' },
        { label: 'B', text: 'S3 direto' },
        { label: 'C', text: 'Route 53' },
        { label: 'D', text: 'NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Serial Console permite acesso a console de baixa-nível para troubleshooting.',
      relatedService: 'ec2'
    },
    {
      id: 90,
      topic: 'ec2',
      question: 'Como clonar rapidamente uma instância em outra AZ?',
      context: 'Replicação.',
      options: [
        { label: 'A', text: 'Criar AMI da instância e lançar em outra AZ com o mesmo Launch Template' },
        { label: 'B', text: 'Mover a instância' },
        { label: 'C', text: 'Mudar subnet direto' },
        { label: 'D', text: 'Só com TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'AMI+Launch Template permite replicar configuração em outra AZ rapidamente.',
      relatedService: 'ec2'
    }
  ],
  
  rds: [
    {
      id: 1,
      topic: 'rds',
      question: 'Qual configuração do RDS fornece alta disponibilidade automática com failover em outra AZ?',
      context: 'Banco de dados crítico precisa de 99.95% uptime.',
      options: [
        { label: 'A', text: 'RDS Single-AZ' },
        { label: 'B', text: 'RDS Multi-AZ deployment' },
        { label: 'C', text: 'RDS Read Replicas' },
        { label: 'D', text: 'DynamoDB' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-AZ mantém réplica síncrona standby em outra AZ. Failover automático em ~60 segundos se AZ primária falhar. Usa MESMO endpoint DNS. Opção A: Single-AZ sem HA. Opção C: Read Replicas são para escalar leitura (assíncronas), não HA automática. Opção D: DynamoDB é NoSQL diferente.',
      relatedService: 'rds'
    },
    {
      id: 2,
      topic: 'rds',
      question: 'Como escalar leitura (read) em um banco RDS MySQL sem afetar performance de escrita (write)?',
      context: 'Aplicação tem 90% reads e 10% writes.',
      options: [
        { label: 'A', text: 'Aumentar tamanho da instância (vertical scaling)' },
        { label: 'B', text: 'Criar Read Replicas e distribuir queries de leitura' },
        { label: 'C', text: 'Habilitar Multi-AZ' },
        { label: 'D', text: 'Usar ElastiCache' }
      ],
      correctAnswer: 'B',
      explanation: 'Read Replicas criam cópias assíncronas read-only do banco. App aponta leituras para replicas (até 5) e escritas para master. Reduz carga no master. Opção A: vertical scaling ajuda mas tem limites. Opção C: Multi-AZ é para HA, não scale. Opção D: ElastiCache é cache separado.',
      relatedService: 'rds'
    },
    {
      id: 3,
      topic: 'rds',
      question: 'Qual recurso reduz tempo de failover para ~35s no RDS?',
      context: 'HA mais rápida.',
      options: [
        { label: 'A', text: 'Single-AZ' },
        { label: 'B', text: 'Multi-AZ com standby' },
        { label: 'C', text: 'Multi-AZ DB Cluster (novo)' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'C',
      explanation: 'Multi-AZ DB Cluster (x2 ou x3 nós) usa storage compartilhado e failover mais rápido (~35s).',
      relatedService: 'rds'
    },
    {
      id: 4,
      topic: 'rds',
      question: 'Qual diferença de propósito entre Multi-AZ e Read Replica?',
      context: 'HA vs escala.',
      options: [
        { label: 'A', text: 'Nenhuma' },
        { label: 'B', text: 'Multi-AZ é HA síncrona; Read Replica é escala de leitura assíncrona' },
        { label: 'C', text: 'Ambos são síncronos' },
        { label: 'D', text: 'Read Replica faz failover automático' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-AZ protege contra falha; Read Replica é para leitura e DR manual.',
      relatedService: 'rds'
    },
    {
      id: 5,
      topic: 'rds',
      question: 'Como reduzir conexões abertas no banco e melhorar utilização?',
      context: 'Muitas conexões curtas.',
      options: [
        { label: 'A', text: 'Aumentar max_connections' },
        { label: 'B', text: 'Usar RDS Proxy para pooling e reuse de conexões' },
        { label: 'C', text: 'Diminuir instância' },
        { label: 'D', text: 'Desativar SSL' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS Proxy mantém pool e reduz overhead de criação de conexões, protegendo o banco.',
      relatedService: 'rds'
    },
    {
      id: 6,
      topic: 'rds',
      question: 'Como autenticar no RDS sem armazenar senha?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Hardcode user/password' },
        { label: 'B', text: 'IAM Database Authentication com tokens temporários' },
        { label: 'C', text: 'Chaves de acesso IAM' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM DB Auth gera token temporário via IAM; evita senha persistente.',
      relatedService: 'rds'
    },
    {
      id: 7,
      topic: 'rds',
      question: 'Qual benefício do Performance Insights?',
      context: 'Tuning.',
      options: [
        { label: 'A', text: 'Substitui backups' },
        { label: 'B', text: 'Mostra waits, carga DB e top SQL para diagnosticar gargalos' },
        { label: 'C', text: 'Cria replicas' },
        { label: 'D', text: 'Criptografa dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Performance Insights coleta métricas profundas de waits/SQL para otimização.',
      relatedService: 'rds'
    },
    {
      id: 8,
      topic: 'rds',
      question: 'Como aplicar parâmetros customizados (ex: max_connections)?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Alterar diretamente no banco' },
        { label: 'B', text: 'Criar DB parameter group e associar à instância' },
        { label: 'C', text: 'Alterar SG' },
        { label: 'D', text: 'Usar CloudTrail' }
      ],
      correctAnswer: 'B',
      explanation: 'Parameter group controla configs do engine; alguns parâmetros exigem reboot.',
      relatedService: 'rds'
    },
    {
      id: 9,
      topic: 'rds',
      question: 'Para habilitar TDE no SQL Server RDS, qual recurso usar?',
      context: 'Criptografia.',
      options: [
        { label: 'A', text: 'Option Group com TDE' },
        { label: 'B', text: 'Parameter group' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'A',
      explanation: 'Features como TDE/SQLSERVER_AGENT exigem option group apropriado.',
      relatedService: 'rds'
    },
    {
      id: 10,
      topic: 'rds',
      question: 'Como aumentar storage automaticamente sem downtime?',
      context: 'Crescimento imprevisível.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Habilitar Storage Auto Scaling no RDS' },
        { label: 'C', text: 'Reduzir IOPS' },
        { label: 'D', text: 'Trocar engine' }
      ],
      correctAnswer: 'B',
      explanation: 'Storage Auto Scaling expande storage quando atinge thresholds, sem interrupção.',
      relatedService: 'rds'
    },
    {
      id: 11,
      topic: 'rds',
      question: 'Como fazer migração rápida sem downtime longo?',
      context: 'Troca de versão.',
      options: [
        { label: 'A', text: 'Upgrade direto em produção' },
        { label: 'B', text: 'Usar RDS Blue/Green Deployments para swap de endpoint' },
        { label: 'C', text: 'Criar snapshot manual' },
        { label: 'D', text: 'Exportar CSV' }
      ],
      correctAnswer: 'B',
      explanation: 'Blue/Green cria ambiente paralelo replicado e troca endpoints quase sem downtime.',
      relatedService: 'rds'
    },
    {
      id: 12,
      topic: 'rds',
      question: 'Como restaurar para um ponto no tempo?',
      context: 'Erro lógico.',
      options: [
        { label: 'A', text: 'Usar apenas snapshots manuais' },
        { label: 'B', text: 'Point-In-Time Recovery (PITR) usando backups automáticos + binlogs' },
        { label: 'C', text: 'Multi-AZ' },
        { label: 'D', text: 'Read Replica' }
      ],
      correctAnswer: 'B',
      explanation: 'Backups automáticos + logs permitem restaurar a um timestamp recente (até retenção).',
      relatedService: 'rds'
    },
    {
      id: 13,
      topic: 'rds',
      question: 'Qual limite de retenção de backups automáticos?',
      context: 'Política.',
      options: [
        { label: 'A', text: '1-7 dias' },
        { label: 'B', text: '1-35 dias' },
        { label: 'C', text: 'Até 1 ano' },
        { label: 'D', text: 'Sem limite' }
      ],
      correctAnswer: 'B',
      explanation: 'Retenção configurável entre 1 e 35 dias.',
      relatedService: 'rds'
    },
    {
      id: 14,
      topic: 'rds',
      question: 'Como fazer backup fora da região?',
      context: 'DR.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Copiar snapshot manual para outra região ou habilitar cross-region automated backups (MySQL/Postgres)' },
        { label: 'C', text: 'Usar S3 Transfer' },
        { label: 'D', text: 'Usar SG' }
      ],
      correctAnswer: 'B',
      explanation: 'Snapshots podem ser copiados; alguns engines suportam backups automáticos cross-region.',
      relatedService: 'rds'
    },
    {
      id: 15,
      topic: 'rds',
      question: 'Qual storage escolher para workloads gerais?',
      context: 'Custo/performance.',
      options: [
        { label: 'A', text: 'Magnetic' },
        { label: 'B', text: 'gp3 (ou gp2) é padrão para equilíbrio custo/performance' },
        { label: 'C', text: 'io1 sempre' },
        { label: 'D', text: 'Cold storage' }
      ],
      correctAnswer: 'B',
      explanation: 'gp3/gp2 são SSD balanceados; io1/io2 para IOPS altos, magnetic legado.',
      relatedService: 'rds'
    },
    {
      id: 16,
      topic: 'rds',
      question: 'Quando escolher io1/io2?',
      context: 'IOPS consistente.',
      options: [
        { label: 'A', text: 'Sempre' },
        { label: 'B', text: 'Quando precisa IOPS provisionado e latência previsível (OLTP pesado)' },
        { label: 'C', text: 'Para dev barato' },
        { label: 'D', text: 'Para backups' }
      ],
      correctAnswer: 'B',
      explanation: 'io1/io2 fornece IOPS dedicados; útil para cargas intensivas.',
      relatedService: 'rds'
    },
    {
      id: 17,
      topic: 'rds',
      question: 'Como limitar exposição pública do RDS?',
      context: 'Segurança de rede.',
      options: [
        { label: 'A', text: 'Publicar na internet' },
        { label: 'B', text: 'Colocar em subnets privadas, SG restritivo e sem IP público' },
        { label: 'C', text: 'Usar NACL apenas' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS deve ficar em subnet privada acessível somente via SG/VPC endpoints ou bastion.',
      relatedService: 'rds'
    },
    {
      id: 18,
      topic: 'rds',
      question: 'Como reduzir downtime ao aplicar patches?',
      context: 'Janela de manutenção.',
      options: [
        { label: 'A', text: 'Qualquer horário' },
        { label: 'B', text: 'Definir maintenance window fora do horário crítico; Multi-AZ minimiza impacto' },
        { label: 'C', text: 'Desligar backups' },
        { label: 'D', text: 'Usar S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Escolha janela controlada e use Multi-AZ para failover durante patch.',
      relatedService: 'rds'
    },
    {
      id: 19,
      topic: 'rds',
      question: 'Como forçar SSL/TLS para conexões?',
      context: 'Criptografia em trânsito.',
      options: [
        { label: 'A', text: 'Security Group' },
        { label: 'B', text: 'Parametrizar require_ssl (MySQL) ou rds.force_ssl (Postgres) no parameter group' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Usar KMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Force SSL via parâmetro do engine e certificado RDS CA.',
      relatedService: 'rds'
    },
    {
      id: 20,
      topic: 'rds',
      question: 'Como rotacionar credenciais automaticamente?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Hardcode senha' },
        { label: 'B', text: 'AWS Secrets Manager com rotation integrada para RDS' },
        { label: 'C', text: 'Planilhas' },
        { label: 'D', text: 'Email' }
      ],
      correctAnswer: 'B',
      explanation: 'Secrets Manager suporta rotação nativa para engines RDS.',
      relatedService: 'rds'
    },
    {
      id: 21,
      topic: 'rds',
      question: 'Como mover RDS para outra AZ sem recriar?',
      context: 'Balanceamento.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Modificar instância e selecionar AZ alvo (pode ter breve downtime)' },
        { label: 'C', text: 'Usar ELB' },
        { label: 'D', text: 'Usar S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Alterar AZ é permitido; envolve reinicialização curta.',
      relatedService: 'rds'
    },
    {
      id: 22,
      topic: 'rds',
      question: 'Como fazer DR com menor perda de dados?',
      context: 'Cross-region.',
      options: [
        { label: 'A', text: 'Nenhuma opção' },
        { label: 'B', text: 'Read Replica cross-region para RPO baixo; promover em desastre' },
        { label: 'C', text: 'Snapshot diário' },
        { label: 'D', text: 'Multi-AZ' }
      ],
      correctAnswer: 'B',
      explanation: 'Replica cross-region mantém dados quase em tempo real; promover em DR.',
      relatedService: 'rds'
    },
    {
      id: 23,
      topic: 'rds',
      question: 'Qual é o efeito de promover uma Read Replica?',
      context: 'Promoção.',
      options: [
        { label: 'A', text: 'Vira Multi-AZ' },
        { label: 'B', text: 'Se torna um novo primário independente (para DR ou migração)' },
        { label: 'C', text: 'Apaga dados' },
        { label: 'D', text: 'Cria outro snapshot' }
      ],
      correctAnswer: 'B',
      explanation: 'Promoção converte replica em instância standalone; replication para.',
      relatedService: 'rds'
    },
    {
      id: 24,
      topic: 'rds',
      question: 'Como reduzir latência de leitura global?',
      context: 'Usuários em vários países.',
      options: [
        { label: 'A', text: 'Multi-AZ' },
        { label: 'B', text: 'Read Replicas em regiões próximas aos usuários' },
        { label: 'C', text: 'CloudFront' },
        { label: 'D', text: 'Aumentar CPU' }
      ],
      correctAnswer: 'B',
      explanation: 'Replicas regionais servem leitura com latência menor.',
      relatedService: 'rds'
    },
    {
      id: 25,
      topic: 'rds',
      question: 'Como investigar queries lentas no MySQL/Postgres RDS?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Ativar slow query log via parameter group e enviar para CloudWatch Logs' },
        { label: 'C', text: 'Usar S3' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Slow query log ajuda a identificar SQL lento; exporte para CW Logs.',
      relatedService: 'rds'
    },
    {
      id: 26,
      topic: 'rds',
      question: 'Qual métrica monitora saturação de CPU?',
      context: 'CloudWatch.',
      options: [
        { label: 'A', text: 'FreeStorageSpace' },
        { label: 'B', text: 'CPUUtilization' },
        { label: 'C', text: 'DBConnections' },
        { label: 'D', text: 'ReadIOPS' }
      ],
      correctAnswer: 'B',
      explanation: 'CPUUtilization mostra uso de CPU da instância.',
      relatedService: 'rds'
    },
    {
      id: 27,
      topic: 'rds',
      question: 'Como monitorar IOPS e throughput?',
      context: 'Armazenamento.',
      options: [
        { label: 'A', text: 'Usar FreeableMemory' },
        { label: 'B', text: 'Métricas ReadIOPS, WriteIOPS, ReadThroughput, WriteThroughput' },
        { label: 'C', text: 'Usar CPUUtilization' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Essas métricas mostram atividade de disco.',
      relatedService: 'rds'
    },
    {
      id: 28,
      topic: 'rds',
      question: 'Como identificar falta de memória?',
      context: 'OOM.',
      options: [
        { label: 'A', text: 'ReadLatency' },
        { label: 'B', text: 'FreeableMemory e SwapUsage altos' },
        { label: 'C', text: 'NumberOfConnections' },
        { label: 'D', text: 'BackupRetentionPeriod' }
      ],
      correctAnswer: 'B',
      explanation: 'Memória baixa aumenta swap; monitore FreeableMemory/SwapUsage.',
      relatedService: 'rds'
    },
    {
      id: 29,
      topic: 'rds',
      question: 'Como reduzir impacto de backups automáticos?',
      context: 'Janela de backup.',
      options: [
        { label: 'A', text: 'Desabilitar backups' },
        { label: 'B', text: 'Configurar preferred backup window fora do pico; Multi-AZ reduz impacto' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Escolha janela fora do pico; backup é incremental e menos intrusivo em Multi-AZ.',
      relatedService: 'rds'
    },
    {
      id: 30,
      topic: 'rds',
      question: 'Como migrar de Single-AZ para Multi-AZ?',
      context: 'HA upgrade.',
      options: [
        { label: 'A', text: 'Recriar' },
        { label: 'B', text: 'Modificar instância e habilitar Multi-AZ (pode causar reboot curto)' },
        { label: 'C', text: 'Copiar snapshot' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Basta alterar configuração; cria standby sincronizado.',
      relatedService: 'rds'
    },
    {
      id: 31,
      topic: 'rds',
      question: 'Como minimizar risco de perda de log binário no MySQL?',
      context: 'PITR.',
      options: [
        { label: 'A', text: 'Desativar backups' },
        { label: 'B', text: 'Manter backup retention > 0 para gerar binlogs contínuos' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar VPC peering' }
      ],
      correctAnswer: 'B',
      explanation: 'PITR depende de backups + logs; retenção zero desativa binlogs gerenciados.',
      relatedService: 'rds'
    },
    {
      id: 32,
      topic: 'rds',
      question: 'Como eliminar replicação lenta causada por grandes transações?',
      context: 'Replica lag.',
      options: [
        { label: 'A', text: 'Ignorar' },
        { label: 'B', text: 'Quebrar transações grandes, otimizar índices e usar Multi-AZ cluster' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Aumentar TTL DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Transações grandes causam lag; divida e otimize. Cluster Multi-AZ reduz lag.',
      relatedService: 'rds'
    },
    {
      id: 33,
      topic: 'rds',
      question: 'Como exportar snapshot para S3 em formato parquet?',
      context: 'Analytics.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar recurso Export to S3 (MySQL/Postgres) em Parquet' },
        { label: 'C', text: 'Usar Data Pipeline manual' },
        { label: 'D', text: 'Usar Glue' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS exporta snapshot para S3 em Parquet sem restaurar.',
      relatedService: 'rds'
    },
    {
      id: 34,
      topic: 'rds',
      question: 'Quando usar RDS Proxy?',
      context: 'Pool de conexões e credenciais.',
      options: [
        { label: 'A', text: 'Somente para Aurora' },
        { label: 'B', text: 'Para apps com muitas conexões curtas ou sensíveis a failover (pool + IAM auth)' },
        { label: 'C', text: 'Para aumentar storage' },
        { label: 'D', text: 'Para backups' }
      ],
      correctAnswer: 'B',
      explanation: 'Proxy gerencia conexões, failover rápido e integra IAM/Secrets.',
      relatedService: 'rds'
    },
    {
      id: 35,
      topic: 'rds',
      question: 'Qual métrica indica muitas conexões simultâneas?',
      context: 'Capacity.',
      options: [
        { label: 'A', text: 'FreeStorageSpace' },
        { label: 'B', text: 'DatabaseConnections' },
        { label: 'C', text: 'WriteLatency' },
        { label: 'D', text: 'ReplicaLag' }
      ],
      correctAnswer: 'B',
      explanation: 'DatabaseConnections mostra número de conexões ativas.',
      relatedService: 'rds'
    },
    {
      id: 36,
      topic: 'rds',
      question: 'Como reduzir latência de I/O em gp2?',
      context: 'Burst balance baixo.',
      options: [
        { label: 'A', text: 'Trocar para io1/io2 ou gp3 com IOPS/throughput provisionado' },
        { label: 'B', text: 'Diminuir storage' },
        { label: 'C', text: 'Desabilitar backups' },
        { label: 'D', text: 'Usar NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'gp2 depende de burst credits; gp3/io1/io2 oferecem IOPS configuráveis.',
      relatedService: 'rds'
    },
    {
      id: 37,
      topic: 'rds',
      question: 'Como evitar queda de performance por falta de índices?',
      context: 'Query lenta.',
      options: [
        { label: 'A', text: 'Aumentar instância apenas' },
        { label: 'B', text: 'Revisar planos, adicionar índices e usar Performance Insights/EXPLAIN' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Otimização de query/índices é essencial; hardware sozinho não resolve.',
      relatedService: 'rds'
    },
    {
      id: 38,
      topic: 'rds',
      question: 'Como impedir acesso root ao banco?',
      context: 'Privilégios.',
      options: [
        { label: 'A', text: 'Dar root a todos' },
        { label: 'B', text: 'Usar usuários com privilégios mínimos e desabilitar login root operacional' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Siga princípio de mínimo privilégio; root somente para admin crítico.',
      relatedService: 'rds'
    },
    {
      id: 39,
      topic: 'rds',
      question: 'Como lidar com excesso de conexões em burst?',
      context: 'Escala horizontal.',
      options: [
        { label: 'A', text: 'Apenas aumentar max_connections' },
        { label: 'B', text: 'Adicionar RDS Proxy e cachear leituras (ElastiCache)' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Pooling + cache reduz pressão no banco.',
      relatedService: 'rds'
    },
    {
      id: 40,
      topic: 'rds',
      question: 'Qual método de criptografia é suportado em repouso?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Criptografia custom sem KMS' },
        { label: 'B', text: 'SSE com KMS ao criar instância; snapshots e replicas também ficam criptografados' },
        { label: 'C', text: 'TLS apenas' },
        { label: 'D', text: 'Nenhum' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS usa KMS para criptografia em repouso; não pode habilitar depois sem migração.',
      relatedService: 'rds'
    },
    {
      id: 41,
      topic: 'rds',
      question: 'Como migrar uma instância não criptografada para criptografada?',
      context: 'KMS.',
      options: [
        { label: 'A', text: 'Botão ligar' },
        { label: 'B', text: 'Criar snapshot, copiar como criptografado e restaurar' },
        { label: 'C', text: 'Alterar parameter group' },
        { label: 'D', text: 'Usar IAM role' }
      ],
      correctAnswer: 'B',
      explanation: 'Não dá para ligar direto; precisa restaurar de snapshot criptografado.',
      relatedService: 'rds'
    },
    {
      id: 42,
      topic: 'rds',
      question: 'Como liberar porta do banco apenas para app?',
      context: 'Rede.',
      options: [
        { label: 'A', text: '0.0.0.0/0' },
        { label: 'B', text: 'Security Group de origem apontando somente para SG do app' },
        { label: 'C', text: 'NACL open' },
        { label: 'D', text: 'Public IP' }
      ],
      correctAnswer: 'B',
      explanation: 'SG para SG garante acesso apenas da aplicação.',
      relatedService: 'rds'
    },
    {
      id: 43,
      topic: 'rds',
      question: 'Qual é o endpoint de conexão em Multi-AZ?',
      context: 'Failover.',
      options: [
        { label: 'A', text: 'Endpoint muda' },
        { label: 'B', text: 'Endpoint DNS é o mesmo; aponta para novo primário após failover' },
        { label: 'C', text: 'Dois endpoints' },
        { label: 'D', text: 'Nenhum' }
      ],
      correctAnswer: 'B',
      explanation: 'DNS do endpoint permanece; failover atualiza o alvo.',
      relatedService: 'rds'
    },
    {
      id: 44,
      topic: 'rds',
      question: 'Como reduzir risco de bloqueio por transações longas?',
      context: 'Deadlocks/locks.',
      options: [
        { label: 'A', text: 'Deixar transações grandes' },
        { label: 'B', text: 'Usar transações menores, índices adequados e timeout de lock' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Desligar multi-AZ' }
      ],
      correctAnswer: 'B',
      explanation: 'Transações curtas e índices evitam lock prolongado.',
      relatedService: 'rds'
    },
    {
      id: 45,
      topic: 'rds',
      question: 'Como testar plano de failover?',
      context: 'Resiliência.',
      options: [
        { label: 'A', text: 'Não testar' },
        { label: 'B', text: 'Usar comando Reboot with failover (Multi-AZ)' },
        { label: 'C', text: 'Parar instância' },
        { label: 'D', text: 'Apagar snapshot' }
      ],
      correctAnswer: 'B',
      explanation: 'Reboot with failover força troca para standby para validar app.',
      relatedService: 'rds'
    },
    {
      id: 46,
      topic: 'rds',
      question: 'Como diminuir impacto de migração de versão maior?',
      context: 'Upgrade major.',
      options: [
        { label: 'A', text: 'Atualizar direto' },
        { label: 'B', text: 'Criar Read Replica com versão alvo, promover e apontar app (ou Blue/Green)' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Desligar backups' }
      ],
      correctAnswer: 'B',
      explanation: 'Replica/Blue-Green permite testar e cortar com downtime reduzido.',
      relatedService: 'rds'
    },
    {
      id: 47,
      topic: 'rds',
      question: 'Como isolar workloads de analytics?',
      context: 'Relatórios pesados.',
      options: [
        { label: 'A', text: 'Rodar no primário' },
        { label: 'B', text: 'Usar Read Replicas dedicadas para analytics' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Usar ALB' }
      ],
      correctAnswer: 'B',
      explanation: 'Replicas absorvem cargas de leitura pesadas sem afetar primário.',
      relatedService: 'rds'
    },
    {
      id: 48,
      topic: 'rds',
      question: 'Como habilitar monitoramento em nível de SO?',
      context: 'CPU steal, kernel.',
      options: [
        { label: 'A', text: 'CloudWatch básico' },
        { label: 'B', text: 'Enhanced Monitoring envia métricas de OS a cada 1s-60s' },
        { label: 'C', text: 'CloudTrail' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Enhanced Monitoring coleta métricas do host subjacente.',
      relatedService: 'rds'
    },
    {
      id: 49,
      topic: 'rds',
      question: 'Como liberar parâmetros específicos do SQL Server (ex: Agent)?',
      context: 'Features.',
      options: [
        { label: 'A', text: 'Parameter group' },
        { label: 'B', text: 'Option group ativando SQLSERVER_AGENT' },
        { label: 'C', text: 'Secrets Manager' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Option group ativa recursos adicionais do engine.',
      relatedService: 'rds'
    },
    {
      id: 50,
      topic: 'rds',
      question: 'Como diagnosticar queries que esperam por lock?',
      context: 'Waits.',
      options: [
        { label: 'A', text: 'CloudTrail' },
        { label: 'B', text: 'Performance Insights mostra waits (ex: lock) e SQL causador' },
        { label: 'C', text: 'ELB logs' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'PI exibe waits e top SQL para análise de contensão.',
      relatedService: 'rds'
    },
    {
      id: 51,
      topic: 'rds',
      question: 'Como limitar quem pode criar snapshots?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Qualquer usuário IAM' },
        { label: 'B', text: 'Políticas IAM finas para rds:CreateDBSnapshot e tagging' },
        { label: 'C', text: 'SG' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Controle via IAM actions específicas e tags.',
      relatedService: 'rds'
    },
    {
      id: 52,
      topic: 'rds',
      question: 'Como compartilhar snapshot com outra conta?',
      context: 'Migração.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Alterar atributos do snapshot para permitir outra conta; se criptografado, compartilhar chave KMS' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar ELB' }
      ],
      correctAnswer: 'B',
      explanation: 'Snapshot attributes + KMS key compartilhada se necessário.',
      relatedService: 'rds'
    },
    {
      id: 53,
      topic: 'rds',
      question: 'Como evitar impacto de vacuum/analyze no Postgres?',
      context: 'Manutenção.',
      options: [
        { label: 'A', text: 'Desativar' },
        { label: 'B', text: 'Ajustar autovacuum no parameter group e agendar manutenção fora do pico' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar ALB' }
      ],
      correctAnswer: 'B',
      explanation: 'Ajuste autovacuum e janelas para reduzir impacto.',
      relatedService: 'rds'
    },
    {
      id: 54,
      topic: 'rds',
      question: 'Como migrar com quase zero downtime de MySQL on-prem para RDS?',
      context: 'CDC.',
      options: [
        { label: 'A', text: 'Exportar CSV' },
        { label: 'B', text: 'Usar AWS DMS para replicação contínua e cutover rápido' },
        { label: 'C', text: 'Restaurar snapshot' },
        { label: 'D', text: 'Usar FTP' }
      ],
      correctAnswer: 'B',
      explanation: 'DMS captura mudanças e permite cutover mínimo.',
      relatedService: 'rds'
    },
    {
      id: 55,
      topic: 'rds',
      question: 'Como calcular max_connections recomendado?',
      context: 'Sizing.',
      options: [
        { label: 'A', text: 'Valor arbitrário' },
        { label: 'B', text: 'Usar fórmula baseada em RAM e engine (ex: ~max 16k para MySQL depende de memória)' },
        { label: 'C', text: 'Sempre 500' },
        { label: 'D', text: 'Sempre 100' }
      ],
      correctAnswer: 'B',
      explanation: 'max_connections depende de memória/engine; evitar exaustão de RAM.',
      relatedService: 'rds'
    },
    {
      id: 56,
      topic: 'rds',
      question: 'Como limitar quem pode conectar via IAM DB Auth?',
      context: 'Autorização.',
      options: [
        { label: 'A', text: 'Todos com IAM' },
        { label: 'B', text: 'Policy IAM com rds-db:connect atrelada ao usuário de banco' },
        { label: 'C', text: 'SG' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'rds-db:connect controla quem obtém token de conexão.',
      relatedService: 'rds'
    },
    {
      id: 57,
      topic: 'rds',
      question: 'Como inspecionar queries bloqueadas em Postgres?',
      context: 'Locks.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Consultar pg_locks / pg_stat_activity via visão do sistema' },
        { label: 'C', text: 'Usar S3' },
        { label: 'D', text: 'Usar ELB' }
      ],
      correctAnswer: 'B',
      explanation: 'Views internas mostram locks; combine com PI para waits.',
      relatedService: 'rds'
    },
    {
      id: 58,
      topic: 'rds',
      question: 'Como reduzir latência em conexões TLS repetidas?',
      context: 'Overhead.',
      options: [
        { label: 'A', text: 'Desativar TLS' },
        { label: 'B', text: 'Usar RDS Proxy para manter conexões TLS aquecidas' },
        { label: 'C', text: 'Diminuir CPU' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Proxy reusa conexões, reduzindo handshake frequente.',
      relatedService: 'rds'
    },
    {
      id: 59,
      topic: 'rds',
      question: 'Como reduzir tempo de failover percebido pela aplicação?',
      context: 'Resiliência app.',
      options: [
        { label: 'A', text: 'Timeout alto no app' },
        { label: 'B', text: 'Usar drivers com retries, RDS Proxy e backoff' },
        { label: 'C', text: 'Desligar Multi-AZ' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Aplicação deve ter retries/backoff; proxy acelera failover.',
      relatedService: 'rds'
    },
    {
      id: 60,
      topic: 'rds',
      question: 'Como auditar mudanças de schema?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Não auditar' },
        { label: 'B', text: 'Usar logs de auditoria do engine (ex: Postgres pgaudit, MySQL audit plugin via option group)' },
        { label: 'C', text: 'CloudFront' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Plugins/audit logs gravam DDL/DML conforme engine.',
      relatedService: 'rds'
    },
    {
      id: 61,
      topic: 'rds',
      question: 'Como lidar com limite de tamanho de banco em MySQL?',
      context: 'Crescimento.',
      options: [
        { label: 'A', text: 'Ignorar limite de armazenamento' },
        { label: 'B', text: 'Usar sharding, particionamento ou migrar para Aurora para maior escala' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'Sharding/particionamento ou engines mais escaláveis evitam limite.',
      relatedService: 'rds'
    },
    {
      id: 62,
      topic: 'rds',
      question: 'Como proteger dados em trânsito para réplicas?',
      context: 'Replicação.',
      options: [
        { label: 'A', text: 'Sem proteção' },
        { label: 'B', text: 'Replicação é criptografada por padrão entre instâncias RDS' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Replicação RDS usa canais seguros/criptografados.',
      relatedService: 'rds'
    },
    {
      id: 63,
      topic: 'rds',
      question: 'Como verificar se backup automático está funcionando?',
      context: 'DR.',
      options: [
        { label: 'A', text: 'Não verificar' },
        { label: 'B', text: 'Verificar console/snapshots, CloudWatch Events e restaurar periodicamente para validar' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Testes de restauração validam que backups funcionam.',
      relatedService: 'rds'
    },
    {
      id: 64,
      topic: 'rds',
      question: 'Como gerenciar parâmetros de engine via IaC?',
      context: 'Terraform/CFN.',
      options: [
        { label: 'A', text: 'Console apenas' },
        { label: 'B', text: 'Definir DBParameterGroup/OptionGroup em Terraform ou CloudFormation' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar Lambda' }
      ],
      correctAnswer: 'B',
      explanation: 'IaC versiona e audita configs de engine.',
      relatedService: 'rds'
    },
    {
      id: 65,
      topic: 'rds',
      question: 'Como rodar extensões do Postgres (ex: PostGIS)?',
      context: 'Geo.',
      options: [
        { label: 'A', text: 'Não suportado' },
        { label: 'B', text: 'Rodar CREATE EXTENSION se disponível no engine (lista suportada)' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS Postgres suporta lista de extensões; verifica docs.',
      relatedService: 'rds'
    },
    {
      id: 66,
      topic: 'rds',
      question: 'Como ativar logging de slow query no MySQL?',
      context: 'Troubleshooting.',
      options: [
        { label: 'A', text: 'Console apenas' },
        { label: 'B', text: 'Parâmetros slow_query_log, long_query_time no parameter group' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Parameter group controla slow log do MySQL.',
      relatedService: 'rds'
    },
    {
      id: 67,
      topic: 'rds',
      question: 'Como aumentar armazenamento de forma preemptiva?',
      context: 'Pré-provisionamento.',
      options: [
        { label: 'A', text: 'Esperar esgotar' },
        { label: 'B', text: 'Usar autoscaling ou redimensionar manualmente antes de atingir limite' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar ELB' }
      ],
      correctAnswer: 'B',
      explanation: 'Autoscaling ou modificação manual previne esgotamento.',
      relatedService: 'rds'
    },
    {
      id: 68,
      topic: 'rds',
      question: 'Como segregar ambientes de dev/prod?',
      context: 'Isolamento.',
      options: [
        { label: 'A', text: 'Mesma conta' },
        { label: 'B', text: 'VPCs diferentes, DB subnet groups isolados e contas separadas quando possível' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Isolamento de rede/conta previne blast radius.',
      relatedService: 'rds'
    },
    {
      id: 69,
      topic: 'rds',
      question: 'Como acionar failover manual?',
      context: 'Teste DR.',
      options: [
        { label: 'A', text: 'Parar instância' },
        { label: 'B', text: 'Usar Reboot with Failover no console/CLI' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Reboot with Failover força troca para standby.',
      relatedService: 'rds'
    },
    {
      id: 70,
      topic: 'rds',
      question: 'Como evitar vendor lock-in ao usar RDS?',
      context: 'Portabilidade.',
      options: [
        { label: 'A', text: 'Não existe lock-in' },
        { label: 'B', text: 'Evitar stored procedures proprietárias e usar dumps standard; escolher engines open-source' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'Seguir padrões permite migrar para outro provedor.',
      relatedService: 'rds'
    },
    {
      id: 71,
      topic: 'rds',
      question: 'Como restaurar apenas tabelas específicas de backup?',
      context: 'Restauração parcial.',
      options: [
        { label: 'A', text: 'RDS permite escolher tabela' },
        { label: 'B', text: 'Restaurar snapshot para instância temporária, exportar tabelas e importar no prod' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS não restaura parcial; faça em instância temp.',
      relatedService: 'rds'
    },
    {
      id: 72,
      topic: 'rds',
      question: 'Como limitar IOPS consumidas por replica?',
      context: 'Throttle.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar instância/tipo de storage menor para replica ou throttle no engine' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Classe menor ou throttle de queries limita replica.',
      relatedService: 'rds'
    },
    {
      id: 73,
      topic: 'rds',
      question: 'Como enviar logs de engine para CloudWatch Logs?',
      context: 'Centralização.',
      options: [
        { label: 'A', text: 'Não suportado' },
        { label: 'B', text: 'Habilitar publicação de logs no console/CLI (error, slow, general)' },
        { label: 'C', text: 'Usar S3' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS suporta publicação de logs selecionados para CW.',
      relatedService: 'rds'
    },
    {
      id: 74,
      topic: 'rds',
      question: 'Como impedir acesso à console para usuários IAM, mas permitir CLI?',
      context: 'Acesso.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Política IAM que nega console actions mas permite CLI/SDK' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM pode restringir canais específicos se as actions forem segregadas.',
      relatedService: 'rds'
    },
    {
      id: 75,
      topic: 'rds',
      question: 'Como validar plano de restore para auditores?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Dizer que funciona' },
        { label: 'B', text: 'Realizar restore drill documentado periodicamente e apresentar relatório' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar ELB' }
      ],
      correctAnswer: 'B',
      explanation: 'Drill test + evidência demonstra prontidão.',
      relatedService: 'rds'
    },
    {
      id: 76,
      topic: 'rds',
      question: 'Como controlar manutenção de security patches?',
      context: 'Patching.',
      options: [
        { label: 'A', text: 'Patches são ignorados' },
        { label: 'B', text: 'Definir janela de manutenção e usar auto-upgrade de minor version' },
        { label: 'C', text: 'Usar NAT' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Janela controla quando patches são aplicados automaticamente.',
      relatedService: 'rds'
    },
    {
      id: 77,
      topic: 'rds',
      question: 'Como monitorar custo por instância RDS?',
      context: 'FinOps.',
      options: [
        { label: 'A', text: 'Cost Explorer não separa' },
        { label: 'B', text: 'Usar tags e Cost Allocation Tags + Cost Explorer' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'Tags + allocation mostram custos granulares.',
      relatedService: 'rds'
    },
    {
      id: 78,
      topic: 'rds',
      question: 'Como reduzir custo de instâncias de dev pouco utilizadas?',
      context: 'FinOps.',
      options: [
        { label: 'A', text: 'Deixar ligadas 24/7' },
        { label: 'B', text: 'Parar fora de horário, usar Reserved para prod e Savings Plans' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Parar dev reduz custo; reserved/savings para cargas previsíveis.',
      relatedService: 'rds'
    },
    {
      id: 79,
      topic: 'rds',
      question: 'Como validar conexões SSL estão sendo usadas?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'Confiar que usam' },
        { label: 'B', text: 'Consultar pg_stat_ssl ou user tables e forçar ssl via parameter/role' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Views internas mostram conexão SSL; parâmetros podem forçar.',
      relatedService: 'rds'
    },
    {
      id: 80,
      topic: 'rds',
      question: 'Como limitar acessos a nível de tabela?',
      context: 'Least privilege.',
      options: [
        { label: 'A', text: 'IAM actions' },
        { label: 'B', text: 'Usar GRANT/REVOKE no schema do banco para restringir tabelas' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Permissões dentro do engine controlam acesso a objetos.',
      relatedService: 'rds'
    },
    {
      id: 81,
      topic: 'rds',
      question: 'Como evitar inativação de backups por erro?',
      context: 'Proteção.',
      options: [
        { label: 'A', text: 'Deixar 0' },
        { label: 'B', text: 'Usar SCPs para impedir alteração de retention period abaixo de mínimo' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar NAT' }
      ],
      correctAnswer: 'B',
      explanation: 'SCPs previnem alterações não autorizadas em retenção.',
      relatedService: 'rds'
    },
    {
      id: 82,
      topic: 'rds',
      question: 'Como integrar RDS com S3 para importar dados?',
      context: 'Bulk load.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar LOAD DATA FROM S3 (Aurora MySQL) ou aws_s3 (Postgres)' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Aurora/RDS Postgres suportam cargas diretas do S3.',
      relatedService: 'rds'
    },
    {
      id: 83,
      topic: 'rds',
      question: 'Como garantir que snapshot seja criptografado cross-region?',
      context: 'DR regional.',
      options: [
        { label: 'A', text: 'Automático' },
        { label: 'B', text: 'Copiar snapshot para região de destino especificando KMS key dessa região' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Copy requer KMS da região destino para manter criptografia.',
      relatedService: 'rds'
    },
    {
      id: 84,
      topic: 'rds',
      question: 'Como forçar usuários a conexões SSL no Postgres?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Depende do cliente' },
        { label: 'B', text: 'Definir rds.force_ssl=1 no parameter group' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Parameter force_ssl bloqueia conexões não TLS.',
      relatedService: 'rds'
    },
    {
      id: 85,
      topic: 'rds',
      question: 'Como alertar quando storage free < 10%?',
      context: 'Proativo.',
      options: [
        { label: 'A', text: 'Checar manualmente' },
        { label: 'B', text: 'Alarme CloudWatch em FreeStorageSpace < threshold' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarmes CloudWatch previnem esgotamento de disco.',
      relatedService: 'rds'
    },
    {
      id: 86,
      topic: 'rds',
      question: 'Como evitar que encerramentos acidentais apaguem instância prod?',
      context: 'Safety.',
      options: [
        { label: 'A', text: 'Não usar console' },
        { label: 'B', text: 'Habilitar deletion protection' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Deletion protection bloqueia deleção acidental.',
      relatedService: 'rds'
    },
    {
      id: 87,
      topic: 'rds',
      question: 'Como acessar RDS de outra VPC?',
      context: 'Networking.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar VPC Peering ou Transit Gateway com rotas e SG ajustados' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Peering/TGW conecta VPCs; ajusta SG para permitir.',
      relatedService: 'rds'
    },
    {
      id: 88,
      topic: 'rds',
      question: 'Como identificar queries mais frequentes?',
      context: 'Tuning.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Performance Insights Top SQL ou pg_stat_statements' },
        { label: 'C', text: 'CloudFront' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'PI e views do engine mostram queries mais executadas.',
      relatedService: 'rds'
    },
    {
      id: 89,
      topic: 'rds',
      question: 'Como automatizar patching de segurança?',
      context: 'Ops.',
      options: [
        { label: 'A', text: 'Patching manual' },
        { label: 'B', text: 'Habilitar auto minor version upgrade e definir maintenance window' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Auto upgrade aplica patches de segurança.',
      relatedService: 'rds'
    },
    {
      id: 90,
      topic: 'rds',
      question: 'Como estimar custo antes de criar instância?',
      context: 'Planejamento.',
      options: [
        { label: 'A', text: 'Criar e ver' },
        { label: 'B', text: 'Usar AWS Pricing Calculator para simular custos' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Pricing Calculator projeta custos antes de criar recursos.',
      relatedService: 'rds'
    }
  ],
  
  iam: [
    {
      id: 1,
      topic: 'iam',
      question: 'Qual princípio de segurança IAM recomenda conceder apenas permissões mínimas necessárias?',
      context: 'Desenvolvedor precisa acessar apenas um bucket S3 específico.',
      options: [
        { label: 'A', text: 'Princípio da confiança zero' },
        { label: 'B', text: 'Princípio do menor privilégio (Least Privilege)' },
        { label: 'C', text: 'Princípio da defesa em profundidade' },
        { label: 'D', text: 'Princípio da segregação de funções' }
      ],
      correctAnswer: 'B',
      explanation: 'Least Privilege = conceder apenas permissões mínimas necessárias para realizar tarefa. Se precisa de 1 bucket, dê acesso apenas a ele, não S3 full access. Reduz blast radius de comprometimento. Opção A: Zero Trust é framework diferente. Opção C: Defense in depth = múltiplas camadas. Opção D: Separation of duties divide responsabilidades.',
      relatedService: 'iam'
    },
    {
      id: 2,
      topic: 'iam',
      question: 'Qual a diferença entre IAM Policy baseada em Identity vs Resource?',
      context: 'Arquiteto configurando permissões para S3.',
      options: [
        { label: 'A', text: 'São idênticas' },
        { label: 'B', text: 'Identity-based anexa a users/groups/roles; Resource-based anexa ao recurso (ex: bucket policy)' },
        { label: 'C', text: 'Resource-based só funciona com EC2' },
        { label: 'D', text: 'Identity-based é mais segura' }
      ],
      correctAnswer: 'B',
      explanation: 'Identity-based policy anexa a IAM users/groups/roles (ex: "UserA pode ler S3"). Resource-based anexa ao recurso (ex: bucket policy "Bucket X permite UserA ler"). S3, SQS, KMS suportam resource-based. Cross-account access geralmente usa resource-based. Ambas são avaliadas juntas.',
      relatedService: 'iam'
    },
    {
      id: 3,
      topic: 'iam',
      question: 'O que é um IAM Role?',
      context: 'Credenciais temporárias.',
      options: [
        { label: 'A', text: 'Usuário permanente' },
        { label: 'B', text: 'Identidade com credenciais temporárias que pode ser assumida por usuários, serviços ou contas' },
        { label: 'C', text: 'Grupo de usuários' },
        { label: 'D', text: 'Política de senha' }
      ],
      correctAnswer: 'B',
      explanation: 'Roles não têm credenciais permanentes; fornecem tokens temporários via STS. EC2, Lambda assumem roles.',
      relatedService: 'iam'
    },
    {
      id: 4,
      topic: 'iam',
      question: 'Como uma instância EC2 acessa serviços AWS sem credenciais hardcoded?',
      context: 'Best practice.',
      options: [
        { label: 'A', text: 'Access keys no código' },
        { label: 'B', text: 'Usar IAM Instance Profile (role anexado à instância)' },
        { label: 'C', text: 'Variáveis de ambiente com senha' },
        { label: 'D', text: 'Arquivo de configuração público' }
      ],
      correctAnswer: 'B',
      explanation: 'Instance Profile anexa role à EC2; SDK obtém credenciais temporárias automaticamente.',
      relatedService: 'iam'
    },
    {
      id: 5,
      topic: 'iam',
      question: 'O que é Trust Policy em um IAM Role?',
      context: 'Permissões.',
      options: [
        { label: 'A', text: 'Define o que o role pode fazer' },
        { label: 'B', text: 'Define quem pode assumir o role (principal)' },
        { label: 'C', text: 'Define grupos' },
        { label: 'D', text: 'Define senhas' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy especifica principals autorizados a assumir o role (ex: EC2 service, conta externa).',
      relatedService: 'iam'
    },
    {
      id: 6,
      topic: 'iam',
      question: 'Qual elemento da policy define as ações permitidas?',
      context: 'Estrutura de policy.',
      options: [
        { label: 'A', text: 'Principal' },
        { label: 'B', text: 'Action' },
        { label: 'C', text: 'Resource' },
        { label: 'D', text: 'Condition' }
      ],
      correctAnswer: 'B',
      explanation: 'Action especifica operações (ex: s3:GetObject). Resource define em que recursos. Condition adiciona restrições.',
      relatedService: 'iam'
    },
    {
      id: 7,
      topic: 'iam',
      question: 'O que significa Effect: Deny em uma policy?',
      context: 'Avaliação.',
      options: [
        { label: 'A', text: 'Permite a ação' },
        { label: 'B', text: 'Nega explicitamente a ação, sobrepondo qualquer Allow' },
        { label: 'C', text: 'Ignora a ação' },
        { label: 'D', text: 'Delega a decisão' }
      ],
      correctAnswer: 'B',
      explanation: 'Explicit Deny sempre vence. Ordem: Deny > Allow > Implicit Deny.',
      relatedService: 'iam'
    },
    {
      id: 8,
      topic: 'iam',
      question: 'Como restringir acesso por IP de origem?',
      context: 'Segurança adicional.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar Condition com aws:SourceIp' },
        { label: 'C', text: 'Usar Security Group' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Condition keys como aws:SourceIp permitem restringir ações por IP de origem.',
      relatedService: 'iam'
    },
    {
      id: 9,
      topic: 'iam',
      question: 'O que é MFA (Multi-Factor Authentication)?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Senha mais longa' },
        { label: 'B', text: 'Segundo fator de autenticação além da senha (token, app, hardware key)' },
        { label: 'C', text: 'Criptografia de disco' },
        { label: 'D', text: 'Política de rotação' }
      ],
      correctAnswer: 'B',
      explanation: 'MFA adiciona camada de segurança. Pode ser virtual (app), hardware (YubiKey) ou SMS.',
      relatedService: 'iam'
    },
    {
      id: 10,
      topic: 'iam',
      question: 'Como forçar MFA para ações sensíveis?',
      context: 'Proteção adicional.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition: aws:MultiFactorAuthPresent: true na policy' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Usar SSL' }
      ],
      correctAnswer: 'B',
      explanation: 'Condition aws:MultiFactorAuthPresent força usuário a ter MFA ativo para executar ação.',
      relatedService: 'iam'
    },
    {
      id: 11,
      topic: 'iam',
      question: 'O que são IAM Groups?',
      context: 'Organização.',
      options: [
        { label: 'A', text: 'Grupos de recursos' },
        { label: 'B', text: 'Coleção de usuários que compartilham policies' },
        { label: 'C', text: 'Grupos de segurança' },
        { label: 'D', text: 'Grupos de VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'Groups simplificam gerenciamento: anexe policy ao grupo, todos os membros herdam.',
      relatedService: 'iam'
    },
    {
      id: 12,
      topic: 'iam',
      question: 'É possível aninhar grupos IAM?',
      context: 'Hierarquia.',
      options: [
        { label: 'A', text: 'Sim, ilimitado' },
        { label: 'B', text: 'Não, grupos não podem conter outros grupos' },
        { label: 'C', text: 'Apenas 2 níveis' },
        { label: 'D', text: 'Apenas com Organizations' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM Groups não suportam aninhamento. Usuário pode pertencer a múltiplos grupos.',
      relatedService: 'iam'
    },
    {
      id: 13,
      topic: 'iam',
      question: 'O que é AWS STS?',
      context: 'Tokens temporários.',
      options: [
        { label: 'A', text: 'Serviço de storage' },
        { label: 'B', text: 'Security Token Service - emite credenciais temporárias para roles e federation' },
        { label: 'C', text: 'Serviço de streaming' },
        { label: 'D', text: 'Serviço de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'STS emite tokens temporários (AssumeRole, GetSessionToken, etc.). Credenciais expiram.',
      relatedService: 'iam'
    },
    {
      id: 14,
      topic: 'iam',
      question: 'O que é AssumeRole?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'Criar novo role' },
        { label: 'B', text: 'Obter credenciais temporárias de um role que você tem permissão para assumir' },
        { label: 'C', text: 'Deletar role' },
        { label: 'D', text: 'Listar roles' }
      ],
      correctAnswer: 'B',
      explanation: 'AssumeRole retorna credenciais temporárias do role. Usado para cross-account, federation.',
      relatedService: 'iam'
    },
    {
      id: 15,
      topic: 'iam',
      question: 'Como permitir que conta B acesse recursos da conta A?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'Compartilhar senha' },
        { label: 'B', text: 'Criar role na conta A com trust policy permitindo conta B assumir' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Cross-account: role na conta de destino com trust para conta de origem. Origem faz AssumeRole.',
      relatedService: 'iam'
    },
    {
      id: 16,
      topic: 'iam',
      question: 'O que são Managed Policies?',
      context: 'Tipos de policy.',
      options: [
        { label: 'A', text: 'Policies inline' },
        { label: 'B', text: 'Policies standalone reutilizáveis (AWS managed ou customer managed)' },
        { label: 'C', text: 'Policies de rede' },
        { label: 'D', text: 'Policies de criptografia' }
      ],
      correctAnswer: 'B',
      explanation: 'Managed policies são objetos separados que podem ser anexados a múltiplos users/groups/roles.',
      relatedService: 'iam'
    },
    {
      id: 17,
      topic: 'iam',
      question: 'Qual diferença entre AWS Managed e Customer Managed policies?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'São idênticas' },
        { label: 'B', text: 'AWS Managed são criadas/mantidas pela AWS; Customer Managed são criadas pelo cliente' },
        { label: 'C', text: 'Customer é mais cara' },
        { label: 'D', text: 'AWS Managed é deprecated' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Managed policies (ex: ReadOnlyAccess) são mantidas pela AWS. Customer Managed você controla.',
      relatedService: 'iam'
    },
    {
      id: 18,
      topic: 'iam',
      question: 'O que é Inline Policy?',
      context: 'Tipos.',
      options: [
        { label: 'A', text: 'Policy reutilizável' },
        { label: 'B', text: 'Policy embutida diretamente em um user/group/role específico' },
        { label: 'C', text: 'Policy de rede' },
        { label: 'D', text: 'Policy global' }
      ],
      correctAnswer: 'B',
      explanation: 'Inline policy é 1:1 com a entidade. Deletar entidade deleta policy. Menos recomendado que managed.',
      relatedService: 'iam'
    },
    {
      id: 19,
      topic: 'iam',
      question: 'Como auditar uso de credenciais IAM?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'IAM Credential Report e Access Analyzer' },
        { label: 'C', text: 'CloudFront logs' },
        { label: 'D', text: 'S3 logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Credential Report lista todos users e status de credenciais. Access Analyzer identifica permissões excessivas.',
      relatedService: 'iam'
    },
    {
      id: 20,
      topic: 'iam',
      question: 'O que é IAM Access Analyzer?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Ferramenta de backup' },
        { label: 'B', text: 'Analisa policies para identificar recursos compartilhados externamente ou permissões excessivas' },
        { label: 'C', text: 'Ferramenta de rede' },
        { label: 'D', text: 'Ferramenta de custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Access Analyzer identifica buckets públicos, roles com trust externo, etc. Gera findings.',
      relatedService: 'iam'
    },
    {
      id: 21,
      topic: 'iam',
      question: 'Como rotacionar access keys?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Deletar e recriar' },
        { label: 'B', text: 'Criar nova key, atualizar aplicações, desativar antiga, deletar após validar' },
        { label: 'C', text: 'Não é necessário' },
        { label: 'D', text: 'AWS faz automaticamente' }
      ],
      correctAnswer: 'B',
      explanation: 'Rotação gradual evita downtime: crie nova, teste, desative antiga, delete após confirmar.',
      relatedService: 'iam'
    },
    {
      id: 22,
      topic: 'iam',
      question: 'Quantas access keys um usuário pode ter?',
      context: 'Limites.',
      options: [
        { label: 'A', text: '1' },
        { label: 'B', text: '2 (permite rotação sem downtime)' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: '5' }
      ],
      correctAnswer: 'B',
      explanation: 'Limite de 2 keys permite manter uma ativa enquanto rota a outra.',
      relatedService: 'iam'
    },
    {
      id: 23,
      topic: 'iam',
      question: 'O que é Permission Boundary?',
      context: 'Delegação.',
      options: [
        { label: 'A', text: 'Substitui policies' },
        { label: 'B', text: 'Limita máximo de permissões que uma entidade pode ter, mesmo com policies adicionais' },
        { label: 'C', text: 'Aumenta permissões' },
        { label: 'D', text: 'Define grupos' }
      ],
      correctAnswer: 'B',
      explanation: 'Permission Boundary é guardrail: interseção entre boundary e identity policy define acesso efetivo.',
      relatedService: 'iam'
    },
    {
      id: 24,
      topic: 'iam',
      question: 'Quando usar Permission Boundaries?',
      context: 'Delegação segura.',
      options: [
        { label: 'A', text: 'Nunca' },
        { label: 'B', text: 'Para permitir que admins criem roles/users sem exceder permissões definidas' },
        { label: 'C', text: 'Para aumentar permissões' },
        { label: 'D', text: 'Para backup' }
      ],
      correctAnswer: 'B',
      explanation: 'Boundaries permitem delegação: dev pode criar roles desde que não excedam boundary.',
      relatedService: 'iam'
    },
    {
      id: 25,
      topic: 'iam',
      question: 'O que é Service Control Policy (SCP)?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'Policy IAM normal' },
        { label: 'B', text: 'Policy que define máximo de permissões para contas em AWS Organizations' },
        { label: 'C', text: 'Policy de rede' },
        { label: 'D', text: 'Policy de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'SCPs são guardrails no nível de conta/OU. Não concedem, apenas limitam. Root account isenta.',
      relatedService: 'iam'
    },
    {
      id: 26,
      topic: 'iam',
      question: 'SCP concede permissões?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'Sim, substitui IAM' },
        { label: 'B', text: 'Não, apenas limita o máximo permitido; ainda precisa de IAM policy para Allow' },
        { label: 'C', text: 'Apenas para root' },
        { label: 'D', text: 'Depende da região' }
      ],
      correctAnswer: 'B',
      explanation: 'SCP define teto. Permissão efetiva = SCP AND IAM policy. Ambos precisam permitir.',
      relatedService: 'iam'
    },
    {
      id: 27,
      topic: 'iam',
      question: 'O que é IAM Identity Center (antigo SSO)?',
      context: 'Federation.',
      options: [
        { label: 'A', text: 'Serviço de banco de dados' },
        { label: 'B', text: 'Serviço centralizado para gerenciar acesso SSO a múltiplas contas e aplicações' },
        { label: 'C', text: 'Serviço de backup' },
        { label: 'D', text: 'Serviço de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Identity Center fornece SSO para contas AWS e apps SaaS. Integra com IdPs externos.',
      relatedService: 'iam'
    },
    {
      id: 28,
      topic: 'iam',
      question: 'Como integrar Active Directory com IAM?',
      context: 'Federation.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar IAM Identity Center, AWS Directory Service ou SAML federation' },
        { label: 'C', text: 'Importar usuários manualmente' },
        { label: 'D', text: 'Usar VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Múltiplas opções: AD Connector, Managed AD, SAML 2.0 federation, Identity Center.',
      relatedService: 'iam'
    },
    {
      id: 29,
      topic: 'iam',
      question: 'O que é SAML 2.0 federation?',
      context: 'SSO.',
      options: [
        { label: 'A', text: 'Protocolo de criptografia' },
        { label: 'B', text: 'Protocolo que permite SSO federando IdP externo com AWS (troca de assertions)' },
        { label: 'C', text: 'Protocolo de rede' },
        { label: 'D', text: 'Protocolo de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'SAML permite autenticar em IdP corporativo e receber credenciais AWS temporárias.',
      relatedService: 'iam'
    },
    {
      id: 30,
      topic: 'iam',
      question: 'O que é Web Identity Federation?',
      context: 'Apps móveis/web.',
      options: [
        { label: 'A', text: 'Apenas para websites' },
        { label: 'B', text: 'Permite apps mobile/web autenticar com Google/Facebook/Amazon e obter credenciais AWS' },
        { label: 'C', text: 'Protocolo de rede' },
        { label: 'D', text: 'Backup de identidade' }
      ],
      correctAnswer: 'B',
      explanation: 'Web Identity Federation via Cognito ou AssumeRoleWithWebIdentity. App obtém token IdP, troca por credenciais AWS.',
      relatedService: 'iam'
    },
    {
      id: 31,
      topic: 'iam',
      question: 'Como definir policy para todos os objetos de um bucket S3?',
      context: 'Resource ARN.',
      options: [
        { label: 'A', text: 'arn:aws:s3:::bucket' },
        { label: 'B', text: 'arn:aws:s3:::bucket/*' },
        { label: 'C', text: 'arn:aws:s3:::bucket:*' },
        { label: 'D', text: 's3://bucket/*' }
      ],
      correctAnswer: 'B',
      explanation: 'bucket/* inclui todos os objetos. bucket sozinho refere-se ao bucket (não objetos).',
      relatedService: 'iam'
    },
    {
      id: 32,
      topic: 'iam',
      question: 'O que é Principal em uma policy?',
      context: 'Estrutura.',
      options: [
        { label: 'A', text: 'A ação permitida' },
        { label: 'B', text: 'A entidade (user, role, account, service) a quem a policy se aplica' },
        { label: 'C', text: 'O recurso' },
        { label: 'D', text: 'A condição' }
      ],
      correctAnswer: 'B',
      explanation: 'Principal define quem. Em resource-based policies, especifica explicitamente. Identity-based não precisa (implícito).',
      relatedService: 'iam'
    },
    {
      id: 33,
      topic: 'iam',
      question: 'Como negar acesso a uma região específica?',
      context: 'Restrição geográfica.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition com aws:RequestedRegion e Deny' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:RequestedRegion permite restringir ações a regiões específicas via Condition.',
      relatedService: 'iam'
    },
    {
      id: 34,
      topic: 'iam',
      question: 'O que é IAM Policy Simulator?',
      context: 'Teste.',
      options: [
        { label: 'A', text: 'Ambiente de produção' },
        { label: 'B', text: 'Ferramenta para testar e depurar policies antes de aplicá-las' },
        { label: 'C', text: 'Simulador EC2' },
        { label: 'D', text: 'Ferramenta de custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Policy Simulator permite testar ações contra policies existentes sem afetar produção.',
      relatedService: 'iam'
    },
    {
      id: 35,
      topic: 'iam',
      question: 'O que acontece se não houver Allow explícito?',
      context: 'Avaliação.',
      options: [
        { label: 'A', text: 'Ação é permitida' },
        { label: 'B', text: 'Implicit Deny - ação é negada por padrão' },
        { label: 'C', text: 'Erro de sistema' },
        { label: 'D', text: 'Pergunta ao usuário' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM usa deny-by-default. Sem Allow explícito, ação é negada (implicit deny).',
      relatedService: 'iam'
    },
    {
      id: 36,
      topic: 'iam',
      question: 'Qual precedência: Explicit Deny, Allow ou Implicit Deny?',
      context: 'Avaliação.',
      options: [
        { label: 'A', text: 'Allow > Deny > Implicit' },
        { label: 'B', text: 'Explicit Deny > Allow > Implicit Deny' },
        { label: 'C', text: 'Implicit > Explicit' },
        { label: 'D', text: 'São iguais' }
      ],
      correctAnswer: 'B',
      explanation: 'Explicit Deny sempre vence. Depois Allow. Se nenhum, Implicit Deny.',
      relatedService: 'iam'
    },
    {
      id: 37,
      topic: 'iam',
      question: 'Como listar todas as ações de S3?',
      context: 'Documentação.',
      options: [
        { label: 'A', text: 'Não existe' },
        { label: 'B', text: 's3:* ou consultar AWS documentation (Service Authorization Reference)' },
        { label: 'C', text: 'aws s3 list-actions' },
        { label: 'D', text: 'S3 console' }
      ],
      correctAnswer: 'B',
      explanation: 'Service Authorization Reference documenta todas as ações, recursos e condition keys por serviço.',
      relatedService: 'iam'
    },
    {
      id: 38,
      topic: 'iam',
      question: 'O que é NotAction?',
      context: 'Policy.',
      options: [
        { label: 'A', text: 'Igual a Action' },
        { label: 'B', text: 'Aplica efeito a todas as ações EXCETO as listadas' },
        { label: 'C', text: 'Bloqueia todas ações' },
        { label: 'D', text: 'Permite todas ações' }
      ],
      correctAnswer: 'B',
      explanation: 'NotAction com Allow permite tudo exceto as ações listadas. Usar com cuidado.',
      relatedService: 'iam'
    },
    {
      id: 39,
      topic: 'iam',
      question: 'O que é NotResource?',
      context: 'Policy.',
      options: [
        { label: 'A', text: 'Igual a Resource' },
        { label: 'B', text: 'Aplica efeito a todos os recursos EXCETO os listados' },
        { label: 'C', text: 'Bloqueia todos recursos' },
        { label: 'D', text: 'Sem efeito' }
      ],
      correctAnswer: 'B',
      explanation: 'NotResource aplica ação a todos os recursos exceto os especificados.',
      relatedService: 'iam'
    },
    {
      id: 40,
      topic: 'iam',
      question: 'Qual melhor prática para root account?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Usar diariamente' },
        { label: 'B', text: 'Não usar para tarefas diárias; habilitar MFA; armazenar credenciais seguramente' },
        { label: 'C', text: 'Compartilhar com equipe' },
        { label: 'D', text: 'Não habilitar MFA' }
      ],
      correctAnswer: 'B',
      explanation: 'Root tem acesso total. Usar apenas para tarefas que exigem (ex: fechar conta). MFA obrigatório.',
      relatedService: 'iam'
    },
    {
      id: 41,
      topic: 'iam',
      question: 'O que é service-linked role?',
      context: 'Automação.',
      options: [
        { label: 'A', text: 'Role criado pelo usuário' },
        { label: 'B', text: 'Role pré-definido por um serviço AWS para realizar ações em seu nome' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Service-linked roles são criados e gerenciados pelo serviço (ex: AWS Config, ELB). Não pode modificar trust.',
      relatedService: 'iam'
    },
    {
      id: 42,
      topic: 'iam',
      question: 'Como visualizar permissões efetivas de um usuário?',
      context: 'Troubleshooting.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Policy Simulator ou Access Analyzer Policy Validation' },
        { label: 'C', text: 'CloudWatch' },
        { label: 'D', text: 'VPC Flow Logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Policy Simulator mostra resultados de avaliação. Access Analyzer valida syntax e identifica issues.',
      relatedService: 'iam'
    },
    {
      id: 43,
      topic: 'iam',
      question: 'O que são session tags?',
      context: 'Roles.',
      options: [
        { label: 'A', text: 'Tags de EC2' },
        { label: 'B', text: 'Tags passadas ao assumir role, usadas em conditions para ABAC' },
        { label: 'C', text: 'Tags de VPC' },
        { label: 'D', text: 'Tags de billing' }
      ],
      correctAnswer: 'B',
      explanation: 'Session tags são key-value passados via AssumeRole. Permitem ABAC (Attribute-Based Access Control).',
      relatedService: 'iam'
    },
    {
      id: 44,
      topic: 'iam',
      question: 'O que é ABAC?',
      context: 'Controle de acesso.',
      options: [
        { label: 'A', text: 'Access By Account Control' },
        { label: 'B', text: 'Attribute-Based Access Control - controle baseado em atributos/tags' },
        { label: 'C', text: 'Automatic Backup and Control' },
        { label: 'D', text: 'AWS Billing Account Control' }
      ],
      correctAnswer: 'B',
      explanation: 'ABAC usa tags/atributos para autorização. Ex: user com tag Dept=Sales acessa recursos com mesma tag.',
      relatedService: 'iam'
    },
    {
      id: 45,
      topic: 'iam',
      question: 'Vantagem de ABAC sobre RBAC tradicional?',
      context: 'Escalabilidade.',
      options: [
        { label: 'A', text: 'Mais lento' },
        { label: 'B', text: 'Escalável - novas permissões sem atualizar policies, apenas tags' },
        { label: 'C', text: 'Mais complexo' },
        { label: 'D', text: 'Menos seguro' }
      ],
      correctAnswer: 'B',
      explanation: 'ABAC: adicione tag ao recurso e usuário, policy genérica autoriza. Não precisa listar cada recurso.',
      relatedService: 'iam'
    },
    {
      id: 46,
      topic: 'iam',
      question: 'Como restringir acesso apenas durante horário comercial?',
      context: 'Temporal.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition com aws:CurrentTime ou DateGreaterThan/DateLessThan' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'Condition keys temporais permitem restringir ações por hora/data.',
      relatedService: 'iam'
    },
    {
      id: 47,
      topic: 'iam',
      question: 'O que é aws:PrincipalOrgID?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'ID do usuário' },
        { label: 'B', text: 'Condition key para restringir acesso apenas a principals da mesma Organization' },
        { label: 'C', text: 'ID da VPC' },
        { label: 'D', text: 'ID do recurso' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:PrincipalOrgID permite resource-based policies restringirem acesso à Organization inteira.',
      relatedService: 'iam'
    },
    {
      id: 48,
      topic: 'iam',
      question: 'Como garantir que políticas sigam compliance?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Revisão manual' },
        { label: 'B', text: 'AWS Config rules, Access Analyzer, SCPs e Permission Boundaries' },
        { label: 'C', text: 'Não há como' },
        { label: 'D', text: 'Apenas CloudTrail' }
      ],
      correctAnswer: 'B',
      explanation: 'Múltiplas ferramentas: Config valida, Access Analyzer detecta, SCPs e boundaries limitam.',
      relatedService: 'iam'
    },
    {
      id: 49,
      topic: 'iam',
      question: 'O que é IAM tagging?',
      context: 'Organização.',
      options: [
        { label: 'A', text: 'Apenas para EC2' },
        { label: 'B', text: 'Adicionar tags a users, roles e customer managed policies para organização e ABAC' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Apenas para billing' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM entities suportam tags para organização, cost allocation e ABAC.',
      relatedService: 'iam'
    },
    {
      id: 50,
      topic: 'iam',
      question: 'Qual limite de policies anexadas a um user?',
      context: 'Limites.',
      options: [
        { label: 'A', text: '5' },
        { label: 'B', text: '10 managed policies por user/group/role' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: '20' }
      ],
      correctAnswer: 'B',
      explanation: 'Limite padrão: 10 managed policies. Pode solicitar aumento. Inline policies têm limite de tamanho.',
      relatedService: 'iam'
    },
    {
      id: 51,
      topic: 'iam',
      question: 'Como logar todas as chamadas de API IAM?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'VPC Flow Logs' },
        { label: 'B', text: 'AWS CloudTrail' },
        { label: 'C', text: 'CloudWatch Metrics' },
        { label: 'D', text: 'S3 Access Logs' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail registra chamadas de API IAM: CreateUser, AttachPolicy, DeleteRole, etc.',
      relatedService: 'iam'
    },
    {
      id: 52,
      topic: 'iam',
      question: 'O que é Resource-based policy?',
      context: 'Tipos.',
      options: [
        { label: 'A', text: 'Policy anexada a usuário' },
        { label: 'B', text: 'Policy anexada diretamente ao recurso (bucket policy, KMS key policy)' },
        { label: 'C', text: 'Policy de rede' },
        { label: 'D', text: 'Policy global' }
      ],
      correctAnswer: 'B',
      explanation: 'Resource-based policies são anexadas ao recurso e especificam principal. Não todos serviços suportam.',
      relatedService: 'iam'
    },
    {
      id: 53,
      topic: 'iam',
      question: 'Quais serviços suportam resource-based policies?',
      context: 'Compatibilidade.',
      options: [
        { label: 'A', text: 'Apenas S3' },
        { label: 'B', text: 'S3, SQS, SNS, Lambda, KMS, Secrets Manager, API Gateway, entre outros' },
        { label: 'C', text: 'Nenhum' },
        { label: 'D', text: 'Apenas EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Vários serviços: S3 bucket policies, SQS queue policies, Lambda function policies, etc.',
      relatedService: 'iam'
    },
    {
      id: 54,
      topic: 'iam',
      question: 'Como delegar acesso sem compartilhar credenciais permanentes?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Enviar access keys' },
        { label: 'B', text: 'Usar IAM Roles com AssumeRole - credenciais temporárias' },
        { label: 'C', text: 'Compartilhar senha' },
        { label: 'D', text: 'Criar novo usuário' }
      ],
      correctAnswer: 'B',
      explanation: 'Roles fornecem credenciais temporárias. Mais seguro que credenciais permanentes.',
      relatedService: 'iam'
    },
    {
      id: 55,
      topic: 'iam',
      question: 'O que é External ID em AssumeRole?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'ID do usuário' },
        { label: 'B', text: 'String secreta para evitar confused deputy problem em integrações third-party' },
        { label: 'C', text: 'ARN do role' },
        { label: 'D', text: 'ID da conta' }
      ],
      correctAnswer: 'B',
      explanation: 'External ID previne que terceiros usem seu role indevidamente (confused deputy). Third-party fornece ID único.',
      relatedService: 'iam'
    },
    {
      id: 56,
      topic: 'iam',
      question: 'O que é confused deputy problem?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Erro de sintaxe' },
        { label: 'B', text: 'Atacante engana serviço intermediário para acessar seus recursos usando permissões do serviço' },
        { label: 'C', text: 'Problema de rede' },
        { label: 'D', text: 'Erro de quota' }
      ],
      correctAnswer: 'B',
      explanation: 'Confused deputy: service A tem role para acessar sua conta. Atacante usa service A para acessar você. External ID mitiga.',
      relatedService: 'iam'
    },
    {
      id: 57,
      topic: 'iam',
      question: 'Por quanto tempo credenciais STS são válidas por padrão?',
      context: 'Tokens.',
      options: [
        { label: 'A', text: 'Permanente' },
        { label: 'B', text: '1 hora (configurável de 15min a 12h dependendo do tipo)' },
        { label: 'C', text: '24 horas' },
        { label: 'D', text: '1 minuto' }
      ],
      correctAnswer: 'B',
      explanation: 'AssumeRole: default 1h, max 12h. GetSessionToken: 12h default. Configurável no role.',
      relatedService: 'iam'
    },
    {
      id: 58,
      topic: 'iam',
      question: 'Como revogar sessões ativas de um role?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar "Revoke sessions" que adiciona Deny para tokens emitidos antes de agora' },
        { label: 'C', text: 'Deletar role' },
        { label: 'D', text: 'Reiniciar AWS' }
      ],
      correctAnswer: 'B',
      explanation: 'Revoke sessions adiciona inline policy com Deny para aws:TokenIssueTime antes do timestamp atual.',
      relatedService: 'iam'
    },
    {
      id: 59,
      topic: 'iam',
      question: 'O que é PassRole permission?',
      context: 'Delegação.',
      options: [
        { label: 'A', text: 'Assumir role' },
        { label: 'B', text: 'Permissão para passar um role a um serviço AWS (ex: EC2, Lambda)' },
        { label: 'C', text: 'Criar role' },
        { label: 'D', text: 'Deletar role' }
      ],
      correctAnswer: 'B',
      explanation: 'iam:PassRole permite especificar role ao criar recursos (ex: EC2 com instance profile, Lambda function).',
      relatedService: 'iam'
    },
    {
      id: 60,
      topic: 'iam',
      question: 'Por que PassRole é importante para segurança?',
      context: 'Privilégios.',
      options: [
        { label: 'A', text: 'Não é importante' },
        { label: 'B', text: 'Evita escalação de privilégios - usuário não pode passar role mais poderoso que suas permissões' },
        { label: 'C', text: 'Melhora performance' },
        { label: 'D', text: 'Reduz custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem controle de PassRole, usuário criaria Lambda com role Admin, escalando privilégios.',
      relatedService: 'iam'
    },
    {
      id: 61,
      topic: 'iam',
      question: 'Como definir password policy?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Por usuário' },
        { label: 'B', text: 'IAM > Account Settings > Password Policy (length, complexity, rotation)' },
        { label: 'C', text: 'Não é configurável' },
        { label: 'D', text: 'Via CLI apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Password policy define requisitos: mínimo caracteres, tipos, expiração, prevent reuse.',
      relatedService: 'iam'
    },
    {
      id: 62,
      topic: 'iam',
      question: 'O que é AWS Secrets Manager vs IAM credentials?',
      context: 'Gestão de credenciais.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Secrets Manager armazena/rotaciona segredos (DB passwords); IAM gerencia identidades AWS' },
        { label: 'C', text: 'Secrets Manager é deprecated' },
        { label: 'D', text: 'IAM armazena senhas de banco' }
      ],
      correctAnswer: 'B',
      explanation: 'Secrets Manager para credenciais de aplicação (DB, API keys). IAM para acesso a AWS APIs.',
      relatedService: 'iam'
    },
    {
      id: 63,
      topic: 'iam',
      question: 'Como implementar segregação de duties?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Dar acesso total a todos' },
        { label: 'B', text: 'Policies separadas: quem cria não aprova, quem desenvolve não deploya em prod' },
        { label: 'C', text: 'Usar root' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Segregation of duties via policies diferentes, MFA requirements, approval workflows.',
      relatedService: 'iam'
    },
    {
      id: 64,
      topic: 'iam',
      question: 'O que é AWS Organizations?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Grupo de usuários' },
        { label: 'B', text: 'Serviço para gerenciar múltiplas contas AWS centralizadamente (billing, SCPs, etc)' },
        { label: 'C', text: 'VPC' },
        { label: 'D', text: 'Serviço de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Organizations consolida contas em OUs, aplica SCPs, compartilha billing, habilita serviços cross-account.',
      relatedService: 'iam'
    },
    {
      id: 65,
      topic: 'iam',
      question: 'O que são Organizational Units (OUs)?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'Grupos IAM' },
        { label: 'B', text: 'Containers para agrupar contas AWS dentro de uma Organization' },
        { label: 'C', text: 'VPCs' },
        { label: 'D', text: 'Subnets' }
      ],
      correctAnswer: 'B',
      explanation: 'OUs organizam contas hierarquicamente. SCPs aplicados a OU afetam todas contas filhas.',
      relatedService: 'iam'
    },
    {
      id: 66,
      topic: 'iam',
      question: 'Qual ARN representa todos os usuários de uma conta?',
      context: 'Wildcards.',
      options: [
        { label: 'A', text: 'arn:aws:iam::123456789012:user' },
        { label: 'B', text: 'arn:aws:iam::123456789012:user/*' },
        { label: 'C', text: 'arn:aws:iam::123456789012:*' },
        { label: 'D', text: '*' }
      ],
      correctAnswer: 'B',
      explanation: 'user/* representa todos os usuários. * sozinho representa todos os principals.',
      relatedService: 'iam'
    },
    {
      id: 67,
      topic: 'iam',
      question: 'O que acontece quando um usuário pertence a múltiplos grupos?',
      context: 'Avaliação.',
      options: [
        { label: 'A', text: 'Erro' },
        { label: 'B', text: 'Todas as policies são unidas (union); Deny em qualquer uma nega' },
        { label: 'C', text: 'Apenas primeiro grupo' },
        { label: 'D', text: 'Apenas último grupo' }
      ],
      correctAnswer: 'B',
      explanation: 'Policies de todos os grupos + user policies são avaliadas juntas. Explicit Deny vence.',
      relatedService: 'iam'
    },
    {
      id: 68,
      topic: 'iam',
      question: 'Como permitir acesso apenas de instâncias EC2 específicas?',
      context: 'Restrição.',
      options: [
        { label: 'A', text: 'Por IP' },
        { label: 'B', text: 'Condition com aws:SourceArn ou ec2:SourceInstanceARN' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'Condition keys específicas de EC2 permitem restringir por instance ID ou ARN.',
      relatedService: 'iam'
    },
    {
      id: 69,
      topic: 'iam',
      question: 'O que é aws:VpcSourceIp?',
      context: 'Conditions.',
      options: [
        { label: 'A', text: 'IP público' },
        { label: 'B', text: 'Condition key para IP privado quando acesso via VPC Endpoint' },
        { label: 'C', text: 'IP da VPC' },
        { label: 'D', text: 'IP do NAT' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:VpcSourceIp captura IP privado de origem ao acessar serviço via VPC Endpoint.',
      relatedService: 'iam'
    },
    {
      id: 70,
      topic: 'iam',
      question: 'Como restringir acesso apenas via VPC Endpoint?',
      context: 'PrivateLink.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition com aws:SourceVpce ou aws:SourceVpc' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:SourceVpce restringe a específico VPC Endpoint. aws:SourceVpc a específica VPC.',
      relatedService: 'iam'
    },
    {
      id: 71,
      topic: 'iam',
      question: 'O que são Global Condition Keys vs Service-Specific?',
      context: 'Conditions.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Global (aws:*) funcionam para todos serviços; Service-specific (s3:*, ec2:*) só para aquele serviço' },
        { label: 'C', text: 'Global é deprecated' },
        { label: 'D', text: 'Service-specific é global' }
      ],
      correctAnswer: 'B',
      explanation: 'Global keys: aws:SourceIp, aws:CurrentTime. Service-specific: s3:prefix, ec2:ResourceTag.',
      relatedService: 'iam'
    },
    {
      id: 72,
      topic: 'iam',
      question: 'O que é StringEquals vs StringLike?',
      context: 'Conditions.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'StringEquals é match exato; StringLike permite wildcards (* e ?)' },
        { label: 'C', text: 'StringLike é deprecated' },
        { label: 'D', text: 'StringEquals permite wildcards' }
      ],
      correctAnswer: 'B',
      explanation: 'StringEquals: valor exato. StringLike: padrões com * (qualquer chars) e ? (1 char).',
      relatedService: 'iam'
    },
    {
      id: 73,
      topic: 'iam',
      question: 'O que é ForAllValues vs ForAnyValue?',
      context: 'Set operators.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'ForAllValues: todos os valores devem satisfazer; ForAnyValue: pelo menos um deve satisfazer' },
        { label: 'C', text: 'Para números' },
        { label: 'D', text: 'Para datas' }
      ],
      correctAnswer: 'B',
      explanation: 'Set operators para condition values que são arrays. ForAllValues = AND, ForAnyValue = OR.',
      relatedService: 'iam'
    },
    {
      id: 74,
      topic: 'iam',
      question: 'Como requerer TLS/SSL para chamadas de API?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition: aws:SecureTransport: true' },
        { label: 'C', text: 'Usar VPN' },
        { label: 'D', text: 'Por padrão já é' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:SecureTransport garante que requisição veio via HTTPS. Deny se false.',
      relatedService: 'iam'
    },
    {
      id: 75,
      topic: 'iam',
      question: 'O que é IAM policy versioning?',
      context: 'Gerenciamento.',
      options: [
        { label: 'A', text: 'Não existe' },
        { label: 'B', text: 'Managed policies podem ter até 5 versões; você escolhe qual é a default' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: 'Apenas 1 versão' }
      ],
      correctAnswer: 'B',
      explanation: 'Customer managed policies suportam 5 versões. Permite rollback. Uma é default.',
      relatedService: 'iam'
    },
    {
      id: 76,
      topic: 'iam',
      question: 'Como identificar usuários sem MFA ativo?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'Manualmente' },
        { label: 'B', text: 'IAM Credential Report - coluna mfa_active' },
        { label: 'C', text: 'CloudWatch' },
        { label: 'D', text: 'S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Credential Report lista todos users com status de password, access keys, MFA, last used.',
      relatedService: 'iam'
    },
    {
      id: 77,
      topic: 'iam',
      question: 'O que é Access Advisor?',
      context: 'Least privilege.',
      options: [
        { label: 'A', text: 'Assistente virtual' },
        { label: 'B', text: 'Mostra serviços que o user/role acessou e quando, para identificar permissões não utilizadas' },
        { label: 'C', text: 'Ferramenta de backup' },
        { label: 'D', text: 'Ferramenta de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Access Advisor mostra last accessed por serviço. Ajuda remover permissões não usadas.',
      relatedService: 'iam'
    },
    {
      id: 78,
      topic: 'iam',
      question: 'Como gerar policy baseada em atividade real?',
      context: 'Least privilege.',
      options: [
        { label: 'A', text: 'Manualmente' },
        { label: 'B', text: 'Access Analyzer Policy Generation - analisa CloudTrail e sugere policy' },
        { label: 'C', text: 'CloudWatch' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Access Analyzer analisa CloudTrail logs e gera policy com apenas ações realmente usadas.',
      relatedService: 'iam'
    },
    {
      id: 79,
      topic: 'iam',
      question: 'O que são AWS managed policies PowerUserAccess?',
      context: 'Políticas comuns.',
      options: [
        { label: 'A', text: 'Acesso total' },
        { label: 'B', text: 'Full access a todos serviços exceto IAM e Organizations (não pode gerenciar identidades)' },
        { label: 'C', text: 'Apenas leitura' },
        { label: 'D', text: 'Apenas S3' }
      ],
      correctAnswer: 'B',
      explanation: 'PowerUserAccess: full access menos IAM. Para devs que não devem gerenciar identidades.',
      relatedService: 'iam'
    },
    {
      id: 80,
      topic: 'iam',
      question: 'O que é AdministratorAccess?',
      context: 'Políticas.',
      options: [
        { label: 'A', text: 'Acesso parcial' },
        { label: 'B', text: 'Full access a todos os serviços AWS incluindo IAM' },
        { label: 'C', text: 'Apenas leitura' },
        { label: 'D', text: 'Apenas EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'AdministratorAccess: Action: *, Resource: *. Equivalente a root exceto algumas tarefas de conta.',
      relatedService: 'iam'
    },
    {
      id: 81,
      topic: 'iam',
      question: 'O que é ReadOnlyAccess?',
      context: 'Políticas.',
      options: [
        { label: 'A', text: 'Sem acesso' },
        { label: 'B', text: 'Permissões Get/List/Describe para todos os serviços (sem modificação)' },
        { label: 'C', text: 'Full access' },
        { label: 'D', text: 'Apenas S3' }
      ],
      correctAnswer: 'B',
      explanation: 'ReadOnlyAccess: apenas ações de leitura. Para auditores, suporte level 1.',
      relatedService: 'iam'
    },
    {
      id: 82,
      topic: 'iam',
      question: 'Como criar usuário programático sem console access?',
      context: 'Tipos de usuário.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Criar user sem password, apenas com access keys para API/CLI' },
        { label: 'C', text: 'Todos têm console' },
        { label: 'D', text: 'Usar root' }
      ],
      correctAnswer: 'B',
      explanation: 'User pode ter: só password (console), só access keys (programmatic), ou ambos.',
      relatedService: 'iam'
    },
    {
      id: 83,
      topic: 'iam',
      question: 'Qual melhor prática para access keys?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Nunca rotacionar' },
        { label: 'B', text: 'Preferir roles sobre keys; se necessário, rotacionar regularmente e nunca commitar em código' },
        { label: 'C', text: 'Compartilhar entre equipe' },
        { label: 'D', text: 'Armazenar em S3 público' }
      ],
      correctAnswer: 'B',
      explanation: 'Access keys são credenciais permanentes. Preferir roles. Se necessário, rotacionar, não hardcode.',
      relatedService: 'iam'
    },
    {
      id: 84,
      topic: 'iam',
      question: 'O que é aws:CalledVia?',
      context: 'Conditions.',
      options: [
        { label: 'A', text: 'VPC de origem' },
        { label: 'B', text: 'Condition key que indica qual serviço AWS fez a chamada em nome do usuário' },
        { label: 'C', text: 'Método HTTP' },
        { label: 'D', text: 'Região' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:CalledVia lista serviços que fizeram chamada via service chaining (ex: CloudFormation chamando EC2).',
      relatedService: 'iam'
    },
    {
      id: 85,
      topic: 'iam',
      question: 'Como permitir que Lambda assuma role?',
      context: 'Trust policy.',
      options: [
        { label: 'A', text: 'Não precisa configurar' },
        { label: 'B', text: 'Trust policy do role deve permitir Principal: Service: lambda.amazonaws.com' },
        { label: 'C', text: 'Adicionar tag' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust policy define quem pode assumir. Para Lambda: Principal Service lambda.amazonaws.com.',
      relatedService: 'iam'
    },
    {
      id: 86,
      topic: 'iam',
      question: 'O que é iam:CreateServiceLinkedRole?',
      context: 'Permissões.',
      options: [
        { label: 'A', text: 'Criar usuário' },
        { label: 'B', text: 'Permissão para permitir que serviço crie seu service-linked role automaticamente' },
        { label: 'C', text: 'Criar grupo' },
        { label: 'D', text: 'Criar policy' }
      ],
      correctAnswer: 'B',
      explanation: 'Alguns serviços criam service-linked roles automaticamente. Usuário precisa dessa permissão.',
      relatedService: 'iam'
    },
    {
      id: 87,
      topic: 'iam',
      question: 'Como impedir que usuários modifiquem seu próprio MFA?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Deny iam:DeactivateMFADevice e iam:DeleteVirtualMFADevice para self' },
        { label: 'C', text: 'Habilitar MFA' },
        { label: 'D', text: 'Password policy' }
      ],
      correctAnswer: 'B',
      explanation: 'Policy com Deny para ações MFA quando resource é o próprio usuário (aws:username).',
      relatedService: 'iam'
    },
    {
      id: 88,
      topic: 'iam',
      question: 'O que é aws:RequestTag?',
      context: 'ABAC.',
      options: [
        { label: 'A', text: 'Tag existente' },
        { label: 'B', text: 'Condition key para validar tags sendo passadas na requisição de criação' },
        { label: 'C', text: 'Tag de billing' },
        { label: 'D', text: 'Tag de VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:RequestTag/key-name valida tags na requisição. Força que recursos sejam criados com tags obrigatórias.',
      relatedService: 'iam'
    },
    {
      id: 89,
      topic: 'iam',
      question: 'O que é aws:ResourceTag?',
      context: 'ABAC.',
      options: [
        { label: 'A', text: 'Tag da requisição' },
        { label: 'B', text: 'Condition key para validar tags já existentes no recurso sendo acessado' },
        { label: 'C', text: 'Tag de usuário' },
        { label: 'D', text: 'Tag de grupo' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:ResourceTag/key-name compara tag do recurso. Ex: só acessar EC2 com tag Env=Dev.',
      relatedService: 'iam'
    },
    {
      id: 90,
      topic: 'iam',
      question: 'Qual prática para gerenciar credenciais de aplicações em EC2?',
      context: 'Best practices.',
      options: [
        { label: 'A', text: 'Hardcode no código' },
        { label: 'B', text: 'Usar IAM Instance Profile (role anexado) - credenciais temporárias automáticas' },
        { label: 'C', text: 'Variáveis de ambiente permanentes' },
        { label: 'D', text: 'Arquivo de texto no disco' }
      ],
      correctAnswer: 'B',
      explanation: 'Instance Profile fornece credenciais temporárias automaticamente via metadata service. SDK obtém transparentemente.',
      relatedService: 'iam'
    }
  ],

  subnets: [
    {
      id: 1,
      topic: 'subnets',
      question: 'Qual é a principal diferença entre uma subnet pública e privada?',
      context: 'Arquiteto configurando VPC para aplicação web.',
      options: [
        { label: 'A', text: 'Subnet pública tem Internet Gateway na route table; privada não' },
        { label: 'B', text: 'Subnet privada é mais segura por usar criptografia' },
        { label: 'C', text: 'Subnet pública custa mais caro' },
        { label: 'D', text: 'Não há diferença técnica' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnet pública tem rota 0.0.0.0/0 para Internet Gateway, permitindo comunicação direta com internet. Subnet privada não tem essa rota, precisando de NAT Gateway/Instance para acesso outbound. Opção B: criptografia é independente. Opção C: preço igual. Opção D: há diferença na route table.',
      relatedService: 'subnets'
    },
    {
      id: 2,
      topic: 'subnets',
      question: 'Uma instância EC2 em subnet privada precisa baixar updates da internet. Qual recurso é necessário?',
      context: 'Servidores backend precisam acessar internet para updates, mas não devem ser acessíveis de fora.',
      options: [
        { label: 'A', text: 'Elastic IP na instância' },
        { label: 'B', text: 'NAT Gateway na subnet pública' },
        { label: 'C', text: 'Internet Gateway direto' },
        { label: 'D', text: 'VPN Gateway' }
      ],
      correctAnswer: 'B',
      explanation: 'NAT Gateway em subnet pública permite instâncias privadas fazerem conexões outbound para internet (updates, APIs) sem serem acessíveis inbound. Route table privada aponta 0.0.0.0/0 para NAT. Opção A: Elastic IP exige subnet pública. Opção C: IGW requer subnet pública. Opção D: VPN Gateway é para conexão on-premises.',
      relatedService: 'subnets'
    },
    {
      id: 3,
      topic: 'subnets',
      question: 'O que caracteriza uma subnet isolada (isolated) na AWS?',
      context: 'Modelo sem tráfego para internet.',
      options: [
        { label: 'A', text: 'Sem rotas para Internet Gateway nem para NAT Gateway' },
        { label: 'B', text: 'Obrigatoriamente com Elastic IP' },
        { label: 'C', text: 'Exige VPC Peering' },
        { label: 'D', text: 'Precisa de ACL pública' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnets isoladas não possuem rota para IGW (inbound/outbound internet) nem para NAT (outbound). Comunicação só por VPC/TGW/VPN/DX.',
      relatedService: 'subnets'
    },
    {
      id: 4,
      topic: 'subnets',
      question: 'Como disponibilizar acesso OUTBOUND à internet a partir de uma subnet privada?',
      context: 'Instâncias precisam baixar pacotes.',
      options: [
        { label: 'A', text: 'Criar NAT Gateway na subnet pública e apontar rota 0.0.0.0/0' },
        { label: 'B', text: 'Atribuir Elastic IP direto na instância privada' },
        { label: 'C', text: 'Associar Internet Gateway à subnet privada' },
        { label: 'D', text: 'Usar ACL public-read' }
      ],
      correctAnswer: 'A',
      explanation: 'NAT Gateway permite conexões originadas da subnet privada sem aceitar conexões iniciadas da internet.',
      relatedService: 'subnets'
    },
    {
      id: 5,
      topic: 'subnets',
      question: 'Uma subnet é considerada pública quando…',
      context: 'Critérios para classificação.',
      options: [
        { label: 'A', text: 'Sua route table tem rota padrão (0.0.0.0/0) para o Internet Gateway' },
        { label: 'B', text: 'Ela tem mais de 256 IPs' },
        { label: 'C', text: 'Ela usa /30' },
        { label: 'D', text: 'Ela possui um NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'O que define pública é a rota para IGW. Ter NAT Gateway não torna uma subnet pública.',
      relatedService: 'subnets'
    },
    {
      id: 6,
      topic: 'subnets',
      question: 'Quantos endereços IPv4 são reservados pela AWS em cada subnet?',
      context: 'Planejamento de CIDR.',
      options: [
        { label: 'A', text: '5 endereços (.0, .1, .2, .3 e .255 do bloco)' },
        { label: 'B', text: '2 endereços por VPC' },
        { label: 'C', text: 'Nenhum' },
        { label: 'D', text: '10 por AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'Em IPv4, 5 IPs por subnet são reservados. Em IPv6 a reserva difere.',
      relatedService: 'subnets'
    },
    {
      id: 7,
      topic: 'subnets',
      question: 'Qual a menor máscara de subnet permitida para subnets em VPC (IPv4)?',
      context: 'Tamanho mínimo.',
      options: [
        { label: 'A', text: '/28' },
        { label: 'B', text: '/30' },
        { label: 'C', text: '/32' },
        { label: 'D', text: '/27' }
      ],
      correctAnswer: 'A',
      explanation: 'O tamanho mínimo é /28 (16 IPs, 11 utilizáveis). /30 é inválido para subnets em VPC.',
      relatedService: 'subnets'
    },
    {
      id: 8,
      topic: 'subnets',
      question: 'Para que serve o egress-only internet gateway?',
      context: 'IPv6 em subnets privadas.',
      options: [
        { label: 'A', text: 'Permitir apenas tráfego de saída IPv6, bloqueando inbound' },
        { label: 'B', text: 'Traduzir IPv4↔IPv6 automaticamente' },
        { label: 'C', text: 'Ativar NAT64' },
        { label: 'D', text: 'Atribuir Elastic IP IPv4' }
      ],
      correctAnswer: 'A',
      explanation: 'No mundo IPv6, endereços são públicos; o egress-only evita inbound da internet.',
      relatedService: 'subnets'
    },
    {
      id: 9,
      topic: 'subnets',
      question: 'Onde as route tables são associadas?',
      context: 'Escopo de rotas.',
      options: [
        { label: 'A', text: 'À Subnet (associação explícita ou main)' },
        { label: 'B', text: 'A Security Groups' },
        { label: 'C', text: 'Ao Internet Gateway' },
        { label: 'D', text: 'À ENI' }
      ],
      correctAnswer: 'A',
      explanation: 'Route tables operam no nível de subnet. SGs e IGW não possuem route tables próprias.',
      relatedService: 'subnets'
    },
    {
      id: 10,
      topic: 'subnets',
      question: 'Como dividir uma VPC 10.0.0.0/16 em subnets por AZ garantindo alta disponibilidade?',
      context: 'Layout típico 2 AZs.',
      options: [
        { label: 'A', text: 'Criar subnets públicas e privadas em cada AZ com blocos não sobrepostos' },
        { label: 'B', text: 'Criar uma única subnet pública por região' },
        { label: 'C', text: 'Colocar tudo numa subnet /16' },
        { label: 'D', text: 'Sem necessidade de múltiplas AZs' }
      ],
      correctAnswer: 'A',
      explanation: 'Distribuir por AZ garante resiliência; reserve espaço para crescimento com blocos separados.',
      relatedService: 'subnets'
    },
    {
      id: 11,
      topic: 'subnets',
      question: 'Qual afirmação é correta sobre NACLs?',
      context: 'Stateless vs stateful.',
      options: [
        { label: 'A', text: 'NACLs são stateless e avaliam regras por ordem numérica (allow/deny)' },
        { label: 'B', text: 'NACLs são stateful como SG' },
        { label: 'C', text: 'NACL só existe em nível de VPC' },
        { label: 'D', text: 'NACL não influencia tráfego' }
      ],
      correctAnswer: 'A',
      explanation: 'NACLs operam na subnet, exigem regras de ida e volta; primeira regra que casa decide.',
      relatedService: 'subnets'
    },
    {
      id: 12,
      topic: 'subnets',
      question: 'Como permitir acesso privado a S3 a partir de subnets privadas?',
      context: 'Sem internet pública.',
      options: [
        { label: 'A', text: 'Gateway VPC Endpoint para S3 + bucket policy restringindo aws:SourceVpce' },
        { label: 'B', text: 'Atribuir Elastic IP' },
        { label: 'C', text: 'IGW na privada' },
        { label: 'D', text: 'Peering com a internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Gateway endpoint cria rota interna para S3, bloqueando egress para internet pública.',
      relatedService: 'subnets'
    },
    {
      id: 13,
      topic: 'subnets',
      question: 'Qual o impacto de associar duas route tables à mesma subnet?',
      context: 'Associação 1:1.',
      options: [
        { label: 'A', text: 'Não é possível; cada subnet tem no máximo uma route table associada' },
        { label: 'B', text: 'As rotas somam' },
        { label: 'C', text: 'A mais específica vence' },
        { label: 'D', text: 'A de menor ID vence' }
      ],
      correctAnswer: 'A',
      explanation: 'Você troca a associação, mas não combina múltiplas route tables numa subnet.',
      relatedService: 'subnets'
    },
    {
      id: 14,
      topic: 'subnets',
      question: 'Para workloads IPv6-only em subnets privadas, qual rota configurar para sair?',
      context: 'Sem NAT64.',
      options: [
        { label: 'A', text: '::/0 para egress-only internet gateway' },
        { label: 'B', text: '0.0.0.0/0 para NAT Gateway' },
        { label: 'C', text: '0.0.0.0/0 para IGW' },
        { label: 'D', text: 'Nenhuma rota é necessária' }
      ],
      correctAnswer: 'A',
      explanation: 'Egress-only controla apenas saídas em IPv6; NAT é recurso de IPv4.',
      relatedService: 'subnets'
    },
    {
      id: 15,
      topic: 'subnets',
      question: 'Como garantir isolamento entre camadas web e app na VPC?',
      context: 'Separação por rede.',
      options: [
        { label: 'A', text: 'Criar subnets distintas e restringir tráfego via SGs/NACLs' },
        { label: 'B', text: 'Tudo na mesma subnet' },
        { label: 'C', text: 'Apenas um SG aberto' },
        { label: 'D', text: 'Somente DNS privado' }
      ],
      correctAnswer: 'A',
      explanation: 'Segmentar por subnet e aplicar regras reduz blast radius e melhora controle.',
      relatedService: 'subnets'
    },
    {
      id: 16,
      topic: 'subnets',
      question: 'Qual o melhor tamanho de subnet para frontends elásticos em duas AZs?',
      context: 'Planejamento de IPs.',
      options: [
        { label: 'A', text: 'Depende da capacidade; /20 ou /21 são comuns para frontends' },
        { label: 'B', text: 'Sempre /32' },
        { label: 'C', text: 'Sempre /16' },
        { label: 'D', text: 'Sempre /28' }
      ],
      correctAnswer: 'A',
      explanation: 'Não há tamanho único; escolha deve suportar picos, reservas e crescimento por AZ.',
      relatedService: 'subnets'
    },
    {
      id: 17,
      topic: 'subnets',
      question: 'Qual relação entre IGW e subnets públicas?',
      context: 'Rota padrão.',
      options: [
        { label: 'A', text: 'A route table da subnet pública deve apontar 0.0.0.0/0 para o IGW' },
        { label: 'B', text: 'IGW é anexado à subnet, não à VPC' },
        { label: 'C', text: 'IGW substitui NAT Gateway' },
        { label: 'D', text: 'IGW fornece DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'IGW é anexado à VPC e as subnets públicas apontam a rota default para ele.',
      relatedService: 'subnets'
    },
    {
      id: 18,
      topic: 'subnets',
      question: 'Como minimizar risco de hot partitions ao nomear recursos que geram chaves de sessão por data?',
      context: 'Distribuição de tráfego.',
      options: [
        { label: 'A', text: 'Distribuir prefixos (hash/aleatório) nos nomes de recursos' },
        { label: 'B', text: 'Usar uma única subnet' },
        { label: 'C', text: 'Criar ACL pública' },
        { label: 'D', text: 'Desativar IPv6' }
      ],
      correctAnswer: 'A',
      explanation: 'Distribuição de chaves reduz concentração de tráfego; embora típico em S3/DynamoDB, o princípio ajuda no dimensionamento de subnets/NATs.',
      relatedService: 'subnets'
    },
    {
      id: 19,
      topic: 'subnets',
      question: 'Qual recurso de rede você usaria para expor serviços L7 ao público em subnets públicas?',
      context: 'Entrada HTTP/HTTPS.',
      options: [
        { label: 'A', text: 'Application Load Balancer em subnets públicas' },
        { label: 'B', text: 'NAT Gateway' },
        { label: 'C', text: 'VPC Endpoint Gateway' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB recebe tráfego externo em subnets públicas e encaminha para targets, normalmente em subnets privadas.',
      relatedService: 'subnets'
    },
    {
      id: 20,
      topic: 'subnets',
      question: 'Qual combinação permite app-tier privado acessar banco e internet para updates?',
      context: 'Camada app em privada.',
      options: [
        { label: 'A', text: 'Subnet privada + NAT Gateway + SGs apropriados' },
        { label: 'B', text: 'Subnet pública + Elastic IP' },
        { label: 'C', text: 'Subnet isolada + sem rotas' },
        { label: 'D', text: 'IGW direto' }
      ],
      correctAnswer: 'A',
      explanation: 'Apps ficam privados; NAT fornece saída controlada. DB geralmente também em privada/isolada.',
      relatedService: 'subnets'
    },
    {
      id: 21,
      topic: 'subnets',
      question: 'Qual prática evita sobreposição de CIDRs ao criar várias subnets?',
      context: 'Planejamento de endereços.',
      options: [
        { label: 'A', text: 'Planejamento centralizado (IPAM) e reserva de blocos por AZ/ambiente' },
        { label: 'B', text: 'Criar livremente e ajustar depois' },
        { label: 'C', text: 'Usar sempre /24' },
        { label: 'D', text: 'Usar sempre /20' }
      ],
      correctAnswer: 'A',
      explanation: 'Evita conflitos atuais e futuros, preservando espaço para expansão.',
      relatedService: 'subnets'
    },
    {
      id: 22,
      topic: 'subnets',
      question: 'Como expor serviços internos para outras VPCs sem roteamento L3?',
      context: 'Consumo privado entre contas.',
      options: [
        { label: 'A', text: 'PrivateLink (Interface Endpoints) em subnets privadas' },
        { label: 'B', text: 'IGW compartilhado' },
        { label: 'C', text: 'Peering com transitive routing' },
        { label: 'D', text: 'NAT Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink cria ENIs nas VPCs clientes e não exige roteamento entre VPCs.',
      relatedService: 'subnets'
    },
    {
      id: 23,
      topic: 'subnets',
      question: 'Onde ficam os NAT Gateways e como subnets privadas os utilizam?',
      context: 'Topologia típica.',
      options: [
        { label: 'A', text: 'NAT em subnets públicas; privadas roteiam 0.0.0.0/0 para o NAT' },
        { label: 'B', text: 'NAT em subnets privadas; públicas roteiam para NAT' },
        { label: 'C', text: 'NAT anexado ao IGW' },
        { label: 'D', text: 'NAT não precisa de rotas' }
      ],
      correctAnswer: 'A',
      explanation: 'NAT precisa acessar internet, por isso fica em pública; privadas o usam como default route.',
      relatedService: 'subnets'
    },
    {
      id: 24,
      topic: 'subnets',
      question: 'Qual recurso registra tráfego aceito/negado por subnet para auditoria?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'VPC Flow Logs' },
        { label: 'B', text: 'CloudTrail Lake' },
        { label: 'C', text: 'CloudWatch Metrics' },
        { label: 'D', text: 'Inspector' }
      ],
      correctAnswer: 'A',
      explanation: 'Flow Logs podem ser habilitados por VPC/subnet/ENI, enviando para CloudWatch Logs ou S3.',
      relatedService: 'subnets'
    },
    {
      id: 25,
      topic: 'subnets',
      question: 'Como publicar um website em subnets públicas e proteger o bucket S3 de acesso direto?',
      context: 'Arquitetura com CDN.',
      options: [
        { label: 'A', text: 'CloudFront na frente do S3 com OAC/OAI; ALB em públicas para backend' },
        { label: 'B', text: 'S3 website endpoint direto sem HTTPS' },
        { label: 'C', text: 'Abrir bucket ao público' },
        { label: 'D', text: 'Expor banco de dados em pública' }
      ],
      correctAnswer: 'A',
      explanation: 'CDN + OAC/OAI restringe S3; backends ficam em privadas atrás do ALB público.',
      relatedService: 'subnets'
    },
    {
      id: 26,
      topic: 'subnets',
      question: 'Como dividir camadas (web/app/db) em 3 subnets por AZ em 2 AZs?',
      context: 'Seis subnets no total.',
      options: [
        { label: 'A', text: 'Criar pares web/app/db em cada AZ com blocos não sobrepostos' },
        { label: 'B', text: 'Tudo numa única subnet /16' },
        { label: 'C', text: 'Apenas web públicas' },
        { label: 'D', text: 'Apenas db públicas' }
      ],
      correctAnswer: 'A',
      explanation: 'Topologia clássica multi-AZ para alta disponibilidade e isolamento entre camadas.',
      relatedService: 'subnets'
    },
    {
      id: 27,
      topic: 'subnets',
      question: 'Qual é a diferença de alcance entre SGs e NACLs?',
      context: 'Onde se aplicam.',
      options: [
        { label: 'A', text: 'SG em nível de ENI/instância; NACL em nível de subnet' },
        { label: 'B', text: 'SG em VPC; NACL em instância' },
        { label: 'C', text: 'Ambos em VPC' },
        { label: 'D', text: 'Nenhum impacta tráfego' }
      ],
      correctAnswer: 'A',
      explanation: 'SGs protegem interfaces; NACLs protegem toda a subnet (todos recursos dentro).',
      relatedService: 'subnets'
    },
    {
      id: 28,
      topic: 'subnets',
      question: 'Qual abordagem para apps sem internet que precisam consumir APIs privadas de outra conta?',
      context: 'Sem roteamento L3.',
      options: [
        { label: 'A', text: 'PrivateLink (Interface Endpoint) em subnets privadas' },
        { label: 'B', text: 'IGW' },
        { label: 'C', text: 'NAT Gateway' },
        { label: 'D', text: 'Abrir NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink expõe endpoints privados sem necessitar internet ou peering.',
      relatedService: 'subnets'
    },
    {
      id: 29,
      topic: 'subnets',
      question: 'Como garantir que apenas VPCs autorizadas acessem um bucket via subnets privadas?',
      context: 'Restrições por origem.',
      options: [
        { label: 'A', text: 'Bucket policy com aws:SourceVpce condicionando ao endpoint da VPC' },
        { label: 'B', text: 'Abrir público' },
        { label: 'C', text: 'ACLs herdadas' },
        { label: 'D', text: 'Usar DNS público' }
      ],
      correctAnswer: 'A',
      explanation: 'A condição garante que acessos venham apenas do endpoint privado autorizado.',
      relatedService: 'subnets'
    },
    {
      id: 30,
      topic: 'subnets',
      question: 'Qual combinação reduz latência global de conteúdo estático servindo a partir de subnets públicas?',
      context: 'Distribuição global.',
      options: [
        { label: 'A', text: 'CloudFront + ALB público; origens em privadas' },
        { label: 'B', text: 'NAT Gateway' },
        { label: 'C', text: 'Route tables vazias' },
        { label: 'D', text: 'Apenas IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'CDN nas bordas + ALB para dinâmico nas públicas; aplicações permanecem em privadas.',
      relatedService: 'subnets'
    },
    {
      id: 31,
      topic: 'subnets',
      question: 'Qual opção ajuda a manter DNS funcional dentro das subnets?',
      context: 'Resolução interna/pública.',
      options: [
        { label: 'A', text: 'Ativar DNS resolution e DNS hostnames na VPC' },
        { label: 'B', text: 'Criar IGW' },
        { label: 'C', text: 'Desligar DHCP options set' },
        { label: 'D', text: 'Usar somente hosts estáticos' }
      ],
      correctAnswer: 'A',
      explanation: 'As flags permitem que instâncias usem DNS interno e nomes públicos quando aplicável.',
      relatedService: 'subnets'
    },
    {
      id: 32,
      topic: 'subnets',
      question: 'Qual topologia é recomendada para alta disponibilidade de um ALB público?',
      context: 'Redes por AZ.',
      options: [
        { label: 'A', text: 'ALB em pelo menos duas subnets públicas (duas AZs)' },
        { label: 'B', text: 'ALB em uma única subnet privada' },
        { label: 'C', text: 'ALB sem subnets' },
        { label: 'D', text: 'ALB apenas com IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB deve estar associado a subnets públicas em múltiplas AZs para resiliência.',
      relatedService: 'subnets'
    },
    {
      id: 33,
      topic: 'subnets',
      question: 'Qual a melhor prática para alta disponibilidade de NAT Gateway?',
      context: 'Ambiente em duas AZs com workloads privados.',
      options: [
        { label: 'A', text: 'Um único NAT Gateway compartilhado por todas as AZs' },
        { label: 'B', text: 'Um NAT Gateway por AZ com rotas privadas apontando localmente' },
        { label: 'C', text: 'Usar Internet Gateway no lugar do NAT' },
        { label: 'D', text: 'Não usar NAT e abrir SGs' }
      ],
      correctAnswer: 'B',
      explanation: 'Melhor prática: um NAT GW por AZ e rotas das subnets privadas para o NAT da mesma AZ, evitando cross-AZ e falhas únicas.',
      relatedService: 'subnets'
    },
    {
      id: 34,
      topic: 'subnets',
      question: 'O que define uma subnet privada?',
      context: 'Classificação por rota.',
      options: [
        { label: 'A', text: 'Não ter rota default para IGW' },
        { label: 'B', text: 'Ter NAT Gateway' },
        { label: 'C', text: 'Estar vazia' },
        { label: 'D', text: 'Ter ACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Privada: sem rota 0.0.0.0/0 para IGW. Pode ter rota para NAT, endpoints privados e redes internas.',
      relatedService: 'subnets'
    },
    {
      id: 35,
      topic: 'subnets',
      question: 'Como reduzir custos de egress à internet para workloads que só precisam de S3/DynamoDB?',
      context: 'Sem necessidade de internet ampla.',
      options: [
        { label: 'A', text: 'Usar Gateway Endpoints e evitar NAT para esses serviços' },
        { label: 'B', text: 'Criar IGW em todas as subnets' },
        { label: 'C', text: 'Atribuir EIP às instâncias privadas' },
        { label: 'D', text: 'Usar VPC Peering com a internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Gateway Endpoints para S3 e DynamoDB evitam passagem pelo NAT e reduzem custo/latência.',
      relatedService: 'subnets'
    },
    {
      id: 36,
      topic: 'subnets',
      question: 'Qual é o impacto de rotas cross-AZ para NAT Gateway?',
      context: 'Roteamento entre zonas.',
      options: [
        { label: 'A', text: 'Aumenta latência e custos de data transfer entre AZs' },
        { label: 'B', text: 'Reduz a disponibilidade' },
        { label: 'C', text: 'Não tem impacto' },
        { label: 'D', text: 'Permite inbound público' }
      ],
      correctAnswer: 'A',
      explanation: 'Ao usar NAT de outra AZ, você paga transferência cross-AZ e adiciona latência; evite quando possível.',
      relatedService: 'subnets'
    },
    {
      id: 37,
      topic: 'subnets',
      question: 'Para IPv6, qual rota habilita saída controlada sem permitir entrada?',
      context: 'Workloads IPv6-only.',
      options: [
        { label: 'A', text: '::/0 para egress-only internet gateway' },
        { label: 'B', text: '0.0.0.0/0 para NAT' },
        { label: 'C', text: '::/0 para NAT Gateway' },
        { label: 'D', text: '::/0 para Internet Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Em IPv6, use egress-only IGW para permitir apenas saída; IGW padrão permitiria entrada pública.',
      relatedService: 'subnets'
    },
    {
      id: 38,
      topic: 'subnets',
      question: 'Qual serviço ajuda a planejar e evitar sobreposição de CIDR entre VPCs/subnets?',
      context: 'Gestão de endereços.',
      options: [
        { label: 'A', text: 'VPC IPAM' },
        { label: 'B', text: 'CloudTrail' },
        { label: 'C', text: 'WAF' },
        { label: 'D', text: 'Config' }
      ],
      correctAnswer: 'A',
      explanation: 'VPC IPAM provê gerenciamento e alocação de blocos IP centralizada, reduzindo conflitos.',
      relatedService: 'subnets'
    },
    {
      id: 39,
      topic: 'subnets',
      question: 'Como publicar serviços internos de forma privada para outras contas/regiões?',
      context: 'Sem roteamento L3 entre VPCs.',
      options: [
        { label: 'A', text: 'PrivateLink (Interface Endpoints)' },
        { label: 'B', text: 'IGW compartilhado' },
        { label: 'C', text: 'NAT Gateway' },
        { label: 'D', text: 'Abrir SGs para internet' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink expõe serviços por ENIs privados, sem necessidade de peering/roteamento amplo.',
      relatedService: 'subnets'
    },
    {
      id: 40,
      topic: 'subnets',
      question: 'Qual bloco CIDR é inválido para subnets IPv4 em VPC?',
      context: 'Limites de tamanho.',
      options: [
        { label: 'A', text: '/28' },
        { label: 'B', text: '/29' },
        { label: 'C', text: '/30' },
        { label: 'D', text: '/27' }
      ],
      correctAnswer: 'C',
      explanation: 'Tamanho mínimo é /28. /30 ou menores não são aceitos para subnets em VPC.',
      relatedService: 'subnets'
    },
    {
      id: 41,
      topic: 'subnets',
      question: 'Qual a utilidade de subnets isoladas em ambientes regulados?',
      context: 'Compliance e superfície mínima.',
      options: [
        { label: 'A', text: 'Hospedar bancos que não devem ter egress/ingress à internet' },
        { label: 'B', text: 'Servir frontends públicos' },
        { label: 'C', text: 'Reduzir custo de ALB' },
        { label: 'D', text: 'Ativar DNS público' }
      ],
      correctAnswer: 'A',
      explanation: 'Isoladas evitam rotas para internet; acesso só via conexões privadas/rotas internas.',
      relatedService: 'subnets'
    },
    {
      id: 42,
      topic: 'subnets',
      question: 'Como permitir acesso privado ao Secrets Manager a partir de subnets privadas?',
      context: 'Sem NAT.',
      options: [
        { label: 'A', text: 'Interface VPC Endpoint (com SGs apropriados)' },
        { label: 'B', text: 'IGW' },
        { label: 'C', text: 'NAT apenas' },
        { label: 'D', text: 'Abrir 0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Secrets Manager usa endpoints de interface; tráfego fica dentro da rede AWS.',
      relatedService: 'subnets'
    },
    {
      id: 43,
      topic: 'subnets',
      question: 'Qual métrica/log ajuda a investigar tráfego bloqueado/permitido por subnet?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'VPC Flow Logs' },
        { label: 'B', text: 'CloudWatch Metrics' },
        { label: 'C', text: 'Trusted Advisor' },
        { label: 'D', text: 'S3 Inventory' }
      ],
      correctAnswer: 'A',
      explanation: 'Flow Logs registram tráfego aceito/negado em nível de VPC/subnet/ENI.',
      relatedService: 'subnets'
    },
    {
      id: 44,
      topic: 'subnets',
      question: 'Para workloads com grande volume de egress, qual estratégia reduz custo?',
      context: 'Otimização de saída.',
      options: [
        { label: 'A', text: 'Consolidar saída via proxy/NAT na mesma AZ e endpoints privados' },
        { label: 'B', text: 'Criar IGW em todas as subnets' },
        { label: 'C', text: 'Aumentar SGs' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'Minimize cross-AZ e maximize uso de endpoints privados; consolide egress quando aplicável.',
      relatedService: 'subnets'
    },
    {
      id: 45,
      topic: 'subnets',
      question: 'Qual benefício de subnets distintas por camada (web/app/db)?',
      context: 'Segmentação por função.',
      options: [
        { label: 'A', text: 'Melhor controle de tráfego e isolamento entre camadas' },
        { label: 'B', text: 'Menos rotas' },
        { label: 'C', text: 'Permite internet gratuita' },
        { label: 'D', text: 'Evita usar SGs' }
      ],
      correctAnswer: 'A',
      explanation: 'Segmentar reduz blast radius e simplifica regras por camada.',
      relatedService: 'subnets'
    },
    {
      id: 46,
      topic: 'subnets',
      question: 'O que acontece se nenhuma route table for explicitamente associada a uma subnet?',
      context: 'Main route table.',
      options: [
        { label: 'A', text: 'A subnet fica sem rotas' },
        { label: 'B', text: 'Ela usa a main route table da VPC' },
        { label: 'C', text: 'Ela herda da NACL' },
        { label: 'D', text: 'Ela se torna pública' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem associação explícita, a subnet utiliza a main route table definida na VPC.',
      relatedService: 'subnets'
    },
    {
      id: 47,
      topic: 'subnets',
      question: 'Como garantir que instâncias privadas possam fazer DNS resolve?',
      context: 'Sem internet pública.',
      options: [
        { label: 'A', text: 'Ativar DNS hostnames/resolution na VPC e liberar SG outbound 53 para o resolver' },
        { label: 'B', text: 'Criar IGW' },
        { label: 'C', text: 'Usar apenas NACL' },
        { label: 'D', text: 'Desativar DHCP options' }
      ],
      correctAnswer: 'A',
      explanation: 'Resolver interno atende via 53; SG precisa permitir egress. Flags de DNS da VPC devem estar ativas.',
      relatedService: 'subnets'
    },
    {
      id: 48,
      topic: 'subnets',
      question: 'O que é preferível para tráfego interno entre VPCs com múltiplas conexões?',
      context: 'Arquiteturas em malha.',
      options: [
        { label: 'A', text: 'Transit Gateway' },
        { label: 'B', text: 'VPC Peering com roteamento transitivo' },
        { label: 'C', text: 'NAT Gateway' },
        { label: 'D', text: 'IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW simplifica topologias N:N; peering não suporta trânsito nativo.',
      relatedService: 'subnets'
    },
    {
      id: 49,
      topic: 'subnets',
      question: 'Como restringir que subnets públicas sejam usadas por RDS?',
      context: 'DBs não devem ser públicos.',
      options: [
        { label: 'A', text: 'Definir subnets privadas no subnet group do RDS' },
        { label: 'B', text: 'Marcar RDS como público e negar SG' },
        { label: 'C', text: 'Colocar em pública com NACL deny' },
        { label: 'D', text: 'Adicionar Elastic IP' }
      ],
      correctAnswer: 'A',
      explanation: 'Escolha subnet group apenas com subnets privadas para instâncias RDS.',
      relatedService: 'subnets'
    },
    {
      id: 50,
      topic: 'subnets',
      question: 'Qual é o efeito de usar /16 como CIDR de uma única subnet?',
      context: 'Granularidade de rede.',
      options: [
        { label: 'A', text: 'Dificulta isolamento e controle de tráfego' },
        { label: 'B', text: 'Melhora segurança' },
        { label: 'C', text: 'Reduz latência automaticamente' },
        { label: 'D', text: 'Obrigatório para internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnets muito grandes reduzem segmentação; prefira dividir por função/AZ.',
      relatedService: 'subnets'
    },
    {
      id: 51,
      topic: 'subnets',
      question: 'Qual cuidado ao dimensionar subnets para EKS (muitos pods/ENIs)?',
      context: 'Endereços IP suficientes.',
      options: [
        { label: 'A', text: 'Garantir IPs por nó/pods planejados aumentando o CIDR' },
        { label: 'B', text: 'Sempre /28 é suficiente' },
        { label: 'C', text: 'Não impacta' },
        { label: 'D', text: 'Usar um /32' }
      ],
      correctAnswer: 'A',
      explanation: 'EKS consome IPs por pod/ENI; subnets pequenas saturam rápido.',
      relatedService: 'subnets'
    },
    {
      id: 52,
      topic: 'subnets',
      question: 'Qual diferença de visibilidade DNS entre subnets públicas e privadas?',
      context: 'Resolução de nomes.',
      options: [
        { label: 'A', text: 'Nenhuma; depende das flags de DNS da VPC e rotas' },
        { label: 'B', text: 'Públicas não resolvem DNS' },
        { label: 'C', text: 'Privadas sempre resolvem DNS público' },
        { label: 'D', text: 'Privadas nunca resolvem' }
      ],
      correctAnswer: 'A',
      explanation: 'DNS depende de configurações da VPC e do fluxo de rede, não da “publicidade” da subnet por si só.',
      relatedService: 'subnets'
    },
    {
      id: 53,
      topic: 'subnets',
      question: 'Como proteger instâncias em subnets públicas sem retirar acesso de clientes?',
      context: 'Camada de proteção.',
      options: [
        { label: 'A', text: 'Usar SGs restritos, WAF/ALB e NACLs quando necessário' },
        { label: 'B', text: 'Desligar o IGW' },
        { label: 'C', text: 'Remover todas as rotas' },
        { label: 'D', text: 'Abrir 0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Camadas complementares: SGs stateful, WAF no ALB, NACLs se precisar deny explícito.',
      relatedService: 'subnets'
    },
    {
      id: 54,
      topic: 'subnets',
      question: 'Qual serviço substitui NAT para acesso privado a serviços AWS além de S3/DDB?',
      context: 'Catálogo amplo.',
      options: [
        { label: 'A', text: 'Interface VPC Endpoints (AWS PrivateLink)' },
        { label: 'B', text: 'CloudFront' },
        { label: 'C', text: 'WAF' },
        { label: 'D', text: 'Route 53 Resolver endpoints' }
      ],
      correctAnswer: 'A',
      explanation: 'Para a maioria dos serviços, use endpoints de interface para manter tráfego privado.',
      relatedService: 'subnets'
    },
    {
      id: 55,
      topic: 'subnets',
      question: 'Qual vantagem de subnets dedicadas por ambiente (dev/stage/prod)?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Isolamento e regras diferentes por ambiente' },
        { label: 'B', text: 'Menos segurança' },
        { label: 'C', text: 'Impossibilita rotas' },
        { label: 'D', text: 'Necessário para IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Ambientes isolados simplificam políticas de segurança e compliance.',
      relatedService: 'subnets'
    },
    {
      id: 56,
      topic: 'subnets',
      question: 'O que considerar ao usar appliances virtuais (firewalls) em subnets?',
      context: 'Roteamento via appliances.',
      options: [
        { label: 'A', text: 'Roteamento assimétrico, performance e alta disponibilidade por AZ' },
        { label: 'B', text: 'Sempre público' },
        { label: 'C', text: 'Eliminar SGs' },
        { label: 'D', text: 'Usar /32' }
      ],
      correctAnswer: 'A',
      explanation: 'Garanta HA por AZ e evite assimetrias que quebrem conexões stateful.',
      relatedService: 'subnets'
    },
    {
      id: 57,
      topic: 'subnets',
      question: 'Qual afirmação é correta sobre NACLs?',
      context: 'Ordem de avaliação.',
      options: [
        { label: 'A', text: 'São stateless com regras numeradas; primeira que casa decide' },
        { label: 'B', text: 'São stateful' },
        { label: 'C', text: 'Ignoram portas' },
        { label: 'D', text: 'Não afetam tráfego' }
      ],
      correctAnswer: 'A',
      explanation: 'NACLs precisam de regras de ida e volta e são avaliadas por ordem crescente.',
      relatedService: 'subnets'
    },
    {
      id: 58,
      topic: 'subnets',
      question: 'Qual caminho é típico para app privada acessar internet?',
      context: 'Fluxo de saída.',
      options: [
        { label: 'A', text: 'Subnet privada → NAT GW (na pública) → IGW' },
        { label: 'B', text: 'Subnet privada → IGW direto' },
        { label: 'C', text: 'Subnet pública → NAT GW' },
        { label: 'D', text: 'Subnet privada → VPC Endpoint → internet' }
      ],
      correctAnswer: 'A',
      explanation: 'Apps privadas usam NAT para saída sem aceitar conexões de entrada da internet.',
      relatedService: 'subnets'
    },
    {
      id: 59,
      topic: 'subnets',
      question: 'Para cargas com tráfego L7 público, onde posicionar o ALB?',
      context: 'Entrada HTTP/HTTPS.',
      options: [
        { label: 'A', text: 'Em subnets públicas, com targets em privadas' },
        { label: 'B', text: 'Em subnets privadas apenas' },
        { label: 'C', text: 'Sem subnets' },
        { label: 'D', text: 'No IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB público precisa estar em subnets públicas; backends geralmente em privadas.',
      relatedService: 'subnets'
    },
    {
      id: 60,
      topic: 'subnets',
      question: 'Quando usar subnets IPv6-only?',
      context: 'Adoção de IPv6.',
      options: [
        { label: 'A', text: 'Quando todos os componentes/fluxos suportam IPv6 e deseja-se eliminar NAT' },
        { label: 'B', text: 'Sempre' },
        { label: 'C', text: 'Nunca' },
        { label: 'D', text: 'Apenas para DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'IPv6-only remove dependência de NAT, mas requer suporte fim-a-fim e egress-only para saída.',
      relatedService: 'subnets'
    },
    {
      id: 61,
      topic: 'subnets',
      question: 'Qual prática evita blackholes ao remover um NAT Gateway?',
      context: 'Mudanças de rota.',
      options: [
        { label: 'A', text: 'Atualizar rotas das subnets privadas para o novo NAT antes da remoção' },
        { label: 'B', text: 'Remover primeiro' },
        { label: 'C', text: 'Resetar SGs' },
        { label: 'D', text: 'Desligar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Troque o alvo das rotas para evitar quedas; depois remova o recurso antigo.',
      relatedService: 'subnets'
    },
    {
      id: 62,
      topic: 'subnets',
      question: 'Como conectar VPC e on-premises mantendo subnets privadas sem internet?',
      context: 'Híbrido.',
      options: [
        { label: 'A', text: 'Site-to-Site VPN ou Direct Connect + rotas adequadas' },
        { label: 'B', text: 'IGW' },
        { label: 'C', text: 'NAT' },
        { label: 'D', text: 'S3 website' }
      ],
      correctAnswer: 'A',
      explanation: 'VPN/DX provêm conectividade privada; subnets permanecem sem exposição à internet.',
      relatedService: 'subnets'
    },
    {
      id: 63,
      topic: 'subnets',
      question: 'Qual a diferença entre a NACL default e uma NACL nova?',
      context: 'Regras iniciais.',
      options: [
        { label: 'A', text: 'Default permite tudo; NACL nova nega tudo até configurar' },
        { label: 'B', text: 'Ambas negam tudo por padrão' },
        { label: 'C', text: 'Ambas permitem tudo por padrão' },
        { label: 'D', text: 'Default nega tudo; NACL nova permite tudo' }
      ],
      correctAnswer: 'A',
      explanation: 'A NACL default permite todo tráfego; uma NACL custom criada do zero começa negando até você adicionar regras.',
      relatedService: 'subnets'
    },
    {
      id: 64,
      topic: 'subnets',
      question: 'Qual ferramenta ajuda a verificar o caminho entre recursos em subnets?',
      context: 'Depuração de rede.',
      options: [
        { label: 'A', text: 'VPC Reachability Analyzer' },
        { label: 'B', text: 'Trusted Advisor' },
        { label: 'C', text: 'CloudTrail' },
        { label: 'D', text: 'Cost Explorer' }
      ],
      correctAnswer: 'A',
      explanation: 'Reachability Analyzer avalia regras de SG, NACL, rotas e endpoints para validar conectividade entre source e destination.',
      relatedService: 'subnets'
    },
    {
      id: 65,
      topic: 'subnets',
      question: 'Sobre VPC Endpoints, qual afirmação está correta?',
      context: 'Acesso privado a serviços.',
      options: [
        { label: 'A', text: 'Gateway (S3/DynamoDB) associa a route tables; Interface cria ENIs em subnets' },
        { label: 'B', text: 'Interface associa a route tables; Gateway cria ENIs' },
        { label: 'C', text: 'Ambos criam ENIs' },
        { label: 'D', text: 'Nenhum funciona em subnets privadas' }
      ],
      correctAnswer: 'A',
      explanation: 'Gateway Endpoints exigem rotas nas route tables; Interface Endpoints implantam ENIs em subnets com SGs controlando acesso.',
      relatedService: 'subnets'
    },
    {
      id: 66,
      topic: 'subnets',
      question: 'Como permitir saída IPv6 de subnets privadas sem aceitar conexões de entrada?',
      context: 'IPv6 outbound-only.',
      options: [
        { label: 'A', text: 'Usar Egress-only Internet Gateway (EIGW) com rota ::/0' },
        { label: 'B', text: 'Criar NAT Gateway' },
        { label: 'C', text: 'Atribuir IPs públicos IPv6' },
        { label: 'D', text: 'Usar IGW e NACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'EIGW fornece saída apenas para IPv6; adicione rota ::/0 apontando para o EIGW nas subnets privadas.',
      relatedService: 'subnets'
    },
    {
      id: 67,
      topic: 'subnets',
      question: 'Quando preferir NAT Gateway a NAT Instance?',
      context: 'Egress IPv4 de subnets privadas.',
      options: [
        { label: 'A', text: 'Quando quer serviço gerenciado, escalável e HA por AZ' },
        { label: 'B', text: 'Quando quer gerenciar patches e iptables manualmente' },
        { label: 'C', text: 'Quando não precisa de Elastic IP' },
        { label: 'D', text: 'Para aceitar conexões de entrada da internet' }
      ],
      correctAnswer: 'A',
      explanation: 'NAT GW é gerenciado, com alto throughput e disponibilidade por AZ. NAT Instance exige manutenção e escala manual.',
      relatedService: 'subnets'
    },
    {
      id: 68,
      topic: 'subnets',
      question: 'Qual definição diferencia subnets públicas de privadas?',
      context: 'Rotas padrão.',
      options: [
        { label: 'A', text: 'Pública tem rota 0.0.0.0/0 → IGW; privada tem 0.0.0.0/0 → NAT' },
        { label: 'B', text: 'Pública usa NAT; privada usa IGW' },
        { label: 'C', text: 'Privada não tem route table' },
        { label: 'D', text: 'Pública não pode ter SG' }
      ],
      correctAnswer: 'A',
      explanation: 'A rota padrão determina: IGW caracteriza subnet pública; NAT GW (ou sem saída) caracteriza subnet privada.',
      relatedService: 'subnets'
    },
    {
      id: 69,
      topic: 'subnets',
      question: 'O que é verdadeiro sobre NAT Gateways e AZs?',
      context: 'Alta disponibilidade.',
      options: [
        { label: 'A', text: 'Um NAT GW é por AZ e requer EIP; subnets daquela AZ roteiam para ele' },
        { label: 'B', text: 'Um NAT GW atende múltiplas AZs automaticamente' },
        { label: 'C', text: 'NAT GW não usa Elastic IP' },
        { label: 'D', text: 'NAT GW precisa estar em subnet privada' }
      ],
      correctAnswer: 'A',
      explanation: 'Crie um NAT por AZ pública e aponte as subnets privadas na mesma AZ; isso evita tráfego cross-AZ e melhora HA.',
      relatedService: 'subnets'
    },
    {
      id: 70,
      topic: 'subnets',
      question: 'Uma subnet pode abranger mais de uma AZ?',
      context: 'Escopo de AZ.',
      options: [
        { label: 'A', text: 'Não, subnets são confinadas a uma única AZ' },
        { label: 'B', text: 'Sim, podem abranger duas AZs adjacentes' },
        { label: 'C', text: 'Sim, se for IPv6' },
        { label: 'D', text: 'Apenas com TGW' }
      ],
      correctAnswer: 'A',
      explanation: 'Subnets pertencem a uma única AZ. Para HA, distribua recursos e NAT por AZ.',
      relatedService: 'subnets'
    },
    {
      id: 71,
      topic: 'subnets',
      question: 'É possível criar subnets usando CIDR secundário da VPC?',
      context: 'CIDRs múltiplos.',
      options: [
        { label: 'A', text: 'Sim, ao escolher a faixa do CIDR secundário' },
        { label: 'B', text: 'Não, apenas o CIDR primário' },
        { label: 'C', text: 'Apenas para IPv6' },
        { label: 'D', text: 'Apenas em regiões us-east-1' }
      ],
      correctAnswer: 'A',
      explanation: 'VPC pode ter CIDRs adicionais; subnets podem ser criadas a partir de qualquer bloco IPv4/IPv6 associado.',
      relatedService: 'subnets'
    },
    {
      id: 72,
      topic: 'subnets',
      question: 'Quantas route tables podem ser associadas diretamente a uma subnet?',
      context: 'Associação de rotas.',
      options: [
        { label: 'A', text: 'Uma por vez (exceto a main default quando sem associação explícita)' },
        { label: 'B', text: 'Ilimitadas' },
        { label: 'C', text: 'Duas (ativa/passiva)' },
        { label: 'D', text: 'Uma por AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'Cada subnet pode ter apenas uma route table associada; sem associação explícita, herda a main route table da VPC.',
      relatedService: 'subnets'
    },
    {
      id: 73,
      topic: 'subnets',
      question: 'Qual recurso facilita inserir firewalls de terceiros de forma transparente entre subnets?',
      context: 'Aparelhos de rede.',
      options: [
        { label: 'A', text: 'Gateway Load Balancer (GWLB)' },
        { label: 'B', text: 'NLB' },
        { label: 'C', text: 'ALB' },
        { label: 'D', text: 'IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'GWLB distribui e escala appliances L3/L4 (firewalls, IDS/IPS) com transparência de rede.',
      relatedService: 'subnets'
    },
    {
      id: 74,
      topic: 'subnets',
      question: 'Ao lançar uma EC2 em uma subnet, quais controles se aplicam?',
      context: 'Controles efetivos.',
      options: [
        { label: 'A', text: 'Security Group na ENI, NACL da subnet e route table associada' },
        { label: 'B', text: 'Apenas NACL' },
        { label: 'C', text: 'Apenas route table' },
        { label: 'D', text: 'Apenas SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Tráfego é regulado por SG (stateful) na ENI, NACL (stateless) da subnet e rotas da route table.',
      relatedService: 'subnets'
    },
    {
      id: 75,
      topic: 'subnets',
      question: 'Boa prática para RDS Multi-AZ quanto a subnets?',
      context: 'Banco gerenciado.',
      options: [
        { label: 'A', text: 'Usar subnets privadas em pelo menos duas AZs' },
        { label: 'B', text: 'Colocar em subnets públicas com IP público' },
        { label: 'C', text: 'Apenas uma subnet' },
        { label: 'D', text: 'Obrigatoriamente IPv6-only' }
      ],
      correctAnswer: 'A',
      explanation: 'RDS deve ficar em subnets privadas; Multi-AZ provê alta disponibilidade entre AZs.',
      relatedService: 'subnets'
    },
    {
      id: 76,
      topic: 'subnets',
      question: 'Como permitir uso de AWS KMS em subnets privadas sem NAT?',
      context: 'Acesso a serviços AWS.',
      options: [
        { label: 'A', text: 'Criar Interface Endpoint para KMS nas subnets privadas' },
        { label: 'B', text: 'Adicionar rota para IGW' },
        { label: 'C', text: 'Criar Gateway Endpoint para KMS' },
        { label: 'D', text: 'Usar DX obrigatório' }
      ],
      correctAnswer: 'A',
      explanation: 'KMS usa Interface Endpoint (ENI) controlado por SG, evitando egress via NAT/IGW.',
      relatedService: 'subnets'
    },
    {
      id: 77,
      topic: 'subnets',
      question: 'Para acessar S3 sem sair à internet, em subnets privadas, faça o quê?',
      context: 'Acesso privado S3.',
      options: [
        { label: 'A', text: 'Criar Gateway Endpoint S3 e atualizar route table' },
        { label: 'B', text: 'Criar Interface Endpoint S3 apenas' },
        { label: 'C', text: 'Apontar 0.0.0.0/0 para IGW' },
        { label: 'D', text: 'Criar VPN obrigatoriamente' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoint S3 (Gateway) adiciona rotas específicas nas route tables das subnets privadas.',
      relatedService: 'subnets'
    },
    {
      id: 78,
      topic: 'subnets',
      question: 'Um Interface Endpoint é implementado como?',
      context: 'Conectividade privada.',
      options: [
        { label: 'A', text: 'ENIs nas subnets selecionadas, controladas por SGs' },
        { label: 'B', text: 'Rotas novas no IGW' },
        { label: 'C', text: 'Um NAT dedicado' },
        { label: 'D', text: 'Uma NACL gerenciada' }
      ],
      correctAnswer: 'A',
      explanation: 'Interface Endpoint cria uma ou mais ENIs em subnets específicas, permitindo acesso privado ao serviço.',
      relatedService: 'subnets'
    },
    {
      id: 79,
      topic: 'subnets',
      question: 'Como garantir IP público automático em instâncias de subnets públicas?',
      context: 'Endereçamento.',
      options: [
        { label: 'A', text: 'Ativar auto-assign public IPv4 na subnet' },
        { label: 'B', text: 'Apenas atribuir SG público' },
        { label: 'C', text: 'Criar NACL permissiva' },
        { label: 'D', text: 'Usar /32 no SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Atributo da subnet controla atribuição automática de IP público; também pode ser feito por configuração da instância.',
      relatedService: 'subnets'
    },
    {
      id: 80,
      topic: 'subnets',
      question: 'Para nomes DNS funcionarem, quais flags da VPC ajudam?',
      context: 'Resolução de nomes.',
      options: [
        { label: 'A', text: 'enableDnsSupport e enableDnsHostnames' },
        { label: 'B', text: 'enableFlowLogs apenas' },
        { label: 'C', text: 'enableClassicLink' },
        { label: 'D', text: 'enableDhcpv6 apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'DNS interno e nomes de host dependem dessas flags habilitadas na VPC.',
      relatedService: 'subnets'
    },
    {
      id: 81,
      topic: 'subnets',
      question: 'Qual rota IPv6 configura saída para a internet em subnets privadas?',
      context: 'Rotas IPv6.',
      options: [
        { label: 'A', text: '::/0 → Egress-only Internet Gateway' },
        { label: 'B', text: '::/0 → IGW' },
        { label: 'C', text: '::/0 → NAT Gateway' },
        { label: 'D', text: '2000::/3 → NAT Instance' }
      ],
      correctAnswer: 'A',
      explanation: 'Para saída IPv6 sem entrada, use EIGW como alvo da rota ::/0.',
      relatedService: 'subnets'
    },
    {
      id: 82,
      topic: 'subnets',
      question: 'O que considerar em NACLs para tráfego de retorno (ephemeral ports)?',
      context: 'Faixas de portas.',
      options: [
        { label: 'A', text: 'Permitir portas efêmeras (ex.: 1024–65535) de ida e volta' },
        { label: 'B', text: 'Apenas porta 80/443' },
        { label: 'C', text: 'Bloquear todas as portas >1024' },
        { label: 'D', text: 'NACL não precisa de porta de retorno' }
      ],
      correctAnswer: 'A',
      explanation: 'Como NACL é stateless, precisa liberar tráfego de resposta nas portas efêmeras.',
      relatedService: 'subnets'
    },
    {
      id: 83,
      topic: 'subnets',
      question: 'Como inspecionar tráfego permitido/negado em nível de subnet?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'VPC Flow Logs (subnet level)' },
        { label: 'B', text: 'CloudTrail only' },
        { label: 'C', text: 'Config Rules' },
        { label: 'D', text: 'S3 Access Logs' }
      ],
      correctAnswer: 'A',
      explanation: 'Flow Logs registram aceitações/negar em subnets, VPCs e ENIs, ajudando troubleshooting.',
      relatedService: 'subnets'
    },
    {
      id: 84,
      topic: 'subnets',
      question: 'Uma ENI pertence a...',
      context: 'Limitações de escopo.',
      options: [
        { label: 'A', text: 'Uma única subnet em uma única AZ' },
        { label: 'B', text: 'Múltiplas subnets na mesma VPC' },
        { label: 'C', text: 'Duas AZs para HA' },
        { label: 'D', text: 'Várias VPCs' }
      ],
      correctAnswer: 'A',
      explanation: 'A ENI é criada numa subnet específica e não pode se mover para outra subnet/AZ sem recriação/reattach compatível.',
      relatedService: 'subnets'
    },
    {
      id: 85,
      topic: 'subnets',
      question: 'É possível reanexar uma ENI a outra instância?',
      context: 'Operações de rede.',
      options: [
        { label: 'A', text: 'Sim, desde que na mesma AZ' },
        { label: 'B', text: 'Não, ENI é fixa' },
        { label: 'C', text: 'Apenas entre regiões' },
        { label: 'D', text: 'Apenas com NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'ENIs podem ser destacadas e anexadas a outra instância na mesma AZ, preservando IP e SGs.',
      relatedService: 'subnets'
    },
    {
      id: 86,
      topic: 'subnets',
      question: 'Quantos endereços IPv4 são reservados pela AWS em cada subnet?',
      context: 'Endereços utilizáveis.',
      options: [
        { label: 'A', text: '5 (primeiros 4 e o último)' },
        { label: 'B', text: '2 (gateway e broadcast)' },
        { label: 'C', text: '0 (todos utilizáveis)' },
        { label: 'D', text: '8 (quatro por AZ)' }
      ],
      correctAnswer: 'A',
      explanation: 'AWS reserva 5 IPs por subnet IPv4 (/28 ou maior): network, VPC router, DNS, future use, broadcast (não usado).',
      relatedService: 'subnets'
    },
    {
      id: 87,
      topic: 'subnets',
      question: 'Ao dimensionar subnets, o que considerar?',
      context: 'Planejamento de capacidade.',
      options: [
        { label: 'A', text: 'Reservas de IPs, picos de ASG/ECS, endpoints e crescimento' },
        { label: 'B', text: 'Apenas número atual de instâncias' },
        { label: 'C', text: 'Tamanho mínimo sempre /28' },
        { label: 'D', text: 'Apenas IPv6' }
      ],
      correctAnswer: 'A',
      explanation: 'Evite exaustão de IPs planejando para expansão, serviços gerenciados e reservas.',
      relatedService: 'subnets'
    },
    {
      id: 88,
      topic: 'subnets',
      question: 'Para ALB público, quais subnets usar?',
      context: 'Entrada L7.',
      options: [
        { label: 'A', text: 'Subnets públicas em pelo menos duas AZs' },
        { label: 'B', text: 'Apenas uma subnet privada' },
        { label: 'C', text: 'Qualquer subnet sem IGW' },
        { label: 'D', text: 'Subnets IPv6-only privadas' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB público precisa de subnets públicas variadas em AZs para HA.',
      relatedService: 'subnets'
    },
    {
      id: 89,
      topic: 'subnets',
      question: 'Como expor um serviço privado de uma VPC para outras contas?',
      context: 'Consumo privado entre contas.',
      options: [
        { label: 'A', text: 'PrivateLink (Endpoint Service + Interface Endpoints)' },
        { label: 'B', text: '0.0.0.0/0 no SG' },
        { label: 'C', text: 'IGW compartilhado' },
        { label: 'D', text: 'NAT público' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink permite consumo privado cross-account via interface endpoints em subnets do consumidor.',
      relatedService: 'subnets'
    },
    {
      id: 90,
      topic: 'subnets',
      question: 'Como integrar múltiplas VPCs e on-premises centralmente?',
      context: 'Conectividade ampla.',
      options: [
        { label: 'A', text: 'Transit Gateway com attachments e rotas nas subnets' },
        { label: 'B', text: 'IGW' },
        { label: 'C', text: 'Peering sempre resolve broadcast' },
        { label: 'D', text: 'S3 website' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW conecta VPCs e on-prem; subnets usam rotas para o attachment correspondente.',
      relatedService: 'subnets'
    }
  ],

  'security-groups': [
    {
      id: 1,
      topic: 'security-groups',
      question: 'Security Groups são stateful ou stateless?',
      context: 'Configurando regras de firewall.',
      options: [
        { label: 'A', text: 'Stateless - precisa regra inbound e outbound' },
        { label: 'B', text: 'Stateful - resposta automática permitida' },
        { label: 'C', text: 'Depende da configuração' },
        { label: 'D', text: 'Stateless para TCP, stateful para UDP' }
      ],
      correctAnswer: 'B',
      explanation: 'Security Groups são STATEFUL: se tráfego inbound é permitido, resposta outbound é automaticamente permitida (e vice-versa). NACLs são stateless. Ex: SG permite inbound HTTP (80), resposta automática permite outbound.',
      relatedService: 'security-groups'
    },
    {
      id: 2,
      topic: 'security-groups',
      question: 'Por padrão, um Security Group novo permite ou bloqueia tráfego?',
      context: 'Criando novo SG.',
      options: [
        { label: 'A', text: 'Permite todo inbound, bloqueia outbound' },
        { label: 'B', text: 'Bloqueia todo inbound, permite todo outbound' },
        { label: 'C', text: 'Permite tudo' },
        { label: 'D', text: 'Bloqueia tudo' }
      ],
      correctAnswer: 'B',
      explanation: 'SG novo: DENY all inbound (proteção), ALLOW all outbound (instâncias podem iniciar comunicações). Modelo "default deny" seguro. Precisa adicionar regras inbound explícitas (ex: porta 80, 443).',
      relatedService: 'security-groups'
    }
  ],

  'auto-scaling': [
    {
      id: 1,
      topic: 'auto-scaling',
      question: 'Qual é o principal benefício do Auto Scaling Group?',
      context: 'Aplicação com tráfego variável.',
      options: [
        { label: 'A', text: 'Reduzir custos mantendo capacidade fixa' },
        { label: 'B', text: 'Ajustar capacidade automaticamente baseado em demanda' },
        { label: 'C', text: 'Backup automático de dados' },
        { label: 'D', text: 'Criptografia de instâncias' }
      ],
      correctAnswer: 'B',
      explanation: 'ASG ajusta número de instâncias automaticamente baseado em métricas (CPU, requests, custom). Scale out quando demanda aumenta, scale in quando diminui. Otimiza custo + performance.',
      relatedService: 'auto-scaling'
    },
    {
      id: 2,
      topic: 'auto-scaling',
      question: 'O que são Desired Capacity, Min, e Max no ASG?',
      context: 'Configurando ASG.',
      options: [
        { label: 'A', text: 'Min=sempre ativo, Max=limite superior, Desired=alvo atual' },
        { label: 'B', text: 'São valores idênticos' },
        { label: 'C', text: 'Apenas Max importa' },
        { label: 'D', text: 'Min é sugerido, não garantido' }
      ],
      correctAnswer: 'A',
      explanation: 'Min: mínimo de instâncias (sempre ativas). Desired: quantidade atual desejada (ASG mantém). Max: limite superior (não ultrapassa). Ex: Min=2, Desired=4, Max=10. ASG pode escalar de 2 a 10, atualmente mantendo 4.',
      relatedService: 'auto-scaling'
    },
    {
      id: 3,
      topic: 'auto-scaling',
      question: 'Qual política usa métrica e alvo, ajustando capacidade automaticamente?',
      context: 'Política recomendada.',
      options: [
        { label: 'A', text: 'Target tracking' },
        { label: 'B', text: 'Scheduled only' },
        { label: 'C', text: 'Manual' },
        { label: 'D', text: 'Cooldown' }
      ],
      correctAnswer: 'A',
      explanation: 'Target tracking mantém métrica (ex: CPU 50% ou ALB requests/target) próxima ao alvo.',
      relatedService: 'auto-scaling'
    },
    {
      id: 4,
      topic: 'auto-scaling',
      question: 'Para quê serve cooldown?',
      context: 'Evitar “ping-pong”.',
      options: [
        { label: 'A', text: 'Tempo de espera após scale-out/in antes de nova ação' },
        { label: 'B', text: 'Aumentar Max' },
        { label: 'C', text: 'Criptografar AMI' },
        { label: 'D', text: 'Ativar Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Cooldown evita reações repetidas enquanto instâncias inicializam ou a métrica estabiliza.',
      relatedService: 'auto-scaling'
    },
    {
      id: 5,
      topic: 'auto-scaling',
      question: 'Qual checagem de saúde é recomendada quando há Load Balancer?',
      context: 'Health check.',
      options: [
        { label: 'A', text: 'ELB health check' },
        { label: 'B', text: 'Somente EC2 status check' },
        { label: 'C', text: 'DNS ping' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'Com LB, use health check do LB para refletir status da aplicação e substituir instâncias doentes.',
      relatedService: 'auto-scaling'
    },
    {
      id: 6,
      topic: 'auto-scaling',
      question: 'Qual recurso substituiu Launch Configuration?',
      context: 'Boas práticas.',
      options: [
        { label: 'A', text: 'Launch Template' },
        { label: 'B', text: 'CloudFormation' },
        { label: 'C', text: 'User data' },
        { label: 'D', text: 'EC2Config' }
      ],
      correctAnswer: 'A',
      explanation: 'Launch Templates suportam versões, Mixed Instances, tags, parâmetros adicionais. LCs são legados.',
      relatedService: 'auto-scaling'
    },
    {
      id: 7,
      topic: 'auto-scaling',
      question: 'Para impedir scale-in em uma instância específica, usa-se:',
      context: 'Proteção.',
      options: [
        { label: 'A', text: 'Instance Scale-In Protection' },
        { label: 'B', text: 'EIP' },
        { label: 'C', text: 'NACL' },
        { label: 'D', text: 'Spot only' }
      ],
      correctAnswer: 'A',
      explanation: 'Proteção de instância evita que ela seja encerrada por scale-in (até remover proteção).',
      relatedService: 'auto-scaling'
    },
    {
      id: 8,
      topic: 'auto-scaling',
      question: 'Para pré-aquecer instâncias antes de receber tráfego, use:',
      context: 'Warm-up.',
      options: [
        { label: 'A', text: 'Warm pools' },
        { label: 'B', text: 'Spot' },
        { label: 'C', text: 'User data' },
        { label: 'D', text: 'RI' }
      ],
      correctAnswer: 'A',
      explanation: 'Warm pools mantêm instâncias pré-inicializadas para reduzir latência de scale-out.',
      relatedService: 'auto-scaling'
    },
    {
      id: 9,
      topic: 'auto-scaling',
      question: 'Qual política reage a alarmes CloudWatch com passos graduais?',
      context: 'Escalonamento proporcional.',
      options: [
        { label: 'A', text: 'Step scaling' },
        { label: 'B', text: 'Target tracking' },
        { label: 'C', text: 'Scheduled' },
        { label: 'D', text: 'None' }
      ],
      correctAnswer: 'A',
      explanation: 'Step scaling define faixas de métrica → quantidade de instâncias a adicionar/remover.',
      relatedService: 'auto-scaling'
    },
    {
      id: 10,
      topic: 'auto-scaling',
      question: 'Quando usar scheduled scaling?',
      context: 'Picos previsíveis.',
      options: [
        { label: 'A', text: 'Demanda previsível (ex.: horário comercial)' },
        { label: 'B', text: 'Eventos imprevisíveis' },
        { label: 'C', text: 'Para desativar ASG' },
        { label: 'D', text: 'Para criptografar volumes' }
      ],
      correctAnswer: 'A',
      explanation: 'Scheduled adjustments alteram desired/min/max em horários específicos.',
      relatedService: 'auto-scaling'
    },
    {
      id: 11,
      topic: 'auto-scaling',
      question: 'Como distribuir instâncias em múltiplas AZs?',
      context: 'Alta disponibilidade.',
      options: [
        { label: 'A', text: 'Selecionar subnets de múltiplas AZs no ASG' },
        { label: 'B', text: 'Usar uma subnet apenas' },
        { label: 'C', text: 'Criar um ASG por AZ sempre' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG distribui instâncias balanceando entre subnets/AZs selecionadas.',
      relatedService: 'auto-scaling'
    },
    {
      id: 12,
      topic: 'auto-scaling',
      question: 'Qual termination policy padrão?',
      context: 'Scale-in.',
      options: [
        { label: 'A', text: 'Balanced across AZs, remove oldest launch template, depois mais antigo' },
        { label: 'B', text: 'Aleatório' },
        { label: 'C', text: 'Mais novo primeiro' },
        { label: 'D', text: 'Maior CPU' }
      ],
      correctAnswer: 'A',
      explanation: 'Padrão busca balancear AZs e remover instâncias antigas/incomuns.',
      relatedService: 'auto-scaling'
    },
    {
      id: 13,
      topic: 'auto-scaling',
      question: 'Qual métrica usar para escalonar por carga de ALB?',
      context: 'Requests.',
      options: [
        { label: 'A', text: 'ALB RequestCount per Target (TargetTracking)' },
        { label: 'B', text: 'DiskSpaceUtilization' },
        { label: 'C', text: 'S3 bytes' },
        { label: 'D', text: 'Route 53 health' }
      ],
      correctAnswer: 'A',
      explanation: 'Target tracking com métrica RequestCountPerTarget escala por TPS médio por instância.',
      relatedService: 'auto-scaling'
    },
    {
      id: 14,
      topic: 'auto-scaling',
      question: 'Quando usar predictive scaling?',
      context: 'Modelagem de demanda.',
      options: [
        { label: 'A', text: 'Padrões diários/semanais previsíveis' },
        { label: 'B', text: 'Eventos imprevisíveis' },
        { label: 'C', text: 'Para substituir target tracking' },
        { label: 'D', text: 'Para desligar ASG' }
      ],
      correctAnswer: 'A',
      explanation: 'Predictive scaling projeta demanda futura e ajusta ahead-of-time.',
      relatedService: 'auto-scaling'
    },
    {
      id: 15,
      topic: 'auto-scaling',
      question: 'Para fazer blue/green sem downtime no ASG, use:',
      context: 'Deploy seguro.',
      options: [
        { label: 'A', text: 'Instance Refresh ou Rolling update via ASG' },
        { label: 'B', text: 'Terminar todas e recriar' },
        { label: 'C', text: 'Alterar AMI direto sem refresh' },
        { label: 'D', text: 'Parar health checks' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance Refresh faz rolling replacement com checagens de saúde e taxas configuráveis.',
      relatedService: 'auto-scaling'
    },
    {
      id: 16,
      topic: 'auto-scaling',
      question: 'Qual recurso permite executar scripts antes de terminar uma instância?',
      context: 'Hooks.',
      options: [
        { label: 'A', text: 'Lifecycle hooks' },
        { label: 'B', text: 'Cooldown' },
        { label: 'C', text: 'Warm pool' },
        { label: 'D', text: 'IAM role' }
      ],
      correctAnswer: 'A',
      explanation: 'Lifecycle hooks colocam instâncias em Pending:Wait ou Terminating:Wait para custom actions (SSM, Lambda, SNS/SQS).',
      relatedService: 'auto-scaling'
    },
    {
      id: 17,
      topic: 'auto-scaling',
      question: 'Como evitar queda de capacidade Spot em ASG Mixed Instances?',
      context: 'Spot estável.',
      options: [
        { label: 'A', text: 'Capacity Rebalance + allocation strategy capacity-optimized' },
        { label: 'B', text: 'lowest-price sempre' },
        { label: 'C', text: 'Somente On-Demand' },
        { label: 'D', text: 'Desativar health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Capacity Rebalance inicia substituição ao receber aviso; capacity-optimized escolhe pools com capacidade disponível.',
      relatedService: 'auto-scaling'
    },
    {
      id: 18,
      topic: 'auto-scaling',
      question: 'Qual diferença de health check grace period?',
      context: 'Boot time.',
      options: [
        { label: 'A', text: 'Tempo ignorado antes de avaliar saúde pós-launch' },
        { label: 'B', text: 'Tempo de billing' },
        { label: 'C', text: 'Tempo de cooldown' },
        { label: 'D', text: 'Tempo de recycle' }
      ],
      correctAnswer: 'A',
      explanation: 'Grace period evita marcar unhealthy enquanto app sobe.',
      relatedService: 'auto-scaling'
    },
    {
      id: 19,
      topic: 'auto-scaling',
      question: 'Que recurso impede scale-in abaixo de certa capacidade temporária?',
      context: 'Proteção de pico.',
      options: [
        { label: 'A', text: 'Scale-in protection no grupo via scheduled or target tracking cooldown' },
        { label: 'B', text: 'Habilitar Spot' },
        { label: 'C', text: 'Trocar AMI' },
        { label: 'D', text: 'Remover health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Pode pausar scale-in (suspender process “Terminate” ou usar protection) em janelas de pico.',
      relatedService: 'auto-scaling'
    },
    {
      id: 20,
      topic: 'auto-scaling',
      question: 'Como vincular ASG a ALB/NLB?',
      context: 'Balanceamento.',
      options: [
        { label: 'A', text: 'Adicionar Target Group ao ASG (Load Balancing settings)' },
        { label: 'B', text: 'Criar IGW' },
        { label: 'C', text: 'Adicionar DNS estático' },
        { label: 'D', text: 'Usar EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG registra instâncias automaticamente em target groups configurados.',
      relatedService: 'auto-scaling'
    },
    {
      id: 21,
      topic: 'auto-scaling',
      question: 'Como fazer scale-out baseado em backlog SQS?',
      context: 'Consumidores em fila.',
      options: [
        { label: 'A', text: 'Metricas de ApproximateNumberOfMessages em CloudWatch + step/target scaling' },
        { label: 'B', text: 'Logs VPC' },
        { label: 'C', text: 'DNS records' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Crie alarme baseado em tamanho da fila ou idade da mensagem para escalar consumidores.',
      relatedService: 'auto-scaling'
    },
    {
      id: 22,
      topic: 'auto-scaling',
      question: 'Qual modo de distribuição em Mixed Instances garante On-Demand primeiro?',
      context: 'Estratégia.',
      options: [
        { label: 'A', text: 'Base + On-Demand acima do base, restante Spot' },
        { label: 'B', text: 'Somente Spot' },
        { label: 'C', text: 'Spot-only lowest price' },
        { label: 'D', text: 'Random' }
      ],
      correctAnswer: 'A',
      explanation: 'Defina Base On-Demand e porcentagem On-Demand acima disso; resto preenche com Spot.',
      relatedService: 'auto-scaling'
    },
    {
      id: 23,
      topic: 'auto-scaling',
      question: 'Como impedir que uma instância em standby receba tráfego?',
      context: 'Manutenção.',
      options: [
        { label: 'A', text: 'Mover instância para Standby no ASG (remove de LB e capacity count)' },
        { label: 'B', text: 'Parar health check' },
        { label: 'C', text: 'Excluir TG' },
        { label: 'D', text: 'Tirar EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Standby remove tráfego e permite troubleshooting mantendo contabilização opcional.',
      relatedService: 'auto-scaling'
    },
    {
      id: 24,
      topic: 'auto-scaling',
      question: 'Como pausar processos específicos do ASG?',
      context: 'Controle fino.',
      options: [
        { label: 'A', text: 'Suspender processos (Launch, Terminate, HealthCheck, ReplaceUnhealthy, etc.)' },
        { label: 'B', text: 'Parar instância' },
        { label: 'C', text: 'Desligar conta' },
        { label: 'D', text: 'Mudar VPC' }
      ],
      correctAnswer: 'A',
      explanation: 'Suspender processos permite janelas de manutenção ou deploy manual.',
      relatedService: 'auto-scaling'
    },
    {
      id: 25,
      topic: 'auto-scaling',
      question: 'Como definir janelas de escala diferentes por dia?',
      context: 'Horários distintos.',
      options: [
        { label: 'A', text: 'Scheduled actions com timezone' },
        { label: 'B', text: 'Um ASG por dia' },
        { label: 'C', text: 'Alterar manualmente' },
        { label: 'D', text: 'NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'Scheduled actions aceitam timezone e ajustes de desired/min/max.',
      relatedService: 'auto-scaling'
    },
    {
      id: 26,
      topic: 'auto-scaling',
      question: 'Qual é o efeito da “deregistration delay” do LB?',
      context: 'Graceful shutdown.',
      options: [
        { label: 'A', text: 'Espera conexões terminarem antes de remover target' },
        { label: 'B', text: 'Acelera scale-out' },
        { label: 'C', text: 'Desabilita health check' },
        { label: 'D', text: 'Cria EIP' }
      ],
      correctAnswer: 'A',
      explanation: 'Delay permite draining antes de desligar instância; combine com lifecycle hook se precisar mais tempo.',
      relatedService: 'auto-scaling'
    },
    {
      id: 27,
      topic: 'auto-scaling',
      question: 'Para atualizar AMI de forma segura no ASG, usar:',
      context: 'Rolling.',
      options: [
        { label: 'A', text: 'Instance Refresh com checkpoints/rollback' },
        { label: 'B', text: 'Deletar e recriar ASG' },
        { label: 'C', text: 'Parar health check' },
        { label: 'D', text: 'Alterar user data em produção' }
      ],
      correctAnswer: 'A',
      explanation: 'Instance Refresh substitui gradualmente mantendo saúde e rollback opcional.',
      relatedService: 'auto-scaling'
    },
    {
      id: 28,
      topic: 'auto-scaling',
      question: 'Como tratar falha de capacity em Spot ao criar ASG?',
      context: 'Fallback.',
      options: [
        { label: 'A', text: 'Usar múltiplos tipos/AZs e alocação capacity-optimized; definir base On-Demand' },
        { label: 'B', text: 'Retry infinito em um tipo' },
        { label: 'C', text: 'Desligar health check' },
        { label: 'D', text: 'Trocar para NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'Diversificar tipos/AZs aumenta sucesso; On-Demand base garante capacidade mínima.',
      relatedService: 'auto-scaling'
    },
    {
      id: 29,
      topic: 'auto-scaling',
      question: 'Qual é a métrica de “GroupInServiceInstances”?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'Número de instâncias saudáveis no ASG' },
        { label: 'B', text: 'Tráfego ALB' },
        { label: 'C', text: 'Uso de disco' },
        { label: 'D', text: 'Mensagens SQS' }
      ],
      correctAnswer: 'A',
      explanation: 'Métrica padrão do ASG para instâncias em serviço.',
      relatedService: 'auto-scaling'
    },
    {
      id: 30,
      topic: 'auto-scaling',
      question: 'Para bloquear substituição de instâncias durante manutenção, faça:',
      context: 'Manutenção controlada.',
      options: [
        { label: 'A', text: 'Suspender ReplaceUnhealthy ou usar Standby/Proteção' },
        { label: 'B', text: 'Desligar VPC' },
        { label: 'C', text: 'Remover ALB' },
        { label: 'D', text: 'Excluir SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Suspender o processo impede substituição automática temporariamente.',
      relatedService: 'auto-scaling'
    },
    {
      id: 31,
      topic: 'auto-scaling',
      question: 'Instance Refresh com checkpoints serve para quê?',
      context: 'Deploy seguro.',
      options: [
        { label: 'A', text: 'Validar em fases e interromper se falhar' },
        { label: 'B', text: 'Escalar mais rápido' },
        { label: 'C', text: 'Criptografar volumes' },
        { label: 'D', text: 'Gerar certificados' }
      ],
      correctAnswer: 'A',
      explanation: 'Checkpoints permitem pausar e validar antes de continuar o refresh.',
      relatedService: 'auto-scaling'
    },
    {
      id: 32,
      topic: 'auto-scaling',
      question: 'Qual é o efeito de “max healthy percentage” no Instance Refresh?',
      context: 'Capacidade durante refresh.',
      options: [
        { label: 'A', text: 'Limita quantas instâncias adicionais podem existir simultaneamente' },
        { label: 'B', text: 'Define custo' },
        { label: 'C', text: 'Muda AZ' },
        { label: 'D', text: 'Desativa health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Controla capacidade excedente permitida para manter serviço durante troca.',
      relatedService: 'auto-scaling'
    },
    {
      id: 33,
      topic: 'auto-scaling',
      question: 'Como garantir que tags sejam aplicadas aos volumes e instâncias criados pelo ASG?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Propagar tags no ASG/Launch Template marcando “Tag new instances/volumes”' },
        { label: 'B', text: 'Editar manualmente' },
        { label: 'C', text: 'NACL' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'Use tag propagation para instâncias e volumes EBS em Launch Template/ASG.',
      relatedService: 'auto-scaling'
    },
    {
      id: 34,
      topic: 'auto-scaling',
      question: 'Como vincular ASG a múltiplos target groups?',
      context: 'Split de tráfego.',
      options: [
        { label: 'A', text: 'Adicionar múltiplos target groups no ASG e usar ALB rules para distribuir' },
        { label: 'B', text: 'Não é suportado' },
        { label: 'C', text: 'Criar vários ASGs sempre' },
        { label: 'D', text: 'Usar somente NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG pode registrar instâncias em vários target groups simultaneamente.',
      relatedService: 'auto-scaling'
    },
    {
      id: 35,
      topic: 'auto-scaling',
      question: 'Quando usar instance weighting em Mixed Instances?',
      context: 'Capacidade heterogênea.',
      options: [
        { label: 'A', text: 'Quando tipos têm vCPU/memória diferentes e você mede capacidade em unidades' },
        { label: 'B', text: 'Somente quando todos iguais' },
        { label: 'C', text: 'Não é suportado' },
        { label: 'D', text: 'Para RDS' }
      ],
      correctAnswer: 'A',
      explanation: 'Weights permitem satisfazer desired capacity em “capacity units” em vez de 1 por instância.',
      relatedService: 'auto-scaling'
    },
    {
      id: 36,
      topic: 'auto-scaling',
      question: 'Qual política evita múltiplos scale-ins ao usar target tracking?',
      context: 'Estabilidade.',
      options: [
        { label: 'A', text: 'Scale-in cooldown específico da política' },
        { label: 'B', text: 'Desativar health check' },
        { label: 'C', text: 'Usar apenas scheduled' },
        { label: 'D', text: 'Mudar user data' }
      ],
      correctAnswer: 'A',
      explanation: 'Target tracking aplica cooldown de scale-in separado para evitar oscilações.',
      relatedService: 'auto-scaling'
    },
    {
      id: 37,
      topic: 'auto-scaling',
      question: 'Como usar métrica customizada para scaling?',
      context: 'KPIs de negócio.',
      options: [
        { label: 'A', text: 'Publicar métrica no CloudWatch e criar target/step scaling baseado nela' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Editar DNS' },
        { label: 'D', text: 'Usar ACL' }
      ],
      correctAnswer: 'A',
      explanation: 'Qualquer métrica no CloudWatch pode acionar políticas.',
      relatedService: 'auto-scaling'
    },
    {
      id: 38,
      topic: 'auto-scaling',
      question: 'Health check type pode ser trocado em ASG existente?',
      context: 'Operação.',
      options: [
        { label: 'A', text: 'Sim, alterar para ELB ou EC2 conforme necessário' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Só com novo ASG' },
        { label: 'D', text: 'Depende do SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Pode alterar health check type e grace period a qualquer momento.',
      relatedService: 'auto-scaling'
    },
    {
      id: 39,
      topic: 'auto-scaling',
      question: 'Como lidar com deploy canário em ASG?',
      context: 'Teste gradual.',
      options: [
        { label: 'A', text: 'Instance Refresh com menor batch e checkpoints ou usar dois ASGs atrás do ALB com weights' },
        { label: 'B', text: 'Trocar AMI direto' },
        { label: 'C', text: 'Desligar health check' },
        { label: 'D', text: 'Apenas scheduled' }
      ],
      correctAnswer: 'A',
      explanation: 'Use refresh com pequenos batches ou dois ASGs com pesos de TG para canário.',
      relatedService: 'auto-scaling'
    },
    {
      id: 40,
      topic: 'auto-scaling',
      question: 'Quando usar “launch template version = $Latest” no ASG?',
      context: 'Risco de drift.',
      options: [
        { label: 'A', text: 'Somente quando há processo controlado de versionamento; caso contrário, usar versão fixa' },
        { label: 'B', text: 'Sempre em produção sem controle' },
        { label: 'C', text: 'Nunca' },
        { label: 'D', text: 'Apenas para Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Use $Latest apenas se pipeline garante estabilidade; versão fixa evita mudanças inesperadas.',
      relatedService: 'auto-scaling'
    },
    {
      id: 41,
      topic: 'auto-scaling',
      question: 'Como evitar “cold start” em aplicações Java pesadas?',
      context: 'Boot lento.',
      options: [
        { label: 'A', text: 'Warm pools + health check grace maior' },
        { label: 'B', text: 'Desativar health check' },
        { label: 'C', text: 'Usar RIs' },
        { label: 'D', text: 'Remover LB' }
      ],
      correctAnswer: 'A',
      explanation: 'Warm pools e grace maior permitem inicialização antes de tráfego.',
      relatedService: 'auto-scaling'
    },
    {
      id: 42,
      topic: 'auto-scaling',
      question: 'Como priorizar AZ mais barata em Spot?',
      context: 'Custo.',
      options: [
        { label: 'A', text: 'Mixed instances com lowest-price + múltiplos pools e overrides por AZ' },
        { label: 'B', text: 'Remover AZ' },
        { label: 'C', text: 'Usar RI' },
        { label: 'D', text: 'User data' }
      ],
      correctAnswer: 'A',
      explanation: 'Allocation lowest-price pode ser usada com vários pools/AZs para escolher mais barato.',
      relatedService: 'auto-scaling'
    },
    {
      id: 43,
      topic: 'auto-scaling',
      question: 'Que métrica mostra instâncias em pending/wait?',
      context: 'Lifecycle.',
      options: [
        { label: 'A', text: 'GroupPendingInstances' },
        { label: 'B', text: 'CPUUtilization' },
        { label: 'C', text: 'NetworkIn' },
        { label: 'D', text: 'RequestCount' }
      ],
      correctAnswer: 'A',
      explanation: 'GroupPendingInstances mede instâncias ainda não InService.',
      relatedService: 'auto-scaling'
    },
    {
      id: 44,
      topic: 'auto-scaling',
      question: 'Como garantir que scale-in não remova instâncias com sessão ativa?',
      context: 'Stateful.',
      options: [
        { label: 'A', text: 'Usar sticky sessions no LB + deregistration delay + lifecycle hook para drenar' },
        { label: 'B', text: 'Desligar LB' },
        { label: 'C', text: 'Remover health check' },
        { label: 'D', text: 'N/A' }
      ],
      correctAnswer: 'A',
      explanation: 'Stickiness e delay permitem fechar sessões antes de terminar instância.',
      relatedService: 'auto-scaling'
    },
    {
      id: 45,
      topic: 'auto-scaling',
      question: 'Qual ação do ASG substitui instância unhealthy identificada pelo ELB?',
      context: 'Auto-healing.',
      options: [
        { label: 'A', text: 'Terminate and replace' },
        { label: 'B', text: 'Stop' },
        { label: 'C', text: 'Reboot apenas' },
        { label: 'D', text: 'Nada' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG encerra e lança outra instância para manter desired.',
      relatedService: 'auto-scaling'
    },
    {
      id: 46,
      topic: 'auto-scaling',
      question: 'Como migrar ASG para novo Launch Template sem downtime?',
      context: 'Atualização.',
      options: [
        { label: 'A', text: 'Alterar LT e iniciar Instance Refresh' },
        { label: 'B', text: 'Deletar ASG' },
        { label: 'C', text: 'Trocar AZ' },
        { label: 'D', text: 'Remover TG' }
      ],
      correctAnswer: 'A',
      explanation: 'Atualize LT e execute refresh/rolling update.',
      relatedService: 'auto-scaling'
    },
    {
      id: 47,
      topic: 'auto-scaling',
      question: 'Qual é o efeito de “instance warmup” em target tracking?',
      context: 'Métrica inicial.',
      options: [
        { label: 'A', text: 'Ignora métricas da nova instância até warmup expirar' },
        { label: 'B', text: 'Aumenta desired' },
        { label: 'C', text: 'Remove cooldown' },
        { label: 'D', text: 'Cria snapshot' }
      ],
      correctAnswer: 'A',
      explanation: 'Warmup evita que novas instâncias gerem falsos sinais de baixa carga.',
      relatedService: 'auto-scaling'
    },
    {
      id: 48,
      topic: 'auto-scaling',
      question: 'Como configurar ASG para usar capacity from multiple purchase options?',
      context: 'Custo e resiliência.',
      options: [
        { label: 'A', text: 'Mixed Instances Policy com On-Demand + Spot e overrides de tipo' },
        { label: 'B', text: 'Somente On-Demand' },
        { label: 'C', text: 'Somente RI' },
        { label: 'D', text: 'Não é suportado' }
      ],
      correctAnswer: 'A',
      explanation: 'Mixed Instances Policy permite diversificar tipos e compras.',
      relatedService: 'auto-scaling'
    },
    {
      id: 49,
      topic: 'auto-scaling',
      question: 'Como proteger logs durante shutdown por lifecycle hook?',
      context: 'Exportação.',
      options: [
        { label: 'A', text: 'Lifecycle hook em Terminating:Wait que envia logs para S3/CloudWatch antes de contornar' },
        { label: 'B', text: 'Parar health check' },
        { label: 'C', text: 'Desligar LB' },
        { label: 'D', text: 'Não há como' }
      ],
      correctAnswer: 'A',
      explanation: 'Hook dá tempo para exportar/limpar antes de terminar.',
      relatedService: 'auto-scaling'
    },
    {
      id: 50,
      topic: 'auto-scaling',
      question: 'Qual métrica usar para throughput HTTP médio por instância no ALB?',
      context: 'Alvo de scaling.',
      options: [
        { label: 'A', text: 'RequestCountPerTarget' },
        { label: 'B', text: 'HealthyHostCount' },
        { label: 'C', text: '4xxErrors' },
        { label: 'D', text: 'CPUUtilization' }
      ],
      correctAnswer: 'A',
      explanation: 'RequestCountPerTarget é usada em target tracking para ALB.',
      relatedService: 'auto-scaling'
    },
    {
      id: 51,
      topic: 'auto-scaling',
      question: 'Como pausar scaling durante manutenção de banco?',
      context: 'Dependências.',
      options: [
        { label: 'A', text: 'Suspender processos Launch/Terminate temporariamente ou ajustar min=desired=max' },
        { label: 'B', text: 'Trocar VPC' },
        { label: 'C', text: 'Remover SG' },
        { label: 'D', text: 'Excluir ALB' }
      ],
      correctAnswer: 'A',
      explanation: 'Suspender processos ou fixar desired evita mudanças durante manutenção.',
      relatedService: 'auto-scaling'
    },
    {
      id: 52,
      topic: 'auto-scaling',
      question: 'Como registrar instâncias existentes em ASG sem recriar?',
      context: 'Migrar para ASG.',
      options: [
        { label: 'A', text: 'Não é suportado; crie novas via ASG ou use attach instances (limitado) com template compatível' },
        { label: 'B', text: 'Mover live' },
        { label: 'C', text: 'Basta taggear' },
        { label: 'D', text: 'Parar health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Attach Instances requer matching configuration; recomendado relançar via ASG.',
      relatedService: 'auto-scaling'
    },
    {
      id: 53,
      topic: 'auto-scaling',
      question: 'Para limitar custo mensal de On-Demand, faça:',
      context: 'Custo.',
      options: [
        { label: 'A', text: 'Definir max pequeno e usar Spot para resto' },
        { label: 'B', text: 'Desativar health check' },
        { label: 'C', text: 'Trocar AZ' },
        { label: 'D', text: 'Usar CLB' }
      ],
      correctAnswer: 'A',
      explanation: 'Limite max/porcentagem On-Demand e complete com Spot.',
      relatedService: 'auto-scaling'
    },
    {
      id: 54,
      topic: 'auto-scaling',
      question: 'Como evitar escalada por picos curtos de CPU?',
      context: 'Ruído.',
      options: [
        { label: 'A', text: 'Usar alarme com período maior ou metric math (ex: average de 5 mins) + cooldown' },
        { label: 'B', text: 'Disable health check' },
        { label: 'C', text: 'Trocar tipo de instância' },
        { label: 'D', text: 'Não há solução' }
      ],
      correctAnswer: 'A',
      explanation: 'Suavize métrica ou aumente período/threshold.',
      relatedService: 'auto-scaling'
    },
    {
      id: 55,
      topic: 'auto-scaling',
      question: 'Como definir prioridade de tipos em Mixed Instances?',
      context: 'Preferências.',
      options: [
        { label: 'A', text: 'Usar overrides com prioridade; ASG tenta mais alta antes' },
        { label: 'B', text: 'Não controla' },
        { label: 'C', text: 'Depende de AZ' },
        { label: 'D', text: 'Só Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Priority define ordem de tentativa de tipos, respeitando weights.',
      relatedService: 'auto-scaling'
    },
    {
      id: 56,
      topic: 'auto-scaling',
      question: 'Como minimizar impacto de perda de instâncias stateful?',
      context: 'State preservation.',
      options: [
        { label: 'A', text: 'Externalizar estado em RDS/ElastiCache/S3 e usar warm pools para reposicionar rapidamente' },
        { label: 'B', text: 'Manter dados em disco efêmero' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Remover LB' }
      ],
      correctAnswer: 'A',
      explanation: 'Stateful deve ficar fora da instância; warm pools ajudam reposição rápida.',
      relatedService: 'auto-scaling'
    },
    {
      id: 57,
      topic: 'auto-scaling',
      question: 'Como usar ASG com Launch Template que referencia parâmetros dinâmicos (ex: latest AMI via SSM)?',
      context: 'Automação.',
      options: [
        { label: 'A', text: 'User data ou LT com resolve de SSM Parameter (ex: {{resolve:ssm:/path}})' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Precisa editar manualmente' },
        { label: 'D', text: 'Só com LC' }
      ],
      correctAnswer: 'A',
      explanation: 'LT suporta Dynamic References; resolve em tempo de launch.',
      relatedService: 'auto-scaling'
    },
    {
      id: 58,
      topic: 'auto-scaling',
      question: 'Como drenar conexões antes de scale-in ao usar NLB?',
      context: 'TCP/UDP.',
      options: [
        { label: 'A', text: 'Usar deregistration delay do NLB e lifecycle hook para passos extra' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Remover health check' },
        { label: 'D', text: 'Criar ALB' }
      ],
      correctAnswer: 'A',
      explanation: 'NLB também tem deregistration delay; hook adiciona scripts se necessário.',
      relatedService: 'auto-scaling'
    },
    {
      id: 59,
      topic: 'auto-scaling',
      question: 'Como lidar com falha de user data durante launch?',
      context: 'Boot falhou.',
      options: [
        { label: 'A', text: 'Usar health checks/alarme para marcar instância unhealthy e substituí-la; enviar logs ao S3/CloudWatch' },
        { label: 'B', text: 'Parar scaling' },
        { label: 'C', text: 'Deixar rodar' },
        { label: 'D', text: 'Trocar SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Falhas de bootstrap devem resultar em unhealthy → replacement.',
      relatedService: 'auto-scaling'
    },
    {
      id: 60,
      topic: 'auto-scaling',
      question: 'Qual melhor prática para AMI rollbacks rápidos?',
      context: 'Deploy.',
      options: [
        { label: 'A', text: 'Manter versão anterior e usar Instance Refresh cancel/rollback ou trocar LT versão' },
        { label: 'B', text: 'Deletar AMIs antigas' },
        { label: 'C', text: 'Parar health check' },
        { label: 'D', text: 'Usar somente Spot' }
      ],
      correctAnswer: 'A',
      explanation: 'Tenha versões e permita rollback rápido via LT/refresh.',
      relatedService: 'auto-scaling'
    },
    {
      id: 61,
      topic: 'auto-scaling',
      question: 'Como o ASG reage a terminação manual de instância?',
      context: 'Reposição.',
      options: [
        { label: 'A', text: 'Lança nova instância para manter desired' },
        { label: 'B', text: 'Não faz nada' },
        { label: 'C', text: 'Apaga ASG' },
        { label: 'D', text: 'Desativa LB' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG mantém desired; substituirá instâncias terminadas.',
      relatedService: 'auto-scaling'
    },
    {
      id: 62,
      topic: 'auto-scaling',
      question: 'Qual é o efeito de “capacity rebalance”?',
      context: 'Spot preemption.',
      options: [
        { label: 'A', text: 'Aciona scale-out antecipado ao receber aviso de spot interruption' },
        { label: 'B', text: 'Desliga health check' },
        { label: 'C', text: 'Move AZ' },
        { label: 'D', text: 'Apenas On-Demand' }
      ],
      correctAnswer: 'A',
      explanation: 'Capacity rebalance inicia substituição antes da interrupção efetiva.',
      relatedService: 'auto-scaling'
    },
    {
      id: 63,
      topic: 'auto-scaling',
      question: 'Como usar métricas do ALB 5XX para reduzir scale-in?',
      context: 'Proteção de erro.',
      options: [
        { label: 'A', text: 'Adicionar alarme 5XX que suspende Terminate ou aumenta desired temporariamente' },
        { label: 'B', text: 'Desligar health check' },
        { label: 'C', text: 'Remover ALB' },
        { label: 'D', text: 'Usar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Alarmes de erro podem acionar ações para preservar capacidade enquanto falha é investigada.',
      relatedService: 'auto-scaling'
    },
    {
      id: 64,
      topic: 'auto-scaling',
      question: 'Como evitar “throttling” de APIs internas durante scale-out lento?',
      context: 'Dependência upstream.',
      options: [
        { label: 'A', text: 'Provisionar warm pool e ajustar warmup/cooldown; adicionar backpressure no app' },
        { label: 'B', text: 'Remover SG' },
        { label: 'C', text: 'Usar RI' },
        { label: 'D', text: 'Desativar LB' }
      ],
      correctAnswer: 'A',
      explanation: 'Warm pool acelera; backpressure evita overload enquanto escala.',
      relatedService: 'auto-scaling'
    },
    {
      id: 65,
      topic: 'auto-scaling',
      question: 'Como contabilizar instâncias em standby na desired capacity?',
      context: 'Capacidade disponível.',
      options: [
        { label: 'A', text: 'Standby remove a instância do count; aumente desired se quiser compensar' },
        { label: 'B', text: 'Conta normalmente' },
        { label: 'C', text: 'Diminui max' },
        { label: 'D', text: 'Remove AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'Instância em standby não conta; ajuste desired para manter capacidade efetiva.',
      relatedService: 'auto-scaling'
    },
    {
      id: 66,
      topic: 'auto-scaling',
      question: 'Qual métrica usar para escalar workers de fila de vídeo?',
      context: 'Fila de processamento.',
      options: [
        { label: 'A', text: 'ApproximateAgeOfOldestMessage ou MessagesVisible por worker' },
        { label: 'B', text: 'CPU do LB' },
        { label: 'C', text: 'DNS' },
        { label: 'D', text: 'Memória de outro serviço' }
      ],
      correctAnswer: 'A',
      explanation: 'Fila determina escala de consumidores.',
      relatedService: 'auto-scaling'
    },
    {
      id: 67,
      topic: 'auto-scaling',
      question: 'Como evitar queda de instâncias Spot em eventos em massa?',
      context: 'Resiliência.',
      options: [
        { label: 'A', text: 'Diversificar tipos/AZs, capacity-optimized, base On-Demand, rebalance' },
        { label: 'B', text: 'Usar um único tipo' },
        { label: 'C', text: 'Somente lowest-price' },
        { label: 'D', text: 'Desativar LB' }
      ],
      correctAnswer: 'A',
      explanation: 'Diversificação e rebalance reduzem probabilidade de interrupção massiva.',
      relatedService: 'auto-scaling'
    },
    {
      id: 68,
      topic: 'auto-scaling',
      question: 'Como configurar métricas detalhadas do ASG?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Ativar “Group Metrics Collection” para emitir métricas a cada 1 min' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Logs S3' },
        { label: 'D', text: 'VPC Flow Logs' }
      ],
      correctAnswer: 'A',
      explanation: 'Group Metrics Collection habilita métricas de 1-min (default 5-min).',
      relatedService: 'auto-scaling'
    },
    {
      id: 69,
      topic: 'auto-scaling',
      question: 'Qual evento dispara lifecycle hook quando instância entra em Terminating:Wait?',
      context: 'Eventos.',
      options: [
        { label: 'A', text: 'EventBridge/SNS/SQS recebem notificação' },
        { label: 'B', text: 'N/A' },
        { label: 'C', text: 'CloudTrail apenas' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'Hooks publicam eventos para permitir automação (Lambda, SSM).',
      relatedService: 'auto-scaling'
    },
    {
      id: 70,
      topic: 'auto-scaling',
      question: 'Como remover apenas uma AZ do ASG sem perder instâncias restantes?',
      context: 'Manutenção de AZ.',
      options: [
        { label: 'A', text: 'Editar subnets do ASG removendo AZ e permitir rebalance (pode encerrar instâncias daquela AZ)' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Trocar SG' },
        { label: 'D', text: 'Editar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Remover subnet retira AZ; instâncias dessa AZ serão terminadas para balancear.',
      relatedService: 'auto-scaling'
    },
    {
      id: 71,
      topic: 'auto-scaling',
      question: 'Como definir min diferente durante feriado?',
      context: 'Demanda sazonal.',
      options: [
        { label: 'A', text: 'Scheduled action ajustando min/desired/max na data' },
        { label: 'B', text: 'Parar ASG' },
        { label: 'C', text: 'Mudar AMI' },
        { label: 'D', text: 'Remover TG' }
      ],
      correctAnswer: 'A',
      explanation: 'Scheduled permite variação sazonal.',
      relatedService: 'auto-scaling'
    },
    {
      id: 72,
      topic: 'auto-scaling',
      question: 'Para que serve “termination policy – oldest launch template”?',
      context: 'Homogeneidade.',
      options: [
        { label: 'A', text: 'Remove instâncias com LT/LC mais antigos primeiro' },
        { label: 'B', text: 'Remove mais novos' },
        { label: 'C', text: 'Remove aleatório' },
        { label: 'D', text: 'Não existe' }
      ],
      correctAnswer: 'A',
      explanation: 'Ajuda a uniformizar versão de instâncias.',
      relatedService: 'auto-scaling'
    },
    {
      id: 73,
      topic: 'auto-scaling',
      question: 'Como migrar ASG para novo VPC?',
      context: 'Rede.',
      options: [
        { label: 'A', text: 'Criar novo ASG no VPC alvo; não é possível mover subnets entre VPCs' },
        { label: 'B', text: 'Editar VPC diretamente' },
        { label: 'C', text: 'Trocar SG' },
        { label: 'D', text: 'Parar health check' }
      ],
      correctAnswer: 'A',
      explanation: 'ASG é vinculado a VPC via subnets; precisa novo ASG.',
      relatedService: 'auto-scaling'
    },
    {
      id: 74,
      topic: 'auto-scaling',
      question: 'Como acionar Lambda quando ASG escala?',
      context: 'Automação.',
      options: [
        { label: 'A', text: 'Assinar eventos do ASG via EventBridge (Instance Launch/Terminate) e chamar Lambda' },
        { label: 'B', text: 'Não é suportado' },
        { label: 'C', text: 'Somente CloudTrail' },
        { label: 'D', text: 'DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'EventBridge pode acionar workflows quando instâncias entram/saem.',
      relatedService: 'auto-scaling'
    },
    {
      id: 75,
      topic: 'auto-scaling',
      question: 'Como usar múltiplos grupos para diferentes workloads na mesma AZ?',
      context: 'Segmentação.',
      options: [
        { label: 'A', text: 'Criar ASGs separados com tags/TGs distintos; não há limitação de AZ' },
        { label: 'B', text: 'Obrigatório um por região' },
        { label: 'C', text: 'Usar um único ASG' },
        { label: 'D', text: 'Remover SG' }
      ],
      correctAnswer: 'A',
      explanation: 'ASGs podem coexistir; use tags e TGs para separação.',
      relatedService: 'auto-scaling'
    },
    {
      id: 76,
      topic: 'auto-scaling',
      question: 'Como conectar ASG a ECS para EC2 launch type?',
      context: 'Containers.',
      options: [
        { label: 'A', text: 'Usar capacity provider que referencia o ASG' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Somente Fargate' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'Capacity providers integram ASG com ECS para escalonamento de tasks.',
      relatedService: 'auto-scaling'
    },
    {
      id: 77,
      topic: 'auto-scaling',
      question: 'Como garantir que userdata consuma secrets seguros?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Recuperar de SSM/Secrets Manager com IAM role e IMDSv2 em runtime' },
        { label: 'B', text: 'Embutir plaintext' },
        { label: 'C', text: 'Enviar por e-mail' },
        { label: 'D', text: 'Deixar público' }
      ],
      correctAnswer: 'A',
      explanation: 'Use roles + serviços de secret em vez de plaintext no user data.',
      relatedService: 'auto-scaling'
    },
    {
      id: 78,
      topic: 'auto-scaling',
      question: 'Como usar ASG com EKS managed node groups?',
      context: 'Kubernetes.',
      options: [
        { label: 'A', text: 'EKS cria/gerencia ASG; use cluster-autoscaler para scale-out' },
        { label: 'B', text: 'Não usa ASG' },
        { label: 'C', text: 'Somente EC2-Classic' },
        { label: 'D', text: 'NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'Node groups são ASGs; cluster-autoscaler ajusta desired.',
      relatedService: 'auto-scaling'
    },
    {
      id: 79,
      topic: 'auto-scaling',
      question: 'Como registrar métricas de ciclo de vida para auditoria?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Ativar CloudTrail e EventBridge para eventos do ASG' },
        { label: 'B', text: 'Não há logs' },
        { label: 'C', text: 'Somente CloudWatch Logs' },
        { label: 'D', text: 'FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudTrail/EventBridge registram create/update/delete e eventos de instância.',
      relatedService: 'auto-scaling'
    },
    {
      id: 80,
      topic: 'auto-scaling',
      question: 'Como lidar com limites de instâncias por conta?',
      context: 'Quotas.',
      options: [
        { label: 'A', text: 'Solicitar aumento de vCPU/instances, ajustar max do ASG' },
        { label: 'B', text: 'Ignorar' },
        { label: 'C', text: 'Remover SG' },
        { label: 'D', text: 'Usar NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'Quotas podem impedir scale-out; planeje e solicite aumento.',
      relatedService: 'auto-scaling'
    },
    {
      id: 81,
      topic: 'auto-scaling',
      question: 'Como aplicar política de scale-out com base em latência do ALB?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'Criar alarme de TargetResponseTime do ALB e acionar step/target scaling' },
        { label: 'B', text: 'Usar CPU' },
        { label: 'C', text: 'Usar DNS' },
        { label: 'D', text: 'Não pode' }
      ],
      correctAnswer: 'A',
      explanation: 'Latência pode acionar scale-out via CloudWatch.',
      relatedService: 'auto-scaling'
    },
    {
      id: 82,
      topic: 'auto-scaling',
      question: 'Como lidar com health checks falsos-positivos por deploy?',
      context: 'Estabilidade.',
      options: [
        { label: 'A', text: 'Ajustar grace period, path de health check e usar deployment janela (standby/refresh)' },
        { label: 'B', text: 'Desligar health check' },
        { label: 'C', text: 'Remover LB' },
        { label: 'D', text: 'Parar ASG' }
      ],
      correctAnswer: 'A',
      explanation: 'Grace maior e health endpoint estável evitam falsos-positivos.',
      relatedService: 'auto-scaling'
    },
    {
      id: 83,
      topic: 'auto-scaling',
      question: 'Como reutilizar instâncias com warming para workloads de fila elástica?',
      context: 'Reuso.',
      options: [
        { label: 'A', text: 'Warm pools com reuse on scale-in para manter instâncias aquecidas' },
        { label: 'B', text: 'Terminar tudo' },
        { label: 'C', text: 'Spot-only' },
        { label: 'D', text: 'N/A' }
      ],
      correctAnswer: 'A',
      explanation: 'Warm pool reuse reduz tempo de escala para filas com burst.',
      relatedService: 'auto-scaling'
    },
    {
      id: 84,
      topic: 'auto-scaling',
      question: 'Como registrar alarmes quando ASG não consegue lançar instância?',
      context: 'Falha de launch.',
      options: [
        { label: 'A', text: 'Monitorar eventos “FailedToLaunch” via EventBridge e alarmar' },
        { label: 'B', text: 'Não tem log' },
        { label: 'C', text: 'CloudTrail não registra' },
        { label: 'D', text: 'Usar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'EventBridge/CloudTrail capturam falhas; alerte para quotas/AMI/permissions.',
      relatedService: 'auto-scaling'
    },
    {
      id: 85,
      topic: 'auto-scaling',
      question: 'Como excluir instâncias de Auto Scaling para migração manual?',
      context: 'Remoção.',
      options: [
        { label: 'A', text: 'Detach instance (with/without decrement desired) e depois terminar manualmente' },
        { label: 'B', text: 'Parar health check' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Trocar AMI' }
      ],
      correctAnswer: 'A',
      explanation: 'Detach remove gestão; decrementar desired evita reposição.',
      relatedService: 'auto-scaling'
    },
    {
      id: 86,
      topic: 'auto-scaling',
      question: 'Como controlar número de instâncias em warm pool?',
      context: 'Capacidade aquecida.',
      options: [
        { label: 'A', text: 'Configurar pool size com base em percentages ou números absolutos e política de reuse' },
        { label: 'B', text: 'Automático fixo' },
        { label: 'C', text: 'Não pode' },
        { label: 'D', text: 'Via DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Warm pool size é configurável (MinSize/MaxSize ou percent).',
      relatedService: 'auto-scaling'
    },
    {
      id: 87,
      topic: 'auto-scaling',
      question: 'Como aplicar políticas diferentes para scale-out e scale-in?',
      context: 'Simetria.',
      options: [
        { label: 'A', text: 'Criar políticas separadas com thresholds/cooldowns distintos' },
        { label: 'B', text: 'Obrigatoriamente iguais' },
        { label: 'C', text: 'Usar apenas scheduled' },
        { label: 'D', text: 'Não pode' }
      ],
      correctAnswer: 'A',
      explanation: 'Scale-out e scale-in podem ter triggers independentes.',
      relatedService: 'auto-scaling'
    },
    {
      id: 88,
      topic: 'auto-scaling',
      question: 'Como integrar ASG com Karpenter ou cluster-autoscaler?',
      context: 'K8s autoscaling.',
      options: [
        { label: 'A', text: 'Cluster-autoscaler ajusta desired do ASG/NodeGroup; Karpenter pode criar instâncias diretamente sem ASG' },
        { label: 'B', text: 'Não funciona' },
        { label: 'C', text: 'Precisa CLB' },
        { label: 'D', text: 'Depende de VPC' }
      ],
      correctAnswer: 'A',
      explanation: 'CA manipula ASG; Karpenter é alternativa sem ASG, ou pode coexistir.',
      relatedService: 'auto-scaling'
    },
    {
      id: 89,
      topic: 'auto-scaling',
      question: 'Como garantir que instâncias recebam patches antes de entrar em serviço?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Lifecycle hook em Pending:Wait chamando SSM Patch Manager e só então Continue' },
        { label: 'B', text: 'Patching manual' },
        { label: 'C', text: 'Remover health check' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Hook permite automatizar patching antes do InService.',
      relatedService: 'auto-scaling'
    },
    {
      id: 90,
      topic: 'auto-scaling',
      question: 'Como impedir que scale-in reduza capacidade abaixo do necessário para conexão com banco?',
      context: 'Dependência externa.',
      options: [
        { label: 'A', text: 'Definir MinCapacity apropriado e usar alarms de erro para suspender Terminate' },
        { label: 'B', text: 'Desativar LB' },
        { label: 'C', text: 'Trocar tipo de instância' },
        { label: 'D', text: 'Não usar health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Min adequado evita queda excessiva; pode suspender scale-in via alarme enquanto resolve dependência.',
      relatedService: 'auto-scaling'
    }
  ],

  alb: [
    {
      id: 1,
      topic: 'alb',
      question: 'Application Load Balancer opera em qual camada OSI?',
      context: 'Escolhendo tipo de load balancer.',
      options: [
        { label: 'A', text: 'Camada 4 (Transport)' },
        { label: 'B', text: 'Camada 7 (Application)' },
        { label: 'C', text: 'Camada 3 (Network)' },
        { label: 'D', text: 'Camada 2 (Data Link)' }
      ],
      correctAnswer: 'B',
      explanation: 'ALB é Layer 7 (Application): entende HTTP/HTTPS, pode rotear baseado em URL path, hostname, headers, query strings. NLB é Layer 4 (TCP/UDP). CLB é Layer 4+7 (legacy).',
      relatedService: 'alb'
    },
    {
      id: 2,
      topic: 'alb',
      question: 'Qual recurso permite rotear /api/* para target group de API e /* para target group de frontend?',
      context: 'Microservices com paths diferentes.',
      options: [
        { label: 'A', text: 'Host-based routing' },
        { label: 'B', text: 'Path-based routing' },
        { label: 'C', text: 'ALB não suporta' },
        { label: 'D', text: 'Query string routing' }
      ],
      correctAnswer: 'B',
      explanation: 'Path-based routing: regras baseadas em URL path. Ex: /api/* → API target group, /images/* → static content TG, /* → frontend TG. ALB também suporta host-based (api.example.com vs www.example.com).',
      relatedService: 'alb'
    },
    {
      id: 3,
      topic: 'alb',
      question: 'Quais tipos de target são suportados pelo ALB?',
      context: 'Flexibilidade de destino.',
      options: [
        { label: 'A', text: 'Instance, IP e Lambda' },
        { label: 'B', text: 'Somente instance' },
        { label: 'C', text: 'Somente IP' },
        { label: 'D', text: 'Somente Lambda' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB encaminha para instâncias, IPs privados (mesma VPC/peered) e funções Lambda.',
      relatedService: 'alb'
    },
    {
      id: 4,
      topic: 'alb',
      question: 'Como manter sessões no ALB?',
      context: 'Stickiness.',
      options: [
        { label: 'A', text: 'Habilitar stickiness no target group com cookie gerado pelo LB' },
        { label: 'B', text: 'Não há stickiness' },
        { label: 'C', text: 'Usar apenas IP público' },
        { label: 'D', text: 'Criar DNS separado' }
      ],
      correctAnswer: 'A',
      explanation: 'Stickiness via cookie do LB ou app cookie mantém afinidade por tempo configurado.',
      relatedService: 'alb'
    },
    {
      id: 5,
      topic: 'alb',
      question: 'O que é “deregistration delay”?',
      context: 'Draining.',
      options: [
        { label: 'A', text: 'Tempo de drenagem para requests ativos antes de remover target' },
        { label: 'B', text: 'TTL DNS' },
        { label: 'C', text: 'Timeout de idle' },
        { label: 'D', text: 'Latência mínima' }
      ],
      correctAnswer: 'A',
      explanation: 'Permite que conexões existes concluam antes de retirada do target.',
      relatedService: 'alb'
    },
    {
      id: 6,
      topic: 'alb',
      question: 'ALB suporta quais protocolos de aplicativo?',
      context: 'Compatibilidade.',
      options: [
        { label: 'A', text: 'HTTP/1.1, HTTP/2 e gRPC' },
        { label: 'B', text: 'Somente TCP' },
        { label: 'C', text: 'FTP nativo' },
        { label: 'D', text: 'SMTP' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB suporta HTTP/1.1, HTTP/2, WebSockets e gRPC (HTTP/2).',
      relatedService: 'alb'
    },
    {
      id: 7,
      topic: 'alb',
      question: 'Como obter IP real do cliente no backend?',
      context: 'Headers.',
      options: [
        { label: 'A', text: 'Ler header X-Forwarded-For (e também X-Forwarded-Proto/Port)' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Via DNS only' },
        { label: 'D', text: 'Via NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB insere cabeçalhos X-Forwarded-* com informações do cliente.',
      relatedService: 'alb'
    },
    {
      id: 8,
      topic: 'alb',
      question: 'ALB é regional ou global?',
      context: 'Escopo.',
      options: [
        { label: 'A', text: 'Regional (uma região e VPC)' },
        { label: 'B', text: 'Global' },
        { label: 'C', text: 'Edge' },
        { label: 'D', text: 'Somente AZ' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB vive em uma região/VPC; pode usar endpoints privados.',
      relatedService: 'alb'
    },
    {
      id: 9,
      topic: 'alb',
      question: 'Cross-zone load balancing no ALB é:',
      context: 'Distribuição.',
      options: [
        { label: 'A', text: 'Ativado por padrão e sem custo extra' },
        { label: 'B', text: 'Cobrado' },
        { label: 'C', text: 'Desativado sempre' },
        { label: 'D', text: 'Não existe' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB habilita cross-zone por padrão sem custo (diferente de NLB).',
      relatedService: 'alb'
    },
    {
      id: 10,
      topic: 'alb',
      question: 'Pode-se anexar Security Groups ao ALB?',
      context: 'Rede.',
      options: [
        { label: 'A', text: 'Sim, ALB usa SG pois é L7' },
        { label: 'B', text: 'Somente NACL' },
        { label: 'C', text: 'NLB usa SG' },
        { label: 'D', text: 'Nenhum LB usa SG' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB é um ENI gerenciado; usa SG para tráfego.',
      relatedService: 'alb'
    },
    {
      id: 11,
      topic: 'alb',
      question: 'Qual listener usar para HTTPS?',
      context: 'TLS.',
      options: [
        { label: 'A', text: 'Porta 443 com certificado ACM e política de segurança' },
        { label: 'B', text: 'Porta 80 sem cert' },
        { label: 'C', text: 'Porta 25' },
        { label: 'D', text: 'Porta 22' }
      ],
      correctAnswer: 'A',
      explanation: 'HTTPS listener 443 usa cert ACM/IAM e TLS policy.',
      relatedService: 'alb'
    },
    {
      id: 12,
      topic: 'alb',
      question: 'ALB suporta SNI para múltiplos certificados?',
      context: 'Hosts múltiplos.',
      options: [
        { label: 'A', text: 'Sim, vários certs por listener com SNI' },
        { label: 'B', text: 'Apenas um cert' },
        { label: 'C', text: 'Não suporta HTTPS' },
        { label: 'D', text: 'Precisa NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB escolhe cert baseado no hostname SNI.',
      relatedService: 'alb'
    },
    {
      id: 13,
      topic: 'alb',
      question: 'Qual ação de regra retorna resposta fixa?',
      context: 'Custom response.',
      options: [
        { label: 'A', text: 'Fixed response' },
        { label: 'B', text: 'Redirect' },
        { label: 'C', text: 'Forward' },
        { label: 'D', text: 'Authenticate' }
      ],
      correctAnswer: 'A',
      explanation: 'Fixed response permite retornar código/HTML sem ir ao target.',
      relatedService: 'alb'
    },
    {
      id: 14,
      topic: 'alb',
      question: 'Como forçar HTTP para HTTPS?',
      context: 'Redirect.',
      options: [
        { label: 'A', text: 'Regra de redirect 80→443 no ALB' },
        { label: 'B', text: 'NAT' },
        { label: 'C', text: 'Trocar SG' },
        { label: 'D', text: 'Route 53 health' }
      ],
      correctAnswer: 'A',
      explanation: 'Crie listener 80 com ação redirect para HTTPS.',
      relatedService: 'alb'
    },
    {
      id: 15,
      topic: 'alb',
      question: 'Qual limite de prioridade de regras por listener?',
      context: 'Ordenação.',
      options: [
        { label: 'A', text: 'Prioridades únicas por listener; menor prioridade avaliada primeiro' },
        { label: 'B', text: 'Sem prioridade' },
        { label: 'C', text: 'Aleatório' },
        { label: 'D', text: 'Somente 1 regra' }
      ],
      correctAnswer: 'A',
      explanation: 'Regras têm priority única; default rule no final.',
      relatedService: 'alb'
    },
    {
      id: 16,
      topic: 'alb',
      question: 'ALB suporta autenticação nativa?',
      context: 'Auth.',
      options: [
        { label: 'A', text: 'Sim, com Cognito ou OIDC no listener rule' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Somente SAML' },
        { label: 'D', text: 'Apenas Basic Auth' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB pode autenticar via Cognito/OIDC antes de encaminhar.',
      relatedService: 'alb'
    },
    {
      id: 17,
      topic: 'alb',
      question: 'Como rotear por hostname?',
      context: 'Multi-domain.',
      options: [
        { label: 'A', text: 'Host-based rules com valores como api.example.com' },
        { label: 'B', text: 'Somente path' },
        { label: 'C', text: 'Não suporta' },
        { label: 'D', text: 'Via SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Host conditions com wildcards roteam por domínio.',
      relatedService: 'alb'
    },
    {
      id: 18,
      topic: 'alb',
      question: 'Como rotear por header ou método HTTP?',
      context: 'Routing avançado.',
      options: [
        { label: 'A', text: 'Usar conditions de header, method, query string ou source IP' },
        { label: 'B', text: 'Só path' },
        { label: 'C', text: 'Só host' },
        { label: 'D', text: 'Não pode' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB suporta condições diversas para regras.',
      relatedService: 'alb'
    },
    {
      id: 19,
      topic: 'alb',
      question: 'Como distribuir tráfego entre múltiplos target groups na mesma regra?',
      context: 'Weighted routing.',
      options: [
        { label: 'A', text: 'Forward action com pesos (porcentagens) entre target groups' },
        { label: 'B', text: 'Não é suportado' },
        { label: 'C', text: 'Precisa Route 53' },
        { label: 'D', text: 'Precisa NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB forward permite múltiplos TGs com weights para canários/blue-green.',
      relatedService: 'alb'
    },
    {
      id: 20,
      topic: 'alb',
      question: 'Qual health check padrão do ALB?',
      context: 'Saúde.',
      options: [
        { label: 'A', text: 'HTTP(S) path configurável por target group' },
        { label: 'B', text: 'ICMP' },
        { label: 'C', text: 'Ping DNS' },
        { label: 'D', text: 'SNMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Health check HTTP/HTTPS (ou TCP para TCP targets) por TG.',
      relatedService: 'alb'
    },
    {
      id: 21,
      topic: 'alb',
      question: 'Qual timeout encerra conexões ociosas?',
      context: 'Idle timeout.',
      options: [
        { label: 'A', text: 'Idle timeout configurável (padrão 60s)' },
        { label: 'B', text: 'Não existe' },
        { label: 'C', text: 'TTL DNS' },
        { label: 'D', text: 'Health check interval' }
      ],
      correctAnswer: 'A',
      explanation: 'Idle timeout encerra conexões sem tráfego; ajuste para long polling.',
      relatedService: 'alb'
    },
    {
      id: 22,
      topic: 'alb',
      question: 'ALB suporta WebSockets?',
      context: 'Tempo real.',
      options: [
        { label: 'A', text: 'Sim, em HTTP/HTTPS' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Somente NLB' },
        { label: 'D', text: 'Somente CLB' }
      ],
      correctAnswer: 'A',
      explanation: 'WebSockets são suportados (upgrade) no ALB.',
      relatedService: 'alb'
    },
    {
      id: 23,
      topic: 'alb',
      question: 'Como proteger o ALB contra ataques L7?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Associar AWS WAF e usar Shield Standard (automático)' },
        { label: 'B', text: 'NACL apenas' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Somente SG' }
      ],
      correctAnswer: 'A',
      explanation: 'WAF no ALB filtra L7; Shield Standard protege DDoS L3/4.',
      relatedService: 'alb'
    },
    {
      id: 24,
      topic: 'alb',
      question: 'Como configurar ALB interno?',
      context: 'Acesso privado.',
      options: [
        { label: 'A', text: 'Escolher scheme internal ao criar' },
        { label: 'B', text: 'Adicionar IGW' },
        { label: 'C', text: 'Precisa VPN' },
        { label: 'D', text: 'Não existe ALB interno' }
      ],
      correctAnswer: 'A',
      explanation: 'Scheme internal cria ALB acessível apenas pela VPC/peering/VPN.',
      relatedService: 'alb'
    },
    {
      id: 25,
      topic: 'alb',
      question: 'ALB pode ter listeners TCP puros?',
      context: 'Protocolos.',
      options: [
        { label: 'A', text: 'Não; ALB é HTTP/HTTPS/gRPC; para TCP use NLB' },
        { label: 'B', text: 'Sim' },
        { label: 'C', text: 'Somente CLB' },
        { label: 'D', text: 'Com IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB não suporta TCP bruto; use NLB.',
      relatedService: 'alb'
    },
    {
      id: 26,
      topic: 'alb',
      question: 'Qual o limite de tamanho de header suportado pelo ALB?',
      context: 'Request size.',
      options: [
        { label: 'A', text: '16 KB (por padrão)' },
        { label: 'B', text: '1 KB' },
        { label: 'C', text: '100 KB' },
        { label: 'D', text: 'Sem limite' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB tem limite de header ~16 KB e tamanho total de request 1 MB.',
      relatedService: 'alb'
    },
    {
      id: 27,
      topic: 'alb',
      question: 'Para gRPC, o target group deve ser de que tipo?',
      context: 'Config gRPC.',
      options: [
        { label: 'A', text: 'HTTP/2 target group (protocol version gRPC)' },
        { label: 'B', text: 'TCP' },
        { label: 'C', text: 'UDP' },
        { label: 'D', text: 'Lambda' }
      ],
      correctAnswer: 'A',
      explanation: 'Use TG HTTP/2 para gRPC.',
      relatedService: 'alb'
    },
    {
      id: 28,
      topic: 'alb',
      question: 'Como lidar com URLs longas e roteamento por query string?',
      context: 'Routing.',
      options: [
        { label: 'A', text: 'Adicionar condition de query string; limite de tamanho total ainda se aplica' },
        { label: 'B', text: 'Não suporta query' },
        { label: 'C', text: 'Somente path' },
        { label: 'D', text: 'Precisa NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB permite condições por query string.',
      relatedService: 'alb'
    },
    {
      id: 29,
      topic: 'alb',
      question: 'Qual é o papel do “target type = ip”?',
      context: 'Destinos.',
      options: [
        { label: 'A', text: 'Permite registrar IPs privados (inclusive endpoints de outra VPC via peering/TGW)' },
        { label: 'B', text: 'IPs públicos apenas' },
        { label: 'C', text: 'Somente Lambda' },
        { label: 'D', text: 'Não suporta' }
      ],
      correctAnswer: 'A',
      explanation: 'Target type IP permite containers em fargate, appliances, ou peered VPCs.',
      relatedService: 'alb'
    },
    {
      id: 30,
      topic: 'alb',
      question: 'ALB insere qual header para TLS offload?',
      context: 'Proto.',
      options: [
        { label: 'A', text: 'X-Forwarded-Proto' },
        { label: 'B', text: 'X-TLS' },
        { label: 'C', text: 'Auth' },
        { label: 'D', text: 'Cookie' }
      ],
      correctAnswer: 'A',
      explanation: 'X-Forwarded-Proto indica http/https ao backend.',
      relatedService: 'alb'
    },
    {
      id: 31,
      topic: 'alb',
      question: 'ALB suporta IPv6?',
      context: 'Endereçamento.',
      options: [
        { label: 'A', text: 'Sim, com dualstack e SG IPv6' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Somente IPv6' },
        { label: 'D', text: 'Precisa NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB pode ser dualstack; configure SG e route 53 AAAA.',
      relatedService: 'alb'
    },
    {
      id: 32,
      topic: 'alb',
      question: 'Como o ALB lida com HTTP -> backend HTTP/2?',
      context: 'Protocol upgrade.',
      options: [
        { label: 'A', text: 'Suporta conexões simultâneas HTTP/1.1 e HTTP/2 para os targets (ALPN)' },
        { label: 'B', text: 'Converte para TCP' },
        { label: 'C', text: 'Não suporta HTTP/2 no target' },
        { label: 'D', text: 'Exige gRPC' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB negocia HTTP/2 com targets se suportado.',
      relatedService: 'alb'
    },
    {
      id: 33,
      topic: 'alb',
      question: 'Qual tamanho máximo de corpo de request no ALB?',
      context: 'Limite.',
      options: [
        { label: 'A', text: '1 MB' },
        { label: 'B', text: '10 MB' },
        { label: 'C', text: '100 MB' },
        { label: 'D', text: 'Ilimitado' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB limita corpo a 1 MB (aplica a Lambda targets também).',
      relatedService: 'alb'
    },
    {
      id: 34,
      topic: 'alb',
      question: 'Como habilitar acesso a ALB em redes on-prem via Direct Connect?',
      context: 'Híbrido.',
      options: [
        { label: 'A', text: 'ALB interno acessível pela VPC via DX/VPN' },
        { label: 'B', text: 'ALB público sem SG' },
        { label: 'C', text: 'Não suporta' },
        { label: 'D', text: 'Somente CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'Crie ALB interno e roteie via DX/VPN/peering.',
      relatedService: 'alb'
    },
    {
      id: 35,
      topic: 'alb',
      question: 'Como encaminhar tráfego para Lambda?',
      context: 'Serverless.',
      options: [
        { label: 'A', text: 'Criar target group de tipo Lambda e associar ao listener' },
        { label: 'B', text: 'Não suporta' },
        { label: 'C', text: 'Usar APIGW' },
        { label: 'D', text: 'Usar NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB pode invocar Lambda como target com payload HTTP.',
      relatedService: 'alb'
    },
    {
      id: 36,
      topic: 'alb',
      question: 'Qual ação de regra responde com redirecionamento 301/302?',
      context: 'Redirect.',
      options: [
        { label: 'A', text: 'Redirect action configurando código e destino' },
        { label: 'B', text: 'Fixed response' },
        { label: 'C', text: 'Forward' },
        { label: 'D', text: 'Authenticate' }
      ],
      correctAnswer: 'A',
      explanation: 'Redirect envia 301/302 para novo host/path/proto/port.',
      relatedService: 'alb'
    },
    {
      id: 37,
      topic: 'alb',
      question: 'ALB pode terminar TLS e encaminhar HTTP para backend?',
      context: 'Offload.',
      options: [
        { label: 'A', text: 'Sim, terminando TLS no listener e usando HTTP no target group' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Só TCP' },
        { label: 'D', text: 'Apenas pass-through' }
      ],
      correctAnswer: 'A',
      explanation: 'TLS offload é padrão; também pode usar TLS para backend se necessário.',
      relatedService: 'alb'
    },
    {
      id: 38,
      topic: 'alb',
      question: 'Como lidar com uploads longos em ALB?',
      context: 'Timeouts.',
      options: [
        { label: 'A', text: 'Ajustar idle timeout e, se preciso, usar S3 pre-signed URLs para upload direto' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Usar NLB sempre' },
        { label: 'D', text: 'Desativar SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Idle timeout maior ou offload upload para S3.',
      relatedService: 'alb'
    },
    {
      id: 39,
      topic: 'alb',
      question: 'Como registrar targets em uma conta diferente?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'Usar target type IP com peering/TGW; instâncias cross-account não podem ser registradas diretamente por ID' },
        { label: 'B', text: 'Registrar ID direto' },
        { label: 'C', text: 'Não suporta' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'Cross-account use IP targets acessíveis via rede privada.',
      relatedService: 'alb'
    },
    {
      id: 40,
      topic: 'alb',
      question: 'Qual é a métrica principal de tráfego no ALB?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'RequestCount' },
        { label: 'B', text: 'CPUUtilization' },
        { label: 'C', text: 'NetworkIn' },
        { label: 'D', text: 'Errors' }
      ],
      correctAnswer: 'A',
      explanation: 'RequestCount mede requisições processadas.',
      relatedService: 'alb'
    },
    {
      id: 41,
      topic: 'alb',
      question: 'Como habilitar acesso somente a partir de VPC endpoints (PrivateLink) para o ALB?',
      context: 'Acesso privado.',
      options: [
        { label: 'A', text: 'Criar NLB + PrivateLink ou usar ALB + AWS Global Accelerator? Para ALB especificamente, use NLB como front para PrivateLink' },
        { label: 'B', text: 'ALB suporta PrivateLink direto' },
        { label: 'C', text: 'Usar DNS' },
        { label: 'D', text: 'Não existe' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink é para NLB; para expor ALB via PrivateLink, coloque NLB na frente ou use GA + endpoints.',
      relatedService: 'alb'
    },
    {
      id: 42,
      topic: 'alb',
      question: 'Qual custo unitário principal do ALB?',
      context: 'Preço.',
      options: [
        { label: 'A', text: 'LCUs + horas de balancer' },
        { label: 'B', text: 'GB armazenados' },
        { label: 'C', text: 'Mensagens' },
        { label: 'D', text: 'Queries DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Cobrança por hora + LCU (request count, new connections, active connections, processed bytes).',
      relatedService: 'alb'
    },
    {
      id: 43,
      topic: 'alb',
      question: 'Como ver razões de 5xx gerados pelo ALB?',
      context: 'Troubleshoot.',
      options: [
        { label: 'A', text: 'Consultar error codes no TargetGroup e Access Logs do ALB' },
        { label: 'B', text: 'CloudTrail' },
        { label: 'C', text: 'DNS' },
        { label: 'D', text: 'Não há logs' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Logs detalham códigos e roteamentos; TG mostra health e códigos de retorno.',
      relatedService: 'alb'
    },
    {
      id: 44,
      topic: 'alb',
      question: 'ALB pode anexar SG aos targets?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'SG são nos targets/instâncias; ALB tem SG próprio' },
        { label: 'B', text: 'Somente ALB' },
        { label: 'C', text: 'Nenhum SG' },
        { label: 'D', text: 'NLB tem SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Instâncias/ENIs têm SG; ALB também tem SG separado.',
      relatedService: 'alb'
    },
    {
      id: 45,
      topic: 'alb',
      question: 'Como fazer blue/green com ALB?',
      context: 'Deploy.',
      options: [
        { label: 'A', text: 'Dois target groups com weights ou dois ALBs no Route 53/CloudFront' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Trocar SG' },
        { label: 'D', text: 'Somente DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Use forward com pesos ou múltiplos TGs para blue/green.',
      relatedService: 'alb'
    },
    {
      id: 46,
      topic: 'alb',
      question: 'Como limitar tamanho de upload sem tocar no app?',
      context: 'Rejeitar grande.',
      options: [
        { label: 'A', text: 'Usar AWS WAF rule de size constraint' },
        { label: 'B', text: 'N/A' },
        { label: 'C', text: 'Mudar DNS' },
        { label: 'D', text: 'Stickiness' }
      ],
      correctAnswer: 'A',
      explanation: 'WAF size constraints bloqueiam requests grandes.',
      relatedService: 'alb'
    },
    {
      id: 47,
      topic: 'alb',
      question: 'Qual status o ALB retorna se todos targets estão unhealthy?',
      context: 'Erro.',
      options: [
        { label: 'A', text: '503 Service Unavailable' },
        { label: 'B', text: '200' },
        { label: 'C', text: '301' },
        { label: 'D', text: '403' }
      ],
      correctAnswer: 'A',
      explanation: '503 indica sem targets saudáveis.',
      relatedService: 'alb'
    },
    {
      id: 48,
      topic: 'alb',
      question: 'Qual é a função do “slow start mode”?',
      context: 'Proteção backend.',
      options: [
        { label: 'A', text: 'Gradualmente aumenta tráfego para novos targets' },
        { label: 'B', text: 'Reduz TLS' },
        { label: 'C', text: 'Configura WAF' },
        { label: 'D', text: 'Define idle timeout' }
      ],
      correctAnswer: 'A',
      explanation: 'Slow start evita sobrecarga de instâncias recém-adicionadas.',
      relatedService: 'alb'
    },
    {
      id: 49,
      topic: 'alb',
      question: 'Como depurar roteamento errado de path?',
      context: 'Debug.',
      options: [
        { label: 'A', text: 'Verificar ordem/prioridade de regras e testar com ferramenta Rules evaluation no console' },
        { label: 'B', text: 'Alterar DNS' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Regras são avaliadas por prioridade; console ajuda a simular.',
      relatedService: 'alb'
    },
    {
      id: 50,
      topic: 'alb',
      question: 'Health checks do ALB contam com que intervalo padrão?',
      context: 'Defaults.',
      options: [
        { label: 'A', text: '30s intervalo, 5 unhealthy/healthy thresholds (padrão)' },
        { label: 'B', text: '5s' },
        { label: 'C', text: '300s' },
        { label: 'D', text: 'Não configurável' }
      ],
      correctAnswer: 'A',
      explanation: 'Default é 30s e thresholds de 5; ajustável.',
      relatedService: 'alb'
    },
    {
      id: 51,
      topic: 'alb',
      question: 'Como forçar checagem HTTPS para backend?',
      context: 'TLS backend.',
      options: [
        { label: 'A', text: 'Configurar health check protocol = HTTPS e target protocol HTTPS' },
        { label: 'B', text: 'Não pode' },
        { label: 'C', text: 'Usar NLB' },
        { label: 'D', text: 'Usar SG' }
      ],
      correctAnswer: 'A',
      explanation: 'Health e tráfego podem ser HTTPS para backend.',
      relatedService: 'alb'
    },
    {
      id: 52,
      topic: 'alb',
      question: 'O que é “connection termination” no ALB?',
      context: 'Segurança TLS.',
      options: [
        { label: 'A', text: 'TLS offload encerra sessão TLS no LB e abre nova com backend' },
        { label: 'B', text: 'Fecha conexão à força' },
        { label: 'C', text: 'N/A' },
        { label: 'D', text: 'Remove SG' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB encerra TLS e repassa tráfego descriptografado ou recriptografado.',
      relatedService: 'alb'
    },
    {
      id: 53,
      topic: 'alb',
      question: 'Como identificar target que retorna 502/504?',
      context: 'Erro backend.',
      options: [
        { label: 'A', text: 'Ver Access Logs para TargetStatusCode/TargetStatusReason' },
        { label: 'B', text: 'CloudTrail' },
        { label: 'C', text: 'DNS' },
        { label: 'D', text: 'Não dá' }
      ],
      correctAnswer: 'A',
      explanation: 'Access logs mostram status de target e tempo de resposta.',
      relatedService: 'alb'
    },
    {
      id: 54,
      topic: 'alb',
      question: 'ALB suporta HTTP/3?',
      context: 'Protocolo.',
      options: [
        { label: 'A', text: 'Ainda não; use CloudFront para HTTP/3' },
        { label: 'B', text: 'Sim nativamente' },
        { label: 'C', text: 'Somente NLB' },
        { label: 'D', text: 'Somente CLB' }
      ],
      correctAnswer: 'A',
      explanation: 'HTTP/3 não é suportado diretamente pelo ALB (até o momento).',
      relatedService: 'alb'
    },
    {
      id: 55,
      topic: 'alb',
      question: 'Como habilitar logs de acesso?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Ativar Access Logs para S3 ou Kinesis Data Firehose (ALB/NLB)' },
        { label: 'B', text: 'CloudTrail' },
        { label: 'C', text: 'Não há logs' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'Access Logs registram requisições; podem ir para S3/Firehose.',
      relatedService: 'alb'
    },
    {
      id: 56,
      topic: 'alb',
      question: 'Como permitir HTTP/2 para clientes mas HTTP/1.1 para backend?',
      context: 'Protocolos diferentes.',
      options: [
        { label: 'A', text: 'ALB negocia HTTP/2 com clientes e HTTP/1.1 com targets por padrão' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Precisa NLB' },
        { label: 'D', text: 'Precisa gRPC' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB faz downgrade/up conforme target suporta.',
      relatedService: 'alb'
    },
    {
      id: 57,
      topic: 'alb',
      question: 'ALB pode ouvir porta 80 e 443 simultaneamente?',
      context: 'Múltiplos listeners.',
      options: [
        { label: 'A', text: 'Sim, vários listeners são suportados' },
        { label: 'B', text: 'Somente um listener' },
        { label: 'C', text: 'Somente 443' },
        { label: 'D', text: 'Somente 80' }
      ],
      correctAnswer: 'A',
      explanation: 'Vários listeners com regras distintas são permitidos.',
      relatedService: 'alb'
    },
    {
      id: 58,
      topic: 'alb',
      question: 'Como expor mesma aplicação em múltiplos domínios com certificados diferentes?',
      context: 'Multi-domain.',
      options: [
        { label: 'A', text: 'Usar SNI com múltiplos certs e host-based rules' },
        { label: 'B', text: 'Um ALB por domínio' },
        { label: 'C', text: 'Não possível' },
        { label: 'D', text: 'Route 53 apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'SNI + host rules suportam múltiplos domínios num ALB.',
      relatedService: 'alb'
    },
    {
      id: 59,
      topic: 'alb',
      question: 'Como lidar com sticky sessions para WebSockets?',
      context: 'Afinidade.',
      options: [
        { label: 'A', text: 'WebSockets mantém conexão, então stickiness não se aplica; use scale horizontal e session store' },
        { label: 'B', text: 'Precisa cookie' },
        { label: 'C', text: 'Não suporta WebSocket' },
        { label: 'D', text: 'Somente NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'WebSocket mantém conexão; persistência fica na própria conexão.',
      relatedService: 'alb'
    },
    {
      id: 60,
      topic: 'alb',
      question: 'Como proteger endpoints administrativos no ALB?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Rules com condition de path + IP allowlist ou auth Cognito/OIDC' },
        { label: 'B', text: 'Abrir para todos' },
        { label: 'C', text: 'Usar DNS' },
        { label: 'D', text: 'Mudar health check' }
      ],
      correctAnswer: 'A',
      explanation: 'Use condições de IP, auth e WAF para rotas sensíveis.',
      relatedService: 'alb'
    },
    {
      id: 61,
      topic: 'alb',
      question: 'Pode-se definir peso zero em um target group?',
      context: 'Canário.',
      options: [
        { label: 'A', text: 'Sim, peso 0 remove tráfego enquanto mantém registro' },
        { label: 'B', text: 'Não' },
        { label: 'C', text: 'Só peso 1' },
        { label: 'D', text: 'Só peso 100' }
      ],
      correctAnswer: 'A',
      explanation: 'Forward action permite peso 0 para TG secundário.',
      relatedService: 'alb'
    },
    {
      id: 62,
      topic: 'alb',
      question: 'Como expor métricas detalhadas do ALB?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'CloudWatch métricas padrão + access logs; usar Metrics Insights para análises' },
        { label: 'B', text: 'Não há métricas' },
        { label: 'C', text: 'Somente S3' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudWatch oferece métricas de tráfego/latência/erros; logs dão detalhes.',
      relatedService: 'alb'
    },
    {
      id: 63,
      topic: 'alb',
      question: 'Como servir estático e API via um ALB atrás do CloudFront?',
      context: 'CDN + ALB.',
      options: [
        { label: 'A', text: 'CloudFront aponta para ALB; ALB roteia por path/host para TGs' },
        { label: 'B', text: 'Não pode' },
        { label: 'C', text: 'Precisa dois ALBs' },
        { label: 'D', text: 'Route 53 apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'CF → ALB; ALB faz roteamento L7 interno.',
      relatedService: 'alb'
    },
    {
      id: 64,
      topic: 'alb',
      question: 'Como lidar com headers grandes em OIDC (JWT)?',
      context: 'Limites.',
      options: [
        { label: 'A', text: 'Garantir tokens menores que limite de header (16 KB) ou usar cookies/sessions menores' },
        { label: 'B', text: 'Sem limite' },
        { label: 'C', text: 'Usar NLB' },
        { label: 'D', text: 'Usar FTP' }
      ],
      correctAnswer: 'A',
      explanation: 'Tokens muito grandes podem exceder limite; reduza claims.',
      relatedService: 'alb'
    },
    {
      id: 65,
      topic: 'alb',
      question: 'ALB pode estar em subnets públicas e privadas ao mesmo tempo?',
      context: 'Design.',
      options: [
        { label: 'A', text: 'ALB requer subnets em pelo menos duas AZs; cada subnet deve ter rotas para clientes (pública ou privada via endpoints)' },
        { label: 'B', text: 'Apenas públicas' },
        { label: 'C', text: 'Apenas privadas' },
        { label: 'D', text: 'Uma subnet basta' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB precisa subnets em 2+ AZs; podem ser públicas (internet-facing) ou privadas (internal).',
      relatedService: 'alb'
    },
    {
      id: 66,
      topic: 'alb',
      question: 'Como bloquear HTTP verbs específicos?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Rule condition de method ou WAF com regra de métodos permitidos' },
        { label: 'B', text: 'Não pode' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Regras podem checar método; WAF também controla.',
      relatedService: 'alb'
    },
    {
      id: 67,
      topic: 'alb',
      question: 'Qual header contém porta original do cliente?',
      context: 'Porta.',
      options: [
        { label: 'A', text: 'X-Forwarded-Port' },
        { label: 'B', text: 'X-Proto-Port' },
        { label: 'C', text: 'Host' },
        { label: 'D', text: 'Cookie' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB adiciona X-Forwarded-Port.',
      relatedService: 'alb'
    },
    {
      id: 68,
      topic: 'alb',
      question: 'Como usar ALB com ECS Fargate?',
      context: 'Containers.',
      options: [
        { label: 'A', text: 'Service type EC2/Fargate com target type IP e dynamic port mapping' },
        { label: 'B', text: 'Não funciona' },
        { label: 'C', text: 'Somente NLB' },
        { label: 'D', text: 'Só EC2' }
      ],
      correctAnswer: 'A',
      explanation: 'Fargate registra tasks por IP/porta no ALB.',
      relatedService: 'alb'
    },
    {
      id: 69,
      topic: 'alb',
      question: 'Como reduzir latência global com ALB?',
      context: 'Usuários globais.',
      options: [
        { label: 'A', text: 'Usar CloudFront ou Global Accelerator na frente do ALB' },
        { label: 'B', text: 'ALB é global' },
        { label: 'C', text: 'Criar DNS round-robin apenas' },
        { label: 'D', text: 'Nada a fazer' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB é regional; use CF/GA para edge/anycast.',
      relatedService: 'alb'
    },
    {
      id: 70,
      topic: 'alb',
      question: 'Como proteger backends que não aceitam tráfego direto da internet?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'ALB interno em subnets privadas; SG permitindo somente ALB SG' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'N/A' },
        { label: 'D', text: 'Usar CLB' }
      ],
      correctAnswer: 'A',
      explanation: 'SG dos targets deve permitir apenas SG do ALB.',
      relatedService: 'alb'
    },
    {
      id: 71,
      topic: 'alb',
      question: 'ALB consegue fazer passthrough de TLS sem terminação?',
      context: 'Pass-through.',
      options: [
        { label: 'A', text: 'Não; para pass-through TLS use NLB' },
        { label: 'B', text: 'Sim' },
        { label: 'C', text: 'Somente CLB' },
        { label: 'D', text: 'Com IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB sempre processa L7; pass-through é NLB.',
      relatedService: 'alb'
    },
    {
      id: 72,
      topic: 'alb',
      question: 'Qual porta usar para health check customizado?',
      context: 'Porta HC.',
      options: [
        { label: 'A', text: 'Porta do target ou override específica no TG' },
        { label: 'B', text: 'Sempre 80' },
        { label: 'C', text: 'Sempre 443' },
        { label: 'D', text: 'Não configurável' }
      ],
      correctAnswer: 'A',
      explanation: 'Pode usar “traffic port” ou porta fixa para health check.',
      relatedService: 'alb'
    },
    {
      id: 73,
      topic: 'alb',
      question: 'Como lidar com uploads chunked e timeouts?',
      context: 'Streaming.',
      options: [
        { label: 'A', text: 'Ajustar idle timeout e considerar NLB se protocolo não HTTP' },
        { label: 'B', text: 'Não há solução' },
        { label: 'C', text: 'Desligar TLS' },
        { label: 'D', text: 'Trocar path' }
      ],
      correctAnswer: 'A',
      explanation: 'Idle timeout precisa cobrir uploads chunked.',
      relatedService: 'alb'
    },
    {
      id: 74,
      topic: 'alb',
      question: 'Como verificar se stickiness está funcionando?',
      context: 'Debug.',
      options: [
        { label: 'A', text: 'Observar cookie AWSALB/AWSALBTG e logs; testar com requisições repetidas' },
        { label: 'B', text: 'CloudTrail' },
        { label: 'C', text: 'DNS' },
        { label: 'D', text: 'Não tem como' }
      ],
      correctAnswer: 'A',
      explanation: 'Cookies de stickiness e logs confirmam afinidade.',
      relatedService: 'alb'
    },
    {
      id: 75,
      topic: 'alb',
      question: 'Como lidar com mutual TLS no ALB?',
      context: 'mTLS.',
      options: [
        { label: 'A', text: 'ALB não suporta mTLS nativo; usar NLB+TLS pass-through ou API Gateway/CloudFront com mTLS' },
        { label: 'B', text: 'ALB suporta mTLS nativo' },
        { label: 'C', text: 'Usar SG' },
        { label: 'D', text: 'Não precisa' }
      ],
      correctAnswer: 'A',
      explanation: 'Para mTLS, use soluções que suportam client cert validation.',
      relatedService: 'alb'
    },
    {
      id: 76,
      topic: 'alb',
      question: 'Como diminuir erros 504 Gateway Timeout?',
      context: 'Timeout backend.',
      options: [
        { label: 'A', text: 'Aumentar idle timeout ou otimizar backend/health checks' },
        { label: 'B', text: 'Trocar DNS' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'Não há' }
      ],
      correctAnswer: 'A',
      explanation: '504 ocorre quando backend não responde; ajustar timeout e app.',
      relatedService: 'alb'
    },
    {
      id: 77,
      topic: 'alb',
      question: 'Como forçar TLS 1.2+ no ALB?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Selecionar política de segurança TLS que permita apenas TLS1.2/1.3' },
        { label: 'B', text: 'Não controlável' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'A',
      explanation: 'TLS security policies definem versões/ciphers.',
      relatedService: 'alb'
    },
    {
      id: 78,
      topic: 'alb',
      question: 'Como lidar com handshake de certificado para múltiplos domínios?',
      context: 'SNI.',
      options: [
        { label: 'A', text: 'Usar múltiplos certs em listener com SNI; require clients com SNI' },
        { label: 'B', text: 'Não suporta' },
        { label: 'C', text: 'Um cert apenas' },
        { label: 'D', text: 'Usar NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'SNI entrega cert adequado ao host.',
      relatedService: 'alb'
    },
    {
      id: 79,
      topic: 'alb',
      question: 'ALB pode ouvir em portas não padrão (ex: 8443)?',
      context: 'Portas custom.',
      options: [
        { label: 'A', text: 'Sim, listeners em qualquer porta suportada' },
        { label: 'B', text: 'Só 80/443' },
        { label: 'C', text: 'Só 25' },
        { label: 'D', text: 'Não' }
      ],
      correctAnswer: 'A',
      explanation: 'Pode criar listeners customizados.',
      relatedService: 'alb'
    },
    {
      id: 80,
      topic: 'alb',
      question: 'Como proteger ALB contra tráfego malicioso volumétrico?',
      context: 'DDoS.',
      options: [
        { label: 'A', text: 'Shield Standard (automático) ou Shield Advanced + WAF rate limiting' },
        { label: 'B', text: 'N/A' },
        { label: 'C', text: 'Mudar SG' },
        { label: 'D', text: 'DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'Shield + WAF mitigam DDoS/L7.',
      relatedService: 'alb'
    },
    {
      id: 81,
      topic: 'alb',
      question: 'Como depurar health check falhando?',
      context: 'HC.',
      options: [
        { label: 'A', text: 'Ver path/porta/protocolo, SG, NACL, logs do app e Access Logs' },
        { label: 'B', text: 'Mudar DNS' },
        { label: 'C', text: 'Usar FTP' },
        { label: 'D', text: 'Não há' }
      ],
      correctAnswer: 'A',
      explanation: 'Confirme SG, path correto e resposta 200/302 etc.',
      relatedService: 'alb'
    },
    {
      id: 82,
      topic: 'alb',
      question: 'Como setar tempo mínimo de inatividade antes de remover target?',
      context: 'Drain.',
      options: [
        { label: 'A', text: 'Configurar deregistration delay no target group (0-3600s)' },
        { label: 'B', text: 'Não configurável' },
        { label: 'C', text: 'DNS TTL' },
        { label: 'D', text: 'Idle timeout' }
      ],
      correctAnswer: 'A',
      explanation: 'Deregistration delay controla drain.',
      relatedService: 'alb'
    },
    {
      id: 83,
      topic: 'alb',
      question: 'ALB suporta custom cipher suites?',
      context: 'TLS.',
      options: [
        { label: 'A', text: 'Escolher security policy pré-definida; não é possível customizar suites individuais' },
        { label: 'B', text: 'Lista custom' },
        { label: 'C', text: 'Sem TLS' },
        { label: 'D', text: 'TLS só 1.0' }
      ],
      correctAnswer: 'A',
      explanation: 'Selecione política; não dá para definir suite manualmente.',
      relatedService: 'alb'
    },
    {
      id: 84,
      topic: 'alb',
      question: 'Como expor métricas por target?',
      context: 'Per-target.',
      options: [
        { label: 'A', text: 'CloudWatch métricas por target group; para cada target, use Access Logs ou métricas da aplicação' },
        { label: 'B', text: 'Não possível' },
        { label: 'C', text: 'Route 53' },
        { label: 'D', text: 'CloudTrail' }
      ],
      correctAnswer: 'A',
      explanation: 'CW oferece métricas por TG; detalhes por target via logs.',
      relatedService: 'alb'
    },
    {
      id: 85,
      topic: 'alb',
      question: 'Como permitir somente certos CIDRs de origem?',
      context: 'Restrição.',
      options: [
        { label: 'A', text: 'Usar SG com allowlist e/ou rules com condition de IP + WAF' },
        { label: 'B', text: 'ALB não filtra' },
        { label: 'C', text: 'NACL apenas' },
        { label: 'D', text: 'DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'SG e WAF controlam IPs permitidos.',
      relatedService: 'alb'
    },
    {
      id: 86,
      topic: 'alb',
      question: 'Como fazer canário 10/90 usando ALB apenas?',
      context: 'Release.',
      options: [
        { label: 'A', text: 'Forward action com weights 10 e 90 entre dois TGs' },
        { label: 'B', text: 'Não pode' },
        { label: 'C', text: 'Precisa Route 53' },
        { label: 'D', text: 'Precisa NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'Weights permitem canário sem DNS.',
      relatedService: 'alb'
    },
    {
      id: 87,
      topic: 'alb',
      question: 'Como lidar com rota /health que deve ser pública mas app privado?',
      context: 'Roteamento.',
      options: [
        { label: 'A', text: 'Rule específica para /health com forward para TG público ou fixed response; demais paths autenticados' },
        { label: 'B', text: 'Abrir tudo' },
        { label: 'C', text: 'Remover SG' },
        { label: 'D', text: 'Não dá' }
      ],
      correctAnswer: 'A',
      explanation: 'Regras permitem tratamento diferenciado por path.',
      relatedService: 'alb'
    },
    {
      id: 88,
      topic: 'alb',
      question: 'Como enviar cabeçalhos adicionais ao backend?',
      context: 'Headers.',
      options: [
        { label: 'A', text: 'Adicionar headers custom na forward action do ALB' },
        { label: 'B', text: 'Não pode' },
        { label: 'C', text: 'Precisa Lambda' },
        { label: 'D', text: 'Precisa NLB' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB rule pode inserir headers estáticos.',
      relatedService: 'alb'
    },
    {
      id: 89,
      topic: 'alb',
      question: 'Como observar latência por target group?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'Métrica TargetResponseTime por TG no CloudWatch' },
        { label: 'B', text: 'CPU do ALB' },
        { label: 'C', text: 'DNS' },
        { label: 'D', text: 'Não há' }
      ],
      correctAnswer: 'A',
      explanation: 'TargetResponseTime mede latência backend.',
      relatedService: 'alb'
    },
    {
      id: 90,
      topic: 'alb',
      question: 'Como reduzir impacto de picos de conexões no custo LCU?',
      context: 'Otimização.',
      options: [
        { label: 'A', text: 'Habilitar keep-alive/HTTP2, comprimir respostas, otimizar tamanho de payload e conexões por segundo' },
        { label: 'B', text: 'Não há ação' },
        { label: 'C', text: 'Usar CLB sempre' },
        { label: 'D', text: 'Mudar DNS' }
      ],
      correctAnswer: 'A',
      explanation: 'LCU considera new/active connections e bytes; otimizações reduzem custo.',
      relatedService: 'alb'
    }
  ],

  sqs: [
    {
      id: 1,
      topic: 'sqs',
      question: 'Qual é o principal caso de uso do Amazon SQS?',
      context: 'Arquitetura de microservices.',
      options: [
        { label: 'A', text: 'Armazenamento de dados' },
        { label: 'B', text: 'Desacoplamento de componentes via filas de mensagens' },
        { label: 'C', text: 'Balanceamento de carga' },
        { label: 'D', text: 'DNS management' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS é serviço de filas (message queuing). Desacopla produtores de consumidores: producer envia mensagem para fila, consumer processa quando estiver pronto. Resiliência a falhas temporárias, processamento assíncrono.',
      relatedService: 'sqs'
    },
    {
      id: 2,
      topic: 'sqs',
      question: 'Qual a diferença entre SQS Standard e FIFO queue?',
      context: 'Escolhendo tipo de fila.',
      options: [
        { label: 'A', text: 'Standard é mais barato mas sem ordem; FIFO garante ordem e exactly-once' },
        { label: 'B', text: 'São idênticas' },
        { label: 'C', text: 'FIFO é mais rápida' },
        { label: 'D', text: 'Standard só funciona em uma região' }
      ],
      correctAnswer: 'A',
      explanation: 'Standard: throughput ilimitado, best-effort ordering, at-least-once delivery (pode duplicar). FIFO: até 3000 msg/s, garante ordem exata, exactly-once processing, mais caro. Use FIFO quando ordem é crítica (ex: transações financeiras).',
      relatedService: 'sqs'
    },
    {
      id: 3,
      topic: 'sqs',
      question: 'O que é visibility timeout no SQS?',
      context: 'Consumidor lê mensagem e precisa de tempo para processar.',
      options: [
        { label: 'A', text: 'Tempo antes da mensagem expirar' },
        { label: 'B', text: 'Janela em que a mensagem fica invisível após ser lida' },
        { label: 'C', text: 'Tempo de retenção total' },
        { label: 'D', text: 'Tempo de polling mínimo' }
      ],
      correctAnswer: 'B',
      explanation: 'Visibility timeout esconde a mensagem de outros consumers após o receive. Se o processamento termina, apaga a mensagem; se não, volta a ficar visível.',
      relatedService: 'sqs'
    },
    {
      id: 4,
      topic: 'sqs',
      question: 'Quando usar long polling em vez de short polling?',
      context: 'Reduzir custo de chamadas vazias.',
      options: [
        { label: 'A', text: 'Quando precisa de respostas imediatas mesmo sem mensagens' },
        { label: 'B', text: 'Quando quer esperar até 20s por novas mensagens' },
        { label: 'C', text: 'Quando a fila é FIFO apenas' },
        { label: 'D', text: 'Quando usa DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Long polling (WaitTimeSeconds até 20s) evita retornos vazios e reduz custo/latência média. Short polling retorna imediatamente.',
      relatedService: 'sqs'
    },
    {
      id: 5,
      topic: 'sqs',
      question: 'Qual é o tamanho máximo de mensagem no SQS?',
      context: 'Envio de payloads grandes.',
      options: [
        { label: 'A', text: '64 KB' },
        { label: 'B', text: '256 KB' },
        { label: 'C', text: '1 MB' },
        { label: 'D', text: '5 MB' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS suporta até 256 KB por mensagem. Para maiores, use S3 + payload pointer.',
      relatedService: 'sqs'
    },
    {
      id: 6,
      topic: 'sqs',
      question: 'Como lidar com mensagens maiores que 256 KB?',
      context: 'Upload de arquivos grandes.',
      options: [
        { label: 'A', text: 'Ativar jumbo frames' },
        { label: 'B', text: 'Guardar conteúdo no S3 e enviar apenas o ponteiro/URL na mensagem' },
        { label: 'C', text: 'Habilitar modo large payload no console' },
        { label: 'D', text: 'Dividir em múltiplas filas' }
      ],
      correctAnswer: 'B',
      explanation: 'Padrão é armazenar payload no S3 e colocar referência na mensagem. Reduce custo e contorna limite de 256 KB.',
      relatedService: 'sqs'
    },
    {
      id: 7,
      topic: 'sqs',
      question: 'Para que serve um DLQ (Dead-Letter Queue)?',
      context: 'Mensagens falhando repetidamente.',
      options: [
        { label: 'A', text: 'Acelerar o processamento' },
        { label: 'B', text: 'Guardar mensagens que excederam tentativas/reprocessamentos' },
        { label: 'C', text: 'Forçar exactly-once' },
        { label: 'D', text: 'Criptografar mensagens' }
      ],
      correctAnswer: 'B',
      explanation: 'DLQ recebe mensagens que falharam além do maxReceiveCount para análise e reprocessamento manual.',
      relatedService: 'sqs'
    },
    {
      id: 8,
      topic: 'sqs',
      question: 'O que define o maxReceiveCount em uma redrive policy?',
      context: 'Configuração de DLQ.',
      options: [
        { label: 'A', text: 'Tentativas totais antes de excluir a fila' },
        { label: 'B', text: 'Número de receives antes de mover a mensagem para DLQ' },
        { label: 'C', text: 'Número de producers permitidos' },
        { label: 'D', text: 'Tempo máximo de retenção' }
      ],
      correctAnswer: 'B',
      explanation: 'maxReceiveCount controla quantas vezes a mensagem pode ser recebida sem sucesso. Ao exceder, vai para a DLQ.',
      relatedService: 'sqs'
    },
    {
      id: 9,
      topic: 'sqs',
      question: 'Como evitar processamento duplicado em Standard queues?',
      context: 'Aplicação idempotente.',
      options: [
        { label: 'A', text: 'Desativar long polling' },
        { label: 'B', text: 'Implementar idempotência na aplicação (dedup keys ou armazenar processed IDs)' },
        { label: 'C', text: 'Migrar para SNS' },
        { label: 'D', text: 'Usar apenas 1 consumidor' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard pode entregar mais de uma vez. Idempotência na aplicação evita efeitos colaterais (ex: checar transaction ID).',
      relatedService: 'sqs'
    },
    {
      id: 10,
      topic: 'sqs',
      question: 'FIFO queues garantem qual comportamento?',
      context: 'Ordem de mensagens.',
      options: [
        { label: 'A', text: 'Best-effort ordering' },
        { label: 'B', text: 'Exactly-once e ordem estrita por MessageGroupId' },
        { label: 'C', text: 'Apenas at-least-once' },
        { label: 'D', text: 'Entrega em lote apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'FIFO usa MessageGroupId para ordenar mensagens dentro do grupo com exactly-once processing.',
      relatedService: 'sqs'
    },
    {
      id: 11,
      topic: 'sqs',
      question: 'Para que serve MessageGroupId em FIFO?',
      context: 'Controle de ordenação.',
      options: [
        { label: 'A', text: 'Escolher DLQ' },
        { label: 'B', text: 'Definir partição lógica para ordenar e paralelizar' },
        { label: 'C', text: 'Criptografar mensagem' },
        { label: 'D', text: 'Definir TTL' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageGroupId agrupa mensagens que precisam de ordem estrita. Grupos diferentes podem processar em paralelo.',
      relatedService: 'sqs'
    },
    {
      id: 12,
      topic: 'sqs',
      question: 'O que é deduplication id em FIFO?',
      context: 'Evitar duplicados em 5 minutos.',
      options: [
        { label: 'A', text: 'Chave para ordenar mensagens' },
        { label: 'B', text: 'Token de idempotência para descartar duplicados dentro da janela de dedupe' },
        { label: 'C', text: 'Identificador de fila' },
        { label: 'D', text: 'Checksum de corpo' }
      ],
      correctAnswer: 'B',
      explanation: 'DeduplicationId evita reenvio do mesmo evento no período de dedupe (5 minutos). Pode ser automático por corpo ou definido.',
      relatedService: 'sqs'
    },
    {
      id: 13,
      topic: 'sqs',
      question: 'Qual throughput base de uma FIFO queue com batching?',
      context: 'Limites padrão.',
      options: [
        { label: 'A', text: '300 msg/s' },
        { label: 'B', text: '3000 msg/s com batching' },
        { label: 'C', text: '50 msg/s' },
        { label: 'D', text: 'Ilimitado' }
      ],
      correctAnswer: 'B',
      explanation: 'FIFO padrão: 300 msg/s sem batching; com batch (até 10) chega a 3000 msg/s. Pode escalar com throughput mode alto.',
      relatedService: 'sqs'
    },
    {
      id: 14,
      topic: 'sqs',
      question: 'Quando usar high throughput FIFO?',
      context: 'Necessidade de mais de 3000 msg/s.',
      options: [
        { label: 'A', text: 'Quando quer ordenação parcial com múltiplos grupos e mais throughput' },
        { label: 'B', text: 'Quando não precisa de ordem' },
        { label: 'C', text: 'Quando fila é Standard' },
        { label: 'D', text: 'Quando não usa batching' }
      ],
      correctAnswer: 'A',
      explanation: 'High throughput FIFO aumenta TPS mantendo ordem por MessageGroupId. Usa dedupe por hash do corpo se não definido.',
      relatedService: 'sqs'
    },
    {
      id: 15,
      topic: 'sqs',
      question: 'O que faz DelaySeconds em uma fila?',
      context: 'Processamento diferido.',
      options: [
        { label: 'A', text: 'Expira mensagens' },
        { label: 'B', text: 'Atraso inicial na entrega de todas as mensagens' },
        { label: 'C', text: 'Aumenta prioridade' },
        { label: 'D', text: 'Reduz custo' }
      ],
      correctAnswer: 'B',
      explanation: 'DelaySeconds aplica atraso global (até 15 min) para entrega inicial. Pode ser por fila ou por mensagem.',
      relatedService: 'sqs'
    },
    {
      id: 16,
      topic: 'sqs',
      question: 'Como expirar mensagens não processadas em X dias?',
      context: 'Retenção de mensagens.',
      options: [
        { label: 'A', text: 'Visibility timeout' },
        { label: 'B', text: 'MessageRetentionPeriod da fila (1 minuto a 14 dias)' },
        { label: 'C', text: 'Deduplication window' },
        { label: 'D', text: 'MaxReceiveCount' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageRetentionPeriod define quanto tempo a mensagem fica armazenada antes de expirar.',
      relatedService: 'sqs'
    },
    {
      id: 17,
      topic: 'sqs',
      question: 'Como reduzir custo por requisição?',
      context: 'Otimização financeira.',
      options: [
        { label: 'A', text: 'Usar short polling' },
        { label: 'B', text: 'Usar long polling e ReceiveMessageWaitTimeSeconds' },
        { label: 'C', text: 'Desabilitar DLQ' },
        { label: 'D', text: 'Usar apenas FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Long polling reduz chamadas vazias, diminuindo requisições cobradas.',
      relatedService: 'sqs'
    },
    {
      id: 18,
      topic: 'sqs',
      question: 'Qual feature oferece criptografia em repouso?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Client-side apenas' },
        { label: 'B', text: 'SSE com AWS KMS (SSE-SQS)' },
        { label: 'C', text: 'SGs' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'SSE-SQS usa KMS para criptografar mensagens em repouso automaticamente.',
      relatedService: 'sqs'
    },
    {
      id: 19,
      topic: 'sqs',
      question: 'Como controlar quem pode enviar/receber da fila?',
      context: 'Autorização.',
      options: [
        { label: 'A', text: 'Apenas SGs' },
        { label: 'B', text: 'IAM policies e queue policy (resource-based)' },
        { label: 'C', text: 'NACLs' },
        { label: 'D', text: 'Somente via console' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS usa IAM e resource policies para permitir/nega ações SendMessage, ReceiveMessage etc.',
      relatedService: 'sqs'
    },
    {
      id: 20,
      topic: 'sqs',
      question: 'Como expor SQS para outra conta com segurança?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'Compartilhar senha' },
        { label: 'B', text: 'Queue policy allow principal da outra conta' },
        { label: 'C', text: 'Copiar a fila' },
        { label: 'D', text: 'Usar NLB' }
      ],
      correctAnswer: 'B',
      explanation: 'Queue policy resource-based permite acesso cross-account para ações específicas.',
      relatedService: 'sqs'
    },
    {
      id: 21,
      topic: 'sqs',
      question: 'Como diminuir a chance de mensagens presas em invisibilidade longa?',
      context: 'Visibility muito alto.',
      options: [
        { label: 'A', text: 'Aumentar retention' },
        { label: 'B', text: 'Usar ChangeMessageVisibility para reduzir se necessário' },
        { label: 'C', text: 'Desativar long polling' },
        { label: 'D', text: 'Usar SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'ChangeMessageVisibility permite ajustar o timeout dinamicamente para evitar bloqueio longo.',
      relatedService: 'sqs'
    },
    {
      id: 22,
      topic: 'sqs',
      question: 'Qual métrica monitora mensagens visíveis na fila?',
      context: 'CloudWatch.',
      options: [
        { label: 'A', text: 'NumberOfMessagesSent' },
        { label: 'B', text: 'ApproximateNumberOfMessagesVisible' },
        { label: 'C', text: 'ApproximateNumberOfMessagesNotVisible' },
        { label: 'D', text: 'AgeOfOldestMessage' }
      ],
      correctAnswer: 'B',
      explanation: 'ApproximateNumberOfMessagesVisible mostra quantas mensagens estão prontas para consumo.',
      relatedService: 'sqs'
    },
    {
      id: 23,
      topic: 'sqs',
      question: 'Qual métrica indica mensagens em processamento (in-flight)?',
      context: 'Visibilidade.',
      options: [
        { label: 'A', text: 'ApproximateNumberOfMessagesNotVisible' },
        { label: 'B', text: 'NumberOfEmptyReceives' },
        { label: 'C', text: 'NumberOfMessagesDeleted' },
        { label: 'D', text: 'NumberOfMessagesSent' }
      ],
      correctAnswer: 'A',
      explanation: 'NotVisible indica mensagens recebidas mas não deletadas (em processamento).',
      relatedService: 'sqs'
    },
    {
      id: 24,
      topic: 'sqs',
      question: 'Qual métrica usar para alarmar quando há atraso?',
      context: 'Backlog crescente.',
      options: [
        { label: 'A', text: 'AgeOfOldestMessage' },
        { label: 'B', text: 'NumberOfMessagesDeleted' },
        { label: 'C', text: 'ApproximateNumberOfMessagesNotVisible' },
        { label: 'D', text: 'DeliveryAttempts' }
      ],
      correctAnswer: 'A',
      explanation: 'AgeOfOldestMessage mostra a mensagem mais antiga em segundos. Bom para detectar fila atrasada.',
      relatedService: 'sqs'
    },
    {
      id: 25,
      topic: 'sqs',
      question: 'Como acionar Lambda automaticamente ao chegar mensagem?',
      context: 'Event-driven.',
      options: [
        { label: 'A', text: 'CloudWatch Events' },
        { label: 'B', text: 'Trigger direto de SQS em Lambda' },
        { label: 'C', text: 'SNS apenas' },
        { label: 'D', text: 'API Gateway' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda pode ser configurada como event source de SQS, gerenciando polling e batch automaticamente.',
      relatedService: 'sqs'
    },
    {
      id: 26,
      topic: 'sqs',
      question: 'Qual vantagem de usar batch no ReceiveMessage/SendMessage?',
      context: 'Custo e throughput.',
      options: [
        { label: 'A', text: 'Aumenta latência sempre' },
        { label: 'B', text: 'Reduz custo por unidade e melhora throughput' },
        { label: 'C', text: 'Desabilita long polling' },
        { label: 'D', text: 'Exige FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Batch até 10 mensagens diminui chamadas e custo, melhorando throughput.',
      relatedService: 'sqs'
    },
    {
      id: 27,
      topic: 'sqs',
      question: 'Qual é o efeito de não deletar a mensagem após processar?',
      context: 'Esquecendo DeleteMessage.',
      options: [
        { label: 'A', text: 'Ela some para sempre' },
        { label: 'B', text: 'Volta a ficar visível após visibility timeout e pode ser reprocessada' },
        { label: 'C', text: 'Fila trava' },
        { label: 'D', text: 'Vai direto para DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem DeleteMessage, mensagem reaparece depois do visibility timeout, causando reprocessamento.',
      relatedService: 'sqs'
    },
    {
      id: 28,
      topic: 'sqs',
      question: 'Como garantir que apenas um consumidor processe cada mensagem em Standard?',
      context: 'Concorrência alta.',
      options: [
        { label: 'A', text: 'Não é garantido; implementar lock/idempotência' },
        { label: 'B', text: 'Habilitar flag de exclusividade' },
        { label: 'C', text: 'Usar duas filas' },
        { label: 'D', text: 'Diminuir retention' }
      ],
      correctAnswer: 'A',
      explanation: 'Standard não garante single-consumer; deve-se usar idempotência ou FIFO se ordem/único consumo forem críticos.',
      relatedService: 'sqs'
    },
    {
      id: 29,
      topic: 'sqs',
      question: 'Como reduzir latência de primeiro byte ao consumir?',
      context: 'Filas quentes.',
      options: [
        { label: 'A', text: 'Short polling sempre' },
        { label: 'B', text: 'Long polling + aumentar concurrency do consumer' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'Usar Kinesis' }
      ],
      correctAnswer: 'B',
      explanation: 'Long polling já mantém conexão aberta e reduz espera; múltiplos workers retiram backlog mais rápido.',
      relatedService: 'sqs'
    },
    {
      id: 30,
      topic: 'sqs',
      question: 'Quando usar FIFO em vez de Standard?',
      context: 'Requisitos de ordem e dedupe.',
      options: [
        { label: 'A', text: 'Quando não há requisito de ordem' },
        { label: 'B', text: 'Quando precisa de ordenação e exactly-once para um fluxo' },
        { label: 'C', text: 'Sempre que quer mais throughput' },
        { label: 'D', text: 'Quando precisa de DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'FIFO é para cenários sensíveis à ordem e duplicação (pagamentos, contabilidade). Standard é mais simples e escalável.',
      relatedService: 'sqs'
    },
    {
      id: 31,
      topic: 'sqs',
      question: 'Qual recurso integra S3 -> SQS?',
      context: 'Eventos de objeto.',
      options: [
        { label: 'A', text: 'CloudTrail' },
        { label: 'B', text: 'Event notifications do S3 para SQS' },
        { label: 'C', text: 'Athena' },
        { label: 'D', text: 'S3 Select' }
      ],
      correctAnswer: 'B',
      explanation: 'S3 pode enviar eventos de criação/exclusão para SQS, SNS ou Lambda.',
      relatedService: 'sqs'
    },
    {
      id: 32,
      topic: 'sqs',
      question: 'Como fazer fan-out de eventos para múltiplas filas?',
      context: 'Um evento, vários consumidores.',
      options: [
        { label: 'A', text: 'Produtor envia em cada fila manualmente' },
        { label: 'B', text: 'SNS tópico com múltiplas assinaturas SQS' },
        { label: 'C', text: 'Usar RDS' },
        { label: 'D', text: 'Usar Lambda Layers' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS fan-out para múltiplas SQS/HTTP/Lambda sem duplicar lógica no produtor.',
      relatedService: 'sqs'
    },
    {
      id: 33,
      topic: 'sqs',
      question: 'Como garantir que mensagens não sejam perdidas em trânsito?',
      context: 'Durabilidade.',
      options: [
        { label: 'A', text: 'SQS replica mensagens em múltiplas AZs automaticamente' },
        { label: 'B', text: 'Depende do usuário replicar' },
        { label: 'C', text: 'Usar EBS' },
        { label: 'D', text: 'Desabilitar DLQ' }
      ],
      correctAnswer: 'A',
      explanation: 'SQS é altamente durável, replicando em várias AZs da região.',
      relatedService: 'sqs'
    },
    {
      id: 34,
      topic: 'sqs',
      question: 'Como proteger contra acesso público indesejado?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Permitir "*" na queue policy' },
        { label: 'B', text: 'Restringir queue policy a contas/roles específicas' },
        { label: 'C', text: 'Tornar fila VPC only' },
        { label: 'D', text: 'Não é necessário' }
      ],
      correctAnswer: 'B',
      explanation: 'Queue policy deve ser restrita; evite Principal "*" exceto com condições estritas.',
      relatedService: 'sqs'
    },
    {
      id: 35,
      topic: 'sqs',
      question: 'Como evitar que uma DLQ cresça indefinidamente?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Aumentar retention' },
        { label: 'B', text: 'Criar alarmes e processos de replay/limpeza periódicos' },
        { label: 'C', text: 'Desligar producers' },
        { label: 'D', text: 'Nada' }
      ],
      correctAnswer: 'B',
      explanation: 'Monitore DLQ e processe ou descarte mensagens para não acumular indefinitely.',
      relatedService: 'sqs'
    },
    {
      id: 36,
      topic: 'sqs',
      question: 'Por que usar ReceiveMessageWaitTimeSeconds na fila?',
      context: 'Configuração padrão.',
      options: [
        { label: 'A', text: 'Para obrigar short polling' },
        { label: 'B', text: 'Para habilitar long polling por padrão em todos consumidores' },
        { label: 'C', text: 'Para reduzir retention' },
        { label: 'D', text: 'Para ativar DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Setar ReceiveMessageWaitTimeSeconds (até 20s) na fila aplica long polling por default, economizando custo.',
      relatedService: 'sqs'
    },
    {
      id: 37,
      topic: 'sqs',
      question: 'Qual limite de retention mínimo e máximo?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: '1 segundo a 1 dia' },
        { label: 'B', text: '1 minuto a 14 dias' },
        { label: 'C', text: '1 hora a 30 dias' },
        { label: 'D', text: '7 dias fixos' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageRetentionPeriod varia de 60 segundos a 1209600 segundos (14 dias).',
      relatedService: 'sqs'
    },
    {
      id: 38,
      topic: 'sqs',
      question: 'Como evitar bursts que saturam consumers?',
      context: 'Controle de fluxo.',
      options: [
        { label: 'A', text: 'Não há controle' },
        { label: 'B', text: 'Ajustar taxa de producers ou usar token bucket do lado cliente' },
        { label: 'C', text: 'Diminuir retention' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS não limita producers; implementar throttling/backpressure na aplicação e auto scaling de consumers.',
      relatedService: 'sqs'
    },
    {
      id: 39,
      topic: 'sqs',
      question: 'Como reenfileirar mensagens de uma DLQ?',
      context: 'Replay manual.',
      options: [
        { label: 'A', text: 'Feature automática padrão' },
        { label: 'B', text: 'Usar console, SDK ou lambda para mover/copiar de DLQ para fila origem' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Aumentar maxReceiveCount' }
      ],
      correctAnswer: 'B',
      explanation: 'Replay precisa de processo/manual ou automation para mover mensagens de volta.',
      relatedService: 'sqs'
    },
    {
      id: 40,
      topic: 'sqs',
      question: 'Como garantir que um consumidor lento não bloqueie o grupo FIFO?',
      context: 'Ordering por grupo.',
      options: [
        { label: 'A', text: 'Usar apenas um grupo' },
        { label: 'B', text: 'Distribuir mensagens em vários MessageGroupIds' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'Usar Standard' }
      ],
      correctAnswer: 'B',
      explanation: 'Cada MessageGroupId tem fila serial. Use vários grupos para paralelismo.',
      relatedService: 'sqs'
    }
    ,
    {
      id: 51,
      topic: 'sqs',
      question: 'Como proteger endpoints HTTP ao publicar em fila?',
      context: 'Produtor externo.',
      options: [
        { label: 'A', text: 'Apenas chave de API' },
        { label: 'B', text: 'Usar API Gateway + IAM/authorizer para acionar SQS' },
        { label: 'C', text: 'Abrir para internet' },
        { label: 'D', text: 'Usar NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'API Gateway pode integrar com SQS e aplicar auth (IAM, JWT, Lambda authorizer).',
      relatedService: 'sqs'
    },
    {
      id: 52,
      topic: 'sqs',
      question: 'Como evitar hot partition em Standard?',
      context: 'Produtor enviando com mesma chave.',
      options: [
        { label: 'A', text: 'Usar atributo MessageGroupId' },
        { label: 'B', text: 'Distribuir load de forma aleatória em producers' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'Usar DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Distribuir IDs e payloads reduz risco de shard quente; Standard já faz sharding interno.',
      relatedService: 'sqs'
    },
    {
      id: 53,
      topic: 'sqs',
      question: 'Qual limite de batch size em ReceiveMessage?',
      context: 'Batch receive.',
      options: [
        { label: 'A', text: '10 mensagens' },
        { label: 'B', text: '25 mensagens' },
        { label: 'C', text: '50 mensagens' },
        { label: 'D', text: 'Ilimitado' }
      ],
      correctAnswer: 'A',
      explanation: 'ReceiveMessage retorna até 10 mensagens por chamada.',
      relatedService: 'sqs'
    },
    {
      id: 54,
      topic: 'sqs',
      question: 'Qual limite de batch em SendMessageBatch?',
      context: 'Envio em lote.',
      options: [
        { label: 'A', text: '5' },
        { label: 'B', text: '10' },
        { label: 'C', text: '25' },
        { label: 'D', text: '50' }
      ],
      correctAnswer: 'B',
      explanation: 'SendMessageBatch aceita até 10 mensagens por chamada.',
      relatedService: 'sqs'
    },
    {
      id: 55,
      topic: 'sqs',
      question: 'Como garantir ordenação parcial em fluxo de pedidos?',
      context: 'Pedidos por cliente.',
      options: [
        { label: 'A', text: 'Usar Standard' },
        { label: 'B', text: 'Usar FIFO e MessageGroupId por cliente' },
        { label: 'C', text: 'DLQ' },
        { label: 'D', text: 'CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageGroupId por cliente mantém ordem para aquele cliente e permite paralelismo entre clientes.',
      relatedService: 'sqs'
    },
    {
      id: 56,
      topic: 'sqs',
      question: 'Como medir taxa de erro de processamento?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'NumberOfMessagesSent' },
        { label: 'B', text: 'NumberOfMessagesDeleted' },
        { label: 'C', text: 'Comparar sent vs delete e monitorar mensagens movidas à DLQ' },
        { label: 'D', text: 'AgeOfOldestMessage' }
      ],
      correctAnswer: 'C',
      explanation: 'Erros aparecem como mensagens não deletadas e eventualmente movidas à DLQ; relacione métricas.',
      relatedService: 'sqs'
    },
    {
      id: 57,
      topic: 'sqs',
      question: 'Como testar localmente integração com SQS?',
      context: 'Dev local.',
      options: [
        { label: 'A', text: 'Usar apenas filas reais' },
        { label: 'B', text: 'Usar LocalStack ou moto simulando SQS' },
        { label: 'C', text: 'Usar Redis' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'LocalStack/moto simulam SQS para testes locais.',
      relatedService: 'sqs'
    },
    {
      id: 58,
      topic: 'sqs',
      question: 'Qual vantagem de usar atributos de mensagem?',
      context: 'Metadata.',
      options: [
        { label: 'A', text: 'Aumenta tamanho máximo' },
        { label: 'B', text: 'Permite carregar metadados (string/number/binary) sem inflar corpo principal' },
        { label: 'C', text: 'Habilita DLQ' },
        { label: 'D', text: 'Reduz custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Message attributes carregam metadados para roteamento/filtragem sem alterar payload.',
      relatedService: 'sqs'
    },
    {
      id: 59,
      topic: 'sqs',
      question: 'Como filtrar mensagens antes de processar?',
      context: 'Consumers seletivos.',
      options: [
        { label: 'A', text: 'Não é possível em SQS, precisa ler e descartar' },
        { label: 'B', text: 'Usar filter policy em SNS antes de enviar' },
        { label: 'C', text: 'Usar Lambda filter' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'SQS não tem filtro nativo; se precisar filtrar, use SNS com filter policies ou Kinesis.',
      relatedService: 'sqs'
    },
    {
      id: 60,
      topic: 'sqs',
      question: 'Como lidar com mensagens fora de ordem no consumidor?',
      context: 'Standard queue.',
      options: [
        { label: 'A', text: 'Usar timestamp/sequence e reordenar no app' },
        { label: 'B', text: 'Confiar na ordem entregue' },
        { label: 'C', text: 'Habilitar FIFO flag' },
        { label: 'D', text: 'Aumentar retention' }
      ],
      correctAnswer: 'A',
      explanation: 'Standard não garante ordem. App pode reordenar ou migrar para FIFO se ordem for obrigatória.',
      relatedService: 'sqs'
    }
    ,
    {
      id: 61,
      topic: 'sqs',
      question: 'Como evitar storm de retries em caso de outage do backend?',
      context: 'Backpressure.',
      options: [
        { label: 'A', text: 'Diminuir visibility timeout' },
        { label: 'B', text: 'Aumentar visibility timeout e aplicar backoff exponencial no consumer' },
        { label: 'C', text: 'PurgeQueue' },
        { label: 'D', text: 'Criar nova fila' }
      ],
      correctAnswer: 'B',
      explanation: 'Backoff + visibility maior evita retrigger massivo enquanto backend está fora.',
      relatedService: 'sqs'
    },
    {
      id: 62,
      topic: 'sqs',
      question: 'Quando usar DLQ versus descartar?',
      context: 'Mensagens inválidas.',
      options: [
        { label: 'A', text: 'Sempre descartar' },
        { label: 'B', text: 'Usar DLQ para análise e correção; descartar apenas se não for crítico' },
        { label: 'C', text: 'DLQ aumenta custo sem benefício' },
        { label: 'D', text: 'DLQ não funciona com FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'DLQ preserva mensagens problemáticas para investigação; descartar perde informação.',
      relatedService: 'sqs'
    },
    {
      id: 63,
      topic: 'sqs',
      question: 'Qual efeito de DeliveryDelay em uma mensagem específica?',
      context: 'Atraso individual.',
      options: [
        { label: 'A', text: 'Apaga a mensagem' },
        { label: 'B', text: 'Atraso de visibilidade inicial apenas para aquela mensagem' },
        { label: 'C', text: 'Muda ordem' },
        { label: 'D', text: 'Desativa DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'DelaySeconds por mensagem adia a primeira entrega sem afetar as demais.',
      relatedService: 'sqs'
    },
    {
      id: 64,
      topic: 'sqs',
      question: 'Como implementar prioridade de mensagens?',
      context: 'Prioridades múltiplas.',
      options: [
        { label: 'A', text: 'Configuração nativa de prioridade' },
        { label: 'B', text: 'Usar múltiplas filas por prioridade e consumers preferindo filas altas' },
        { label: 'C', text: 'Alterar retention' },
        { label: 'D', text: 'Aumentar visibility timeout' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS não tem prioridade nativa; use filas separadas e lógica de consumo por prioridade.',
      relatedService: 'sqs'
    },
    {
      id: 65,
      topic: 'sqs',
      question: 'Como reduzir o tempo parado de workers sem mensagens?',
      context: 'Fila vazia frequente.',
      options: [
        { label: 'A', text: 'Short polling' },
        { label: 'B', text: 'Long polling com wait time alto' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'PurgeQueue' }
      ],
      correctAnswer: 'B',
      explanation: 'Long polling diminui ciclos de polling vazio e ociosidade.',
      relatedService: 'sqs'
    },
    {
      id: 66,
      topic: 'sqs',
      question: 'Como registrar quem enviou a mensagem?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar atributos de mensagem ou CloudTrail para API calls' },
        { label: 'C', text: 'Apenas DLQ' },
        { label: 'D', text: 'PurgeQueue' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail registra SendMessage; atributos podem carregar metadados do emissor.',
      relatedService: 'sqs'
    },
    {
      id: 67,
      topic: 'sqs',
      question: 'Como evitar que uma mensagem fique presa para sempre?',
      context: 'Retenção longa.',
      options: [
        { label: 'A', text: 'Definir retention e alarmar AgeOfOldestMessage' },
        { label: 'B', text: 'Usar PurgeQueue' },
        { label: 'C', text: 'DLQ' },
        { label: 'D', text: 'Diminuir visibility para 0' }
      ],
      correctAnswer: 'A',
      explanation: 'Retenção máxima 14 dias; monitore idade para agir antes de expirar ou travar.',
      relatedService: 'sqs'
    },
    {
      id: 68,
      topic: 'sqs',
      question: 'Qual impacto de redrive allow policy em fila de origem?',
      context: 'Controle de replays.',
      options: [
        { label: 'A', text: 'Impede mover de volta' },
        { label: 'B', text: 'Define quais filas podem redrivar mensagens de uma DLQ' },
        { label: 'C', text: 'Habilita SSE' },
        { label: 'D', text: 'Aumenta retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Redrive allow policy restringe quem pode reprocessar mensagens da DLQ para origem.',
      relatedService: 'sqs'
    },
    {
      id: 69,
      topic: 'sqs',
      question: 'Como minimizar latência entre envio e consumo?',
      context: 'Near-real-time.',
      options: [
        { label: 'A', text: 'Short polling sempre' },
        { label: 'B', text: 'Long polling com WaitTimeSeconds baixo (ex: 2-5s) e consumidores suficientes' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Long polling reduz overhead; com workers suficientes, latência média cai.',
      relatedService: 'sqs'
    },
    {
      id: 70,
      topic: 'sqs',
      question: 'Como integrar SQS com EventBridge?',
      context: 'Eventos corporativos.',
      options: [
        { label: 'A', text: 'EventBridge envia para SQS como target' },
        { label: 'B', text: 'SQS envia eventos nativamente' },
        { label: 'C', text: 'Não há integração' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'A',
      explanation: 'EventBridge rules podem ter SQS como destino para filas event-driven.',
      relatedService: 'sqs'
    },
    {
      id: 71,
      topic: 'sqs',
      question: 'Qual custo principal do SQS?',
      context: 'Precificação.',
      options: [
        { label: 'A', text: 'Por hora de fila' },
        { label: 'B', text: 'Por milhão de requisições (Send, Receive, Delete, etc.)' },
        { label: 'C', text: 'Por GB armazenado' },
        { label: 'D', text: 'Por CPU usada' }
      ],
      correctAnswer: 'B',
      explanation: 'Cobra por request; retention/armazenamento não é cobrado separadamente.',
      relatedService: 'sqs'
    },
    {
      id: 72,
      topic: 'sqs',
      question: 'O que é NumberOfEmptyReceives?',
      context: 'Métrica.',
      options: [
        { label: 'A', text: 'Mensagens apagadas' },
        { label: 'B', text: 'Receives sem mensagens retornadas' },
        { label: 'C', text: 'Mensagens em DLQ' },
        { label: 'D', text: 'Backlog total' }
      ],
      correctAnswer: 'B',
      explanation: 'Indica quantas vezes ReceiveMessage não retornou nada; alto valor sugere usar long polling.',
      relatedService: 'sqs'
    },
    {
      id: 73,
      topic: 'sqs',
      question: 'Como controlar taxa de leitura em Lambda trigger?',
      context: 'Throttle.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Ajustar batch size e concurrency de Lambda para limitar TPS' },
        { label: 'C', text: 'DLQ' },
        { label: 'D', text: 'PurgeQueue' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda + SQS permite configurar batch size e reserved concurrency para controlar throughput.',
      relatedService: 'sqs'
    },
    {
      id: 74,
      topic: 'sqs',
      question: 'Como evitar processamento parcial em batch da Lambda?',
      context: 'Partial failures.',
      options: [
        { label: 'A', text: 'Não usar batch' },
        { label: 'B', text: 'Habilitar report de partial batch response e reenfileirar só as falhas' },
        { label: 'C', text: 'Deletar todas as mensagens' },
        { label: 'D', text: 'Diminuir retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda partial batch response permite confirmar mensagens boas e reprocessar apenas as falhas.',
      relatedService: 'sqs'
    },
    {
      id: 75,
      topic: 'sqs',
      question: 'Como simular atraso de consumo para testes?',
      context: 'Testes.',
      options: [
        { label: 'A', text: 'Diminuir visibility timeout' },
        { label: 'B', text: 'Aumentar visibility e inserir delays no consumidor' },
        { label: 'C', text: 'PurgeQueue' },
        { label: 'D', text: 'Usar DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Ajuste visibility e introduza atraso controlado para observar comportamento.',
      relatedService: 'sqs'
    },
    {
      id: 76,
      topic: 'sqs',
      question: 'Como lidar com mensagens venenosas (poison messages)?',
      context: 'Falham sempre.',
      options: [
        { label: 'A', text: 'Aumentar maxReceiveCount infinito' },
        { label: 'B', text: 'Usar DLQ e analisar/corrigir antes de reenviar' },
        { label: 'C', text: 'Ignorar' },
        { label: 'D', text: 'PurgeQueue' }
      ],
      correctAnswer: 'B',
      explanation: 'DLQ captura poison messages; depois trate/ajuste lógica.',
      relatedService: 'sqs'
    },
    {
      id: 77,
      topic: 'sqs',
      question: 'Como medir throughput efetivo?',
      context: 'KPIs.',
      options: [
        { label: 'A', text: 'NumberOfMessagesSent apenas' },
        { label: 'B', text: 'Comparar NumberOfMessagesSent vs NumberOfMessagesDeleted e tempo médio de processamento' },
        { label: 'C', text: 'AgeOfOldestMessage' },
        { label: 'D', text: 'Retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Envios vs deleções mostram TPS efetivo; combine com métricas de tempo.',
      relatedService: 'sqs'
    },
    {
      id: 78,
      topic: 'sqs',
      question: 'Como dividir uma carga heterogênea (imagens, textos)?',
      context: 'Trabalhos pesados e leves.',
      options: [
        { label: 'A', text: 'Mesma fila' },
        { label: 'B', text: 'Filas separadas por tipo e workers especializados' },
        { label: 'C', text: 'Usar retention' },
        { label: 'D', text: 'DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Separar por perfil de workload evita bloqueio e facilita tuning.',
      relatedService: 'sqs'
    },
    {
      id: 79,
      topic: 'sqs',
      question: 'Qual efeito de aumentar batch size sem ajustar visibility?',
      context: 'Mais trabalho por lote.',
      options: [
        { label: 'A', text: 'Nenhum' },
        { label: 'B', text: 'Pode estourar visibility antes de concluir o lote, causando reprocessamento' },
        { label: 'C', text: 'Reduz custo sempre' },
        { label: 'D', text: 'Desativa DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Lotes maiores demoram mais; ajuste visibility timeout conforme tempo de processamento.',
      relatedService: 'sqs'
    },
    {
      id: 80,
      topic: 'sqs',
      question: 'Como migrar mensagens de Standard para FIFO?',
      context: 'Mudança de tipo.',
      options: [
        { label: 'A', text: 'Converter no console' },
        { label: 'B', text: 'Criar nova fila FIFO e republicar mensagens com MessageGroupId/DedupId apropriados' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Renomear fila' }
      ],
      correctAnswer: 'B',
      explanation: 'Tipo não muda; precisa nova fila e reenvio estruturado.',
      relatedService: 'sqs'
    },
    {
      id: 81,
      topic: 'sqs',
      question: 'Qual diferença de limites de throughput entre Standard e FIFO?',
      context: 'Escalabilidade.',
      options: [
        { label: 'A', text: 'FIFO é ilimitado e Standard não' },
        { label: 'B', text: 'Standard escala quase ilimitado; FIFO tem limites mais baixos (300/3000 msg/s por fila padrão)' },
        { label: 'C', text: 'São iguais' },
        { label: 'D', text: 'Standard não suporta DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard escala horizontalmente; FIFO tem throughput controlado salvo modo high throughput.',
      relatedService: 'sqs'
    },
    {
      id: 82,
      topic: 'sqs',
      question: 'Como escolher visibility timeout inicial?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Sempre 30s' },
        { label: 'B', text: 'Basear no pior caso de processamento e permitir ChangeMessageVisibility se precisar' },
        { label: 'C', text: 'Mesmo que retention' },
        { label: 'D', text: 'Não importa' }
      ],
      correctAnswer: 'B',
      explanation: 'Visibility deve cobrir o trabalho médio/pior caso; ajuste dinâmico se variar.',
      relatedService: 'sqs'
    },
    {
      id: 83,
      topic: 'sqs',
      question: 'Como lidar com mensagens fora de SLA na fila?',
      context: 'Backlog atrasado.',
      options: [
        { label: 'A', text: 'Ignorar' },
        { label: 'B', text: 'Criar alarmes para AgeOfOldestMessage e escalar consumers (auto scaling) ou shed load' },
        { label: 'C', text: 'PurgeQueue' },
        { label: 'D', text: 'Reduzir batch size' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarmes + auto scaling respondem a backlog; em casos extremos pode descartar ou pausar producers.',
      relatedService: 'sqs'
    },
    {
      id: 84,
      topic: 'sqs',
      question: 'Como validar schema das mensagens?',
      context: 'Qualidade de dados.',
      options: [
        { label: 'A', text: 'SQS valida JSON' },
        { label: 'B', text: 'Validação deve ser no producer ou consumer (ex: JSON schema)' },
        { label: 'C', text: 'Apenas SNS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS não valida payload; validação fica na aplicação.',
      relatedService: 'sqs'
    },
    {
      id: 85,
      topic: 'sqs',
      question: 'Qual melhor prática para idempotência em processamento financeiro?',
      context: 'Cobranças.',
      options: [
        { label: 'A', text: 'Confiar na fila' },
        { label: 'B', text: 'Guardar transactionId processado e rejeitar duplicatas' },
        { label: 'C', text: 'Usar DLQ' },
        { label: 'D', text: 'Aumentar visibility' }
      ],
      correctAnswer: 'B',
      explanation: 'Persistir IDs evita cobranças repetidas mesmo com reentregas.',
      relatedService: 'sqs'
    },
    {
      id: 86,
      topic: 'sqs',
      question: 'Como observar tempos de fila no X-Ray?',
      context: 'Tracing.',
      options: [
        { label: 'A', text: 'SQS não integra com X-Ray' },
        { label: 'B', text: 'Ativar tracing no produtor/consumer; SQS propaga trace header nas mensagens' },
        { label: 'C', text: 'Usar CloudFront' },
        { label: 'D', text: 'DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Trace header pode ser passado em atributos; consumers continuam o trace no X-Ray.',
      relatedService: 'sqs'
    },
    {
      id: 87,
      topic: 'sqs',
      question: 'Como evitar leitura de mensagens já expiradas?',
      context: 'Retenção curta.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'SQS exclui mensagens expiradas automaticamente (retention). Nada a fazer' },
        { label: 'C', text: 'Usar DLQ' },
        { label: 'D', text: 'PurgeQueue' }
      ],
      correctAnswer: 'B',
      explanation: 'Mensagens vencidas são removidas; consumers não as veem.',
      relatedService: 'sqs'
    },
    {
      id: 88,
      topic: 'sqs',
      question: 'Como publicar de VPC privada sem internet?',
      context: 'Ambiente isolado.',
      options: [
        { label: 'A', text: 'Usar NAT' },
        { label: 'B', text: 'Usar VPC Endpoint Interface para SQS' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Usar Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'PrivateLink permite tráfego privado para SQS sem internet.',
      relatedService: 'sqs'
    },
    {
      id: 89,
      topic: 'sqs',
      question: 'Como auditar quem acessou a fila?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'CloudWatch' },
        { label: 'B', text: 'CloudTrail registra chamadas de API SQS' },
        { label: 'C', text: 'S3 logs' },
        { label: 'D', text: 'SNS logs' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail grava eventos Send/Receive/Delete/Purge etc. para auditoria.',
      relatedService: 'sqs'
    },
    {
      id: 90,
      topic: 'sqs',
      question: 'Como evitar que um consumidor derrube toda a fila ao falhar?',
      context: 'Isolamento.',
      options: [
        { label: 'A', text: 'Usar apenas um consumidor' },
        { label: 'B', text: 'Isolar consumidores por grupo de mensagens, usar DLQ e circuit breaker/backoff' },
        { label: 'C', text: 'PurgeQueue' },
        { label: 'D', text: 'Aumentar retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Circuit breaker/backoff impede loop de falhas; DLQ preserva mensagens problemáticas.',
      relatedService: 'sqs'
    }
  ],

  sns: [
    {
      id: 1,
      topic: 'sns',
      question: 'Qual é o modelo de mensageria do Amazon SNS?',
      context: 'Notificando múltiplos sistemas.',
      options: [
        { label: 'A', text: 'Point-to-point (fila)' },
        { label: 'B', text: 'Pub/Sub (publish/subscribe)' },
        { label: 'C', text: 'Request/response' },
        { label: 'D', text: 'Streaming' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS é Pub/Sub: publisher envia para tópico, múltiplos subscribers recebem cópia. Fan-out pattern. Ex: novo pedido → SNS topic → email, SMS, SQS queue, Lambda simultaneamente. SQS é queue (1 consumer por mensagem).',
      relatedService: 'sns'
    },
    {
      id: 2,
      topic: 'sns',
      question: 'Quais tipos de endpoints o SNS pode notificar?',
      context: 'Configurando subscribers.',
      options: [
        { label: 'A', text: 'Apenas email' },
        { label: 'B', text: 'SQS, Lambda, HTTP/HTTPS, Email, SMS, Mobile Push' },
        { label: 'C', text: 'Apenas AWS services' },
        { label: 'D', text: 'Apenas HTTP endpoints' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta múltiplos protocols: SQS, Lambda, HTTP/HTTPS webhooks, Email/Email-JSON, SMS, Mobile Push (iOS/Android), Kinesis Firehose. Flexível para integrar com qualquer sistema.',
      relatedService: 'sns'
    },
    {
      id: 3,
      topic: 'sns',
      question: 'Qual é o tamanho máximo da mensagem SNS?',
      context: 'Limites.',
      options: [
        { label: 'A', text: '64 KB' },
        { label: 'B', text: '256 KB' },
        { label: 'C', text: '1 MB' },
        { label: 'D', text: '10 MB' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta mensagens até 256 KB. Para maiores, use S3 e envie ponteiro.',
      relatedService: 'sns'
    },
    {
      id: 4,
      topic: 'sns',
      question: 'Quando usar SNS em vez de SQS?',
      context: 'Fan-out vs queue.',
      options: [
        { label: 'A', text: 'Quando precisa de Pub/Sub e push para múltiplos destinos' },
        { label: 'B', text: 'Quando precisa de polling com atraso' },
        { label: 'C', text: 'Quando precisa de exatamente-once' },
        { label: 'D', text: 'Quando quer ordenar mensagens' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS é push pub/sub para múltiplos subscribers. SQS é queue com polling.',
      relatedService: 'sns'
    },
    {
      id: 5,
      topic: 'sns',
      question: 'O que são filter policies no SNS?',
      context: 'Filtrar por atributos.',
      options: [
        { label: 'A', text: 'Permissão IAM' },
        { label: 'B', text: 'Regras de assinatura que entregam mensagens apenas se atributos casarem' },
        { label: 'C', text: 'DLQ' },
        { label: 'D', text: 'Criptografia' }
      ],
      correctAnswer: 'B',
      explanation: 'Filter policies em subscriptions entregam mensagens somente quando atributos correspondem.',
      relatedService: 'sns'
    },
    {
      id: 6,
      topic: 'sns',
      question: 'Como enviar mensagens diferentes por protocolo?',
      context: 'Custom payload.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar mensagem estruturada JSON com chave por protocolo (default, email, sms, http)' },
        { label: 'C', text: 'Criar tópico por protocolo' },
        { label: 'D', text: 'Usar Kinesis' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta payload estruturado definindo mensagens específicas por protocolo.',
      relatedService: 'sns'
    },
    {
      id: 7,
      topic: 'sns',
      question: 'Qual a diferença entre topic policy e subscription policy?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Topic policy controla quem publica/assina; subscription policy define filtros e regras na assinatura' },
        { label: 'C', text: 'Subscription policy define IAM users' },
        { label: 'D', text: 'Topic policy é só para SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Topic policy é resource-based (publish/subscribe). Subscription policy define filter policy e delivery settings.',
      relatedService: 'sns'
    },
    {
      id: 8,
      topic: 'sns',
      question: 'Qual protocolo usar para webhooks?',
      context: 'Integração externa.',
      options: [
        { label: 'A', text: 'SMTP' },
        { label: 'B', text: 'HTTP ou HTTPS' },
        { label: 'C', text: 'FTP' },
        { label: 'D', text: 'SSH' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta entrega para endpoints HTTP/HTTPS como webhooks.',
      relatedService: 'sns'
    },
    {
      id: 9,
      topic: 'sns',
      question: 'Como proteger assinaturas HTTPS?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Aceitar qualquer certificado' },
        { label: 'B', text: 'Usar HTTPS com certificado válido e validar cabeçalhos de assinatura de mensagem' },
        { label: 'C', text: 'Usar HTTP simples' },
        { label: 'D', text: 'Não há proteção' }
      ],
      correctAnswer: 'B',
      explanation: 'Use HTTPS e valide assinatura da mensagem SNS para garantir autenticidade.',
      relatedService: 'sns'
    },
    {
      id: 10,
      topic: 'sns',
      question: 'Qual recurso permite entrega exatamente-once e ordenada no SNS?',
      context: 'Cenários críticos.',
      options: [
        { label: 'A', text: 'Standard topic' },
        { label: 'B', text: 'FIFO topic' },
        { label: 'C', text: 'Kinesis' },
        { label: 'D', text: 'Email' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS FIFO topics oferecem ordem e deduplicação usando MessageGroupId e DedupId.',
      relatedService: 'sns'
    },
    {
      id: 11,
      topic: 'sns',
      question: 'Qual throughput base de SNS FIFO?',
      context: 'Limites.',
      options: [
        { label: 'A', text: 'Ilimitado' },
        { label: 'B', text: 'Até 3000 msg/s com batching (300 sem batching) por tópico padrão' },
        { label: 'C', text: '50 msg/s' },
        { label: 'D', text: '10 msg/s' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS FIFO tem limites similares ao SQS FIFO; modo high throughput pode aumentar.',
      relatedService: 'sns'
    },
    {
      id: 12,
      topic: 'sns',
      question: 'Quando usar SNS FIFO?',
      context: 'Ordem e dedupe.',
      options: [
        { label: 'A', text: 'Quando não há requisito de ordem' },
        { label: 'B', text: 'Quando precisa ordem e deduplicação end-to-end (ex: pagamentos)' },
        { label: 'C', text: 'Quando quer SMS' },
        { label: 'D', text: 'Quando quer mais throughput que Standard' }
      ],
      correctAnswer: 'B',
      explanation: 'FIFO atende ordem/dedup; Standard oferece maior escala sem ordem.',
      relatedService: 'sns'
    },
    {
      id: 13,
      topic: 'sns',
      question: 'Como fazer fan-out para múltiplas contas?',
      context: 'Multi-account.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Permitir ARNs de filas/lamdbas de outra conta na topic policy e assinar' },
        { label: 'C', text: 'Copiar tópico' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'Topic policy resource-based permite assinaturas cross-account.',
      relatedService: 'sns'
    },
    {
      id: 14,
      topic: 'sns',
      question: 'Como evitar entrega de mensagens para assinantes não desejados?',
      context: 'Controle de acesso.',
      options: [
        { label: 'A', text: 'Permitir Principal "*"' },
        { label: 'B', text: 'Restringir topic policy por principal, condição ou VPC endpoint' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Topic policy define quem pode publicar/assinar; use conditions (SourceArn, aws:SourceVpce).',
      relatedService: 'sns'
    },
    {
      id: 15,
      topic: 'sns',
      question: 'Como habilitar criptografia em repouso no SNS?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Não suporta' },
        { label: 'B', text: 'Ativar SSE com KMS no tópico' },
        { label: 'C', text: 'Usar SG' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta SSE com CMK da AWS ou do cliente.',
      relatedService: 'sns'
    },
    {
      id: 16,
      topic: 'sns',
      question: 'Como garantir entrega a HTTP mesmo se endpoint estiver fora?',
      context: 'Retries.',
      options: [
        { label: 'A', text: 'Não há retry' },
        { label: 'B', text: 'SNS faz retries exponenciais e pode enviar para DLQ (SQS) em caso de falha persistente' },
        { label: 'C', text: 'Usar email' },
        { label: 'D', text: 'Usar IAM role' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS possui política de retry e pode redirecionar falhas para DLQ em assinaturas HTTP/SQS.',
      relatedService: 'sns'
    },
    {
      id: 17,
      topic: 'sns',
      question: 'O que é delivery policy em SNS?',
      context: 'Controle de retries.',
      options: [
        { label: 'A', text: 'Policy de IAM' },
        { label: 'B', text: 'Configura tentativas, backoff e timeout por assinatura' },
        { label: 'C', text: 'Controle de filtragem' },
        { label: 'D', text: 'Controle de criptografia' }
      ],
      correctAnswer: 'B',
      explanation: 'Delivery policy define retries, backoff e TTL para entregas HTTP/SQS.',
      relatedService: 'sns'
    },
    {
      id: 18,
      topic: 'sns',
      question: 'Como integrar SNS com Lambda?',
      context: 'Event-driven.',
      options: [
        { label: 'A', text: 'Lambda precisa poll' },
        { label: 'B', text: 'Lambda é assinante; SNS invoca a função diretamente' },
        { label: 'C', text: 'Usar API Gateway' },
        { label: 'D', text: 'Não suporta' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda pode ser subscriber; SNS invoca a função com o payload.',
      relatedService: 'sns'
    },
    {
      id: 19,
      topic: 'sns',
      question: 'Como limitar quem pode publicar no tópico?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Permitir qualquer um' },
        { label: 'B', text: 'Topic policy com condição aws:SourceArn (ex: somente eventos do S3/EventBridge)' },
        { label: 'C', text: 'Assinatura' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Topic policy restringe publish a ARNs específicos via Condition.',
      relatedService: 'sns'
    },
    {
      id: 20,
      topic: 'sns',
      question: 'Como entregar mensagens somente para assinantes dentro da VPC?',
      context: 'Privacidade.',
      options: [
        { label: 'A', text: 'Usar VPC Endpoint e condition aws:SourceVpce' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar ALB' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS suporta VPC endpoints (PrivateLink) e condições para restringir origem/destino.',
      relatedService: 'sns'
    },
    {
      id: 21,
      topic: 'sns',
      question: 'Como enviar SMS transacional com SNS?',
      context: 'SMS.',
      options: [
        { label: 'A', text: 'Criar tópico FIFO' },
        { label: 'B', text: 'Usar publish direto com protocolo sms e verificar limites/opt-in' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS envia SMS via publish protocolo sms; respeitar opt-in/limites e tipo transacional/promo.',
      relatedService: 'sns'
    },
    {
      id: 22,
      topic: 'sns',
      question: 'Qual diferença entre SMS transacional e promocional?',
      context: 'Regulamentação.',
      options: [
        { label: 'A', text: 'Nenhuma' },
        { label: 'B', text: 'Transacional é crítico/serviço; promocional é marketing e pode ter restrições de horário' },
        { label: 'C', text: 'Promo usa HTTP' },
        { label: 'D', text: 'Transacional é mais barato' }
      ],
      correctAnswer: 'B',
      explanation: 'Categorias afetam rotas, permissões e limites de envio.',
      relatedService: 'sns'
    },
    {
      id: 23,
      topic: 'sns',
      question: 'Como usar SNS para push mobile?',
      context: 'Mobile push.',
      options: [
        { label: 'A', text: 'SNS não suporta' },
        { label: 'B', text: 'Criar platform application (APNS/FCM/etc.) e endpoints, então publicar' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS integra com provedores de push criando platform application e device endpoints.',
      relatedService: 'sns'
    },
    {
      id: 24,
      topic: 'sns',
      question: 'Como diferenciar mensagens por ambiente (dev/prod)?',
      context: 'Multi-env.',
      options: [
        { label: 'A', text: 'Usar um tópico só' },
        { label: 'B', text: 'Usar atributos e filter policies ou tópicos separados por ambiente' },
        { label: 'C', text: 'Usar IAM' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Atributos + filtros ou tópicos separados evitam mistura de ambientes.',
      relatedService: 'sns'
    },
    {
      id: 25,
      topic: 'sns',
      question: 'Como evitar mensagens duplicadas em SNS FIFO?',
      context: 'Deduplicação.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar MessageDeduplicationId ou content-based dedupe' },
        { label: 'C', text: 'Usar KMS' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS FIFO suporta dedupe id ou hash do corpo em janela de 5 minutos.',
      relatedService: 'sns'
    },
    {
      id: 26,
      topic: 'sns',
      question: 'Como manter ordem por fluxo em SNS FIFO?',
      context: 'MessageGroupId.',
      options: [
        { label: 'A', text: 'Standard topic' },
        { label: 'B', text: 'Definir MessageGroupId por fluxo e usar assinaturas FIFO (SQS FIFO)' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar email' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageGroupId garante ordem dentro do grupo; assinaturas FIFO mantêm ordenação.',
      relatedService: 'sns'
    },
    {
      id: 27,
      topic: 'sns',
      question: 'Como implementar requisição-resposta com SNS?',
      context: 'Pattern.',
      options: [
        { label: 'A', text: 'SNS nativamente responde' },
        { label: 'B', text: 'Usar correlationId no payload e um tópico/fila de resposta separado' },
        { label: 'C', text: 'Usar email' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS é assíncrono; use correlationId e canal de resposta para mapear replies.',
      relatedService: 'sns'
    },
    {
      id: 28,
      topic: 'sns',
      question: 'Como limitar frequência de SMS?',
      context: 'Custo e spam.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Implementar throttling no produtor e usar spend limits/opt-out' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Controle na aplicação + limites de gasto e compliance (opt-out).',
      relatedService: 'sns'
    },
    {
      id: 29,
      topic: 'sns',
      question: 'Como integrar EventBridge com SNS?',
      context: 'Eventos -> SNS.',
      options: [
        { label: 'A', text: 'Não integra' },
        { label: 'B', text: 'EventBridge rule pode ter target SNS topic' },
        { label: 'C', text: 'Somente via SQS' },
        { label: 'D', text: 'Usar API Gateway' }
      ],
      correctAnswer: 'B',
      explanation: 'EventBridge envia eventos para SNS como destino suportado.',
      relatedService: 'sns'
    },
    {
      id: 30,
      topic: 'sns',
      question: 'Como integrar S3 com SNS?',
      context: 'Eventos de objeto.',
      options: [
        { label: 'A', text: 'S3 não suporta' },
        { label: 'B', text: 'Configurar event notification para tópico SNS' },
        { label: 'C', text: 'Usar Kinesis' },
        { label: 'D', text: 'Usar CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'S3 envia eventos (put, delete) para SNS, SQS ou Lambda.',
      relatedService: 'sns'
    },
    {
      id: 31,
      topic: 'sns',
      question: 'Como evitar loops de entrega?',
      context: 'SNS -> Lambda -> SNS.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Aplicar checks de origem/correlationId e topic policy restritiva' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Valide origem e use policies/atributos para evitar recursão infinita.',
      relatedService: 'sns'
    },
    {
      id: 32,
      topic: 'sns',
      question: 'O que é ConfirmSubscription?',
      context: 'Assinatura HTTP/Email.',
      options: [
        { label: 'A', text: 'Publicar mensagem' },
        { label: 'B', text: 'Confirmação obrigatória do endpoint para ativar assinatura' },
        { label: 'C', text: 'Criptografia' },
        { label: 'D', text: 'DLQ' }
      ],
      correctAnswer: 'B',
      explanation: 'Assinaturas HTTP/Email precisam confirmar o token para ativar entrega.',
      relatedService: 'sns'
    },
    {
      id: 33,
      topic: 'sns',
      question: 'Como garantir autenticidade das mensagens recebidas?',
      context: 'Webhooks.',
      options: [
        { label: 'A', text: 'Confiar no IP' },
        { label: 'B', text: 'Validar assinatura (Signature, SigningCertURL) fornecida pelo SNS' },
        { label: 'C', text: 'Usar somente HTTP' },
        { label: 'D', text: 'Não é necessário' }
      ],
      correctAnswer: 'B',
      explanation: 'Valide a assinatura digital para garantir que a mensagem veio do SNS.',
      relatedService: 'sns'
    },
    {
      id: 34,
      topic: 'sns',
      question: 'Como integrar com Apple/Google push?',
      context: 'Mobile push.',
      options: [
        { label: 'A', text: 'Usar SES' },
        { label: 'B', text: 'Criar platform application APNS/FCM e endpoints' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS suporta APNS, FCM, ADM etc. via platform applications.',
      relatedService: 'sns'
    },
    {
      id: 35,
      topic: 'sns',
      question: 'Como mandar emails simples?',
      context: 'Notificações básicas.',
      options: [
        { label: 'A', text: 'Assinar protocolo email ou email-json' },
        { label: 'B', text: 'Usar SES obrigatoriamente' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS suporta endpoints email/email-json para notificações simples.',
      relatedService: 'sns'
    },
    {
      id: 36,
      topic: 'sns',
      question: 'Como lidar com endpoints HTTP que retornam 500?',
      context: 'Falhas.',
      options: [
        { label: 'A', text: 'Entrega é dropada' },
        { label: 'B', text: 'SNS faz retries conforme delivery policy e pode enviar para DLQ se configurado' },
        { label: 'C', text: 'Reenvia apenas uma vez' },
        { label: 'D', text: 'Altera para SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Retries com backoff; DLQ opcional para assinaturas SQS/HTTP.',
      relatedService: 'sns'
    },
    {
      id: 37,
      topic: 'sns',
      question: 'Como criar DLQ para assinatura HTTP?',
      context: 'Entrega resiliente.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Configurar redrive policy da subscription apontando para SQS DLQ' },
        { label: 'C', text: 'Usar SES' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Assinaturas suportam DLQ SQS para falhas persistentes.',
      relatedService: 'sns'
    },
    {
      id: 38,
      topic: 'sns',
      question: 'Como saber se uma entrega falhou?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'CloudWatch metrics e logs de delivery, além de DLQ' },
        { label: 'B', text: 'Não há métricas' },
        { label: 'C', text: 'Usar CloudTrail apenas' },
        { label: 'D', text: 'Usar S3' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS publica métricas de delivery; falhas podem ir para DLQ ou ser logadas.',
      relatedService: 'sns'
    },
    {
      id: 39,
      topic: 'sns',
      question: 'Qual métrica monitora taxa de publicações?',
      context: 'CloudWatch.',
      options: [
        { label: 'A', text: 'NumberOfMessagesPublished' },
        { label: 'B', text: 'NumberOfNotificationsDelivered' },
        { label: 'C', text: 'NumberOfNotificationsFailed' },
        { label: 'D', text: 'PublishSize' }
      ],
      correctAnswer: 'A',
      explanation: 'NumberOfMessagesPublished mostra total de publicações no tópico.',
      relatedService: 'sns'
    },
    {
      id: 40,
      topic: 'sns',
      question: 'Qual métrica indica falhas de entrega?',
      context: 'Falhas.',
      options: [
        { label: 'A', text: 'NumberOfNotificationsFailed' },
        { label: 'B', text: 'PublishSize' },
        { label: 'C', text: 'NumberOfMessagesPublished' },
        { label: 'D', text: 'NumberOfNotificationsDelivered' }
      ],
      correctAnswer: 'A',
      explanation: 'Número de entregas que falharam para assinantes.',
      relatedService: 'sns'
    },
    {
      id: 41,
      topic: 'sns',
      question: 'Como controlar tamanho das mensagens?',
      context: 'Limite 256 KB.',
      options: [
        { label: 'A', text: 'Usar MessageAttributes para dados grandes' },
        { label: 'B', text: 'Armazenar no S3 e enviar somente referência' },
        { label: 'C', text: 'Enviar sem compressão sempre' },
        { label: 'D', text: 'Não publicar' }
      ],
      correctAnswer: 'B',
      explanation: 'Para payloads grandes, coloque no S3 e envie ponteiro para manter limite.',
      relatedService: 'sns'
    },
    {
      id: 42,
      topic: 'sns',
      question: 'Quando usar message attributes?',
      context: 'Metadados.',
      options: [
        { label: 'A', text: 'Para filtrar entregas ou carregar metadados sem poluir o corpo' },
        { label: 'B', text: 'Para aumentar tamanho máximo' },
        { label: 'C', text: 'Para criptografar' },
        { label: 'D', text: 'Para usar SMS' }
      ],
      correctAnswer: 'A',
      explanation: 'Attributes carregam metadados usados em filter policies ou contexto.',
      relatedService: 'sns'
    },
    {
      id: 43,
      topic: 'sns',
      question: 'Qual diferença entre delivery status logging e CloudTrail?',
      context: 'Logs.',
      options: [
        { label: 'A', text: 'CloudTrail é para chamadas de API; delivery status registra sucesso/falha por mensagem' },
        { label: 'B', text: 'São idênticos' },
        { label: 'C', text: 'Delivery status é para IAM' },
        { label: 'D', text: 'CloudTrail é pago e delivery não' }
      ],
      correctAnswer: 'A',
      explanation: 'CloudTrail rastreia API; delivery status loga entregas (SMS, HTTP, Lambda, SQS).',
      relatedService: 'sns'
    },
    {
      id: 44,
      topic: 'sns',
      question: 'Como reduzir custo de SMS?',
      context: 'Otimização.',
      options: [
        { label: 'A', text: 'Usar sempre rota promotional' },
        { label: 'B', text: 'Usar email ou push quando possível, limitar volume e consolidar mensagens' },
        { label: 'C', text: 'Usar Kinesis' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Trocar por canais mais baratos e limitar envios reduz custo.',
      relatedService: 'sns'
    },
    {
      id: 45,
      topic: 'sns',
      question: 'Como evitar que assinaturas antigas continuem recebendo?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Não remover' },
        { label: 'B', text: 'Remover/confirmar novamente assinaturas e usar filtros por ambiente' },
        { label: 'C', text: 'Usar IAM' },
        { label: 'D', text: 'Usar VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'Limpe assinaturas obsoletas e valide filtros/ARNs corretos.',
      relatedService: 'sns'
    },
    {
      id: 46,
      topic: 'sns',
      question: 'Como usar FIFO SNS com SQS Standard?',
      context: 'Compatibilidade.',
      options: [
        { label: 'A', text: 'Não pode' },
        { label: 'B', text: 'É permitido, mas ordem se perde na SQS Standard; mantenha atenção a dedupe' },
        { label: 'C', text: 'Garante ordem' },
        { label: 'D', text: 'Exige SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS FIFO pode publicar em SQS Standard, mas assinante não mantém ordenação.',
      relatedService: 'sns'
    },
    {
      id: 47,
      topic: 'sns',
      question: 'Como enviar mesma mensagem em várias regiões?',
      context: 'Multi-region.',
      options: [
        { label: 'A', text: 'Replicação automática' },
        { label: 'B', text: 'Publicar em tópicos em cada região ou usar EventBridge Pipes/Step Functions para replicar' },
        { label: 'C', text: 'SQS faz sozinho' },
        { label: 'D', text: 'Usar RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS é regional; é preciso publicar/replicar manualmente entre regiões.',
      relatedService: 'sns'
    },
    {
      id: 48,
      topic: 'sns',
      question: 'Como enviar mensagem diferente para cada assinante?',
      context: 'Personalização.',
      options: [
        { label: 'A', text: 'Usar payload per-protocol e filter policies + atributos para cada subscriber' },
        { label: 'B', text: 'Não é possível' },
        { label: 'C', text: 'Criar tópico novo por assinante' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'A',
      explanation: 'Protocol-specific payloads e filtros entregam conteúdo apropriado sem duplicar tópicos.',
      relatedService: 'sns'
    },
    {
      id: 49,
      topic: 'sns',
      question: 'Como garantir ordering end-to-end SNS FIFO -> SQS FIFO -> Lambda?',
      context: 'Pipeline ordenado.',
      options: [
        { label: 'A', text: 'Usar Standard no meio' },
        { label: 'B', text: 'Manter tudo FIFO e usar mesmo MessageGroupId na cadeia' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Topic FIFO + SQS FIFO + consumer preservam ordem por grupo.',
      relatedService: 'sns'
    },
    {
      id: 50,
      topic: 'sns',
      question: 'Como limitar tamanho de atributos?',
      context: 'Atributos grandes.',
      options: [
        { label: 'A', text: 'Sem limite' },
        { label: 'B', text: 'Atributos contam no limite total de 256 KB; manter curtos' },
        { label: 'C', text: 'Usar Kinesis' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'Atributos fazem parte do payload total (<=256 KB).',
      relatedService: 'sns'
    },
    {
      id: 51,
      topic: 'sns',
      question: 'Como lidar com erros de parsing em Lambda subscriber?',
      context: 'Payload inválido.',
      options: [
        { label: 'A', text: 'Deixar falhar sempre' },
        { label: 'B', text: 'Usar DLQ da Lambda ou subscription DLQ para capturar e analisar' },
        { label: 'C', text: 'Ignorar' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Configure DLQ/On-failure para armazenar eventos problemáticos.',
      relatedService: 'sns'
    },
    {
      id: 52,
      topic: 'sns',
      question: 'Como bloquear publicação não autenticada via SDK?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Liberar anônimo' },
        { label: 'B', text: 'Exigir credenciais IAM e topic policy restrita' },
        { label: 'C', text: 'Usar HTTP' },
        { label: 'D', text: 'Usar email' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM + topic policy definem quem pode Publish/Subscribe.',
      relatedService: 'sns'
    },
    {
      id: 53,
      topic: 'sns',
      question: 'Como reduzir latência de publicação?',
      context: 'Performance.',
      options: [
        { label: 'A', text: 'Publicar com lotes' },
        { label: 'B', text: 'Usar PublishBatch (suporta até 10 mensagens) e paralelizar' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'PublishBatch reduz chamadas e melhora throughput.',
      relatedService: 'sns'
    },
    {
      id: 54,
      topic: 'sns',
      question: 'Qual é o limite de mensagens por PublishBatch?',
      context: 'Batch.',
      options: [
        { label: 'A', text: '5' },
        { label: 'B', text: '10' },
        { label: 'C', text: '25' },
        { label: 'D', text: '50' }
      ],
      correctAnswer: 'B',
      explanation: 'PublishBatch aceita até 10 mensagens.',
      relatedService: 'sns'
    },
    {
      id: 55,
      topic: 'sns',
      question: 'Como evitar envio para assinaturas suspensas?',
      context: 'Health.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Monitorar NumberOfNotificationsFailed e limpar/reativar assinaturas' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Limpe endpoints que falham repetidamente para evitar retries inúteis.',
      relatedService: 'sns'
    },
    {
      id: 56,
      topic: 'sns',
      question: 'Como segregar tópicos por domínio de negócio?',
      context: 'Arquitetura.',
      options: [
        { label: 'A', text: 'Um tópico para tudo' },
        { label: 'B', text: 'Criar tópicos por bounded context e usar filtros/assuntos coerentes' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar IAM' }
      ],
      correctAnswer: 'B',
      explanation: 'Tópicos alinhados a contextos evitam acoplamento e filtros complexos.',
      relatedService: 'sns'
    },
    {
      id: 57,
      topic: 'sns',
      question: 'Como rastrear mensagens com X-Ray?',
      context: 'Tracing.',
      options: [
        { label: 'A', text: 'SNS não propaga' },
        { label: 'B', text: 'Passar trace header em MessageAttributes e continuar no consumer' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não precisa' }
      ],
      correctAnswer: 'B',
      explanation: 'Propague trace context via atributos para rastrear ponta a ponta.',
      relatedService: 'sns'
    },
    {
      id: 58,
      topic: 'sns',
      question: 'Como lidar com picos de publicação?',
      context: 'Escalabilidade.',
      options: [
        { label: 'A', text: 'SNS não escala' },
        { label: 'B', text: 'SNS standard escala horizontalmente; use PublishBatch e paralelismo' },
        { label: 'C', text: 'Usar SQS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS standard escala para milhões de msgs/s; otimize com batch e produtores paralelos.',
      relatedService: 'sns'
    },
    {
      id: 59,
      topic: 'sns',
      question: 'Como garantir idempotência no subscriber?',
      context: 'Mensagens possivelmente duplicadas em Standard.',
      options: [
        { label: 'A', text: 'Standard nunca duplica' },
        { label: 'B', text: 'Implementar idempotência no consumer usando IDs/atributos' },
        { label: 'C', text: 'Usar apenas FIFO' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard pode entregar mais de uma vez; idempotência no consumer é necessária.',
      relatedService: 'sns'
    },
    {
      id: 60,
      topic: 'sns',
      question: 'Como publicar com atributos estruturados?',
      context: 'MessageAttributes.',
      options: [
        { label: 'A', text: 'Apenas string' },
        { label: 'B', text: 'Atributos suportam string, number, binary com DataType apropriado' },
        { label: 'C', text: 'Somente binary' },
        { label: 'D', text: 'Apenas boolean' }
      ],
      correctAnswer: 'B',
      explanation: 'MessageAttributes aceitam tipos básicos; úteis para filtros.',
      relatedService: 'sns'
    },
    {
      id: 61,
      topic: 'sns',
      question: 'Como proteger publicação via VPC Endpoint?',
      context: 'PrivateLink.',
      options: [
        { label: 'A', text: 'Não suporta' },
        { label: 'B', text: 'Criar endpoint interface e usar condition aws:SourceVpce na topic policy' },
        { label: 'C', text: 'Usar NACL' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'PrivateLink + policy restringe chamadas ao endpoint privado.',
      relatedService: 'sns'
    },
    {
      id: 62,
      topic: 'sns',
      question: 'Como enviar mensagem somente se atributo status = "READY"?',
      context: 'Filtro.',
      options: [
        { label: 'A', text: 'Consumer decide' },
        { label: 'B', text: 'Assinatura com filter policy {"status": ["READY"]}' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Filter policy entrega apenas mensagens com atributo correspondente.',
      relatedService: 'sns'
    },
    {
      id: 63,
      topic: 'sns',
      question: 'Como rotear mensagens para diferentes filas com base em tipo?',
      context: 'Router.',
      options: [
        { label: 'A', text: 'Produtor envia em filas diferentes' },
        { label: 'B', text: 'SNS + filter policies para cada assinatura SQS' },
        { label: 'C', text: 'Usar RDS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Assinaturas com filtros direcionam mensagens certas para cada fila.',
      relatedService: 'sns'
    },
    {
      id: 64,
      topic: 'sns',
      question: 'Como evitar recebimento duplicado em múltiplas assinaturas SQS?',
      context: 'Vários filtros que casam.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Projetar filter policies mutuamente exclusivas ou lidar com idempotência' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Filtros mutuamente exclusivos evitam duplicidade; caso contrário, idempotência.',
      relatedService: 'sns'
    },
    {
      id: 65,
      topic: 'sns',
      question: 'Como versionar payloads?',
      context: 'Evolução de contrato.',
      options: [
        { label: 'A', text: 'Não versionar' },
        { label: 'B', text: 'Incluir version nos atributos ou subject e manter compatibilidade no consumer' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'Sinalizar versão no atributo/subject para migrações seguras.',
      relatedService: 'sns'
    },
    {
      id: 66,
      topic: 'sns',
      question: 'Como evitar publish acidental em produção?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Usar mesmo tópico para tudo' },
        { label: 'B', text: 'Separar tópicos por ambiente, usar tags, policies e controles de acesso' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'Isolamento por ambiente + IAM/policies evita envios errados.',
      relatedService: 'sns'
    },
    {
      id: 67,
      topic: 'sns',
      question: 'Como definir TTL de retry para HTTP?',
      context: 'Delivery policy.',
      options: [
        { label: 'A', text: 'Não há TTL' },
        { label: 'B', text: 'Configurar healthyRetryPolicy e setar parâmetro numNoDelayRetries/maxDelay etc.' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar IAM' }
      ],
      correctAnswer: 'B',
      explanation: 'Delivery policy customiza retries e tempo total de tentativa.',
      relatedService: 'sns'
    },
    {
      id: 68,
      topic: 'sns',
      question: 'Como auditar quem publicou e quando?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'CloudWatch' },
        { label: 'B', text: 'CloudTrail registra Publish e Subscribe/Unsubscribe' },
        { label: 'C', text: 'S3' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail rastreia chamadas de API SNS.',
      relatedService: 'sns'
    },
    {
      id: 69,
      topic: 'sns',
      question: 'Como lidar com mensagens confidenciais?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Enviar texto puro' },
        { label: 'B', text: 'Usar SSE-KMS e opcionalmente criptografia de payload aplicação' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não publicar' }
      ],
      correctAnswer: 'B',
      explanation: 'SSE protege em repouso; payload pode ser criptografado no app.',
      relatedService: 'sns'
    },
    {
      id: 70,
      topic: 'sns',
      question: 'Qual é o limite de subscription por tópico?',
      context: 'Escala.',
      options: [
        { label: 'A', text: '50' },
        { label: 'B', text: '100' },
        { label: 'C', text: 'Assinaturas praticamente ilimitadas (limites de conta podem ser ajustados)' },
        { label: 'D', text: '1' }
      ],
      correctAnswer: 'C',
      explanation: 'SNS suporta muitas assinaturas; limites podem ser aumentados via suporte.',
      relatedService: 'sns'
    },
    {
      id: 71,
      topic: 'sns',
      question: 'Como enviar mensagens para regiões específicas?',
      context: 'Latência.',
      options: [
        { label: 'A', text: 'SNS é global' },
        { label: 'B', text: 'SNS é regional; publicar no tópico da região alvo ou replicar' },
        { label: 'C', text: 'Usar Route 53' },
        { label: 'D', text: 'Usar IAM' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS não é global; publique na região correta para proximidade.',
      relatedService: 'sns'
    },
    {
      id: 72,
      topic: 'sns',
      question: 'Como priorizar tipos de mensagem?',
      context: 'Prioridade.',
      options: [
        { label: 'A', text: 'Não há prioridade nativa' },
        { label: 'B', text: 'Usar tópicos separados por prioridade e consumidores tratam primeiro os críticos' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS não tem prioridade; separe tópicos ou canais.',
      relatedService: 'sns'
    },
    {
      id: 73,
      topic: 'sns',
      question: 'Como evitar que mensagens antigas fiquem retidas?',
      context: 'Retenção.',
      options: [
        { label: 'A', text: 'SNS não armazena; entrega imediata' },
        { label: 'B', text: 'Usar SQS se precisar reter' },
        { label: 'C', text: 'Aumentar retention' },
        { label: 'D', text: 'Não publicar' }
      ],
      correctAnswer: 'A',
      explanation: 'SNS não tem retenção; é push imediato. Use SQS para armazenar.',
      relatedService: 'sns'
    },
    {
      id: 74,
      topic: 'sns',
      question: 'Qual diferença de custo principal entre SNS e SQS?',
      context: 'Preço.',
      options: [
        { label: 'A', text: 'SNS cobra por hora' },
        { label: 'B', text: 'SNS cobra por request e data transfer out; SQS cobra por request' },
        { label: 'C', text: 'SQS é gratuito' },
        { label: 'D', text: 'SNS é gratuito' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS foca em requests e egress; SQS em requests.',
      relatedService: 'sns'
    },
    {
      id: 75,
      topic: 'sns',
      question: 'Como lidar com payload sensível enviado para email?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Enviar em claro' },
        { label: 'B', text: 'Evitar dados sensíveis via email ou criptografar client-side' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'B',
      explanation: 'Email não é canal seguro; minimize dados ou criptografe.',
      relatedService: 'sns'
    },
    {
      id: 76,
      topic: 'sns',
      question: 'Como testar localmente publicações?',
      context: 'Dev.',
      options: [
        { label: 'A', text: 'Só na nuvem' },
        { label: 'B', text: 'Usar LocalStack ou mocks para SNS' },
        { label: 'C', text: 'Usar Redis' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'LocalStack/mocks ajudam em dev local.',
      relatedService: 'sns'
    },
    {
      id: 77,
      topic: 'sns',
      question: 'Como limitar quem pode se inscrever?',
      context: 'Controle.',
      options: [
        { label: 'A', text: 'Topic policy restrita e approval manual para HTTP/Email' },
        { label: 'B', text: 'Permitir todos' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar Kinesis' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja subscribe/publish via policy e revise assinaturas.',
      relatedService: 'sns'
    },
    {
      id: 78,
      topic: 'sns',
      question: 'Como evitar erro por certificado inválido em HTTPS?',
      context: 'Webhooks.',
      options: [
        { label: 'A', text: 'Usar HTTP' },
        { label: 'B', text: 'Instalar certificado válido público (ACM) ou trusted CA' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Desativar TLS' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS verifica certificado do endpoint HTTPS; use certificado confiável.',
      relatedService: 'sns'
    },
    {
      id: 79,
      topic: 'sns',
      question: 'Como evitar oversubscription em mobile push?',
      context: 'Muitos devices.',
      options: [
        { label: 'A', text: 'Nada' },
        { label: 'B', text: 'Gerenciar device tokens ativos e remover inválidos; usar topics por grupo' },
        { label: 'C', text: 'Usar email' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Mantenha tokens atualizados para evitar erros e custo.',
      relatedService: 'sns'
    },
    {
      id: 80,
      topic: 'sns',
      question: 'Como debugar falhas em push mobile?',
      context: 'APNS/FCM erros.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Verificar delivery status logs e códigos de erro do provedor' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'Delivery status mostra motivos (token inválido, app desinstalado etc.).',
      relatedService: 'sns'
    },
    {
      id: 81,
      topic: 'sns',
      question: 'Como enviar assunto (subject) em SNS?',
      context: 'Subject.',
      options: [
        { label: 'A', text: 'Não há subject' },
        { label: 'B', text: 'Parâmetro Subject na publicação (até 100 chars) para protocolos que suportam' },
        { label: 'C', text: 'Usar atributo' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'Subject opcional para email/HTTP, limitado a 100 caracteres.',
      relatedService: 'sns'
    },
    {
      id: 82,
      topic: 'sns',
      question: 'Como evitar divulgar dados sensíveis em subject?',
      context: 'Privacidade.',
      options: [
        { label: 'A', text: 'Colocar tudo no subject' },
        { label: 'B', text: 'Manter subject genérico e dados no corpo/atributos apropriados' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não enviar' }
      ],
      correctAnswer: 'B',
      explanation: 'Subject pode ser visto em claro; mantenha genérico.',
      relatedService: 'sns'
    },
    {
      id: 83,
      topic: 'sns',
      question: 'Como usar SNS para notificações em tempo real para frontends?',
      context: 'Web.',
      options: [
        { label: 'A', text: 'Front-end assina via WebSocket direto' },
        { label: 'B', text: 'Back-end recebe SNS (SQS/Lambda) e envia via WebSocket/API para clientes' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS não entrega direto ao browser; use backend para repassar via WebSocket/SignalR/etc.',
      relatedService: 'sns'
    },
    {
      id: 84,
      topic: 'sns',
      question: 'Como aplicar rate limiting em publicações?',
      context: 'Produtor ruidoso.',
      options: [
        { label: 'A', text: 'SNS limita automaticamente' },
        { label: 'B', text: 'Implementar throttling no produtor ou API Gateway com usage plans' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Não publicar' }
      ],
      correctAnswer: 'B',
      explanation: 'Produtor deve limitar envio; SNS não throttla publicações por conta própria.',
      relatedService: 'sns'
    },
    {
      id: 85,
      topic: 'sns',
      question: 'Como garantir que eventos críticos não sejam perdidos?',
      context: 'Confiabilidade.',
      options: [
        { label: 'A', text: 'Usar Standard sem DLQ' },
        { label: 'B', text: 'Usar SNS + assinaturas SQS com DLQ e retries configurados' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar email apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS + DLQ dá durabilidade; SNS sozinho não armazena.',
      relatedService: 'sns'
    },
    {
      id: 86,
      topic: 'sns',
      question: 'Como medir latência de entrega?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'PublishSize' },
        { label: 'B', text: 'Usar métricas de delivery + timestamps no payload para calcular' },
        { label: 'C', text: 'Não é possível' },
        { label: 'D', text: 'Usar SMS' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS não fornece latência direta; inclua timestamp e meça no subscriber.',
      relatedService: 'sns'
    },
    {
      id: 87,
      topic: 'sns',
      question: 'Como configurar retry mínimo para HTTP?',
      context: 'Delivery policy.',
      options: [
        { label: 'A', text: 'Não há' },
        { label: 'B', text: 'Definir minDelayTarget e numNoDelayRetries na delivery policy' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Delivery policy permite customizar tempos e quantidades de tentativas.',
      relatedService: 'sns'
    },
    {
      id: 88,
      topic: 'sns',
      question: 'Como evitar que mensagens de um publisher vazem para outro cliente multi-tenant?',
      context: 'Isolamento.',
      options: [
        { label: 'A', text: 'Usar um único tópico compartilhado' },
        { label: 'B', text: 'Criar tópicos por tenant ou usar atributos + filtros rigorosos e policies por tenant' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar SES' }
      ],
      correctAnswer: 'B',
      explanation: 'Isolamento por tenant ou filtros/policies evita vazamento.',
      relatedService: 'sns'
    },
    {
      id: 89,
      topic: 'sns',
      question: 'Como limpar assinaturas órfãs HTTP quando app muda de domínio?',
      context: 'Higienização.',
      options: [
        { label: 'A', text: 'Deixar' },
        { label: 'B', text: 'Listar assinaturas, remover antigas e recriar com novo endpoint' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar SQS' }
      ],
      correctAnswer: 'B',
      explanation: 'Remova endpoints antigos para evitar retries inúteis.',
      relatedService: 'sns'
    },
    {
      id: 90,
      topic: 'sns',
      question: 'Como debugar filter policy que não entrega mensagens?',
      context: 'Filtro não casa.',
      options: [
        { label: 'A', text: 'Filtro sempre funciona' },
        { label: 'B', text: 'Verificar nomes/valores dos atributos e usar matchers corretos (string, numeric, prefix, anything-but)' },
        { label: 'C', text: 'Usar SMS' },
        { label: 'D', text: 'Usar FIFO' }
      ],
      correctAnswer: 'B',
      explanation: 'Filtros exigem atributos corretos e tipos adequados; revise policy.',
      relatedService: 'sns'
    }
  ],

  'security-groups': [
    {
      id: 1,
      topic: 'security-groups',
      question: 'O que caracteriza um Security Group (SG) na AWS?',
      context: 'Comportamento de firewall em EC2, ENI, ALB, RDS, etc.',
      options: [
        { label: 'A', text: 'É stateless e exige regras de ida e volta' },
        { label: 'B', text: 'É stateful e acompanha o tráfego de retorno automaticamente' },
        { label: 'C', text: 'Funciona apenas em nível de VPC' },
        { label: 'D', text: 'Só controla tráfego de saída' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs são stateful: se a conexão foi permitida na entrada, a resposta é automaticamente permitida sem regra explícita de saída (e vice-versa).',
      relatedService: 'security-groups'
    },
    {
      id: 2,
      topic: 'security-groups',
      question: 'Onde um Security Group é aplicado?',
      context: 'Escopo do recurso.',
      options: [
        { label: 'A', text: 'Na subnet inteira' },
        { label: 'B', text: 'Na interface de rede (ENI) do recurso' },
        { label: 'C', text: 'No Internet Gateway' },
        { label: 'D', text: 'No NAT Gateway' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs são associados a ENIs (EC2, ALB, RDS, ECS/ENI, etc.). Não se aplicam à subnet ou a IGW/NAT.',
      relatedService: 'security-groups'
    },
    {
      id: 3,
      topic: 'security-groups',
      question: 'Qual é o padrão de tráfego quando um SG é criado?',
      context: 'Regras default.',
      options: [
        { label: 'A', text: 'Entrada: tudo permitido; Saída: tudo negado' },
        { label: 'B', text: 'Entrada: tudo negado; Saída: tudo permitido' },
        { label: 'C', text: 'Entrada e Saída: tudo permitido' },
        { label: 'D', text: 'Entrada e Saída: tudo negado' }
      ],
      correctAnswer: 'B',
      explanation: 'Por padrão, não há regras de inbound (tudo negado) e existe uma regra outbound all traffic (tudo permitido).',
      relatedService: 'security-groups'
    },
    {
      id: 4,
      topic: 'security-groups',
      question: 'Como permitir acesso SSH (22) apenas do seu IP público?',
      context: 'Acesso administrativo em EC2.',
      options: [
        { label: 'A', text: 'Inbound: TCP 22 de 0.0.0.0/0' },
        { label: 'B', text: 'Inbound: TCP 22 do seu IP em /32' },
        { label: 'C', text: 'Outbound: TCP 22 do seu IP' },
        { label: 'D', text: 'Inbound: UDP 22 do seu IP' }
      ],
      correctAnswer: 'B',
      explanation: 'Permita apenas o seu IP/CIDR em inbound TCP 22. Evite 0.0.0.0/0 por segurança.',
      relatedService: 'security-groups'
    },
    {
      id: 5,
      topic: 'security-groups',
      question: 'Como permitir que apenas um ALB acesse suas instâncias (porta 80)?',
      context: 'Tráfego interno via SG reference.',
      options: [
        { label: 'A', text: 'Inbound 80 de 0.0.0.0/0' },
        { label: 'B', text: 'Inbound 80 referenciando o SG do ALB como origem' },
        { label: 'C', text: 'Outbound 80 para o ALB' },
        { label: 'D', text: 'Inbound 443 do ALB' }
      ],
      correctAnswer: 'B',
      explanation: 'Use SG-to-SG: origem da regra é o SG do ALB. Evita exposição pública e muda dinamicamente se o ALB trocar de IP.',
      relatedService: 'security-groups'
    },
    {
      id: 6,
      topic: 'security-groups',
      question: 'Qual é a diferença essencial entre NACLs e SGs?',
      context: 'Stateful vs stateless.',
      options: [
        { label: 'A', text: 'NACLs são stateful e SGs stateless' },
        { label: 'B', text: 'NACLs são stateless; SGs são stateful' },
        { label: 'C', text: 'Ambos são stateful' },
        { label: 'D', text: 'Ambos são stateless' }
      ],
      correctAnswer: 'B',
      explanation: 'NACLs: stateless (precisa de regra de ida e volta). SGs: stateful (retorno é permitido automaticamente).',
      relatedService: 'security-groups'
    },
    {
      id: 7,
      topic: 'security-groups',
      question: 'Quantos SGs posso associar a uma ENI?',
      context: 'Limites comuns.',
      options: [
        { label: 'A', text: 'Somente 1' },
        { label: 'B', text: 'Até o limite por região/conta (geralmente 5, ajustável)' },
        { label: 'C', text: 'Ilimitado' },
        { label: 'D', text: 'Depende do tipo de instância, sempre 2' }
      ],
      correctAnswer: 'B',
      explanation: 'Por padrão, até 5 SGs por ENI (pode variar e ser aumentado via suporte).',
      relatedService: 'security-groups'
    },
    {
      id: 8,
      topic: 'security-groups',
      question: 'Como restringir saída (egress) de uma instância apenas para serviços específicos?',
      context: 'Hardening outbound.',
      options: [
        { label: 'A', text: 'Remover a regra outbound all-traffic e criar regras específicas' },
        { label: 'B', text: 'Inbound apenas' },
        { label: 'C', text: 'Usar apenas NACL' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'SGs possuem regra outbound all traffic por padrão. Remova e crie regras egress específicas para destinos/portas necessárias.',
      relatedService: 'security-groups'
    },
    {
      id: 9,
      topic: 'security-groups',
      question: 'Qual prática é recomendada para acesso HTTP público ao ALB?',
      context: 'Exposição pública controlada.',
      options: [
        { label: 'A', text: 'Inbound 80 de 0.0.0.0/0 no SG do ALB' },
        { label: 'B', text: 'Inbound 22 de 0.0.0.0/0 no SG do ALB' },
        { label: 'C', text: 'Inbound 80 apenas do SG das instâncias' },
        { label: 'D', text: 'Nenhuma regra inbound' }
      ],
      correctAnswer: 'A',
      explanation: 'ALB público deve aceitar tráfego de clientes da internet (0.0.0.0/0) nas portas expostas (80/443). Backends devem restringir ao SG do ALB.',
      relatedService: 'security-groups'
    },
    {
      id: 10,
      topic: 'security-groups',
      question: 'Como liberar comunicação interna entre instâncias de um mesmo tier sem abrir para internet?',
      context: 'Somente tráfego intra-tier.',
      options: [
        { label: 'A', text: 'Origem = SG do próprio tier (self-referencing)' },
        { label: 'B', text: 'Origem = 0.0.0.0/0' },
        { label: 'C', text: 'Origem = VPC CIDR' },
        { label: 'D', text: 'Origem = Internet Gateway' }
      ],
      correctAnswer: 'A',
      explanation: 'Regra inbound referenciando o próprio SG permite que recursos com esse SG se comuniquem entre si, sem abrir CIDRs amplos.',
      relatedService: 'security-groups'
    },
    {
      id: 11,
      topic: 'security-groups',
      question: 'Qual porta deve ser liberada para acesso HTTPS a uma aplicação?',
      context: 'Tráfego seguro de clientes.',
      options: [
        { label: 'A', text: '80/TCP' },
        { label: 'B', text: '443/TCP' },
        { label: 'C', text: '22/TCP' },
        { label: 'D', text: '53/UDP' }
      ],
      correctAnswer: 'B',
      explanation: 'HTTPS usa 443/TCP. HTTP usa 80/TCP. SSH 22/TCP. DNS 53/UDP/TCP.',
      relatedService: 'security-groups'
    },
    {
      id: 12,
      topic: 'security-groups',
      question: 'É possível referenciar SGs de outra VPC diretamente?',
      context: 'Cenário multi-VPC.',
      options: [
        { label: 'A', text: 'Sim, sempre' },
        { label: 'B', text: 'Somente se houver peering e SGs forem compartilhados (mesma conta/região compatível)' },
        { label: 'C', text: 'Nunca é possível' },
        { label: 'D', text: 'Somente com IGW' }
      ],
      correctAnswer: 'B',
      explanation: 'Referenciar SG cross-VPC é suportado em condições específicas (mesma região, contas/ownership compatíveis e conectividade). Caso contrário, use CIDRs ou PrivateLink.',
      relatedService: 'security-groups'
    },
    {
      id: 13,
      topic: 'security-groups',
      question: 'Como permitir saída apenas para endpoints privados (ex: S3 via Gateway Endpoint)?',
      context: 'Egress restrito.',
      options: [
        { label: 'A', text: 'Usar SG referenciando endpoint diretamente' },
        { label: 'B', text: 'Restringir outbound por prefix lists e rotas para endpoints' },
        { label: 'C', text: 'Abrir 0.0.0.0/0' },
        { label: 'D', text: 'Usar NACLs somente' }
      ],
      correctAnswer: 'B',
      explanation: 'Combine SG outbound restrito com prefix lists gerenciadas e route tables que enviam tráfego para endpoints privados.',
      relatedService: 'security-groups'
    },
    {
      id: 14,
      topic: 'security-groups',
      question: 'O que acontece se você remover todas as regras outbound de um SG?',
      context: 'Bloqueio de saída.',
      options: [
        { label: 'A', text: 'Nada muda: saída continua liberada' },
        { label: 'B', text: 'Todo tráfego de saída é negado' },
        { label: 'C', text: 'Somente DNS sai' },
        { label: 'D', text: 'Somente ICMP sai' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem regras outbound, não há tráfego de saída permitido (exceto retornos de conexões iniciadas via inbound permitido).',
      relatedService: 'security-groups'
    },
    {
      id: 15,
      topic: 'security-groups',
      question: 'Qual é a melhor forma de permitir que uma camada app acesse uma camada db (porta 5432)?',
      context: 'Acesso dirigido app → db.',
      options: [
        { label: 'A', text: 'Inbound 5432 do SG da camada app no SG do db' },
        { label: 'B', text: 'Inbound 5432 de 0.0.0.0/0 no db' },
        { label: 'C', text: 'Outbound 5432 no db' },
        { label: 'D', text: 'Inbound 80 no db' }
      ],
      correctAnswer: 'A',
      explanation: 'Referencie o SG da aplicação como origem nas regras do banco, evitando CIDRs amplos e garantindo least privilege.',
      relatedService: 'security-groups'
    },
    {
      id: 16,
      topic: 'security-groups',
      question: 'SGs suportam regras com intervalos de portas?',
      context: 'Definições de regras.',
      options: [
        { label: 'A', text: 'Não, apenas portas individuais' },
        { label: 'B', text: 'Sim, usando fromPort/toPort' },
        { label: 'C', text: 'Apenas para UDP' },
        { label: 'D', text: 'Apenas para ICMP' }
      ],
      correctAnswer: 'B',
      explanation: 'É possível especificar um range (ex: 7000–7999) com fromPort/toPort para TCP/UDP.',
      relatedService: 'security-groups'
    },
    {
      id: 17,
      topic: 'security-groups',
      question: 'Qual afirmação é verdadeira sobre ordem de avaliação de regras em SGs?',
      context: 'Sem prioridade numérica.',
      options: [
        { label: 'A', text: 'Regras são avaliadas em ordem e a primeira que casa decide' },
        { label: 'B', text: 'Regras são avaliadas como um conjunto; qualquer regra que permita autoriza' },
        { label: 'C', text: 'Regras deny têm precedência' },
        { label: 'D', text: 'Há número de prioridade como em NACLs' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs não têm ordenação ou deny explícito. Se qualquer regra permitir, o tráfego é permitido; caso contrário, é negado implicitamente.',
      relatedService: 'security-groups'
    },
    {
      id: 18,
      topic: 'security-groups',
      question: 'É possível criar regras de deny em Security Groups?',
      context: 'Modelo de permissão.',
      options: [
        { label: 'A', text: 'Sim, via regra com action deny' },
        { label: 'B', text: 'Não, apenas allow; nega-se por ausência de permissão' },
        { label: 'C', text: 'Sim, apenas para ICMP' },
        { label: 'D', text: 'Sim, apenas para IPv6' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs só possuem regras de allow. Para negar explicitamente, use NACLs ou omita a regra.',
      relatedService: 'security-groups'
    },
    {
      id: 19,
      topic: 'security-groups',
      question: 'Qual é o efeito de associar múltiplos SGs a uma ENI?',
      context: 'Composição de regras.',
      options: [
        { label: 'A', text: 'Apenas o primeiro é aplicado' },
        { label: 'B', text: 'As regras são combinadas (união)' },
        { label: 'C', text: 'A interseção das regras é aplicada' },
        { label: 'D', text: 'A ordem define prioridade' }
      ],
      correctAnswer: 'B',
      explanation: 'As permissões efetivas são a união de todas as regras dos SGs anexados.',
      relatedService: 'security-groups'
    },
    {
      id: 20,
      topic: 'security-groups',
      question: 'Como liberar DNS para instâncias que usam o resolver da VPC?',
      context: 'Necessidade de resolução de nomes.',
      options: [
        { label: 'A', text: 'Outbound UDP/TCP 53 para o resolver (normalmente .2 do CIDR)' },
        { label: 'B', text: 'Inbound UDP 53 da internet' },
        { label: 'C', text: 'Inbound TCP 53 da internet' },
        { label: 'D', text: 'Nenhuma regra é necessária' }
      ],
      correctAnswer: 'A',
      explanation: 'Para resolver nomes, a instância precisa sair para o resolver (porta 53 UDP/TCP). Não exponha inbound desnecessariamente.',
      relatedService: 'security-groups'
    },
    {
      id: 21,
      topic: 'security-groups',
      question: 'Qual regra configura um bastion host para SSH nas instâncias privadas?',
      context: 'Acesso via jump host.',
      options: [
        { label: 'A', text: 'Instâncias privadas permitem 22 de 0.0.0.0/0' },
        { label: 'B', text: 'Instâncias privadas permitem 22 do SG do bastion' },
        { label: 'C', text: 'Bastion permite 22 do SG das privadas' },
        { label: 'D', text: 'Instâncias privadas abrem 3389' }
      ],
      correctAnswer: 'B',
      explanation: 'Permita 22/TCP nas privadas a partir do SG associado ao bastion. O bastion, por sua vez, restringe 22 ao seu IP público.',
      relatedService: 'security-groups'
    },
    {
      id: 22,
      topic: 'security-groups',
      question: 'Como permitir apenas HTTPS do CloudFront para sua aplicação no ALB?',
      context: 'Origem de CDN confiável.',
      options: [
        { label: 'A', text: 'Inbound 443 no ALB a partir do SG da origem/ALB do CloudFront' },
        { label: 'B', text: 'Inbound 443 de 0.0.0.0/0' },
        { label: 'C', text: 'Inbound 80 de 0.0.0.0/0' },
        { label: 'D', text: 'Outbound 443 no ALB' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja o ALB para aceitar apenas do componente upstream (ex: ALB/origin do CloudFront) via referência de SG.',
      relatedService: 'security-groups'
    },
    {
      id: 23,
      topic: 'security-groups',
      question: 'O que considerar ao abrir portas para health checks de load balancers?',
      context: 'Liveness e readiness.',
      options: [
        { label: 'A', text: 'Permitir a origem: SG do balanceador nas portas de health' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Somente outbound' },
        { label: 'D', text: 'Usar NACLs com deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Os health checks vêm do SG do balanceador; libere apenas essa origem para as portas verificadas.',
      relatedService: 'security-groups'
    },
    {
      id: 24,
      topic: 'security-groups',
      question: 'Como liberar acesso RDP (3389) com segurança mínima?',
      context: 'Windows bastion.',
      options: [
        { label: 'A', text: '3389 de 0.0.0.0/0' },
        { label: 'B', text: '3389 do seu IP /32 ou via bastion/NICE DCV/SSM' },
        { label: 'C', text: '3389 apenas outbound' },
        { label: 'D', text: 'Abrir ICMP' }
      ],
      correctAnswer: 'B',
      explanation: 'Restrinja a um IP específico ou use soluções gerenciadas (SSM Session Manager) para evitar exposição pública.',
      relatedService: 'security-groups'
    },
    {
      id: 25,
      topic: 'security-groups',
      question: 'Como tratar ICMP (ping) em SGs?',
      context: 'Diagnóstico de rede.',
      options: [
        { label: 'A', text: 'Permitir somente outbound' },
        { label: 'B', text: 'Criar regra inbound tipo ICMP Echo Request conforme necessidade' },
        { label: 'C', text: 'Não é possível controlar ICMP' },
        { label: 'D', text: 'Permitir tudo sempre' }
      ],
      correctAnswer: 'B',
      explanation: 'Permita ICMP conforme o uso (ping/troubleshooting). Evite abrir para todos desnecessariamente.',
      relatedService: 'security-groups'
    },
    {
      id: 26,
      topic: 'security-groups',
      question: 'Como aplicar princípio do menor privilégio em SGs?',
      context: 'Hardening.',
      options: [
        { label: 'A', text: 'Usar 0.0.0.0/0 para simplificar' },
        { label: 'B', text: 'Permitir apenas portas e origens necessárias, usando SG-to-SG quando possível' },
        { label: 'C', text: 'Abrir todas as portas e auditar depois' },
        { label: 'D', text: 'Usar apenas NACLs' }
      ],
      correctAnswer: 'B',
      explanation: 'Defina regras específicas por porta/protocolo e use referência a SGs para evitar dependência de IPs variáveis.',
      relatedService: 'security-groups'
    },
    {
      id: 27,
      topic: 'security-groups',
      question: 'Como permitir tráfego para um endpoint PrivateLink (interface endpoint)?',
      context: 'Consumo de serviços privados.',
      options: [
        { label: 'A', text: 'Permitir outbound para a ENI do endpoint (SG do endpoint) nas portas do serviço' },
        { label: 'B', text: 'Apenas inbound' },
        { label: 'C', text: 'Abrir tudo' },
        { label: 'D', text: 'Usar IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink expõe ENIs com SGs. Ajuste outbound/inbound conforme o fluxo necessário para o serviço alvo.',
      relatedService: 'security-groups'
    },
    {
      id: 28,
      topic: 'security-groups',
      question: 'Qual SG deve permitir a porta do banco em uma arquitetura ALB → EC2 → RDS?',
      context: 'Cadeia correta.',
      options: [
        { label: 'A', text: 'SG do RDS permite do SG das EC2 (app) na porta do banco' },
        { label: 'B', text: 'SG do ALB permite do SG do RDS' },
        { label: 'C', text: 'SG da EC2 permite do SG do RDS' },
        { label: 'D', text: 'SG do RDS permite 0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Somente a camada app deve acessar o RDS. O ALB não fala com o RDS diretamente.',
      relatedService: 'security-groups'
    },
    {
      id: 29,
      topic: 'security-groups',
      question: 'Como permitir que um serviço ECS Fargate receba tráfego do ALB?',
      context: 'Targets do ALB.',
      options: [
        { label: 'A', text: 'SG da task/ENI do ECS permite do SG do ALB nas portas do serviço' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Apenas outbound' },
        { label: 'D', text: 'Usar NACLs' }
      ],
      correctAnswer: 'A',
      explanation: 'As ENIs das tasks precisam permitir inbound do SG do ALB para a porta do container.',
      relatedService: 'security-groups'
    },
    {
      id: 30,
      topic: 'security-groups',
      question: 'Qual medida ajuda a auditar e detectar aberturas excessivas em SGs?',
      context: 'Governança e segurança.',
      options: [
        { label: 'A', text: 'AWS Config rules (por ex.: restricted-ssh, restricted-common-ports)' },
        { label: 'B', text: 'CloudWatch Logs Insights no IGW' },
        { label: 'C', text: 'VPC Flow Logs para negar regras' },
        { label: 'D', text: 'Abrir portas e confiar em WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'AWS Config pode avaliar SGs abertos (0.0.0.0/0) em portas sensíveis e acionar remediação automática.',
      relatedService: 'security-groups'
    },
    {
      id: 31,
      topic: 'security-groups',
      question: 'Qual porta liberar para HTTP/2 sobre TLS em ALB?',
      context: 'Clientes usam HTTPS com HTTP/2.',
      options: [
        { label: 'A', text: '80/TCP' },
        { label: 'B', text: '443/TCP' },
        { label: 'C', text: '22/TCP' },
        { label: 'D', text: '53/TCP' }
      ],
      correctAnswer: 'B',
      explanation: 'HTTP/2 opera sobre TLS na porta 443; libere inbound 443 no SG do ALB.',
      relatedService: 'security-groups'
    },
    {
      id: 32,
      topic: 'security-groups',
      question: 'Como liberar egress para updates de SO (repositórios externos) de instâncias privadas?',
      context: 'Saída controlada.',
      options: [
        { label: 'A', text: 'Outbound 0.0.0.0/0 em 80/443 (ou via proxy/NAT)' },
        { label: 'B', text: 'Inbound 80/443' },
        { label: 'C', text: 'Somente ICMP' },
        { label: 'D', text: 'Nenhuma regra' }
      ],
      correctAnswer: 'A',
      explanation: 'Pacotes são baixados outbound 80/443. Ideal: restringir a proxy/NAT e prefix lists quando possível.',
      relatedService: 'security-groups'
    },
    {
      id: 33,
      topic: 'security-groups',
      question: 'Para NLB (L4) público, qual regra no SG do target (EC2) é necessária?',
      context: 'Tráfego vem do NLB.',
      options: [
        { label: 'A', text: 'Inbound da internet (0.0.0.0/0)' },
        { label: 'B', text: 'Inbound do SG do NLB ou do IP do NLB' },
        { label: 'C', text: 'Nenhuma, NLB ignora SGs' },
        { label: 'D', text: 'Apenas outbound' }
      ],
      correctAnswer: 'B',
      explanation: 'Targets devem permitir tráfego originado do NLB. Em algumas arquiteturas usa-se CIDR/SG de origem apropriado.',
      relatedService: 'security-groups'
    },
    {
      id: 34,
      topic: 'security-groups',
      question: 'Como liberar EFS (NFS) para instâncias em subnets privadas?',
      context: 'Porta do NFS.',
      options: [
        { label: 'A', text: 'Inbound 2049/TCP no SG do EFS a partir do SG das instâncias' },
        { label: 'B', text: 'Inbound 22/TCP' },
        { label: 'C', text: 'Inbound 80/TCP' },
        { label: 'D', text: 'Nenhuma regra é necessária' }
      ],
      correctAnswer: 'A',
      explanation: 'EFS usa 2049/TCP. Libere no SG dos mount targets (EFS) a origem = SG das instâncias.',
      relatedService: 'security-groups'
    },
    {
      id: 35,
      topic: 'security-groups',
      question: 'Qual regra para permitir que Lambda em VPC acesse RDS?',
      context: 'Lambda com ENI.',
      options: [
        { label: 'A', text: 'SG do RDS permite inbound do SG da Lambda' },
        { label: 'B', text: 'SG do RDS permite 0.0.0.0/0' },
        { label: 'C', text: 'Lambda abre inbound 3306' },
        { label: 'D', text: 'Nenhuma necessária' }
      ],
      correctAnswer: 'A',
      explanation: 'Lambda em VPC anexa ENIs com SGs. O RDS deve aceitar do SG da Lambda na porta do banco.',
      relatedService: 'security-groups'
    },
    {
      id: 36,
      topic: 'security-groups',
      question: 'Como permitir acesso a Redis/ElastiCache (porta 6379) apenas de um app?',
      context: 'Cache privado.',
      options: [
        { label: 'A', text: 'SG do cache permite inbound 6379 do SG do app' },
        { label: 'B', text: 'Abrir público 6379' },
        { label: 'C', text: 'Outbound 6379 no cache' },
        { label: 'D', text: 'Usar 0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Apenas o SG do app deve ser origem permitida ao SG do cache para 6379.',
      relatedService: 'security-groups'
    },
    {
      id: 37,
      topic: 'security-groups',
      question: 'Em IPv6, como permitir saída sem permitir entrada?',
      context: 'Sem NAT em IPv6.',
      options: [
        { label: 'A', text: 'Egress-only Internet Gateway + outbound permitido' },
        { label: 'B', text: 'NAT Gateway' },
        { label: 'C', text: 'IGW com deny' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'A',
      explanation: 'Egress-only IGW permite apenas saída IPv6; SG controla portas específicas.',
      relatedService: 'security-groups'
    },
    {
      id: 38,
      topic: 'security-groups',
      question: 'Qual regra ajuda a evitar exposição acidental de SSH a todos?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'AWS Config rule: restricted-ssh' },
        { label: 'B', text: 'Abrir 22 para todos' },
        { label: 'C', text: 'NACL allow all' },
        { label: 'D', text: 'WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'Config pode detectar 0.0.0.0/0 na porta 22 e acionar remediação.',
      relatedService: 'security-groups'
    },
    {
      id: 39,
      topic: 'security-groups',
      question: 'Como permitir tráfego de retorno de uma conexão iniciada por outbound?',
      context: 'Stateful behavior.',
      options: [
        { label: 'A', text: 'Criar regra inbound para portas efêmeras' },
        { label: 'B', text: 'Nada extra: SG é stateful e permite o retorno' },
        { label: 'C', text: 'Adicionar NACL' },
        { label: 'D', text: 'Abrir ICMP' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs permitem tráfego de resposta automaticamente para conexões iniciadas (stateful).',
      relatedService: 'security-groups'
    },
    {
      id: 40,
      topic: 'security-groups',
      question: 'Em peering entre VPCs, SGs sozinhos permitem tráfego cross-VPC?',
      context: 'Roteamento necessário.',
      options: [
        { label: 'A', text: 'Sim, sempre' },
        { label: 'B', text: 'Não; é preciso peering/rotas e regras SG/NACL apropriadas' },
        { label: 'C', text: 'Apenas NACLs resolvem' },
        { label: 'D', text: 'Basta IGW' }
      ],
      correctAnswer: 'B',
      explanation: 'Necessita conectividade (peering/TGW/VPN/DX) + rotas + permissões nos SGs de ambos lados.',
      relatedService: 'security-groups'
    },
    {
      id: 41,
      topic: 'security-groups',
      question: 'Como liberar saída para um serviço público da AWS sem abrir toda internet?',
      context: 'Restringindo egress.',
      options: [
        { label: 'A', text: 'Usar VPC Endpoint (Gateway/Interface) e prefix lists' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'IGW + deny' },
        { label: 'D', text: 'WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoints privados e prefix lists permitem outbound controlado a serviços específicos.',
      relatedService: 'security-groups'
    },
    {
      id: 42,
      topic: 'security-groups',
      question: 'Como restringir acesso ao OpenSearch/ES gerenciado?',
      context: 'Acesso somente de apps internos.',
      options: [
        { label: 'A', text: 'SG do domínio permite do SG do app' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Apenas outbound' },
        { label: 'D', text: 'NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Domínio em VPC usa SG; permita apenas origem dos SGs das aplicações autorizadas.',
      relatedService: 'security-groups'
    },
    {
      id: 43,
      topic: 'security-groups',
      question: 'Qual prática para endpoints de banco expostos acidentalmente?',
      context: 'Hardening imediato.',
      options: [
        { label: 'A', text: 'Restringir SG rapidamente ao SG/app ou CIDR necessário' },
        { label: 'B', text: 'Aumentar TTL de DNS' },
        { label: 'C', text: 'Adicionar mais instâncias' },
        { label: 'D', text: 'Usar 0.0.0.0/0 temporariamente' }
      ],
      correctAnswer: 'A',
      explanation: 'Feche SGs imediatamente, removendo 0.0.0.0/0 e usando referência a SGs ou CIDR estrito.',
      relatedService: 'security-groups'
    },
    {
      id: 44,
      topic: 'security-groups',
      question: 'É possível usar SGs com AWS App Runner/Cloud Map diretamente?',
      context: 'Serviços gerenciados.',
      options: [
        { label: 'A', text: 'Sim, quando o serviço tem ENI em VPC' },
        { label: 'B', text: 'Não, nunca' },
        { label: 'C', text: 'Apenas com NACLs' },
        { label: 'D', text: 'Apenas com WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'Serviços que anexam ENIs à VPC usam SGs (ex.: App Runner VPC connector).',
      relatedService: 'security-groups'
    },
    {
      id: 45,
      topic: 'security-groups',
      question: 'Qual porta liberar para PostgreSQL no RDS?',
      context: 'Conexão ao banco.',
      options: [
        { label: 'A', text: '3306' },
        { label: 'B', text: '1521' },
        { label: 'C', text: '5432' },
        { label: 'D', text: '6379' }
      ],
      correctAnswer: 'C',
      explanation: 'PostgreSQL usa 5432; MySQL/MariaDB 3306; Oracle 1521; Redis 6379.',
      relatedService: 'security-groups'
    },
    {
      id: 46,
      topic: 'security-groups',
      question: 'SGs afetam tráfego entre processos dentro da mesma instância?',
      context: 'Loopback/localhost.',
      options: [
        { label: 'A', text: 'Sim, bloqueiam localhost' },
        { label: 'B', text: 'Não; SGs controlam tráfego de/para a ENI (rede), não localhost' },
        { label: 'C', text: 'Apenas UDP' },
        { label: 'D', text: 'Apenas ICMP' }
      ],
      correctAnswer: 'B',
      explanation: 'SGs atuam na interface de rede, não no loopback interno da máquina.',
      relatedService: 'security-groups'
    },
    {
      id: 47,
      topic: 'security-groups',
      question: 'Como liberar MSK/Kafka (9092/9094) para produtores dentro da VPC?',
      context: 'Cluster privado.',
      options: [
        { label: 'A', text: 'SG do MSK permite das apps nas portas do cluster' },
        { label: 'B', text: 'Abrir público' },
        { label: 'C', text: 'Apenas outbound' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'MSK em VPC usa SG; permita apenas dos SGs das aplicações produtoras/consumidoras.',
      relatedService: 'security-groups'
    },
    {
      id: 48,
      topic: 'security-groups',
      question: 'Como segregar ambientes (dev/stage/prod) com SGs?',
      context: 'Isolamento lógico.',
      options: [
        { label: 'A', text: 'SGs distintos por ambiente e regras cruzadas estritas' },
        { label: 'B', text: 'Um SG global para tudo' },
        { label: 'C', text: 'Abrir 0.0.0.0/0' },
        { label: 'D', text: 'Usar apenas NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'Crie SGs separados e restrinja comunicações cross-ambiente para minimizar blast radius.',
      relatedService: 'security-groups'
    },
    {
      id: 49,
      topic: 'security-groups',
      question: 'Como permitir acesso do API Gateway VPC Link para seu ALB privado?',
      context: 'Integração privada.',
      options: [
        { label: 'A', text: 'SG do ALB permite do SG do VPC Link' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Outbound 443 do ALB' },
        { label: 'D', text: 'NACL allow all' }
      ],
      correctAnswer: 'A',
      explanation: 'VPC Link cria ENIs com SG. O ALB precisa permitir inbound do SG dessas ENIs.',
      relatedService: 'security-groups'
    },
    {
      id: 50,
      topic: 'security-groups',
      question: 'Qual abordagem para liberar somente algumas origens públicas conhecidas?',
      context: 'Acesso controlado por IP.',
      options: [
        { label: 'A', text: 'Listas de IP (CIDRs) específicas em regras inbound' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Apenas SG-to-SG' },
        { label: 'D', text: 'Apenas NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Use CIDRs específicos (ex.: escritórios/VPN). Para IPs dinâmicos, prefira Vpn/Client VPN ou federation.',
      relatedService: 'security-groups'
    },
    {
      id: 51,
      topic: 'security-groups',
      question: 'Qual é o impacto de remover o SG padrão de uma VPC?',
      context: 'Default SG.',
      options: [
        { label: 'A', text: 'VPC fica sem rede' },
        { label: 'B', text: 'Não pode remover; o default SG não é deletável' },
        { label: 'C', text: 'Remove todas as subnets' },
        { label: 'D', text: 'Quebra o IGW' }
      ],
      correctAnswer: 'B',
      explanation: 'O SG default é gerenciado e não pode ser deletado; pode ser modificado (com cautela).',
      relatedService: 'security-groups'
    },
    {
      id: 52,
      topic: 'security-groups',
      question: 'O default SG inicialmente permite o quê?',
      context: 'Comportamento inicial.',
      options: [
        { label: 'A', text: 'Todo inbound de 0.0.0.0/0' },
        { label: 'B', text: 'Inbound apenas do próprio SG (self) e todo outbound' },
        { label: 'C', text: 'Nada' },
        { label: 'D', text: 'Apenas SSH' }
      ],
      correctAnswer: 'B',
      explanation: 'Default SG: ingress de si mesmo (comunicação interna) e egress all traffic.',
      relatedService: 'security-groups'
    },
    {
      id: 53,
      topic: 'security-groups',
      question: 'Como lidar com portas efêmeras nos SGs?',
      context: 'Retornos e conexões.',
      options: [
        { label: 'A', text: 'Abrir inbound 1024-65535' },
        { label: 'B', text: 'Confiar no stateful: não abrir inbound efêmero para respostas' },
        { label: 'C', text: 'Bloquear outbound' },
        { label: 'D', text: 'Usar NACL deny' }
      ],
      correctAnswer: 'B',
      explanation: 'Para respostas, SGs stateful não exigem inbound efêmero. Somente para conexões iniciadas de fora é que inbound é necessário.',
      relatedService: 'security-groups'
    },
    {
      id: 54,
      topic: 'security-groups',
      question: 'Como permitir acesso do Systems Manager Session Manager às instâncias sem abrir SSH?',
      context: 'Acesso sem porta 22.',
      options: [
        { label: 'A', text: 'Ativar SSM Agent e permitir egress 443 para endpoints SSM' },
        { label: 'B', text: 'Abrir 22' },
        { label: 'C', text: 'Abrir 80' },
        { label: 'D', text: 'Usar WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'Session Manager usa outbound 443 para endpoints SSM. Não requer inbound 22.',
      relatedService: 'security-groups'
    },
    {
      id: 55,
      topic: 'security-groups',
      question: 'Como publicar um serviço interno para outras contas com mínima exposição?',
      context: 'Sem roteamento L3.',
      options: [
        { label: 'A', text: 'PrivateLink + SGs restritos por consumidor' },
        { label: 'B', text: 'IGW + 0.0.0.0/0' },
        { label: 'C', text: 'Peering transitivo' },
        { label: 'D', text: 'Abrir NACL' }
      ],
      correctAnswer: 'A',
      explanation: 'PrivateLink expõe ENIs privados; controle acesso via SGs e policies.',
      relatedService: 'security-groups'
    },
    {
      id: 56,
      topic: 'security-groups',
      question: 'Qual cuidado ao usar VPC CIDR amplo em regras de SG?',
      context: 'Exposição desnecessária.',
      options: [
        { label: 'A', text: 'Pode permitir acesso entre tiers indevidos; prefira SG-to-SG' },
        { label: 'B', text: 'É sempre melhor' },
        { label: 'C', text: 'Não tem impacto' },
        { label: 'D', text: 'Bloqueia tudo' }
      ],
      correctAnswer: 'A',
      explanation: 'Usar todo o CIDR expõe a qualquer recurso na VPC; prefira SG-to-SG para origem exata.',
      relatedService: 'security-groups'
    },
    {
      id: 57,
      topic: 'security-groups',
      question: 'Como validar rapidamente portas abertas em uma instância?',
      context: 'Operação.',
      options: [
        { label: 'A', text: 'Checar SGs associados e testar com reachability analyzer/VPC Reachability' },
        { label: 'B', text: 'Ver NACL apenas' },
        { label: 'C', text: 'Desativar SG' },
        { label: 'D', text: 'Olhar CloudTrail' }
      ],
      correctAnswer: 'A',
      explanation: 'Use VPC Reachability Analyzer e verifique SGs/NACLs/rotas para o fluxo desejado.',
      relatedService: 'security-groups'
    },
    {
      id: 58,
      topic: 'security-groups',
      question: 'Qual prática ajuda a manter SGs organizados?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Naming + tags por ambiente/sistema + limpeza periódica' },
        { label: 'B', text: 'Criar um único SG para todos' },
        { label: 'C', text: 'Não usar tags' },
        { label: 'D', text: 'Duplicar regras aleatoriamente' }
      ],
      correctAnswer: 'A',
      explanation: 'Nomeie e categorize SGs, remova órfãos e mantenha clareza de propósito.',
      relatedService: 'security-groups'
    },
    {
      id: 59,
      topic: 'security-groups',
      question: 'Como restringir quem pode alterar SGs na conta?',
      context: 'Controle de acesso.',
      options: [
        { label: 'A', text: 'IAM policies e SCPs limitando ec2:AuthorizeSecurityGroupIngress/Egress' },
        { label: 'B', text: 'Permitir admin a todos' },
        { label: 'C', text: 'Usar WAF' },
        { label: 'D', text: 'CloudWatch' }
      ],
      correctAnswer: 'A',
      explanation: 'Use IAM/SCPs para controlar ações de alteração/criação em SGs.',
      relatedService: 'security-groups'
    },
    {
      id: 60,
      topic: 'security-groups',
      question: 'Como liberar somente tráfego de ALB para o RDS sem abrir internet?',
      context: 'Cadeia incorreta proposital.',
      options: [
        { label: 'A', text: 'Não faça; RDS deve permitir apenas do SG das apps, não do ALB' },
        { label: 'B', text: 'Permitir do SG do ALB' },
        { label: 'C', text: 'Permitir 0.0.0.0/0' },
        { label: 'D', text: 'Permitir do IGW' }
      ],
      correctAnswer: 'A',
      explanation: 'O ALB não se conecta ao banco; apenas a camada app o faz. Permita do SG das apps.',
      relatedService: 'security-groups'
    },
    {
      id: 61,
      topic: 'security-groups',
      question: 'Qual regra para permitir que um pod EKS acesse S3 via endpoint?',
      context: 'EKS em VPC.',
      options: [
        { label: 'A', text: 'Outbound 443 para prefix list do endpoint S3' },
        { label: 'B', text: 'Inbound 443 da internet' },
        { label: 'C', text: 'Inbound 80 do S3' },
        { label: 'D', text: 'Nenhuma' }
      ],
      correctAnswer: 'A',
      explanation: 'Use VPC Endpoint Gateway (S3) e limite outbound com prefix list correspondente.',
      relatedService: 'security-groups'
    },
    {
      id: 62,
      topic: 'security-groups',
      question: 'Como expor um serviço interno para outra VPC via TGW?',
      context: 'Roteamento via Transit Gateway.',
      options: [
        { label: 'A', text: 'Rotas no TGW + SGs de ambos lados permitindo CIDRs necessários' },
        { label: 'B', text: 'Apenas SGs' },
        { label: 'C', text: 'Apenas NACLs' },
        { label: 'D', text: 'WAF' }
      ],
      correctAnswer: 'A',
      explanation: 'TGW provê conectividade; SGs controlam portas/origens permitidas entre VPCs.',
      relatedService: 'security-groups'
    },
    {
      id: 63,
      topic: 'security-groups',
      question: 'Como liberar outbound para um proxy corporativo em subnets privadas?',
      context: 'Egress centralizado.',
      options: [
        { label: 'A', text: 'Outbound apenas para o SG/CIDR do proxy nas portas 80/443' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Inbound 443' },
        { label: 'D', text: 'Abrir ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Direcione todo tráfego via proxy; SG outbound limita destinos às portas do proxy.',
      relatedService: 'security-groups'
    },
    {
      id: 64,
      topic: 'security-groups',
      question: 'Qual configuração permite apps em duas contas se comunicarem sem IPs fixos?',
      context: 'Cross-account dinâmico.',
      options: [
        { label: 'A', text: 'Referência cross-account de SG (quando suportado) ou PrivateLink' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'IGW compartilhado' },
        { label: 'D', text: 'NACL only' }
      ],
      correctAnswer: 'A',
      explanation: 'Cross-account SG reference é suportado em cenários específicos; senão, exponha via PrivateLink.',
      relatedService: 'security-groups'
    },
    {
      id: 65,
      topic: 'security-groups',
      question: 'Como proteger endpoints de administração (ex.: 8080 admin)?',
      context: 'Superfície de ataque.',
      options: [
        { label: 'A', text: 'Restringir a CIDRs/SGs específicos e VPN/bastion' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Deixar apenas NACL' },
        { label: 'D', text: 'Confiar no obscurity' }
      ],
      correctAnswer: 'A',
      explanation: 'Endereços administrativos devem ser acessíveis apenas via caminhos seguros e SGs estritos.',
      relatedService: 'security-groups'
    },
    {
      id: 66,
      topic: 'security-groups',
      question: 'Para WebSockets via ALB, quais portas liberar?',
      context: 'wss/ws.',
      options: [
        { label: 'A', text: '443 para wss (e 80 se ws)' },
        { label: 'B', text: '22' },
        { label: 'C', text: '53' },
        { label: 'D', text: '25' }
      ],
      correctAnswer: 'A',
      explanation: 'WebSockets usam as mesmas portas do HTTP/HTTPS (80/443).',
      relatedService: 'security-groups'
    },
    {
      id: 67,
      topic: 'security-groups',
      question: 'Como limitar acesso ao ALB apenas através do CloudFront?',
      context: 'Arquitetura com CDN.',
      options: [
        { label: 'A', text: 'SG do ALB aceita somente do SG/origens do CloudFront (IP ranges) + OAC' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Apenas NACL' },
        { label: 'D', text: 'Remover HTTPS' }
      ],
      correctAnswer: 'A',
      explanation: 'Restringir ao CloudFront evita bypass direto; combine com OAC/OAI e policies.',
      relatedService: 'security-groups'
    },
    {
      id: 68,
      topic: 'security-groups',
      question: 'Qual regra para SMTP de saída (25/587) quando permitido?',
      context: 'Envio de emails.',
      options: [
        { label: 'A', text: 'Outbound 25/587 limitado ao provedor (SES/VPC endpoint ou gateway)' },
        { label: 'B', text: 'Inbound 25 da internet' },
        { label: 'C', text: 'Abrir 0.0.0.0/0' },
        { label: 'D', text: 'ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja SMTP outbound ao provedor autorizado; muitas contas têm portas SMTP restritas.',
      relatedService: 'security-groups'
    },
    {
      id: 69,
      topic: 'security-groups',
      question: 'Como expor aplicação interna somente para rede corporativa?',
      context: 'Acesso via VPN/DX.',
      options: [
        { label: 'A', text: 'Inbound a partir dos CIDRs on-prem ou SGs ligados ao VPN/DX' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'IGW' },
        { label: 'D', text: 'NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Permita somente das faixas on-prem conectadas por VPN/DX; não exponha à internet.',
      relatedService: 'security-groups'
    },
    {
      id: 70,
      topic: 'security-groups',
      question: 'Como permitir que instâncias em duas AZs comuniquem-se entre si?',
      context: 'Alta disponibilidade.',
      options: [
        { label: 'A', text: 'Self-referencing SG ou SG-to-SG entre tiers' },
        { label: 'B', text: 'IGW' },
        { label: 'C', text: 'NAT' },
        { label: 'D', text: '0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'SG de um tier permite origem do próprio SG (todas as AZs) ou SGs cruzados por camada.',
      relatedService: 'security-groups'
    },
    {
      id: 71,
      topic: 'security-groups',
      question: 'Qual porta liberar para HTTPS para um NLB TLS Passthrough?',
      context: 'Terminação no target.',
      options: [
        { label: 'A', text: '443/TCP para os targets' },
        { label: 'B', text: '80' },
        { label: 'C', text: '22' },
        { label: 'D', text: '53' }
      ],
      correctAnswer: 'A',
      explanation: 'NLB passa o TLS adiante; targets precisam aceitar 443/TCP.',
      relatedService: 'security-groups'
    },
    {
      id: 72,
      topic: 'security-groups',
      question: 'Como restringir origem de Webhooks externos para sua API?',
      context: 'Integrações SaaS.',
      options: [
        { label: 'A', text: 'Permitir apenas ranges publicados do provedor (CIDRs) ou via PrivateLink' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Apenas NACL' },
        { label: 'D', text: 'ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja a IPs do provedor quando possível; melhor ainda, integre por canais privados.',
      relatedService: 'security-groups'
    },
    {
      id: 73,
      topic: 'security-groups',
      question: 'Como liberar saída para serviços com IPs variáveis (ex. GitHub) com controle?',
      context: 'Egress com ranges dinâmicos.',
      options: [
        { label: 'A', text: 'Atualizar prefix lists gerenciadas ou usar proxy' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Inbound 443' },
        { label: 'D', text: 'NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Prefix lists reduzem manutenção; proxies centralizam e aplicam políticas.',
      relatedService: 'security-groups'
    },
    {
      id: 74,
      topic: 'security-groups',
      question: 'O que usar para bloquear explicitamente um tráfego que um SG permitiria?',
      context: 'Deny explícito.',
      options: [
        { label: 'A', text: 'NACL com regra DENY' },
        { label: 'B', text: 'SG deny' },
        { label: 'C', text: 'WAF' },
        { label: 'D', text: 'CloudWatch' }
      ],
      correctAnswer: 'A',
      explanation: 'SG não tem deny; use NACLs se precisar negar explicitamente.',
      relatedService: 'security-groups'
    },
    {
      id: 75,
      topic: 'security-groups',
      question: 'Como garantir que somente ALB público acesse o serviço em EC2?',
      context: 'Rota de entrada única.',
      options: [
        { label: 'A', text: 'SG da EC2 permite apenas do SG do ALB' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'IGW' },
        { label: 'D', text: 'NAT' }
      ],
      correctAnswer: 'A',
      explanation: 'Evita acessos diretos; somente o ALB atinge as instâncias.',
      relatedService: 'security-groups'
    },
    {
      id: 76,
      topic: 'security-groups',
      question: 'Como liberar métricas/telemetria de agentes (Datadog/NewRelic) com mínimo egress?',
      context: 'Saída controlada.',
      options: [
        { label: 'A', text: 'Outbound 443 apenas para endpoints do provedor (prefix lists)' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Inbound 443' },
        { label: 'D', text: 'Nenhuma' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja destinos de telemetria para IP ranges/domínios autorizados.',
      relatedService: 'security-groups'
    },
    {
      id: 77,
      topic: 'security-groups',
      question: 'Como proteger endpoints do Kubernetes (API server) atrás de NLB interno?',
      context: 'EKS gerenciado/self-managed.',
      options: [
        { label: 'A', text: 'SG do NLB aceita apenas CIDRs/SGs internos autorizados' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Inbound 22' },
        { label: 'D', text: 'ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Restringir a redes internas/vpn; API do k8s não deve ficar pública sem controles fortes.',
      relatedService: 'security-groups'
    },
    {
      id: 78,
      topic: 'security-groups',
      question: 'Como liberar conexão do Glue/Spark a um banco em VPC?',
      context: 'Jobs ETL.',
      options: [
        { label: 'A', text: 'SG do banco permite do SG do job/ENI' },
        { label: 'B', text: 'Abrir 0.0.0.0/0' },
        { label: 'C', text: 'Inbound 22' },
        { label: 'D', text: 'NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Jobs que anexam ENIs precisam ser origem permitida nos SGs dos bancos.',
      relatedService: 'security-groups'
    },
    {
      id: 79,
      topic: 'security-groups',
      question: 'Qual porta liberar para gRPC seguro atrás do ALB?',
      context: 'HTTP/2 + TLS.',
      options: [
        { label: 'A', text: '443/TCP' },
        { label: 'B', text: '80' },
        { label: 'C', text: '22' },
        { label: 'D', text: '53' }
      ],
      correctAnswer: 'A',
      explanation: 'gRPC usa HTTP/2 sobre TLS (porta 443) quando exposto externamente.',
      relatedService: 'security-groups'
    },
    {
      id: 80,
      topic: 'security-groups',
      question: 'Como restringir que apenas um serviço específico ECS acesse o RDS?',
      context: 'Múltiplos serviços.',
      options: [
        { label: 'A', text: 'Use SG exclusivo por serviço e permita apenas esse SG no RDS' },
        { label: 'B', text: 'Permitir VPC CIDR' },
        { label: 'C', text: 'Permitir do ALB' },
        { label: 'D', text: '0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Segregar SG por serviço facilita regras precisas e auditoria.',
      relatedService: 'security-groups'
    },
    {
      id: 81,
      topic: 'security-groups',
      question: 'Como autorizar SFTP (porta 22) para um parceiro externo de IP dinâmico?',
      context: 'Acesso variável.',
      options: [
        { label: 'A', text: 'Estabelecer VPN/Client VPN e permitir do CIDR interno' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: '53' },
        { label: 'D', text: '25' }
      ],
      correctAnswer: 'A',
      explanation: 'Sem IP fixo, prefira túnel seguro (VPN) e regras internas controladas.',
      relatedService: 'security-groups'
    },
    {
      id: 82,
      topic: 'security-groups',
      question: 'Como evitar lockout ao endurecer SGs em produção?',
      context: 'Mudanças seguras.',
      options: [
        { label: 'A', text: 'Aplicar em canário/stack paralelo e validar antes do corte' },
        { label: 'B', text: 'Trocar tudo ao vivo' },
        { label: 'C', text: 'Remover todas as regras' },
        { label: 'D', text: 'Abrir 0.0.0.0/0 temporariamente' }
      ],
      correctAnswer: 'A',
      explanation: 'Use mudanças graduais e validação para evitar indisponibilidade por SG incorreto.',
      relatedService: 'security-groups'
    },
    {
      id: 83,
      topic: 'security-groups',
      question: 'Como permitir acesso de workloads IPv6-only a APIs internas?',
      context: 'IPv6-only subnets.',
      options: [
        { label: 'A', text: 'SGs com regras ::/0 outbound + egress-only IGW + SG-to-SG para serviços' },
        { label: 'B', text: 'NAT Gateway' },
        { label: 'C', text: 'IGW apenas' },
        { label: 'D', text: '0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'IPv6 outbound com egress-only IGW e SGs estritos para destinos internos.',
      relatedService: 'security-groups'
    },
    {
      id: 84,
      topic: 'security-groups',
      question: 'Qual regra para permitir acesso ao Redshift (5439) a partir de um BI interno?',
      context: 'Data warehouse.',
      options: [
        { label: 'A', text: 'SG do Redshift permite 5439 do SG do BI' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Apenas outbound' },
        { label: 'D', text: 'ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Restrinja ao SG do cliente autorizado (ferramenta BI).',
      relatedService: 'security-groups'
    },
    {
      id: 85,
      topic: 'security-groups',
      question: 'Como expor API privada somente para CloudFront em múltiplas regiões?',
      context: 'Edge→regional.',
      options: [
        { label: 'A', text: 'SG do ALB aceita apenas IP ranges do CloudFront + WAF' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'NAT' },
        { label: 'D', text: 'ICMP' }
      ],
      correctAnswer: 'A',
      explanation: 'Limite origens ao CloudFront e adicione camadas de proteção (WAF).',
      relatedService: 'security-groups'
    },
    {
      id: 86,
      topic: 'security-groups',
      question: 'Como bloquear tentativas de saída não autorizadas sem tocar em SGs?',
      context: 'Camada adicional.',
      options: [
        { label: 'A', text: 'Usar NACLs com deny adequado e rotas' },
        { label: 'B', text: 'Não há como' },
        { label: 'C', text: 'WAF' },
        { label: 'D', text: 'CloudTrail' }
      ],
      correctAnswer: 'A',
      explanation: 'NACLs podem negar tráfego (stateless). Combine com SGs para controle fino.',
      relatedService: 'security-groups'
    },
    {
      id: 87,
      topic: 'security-groups',
      question: 'Como permitir que instâncias baixem imagens de container do ECR privadamente?',
      context: 'Sem internet.',
      options: [
        { label: 'A', text: 'VPC endpoints para ECR/API/DKR e outbound 443 para seus endpoints' },
        { label: 'B', text: '0.0.0.0/0' },
        { label: 'C', text: 'Inbound 443' },
        { label: 'D', text: 'NAT apenas' }
      ],
      correctAnswer: 'A',
      explanation: 'Endpoints privados + SGs limitando egress permitem pull de imagens sem internet pública.',
      relatedService: 'security-groups'
    },
    {
      id: 88,
      topic: 'security-groups',
      question: 'Como isolar workloads por conta (multi-account) mantendo comunicação necessária?',
      context: 'Separação por conta.',
      options: [
        { label: 'A', text: 'Conectividade (TGW/peering) + SG cross-account ou CIDRs mínimos' },
        { label: 'B', text: 'Tudo na mesma conta' },
        { label: 'C', text: '0.0.0.0/0' },
        { label: 'D', text: 'NACL deny' }
      ],
      correctAnswer: 'A',
      explanation: 'Multi-account com conectividade e SGs estritos reduz blast radius.',
      relatedService: 'security-groups'
    },
    {
      id: 89,
      topic: 'security-groups',
      question: 'Como garantir que a app só fale com o banco via TLS?',
      context: 'Criptografia em trânsito.',
      options: [
        { label: 'A', text: 'Forçar TLS no banco e liberar apenas porta TLS do engine' },
        { label: 'B', text: 'Abrir HTTP' },
        { label: 'C', text: 'Usar ICMP' },
        { label: 'D', text: '0.0.0.0/0' }
      ],
      correctAnswer: 'A',
      explanation: 'Habilite TLS no RDS/Aurora e libere apenas a porta segura correspondente.',
      relatedService: 'security-groups'
    },
    {
      id: 90,
      topic: 'security-groups',
      question: 'Qual ferramenta ajuda a simular se um fluxo é permitido?',
      context: 'Depuração de rede.',
      options: [
        { label: 'A', text: 'VPC Reachability Analyzer' },
        { label: 'B', text: 'S3 Inventory' },
        { label: 'C', text: 'CloudFormation' },
        { label: 'D', text: 'X-Ray' }
      ],
      correctAnswer: 'A',
      explanation: 'O Reachability Analyzer avalia rotas, NACLs, SGs, endpoints e retorna se o caminho é alcançável.',
      relatedService: 'security-groups'
    }
  ],

  'iam-roles': [
    {
      id: 1,
      topic: 'iam-roles',
      question: 'Qual é a vantagem de usar IAM Roles em vez de armazenar credenciais (access keys) em instâncias EC2?',
      context: 'EC2 precisa acessar S3.',
      options: [
        { label: 'A', text: 'Roles são mais rápidas' },
        { label: 'B', text: 'Roles fornecem credenciais temporárias automaticamente rotacionadas' },
        { label: 'C', text: 'Access keys são mais seguras' },
        { label: 'D', text: 'Roles custam menos' }
      ],
      correctAnswer: 'B',
      explanation: 'IAM Roles fornecem credenciais temporárias automaticamente rotacionadas pela AWS. Não precisa armazenar/rotacionar access keys no código. Se comprometidas, expiram automaticamente. Best practice: sempre use roles para EC2/Lambda/ECS.',
      relatedService: 'iam-roles'
    },
    {
      id: 2,
      topic: 'iam-roles',
      question: 'O que é um Instance Profile?',
      context: 'Anexando role a EC2.',
      options: [
        { label: 'A', text: 'Perfil de performance da instância' },
        { label: 'B', text: 'Container que passa IAM role para EC2 instance' },
        { label: 'C', text: 'Tipo de instância (t2, m5, etc)' },
        { label: 'D', text: 'Backup da instância' }
      ],
      correctAnswer: 'B',
      explanation: 'Instance Profile é wrapper que associa IAM Role a EC2 instance. Console cria automaticamente. Via CLI/API precisa criar explicitamente. EC2 usa instance profile para obter credenciais temporárias da role.',
      relatedService: 'iam-roles'
    },
    {
      id: 3,
      topic: 'iam-roles',
      question: 'O que é Trust Policy em um IAM Role?',
      context: 'Configuração de role.',
      options: [
        { label: 'A', text: 'Define o que o role pode fazer' },
        { label: 'B', text: 'Define quem pode assumir o role (principals autorizados)' },
        { label: 'C', text: 'Define limite de tempo' },
        { label: 'D', text: 'Define região' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy especifica quais principals (users, services, accounts) podem assumir o role via sts:AssumeRole.',
      relatedService: 'iam-roles'
    },
    {
      id: 4,
      topic: 'iam-roles',
      question: 'Qual a diferença entre Trust Policy e Permission Policy em um role?',
      context: 'Estrutura de role.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Trust define quem assume; Permission define o que pode fazer após assumir' },
        { label: 'C', text: 'Permission define quem assume' },
        { label: 'D', text: 'Trust define ações' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy: quem pode assumir. Permission Policy (anexada ao role): quais ações são permitidas após assumir.',
      relatedService: 'iam-roles'
    },
    {
      id: 5,
      topic: 'iam-roles',
      question: 'Como Lambda obtém permissões para acessar DynamoDB?',
      context: 'Serverless.',
      options: [
        { label: 'A', text: 'Access keys no código' },
        { label: 'B', text: 'Execution Role anexada à função Lambda com permissões DynamoDB' },
        { label: 'C', text: 'Variáveis de ambiente' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda Execution Role define permissões. Lambda assume o role automaticamente e obtém credenciais temporárias.',
      relatedService: 'iam-roles'
    },
    {
      id: 6,
      topic: 'iam-roles',
      question: 'O que é AssumeRole?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Criar novo role' },
        { label: 'B', text: 'Operação STS que retorna credenciais temporárias de um role' },
        { label: 'C', text: 'Deletar role' },
        { label: 'D', text: 'Listar roles' }
      ],
      correctAnswer: 'B',
      explanation: 'sts:AssumeRole retorna AccessKeyId, SecretAccessKey e SessionToken temporários do role assumido.',
      relatedService: 'iam-roles'
    },
    {
      id: 7,
      topic: 'iam-roles',
      question: 'Qual duração padrão de credenciais temporárias de um role?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Permanente' },
        { label: 'B', text: '1 hora (default, configurável de 15 min a 12 horas)' },
        { label: 'C', text: '24 horas' },
        { label: 'D', text: '1 minuto' }
      ],
      correctAnswer: 'B',
      explanation: 'Default 1 hora. DurationSeconds pode ser configurado. Max session duration do role define limite máximo.',
      relatedService: 'iam-roles'
    },
    {
      id: 8,
      topic: 'iam-roles',
      question: 'Como configurar Max Session Duration de um role?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Não é configurável' },
        { label: 'B', text: 'Na configuração do role, entre 1 hora e 12 horas' },
        { label: 'C', text: 'Na Trust Policy' },
        { label: 'D', text: 'No STS' }
      ],
      correctAnswer: 'B',
      explanation: 'Max Session Duration é propriedade do role. Define limite máximo que AssumeRole pode solicitar.',
      relatedService: 'iam-roles'
    },
    {
      id: 9,
      topic: 'iam-roles',
      question: 'O que é cross-account role?',
      context: 'Multi-account.',
      options: [
        { label: 'A', text: 'Role para regiões diferentes' },
        { label: 'B', text: 'Role que permite principals de outra conta AWS assumir' },
        { label: 'C', text: 'Role para VPCs diferentes' },
        { label: 'D', text: 'Role temporário' }
      ],
      correctAnswer: 'B',
      explanation: 'Cross-account role tem Trust Policy permitindo conta externa como principal. Conta externa faz AssumeRole.',
      relatedService: 'iam-roles'
    },
    {
      id: 10,
      topic: 'iam-roles',
      question: 'Como conta B acessa S3 na conta A sem credenciais permanentes?',
      context: 'Cross-account.',
      options: [
        { label: 'A', text: 'Compartilhar access keys' },
        { label: 'B', text: 'Criar role na conta A com trust para conta B; conta B assume o role' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Conta A cria role com trust para 123456789012 (conta B). Conta B usa AssumeRole para obter credenciais.',
      relatedService: 'iam-roles'
    },
    {
      id: 11,
      topic: 'iam-roles',
      question: 'O que é External ID em cross-account roles?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'ID da conta' },
        { label: 'B', text: 'String secreta para prevenir confused deputy problem' },
        { label: 'C', text: 'ARN do role' },
        { label: 'D', text: 'Nome do role' }
      ],
      correctAnswer: 'B',
      explanation: 'External ID é passado no AssumeRole e validado na Trust Policy. Previne que terceiros usem seu role.',
      relatedService: 'iam-roles'
    },
    {
      id: 12,
      topic: 'iam-roles',
      question: 'O que é confused deputy problem?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Erro de configuração' },
        { label: 'B', text: 'Atacante engana serviço intermediário para usar role indevidamente' },
        { label: 'C', text: 'Problema de rede' },
        { label: 'D', text: 'Erro de quota' }
      ],
      correctAnswer: 'B',
      explanation: 'Atacante convence terceiro (que você autorizou) a acessar seus recursos. External ID mitiga.',
      relatedService: 'iam-roles'
    },
    {
      id: 13,
      topic: 'iam-roles',
      question: 'O que é Service-Linked Role?',
      context: 'AWS services.',
      options: [
        { label: 'A', text: 'Role criado pelo usuário' },
        { label: 'B', text: 'Role pré-definido por serviço AWS para executar ações em seu nome' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role temporário' }
      ],
      correctAnswer: 'B',
      explanation: 'Service-linked roles são criados/gerenciados pelo serviço (ELB, Auto Scaling, etc). Trust policy não modificável.',
      relatedService: 'iam-roles'
    },
    {
      id: 14,
      topic: 'iam-roles',
      question: 'Posso modificar permissões de um Service-Linked Role?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Sim, livremente' },
        { label: 'B', text: 'Não, são gerenciados pelo serviço AWS' },
        { label: 'C', text: 'Apenas Trust Policy' },
        { label: 'D', text: 'Apenas Permission Policy' }
      ],
      correctAnswer: 'B',
      explanation: 'Service-linked roles não podem ser editados. Serviço AWS define e mantém as permissões necessárias.',
      relatedService: 'iam-roles'
    },
    {
      id: 15,
      topic: 'iam-roles',
      question: 'Como AWS ECS obtém permissões para gerenciar containers?',
      context: 'Containers.',
      options: [
        { label: 'A', text: 'Root account' },
        { label: 'B', text: 'ECS Service-Linked Role e Task Execution Role' },
        { label: 'C', text: 'Access keys' },
        { label: 'D', text: 'VPC permissions' }
      ],
      correctAnswer: 'B',
      explanation: 'ECS usa service-linked role para registro de serviço. Task Execution Role para pull images e enviar logs.',
      relatedService: 'iam-roles'
    },
    {
      id: 16,
      topic: 'iam-roles',
      question: 'O que é ECS Task Role vs Task Execution Role?',
      context: 'ECS.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Task Role: permissões do container; Task Execution Role: permissões para ECS gerenciar a task' },
        { label: 'C', text: 'Task Execution é deprecated' },
        { label: 'D', text: 'Task Role para logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Task Execution Role: pull ECR, enviar CloudWatch Logs. Task Role: permissões da aplicação (S3, DynamoDB).',
      relatedService: 'iam-roles'
    },
    {
      id: 17,
      topic: 'iam-roles',
      question: 'Como passar role para CloudFormation criar recursos?',
      context: 'IaC.',
      options: [
        { label: 'A', text: 'Não é necessário' },
        { label: 'B', text: 'Especificar Stack Role na criação do stack' },
        { label: 'C', text: 'Usar root' },
        { label: 'D', text: 'Inline credentials' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFormation assume role especificado para criar recursos. Separa quem pode criar stacks de quais recursos podem ser criados.',
      relatedService: 'iam-roles'
    },
    {
      id: 18,
      topic: 'iam-roles',
      question: 'O que é iam:PassRole?',
      context: 'Delegação.',
      options: [
        { label: 'A', text: 'Assumir role' },
        { label: 'B', text: 'Permissão para passar role a um serviço AWS ao criar recursos' },
        { label: 'C', text: 'Criar role' },
        { label: 'D', text: 'Deletar role' }
      ],
      correctAnswer: 'B',
      explanation: 'PassRole permite especificar qual role um serviço deve usar. Ex: ao criar EC2, passar instance profile.',
      relatedService: 'iam-roles'
    },
    {
      id: 19,
      topic: 'iam-roles',
      question: 'Por que PassRole é importante para segurança?',
      context: 'Privilégios.',
      options: [
        { label: 'A', text: 'Não é importante' },
        { label: 'B', text: 'Evita escalação de privilégios - controla quais roles podem ser passados' },
        { label: 'C', text: 'Melhora performance' },
        { label: 'D', text: 'Reduz custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem controle de PassRole, usuário criaria Lambda com role Admin, escalando seus privilégios.',
      relatedService: 'iam-roles'
    },
    {
      id: 20,
      topic: 'iam-roles',
      question: 'Como restringir quais roles podem ser passados?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Condition na policy de PassRole com iam:PassedToService ou Resource específico' },
        { label: 'C', text: 'Trust Policy' },
        { label: 'D', text: 'Security Group' }
      ],
      correctAnswer: 'B',
      explanation: 'Resource limita quais roles. Condition iam:PassedToService limita para quais serviços.',
      relatedService: 'iam-roles'
    },
    {
      id: 21,
      topic: 'iam-roles',
      question: 'O que é Role Chaining?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Criar múltiplos roles' },
        { label: 'B', text: 'Usar credenciais de um role para assumir outro role' },
        { label: 'C', text: 'Anexar múltiplas policies' },
        { label: 'D', text: 'Herança de roles' }
      ],
      correctAnswer: 'B',
      explanation: 'Role chaining: Role A assume Role B. Limitação: max session de role encadeado é 1 hora.',
      relatedService: 'iam-roles'
    },
    {
      id: 22,
      topic: 'iam-roles',
      question: 'Qual limitação de Role Chaining?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Não há limitação' },
        { label: 'B', text: 'Sessão máxima limitada a 1 hora' },
        { label: 'C', text: 'Apenas 2 roles' },
        { label: 'D', text: 'Apenas mesma conta' }
      ],
      correctAnswer: 'B',
      explanation: 'Role chaining: max session 1 hora, não pode estender. Workaround: assume role original novamente.',
      relatedService: 'iam-roles'
    },
    {
      id: 23,
      topic: 'iam-roles',
      question: 'Como AWS CLI usa role de EC2 instance?',
      context: 'Credenciais.',
      options: [
        { label: 'A', text: 'Configurar manualmente' },
        { label: 'B', text: 'Automaticamente via Instance Metadata Service (IMDS)' },
        { label: 'C', text: 'Arquivo de configuração' },
        { label: 'D', text: 'Variáveis de ambiente' }
      ],
      correctAnswer: 'B',
      explanation: 'SDK/CLI consulta IMDS (169.254.169.254) para obter credenciais temporárias do instance profile.',
      relatedService: 'iam-roles'
    },
    {
      id: 24,
      topic: 'iam-roles',
      question: 'O que é IMDSv2?',
      context: 'Segurança EC2.',
      options: [
        { label: 'A', text: 'Versão do instance type' },
        { label: 'B', text: 'Instance Metadata Service v2 - requer token para acessar metadata' },
        { label: 'C', text: 'Versão do AMI' },
        { label: 'D', text: 'Versão do SDK' }
      ],
      correctAnswer: 'B',
      explanation: 'IMDSv2 requer session token via PUT request. Previne SSRF attacks que poderiam roubar credenciais.',
      relatedService: 'iam-roles'
    },
    {
      id: 25,
      topic: 'iam-roles',
      question: 'Por que usar IMDSv2 é recomendado?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Mais rápido' },
        { label: 'B', text: 'Previne ataques SSRF que poderiam expor credenciais do role' },
        { label: 'C', text: 'Mais barato' },
        { label: 'D', text: 'Compatibilidade' }
      ],
      correctAnswer: 'B',
      explanation: 'IMDSv1 permite GET direto. Atacante com SSRF poderia obter credenciais. IMDSv2 requer token.',
      relatedService: 'iam-roles'
    },
    {
      id: 26,
      topic: 'iam-roles',
      question: 'Como forçar uso de IMDSv2 em EC2?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Configurar HttpTokens=required nas opções de metadata' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'NACL' }
      ],
      correctAnswer: 'B',
      explanation: 'HttpTokens=required força IMDSv2. HttpTokens=optional permite ambas versões.',
      relatedService: 'iam-roles'
    },
    {
      id: 27,
      topic: 'iam-roles',
      question: 'O que acontece se role não tiver Trust Policy válida?',
      context: 'Erro.',
      options: [
        { label: 'A', text: 'Funciona normalmente' },
        { label: 'B', text: 'AssumeRole falha com AccessDenied' },
        { label: 'C', text: 'Credenciais permanentes' },
        { label: 'D', text: 'Role é deletado' }
      ],
      correctAnswer: 'B',
      explanation: 'Sem Trust Policy válida para o principal, sts:AssumeRole retorna AccessDenied.',
      relatedService: 'iam-roles'
    },
    {
      id: 28,
      topic: 'iam-roles',
      question: 'Como permitir que Lambda de outra conta assuma meu role?',
      context: 'Cross-account Lambda.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Trust Policy com Principal para conta externa e sts:AssumeRole' },
        { label: 'C', text: 'Compartilhar código' },
        { label: 'D', text: 'VPC Peering' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy permite conta externa. Lambda da conta externa configura seu execution role com sts:AssumeRole.',
      relatedService: 'iam-roles'
    },
    {
      id: 29,
      topic: 'iam-roles',
      question: 'O que é Session Policy?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Policy permanente' },
        { label: 'B', text: 'Policy inline passada ao assumir role que restringe ainda mais as permissões' },
        { label: 'C', text: 'Policy de Trust' },
        { label: 'D', text: 'Policy de rede' }
      ],
      correctAnswer: 'B',
      explanation: 'Session Policy é passada no AssumeRole. Permissão efetiva = intersecção de role permissions e session policy.',
      relatedService: 'iam-roles'
    },
    {
      id: 30,
      topic: 'iam-roles',
      question: 'Session Policy pode aumentar permissões do role?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Sim' },
        { label: 'B', text: 'Não, apenas restringe - é intersecção' },
        { label: 'C', text: 'Apenas em cross-account' },
        { label: 'D', text: 'Apenas para admin' }
      ],
      correctAnswer: 'B',
      explanation: 'Session Policy só pode restringir, nunca aumentar. Resultado é intersecção das permissões.',
      relatedService: 'iam-roles'
    },
    {
      id: 31,
      topic: 'iam-roles',
      question: 'O que são Session Tags?',
      context: 'ABAC.',
      options: [
        { label: 'A', text: 'Tags de billing' },
        { label: 'B', text: 'Tags passadas ao assumir role para uso em conditions (ABAC)' },
        { label: 'C', text: 'Tags de VPC' },
        { label: 'D', text: 'Tags de EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Session Tags são key-value passados no AssumeRole. Usados em Conditions para ABAC.',
      relatedService: 'iam-roles'
    },
    {
      id: 32,
      topic: 'iam-roles',
      question: 'Como revogar sessões ativas de um role?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Usar "Revoke sessions" que adiciona Deny para tokens emitidos antes de agora' },
        { label: 'C', text: 'Deletar role' },
        { label: 'D', text: 'Reiniciar AWS' }
      ],
      correctAnswer: 'B',
      explanation: 'Revoke sessions adiciona inline Deny para aws:TokenIssueTime anterior ao timestamp. Invalida sessões existentes.',
      relatedService: 'iam-roles'
    },
    {
      id: 33,
      topic: 'iam-roles',
      question: 'O que é Web Identity Federation?',
      context: 'Mobile/Web apps.',
      options: [
        { label: 'A', text: 'Protocolo de rede' },
        { label: 'B', text: 'Permite apps autenticar com IdP externo (Google, Facebook) e obter credenciais AWS' },
        { label: 'C', text: 'Protocolo de backup' },
        { label: 'D', text: 'VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Web Identity Federation permite apps mobile/web autenticar com IdP e trocar token por credenciais AWS via AssumeRoleWithWebIdentity.',
      relatedService: 'iam-roles'
    },
    {
      id: 34,
      topic: 'iam-roles',
      question: 'O que é AssumeRoleWithWebIdentity?',
      context: 'Federation.',
      options: [
        { label: 'A', text: 'Igual a AssumeRole' },
        { label: 'B', text: 'Operação STS que troca token de IdP web (OIDC) por credenciais AWS' },
        { label: 'C', text: 'Login no console' },
        { label: 'D', text: 'Criar usuário' }
      ],
      correctAnswer: 'B',
      explanation: 'AssumeRoleWithWebIdentity aceita token OIDC e retorna credenciais temporárias para o role.',
      relatedService: 'iam-roles'
    },
    {
      id: 35,
      topic: 'iam-roles',
      question: 'O que é SAML 2.0 Federation?',
      context: 'Enterprise SSO.',
      options: [
        { label: 'A', text: 'Protocolo de storage' },
        { label: 'B', text: 'Protocolo que permite SSO com IdP corporativo (AD, Okta) para acessar AWS' },
        { label: 'C', text: 'Protocolo de rede' },
        { label: 'D', text: 'Protocolo de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'SAML permite autenticar em IdP corporativo e obter credenciais AWS via AssumeRoleWithSAML.',
      relatedService: 'iam-roles'
    },
    {
      id: 36,
      topic: 'iam-roles',
      question: 'O que é AssumeRoleWithSAML?',
      context: 'SAML.',
      options: [
        { label: 'A', text: 'Criar role' },
        { label: 'B', text: 'Operação STS que troca SAML assertion por credenciais AWS' },
        { label: 'C', text: 'Deletar role' },
        { label: 'D', text: 'Listar roles' }
      ],
      correctAnswer: 'B',
      explanation: 'AssumeRoleWithSAML aceita SAML assertion do IdP e retorna credenciais temporárias.',
      relatedService: 'iam-roles'
    },
    {
      id: 37,
      topic: 'iam-roles',
      question: 'Qual serviço AWS simplifica Web Identity Federation?',
      context: 'Mobile.',
      options: [
        { label: 'A', text: 'IAM' },
        { label: 'B', text: 'Amazon Cognito' },
        { label: 'C', text: 'S3' },
        { label: 'D', text: 'EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Cognito abstrai AssumeRoleWithWebIdentity. Gerencia tokens, refresh e mapping de identidades.',
      relatedService: 'iam-roles'
    },
    {
      id: 38,
      topic: 'iam-roles',
      question: 'O que é Cognito Identity Pool?',
      context: 'Federation.',
      options: [
        { label: 'A', text: 'Banco de dados' },
        { label: 'B', text: 'Recurso que fornece credenciais AWS temporárias para usuários autenticados e guests' },
        { label: 'C', text: 'VPC' },
        { label: 'D', text: 'Subnet' }
      ],
      correctAnswer: 'B',
      explanation: 'Identity Pool mapeia identidades (autenticadas ou não) para roles IAM, fornecendo credenciais.',
      relatedService: 'iam-roles'
    },
    {
      id: 39,
      topic: 'iam-roles',
      question: 'Como EKS pods obtêm permissões AWS?',
      context: 'Kubernetes.',
      options: [
        { label: 'A', text: 'Instance profile do node' },
        { label: 'B', text: 'IAM Roles for Service Accounts (IRSA) - role por service account' },
        { label: 'C', text: 'Environment variables' },
        { label: 'D', text: 'ConfigMap' }
      ],
      correctAnswer: 'B',
      explanation: 'IRSA permite granularidade: cada pod/service account tem role específico, não compartilha com node.',
      relatedService: 'iam-roles'
    },
    {
      id: 40,
      topic: 'iam-roles',
      question: 'O que é IAM Roles for Service Accounts (IRSA)?',
      context: 'EKS.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Permite pods Kubernetes assumir roles IAM via OIDC federation' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'IRSA usa OIDC provider do cluster EKS. Annotation no service account especifica role. Pod assume automaticamente.',
      relatedService: 'iam-roles'
    },
    {
      id: 41,
      topic: 'iam-roles',
      question: 'Qual Trust Policy para permitir IRSA?',
      context: 'EKS.',
      options: [
        { label: 'A', text: 'EC2 service' },
        { label: 'B', text: 'OIDC provider do cluster EKS com condition para service account específico' },
        { label: 'C', text: 'Lambda service' },
        { label: 'D', text: 'Account root' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy referencia OIDC provider ARN e condition sts:sub para namespace:serviceaccount.',
      relatedService: 'iam-roles'
    },
    {
      id: 42,
      topic: 'iam-roles',
      question: 'Como CodePipeline acessa recursos de outras contas?',
      context: 'CI/CD.',
      options: [
        { label: 'A', text: 'Compartilhar credentials' },
        { label: 'B', text: 'Assume role cross-account em cada stage' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CodePipeline assume role na conta destino para deploy. Cada stage pode ter role diferente.',
      relatedService: 'iam-roles'
    },
    {
      id: 43,
      topic: 'iam-roles',
      question: 'O que é Execution Role do Step Functions?',
      context: 'Workflow.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que Step Functions assume para invocar serviços AWS nas tasks' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Execution Role define quais serviços o workflow pode invocar (Lambda, DynamoDB, SNS, etc).',
      relatedService: 'iam-roles'
    },
    {
      id: 44,
      topic: 'iam-roles',
      question: 'Como permitir que um usuário assuma role apenas com MFA?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Password policy' },
        { label: 'B', text: 'Condition aws:MultiFactorAuthPresent: true na Trust Policy' },
        { label: 'C', text: 'Security Group' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy com Condition MFA força usuário a autenticar com segundo fator antes de assumir.',
      relatedService: 'iam-roles'
    },
    {
      id: 45,
      topic: 'iam-roles',
      question: 'O que é GetSessionToken?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Assumir role' },
        { label: 'B', text: 'Operação STS para obter credenciais temporárias do próprio usuário, geralmente com MFA' },
        { label: 'C', text: 'Criar usuário' },
        { label: 'D', text: 'Deletar token' }
      ],
      correctAnswer: 'B',
      explanation: 'GetSessionToken retorna credenciais temporárias do usuário. Usado para MFA-protect API calls.',
      relatedService: 'iam-roles'
    },
    {
      id: 46,
      topic: 'iam-roles',
      question: 'Diferença entre AssumeRole e GetSessionToken?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'AssumeRole obtém credenciais de outro role; GetSessionToken do próprio usuário' },
        { label: 'C', text: 'GetSessionToken é deprecated' },
        { label: 'D', text: 'AssumeRole para MFA' }
      ],
      correctAnswer: 'B',
      explanation: 'AssumeRole: assume identidade diferente. GetSessionToken: credenciais temp do mesmo usuário.',
      relatedService: 'iam-roles'
    },
    {
      id: 47,
      topic: 'iam-roles',
      question: 'O que é GetFederationToken?',
      context: 'STS.',
      options: [
        { label: 'A', text: 'Assumir role' },
        { label: 'B', text: 'Operação STS que cria credenciais temporárias para usuários federados' },
        { label: 'C', text: 'Login console' },
        { label: 'D', text: 'Deletar federation' }
      ],
      correctAnswer: 'B',
      explanation: 'GetFederationToken cria federated user com credenciais temp. Usado por apps que gerenciam identidades.',
      relatedService: 'iam-roles'
    },
    {
      id: 48,
      topic: 'iam-roles',
      question: 'Qual ação necessária para usuário assumir role?',
      context: 'Permissões.',
      options: [
        { label: 'A', text: 'Nenhuma' },
        { label: 'B', text: 'sts:AssumeRole na permission policy do usuário + Trust Policy do role permitir' },
        { label: 'C', text: 'Apenas Trust Policy' },
        { label: 'D', text: 'Apenas Permission Policy' }
      ],
      correctAnswer: 'B',
      explanation: 'Duas condições: usuário precisa permissão sts:AssumeRole E role Trust Policy deve permitir usuário.',
      relatedService: 'iam-roles'
    },
    {
      id: 49,
      topic: 'iam-roles',
      question: 'Como auditar uso de roles?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'CloudTrail registra todas as chamadas AssumeRole' },
        { label: 'C', text: 'VPC Flow Logs' },
        { label: 'D', text: 'S3 Access Logs' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudTrail loga AssumeRole events incluindo source, role, duration, session name.',
      relatedService: 'iam-roles'
    },
    {
      id: 50,
      topic: 'iam-roles',
      question: 'O que é RoleSessionName?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'Nome do role' },
        { label: 'B', text: 'Identificador da sessão passado ao assumir role, aparece em CloudTrail' },
        { label: 'C', text: 'Nome do usuário' },
        { label: 'D', text: 'ARN do role' }
      ],
      correctAnswer: 'B',
      explanation: 'RoleSessionName identifica sessão. Aparece em logs e assumed-role ARN. Útil para auditoria.',
      relatedService: 'iam-roles'
    },
    {
      id: 51,
      topic: 'iam-roles',
      question: 'Como AWS Backup acessa recursos para backup?',
      context: 'Backup.',
      options: [
        { label: 'A', text: 'Root account' },
        { label: 'B', text: 'Backup Service Role com permissões para recursos a serem backupeados' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Backup assume service role para criar snapshots, copiar dados, gerenciar vault.',
      relatedService: 'iam-roles'
    },
    {
      id: 52,
      topic: 'iam-roles',
      question: 'O que é EventBridge IAM Role?',
      context: 'Events.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que EventBridge assume para invocar targets (Lambda, Step Functions, etc)' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'EventBridge precisa role para invocar targets. Resource-based policies em Lambda/SNS são alternativa.',
      relatedService: 'iam-roles'
    },
    {
      id: 53,
      topic: 'iam-roles',
      question: 'Como restringir role para ser assumido apenas de IPs específicos?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Security Group' },
        { label: 'B', text: 'Condition aws:SourceIp na Trust Policy' },
        { label: 'C', text: 'NACL' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy com Condition aws:SourceIp restringe de onde o role pode ser assumido.',
      relatedService: 'iam-roles'
    },
    {
      id: 54,
      topic: 'iam-roles',
      question: 'O que é SourceIdentity?',
      context: 'Auditoria.',
      options: [
        { label: 'A', text: 'IP de origem' },
        { label: 'B', text: 'Identificador persistente do usuário original, mantido através de role chaining' },
        { label: 'C', text: 'ARN do role' },
        { label: 'D', text: 'Nome da conta' }
      ],
      correctAnswer: 'B',
      explanation: 'SourceIdentity é setado ao assumir role e persiste em encadeamentos. Rastreia usuário original.',
      relatedService: 'iam-roles'
    },
    {
      id: 55,
      topic: 'iam-roles',
      question: 'Posso forçar que SourceIdentity seja setado?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Não' },
        { label: 'B', text: 'Sim, via Condition sts:SourceIdentity na Trust Policy' },
        { label: 'C', text: 'Automaticamente' },
        { label: 'D', text: 'Opcional apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Trust Policy pode exigir SourceIdentity com Condition. AssumeRole falha se não fornecido.',
      relatedService: 'iam-roles'
    },
    {
      id: 56,
      topic: 'iam-roles',
      question: 'O que são Transitive Tags?',
      context: 'ABAC.',
      options: [
        { label: 'A', text: 'Tags de billing' },
        { label: 'B', text: 'Session tags que persistem através de role chaining' },
        { label: 'C', text: 'Tags de VPC' },
        { label: 'D', text: 'Tags de EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Transitive tags passam para próximo AssumeRole na cadeia. Definido em TransitiveTagKeys.',
      relatedService: 'iam-roles'
    },
    {
      id: 57,
      topic: 'iam-roles',
      question: 'Como CloudFormation StackSets assume roles em member accounts?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'Root account' },
        { label: 'B', text: 'Administration role no admin account e Execution role em cada member account' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Shared credentials' }
      ],
      correctAnswer: 'B',
      explanation: 'StackSets usa admin role que assume execution role em cada conta target para criar stacks.',
      relatedService: 'iam-roles'
    },
    {
      id: 58,
      topic: 'iam-roles',
      question: 'O que é EC2 Instance Connect role?',
      context: 'SSH.',
      options: [
        { label: 'A', text: 'Role para Lambda' },
        { label: 'B', text: 'Permissão para enviar public key temporária para EC2 via Instance Connect' },
        { label: 'C', text: 'Role para RDS' },
        { label: 'D', text: 'Role para S3' }
      ],
      correctAnswer: 'B',
      explanation: 'ec2-instance-connect:SendSSHPublicKey permite push de key efêmera para acesso SSH sem key pairs permanentes.',
      relatedService: 'iam-roles'
    },
    {
      id: 59,
      topic: 'iam-roles',
      question: 'Como AWS Config assume role para inventory?',
      context: 'Compliance.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'Config Service Role com permissões para descrever recursos' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Config usa service role para inventariar recursos, registrar configurações, avaliar compliance.',
      relatedService: 'iam-roles'
    },
    {
      id: 60,
      topic: 'iam-roles',
      question: 'O que é Glue Service Role?',
      context: 'ETL.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que Glue assume para acessar data sources e targets (S3, JDBC, etc)' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Glue jobs assumem role para ler de source, transformar e gravar em target. Precisa permissões adequadas.',
      relatedService: 'iam-roles'
    },
    {
      id: 61,
      topic: 'iam-roles',
      question: 'Como SageMaker acessa training data em S3?',
      context: 'ML.',
      options: [
        { label: 'A', text: 'Access keys' },
        { label: 'B', text: 'SageMaker Execution Role com permissões S3' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Public bucket' }
      ],
      correctAnswer: 'B',
      explanation: 'SageMaker jobs assumem execution role para ler dados de training, salvar modelos, artifacts.',
      relatedService: 'iam-roles'
    },
    {
      id: 62,
      topic: 'iam-roles',
      question: 'O que é Permission Boundary com roles?',
      context: 'Delegação.',
      options: [
        { label: 'A', text: 'Substitui Trust Policy' },
        { label: 'B', text: 'Limita máximo de permissões mesmo que role tenha policies mais amplas' },
        { label: 'C', text: 'Aumenta permissões' },
        { label: 'D', text: 'Não se aplica a roles' }
      ],
      correctAnswer: 'B',
      explanation: 'Permission Boundary é guardrail: permissão efetiva = intersecção de boundary e permission policies.',
      relatedService: 'iam-roles'
    },
    {
      id: 63,
      topic: 'iam-roles',
      question: 'Como Systems Manager Run Command executa em EC2?',
      context: 'Automation.',
      options: [
        { label: 'A', text: 'SSH' },
        { label: 'B', text: 'SSM Agent na instância assume Instance Role com permissões SSM' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Root SSH' }
      ],
      correctAnswer: 'B',
      explanation: 'SSM Agent comunica com SSM service. Instance Role precisa ssm:* permissions. Não requer SSH/22.',
      relatedService: 'iam-roles'
    },
    {
      id: 64,
      topic: 'iam-roles',
      question: 'O que é DynamoDB Service Role para Global Tables?',
      context: 'Replicação.',
      options: [
        { label: 'A', text: 'Role para Lambda' },
        { label: 'B', text: 'Role que DynamoDB assume para replicar dados entre regiões' },
        { label: 'C', text: 'Role para EC2' },
        { label: 'D', text: 'Role para S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Global Tables requer service-linked role para DynamoDB replicar streams entre regiões.',
      relatedService: 'iam-roles'
    },
    {
      id: 65,
      topic: 'iam-roles',
      question: 'Como reduzir blast radius de role comprometido?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Usar root' },
        { label: 'B', text: 'Least privilege, session duration curta, conditions restritivas' },
        { label: 'C', text: 'Full permissions' },
        { label: 'D', text: 'Sem expiração' }
      ],
      correctAnswer: 'B',
      explanation: 'Limitar permissões, duração curta, Conditions (IP, VPC, tags) reduzem impacto se comprometido.',
      relatedService: 'iam-roles'
    },
    {
      id: 66,
      topic: 'iam-roles',
      question: 'O que é AWS Lake Formation role?',
      context: 'Data Lake.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que define permissões de data lake sobre tabelas e databases' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Lake Formation usa roles para autorização de tabelas, substituindo/complementando S3/Glue policies.',
      relatedService: 'iam-roles'
    },
    {
      id: 67,
      topic: 'iam-roles',
      question: 'Como Fargate tasks obtêm credenciais AWS?',
      context: 'Containers.',
      options: [
        { label: 'A', text: 'Instance profile do host' },
        { label: 'B', text: 'Task Role via credential endpoint interno do Fargate' },
        { label: 'C', text: 'Environment variables' },
        { label: 'D', text: 'Hardcoded' }
      ],
      correctAnswer: 'B',
      explanation: 'Fargate injeta credenciais via HTTP endpoint. SDK obtém automaticamente do Task Role.',
      relatedService: 'iam-roles'
    },
    {
      id: 68,
      topic: 'iam-roles',
      question: 'O que é Role Path?',
      context: 'Organização.',
      options: [
        { label: 'A', text: 'Caminho de rede' },
        { label: 'B', text: 'Prefixo hierárquico opcional no ARN do role para organização' },
        { label: 'C', text: 'Trust Policy' },
        { label: 'D', text: 'Permission Policy' }
      ],
      correctAnswer: 'B',
      explanation: 'Path organiza roles: /application/prod/ ou /team/devops/. Útil para policies com wildcards.',
      relatedService: 'iam-roles'
    },
    {
      id: 69,
      topic: 'iam-roles',
      question: 'Como usar path em policies?',
      context: 'Organização.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Resource: arn:aws:iam::123456789012:role/application/* permite todos roles nesse path' },
        { label: 'C', text: 'Via tags' },
        { label: 'D', text: 'Via conditions' }
      ],
      correctAnswer: 'B',
      explanation: 'Path permite wildcard matching. PassRole pode restringir para roles em path específico.',
      relatedService: 'iam-roles'
    },
    {
      id: 70,
      topic: 'iam-roles',
      question: 'O que é assumable role para humans vs machines?',
      context: 'Design.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'Humans: requer MFA, session curta. Machines: service principal, sem MFA' },
        { label: 'C', text: 'Machines requerem MFA' },
        { label: 'D', text: 'Humans não usam roles' }
      ],
      correctAnswer: 'B',
      explanation: 'Diferentes Trust Policies: humanos com MFA e IP conditions. Services com principal específico.',
      relatedService: 'iam-roles'
    },
    {
      id: 71,
      topic: 'iam-roles',
      question: 'Como AWS Organizations facilita cross-account roles?',
      context: 'Multi-account.',
      options: [
        { label: 'A', text: 'Não facilita' },
        { label: 'B', text: 'PrincipalOrgID condition permite roles para toda Organization' },
        { label: 'C', text: 'Cria roles automaticamente' },
        { label: 'D', text: 'Compartilha credenciais' }
      ],
      correctAnswer: 'B',
      explanation: 'aws:PrincipalOrgID permite Trust Policy aceitar qualquer conta da Organization sem listar cada uma.',
      relatedService: 'iam-roles'
    },
    {
      id: 72,
      topic: 'iam-roles',
      question: 'O que é OrganizationAccountAccessRole?',
      context: 'Organizations.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role default criado em member accounts para management account assumir' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Quando conta é criada via Organizations, role é criado para management account administrar.',
      relatedService: 'iam-roles'
    },
    {
      id: 73,
      topic: 'iam-roles',
      question: 'Como Kinesis Firehose entrega dados para S3?',
      context: 'Streaming.',
      options: [
        { label: 'A', text: 'Root account' },
        { label: 'B', text: 'Firehose Delivery Role com permissões para S3 bucket destino' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'Firehose assume delivery role para s3:PutObject, s3:GetBucketLocation no bucket destino.',
      relatedService: 'iam-roles'
    },
    {
      id: 74,
      topic: 'iam-roles',
      question: 'O que é API Gateway Execution Role?',
      context: 'API.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que API Gateway assume para invocar integrations (Lambda, Step Functions)' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Para integrações AWS, API Gateway assume role com permissões para invocar serviço destino.',
      relatedService: 'iam-roles'
    },
    {
      id: 75,
      topic: 'iam-roles',
      question: 'Como CloudWatch Events (EventBridge) invoca targets?',
      context: 'Events.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'Role anexado à rule ou resource-based policy no target' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'EventBridge usa role para SQS, Kinesis, Step Functions. Lambda/SNS aceitam resource-based.',
      relatedService: 'iam-roles'
    },
    {
      id: 76,
      topic: 'iam-roles',
      question: 'Como CodeBuild acessa recursos durante build?',
      context: 'CI/CD.',
      options: [
        { label: 'A', text: 'Access keys no buildspec' },
        { label: 'B', text: 'CodeBuild Service Role com permissões para recursos necessários' },
        { label: 'C', text: 'Root' },
        { label: 'D', text: 'VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'CodeBuild assume service role para pull source, push artifacts, enviar logs, acessar secrets.',
      relatedService: 'iam-roles'
    },
    {
      id: 77,
      topic: 'iam-roles',
      question: 'O que é AppSync Service Role?',
      context: 'GraphQL.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que AppSync assume para acessar data sources (DynamoDB, Lambda, etc)' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'AppSync resolvers assumem role para query/mutate data sources. Cada data source pode ter role diferente.',
      relatedService: 'iam-roles'
    },
    {
      id: 78,
      topic: 'iam-roles',
      question: 'Como Auto Scaling lança EC2 instances?',
      context: 'Scaling.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'Service-linked role para Auto Scaling com permissões EC2' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'Auto Scaling usa service-linked role para ec2:RunInstances, ec2:TerminateInstances, etc.',
      relatedService: 'iam-roles'
    },
    {
      id: 79,
      topic: 'iam-roles',
      question: 'O que é ELB Service-Linked Role?',
      context: 'Load Balancing.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que ELB usa para registrar targets, criar network interfaces' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'ELB service-linked role: elastic-loadbalancing.amazonaws.com. Gerencia ENIs, health checks.',
      relatedService: 'iam-roles'
    },
    {
      id: 80,
      topic: 'iam-roles',
      question: 'Como Redshift acessa S3 para COPY/UNLOAD?',
      context: 'Data Warehouse.',
      options: [
        { label: 'A', text: 'Access keys no comando' },
        { label: 'B', text: 'IAM Role anexado ao cluster Redshift' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Public bucket' }
      ],
      correctAnswer: 'B',
      explanation: 'Redshift assume role anexado ao cluster para COPY de S3 e UNLOAD para S3.',
      relatedService: 'iam-roles'
    },
    {
      id: 81,
      topic: 'iam-roles',
      question: 'Como Data Pipeline executa atividades?',
      context: 'ETL.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'Pipeline Role define o que pipeline pode fazer; Resource Role o que EC2 pode acessar' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'Dois roles: pipeline role para criar recursos; resource role para EC2/EMR executar atividades.',
      relatedService: 'iam-roles'
    },
    {
      id: 82,
      topic: 'iam-roles',
      question: 'O que é Amplify Service Role?',
      context: 'Frontend.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que Amplify assume para build, deploy e provisionar backend resources' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Amplify precisa role para criar S3, CloudFront, Lambda@Edge, Cognito, etc.',
      relatedService: 'iam-roles'
    },
    {
      id: 83,
      topic: 'iam-roles',
      question: 'Como Inspector assume role para assessments?',
      context: 'Security.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'Service-linked role para acessar EC2 metadata e executar assessments' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'Inspector usa service-linked role para descrever EC2, coletar dados, gerar findings.',
      relatedService: 'iam-roles'
    },
    {
      id: 84,
      topic: 'iam-roles',
      question: 'O que é Batch Service Role?',
      context: 'Batch.',
      options: [
        { label: 'A', text: 'Role para Lambda' },
        { label: 'B', text: 'Role que AWS Batch assume para gerenciar compute environments e jobs' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Batch service role: criar EC2/ECS, gerenciar Auto Scaling. Job role: o que cada job pode fazer.',
      relatedService: 'iam-roles'
    },
    {
      id: 85,
      topic: 'iam-roles',
      question: 'Como EMR acessa S3 e outros serviços?',
      context: 'Big Data.',
      options: [
        { label: 'A', text: 'Access keys' },
        { label: 'B', text: 'EMR Service Role e EC2 Instance Profile (Job Flow Role)' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Root' }
      ],
      correctAnswer: 'B',
      explanation: 'Service role para EMR gerenciar cluster. Instance profile para nodes acessarem S3, DynamoDB.',
      relatedService: 'iam-roles'
    },
    {
      id: 86,
      topic: 'iam-roles',
      question: 'O que é Neptune Loader Role?',
      context: 'Graph.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que Neptune assume para bulk load dados de S3' },
        { label: 'C', text: 'Role para Lambda' },
        { label: 'D', text: 'Role para RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Neptune bulk loader assume role com s3:GetObject para importar dados de bucket.',
      relatedService: 'iam-roles'
    },
    {
      id: 87,
      topic: 'iam-roles',
      question: 'Como Secrets Manager rotaciona secrets?',
      context: 'Rotation.',
      options: [
        { label: 'A', text: 'Manualmente' },
        { label: 'B', text: 'Lambda rotation function assume role para atualizar secret e serviço' },
        { label: 'C', text: 'Root' },
        { label: 'D', text: 'VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'Rotation Lambda precisa role com secretsmanager:* para atualizar secret e modificar recurso (RDS password).',
      relatedService: 'iam-roles'
    },
    {
      id: 88,
      topic: 'iam-roles',
      question: 'O que é RDS Enhanced Monitoring Role?',
      context: 'Monitoring.',
      options: [
        { label: 'A', text: 'Role para EC2' },
        { label: 'B', text: 'Role que permite RDS enviar métricas detalhadas para CloudWatch' },
        { label: 'C', text: 'Role para S3' },
        { label: 'D', text: 'Role para Lambda' }
      ],
      correctAnswer: 'B',
      explanation: 'Enhanced Monitoring requer role com permissions CloudWatch Logs para métricas OS-level.',
      relatedService: 'iam-roles'
    },
    {
      id: 89,
      topic: 'iam-roles',
      question: 'Como Transfer Family acessa S3/EFS?',
      context: 'SFTP.',
      options: [
        { label: 'A', text: 'Root' },
        { label: 'B', text: 'User role define quais paths S3/EFS cada usuário SFTP pode acessar' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'API keys' }
      ],
      correctAnswer: 'B',
      explanation: 'Transfer Family assume role por usuário. Policy define home directory e permissões S3.',
      relatedService: 'iam-roles'
    },
    {
      id: 90,
      topic: 'iam-roles',
      question: 'Qual best practice para gerenciar múltiplos roles?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Um role para tudo' },
        { label: 'B', text: 'Nomes consistentes, paths organizados, tags para identificação, least privilege por role' },
        { label: 'C', text: 'Usar root' },
        { label: 'D', text: 'Compartilhar roles' }
      ],
      correctAnswer: 'B',
      explanation: 'Naming convention: env-app-function. Paths: /prod/, /dev/. Tags: Team, Application. Documentar propósito de cada role.',
      relatedService: 'iam-roles'
    }
  ],

  cloudwatch: [
    {
      id: 1,
      topic: 'cloudwatch',
      question: 'Qual é a diferença entre CloudWatch Metrics e CloudWatch Logs?',
      context: 'Monitorando aplicação.',
      options: [
        { label: 'A', text: 'São idênticos' },
        { label: 'B', text: 'Metrics: dados numéricos time-series; Logs: eventos textuais' },
        { label: 'C', text: 'Logs são mais caros' },
        { label: 'D', text: 'Metrics não funcionam com EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch Metrics: dados numéricos time-series (CPU%, requests/min, latency). CloudWatch Logs: eventos textuais (application logs, system logs). Complementares: Metrics para dashboards/alarmes, Logs para debugging.',
      relatedService: 'cloudwatch'
    },
    {
      id: 2,
      topic: 'cloudwatch',
      question: 'Qual agente é necessário para enviar logs de aplicação de EC2 para CloudWatch Logs?',
      context: 'Centralizando logs.',
      options: [
        { label: 'A', text: 'Nenhum, automático' },
        { label: 'B', text: 'CloudWatch Agent ou CloudWatch Logs Agent' },
        { label: 'C', text: 'SSM Agent' },
        { label: 'D', text: 'Inspector Agent' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch Agent (novo, unificado) ou CloudWatch Logs Agent (antigo) precisa ser instalado em EC2 para enviar logs customizados. Métricas básicas (CPU, disk, network) são automáticas. Agent também envia custom metrics (memory, disk usage).',
      relatedService: 'cloudwatch'
    },
    {
      id: 3,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Alarm?',
      context: 'Alertas.',
      options: [
        { label: 'A', text: 'Log de erro' },
        { label: 'B', text: 'Recurso que monitora métrica e executa ação quando limite é ultrapassado' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Métrica' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarms monitoram métricas e disparam ações (SNS, Auto Scaling, EC2) quando threshold é atingido.',
      relatedService: 'cloudwatch'
    },
    {
      id: 4,
      topic: 'cloudwatch',
      question: 'Quais estados um CloudWatch Alarm pode ter?',
      context: 'Monitoramento.',
      options: [
        { label: 'A', text: 'On/Off' },
        { label: 'B', text: 'OK, ALARM, INSUFFICIENT_DATA' },
        { label: 'C', text: 'Active/Inactive' },
        { label: 'D', text: 'Good/Bad' }
      ],
      correctAnswer: 'B',
      explanation: 'OK: dentro do threshold. ALARM: fora do threshold. INSUFFICIENT_DATA: dados insuficientes para avaliar.',
      relatedService: 'cloudwatch'
    },
    {
      id: 5,
      topic: 'cloudwatch',
      question: 'O que é período de avaliação em um alarm?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Tempo total do alarm' },
        { label: 'B', text: 'Quantos pontos de dados devem violar threshold antes de trigger' },
        { label: 'C', text: 'Frequência do log' },
        { label: 'D', text: 'Retenção de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Evaluation periods: quantos períodos considerar. Datapoints to alarm: quantos devem violar. Ex: 3 de 5.',
      relatedService: 'cloudwatch'
    },
    {
      id: 6,
      topic: 'cloudwatch',
      question: 'O que são Custom Metrics?',
      context: 'Extensibilidade.',
      options: [
        { label: 'A', text: 'Métricas automáticas AWS' },
        { label: 'B', text: 'Métricas definidas pelo usuário enviadas via API/Agent' },
        { label: 'C', text: 'Logs' },
        { label: 'D', text: 'Dashboards' }
      ],
      correctAnswer: 'B',
      explanation: 'Custom Metrics: você envia via PutMetricData API ou CloudWatch Agent. Ex: business metrics, memory usage.',
      relatedService: 'cloudwatch'
    },
    {
      id: 7,
      topic: 'cloudwatch',
      question: 'Qual resolução de Custom Metrics é possível?',
      context: 'Granularidade.',
      options: [
        { label: 'A', text: 'Apenas 5 minutos' },
        { label: 'B', text: 'Standard (1 minuto) ou High Resolution (1 segundo)' },
        { label: 'C', text: 'Apenas 1 hora' },
        { label: 'D', text: 'Apenas 1 dia' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard: agregação mínima 1 minuto. High Resolution: até 1 segundo. High Resolution custa mais.',
      relatedService: 'cloudwatch'
    },
    {
      id: 8,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Dashboards?',
      context: 'Visualização.',
      options: [
        { label: 'A', text: 'Lista de alarmes' },
        { label: 'B', text: 'Páginas customizáveis com widgets de métricas, logs, alarmes e texto' },
        { label: 'C', text: 'Relatório de custos' },
        { label: 'D', text: 'Lista de EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'Dashboards: visualização customizada. Global (cross-region). Widgets: line, stacked, number, text, logs.',
      relatedService: 'cloudwatch'
    },
    {
      id: 9,
      topic: 'cloudwatch',
      question: 'O que é Log Group?',
      context: 'Organização de logs.',
      options: [
        { label: 'A', text: 'Container de métricas' },
        { label: 'B', text: 'Container que agrupa Log Streams relacionados' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarm' }
      ],
      correctAnswer: 'B',
      explanation: 'Log Group agrupa streams. Define retention, encryption, access control. Ex: /aws/lambda/function-name.',
      relatedService: 'cloudwatch'
    },
    {
      id: 10,
      topic: 'cloudwatch',
      question: 'O que é Log Stream?',
      context: 'Estrutura de logs.',
      options: [
        { label: 'A', text: 'Container de grupos' },
        { label: 'B', text: 'Sequência de eventos de uma mesma fonte (instância, container, execução)' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Métrica' }
      ],
      correctAnswer: 'B',
      explanation: 'Log Stream: eventos ordenados de uma fonte. Ex: cada instância EC2 cria seu stream dentro do group.',
      relatedService: 'cloudwatch'
    },
    {
      id: 11,
      topic: 'cloudwatch',
      question: 'Como configurar retenção de logs?',
      context: 'Custos.',
      options: [
        { label: 'A', text: 'Automático' },
        { label: 'B', text: 'Retention policy no Log Group: 1 dia a 10 anos, ou never expire' },
        { label: 'C', text: 'No Log Stream' },
        { label: 'D', text: 'Via S3' }
      ],
      correctAnswer: 'B',
      explanation: 'Retention configurada no Log Group. Default: never expire (caro!). Configure retention adequada.',
      relatedService: 'cloudwatch'
    },
    {
      id: 12,
      topic: 'cloudwatch',
      question: 'O que são Metric Filters?',
      context: 'Logs para métricas.',
      options: [
        { label: 'A', text: 'Filtros de dashboard' },
        { label: 'B', text: 'Padrões que extraem métricas numéricas de log events' },
        { label: 'C', text: 'Filtros de alarmes' },
        { label: 'D', text: 'Filtros de acesso' }
      ],
      correctAnswer: 'B',
      explanation: 'Metric Filters: buscam padrões em logs e criam métricas. Ex: contar ERROR, extrair latency.',
      relatedService: 'cloudwatch'
    },
    {
      id: 13,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Logs Insights?',
      context: 'Análise.',
      options: [
        { label: 'A', text: 'Dashboard' },
        { label: 'B', text: 'Linguagem de query interativa para analisar logs em tempo real' },
        { label: 'C', text: 'Backup de logs' },
        { label: 'D', text: 'Metric Filter' }
      ],
      correctAnswer: 'B',
      explanation: 'Logs Insights: query language para pesquisar, agregar, visualizar logs. Sintaxe própria com fields, filter, stats.',
      relatedService: 'cloudwatch'
    },
    {
      id: 14,
      topic: 'cloudwatch',
      question: 'O que é Subscription Filter?',
      context: 'Streaming.',
      options: [
        { label: 'A', text: 'Filtro de métricas' },
        { label: 'B', text: 'Envia logs em tempo real para destino (Kinesis, Lambda, Firehose)' },
        { label: 'C', text: 'Filtro de alarmes' },
        { label: 'D', text: 'Dashboard filter' }
      ],
      correctAnswer: 'B',
      explanation: 'Subscription Filters streamam logs para processar: Lambda (transformar), Kinesis (analytics), ES (search).',
      relatedService: 'cloudwatch'
    },
    {
      id: 15,
      topic: 'cloudwatch',
      question: 'Como exportar logs para S3?',
      context: 'Arquivamento.',
      options: [
        { label: 'A', text: 'Automático' },
        { label: 'B', text: 'Create Export Task (batch) ou Subscription Filter + Firehose (streaming)' },
        { label: 'C', text: 'Copy-paste' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Export Task: batch, demora até 12h. Firehose: near real-time, recomendado para contínuo.',
      relatedService: 'cloudwatch'
    },
    {
      id: 16,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Events (EventBridge)?',
      context: 'Eventos.',
      options: [
        { label: 'A', text: 'Logs de eventos' },
        { label: 'B', text: 'Serviço que detecta mudanças e roteia para targets (Lambda, SNS, etc)' },
        { label: 'C', text: 'Métricas de eventos' },
        { label: 'D', text: 'Dashboard de eventos' }
      ],
      correctAnswer: 'B',
      explanation: 'EventBridge (evolução do CloudWatch Events): rules que matcham eventos e invocam targets. Event bus.',
      relatedService: 'cloudwatch'
    },
    {
      id: 17,
      topic: 'cloudwatch',
      question: 'O que são Namespaces em CloudWatch?',
      context: 'Organização.',
      options: [
        { label: 'A', text: 'VPCs' },
        { label: 'B', text: 'Containers que isolam métricas por serviço ou aplicação' },
        { label: 'C', text: 'Log Groups' },
        { label: 'D', text: 'Dashboards' }
      ],
      correctAnswer: 'B',
      explanation: 'Namespace agrupa métricas. AWS usa AWS/EC2, AWS/RDS. Custom: sua aplicação. Isolamento lógico.',
      relatedService: 'cloudwatch'
    },
    {
      id: 18,
      topic: 'cloudwatch',
      question: 'O que são Dimensions?',
      context: 'Métricas.',
      options: [
        { label: 'A', text: 'Valores das métricas' },
        { label: 'B', text: 'Key-value pairs que identificam a fonte da métrica' },
        { label: 'C', text: 'Unidades' },
        { label: 'D', text: 'Períodos' }
      ],
      correctAnswer: 'B',
      explanation: 'Dimensions: InstanceId, AutoScalingGroupName. Permitem filtrar e agregar métricas por dimensão.',
      relatedService: 'cloudwatch'
    },
    {
      id: 19,
      topic: 'cloudwatch',
      question: 'Como criar alarme para memória de EC2?',
      context: 'Custom metrics.',
      options: [
        { label: 'A', text: 'Métrica padrão EC2' },
        { label: 'B', text: 'Instalar CloudWatch Agent para enviar custom metric de memória' },
        { label: 'C', text: 'Via VPC' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Memória e disco não são métricas padrão EC2. CloudWatch Agent coleta e envia como custom metrics.',
      relatedService: 'cloudwatch'
    },
    {
      id: 20,
      topic: 'cloudwatch',
      question: 'O que é Anomaly Detection?',
      context: 'ML.',
      options: [
        { label: 'A', text: 'Threshold fixo' },
        { label: 'B', text: 'ML que aprende padrão normal e detecta desvios automaticamente' },
        { label: 'C', text: 'Logs' },
        { label: 'D', text: 'Dashboard' }
      ],
      correctAnswer: 'B',
      explanation: 'Anomaly Detection usa ML para criar banda de valores normais. Alarme quando métrica sai da banda.',
      relatedService: 'cloudwatch'
    },
    {
      id: 21,
      topic: 'cloudwatch',
      question: 'O que são Composite Alarms?',
      context: 'Alertas complexos.',
      options: [
        { label: 'A', text: 'Alarmes de uma métrica' },
        { label: 'B', text: 'Alarmes que combinam múltiplos alarmes com AND/OR' },
        { label: 'C', text: 'Alarmes de log' },
        { label: 'D', text: 'Alarmes de custo' }
      ],
      correctAnswer: 'B',
      explanation: 'Composite Alarms: (Alarm1 AND Alarm2) OR Alarm3. Reduz ruído, ação só quando múltiplas condições.',
      relatedService: 'cloudwatch'
    },
    {
      id: 22,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Contributor Insights?',
      context: 'Análise.',
      options: [
        { label: 'A', text: 'Dashboard' },
        { label: 'B', text: 'Regras que identificam top contributors (IPs, URLs, usuários) em logs' },
        { label: 'C', text: 'Backup' },
        { label: 'D', text: 'Metric Filter' }
      ],
      correctAnswer: 'B',
      explanation: 'Contributor Insights: time series dos top N contributors. Ex: top IPs causando errors.',
      relatedService: 'cloudwatch'
    },
    {
      id: 23,
      topic: 'cloudwatch',
      question: 'Como monitorar latência de API Gateway com CloudWatch?',
      context: 'APIs.',
      options: [
        { label: 'A', text: 'Custom metric obrigatória' },
        { label: 'B', text: 'Métricas automáticas: Latency, IntegrationLatency, Count, 4XXError, 5XXError' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'API Gateway envia métricas automáticas para CloudWatch. Habilitar detailed metrics para by-method.',
      relatedService: 'cloudwatch'
    },
    {
      id: 24,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch ServiceLens?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'Dashboard' },
        { label: 'B', text: 'Visualização unificada de traces, métricas e logs para aplicações' },
        { label: 'C', text: 'Logs' },
        { label: 'D', text: 'Alarmes' }
      ],
      correctAnswer: 'B',
      explanation: 'ServiceLens integra X-Ray traces com CloudWatch metrics/logs. Service map com health status.',
      relatedService: 'cloudwatch'
    },
    {
      id: 25,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Synthetics?',
      context: 'Monitoramento proativo.',
      options: [
        { label: 'A', text: 'Logs sintéticos' },
        { label: 'B', text: 'Canaries que testam endpoints/UI periodicamente simulando usuário' },
        { label: 'C', text: 'Métricas' },
        { label: 'D', text: 'Alarmes' }
      ],
      correctAnswer: 'B',
      explanation: 'Synthetics Canaries: scripts Node.js/Python que testam APIs, websites. Detectam problemas antes de usuários.',
      relatedService: 'cloudwatch'
    },
    {
      id: 26,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch RUM (Real User Monitoring)?',
      context: 'Web performance.',
      options: [
        { label: 'A', text: 'Métricas de servidor' },
        { label: 'B', text: 'Monitora performance real de usuários em aplicações web (client-side)' },
        { label: 'C', text: 'Logs de backend' },
        { label: 'D', text: 'Database metrics' }
      ],
      correctAnswer: 'B',
      explanation: 'RUM coleta métricas do browser: page load time, Core Web Vitals, JS errors. JavaScript snippet.',
      relatedService: 'cloudwatch'
    },
    {
      id: 27,
      topic: 'cloudwatch',
      question: 'Como configurar ação de Auto Scaling baseada em alarme?',
      context: 'Escalabilidade.',
      options: [
        { label: 'A', text: 'Manualmente' },
        { label: 'B', text: 'Alarme dispara ação de scaling policy do Auto Scaling Group' },
        { label: 'C', text: 'Via Lambda' },
        { label: 'D', text: 'Via SNS apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarm Action pode trigger ASG scaling policy. Ex: CPU > 80% por 2 períodos -> scale out.',
      relatedService: 'cloudwatch'
    },
    {
      id: 28,
      topic: 'cloudwatch',
      question: 'O que é Cross-Account CloudWatch?',
      context: 'Multi-account.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Capacidade de visualizar métricas e logs de múltiplas contas em uma central' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Peering' }
      ],
      correctAnswer: 'B',
      explanation: 'Cross-account: conta de monitoramento acessa CloudWatch de source accounts. Dashboard unificado.',
      relatedService: 'cloudwatch'
    },
    {
      id: 29,
      topic: 'cloudwatch',
      question: 'O que é Embedded Metric Format (EMF)?',
      context: 'Métricas em logs.',
      options: [
        { label: 'A', text: 'Dashboard' },
        { label: 'B', text: 'Formato JSON estruturado para enviar métricas via CloudWatch Logs' },
        { label: 'C', text: 'Compression' },
        { label: 'D', text: 'Encryption' }
      ],
      correctAnswer: 'B',
      explanation: 'EMF: log em JSON especial que CloudWatch extrai como métricas automaticamente. Lambda e containers.',
      relatedService: 'cloudwatch'
    },
    {
      id: 30,
      topic: 'cloudwatch',
      question: 'Por que usar EMF em vez de PutMetricData?',
      context: 'Custos.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'EMF via logs é mais barato para alta volumetria de custom metrics' },
        { label: 'C', text: 'PutMetricData é deprecated' },
        { label: 'D', text: 'EMF não funciona' }
      ],
      correctAnswer: 'B',
      explanation: 'PutMetricData: custo por métrica. EMF: custo de ingestão de logs (mais barato para muitas métricas).',
      relatedService: 'cloudwatch'
    },
    {
      id: 31,
      topic: 'cloudwatch',
      question: 'Como monitorar Lambda com CloudWatch?',
      context: 'Serverless.',
      options: [
        { label: 'A', text: 'Manualmente' },
        { label: 'B', text: 'Métricas automáticas (Invocations, Duration, Errors) + logs automáticos' },
        { label: 'C', text: 'Agent obrigatório' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda envia métricas e logs automaticamente. Métricas: Invocations, Duration, Errors, Throttles.',
      relatedService: 'cloudwatch'
    },
    {
      id: 32,
      topic: 'cloudwatch',
      question: 'O que são Lambda Insights?',
      context: 'Debugging.',
      options: [
        { label: 'A', text: 'Logs básicos' },
        { label: 'B', text: 'Métricas detalhadas de performance Lambda: CPU, memory, cold starts' },
        { label: 'C', text: 'Apenas erros' },
        { label: 'D', text: 'Apenas invocações' }
      ],
      correctAnswer: 'B',
      explanation: 'Lambda Insights: layer que coleta métricas detalhadas via EMF. Dashboards automáticos.',
      relatedService: 'cloudwatch'
    },
    {
      id: 33,
      topic: 'cloudwatch',
      question: 'O que é Container Insights?',
      context: 'Kubernetes/ECS.',
      options: [
        { label: 'A', text: 'Logs de container' },
        { label: 'B', text: 'Métricas agregadas de clusters ECS/EKS: CPU, memory, disk, network por pod/task/service' },
        { label: 'C', text: 'Apenas erros' },
        { label: 'D', text: 'Deployment logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Container Insights coleta métricas de infraestrutura de containers. Performance dashboard automático.',
      relatedService: 'cloudwatch'
    },
    {
      id: 34,
      topic: 'cloudwatch',
      question: 'Como habilitar Container Insights em EKS?',
      context: 'Kubernetes.',
      options: [
        { label: 'A', text: 'Automático' },
        { label: 'B', text: 'Deploy CloudWatch Agent como DaemonSet ou usar ADOT Collector' },
        { label: 'C', text: 'Via Console apenas' },
        { label: 'D', text: 'Via VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudWatch Agent ou AWS Distro for OpenTelemetry (ADOT) coleta métricas de pods/nodes.',
      relatedService: 'cloudwatch'
    },
    {
      id: 35,
      topic: 'cloudwatch',
      question: 'O que é Application Insights?',
      context: 'Troubleshooting.',
      options: [
        { label: 'A', text: 'Logs de app' },
        { label: 'B', text: 'Detecta problemas em aplicações .NET/SQL automaticamente usando ML' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Metric Filter' }
      ],
      correctAnswer: 'B',
      explanation: 'Application Insights para .NET/Java: detecta problemas, correlaciona métricas/logs, identifica root cause.',
      relatedService: 'cloudwatch'
    },
    {
      id: 36,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Agent configuration file?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Log file' },
        { label: 'B', text: 'JSON que define quais métricas e logs o agent deve coletar e enviar' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarm' }
      ],
      correctAnswer: 'B',
      explanation: 'Config file JSON define: logs (paths), metrics (memory, disk), collection_interval, credentials.',
      relatedService: 'cloudwatch'
    },
    {
      id: 37,
      topic: 'cloudwatch',
      question: 'Como gerenciar CloudWatch Agent config centralmente?',
      context: 'Automação.',
      options: [
        { label: 'A', text: 'Copiar manualmente' },
        { label: 'B', text: 'Systems Manager Parameter Store para armazenar e distribuir configuração' },
        { label: 'C', text: 'S3 apenas' },
        { label: 'D', text: 'Via VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'Parameter Store armazena config. SSM Run Command ou State Manager distribui para fleet.',
      relatedService: 'cloudwatch'
    },
    {
      id: 38,
      topic: 'cloudwatch',
      question: 'O que é Metric Math?',
      context: 'Cálculos.',
      options: [
        { label: 'A', text: 'Métricas matemáticas' },
        { label: 'B', text: 'Expressões que combinam/transformam métricas existentes em novas métricas' },
        { label: 'C', text: 'Calculadora' },
        { label: 'D', text: 'Logs numéricos' }
      ],
      correctAnswer: 'B',
      explanation: 'Metric Math: SUM, AVG, RATE, percentile, m1+m2, m1/m2. Criar métricas derivadas sem PutMetricData.',
      relatedService: 'cloudwatch'
    },
    {
      id: 39,
      topic: 'cloudwatch',
      question: 'Qual função Metric Math calcula percentis?',
      context: 'Estatísticas.',
      options: [
        { label: 'A', text: 'AVG' },
        { label: 'B', text: 'PERCENTILE(m, p)' },
        { label: 'C', text: 'SUM' },
        { label: 'D', text: 'MAX' }
      ],
      correctAnswer: 'B',
      explanation: 'PERCENTILE(metric, p): ex PERCENTILE(latency, 99) retorna p99. Útil para SLAs.',
      relatedService: 'cloudwatch'
    },
    {
      id: 40,
      topic: 'cloudwatch',
      question: 'O que são Statistics em CloudWatch?',
      context: 'Agregação.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Agregações aplicadas aos datapoints: Average, Sum, Minimum, Maximum, SampleCount' },
        { label: 'C', text: 'Dashboards' },
        { label: 'D', text: 'Alarmes' }
      ],
      correctAnswer: 'B',
      explanation: 'Statistics: como agregar datapoints no período. Average para CPU, Sum para requests, Max para latência.',
      relatedService: 'cloudwatch'
    },
    {
      id: 41,
      topic: 'cloudwatch',
      question: 'O que são Extended Statistics?',
      context: 'Percentis.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Percentis: p50, p90, p99 - além das statistics básicas' },
        { label: 'C', text: 'Alarmes' },
        { label: 'D', text: 'Dashboards' }
      ],
      correctAnswer: 'B',
      explanation: 'Extended statistics: pNN (percentil). Ex: p99 latency para ignorar outliers. Alarms suportam.',
      relatedService: 'cloudwatch'
    },
    {
      id: 42,
      topic: 'cloudwatch',
      question: 'O que é Log Insights query?',
      context: 'Análise.',
      options: [
        { label: 'A', text: 'SQL' },
        { label: 'B', text: 'Linguagem de query com fields, filter, stats, sort, parse, display' },
        { label: 'C', text: 'NoSQL' },
        { label: 'D', text: 'GraphQL' }
      ],
      correctAnswer: 'B',
      explanation: 'Sintaxe própria: fields @timestamp | filter @message like "ERROR" | stats count() by @logStream.',
      relatedService: 'cloudwatch'
    },
    {
      id: 43,
      topic: 'cloudwatch',
      question: 'Como extrair campos de logs não estruturados?',
      context: 'Parsing.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Comando parse em Logs Insights com regex ou padrão' },
        { label: 'C', text: 'Apenas JSON' },
        { label: 'D', text: 'Via Python' }
      ],
      correctAnswer: 'B',
      explanation: 'parse @message "User * performed * on *" as user, action, resource. Extrai campos.',
      relatedService: 'cloudwatch'
    },
    {
      id: 44,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Logs Live Tail?',
      context: 'Real-time.',
      options: [
        { label: 'A', text: 'Backup de logs' },
        { label: 'B', text: 'Streaming em tempo real de logs no console para debugging' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarm' }
      ],
      correctAnswer: 'B',
      explanation: 'Live Tail: tail -f no console. Veja logs chegando em tempo real. Filtros de pesquisa.',
      relatedService: 'cloudwatch'
    },
    {
      id: 45,
      topic: 'cloudwatch',
      question: 'O que é Alarm Action suppression?',
      context: 'Manutenção.',
      options: [
        { label: 'A', text: 'Deletar alarme' },
        { label: 'B', text: 'Desabilitar ações temporariamente durante manutenção planejada' },
        { label: 'C', text: 'Silenciar notificações' },
        { label: 'D', text: 'Aumentar threshold' }
      ],
      correctAnswer: 'B',
      explanation: 'Disable alarm actions durante manutenção. Alarme continua avaliando mas não dispara ações.',
      relatedService: 'cloudwatch'
    },
    {
      id: 46,
      topic: 'cloudwatch',
      question: 'Como criar alarme que trigger apenas em horário comercial?',
      context: 'Scheduling.',
      options: [
        { label: 'A', text: 'Não é possível nativamente' },
        { label: 'B', text: 'Usar Lambda + EventBridge para enable/disable alarm actions por schedule' },
        { label: 'C', text: 'Propriedade do alarme' },
        { label: 'D', text: 'Via SNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarmes não têm schedule nativo. Workaround: Lambda scheduled para disable/enable actions.',
      relatedService: 'cloudwatch'
    },
    {
      id: 47,
      topic: 'cloudwatch',
      question: 'O que são CloudWatch Metric Streams?',
      context: 'Integração.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Streaming contínuo de métricas para destinos externos (Datadog, Splunk, S3)' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarmes' }
      ],
      correctAnswer: 'B',
      explanation: 'Metric Streams: export near real-time para Kinesis Firehose -> third-party ou S3.',
      relatedService: 'cloudwatch'
    },
    {
      id: 48,
      topic: 'cloudwatch',
      question: 'Qual formato de Metric Streams?',
      context: 'Integração.',
      options: [
        { label: 'A', text: 'CSV' },
        { label: 'B', text: 'JSON ou OpenTelemetry 0.7.0' },
        { label: 'C', text: 'XML' },
        { label: 'D', text: 'Parquet' }
      ],
      correctAnswer: 'B',
      explanation: 'Metric Streams suportam JSON (AWS format) ou OpenTelemetry para compatibilidade com ferramentas.',
      relatedService: 'cloudwatch'
    },
    {
      id: 49,
      topic: 'cloudwatch',
      question: 'O que é GetMetricData vs GetMetricStatistics?',
      context: 'API.',
      options: [
        { label: 'A', text: 'São iguais' },
        { label: 'B', text: 'GetMetricData é mais eficiente para múltiplas métricas, suporta Metric Math' },
        { label: 'C', text: 'GetMetricStatistics é deprecated' },
        { label: 'D', text: 'GetMetricData para logs' }
      ],
      correctAnswer: 'B',
      explanation: 'GetMetricData: batch, metric math, mais rápido. GetMetricStatistics: uma métrica por vez.',
      relatedService: 'cloudwatch'
    },
    {
      id: 50,
      topic: 'cloudwatch',
      question: 'O que é a retenção de métricas CloudWatch?',
      context: 'Storage.',
      options: [
        { label: 'A', text: 'Indefinida' },
        { label: 'B', text: 'Progressiva: 3h (1sec), 15 dias (1min), 63 dias (5min), 15 meses (1h)' },
        { label: 'C', text: '1 ano' },
        { label: 'D', text: '30 dias' }
      ],
      correctAnswer: 'B',
      explanation: 'Métricas agregam com o tempo. High resolution (1s) por 3h. Standard (1min) por 15 dias. Depois 5min, 1h.',
      relatedService: 'cloudwatch'
    },
    {
      id: 51,
      topic: 'cloudwatch',
      question: 'Como criptografar logs CloudWatch?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Associar KMS key ao Log Group' },
        { label: 'C', text: 'Automático' },
        { label: 'D', text: 'Via SSL apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Associate KMS key: logs encriptados at rest. Custo adicional de KMS. CMK requer policy adequada.',
      relatedService: 'cloudwatch'
    },
    {
      id: 52,
      topic: 'cloudwatch',
      question: 'O que é Log Class?',
      context: 'Custos.',
      options: [
        { label: 'A', text: 'Tipo de log' },
        { label: 'B', text: 'Standard (full features) ou Infrequent Access (menor custo, features reduzidas)' },
        { label: 'C', text: 'Formato de log' },
        { label: 'D', text: 'Compressão' }
      ],
      correctAnswer: 'B',
      explanation: 'Infrequent Access: 50% menos custo de ingestão. Sem Live Tail, Contributor Insights. Para logs menos acessados.',
      relatedService: 'cloudwatch'
    },
    {
      id: 53,
      topic: 'cloudwatch',
      question: 'Como monitorar billing com CloudWatch?',
      context: 'Custos.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Habilitar billing alerts e criar alarme para EstimatedCharges' },
        { label: 'C', text: 'Apenas Cost Explorer' },
        { label: 'D', text: 'Via VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'Billing métricas em us-east-1. Enable billing alerts. Alarm: EstimatedCharges > threshold.',
      relatedService: 'cloudwatch'
    },
    {
      id: 54,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Evidently?',
      context: 'Feature flags.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Serviço para feature flags e A/B testing com métricas CloudWatch' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarmes' }
      ],
      correctAnswer: 'B',
      explanation: 'Evidently: launches (feature flags), experiments (A/B). Métricas coletadas para avaliar impacto.',
      relatedService: 'cloudwatch'
    },
    {
      id: 55,
      topic: 'cloudwatch',
      question: 'O que é Internet Monitor?',
      context: 'Conectividade.',
      options: [
        { label: 'A', text: 'Logs de internet' },
        { label: 'B', text: 'Monitora disponibilidade e performance de internet para seus usuários por localização' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Route 53' }
      ],
      correctAnswer: 'B',
      explanation: 'Internet Monitor: visibilidade de problemas de internet afetando usuários. Por city/ASN.',
      relatedService: 'cloudwatch'
    },
    {
      id: 56,
      topic: 'cloudwatch',
      question: 'Como criar alarme para RDS com CloudWatch?',
      context: 'Database.',
      options: [
        { label: 'A', text: 'Custom metric obrigatória' },
        { label: 'B', text: 'Métricas automáticas: CPUUtilization, FreeStorageSpace, DatabaseConnections' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'RDS envia métricas automaticamente. Alarme comum: FreeStorageSpace < threshold.',
      relatedService: 'cloudwatch'
    },
    {
      id: 57,
      topic: 'cloudwatch',
      question: 'O que são Target Tracking alarms?',
      context: 'Auto Scaling.',
      options: [
        { label: 'A', text: 'Alarmes manuais' },
        { label: 'B', text: 'Alarmes criados automaticamente por Target Tracking policies para manter métrica em target' },
        { label: 'C', text: 'Alarmes de custo' },
        { label: 'D', text: 'Alarmes de log' }
      ],
      correctAnswer: 'B',
      explanation: 'Target Tracking cria alarmes high/low automaticamente para scale out/in mantendo métrica no target.',
      relatedService: 'cloudwatch'
    },
    {
      id: 58,
      topic: 'cloudwatch',
      question: 'O que é missing data treatment em alarmes?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Deletar dados' },
        { label: 'B', text: 'Como tratar períodos sem dados: missing, breaching, notBreaching, ignore' },
        { label: 'C', text: 'Compressão' },
        { label: 'D', text: 'Encryption' }
      ],
      correctAnswer: 'B',
      explanation: 'Treat missing data: notBreaching (assume OK), breaching (assume ruim), missing (INSUFFICIENT_DATA), ignore.',
      relatedService: 'cloudwatch'
    },
    {
      id: 59,
      topic: 'cloudwatch',
      question: 'Como monitorar DynamoDB com CloudWatch?',
      context: 'NoSQL.',
      options: [
        { label: 'A', text: 'Custom metrics' },
        { label: 'B', text: 'Métricas automáticas: ConsumedReadCapacity, ConsumedWriteCapacity, Throttles' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'DynamoDB métricas: capacity consumed, throttles, latency, errors. Alarms para throttling.',
      relatedService: 'cloudwatch'
    },
    {
      id: 60,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch cross-region dashboard?',
      context: 'Multi-region.',
      options: [
        { label: 'A', text: 'Dashboard por região' },
        { label: 'B', text: 'Dashboard que exibe métricas de múltiplas regiões em uma única visualização' },
        { label: 'C', text: 'VPN' },
        { label: 'D', text: 'Peering' }
      ],
      correctAnswer: 'B',
      explanation: 'Dashboards são globais. Widgets podem referenciar métricas de qualquer região.',
      relatedService: 'cloudwatch'
    },
    {
      id: 61,
      topic: 'cloudwatch',
      question: 'Como compartilhar dashboard com outros?',
      context: 'Colaboração.',
      options: [
        { label: 'A', text: 'Não é possível' },
        { label: 'B', text: 'Dashboard sharing via link público ou cross-account com IAM' },
        { label: 'C', text: 'Apenas screenshot' },
        { label: 'D', text: 'Via email apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Share dashboard: public link (qualquer um) ou cross-account (outras contas AWS com IAM).',
      relatedService: 'cloudwatch'
    },
    {
      id: 62,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Agent procstat?',
      context: 'Process monitoring.',
      options: [
        { label: 'A', text: 'Log de processos' },
        { label: 'B', text: 'Plugin que monitora métricas de processos específicos (CPU, memory por processo)' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarm' }
      ],
      correctAnswer: 'B',
      explanation: 'procstat: monitora processos por nome, pid, pattern. Métricas: cpu, memory, file descriptors.',
      relatedService: 'cloudwatch'
    },
    {
      id: 63,
      topic: 'cloudwatch',
      question: 'O que é statsd em CloudWatch Agent?',
      context: 'Custom metrics.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Protocolo para apps enviarem custom metrics via UDP para o agent' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Alarm' }
      ],
      correctAnswer: 'B',
      explanation: 'statsd/collectd: apps enviam métricas para agent que agrega e envia para CloudWatch.',
      relatedService: 'cloudwatch'
    },
    {
      id: 64,
      topic: 'cloudwatch',
      question: 'Como monitorar EBS com CloudWatch?',
      context: 'Storage.',
      options: [
        { label: 'A', text: 'Custom metric obrigatória' },
        { label: 'B', text: 'Métricas automáticas: VolumeReadOps, VolumeWriteOps, VolumeThroughput, VolumeQueueLength' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'EBS métricas via CloudWatch. VolumeQueueLength alto indica gargalo. BurstBalance para gp2.',
      relatedService: 'cloudwatch'
    },
    {
      id: 65,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Log Anomaly Detection?',
      context: 'ML.',
      options: [
        { label: 'A', text: 'Threshold fixo' },
        { label: 'B', text: 'ML que detecta padrões anormais em logs automaticamente' },
        { label: 'C', text: 'Metric Filter' },
        { label: 'D', text: 'Dashboard' }
      ],
      correctAnswer: 'B',
      explanation: 'Log Anomaly Detection identifica eventos incomuns em log groups. Patterns anormais destacados.',
      relatedService: 'cloudwatch'
    },
    {
      id: 66,
      topic: 'cloudwatch',
      question: 'Como monitorar SQS com CloudWatch?',
      context: 'Messaging.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: ApproximateNumberOfMessages, ApproximateAgeOfOldestMessage' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS métricas: queue depth, message age. Alarms para backlog growing ou messages stuck.',
      relatedService: 'cloudwatch'
    },
    {
      id: 67,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch ServiceQuotas integration?',
      context: 'Limites.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Métricas de utilização de quotas de serviço para alarmar antes de atingir limites' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Custos' }
      ],
      correctAnswer: 'B',
      explanation: 'Service Quotas publica métricas de utilização. Alarme antes de atingir limit (ex: EC2 instances).',
      relatedService: 'cloudwatch'
    },
    {
      id: 68,
      topic: 'cloudwatch',
      question: 'Como monitorar NAT Gateway?',
      context: 'Networking.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: BytesOutToDestination, PacketsDropCount, ConnectionEstablishedCount' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'NAT Gateway métricas: bytes in/out, connections, packets dropped. Identify bandwidth limits.',
      relatedService: 'cloudwatch'
    },
    {
      id: 69,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Network Monitor?',
      context: 'Hybrid.',
      options: [
        { label: 'A', text: 'VPN logs' },
        { label: 'B', text: 'Monitora latência e packet loss entre AWS e on-premises via probes' },
        { label: 'C', text: 'Dashboard' },
        { label: 'D', text: 'Firewall' }
      ],
      correctAnswer: 'B',
      explanation: 'Network Monitor: probes que medem latência/loss para destinos. Útil para hybrid connectivity.',
      relatedService: 'cloudwatch'
    },
    {
      id: 70,
      topic: 'cloudwatch',
      question: 'Como enviar logs de VPC Flow para CloudWatch?',
      context: 'Networking.',
      options: [
        { label: 'A', text: 'Automático' },
        { label: 'B', text: 'Criar Flow Log com destino CloudWatch Logs' },
        { label: 'C', text: 'Via Agent' },
        { label: 'D', text: 'Via VPN' }
      ],
      correctAnswer: 'B',
      explanation: 'VPC Flow Logs podem ir para CloudWatch Logs ou S3. Query com Logs Insights.',
      relatedService: 'cloudwatch'
    },
    {
      id: 71,
      topic: 'cloudwatch',
      question: 'O que são alarm recommendations?',
      context: 'Best practices.',
      options: [
        { label: 'A', text: 'Alarmes automáticos' },
        { label: 'B', text: 'Sugestões da AWS de alarmes importantes para seus recursos' },
        { label: 'C', text: 'Logs' },
        { label: 'D', text: 'Dashboard' }
      ],
      correctAnswer: 'B',
      explanation: 'Console sugere alarmes recomendados por serviço. Ex: CPU, memory, disk para EC2.',
      relatedService: 'cloudwatch'
    },
    {
      id: 72,
      topic: 'cloudwatch',
      question: 'Como monitorar Step Functions com CloudWatch?',
      context: 'Workflows.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: ExecutionsStarted, ExecutionsFailed, ExecutionTime' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Step Functions métricas: executions started/succeeded/failed/timed out, duration.',
      relatedService: 'cloudwatch'
    },
    {
      id: 73,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Agent Wizard?',
      context: 'Configuração.',
      options: [
        { label: 'A', text: 'Dashboard' },
        { label: 'B', text: 'Ferramenta interativa CLI para gerar configuration file do agent' },
        { label: 'C', text: 'Alarm' },
        { label: 'D', text: 'Metric Filter' }
      ],
      correctAnswer: 'B',
      explanation: 'amazon-cloudwatch-agent-config-wizard: perguntas interativas para gerar JSON config.',
      relatedService: 'cloudwatch'
    },
    {
      id: 74,
      topic: 'cloudwatch',
      question: 'Como monitorar ElastiCache com CloudWatch?',
      context: 'Cache.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: CPUUtilization, CacheHits, CacheMisses, Evictions' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'ElastiCache Redis/Memcached métricas: hit rate, evictions, connections, memory usage.',
      relatedService: 'cloudwatch'
    },
    {
      id: 75,
      topic: 'cloudwatch',
      question: 'O que é um alarm widget no dashboard?',
      context: 'Visualização.',
      options: [
        { label: 'A', text: 'Alarme' },
        { label: 'B', text: 'Widget que mostra status de alarmes selecionados no dashboard' },
        { label: 'C', text: 'Metric Filter' },
        { label: 'D', text: 'Log' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarm widget: visualiza estado (OK/ALARM) de múltiplos alarmes. Tabela ou status indicator.',
      relatedService: 'cloudwatch'
    },
    {
      id: 76,
      topic: 'cloudwatch',
      question: 'Como configurar alarme com actions para múltiplos destinos?',
      context: 'Notificações.',
      options: [
        { label: 'A', text: 'Apenas 1 destino' },
        { label: 'B', text: 'Múltiplas SNS topics, Auto Scaling policies e EC2 actions na mesma alarm' },
        { label: 'C', text: 'Via Lambda apenas' },
        { label: 'D', text: 'Via EventBridge apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Alarm pode ter múltiplas actions: enviar SNS, trigger ASG, stop/terminate EC2.',
      relatedService: 'cloudwatch'
    },
    {
      id: 77,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Logs protection?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Backup' },
        { label: 'B', text: 'Resource policy que controla quem pode criar log groups e enviar logs' },
        { label: 'C', text: 'Encryption' },
        { label: 'D', text: 'Retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Log group resource policy: controla acesso. Ex: permitir apenas serviços específicos enviar logs.',
      relatedService: 'cloudwatch'
    },
    {
      id: 78,
      topic: 'cloudwatch',
      question: 'Como monitorar Kinesis Data Streams?',
      context: 'Streaming.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: IncomingRecords, WriteProvisionedThroughputExceeded, IteratorAge' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Kinesis métricas: throughput exceeded (precisa scale), iterator age (consumer lag).',
      relatedService: 'cloudwatch'
    },
    {
      id: 79,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Logs Data Protection?',
      context: 'PII.',
      options: [
        { label: 'A', text: 'Backup' },
        { label: 'B', text: 'Detecta e mascara automaticamente dados sensíveis (PII) em logs' },
        { label: 'C', text: 'Encryption' },
        { label: 'D', text: 'Retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Data Protection: detecta SSN, credit cards, addresses em logs. Pode mascarar ou auditar.',
      relatedService: 'cloudwatch'
    },
    {
      id: 80,
      topic: 'cloudwatch',
      question: 'Como monitorar EKS Control Plane?',
      context: 'Kubernetes.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Habilitar logging para api-server, audit, authenticator, controller-manager, scheduler' },
        { label: 'C', text: 'Agent obrigatório' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'EKS control plane logs: escolha quais componentes enviam logs para CloudWatch.',
      relatedService: 'cloudwatch'
    },
    {
      id: 81,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch Logs Metric Filter pattern syntax?',
      context: 'Filters.',
      options: [
        { label: 'A', text: 'SQL' },
        { label: 'B', text: 'Sintaxe específica: termos, wildcards, JSON fields, espaços para AND' },
        { label: 'C', text: 'Regex apenas' },
        { label: 'D', text: 'GraphQL' }
      ],
      correctAnswer: 'B',
      explanation: 'Pattern: ERROR Exception para AND. [ip, id, user] para space-delimited. { $.field = "value" } para JSON.',
      relatedService: 'cloudwatch'
    },
    {
      id: 82,
      topic: 'cloudwatch',
      question: 'Como monitorar SNS com CloudWatch?',
      context: 'Messaging.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: NumberOfMessagesPublished, NumberOfNotificationsDelivered/Failed' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'SNS métricas: published, delivered, failed por topic e subscription. Alarme para failures.',
      relatedService: 'cloudwatch'
    },
    {
      id: 83,
      topic: 'cloudwatch',
      question: 'O que é automatic dashboard para recursos?',
      context: 'Visualização.',
      options: [
        { label: 'A', text: 'Dashboard manual' },
        { label: 'B', text: 'Dashboards gerados automaticamente por serviço (EC2, Lambda, etc) com métricas comuns' },
        { label: 'C', text: 'Alarm' },
        { label: 'D', text: 'Logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Automatic dashboards: CloudWatch gera dashboards padrão por serviço. Cross-service dashboard.',
      relatedService: 'cloudwatch'
    },
    {
      id: 84,
      topic: 'cloudwatch',
      question: 'Como monitorar CodeBuild com CloudWatch?',
      context: 'CI/CD.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: BuildCount, SucceededBuilds, FailedBuilds, Duration' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CodeBuild métricas: builds succeeded/failed, duration. Logs vão para CloudWatch Logs.',
      relatedService: 'cloudwatch'
    },
    {
      id: 85,
      topic: 'cloudwatch',
      question: 'O que são Units em métricas?',
      context: 'Métricas.',
      options: [
        { label: 'A', text: 'Logs' },
        { label: 'B', text: 'Unidade de medida: Seconds, Bytes, Percent, Count, None, etc' },
        { label: 'C', text: 'Alarmes' },
        { label: 'D', text: 'Dashboards' }
      ],
      correctAnswer: 'B',
      explanation: 'Unit define tipo de medida. Métricas com mesma unit podem ser comparadas/combinadas.',
      relatedService: 'cloudwatch'
    },
    {
      id: 86,
      topic: 'cloudwatch',
      question: 'Como monitorar CloudFront com CloudWatch?',
      context: 'CDN.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Métricas automáticas: Requests, BytesDownloaded, 4xxErrorRate, 5xxErrorRate' },
        { label: 'C', text: 'Logs apenas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFront métricas: requests, bytes, error rates. Métricas adicionais com distribution settings.',
      relatedService: 'cloudwatch'
    },
    {
      id: 87,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch query export?',
      context: 'Análise.',
      options: [
        { label: 'A', text: 'Backup' },
        { label: 'B', text: 'Exportar resultados de Logs Insights query para dashboard ou CSV' },
        { label: 'C', text: 'Encryption' },
        { label: 'D', text: 'Retention' }
      ],
      correctAnswer: 'B',
      explanation: 'Logs Insights: export results para CSV download ou adicionar diretamente a dashboard como widget.',
      relatedService: 'cloudwatch'
    },
    {
      id: 88,
      topic: 'cloudwatch',
      question: 'Como monitorar Secrets Manager com CloudWatch?',
      context: 'Security.',
      options: [
        { label: 'A', text: 'Custom metric' },
        { label: 'B', text: 'Via CloudTrail events e EventBridge rules para actions (rotation, access)' },
        { label: 'C', text: 'Métricas nativas' },
        { label: 'D', text: 'Não é possível' }
      ],
      correctAnswer: 'B',
      explanation: 'Secrets Manager: CloudTrail logs access. EventBridge rules para rotation events.',
      relatedService: 'cloudwatch'
    },
    {
      id: 89,
      topic: 'cloudwatch',
      question: 'O que é CloudWatch annotation em dashboards?',
      context: 'Visualização.',
      options: [
        { label: 'A', text: 'Log' },
        { label: 'B', text: 'Marcadores visuais em gráficos indicando eventos (deployments, incidents)' },
        { label: 'C', text: 'Alarm' },
        { label: 'D', text: 'Metric' }
      ],
      correctAnswer: 'B',
      explanation: 'Annotations: linhas horizontais/verticais em gráficos. Marcar deployments, incidentes para correlação.',
      relatedService: 'cloudwatch'
    },
    {
      id: 90,
      topic: 'cloudwatch',
      question: 'Qual best practice para organizar métricas e logs?',
      context: 'Governança.',
      options: [
        { label: 'A', text: 'Tudo em um namespace' },
        { label: 'B', text: 'Namespaces por app/team, Log Groups com naming convention, tags para custo, retention adequada' },
        { label: 'C', text: 'Sem organização' },
        { label: 'D', text: 'Apenas defaults' }
      ],
      correctAnswer: 'B',
      explanation: 'Organize: namespace por aplicação, log group naming /env/app/component, tags, retention policy, encryption.',
      relatedService: 'cloudwatch'
    }
  ],

  architecture: [
    {
      id: 1,
      topic: 'architecture',
      question: 'Qual princípio do Well-Architected Framework foca em testar capacidade de recuperação de falhas?',
      context: 'Testando resiliência.',
      options: [
        { label: 'A', text: 'Operational Excellence' },
        { label: 'B', text: 'Reliability' },
        { label: 'C', text: 'Performance Efficiency' },
        { label: 'D', text: 'Cost Optimization' }
      ],
      correctAnswer: 'B',
      explanation: 'Reliability: capacidade de recuperar de falhas e atender demanda. Princípios: testar recovery procedures, auto-recover, scale horizontally, stop guessing capacity. Chaos engineering.',
      relatedService: 'architecture'
    },
    {
      id: 2,
      topic: 'architecture',
      question: 'O que significa "Design for Failure"?',
      context: 'Arquitetura resiliente.',
      options: [
        { label: 'A', text: 'Evitar falhas a todo custo' },
        { label: 'B', text: 'Assumir que componentes falharão e projetar sistema para continuar operando' },
        { label: 'C', text: 'Aceitar downtime' },
        { label: 'D', text: 'Usar sempre a opção mais cara' }
      ],
      correctAnswer: 'B',
      explanation: 'Design for Failure: assume que instâncias, AZs, até regiões podem falhar. Arquitetura deve: auto-recover (ASG, health checks), multi-AZ, stateless, loose coupling, graceful degradation. Não "if" falhar, mas "when".',
      relatedService: 'architecture'
    },
    {
      id: 3,
      topic: 'architecture',
      question: 'Qual pilar do Well-Architected Framework foca em executar workloads de forma eficaz e ganhar insights sobre operações?',
      context: 'Pilares do Well-Architected.',
      options: [
        { label: 'A', text: 'Reliability' },
        { label: 'B', text: 'Operational Excellence' },
        { label: 'C', text: 'Security' },
        { label: 'D', text: 'Performance Efficiency' }
      ],
      correctAnswer: 'B',
      explanation: 'Operational Excellence foca em: executar e monitorar sistemas, melhorar continuamente processos e procedimentos. Inclui automação de mudanças, resposta a eventos, definição de padrões para operações diárias.',
      relatedService: 'architecture'
    },
    {
      id: 4,
      topic: 'architecture',
      question: 'Qual princípio do pilar Security recomenda aplicar em todas as camadas?',
      context: 'Defesa em profundidade.',
      options: [
        { label: 'A', text: 'Apply security at all layers' },
        { label: 'B', text: 'Single point of security' },
        { label: 'C', text: 'Perimeter security only' },
        { label: 'D', text: 'Trust internal networks' }
      ],
      correctAnswer: 'A',
      explanation: 'Apply security at all layers: defesa em profundidade. Implementar segurança em edge, VPC, subnet, load balancer, instância, OS, aplicação. Múltiplas camadas de proteção.',
      relatedService: 'architecture'
    },
    {
      id: 5,
      topic: 'architecture',
      question: 'O que é o princípio de "Least Privilege" no contexto de segurança AWS?',
      context: 'Controle de acesso.',
      options: [
        { label: 'A', text: 'Dar acesso administrativo a todos' },
        { label: 'B', text: 'Conceder apenas permissões mínimas necessárias para realizar uma tarefa' },
        { label: 'C', text: 'Remover todas as permissões' },
        { label: 'D', text: 'Usar apenas usuário root' }
      ],
      correctAnswer: 'B',
      explanation: 'Least Privilege: conceder apenas as permissões mínimas necessárias. Reduz superfície de ataque, limita impacto de comprometimento. Usar IAM policies específicas, revisar periodicamente.',
      relatedService: 'architecture'
    },
    {
      id: 6,
      topic: 'architecture',
      question: 'Qual pilar do Well-Architected foca em usar recursos de TI de forma eficiente?',
      context: 'Eficiência de recursos.',
      options: [
        { label: 'A', text: 'Cost Optimization' },
        { label: 'B', text: 'Performance Efficiency' },
        { label: 'C', text: 'Reliability' },
        { label: 'D', text: 'Sustainability' }
      ],
      correctAnswer: 'B',
      explanation: 'Performance Efficiency: usar recursos de computação de forma eficiente para atender requisitos. Manter essa eficiência conforme demanda muda e tecnologias evoluem.',
      relatedService: 'architecture'
    },
    {
      id: 7,
      topic: 'architecture',
      question: 'O que é "Loose Coupling" em arquitetura de sistemas?',
      context: 'Desacoplamento de componentes.',
      options: [
        { label: 'A', text: 'Componentes fortemente dependentes entre si' },
        { label: 'B', text: 'Componentes independentes que se comunicam através de interfaces bem definidas' },
        { label: 'C', text: 'Todos os serviços em um único servidor' },
        { label: 'D', text: 'Sem comunicação entre componentes' }
      ],
      correctAnswer: 'B',
      explanation: 'Loose Coupling: componentes interagem através de interfaces (APIs, filas, eventos). Falha em um não afeta outros. Permite escalar, atualizar e manter independentemente. Usar SQS, SNS, EventBridge.',
      relatedService: 'architecture'
    },
    {
      id: 8,
      topic: 'architecture',
      question: 'Qual serviço AWS facilita arquiteturas event-driven e loose coupling?',
      context: 'Arquitetura orientada a eventos.',
      options: [
        { label: 'A', text: 'EC2' },
        { label: 'B', text: 'Amazon EventBridge' },
        { label: 'C', text: 'EBS' },
        { label: 'D', text: 'VPC' }
      ],
      correctAnswer: 'B',
      explanation: 'EventBridge: barramento de eventos serverless. Conecta aplicações usando eventos. Event-driven: baixo acoplamento, escalabilidade, extensibilidade. Integra com serviços AWS e SaaS.',
      relatedService: 'architecture'
    },
    {
      id: 9,
      topic: 'architecture',
      question: 'O que é "High Availability" (HA) na AWS?',
      context: 'Disponibilidade de sistemas.',
      options: [
        { label: 'A', text: 'Sistema que funciona 50% do tempo' },
        { label: 'B', text: 'Sistema projetado para operar continuamente sem falhas perceptíveis' },
        { label: 'C', text: 'Sistema em uma única AZ' },
        { label: 'D', text: 'Sistema sem redundância' }
      ],
      correctAnswer: 'B',
      explanation: 'High Availability: sistema projetado para máximo uptime. Usa Multi-AZ, redundância, failover automático, load balancing. Objetivo: minimizar ou eliminar downtime.',
      relatedService: 'architecture'
    },
    {
      id: 10,
      topic: 'architecture',
      question: 'Qual é a diferença entre High Availability e Fault Tolerance?',
      context: 'HA vs FT.',
      options: [
        { label: 'A', text: 'São a mesma coisa' },
        { label: 'B', text: 'HA aceita breve interrupção no failover; FT opera sem qualquer interrupção' },
        { label: 'C', text: 'FT é mais barato que HA' },
        { label: 'D', text: 'HA não usa redundância' }
      ],
      correctAnswer: 'B',
      explanation: 'HA: sistema se recupera rapidamente de falhas (pode haver breve interrupção). FT: sistema continua operando sem qualquer interrupção mesmo com falhas. FT é mais caro (redundância ativa).',
      relatedService: 'architecture'
    },
    {
      id: 11,
      topic: 'architecture',
      question: 'O que é o conceito de "Stateless" em aplicações cloud?',
      context: 'Design de aplicações.',
      options: [
        { label: 'A', text: 'Aplicação que armazena sessões localmente' },
        { label: 'B', text: 'Aplicação que não mantém estado entre requisições no servidor' },
        { label: 'C', text: 'Aplicação sem banco de dados' },
        { label: 'D', text: 'Aplicação que não pode escalar' }
      ],
      correctAnswer: 'B',
      explanation: 'Stateless: servidor não mantém informação de sessão. Estado armazenado externamente (ElastiCache, DynamoDB, S3). Permite escalar horizontalmente, substituir instâncias sem perda.',
      relatedService: 'architecture'
    },
    {
      id: 12,
      topic: 'architecture',
      question: 'Por que é importante usar múltiplas Availability Zones?',
      context: 'Multi-AZ deployment.',
      options: [
        { label: 'A', text: 'Apenas para reduzir custos' },
        { label: 'B', text: 'Para proteger contra falhas de uma AZ inteira' },
        { label: 'C', text: 'Para aumentar latência' },
        { label: 'D', text: 'Não há benefício em usar múltiplas AZs' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-AZ: AZs são data centers separados geograficamente. Se uma AZ falhar, aplicação continua operando em outras. Essencial para HA. RDS Multi-AZ, ALB cross-zone.',
      relatedService: 'architecture'
    },
    {
      id: 13,
      topic: 'architecture',
      question: 'O que é "Horizontal Scaling" (Scale Out)?',
      context: 'Estratégias de escalabilidade.',
      options: [
        { label: 'A', text: 'Aumentar o tamanho de uma instância existente' },
        { label: 'B', text: 'Adicionar mais instâncias para distribuir carga' },
        { label: 'C', text: 'Reduzir recursos' },
        { label: 'D', text: 'Mover para região diferente' }
      ],
      correctAnswer: 'B',
      explanation: 'Horizontal Scaling (Scale Out): adicionar mais instâncias. Distribuir carga entre múltiplos recursos. Mais resiliente que vertical (Scale Up). Auto Scaling Groups facilitam.',
      relatedService: 'architecture'
    },
    {
      id: 14,
      topic: 'architecture',
      question: 'Qual é o benefício de usar Elastic Load Balancing em arquiteturas AWS?',
      context: 'Distribuição de carga.',
      options: [
        { label: 'A', text: 'Armazenar dados' },
        { label: 'B', text: 'Distribuir tráfego entre múltiplos targets e aumentar disponibilidade' },
        { label: 'C', text: 'Executar código' },
        { label: 'D', text: 'Gerenciar DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'ELB: distribui tráfego entre targets saudáveis. Health checks removem instâncias não saudáveis. Cross-zone load balancing. Integra com Auto Scaling para HA e escalabilidade.',
      relatedService: 'architecture'
    },
    {
      id: 15,
      topic: 'architecture',
      question: 'O que é "Infrastructure as Code" (IaC)?',
      context: 'Automação de infraestrutura.',
      options: [
        { label: 'A', text: 'Configurar recursos manualmente no console' },
        { label: 'B', text: 'Gerenciar e provisionar infraestrutura através de código e templates' },
        { label: 'C', text: 'Escrever código de aplicação' },
        { label: 'D', text: 'Documentar infraestrutura' }
      ],
      correctAnswer: 'B',
      explanation: 'IaC: definir infraestrutura em arquivos de código. Versionável, reproduzível, automatizável. AWS: CloudFormation, CDK, Terraform. Evita configuração manual e drift.',
      relatedService: 'architecture'
    },
    {
      id: 16,
      topic: 'architecture',
      question: 'Qual serviço AWS é usado para Infrastructure as Code?',
      context: 'Automação com AWS.',
      options: [
        { label: 'A', text: 'Amazon EC2' },
        { label: 'B', text: 'AWS CloudFormation' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'Amazon RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'CloudFormation: serviço de IaC nativo AWS. Templates JSON/YAML definem recursos. Stacks agrupam recursos. Rollback automático em falhas. CDK para IaC em linguagens de programação.',
      relatedService: 'architecture'
    },
    {
      id: 17,
      topic: 'architecture',
      question: 'O que é o princípio "Stop Guessing Capacity"?',
      context: 'Elasticidade na cloud.',
      options: [
        { label: 'A', text: 'Provisionar capacidade fixa baseada em estimativas' },
        { label: 'B', text: 'Usar elasticidade da cloud para escalar recursos conforme demanda real' },
        { label: 'C', text: 'Sempre provisionar o máximo possível' },
        { label: 'D', text: 'Nunca usar Auto Scaling' }
      ],
      correctAnswer: 'B',
      explanation: 'Stop Guessing Capacity: na cloud, não precisa adivinhar capacidade. Auto Scaling ajusta recursos automaticamente. Evita over-provisioning (custo) e under-provisioning (performance).',
      relatedService: 'architecture'
    },
    {
      id: 18,
      topic: 'architecture',
      question: 'Qual é o objetivo do pilar Cost Optimization?',
      context: 'Otimização de custos.',
      options: [
        { label: 'A', text: 'Gastar o máximo possível' },
        { label: 'B', text: 'Evitar custos desnecessários e maximizar valor de negócio' },
        { label: 'C', text: 'Usar apenas serviços gratuitos' },
        { label: 'D', text: 'Nunca escalar recursos' }
      ],
      correctAnswer: 'B',
      explanation: 'Cost Optimization: entregar valor de negócio ao menor custo. Eliminar desperdício, usar preços corretos (Savings Plans, Reserved), right-sizing, desligar recursos não usados.',
      relatedService: 'architecture'
    },
    {
      id: 19,
      topic: 'architecture',
      question: 'O que é "Right Sizing" em arquitetura AWS?',
      context: 'Dimensionamento de recursos.',
      options: [
        { label: 'A', text: 'Sempre usar instâncias maiores' },
        { label: 'B', text: 'Selecionar o tipo e tamanho de recursos adequados para a carga de trabalho' },
        { label: 'C', text: 'Usar apenas instâncias micro' },
        { label: 'D', text: 'Nunca mudar o tamanho das instâncias' }
      ],
      correctAnswer: 'B',
      explanation: 'Right Sizing: usar recursos de tamanho adequado. Nem over-provisioned nem under-provisioned. AWS Cost Explorer e Compute Optimizer ajudam a identificar oportunidades.',
      relatedService: 'architecture'
    },
    {
      id: 20,
      topic: 'architecture',
      question: 'Qual é o sexto pilar do Well-Architected Framework, adicionado em 2021?',
      context: 'Pilares do framework.',
      options: [
        { label: 'A', text: 'Governance' },
        { label: 'B', text: 'Sustainability' },
        { label: 'C', text: 'Agility' },
        { label: 'D', text: 'Flexibility' }
      ],
      correctAnswer: 'B',
      explanation: 'Sustainability: sexto pilar adicionado em 2021. Foca em minimizar impacto ambiental de workloads. Eficiência energética, right-sizing, regiões com energia limpa.',
      relatedService: 'architecture'
    },
    {
      id: 21,
      topic: 'architecture',
      question: 'O que é uma arquitetura "Microservices"?',
      context: 'Padrões de arquitetura.',
      options: [
        { label: 'A', text: 'Uma única aplicação monolítica' },
        { label: 'B', text: 'Aplicação dividida em serviços pequenos e independentes' },
        { label: 'C', text: 'Sem serviços' },
        { label: 'D', text: 'Apenas frontend' }
      ],
      correctAnswer: 'B',
      explanation: 'Microservices: arquitetura onde aplicação é composta de serviços pequenos, independentes, cada um com responsabilidade única. Deploy independente, escalabilidade granular, tecnologias diferentes.',
      relatedService: 'architecture'
    },
    {
      id: 22,
      topic: 'architecture',
      question: 'Qual serviço AWS é ideal para orquestrar containers em arquitetura microservices?',
      context: 'Containers e orquestração.',
      options: [
        { label: 'A', text: 'Amazon S3' },
        { label: 'B', text: 'Amazon ECS ou EKS' },
        { label: 'C', text: 'Amazon RDS' },
        { label: 'D', text: 'Amazon CloudFront' }
      ],
      correctAnswer: 'B',
      explanation: 'ECS (Elastic Container Service) e EKS (Elastic Kubernetes Service): orquestram containers. Ideal para microservices: deploy, scaling, networking, service discovery automáticos.',
      relatedService: 'architecture'
    },
    {
      id: 23,
      topic: 'architecture',
      question: 'O que é "Serverless" architecture?',
      context: 'Computação serverless.',
      options: [
        { label: 'A', text: 'Arquitetura sem nenhum servidor' },
        { label: 'B', text: 'Arquitetura onde AWS gerencia infraestrutura e você foca no código' },
        { label: 'C', text: 'Apenas front-end' },
        { label: 'D', text: 'Servidores auto-gerenciados' }
      ],
      correctAnswer: 'B',
      explanation: 'Serverless: AWS gerencia infraestrutura (provisioning, scaling, patching). Você foca no código de negócio. Lambda, API Gateway, DynamoDB, S3, Step Functions. Pay-per-use.',
      relatedService: 'architecture'
    },
    {
      id: 24,
      topic: 'architecture',
      question: 'Qual é um benefício principal de arquitetura serverless?',
      context: 'Vantagens de serverless.',
      options: [
        { label: 'A', text: 'Gerenciar servidores manualmente' },
        { label: 'B', text: 'Escalar automaticamente e pagar apenas pelo que usa' },
        { label: 'C', text: 'Custo fixo mensal' },
        { label: 'D', text: 'Maior complexidade operacional' }
      ],
      correctAnswer: 'B',
      explanation: 'Serverless benefícios: auto-scaling, pay-per-use, zero admin de servidores, alta disponibilidade built-in, foco em código de negócio, time-to-market rápido.',
      relatedService: 'architecture'
    },
    {
      id: 25,
      topic: 'architecture',
      question: 'O que é "Caching" e por que é importante em arquitetura cloud?',
      context: 'Estratégias de cache.',
      options: [
        { label: 'A', text: 'Armazenar dados permanentemente' },
        { label: 'B', text: 'Armazenar dados frequentemente acessados para reduzir latência e carga' },
        { label: 'C', text: 'Excluir dados antigos' },
        { label: 'D', text: 'Backup de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Caching: armazena dados em memória rápida. Reduz latência, reduz carga em banco de dados, melhora performance. ElastiCache (Redis/Memcached), CloudFront edge caching.',
      relatedService: 'architecture'
    },
    {
      id: 26,
      topic: 'architecture',
      question: 'Qual serviço AWS fornece cache in-memory?',
      context: 'Cache na AWS.',
      options: [
        { label: 'A', text: 'Amazon RDS' },
        { label: 'B', text: 'Amazon ElastiCache' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'Amazon EBS' }
      ],
      correctAnswer: 'B',
      explanation: 'ElastiCache: cache in-memory gerenciado. Redis ou Memcached. Sub-millisecond latency. Session store, database caching, real-time analytics. Tira carga do banco de dados.',
      relatedService: 'architecture'
    },
    {
      id: 27,
      topic: 'architecture',
      question: 'O que é "Disaster Recovery" (DR)?',
      context: 'Recuperação de desastres.',
      options: [
        { label: 'A', text: 'Backup diário de dados' },
        { label: 'B', text: 'Conjunto de políticas e procedimentos para recuperar sistemas após desastre' },
        { label: 'C', text: 'Monitoramento de sistemas' },
        { label: 'D', text: 'Auditoria de segurança' }
      ],
      correctAnswer: 'B',
      explanation: 'DR: planejar e implementar recuperação de sistemas críticos após eventos catastróficos. Inclui RTO (Recovery Time Objective), RPO (Recovery Point Objective), estratégias de failover.',
      relatedService: 'architecture'
    },
    {
      id: 28,
      topic: 'architecture',
      question: 'O que significa RTO (Recovery Time Objective)?',
      context: 'Métricas de DR.',
      options: [
        { label: 'A', text: 'Quantidade de dados que pode ser perdida' },
        { label: 'B', text: 'Tempo máximo aceitável para restaurar sistema após desastre' },
        { label: 'C', text: 'Tempo de backup' },
        { label: 'D', text: 'Tempo de deploy' }
      ],
      correctAnswer: 'B',
      explanation: 'RTO: tempo máximo aceitável para recuperar sistema. Ex: RTO de 4 horas significa sistema deve estar operacional em até 4 horas após desastre. Define urgência da recuperação.',
      relatedService: 'architecture'
    },
    {
      id: 29,
      topic: 'architecture',
      question: 'O que significa RPO (Recovery Point Objective)?',
      context: 'Métricas de DR.',
      options: [
        { label: 'A', text: 'Tempo para recuperar sistema' },
        { label: 'B', text: 'Quantidade máxima de perda de dados aceitável (em tempo)' },
        { label: 'C', text: 'Número de servidores' },
        { label: 'D', text: 'Custo de recuperação' }
      ],
      correctAnswer: 'B',
      explanation: 'RPO: perda de dados aceitável medida em tempo. RPO de 1 hora: pode perder até 1 hora de dados. Define frequência de backups. Menor RPO = mais backups = maior custo.',
      relatedService: 'architecture'
    },
    {
      id: 30,
      topic: 'architecture',
      question: 'Qual estratégia de DR tem o menor RTO mas maior custo?',
      context: 'Estratégias de DR.',
      options: [
        { label: 'A', text: 'Backup and Restore' },
        { label: 'B', text: 'Pilot Light' },
        { label: 'C', text: 'Warm Standby' },
        { label: 'D', text: 'Multi-Site Active-Active' }
      ],
      correctAnswer: 'D',
      explanation: 'Multi-Site Active-Active: infraestrutura completa rodando em múltiplas regiões simultaneamente. RTO quase zero (já está ativo). Maior custo (100% duplicado). Melhor para aplicações críticas.',
      relatedService: 'architecture'
    },
    {
      id: 31,
      topic: 'architecture',
      question: 'O que é "Backup and Restore" como estratégia de DR?',
      context: 'Estratégia de backup.',
      options: [
        { label: 'A', text: 'Sistema ativo em múltiplas regiões' },
        { label: 'B', text: 'Manter backups e restaurar quando necessário; maior RTO, menor custo' },
        { label: 'C', text: 'Instâncias mínimas sempre rodando' },
        { label: 'D', text: 'Infraestrutura em escala reduzida' }
      ],
      correctAnswer: 'B',
      explanation: 'Backup and Restore: backup regular de dados para S3, AMIs, snapshots. Em desastre, provisiona infraestrutura e restaura. Maior RTO (horas), menor custo. Bom para sistemas não críticos.',
      relatedService: 'architecture'
    },
    {
      id: 32,
      topic: 'architecture',
      question: 'O que é a estratégia "Pilot Light" em DR?',
      context: 'Estratégia de DR.',
      options: [
        { label: 'A', text: 'Infraestrutura completa ativa' },
        { label: 'B', text: 'Componentes críticos mínimos sempre rodando; expandir em desastre' },
        { label: 'C', text: 'Apenas backups' },
        { label: 'D', text: 'Sem preparação' }
      ],
      correctAnswer: 'B',
      explanation: 'Pilot Light: núcleo mínimo sempre rodando (ex: banco de dados replicado). Em desastre, provisiona resto rapidamente (EC2, Auto Scaling). Custo moderado, RTO de minutos a horas.',
      relatedService: 'architecture'
    },
    {
      id: 33,
      topic: 'architecture',
      question: 'O que é "Warm Standby" como estratégia de DR?',
      context: 'Estratégia de DR.',
      options: [
        { label: 'A', text: 'Apenas backups offline' },
        { label: 'B', text: 'Ambiente completo em escala reduzida sempre rodando' },
        { label: 'C', text: 'Sem infraestrutura na região secundária' },
        { label: 'D', text: 'Mesmo que backup and restore' }
      ],
      correctAnswer: 'B',
      explanation: 'Warm Standby: versão em escala reduzida rodando continuamente. Em desastre, escala para produção completa. RTO de minutos. Custo entre Pilot Light e Active-Active.',
      relatedService: 'architecture'
    },
    {
      id: 34,
      topic: 'architecture',
      question: 'Qual serviço AWS ajuda a automatizar DR e manter réplicas atualizadas?',
      context: 'Automação de DR.',
      options: [
        { label: 'A', text: 'AWS CloudFormation' },
        { label: 'B', text: 'AWS Elastic Disaster Recovery' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'Amazon EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS Elastic Disaster Recovery (DRS): replica servidores continuamente para AWS. Recovery point em segundos, recovery time em minutos. Substitui o CloudEndure Disaster Recovery.',
      relatedService: 'architecture'
    },
    {
      id: 35,
      topic: 'architecture',
      question: 'O que é "Decoupling" em arquitetura de sistemas?',
      context: 'Padrões de arquitetura.',
      options: [
        { label: 'A', text: 'Conectar todos os componentes diretamente' },
        { label: 'B', text: 'Separar componentes para que operem independentemente' },
        { label: 'C', text: 'Usar monolitos' },
        { label: 'D', text: 'Remover todos os serviços' }
      ],
      correctAnswer: 'B',
      explanation: 'Decoupling: separar componentes. Usar filas (SQS), eventos (SNS, EventBridge), APIs. Componentes não dependem diretamente uns dos outros. Melhora resiliência e escalabilidade.',
      relatedService: 'architecture'
    },
    {
      id: 36,
      topic: 'architecture',
      question: 'Por que usar Amazon SQS entre componentes de uma arquitetura?',
      context: 'Filas de mensagens.',
      options: [
        { label: 'A', text: 'Para armazenar dados permanentemente' },
        { label: 'B', text: 'Para desacoplar componentes e absorver picos de tráfego' },
        { label: 'C', text: 'Para executar código' },
        { label: 'D', text: 'Para balancear carga HTTP' }
      ],
      correctAnswer: 'B',
      explanation: 'SQS: fila de mensagens. Desacopla producer de consumer. Absorve picos (messages ficam na fila). Se consumer falha, mensagem não é perdida. Retry automático.',
      relatedService: 'architecture'
    },
    {
      id: 37,
      topic: 'architecture',
      question: 'O que é o padrão "Strangler Fig" para modernização de aplicações?',
      context: 'Migração de sistemas.',
      options: [
        { label: 'A', text: 'Reescrever tudo de uma vez' },
        { label: 'B', text: 'Migrar gradualmente funcionalidades do legado para novo sistema' },
        { label: 'C', text: 'Manter sistema legado para sempre' },
        { label: 'D', text: 'Desligar sistema legado imediatamente' }
      ],
      correctAnswer: 'B',
      explanation: 'Strangler Fig: migração incremental. Novas features no novo sistema, redirecionar tráfego gradualmente. Legado diminui até ser desligado. Reduz risco, permite aprendizado.',
      relatedService: 'architecture'
    },
    {
      id: 38,
      topic: 'architecture',
      question: 'Qual é o conceito de "Defense in Depth"?',
      context: 'Segurança em camadas.',
      options: [
        { label: 'A', text: 'Uma única camada de segurança forte' },
        { label: 'B', text: 'Múltiplas camadas de segurança em toda a infraestrutura' },
        { label: 'C', text: 'Segurança apenas no perímetro' },
        { label: 'D', text: 'Confiar em segurança interna' }
      ],
      correctAnswer: 'B',
      explanation: 'Defense in Depth: camadas de segurança. Edge (WAF, Shield), VPC (NACLs, Security Groups), instância (OS hardening), aplicação (autenticação), dados (encryption).',
      relatedService: 'architecture'
    },
    {
      id: 39,
      topic: 'architecture',
      question: 'O que é "Auto Scaling" e por que é importante?',
      context: 'Elasticidade.',
      options: [
        { label: 'A', text: 'Escalar manualmente recursos' },
        { label: 'B', text: 'Ajustar automaticamente capacidade baseado em demanda' },
        { label: 'C', text: 'Manter capacidade fixa' },
        { label: 'D', text: 'Apenas reduzir recursos' }
      ],
      correctAnswer: 'B',
      explanation: 'Auto Scaling: ajusta número de instâncias automaticamente. Baseado em métricas (CPU, conexões, custom). Scale out para demanda, scale in para economia. Mantém disponibilidade e otimiza custos.',
      relatedService: 'architecture'
    },
    {
      id: 40,
      topic: 'architecture',
      question: 'O que é "Graceful Degradation" em arquitetura?',
      context: 'Resiliência.',
      options: [
        { label: 'A', text: 'Sistema para completamente em qualquer erro' },
        { label: 'B', text: 'Sistema continua operando com funcionalidade reduzida quando componentes falham' },
        { label: 'C', text: 'Não ter tratamento de erros' },
        { label: 'D', text: 'Sempre mostrar página de erro' }
      ],
      correctAnswer: 'B',
      explanation: 'Graceful Degradation: quando parte falha, sistema continua com funcionalidade limitada. Ex: cache falha, busca do banco. Melhor UX que falha total. Circuit breaker pattern.',
      relatedService: 'architecture'
    },
    {
      id: 41,
      topic: 'architecture',
      question: 'O que é "Circuit Breaker" pattern?',
      context: 'Padrões de resiliência.',
      options: [
        { label: 'A', text: 'Padrão de criptografia' },
        { label: 'B', text: 'Padrão que impede cascata de falhas parando chamadas a serviços com problema' },
        { label: 'C', text: 'Padrão de autenticação' },
        { label: 'D', text: 'Padrão de logging' }
      ],
      correctAnswer: 'B',
      explanation: 'Circuit Breaker: monitora chamadas. Se muitas falham, "abre" o circuito e retorna fallback imediatamente. Evita sobrecarga em serviço já com problemas. Após tempo, testa novamente.',
      relatedService: 'architecture'
    },
    {
      id: 42,
      topic: 'architecture',
      question: 'Qual é o benefício de usar regiões múltiplas na AWS?',
      context: 'Multi-Region.',
      options: [
        { label: 'A', text: 'Apenas reduzir custos' },
        { label: 'B', text: 'Maior resiliência, menor latência global, conformidade com regulações locais' },
        { label: 'C', text: 'Aumentar complexidade' },
        { label: 'D', text: 'Nenhum benefício' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-Region: DR contra desastres regionais, latência baixa para usuários globais, conformidade com leis de residência de dados. Route 53 para failover entre regiões.',
      relatedService: 'architecture'
    },
    {
      id: 43,
      topic: 'architecture',
      question: 'O que é "Eventual Consistency"?',
      context: 'Modelos de consistência.',
      options: [
        { label: 'A', text: 'Dados sempre consistentes imediatamente' },
        { label: 'B', text: 'Dados podem estar temporariamente inconsistentes mas eventualmente convergem' },
        { label: 'C', text: 'Dados nunca consistentes' },
        { label: 'D', text: 'Sem replicação de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Eventual Consistency: em sistemas distribuídos, réplicas podem divergir temporariamente. Após tempo suficiente sem updates, todas convergem. Trade-off: disponibilidade vs consistência (CAP).',
      relatedService: 'architecture'
    },
    {
      id: 44,
      topic: 'architecture',
      question: 'O que é o teorema CAP?',
      context: 'Sistemas distribuídos.',
      options: [
        { label: 'A', text: 'Teoria de custos' },
        { label: 'B', text: 'Sistema distribuído pode ter apenas 2 de 3: Consistency, Availability, Partition Tolerance' },
        { label: 'C', text: 'Padrão de segurança' },
        { label: 'D', text: 'Método de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'CAP Theorem: Consistency (todos veem mesmos dados), Availability (sistema sempre responde), Partition Tolerance (funciona com falhas de rede). Na prática, escolhe-se AP ou CP.',
      relatedService: 'architecture'
    },
    {
      id: 45,
      topic: 'architecture',
      question: 'O que é "Blue-Green Deployment"?',
      context: 'Estratégias de deploy.',
      options: [
        { label: 'A', text: 'Deploy diretamente em produção' },
        { label: 'B', text: 'Dois ambientes idênticos; alterna tráfego entre eles para deploy sem downtime' },
        { label: 'C', text: 'Deploy apenas em desenvolvimento' },
        { label: 'D', text: 'Nunca fazer deploy' }
      ],
      correctAnswer: 'B',
      explanation: 'Blue-Green: dois ambientes idênticos. Deploy nova versão no ambiente inativo (green). Testa. Redireciona tráfego. Rollback instantâneo voltando para blue. Zero downtime.',
      relatedService: 'architecture'
    },
    {
      id: 46,
      topic: 'architecture',
      question: 'O que é "Canary Deployment"?',
      context: 'Estratégias de deploy.',
      options: [
        { label: 'A', text: 'Deploy para 100% dos usuários imediatamente' },
        { label: 'B', text: 'Liberar nova versão gradualmente para uma porcentagem pequena de usuários' },
        { label: 'C', text: 'Nunca deploy em produção' },
        { label: 'D', text: 'Deploy apenas em staging' }
      ],
      correctAnswer: 'B',
      explanation: 'Canary: deploy nova versão para pequena porcentagem (5%, 10%). Monitora métricas. Se OK, aumenta gradualmente até 100%. Problemas afetam poucos usuários. CodeDeploy suporta.',
      relatedService: 'architecture'
    },
    {
      id: 47,
      topic: 'architecture',
      question: 'O que é "Immutable Infrastructure"?',
      context: 'Gerenciamento de infraestrutura.',
      options: [
        { label: 'A', text: 'Modificar servidores em produção' },
        { label: 'B', text: 'Nunca modificar servidores; substituir por novos com nova configuração' },
        { label: 'C', text: 'Infraestrutura que não pode ser criada' },
        { label: 'D', text: 'Servidores que nunca são atualizados' }
      ],
      correctAnswer: 'B',
      explanation: 'Immutable Infrastructure: servidores não são modificados após deploy. Nova versão = nova AMI = novas instâncias. Evita configuration drift. Mais previsível e seguro.',
      relatedService: 'architecture'
    },
    {
      id: 48,
      topic: 'architecture',
      question: 'O que é o AWS Well-Architected Tool?',
      context: 'Ferramentas AWS.',
      options: [
        { label: 'A', text: 'Ferramenta de billing' },
        { label: 'B', text: 'Ferramenta que ajuda a revisar workloads contra best practices do Well-Architected' },
        { label: 'C', text: 'Ferramenta de deployment' },
        { label: 'D', text: 'Ferramenta de monitoramento' }
      ],
      correctAnswer: 'B',
      explanation: 'Well-Architected Tool: serviço gratuito no console. Responda perguntas sobre seu workload. Receba recomendações baseadas nos 6 pilares. Identifique riscos e melhorias.',
      relatedService: 'architecture'
    },
    {
      id: 49,
      topic: 'architecture',
      question: 'O que é "Read Replica" e quando usar?',
      context: 'Escalabilidade de banco de dados.',
      options: [
        { label: 'A', text: 'Backup do banco' },
        { label: 'B', text: 'Cópia do banco para distribuir carga de leitura' },
        { label: 'C', text: 'Cópia para escrita' },
        { label: 'D', text: 'Versão reduzida do banco' }
      ],
      correctAnswer: 'B',
      explanation: 'Read Replica: cópia assíncrona do banco para leituras. Distribui carga de SELECT. Escrita apenas no master. Até 5 replicas (RDS), 15 (Aurora). Cross-region disponível.',
      relatedService: 'architecture'
    },
    {
      id: 50,
      topic: 'architecture',
      question: 'O que é "Sharding" em banco de dados?',
      context: 'Escalabilidade de dados.',
      options: [
        { label: 'A', text: 'Replicar todos os dados em múltiplos servidores' },
        { label: 'B', text: 'Dividir dados horizontalmente entre múltiplos bancos baseado em uma chave' },
        { label: 'C', text: 'Backup de banco de dados' },
        { label: 'D', text: 'Compressão de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Sharding: particionar dados horizontalmente. Cada shard contém subconjunto dos dados. Escala writes. Complexidade: queries cross-shard, rebalanceamento. DynamoDB faz automaticamente.',
      relatedService: 'architecture'
    },
    {
      id: 51,
      topic: 'architecture',
      question: 'O que é "Content Delivery Network" (CDN)?',
      context: 'Distribuição de conteúdo.',
      options: [
        { label: 'A', text: 'Rede de banco de dados' },
        { label: 'B', text: 'Rede de servidores distribuídos que cacheia conteúdo próximo aos usuários' },
        { label: 'C', text: 'Rede privada virtual' },
        { label: 'D', text: 'Rede de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'CDN: servidores edge distribuídos globalmente. Cacheia conteúdo estático (e dinâmico). Reduz latência, offload da origem. CloudFront: CDN da AWS com 400+ edge locations.',
      relatedService: 'architecture'
    },
    {
      id: 52,
      topic: 'architecture',
      question: 'O que é "Edge Computing"?',
      context: 'Computação distribuída.',
      options: [
        { label: 'A', text: 'Computação apenas em data centers centrais' },
        { label: 'B', text: 'Processar dados próximo à fonte, na borda da rede' },
        { label: 'C', text: 'Computação sem internet' },
        { label: 'D', text: 'Computação em mainframes' }
      ],
      correctAnswer: 'B',
      explanation: 'Edge Computing: processar na borda, próximo aos usuários/dispositivos. Baixa latência, funciona offline. AWS: Lambda@Edge, CloudFront Functions, Outposts, Wavelength.',
      relatedService: 'architecture'
    },
    {
      id: 53,
      topic: 'architecture',
      question: 'O que é "API Gateway" e seu papel na arquitetura?',
      context: 'Gerenciamento de APIs.',
      options: [
        { label: 'A', text: 'Banco de dados de APIs' },
        { label: 'B', text: 'Ponto de entrada único que gerencia, roteia e protege APIs' },
        { label: 'C', text: 'Ferramenta de desenvolvimento' },
        { label: 'D', text: 'Sistema de arquivos' }
      ],
      correctAnswer: 'B',
      explanation: 'API Gateway: front door para APIs. Autenticação, throttling, caching, transformação, monitoramento. AWS API Gateway: REST, HTTP, WebSocket APIs. Integra com Lambda, ECS, EC2.',
      relatedService: 'architecture'
    },
    {
      id: 54,
      topic: 'architecture',
      question: 'O que é "Service Mesh"?',
      context: 'Arquitetura de microservices.',
      options: [
        { label: 'A', text: 'Rede física de servidores' },
        { label: 'B', text: 'Camada de infraestrutura que gerencia comunicação entre microservices' },
        { label: 'C', text: 'Tipo de banco de dados' },
        { label: 'D', text: 'Ferramenta de CI/CD' }
      ],
      correctAnswer: 'B',
      explanation: 'Service Mesh: infraestrutura de comunicação entre serviços. Gerencia observability, traffic management, security. AWS App Mesh: service mesh para ECS, EKS, EC2.',
      relatedService: 'architecture'
    },
    {
      id: 55,
      topic: 'architecture',
      question: 'O que é "Twelve-Factor App"?',
      context: 'Metodologia de desenvolvimento.',
      options: [
        { label: 'A', text: 'Framework de frontend' },
        { label: 'B', text: 'Metodologia de 12 princípios para construir apps cloud-native' },
        { label: 'C', text: 'Banco de dados com 12 tabelas' },
        { label: 'D', text: 'Padrão de segurança com 12 regras' }
      ],
      correctAnswer: 'B',
      explanation: '12-Factor App: metodologia para apps cloud-native. Codebase em git, dependências explícitas, config em env vars, backing services como recursos, build/release/run separados, processos stateless, etc.',
      relatedService: 'architecture'
    },
    {
      id: 56,
      topic: 'architecture',
      question: 'Por que usar "environment variables" para configuração?',
      context: 'Configuração de aplicações.',
      options: [
        { label: 'A', text: 'Para hardcodar valores' },
        { label: 'B', text: 'Para separar configuração do código, permitindo diferentes valores por ambiente' },
        { label: 'C', text: 'Para aumentar segurança de credenciais no código' },
        { label: 'D', text: 'Para tornar o código mais difícil de ler' }
      ],
      correctAnswer: 'B',
      explanation: 'Env vars: separa config do código. Mesmo código em dev, staging, prod. Não commitar segredos. Use AWS Secrets Manager ou Parameter Store para segredos.',
      relatedService: 'architecture'
    },
    {
      id: 57,
      topic: 'architecture',
      question: 'O que é "Observability" em sistemas?',
      context: 'Monitoramento e debugging.',
      options: [
        { label: 'A', text: 'Apenas monitorar uptime' },
        { label: 'B', text: 'Capacidade de entender estado interno do sistema através de outputs (logs, métricas, traces)' },
        { label: 'C', text: 'Fazer backup de logs' },
        { label: 'D', text: 'Auditar acessos' }
      ],
      correctAnswer: 'B',
      explanation: 'Observability: três pilares - Logs (eventos), Metrics (agregações numéricas), Traces (jornada de requests). CloudWatch Logs, Metrics, X-Ray traces. Entender e debugar sistemas distribuídos.',
      relatedService: 'architecture'
    },
    {
      id: 58,
      topic: 'architecture',
      question: 'Qual serviço AWS fornece distributed tracing?',
      context: 'Observabilidade.',
      options: [
        { label: 'A', text: 'CloudWatch Logs' },
        { label: 'B', text: 'AWS X-Ray' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'AWS Config' }
      ],
      correctAnswer: 'B',
      explanation: 'X-Ray: distributed tracing. Acompanha requests através de microservices. Identifica gargalos, erros, latência. Service map visual. Integra com Lambda, ECS, EC2, API Gateway.',
      relatedService: 'architecture'
    },
    {
      id: 59,
      topic: 'architecture',
      question: 'O que é "Throttling" em APIs?',
      context: 'Proteção de APIs.',
      options: [
        { label: 'A', text: 'Acelerar requests' },
        { label: 'B', text: 'Limitar taxa de requests para proteger backend de sobrecarga' },
        { label: 'C', text: 'Cachear responses' },
        { label: 'D', text: 'Criptografar dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Throttling: rate limiting. Limita requests por segundo/minuto. Protege backend, garante fair usage. API Gateway: 10K rps por região padrão. Retorna 429 Too Many Requests.',
      relatedService: 'architecture'
    },
    {
      id: 60,
      topic: 'architecture',
      question: 'O que é "Idempotency" em operações?',
      context: 'Design de APIs.',
      options: [
        { label: 'A', text: 'Operação que sempre muda resultado' },
        { label: 'B', text: 'Operação que produz mesmo resultado mesmo se executada múltiplas vezes' },
        { label: 'C', text: 'Operação que falha sempre' },
        { label: 'D', text: 'Operação sem retorno' }
      ],
      correctAnswer: 'B',
      explanation: 'Idempotency: executar N vezes = mesmo resultado que executar 1 vez. GET, PUT, DELETE são idempotentes. POST não é. Importante para retries seguros. Use idempotency keys.',
      relatedService: 'architecture'
    },
    {
      id: 61,
      topic: 'architecture',
      question: 'O que é "Event Sourcing" pattern?',
      context: 'Padrões de arquitetura.',
      options: [
        { label: 'A', text: 'Armazenar apenas estado atual' },
        { label: 'B', text: 'Armazenar todos os eventos que mudaram estado, reconstruir estado a partir deles' },
        { label: 'C', text: 'Não armazenar dados' },
        { label: 'D', text: 'Fazer polling de eventos' }
      ],
      correctAnswer: 'B',
      explanation: 'Event Sourcing: persiste eventos, não estado. Histórico completo, auditoria, replay. Reconstruir estado aplicando eventos. Combina com CQRS. Complexo mas poderoso para certos domínios.',
      relatedService: 'architecture'
    },
    {
      id: 62,
      topic: 'architecture',
      question: 'O que é "CQRS" (Command Query Responsibility Segregation)?',
      context: 'Padrões de arquitetura.',
      options: [
        { label: 'A', text: 'Mesmo modelo para leitura e escrita' },
        { label: 'B', text: 'Separar modelos de leitura (query) e escrita (command)' },
        { label: 'C', text: 'Padrão de segurança' },
        { label: 'D', text: 'Tipo de banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'CQRS: modelos separados para comandos (escritas) e queries (leituras). Otimiza cada lado independentemente. Escala leitura com read replicas. Complexidade adicional, use quando necessário.',
      relatedService: 'architecture'
    },
    {
      id: 63,
      topic: 'architecture',
      question: 'O que é "Saga Pattern" em microservices?',
      context: 'Transações distribuídas.',
      options: [
        { label: 'A', text: 'Padrão de logging' },
        { label: 'B', text: 'Gerenciar transações distribuídas através de sequência de transações locais com compensação' },
        { label: 'C', text: 'Padrão de autenticação' },
        { label: 'D', text: 'Padrão de cache' }
      ],
      correctAnswer: 'B',
      explanation: 'Saga Pattern: alternativa a distributed transactions. Cada serviço executa transação local e publica evento. Se falhar, executa compensating transactions. Choreography ou Orchestration.',
      relatedService: 'architecture'
    },
    {
      id: 64,
      topic: 'architecture',
      question: 'Qual serviço AWS ajuda a implementar Saga Pattern?',
      context: 'Orquestração de workflows.',
      options: [
        { label: 'A', text: 'Amazon S3' },
        { label: 'B', text: 'AWS Step Functions' },
        { label: 'C', text: 'Amazon EC2' },
        { label: 'D', text: 'Amazon RDS' }
      ],
      correctAnswer: 'B',
      explanation: 'Step Functions: orquestra workflows com estado. Ideal para Saga Orchestration. Define passos, condições, retries, compensações. Integra com Lambda, ECS, outros serviços.',
      relatedService: 'architecture'
    },
    {
      id: 65,
      topic: 'architecture',
      question: 'O que é "Sidecar Pattern"?',
      context: 'Padrões de microservices.',
      options: [
        { label: 'A', text: 'Colocar toda lógica em um serviço' },
        { label: 'B', text: 'Anexar componente auxiliar ao serviço principal para funcionalidades cross-cutting' },
        { label: 'C', text: 'Remover funcionalidades' },
        { label: 'D', text: 'Padrão de banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Sidecar: container/processo auxiliar junto ao principal. Gerencia logging, monitoring, proxying, config. Separa concerns, reutilizável. Base do service mesh (Envoy sidecar).',
      relatedService: 'architecture'
    },
    {
      id: 66,
      topic: 'architecture',
      question: 'O que é "Backend for Frontend" (BFF) pattern?',
      context: 'Padrões de API.',
      options: [
        { label: 'A', text: 'Um único backend para todos os clientes' },
        { label: 'B', text: 'Backend específico para cada tipo de cliente (mobile, web, IoT)' },
        { label: 'C', text: 'Frontend que acessa banco diretamente' },
        { label: 'D', text: 'Backend sem APIs' }
      ],
      correctAnswer: 'B',
      explanation: 'BFF: backend especializado por cliente. Mobile precisa de dados diferentes que web. Evita API "one-size-fits-all". Cada BFF otimiza para seu cliente.',
      relatedService: 'architecture'
    },
    {
      id: 67,
      topic: 'architecture',
      question: 'O que é "Data Lake" architecture?',
      context: 'Arquitetura de dados.',
      options: [
        { label: 'A', text: 'Banco de dados relacional tradicional' },
        { label: 'B', text: 'Repositório centralizado para armazenar dados estruturados e não estruturados em escala' },
        { label: 'C', text: 'Cache de dados' },
        { label: 'D', text: 'Backup de banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Data Lake: armazena dados raw em qualquer formato (estruturado, semi, não estruturado). S3 como storage. Schema-on-read. Athena, EMR, Redshift Spectrum para análise.',
      relatedService: 'architecture'
    },
    {
      id: 68,
      topic: 'architecture',
      question: 'Qual é a diferença entre Data Lake e Data Warehouse?',
      context: 'Arquitetura de dados.',
      options: [
        { label: 'A', text: 'São a mesma coisa' },
        { label: 'B', text: 'Data Lake armazena dados raw; Data Warehouse armazena dados processados e estruturados' },
        { label: 'C', text: 'Data Lake é mais caro' },
        { label: 'D', text: 'Data Warehouse não tem schema' }
      ],
      correctAnswer: 'B',
      explanation: 'Data Lake: raw data, schema-on-read, qualquer formato, S3. Data Warehouse: dados processados, schema-on-write, estruturado, otimizado para queries (Redshift). Complementares.',
      relatedService: 'architecture'
    },
    {
      id: 69,
      topic: 'architecture',
      question: 'O que é "Shared Nothing" architecture?',
      context: 'Arquitetura distribuída.',
      options: [
        { label: 'A', text: 'Todos os nós compartilham memória e disco' },
        { label: 'B', text: 'Cada nó tem recursos próprios independentes; não compartilha memória ou disco' },
        { label: 'C', text: 'Apenas compartilha CPU' },
        { label: 'D', text: 'Arquitetura monolítica' }
      ],
      correctAnswer: 'B',
      explanation: 'Shared Nothing: nós independentes, sem compartilhamento de recursos. Escala linearmente, sem contenção. Bancos como Redshift, Aurora usam. Oposto de shared disk/memory.',
      relatedService: 'architecture'
    },
    {
      id: 70,
      topic: 'architecture',
      question: 'O que é "Domain-Driven Design" (DDD)?',
      context: 'Design de software.',
      options: [
        { label: 'A', text: 'Design focado em interface' },
        { label: 'B', text: 'Abordagem de desenvolvimento focada no domínio de negócio e sua lógica' },
        { label: 'C', text: 'Design focado em banco de dados' },
        { label: 'D', text: 'Design focado em performance' }
      ],
      correctAnswer: 'B',
      explanation: 'DDD: modelar software baseado no domínio de negócio. Bounded contexts, aggregates, entities, value objects. Alinha código com negócio. Útil para domínios complexos.',
      relatedService: 'architecture'
    },
    {
      id: 71,
      topic: 'architecture',
      question: 'O que é "Bounded Context" em DDD?',
      context: 'Domain-Driven Design.',
      options: [
        { label: 'A', text: 'Limite físico do servidor' },
        { label: 'B', text: 'Limite onde um modelo de domínio específico se aplica' },
        { label: 'C', text: 'Limite de rede' },
        { label: 'D', text: 'Limite de banco de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Bounded Context: fronteira onde termos e regras têm significado específico. "Cliente" pode significar coisas diferentes em vendas vs suporte. Cada contexto tem seu modelo.',
      relatedService: 'architecture'
    },
    {
      id: 72,
      topic: 'architecture',
      question: 'O que é "Feature Flags" (Feature Toggles)?',
      context: 'Release engineering.',
      options: [
        { label: 'A', text: 'Flags de erro' },
        { label: 'B', text: 'Configurações que permitem ligar/desligar features em runtime sem deploy' },
        { label: 'C', text: 'Flags de compilação' },
        { label: 'D', text: 'Flags de debug' }
      ],
      correctAnswer: 'B',
      explanation: 'Feature Flags: ligar/desligar features dinamicamente. Canary releases, A/B testing, kill switch para problemas. Desacopla deploy de release. AWS AppConfig suporta.',
      relatedService: 'architecture'
    },
    {
      id: 73,
      topic: 'architecture',
      question: 'O que é "Chaos Engineering"?',
      context: 'Resiliência de sistemas.',
      options: [
        { label: 'A', text: 'Criar sistemas caóticos' },
        { label: 'B', text: 'Introduzir falhas deliberadamente para testar resiliência do sistema' },
        { label: 'C', text: 'Não ter processo de deploy' },
        { label: 'D', text: 'Ignorar erros' }
      ],
      correctAnswer: 'B',
      explanation: 'Chaos Engineering: experimentos controlados que introduzem falhas. Valida que sistema resiste. Netflix Chaos Monkey. AWS Fault Injection Simulator (FIS) para testes.',
      relatedService: 'architecture'
    },
    {
      id: 74,
      topic: 'architecture',
      question: 'Qual serviço AWS é usado para Chaos Engineering?',
      context: 'Testes de resiliência.',
      options: [
        { label: 'A', text: 'AWS CloudFormation' },
        { label: 'B', text: 'AWS Fault Injection Simulator (FIS)' },
        { label: 'C', text: 'Amazon S3' },
        { label: 'D', text: 'Amazon EC2' }
      ],
      correctAnswer: 'B',
      explanation: 'AWS FIS: serviço gerenciado de Chaos Engineering. Injeta falhas como CPU stress, network latency, instance termination. Testa resiliência de workloads AWS de forma controlada.',
      relatedService: 'architecture'
    },
    {
      id: 75,
      topic: 'architecture',
      question: 'O que é "GitOps"?',
      context: 'DevOps practices.',
      options: [
        { label: 'A', text: 'Apenas usar Git' },
        { label: 'B', text: 'Usar Git como fonte de verdade para infraestrutura e aplicações declarativas' },
        { label: 'C', text: 'Git sem operações' },
        { label: 'D', text: 'Operações sem Git' }
      ],
      correctAnswer: 'B',
      explanation: 'GitOps: Git como single source of truth. Infraestrutura e apps declarados em repo. Mudanças via PR. Agent reconcilia cluster com estado no Git. ArgoCD, Flux.',
      relatedService: 'architecture'
    },
    {
      id: 76,
      topic: 'architecture',
      question: 'O que é "Zero Trust" security model?',
      context: 'Segurança.',
      options: [
        { label: 'A', text: 'Confiar em tudo dentro da rede' },
        { label: 'B', text: 'Nunca confiar, sempre verificar; tratar toda rede como não confiável' },
        { label: 'C', text: 'Sem segurança' },
        { label: 'D', text: 'Confiar apenas no perímetro' }
      ],
      correctAnswer: 'B',
      explanation: 'Zero Trust: "never trust, always verify". Não há rede confiável. Autenticar e autorizar cada request. Identity-based access. Microsegmentação. Assume breach.',
      relatedService: 'architecture'
    },
    {
      id: 77,
      topic: 'architecture',
      question: 'O que é "Encryption at Rest"?',
      context: 'Segurança de dados.',
      options: [
        { label: 'A', text: 'Criptografia apenas em trânsito' },
        { label: 'B', text: 'Criptografia de dados armazenados em disco ou storage' },
        { label: 'C', text: 'Sem criptografia' },
        { label: 'D', text: 'Criptografia apenas de logs' }
      ],
      correctAnswer: 'B',
      explanation: 'Encryption at Rest: dados criptografados quando armazenados. S3, EBS, RDS, DynamoDB suportam. Use KMS para gerenciar chaves. Protege contra acesso físico não autorizado.',
      relatedService: 'architecture'
    },
    {
      id: 78,
      topic: 'architecture',
      question: 'O que é "Encryption in Transit"?',
      context: 'Segurança de dados.',
      options: [
        { label: 'A', text: 'Criptografia apenas em repouso' },
        { label: 'B', text: 'Criptografia de dados enquanto são transmitidos pela rede' },
        { label: 'C', text: 'Sem criptografia' },
        { label: 'D', text: 'Compressão de dados' }
      ],
      correctAnswer: 'B',
      explanation: 'Encryption in Transit: protege dados em movimento. TLS/SSL para HTTPS, VPN para conexões privadas. Previne man-in-the-middle. ALB, CloudFront, API Gateway suportam TLS.',
      relatedService: 'architecture'
    },
    {
      id: 79,
      topic: 'architecture',
      question: 'O que é AWS KMS (Key Management Service)?',
      context: 'Gerenciamento de chaves.',
      options: [
        { label: 'A', text: 'Serviço de monitoramento' },
        { label: 'B', text: 'Serviço gerenciado para criar e controlar chaves de criptografia' },
        { label: 'C', text: 'Serviço de DNS' },
        { label: 'D', text: 'Serviço de balanceamento' }
      ],
      correctAnswer: 'B',
      explanation: 'KMS: cria e gerencia chaves de criptografia. CMKs (Customer Master Keys). Integra com S3, EBS, RDS, etc. Key rotation automático. FIPS 140-2 validated HSMs.',
      relatedService: 'architecture'
    },
    {
      id: 80,
      topic: 'architecture',
      question: 'O que é "Secrets Management"?',
      context: 'Segurança de credenciais.',
      options: [
        { label: 'A', text: 'Armazenar senhas em código' },
        { label: 'B', text: 'Gerenciar segredos (senhas, API keys) de forma segura e centralizada' },
        { label: 'C', text: 'Compartilhar senhas por email' },
        { label: 'D', text: 'Usar mesma senha para tudo' }
      ],
      correctAnswer: 'B',
      explanation: 'Secrets Management: armazenar, rotacionar, acessar segredos de forma segura. AWS Secrets Manager: armazena, rotaciona automaticamente. Parameter Store (SSM) para configs simples.',
      relatedService: 'architecture'
    },
    {
      id: 81,
      topic: 'architecture',
      question: 'O que é "Well-Architected Review"?',
      context: 'Melhores práticas.',
      options: [
        { label: 'A', text: 'Review de código' },
        { label: 'B', text: 'Avaliação de workload contra os pilares do Well-Architected Framework' },
        { label: 'C', text: 'Auditoria financeira' },
        { label: 'D', text: 'Review de performance apenas' }
      ],
      correctAnswer: 'B',
      explanation: 'Well-Architected Review: avalia workload contra 6 pilares. Identifica high-risk issues (HRIs). Prioriza melhorias. Pode ser feito com Well-Architected Tool ou com AWS Partner.',
      relatedService: 'architecture'
    },
    {
      id: 82,
      topic: 'architecture',
      question: 'O que é "Shared Responsibility Model"?',
      context: 'Segurança na cloud.',
      options: [
        { label: 'A', text: 'AWS é responsável por tudo' },
        { label: 'B', text: 'AWS cuida da segurança DA cloud; cliente cuida da segurança NA cloud' },
        { label: 'C', text: 'Cliente é responsável por tudo' },
        { label: 'D', text: 'Ninguém é responsável' }
      ],
      correctAnswer: 'B',
      explanation: 'Shared Responsibility: AWS protege infraestrutura (hardware, rede, facilities). Cliente protege dados, identidades, configurações, patching de OS (EC2). Varia por serviço.',
      relatedService: 'architecture'
    },
    {
      id: 83,
      topic: 'architecture',
      question: 'O que é "Landing Zone" na AWS?',
      context: 'Configuração de ambiente.',
      options: [
        { label: 'A', text: 'Zona de disponibilidade' },
        { label: 'B', text: 'Ambiente AWS pré-configurado com melhores práticas de multi-account' },
        { label: 'C', text: 'Zona de pouso para EC2' },
        { label: 'D', text: 'Data center específico' }
      ],
      correctAnswer: 'B',
      explanation: 'Landing Zone: ambiente inicial com multi-account structure, SSO, logging centralizado, guardrails. AWS Control Tower automatiza criação. Base para escalar de forma governada.',
      relatedService: 'architecture'
    },
    {
      id: 84,
      topic: 'architecture',
      question: 'Por que usar múltiplas contas AWS?',
      context: 'Multi-account strategy.',
      options: [
        { label: 'A', text: 'Apenas para complicar' },
        { label: 'B', text: 'Isolamento de workloads, limites de serviço separados, controle de custos granular' },
        { label: 'C', text: 'Não há benefício' },
        { label: 'D', text: 'Apenas para billing separado' }
      ],
      correctAnswer: 'B',
      explanation: 'Multi-account: isolamento de segurança (blast radius), limites de serviço por conta, billing granular, ambientes separados (dev/staging/prod). AWS Organizations gerencia.',
      relatedService: 'architecture'
    },
    {
      id: 85,
      topic: 'architecture',
      question: 'O que é AWS Control Tower?',
      context: 'Governança de multi-account.',
      options: [
        { label: 'A', text: 'Ferramenta de monitoramento' },
        { label: 'B', text: 'Serviço que configura e governa ambiente multi-account seguro' },
        { label: 'C', text: 'Ferramenta de deployment' },
        { label: 'D', text: 'Serviço de DNS' }
      ],
      correctAnswer: 'B',
      explanation: 'Control Tower: set up e govern multi-account. Landing Zone automatizada. Guardrails (preventivos/detectivos). Account Factory para criar contas padronizadas. Integra com Organizations.',
      relatedService: 'architecture'
    },
    {
      id: 86,
      topic: 'architecture',
      question: 'O que são "Guardrails" no contexto de governança AWS?',
      context: 'Governança e compliance.',
      options: [
        { label: 'A', text: 'Barreiras físicas' },
        { label: 'B', text: 'Políticas que previnem ou detectam desvios de configuração' },
        { label: 'C', text: 'Firewalls' },
        { label: 'D', text: 'Load balancers' }
      ],
      correctAnswer: 'B',
      explanation: 'Guardrails: regras de governança. Preventivos: SCPs bloqueiam ações não permitidas. Detectivos: AWS Config rules identificam recursos não conformes. Mantém compliance.',
      relatedService: 'architecture'
    },
    {
      id: 87,
      topic: 'architecture',
      question: 'O que é "Service Control Policy" (SCP)?',
      context: 'Governança em Organizations.',
      options: [
        { label: 'A', text: 'Política de IAM para usuários' },
        { label: 'B', text: 'Política que define máximo de permissões para contas em Organizations' },
        { label: 'C', text: 'Política de rede' },
        { label: 'D', text: 'Política de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'SCP: maximum permissions for accounts. Não concede acesso, limita. Aplica a OUs ou contas. Ex: bloquear criação de recursos fora de regiões permitidas. Guardrails preventivos.',
      relatedService: 'architecture'
    },
    {
      id: 88,
      topic: 'architecture',
      question: 'O que é "Compliance as Code"?',
      context: 'Automação de compliance.',
      options: [
        { label: 'A', text: 'Compliance manual' },
        { label: 'B', text: 'Definir e verificar requisitos de compliance através de código automatizado' },
        { label: 'C', text: 'Não ter compliance' },
        { label: 'D', text: 'Documentação de compliance' }
      ],
      correctAnswer: 'B',
      explanation: 'Compliance as Code: definir regras em código, verificar automaticamente. AWS Config rules, CloudFormation Guard, OPA. Detecta e remedia desvios. Auditável, repetível, versionado.',
      relatedService: 'architecture'
    },
    {
      id: 89,
      topic: 'architecture',
      question: 'O que é "Tagging Strategy" e por que é importante?',
      context: 'Organização de recursos.',
      options: [
        { label: 'A', text: 'Estratégia de marketing' },
        { label: 'B', text: 'Padrão para rotular recursos AWS para organização, billing e automação' },
        { label: 'C', text: 'Estratégia de naming' },
        { label: 'D', text: 'Estratégia de backup' }
      ],
      correctAnswer: 'B',
      explanation: 'Tagging: key-value pairs em recursos. Organiza recursos, aloca custos (Cost Allocation Tags), automação (filtrar por tag), controle de acesso (ABAC). Defina padrões obrigatórios.',
      relatedService: 'architecture'
    },
    {
      id: 90,
      topic: 'architecture',
      question: 'Qual é a relação entre Architecture Decision Records (ADRs) e Well-Architected?',
      context: 'Documentação de arquitetura.',
      options: [
        { label: 'A', text: 'Não há relação' },
        { label: 'B', text: 'ADRs documentam decisões arquiteturais; Well-Architected valida se seguem best practices' },
        { label: 'C', text: 'São a mesma coisa' },
        { label: 'D', text: 'ADRs substituem Well-Architected' }
      ],
      correctAnswer: 'B',
      explanation: 'ADRs: documentam decisões de arquitetura, contexto, alternativas, consequências. Well-Architected: framework de best practices para validar decisões. ADRs registram o porquê; WAF guia o como.',
      relatedService: 'architecture'
    }
  ]
};