import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, FileCheck, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  phase: 'pre-arrival' | 'post-arrival' | 'final';
  required: boolean;
  attestationRequired?: boolean;
}

const checklistItems: ChecklistItem[] = [
  // Pre-Arrival Phase
  {
    id: 'job-offer',
    label: 'Signed Employment Contract',
    description: 'Formal job offer and employment contract complying with Qatar Labour Law',
    phase: 'pre-arrival',
    required: true,
  },
  {
    id: 'passport',
    label: 'Valid Passport (6+ months)',
    description: 'Passport must have minimum 6 months validity from entry date',
    phase: 'pre-arrival',
    required: true,
  },
  {
    id: 'education',
    label: 'Educational Certificates',
    description: 'Highest degree/diploma with attestation',
    phase: 'pre-arrival',
    required: true,
    attestationRequired: true,
  },
  {
    id: 'pcc',
    label: 'Police Clearance Certificate',
    description: 'PCC from home country with full attestation',
    phase: 'pre-arrival',
    required: true,
    attestationRequired: true,
  },
  {
    id: 'photos',
    label: 'Passport Photos',
    description: 'White or blue background, standard passport size',
    phase: 'pre-arrival',
    required: true,
  },
  {
    id: 'entry-visa',
    label: 'Work Entry Visa Approval',
    description: 'Employer obtains work entry visa from MoI (30-day validity)',
    phase: 'pre-arrival',
    required: true,
  },
  
  // Post-Arrival Phase
  {
    id: 'medical-exam',
    label: 'Medical Examination',
    description: 'Blood tests, chest X-ray at Medical Commission',
    phase: 'post-arrival',
    required: true,
  },
  {
    id: 'biometrics',
    label: 'Biometrics & Fingerprinting',
    description: 'Visit CEID for fingerprints and digital photo',
    phase: 'post-arrival',
    required: true,
  },
  
  // Final Issuance Phase
  {
    id: 'rp-application',
    label: 'RP Application Submitted',
    description: 'Employer submits final application to MoI',
    phase: 'final',
    required: true,
  },
  {
    id: 'qid-issued',
    label: 'QID Card Issued',
    description: 'Qatar ID card linked to Residence Permit',
    phase: 'final',
    required: true,
  },
];

export const VisaApplicationTracker = () => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const getPhaseItems = (phase: string) => {
    return checklistItems.filter(item => item.phase === phase);
  };

  const getPhaseProgress = (phase: string) => {
    const phaseItems = getPhaseItems(phase);
    const completedPhaseItems = phaseItems.filter(item => completedItems.has(item.id));
    return (completedPhaseItems.length / phaseItems.length) * 100;
  };

  const overallProgress = (completedItems.size / checklistItems.length) * 100;

  const handleReset = () => {
    setCompletedItems(new Set());
  };

  const phaseLabels = {
    'pre-arrival': 'Phase 1: Pre-Arrival (Home Country)',
    'post-arrival': 'Phase 2: Post-Arrival (First Weeks in Qatar)',
    'final': 'Phase 3: Final Issuance (RP & QID)',
  };

  const phaseDescriptions = {
    'pre-arrival': 'Complete these requirements before traveling to Qatar',
    'post-arrival': 'Complete within first 30 days after arrival',
    'final': 'Final steps to obtain your Residence Permit',
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-6 w-6" />
          Work Visa & RP Application Tracker
        </CardTitle>
        <CardDescription>
          Track your progress through the Qatar work visa and residence permit application process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Use this tracker to monitor your visa application progress. Check off each item as you complete it.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{completedItems.size} of {checklistItems.length} completed</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {(['pre-arrival', 'post-arrival', 'final'] as const).map((phase) => (
          <div key={phase} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{phaseLabels[phase]}</h3>
                  <p className="text-sm text-muted-foreground">{phaseDescriptions[phase]}</p>
                </div>
                <Badge variant={getPhaseProgress(phase) === 100 ? 'default' : 'secondary'}>
                  {Math.round(getPhaseProgress(phase))}%
                </Badge>
              </div>
              <Progress value={getPhaseProgress(phase)} className="h-2" />
            </div>

            <div className="space-y-3">
              {getPhaseItems(phase).map((item) => (
                <Card key={item.id} className={completedItems.has(item.id) ? 'bg-primary/5 border-primary/20' : ''}>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={item.id}
                        checked={completedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <label
                          htmlFor={item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                        >
                          {completedItems.has(item.id) ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          {item.label}
                          {item.required && (
                            <Badge variant="destructive" className="ml-2">Required</Badge>
                          )}
                          {item.attestationRequired && (
                            <Badge variant="outline" className="ml-2">Attestation Required</Badge>
                          )}
                        </label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />
          </div>
        ))}

        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset Tracker
          </Button>
        </div>

        {completedItems.size === checklistItems.length && (
          <Alert className="bg-primary/10 border-primary/20">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-2">Congratulations! All steps completed!</p>
              <p className="text-sm">
                You have completed all requirements for your Qatar work visa and residence permit. Your QID should be issued soon.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Critical Reminders:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Attestation:</strong> Educational and PCC documents require multi-step attestation (Home MoFA → Qatari Embassy → Qatar MoFA)</li>
                <li><strong>Timeline:</strong> Work entry visa valid for 30 days - complete medical and biometrics immediately</li>
                <li><strong>Medical Failure:</strong> Failed medical examination results in immediate deportation</li>
                <li><strong>Employer Role:</strong> Your sponsor handles most applications - maintain close communication</li>
                <li><strong>QID Importance:</strong> Required for bank accounts, lease agreements, driving license, and all official transactions</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};