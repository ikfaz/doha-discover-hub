import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Info, Calculator } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export const RentalPropertyROICalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState<string>('');
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [maintenanceCost, setMaintenanceCost] = useState<string>('2');
  const [managementFee, setManagementFee] = useState<string>('5');
  const [serviceFee, setServiceFee] = useState<string>('');
  const [mortgagePayment, setMortgagePayment] = useState<string>('');
  const [result, setResult] = useState<{
    annualRent: number;
    maintenanceCost: number;
    managementFee: number;
    serviceFee: number;
    mortgagePayment: number;
    grossIncome: number;
    totalExpenses: number;
    netIncomeBeforeTax: number;
    rentalIncomeTax: number;
    netIncomeAfterTax: number;
    annualROI: number;
    monthlyNetIncome: number;
    breakEvenYears: number;
    fiveYearReturn: number;
    tenYearReturn: number;
  } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(propertyPrice);
    const rent = parseFloat(monthlyRent);
    const maintenancePercent = parseFloat(maintenanceCost);
    const managementPercent = parseFloat(managementFee);
    const service = parseFloat(serviceFee) || 0;
    const mortgage = parseFloat(mortgagePayment) || 0;

    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) return;

    const annualRent = rent * 12;
    const maintenanceCostAmount = annualRent * (maintenancePercent / 100);
    const managementFeeAmount = annualRent * (managementPercent / 100);
    const serviceFeeAmount = service * 12;
    const mortgagePaymentAmount = mortgage * 12;

    const grossIncome = annualRent;
    const totalExpenses = maintenanceCostAmount + managementFeeAmount + serviceFeeAmount + mortgagePaymentAmount;
    const netIncomeBeforeTax = grossIncome - totalExpenses;
    
    // 10% rental income tax on net rental income
    const rentalIncomeTax = netIncomeBeforeTax > 0 ? netIncomeBeforeTax * 0.10 : 0;
    const netIncomeAfterTax = netIncomeBeforeTax - rentalIncomeTax;
    
    const annualROI = (netIncomeAfterTax / price) * 100;
    const monthlyNetIncome = netIncomeAfterTax / 12;
    const breakEvenYears = netIncomeAfterTax > 0 ? price / netIncomeAfterTax : 0;
    const fiveYearReturn = netIncomeAfterTax * 5;
    const tenYearReturn = netIncomeAfterTax * 10;

    setResult({
      annualRent,
      maintenanceCost: maintenanceCostAmount,
      managementFee: managementFeeAmount,
      serviceFee: serviceFeeAmount,
      mortgagePayment: mortgagePaymentAmount,
      grossIncome,
      totalExpenses,
      netIncomeBeforeTax,
      rentalIncomeTax,
      netIncomeAfterTax,
      annualROI,
      monthlyNetIncome,
      breakEvenYears,
      fiveYearReturn,
      tenYearReturn,
    });
  };

  const handleReset = () => {
    setPropertyPrice('');
    setMonthlyRent('');
    setMaintenanceCost('2');
    setManagementFee('5');
    setServiceFee('');
    setMortgagePayment('');
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const formatPercent = (num: number) => {
    return num.toFixed(2);
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          Rental Property ROI Calculator
        </CardTitle>
        <CardDescription>
          Calculate your real estate investment returns in Qatar after rental income tax and all expenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Rental income in Qatar is subject to <strong>10% corporate income tax</strong>. This calculator factors in all costs to show your true ROI.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyPrice">Property Purchase Price (QAR) *</Label>
              <Input
                id="propertyPrice"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                placeholder="1500000"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Monthly Rental Income (QAR) *</Label>
              <Input
                id="monthlyRent"
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                placeholder="8000"
                min="0"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Annual Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Maintenance & Repairs (% of rent)</Label>
              <Input
                id="maintenanceCost"
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)}
                placeholder="2"
                min="0"
                max="100"
                step="0.5"
              />
              <p className="text-xs text-muted-foreground">Typical: 2-5% of annual rent</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managementFee">Property Management Fee (% of rent)</Label>
              <Input
                id="managementFee"
                type="number"
                value={managementFee}
                onChange={(e) => setManagementFee(e.target.value)}
                placeholder="5"
                min="0"
                max="100"
                step="0.5"
              />
              <p className="text-xs text-muted-foreground">Typical: 5-10% if using agency</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceFee">Monthly Service/HOA Fees (QAR)</Label>
              <Input
                id="serviceFee"
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                placeholder="500"
                min="0"
              />
              <p className="text-xs text-muted-foreground">Common in The Pearl, Lusail</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mortgagePayment">Monthly Mortgage Payment (QAR)</Label>
              <Input
                id="mortgagePayment"
                type="number"
                value={mortgagePayment}
                onChange={(e) => setMortgagePayment(e.target.value)}
                placeholder="0"
                min="0"
              />
              <p className="text-xs text-muted-foreground">Leave blank if purchased outright</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!propertyPrice || !monthlyRent}
            className="flex-1"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate ROI
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Annual ROI</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatPercent(result.annualROI)}%
                    </p>
                    <p className="text-sm font-medium">After all taxes & costs</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Net Income</p>
                    <p className="text-3xl font-bold text-secondary">
                      QAR {formatNumber(result.monthlyNetIncome)}
                    </p>
                    <p className="text-sm font-medium">After tax & expenses</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Break-even Period</p>
                    <p className="text-3xl font-bold">
                      {result.breakEvenYears > 0 ? formatPercent(result.breakEvenYears) : 'N/A'}
                    </p>
                    <p className="text-sm font-medium">{result.breakEvenYears > 0 ? 'Years' : 'Negative returns'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Income Breakdown (Annual)</h4>
              <div className="space-y-2 p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between">
                  <span className="text-sm">Gross Rental Income</span>
                  <span className="font-semibold">QAR {formatNumber(result.grossIncome)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Maintenance & Repairs ({maintenanceCost}%)</span>
                  <span>- QAR {formatNumber(result.maintenanceCost)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Property Management ({managementFee}%)</span>
                  <span>- QAR {formatNumber(result.managementFee)}</span>
                </div>
                {result.serviceFee > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service/HOA Fees</span>
                    <span>- QAR {formatNumber(result.serviceFee)}</span>
                  </div>
                )}
                {result.mortgagePayment > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mortgage Payments</span>
                    <span>- QAR {formatNumber(result.mortgagePayment)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Net Income Before Tax</span>
                  <span className="font-semibold">QAR {formatNumber(result.netIncomeBeforeTax)}</span>
                </div>
                <div className="flex justify-between text-sm text-destructive">
                  <span>Rental Income Tax (10%)</span>
                  <span>- QAR {formatNumber(result.rentalIncomeTax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Net Income After Tax</span>
                  <span className="font-bold text-primary">QAR {formatNumber(result.netIncomeAfterTax)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Long-term Projections</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-lg bg-primary/5">
                  <h5 className="text-sm font-medium text-muted-foreground">5-Year Total Return</h5>
                  <p className="text-2xl font-bold text-primary">QAR {formatNumber(result.fiveYearReturn)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercent((result.fiveYearReturn / parseFloat(propertyPrice)) * 100)}% of property value
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-lg bg-secondary/5">
                  <h5 className="text-sm font-medium text-muted-foreground">10-Year Total Return</h5>
                  <p className="text-2xl font-bold text-secondary">QAR {formatNumber(result.tenYearReturn)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercent((result.tenYearReturn / parseFloat(propertyPrice)) * 100)}% of property value
                  </p>
                </div>
              </div>
            </div>

            <Alert className={result.annualROI >= 5 ? 'bg-primary/5 border-primary/20' : 'bg-destructive/5 border-destructive/20'}>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {result.annualROI >= 5 ? 'Good Investment Potential' : 'Low Return Investment'}
                  </p>
                  {result.annualROI >= 5 ? (
                    <p className="text-sm">
                      Your projected ROI of {formatPercent(result.annualROI)}% exceeds the typical 4-6% benchmark for Qatar rental properties. This could be a solid investment opportunity.
                    </p>
                  ) : result.annualROI >= 0 ? (
                    <p className="text-sm">
                      Your projected ROI of {formatPercent(result.annualROI)}% is below the typical 4-6% benchmark. Consider negotiating a better purchase price or higher rent.
                    </p>
                  ) : (
                    <p className="text-sm">
                      Your expenses exceed your rental income, resulting in negative returns. This property would lose money each year.
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Important Considerations:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>This calculation does not include property appreciation/depreciation</li>
                    <li>Vacancy periods will reduce actual returns</li>
                    <li>Initial purchase costs (registration fees, agent fees) not included</li>
                    <li>Rental income tax is paid annually to Qatar tax authorities</li>
                    <li>Foreign ownership restricted to designated freehold areas in Qatar</li>
                    <li>Mortgage interest rates in Qatar typically range from 3-5%</li>
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