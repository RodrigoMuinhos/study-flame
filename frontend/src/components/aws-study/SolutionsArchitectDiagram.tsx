import React from 'react';
import { 
  Cloud, Globe, HardDrive, Server, Database, Network, Shield, Lock, 
  Bell, Activity, Users, Layers, GitBranch, Box, Cpu, ArrowDown, 
  Workflow, Play, Home 
} from 'lucide-react';
import { AWSServiceBox } from './AWSServiceBox';
import { Arrow } from './Arrow';
import { VPCContainer } from './VPCContainer';
import { SubnetColumn } from './SubnetColumn';

interface SolutionsArchitectDiagramProps {
  selectedService: string | null;
  onServiceClick: (serviceId: string) => void;
  onBack: () => void;
  onGoToSimulator: () => void;
}

export function SolutionsArchitectDiagram({
  selectedService,
  onServiceClick,
  onBack,
  onGoToSimulator
}: SolutionsArchitectDiagramProps) {
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
          <Cloud className="text-orange-600" size={36} strokeWidth={2} />
          <h1 className="text-gray-900 text-xl md:text-3xl">
            AWS Architecture – Solutions Architect Reference
          </h1>
        </div>
        <p className="text-gray-600 text-sm md:text-lg mb-4">
          Infraestrutura escalável, segura e altamente disponível
        </p>
        <button
          onClick={handleStartTour}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium"
        >
          <Play size={20} />
          Iniciar Tour Guiado
        </button>
      </div>

      {/* Main Flow - Solutions Architect */}
      <div className="max-w-4xl mx-auto">
        {/* User */}
        <AWSServiceBox
          title="Usuário / Browser"
          icon={<Users size={28} />}
          color="bg-gradient-to-r from-purple-50 to-purple-100"
          onClick={() => onServiceClick('user-browser')}
          isHighlighted={selectedService === 'user-browser'}
          serviceId="user-browser"
        />

        <Arrow />

        {/* Route 53 */}
        <AWSServiceBox
          title="Amazon Route 53 (DNS)"
          description={[
            'Resolução de domínio',
            'Roteamento altamente disponível'
          ]}
          icon={<Globe size={28} />}
          color="bg-white"
          onClick={() => onServiceClick('route53')}
          isHighlighted={selectedService === 'route53'}
          serviceId="route53"
        />

        <Arrow />

        {/* CloudFront */}
        <AWSServiceBox
          title="Amazon CloudFront (CDN)"
          description={[
            'Cache em edge locations',
            'Redução de latência'
          ]}
          icon={<Cloud size={28} />}
          color="bg-white"
          onClick={() => onServiceClick('cloudfront')}
          isHighlighted={selectedService === 'cloudfront'}
          serviceId="cloudfront"
        />

        {/* Two Origins from CloudFront */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
          <div className="flex flex-col items-center">
            <ArrowDown className="text-gray-500 mb-3 md:mb-4" size={24} strokeWidth={2.5} />
            <AWSServiceBox
              title="Amazon S3 (Static Frontend)"
              description={[
                'Frontend estático',
                'Assets e arquivos'
              ]}
              icon={<HardDrive size={24} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('s3')}
              isHighlighted={selectedService === 's3'}
              serviceId="s3"
            />
          </div>
          <div className="flex flex-col items-center">
            <ArrowDown className="text-gray-500 mb-3 md:mb-4" size={24} strokeWidth={2.5} />
            <AWSServiceBox
              title="Application Load Balancer (ALB)"
              description={[
                'Entrada da API',
                'HTTP / HTTPS'
              ]}
              icon={<Network size={24} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('alb')}
              isHighlighted={selectedService === 'alb'}
              serviceId="alb"
            />
          </div>
        </div>

        {/* VPC Container */}
        <VPCContainer
          onClick={() => onServiceClick('vpc')}
          isHighlighted={selectedService === 'vpc'}
          serviceId="vpc"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Public Subnet */}
            <SubnetColumn 
              title="PUBLIC SUBNET" 
              color="bg-green-50"
              onClick={() => onServiceClick('public-subnet')}
              isHighlighted={selectedService === 'public-subnet'}
              serviceId="public-subnet"
            >
              <div className="flex flex-col items-center">
                <AWSServiceBox
                  title="Application Load Balancer (ALB)"
                  description={[
                    'Balanceamento de carga (Layer 7)',
                    'Health Checks'
                  ]}
                  icon={<Network size={20} />}
                  color="bg-white"
                  variant="compact"
                  onClick={() => onServiceClick('alb')}
                  isHighlighted={selectedService === 'alb'}
                  serviceId="alb-vpc"
                />
              </div>
            </SubnetColumn>

            {/* Private Subnet */}
            <SubnetColumn 
              title="PRIVATE SUBNET" 
              color="bg-amber-50"
              onClick={() => onServiceClick('private-subnet')}
              isHighlighted={selectedService === 'private-subnet'}
              serviceId="private-subnet"
            >
              <div className="flex flex-col items-center space-y-2 md:space-y-3">
                <AWSServiceBox
                  title="Auto Scaling Group (Multi-AZ)"
                  description={['Escalabilidade automática']}
                  icon={<Layers size={20} />}
                  color="bg-white"
                  variant="compact"
                  onClick={() => onServiceClick('auto-scaling')}
                  isHighlighted={selectedService === 'auto-scaling'}
                  serviceId="auto-scaling"
                />
                <AWSServiceBox
                  title="Amazon EC2 Instances"
                  description={[
                    'Backend / API',
                    'Serviços internos'
                  ]}
                  icon={<Server size={20} />}
                  color="bg-white"
                  variant="compact"
                  onClick={() => onServiceClick('ec2')}
                  isHighlighted={selectedService === 'ec2'}
                  serviceId="ec2"
                />
                <AWSServiceBox
                  title="Amazon SQS"
                  description={[
                    'Mensageria assíncrona',
                    'Desacoplamento de sistemas'
                  ]}
                  icon={<GitBranch size={20} />}
                  color="bg-white"
                  variant="compact"
                  onClick={() => onServiceClick('sqs')}
                  isHighlighted={selectedService === 'sqs'}
                  serviceId="sqs"
                />
              </div>
            </SubnetColumn>

            {/* Isolated Subnet */}
            <SubnetColumn 
              title="ISOLATED SUBNET" 
              color="bg-red-50"
              onClick={() => onServiceClick('isolated-subnet')}
              isHighlighted={selectedService === 'isolated-subnet'}
              serviceId="isolated-subnet"
            >
              <div className="flex flex-col items-center">
                <AWSServiceBox
                  title="Amazon RDS (Multi-AZ)"
                  description={[
                    'Banco relacional gerenciado',
                    'Primary / Standby',
                    'Failover automático'
                  ]}
                  icon={<Database size={20} />}
                  color="bg-white"
                  variant="compact"
                  onClick={() => onServiceClick('rds')}
                  isHighlighted={selectedService === 'rds'}
                  serviceId="rds"
                />
              </div>
            </SubnetColumn>
          </div>
        </VPCContainer>

        {/* Cross-cutting Concerns */}
        <div className="mt-6 md:mt-8 lg:mt-12 mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-center text-gray-700 mb-3 md:mb-4 lg:mb-6 text-sm md:text-base lg:text-lg">Serviços Transversais</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            <AWSServiceBox
              title="IAM"
              description={['Identidade e acesso']}
              icon={<Lock size={18} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('iam')}
              isHighlighted={selectedService === 'iam'}
              serviceId="iam"
            />
            <AWSServiceBox
              title="IAM Role"
              description={['Permissões temporárias']}
              icon={<Shield size={18} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('iam-role')}
              isHighlighted={selectedService === 'iam-role'}
              serviceId="iam-role"
            />
            <AWSServiceBox
              title="Security Groups"
              description={['Firewall de instância']}
              icon={<Shield size={18} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('security-groups')}
              isHighlighted={selectedService === 'security-groups'}
              serviceId="security-groups"
            />
            <AWSServiceBox
              title="Amazon SNS"
              description={['Notificações']}
              icon={<Bell size={18} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('sns')}
              isHighlighted={selectedService === 'sns'}
              serviceId="sns"
            />
            <AWSServiceBox
              title="CloudWatch"
              description={['Logs e métricas']}
              icon={<Activity size={18} />}
              color="bg-white"
              variant="compact"
              onClick={() => onServiceClick('cloudwatch')}
              isHighlighted={selectedService === 'cloudwatch'}
              serviceId="cloudwatch"
            />
          </div>
        </div>

        {/* Well-Architected Framework Footer */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 md:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 mb-4 md:mb-6 justify-center">
            <Box size={28} />
            <h2 className="text-lg md:text-2xl text-center sm:text-left">AWS Well-Architected Framework</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="text-center">
              <Shield size={28} className="mx-auto mb-2" />
              <h3 className="text-xs md:text-sm mb-1">Segurança</h3>
              <p className="text-xs opacity-90 hidden sm:block">Proteção de dados</p>
            </div>
            <div className="text-center">
              <Activity size={28} className="mx-auto mb-2" />
              <h3 className="text-xs md:text-sm mb-1">Confiabilidade</h3>
              <p className="text-xs opacity-90 hidden sm:block">Disponibilidade</p>
            </div>
            <div className="text-center">
              <Cpu size={28} className="mx-auto mb-2" />
              <h3 className="text-xs md:text-sm mb-1">Performance</h3>
              <p className="text-xs opacity-90 hidden sm:block">Recursos eficientes</p>
            </div>
            <div className="text-center">
              <Workflow size={28} className="mx-auto mb-2" />
              <h3 className="text-xs md:text-sm mb-1">Custos</h3>
              <p className="text-xs opacity-90 hidden sm:block">Otimização</p>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <Layers size={28} className="mx-auto mb-2" />
              <h3 className="text-xs md:text-sm mb-1">Operacional</h3>
              <p className="text-xs opacity-90 hidden sm:block">Melhoria contínua</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
