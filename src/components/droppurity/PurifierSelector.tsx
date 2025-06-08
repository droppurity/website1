
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
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
      {purifiers.map((purifier) => {
        const isSelected = purifier.id === selectedPurifierId;
        const TaglineIcon = purifier.taglineIcon;
        return (
          <div key={purifier.id} className="relative">
            {isSelected && purifier.tagline && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-md">
                  {TaglineIcon && <TaglineIcon className="w-3 h-3 mr-1" />}
                  {purifier.tagline}
                </span>
              </div>
            )}
            <Button
              variant={isSelected ? "default" : "outline"}
              onClick={() => onSelectPurifier(purifier.id)}
              className={`h-auto px-4 py-3 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-ring focus:ring-offset-2
                ${isSelected 
                  ? 'bg-dynamic-accent text-dynamic-accent-foreground border-dynamic-accent ring-dynamic-accent' 
                  : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground'
                }
              `}
              style={{minWidth: '160px'}}
            >
              <div className="flex flex-col items-center text-center gap-1">
                <Image 
                  src={purifier.image} 
                  alt={purifier.name} 
                  width={20} 
                  height={20} 
                  className="h-5 w-5 object-contain"
                  data-ai-hint={purifier.dataAiHint}
                />
                <span className="text-sm font-medium">{purifier.name}</span>
              </div>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
