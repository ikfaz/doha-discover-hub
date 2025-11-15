import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Smartphone, MapPin, DollarSign, Wifi } from "lucide-react";

export const MobilePlanComparison = () => {
  const [dataUsage, setDataUsage] = useState<string>("");
  const [callNeeds, setCallNeeds] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const questions = [
    {
      id: "data",
      label: "How much data do you typically use per month?",
      value: dataUsage,
      setValue: setDataUsage,
      icon: Smartphone,
      options: [
        { value: "light", label: "Light (under 10GB) - Basic browsing, messaging" },
        { value: "moderate", label: "Moderate (10-30GB) - Social media, streaming" },
        { value: "heavy", label: "Heavy (30-60GB) - Frequent streaming, downloads" },
        { value: "unlimited", label: "Unlimited - No restrictions needed" },
      ],
    },
    {
      id: "calls",
      label: "What are your international calling needs?",
      value: callNeeds,
      setValue: setCallNeeds,
      icon: Wifi,
      options: [
        { value: "none", label: "None - Use WhatsApp/apps only" },
        { value: "minimal", label: "Minimal (under 50 minutes/month)" },
        { value: "moderate", label: "Moderate (50-150 minutes/month)" },
        { value: "heavy", label: "Heavy (150+ minutes/month)" },
      ],
    },
    {
      id: "location",
      label: "Where do you spend most of your time?",
      value: location,
      setValue: setLocation,
      icon: MapPin,
      options: [
        { value: "doha", label: "Doha metropolitan area only" },
        { value: "mixed", label: "Mix of Doha and outer areas" },
        { value: "remote", label: "Frequently in remote/desert areas" },
        { value: "travel", label: "Frequent international travel" },
      ],
    },
    {
      id: "budget",
      label: "What is your monthly budget?",
      value: budget,
      setValue: setBudget,
      icon: DollarSign,
      options: [
        { value: "under150", label: "Under QAR 150 - Budget conscious" },
        { value: "150-250", label: "QAR 150-250 - Moderate spending" },
        { value: "250-400", label: "QAR 250-400 - Premium features" },
        { value: "over400", label: "Over QAR 400 - Best available" },
      ],
    },
  ];

  const getRecommendation = () => {
    if (!dataUsage || !callNeeds || !location || !budget) {
      return null;
    }

    let ooredooScore = 0;
    let vodafoneScore = 0;

    // Data usage scoring
    if (dataUsage === "unlimited") {
      if (budget === "over400") ooredooScore += 2;
      vodafoneScore += 2;
    } else if (dataUsage === "heavy") {
      vodafoneScore += 3; // Better value for heavy users
    } else {
      vodafoneScore += 2; // Better pricing for light/moderate
    }

    // International calls scoring
    if (callNeeds === "heavy" || callNeeds === "moderate") {
      ooredooScore += 3; // Ooredoo has better international packages
    } else {
      vodafoneScore += 1;
    }

    // Location scoring
    if (location === "remote") {
      ooredooScore += 4; // Ooredoo's coverage is superior
    } else if (location === "travel") {
      ooredooScore += 2; // Better roaming
    } else {
      vodafoneScore += 2; // Both good in Doha
    }

    // Budget scoring
    if (budget === "under150" || budget === "150-250") {
      vodafoneScore += 3; // Better value
    } else {
      ooredooScore += 1;
      vodafoneScore += 1;
    }

    const winner = ooredooScore > vodafoneScore ? "Ooredoo" : "Vodafone";
    const difference = Math.abs(ooredooScore - vodafoneScore);

    return {
      winner,
      ooredooScore,
      vodafoneScore,
      difference,
      recommendedPlan: getRecommendedPlan(winner, dataUsage, callNeeds, budget),
      reasoning: getReasoningText(winner, dataUsage, callNeeds, location, budget),
      closeCall: difference <= 2,
    };
  };

  const getRecommendedPlan = (
    provider: string,
    data: string,
    calls: string,
    budgetRange: string
  ) => {
    if (provider === "Ooredoo") {
      if (budgetRange === "over400") {
        return {
          name: "Shahry 400",
          price: "QAR 400/month",
          features: ["Unlimited data", "Unlimited local calls", "400 international minutes", "Premium roaming"],
        };
      } else if (budgetRange === "250-400") {
        return {
          name: "Shahry 250",
          price: "QAR 250/month",
          features: ["30GB data", "Unlimited local calls", "200 international minutes", "Roaming benefits"],
        };
      } else {
        return {
          name: "Shahry 150",
          price: "QAR 150/month",
          features: ["10GB data", "Unlimited local calls", "100 international minutes", "Social media packages"],
        };
      }
    } else {
      if (budgetRange === "over400") {
        return {
          name: "Red XL",
          price: "QAR 500/month",
          features: ["Unlimited data", "All inclusive", "Maximum roaming", "Entertainment bundles"],
        };
      } else if (budgetRange === "250-400") {
        return {
          name: "Red L",
          price: "QAR 350/month",
          features: ["60GB data", "Unlimited local calls", "300 international minutes", "Premium content"],
        };
      } else if (budgetRange === "150-250") {
        return {
          name: "Red M",
          price: "QAR 200/month",
          features: ["25GB data", "Unlimited local calls", "150 international minutes", "Entertainment included"],
        };
      } else {
        return {
          name: "Red XS",
          price: "QAR 130/month",
          features: ["8GB data", "Unlimited local calls", "50 international minutes", "Budget friendly"],
        };
      }
    }
  };

  const getReasoningText = (
    winner: string,
    data: string,
    calls: string,
    loc: string,
    budgetRange: string
  ) => {
    const reasons: string[] = [];

    if (winner === "Ooredoo") {
      if (loc === "remote") {
        reasons.push("Ooredoo has superior coverage in remote and desert areas");
      }
      if (calls === "heavy" || calls === "moderate") {
        reasons.push("Ooredoo offers better international calling packages");
      }
      if (loc === "travel") {
        reasons.push("Ooredoo's roaming partnerships are more extensive globally");
      }
      if (data === "unlimited" && budgetRange === "over400") {
        reasons.push("Ooredoo's premium unlimited plan includes excellent roaming");
      }
    } else {
      if (budgetRange === "under150" || budgetRange === "150-250") {
        reasons.push("Vodafone offers 10-15% better value in this price range");
      }
      if (data === "heavy") {
        reasons.push("Vodafone provides better data-to-price ratio for heavy users");
      }
      if (loc === "doha") {
        reasons.push("Both have excellent Doha coverage; Vodafone is more affordable");
      }
      if (calls === "none" || calls === "minimal") {
        reasons.push("Vodafone's plans optimize for data over international minutes");
      }
      reasons.push("Vodafone includes entertainment streaming in most plans");
    }

    return reasons;
  };

  const result = getRecommendation();

  const comparisonData = [
    {
      feature: "Coverage (Doha)",
      ooredoo: { rating: "excellent", text: "Excellent" },
      vodafone: { rating: "excellent", text: "Excellent" },
    },
    {
      feature: "Coverage (Remote Areas)",
      ooredoo: { rating: "excellent", text: "Superior" },
      vodafone: { rating: "good", text: "Good" },
    },
    {
      feature: "Pricing (Value)",
      ooredoo: { rating: "good", text: "Premium" },
      vodafone: { rating: "excellent", text: "Better value" },
    },
    {
      feature: "International Minutes",
      ooredoo: { rating: "excellent", text: "More generous" },
      vodafone: { rating: "good", text: "Adequate" },
    },
    {
      feature: "5G Network",
      ooredoo: { rating: "excellent", text: "95% coverage" },
      vodafone: { rating: "excellent", text: "90% coverage" },
    },
    {
      feature: "Mobile App",
      ooredoo: { rating: "good", text: "Functional" },
      vodafone: { rating: "excellent", text: "Superior UX" },
    },
    {
      feature: "Customer Service",
      ooredoo: { rating: "good", text: "More locations" },
      vodafone: { rating: "excellent", text: "Faster response" },
    },
    {
      feature: "Entertainment Bundles",
      ooredoo: { rating: "fair", text: "Limited" },
      vodafone: { rating: "excellent", text: "Included" },
    },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "fair":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Mobile Plan Recommendation Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => {
            const IconComponent = question.icon;
            return (
              <div key={question.id} className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-primary" />
                  {question.label}
                </Label>
                <RadioGroup value={question.value} onValueChange={question.setValue}>
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            );
          })}
        </div>

        {/* Recommendation Result */}
        {result && (
          <div className="mt-8 p-6 bg-primary/5 rounded-lg space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-xl font-bold text-foreground">Your Recommended Provider</h3>
              <Badge 
                variant={result.winner === "Ooredoo" ? "default" : "secondary"} 
                className="text-lg px-4 py-1"
              >
                {result.winner}
              </Badge>
            </div>
            
            {/* Recommended Plan */}
            <div className="p-4 bg-background rounded-lg border-2 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-foreground">{result.recommendedPlan.name}</h4>
                <p className="text-xl font-bold text-primary">{result.recommendedPlan.price}</p>
              </div>
              <ul className="space-y-2">
                {result.recommendedPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Reasoning */}
            <div className="space-y-2">
              <p className="font-semibold text-sm text-muted-foreground">Why this recommendation:</p>
              <ul className="space-y-1">
                {result.reasoning.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.closeCall && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> The scores are close. Consider trying prepaid SIMs from both providers to test coverage at your home and workplace before committing to a postpaid contract.
                </p>
              </div>
            )}

            <div className="flex gap-4 text-center pt-4 border-t">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Ooredoo Score</p>
                <p className="text-2xl font-bold text-foreground">{result.ooredooScore}/12</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Vodafone Score</p>
                <p className="text-2xl font-bold text-foreground">{result.vodafoneScore}/12</p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Comparison Table */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Detailed Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Feature</th>
                  <th className="text-left p-3 font-semibold">Ooredoo</th>
                  <th className="text-left p-3 font-semibold">Vodafone</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{item.feature}</td>
                    <td className="p-3">
                      <span className={`font-semibold ${getRatingColor(item.ooredoo.rating)}`}>
                        {item.ooredoo.text}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-semibold ${getRatingColor(item.vodafone.rating)}`}>
                        {item.vodafone.text}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Section */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Money-Saving Tips:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Start with prepaid to test coverage before committing</li>
            <li>• Bundle home internet with mobile for discounts</li>
            <li>• Use WiFi whenever possible to conserve mobile data</li>
            <li>• WhatsApp/FaceTime are free alternatives to international calls</li>
            <li>• Watch for end-of-quarter promotional offers</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
