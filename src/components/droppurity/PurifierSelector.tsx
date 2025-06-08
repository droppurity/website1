
"use client";

import type { Purifier } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs value={selectedPurifierId} onValueChange={onSelectPurifier} className="w-full max-w-xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 bg-secondary p-1 rounded-lg h-auto">
        {purifiers.map((purifier) => (
          <TabsTrigger
            key={purifier.id}
            value={purifier.id}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 px-2 py-3 data-[state=active]:bg-card data-[state=active]:text-dynamic-accent data-[state=active]:shadow-md rounded-md transition-all h-full"
          >
            <Image 
              src={purifier.image} 
              alt={purifier.name} 
              width={24} 
              height={24} 
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
              data-ai-hint={purifier.dataAiHint}
            />
            <span className="text-xs sm:text-sm font-medium">{purifier.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
