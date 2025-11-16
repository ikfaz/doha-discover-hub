import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PiggyBank, TrendingUp, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TaxBracket {
  country: string;
  effectiveRate: {
    low: number;    // For salaries around 20k QAR/month
    mid: number;    // For salaries around 30k QAR/month
    high: number;   // For salaries around 50k+ QAR/month
  };
  currency: string;
  notes: string;
}

const taxData: TaxBracket[] = [
  {
    country: 'United Kingdom',
    effectiveRate: { low: 20, mid: 32, high: 42 },
    currency: 'GBP',
    notes: 'Includes Income Tax and National Insurance. Higher rate kicks in above £50,270.',
  },
  {
    country: 'United States',
    effectiveRate: { low: 22, mid: 28, high: 35 },
    currency: 'USD',
    notes: 'Federal tax only. State taxes (0-13%) not included. Assumes standard deduction.',
  },
  {
    country: 'Canada',
    effectiveRate: { low: 20, mid: 29, high: 38 },
    currency: 'CAD',
    notes: 'Combined federal and provincial (Ontario average). Varies by province.',
  },
  {
    country: 'Australia',
    effectiveRate: { low: 21, mid: 32, high: 39 },
    currency: 'AUD',
    notes: 'Includes Medicare Levy (2%). Does not include Study and Training Support Levy.',
  },
  {
    country: 'Germany',
    effectiveRate: { low: 25, mid: 35, high: 45 },
    currency: 'EUR',
    notes: 'Includes solidarity surcharge. Social security contributions separate.',
  },
  {
    country: 'France',
    effectiveRate: { low: 20, mid: 30, high: 45 },
    currency: 'EUR',
    notes: 'Progressive tax system. Social contributions (CSG/CRDS) not included.',
  },
  {
    country: 'Netherlands',
    effectiveRate: { low: 37, mid: 40, high: 49 },
    currency: 'EUR',
    notes: 'High tax rate due to social security inclusion. Box 1 income taxation.',
  },
  {
    country: 'Sweden',
    effectiveRate: { low: 30, mid: 40, high: 52 },
    currency: 'SEK',
    notes: 'Includes municipal and state tax. One of the highest tax rates in Europe.',
  },
  {
    country: 'India',
    effectiveRate: { low: 15, mid: 20, high: 30 },
    currency: 'INR',
    notes: 'New tax regime rates. Old regime may have higher/lower rates with deductions.',
  },
  {
    country: 'South Africa',
    effectiveRate: { low: 18, mid: 26, high: 38 },
    currency: 'ZAR',
    notes: 'Progressive tax system. Primary rebate of R17,235 applied.',
  },
];

export const TaxSavingsCalculator = () => {
  const [country, setCountry] = useState<string>('');
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [salaryBracket, setSalaryBracket] = useState<'low' | 'mid' | 'high'>('mid');
  const [result, setResult] = useState<{
    country: string;
    taxRate: number;
    annualGross: number;
    annualTax: number;
    annualNet: number;
    annualSavings: number;
    currency: string;
    notes: string;
  } | null>(null);

  const handleCalculate = () => {
    if (!country || !monthlySalary) return;

    const salary = parseFloat(monthlySalary);
    if (isNaN(salary) || salary <= 0) return;

    const countryData = taxData.find(c => c.country === country);
    if (!countryData) return;

    const taxRate = countryData.effectiveRate[salaryBracket];
    const annualGross = salary * 12;
    const annualTax = annualGross * (taxRate / 100);
    const annualNet = annualGross - annualTax;
    const annualSavings = annualTax;

    setResult({
      country: countryData.country,
      taxRate,
      annualGross,
      annualTax,
      annualNet,
      annualSavings,
      currency: countryData.currency,
      notes: countryData.notes,
    });
  };

  const handleReset = () => {
    setCountry('');
    setMonthlySalary('');
    setSalaryBracket('mid');
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const calculateUSD = (qar: number) => {
    return Math.round(qar / 3.64);
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-6 w-6" />
          Tax Savings Calculator
        </CardTitle>
        <CardDescription>
          Calculate how much you save by working in tax-free Qatar compared to your home country
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Qatar imposes <strong>0% personal income tax</strong> on salaries. This calculator shows your savings compared to taxed countries.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Home Country *</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {taxData.map((c) => (
                  <SelectItem key={c.country} value={c.country}>
                    {c.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Monthly Salary (QAR) *</Label>
            <Input
              id="salary"
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              placeholder="25000"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bracket">Salary Level</Label>
            <Select value={salaryBracket} onValueChange={(value: any) => setSalaryBracket(value)}>
              <SelectTrigger id="bracket">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Lower (10-20k QAR)</SelectItem>
                <SelectItem value="mid">Middle (20-40k QAR)</SelectItem>
                <SelectItem value="high">Higher (40k+ QAR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!country || !monthlySalary}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Calculate Tax Savings
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tax Paid in {result.country}</p>
                    <p className="text-3xl font-bold text-destructive">
                      QAR {formatNumber(result.annualTax)}
                    </p>
                    <p className="text-sm font-medium">{result.taxRate}% effective tax rate</p>
                    <p className="text-xs text-muted-foreground">
                      (~${formatNumber(calculateUSD(result.annualTax))} USD annually)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Annual Savings in Qatar</p>
                    <p className="text-3xl font-bold text-primary">
                      QAR {formatNumber(result.annualSavings)}
                    </p>
                    <p className="text-sm font-medium">0% tax = 100% savings</p>
                    <p className="text-xs text-muted-foreground">
                      (~${formatNumber(calculateUSD(result.annualSavings))} USD annually)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold text-sm">Annual Gross Salary</h4>
                <p className="text-2xl font-bold">QAR {formatNumber(result.annualGross)}</p>
                <p className="text-xs text-muted-foreground">
                  ${formatNumber(calculateUSD(result.annualGross))} USD
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-destructive/5">
                <h4 className="font-semibold text-sm">Net in {result.country}</h4>
                <p className="text-2xl font-bold text-destructive">QAR {formatNumber(result.annualNet)}</p>
                <p className="text-xs text-muted-foreground">
                  After {result.taxRate}% tax deduction
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-primary/5">
                <h4 className="font-semibold text-sm">Net in Qatar</h4>
                <p className="text-2xl font-bold text-primary">QAR {formatNumber(result.annualGross)}</p>
                <p className="text-xs text-muted-foreground">
                  0% tax - keep 100% of salary
                </p>
              </div>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <PiggyBank className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">Long-term Savings Potential:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>3-year contract:</strong> Save QAR {formatNumber(result.annualSavings * 3)} (${formatNumber(calculateUSD(result.annualSavings * 3))} USD)</li>
                      <li>• <strong>5-year contract:</strong> Save QAR {formatNumber(result.annualSavings * 5)} (${formatNumber(calculateUSD(result.annualSavings * 5))} USD)</li>
                      <li>• <strong>10 years:</strong> Save QAR {formatNumber(result.annualSavings * 10)} (${formatNumber(calculateUSD(result.annualSavings * 10))} USD)</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-primary/20">
                    <p className="text-xs text-muted-foreground italic">
                      <strong>Note:</strong> {result.notes}
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Important Considerations:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>This calculation shows income tax savings only</li>
                    <li>Home country tax rates are approximate and vary by specific circumstances</li>
                    <li>Some countries may still require tax filing even if you're a non-resident</li>
                    <li>Social security, pension contributions, and other deductions not included</li>
                    <li>Currency conversion based on approximate 1 USD = 3.64 QAR</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};