
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

function FeaturePill({ feature, accentIsPrimary }: { feature: Feature, accentIsPrimary: boolean }) {
  const IconComponent = feature.icon || Check;
  const iconColorClass = 'text-green-500';
  const pillBgClass = 'bg-green-50';
  const pillTextColorClass = 'text-green-700';

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${pillBgClass} ${pillTextColorClass} shadow-sm`}>
      <IconComponent className={`w-3.5 h-3.5 ${iconColorClass}`} />
      <span>{feature.name}</span>
    </div>
  );
}


export default function KeyFeaturesDisplay({ purifier, className }: KeyFeaturesDisplayProps) {
  const isMobile = useIsMobile();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = purifier?.keyFeatures || [];
  const accentIsPrimary = !purifier || purifier.accentColor === 'blue'; // Corrected this line

  // Reset currentFeatureIndex to 0 when the features array changes
  useEffect(() => {
    setCurrentFeatureIndex(0);
  }, [features]);

  useEffect(() => {
    if (isMobile && features.length > 0) {
      const timer = setInterval(() => {
        // The modulo operator will ensure the index wraps around correctly
        // and stays within bounds for the current features.length.
        setCurrentFeatureIndex(prevIndex => (prevIndex + 1) % features.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isMobile, features.length]); // Rely on features.length for this effect

  if (!purifier || features.length === 0) {
    return (
      <div className={`w-full mx-auto mt-2 p-2 text-center text-sm text-muted-foreground ${className}`}>
        {purifier ? 'No specific key features listed for this purifier.' : 'Select a purifier to see its features.'}
      </div>
    );
  }

  // At this point, features.length > 0 is guaranteed.
  // And currentFeatureIndex should be 0 if features just changed, or a valid cycling index.
  const featureForAnimation = features[currentFeatureIndex];

  return (
    <div className={`w-full mx-auto mt-2 ${className}`}>
      {isMobile && featureForAnimation ? ( // Check featureForAnimation to ensure it's defined
        <div className="h-[40px] flex items-center justify-center overflow-hidden px-2">
             <AnimatedFeature
                key={featureForAnimation.id} // Accessing .id is now safer
                feature={featureForAnimation}
                accentIsPrimary={accentIsPrimary}
              />
        </div>
      ) : isMobile ? ( // Handle case where featureForAnimation might be undefined (should be rare with reset)
        <div className="h-[40px]" /> // Empty div to maintain layout space
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-2">
          {features.map(feature => (
            <FeaturePill key={feature.id} feature={feature} accentIsPrimary={accentIsPrimary} />
          ))}
        </div>
      )}
    </div>
  );
}
