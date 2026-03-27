import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Download, Clock, FileText, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  attestationRequired: boolean;
  estimatedTime: string;
}

interface VisaType {
  id: string;
  name: string;
  timeline: string;
  cost: string;
  items: ChecklistItem[];
}

const visaTypes: VisaType[] = [
  {
    id: 'work',
    name: 'Employment Visa (Work Permit)',
    timeline: '4-8 weeks',
    cost: 'QAR 800-1,500',
    items: [
      {
        id: 'work-1',
        title: 'Valid Job Offer Letter',
        description: 'Signed employment contract from Qatar-registered company',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'work-2',
        title: 'Passport Copy',
        description: 'Valid passport with 6+ months validity, clear photo pages',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'work-3',
        title: 'Educational Certificates',
        description: 'Degree certificates, transcripts - FULLY ATTESTED',
        required: true,
        attestationRequired: true,
        estimatedTime: '4-8 weeks',
      },
      {
        id: 'work-4',
        title: 'Professional Certifications',
        description: 'License, trade certifications if applicable - ATTESTED',
        required: false,
        attestationRequired: true,
        estimatedTime: '4-8 weeks',
      },
      {
        id: 'work-5',
        title: 'Police Clearance Certificate',
        description: 'Criminal background check from home country',
        required: true,
        attestationRequired: true,
        estimatedTime: '2-4 weeks',
      },
      {
        id: 'work-6',
        title: 'Passport-Size Photos',
        description: '6-8 recent photos (white background)',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'work-7',
        title: 'Medical Examination',
        description: 'Blood tests, chest X-ray at approved Qatar clinic upon arrival',
        required: true,
        attestationRequired: false,
        estimatedTime: '1-2 days',
      },
      {
        id: 'work-8',
        title: 'Biometric Registration',
        description: 'Fingerprinting at immigration upon arrival',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
    ],
  },
  {
    id: 'family',
    name: 'Family Sponsorship Visa',
    timeline: '2-4 weeks',
    cost: 'QAR 500-1,000 per person',
    items: [
      {
        id: 'fam-1',
        title: 'Sponsor\'s Valid QID',
        description: 'Sponsor must have valid Qatar ID with minimum QAR 10,000 salary',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'fam-2',
        title: 'Marriage Certificate',
        description: 'Original marriage certificate - FULLY ATTESTED',
        required: true,
        attestationRequired: true,
        estimatedTime: '4-8 weeks',
      },
      {
        id: 'fam-3',
        title: 'Children\'s Birth Certificates',
        description: 'For each child - FULLY ATTESTED',
        required: true,
        attestationRequired: true,
        estimatedTime: '4-8 weeks',
      },
      {
        id: 'fam-4',
        title: 'Passport Copies',
        description: 'Valid passports for all family members',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'fam-5',
        title: 'Accommodation Proof',
        description: 'Tenancy contract showing suitable family housing',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'fam-6',
        title: 'Salary Certificate',
        description: 'Employer letter confirming minimum QAR 10,000 salary',
        required: true,
        attestationRequired: false,
        estimatedTime: '1-2 days',
      },
      {
        id: 'fam-7',
        title: 'Family Photos',
        description: 'Passport-size photos for each family member',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'fam-8',
        title: 'Medical Examinations',
        description: 'Upon arrival in Qatar for all family members',
        required: true,
        attestationRequired: false,
        estimatedTime: '1-2 days',
      },
    ],
  },
  {
    id: 'golden',
    name: 'Golden Visa (Investment)',
    timeline: '4-8 weeks',
    cost: 'QAR 2,000-5,000',
    items: [
      {
        id: 'gold-1',
        title: 'Investment Proof',
        description: 'Property deed, business registration, or bank deposit certificate',
        required: true,
        attestationRequired: true,
        estimatedTime: '2-4 weeks',
      },
      {
        id: 'gold-2',
        title: 'Property Title Deed',
        description: 'For real estate investment (QAR 3.65M minimum)',
        required: false,
        attestationRequired: true,
        estimatedTime: '2-4 weeks',
      },
      {
        id: 'gold-3',
        title: 'Business License',
        description: 'For business investment (QAR 730K minimum)',
        required: false,
        attestationRequired: true,
        estimatedTime: '3-6 weeks',
      },
      {
        id: 'gold-4',
        title: 'Bank Deposit Certificate',
        description: 'For fixed deposit investment (QAR 3M minimum)',
        required: false,
        attestationRequired: false,
        estimatedTime: '1 week',
      },
      {
        id: 'gold-5',
        title: 'Passport Copy',
        description: 'Valid passport with 6+ months validity',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'gold-6',
        title: 'Financial Statements',
        description: 'Bank statements proving source of funds',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 week',
      },
      {
        id: 'gold-7',
        title: 'Police Clearance Certificate',
        description: 'Criminal background check - ATTESTED',
        required: true,
        attestationRequired: true,
        estimatedTime: '2-4 weeks',
      },
      {
        id: 'gold-8',
        title: 'Medical Examination',
        description: 'Complete health check at approved clinic',
        required: true,
        attestationRequired: false,
        estimatedTime: '1-2 days',
      },
      {
        id: 'gold-9',
        title: 'CV/Resume',
        description: 'Professional background documentation',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
    ],
  },
  {
    id: 'tourist',
    name: 'Tourist/Visit Visa',
    timeline: '3-7 days',
    cost: 'Free-QAR 100',
    items: [
      {
        id: 'tour-1',
        title: 'Valid Passport',
        description: 'Passport with 6+ months validity',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'tour-2',
        title: 'Confirmed Travel Booking',
        description: 'Flight tickets showing entry and exit dates',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'tour-3',
        title: 'Hotel Reservation',
        description: 'Confirmed accommodation for duration of stay',
        required: true,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'tour-4',
        title: 'Travel Insurance',
        description: 'Recommended but not mandatory',
        required: false,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
      {
        id: 'tour-5',
        title: 'Bank Statements',
        description: 'Proof of sufficient funds (sometimes requested)',
        required: false,
        attestationRequired: false,
        estimatedTime: '1 day',
      },
    ],
  },
];

const VisaChecklistGenerator = () => {
  const [selectedVisa, setSelectedVisa] = useState<string>('work');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const currentVisa = visaTypes.find(v => v.id === selectedVisa) || visaTypes[0];
  const totalItems = currentVisa.items.length;
  const completedItems = currentVisa.items.filter(item => checkedItems.has(item.id)).length;
  const progress = (completedItems / totalItems) * 100;

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const handleVisaChange = (value: string) => {
    setSelectedVisa(value);
    setCheckedItems(new Set());
  };

  const handleDownload = () => {
    const checklist = [
      `=== ${currentVisa.name.toUpperCase()} CHECKLIST ===`,
      `Timeline: ${currentVisa.timeline}`,
      `Estimated Cost: ${currentVisa.cost}`,
      '',
      '=== REQUIRED DOCUMENTS ===',
      ...currentVisa.items.map((item, index) => {
        const status = checkedItems.has(item.id) ? '[✓]' : '[ ]';
        const required = item.required ? '[REQUIRED]' : '[OPTIONAL]';
        const attested = item.attestationRequired ? '[ATTESTATION NEEDED]' : '';
        return `${status} ${index + 1}. ${item.title} ${required} ${attested}\n   ${item.description}\n   Timeline: ${item.estimatedTime}`;
      }),
      '',
      '=== ATTESTATION STEPS (for documents requiring attestation) ===',
      '1. Home Country Foreign Ministry',
      '2. Qatar Embassy in Home Country',
      '3. Ministry of Foreign Affairs Qatar',
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
    ].join('\n');

    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qatar-${selectedVisa}-visa-checklist-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Visa Application Checklist Generator
        </CardTitle>
        <CardDescription>
          Select your visa type to get a personalized checklist with required documents, attestation steps, and timeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visa Type Selection */}
        <div>
          <Label htmlFor="visaType">Select Visa Type</Label>
          <Select value={selectedVisa} onValueChange={handleVisaChange}>
            <SelectTrigger id="visaType" className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visaTypes.map(visa => (
                <SelectItem key={visa.id} value={visa.id}>
                  {visa.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Card */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">Timeline</span>
            </div>
            <p className="font-semibold text-blue-900 dark:text-blue-100">{currentVisa.timeline}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Est. Cost</span>
            </div>
            <p className="font-semibold text-green-900 dark:text-green-100">{currentVisa.cost}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-muted-foreground">Progress</span>
            </div>
            <p className="font-semibold text-purple-900 dark:text-purple-100">
              {completedItems}/{totalItems} Complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Checklist Completion</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Separator />

        {/* Checklist Items */}
        <div>
          <h4 className="font-semibold mb-4">Document Checklist</h4>
          <div className="space-y-3">
            {currentVisa.items.map((item, index) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 transition-all ${
                  checkedItems.has(item.id) ? 'bg-green-50 dark:bg-green-950/20 border-green-300' : 'bg-card'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={checkedItems.has(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <label
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${
                          checkedItems.has(item.id) ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {index + 1}. {item.title}
                      </label>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                        {item.attestationRequired && (
                          <Badge variant="outline" className="text-xs">Attest</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Attestation Process */}
        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Document Attestation Process
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                Documents marked with "Attest" badge require official attestation through this chain:
              </p>
              <ol className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-decimal list-inside">
                <li>Home Country Foreign Ministry</li>
                <li>Qatar Embassy in Your Home Country</li>
                <li>Ministry of Foreign Affairs Qatar (upon arrival)</li>
              </ol>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-3">
                ⏱️ Allow 4-8 weeks for complete attestation process
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button onClick={handleDownload} className="w-full" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Checklist
        </Button>
      </CardContent>
    </Card>
  );
};

export default VisaChecklistGenerator;
