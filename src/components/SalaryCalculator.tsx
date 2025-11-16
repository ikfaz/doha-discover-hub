import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

interface SalaryData {
  [key: string]: {
    [key: string]: {
      junior: SalaryRange;
      mid: SalaryRange;
      senior: SalaryRange;
    };
  };
}

const salaryData: SalaryData = {
  'Oil & Gas': {
    'Engineer (Petroleum/Process)': {
      junior: { min: 18000, max: 25000, currency: 'QAR' },
      mid: { min: 25000, max: 40000, currency: 'QAR' },
      senior: { min: 40000, max: 65000, currency: 'QAR' },
    },
    'Project Manager': {
      junior: { min: 20000, max: 28000, currency: 'QAR' },
      mid: { min: 28000, max: 45000, currency: 'QAR' },
      senior: { min: 45000, max: 75000, currency: 'QAR' },
    },
    'Geologist': {
      junior: { min: 16000, max: 23000, currency: 'QAR' },
      mid: { min: 23000, max: 38000, currency: 'QAR' },
      senior: { min: 38000, max: 60000, currency: 'QAR' },
    },
  },
  'Banking & Finance': {
    'Analyst/Associate': {
      junior: { min: 15000, max: 22000, currency: 'QAR' },
      mid: { min: 22000, max: 35000, currency: 'QAR' },
      senior: { min: 35000, max: 55000, currency: 'QAR' },
    },
    'Financial Controller': {
      junior: { min: 18000, max: 25000, currency: 'QAR' },
      mid: { min: 25000, max: 40000, currency: 'QAR' },
      senior: { min: 40000, max: 65000, currency: 'QAR' },
    },
    'Risk Manager': {
      junior: { min: 17000, max: 24000, currency: 'QAR' },
      mid: { min: 24000, max: 38000, currency: 'QAR' },
      senior: { min: 38000, max: 60000, currency: 'QAR' },
    },
  },
  'Information Technology': {
    'Software Developer': {
      junior: { min: 14000, max: 20000, currency: 'QAR' },
      mid: { min: 20000, max: 30000, currency: 'QAR' },
      senior: { min: 30000, max: 45000, currency: 'QAR' },
    },
    'IT Manager': {
      junior: { min: 18000, max: 25000, currency: 'QAR' },
      mid: { min: 25000, max: 38000, currency: 'QAR' },
      senior: { min: 38000, max: 55000, currency: 'QAR' },
    },
    'Cybersecurity Specialist': {
      junior: { min: 16000, max: 23000, currency: 'QAR' },
      mid: { min: 23000, max: 35000, currency: 'QAR' },
      senior: { min: 35000, max: 50000, currency: 'QAR' },
    },
  },
  'Healthcare': {
    'Registered Nurse (Western)': {
      junior: { min: 12000, max: 18000, currency: 'QAR' },
      mid: { min: 18000, max: 25000, currency: 'QAR' },
      senior: { min: 25000, max: 40000, currency: 'QAR' },
    },
    'Medical Doctor (General)': {
      junior: { min: 25000, max: 35000, currency: 'QAR' },
      mid: { min: 35000, max: 50000, currency: 'QAR' },
      senior: { min: 50000, max: 80000, currency: 'QAR' },
    },
    'Specialist Doctor': {
      junior: { min: 35000, max: 50000, currency: 'QAR' },
      mid: { min: 50000, max: 75000, currency: 'QAR' },
      senior: { min: 75000, max: 120000, currency: 'QAR' },
    },
  },
  'Education': {
    'International School Teacher': {
      junior: { min: 10000, max: 16000, currency: 'QAR' },
      mid: { min: 16000, max: 25000, currency: 'QAR' },
      senior: { min: 25000, max: 40000, currency: 'QAR' },
    },
    'University Lecturer': {
      junior: { min: 15000, max: 22000, currency: 'QAR' },
      mid: { min: 22000, max: 35000, currency: 'QAR' },
      senior: { min: 35000, max: 55000, currency: 'QAR' },
    },
    'School Principal': {
      junior: { min: 25000, max: 35000, currency: 'QAR' },
      mid: { min: 35000, max: 50000, currency: 'QAR' },
      senior: { min: 50000, max: 75000, currency: 'QAR' },
    },
  },
  'Construction': {
    'Site Engineer': {
      junior: { min: 12000, max: 18000, currency: 'QAR' },
      mid: { min: 18000, max: 28000, currency: 'QAR' },
      senior: { min: 28000, max: 45000, currency: 'QAR' },
    },
    'Architect': {
      junior: { min: 15000, max: 22000, currency: 'QAR' },
      mid: { min: 22000, max: 35000, currency: 'QAR' },
      senior: { min: 35000, max: 55000, currency: 'QAR' },
    },
    'Construction Manager': {
      junior: { min: 20000, max: 28000, currency: 'QAR' },
      mid: { min: 28000, max: 42000, currency: 'QAR' },
      senior: { min: 42000, max: 65000, currency: 'QAR' },
    },
  },
};

export const SalaryCalculator = () => {
  const [industry, setIndustry] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [result, setResult] = useState<SalaryRange | null>(null);

  const industries = Object.keys(salaryData);
  const roles = industry ? Object.keys(salaryData[industry]) : [];

  const handleCalculate = () => {
    if (!industry || !role || !experience) return;

    const salaryInfo = salaryData[industry][role][experience as 'junior' | 'mid' | 'senior'];
    setResult(salaryInfo);
  };

  const handleReset = () => {
    setIndustry('');
    setRole('');
    setExperience('');
    setResult(null);
  };

  const formatSalary = (amount: number) => {
    return amount.toLocaleString('en-US');
  };

  const calculateUSD = (qar: number) => {
    return Math.round(qar / 3.64);
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          Salary Expectation Calculator
        </CardTitle>
        <CardDescription>
          Estimate your expected salary range in Qatar based on industry, role, and experience level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select value={industry} onValueChange={(value) => {
              setIndustry(value);
              setRole('');
              setResult(null);
            }}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={role} onValueChange={setRole} disabled={!industry}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level *</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior/Entry Level (0-3 years)</SelectItem>
                <SelectItem value="mid">Mid-Level (4-8 years)</SelectItem>
                <SelectItem value="senior">Senior/Management (9+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCalculate}
            disabled={!industry || !role || !experience}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Calculate Expected Salary
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Expected Monthly Salary Range</p>
                    <p className="text-3xl font-bold text-primary">
                      {formatSalary(result.min)} - {formatSalary(result.max)}
                    </p>
                    <p className="text-sm font-medium">{result.currency} per month</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/5">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Approximate USD Equivalent</p>
                    <p className="text-3xl font-bold text-secondary">
                      ${formatSalary(calculateUSD(result.min))} - ${formatSalary(calculateUSD(result.max))}
                    </p>
                    <p className="text-sm font-medium">USD per month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Important Notes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>This is the <strong>basic salary only</strong> and does not include allowances</li>
                    <li>Total compensation typically includes housing allowance (QAR 6,000-15,000+/month)</li>
                    <li>Additional benefits: transportation, education, annual flights, health insurance</li>
                    <li>All income is <strong>tax-free</strong> in Qatar</li>
                    <li>Actual salaries may vary based on qualifications, nationality, and company type</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Annual Salary Range (Basic Only)</h4>
                <p className="text-lg font-medium text-muted-foreground">
                  QAR {formatSalary(result.min * 12)} - {formatSalary(result.max * 12)}
                </p>
                <p className="text-sm text-muted-foreground">
                  (${formatSalary(calculateUSD(result.min * 12))} - ${formatSalary(calculateUSD(result.max * 12))} USD)
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">With Housing Allowance (Est.)</h4>
                <p className="text-lg font-medium text-muted-foreground">
                  QAR {formatSalary((result.min + 10000) * 12)} - {formatSalary((result.max + 10000) * 12)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Assuming average QAR 10,000/month housing allowance
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};