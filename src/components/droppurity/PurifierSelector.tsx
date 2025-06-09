
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
    <div className="w-full flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto md:flex-wrap no-scrollbar">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;

        const nameParts = purifier.name.split(' ');
        const brandName = nameParts[0]; 
        const modelName = nameParts.slice(1).join(' '); 

        return (
          <div key={purifier.id} className="relative flex-shrink-0 text-center">
            {isSelected && purifier.tagline && (
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap" style={{minWidth: 'max-content'}}>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] leading-tight font-semibold bg-primary text-primary-foreground shadow-md">
                  {TaglineIcon && <TaglineIcon className="w-2.5 h-2.5 mr-0.5 flex-shrink-0" />}
                  {purifier.tagline}
                </span>
              </div>
            )}
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => onSelectPurifier(purifier.id)}
              className={`h-auto px-2 py-1.5 md:px-3.5 md:py-2.5 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-4
                ${isSelected 
                  ? 'bg-gradient-to-br from-gradient-start to-gradient-end text-dynamic-accent-foreground border-dynamic-accent ring-dynamic-accent' 
                  : 'bg-muted/30 text-muted-foreground/80 border-border/50 hover:bg-muted/50 hover:text-muted-foreground hover:border-border/70'
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
          </div>
        );
      })}
    </div>
  );
}
