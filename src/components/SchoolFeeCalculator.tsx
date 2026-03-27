import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const SchoolFeeCalculator = () => {
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [schoolTier, setSchoolTier] = useState<'premium' | 'high' | 'mid'>('high');
  const [includeTransport, setIncludeTransport] = useState(true);
  const [includeExtras, setIncludeExtras] = useState(true);
  const [annualIncrease, setAnnualIncrease] = useState(4);

  const tierFees = {
    premium: { min: 85000, max: 115000, name: 'Premium Tier' },
    high: { min: 50000, max: 80000, name: 'High Tier' },
    mid: { min: 15000, max: 50000, name: 'Mid Tier' },
  };

  const selectedTier = tierFees[schoolTier];
  const avgTuition = (selectedTier.min + selectedTier.max) / 2;
  const totalTuition = avgTuition * numberOfChildren;

  // Additional costs per child
  const registrationFee = schoolTier === 'premium' ? 5000 : schoolTier === 'high' ? 3500 : 2000;
  const uniformCost = 2000;
  const booksCost = schoolTier === 'premium' ? 4000 : 3000;
  const transportCost = includeTransport ? (schoolTier === 'premium' ? 8000 : 6000) : 0;
  const extrasCost = includeExtras ? (schoolTier === 'premium' ? 6000 : schoolTier === 'high' ? 4000 : 2000) : 0;

  const additionalPerChild = uniformCost + booksCost + transportCost + extrasCost;
  const totalAdditional = additionalPerChild * numberOfChildren;
  const oneTimeRegistration = registrationFee * numberOfChildren;

  const yearOneTotal = totalTuition + totalAdditional + oneTimeRegistration;
  const annualRecurring = totalTuition + totalAdditional;

  // Multi-year projection
  const yearTwo = annualRecurring * (1 + annualIncrease / 100);
  const yearThree = yearTwo * (1 + annualIncrease / 100);
  const threeYearTotal = yearOneTotal + yearTwo + yearThree;

  // Calculate recommended education allowance
  const recommendedMonthly = Math.ceil(annualRecurring / 12);
  const recommendedAnnual = recommendedMonthly * 12;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            School Fee Calculator
          </CardTitle>
          <CardDescription>
            Calculate total education costs and recommended employer allowances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="children">Number of Children</Label>
              <Input
                id="children"
                type="number"
                min="1"
                max="5"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(Math.max(1, Math.min(5, Number(e.target.value))))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tier">School Tier</Label>
              <Select value={schoolTier} onValueChange={(v) => setSchoolTier(v as any)}>
                <SelectTrigger id="tier" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium">Premium (QAR 85k-115k)</SelectItem>
                  <SelectItem value="high">High (QAR 50k-80k)</SelectItem>
                  <SelectItem value="mid">Mid (QAR 15k-50k)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="transport"
                checked={includeTransport}
                onChange={(e) => setIncludeTransport(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="transport" className="cursor-pointer">
                Include School Transport
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="extras"
                checked={includeExtras}
                onChange={(e) => setIncludeExtras(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="extras" className="cursor-pointer">
                Include Activities & Trips
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="increase">Expected Annual Fee Increase: {annualIncrease}%</Label>
            <input
              id="increase"
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={annualIncrease}
              onChange={(e) => setAnnualIncrease(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <Separator />

          {/* Cost Breakdown */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Annual Cost Breakdown</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tuition ({numberOfChildren} {numberOfChildren === 1 ? 'child' : 'children'})</span>
                <span className="font-semibold">QAR {totalTuition.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Uniforms</span>
                <span className="font-medium">QAR {(uniformCost * numberOfChildren).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Books & Materials</span>
                <span className="font-medium">QAR {(booksCost * numberOfChildren).toLocaleString()}</span>
              </div>

              {includeTransport && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">School Transport</span>
                  <span className="font-medium">QAR {(transportCost * numberOfChildren).toLocaleString()}</span>
                </div>
              )}

              {includeExtras && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Activities & Trips</span>
                  <span className="font-medium">QAR {(extrasCost * numberOfChildren).toLocaleString()}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between items-center text-base">
                <span className="font-semibold">Annual Recurring Costs</span>
                <span className="font-bold text-primary text-lg">QAR {annualRecurring.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm bg-muted/50 p-3 rounded">
                <span className="text-muted-foreground">One-time Registration Fees</span>
                <span className="font-medium">QAR {oneTimeRegistration.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
                <span className="font-semibold text-lg">Year One Total</span>
                <span className="font-bold text-primary text-xl">QAR {yearOneTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Multi-Year Projection */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              3-Year Cost Projection
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted/30 rounded">
                <span>Year 1</span>
                <span className="font-semibold">QAR {yearOneTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/30 rounded">
                <span>Year 2 (+{annualIncrease}%)</span>
                <span className="font-semibold">QAR {Math.round(yearTwo).toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/30 rounded">
                <span>Year 3 (+{annualIncrease}%)</span>
                <span className="font-semibold">QAR {Math.round(yearThree).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between p-3 bg-primary/10 rounded-lg font-bold">
                <span>3-Year Total</span>
                <span className="text-primary">QAR {Math.round(threeYearTotal).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Employer Negotiation */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Recommended Education Allowance
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Allowance</span>
                <Badge variant="default" className="text-base px-3 py-1">
                  QAR {recommendedMonthly.toLocaleString()}/month
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Annual Allowance</span>
                <Badge variant="outline" className="text-base px-3 py-1">
                  QAR {recommendedAnnual.toLocaleString()}/year
                </Badge>
              </div>
              <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>
                  Negotiate for annual increases matching inflation ({annualIncrease}%) and ensure registration fees are covered separately or in first-year bonus.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Per Child/Year</p>
              <p className="font-bold text-primary">QAR {Math.round((annualRecurring / numberOfChildren)).toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Monthly Cost</p>
              <p className="font-bold text-primary">QAR {Math.round(annualRecurring / 12).toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">USD Equivalent</p>
              <p className="font-bold text-primary">${Math.round(annualRecurring * 0.275).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolFeeCalculator;
