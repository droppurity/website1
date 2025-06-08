
import type { Purifier, TenureOption, Feature, Plan } from '@/lib/types';
import { Layers, Zap, Sparkles, ShieldCheck, Atom, Filter, Droplet, CheckCircle } from 'lucide-react';

export const tenureOptions: TenureOption[] = [
  { id: '6m', durationMonths: 6, displayName: '6 Months' },
  { id: '12m', durationMonths: 12, displayName: '12 Months', discountPercent: 5 },
  { id: '24m', durationMonths: 24, displayName: '24 Months', discountPercent: 10 },
];

const commonKeyFeatures: Feature[] = [
  { id: 'multi-stage', name: 'Multistage Purification', icon: Layers, description: 'Advanced 7-stage purification process.' },
  { id: 'smart-ro', name: 'Smart RO Technology', icon: Zap, description: 'Optimizes water recovery and reduces wastage.' },
  { id: 'mineral-boost', name: 'Essential Minerals', icon: Sparkles, description: 'Retains essential minerals for healthy water.' },
  { id: 'service', name: 'Free Lifetime Service', icon: ShieldCheck, description: 'Hassle-free maintenance and support.' },
];

const roPlusPlans: Plan[] = [
  { id: 'ro-basic', name: 'Basic', pricePerMonth: 399, limits: 'Upto 125L/month', features: ['RO Purification', 'UV Disinfection', 'TDS Control'], pillText: "STARTER" },
  { id: 'ro-value', name: 'Value', pricePerMonth: 499, limits: 'Upto 200L/month', features: ['RO Purification', 'UV Disinfection', 'TDS Control', 'Pre-filter Change'], recommended: true, pillText: "POPULAR" },
  { id: 'ro-commercial', name: 'Pro', pricePerMonth: 799, limits: 'Upto 500L/month', features: ['RO Purification', 'UV Disinfection', 'TDS Control', 'Pre-filter Change', 'Priority Support'] },
];

const copperRoPlusPlans: Plan[] = [
  { id: 'cu-basic', name: 'Basic Copper', pricePerMonth: 449, limits: 'Upto 125L/month', features: ['Copper Charge Tech', 'RO Purification', 'UV Disinfection'] },
  { id: 'cu-value', name: 'Value Copper', pricePerMonth: 549, limits: 'Upto 200L/month', features: ['Copper Charge Tech', 'RO Purification', 'UV Disinfection', 'Taste Enhancer'], recommended: true, pillText: "BESTSELLER" },
  { id: 'cu-commercial', name: 'Pro Copper', pricePerMonth: 849, limits: 'Upto 500L/month', features: ['Copper Charge Tech', 'RO Purification', 'UV Disinfection', 'Taste Enhancer', 'Annual Filter Change'] },
];

const alkalineRoPlusPlans: Plan[] = [
  { id: 'alk-basic', name: 'Basic Alkaline', pricePerMonth: 499, limits: 'Upto 125L/month', features: ['Alkaline Boost', 'RO Purification', 'pH Balance'] },
  { id: 'alk-value', name: 'Value Alkaline', pricePerMonth: 599, limits: 'Upto 200L/month', features: ['Alkaline Boost', 'RO Purification', 'pH Balance', 'Mineral Cartridge'], recommended: true, pillText: "HEALTH CHOICE" },
  { id: 'alk-commercial', name: 'Pro Alkaline', pricePerMonth: 899, limits: 'Upto 500L/month', features: ['Alkaline Boost', 'RO Purification', 'pH Balance', 'Mineral Cartridge', 'Extended Warranty'] },
];

export const purifiers: Purifier[] = [
  {
    id: 'ro-plus',
    name: 'RO+',
    plans: roPlusPlans,
    image: 'https://placehold.co/300x300.png',
    keyFeatures: [...commonKeyFeatures, { id: 'pure-water', name: 'Pure & Safe Water', icon: Droplet, description: 'Ensures 100% safe drinking water.' }],
    accentColor: 'blue',
    dataAiHint: 'water purifier',
  },
  {
    id: 'copper-ro-plus',
    name: 'Copper RO+',
    plans: copperRoPlusPlans,
    image: 'https://placehold.co/300x300.png',
    keyFeatures: [
      { id: 'copper-tech', name: 'Copper Infusion', icon: Atom, description: 'Adds goodness of copper to your water.' },
      ...commonKeyFeatures
    ],
    accentColor: 'copper',
    dataAiHint: 'copper water filter',
  },
  {
    id: 'alkaline-ro-plus',
    name: 'Alkaline RO+',
    plans: alkalineRoPlusPlans,
    image: 'https://placehold.co/300x300.png',
    keyFeatures: [
      { id: 'alkaline-tech', name: 'Alkaline Balance', icon: Filter, description: 'Maintains optimal pH for healthier water.' },
      ...commonKeyFeatures
    ],
    accentColor: 'teal',
    dataAiHint: 'alkaline water system',
  },
];

export const defaultPurifierId = purifiers[0].id;
export const defaultTenureId = tenureOptions[1].id; // Default to 12 months
