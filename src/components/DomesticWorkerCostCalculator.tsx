import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, Home, Plane, Heart, FileText, AlertCircle, DollarSign } from "lucide-react";

const DomesticWorkerCostCalculator = () => {
  const [workerType, setWorkerType] = useState<string>("housemaid");
  const [nationality, setNationality] = useState<string>("philippines");
  const [experience, setExperience] = useState<string>("intermediate");
  const [liveIn, setLiveIn] = useState<boolean>(true);
  const [englishSpeaking, setEnglishSpeaking] = useState<boolean>(false);
  const [monthlySalary, setMonthlySalary] = useState<number>(2000);

  // Get salary range based on worker type and experience
  const getSalaryRange = () => {
    const ranges = {
      housemaid: { entry: 1500, intermediate: 2000, experienced: 2500 },
      nanny: { entry: 2000, intermediate: 2500, experienced: 3500 },
      driver: { entry: 2500, intermediate: 3000, experienced: 4000 },
      cook: { entry: 2500, intermediate: 3000, experienced: 4500 },
      housekeeper: { entry: 2000, intermediate: 2500, experienced: 3000 },
    };
    return ranges[workerType as keyof typeof ranges][experience as keyof typeof ranges.housemaid];
  };

  // Calculate recruitment fees based on nationality
  const getRecruitmentFee = () => {
    const fees = {
      philippines: 10000,
      indonesia: 12000,
      nepal: 8000,
      ethiopia: 6500,
      srilanka: 9500,
      india: 9000,
    };
    return fees[nationality as keyof typeof fees];
  };

  // Annual calculations
  const annualSalary = monthlySalary * 12;
  const recruitmentFee = getRecruitmentFee();
  const annualTicket = 3000; // Average return ticket cost
  const medicalInsurance = 1200; // Annual
  const foodAllowance = liveIn ? 0 : 1200; // QAR 100/month if not live-in
  const accommodationCost = liveIn ? 0 : 3600; // If live-out: QAR 300/month
  const endOfServiceGratuity = (monthlySalary * 3) / 52; // 3 weeks per year, prorated
  const visaMedicalCosts = 1500; // Annual visa renewal, medical checkups
  
  // First year total (includes recruitment)
  const firstYearTotal = 
    annualSalary + 
    recruitmentFee + 
    annualTicket + 
    medicalInsurance + 
    foodAllowance + 
    accommodationCost + 
    endOfServiceGratuity + 
    visaMedicalCosts;

  // Subsequent years (no recruitment fee)
  const subsequentYearTotal = firstYearTotal - recruitmentFee;

  const costBreakdown = [
    {
      icon: DollarSign,
      label: "Monthly Salary",
      amount: monthlySalary,
      annual: annualSalary,
      description: "Base monthly compensation",
      highlight: true,
    },
    {
      icon: FileText,
      label: "Recruitment Fee",
      amount: recruitmentFee,
      annual: recruitmentFee,
      description: "One-time (first year only)",
      firstYearOnly: true,
    },
    {
      icon: Plane,
      label: "Annual Return Ticket",
      amount: 3000,
      annual: annualTicket,
      description: "Home country visit",
    },
    {
      icon: Heart,
      label: "Medical Insurance",
      amount: 100,
      annual: medicalInsurance,
      description: "Healthcare coverage",
    },
    {
      icon: Home,
      label: liveIn ? "Food (Provided)" : "Food Allowance",
      amount: liveIn ? 0 : 100,
      annual: foodAllowance,
      description: liveIn ? "Meals at home" : "Monthly allowance",
    },
  ];

  if (!liveIn) {
    costBreakdown.push({
      icon: Home,
      label: "Accommodation Allowance",
      amount: 300,
      annual: accommodationCost,
      description: "Monthly housing support",
    });
  }

  costBreakdown.push(
    {
      icon: Calculator,
      label: "End-of-Service Gratuity",
      amount: Math.round(endOfServiceGratuity),
      annual: Math.round(endOfServiceGratuity * 12),
      description: "Accrued (3 weeks/year)",
    },
    {
      icon: FileText,
      label: "Visa & Medical",
      amount: 125,
      annual: visaMedicalCosts,
      description: "Renewals & checkups",
    }
  );

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Domestic Worker Cost Calculator
        </CardTitle>
        <CardDescription>
          Estimate total annual costs for hiring domestic help in Qatar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Worker Type and Nationality */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="worker-type">Worker Type</Label>
            <Select value={workerType} onValueChange={setWorkerType}>
              <SelectTrigger id="worker-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housemaid">Housemaid</SelectItem>
                <SelectItem value="nanny">Nanny</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="cook">Cook</SelectItem>
                <SelectItem value="housekeeper">Housekeeper</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Select value={nationality} onValueChange={setNationality}>
              <SelectTrigger id="nationality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="philippines">Philippines</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="nepal">Nepal</SelectItem>
                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                <SelectItem value="srilanka">Sri Lanka</SelectItem>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Affects recruitment fees
            </p>
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select 
            value={experience} 
            onValueChange={(val) => {
              setExperience(val);
              setMonthlySalary(getSalaryRange());
            }}
          >
            <SelectTrigger id="experience">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
              <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Salary Input */}
        <div className="space-y-2">
          <Label htmlFor="salary">Monthly Salary (QAR)</Label>
          <Input
            id="salary"
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(Number(e.target.value))}
            min={1000}
            max={10000}
          />
          <p className="text-xs text-muted-foreground">
            Suggested range: QAR {getSalaryRange() - 500} - {getSalaryRange() + 500}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <Checkbox
              id="live-in"
              checked={liveIn}
              onCheckedChange={(checked) => setLiveIn(checked as boolean)}
            />
            <div className="flex-1">
              <Label htmlFor="live-in" className="cursor-pointer font-medium">
                Live-in Arrangement
              </Label>
              <p className="text-sm text-muted-foreground">
                Accommodation and meals provided at home
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <Checkbox
              id="english"
              checked={englishSpeaking}
              onCheckedChange={(checked) => {
                setEnglishSpeaking(checked as boolean);
                if (checked) {
                  setMonthlySalary(prev => Math.min(prev + 300, 10000));
                } else {
                  setMonthlySalary(getSalaryRange());
                }
              }}
            />
            <div className="flex-1">
              <Label htmlFor="english" className="cursor-pointer font-medium">
                English Speaking (+QAR 300/month)
              </Label>
              <p className="text-sm text-muted-foreground">
                Fluent English communication skills
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold">Cost Breakdown</h4>
          {costBreakdown.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  item.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icon className={`h-5 w-5 ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.label}</p>
                      {item.firstYearOnly && (
                        <Badge variant="secondary" className="text-xs">First Year Only</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">QAR {item.annual.toLocaleString()}/yr</p>
                  {item.amount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      QAR {item.amount.toLocaleString()}/mo
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="space-y-3">
          {/* First Year Total */}
          <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold">First Year Total Cost</h3>
                <p className="text-sm text-muted-foreground">Includes recruitment fees</p>
              </div>
              <p className="text-2xl font-bold text-primary">
                QAR {firstYearTotal.toLocaleString()}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
              <p>• Monthly average: QAR {Math.round(firstYearTotal / 12).toLocaleString()}</p>
              <p>• Including one-time costs</p>
            </div>
          </div>

          {/* Subsequent Years Total */}
          <div className="p-4 bg-secondary rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold">Subsequent Years</h3>
                <p className="text-sm text-muted-foreground">Annual recurring costs</p>
              </div>
              <p className="text-xl font-bold">
                QAR {subsequentYearTotal.toLocaleString()}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
              <p>• Monthly average: QAR {Math.round(subsequentYearTotal / 12).toLocaleString()}</p>
              <p>• No recruitment fees</p>
            </div>
          </div>
        </div>

        {/* Additional Costs to Consider */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <AlertCircle className="h-4 w-4" />
            Additional Costs to Consider
          </h4>
          <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-200">
            <li>• Overtime pay (if working beyond 10 hours/day)</li>
            <li>• Training costs (childcare certifications, driving lessons)</li>
            <li>• Replacement costs (if worker leaves early)</li>
            <li>• Telephone/communication allowance</li>
            <li>• Gifts (Eid, holidays, birthdays)</li>
            <li>• Emergency medical costs not covered by insurance</li>
            <li>• Cleaning supplies and household materials</li>
          </ul>
        </div>

        {/* Employer Requirements */}
        <div className="p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold mb-2">Employer Requirements Reminder</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✓ Minimum salary: QAR 10,000-15,000/month (employer)</li>
            <li>✓ Suitable accommodation proving housing capability</li>
            <li>✓ Valid Qatar residence permit</li>
            <li>✓ All recruitment fees paid by employer (not worker)</li>
            <li>✓ Written employment contract mandatory</li>
            <li>✓ One day off per week (legally required)</li>
          </ul>
        </div>

        {/* Cost Comparison */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Cost Comparison: 2-Year Employment
          </h4>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="text-center p-3 bg-background rounded">
              <p className="text-sm text-muted-foreground">Total 2-Year Cost</p>
              <p className="text-xl font-bold text-blue-600">
                QAR {(firstYearTotal + subsequentYearTotal).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-3 bg-background rounded">
              <p className="text-sm text-muted-foreground">Monthly Average (2 years)</p>
              <p className="text-xl font-bold text-blue-600">
                QAR {Math.round((firstYearTotal + subsequentYearTotal) / 24).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomesticWorkerCostCalculator;
