import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, CheckCircle2, XCircle, Info, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InsurancePlan {
  tier: string;
  name: string;
  typicalCost: string;
  whoProvides: string;
  coverage: {
    category: string;
    items: {
      service: string;
      covered: boolean;
      details?: string;
    }[];
  }[];
  hospitalNetwork: string[];
  waitingTimes: string;
  copay: string;
  annualLimit: string;
  pros: string[];
  cons: string[];
}

export const HealthInsuranceComparison = () => {
  const [selectedFamilySize, setSelectedFamilySize] = useState<string>('individual');
  const [selectedPlan, setSelectedPlan] = useState<string>('comprehensive');

  const insurancePlans: InsurancePlan[] = [
    {
      tier: 'basic',
      name: 'Basic / Mandatory Coverage',
      typicalCost: 'QAR 0 (Employer-paid)',
      whoProvides: 'All employers (by law)',
      coverage: [
        {
          category: 'Primary Care',
          items: [
            { service: 'GP Consultations', covered: true, details: 'At PHCCs and HMC' },
            { service: 'Emergency Services', covered: true, details: '24/7 at HMC hospitals' },
            { service: 'Specialist Referrals', covered: true, details: 'Through public system' },
            { service: 'Choose Your Doctor', covered: false },
          ],
        },
        {
          category: 'Hospital Care',
          items: [
            { service: 'Inpatient Care', covered: true, details: 'HMC hospitals only' },
            { service: 'Surgery (necessary)', covered: true, details: 'Public system' },
            { service: 'Private Hospitals', covered: false },
            { service: 'Single/Private Room', covered: false },
          ],
        },
        {
          category: 'Specialist Services',
          items: [
            { service: 'Laboratory Tests', covered: true, details: 'Subsidized at HMC' },
            { service: 'Radiology/Imaging', covered: true, details: 'Subsidized at HMC' },
            { service: 'Prescription Medications', covered: true, details: 'Subsidized generic drugs' },
            { service: 'Physiotherapy', covered: true, details: 'Limited sessions' },
          ],
        },
        {
          category: 'Additional Services',
          items: [
            { service: 'Dental Care', covered: false, details: 'Emergency only' },
            { service: 'Optical/Vision', covered: false },
            { service: 'Maternity Care', covered: true, details: 'Basic delivery at HMC' },
            { service: 'Mental Health', covered: true, details: 'HMC psychiatric services' },
            { service: 'Wellness Programs', covered: false },
          ],
        },
      ],
      hospitalNetwork: ['Hamad General Hospital', 'Women\'s Wellness Center', 'Al Wakra Hospital', 'Primary Health Care Centers (PHCCs)'],
      waitingTimes: 'Moderate to Long (2-6 weeks for specialists)',
      copay: 'QAR 20-50 per visit',
      annualLimit: 'No limit for covered services',
      pros: [
        'Zero cost to employee (employer-paid)',
        'Covers all essential medical needs',
        'HMC provides high-quality care',
        'No annual limits on covered services',
      ],
      cons: [
        'Longer waiting times for non-emergency care',
        'Limited choice of doctors/facilities',
        'No dental or optical coverage',
        'No access to private hospitals',
        'Shared hospital rooms',
      ],
    },
    {
      tier: 'standard',
      name: 'Standard Private Coverage',
      typicalCost: 'QAR 3,000-6,000/year per person',
      whoProvides: 'Employer (medium companies) or self-paid',
      coverage: [
        {
          category: 'Primary Care',
          items: [
            { service: 'GP Consultations', covered: true, details: 'Private clinics included' },
            { service: 'Emergency Services', covered: true, details: 'Private + HMC hospitals' },
            { service: 'Specialist Referrals', covered: true, details: 'Direct access to specialists' },
            { service: 'Choose Your Doctor', covered: true, details: 'From network' },
          ],
        },
        {
          category: 'Hospital Care',
          items: [
            { service: 'Inpatient Care', covered: true, details: 'Network private hospitals' },
            { service: 'Surgery (necessary)', covered: true, details: 'Pre-authorization required' },
            { service: 'Private Hospitals', covered: true, details: 'Limited network' },
            { service: 'Single/Private Room', covered: true, details: 'Semi-private usually' },
          ],
        },
        {
          category: 'Specialist Services',
          items: [
            { service: 'Laboratory Tests', covered: true, details: 'At network facilities' },
            { service: 'Radiology/Imaging', covered: true, details: 'MRI, CT scans covered' },
            { service: 'Prescription Medications', covered: true, details: '80% coverage typically' },
            { service: 'Physiotherapy', covered: true, details: '10-15 sessions/year' },
          ],
        },
        {
          category: 'Additional Services',
          items: [
            { service: 'Dental Care', covered: true, details: 'Basic coverage (QAR 1,500-3,000)' },
            { service: 'Optical/Vision', covered: true, details: 'QAR 500-1,000 allowance' },
            { service: 'Maternity Care', covered: true, details: 'Normal delivery covered' },
            { service: 'Mental Health', covered: true, details: 'Limited sessions (5-10)' },
            { service: 'Wellness Programs', covered: false },
          ],
        },
      ],
      hospitalNetwork: [
        'Al Ahli Hospital',
        'Al Emadi Hospital (limited)',
        'Naseem Al Rabeeh Medical Center',
        'Aster Clinics',
        'HMC facilities',
      ],
      waitingTimes: 'Short (same day to 1 week)',
      copay: 'QAR 50-100 per visit',
      annualLimit: 'QAR 250,000-500,000',
      pros: [
        'Access to private hospitals and clinics',
        'Much shorter waiting times',
        'Choice of doctors within network',
        'Basic dental and optical coverage',
        'Better hospital rooms',
      ],
      cons: [
        'Limited network of top-tier hospitals',
        'Annual coverage limits',
        'Copays can add up',
        'Pre-authorization required for major procedures',
        'May not cover elective procedures',
      ],
    },
    {
      tier: 'comprehensive',
      name: 'Comprehensive / Premium Coverage',
      typicalCost: 'QAR 8,000-15,000/year per person',
      whoProvides: 'Employer (large corporations) or self-paid',
      coverage: [
        {
          category: 'Primary Care',
          items: [
            { service: 'GP Consultations', covered: true, details: 'All private clinics' },
            { service: 'Emergency Services', covered: true, details: 'All facilities including VIP' },
            { service: 'Specialist Referrals', covered: true, details: 'Direct access, no referral needed' },
            { service: 'Choose Your Doctor', covered: true, details: 'Any doctor in network' },
          ],
        },
        {
          category: 'Hospital Care',
          items: [
            { service: 'Inpatient Care', covered: true, details: 'All private hospitals' },
            { service: 'Surgery (necessary)', covered: true, details: 'Full coverage' },
            { service: 'Private Hospitals', covered: true, details: 'Full network access' },
            { service: 'Single/Private Room', covered: true, details: 'Private room guaranteed' },
          ],
        },
        {
          category: 'Specialist Services',
          items: [
            { service: 'Laboratory Tests', covered: true, details: 'All tests covered' },
            { service: 'Radiology/Imaging', covered: true, details: 'Advanced imaging included' },
            { service: 'Prescription Medications', covered: true, details: '100% coverage' },
            { service: 'Physiotherapy', covered: true, details: 'Unlimited sessions (when medically necessary)' },
          ],
        },
        {
          category: 'Additional Services',
          items: [
            { service: 'Dental Care', covered: true, details: 'Comprehensive (QAR 5,000-10,000)' },
            { service: 'Optical/Vision', covered: true, details: 'QAR 1,500-3,000 allowance' },
            { service: 'Maternity Care', covered: true, details: 'Full coverage including C-section' },
            { service: 'Mental Health', covered: true, details: 'Comprehensive counseling' },
            { service: 'Wellness Programs', covered: true, details: 'Health screenings, vaccinations' },
          ],
        },
      ],
      hospitalNetwork: [
        'Sidra Medicine',
        'Al Emadi Hospital',
        'Doha Clinic Hospital',
        'American Hospital Doha',
        'Qatar Medical Center',
        'Aster Hospital',
        'All HMC facilities',
        'International clinics',
      ],
      waitingTimes: 'Minimal (same day appointments)',
      copay: 'QAR 0-50 or no copay',
      annualLimit: 'QAR 1,000,000+ or unlimited',
      pros: [
        'Access to all top-tier hospitals',
        'Same-day or next-day appointments',
        'Comprehensive dental and optical',
        'No or minimal copays',
        'Coverage for elective procedures',
        'Private rooms and VIP services',
        'Mental health and wellness programs',
        'High annual limits or unlimited',
      ],
      cons: [
        'Higher premium cost (if self-paying)',
        'May include services you don\'t need',
      ],
    },
  ];

  const familySizes = [
    { id: 'individual', label: 'Individual (Employee only)', multiplier: 1 },
    { id: 'couple', label: 'Couple (Employee + Spouse)', multiplier: 2 },
    { id: 'family-1', label: 'Family of 3 (2 adults + 1 child)', multiplier: 2.5 },
    { id: 'family-2', label: 'Family of 4 (2 adults + 2 children)', multiplier: 3 },
    { id: 'family-3', label: 'Family of 5+ (2 adults + 3+ children)', multiplier: 3.5 },
  ];

  const getCostEstimate = (plan: InsurancePlan, familySize: string) => {
    const family = familySizes.find((f) => f.id === familySize);
    if (!family) return plan.typicalCost;

    if (plan.tier === 'basic') {
      return 'QAR 0 (Employer-paid)';
    }

    // Extract base cost from typicalCost string
    const match = plan.typicalCost.match(/(\d+,?\d*)-(\d+,?\d*)/);
    if (!match) return plan.typicalCost;

    const minCost = parseInt(match[1].replace(',', ''));
    const maxCost = parseInt(match[2].replace(',', ''));

    const adjustedMin = Math.round(minCost * family.multiplier);
    const adjustedMax = Math.round(maxCost * family.multiplier);

    return `QAR ${adjustedMin.toLocaleString()}-${adjustedMax.toLocaleString()}/year`;
  };

  const selectedPlanData = insurancePlans.find((p) => p.tier === selectedPlan);

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-6 w-6" />
          Health Insurance Plan Comparison Tool
        </CardTitle>
        <CardDescription>
          Compare health insurance tiers in Qatar and understand what coverage level suits your needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Mandatory Coverage:</strong> All employers must provide at least Basic coverage. Many offer Standard or Comprehensive packages as part of employment benefits.
          </AlertDescription>
        </Alert>

        {/* Family Size Selection */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Select Your Family Size
          </Label>
          <RadioGroup value={selectedFamilySize} onValueChange={setSelectedFamilySize}>
            {familySizes.map((size) => (
              <div key={size.id} className="flex items-center space-x-2">
                <RadioGroupItem value={size.id} id={size.id} />
                <Label htmlFor={size.id} className="cursor-pointer font-normal">
                  {size.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Plan Comparison Tabs */}
        <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">
              Basic
              <Badge variant="secondary" className="ml-2">
                Free
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="comprehensive">
              Premium
              <Badge variant="default" className="ml-2">
                Best
              </Badge>
            </TabsTrigger>
          </TabsList>

          {insurancePlans.map((plan) => (
            <TabsContent key={plan.tier} value={plan.tier} className="space-y-6 mt-6">
              {/* Plan Overview */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.whoProvides}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Annual Cost</p>
                      <p className="text-2xl font-bold text-primary">{getCostEstimate(plan, selectedFamilySize)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Limit</p>
                      <p className="text-xl font-semibold">{plan.annualLimit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Waiting Times</p>
                      <p className="text-sm font-medium">{plan.waitingTimes}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Typical Copay</p>
                      <p className="text-sm font-medium">{plan.copay}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Coverage Details</h4>

                {plan.coverage.map((category) => (
                  <Card key={category.category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <div key={item.service} className="flex items-start gap-3 py-2 border-b last:border-0">
                            {item.covered ? (
                              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{item.service}</p>
                              {item.details && (
                                <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Hospital Network */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Hospital & Clinic Network</h4>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-2">
                      {plan.hospitalNetwork.map((hospital) => (
                        <Badge key={hospital} variant="outline">
                          {hospital}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Advantages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {plan.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="h-5 w-5 text-muted-foreground" />
                      Limitations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {plan.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Alert className="bg-secondary/5 border-secondary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Key Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Families with children:</strong> Comprehensive coverage recommended for better pediatric access
                </li>
                <li>
                  <strong>Singles/couples:</strong> Standard coverage usually sufficient for healthy adults
                </li>
                <li>
                  <strong>Pre-existing conditions:</strong> Ensure coverage includes your specific needs before accepting
                </li>
                <li>
                  <strong>Maternity planning:</strong> Verify maternity coverage limits and waiting periods
                </li>
                <li>
                  <strong>Dental/Optical:</strong> Often excluded from Basic - negotiate for separate coverage or pay out-of-pocket
                </li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
