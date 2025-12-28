import React from 'react';
import { Cloud, Globe, HardDrive, Server, Database, Network, Lock, Activity, Cpu, Users, Play, Home } from 'lucide-react';
import { AWSServiceBox } from './AWSServiceBox';
import { Arrow } from './Arrow';

interface PractitionerDiagramProps {
  selectedService: string | null;
  onServiceClick: (serviceId: string) => void;
  onBack: () => void;
  onGoToSimulator: () => void;
}

export function PractitionerDiagram({
  selectedService,
  onServiceClick,
  onBack,
  onGoToSimulator
}: PractitionerDiagramProps) {
  const handleStartTour = () => {
    onServiceClick('user-browser');
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Voltar ao Início</span>
          </button>
          <button
            onClick={onGoToSimulator}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <span className="hidden sm:inline">Ir para Simulador</span>
            <span className="sm:hidden">Simulador</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Cloud className="text-blue-600" size={36} strokeWidth={2} />
          <h1 className="text-gray-900 text-xl md:text-3xl">
            AWS Cloud Practitioner - Fundamentos AWS
          </h1>
        </div>
        <p className="text-gray-600 text-sm md:text-lg mb-4">
          Conceitos básicos de computação em nuvem e serviços AWS
        </p>
        <button
          onClick={handleStartTour}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
        >
          <Play size={20} />
          Iniciar Tour Guiado
        </button>
      </div>

      {/* Simplified Practitioner Flow */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* User */}
        <AWSServiceBox
          title="Cliente / Usuário"
          description={['Acesso via navegador ou app']}
          icon={<Users size={28} />}
          color="bg-gradient-to-r from-blue-50 to-blue-100"
          onClick={() => onServiceClick('user-browser')}
          isHighlighted={selectedService === 'user-browser'}
          serviceId="user-browser"
        />

        <Arrow />

        {/* Route 53 */}
        <AWSServiceBox
          title="Amazon Route 53"
          description={['DNS gerenciado', 'Roteamento de tráfego']}
          icon={<Globe size={28} />}
          color="bg-white"
          onClick={() => onServiceClick('route53')}
          isHighlighted={selectedService === 'route53'}
          serviceId="route53"
        />

        <Arrow />

        {/* CloudFront */}
        <AWSServiceBox
          title="Amazon CloudFront"
          description={['CDN global', 'Cache de conteúdo']}
          icon={<Cloud size={28} />}
          color="bg-white"
          onClick={() => onServiceClick('cloudfront')}
          isHighlighted={selectedService === 'cloudfront'}
          serviceId="cloudfront"
        />

        <Arrow />

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AWSServiceBox
            title="Amazon S3"
            description={['Armazenamento de objetos', 'Escalável e durável']}
            icon={<HardDrive size={24} />}
            color="bg-white"
            onClick={() => onServiceClick('s3')}
            isHighlighted={selectedService === 's3'}
            serviceId="s3"
          />
          <AWSServiceBox
            title="Amazon EC2"
            description={['Servidores virtuais', 'Computação escalável']}
            icon={<Server size={24} />}
            color="bg-white"
            onClick={() => onServiceClick('ec2')}
            isHighlighted={selectedService === 'ec2'}
            serviceId="ec2"
          />
        </div>

        <Arrow />

        {/* Database & Networking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AWSServiceBox
            title="Amazon RDS"
            description={['Banco de dados gerenciado', 'Multi-AZ']}
            icon={<Database size={24} />}
            color="bg-white"
            onClick={() => onServiceClick('rds')}
            isHighlighted={selectedService === 'rds'}
            serviceId="rds"
          />
          <AWSServiceBox
            title="Amazon VPC"
            description={['Rede virtual isolada', 'Controle de tráfego']}
            icon={<Network size={24} />}
            color="bg-white"
            onClick={() => onServiceClick('vpc')}
            isHighlighted={selectedService === 'vpc'}
            serviceId="vpc"
          />
        </div>

        {/* Core Services */}
        <div className="mt-6 md:mt-8 lg:mt-12">
          <h2 className="text-center text-gray-700 mb-3 md:mb-4 lg:mb-6 text-sm md:text-base lg:text-lg font-bold">Serviços Fundamentais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
            <AWSServiceBox
              title="AWS IAM"
              description={['Identidade e acesso', 'Usuários e permissões']}
              icon={<Lock size={20} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('iam')}
              isHighlighted={selectedService === 'iam'}
              serviceId="iam"
            />
            <AWSServiceBox
              title="Amazon CloudWatch"
              description={['Monitoramento', 'Logs e métricas']}
              icon={<Activity size={20} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('cloudwatch')}
              isHighlighted={selectedService === 'cloudwatch'}
              serviceId="cloudwatch"
            />
            <AWSServiceBox
              title="AWS Lambda"
              description={['Computação serverless', 'Execução sob demanda']}
              icon={<Cpu size={20} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('lambda')}
              isHighlighted={selectedService === 'lambda'}
              serviceId="lambda"
            />
          </div>
        </div>

        {/* Cloud Benefits Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 md:p-8 text-white shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Benefícios da Nuvem AWS</h2>
            <p className="text-blue-100">Principais vantagens da computação em nuvem</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">💰 Economia</h3>
              <p className="text-sm text-blue-100">CAPEX → OPEX, pague apenas pelo uso</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">📈 Escalabilidade</h3>
              <p className="text-sm text-blue-100">Aumente ou diminua recursos rapidamente</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">🌍 Global</h3>
              <p className="text-sm text-blue-100">Alcance mundial com baixa latência</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">🔒 Segurança</h3>
              <p className="text-sm text-blue-100">Conformidade e proteção de dados</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">⚡ Agilidade</h3>
              <p className="text-sm text-blue-100">Deploy rápido de recursos</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-bold mb-2">🚀 Inovação</h3>
              <p className="text-sm text-blue-100">Acesso a tecnologias avançadas</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
