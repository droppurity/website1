
"use client";

import type { Purifier } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PurifierSelectorProps {
  purifiers: Purifier[];
  selectedPurifierId: string;
  onSelectPurifier: (id: string) => void;
}

export default function PurifierSelector({
  purifiers,
  selectedPurifierId,
  onSelectPurifier,
}: PurifierSelectorProps) {
  return (
    // Main container for horizontal scrolling on mobile, wrapping on desktop.
    // Removed mb-4, pb-1 md:pb-0, pt-3 md:pt-0 from here. Changed items-start to items-center.
    <div className="w-full flex flex-nowrap items-center gap-2 sm:gap-3 overflow-x-auto md:flex-wrap md:justify-center no-scrollbar">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;

        // Split name for two-line display on mobile
        const nameParts = purifier.name.split(' ');
        const brandName = nameParts[0]; // e.g., "Droppurity"
        const modelName = nameParts.slice(1).join(' '); // e.g., "RO+", "Copper"

        return (
          // Container for each button and its optional tagline
          <div key={purifier.id} className="relative flex-shrink-0 text-center">
            {/* Tagline: Appears above the selected button */}
            {isSelected && purifier.tagline && (
              <div className="absolute -top-0 md:-top-1 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap" style={{minWidth: 'max-content'}}>
                <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 rounded-full text-[10px] leading-tight md:text-xs font-semibold bg-primary text-primary-foreground shadow-md">
                  {TaglineIcon && <TaglineIcon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1 flex-shrink-0" />}
                  {purifier.tagline}
                </span>
              </div>
            )}
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => onSelectPurifier(purifier.id)}
              className={`h-auto px-3 py-2 md:px-4 md:py-3 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-ring focus:ring-offset-2 
                ${isSelected 
                  ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-dynamic-accent mt-3 md:mt-2' 
                  : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground mt-3 md:mt-2'
                }
              `}
            >
              {/* Inner container for two-line text */}
              <div className="flex flex-col items-center text-center"> {/* Removed min-w-[X] */}
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">{brandName}</span>
                {modelName && (
                  <span className="text-[11px] md:text-xs font-medium whitespace-nowrap leading-tight">{modelName}</span>
                )}
              </div>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
