
"use client";

import type { Purifier } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    <div className="w-full flex flex-nowrap items-center gap-2 sm:gap-3 mb-4 overflow-x-auto md:flex-wrap md:justify-center no-scrollbar pb-1 md:pb-0 px-1 md:px-0">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;
        return (
          <div key={purifier.id} className="relative flex-shrink-0">
            {isSelected && purifier.tagline && (
              <div className="absolute -top-2 md:-top-2.5 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 rounded-full text-[10px] leading-tight md:text-xs font-semibold bg-primary text-primary-foreground shadow-md whitespace-nowrap">
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
                  ? 'bg-dynamic-accent text-dynamic-accent-foreground border-dynamic-accent ring-dynamic-accent mt-3 md:mt-0' 
                  : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground mt-3 md:mt-0'
                }
              `}
            >
              <div className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                <Image 
                  src={purifier.image} 
                  alt={purifier.name} 
                  width={16} 
                  height={16} 
                  className="h-4 w-4 md:h-5 md:w-5 object-contain"
                  data-ai-hint={purifier.dataAiHint}
                />
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">{purifier.name}</span>
              </div>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
