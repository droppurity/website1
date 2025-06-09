
"use client";

import type { Feature, Purifier } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import AnimatedFeature from './AnimatedFeature';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface KeyFeaturesDisplayProps {
  purifier?: Purifier;
  className?: string; // Allow passing additional classes
}

function FeaturePill({ feature }: { feature: Feature }) {
  const IconComponent = feature.icon || Check;
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-light-dynamic-accent text-dynamic-accent shadow-sm`}>
      <IconComponent className={`w-3.5 h-3.5 text-dynamic-accent`} />
      <span>{feature.name}</span>
    </div>
  );
}


export default function KeyFeaturesDisplay({ purifier, className }: KeyFeaturesDisplayProps) {
  const isMobile = useIsMobile();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = purifier?.keyFeatures || [];

  // Reset currentFeatureIndex to 0 when the features array changes
  useEffect(() => {
    setCurrentFeatureIndex(0);
  }, [features]);

  useEffect(() => {
    if (isMobile && features.length > 0) {
      const timer = setInterval(() => {
        setCurrentFeatureIndex(prevIndex => (prevIndex + 1) % features.length);
      }, 2000); 
      return () => clearInterval(timer);
    }
  }, [isMobile, features.length]); 

  if (!purifier || features.length === 0) {
    return (
      <div className={`w-full mx-auto mt-2 p-2 text-center text-sm text-muted-foreground ${className}`}>
        {purifier ? 'No specific key features listed for this purifier.' : 'Select a purifier to see its features.'}
      </div>
    );
  }

  const featureForAnimation = features[currentFeatureIndex];

  return (
    <div className={`w-full mx-auto mt-2 ${className}`}>
      {isMobile && featureForAnimation ? ( 
        <div className="h-[40px] flex items-center justify-center overflow-hidden px-2">
             <AnimatedFeature
                key={featureForAnimation.id} 
                feature={featureForAnimation}
              />
        </div>
      ) : isMobile ? ( 
        <div className="h-[40px]" /> 
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-2">
          {features.map(feature => (
            <FeaturePill key={feature.id} feature={feature} />
          ))}
        </div>
      )}
    </div>
  );
}
