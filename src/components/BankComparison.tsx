import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

export const BankComparison = () => {
  const [salary, setSalary] = useState<string>("");
  const [stayDuration, setStayDuration] = useState<string>("");
  const [transferFrequency, setTransferFrequency] = useState<string>("");
  const [branchImportance, setBranchImportance] = useState<string>("");

  const questions = [
    {
      id: "salary",
      label: "What is your monthly salary range?",
      value: salary,
      setValue: setSalary,
      options: [
        { value: "under10k", label: "Under QAR 10,000" },
        { value: "10k-15k", label: "QAR 10,000-15,000" },
        { value: "15k-25k", label: "QAR 15,000-25,000" },
        { value: "over25k", label: "Over QAR 25,000" },
      ],
    },
    {
      id: "duration",
      label: "How long do you plan to stay in Qatar?",
      value: stayDuration,
      setValue: setStayDuration,
      options: [
        { value: "1year", label: "1 year or less" },
        { value: "2-3years", label: "2-3 years" },
        { value: "3-5years", label: "3-5 years" },
        { value: "5plus", label: "5+ years or indefinite" },
      ],
    },
    {
      id: "transfers",
      label: "How often do you make international transfers?",
      value: transferFrequency,
      setValue: setTransferFrequency,
      options: [
        { value: "never", label: "Rarely or never" },
        { value: "monthly", label: "Monthly" },
        { value: "weekly", label: "Weekly" },
        { value: "frequent", label: "Very frequently" },
      ],
    },
    {
      id: "branches",
      label: "How important is branch access?",
      value: branchImportance,
      setValue: setBranchImportance,
      options: [
        { value: "not", label: "Not important (prefer digital)" },
        { value: "somewhat", label: "Somewhat important" },
        { value: "very", label: "Very important" },
        { value: "essential", label: "Essential" },
      ],
    },
  ];

  const getRecommendation = () => {
    if (!salary || !stayDuration || !transferFrequency || !branchImportance) {
      return null;
    }

    let qnbScore = 0;
    let internationalScore = 0;

    // Salary scoring
    if (salary === "under10k" || salary === "10k-15k") {
      qnbScore += 3;
    } else {
      internationalScore += 3;
    }

    // Duration scoring
    if (stayDuration === "5plus" || stayDuration === "3-5years") {
      qnbScore += 2;
    } else {
      internationalScore += 2;
    }

    // Transfer frequency scoring
    if (transferFrequency === "never" || transferFrequency === "monthly") {
      qnbScore += 2;
    } else {
      internationalScore += 3;
    }

    // Branch importance scoring
    if (branchImportance === "very" || branchImportance === "essential") {
      qnbScore += 3;
    } else {
      internationalScore += 2;
    }

    const winner = qnbScore > internationalScore ? "QNB" : "HSBC";
    const difference = Math.abs(qnbScore - internationalScore);

    return {
      winner,
      qnbScore,
      internationalScore,
      difference,
      recommendation: winner === "QNB" 
        ? "QNB is the better fit for your situation"
        : "An international bank (HSBC/Standard Chartered) is the better fit for your situation",
      reasoning: getReasoningText(winner, salary, stayDuration, transferFrequency, branchImportance),
      considerBoth: difference <= 2,
    };
  };

  const getReasoningText = (
    winner: string,
    sal: string,
    duration: string,
    transfers: string,
    branches: string
  ) => {
    const reasons: string[] = [];

    if (winner === "QNB") {
      if (sal === "under10k" || sal === "10k-15k") {
        reasons.push("Your salary range meets QNB's lower requirements");
      }
      if (duration === "5plus" || duration === "3-5years") {
        reasons.push("Long-term stay benefits from QNB's extensive local network");
      }
      if (branches === "very" || branches === "essential") {
        reasons.push("QNB offers Qatar's largest branch network (65+ locations)");
      }
      if (transfers === "never" || transfers === "monthly") {
        reasons.push("Low international transfer frequency reduces QNB's higher fee impact");
      }
    } else {
      if (sal === "15k-25k" || sal === "over25k") {
        reasons.push("Your salary qualifies for international banks' premium services");
      }
      if (duration === "1year" || duration === "2-3years") {
        reasons.push("Shorter stays benefit from easier account closure with international banks");
      }
      if (transfers === "weekly" || transfers === "frequent") {
        reasons.push("Frequent international transfers are cheaper with HSBC/Standard Chartered");
      }
      if (branches === "not") {
        reasons.push("Digital-first preference aligns with international banks' strong mobile apps");
      }
    }

    return reasons;
  };

  const result = getRecommendation();

  const comparisonData = [
    {
      feature: "Branch Network",
      qnb: { rating: "excellent", text: "65+ branches" },
      international: { rating: "limited", text: "5-6 branches" },
    },
    {
      feature: "ATM Access",
      qnb: { rating: "excellent", text: "Largest network" },
      international: { rating: "good", text: "Shared networks" },
    },
    {
      feature: "International Transfers",
      qnb: { rating: "poor", text: "High fees" },
      international: { rating: "excellent", text: "Competitive rates" },
    },
    {
      feature: "Customer Service",
      qnb: { rating: "fair", text: "Can be slow" },
      international: { rating: "good", text: "More efficient" },
    },
    {
      feature: "Account Closure",
      qnb: { rating: "poor", text: "Complex process" },
      international: { rating: "good", text: "Smoother exit" },
    },
    {
      feature: "Minimum Salary",
      qnb: { rating: "excellent", text: "QAR 3,000+" },
      international: { rating: "fair", text: "QAR 15,000+" },
    },
    {
      feature: "Mobile Banking",
      qnb: { rating: "good", text: "Full featured" },
      international: { rating: "excellent", text: "Global access" },
    },
    {
      feature: "Monthly Fees",
      qnb: { rating: "good", text: "QAR 0-50" },
      international: { rating: "fair", text: "QAR 50-100" },
    },
  ];

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "excellent":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "good":
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case "fair":
        return <MinusCircle className="w-5 h-5 text-yellow-600" />;
      case "poor":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Bank Comparison & Recommendation Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <Label className="text-base font-semibold">{question.label}</Label>
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
          ))}
        </div>

        {/* Recommendation Result */}
        {result && (
          <div className="mt-8 p-6 bg-primary/5 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Your Recommendation</h3>
              <Badge variant={result.winner === "QNB" ? "default" : "secondary"} className="text-lg px-4 py-1">
                {result.winner}
              </Badge>
            </div>
            
            <p className="text-lg font-semibold text-foreground">{result.recommendation}</p>
            
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

            {result.considerBoth && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-foreground">
                  <strong>Consider maintaining both:</strong> Your scores are close. Many expats successfully use QNB for local transactions and an international bank for savings and transfers.
                </p>
              </div>
            )}

            <div className="flex gap-4 text-center pt-4 border-t">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">QNB Score</p>
                <p className="text-2xl font-bold text-foreground">{result.qnbScore}/10</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">International Score</p>
                <p className="text-2xl font-bold text-foreground">{result.internationalScore}/10</p>
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
                  <th className="text-left p-3 font-semibold">QNB</th>
                  <th className="text-left p-3 font-semibold">International Banks</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{item.feature}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getRatingIcon(item.qnb.rating)}
                        <span className="text-sm">{item.qnb.text}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getRatingIcon(item.international.rating)}
                        <span className="text-sm">{item.international.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
