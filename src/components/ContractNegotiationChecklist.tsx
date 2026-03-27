import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Circle, FileText, AlertCircle, Download, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ChecklistItem {
  id: string;
  title: string;
  priority: 'critical' | 'important' | 'beneficial';
  category: string;
  description: string;
  whatToLookFor: string[];
  negotiationTips: string[];
  redFlags: string[];
}

export const ContractNegotiationChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategory, setExpandedCategory] = useState<string>('compensation');

  const checklistItems: ChecklistItem[] = [
    {
      id: 'eosg-calculation',
      title: 'End-of-Service Gratuity (EOSG) Calculation Basis',
      priority: 'critical',
      category: 'compensation',
      description: 'How your gratuity will be calculated - this can make a 30-50% difference in your final payout',
      whatToLookFor: [
        'Does it specify "Basic Salary only" or "Basic Salary + Allowances"?',
        'Is the calculation rate 21/30 days (statutory minimum) or 30 days for all years?',
        'Are there any enhanced gratuity terms (e.g., 1 month per year)?',
        'Is there a cap on the gratuity amount?',
      ],
      negotiationTips: [
        'Push for "Basic Salary + Fixed Allowances" to maximize your EOSG',
        'Request 30 days per year for all service years (not just after year 5)',
        'Ask for the calculation to include housing and transport allowances',
        'Negotiate for pro-rata gratuity even if you resign within 2 years',
      ],
      redFlags: [
        'Contract is silent on EOSG calculation method',
        'Clause states "as per company policy" without specifics',
        'Unusually low or capped gratuity amounts',
        'No mention of gratuity at all',
      ],
    },
    {
      id: 'basic-vs-total',
      title: 'Basic Salary vs Total Package Split',
      priority: 'critical',
      category: 'compensation',
      description: 'The split between basic salary and allowances affects EOSG, loans, and emergency savings',
      whatToLookFor: [
        'What percentage is basic salary vs allowances?',
        'Industry standard: 50-60% basic, 40-50% allowances',
        'Higher basic = higher EOSG (if calculated on basic only)',
        'Clear breakdown of housing, transport, education allowances',
      ],
      negotiationTips: [
        'Request at least 55-60% as basic salary for better EOSG',
        'If EOSG includes allowances, optimize allowances instead',
        'Ensure housing allowance is adequate for your family size',
        'Ask for annual salary increases to be applied to basic, not just allowances',
      ],
      redFlags: [
        'Basic salary below 40% of total package',
        'Vague language like "competitive package" without breakdown',
        'All-inclusive salary with no itemization',
        'Allowances can be "adjusted" at employer discretion',
      ],
    },
    {
      id: 'housing-allowance',
      title: 'Housing Allowance and Accommodation Terms',
      priority: 'critical',
      category: 'compensation',
      description: 'Housing costs 25-40% of income in Doha - this allowance must cover realistic rent',
      whatToLookFor: [
        'Specific monthly amount (e.g., QAR 10,000) or "company-provided"',
        'Does it cover your family size and preferred area?',
        'Is it paid monthly or as reimbursement?',
        'Any restrictions on location or property type?',
      ],
      negotiationTips: [
        'Research actual rent prices for your preferred areas (West Bay, The Pearl, etc.)',
        'Request 25-30% of total salary as housing allowance minimum',
        'For families: ensure allowance covers 2-3 bedroom apartments (QAR 8,000-15,000)',
        'Ask for annual increases tied to rental inflation',
      ],
      redFlags: [
        'Allowance below QAR 6,000 for families',
        'Shared accommodation requirements for married employees',
        'Company must approve rental choice',
        'Allowance only paid after probation period',
      ],
    },
    {
      id: 'annual-leave',
      title: 'Annual Leave Entitlement',
      priority: 'important',
      category: 'benefits',
      description: 'Statutory minimum is 21 days (3 weeks) - many companies offer more',
      whatToLookFor: [
        'Exact number of days (21, 28, 30, or more)',
        'When leave accrues (after probation or from day one)',
        'Can unused leave be carried over or encashed?',
        'Annual flight tickets to home country included?',
      ],
      negotiationTips: [
        'Request 28-30 days for senior positions',
        'Negotiate for leave encashment at end of year',
        'Ask for annual flight tickets for family (not just employee)',
        'Ensure leave can be taken during Ramadan or Eid if needed',
      ],
      redFlags: [
        'Only 21 days with no flexibility',
        'Leave only granted after 1 year of service',
        'No carry-over or encashment of unused leave',
        'Blackout periods during peak business times',
      ],
    },
    {
      id: 'flight-tickets',
      title: 'Annual Flight Tickets (Repatriation)',
      priority: 'important',
      category: 'benefits',
      description: 'Flights home are expensive - ensure full family coverage',
      whatToLookFor: [
        'Economy, business, or first class?',
        'How many family members covered?',
        'Frequency (annual, bi-annual)?',
        'Flexible dates or company-determined?',
      ],
      negotiationTips: [
        'Request business class for senior positions or long-haul flights',
        'Ensure spouse and all children are covered',
        'Ask for flexibility in timing (not just summer)',
        'Negotiate for cash allowance if you prefer to book yourself',
      ],
      redFlags: [
        'Only employee covered (family excluded)',
        'Tickets only provided after 1 year of service',
        'Economy only on long-haul flights (12+ hours)',
        'Fixed travel dates with no flexibility',
      ],
    },
    {
      id: 'education-allowance',
      title: 'Education Allowance for Children',
      priority: 'critical',
      category: 'benefits',
      description: 'International schools cost QAR 30,000-80,000+ per child annually',
      whatToLookFor: [
        'Specific amount per child or percentage covered?',
        'Age/grade limits (e.g., up to Grade 12)?',
        'Registration fees and books included?',
        'Payment timing (upfront or reimbursement)?',
      ],
      negotiationTips: [
        'Request 100% coverage or at least QAR 40,000+ per child',
        'Ensure registration fees (QAR 1,000-5,000) are included',
        'Ask for coverage of books, uniforms, and activities',
        'Negotiate for pre-school coverage (age 3-5)',
      ],
      redFlags: [
        'Cap below QAR 30,000 per child',
        'Only 50-70% coverage (you pay significant portion)',
        'Reimbursement only (you front the costs)',
        'Excludes registration or miscellaneous fees',
      ],
    },
    {
      id: 'medical-insurance',
      title: 'Medical Insurance Coverage',
      priority: 'critical',
      category: 'benefits',
      description: 'Healthcare is private and expensive - comprehensive coverage is essential',
      whatToLookFor: [
        'Coverage level (Basic, Standard, Premium)?',
        'Family members included (spouse, children)?',
        'Network hospitals (Sidra, Hamad, private clinics)?',
        'Dental, optical, maternity coverage?',
        'Pre-existing conditions covered?',
      ],
      negotiationTips: [
        'Request Premium or Platinum level coverage',
        'Ensure full family is covered (spouse + all dependents)',
        'Ask for dental and optical (often excluded)',
        'Verify coverage at top hospitals (Sidra Medicine, Al Emadi)',
        'Negotiate for maternity coverage if planning children',
      ],
      redFlags: [
        'Basic coverage only (limited hospitals)',
        'Family not included or requires employee contribution',
        'Pre-existing conditions excluded',
        'No dental/optical coverage',
        'High co-pays or deductibles',
      ],
    },
    {
      id: 'transport-allowance',
      title: 'Transport/Vehicle Allowance',
      priority: 'important',
      category: 'compensation',
      description: 'Car ownership or allowance - essential for life in Doha',
      whatToLookFor: [
        'Company car provided or allowance amount?',
        'If allowance: enough for car loan (QAR 2,000-3,000+)?',
        'Fuel, insurance, maintenance covered?',
        'Vehicle grade/model specified?',
      ],
      negotiationTips: [
        'Request company car for senior positions',
        'If allowance: ask for QAR 2,500-4,000 minimum',
        'Ensure fuel and maintenance are covered separately',
        'Negotiate for higher vehicle grade if car provided',
      ],
      redFlags: [
        'No transport provision at all',
        'Allowance below QAR 1,500 (insufficient for car costs)',
        'Company car but you pay fuel and maintenance',
        'Restricted to low-grade vehicles',
      ],
    },
    {
      id: 'probation-period',
      title: 'Probation Period Terms',
      priority: 'important',
      category: 'employment-terms',
      description: 'Standard is 6 months - understand the termination terms during this period',
      whatToLookFor: [
        'Length of probation (typically 6 months, max 6 months)',
        'Notice period during probation (usually shorter)',
        'Benefits provided during probation (full or partial)?',
        'Performance review schedule',
      ],
      negotiationTips: [
        'Request 3 months probation for senior roles',
        'Ensure all benefits start from day one (not after probation)',
        'Ask for clear performance criteria and review schedule',
        'Negotiate for mutual termination rights (not just employer)',
      ],
      redFlags: [
        'Probation longer than 6 months',
        'No benefits during probation',
        'Vague performance criteria',
        'Employer can terminate without notice during probation',
      ],
    },
    {
      id: 'notice-period',
      title: 'Notice Period (Resignation/Termination)',
      priority: 'important',
      category: 'employment-terms',
      description: 'Statutory minimum: 1 month (≤2 years) or 2 months (>2 years)',
      whatToLookFor: [
        'Notice period for resignation (1-3 months)',
        'Notice period for termination (same or different?)',
        'Garden leave policy',
        'Payment in lieu option',
      ],
      negotiationTips: [
        'Keep it at statutory minimum (1-2 months) if possible',
        'Ensure notice period is mutual (applies to employer too)',
        'Request option for payment in lieu of notice',
        'Avoid non-compete clauses longer than 6 months',
      ],
      redFlags: [
        'Notice period longer than 3 months',
        'Different notice periods (longer for employee)',
        'No payment in lieu option',
        'Broad non-compete clauses (all Qatar or region)',
      ],
    },
    {
      id: 'bonus-structure',
      title: 'Performance Bonus and Incentives',
      priority: 'beneficial',
      category: 'compensation',
      description: 'Annual bonuses can be 10-30% of salary - ensure clear criteria',
      whatToLookFor: [
        'Guaranteed or discretionary bonus?',
        'Percentage of salary or fixed amount?',
        'Performance criteria clearly defined?',
        'Payment timing (end of year, Ramadan)?',
      ],
      negotiationTips: [
        'Request guaranteed bonus (e.g., 13th month salary)',
        'Push for clear, measurable performance criteria',
        'Ask for 15-25% of annual salary for senior roles',
        'Ensure bonus is not "subject to company performance" only',
      ],
      redFlags: [
        'Purely discretionary with no criteria',
        'Bonus contingent on unclear company performance',
        'Pro-rata bonus not paid if you leave mid-year',
        'No bonus mentioned at all',
      ],
    },
    {
      id: 'family-sponsorship',
      title: 'Family Sponsorship and Visa Processing',
      priority: 'critical',
      category: 'immigration',
      description: 'Bringing your family requires salary threshold (typically QAR 10,000+) and employer support',
      whatToLookFor: [
        'Does company assist with family visa processing?',
        'Are visa fees covered (family RP costs)',
        'Timeline for family visa (after probation or immediate)?',
        'Does salary meet sponsorship threshold?',
      ],
      negotiationTips: [
        'Ensure salary meets QAR 10,000 minimum for sponsorship',
        'Request company handles all visa paperwork',
        'Ask for immediate family visa (not after probation)',
        'Confirm visa fees are fully covered by employer',
      ],
      redFlags: [
        'Salary below QAR 10,000 (cannot sponsor family)',
        'Employee must handle/pay for family visas',
        'Family visa only after 1 year of service',
        'Vague on visa support',
      ],
    },
    {
      id: 'salary-review',
      title: 'Annual Salary Review and Increases',
      priority: 'beneficial',
      category: 'compensation',
      description: 'Cost of living increases - ensure regular salary progression',
      whatToLookFor: [
        'Guaranteed annual review?',
        'Typical increase percentage (3-10%)?',
        'Performance-based or automatic?',
        'Applied to basic or total package?',
      ],
      negotiationTips: [
        'Request guaranteed annual review (not discretionary)',
        'Ask for minimum 5% increase commitment',
        'Ensure increases apply to basic salary (affects EOSG)',
        'Negotiate for cost-of-living adjustments',
      ],
      redFlags: [
        'No mention of salary reviews',
        'Purely discretionary with no guarantees',
        'Increases only to allowances (not basic)',
        'Reviews only every 2-3 years',
      ],
    },
    {
      id: 'relocation-package',
      title: 'Relocation and Settling-In Assistance',
      priority: 'beneficial',
      category: 'benefits',
      description: 'Moving to Qatar is expensive - comprehensive relocation support helps',
      whatToLookFor: [
        'Flight tickets for family for initial move?',
        'Temporary accommodation (hotel/serviced apartment)?',
        'Shipping allowance for personal belongings?',
        'Settling-in allowance (first month expenses)?',
      ],
      negotiationTips: [
        'Request 1-2 months temporary accommodation',
        'Ask for shipping container costs (QAR 10,000-20,000)',
        'Negotiate for 1-month advance salary or settling allowance',
        'Ensure initial flight tickets include all family members',
      ],
      redFlags: [
        'No relocation assistance mentioned',
        'Only employee flight covered (not family)',
        'No temporary accommodation provided',
        'You pay upfront and get reimbursed (cash flow issue)',
      ],
    },
  ];

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const categories = {
    compensation: { label: 'Compensation & Allowances', icon: '💰' },
    benefits: { label: 'Benefits & Leave', icon: '✈️' },
    'employment-terms': { label: 'Employment Terms', icon: '📋' },
    immigration: { label: 'Immigration & Visa', icon: '🛂' },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'important':
        return 'default';
      case 'beneficial':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Must Negotiate';
      case 'important':
        return 'Highly Recommended';
      case 'beneficial':
        return 'Nice to Have';
      default:
        return priority;
    }
  };

  const getProgressByCategory = (category: string) => {
    const categoryItems = checklistItems.filter((item) => item.category === category);
    const checkedCount = categoryItems.filter((item) => checkedItems.has(item.id)).length;
    return {
      checked: checkedCount,
      total: categoryItems.length,
      percentage: Math.round((checkedCount / categoryItems.length) * 100),
    };
  };

  const getTotalProgress = () => {
    return {
      checked: checkedItems.size,
      total: checklistItems.length,
      percentage: Math.round((checkedItems.size / checklistItems.length) * 100),
    };
  };

  const handleDownloadChecklist = () => {
    // Create a text version of the checklist
    let content = 'CONTRACT NEGOTIATION CHECKLIST FOR QATAR\n';
    content += '='.repeat(50) + '\n\n';

    Object.entries(categories).forEach(([categoryKey, categoryData]) => {
      content += `${categoryData.icon} ${categoryData.label.toUpperCase()}\n`;
      content += '-'.repeat(50) + '\n\n';

      const categoryItems = checklistItems.filter((item) => item.category === categoryKey);
      categoryItems.forEach((item, index) => {
        const checked = checkedItems.has(item.id) ? '[✓]' : '[ ]';
        content += `${checked} ${index + 1}. ${item.title}\n`;
        content += `   Priority: ${getPriorityLabel(item.priority)}\n`;
        content += `   ${item.description}\n\n`;
      });
      content += '\n';
    });

    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qatar-contract-negotiation-checklist.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalProgress = getTotalProgress();

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Contract Negotiation Checklist
            </CardTitle>
            <CardDescription>
              Essential contract clauses to review and negotiate before accepting a job offer in Qatar
            </CardDescription>
          </div>
          <Button onClick={handleDownloadChecklist} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>How to use:</strong> Review each item with your contract offer. Check off items as you verify them. Focus on "Must Negotiate" items first.
          </AlertDescription>
        </Alert>

        {/* Overall Progress */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-sm text-muted-foreground">
                  {totalProgress.checked} of {totalProgress.total} reviewed
                </p>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${totalProgress.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right">{totalProgress.percentage}% complete</p>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={expandedCategory} onValueChange={setExpandedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(categories).map(([key, data]) => {
              const progress = getProgressByCategory(key);
              return (
                <TabsTrigger key={key} value={key} className="flex flex-col gap-1 py-3">
                  <span className="text-lg">{data.icon}</span>
                  <span className="text-xs hidden sm:inline">{data.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {progress.checked}/{progress.total}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(categories).map(([categoryKey]) => {
            const categoryItems = checklistItems.filter((item) => item.category === categoryKey);

            return (
              <TabsContent key={categoryKey} value={categoryKey} className="mt-6 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {categoryItems.map((item) => {
                    const isChecked = checkedItems.has(item.id);

                    return (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start gap-3 flex-1 text-left">
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => toggleItem(item.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-medium ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                                  {item.title}
                                </span>
                                <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                                  {getPriorityLabel(item.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-9 space-y-4 pt-2">
                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                What to Look For
                              </h4>
                              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                                {item.whatToLookFor.map((point, idx) => (
                                  <li key={idx} className="list-disc">
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Separator />

                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <Circle className="h-4 w-4 text-secondary" />
                                Negotiation Tips
                              </h4>
                              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                                {item.negotiationTips.map((tip, idx) => (
                                  <li key={idx} className="list-disc">
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Separator />

                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                Red Flags
                              </h4>
                              <ul className="space-y-1 text-sm text-destructive/80 ml-6">
                                {item.redFlags.map((flag, idx) => (
                                  <li key={idx} className="list-disc">
                                    {flag}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>
            );
          })}
        </Tabs>

        <Alert className="bg-secondary/5 border-secondary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Pro Tips for Contract Negotiation:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Get everything in writing</strong> - Verbal promises don't count
                </li>
                <li>
                  <strong>Compare with market rates</strong> - Research typical packages for your role/industry
                </li>
                <li>
                  <strong>Consider total compensation</strong> - Don't focus only on salary; benefits matter
                </li>
                <li>
                  <strong>Review with a legal advisor</strong> - For senior roles or complex contracts
                </li>
                <li>
                  <strong>Ask for time to review</strong> - Never sign on the spot; take 24-48 hours minimum
                </li>
                <li>
                  <strong>Negotiate upfront</strong> - Much harder to change terms after you start working
                </li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Important:</strong> This checklist is for guidance only and does not constitute legal advice. For
            complex employment contracts or senior positions, consult with a qualified employment lawyer or legal
            advisor familiar with Qatar labor law.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
