
"use client";

import type { Feature } from '@/lib/types';
import { useEffect, useState } from 'react';

interface AnimatedFeatureProps {
  feature: Feature;
  className?: string;
  accentIsPrimary: boolean;
}

export default function AnimatedFeature({ feature, className, accentIsPrimary }: AnimatedFeatureProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [feature]);

  const IconComponent = feature.icon;
  const iconColorClass = accentIsPrimary ? 'text-primary' : 'text-dynamic-accent';

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      <div className="flex flex-col items-center text-center p-2 sm:p-4">
        {IconComponent && <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 ${iconColorClass}`} />}
        <h3 className="text-sm sm:text-base font-semibold font-headline">{feature.name}</h3>
        {feature.description && <p className="text-xs text-muted-foreground mt-1 px-2">{feature.description}</p>}
      </div>
    </div>
  );
}
