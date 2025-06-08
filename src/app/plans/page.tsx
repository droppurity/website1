
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { purifiers, tenureOptions, defaultPurifierId, defaultTenureId } from '@/config/siteData';
import type { Purifier as PurifierType } from '@/lib/types'; // Renamed to avoid conflict

import PurifierSelector from '@/components/droppurity/PurifierSelector';
import TenureSelector from '@/components/droppurity/TenureSelector';
import PlanCard from '@/components/droppurity/PlanCard';
import KeyFeaturesDisplay from '@/components/droppurity/KeyFeaturesDisplay';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Droplet, HelpCircle, Lock, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Placeholder for a more sophisticated image gallery
function PurifierImageDisplay({ purifier }: { purifier: PurifierType }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = purifier.thumbnailImages && purifier.thumbnailImages.length > 0 
                  ? [purifier.image, ...purifier.thumbnailImages] 
                  : [purifier.image];
  
  const mainDisplayImage = images[currentImageIndex] || purifier.image;

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);


  return (
    <Card className="shadow-xl overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="relative aspect-square mb-4">
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
        </div>
        {images.length > 1 && (
           <div className="relative">
            <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all
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
    return ''; 
  }, [selectedPurifier.accentColor]);

  const plansToShow = selectedPurifier.plans;

  return (
    <div className={`min-h-screen ${themeAccentClass} py-6 sm:py-10 bg-background`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-foreground flex items-center justify-center">
              <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-primary mr-2" />
              Choose Your Droppurity Plan
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-2">
              Select the right purifier and plan for your needs.
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Left Column: Purifier Image */}
          <div className="lg:col-span-2">
            <PurifierImageDisplay purifier={selectedPurifier} />
          </div>

          {/* Right Column: Plan Selection */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl sticky top-20">
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Flexible Rental Plans</h2>
                  <p className="text-xs text-muted-foreground">Security deposit of ₹1,500 will be 100% refundable.</p>
                </div>
                
                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">1. Select Your Purifier</h3>
                  </div>
                  <PurifierSelector
                    purifiers={purifiers}
                    selectedPurifierId={selectedPurifierId}
                    onSelectPurifier={setSelectedPurifierId}
                  />
                  <KeyFeaturesDisplay purifier={selectedPurifier} />
                </div>
                
                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">2. Choose Your Tenure</h3>
                    {/* <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80">
                      <HelpCircle className="w-3.5 h-3.5 mr-1" /> Help me choose
                    </Button> */}
                  </div>
                  <TenureSelector
                    tenureOptions={tenureOptions}
                    selectedTenureId={selectedTenureId}
                    onSelectTenure={setSelectedTenureId}
                  />
                </div>
                
                {/* Plan Cards will be shown based on selected purifier's plans */}
                {/* This section is for displaying the plans themselves */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Plan Cards Section - Full Width Below or as part of right col */}
        <section className="mt-8 sm:mt-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold font-headline text-center sm:text-left text-foreground">
              3. Pick Your Plan ({selectedPurifier.name} - {selectedTenure.displayName})
            </h2>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-dynamic-accent border-dynamic-accent hover:bg-dynamic-accent/10">
              <LayoutGrid className="w-4 h-4 mr-2" /> Help me choose
            </Button>
          </div>
          {plansToShow.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {plansToShow.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  tenure={selectedTenure}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No plans available for this selection.</p>
          )}
        </section>
      </div>
    </div>
  );
}
