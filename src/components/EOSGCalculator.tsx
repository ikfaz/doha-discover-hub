import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const EOSGCalculator = () => {
  const [contractStartDate, setContractStartDate] = useState<string>('');
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [includeAllowances, setIncludeAllowances] = useState<boolean>(false);
  const [monthlyAllowances, setMonthlyAllowances] = useState<string>('');
  const [terminationType, setTerminationType] = useState<'employer' | 'resignation-indefinite' | 'resignation-fixed'>('employer');
  const [result, setResult] = useState<{
    serviceYears: number;
    serviceMonths: number;
    totalServiceDays: number;
    fullGratuity: number;
    eligibleGratuity: number;
    eligibilityPercentage: number;
    dailyRate: number;
    isEligible: boolean;
    reason: string;
  } | null>(null);

  const calculateServicePeriod = (startDate: Date): { years: number; months: number; days: number } => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    return { years, months, days: diffDays };
  };

  const calculateFullGratuity = (baseSalary: number, years: number, months: number): number => {
    let gratuity = 0;
    
    // First 5 years: 21 days per year
    const first5Years = Math.min(years, 5);
    gratuity += (first5Years * 21 * baseSalary) / 30;
    
    // Beyond 5 years: 30 days per year
    if (years > 5) {
      const remainingYears = years - 5;
      gratuity += (remainingYears * 30 * baseSalary) / 30;
    }
    
    // Pro-rate for remaining months
    if (months > 0) {
      const dailyRate = years < 5 ? 21 / 12 : 30 / 12;
      gratuity += (months * dailyRate * baseSalary) / 30;
    }
    
    return Math.round(gratuity);
  };

  const handleCalculate = () => {
    if (!contractStartDate || !monthlySalary) return;

    const startDate = new Date(contractStartDate);
    const salary = parseFloat(monthlySalary);
    const allowances = includeAllowances ? parseFloat(monthlyAllowances || '0') : 0;
    
    if (isNaN(salary) || salary <= 0) return;

    const { years, months, days } = calculateServicePeriod(startDate);
    const totalYears = years + (months / 12);
    
    const baseSalaryForCalculation = salary + allowances;
    const dailyRate = baseSalaryForCalculation / 30;
    const fullGratuity = calculateFullGratuity(baseSalaryForCalculation, years, months);
    
    let eligibleGratuity = 0;
    let eligibilityPercentage = 0;
    let isEligible = false;
    let reason = '';

    // Check eligibility based on termination type
    if (years < 1) {
      isEligible = false;
      reason = 'Not eligible - Less than 1 year of service required';
    } else if (terminationType === 'employer') {
      // Employer termination - full gratuity
      eligibleGratuity = fullGratuity;
      eligibilityPercentage = 100;
      isEligible = true;
      reason = 'Full gratuity - Employer termination';
    } else if (terminationType === 'resignation-indefinite') {
      // Employee resignation on indefinite contract
      if (totalYears < 2) {
        isEligible = false;
        reason = 'Not eligible - Less than 2 years of service';
      } else if (totalYears >= 2 && totalYears < 5) {
        eligibleGratuity = fullGratuity * (1/3);
        eligibilityPercentage = 33.33;
        isEligible = true;
        reason = 'One-third (1/3) gratuity - 2-5 years service, employee resignation';
      } else if (totalYears >= 5 && totalYears < 10) {
        eligibleGratuity = fullGratuity * (2/3);
        eligibilityPercentage = 66.67;
        isEligible = true;
        reason = 'Two-thirds (2/3) gratuity - 5-10 years service, employee resignation';
      } else {
        eligibleGratuity = fullGratuity;
        eligibilityPercentage = 100;
        isEligible = true;
        reason = 'Full gratuity - More than 10 years service, employee resignation';
      }
    } else if (terminationType === 'resignation-fixed') {
      // Employee resignation on fixed-term contract
      isEligible = false;
      reason = 'Not eligible - Early resignation from fixed-term contract (unless contract breach by employer)';
    }

    setResult({
      serviceYears: years,
      serviceMonths: months,
      totalServiceDays: days,
      fullGratuity,
      eligibleGratuity: Math.round(eligibleGratuity),
      eligibilityPercentage,
      dailyRate,
      isEligible,
      reason,
    });
  };

  const handleReset = () => {
    setContractStartDate('');
    setMonthlySalary('');
    setMonthlyAllowances('');
    setIncludeAllowances(false);
    setTerminationType('employer');
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          End-of-Service Gratuity (EOSG) Calculator
        </CardTitle>
        <CardDescription>
          Calculate your end-of-service gratuity based on Qatar Labour Law provisions and termination type
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Eligibility:</strong> Minimum 1 year of service required. Amount varies based on termination type and length of service.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Contract Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={contractStartDate}
                onChange={(e) => setContractStartDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Monthly Basic Salary (QAR) *</Label>
              <Input
                id="salary"
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="15000"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeAllowances"
                checked={includeAllowances}
                onChange={(e) => setIncludeAllowances(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="includeAllowances" className="cursor-pointer">
                Include Fixed Allowances in Calculation (if specified in contract)
              </Label>
            </div>

            {includeAllowances && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="allowances">Monthly Fixed Allowances (QAR)</Label>
                <Input
                  id="allowances"
                  type="number"
                  value={monthlyAllowances}
                  onChange={(e) => setMonthlyAllowances(e.target.value)}
                  placeholder="5000"
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Include only if your contract explicitly states allowances are part of gratuity calculation
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Termination Type *</Label>
            <RadioGroup value={terminationType} onValueChange={(value: any) => setTerminationType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer" className="cursor-pointer font-normal">
                  Employer Termination (100% gratuity)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resignation-indefinite" id="resignation-indefinite" />
                <Label htmlFor="resignation-indefinite" className="cursor-pointer font-normal">
                  Employee Resignation - Indefinite Contract (Pro-rated based on years)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="resignation-fixed" id="resignation-fixed" />
                <Label htmlFor="resignation-fixed" className="cursor-pointer font-normal">
                  Employee Resignation - Fixed-Term Contract (Usually not eligible)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!contractStartDate || !monthlySalary}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Calculate EOSG
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
                    <p className="text-sm text-muted-foreground">Length of Service</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.serviceYears}y {result.serviceMonths}m
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.totalServiceDays} total days
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Eligibility</p>
                    <p className="text-3xl font-bold text-secondary">
                      {result.eligibilityPercentage.toFixed(0)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.isEligible ? 'Eligible' : 'Not Eligible'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="text-3xl font-bold text-accent-foreground">
                      QAR {formatNumber(result.dailyRate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Per day calculation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className={result.isEligible ? 'bg-primary/5 border-primary/20' : 'bg-destructive/5 border-destructive/20'}>
              <AlertCircle className={`h-4 w-4 ${result.isEligible ? 'text-primary' : 'text-destructive'}`} />
              <AlertDescription>
                <p className="font-semibold">{result.reason}</p>
              </AlertDescription>
            </Alert>

            {result.isEligible && (
              <>
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Your End-of-Service Gratuity Breakdown</h4>
                  
                  <Card className="bg-secondary/5">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Full Statutory Gratuity (100%)</p>
                            <p className="text-3xl font-bold text-muted-foreground">QAR {formatNumber(result.fullGratuity)}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Based on {result.serviceYears}y {result.serviceMonths}m service
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Your Eligible Gratuity ({result.eligibilityPercentage.toFixed(1)}%)</p>
                            <p className="text-4xl font-bold text-primary">
                              <DollarSign className="inline h-8 w-8 mr-1" />
                              QAR {formatNumber(result.eligibleGratuity)}
                            </p>
                            <Badge className="mt-2" variant="default">
                              {result.eligibilityPercentage === 100 ? 'Full Entitlement' : 'Pro-rated'}
                            </Badge>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="text-sm space-y-2">
                          <p className="font-medium">Calculation Formula Applied:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                            <li>First 5 years: 21 days salary per year × {Math.min(result.serviceYears, 5)} years</li>
                            {result.serviceYears > 5 && (
                              <li>Years 6+: 30 days salary per year × {result.serviceYears - 5} years</li>
                            )}
                            {result.serviceMonths > 0 && (
                              <li>Partial year: Pro-rated for {result.serviceMonths} month{result.serviceMonths > 1 ? 's' : ''}</li>
                            )}
                            {result.eligibilityPercentage < 100 && (
                              <li className="font-semibold text-primary">
                                Applied {result.eligibilityPercentage.toFixed(1)}% factor based on resignation timing
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Additional Entitlements Upon Termination:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li><strong>Payment in Lieu of Notice:</strong> If notice period not served</li>
                        <li><strong>Accrued Annual Leave:</strong> Payment for unused vacation days</li>
                        <li><strong>Repatriation Flight:</strong> One-way ticket to home country (employer's obligation)</li>
                      </ul>
                    </div>
                  </AlertDescription>
                </Alert>
              </>
            )}

            <Alert className="bg-muted/50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Resignation Scenarios (Indefinite Contract):</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>&lt; 2 years of service: <strong>0%</strong> gratuity</li>
                    <li>2-5 years of service: <strong>33.33%</strong> (one-third) gratuity</li>
                    <li>5-10 years of service: <strong>66.67%</strong> (two-thirds) gratuity</li>
                    <li>&gt; 10 years of service: <strong>100%</strong> (full) gratuity</li>
                  </ul>
                  <p className="text-xs mt-3 italic">
                    Note: Fixed-term contract resignations typically forfeit gratuity unless employer breaches contract.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
