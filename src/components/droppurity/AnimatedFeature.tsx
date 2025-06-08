
"use client";

import type { Feature } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface AnimatedFeatureProps {
  feature: Feature;
  className?: string;
  accentIsPrimary: boolean; // Kept for potential future use, but currently overridden by green
}

export default function AnimatedFeature({ feature, className, accentIsPrimary }: AnimatedFeatureProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false); // Reset visibility for transition effect on feature change
    const timer = setTimeout(() => setVisible(true), 50); // Small delay to trigger transition
    return () => clearTimeout(timer);
  }, [feature]); // Re-run effect when feature changes

  const IconComponent = feature.icon || Check;
  // Standard green for feature checkmarks
  const iconColorClass = 'text-green-500';
  const pillBgClass = 'bg-green-50';
  const pillTextColorClass = 'text-green-700';

  return (
    <div
      className={`transition-all duration-300 ease-in-out transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${pillBgClass} ${pillTextColorClass} shadow-sm`}>
        {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${iconColorClass}`} />}
        <span className="text-center">{feature.name}</span>
      </div>
    </div>
  );
}
