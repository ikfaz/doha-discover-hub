import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Calendar, CheckCircle2, Info, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export const LaborRightsCalculator = () => {
  const [contractStartDate, setContractStartDate] = useState<string>('');
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [result, setResult] = useState<{
    serviceYears: number;
    serviceMonths: number;
    noticePeriod: number;
    canChangeJobs: boolean;
    annualLeave: number;
    gratuity: number;
    meetsMinWage: boolean;
    canSponsorFamily: boolean;
  } | null>(null);

  const calculateServicePeriod = (startDate: Date): { years: number; months: number } => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const months = Math.floor(remainingDays / 30);
    return { years, months };
  };

  const calculateGratuity = (salary: number, years: number, months: number): number => {
    let gratuity = 0;
    
    // First 5 years: 21 days per year (3 weeks)
    const first5Years = Math.min(years, 5);
    gratuity += (first5Years * 21 * salary) / 30;
    
    // Beyond 5 years: 30 days per year (1 month)
    if (years > 5) {
      const remainingYears = years - 5;
      gratuity += (remainingYears * 30 * salary) / 30;
    }
    
    // Add prorated amount for remaining months
    if (months > 0) {
      const dailyRate = years < 5 ? 21 / 12 : 30 / 12;
      gratuity += (months * dailyRate * salary) / 30;
    }
    
    return Math.round(gratuity);
  };

  const handleCalculate = () => {
    if (!contractStartDate || !monthlySalary) return;

    const startDate = new Date(contractStartDate);
    const salary = parseFloat(monthlySalary);
    
    if (isNaN(salary) || salary <= 0) return;

    const { years, months } = calculateServicePeriod(startDate);
    const totalYears = years + (months / 12);
    
    // Notice period: 1 month if ≤2 years, 2 months if >2 years
    const noticePeriod = totalYears <= 2 ? 1 : 2;
    
    // Can always change jobs now (post-reform)
    const canChangeJobs = true;
    
    // Annual leave: minimum 3 weeks (21 days) after 1 year
    const annualLeave = totalYears >= 1 ? 21 : 0;
    
    // Calculate end-of-service gratuity
    const gratuity = calculateGratuity(salary, years, months);
    
    // Check minimum wage (QAR 1,000)
    const meetsMinWage = salary >= 1000;
    
    // Check family sponsorship threshold (typically QAR 10,000)
    const canSponsorFamily = salary >= 10000;

    setResult({
      serviceYears: years,
      serviceMonths: months,
      noticePeriod,
      canChangeJobs,
      annualLeave,
      gratuity,
      meetsMinWage,
      canSponsorFamily,
    });
  };

  const handleReset = () => {
    setContractStartDate('');
    setMonthlySalary('');
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-6 w-6" />
          Labor Rights & Notice Period Calculator
        </CardTitle>
        <CardDescription>
          Calculate your notice period, gratuity, and understand your rights under Qatar's reformed labor laws
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Post-2020 Reform:</strong> You can now change jobs without employer permission (NOC). Only a notice period is required.
          </AlertDescription>
        </Alert>

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

        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!contractStartDate || !monthlySalary}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Calculate My Rights
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Length of Service</p>
                    <p className="text-3xl font-bold text-primary">
                      {result.serviceYears}y {result.serviceMonths}m
                    </p>
                    <p className="text-sm font-medium">
                      {result.serviceYears > 0 ? `${result.serviceYears} year${result.serviceYears > 1 ? 's' : ''}` : ''} 
                      {result.serviceYears > 0 && result.serviceMonths > 0 ? ' and ' : ''}
                      {result.serviceMonths > 0 ? `${result.serviceMonths} month${result.serviceMonths > 1 ? 's' : ''}` : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Required Notice Period</p>
                    <p className="text-3xl font-bold text-secondary">
                      {result.noticePeriod} {result.noticePeriod === 1 ? 'Month' : 'Months'}
                    </p>
                    <p className="text-sm font-medium">
                      {result.serviceYears + (result.serviceMonths / 12) <= 2 ? '≤2 years service' : '>2 years service'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Your Labor Rights & Benefits</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card className={result.canChangeJobs ? 'bg-primary/5' : 'bg-muted'}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 ${result.canChangeJobs ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1">
                        <p className="font-medium">Job Mobility</p>
                        <p className="text-sm text-muted-foreground">
                          {result.canChangeJobs ? 'Can change jobs with notice period' : 'Not applicable'}
                        </p>
                        <Badge className="mt-2" variant={result.canChangeJobs ? 'default' : 'secondary'}>
                          {result.canChangeJobs ? 'No NOC Required' : 'N/A'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={result.annualLeave > 0 ? 'bg-primary/5' : 'bg-muted'}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Calendar className={`h-5 w-5 mt-0.5 ${result.annualLeave > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1">
                        <p className="font-medium">Annual Leave</p>
                        <p className="text-sm text-muted-foreground">
                          {result.annualLeave > 0 ? `${result.annualLeave} days paid leave per year` : 'Not yet eligible (need 1 year)'}
                        </p>
                        <Badge className="mt-2" variant={result.annualLeave > 0 ? 'default' : 'secondary'}>
                          {result.annualLeave > 0 ? '3 Weeks Minimum' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={result.meetsMinWage ? 'bg-primary/5' : 'bg-destructive/5'}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 ${result.meetsMinWage ? 'text-primary' : 'text-destructive'}`} />
                      <div className="flex-1">
                        <p className="font-medium">Minimum Wage</p>
                        <p className="text-sm text-muted-foreground">
                          {result.meetsMinWage ? 'Meets QAR 1,000 minimum' : 'Below minimum wage'}
                        </p>
                        <Badge className="mt-2" variant={result.meetsMinWage ? 'default' : 'destructive'}>
                          {result.meetsMinWage ? 'Compliant' : 'Non-Compliant'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={result.canSponsorFamily ? 'bg-primary/5' : 'bg-muted'}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 mt-0.5 ${result.canSponsorFamily ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1">
                        <p className="font-medium">Family Sponsorship</p>
                        <p className="text-sm text-muted-foreground">
                          {result.canSponsorFamily ? 'Eligible to sponsor family' : 'Below QAR 10,000 threshold'}
                        </p>
                        <Badge className="mt-2" variant={result.canSponsorFamily ? 'default' : 'secondary'}>
                          {result.canSponsorFamily ? 'Eligible' : 'Not Eligible'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold">End-of-Service Gratuity</h4>
              <Card className="bg-secondary/5">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Estimated Gratuity Payment</p>
                      <p className="text-4xl font-bold text-secondary">QAR {formatNumber(result.gratuity)}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on {result.serviceYears}y {result.serviceMonths}m of service
                      </p>
                    </div>
                    <Separator />
                    <div className="text-sm space-y-2">
                      <p className="font-medium">Calculation Formula:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                        <li>First 5 years: 21 days salary per year (3 weeks)</li>
                        <li>Beyond 5 years: 30 days salary per year (1 month)</li>
                        <li>Pro-rated for partial years</li>
                        <li>Paid upon contract termination</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Key Rights Under 2020 Reforms:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Job Mobility:</strong> Change jobs without NOC - just provide notice</li>
                    <li><strong>Exit Freedom:</strong> Leave Qatar without employer permission</li>
                    <li><strong>Minimum Wage:</strong> QAR 1,000 + QAR 500 housing + QAR 300 food (if not provided)</li>
                    <li><strong>Wage Protection:</strong> All salaries paid through WPS (electronic system)</li>
                    <li><strong>Annual Leave:</strong> Minimum 3 weeks paid leave after 1 year</li>
                    <li><strong>Sick Leave:</strong> Up to 12 weeks (2 weeks full pay, 4 weeks half pay)</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Important Notes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Notice period applies to both resignation and termination</li>
                    <li>Employer can waive notice period or pay salary in lieu</li>
                    <li>Gratuity not paid if terminated for misconduct</li>
                    <li>Part-time and temporary workers also covered by reforms</li>
                    <li>Joint Labour Committees required in companies with 30+ workers</li>
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