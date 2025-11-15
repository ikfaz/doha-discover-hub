import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plane, DollarSign, Calendar } from "lucide-react";

interface RoamingRate {
  region: string;
  ooredooDaily: number;
  vodafoneDaily: number;
  ooredooWeekly: number;
  vodafoneWeekly: number;
  ooredooMonthly: number;
  vodafoneMonthly: number;
}

export const RoamingCostComparison = () => {
  const [destination, setDestination] = useState<string>("");
  const [daysPerTrip, setDaysPerTrip] = useState<number>(7);
  const [tripsPerYear, setTripsPerYear] = useState<number>(4);

  const roamingRates: Record<string, RoamingRate> = {
    gcc: {
      region: "GCC Countries (UAE, Saudi, Kuwait, Bahrain, Oman)",
      ooredooDaily: 25,
      vodafoneDaily: 20,
      ooredooWeekly: 150,
      vodafoneWeekly: 120,
      ooredooMonthly: 500,
      vodafoneMonthly: 400,
    },
    europe: {
      region: "Europe (UK, France, Germany, Spain, Italy)",
      ooredooDaily: 50,
      vodafoneDaily: 45,
      ooredooWeekly: 300,
      vodafoneWeekly: 270,
      ooredooMonthly: 1000,
      vodafoneMonthly: 900,
    },
    asia: {
      region: "Asia (India, Thailand, Malaysia, Singapore)",
      ooredooDaily: 40,
      vodafoneDaily: 35,
      ooredooWeekly: 250,
      vodafoneWeekly: 220,
      ooredooMonthly: 850,
      vodafoneMonthly: 750,
    },
    usa: {
      region: "USA & Canada",
      ooredooDaily: 60,
      vodafoneDaily: 55,
      ooredooWeekly: 350,
      vodafoneWeekly: 320,
      ooredooMonthly: 1200,
      vodafoneMonthly: 1100,
    },
    africa: {
      region: "Africa (Egypt, Morocco, Kenya, South Africa)",
      ooredooDaily: 45,
      vodafoneDaily: 40,
      ooredooWeekly: 280,
      vodafoneWeekly: 250,
      ooredooMonthly: 950,
      vodafoneMonthly: 850,
    },
    australia: {
      region: "Australia & New Zealand",
      ooredooDaily: 65,
      vodafoneDaily: 60,
      ooredooWeekly: 380,
      vodafoneWeekly: 350,
      ooredooMonthly: 1300,
      vodafoneMonthly: 1200,
    },
  };

  const calculateCosts = () => {
    if (!destination) return null;

    const rates = roamingRates[destination];
    const totalDaysPerYear = daysPerTrip * tripsPerYear;

    // Calculate best package per trip
    const getBestPackagePerTrip = (daily: number, weekly: number, monthly: number) => {
      if (daysPerTrip <= 3) {
        return { type: "Daily", cost: daily * daysPerTrip };
      } else if (daysPerTrip <= 10) {
        const dailyCost = daily * daysPerTrip;
        const weeklyCost = weekly;
        return dailyCost < weeklyCost 
          ? { type: "Daily", cost: dailyCost }
          : { type: "Weekly", cost: weeklyCost };
      } else {
        const weeklyCost = weekly * Math.ceil(daysPerTrip / 7);
        const monthlyCost = monthly;
        return weeklyCost < monthlyCost
          ? { type: "Weekly", cost: weeklyCost }
          : { type: "Monthly", cost: monthlyCost };
      }
    };

    const ooredooBestPackage = getBestPackagePerTrip(
      rates.ooredooDaily,
      rates.ooredooWeekly,
      rates.ooredooMonthly
    );
    const vodafoneBestPackage = getBestPackagePerTrip(
      rates.vodafoneDaily,
      rates.vodafoneWeekly,
      rates.vodafoneMonthly
    );

    const ooredooAnnualCost = ooredooBestPackage.cost * tripsPerYear;
    const vodafoneAnnualCost = vodafoneBestPackage.cost * tripsPerYear;

    const savings = ooredooAnnualCost - vodafoneAnnualCost;
    const winner = savings > 0 ? "Vodafone" : "Ooredoo";

    return {
      rates,
      ooredooBestPackage,
      vodafoneBestPackage,
      ooredooAnnualCost,
      vodafoneAnnualCost,
      totalDaysPerYear,
      savings: Math.abs(savings),
      winner,
    };
  };

  const result = calculateCosts();

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>International Roaming Cost Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="destination" className="flex items-center gap-2 text-base font-semibold">
              <Plane className="w-5 h-5 text-primary" />
              Travel Destination
            </Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination" className="bg-background">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="gcc">GCC Countries</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="usa">USA & Canada</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="australia">Australia & NZ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Calendar className="w-5 h-5 text-primary" />
              Days per Trip: {daysPerTrip}
            </Label>
            <Slider
              min={1}
              max={30}
              step={1}
              value={[daysPerTrip]}
              onValueChange={(value) => setDaysPerTrip(value[0])}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground">Average length of each trip</p>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <DollarSign className="w-5 h-5 text-primary" />
              Trips per Year: {tripsPerYear}
            </Label>
            <Slider
              min={1}
              max={12}
              step={1}
              value={[tripsPerYear]}
              onValueChange={(value) => setTripsPerYear(value[0])}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground">How often you travel annually</p>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">Selected Region:</p>
              <p className="font-semibold">{result.rates.region}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Total travel days per year: <strong>{result.totalDaysPerYear} days</strong>
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ooredoo Card */}
              <div className={`p-6 rounded-lg border-2 ${result.winner === "Ooredoo" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Ooredoo</h3>
                  {result.winner === "Ooredoo" && (
                    <Badge className="bg-green-600">Best Value</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Package per Trip</p>
                    <p className="text-xl font-bold text-foreground">{result.ooredooBestPackage.type}</p>
                    <p className="text-2xl font-bold text-primary">QAR {result.ooredooBestPackage.cost.toFixed(0)}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Annual Cost ({tripsPerYear} trips)</p>
                    <p className="text-3xl font-bold text-foreground">QAR {result.ooredooAnnualCost.toFixed(0)}</p>
                  </div>

                  <div className="pt-4 border-t space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily pass:</span>
                      <span className="font-semibold">QAR {result.rates.ooredooDaily}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly pass:</span>
                      <span className="font-semibold">QAR {result.rates.ooredooWeekly}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly pass:</span>
                      <span className="font-semibold">QAR {result.rates.ooredooMonthly}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vodafone Card */}
              <div className={`p-6 rounded-lg border-2 ${result.winner === "Vodafone" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Vodafone</h3>
                  {result.winner === "Vodafone" && (
                    <Badge className="bg-green-600">Best Value</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recommended Package per Trip</p>
                    <p className="text-xl font-bold text-foreground">{result.vodafoneBestPackage.type}</p>
                    <p className="text-2xl font-bold text-primary">QAR {result.vodafoneBestPackage.cost.toFixed(0)}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Annual Cost ({tripsPerYear} trips)</p>
                    <p className="text-3xl font-bold text-foreground">QAR {result.vodafoneAnnualCost.toFixed(0)}</p>
                  </div>

                  <div className="pt-4 border-t space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily pass:</span>
                      <span className="font-semibold">QAR {result.rates.vodafoneDaily}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly pass:</span>
                      <span className="font-semibold">QAR {result.rates.vodafoneWeekly}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly pass:</span>
                      <span className="font-semibold">QAR {result.rates.vodafoneMonthly}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Annual Savings with {result.winner}</p>
                  <p className="text-3xl font-bold text-green-600">QAR {result.savings.toFixed(0)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Per Trip Savings</p>
                  <p className="text-2xl font-bold text-foreground">QAR {(result.savings / tripsPerYear).toFixed(0)}</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Roaming Tips:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Activate roaming packages before departure to avoid higher pay-as-you-go rates</li>
                <li>• Both providers offer auto-renewal options for frequent travelers</li>
                <li>• Consider buying local SIM cards for trips longer than 2 weeks</li>
                <li>• Use WiFi calling when available to save on roaming charges</li>
                <li>• Check if your monthly plan includes roaming benefits in certain regions</li>
              </ul>
            </div>

            {/* Important Note */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> These are estimated rates based on standard roaming packages. Actual costs may vary based on your plan tier, promotional offers, and usage patterns. Premium plans (Shahry 400, Red XL) often include better roaming benefits. Always check current rates before traveling.
              </p>
            </div>
          </div>
        )}

        {!result && (
          <div className="p-8 text-center text-muted-foreground">
            <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select your travel destination and trip details to compare roaming costs</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
