
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
      className={`transition-all duration-300 ease-in-out transform ${ // Duration is already 300ms
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
    >
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${pillBgClass} ${pillTextColorClass} shadow-sm`}> {/* Changed py-1.5 to py-1 */}
        {IconComponent && <IconComponent className={`w-3 h-3 ${iconColorClass}`} />} {/* Changed icon size from w-3.5 h-3.5 to w-3 h-3 */}
        <span className="text-center">{feature.name}</span>
      </div>
    </div>
  );
}

