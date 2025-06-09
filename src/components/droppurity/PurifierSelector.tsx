
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
    <div className="w-full flex items-start gap-2 sm:gap-3 overflow-x-auto md:flex-wrap md:justify-center no-scrollbar py-2">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;

        const nameParts = purifier.name.split(' ');
        const brandName = nameParts[0]; 
        const modelName = nameParts.slice(1).join(' '); 

        const buttonThemeClass = purifier.accentColor === 'copper' ? 'theme-copper'
                               : purifier.accentColor === 'teal' ? 'theme-teal'
                               : 'theme-blue'; // Explicitly use theme-blue for default

        return (
          <div key={purifier.id} className={`relative flex-1 sm:flex-shrink-0 text-center pb-2 ${buttonThemeClass}`}>
            {isSelected && purifier.tagline && (
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap" style={{minWidth: 'max-content'}}>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] leading-tight font-semibold bg-primary text-primary-foreground shadow-md">
                  {TaglineIcon && <TaglineIcon className="w-2.5 h-2.5 mr-0.5 flex-shrink-0" />}
                  {purifier.tagline}
                </span>
              </div>
            )}
            <Button
              variant={"outline"}
              onClick={() => onSelectPurifier(purifier.id)}
              className={`h-auto px-2 py-1.5 md:px-3.5 md:py-2.5 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 mt-4 w-full sm:w-auto
                ${isSelected 
                  ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-2 ring-dynamic-accent' 
                  : 'bg-light-dynamic-accent text-dynamic-accent border-dynamic-accent/40 hover:bg-dynamic-accent/20 hover:text-dynamic-accent hover:border-dynamic-accent/60'
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-xs leading-tight md:text-sm font-medium whitespace-nowrap">{brandName}</span>
                {modelName && (
                  <span className="text-[10px] leading-tight md:text-xs font-medium whitespace-nowrap">{modelName}</span>
                )}
              </div>
            </Button>
            {isSelected && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px]"
                style={{ 
                  borderTopColor: `hsl(var(--dynamic-accent-hsl-values))`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

