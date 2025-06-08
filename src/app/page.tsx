
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { purifiers, tenureOptions, defaultPurifierId, defaultTenureId } from '@/config/siteData';
import type { Purifier, TenureOption, Plan } from '@/lib/types';

import PurifierSelector from '@/components/droppurity/PurifierSelector';
import TenureSelector from '@/components/droppurity/TenureSelector';
import PlanCard from '@/components/droppurity/PlanCard';
import KeyFeaturesDisplay from '@/components/droppurity/KeyFeaturesDisplay';
import { Separator } from '@/components/ui/separator';
import { Droplet } from 'lucide-react'; // App icon

export default function DroppurityPlansPage() {
  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(defaultPurifierId);
  const [selectedTenureId, setSelectedTenureId] = useState<string>(defaultTenureId);

  const selectedPurifier = useMemo(
    () => purifiers.find(p => p.id === selectedPurifierId) || purifiers[0],
    [selectedPurifierId]
  );

  const selectedTenure = useMemo(
    () => tenureOptions.find(t => t.id === selectedTenureId) || tenureOptions[0],
    [selectedTenureId]
  );

  const themeAccentClass = useMemo(() => {
    if (selectedPurifier.accentColor === 'copper') return 'theme-copper';
    if (selectedPurifier.accentColor === 'teal') return 'theme-teal';
    return ''; // Default blue is handled by root CSS vars
  }, [selectedPurifier.accentColor]);

  const plansToShow = selectedPurifier.plans;

  return (
    <div className={`min-h-screen flex flex-col items-center ${themeAccentClass} py-6 sm:py-8 px-4`}>
      <header className="text-center mb-6 sm:mb-10">
        <div className="flex items-center justify-center mb-2">
          <Droplet className="w-10 h-10 text-primary mr-2" />
          <h1 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">
            Droppurity Plans
          </h1>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground">
          Choose the perfect water purifier plan for your home or business.
        </p>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold font-headline text-center mb-4 text-foreground">
            1. Select Your Purifier
          </h2>
          <PurifierSelector
            purifiers={purifiers}
            selectedPurifierId={selectedPurifierId}
            onSelectPurifier={setSelectedPurifierId}
          />
        </section>
        
        <KeyFeaturesDisplay purifier={selectedPurifier} />

        <Separator className="my-6 sm:my-8" />
        
        <section className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold font-headline text-center mb-4 text-foreground">
            2. Choose Your Tenure
          </h2>
          <TenureSelector
            tenureOptions={tenureOptions}
            selectedTenureId={selectedTenureId}
            onSelectTenure={setSelectedTenureId}
          />
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold font-headline text-center mb-6 text-foreground">
            3. Pick Your Plan
          </h2>
          {plansToShow.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {plansToShow.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  tenure={selectedTenure}
                  accentColorClass={`bg-${selectedPurifier.accentColor}-500`} 
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No plans available for this selection.</p>
          )}
        </section>
      </main>

      <footer className="mt-10 sm:mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Droppurity. All rights reserved.</p>
        <p>Pure Water, Pure Life.</p>
      </footer>
    </div>
  );
}
