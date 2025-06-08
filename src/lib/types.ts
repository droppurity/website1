import type { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  name: string;
  icon?: LucideIcon | React.ElementType;
  description?: string;
}

export interface Plan {
  id: string;
  name: string;
  pricePerMonth: number;
  limits: string;
  savings?: string; // This might be calculated dynamically
  features: string[];
  recommended?: boolean;
  pillText?: string;
  themeColor?: 'blue' | 'teal' | 'copper'; // For specific plan highlights if needed
}

export interface TenureOption {
  id: string;
  durationMonths: number;
  displayName: string;
  discountPercent?: number;
}

export interface Purifier {
  id: string;
  name: string;
  plans: Plan[];
  image: string;
  keyFeatures: Feature[];
  accentColor: 'blue' | 'teal' | 'copper';
  dataAiHint?: string;
}
