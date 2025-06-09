
"use client";

import type { Feature, Purifier } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import AnimatedFeature from './AnimatedFeature';
import { Check } from 'lucide-react';

interface KeyFeaturesDisplayProps {
  purifier?: Purifier;
  className?: string; 
}

export default function KeyFeaturesDisplay({ purifier, className }: KeyFeaturesDisplayProps) {
  const isMobile = useIsMobile();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = purifier?.keyFeatures || [];

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
      <div className={`w-full mx-auto p-2 text-center text-sm text-muted-foreground ${className}`}>
        {purifier ? 'No specific key features listed for this purifier.' : 'Select a purifier to see its features.'}
      </div>
    );
  }

  const featureForAnimation = features[currentFeatureIndex];

  return (
    <div className={`w-full mx-auto ${className}`}>
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
        // Desktop rendering: List of features
        <div className="px-2"> 
          <h4 className="text-md font-semibold text-foreground mb-2">Key Features</h4>
          <ul className="space-y-1.5">
            {features.map(feature => {
              const IconComponent = feature.icon || Check;
              return (
                <li key={feature.id} className="flex items-start text-sm text-muted-foreground">
                  <IconComponent className="w-4 h-4 mr-2 text-dynamic-accent flex-shrink-0 mt-0.5" />
                  <span>{feature.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
