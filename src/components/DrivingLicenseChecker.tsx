import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, FileText, Calendar, Clock } from 'lucide-react';

const DrivingLicenseChecker = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [result, setResult] = useState<any>(null);

  const directTransferCountries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Netherlands', 'Spain', 'Portugal', 'Italy', 'Australia', 
    'New Zealand', 'Japan', 'South Korea', 'Switzerland', 'Austria'
  ];

  const allCountries = [
    ...directTransferCountries,
    'India', 'Philippines', 'Pakistan', 'Bangladesh', 'Sri Lanka',
    'Egypt', 'Jordan', 'Lebanon', 'Saudi Arabia', 'UAE',
    'China', 'Malaysia', 'Singapore', 'Thailand', 'Indonesia',
    'Russia', 'Brazil', 'Argentina', 'Mexico', 'Turkey',
    'South Africa', 'Nigeria', 'Kenya', 'Other'
  ].sort();

  const checkEligibility = () => {
    if (!selectedCountry) return;

    const isDirect = directTransferCountries.includes(selectedCountry);

    if (isDirect) {
      setResult({
        type: 'direct',
        title: 'Direct License Transfer Available',
        message: `Great news! As a ${selectedCountry} license holder, you can directly transfer your license to a Qatar driving license.`,
        requirements: [
          'Valid driving license from your country',
          'Eye test at approved center',
          'Application at traffic department',
          'Valid Qatar residence permit'
        ],
        process: [
          { step: 'Complete eye test', time: '30 minutes', cost: 'QAR 50-100' },
          { step: 'Visit traffic department', time: '1-2 hours', cost: 'QAR 200-300' },
          { step: 'Submit documents', time: '30 minutes', cost: 'Included' },
          { step: 'Receive Qatar license', time: '5-7 days', cost: 'Included' }
        ],
        totalCost: 'QAR 250-400',
        totalTime: '5-7 days',
        drivingSchool: false
      });
    } else {
      setResult({
        type: 'test',
        title: 'Testing Process Required',
        message: `As a ${selectedCountry} license holder, you'll need to complete theory and practical tests to obtain a Qatar driving license.`,
        requirements: [
          'Valid driving license from your country (if available)',
          'Enrollment in approved driving school',
          'Completion of minimum driving lessons',
          'Pass theory test (35 questions, 70% pass mark)',
          'Pass practical driving test'
        ],
        process: [
          { step: 'Enroll in driving school', time: '1 day', cost: 'QAR 3,000-5,000' },
          { step: 'Complete driving lessons', time: '4-8 weeks', cost: 'Included' },
          { step: 'Theory test preparation', time: '2-4 weeks', cost: 'Included' },
          { step: 'Take theory test', time: '1 hour', cost: 'QAR 200' },
          { step: 'Take practical test', time: '30-45 minutes', cost: 'QAR 200' },
          { step: 'Receive Qatar license', time: '3-5 days', cost: 'Included' }
        ],
        totalCost: 'QAR 3,400-5,400',
        totalTime: '6-12 weeks',
        drivingSchool: true,
        tips: [
          'Book driving school early - popular schools have waitlists',
          'Study traffic signs thoroughly for theory test',
          'Practice parking maneuvers extensively',
          'Some applicants need 2-3 attempts for practical test',
          'Remain calm during test - nerves are common'
        ]
      });
    }
  };

  return (
    <Card className="my-8 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Qatar Driving License Eligibility Checker
        </CardTitle>
        <CardDescription>
          Find out if you can directly transfer your license or need to take tests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select Your Current License Country
            </label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your country..." />
              </SelectTrigger>
              <SelectContent>
                {allCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                    {directTransferCountries.includes(country) && (
                      <span className="ml-2 text-green-600">✓ Direct Transfer</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={checkEligibility} 
            className="w-full"
            disabled={!selectedCountry}
          >
            Check Eligibility
          </Button>
        </div>

        {result && (
          <div className="space-y-6 pt-6 border-t">
            <div className="flex items-start gap-3">
              {result.type === 'direct' ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="font-bold text-lg mb-2">{result.title}</h3>
                <p className="text-muted-foreground mb-4">{result.message}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Total Time</span>
                    </div>
                    <p className="text-lg">{result.totalTime}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Total Cost</span>
                    </div>
                    <p className="text-lg">{result.totalCost}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Requirements
              </h4>
              <ul className="space-y-2">
                {result.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Step-by-Step Process</h4>
              <div className="space-y-3">
                {result.process.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <Badge variant="outline" className="mt-0.5 flex-shrink-0">
                      {idx + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium">{item.step}</p>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span>⏱️ {item.time}</span>
                        <span>💰 {item.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {result.tips && (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Important Tips
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {result.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.type === 'direct' && (
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  ✅ Lucky you! The direct transfer process is straightforward and quick. Most applicants complete it within a week.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DrivingLicenseChecker;
