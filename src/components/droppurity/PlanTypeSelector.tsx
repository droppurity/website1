
"use client";

import type { Plan } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PlanTypeSelectorProps {
  plans: Plan[];
  selectedPlanId: string;
  onSelectPlan: (id: string) => void;
}

export default function PlanTypeSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
}: PlanTypeSelectorProps) {
  if (!plans || plans.length === 0) {
    return <p className="text-muted-foreground text-sm">No plans available for this purifier.</p>;
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId;
        return (
          <Button
            key={plan.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelectPlan(plan.id)}
            className={`h-auto px-4 py-3 shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-medium
              ${isSelected 
                ? 'bg-dynamic-accent text-dynamic-accent-foreground border-dynamic-accent ring-dynamic-accent' 
                : 'bg-card text-foreground border-border hover:bg-muted/50 hover:border-muted-foreground'
              }
            `}
             style={{minWidth: '100px'}} // Ensure buttons have some minimum width
          >
            {plan.name} {/* Display plan name e.g. Basic, Value, Commercial */}
            {/* Removed redundant pillText display: plan.pillText && !isSelected && <span className="ml-1.5 text-xs opacity-70">({plan.pillText})</span> */}
          </Button>
        );
      })}
    </div>
  );
}
