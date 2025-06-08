
import type { Purifier, TenureOption, Feature, Plan, PlanPriceDetail } from '@/lib/types';
import { Sparkles, Star, Check, Atom } from 'lucide-react';

// Updated Tenure Options
export const tenureOptions: TenureOption[] = [
  { id: '28d', durationDays: 28, durationMonths: 1, displayName: '28 days' },
  { id: '7m', durationDays: 210, durationMonths: 7, displayName: '7 Months', lockInNote: '7 Month Lock-in' },
  { id: '12m', durationDays: 360, durationMonths: 12, displayName: '12 Months', lockInNote: '12 Month Lock-in' },
];

const commonFeaturesList: Feature[] = [
  { id: 'multi-stage', name: 'Multistage Universal Water purifier', icon: Check },
  { id: 'ro-purification', name: 'RO Purification', icon: Check },
  { id: 'inline-uv', name: 'In-line UV purification', icon: Check },
];

const copperSpecificFeature: Feature = { id: 'copper-goodness', name: 'Goodness of copper', icon: Atom };
const alkalineSpecificFeature: Feature = { id: 'alkaline-ph', name: 'Alkaline pH Boost', icon: Check };

// Base Plan Structures (features, limits) - Pricing will be per purifier
const basePlanDefinitions: Omit<Plan, 'id' | 'tenurePricing' | 'pillText'>[] = [
  {
    name: 'Basic',
    limits: 'Upto 150 ltrs/m',
    baseFeatures: ['Free installation', 'Regular maintenance', 'Free relocation'],
  },
  {
    name: 'Value',
    limits: 'Upto 250 ltrs/m',
    baseFeatures: ['Free installation', 'Priority maintenance', 'Biannual filter change', 'Free relocation'],
    recommended: true,
  },
  {
    name: 'Commercial',
    limits: 'Upto 500 ltrs/m',
    baseFeatures: ['Free installation', 'Express maintenance', 'Quarterly filter change', 'Dedicated support line', 'Free relocation'],
  },
];

// Pricing for Droppurity RO+ (Base Prices)
const roPlusPricing: { [planName: string]: { [tenureId: string]: PlanPriceDetail } } = {
  Basic: {
    '28d': { pricePerMonth: 449 },
    '7m': { pricePerMonth: 299 },
    '12m': { pricePerMonth: 299, payingMonths: 11, additionalFeatures: ["+1 month free"] },
  },
  Value: { // Placeholder pricing for Value
    '28d': { pricePerMonth: 549 },
    '7m': { pricePerMonth: 399 },
    '12m': { pricePerMonth: 399, payingMonths: 11, additionalFeatures: ["+1 month free"] },
  },
  Commercial: { // Placeholder pricing for Commercial
    '28d': { pricePerMonth: 749 },
    '7m': { pricePerMonth: 599 },
    '12m': { pricePerMonth: 549, payingMonths: 10, additionalFeatures: ["+2 months free"] },
  },
};

// Function to generate plans for a specific purifier by applying price increments
const generatePlansForPurifier = (
  purifierIdPrefix: string,
  priceIncrement: number
): Plan[] => {
  return basePlanDefinitions.map(basePlanDef => {
    const planPricing: { [tenureId: string]: PlanPriceDetail } = {};
    const basePurifierPlanPricing = roPlusPricing[basePlanDef.name];

    for (const tenureId in basePurifierPlanPricing) {
      const originalPriceDetail = basePurifierPlanPricing[tenureId];
      planPricing[tenureId] = {
        ...originalPriceDetail,
        pricePerMonth: originalPriceDetail.pricePerMonth + priceIncrement,
      };
    }

    return {
      ...basePlanDef,
      id: `${purifierIdPrefix}-${basePlanDef.name.toLowerCase()}`,
      pillText: basePlanDef.name.toUpperCase(),
      tenurePricing: planPricing,
    };
  });
};

export const purifiers: Purifier[] = [
  {
    id: 'droppurity-ro-plus',
    name: 'Droppurity RO+',
    plans: generatePlansForPurifier('ro-plus', 0), // No increment for base RO+
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
    id: 'droppurity-copper',
    name: 'Droppurity Copper',
    tagline: 'Bestseller',
    taglineIcon: Sparkles,
    plans: generatePlansForPurifier('copper', 85), // +85 for Copper
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
    id: 'droppurity-alkaline',
    name: 'Droppurity Alkaline',
    tagline: 'Popular choice',
    taglineIcon: Star,
    plans: generatePlansForPurifier('alkaline', 75), // +75 for Alkaline
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

export const defaultPurifierId = purifiers[0].id; // Default to Droppurity RO+
export const defaultTenureId = tenureOptions[1].id; // Default to 7 Months
