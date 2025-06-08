
"use client";

import type { Plan, TenureOption, PlanPriceDetail } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanCardProps {
  plan: Plan;
  tenure: TenureOption;
}

export default function PlanCard({ plan, tenure }: PlanCardProps) {
  const { toast } = useToast();

  const priceDetail: PlanPriceDetail | undefined = plan.tenurePricing[tenure.id];

  if (!priceDetail) {
    // Fallback or error display if pricing for the selected tenure isn't defined
    return (
      <Card className="flex flex-col shadow-lg rounded-xl overflow-hidden border border-destructive">
        <CardHeader className="p-4 sm:p-6 bg-card">
          <CardTitle className="font-headline text-lg sm:text-xl text-center font-semibold text-destructive-foreground">{plan.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
          <p className="text-center text-destructive">Pricing not available for {tenure.displayName}.</p>
        </CardContent>
      </Card>
    );
  }

  const displayPricePerMonth = priceDetail.pricePerMonth;
  const payingMonths = priceDetail.payingMonths || tenure.durationMonths;
  const totalBilled = displayPricePerMonth * payingMonths;

  const featuresToShow = [...plan.baseFeatures, ...(priceDetail.additionalFeatures || [])];

  // Calculate savings against the 28-day price of the *same* plan
  let savingsAmount = 0;
  const basePriceDetailForSavingsCalc = plan.tenurePricing['28d'];
  if (basePriceDetailForSavingsCalc && tenure.id !== '28d') {
    const costAtBaseRate = basePriceDetailForSavingsCalc.pricePerMonth * tenure.durationMonths;
    savingsAmount = costAtBaseRate - totalBilled;
  }

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
      {plan.recommended && plan.pillText && (
        <Badge variant="default" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dynamic-accent text-dynamic-accent-foreground px-3 py-1 text-xs z-10">
          {plan.pillText}
        </Badge>
      )}
      <CardHeader className="p-4 sm:p-6 bg-card">
        <CardTitle className="font-headline text-lg sm:text-xl text-center font-semibold text-foreground">{plan.name}</CardTitle>
        <p className="text-xs text-muted-foreground text-center">{plan.limits}</p>
        <div className="text-center mt-2">
          <span className="text-3xl sm:text-4xl font-bold font-headline text-dynamic-accent">
            ₹{Math.round(displayPricePerMonth)}
          </span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
        
        {savingsAmount > 0 && (
          <Badge variant="outline" className="mx-auto mt-2 border-yellow-400 bg-yellow-50 text-yellow-700 text-xs font-medium">
            Savings of ₹{Math.round(savingsAmount)}!
          </Badge>
        )}
         <p className="text-xs text-muted-foreground text-center mt-1">
          Total ₹{Math.round(totalBilled)} for {tenure.displayName}
          {priceDetail.payingMonths && priceDetail.payingMonths < tenure.durationMonths ? ` (pay for ${priceDetail.payingMonths} months)` : ''}
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <ul className="space-y-1.5">
          {featuresToShow.map((feature, index) => (
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
