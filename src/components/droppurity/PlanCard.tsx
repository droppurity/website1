
"use client";

import type { Plan, TenureOption } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanCardProps {
  plan: Plan;
  tenure: TenureOption;
  // accentColorClass is removed, will use dynamic CSS variables
}

export default function PlanCard({ plan, tenure }: PlanCardProps) {
  const { toast } = useToast();

  const discount = tenure.discountPercent || 0;
  // Assuming tenure.durationDays needs to be converted to months for monthly price logic
  // For simplicity, let's assume an average of 30 days per month for calculation.
  // Or, if pricePerMonth is absolute, then durationDays is just for display/context.
  // Let's assume pricePerMonth is fixed and tenure affects total and savings.
  // The image shows "/month", so pricePerMonth seems correct.
  // The duration of tenure in months for calculation will be tenure.durationDays / 30 (approx)
  // However, for billing simplicity, companies often map day-based tenures to monthly equivalents or bill for the whole period.
  // Let's assume the monthly price IS the effective price for that tenure choice.
  // The image shows "₹449/month" directly. And tenure choice affects total savings.

  const monthlyPrice = plan.pricePerMonth; // This might be adjusted by tenure in a real scenario.
                                        // For now, let's assume plan.pricePerMonth is the base, and tenure discount applies.
  
  const priceAfterDiscount = monthlyPrice * (1 - discount / 100);
  const tenureDurationInMonthsApproximation = tenure.durationDays / 30.44; // Avg days in month
  const totalBilledAmount = priceAfterDiscount * tenureDurationInMonthsApproximation; // This needs to be exact based on how "billed" works
                                                                                    // Often, it's monthlyPrice * actual_months_in_tenure
                                                                                    // For "360 days", it's 12 months. For "90 days", 3 months. For "28 days", ~1 month.
  let effectiveMonths = 1;
  if (tenure.durationDays === 90) effectiveMonths = 3;
  if (tenure.durationDays === 360) effectiveMonths = 12;
  
  const actualTotalBilled = priceAfterDiscount * effectiveMonths;
  const savingsAmount = (monthlyPrice * effectiveMonths) - actualTotalBilled;


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
    <Card className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border ${plan.recommended ? 'border-dynamic-accent border-2 relative' : 'border-border'}`}>
      {plan.recommended && plan.pillText && ( // This pillText is for plan (SOLO, COUPLE), not the purifier tagline
        <Badge variant="default" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dynamic-accent text-dynamic-accent-foreground px-3 py-1 text-xs z-10">
          {plan.pillText}
        </Badge>
      )}
      <CardHeader className="p-4 sm:p-6 bg-card">
        <CardTitle className="font-headline text-lg sm:text-xl text-center font-semibold text-foreground">{plan.name}</CardTitle>
        <p className="text-xs text-muted-foreground text-center">{plan.limits}</p>
        <div className="text-center mt-2">
          <span className="text-3xl sm:text-4xl font-bold font-headline text-dynamic-accent">
            ₹{Math.round(priceAfterDiscount)}
          </span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        
        {savingsAmount > 0 && (
          <Badge variant="outline" className="mx-auto mt-2 border-yellow-400 bg-yellow-50 text-yellow-700 text-xs font-medium">
            Savings of ₹{Math.round(savingsAmount)}!
          </Badge>
        )}
         <p className="text-xs text-muted-foreground text-center mt-1">
          Total ₹{Math.round(actualTotalBilled)} for {tenure.displayName}
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <ul className="space-y-1.5">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-foreground">
              <CheckCircle className="w-4 h-4 mr-2 text-dynamic-accent flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 sm:gap-3 p-4 bg-muted/20 mt-auto">
        <Button variant="outline" className="w-full border-dynamic-accent text-dynamic-accent hover:bg-dynamic-accent/10" onClick={handleKnowMore}>
          <Info className="mr-1.5 h-4 w-4" /> Know More
        </Button>
        <Button className="w-full bg-dynamic-accent text-dynamic-accent-foreground hover:bg-dynamic-accent/90" onClick={handleSubscribe}>
           Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  );
}
