
"use client";

import type { Feature } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface AnimatedFeatureProps {
  feature: Feature;
  className?: string;
}

export default function AnimatedFeature({ feature, className }: AnimatedFeatureProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false); // Reset visibility for transition effect on feature change
    const timer = setTimeout(() => setVisible(true), 50); // Small delay to trigger transition
    return () => clearTimeout(timer);
  }, [feature]); // Re-run effect when feature changes

  const IconComponent = feature.icon || Check;

  return (
    <div
      className={`transition-all duration-150 ease-in-out transform ${ // Duration changed from 300ms to 150ms
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-light-dynamic-accent text-dynamic-accent shadow-sm`}> {/* Changed py-1.5 to py-1, dynamic colors */}
        {IconComponent && <IconComponent className={`w-3 h-3 text-dynamic-accent`} />} {/* Changed icon size, dynamic color */}
        <span className="text-center">{feature.name}</span>
      </div>
    </div>
  );
}
