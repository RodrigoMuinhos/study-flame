export type CertificationType = 'architect' | 'practitioner';

export interface Certification {
  id: CertificationType;
  name: string;
  fullName: string;
  color: string;
  passingScore: number;
  examDuration: number;
  questionCount: number;
}

export const certifications: Record<CertificationType, Certification> = {
  architect: {
    id: 'architect',
    name: 'SAA-C03',
    fullName: 'AWS Certified Solutions Architect - Associate',
    color: 'orange',
    passingScore: 72,
    examDuration: 130,
    questionCount: 65
  },
  practitioner: {
    id: 'practitioner',
    name: 'CLF-C02',
    fullName: 'AWS Certified Cloud Practitioner',
    color: 'blue',
    passingScore: 70,
    examDuration: 90,
    questionCount: 65
  }
};
