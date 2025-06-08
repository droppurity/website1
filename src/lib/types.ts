
import type { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  name: string;
  icon?: LucideIcon | React.ElementType; // Retaining icon for flexibility, though plan page will use Check
  description?: string;
}

export interface Plan {
  id: string;
  name: string;
  pricePerMonth: number;
  limits: string; // e.g., "Upto 130 ltrs/m"
  savings?: string;
  features: string[];
  recommended?: boolean;
  pillText?: string; // e.g. "SOLO", "COUPLE" - this might be different from purifier tagline
  themeColor?: 'blue' | 'teal' | 'copper';
}

export interface TenureOption {
  id: string;
  durationDays: number; // Using days as per image
  displayName: string; // e.g., "28 days"
  discountPercent?: number;
  lockInNote?: string; // e.g., "3 Month Lock-in"
}

export interface Purifier {
  id: string;
  name: string; // e.g., "DrinkPrime Copper"
  plans: Plan[]; // These are the "Solo", "Couple", "Family" type plans
  image: string;
  thumbnailImages?: string[];
  storageCapacity?: string; // e.g., "8 Litre Storage"
  keyFeatures: Feature[]; // Features like "Multistage Universal Water purifier"
  accentColor: 'blue' | 'teal' | 'copper';
  dataAiHint?: string;
  tagline?: string; // e.g., "Bestseller", "Popular choice"
  taglineIcon?: LucideIcon | React.ElementType;
}
