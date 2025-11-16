import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertCircle, Wine, Beer, Grape } from 'lucide-react';

const QDCPermitCalculator = () => {
  const [religion, setReligion] = useState<string>('');
  const [hasQID, setHasQID] = useState<string>('');
  const [isEmployed, setIsEmployed] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const calculateEligibility = () => {
    setShowResults(true);
  };

  const isEligible = religion === 'non-muslim' && 
                     hasQID === 'yes' && 
                     isEmployed === 'yes' && 
                     parseInt(age) >= 21 && 
                     parseInt(salary.replace(/,/g, '')) >= 3000;

  const getMonthlyLimit = () => {
    const salaryNum = parseInt(salary.replace(/,/g, ''));
    if (salaryNum < 3000) return 0;
    if (salaryNum < 10000) return 1000;
    if (salaryNum < 20000) return 2000;
    return 3000;
  };

  const getEstimatedPurchases = (limit: number) => {
    return {
      beerPacks: Math.floor(limit / 90),
      wineBottles: Math.floor(limit / 100),
      spiritBottles: Math.floor(limit / 200),
      mixedExample: `${Math.floor(limit * 0.4 / 90)} beer 6-packs, ${Math.floor(limit * 0.3 / 100)} wine bottles, ${Math.floor(limit * 0.3 / 200)} spirit bottles`
    };
  };

  const resetForm = () => {
    setReligion('');
    setHasQID('');
    setIsEmployed('');
    setSalary('');
    setAge('');
    setShowResults(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wine className="h-6 w-6" />
          QDC Permit Eligibility & Cost Calculator
        </CardTitle>
        <CardDescription>
          Check if you're eligible for a QDC alcohol permit and estimate your monthly purchasing capacity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Are you a non-Muslim?</Label>
            <RadioGroup value={religion} onValueChange={setReligion}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-muslim" id="non-muslim" />
                <Label htmlFor="non-muslim" className="font-normal cursor-pointer">Yes, I am non-Muslim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="muslim" id="muslim" />
                <Label htmlFor="muslim" className="font-normal cursor-pointer">No, I am Muslim</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Do you have a valid Qatar ID (QID)?</Label>
            <RadioGroup value={hasQID} onValueChange={setHasQID}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="qid-yes" />
                <Label htmlFor="qid-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="qid-no" />
                <Label htmlFor="qid-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Are you currently employed in Qatar?</Label>
            <RadioGroup value={isEmployed} onValueChange={setIsEmployed}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="employed-yes" />
                <Label htmlFor="employed-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="employed-no" />
                <Label htmlFor="employed-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="18"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Monthly Salary (QAR)</Label>
            <Input
              id="salary"
              type="text"
              placeholder="e.g., 15,000"
              value={salary}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (/^\d*$/.test(value)) {
                  setSalary(value ? parseInt(value).toLocaleString() : '');
                }
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateEligibility} className="flex-1">
              Check Eligibility
            </Button>
            <Button onClick={resetForm} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        {showResults && (
          <div className="space-y-4 pt-4 border-t">
            <Alert variant={isEligible ? "default" : "destructive"}>
              <div className="flex items-start gap-3">
                {isEligible ? (
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription>
                    {isEligible ? (
                      <div>
                        <p className="font-semibold mb-2">You appear eligible for a QDC permit!</p>
                        <p className="text-sm">Next steps: Obtain NOC from employer and visit QDC with required documents.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold mb-2">You do not meet QDC permit requirements:</p>
                        <ul className="text-sm space-y-1 ml-4 list-disc">
                          {religion === 'muslim' && <li>Permits only available to non-Muslims</li>}
                          {hasQID === 'no' && <li>Valid Qatar ID required</li>}
                          {isEmployed === 'no' && <li>Active employment in Qatar required</li>}
                          {parseInt(age) < 21 && <li>Minimum age requirement: 21 years</li>}
                          {parseInt(salary.replace(/,/g, '')) < 3000 && <li>Minimum salary requirement: QAR 3,000/month</li>}
                        </ul>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {isEligible && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Estimated Monthly Limit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-4">
                      QAR {getMonthlyLimit().toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your salary, your monthly QDC spending limit would be approximately QAR {getMonthlyLimit().toLocaleString()}
                    </p>
                    
                    <div className="space-y-3 pt-4 border-t">
                      <p className="font-semibold text-sm">What you could purchase monthly:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Beer className="h-5 w-5 text-amber-600" />
                          <div>
                            <div className="font-semibold">{getEstimatedPurchases(getMonthlyLimit()).beerPacks}</div>
                            <div className="text-xs text-muted-foreground">Beer 6-packs</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Grape className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-semibold">{getEstimatedPurchases(getMonthlyLimit()).wineBottles}</div>
                            <div className="text-xs text-muted-foreground">Wine bottles</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Wine className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{getEstimatedPurchases(getMonthlyLimit()).spiritBottles}</div>
                            <div className="text-xs text-muted-foreground">Spirit bottles</div>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          <strong>Mixed shopping example:</strong> {getEstimatedPurchases(getMonthlyLimit()).mixedExample}
                          <br />
                          <span className="text-muted-foreground">Actual capacity varies by specific products and prices</span>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Important:</strong> Estimates based on average QDC prices (Beer QAR 90/6-pack, Wine QAR 100/bottle, Spirits QAR 200/bottle). 
                    Actual limits and prices may vary. Monthly allowance does not roll over.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QDCPermitCalculator;