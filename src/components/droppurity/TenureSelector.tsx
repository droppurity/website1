
"use client";

import type { TenureOption } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";

interface TenureSelectorProps {
  tenureOptions: TenureOption[];
  selectedTenureId: string;
  onSelectTenure: (id: string) => void;
}

export default function TenureSelector({
  tenureOptions,
  selectedTenureId,
  onSelectTenure,
}: TenureSelectorProps) {
  const selectedOption = tenureOptions.find(opt => opt.id === selectedTenureId);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs value={selectedTenureId} onValueChange={onSelectTenure} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg h-auto gap-1">
          {tenureOptions.map((option) => (
            <TabsTrigger
              key={option.id}
              value={option.id}
              className="data-[state=active]:bg-dynamic-accent data-[state=active]:text-dynamic-accent-foreground data-[state=active]:shadow-md rounded-md px-3 py-2 text-sm transition-all"
            >
              {option.displayName}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {selectedOption?.lockInNote && (
        <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
          <Lock className="w-3 h-3 mr-1" />
          <span>{selectedOption.lockInNote}</span>
        </div>
      )}
    </div>
  );
}
