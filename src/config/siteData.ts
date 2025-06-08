
import type { Purifier, TenureOption, Feature, Plan } from '@/lib/types';
import { Layers, Zap, Sparkles, ShieldCheck, Atom, Filter, Droplet, CheckCircle, Star, Lock, HelpCircle, LayoutGrid, Check } from 'lucide-react';

// Tenure Options based on the image
export const tenureOptions: TenureOption[] = [
  { id: '28d', durationDays: 28, displayName: '28 days' },
  { id: '90d', durationDays: 90, displayName: '90 days', discountPercent: 5, lockInNote: '3 Month Lock-in' },
  { id: '360d', durationDays: 360, displayName: '360 days', discountPercent: 10 },
];

// Common key features that might appear across purifiers, simplified to match image style
const commonFeaturesList: Feature[] = [
  { id: 'multi-stage', name: 'Multistage Universal Water purifier', icon: Check },
  { id: 'ro-purification', name: 'RO Purification', icon: Check },
  { id: 'inline-uv', name: 'In-line UV purification', icon: Check },
];

const copperSpecificFeature: Feature = { id: 'copper-goodness', name: 'Goodness of copper', icon: Check };
const alkalineSpecificFeature: Feature = { id: 'alkaline-ph', name: 'Alkaline pH Boost', icon: Check };


// Plans now represent usage tiers like Solo, Couple, Family
const soloPlanFeatures = ['Upto 130 ltrs/m usage', 'Free installation', 'Regular maintenance'];
const couplePlanFeatures = ['Upto 200 ltrs/m usage', 'Free installation', 'Priority maintenance'];
const familyPlanFeatures = ['Upto 500 ltrs/m usage', 'Free installation', 'Premium support'];
const unlimitedPlanFeatures = ['Unlimited usage', 'Free installation', 'VIP support'];


const basePlans: Omit<Plan, 'id' | 'pricePerMonth'>[] = [
  { name: 'Solo', limits: '130 ltrs/m', features: soloPlanFeatures, pillText: 'SOLO' },
  { name: 'Couple', limits: '200 ltrs/m', features: couplePlanFeatures, pillText: 'COUPLE', recommended: true},
  { name: 'Family', limits: '500 ltrs/m', features: familyPlanFeatures, pillText: 'FAMILY' },
  { name: 'Unlimited', limits: 'Unlimited ltrs/m', features: unlimitedPlanFeatures, pillText: 'UNLIMITED' },
];


// Function to generate plans for each purifier type with slight price variations
const generatePurifierPlans = (purifierIdPrefix: string, basePrice: number): Plan[] => {
  return basePlans.map((plan, index) => ({
    ...plan,
    id: `${purifierIdPrefix}-${plan.name.toLowerCase()}`,
    pricePerMonth: basePrice + (index * 50), // Example price increment
  }));
};


export const purifiers: Purifier[] = [
  {
    id: 'drinkprime-copper',
    name: 'DrinkPrime Copper',
    tagline: 'Bestseller',
    taglineIcon: Sparkles,
    plans: generatePurifierPlans('copper', 449), // Base price for Copper Solo
    image: 'https://placehold.co/400x400.png',
    thumbnailImages: [
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
    ],
    storageCapacity: '8 Litre Storage',
    keyFeatures: [ ...commonFeaturesList, copperSpecificFeature ],
    accentColor: 'copper',
    dataAiHint: 'copper water purifier',
  },
  {
    id: 'drinkprime-ro-plus',
    name: 'DrinkPrime RO+',
    plans: generatePurifierPlans('ro', 399), // Base price for RO+ Solo
    image: 'https://placehold.co/400x400.png',
     thumbnailImages: [
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
    ],
    storageCapacity: '8 Litre Storage',
    keyFeatures: commonFeaturesList,
    accentColor: 'blue',
    dataAiHint: 'ro water purifier',
  },
  {
    id: 'drinkprime-alkaline',
    name: 'DrinkPrime Alkaline',
    tagline: 'Popular choice',
    taglineIcon: Star,
    plans: generatePurifierPlans('alkaline', 499), // Base price for Alkaline Solo
    image: 'https://placehold.co/400x400.png',
     thumbnailImages: [
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
        'https://placehold.co/100x100.png',
    ],
    storageCapacity: '8 Litre Storage',
    keyFeatures: [ ...commonFeaturesList, alkalineSpecificFeature ],
    accentColor: 'teal',
    dataAiHint: 'alkaline water purifier',
  },
];

export const defaultPurifierId = purifiers[0].id;
export const defaultTenureId = tenureOptions[1].id; // Default to 90 days
