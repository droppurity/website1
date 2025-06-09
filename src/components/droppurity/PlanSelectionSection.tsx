
"use client";

import React, { useState, useMemo, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import { purifiers, tenureOptions, defaultPurifierId, defaultTenureId } from '@/config/siteData';
import type { Purifier as PurifierType, Plan as PlanType, TenureOption as TenureType } from '@/lib/types';

import PurifierSelector from '@/components/droppurity/PurifierSelector';
import TenureSelector from '@/components/droppurity/TenureSelector';
import PlanCard from '@/components/droppurity/PlanCard';
import PlanTypeSelector from '@/components/droppurity/PlanTypeSelector';
import KeyFeaturesDisplay from '@/components/droppurity/KeyFeaturesDisplay';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Droplet, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';


interface PlanSelectionSectionProps {
  isHeaderDominant?: boolean;
}

function PurifierImageDisplay({ purifier }: { purifier: PurifierType }) {
  const allImages = useMemo(() => (purifier.thumbnailImages && purifier.thumbnailImages.length > 0
    ? [purifier.image, ...purifier.thumbnailImages]
    : [purifier.image]), [purifier]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [purifier]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const mainDisplayImage = allImages[currentImageIndex] || purifier.image;
  const imageDisplayThemeClass = purifier.accentColor === 'copper' ? 'theme-copper'
                             : purifier.accentColor === 'teal' ? 'theme-teal'
                             : 'theme-blue';


  return (
    <Card className={`shadow-xl overflow-hidden ${imageDisplayThemeClass}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="relative aspect-[4/3] mb-4">
          <Image
            src={mainDisplayImage}
            alt={purifier.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            data-ai-hint={purifier.dataAiHint || "water purifier"}
          />
          {purifier.storageCapacity && (
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {purifier.storageCapacity}
            </div>
          )}
          {allImages.length > 1 && (
            <>
              <Button variant="ghost" size="icon" onClick={prevImage} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextImage} className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
        {allImages.length > 1 && (
           <div className="relative">
            <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all shrink-0
                    ${index === currentImageIndex ? 'border-dynamic-accent ring-2 ring-dynamic-accent' : 'border-border hover:border-muted-foreground'}`}
                >
                  <Image src={img} alt={`${purifier.name} thumbnail ${index + 1}`} width={80} height={80} className="object-contain w-full h-full" />
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


const PlanSelectionSection = forwardRef<HTMLDivElement, PlanSelectionSectionProps>(
  ({ isHeaderDominant }, ref) => {
  const [selectedPurifierId, setSelectedPurifierId] = useState<string>(defaultPurifierId);
  const [selectedTenureId, setSelectedTenureId] = useState<string>(defaultTenureId);

  const selectedPurifier = useMemo(
    () => purifiers.find(p => p.id === selectedPurifierId) || purifiers[0],
    [selectedPurifierId]
  );

  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    const initialPurifier = purifiers.find(p => p.id === defaultPurifierId) || purifiers[0];
    const recommendedPlan = initialPurifier.plans.find(p => p.recommended);
    if (recommendedPlan) return recommendedPlan.id;
    const basicPlan = initialPurifier.plans.find(p => p.name.toLowerCase() === 'basic');
    if (basicPlan) return basicPlan.id;
    return initialPurifier.plans[0]?.id || '';
  });

  useEffect(() => {
    const currentPurifierPlans = selectedPurifier.plans;
    let defaultPlanIdToSet = '';

    const recommendedPlan = currentPurifierPlans.find(p => p.recommended);
    if (recommendedPlan) {
        defaultPlanIdToSet = recommendedPlan.id;
    } else {
        const basicPlan = currentPurifierPlans.find(p => p.name.toLowerCase() === 'basic');
        if (basicPlan) {
            defaultPlanIdToSet = basicPlan.id;
        } else if (currentPurifierPlans.length > 0) {
            defaultPlanIdToSet = currentPurifierPlans[0].id;
        }
    }

    if (defaultPlanIdToSet && defaultPlanIdToSet !== selectedPlanId) {
        const currentSelectedPlanIsValidForNewPurifier = currentPurifierPlans.some(p => p.id === selectedPlanId);
        if (!currentSelectedPlanIsValidForNewPurifier) {
            setSelectedPlanId(defaultPlanIdToSet);
        }
    } else if (currentPurifierPlans.length > 0 && !currentPurifierPlans.some(p => p.id === selectedPlanId)) {
        setSelectedPlanId(currentPurifierPlans[0].id);
    }
  }, [selectedPurifierId, selectedPurifier.plans, selectedPlanId]);


  const selectedPlan = useMemo(
    () => selectedPurifier.plans.find(p => p.id === selectedPlanId),
    [selectedPurifier, selectedPlanId]
  );

  const selectedTenure = useMemo(
    () => tenureOptions.find(t => t.id === selectedTenureId) || tenureOptions[0],
    [selectedTenureId]
  );

  const overallThemeClass = useMemo(() => {
    if (selectedPurifier.accentColor === 'copper') return 'theme-copper';
    if (selectedPurifier.accentColor === 'teal') return 'theme-teal';
    return 'theme-blue';
  }, [selectedPurifier.accentColor]);

  const displayPurifierPlanName = useMemo(() => {
    if (selectedPurifier && selectedPlan) {
      return `${selectedPurifier.name} - ${selectedPlan.name}`;
    }
    return selectedPurifier?.name || "";
  }, [selectedPurifier, selectedPlan]);


  const stickyCardTopClass = 'top-[7rem]';


  return (
    <div ref={ref} className={`py-6 sm:py-10 bg-background ${overallThemeClass}`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-6 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground flex items-center justify-center">
              <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-2" />
              Choose Your Droppurity Plan
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-2">
              Select the right purifier, plan, and tenure for your needs.
            </p>
        </header>


        <div className={cn(
            "sticky bg-background py-2 shadow-lg mb-6 sm:mb-10 z-40",
            isHeaderDominant && "z-[51]"
          )}
          style={{ top: '0' }}>
          <PurifierSelector
            purifiers={purifiers}
            selectedPurifierId={selectedPurifierId}
            onSelectPurifier={setSelectedPurifierId}
          />
          <KeyFeaturesDisplay purifier={selectedPurifier} className="mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <PurifierImageDisplay purifier={selectedPurifier} />
          </div>

          <div className="lg:col-span-3">
            <Card className={`shadow-xl sticky ${stickyCardTopClass}`}>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-foreground">Flexible Rental Plans</CardTitle>
                <p className="text-sm text-muted-foreground">Security deposit of ₹1,500 will be 100% refundable.</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">

                <Separator />
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Step 1: Choose Your Plan</h3>
                    <Button variant="outline" size="sm" className="text-xs text-dynamic-accent border-dynamic-accent hover:bg-dynamic-accent/10 hover:text-dynamic-accent">
                      <HelpCircle className="w-3.5 h-3.5 mr-1" /> Help me choose
                    </Button>
                  </div>
                  <PlanTypeSelector
                    plans={selectedPurifier.plans}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                  />
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">Step 2: Choose Your Tenure</h3>
                  </div>
                  <TenureSelector
                    tenureOptions={tenureOptions}
                    selectedTenureId={selectedTenureId}
                    onSelectTenure={setSelectedTenureId}
                  />
                </div>
                <Separator />

                {selectedPlan && selectedTenure ? (
                  <PlanCard
                    plan={selectedPlan}
                    tenure={selectedTenure}
                    displayPurifierName={displayPurifierPlanName}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Please make your selections to see plan details.
                  </div>
                )}

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
});

PlanSelectionSection.displayName = 'PlanSelectionSection';
export default PlanSelectionSection;

