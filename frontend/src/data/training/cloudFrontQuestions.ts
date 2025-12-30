/**
 * Banco de Questões - CloudFront (CDN)
 * Total: 100 questões planejadas
 * Bloco 1: Questões 1-20
 */

export interface CloudFrontQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const cloudFrontQuestions: CloudFrontQuestion[] = [
  // Bloco 1: Questões 1-20
  {
    id: 1,
    question: "Uma empresa está lançando um site global e precisa reduzir a latência para usuários em diferentes continentes. Qual serviço AWS deve ser usado?",
    options: [
      "Amazon S3 com replicação cross-region",
      "Amazon CloudFront com distribuições globais",
      "Elastic Load Balancer em múltiplas regiões",
      "Amazon Route 53 com roteamento geográfico"
    ],
    correctAnswer: 1,
    explanation: "CloudFront é a CDN da AWS que armazena conteúdo em cache em edge locations ao redor do mundo, reduzindo drasticamente a latência para usuários globais. Embora Route 53 e S3 CRR ajudem, CloudFront é especificamente projetado para entrega rápida de conteúdo global.",
    difficulty: 'easy',
    topic: 'Conceitos Básicos'
  },
  {
    id: 2,
    question: "Qual é o principal benefício de usar CloudFront na frente de um bucket S3?",
    options: [
      "Reduz custos de armazenamento no S3",
      "Aumenta a capacidade de armazenamento",
      "Reduz latência e custos de transferência de dados",
      "Melhora a durabilidade dos objetos"
    ],
    correctAnswer: 2,
    explanation: "CloudFront reduz a latência servindo conteúdo de edge locations próximas aos usuários. Também reduz custos porque as requisições são servidas do cache do CloudFront ao invés de buscar repetidamente do S3, diminuindo os custos de transferência de dados do S3.",
    difficulty: 'easy',
    topic: 'Integração S3'
  },
  {
    id: 3,
    question: "Uma aplicação web está usando CloudFront. Os usuários relatam que estão vendo conteúdo desatualizado. O que deve ser feito?",
    options: [
      "Recriar a distribuição CloudFront",
      "Criar uma invalidação de cache no CloudFront",
      "Aumentar o TTL do cache",
      "Reiniciar os servidores de origem"
    ],
    correctAnswer: 1,
    explanation: "Invalidação de cache no CloudFront remove objetos específicos do cache em todas as edge locations, forçando o CloudFront a buscar a versão mais recente da origem. Isso é mais rápido e eficiente que recriar a distribuição.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 4,
    question: "Quantas edge locations o CloudFront possui aproximadamente?",
    options: [
      "50+ edge locations",
      "100+ edge locations",
      "200+ edge locations",
      "400+ edge locations"
    ],
    correctAnswer: 3,
    explanation: "O Amazon CloudFront possui mais de 400 edge locations (pontos de presença) distribuídas em mais de 90 cidades em 48 países, garantindo baixa latência global para entrega de conteúdo.",
    difficulty: 'easy',
    topic: 'Infraestrutura'
  },
  {
    id: 5,
    question: "Uma empresa quer restringir o acesso a conteúdo do CloudFront apenas para usuários autenticados. Qual solução deve ser usada?",
    options: [
      "Security Groups no CloudFront",
      "CloudFront Signed URLs ou Signed Cookies",
      "AWS WAF com regras de IP",
      "VPC Endpoints"
    ],
    correctAnswer: 1,
    explanation: "Signed URLs e Signed Cookies do CloudFront permitem controlar quem pode acessar o conteúdo. Você pode definir políticas com tempo de expiração, intervalo de IP permitido e data/hora de início. Security Groups não são aplicáveis ao CloudFront.",
    difficulty: 'medium',
    topic: 'Segurança'
  },
  {
    id: 6,
    question: "Qual é a diferença entre CloudFront TTL (Time To Live) mínimo, padrão e máximo?",
    options: [
      "Controlam quanto tempo os objetos ficam em cache nas edge locations",
      "Definem a velocidade de transferência",
      "Determinam o número de edge locations usadas",
      "Configuram o tempo de conexão com a origem"
    ],
    correctAnswer: 0,
    explanation: "TTL (Time To Live) define por quanto tempo o CloudFront armazena objetos em cache antes de verificar a origem para atualizações. TTL mínimo (0s), padrão (86400s/24h) e máximo (31536000s/1 ano) controlam o comportamento do cache.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 7,
    question: "Uma aplicação precisa entregar vídeos com alta performance globalmente. Qual configuração de CloudFront é mais apropriada?",
    options: [
      "Use apenas edge locations dos EUA",
      "Habilite todas as edge locations (melhor performance)",
      "Use apenas edge locations mais baratas",
      "Desabilite o cache para vídeos"
    ],
    correctAnswer: 1,
    explanation: "Para vídeos e conteúdo de alta performance global, habilitar todas as edge locations garante a menor latência possível para usuários em qualquer região. Embora mais caro, oferece a melhor experiência do usuário.",
    difficulty: 'easy',
    topic: 'Performance'
  },
  {
    id: 8,
    question: "Como você pode proteger o conteúdo do S3 para que só seja acessado através do CloudFront?",
    options: [
      "Tornar o bucket S3 público",
      "Usar Origin Access Identity (OAI) ou Origin Access Control (OAC)",
      "Usar Security Groups",
      "Criptografar todos os objetos"
    ],
    correctAnswer: 1,
    explanation: "OAI (legado) ou OAC (recomendado) permite que o CloudFront acesse um bucket S3 privado. Você configura uma política de bucket que permite apenas o OAI/OAC do CloudFront, bloqueando acesso direto público ao S3.",
    difficulty: 'medium',
    topic: 'Segurança'
  },
  {
    id: 9,
    question: "Qual header HTTP o CloudFront adiciona para identificar o país do usuário?",
    options: [
      "X-Country-Code",
      "CloudFront-Viewer-Country",
      "X-Forwarded-Country",
      "Geo-Location"
    ],
    correctAnswer: 1,
    explanation: "CloudFront adiciona o header 'CloudFront-Viewer-Country' contendo o código do país (ex: US, BR, JP) baseado no IP do usuário. Isso permite que a aplicação origin personalize conteúdo por região.",
    difficulty: 'medium',
    topic: 'Headers e Metadata'
  },
  {
    id: 10,
    question: "Uma empresa quer bloquear acesso ao CloudFront de países específicos. Qual recurso deve usar?",
    options: [
      "Security Groups",
      "CloudFront Geographic Restrictions (Geo-blocking)",
      "Route 53 Geolocation routing",
      "AWS WAF com regras de país"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Geographic Restrictions (geo-blocking) permite criar uma whitelist (países permitidos) ou blacklist (países bloqueados). Essa é a forma nativa e mais simples de restringir acesso por país no CloudFront.",
    difficulty: 'easy',
    topic: 'Segurança'
  },
  {
    id: 11,
    question: "Qual é o custo de invalidação de cache no CloudFront?",
    options: [
      "Sempre gratuito",
      "Primeiras 1000 invalidações por mês são gratuitas",
      "Custo por GB invalidado",
      "Custo fixo de $10 por invalidação"
    ],
    correctAnswer: 1,
    explanation: "AWS oferece 1000 caminhos de invalidação gratuitos por mês. Após isso, há cobrança de $0.005 por caminho. Por exemplo, invalidar /images/* conta como 1 caminho. É mais econômico usar versionamento de arquivo (ex: style.v2.css) que criar novas invalidações.",
    difficulty: 'medium',
    topic: 'Custos'
  },
  {
    id: 12,
    question: "Uma API REST está por trás do CloudFront. Como garantir que requisições POST não sejam cacheadas?",
    options: [
      "Configurar TTL para 0 segundos",
      "CloudFront não cacheia métodos POST por padrão",
      "Usar AWS WAF para bloquear cache",
      "Desabilitar cache completamente"
    ],
    correctAnswer: 1,
    explanation: "CloudFront, por padrão, só cacheia respostas de métodos GET e HEAD. Métodos POST, PUT, PATCH, DELETE sempre são encaminhados para a origem sem cache. Você pode configurar quais métodos HTTP são permitidos no behavior.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 13,
    question: "Qual é a diferença entre CloudFront e Global Accelerator?",
    options: [
      "São serviços idênticos",
      "CloudFront cacheia conteúdo; Global Accelerator otimiza conexões TCP/UDP",
      "Global Accelerator é mais barato",
      "CloudFront só funciona com HTTP/HTTPS"
    ],
    correctAnswer: 1,
    explanation: "CloudFront é uma CDN que cacheia conteúdo HTTP/HTTPS em edge locations. Global Accelerator usa a rede AWS para otimizar conexões TCP/UDP de qualquer aplicação (não só web), melhorando performance sem cache. Use CloudFront para conteúdo estático/dinâmico e Global Accelerator para aplicações TCP/UDP.",
    difficulty: 'hard',
    topic: 'Comparações'
  },
  {
    id: 14,
    question: "Como CloudFront lida com cookies de sessão?",
    options: [
      "Sempre bloqueia todos os cookies",
      "Pode encaminhar todos, nenhum ou cookies específicos para origem",
      "Cacheia cookies automaticamente",
      "Cookies não são suportados"
    ],
    correctAnswer: 1,
    explanation: "Você pode configurar o CloudFront para: (1) Não encaminhar cookies (melhor cache), (2) Encaminhar todos os cookies (pior cache), ou (3) Encaminhar apenas cookies específicos na whitelist. Encaminhar cookies reduz eficiência do cache porque cria variações.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 15,
    question: "Uma aplicação usa CloudFront com origem ALB. O ALB está respondendo lentamente. Como CloudFront lida com isso?",
    options: [
      "CloudFront automaticamente roteia para outra origem",
      "CloudFront tem timeout configurável e pode usar origem secundária (failover)",
      "CloudFront sempre espera indefinidamente",
      "CloudFront bloqueia todas as requisições"
    ],
    correctAnswer: 1,
    explanation: "CloudFront permite configurar timeouts de conexão e resposta. Você também pode configurar um origin group com origem primária e secundária (failover). Se a primária falhar (timeout, erro 5xx), CloudFront automaticamente tenta a origem secundária.",
    difficulty: 'hard',
    topic: 'Alta Disponibilidade'
  },
  {
    id: 16,
    question: "Qual protocolo CloudFront usa para comunicação com a origem por padrão?",
    options: [
      "Sempre HTTP",
      "Sempre HTTPS",
      "Match Viewer (mesmo protocolo do cliente)",
      "HTTP/2 apenas"
    ],
    correctAnswer: 2,
    explanation: "Por padrão, CloudFront usa 'Match Viewer' - se o cliente fez requisição HTTPS, CloudFront também usa HTTPS com origem; se HTTP, usa HTTP. Você pode forçar HTTPS para origem independente do viewer. Isso balanceia segurança e flexibilidade.",
    difficulty: 'medium',
    topic: 'Protocolos'
  },
  {
    id: 17,
    question: "O que é Lambda@Edge no contexto do CloudFront?",
    options: [
      "Um tipo especial de EC2 instance",
      "Função Lambda que roda nas edge locations do CloudFront",
      "Serviço de banco de dados edge",
      "CloudFront para Lambda functions"
    ],
    correctAnswer: 1,
    explanation: "Lambda@Edge permite executar código Node.js ou Python nas edge locations do CloudFront. Você pode modificar requisições e respostas em 4 pontos: Viewer Request, Origin Request, Origin Response, Viewer Response. Útil para personalização, autenticação, headers customizados.",
    difficulty: 'hard',
    topic: 'Computação Edge'
  },
  {
    id: 18,
    question: "Uma empresa quer comprimir automaticamente arquivos CSS e JS antes de enviar aos usuários. Como fazer isso no CloudFront?",
    options: [
      "Usar S3 Transfer Acceleration",
      "Habilitar CloudFront Compression (Gzip/Brotli)",
      "Instalar plugin no navegador",
      "Usar Lambda@Edge para comprimir"
    ],
    correctAnswer: 1,
    explanation: "CloudFront pode automaticamente comprimir objetos com Gzip ou Brotli se o viewer suportar. Basta habilitar 'Compress Objects Automatically' no behavior. CloudFront comprime text, CSS, JS, JSON automaticamente. Reduz tamanho em até 70-90%.",
    difficulty: 'easy',
    topic: 'Performance'
  },
  {
    id: 19,
    question: "Qual é o comportamento padrão do CloudFront quando a origem retorna erro 404?",
    options: [
      "CloudFront retorna página de erro genérica da AWS",
      "CloudFront cacheia o erro 404 por 5 minutos (padrão)",
      "CloudFront nunca cacheia erros",
      "CloudFront redireciona para S3"
    ],
    correctAnswer: 1,
    explanation: "Por padrão, CloudFront cacheia respostas de erro (4xx, 5xx) por um tempo mínimo (5 minutos para 404). Isso evita sobrecarregar a origem com requisições repetidas para recursos inexistentes. Você pode customizar o tempo de cache de erros ou criar páginas de erro personalizadas.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 20,
    question: "Uma aplicação precisa saber o IP real do cliente final, mas está por trás do CloudFront. Qual header contém essa informação?",
    options: [
      "X-Real-IP",
      "X-Forwarded-For",
      "CloudFront-Viewer-IP",
      "Client-IP"
    ],
    correctAnswer: 1,
    explanation: "CloudFront adiciona o header 'X-Forwarded-For' contendo o IP do cliente original. Se houver múltiplos proxies, o X-Forwarded-For contém uma lista (primeiro é o IP do cliente real). A origem deve ler este header para obter o IP real do usuário.",
    difficulty: 'medium',
    topic: 'Headers e Metadata'
  },

  // Bloco 2: Questões 21-40
  {
    id: 21,
    question: "Uma empresa precisa servir conteúdo diferente baseado no tipo de dispositivo (mobile/desktop). Como fazer isso com CloudFront?",
    options: [
      "Criar duas distribuições separadas",
      "Habilitar CloudFront Device Detection e encaminhar headers CloudFront-Is-Mobile-Viewer",
      "Usar Route 53 com diferentes endpoints",
      "Não é possível com CloudFront"
    ],
    correctAnswer: 1,
    explanation: "CloudFront pode detectar o tipo de device e adicionar headers como CloudFront-Is-Mobile-Viewer, CloudFront-Is-Tablet-Viewer, CloudFront-Is-Desktop-Viewer. A origem pode usar esses headers para servir conteúdo otimizado para cada device.",
    difficulty: 'medium',
    topic: 'Headers e Metadata'
  },
  {
    id: 22,
    question: "Qual é o TTL mínimo permitido no CloudFront?",
    options: [
      "1 segundo",
      "0 segundos (sem cache)",
      "60 segundos",
      "300 segundos"
    ],
    correctAnswer: 1,
    explanation: "O TTL mínimo do CloudFront pode ser configurado para 0 segundos, o que significa que o CloudFront sempre validará com a origem antes de servir do cache. Isso é útil para conteúdo que muda frequentemente, mas ainda aproveita validações condicionais (ETag, If-Modified-Since).",
    difficulty: 'easy',
    topic: 'Cache Management'
  },
  {
    id: 23,
    question: "Como CloudFront lida com conteúdo dinâmico (ex: API responses)?",
    options: [
      "CloudFront não suporta conteúdo dinâmico",
      "Pode cachear baseado em query strings, cookies e headers",
      "Sempre bloqueia conteúdo dinâmico",
      "Requer Lambda@Edge obrigatoriamente"
    ],
    correctAnswer: 1,
    explanation: "CloudFront pode cachear conteúdo dinâmico criando cache keys baseados em query strings, cookies específicos e headers. Por exemplo, cachear /api/users?page=1 e /api/users?page=2 separadamente. Configure no behavior quais parâmetros incluir no cache key.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 24,
    question: "Uma empresa está usando CloudFront com certificado SSL customizado. Qual opção oferece melhor compatibilidade com browsers antigos?",
    options: [
      "SNI Custom SSL",
      "Dedicated IP Custom SSL",
      "ACM Certificate",
      "Self-signed certificate"
    ],
    correctAnswer: 1,
    explanation: "Dedicated IP Custom SSL aloca IPs dedicados em cada edge location, garantindo compatibilidade com browsers antigos que não suportam SNI. Porém, custa $600/mês. SNI Custom SSL é gratuito mas browsers muito antigos (IE6, Android 2.x) não suportam. Para maioria dos casos, SNI é suficiente.",
    difficulty: 'hard',
    topic: 'SSL/TLS'
  },
  {
    id: 25,
    question: "O que acontece quando você remove um objeto da origem S3 mas ele ainda está no cache do CloudFront?",
    options: [
      "CloudFront automaticamente remove do cache",
      "CloudFront continua servindo do cache até o TTL expirar",
      "CloudFront retorna erro 404 imediatamente",
      "CloudFront recria o objeto no S3"
    ],
    correctAnswer: 1,
    explanation: "CloudFront continua servindo o objeto do cache até o TTL expirar, mesmo que o objeto seja removido da origem. Depois do TTL, a próxima requisição tentará buscar da origem e receberá 404. Para forçar remoção imediata, crie uma invalidação.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 26,
    question: "Qual é a melhor prática para versionamento de assets estáticos com CloudFront?",
    options: [
      "Usar invalidação de cache sempre que mudar arquivo",
      "Usar nomes de arquivo com versão/hash (ex: style.abc123.css)",
      "Reduzir TTL para 1 minuto",
      "Desabilitar cache"
    ],
    correctAnswer: 1,
    explanation: "A melhor prática é incluir versão ou hash no nome do arquivo (ex: app.v2.js, style.abc123.css). Assim, cada versão tem URL única e não precisa invalidação. TTL pode ser longo (1 ano). Invalidações devem ser usadas apenas quando não é possível mudar o nome do arquivo.",
    difficulty: 'medium',
    topic: 'Best Practices'
  },
  {
    id: 27,
    question: "Uma aplicação está recebendo ataques DDoS. Como CloudFront ajuda a mitigar?",
    options: [
      "CloudFront não oferece proteção DDoS",
      "CloudFront integra com AWS Shield Standard (gratuito) e Shield Advanced",
      "Requer firewall externo",
      "Apenas bloqueando IPs manualmente"
    ],
    correctAnswer: 1,
    explanation: "CloudFront inclui AWS Shield Standard gratuitamente, protegendo contra ataques DDoS comuns (Layer 3/4). Para proteção avançada (Layer 7, ataques sofisticados), use Shield Advanced ($3000/mês). CloudFront também distribui tráfego globalmente, absorvendo grandes volumes.",
    difficulty: 'medium',
    topic: 'Segurança'
  },
  {
    id: 28,
    question: "Como funciona o CloudFront Origin Shield?",
    options: [
      "Um firewall para proteger origem",
      "Camada adicional de cache entre edge locations e origem",
      "Backup automático da origem",
      "Monitoramento de segurança"
    ],
    correctAnswer: 1,
    explanation: "Origin Shield é uma camada adicional de cache centralizado entre edge locations e origem. Múltiplas edge locations buscam do Origin Shield ao invés da origem, reduzindo carga na origem. Útil quando origem tem capacidade limitada ou custos altos de saída.",
    difficulty: 'hard',
    topic: 'Arquitetura'
  },
  {
    id: 29,
    question: "Qual ferramenta da AWS permite monitorar métricas do CloudFront em tempo real?",
    options: [
      "AWS X-Ray",
      "CloudWatch com métricas do CloudFront",
      "CloudTrail",
      "AWS Config"
    ],
    correctAnswer: 1,
    explanation: "CloudWatch coleta métricas do CloudFront como: Requests, Bytes Downloaded/Uploaded, Error Rate (4xx, 5xx), Cache Hit Rate. Você pode criar alarmes baseados nessas métricas. CloudFront também oferece logs de acesso detalhados e real-time logs.",
    difficulty: 'easy',
    topic: 'Monitoramento'
  },
  {
    id: 30,
    question: "Uma aplicação precisa registrar todas as requisições do CloudFront para análise. Qual opção oferece logs mais rápidos?",
    options: [
      "Standard Logs (delivery em horas)",
      "Real-time Logs (delivery em segundos)",
      "CloudTrail",
      "VPC Flow Logs"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Real-time Logs entregam logs em segundos para Kinesis Data Streams, permitindo análise quase instantânea. Standard Logs são gratuitos mas demoram horas para serem entregues ao S3. Real-time Logs tem custo mas oferece insights imediatos.",
    difficulty: 'medium',
    topic: 'Monitoramento'
  },
  {
    id: 31,
    question: "Como CloudFront determina qual edge location usar para um usuário?",
    options: [
      "Aleatoriamente",
      "Baseado no IP do usuário e latência da rede",
      "Sempre a edge location mais próxima geograficamente",
      "Usuário escolhe manualmente"
    ],
    correctAnswer: 1,
    explanation: "CloudFront usa DNS para direcionar usuários à edge location com menor latência, considerando fatores como: carga da edge, condições de rede, e proximidade. Não é sempre a geograficamente mais próxima - pode ser outra com melhor performance no momento.",
    difficulty: 'medium',
    topic: 'Infraestrutura'
  },
  {
    id: 32,
    question: "Qual é o tamanho máximo de objeto que CloudFront pode cachear?",
    options: [
      "10 GB",
      "20 GB",
      "30 GB",
      "Sem limite"
    ],
    correctAnswer: 1,
    explanation: "CloudFront pode cachear objetos de até 20 GB. Objetos maiores que 20 GB são transmitidos mas não cacheados. Para objetos grandes, considere usar S3 Transfer Acceleration ou quebrar em partes menores.",
    difficulty: 'medium',
    topic: 'Limitações'
  },
  {
    id: 33,
    question: "Uma empresa usa CloudFront com origem ALB. Como garantir que apenas CloudFront acesse o ALB?",
    options: [
      "Configurar Security Group do ALB para permitir apenas IPs das edge locations",
      "Usar header customizado secreto verificado pela aplicação",
      "Usar VPC Endpoint",
      "Não é possível proteger ALB"
    ],
    correctAnswer: 1,
    explanation: "A melhor prática é configurar CloudFront para adicionar header customizado secreto (ex: X-Custom-Header: senha-secreta) e a aplicação valida esse header. Security Groups podem filtrar IPs do CloudFront mas a lista é grande e muda. Para S3, use OAI/OAC.",
    difficulty: 'hard',
    topic: 'Segurança'
  },
  {
    id: 34,
    question: "Qual protocolo o CloudFront NÃO suporta?",
    options: [
      "HTTP/1.1",
      "HTTP/2",
      "HTTP/3 (QUIC)",
      "WebSocket"
    ],
    correctAnswer: 2,
    explanation: "CloudFront suporta HTTP/1.1, HTTP/2 e WebSocket. HTTP/3 (QUIC) ainda não é suportado pelo CloudFront (até 2025). HTTP/2 oferece multiplexing, header compression e server push. WebSocket suporta comunicação bidirecional.",
    difficulty: 'hard',
    topic: 'Protocolos'
  },
  {
    id: 35,
    question: "Como CloudFront lida com Range Requests (download parcial de arquivos)?",
    options: [
      "Não suporta Range Requests",
      "Suporta nativamente, cacheia por ranges",
      "Requer Lambda@Edge",
      "Apenas para arquivos < 1 GB"
    ],
    correctAnswer: 1,
    explanation: "CloudFront suporta nativamente Range Requests (Header: Range: bytes=0-1023). Útil para resumir downloads, streaming de vídeo, e downloads parciais. CloudFront cacheia ranges individuais, melhorando eficiência.",
    difficulty: 'medium',
    topic: 'Performance'
  },
  {
    id: 36,
    question: "Uma aplicação SaaS multi-tenant usa CloudFront. Como cachear conteúdo de forma isolada por tenant?",
    options: [
      "Criar distribuição CloudFront por tenant",
      "Usar query string ou header customizado com tenant ID no cache key",
      "Não é possível com CloudFront",
      "Usar Lambda@Edge para separar"
    ],
    correctAnswer: 1,
    explanation: "Configure CloudFront para incluir query string (ex: ?tenant=123) ou header customizado (ex: X-Tenant-ID) no cache key. Assim, conteúdo de tenant A não será servido para tenant B. Isso cria cache keys únicos por tenant mantendo isolamento.",
    difficulty: 'hard',
    topic: 'Multi-tenancy'
  },
  {
    id: 37,
    question: "Qual é a diferença entre CloudFront Field-Level Encryption e SSL/TLS?",
    options: [
      "São a mesma coisa",
      "Field-Level criptografa campos específicos; SSL/TLS criptografa toda a conexão",
      "Field-Level é mais rápido",
      "SSL/TLS é obsoleto"
    ],
    correctAnswer: 1,
    explanation: "SSL/TLS criptografa a conexão inteira entre cliente e CloudFront. Field-Level Encryption criptografa campos específicos (ex: número de cartão de crédito) no edge antes de enviar para origem, adicionando camada extra de segurança. Dados sensíveis ficam criptografados até serem descriptografados pela aplicação.",
    difficulty: 'hard',
    topic: 'Segurança'
  },
  {
    id: 38,
    question: "Como forçar todos os usuários a usarem HTTPS no CloudFront?",
    options: [
      "Configurar Viewer Protocol Policy para 'Redirect HTTP to HTTPS'",
      "Usar AWS WAF",
      "Configurar no Route 53",
      "Não é possível"
    ],
    correctAnswer: 0,
    explanation: "No behavior do CloudFront, configure Viewer Protocol Policy para 'Redirect HTTP to HTTPS'. Qualquer requisição HTTP será automaticamente redirecionada para HTTPS (301/302). Alternativamente, pode escolher 'HTTPS Only' para bloquear HTTP completamente.",
    difficulty: 'easy',
    topic: 'Segurança'
  },
  {
    id: 39,
    question: "Uma aplicação está usando CloudFront Functions. Qual é a principal diferença entre CloudFront Functions e Lambda@Edge?",
    options: [
      "São idênticos",
      "CloudFront Functions é mais rápido e barato, mas mais limitado; Lambda@Edge é mais poderoso",
      "Lambda@Edge é gratuito",
      "CloudFront Functions não existe"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Functions executa em sub-milissegundos, custa menos, mas é limitado (sem acesso rede, 10KB código max, só JavaScript). Lambda@Edge é mais lento (milissegundos) e caro, mas suporta Node.js/Python, acesso rede, bibliotecas externas. Use Functions para transformações leves, Lambda@Edge para lógica complexa.",
    difficulty: 'hard',
    topic: 'Computação Edge'
  },
  {
    id: 40,
    question: "Como CloudFront calcula o cache hit ratio?",
    options: [
      "Requisições servidas do cache / Total de requisições",
      "Bytes transferidos / Total de bytes",
      "Tempo de resposta médio",
      "Número de edge locations usadas"
    ],
    correctAnswer: 0,
    explanation: "Cache Hit Ratio = (Requisições servidas do cache / Total de requisições) × 100%. Um ratio alto (>80%) indica cache eficiente, reduzindo carga na origem e melhorando performance. Um ratio baixo pode indicar TTL muito curto, muitas variações de cache key, ou conteúdo não cacheável.",
    difficulty: 'medium',
    topic: 'Métricas'
  },

  // Bloco 3: Questões 41-60
  {
    id: 41,
    question: "Uma empresa de streaming precisa servir vídeos sob demanda. Qual configuração de CloudFront é ideal?",
    options: [
      "Desabilitar cache completamente",
      "Usar Smooth Streaming ou HLS com segmentos pequenos e cache habilitado",
      "Usar apenas HTTP/1.1",
      "Cache com TTL de 1 hora"
    ],
    correctAnswer: 1,
    explanation: "Para streaming de vídeo, use protocolos como HLS (HTTP Live Streaming) ou Smooth Streaming que quebram vídeo em segmentos pequenos (2-10 segundos). CloudFront cacheia cada segmento, reduzindo carga na origem. Configure TTL longo para segmentos (imutáveis) e curto para manifests (mudam). Isso garante baixa latência e alta cache hit ratio.",
    difficulty: 'hard',
    topic: 'Streaming'
  },
  {
    id: 42,
    question: "Como CloudFront lida com cookies na comunicação entre viewer e origem?",
    options: [
      "CloudFront sempre bloqueia cookies",
      "CloudFront pode encaminhar todos, nenhum, ou cookies específicos (whitelist)",
      "Cookies são automaticamente criptografados",
      "Apenas Lambda@Edge pode processar cookies"
    ],
    correctAnswer: 1,
    explanation: "No behavior, configure Cookie Settings: 'None' (bloqueia todos), 'All' (encaminha todos - reduz cache efficiency), ou 'Whitelist' (encaminha apenas cookies específicos). Cookies incluídos no whitelist fazem parte do cache key. Para sessões, encaminhe apenas cookie de sessão, ignorando cookies de analytics/tracking.",
    difficulty: 'medium',
    topic: 'Cache Management'
  },
  {
    id: 43,
    question: "Uma aplicação usa CloudFront com origem on-premises. Como melhorar a conexão entre CloudFront e origem?",
    options: [
      "Usar Direct Connect ou VPN para conexão privada",
      "Aumentar TTL",
      "Adicionar mais edge locations",
      "Não é possível melhorar"
    ],
    correctAnswer: 0,
    explanation: "AWS Direct Connect ou VPN Site-to-Site criam conexão privada, segura e de baixa latência entre CloudFront e origem on-premises. Isso reduz latência, melhora throughput e aumenta segurança comparado com conexão pública. Alternativamente, use Origin Shield para reduzir número de conexões à origem.",
    difficulty: 'hard',
    topic: 'Arquitetura Híbrida'
  },
  {
    id: 44,
    question: "Qual é o comportamento padrão do CloudFront quando a origem retorna erro 5xx?",
    options: [
      "CloudFront cacheia o erro por 5 minutos por padrão",
      "CloudFront nunca cacheia erros",
      "CloudFront retorna erro customizado automaticamente",
      "CloudFront desabilita a origem"
    ],
    correctAnswer: 0,
    explanation: "Por padrão, CloudFront cacheia erros 5xx (500, 502, 503, 504) por 5 minutos. Isso pode ser problemático se origem recuperar rapidamente. Configure Error Caching Minimum TTL para controlar duração ou defina como 0 para não cachear erros. Para 4xx, padrão é 10 minutos.",
    difficulty: 'medium',
    topic: 'Error Handling'
  },
  {
    id: 45,
    question: "Uma empresa quer comprimir automaticamente arquivos CSS, JS e HTML. Como configurar no CloudFront?",
    options: [
      "Configurar compressão na origem apenas",
      "Habilitar 'Compress Objects Automatically' no behavior do CloudFront",
      "Usar Lambda@Edge obrigatoriamente",
      "CloudFront não suporta compressão"
    ],
    correctAnswer: 1,
    explanation: "Habilite 'Compress Objects Automatically' no behavior. CloudFront automaticamente comprime arquivos elegíveis (CSS, JS, HTML, etc.) com gzip ou brotli se viewer aceita (header Accept-Encoding). Reduz tamanho em 70-80%, melhorando velocidade. Origem não precisa fazer nada.",
    difficulty: 'easy',
    topic: 'Performance'
  },
  {
    id: 46,
    question: "Como CloudFront determina qual origem usar quando há múltiplas origens configuradas?",
    options: [
      "Aleatoriamente",
      "Baseado em path patterns nos behaviors",
      "Sempre usa a primeira origem",
      "Usuário escolhe"
    ],
    correctAnswer: 1,
    explanation: "CloudFront usa behaviors com path patterns para rotear. Exemplo: /api/* → origem ALB, /images/* → origem S3, /* (default) → origem principal. CloudFront avalia path da requisição e usa a origem correspondente ao behavior que faz match. Behaviors são avaliados em ordem de prioridade.",
    difficulty: 'medium',
    topic: 'Arquitetura'
  },
  {
    id: 47,
    question: "Qual classe de preço do CloudFront oferece menor custo mas pode ter maior latência para alguns usuários?",
    options: [
      "All Edge Locations (Best Performance)",
      "Use Only North America and Europe",
      "Use Only North America, Europe, Asia, Middle East, and Africa",
      "Todas têm mesmo preço"
    ],
    correctAnswer: 1,
    explanation: "Price Class 'Use Only North America and Europe' usa menos edge locations, reduzindo custos em até 30-40%, mas usuários em outras regiões (América do Sul, Ásia, Oceania) podem ter maior latência. Use quando maioria dos usuários estão em NA/Europa e deseja otimizar custos.",
    difficulty: 'medium',
    topic: 'Custos'
  },
  {
    id: 48,
    question: "Uma aplicação WebSocket precisa usar CloudFront. Qual configuração é necessária?",
    options: [
      "CloudFront não suporta WebSocket",
      "Configurar Viewer Protocol Policy e encaminhar headers Upgrade e Connection",
      "Usar apenas Lambda@Edge",
      "Requer distribuição dedicada"
    ],
    correctAnswer: 1,
    explanation: "CloudFront suporta WebSocket. Configure: 1) Viewer Protocol Policy para HTTPS (WebSocket precisa TLS), 2) Origin Protocol Policy para HTTPS, 3) Encaminhar headers 'Upgrade' e 'Connection' para origem, 4) TTL 0 ou query string/header no cache key. A conexão WebSocket passa transparentemente pelo CloudFront.",
    difficulty: 'hard',
    topic: 'WebSocket'
  },
  {
    id: 49,
    question: "Como CloudFront pode ajudar a reduzir custos de Data Transfer Out do S3?",
    options: [
      "CloudFront não reduz custos",
      "CloudFront cacheia conteúdo, reduzindo transferências do S3; transfer do S3 para CloudFront é gratuito",
      "CloudFront compacta todos os arquivos",
      "CloudFront é sempre mais caro"
    ],
    correctAnswer: 1,
    explanation: "Data Transfer do S3 para CloudFront (mesma região) é GRATUITO. Data Transfer do CloudFront para internet é ~30-40% mais barato que S3 direto. Com cache eficiente (high hit ratio), você serve do CloudFront sem repetir transferências do S3, economizando significativamente.",
    difficulty: 'medium',
    topic: 'Custos'
  },
  {
    id: 50,
    question: "Uma empresa precisa atualizar conteúdo cacheado imediatamente sem usar invalidação (que tem custo). Qual estratégia?",
    options: [
      "Impossível sem invalidação",
      "Usar versioning no nome do arquivo (cache busting)",
      "Reduzir TTL para 1 segundo",
      "Desabilitar cache"
    ],
    correctAnswer: 1,
    explanation: "Cache busting com versioning: mude o nome/path do arquivo ao atualizar (ex: style.v2.css, app.abc123.js). Browser e CloudFront tratam como arquivo novo, buscando da origem. Sem custo de invalidação, sem espera. Best practice: use hash do conteúdo no nome (ex: webpack content hash).",
    difficulty: 'medium',
    topic: 'Best Practices'
  },
  {
    id: 51,
    question: "Como funciona o Origin Failover no CloudFront?",
    options: [
      "CloudFront não suporta failover",
      "Configure Origin Group com primary e secondary; CloudFront tenta secondary se primary falha",
      "Requer Route 53 obrigatoriamente",
      "Failover é automático sem configuração"
    ],
    correctAnswer: 1,
    explanation: "Crie Origin Group com primary e secondary origins. Configure status codes que acionam failover (ex: 500, 502, 503, 504, 404). Se primary retorna esses códigos, CloudFront automaticamente tenta secondary. Exemplo: primary EC2, secondary S3 com conteúdo estático como backup.",
    difficulty: 'medium',
    topic: 'Alta Disponibilidade'
  },
  {
    id: 52,
    question: "Uma aplicação usa Lambda@Edge no evento 'origin-request'. Quando essa função é executada?",
    options: [
      "Sempre que há requisição do viewer",
      "Apenas quando cache miss, antes de buscar da origem",
      "Depois de receber resposta da origem",
      "No momento do cache"
    ],
    correctAnswer: 1,
    explanation: "Lambda@Edge eventos: 1) viewer-request (antes cache lookup, sempre executa), 2) origin-request (cache miss, antes buscar origem - pode modificar request), 3) origin-response (depois origem responder, antes cachear), 4) viewer-response (antes enviar para viewer, sempre executa). Use origin-request para economizar execuções com cache.",
    difficulty: 'hard',
    topic: 'Lambda@Edge'
  },
  {
    id: 53,
    question: "Qual método HTTP o CloudFront NÃO suporta?",
    options: [
      "GET, POST, PUT",
      "DELETE, PATCH, OPTIONS",
      "HEAD",
      "CloudFront suporta todos os métodos HTTP comuns"
    ],
    correctAnswer: 3,
    explanation: "CloudFront suporta GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE. Configure no behavior quais métodos permitir. GET e HEAD são cacheáveis por padrão. POST, PUT, PATCH, DELETE não são cacheáveis (sempre vão para origem).",
    difficulty: 'easy',
    topic: 'Protocolos'
  },
  {
    id: 54,
    question: "Como implementar A/B testing usando CloudFront?",
    options: [
      "CloudFront não suporta A/B testing",
      "Usar Lambda@Edge ou CloudFront Functions para rotear baseado em cookie/header",
      "Requer ALB obrigatoriamente",
      "Apenas possível com terceiros"
    ],
    correctAnswer: 1,
    explanation: "Use Lambda@Edge (viewer-request) ou CloudFront Functions para: 1) Checar se viewer tem cookie de teste, 2) Se não, atribuir aleatoriamente grupo A ou B e setar cookie, 3) Rotear para diferentes origins ou paths baseado no grupo. Também pode modificar cache key para servir versões diferentes do conteúdo.",
    difficulty: 'hard',
    topic: 'Casos de Uso Avançados'
  },
  {
    id: 55,
    question: "Uma empresa detectou latência alta em requisições initial (cold start). O que pode estar acontecendo?",
    options: [
      "Edge location precisa buscar da origem (cache miss)",
      "CloudFront está offline",
      "Certificado SSL expirado",
      "TTL muito alto"
    ],
    correctAnswer: 0,
    explanation: "Em cache miss (cold start), edge location precisa buscar da origem, adicionando latência da ida e volta completa. Após primeiro request, conteúdo fica cacheado e próximas requisições são rápidas. Para reduzir: pré-aqueça cache com scripts, use Origin Shield, ou aumente TTL para reduzir cache misses.",
    difficulty: 'medium',
    topic: 'Performance'
  },
  {
    id: 56,
    question: "Como CloudFront lida com cookies HttpOnly e Secure?",
    options: [
      "CloudFront bloqueia esses cookies",
      "CloudFront encaminha transparentemente se configurado para encaminhar cookies",
      "Requer Lambda@Edge",
      "Cookies são automaticamente removidos"
    ],
    correctAnswer: 1,
    explanation: "CloudFront respeita flags HttpOnly e Secure em cookies. Se behavior está configurado para encaminhar cookies (whitelist ou all), CloudFront os encaminha para origem e para viewer mantendo flags. Secure cookies só são enviados em conexões HTTPS. HttpOnly previne acesso via JavaScript.",
    difficulty: 'medium',
    topic: 'Segurança'
  },
  {
    id: 57,
    question: "Uma API REST está recebendo requisições OPTIONS (CORS preflight). Como otimizar com CloudFront?",
    options: [
      "Bloquear requisições OPTIONS",
      "Cachear responses de OPTIONS com TTL longo e headers CORS corretos",
      "OPTIONS não podem ser cacheadas",
      "Desabilitar CORS"
    ],
    correctAnswer: 1,
    explanation: "Requisições OPTIONS (preflight) podem ser cacheadas! Configure origem para retornar headers CORS apropriados (Access-Control-Allow-*) e CloudFront para cachear responses de OPTIONS com TTL longo (ex: 24h). Isso reduz drasticamente chamadas à origem, melhorando performance de APIs com muitas requisições cross-origin.",
    difficulty: 'hard',
    topic: 'CORS e APIs'
  },
  {
    id: 58,
    question: "Qual é a diferença entre usar S3 Transfer Acceleration e CloudFront para uploads?",
    options: [
      "São idênticos",
      "Transfer Acceleration otimiza upload para S3; CloudFront otimiza download (mas pode fazer upload via PUT)",
      "CloudFront não suporta upload",
      "Transfer Acceleration é obsoleto"
    ],
    correctAnswer: 1,
    explanation: "S3 Transfer Acceleration usa rede AWS backbone para acelerar uploads grandes para S3 (uploads roteados via edge locations). CloudFront também aceita uploads (PUT/POST), mas é otimizado principalmente para downloads/caching. Para uploads grandes frequentes, Transfer Acceleration é melhor escolha.",
    difficulty: 'medium',
    topic: 'Comparações'
  },
  {
    id: 59,
    question: "Como monitorar se uma distribuição CloudFront está bloqueada por algum país específico?",
    options: [
      "Não é possível monitorar",
      "Usar CloudWatch Logs com filtro no campo c-ip (IP do cliente) e geo-lookup",
      "CloudFront automaticamente notifica",
      "Apenas com ferramentas terceiras"
    ],
    correctAnswer: 1,
    explanation: "Analise CloudFront access logs ou real-time logs. Logs incluem campos como c-ip (IP do viewer), x-edge-location, e você pode fazer geo-lookup do IP. Para monitoramento ativo, crie CloudWatch alarm baseado em métricas como Requests por região ou analise sc-status para ver se há bloqueios (403 de geo-restriction).",
    difficulty: 'hard',
    topic: 'Monitoramento'
  },
  {
    id: 60,
    question: "Uma empresa usa CloudFront com WAF. Qual é a ordem de processamento quando há requisição?",
    options: [
      "WAF → CloudFront → Lambda@Edge → Origem",
      "CloudFront → WAF → Lambda@Edge → Origem",
      "Viewer → CloudFront (viewer-request Lambda) → WAF → Cache ou Origem",
      "WAF → Lambda@Edge → CloudFront → Origem"
    ],
    correctAnswer: 2,
    explanation: "Ordem: 1) Viewer envia request, 2) CloudFront executa viewer-request Lambda@Edge/Functions, 3) WAF avalia (se bloqueado, retorna 403), 4) Cache lookup, 5) Se miss: origin-request Lambda → Origem → origin-response Lambda → cacheia, 6) viewer-response Lambda → Viewer. WAF avalia antes de cache lookup, protegendo origem e cache.",
    difficulty: 'hard',
    topic: 'Arquitetura e Segurança'
  },

  // Bloco 4: Questões 61-80
  {
    id: 61,
    question: "Como CloudFront lida com grandes uploads (arquivos > 1 GB) via POST/PUT?",
    options: [
      "CloudFront bloqueia uploads > 1 GB",
      "CloudFront suporta até 20 GB por upload",
      "Requer S3 Transfer Acceleration",
      "Máximo 100 MB"
    ],
    correctAnswer: 1,
    explanation: "CloudFront suporta uploads de até 20 GB via POST/PUT. Para uploads maiores, use S3 Multipart Upload ou S3 Transfer Acceleration. CloudFront encaminha o upload para origem via conexão persistente, otimizando performance. Útil para aplicações de upload de vídeos, backups, etc.",
    difficulty: 'medium',
    topic: 'Uploads e Limitações'
  },
  {
    id: 62,
    question: "Uma aplicação de e-commerce precisa processar pagamentos seguros. Como usar Field-Level Encryption?",
    options: [
      "Criptografar número do cartão no browser e descriptografar no backend",
      "Configurar Field-Level Encryption no CloudFront para criptografar campos específicos no edge",
      "Usar apenas SSL/TLS",
      "Não é possível com CloudFront"
    ],
    correctAnswer: 1,
    explanation: "Configure Field-Level Encryption Profile no CloudFront especificando campos a criptografar (ex: credit_card_number). CloudFront criptografa esses campos no edge com chave pública antes de enviar para origem. Origem descriptografa com chave privada. Dados sensíveis nunca trafegam descriptografados no backend, cumprindo PCI-DSS.",
    difficulty: 'hard',
    topic: 'Segurança Avançada'
  },
  {
    id: 63,
    question: "Qual é o comportamento do CloudFront quando o TTL expira mas a origem está inacessível?",
    options: [
      "CloudFront retorna erro 502 imediatamente",
      "CloudFront pode servir conteúdo stale (expirado) se configurado",
      "CloudFront deleta o conteúdo do cache",
      "CloudFront desabilita a distribuição"
    ],
    correctAnswer: 1,
    explanation: "Configure 'Serve Stale Content' (stale-if-error, stale-while-revalidate). Se origem está inacessível quando TTL expira, CloudFront pode servir conteúdo stale por período configurado (ex: 24h). Isso melhora disponibilidade durante outages da origem. Adicione header X-Cache: Hit from cloudfront, Stale.",
    difficulty: 'hard',
    topic: 'Resiliência'
  },
  {
    id: 64,
    question: "Como implementar rate limiting em CloudFront para prevenir abuse?",
    options: [
      "CloudFront não suporta rate limiting",
      "Usar AWS WAF com rate-based rules integrado ao CloudFront",
      "Configurar apenas no ALB",
      "Requer API Gateway"
    ],
    correctAnswer: 1,
    explanation: "Integre AWS WAF ao CloudFront e crie rate-based rules. Exemplo: bloquear IPs que fazem > 2000 requests em 5 minutos. WAF conta requisições por IP e bloqueia automaticamente quando threshold é atingido. Também pode rate limit por país, URI path, ou headers customizados.",
    difficulty: 'medium',
    topic: 'Segurança e WAF'
  },
  {
    id: 65,
    question: "Uma empresa usa CloudFront com S3 e detectou que conteúdo privado está sendo acessado diretamente pelo URL do S3. Como resolver?",
    options: [
      "Usar Bucket Policies para bloquear acesso direto",
      "Configurar OAC (Origin Access Control) e bloquear acesso público no S3",
      "Deletar o bucket",
      "Não é possível prevenir"
    ],
    correctAnswer: 1,
    explanation: "Configure OAC (Origin Access Control, sucessor de OAI). CloudFront usa identidade especial para acessar S3. Configure S3 Bucket Policy para permitir apenas o OAC. Remova permissões públicas do bucket. Agora, conteúdo só pode ser acessado via CloudFront, não diretamente pelo URL S3.",
    difficulty: 'medium',
    topic: 'Segurança S3'
  },
  {
    id: 66,
    question: "Como CloudFront Functions difere de Lambda@Edge em termos de runtime?",
    options: [
      "CloudFront Functions: JavaScript apenas, sub-millisegundos; Lambda@Edge: Node.js/Python, millisegundos",
      "São idênticos",
      "CloudFront Functions: Python apenas",
      "Lambda@Edge não existe mais"
    ],
    correctAnswer: 0,
    explanation: "CloudFront Functions: JavaScript (ECMAScript 5.1), executa em <1ms, 10KB código max, sem acesso rede/filesystem, ideal para transformações simples (headers, redirects). Lambda@Edge: Node.js/Python, executa em 5-50ms, 50MB código max, acesso rede, bibliotecas externas, ideal para lógica complexa (auth, APIs).",
    difficulty: 'medium',
    topic: 'Computação Edge'
  },
  {
    id: 67,
    question: "Uma aplicação global precisa reduzir latência para APIs GraphQL. Como CloudFront pode ajudar?",
    options: [
      "CloudFront não pode cachear GraphQL",
      "Configurar cache baseado no body da requisição POST (query hash)",
      "Usar apenas ALB",
      "GraphQL não funciona com CDN"
    ],
    correctAnswer: 1,
    explanation: "GraphQL tipicamente usa POST com query no body. Configure CloudFront behavior: 1) Encaminhar método POST, 2) Incluir body ou hash do body no cache key (via Lambda@Edge), 3) Cachear responses baseado na query específica. Queries idênticas são servidas do cache, reduzindo latência significativamente.",
    difficulty: 'hard',
    topic: 'APIs Modernas'
  },
  {
    id: 68,
    question: "Qual header CloudFront adiciona automaticamente para identificar a edge location que serviu o conteúdo?",
    options: [
      "X-Edge-Location",
      "X-Cache",
      "X-Amz-Cf-Pop",
      "CloudFront-Edge-ID"
    ],
    correctAnswer: 2,
    explanation: "CloudFront adiciona header 'X-Amz-Cf-Pop' contendo código da edge location (ex: SFO5-C1, GRU3-C2). Útil para debugging e análise de performance. Também adiciona 'X-Cache: Hit from cloudfront' ou 'Miss from cloudfront' indicando se foi servido do cache.",
    difficulty: 'medium',
    topic: 'Headers e Debugging'
  },
  {
    id: 69,
    question: "Como funciona o CloudFront Continuous Deployment para testar mudanças de configuração?",
    options: [
      "Não existe essa feature",
      "Cria staging distribution para testar configurações com % do tráfego antes de promover",
      "Requer duas distribuições manuais",
      "Apenas para Lambda@Edge"
    ],
    correctAnswer: 1,
    explanation: "Continuous Deployment permite criar staging configuration, rotear pequeno % do tráfego (ex: 5%) para staging, validar mudanças, e promover para produção sem downtime. Teste headers, origins, cache behaviors, etc. sem afetar usuários. Se houver problema, rollback instantâneo.",
    difficulty: 'hard',
    topic: 'DevOps e Deployment'
  },
  {
    id: 70,
    question: "Uma aplicação está recebendo slow loris attacks (conexões lentas prolongadas). Como CloudFront ajuda?",
    options: [
      "CloudFront não protege contra isso",
      "CloudFront fecha conexões idle automaticamente e tem timeouts configuráveis",
      "Requer firewall externo",
      "Apenas AWS Shield Advanced protege"
    ],
    correctAnswer: 1,
    explanation: "CloudFront tem timeouts de idle connection, request timeout, e response timeout configuráveis. Conexões que ficam ociosas são fechadas automaticamente, prevenindo slow loris attacks. WAF pode adicionar regras baseadas em rate limiting. Shield Standard protege contra ataques Layer 3/4.",
    difficulty: 'medium',
    topic: 'Segurança DDoS'
  },
  {
    id: 71,
    question: "Como implementar autenticação OAuth/JWT com CloudFront?",
    options: [
      "CloudFront não suporta autenticação",
      "Usar Lambda@Edge no viewer-request para validar JWT e bloquear/permitir acesso",
      "Requer Cognito obrigatoriamente",
      "Apenas com terceiros"
    ],
    correctAnswer: 1,
    explanation: "Use Lambda@Edge (viewer-request): 1) Extrair JWT do header Authorization, 2) Validar assinatura e expiry, 3) Se válido, permitir acesso; se inválido, retornar 401/403. Também pode integrar com Cognito User Pool ou Auth0. Cache bypass para requests autenticadas ou cache baseado em claims do token.",
    difficulty: 'hard',
    topic: 'Autenticação'
  },
  {
    id: 72,
    question: "Qual é o limite de invalidações gratuitas por mês no CloudFront?",
    options: [
      "100 invalidações",
      "1000 paths por mês são gratuitos",
      "Ilimitado",
      "500 invalidações"
    ],
    correctAnswer: 1,
    explanation: "Primeiros 1000 paths por mês são GRATUITOS. Após isso, $0.005 por path. Um wildcard (ex: /images/*) conta como 1 path mas invalida múltiplos objetos. Estratégia: use wildcards, agrupe invalidações, ou prefira cache busting (versioning) para evitar custos.",
    difficulty: 'easy',
    topic: 'Custos'
  },
  {
    id: 73,
    question: "Como CloudFront lida com requisições HTTP/2 Server Push?",
    options: [
      "CloudFront suporta server push completamente",
      "CloudFront não suporta server push (removido do HTTP/2)",
      "Requer configuração especial",
      "Apenas com Lambda@Edge"
    ],
    correctAnswer: 1,
    explanation: "CloudFront não suporta HTTP/2 Server Push (feature foi descontinuada até pelo Chrome). Alternativa moderna: use HTTP/2 multiplexing e Resource Hints (<link rel='preload'>) no HTML. CloudFront suporta HTTP/2 multiplexing que já melhora significativamente a performance.",
    difficulty: 'hard',
    topic: 'Protocolos HTTP/2'
  },
  {
    id: 74,
    question: "Uma empresa precisa servir diferentes versões de API (v1, v2) pela mesma distribuição. Como configurar?",
    options: [
      "Criar duas distribuições separadas",
      "Usar behaviors com path patterns /api/v1/* e /api/v2/* apontando para origens diferentes",
      "Não é possível",
      "Usar apenas Route 53"
    ],
    correctAnswer: 1,
    explanation: "Crie múltiplos behaviors: Behavior 1: Path pattern /api/v1/* → Origin ALB_v1, Behavior 2: Path pattern /api/v2/* → Origin ALB_v2. CloudFront roteia automaticamente baseado no path. Também pode usar mesma origem mas encaminhar headers diferentes ou usar Lambda@Edge para roteamento dinâmico.",
    difficulty: 'medium',
    topic: 'Multi-versioning'
  },
  {
    id: 75,
    question: "Como monitorar a taxa de erro 5xx na origem através do CloudFront?",
    options: [
      "CloudWatch métrica 5xxErrorRate por Origin",
      "Apenas logs manuais",
      "CloudFront não rastreia erros de origem",
      "Usar X-Ray apenas"
    ],
    correctAnswer: 0,
    explanation: "CloudWatch oferece métricas: 'OriginLatency' (latência da origem), '5xxErrorRate' (% de erros 5xx), '4xxErrorRate', 'TotalErrorRate'. Crie CloudWatch Alarms para notificar quando 5xxErrorRate > threshold (ex: 5%). Combine com logs para diagnosticar problemas na origem.",
    difficulty: 'easy',
    topic: 'Monitoramento CloudWatch'
  },
  {
    id: 76,
    question: "Uma aplicação SPA (React/Vue) usa client-side routing. Como configurar CloudFront para retornar index.html para todas as rotas?",
    options: [
      "Não é possível com CloudFront",
      "Configurar Custom Error Response: 404 → 200 com /index.html",
      "Usar apenas S3 Static Website",
      "Requer API Gateway"
    ],
    correctAnswer: 1,
    explanation: "SPAs com client-side routing precisam retornar index.html para rotas não encontradas (ex: /about, /products). Configure Custom Error Response no CloudFront: quando origem retorna 404, CloudFront responde com 200 e serve /index.html. O router JavaScript no SPA lida com a navegação correta.",
    difficulty: 'medium',
    topic: 'Single Page Applications'
  },
  {
    id: 77,
    question: "Como CloudFront Response Headers Policy pode melhorar segurança?",
    options: [
      "Não existe essa feature",
      "Adicionar headers de segurança como Strict-Transport-Security, X-Content-Type-Options automaticamente",
      "Apenas remove headers",
      "Requer Lambda@Edge"
    ],
    correctAnswer: 1,
    explanation: "Response Headers Policy permite adicionar headers automaticamente: Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff, X-Frame-Options: DENY, X-XSS-Protection, Content-Security-Policy, Referrer-Policy. Melhora security posture sem modificar origem. Também pode adicionar CORS headers.",
    difficulty: 'medium',
    topic: 'Segurança Headers'
  },
  {
    id: 78,
    question: "Qual é a diferença entre CloudFront Request Policy e Cache Policy?",
    options: [
      "São a mesma coisa",
      "Request Policy: define o que enviar para origem; Cache Policy: define cache key e TTLs",
      "Request Policy não existe",
      "Cache Policy é obsoleto"
    ],
    correctAnswer: 1,
    explanation: "Cache Policy: define o que incluir no cache key (query strings, headers, cookies) e TTLs (min, max, default). Request Policy: define o que encaminhar para origem (headers adicionais, query strings, cookies) mas que NÃO fazem parte do cache key. Separação permite flexibilidade e controle fino.",
    difficulty: 'hard',
    topic: 'Configuração Avançada'
  },
  {
    id: 79,
    question: "Como implementar canary deployment de Lambda@Edge functions?",
    options: [
      "Lambda@Edge não suporta canary",
      "Usar Lambda Versions com Aliases e weights para rotear % do tráfego",
      "Criar duas distribuições",
      "Apenas deployment all-at-once"
    ],
    correctAnswer: 1,
    explanation: "Publique nova versão da Lambda@Edge function, crie Alias com weights: 90% para versão antiga, 10% para nova. CloudFront roteia tráfego proporcionalmente. Monitore métricas da nova versão. Se estável, aumente peso gradualmente até 100%. Se houver problemas, reverta weights instantaneamente.",
    difficulty: 'hard',
    topic: 'DevOps Lambda@Edge'
  },
  {
    id: 80,
    question: "Uma empresa precisa servir conteúdo diferente para bots (crawlers) vs usuários reais. Como implementar?",
    options: [
      "CloudFront não detecta bots",
      "Usar CloudFront Functions ou Lambda@Edge para analisar User-Agent header e rotear",
      "Bloquear todos os bots",
      "Requer serviço terceiro"
    ],
    correctAnswer: 1,
    explanation: "Use CloudFront Functions (viewer-request): 1) Analisar header User-Agent, 2) Detectar bots conhecidos (Googlebot, Bingbot), 3) Adicionar header customizado (ex: X-Is-Bot: true), 4) Origem serve conteúdo otimizado para bots (sem JavaScript, HTML simples). Também pode cachear separadamente incluindo X-Is-Bot no cache key.",
    difficulty: 'hard',
    topic: 'SEO e User Detection'
  },

  // Bloco 5: Questões 81-100
  {
    id: 81,
    question: "Como configurar CloudFront para adicionar header de segurança Permissions-Policy (antes Feature-Policy)?",
    options: [
      "CloudFront não suporta esse header",
      "Usar Response Headers Policy para adicionar Permissions-Policy header",
      "Requer Lambda@Edge obrigatoriamente",
      "Configurar apenas na origem"
    ],
    correctAnswer: 1,
    explanation: "Use Response Headers Policy para adicionar Permissions-Policy header (ex: geolocation=(), microphone=(), camera=(self)). Controla quais features do browser podem ser usadas pela página. CloudFront adiciona automaticamente sem precisar modificar origem. Melhora privacidade e segurança.",
    difficulty: 'medium',
    topic: 'Segurança Headers'
  },
  {
    id: 82,
    question: "Uma aplicação usa CloudFront com origem em diferentes regiões (failover geográfico). Como implementar?",
    options: [
      "Criar distribuição por região",
      "Usar Origin Groups com primary em região A e secondary em região B",
      "CloudFront não suporta failover geográfico",
      "Requer Route 53 apenas"
    ],
    correctAnswer: 1,
    explanation: "Configure Origin Group: primary origin na região primária (ex: us-east-1 ALB), secondary na região de backup (ex: eu-west-1 ALB). Se primary falha (5xx, timeout), CloudFront automaticamente tenta secondary. Combine com Route 53 health checks para detectar falhas regionais.",
    difficulty: 'hard',
    topic: 'Disaster Recovery'
  },
  {
    id: 83,
    question: "Como CloudFront lida com o header ETag para cache validation?",
    options: [
      "CloudFront ignora ETag",
      "CloudFront usa ETag para validação condicional (If-None-Match) quando TTL expira",
      "ETag é removido automaticamente",
      "Requer configuração manual"
    ],
    correctAnswer: 1,
    explanation: "Quando TTL expira, CloudFront faz conditional request para origem com header If-None-Match contendo o ETag armazenado. Se conteúdo não mudou, origem retorna 304 Not Modified (sem body), CloudFront atualiza TTL e serve do cache. Economiza bandwidth e melhora performance.",
    difficulty: 'medium',
    topic: 'Cache Validation'
  },
  {
    id: 84,
    question: "Qual é o custo de data transfer entre CloudFront e S3 na mesma região?",
    options: [
      "$0.09 por GB",
      "GRATUITO (zero custo)",
      "$0.02 por GB",
      "Depende da classe de storage"
    ],
    correctAnswer: 1,
    explanation: "Data transfer do S3 para CloudFront na MESMA região AWS é 100% GRATUITO. Isso torna CloudFront extremamente econômico para servir conteúdo do S3. Você só paga pelo storage do S3, requests, e data transfer do CloudFront para internet (que é mais barato que S3 direto).",
    difficulty: 'easy',
    topic: 'Custos'
  },
  {
    id: 85,
    question: "Como implementar redirect de domínio antigo para novo domínio usando CloudFront?",
    options: [
      "Não é possível com CloudFront",
      "Usar CloudFront Functions para retornar 301 redirect com Location header",
      "Requer ALB obrigatoriamente",
      "Apenas Route 53 pode fazer isso"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Functions (viewer-request): detectar hostname (ex: old-domain.com), retornar response 301 com header Location: https://new-domain.com + path original. Executa em <1ms, sem custo de origem. Exemplo: redirecionar www → apex, http → https, domínios antigos para novos.",
    difficulty: 'medium',
    topic: 'Redirects e Migrações'
  },
  {
    id: 86,
    question: "Uma empresa detectou que cache hit ratio está baixo (30%). Quais são possíveis causas?",
    options: [
      "TTL muito longo",
      "Muitas variações de cache key (query strings, cookies, headers desnecessários)",
      "Muitos edge locations",
      "SSL/TLS habilitado"
    ],
    correctAnswer: 1,
    explanation: "Cache hit ratio baixo geralmente indica: 1) Cache key com muitas variações (query strings, cookies, headers desnecessários), 2) TTL muito curto, 3) Conteúdo dinâmico não cacheável, 4) Cache recém-criado (cold start). Solução: simplifique cache key, aumente TTL, use Query String whitelist ao invés de 'All'.",
    difficulty: 'hard',
    topic: 'Otimização de Cache'
  },
  {
    id: 87,
    question: "Como CloudFront lida com content negotiation baseado em Accept-Language header?",
    options: [
      "CloudFront não suporta",
      "Configure cache key para incluir Accept-Language header",
      "Automático sem configuração",
      "Apenas Lambda@Edge pode fazer"
    ],
    correctAnswer: 1,
    explanation: "Para servir conteúdo em idiomas diferentes, inclua Accept-Language header no cache key (Cache Policy). CloudFront criará cache entries separados para cada idioma (ex: en-US, pt-BR, es-ES). Origem deve retornar conteúdo correto baseado no header. Também aplica-se a Accept-Encoding (gzip, brotli).",
    difficulty: 'medium',
    topic: 'Internacionalização'
  },
  {
    id: 88,
    question: "Qual é a diferença entre CloudFront Viewer Protocol Policy 'Redirect HTTP to HTTPS' e 'HTTPS Only'?",
    options: [
      "São idênticos",
      "Redirect retorna 301/302; HTTPS Only bloqueia HTTP (connection refused)",
      "Redirect é mais seguro",
      "HTTPS Only não funciona"
    ],
    correctAnswer: 1,
    explanation: "Redirect HTTP to HTTPS: aceita requisições HTTP e retorna 301/302 redirect para HTTPS (usuário vê ambas requisições). HTTPS Only: CloudFront não escuta porta 80, requisições HTTP falham (connection refused). HSTS header força browsers a sempre usar HTTPS, prevenindo até primeira requisição HTTP.",
    difficulty: 'medium',
    topic: 'SSL/TLS'
  },
  {
    id: 89,
    question: "Como implementar IP whitelisting/blacklisting com CloudFront?",
    options: [
      "CloudFront não suporta",
      "Usar AWS WAF com IP Sets (Allow list ou Block list)",
      "Configurar no Security Group",
      "Apenas Lambda@Edge"
    ],
    correctAnswer: 1,
    explanation: "Integre AWS WAF ao CloudFront e crie IP Sets (listas de IPs ou CIDRs). Crie regras: 'Block' para blacklist ou 'Allow' + default Block para whitelist. WAF avalia antes de processar requisição. Também pode criar rate limiting por IP, geo-blocking, e regras complexas combinadas.",
    difficulty: 'easy',
    topic: 'Controle de Acesso'
  },
  {
    id: 90,
    question: "Uma aplicação precisa rastrear origem de tráfego (marketing campaigns). Como usar query strings com CloudFront sem reduzir cache efficiency?",
    options: [
      "Incluir todos query strings no cache key",
      "Usar Query String whitelist apenas para parâmetros que afetam conteúdo, ignorar tracking params",
      "Desabilitar cache",
      "Query strings sempre reduzem cache"
    ],
    correctAnswer: 1,
    explanation: "Configure Cache Policy com Query String Whitelist incluindo APENAS parâmetros que afetam conteúdo (ex: page, category). Tracking params (utm_source, utm_campaign) são encaminhados para origem (Request Policy) mas NÃO fazem parte do cache key. Origem registra analytics, CloudFront mantém cache efficiency alta.",
    difficulty: 'hard',
    topic: 'Analytics e Cache'
  },
  {
    id: 91,
    question: "Como CloudFront pode acelerar uploads de imagens para processamento?",
    options: [
      "CloudFront não otimiza uploads",
      "Usuário envia via POST para CloudFront, que usa rede AWS backbone para origem",
      "Usar apenas S3 Transfer Acceleration",
      "Uploads sempre são lentos"
    ],
    correctAnswer: 1,
    explanation: "Para uploads, usuário conecta à edge location CloudFront próxima (baixa latência), CloudFront transmite para origem via rede AWS backbone (otimizada, baixa latência). Especialmente útil para origens distantes geograficamente. Configure behavior para aceitar métodos POST/PUT.",
    difficulty: 'medium',
    topic: 'Upload Optimization'
  },
  {
    id: 92,
    question: "Como configurar CloudFront para servir erro customizado quando origem está em manutenção?",
    options: [
      "CloudFront não suporta",
      "Configurar Custom Error Response: 503 → S3 com página HTML de manutenção",
      "Desabilitar distribuição",
      "Apenas Route 53 pode fazer"
    ],
    correctAnswer: 1,
    explanation: "Configure Custom Error Response: quando origem retorna 503, CloudFront busca página customizada de S3 (ex: /maintenance.html) e retorna para usuário. Também pode configurar TTL do erro (ex: 5 minutos) para não sobrecarregar origem durante manutenção. Melhora UX com página branded.",
    difficulty: 'medium',
    topic: 'Manutenção e UX'
  },
  {
    id: 93,
    question: "Uma aplicação usa signed cookies do CloudFront. Qual é a vantagem sobre signed URLs?",
    options: [
      "São idênticos",
      "Signed cookies permitem acesso a múltiplos arquivos sem mudar URLs; signed URLs requerem URL por arquivo",
      "Signed URLs são mais seguros",
      "Cookies não funcionam com CloudFront"
    ],
    correctAnswer: 1,
    explanation: "Signed Cookies: define access policy em cookie, todos os arquivos matching o path pattern são acessíveis sem modificar URLs. Ideal para: streaming de vídeo (múltiplos segmentos), galerias de imagens, conteúdo com muitos arquivos. Signed URLs: proteção granular por arquivo, útil para downloads únicos.",
    difficulty: 'medium',
    topic: 'Controle de Acesso'
  },
  {
    id: 94,
    question: "Como CloudFront integra com AWS Certificate Manager (ACM) para certificados SSL?",
    options: [
      "Não integra",
      "ACM fornece certificados gratuitos válidos em us-east-1 para CloudFront, auto-renewal",
      "Requer compra de certificado",
      "Apenas certificados self-signed"
    ],
    correctAnswer: 1,
    explanation: "ACM oferece certificados SSL/TLS GRATUITOS com auto-renewal. Para CloudFront, certificado DEVE estar em us-east-1. Suporta: domínios únicos, wildcards (*.example.com), e multi-domain (SAN). CloudFront renova automaticamente antes de expirar. Também pode importar certificados de terceiros.",
    difficulty: 'easy',
    topic: 'SSL/TLS'
  },
  {
    id: 95,
    question: "Uma empresa quer bloquear acesso a conteúdo de países específicos. Qual é a forma mais eficiente?",
    options: [
      "WAF com IP blocking",
      "CloudFront Geographic Restrictions (Geo-Blocking)",
      "Lambda@Edge analisando header CloudFront-Viewer-Country",
      "Não é possível"
    ],
    correctAnswer: 1,
    explanation: "CloudFront Geographic Restrictions (Whitelist ou Blacklist de países) é a forma mais eficiente e de menor custo. CloudFront bloqueia no edge antes de processar (retorna 403). Alternativa: WAF com regras geo-matching oferece mais flexibilidade (ex: bloquear país A mas permitir para IP específico).",
    difficulty: 'easy',
    topic: 'Geo-Blocking'
  },
  {
    id: 96,
    question: "Como implementar cache warming/preloading em CloudFront antes de lançamento?",
    options: [
      "Não é possível",
      "Scripts que fazem requisições aos URLs principais de múltiplas edge locations",
      "CloudFront preenche cache automaticamente",
      "Apenas manualmente"
    ],
    correctAnswer: 1,
    explanation: "Cache warming: use scripts (ex: curl, wget) para fazer requisições a URLs críticos de IPs em diferentes regiões geográficas. Isso força edge locations a buscar conteúdo da origem e popular cache. Útil antes de: launches, Black Friday, campanhas virais. Minimize latência para primeiros usuários.",
    difficulty: 'hard',
    topic: 'Performance Optimization'
  },
  {
    id: 97,
    question: "Como CloudFront pode reduzir latência de APIs que fazem múltiplas chamadas à origem?",
    options: [
      "CloudFront não ajuda APIs",
      "Cache de responses de API + keep-alive connections para origem reduzem latência",
      "APIs sempre são lentas",
      "Requer ElastiCache"
    ],
    correctAnswer: 1,
    explanation: "CloudFront mantém conexões keep-alive persistentes com origem (connection pooling), eliminando overhead de handshake TCP/TLS repetidos. Combine com cache de API responses (GET idempotent), TTL adequado, e Origin Shield. Para POST/PUT, connection pooling sozinho já reduz latência significativamente.",
    difficulty: 'medium',
    topic: 'API Performance'
  },
  {
    id: 98,
    question: "Como depurar por que CloudFront não está cacheando conteúdo esperado?",
    options: [
      "Impossível depurar",
      "Analisar headers X-Cache e Cache-Control na response, verificar logs",
      "CloudFront sempre cacheia tudo",
      "Desabilitar distribuição"
    ],
    correctAnswer: 1,
    explanation: "Debugging: 1) Checar header X-Cache (Hit/Miss from cloudfront), 2) Analisar Cache-Control ou Expires da origem, 3) Verificar behavior settings (TTL, cache key), 4) CloudFront logs mostram result-type (Hit, Miss, Error), 5) Testar com curl incluindo todos headers. Causas comuns: origem envia Cache-Control: no-cache/no-store.",
    difficulty: 'medium',
    topic: 'Troubleshooting'
  },
  {
    id: 99,
    question: "Uma aplicação precisa servir arquivos grandes (vídeos 5-10 GB). Qual configuração otimiza downloads?",
    options: [
      "Desabilitar cache",
      "Habilitar Range Requests, cache com TTL longo, comprimir quando possível",
      "Reduzir TTL",
      "Usar apenas S3"
    ],
    correctAnswer: 1,
    explanation: "Para arquivos grandes: 1) Habilite Range Requests (permite resumir downloads), 2) Configure TTL longo (arquivos grandes raramente mudam), 3) CloudFront cacheia por ranges, 4) Comprimir se aplicável (menos efetivo para vídeos já comprimidos), 5) Use Origin Shield para proteger origem de múltiplas requisições.",
    difficulty: 'medium',
    topic: 'Large Files'
  },
  {
    id: 100,
    question: "Qual é a melhor prática para estruturar behaviors em uma distribuição CloudFront complexa?",
    options: [
      "Criar apenas behavior default",
      "Behaviors mais específicos primeiro (ordem de precedência), default behavior por último",
      "Ordem não importa",
      "Máximo de 2 behaviors"
    ],
    correctAnswer: 1,
    explanation: "Best practice: organize behaviors do mais específico para menos específico. CloudFront avalia em ordem de precedência definida. Exemplo: 1) /api/v2/* (cache 5min), 2) /api/* (cache 1min), 3) /images/* (cache 1 ano, S3 origin), 4) /* default (cache 1h, ALB origin). Último behavior sempre é default (path pattern *).",
    difficulty: 'medium',
    topic: 'Best Practices'
  }
];

// Estatísticas do banco
export const cloudFrontStats = {
  totalQuestions: 100, // Meta final
  currentQuestions: 20, // Bloco atual
  blocks: {
    block1: { range: '1-20', status: 'completed' },
    block2: { range: '21-40', status: 'pending' },
    block3: { range: '41-60', status: 'pending' },
    block4: { range: '61-80', status: 'pending' },
    block5: { range: '81-100', status: 'pending' }
  },
  topics: [
    'Conceitos Básicos',
    'Integração S3',
    'Cache Management',
    'Segurança',
    'Performance',
    'Headers e Metadata',
    'Custos',
    'Alta Disponibilidade',
    'Protocolos',
    'Computação Edge',
    'Comparações'
  ]
};
