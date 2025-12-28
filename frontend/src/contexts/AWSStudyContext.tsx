"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CertificationType, certifications, Certification } from '@/types/certifications';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  cpf: string;
  expiresAt: string;
  daysUntilExpiration: number;
}

interface AWSStudyContextType {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  hasAccess: boolean;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
  currentCertification: CertificationType;
  certification: Certification;
  setCertification: (cert: CertificationType) => void;
}

const AWSStudyContext = createContext<AWSStudyContextType | undefined>(undefined);

const AWS_STUDY_TOKEN = 'aws-study-2024';

export function AWSStudyProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<CertificationType>('architect');

  // Carregar token, userInfo e certificação do localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('awsStudyToken');
    if (storedToken) {
      setTokenState(storedToken);
    }

    const storedUserInfo = localStorage.getItem('awsStudyUserInfo');
    if (storedUserInfo) {
      try {
        setUserInfoState(JSON.parse(storedUserInfo));
      } catch (e) {
        console.error('Erro ao carregar userInfo:', e);
      }
    }

    const savedCert = localStorage.getItem('selected-certification') as CertificationType;
    if (savedCert && certifications[savedCert]) {
      setCurrentCertification(savedCert);
    }
    
    setIsLoaded(true);
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem('awsStudyToken', newToken);
  };

  const clearToken = () => {
    setTokenState(null);
    localStorage.removeItem('awsStudyToken');
  };

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
    localStorage.setItem('awsStudyUserInfo', JSON.stringify(info));
  };

  const clearUserInfo = () => {
    setUserInfoState(null);
    localStorage.removeItem('awsStudyUserInfo');
  };

  const setCertification = (cert: CertificationType) => {
    setCurrentCertification(cert);
    localStorage.setItem('selected-certification', cert);
  };

  const hasAccess = isLoaded && token !== null;
  const certification = certifications[currentCertification];

  return (
    <AWSStudyContext.Provider
      value={{
        token,
        setToken,
        clearToken,
        hasAccess,
        userInfo,
        setUserInfo,
        clearUserInfo,
        currentCertification,
        certification,
        setCertification,
      }}
    >
      {children}
    </AWSStudyContext.Provider>
  );
}

export function useAWSStudy() {
  const context = useContext(AWSStudyContext);
  if (context === undefined) {
    throw new Error('useAWSStudy must be used within AWSStudyProvider');
  }
  return context;
}

// Alias para compatibilidade com componentes do AWSFIGMA
export function useCertification() {
  const context = useContext(AWSStudyContext);
  if (context === undefined) {
    throw new Error('useCertification must be used within AWSStudyProvider');
  }
  return {
    currentCertification: context.currentCertification,
    certification: context.certification,
    setCertification: context.setCertification,
  };
}

export { AWS_STUDY_TOKEN };
