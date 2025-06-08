
"use client";

import type { Feature, Purifier } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import AnimatedFeature from './AnimatedFeature';
import { Card, CardContent } from '@/components/ui/card';

interface KeyFeaturesDisplayProps {
  purifier?: Purifier;
}

export default function KeyFeaturesDisplay({ purifier }: KeyFeaturesDisplayProps) {
  const isMobile = useIsMobile();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = purifier?.keyFeatures || [];
  const accentIsPrimary = !purifier || purifier.accentColor === 'blue';


  useEffect(() => {
    if (isMobile && features.length > 0) {
      const timer = setInterval(() => {
        setCurrentFeatureIndex(prevIndex => (prevIndex + 1) % features.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isMobile, features.length]);

  if (!purifier) {
    return (
      <div className="w-full max-w-4xl mx-auto my-6 p-4">
        <p className="text-center text-muted-foreground">Select a purifier to see its features.</p>
      </div>
    );
  }


  return (
    <div className="w-full max-w-4xl mx-auto my-6 md:my-8">
      {isMobile && features.length > 0 ? (
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
             <AnimatedFeature
                key={features[currentFeatureIndex].id}
                feature={features[currentFeatureIndex]}
                accentIsPrimary={accentIsPrimary}
              />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(feature => {
            const IconComponent = feature.icon;
            const iconColorClass = accentIsPrimary ? 'text-primary' : 'text-dynamic-accent';
            return (
              <Card key={feature.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center text-center p-4">
                  {IconComponent && <IconComponent className={`w-8 h-8 mb-2 ${iconColorClass}`} />}
                  <h3 className="text-sm font-semibold font-headline">{feature.name}</h3>
                  {feature.description && <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
