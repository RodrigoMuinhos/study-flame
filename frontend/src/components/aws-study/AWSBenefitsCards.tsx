import React, { useState } from 'react';
import { DollarSign, TrendingUp, Globe, Lock, Zap, Lightbulb, X, BookOpen } from 'lucide-react';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  detailedInfo: {
    subtitle: string;
    whatIs: string;
    keyPoints: string[];
    realWorldExample: {
      scenario: string;
      details: string[];
      impact: string;
    };
    awsServices: string[];
  };
}

const benefits: Benefit[] = [
  {
    id: 'economia',
    icon: <DollarSign size={28} />,
    title: 'Economia',
    description: 'CAPEX → OPEX, pague apenas pelo uso',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Modelo de pagamento sob demanda',
      whatIs: 'A AWS transforma investimentos fixos em custos variáveis. Ao invés de comprar servidores caros antecipadamente (CAPEX), você paga apenas pelos recursos que realmente usa (OPEX).',
      keyPoints: [
        'Sem custos iniciais de infraestrutura',
        'Pagamento por hora ou por segundo de uso',
        'Descontos progressivos por volume',
        'Economia de escala da AWS repassada aos clientes',
        'Eliminação de custos com manutenção de hardware',
        'Previsibilidade de custos com AWS Cost Explorer'
      ],
      realWorldExample: {
        scenario: 'Startup de e-commerce com tráfego sazonal',
        details: [
          'Infraestrutura on-premises custaria R$ 500.000 iniciais',
          'Com AWS, começa com R$ 500/mês',
          'Black Friday: escala automaticamente para R$ 5.000/mês',
          'Janeiro (baixa temporada): volta para R$ 800/mês',
          'Economia de 70% comparado ao modelo tradicional'
        ],
        impact: 'A empresa economizou R$ 480.000 no primeiro ano e pode investir esse capital em marketing e desenvolvimento de produto.'
      },
      awsServices: [
        'AWS Cost Explorer - Análise de custos',
        'AWS Budgets - Alertas de orçamento',
        'Savings Plans - Descontos para compromissos',
        'Reserved Instances - Economia até 75%'
      ]
    }
  },
  {
    id: 'escalabilidade',
    icon: <TrendingUp size={28} />,
    title: 'Escalabilidade',
    description: 'Aumente ou diminua recursos rapidamente',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Elasticidade automática de recursos',
      whatIs: 'Escalabilidade é a capacidade de aumentar ou reduzir recursos de TI conforme a demanda, mantendo performance sem desperdício.',
      keyPoints: [
        'Auto Scaling automático baseado em métricas',
        'Escala vertical (mais CPU/RAM) e horizontal (mais instâncias)',
        'Tempo de provisionamento em minutos, não meses',
        'Adaptação instantânea a picos de tráfego',
        'Redução automática em períodos de baixa demanda',
        'Elasticidade em todos os serviços (compute, storage, database)'
      ],
      realWorldExample: {
        scenario: 'Plataforma de streaming durante lançamento de série',
        details: [
          'Operação normal: 100 servidores EC2',
          'Lançamento episódio novo: pico de 10x de acessos',
          'Auto Scaling adiciona 900 instâncias em 5 minutos',
          'CloudFront (CDN) distribui carga globalmente',
          'Após 2 horas, volta para 150 instâncias automaticamente'
        ],
        impact: 'Zero downtime durante o lançamento. Satisfação de 99.9% dos usuários. Custos otimizados automaticamente.'
      },
      awsServices: [
        'EC2 Auto Scaling - Ajuste automático de instâncias',
        'ELB - Distribui tráfego uniformemente',
        'CloudWatch - Monitora métricas para escalar',
        'Lambda - Escala automaticamente por requisição'
      ]
    }
  },
  {
    id: 'global',
    icon: <Globe size={28} />,
    title: 'Global',
    description: 'Alcance mundial com baixa latência',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Presença em todos os continentes',
      whatIs: 'A AWS opera 33+ regiões geográficas e 105+ zonas de disponibilidade ao redor do mundo, permitindo deploy global em minutos.',
      keyPoints: [
        '33 regiões AWS distribuídas globalmente',
        '450+ pontos de presença (edge locations)',
        'Latência ultra-baixa com CloudFront CDN',
        'Redundância geográfica automática',
        'Conformidade com leis locais (LGPD, GDPR)',
        'Deploy multi-região com um clique'
      ],
      realWorldExample: {
        scenario: 'Fintech brasileira expandindo para América Latina',
        details: [
          'Região principal: São Paulo (sa-east-1)',
          'Expande para Argentina, Chile e México em 1 dia',
          'Route 53 direciona usuários para região mais próxima',
          'CloudFront reduz latência de 800ms para 50ms',
          'Dados sensíveis ficam na região local (conformidade)'
        ],
        impact: 'Expansão internacional que levaria 6 meses foi concluída em 1 semana. Latência 16x menor para usuários internacionais.'
      },
      awsServices: [
        'CloudFront - CDN global com 450+ edge locations',
        'Route 53 - DNS com roteamento geográfico',
        'Global Accelerator - Performance de rede otimizada',
        'Multi-Region - Deploy em múltiplas regiões'
      ]
    }
  },
  {
    id: 'seguranca',
    icon: <Lock size={28} />,
    title: 'Segurança',
    description: 'Conformidade e proteção de dados',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Segurança em todas as camadas',
      whatIs: 'A AWS possui as certificações mais rigorosas do mercado (SOC, ISO, PCI-DSS) e oferece ferramentas para proteger dados, identidades e redes.',
      keyPoints: [
        'Criptografia em repouso e em trânsito',
        'IAM: controle granular de permissões',
        'Auditoria completa com CloudTrail',
        '98+ certificações de conformidade',
        'DDoS protection incluída (Shield)',
        'Detecção de ameaças com GuardDuty'
      ],
      realWorldExample: {
        scenario: 'Hospital implementando prontuário eletrônico (LGPD/HIPAA)',
        details: [
          'Dados criptografados com KMS (chaves gerenciadas)',
          'IAM com MFA obrigatório para todos os acessos',
          'CloudTrail registra TODAS as ações (auditoria)',
          'VPC isolada sem acesso à internet pública',
          'Backup automático criptografado cross-region'
        ],
        impact: 'Certificação LGPD obtida em 3 meses. Zero incidentes de segurança em 2 anos. Auditoria passa em 100% dos requisitos.'
      },
      awsServices: [
        'IAM - Gerenciamento de identidades',
        'KMS - Criptografia de dados',
        'GuardDuty - Detecção de ameaças',
        'Security Hub - Visão unificada de segurança'
      ]
    }
  },
  {
    id: 'agilidade',
    icon: <Zap size={28} />,
    title: 'Agilidade',
    description: 'Deploy rápido de recursos',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Velocidade do laboratório à produção',
      whatIs: 'Agilidade é a capacidade de experimentar, testar e lançar rapidamente. O que levava meses agora leva minutos.',
      keyPoints: [
        'Provisionamento de recursos em segundos',
        'Infraestrutura como código (CloudFormation)',
        'CI/CD nativo com CodePipeline',
        'Ambientes de teste/produção idênticos',
        'Rollback instantâneo em caso de falha',
        'Iteração rápida sem burocracia'
      ],
      realWorldExample: {
        scenario: 'Equipe de desenvolvimento testando nova arquitetura',
        details: [
          'Segunda 9h: ideia de nova feature com microserviços',
          'Segunda 10h: ambiente completo provisionado (ECS + RDS)',
          'Segunda-Quarta: desenvolvimento e testes',
          'Quinta: deploy em produção com CodePipeline',
          'Sexta: rollback de 1 feature problemática em 2 minutos'
        ],
        impact: 'Ciclo de desenvolvimento reduzido de 3 meses para 1 semana. 5x mais experimentos = 5x mais inovação.'
      },
      awsServices: [
        'CloudFormation - Infraestrutura como código',
        'CodePipeline - CI/CD automatizado',
        'Elastic Beanstalk - Deploy simplificado',
        'SAM - Serverless em minutos'
      ]
    }
  },
  {
    id: 'inovacao',
    icon: <Lightbulb size={28} />,
    title: 'Inovação',
    description: 'Acesso a tecnologias avançadas',
    gradient: 'from-blue-500 to-blue-600',
    detailedInfo: {
      subtitle: 'Tecnologias de ponta democratizadas',
      whatIs: 'A AWS investe bilhões em P&D e disponibiliza tecnologias avançadas (IA, ML, IoT, Blockchain) sem necessidade de expertise profunda.',
      keyPoints: [
        'Machine Learning com SageMaker',
        'IA generativa com Bedrock',
        'Análise de dados com Athena e Redshift',
        'IoT em escala com AWS IoT Core',
        'Quantum computing com Braket',
        'APIs prontas de visão, voz e linguagem'
      ],
      realWorldExample: {
        scenario: 'Varejo implementando recomendação de produtos com IA',
        details: [
          'Antes: equipe de ML própria custaria R$ 2M/ano',
          'Com AWS: SageMaker + Personalize prontos para uso',
          'Integração completa em 2 semanas',
          'Modelo de recomendação treinado com dados históricos',
          'Aumento de 35% em conversão de vendas'
        ],
        impact: 'Economia de R$ 1.8M/ano em equipe especializada. Implementação 10x mais rápida. ROI positivo em 3 meses.'
      },
      awsServices: [
        'SageMaker - Plataforma completa de ML',
        'Rekognition - Análise de imagens/vídeos',
        'Comprehend - Processamento de linguagem natural',
        'Bedrock - IA generativa (GPT, Claude, etc.)'
      ]
    }
  }
];

export function AWSBenefitsCards() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div 
        onClick={() => window.open('https://docs.aws.amazon.com/pt_br/', '_blank')}
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl mb-6 sm:mb-8 overflow-hidden cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 break-words">
              Benefícios da Nuvem AWS
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-50 break-words">
              Principais vantagens da computação em nuvem
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
            <BookOpen size={20} />
            <span className="text-sm font-semibold">Documentação AWS</span>
          </div>
        </div>
      </div>

      {/* Benefits Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            onClick={() => setSelectedBenefit(benefit)}
            className="bg-gradient-to-br from-blue-500/90 to-blue-600/90 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden"
          >
            {/* Icon */}
            <div className="mb-3 sm:mb-4 text-blue-100 group-hover:text-white transition-colors">
              {benefit.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 break-words">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-blue-50 leading-relaxed break-words">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Globe className="text-white" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2 break-words">
              Por que escolher AWS?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
              A Amazon Web Services é a plataforma de nuvem mais abrangente e amplamente adotada do mundo, 
              oferecendo mais de 200 serviços completos de data centers em todo o mundo. 
              Milhões de clientes confiam na AWS para reduzir custos, aumentar a agilidade e inovar mais rapidamente.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedBenefit && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
            onClick={() => setSelectedBenefit(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedBenefit.gradient} p-6 md:p-8 text-white relative`}>
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex items-start gap-4 pr-12">
                  <div className="text-white/90">
                    {selectedBenefit.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedBenefit.title}</h2>
                    <p className="text-lg text-blue-50">{selectedBenefit.detailedInfo.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* O que é */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">O que é</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedBenefit.detailedInfo.whatIs}</p>
                </section>

                {/* Pontos-chave */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Pontos-chave</h3>
                  <ul className="space-y-2">
                    {selectedBenefit.detailedInfo.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Exemplo real */}
                <section className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Caso Real</h3>
                  <p className="text-gray-800 font-semibold mb-3">{selectedBenefit.detailedInfo.realWorldExample.scenario}</p>
                  <ul className="space-y-2 mb-4">
                    {selectedBenefit.detailedInfo.realWorldExample.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white rounded-lg p-4 border border-orange-300">
                    <p className="text-gray-800 italic"><strong>Impacto:</strong> {selectedBenefit.detailedInfo.realWorldExample.impact}</p>
                  </div>
                </section>

                {/* Serviços AWS */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Serviços AWS relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedBenefit.detailedInfo.awsServices.map((service, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-gray-800">{service}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
