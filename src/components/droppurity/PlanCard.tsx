
"use client";

import type { Plan, TenureOption } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanCardProps {
  plan: Plan;
  tenure: TenureOption;
  accentColorClass: string; // e.g. 'bg-blue-500'
}

export default function PlanCard({ plan, tenure }: PlanCardProps) {
  const { toast } = useToast();

  const discount = tenure.discountPercent || 0;
  const priceAfterDiscount = plan.pricePerMonth * (1 - discount / 100);
  const totalBilledAmount = priceAfterDiscount * tenure.durationMonths;
  const savingsAmount = (plan.pricePerMonth - priceAfterDiscount) * tenure.durationMonths;

  const handleSubscribe = () => {
    toast({
      title: "Subscribed!",
      description: `You've chosen the ${plan.name} plan for ${tenure.displayName}.`,
    });
  };

  const handleKnowMore = () => {
     toast({
      title: "More Information",
      description: `Details for ${plan.name} plan. This could navigate to a detailed page or open a modal.`,
      action: <Button variant="outline" size="sm">Learn Even More</Button>,
    });
  }

  return (
    <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden ${plan.recommended ? 'border-dynamic-accent border-2 relative' : 'border'}`}>
      {plan.recommended && plan.pillText && (
        <Badge variant="default" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dynamic-accent text-dynamic-accent-foreground px-3 py-1 text-xs">
          {plan.pillText}
        </Badge>
      )}
      <CardHeader className="p-6 bg-card">
        <CardTitle className="font-headline text-xl text-center font-semibold text-foreground">{plan.name}</CardTitle>
        <div className="text-center mt-2">
          <span className="text-3xl font-bold font-headline text-dynamic-accent">
            ₹{Math.round(priceAfterDiscount)}
          </span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Billed ₹{Math.round(totalBilledAmount)} for {tenure.displayName}
        </p>
        {savingsAmount > 0 && (
          <p className="text-xs text-green-600 font-medium text-center mt-1">
            You save ₹{Math.round(savingsAmount)}!
          </p>
        )}
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <p className="text-sm font-medium text-foreground mb-1">What's included:</p>
        <p className="text-sm text-muted-foreground mb-3">{plan.limits}</p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-foreground">
              <CheckCircle className="w-4 h-4 mr-2 text-dynamic-accent flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-3 p-4 bg-muted/30">
        <Button variant="outline" className="w-full border-dynamic-accent text-dynamic-accent hover:bg-dynamic-accent hover:text-dynamic-accent-foreground" onClick={handleKnowMore}>
          <Info className="mr-2 h-4 w-4" /> Know More
        </Button>
        <Button className="w-full bg-dynamic-accent text-dynamic-accent-foreground hover:bg-opacity-90" onClick={handleSubscribe}>
          Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  );
}
