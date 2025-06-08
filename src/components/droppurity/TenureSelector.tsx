
"use client";

import type { TenureOption } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  return (
    <Tabs value={selectedTenureId} onValueChange={onSelectTenure} className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-3 bg-secondary p-1 rounded-lg">
        {tenureOptions.map((option) => (
          <TabsTrigger
            key={option.id}
            value={option.id}
            className="data-[state=active]:bg-dynamic-accent data-[state=active]:text-dynamic-accent-foreground data-[state=active]:shadow-md rounded-md"
          >
            {option.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
