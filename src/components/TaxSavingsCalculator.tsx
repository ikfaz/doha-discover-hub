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
  // Europe
  {
    country: 'Austria',
    effectiveRate: { low: 25, mid: 35, high: 48 },
    currency: 'EUR',
    notes: 'Progressive tax system. Social security contributions separate.',
  },
  {
    country: 'Belgium',
    effectiveRate: { low: 30, mid: 42, high: 50 },
    currency: 'EUR',
    notes: 'One of the highest tax rates in Europe. Includes municipal tax.',
  },
  {
    country: 'Bulgaria',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'BGN',
    notes: 'Flat tax rate. Social security contributions separate.',
  },
  {
    country: 'Croatia',
    effectiveRate: { low: 20, mid: 25, high: 35 },
    currency: 'HRK',
    notes: 'Progressive tax system. Local surtax may apply.',
  },
  {
    country: 'Cyprus',
    effectiveRate: { low: 0, mid: 20, high: 35 },
    currency: 'EUR',
    notes: 'First €19,500 tax-free. Social insurance separate.',
  },
  {
    country: 'Czech Republic',
    effectiveRate: { low: 15, mid: 15, high: 23 },
    currency: 'CZK',
    notes: 'Flat rate up to certain threshold, then higher rate applies.',
  },
  {
    country: 'Denmark',
    effectiveRate: { low: 38, mid: 45, high: 56 },
    currency: 'DKK',
    notes: 'Very high tax rates. Includes municipal and state tax.',
  },
  {
    country: 'Estonia',
    effectiveRate: { low: 20, mid: 20, high: 20 },
    currency: 'EUR',
    notes: 'Flat tax rate. Social tax separate.',
  },
  {
    country: 'Finland',
    effectiveRate: { low: 25, mid: 35, high: 51 },
    currency: 'EUR',
    notes: 'Progressive system. Municipal tax included.',
  },
  {
    country: 'France',
    effectiveRate: { low: 20, mid: 30, high: 45 },
    currency: 'EUR',
    notes: 'Progressive tax system. Social contributions (CSG/CRDS) not included.',
  },
  {
    country: 'Germany',
    effectiveRate: { low: 25, mid: 35, high: 45 },
    currency: 'EUR',
    notes: 'Includes solidarity surcharge. Social security contributions separate.',
  },
  {
    country: 'Greece',
    effectiveRate: { low: 15, mid: 28, high: 44 },
    currency: 'EUR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Hungary',
    effectiveRate: { low: 15, mid: 15, high: 15 },
    currency: 'HUF',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Iceland',
    effectiveRate: { low: 37, mid: 40, high: 46 },
    currency: 'ISK',
    notes: 'High tax rates. Municipal tax included.',
  },
  {
    country: 'Ireland',
    effectiveRate: { low: 20, mid: 32, high: 48 },
    currency: 'EUR',
    notes: 'Progressive system. USC and PRSI separate.',
  },
  {
    country: 'Italy',
    effectiveRate: { low: 23, mid: 35, high: 43 },
    currency: 'EUR',
    notes: 'Progressive system. Regional and municipal tax additional.',
  },
  {
    country: 'Latvia',
    effectiveRate: { low: 20, mid: 20, high: 31 },
    currency: 'EUR',
    notes: 'Progressive rates above threshold. Social contributions separate.',
  },
  {
    country: 'Lithuania',
    effectiveRate: { low: 20, mid: 20, high: 32 },
    currency: 'EUR',
    notes: 'Two-tier system. Health insurance separate.',
  },
  {
    country: 'Luxembourg',
    effectiveRate: { low: 15, mid: 30, high: 42 },
    currency: 'EUR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Malta',
    effectiveRate: { low: 0, mid: 25, high: 35 },
    currency: 'EUR',
    notes: 'Tax-free allowance. Progressive above threshold.',
  },
  {
    country: 'Netherlands',
    effectiveRate: { low: 37, mid: 40, high: 49 },
    currency: 'EUR',
    notes: 'High tax rate due to social security inclusion. Box 1 income taxation.',
  },
  {
    country: 'Norway',
    effectiveRate: { low: 28, mid: 38, high: 46 },
    currency: 'NOK',
    notes: 'Includes bracket tax and base tax. Social security separate.',
  },
  {
    country: 'Poland',
    effectiveRate: { low: 12, mid: 17, high: 32 },
    currency: 'PLN',
    notes: 'Two tax brackets. Health contribution separate.',
  },
  {
    country: 'Portugal',
    effectiveRate: { low: 15, mid: 28, high: 48 },
    currency: 'EUR',
    notes: 'Progressive system. Social security separate.',
  },
  {
    country: 'Romania',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'RON',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Russia',
    effectiveRate: { low: 13, mid: 13, high: 15 },
    currency: 'RUB',
    notes: 'Flat rate for most, higher rate for very high incomes.',
  },
  {
    country: 'Slovakia',
    effectiveRate: { low: 19, mid: 19, high: 25 },
    currency: 'EUR',
    notes: 'Two tax rates. Social and health insurance separate.',
  },
  {
    country: 'Slovenia',
    effectiveRate: { low: 16, mid: 33, high: 50 },
    currency: 'EUR',
    notes: 'Progressive system. Social security separate.',
  },
  {
    country: 'Spain',
    effectiveRate: { low: 19, mid: 30, high: 47 },
    currency: 'EUR',
    notes: 'Progressive system. Regional variations apply.',
  },
  {
    country: 'Sweden',
    effectiveRate: { low: 30, mid: 40, high: 52 },
    currency: 'SEK',
    notes: 'Includes municipal and state tax. One of the highest tax rates in Europe.',
  },
  {
    country: 'Switzerland',
    effectiveRate: { low: 15, mid: 25, high: 40 },
    currency: 'CHF',
    notes: 'Federal, cantonal, and municipal taxes combined. Varies by canton.',
  },
  {
    country: 'Turkey',
    effectiveRate: { low: 15, mid: 27, high: 40 },
    currency: 'TRY',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Ukraine',
    effectiveRate: { low: 18, mid: 18, high: 18 },
    currency: 'UAH',
    notes: 'Flat tax rate. Military tax additional 1.5%.',
  },
  {
    country: 'United Kingdom',
    effectiveRate: { low: 20, mid: 32, high: 42 },
    currency: 'GBP',
    notes: 'Includes Income Tax and National Insurance. Higher rate kicks in above £50,270.',
  },
  
  // Americas
  {
    country: 'Argentina',
    effectiveRate: { low: 9, mid: 23, high: 35 },
    currency: 'ARS',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Brazil',
    effectiveRate: { low: 7.5, mid: 22.5, high: 27.5 },
    currency: 'BRL',
    notes: 'Progressive system. Social contributions separate.',
  },
  {
    country: 'Canada',
    effectiveRate: { low: 20, mid: 29, high: 38 },
    currency: 'CAD',
    notes: 'Combined federal and provincial (Ontario average). Varies by province.',
  },
  {
    country: 'Chile',
    effectiveRate: { low: 4, mid: 23, high: 40 },
    currency: 'CLP',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Colombia',
    effectiveRate: { low: 0, mid: 28, high: 39 },
    currency: 'COP',
    notes: 'Progressive system with tax-free threshold.',
  },
  {
    country: 'Costa Rica',
    effectiveRate: { low: 0, mid: 15, high: 25 },
    currency: 'CRC',
    notes: 'Progressive system. Social security separate.',
  },
  {
    country: 'Ecuador',
    effectiveRate: { low: 5, mid: 25, high: 37 },
    currency: 'USD',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Mexico',
    effectiveRate: { low: 10, mid: 25, high: 35 },
    currency: 'MXN',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Peru',
    effectiveRate: { low: 8, mid: 20, high: 30 },
    currency: 'PEN',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'United States',
    effectiveRate: { low: 22, mid: 28, high: 35 },
    currency: 'USD',
    notes: 'Federal tax only. State taxes (0-13%) not included. Assumes standard deduction.',
  },
  {
    country: 'Uruguay',
    effectiveRate: { low: 10, mid: 20, high: 36 },
    currency: 'UYU',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Venezuela',
    effectiveRate: { low: 6, mid: 25, high: 34 },
    currency: 'VES',
    notes: 'Progressive tax system. Social security separate.',
  },

  // Asia-Pacific
  {
    country: 'Australia',
    effectiveRate: { low: 21, mid: 32, high: 39 },
    currency: 'AUD',
    notes: 'Includes Medicare Levy (2%). Does not include Study and Training Support Levy.',
  },
  {
    country: 'Bangladesh',
    effectiveRate: { low: 0, mid: 15, high: 25 },
    currency: 'BDT',
    notes: 'Progressive tax system with tax-free allowance.',
  },
  {
    country: 'China',
    effectiveRate: { low: 10, mid: 25, high: 45 },
    currency: 'CNY',
    notes: 'Progressive tax system. Social insurance separate.',
  },
  {
    country: 'Hong Kong',
    effectiveRate: { low: 2, mid: 10, high: 17 },
    currency: 'HKD',
    notes: 'Low tax jurisdiction. Progressive with cap at 15% standard rate.',
  },
  {
    country: 'India',
    effectiveRate: { low: 15, mid: 20, high: 30 },
    currency: 'INR',
    notes: 'New tax regime rates. Old regime may have higher/lower rates with deductions.',
  },
  {
    country: 'Indonesia',
    effectiveRate: { low: 5, mid: 25, high: 35 },
    currency: 'IDR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Japan',
    effectiveRate: { low: 15, mid: 30, high: 45 },
    currency: 'JPY',
    notes: 'National and local inhabitant tax combined. Social insurance separate.',
  },
  {
    country: 'Malaysia',
    effectiveRate: { low: 8, mid: 21, high: 30 },
    currency: 'MYR',
    notes: 'Progressive tax system. EPF and SOCSO separate.',
  },
  {
    country: 'New Zealand',
    effectiveRate: { low: 17.5, mid: 30, high: 39 },
    currency: 'NZD',
    notes: 'Progressive PAYE system. ACC levies separate.',
  },
  {
    country: 'Pakistan',
    effectiveRate: { low: 5, mid: 20, high: 35 },
    currency: 'PKR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Philippines',
    effectiveRate: { low: 15, mid: 25, high: 35 },
    currency: 'PHP',
    notes: 'Progressive tax system. SSS, PhilHealth, Pag-IBIG separate.',
  },
  {
    country: 'Singapore',
    effectiveRate: { low: 4, mid: 11.5, high: 22 },
    currency: 'SGD',
    notes: 'Low progressive tax. CPF contributions separate.',
  },
  {
    country: 'South Korea',
    effectiveRate: { low: 15, mid: 28, high: 42 },
    currency: 'KRW',
    notes: 'Progressive system. National pension and health insurance separate.',
  },
  {
    country: 'Sri Lanka',
    effectiveRate: { low: 6, mid: 18, high: 36 },
    currency: 'LKR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Taiwan',
    effectiveRate: { low: 12, mid: 20, high: 40 },
    currency: 'TWD',
    notes: 'Progressive tax system. National health insurance separate.',
  },
  {
    country: 'Thailand',
    effectiveRate: { low: 10, mid: 25, high: 35 },
    currency: 'THB',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Vietnam',
    effectiveRate: { low: 10, mid: 20, high: 35 },
    currency: 'VND',
    notes: 'Progressive tax system. Social insurance separate.',
  },

  // Middle East & Africa
  {
    country: 'Bahrain',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'BHD',
    notes: 'No personal income tax.',
  },
  {
    country: 'Egypt',
    effectiveRate: { low: 10, mid: 20, high: 25 },
    currency: 'EGP',
    notes: 'Progressive tax system. Social insurance separate.',
  },
  {
    country: 'Israel',
    effectiveRate: { low: 20, mid: 35, high: 47 },
    currency: 'ILS',
    notes: 'Progressive system. National insurance separate.',
  },
  {
    country: 'Jordan',
    effectiveRate: { low: 7, mid: 20, high: 30 },
    currency: 'JOD',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Kenya',
    effectiveRate: { low: 10, mid: 25, high: 30 },
    currency: 'KES',
    notes: 'Progressive tax system. NHIF and NSSF separate.',
  },
  {
    country: 'Kuwait',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'KWD',
    notes: 'No personal income tax for individuals.',
  },
  {
    country: 'Lebanon',
    effectiveRate: { low: 4, mid: 16, high: 25 },
    currency: 'LBP',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Morocco',
    effectiveRate: { low: 10, mid: 30, high: 38 },
    currency: 'MAD',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Nigeria',
    effectiveRate: { low: 7, mid: 17, high: 24 },
    currency: 'NGN',
    notes: 'Progressive tax system. Pension contributions separate.',
  },
  {
    country: 'Oman',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'OMR',
    notes: 'No personal income tax.',
  },
  {
    country: 'Saudi Arabia',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'SAR',
    notes: 'No personal income tax. Zakat for Saudi nationals only.',
  },
  {
    country: 'South Africa',
    effectiveRate: { low: 18, mid: 26, high: 38 },
    currency: 'ZAR',
    notes: 'Progressive tax system. Primary rebate of R17,235 applied.',
  },
  {
    country: 'Tunisia',
    effectiveRate: { low: 15, mid: 26, high: 35 },
    currency: 'TND',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'United Arab Emirates',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'AED',
    notes: 'No personal income tax.',
  },
  {
    country: 'Zimbabwe',
    effectiveRate: { low: 20, mid: 30, high: 40 },
    currency: 'ZWL',
    notes: 'Progressive tax system. Social security separate.',
  },

  // Additional Countries
  {
    country: 'Afghanistan',
    effectiveRate: { low: 0, mid: 10, high: 20 },
    currency: 'AFN',
    notes: 'Progressive tax system with low rates.',
  },
  {
    country: 'Algeria',
    effectiveRate: { low: 0, mid: 20, high: 35 },
    currency: 'DZD',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Armenia',
    effectiveRate: { low: 23, mid: 23, high: 23 },
    currency: 'AMD',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Azerbaijan',
    effectiveRate: { low: 14, mid: 14, high: 25 },
    currency: 'AZN',
    notes: 'Two-tier system. Social insurance separate.',
  },
  {
    country: 'Belarus',
    effectiveRate: { low: 13, mid: 13, high: 13 },
    currency: 'BYN',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Bolivia',
    effectiveRate: { low: 0, mid: 13, high: 13 },
    currency: 'BOB',
    notes: 'Two-tier system with tax-free allowance.',
  },
  {
    country: 'Bosnia and Herzegovina',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'BAM',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Botswana',
    effectiveRate: { low: 5, mid: 18.75, high: 25 },
    currency: 'BWP',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Brunei',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'BND',
    notes: 'No personal income tax.',
  },
  {
    country: 'Cambodia',
    effectiveRate: { low: 0, mid: 10, high: 20 },
    currency: 'KHR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Dominican Republic',
    effectiveRate: { low: 0, mid: 15, high: 25 },
    currency: 'DOP',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Ethiopia',
    effectiveRate: { low: 10, mid: 25, high: 35 },
    currency: 'ETB',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Georgia',
    effectiveRate: { low: 20, mid: 20, high: 20 },
    currency: 'GEL',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Ghana',
    effectiveRate: { low: 5, mid: 20, high: 30 },
    currency: 'GHS',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Guatemala',
    effectiveRate: { low: 5, mid: 5, high: 7 },
    currency: 'GTQ',
    notes: 'Two-tier system with low rates.',
  },
  {
    country: 'Iraq',
    effectiveRate: { low: 3, mid: 10, high: 15 },
    currency: 'IQD',
    notes: 'Progressive tax system with low rates.',
  },
  {
    country: 'Jamaica',
    effectiveRate: { low: 0, mid: 25, high: 30 },
    currency: 'JMD',
    notes: 'Progressive system with tax-free threshold.',
  },
  {
    country: 'Kazakhstan',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'KZT',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Kyrgyzstan',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'KGS',
    notes: 'Flat tax rate. Social insurance separate.',
  },
  {
    country: 'Laos',
    effectiveRate: { low: 0, mid: 15, high: 24 },
    currency: 'LAK',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Maldives',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'MVR',
    notes: 'No personal income tax.',
  },
  {
    country: 'Mauritius',
    effectiveRate: { low: 15, mid: 15, high: 15 },
    currency: 'MUR',
    notes: 'Flat tax rate. Social contributions separate.',
  },
  {
    country: 'Monaco',
    effectiveRate: { low: 0, mid: 0, high: 0 },
    currency: 'EUR',
    notes: 'No personal income tax for residents.',
  },
  {
    country: 'Mongolia',
    effectiveRate: { low: 10, mid: 10, high: 10 },
    currency: 'MNT',
    notes: 'Flat tax rate. Social insurance separate.',
  },
  {
    country: 'Myanmar',
    effectiveRate: { low: 0, mid: 15, high: 25 },
    currency: 'MMK',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Nepal',
    effectiveRate: { low: 10, mid: 25, high: 36 },
    currency: 'NPR',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Nicaragua',
    effectiveRate: { low: 0, mid: 20, high: 30 },
    currency: 'NIO',
    notes: 'Progressive tax system. Social security separate.',
  },
  {
    country: 'Panama',
    effectiveRate: { low: 0, mid: 15, high: 25 },
    currency: 'PAB',
    notes: 'Progressive territorial tax system.',
  },
  {
    country: 'Paraguay',
    effectiveRate: { low: 8, mid: 9, high: 10 },
    currency: 'PYG',
    notes: 'Progressive system with low rates.',
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