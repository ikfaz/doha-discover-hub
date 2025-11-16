import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, MapPin, Users, Crown, TrendingUp, Calendar } from "lucide-react";

interface Gym {
  name: string;
  locations: string[];
  monthlyFee: number;
  annualFee: number;
  joiningFee: number;
  facilities: string[];
  type: string;
  ladiesOnly?: boolean;
  pool?: boolean;
  classes?: boolean;
  personalTraining?: boolean;
}

const GymMembershipComparison = () => {
  const [membershipDuration, setMembershipDuration] = useState<string>("annual");
  const [needsPool, setNeedsPool] = useState<boolean>(false);
  const [needsClasses, setNeedsClasses] = useState<boolean>(false);
  const [ladiesOnly, setLadiesOnly] = useState<boolean>(false);
  const [budget, setBudget] = useState<string>("mid");

  const gyms: Gym[] = [
    {
      name: "Oxygen Gym",
      locations: ["Multiple locations", "West Bay", "Al Sadd"],
      monthlyFee: 400,
      annualFee: 4000,
      joiningFee: 300,
      facilities: ["State-of-art equipment", "Mixed & ladies sections", "Personal training", "Group classes"],
      type: "Chain",
      ladiesOnly: false,
      pool: false,
      classes: true,
      personalTraining: true,
    },
    {
      name: "Fitness First",
      locations: ["Multiple locations", "City Centre", "Villagio"],
      monthlyFee: 525,
      annualFee: 5500,
      joiningFee: 400,
      facilities: ["International equipment", "Wide class variety", "Some with pools", "Family memberships"],
      type: "Chain",
      ladiesOnly: false,
      pool: true,
      classes: true,
      personalTraining: true,
    },
    {
      name: "The Club (West Bay)",
      locations: ["West Bay"],
      monthlyFee: 1000,
      annualFee: 10000,
      joiningFee: 1000,
      facilities: ["Luxury facilities", "Spa & wellness", "Squash courts", "Premium equipment", "Restaurant"],
      type: "Luxury",
      ladiesOnly: false,
      pool: true,
      classes: true,
      personalTraining: true,
    },
    {
      name: "CrossFit Doha",
      locations: ["Industrial Area", "Al Rayyan"],
      monthlyFee: 750,
      annualFee: 7500,
      joiningFee: 200,
      facilities: ["CrossFit equipment", "Expert coaching", "Community atmosphere", "Competition prep"],
      type: "Boutique",
      ladiesOnly: false,
      pool: false,
      classes: true,
      personalTraining: true,
    },
    {
      name: "Aspire Zone",
      locations: ["Aspire Park"],
      monthlyFee: 550,
      annualFee: 5500,
      joiningFee: 300,
      facilities: ["Olympic facilities", "Multiple pools", "Track & field", "Professional coaching"],
      type: "Sports Complex",
      ladiesOnly: false,
      pool: true,
      classes: true,
      personalTraining: true,
    },
    {
      name: "Fitness Time",
      locations: ["Multiple locations"],
      monthlyFee: 350,
      annualFee: 3600,
      joiningFee: 200,
      facilities: ["Quality equipment", "Good locations", "Ladies sections", "Basic classes"],
      type: "Chain",
      ladiesOnly: false,
      pool: false,
      classes: true,
      personalTraining: true,
    },
    {
      name: "Oxygen Gym Ladies",
      locations: ["West Bay", "Al Sadd"],
      monthlyFee: 400,
      annualFee: 4000,
      joiningFee: 300,
      facilities: ["Women exclusive", "Modern equipment", "Private environment", "Female trainers"],
      type: "Ladies Only",
      ladiesOnly: true,
      pool: false,
      classes: true,
      personalTraining: true,
    },
    {
      name: "Community Center Gym",
      locations: ["Various compounds"],
      monthlyFee: 200,
      annualFee: 2000,
      joiningFee: 100,
      facilities: ["Basic equipment", "Convenient location", "Budget friendly", "Functional"],
      type: "Budget",
      ladiesOnly: false,
      pool: false,
      classes: false,
      personalTraining: false,
    },
  ];

  // Filter gyms based on preferences
  const filteredGyms = gyms.filter(gym => {
    if (needsPool && !gym.pool) return false;
    if (needsClasses && !gym.classes) return false;
    if (ladiesOnly && !gym.ladiesOnly) return false;
    
    // Budget filter
    if (budget === "budget" && gym.monthlyFee > 350) return false;
    if (budget === "mid" && (gym.monthlyFee < 300 || gym.monthlyFee > 700)) return false;
    if (budget === "luxury" && gym.monthlyFee < 700) return false;
    
    return true;
  });

  const calculateTotalCost = (gym: Gym) => {
    if (membershipDuration === "monthly") {
      return gym.monthlyFee + gym.joiningFee;
    } else {
      return gym.annualFee + gym.joiningFee;
    }
  };

  const getMonthlyCost = (gym: Gym) => {
    const total = calculateTotalCost(gym);
    if (membershipDuration === "monthly") {
      return total;
    } else {
      return Math.round(total / 12);
    }
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Gym Membership Comparison Tool
        </CardTitle>
        <CardDescription>
          Compare gyms in Doha based on your preferences and budget
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="membership-duration">Membership Duration</Label>
            <Select value={membershipDuration} onValueChange={setMembershipDuration}>
              <SelectTrigger id="membership-duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annual">Annual (Better value)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger id="budget">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget (Under QAR 350/mo)</SelectItem>
                <SelectItem value="mid">Mid-range (QAR 300-700/mo)</SelectItem>
                <SelectItem value="luxury">Luxury (QAR 700+/mo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <Label>Required Facilities</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pool"
                checked={needsPool}
                onCheckedChange={(checked) => setNeedsPool(checked as boolean)}
              />
              <Label htmlFor="pool" className="cursor-pointer">
                Swimming Pool
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="classes"
                checked={needsClasses}
                onCheckedChange={(checked) => setNeedsClasses(checked as boolean)}
              />
              <Label htmlFor="classes" className="cursor-pointer">
                Group Classes Included
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ladies"
                checked={ladiesOnly}
                onCheckedChange={(checked) => setLadiesOnly(checked as boolean)}
              />
              <Label htmlFor="ladies" className="cursor-pointer">
                Ladies-Only Facility
              </Label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">
              {filteredGyms.length} Gym{filteredGyms.length !== 1 ? 's' : ''} Match Your Criteria
            </h4>
            {filteredGyms.length === 0 && (
              <Button variant="outline" size="sm" onClick={() => {
                setNeedsPool(false);
                setNeedsClasses(false);
                setLadiesOnly(false);
              }}>
                Clear Filters
              </Button>
            )}
          </div>

          {filteredGyms.length === 0 ? (
            <div className="p-8 text-center bg-secondary rounded-lg">
              <p className="text-muted-foreground">
                No gyms match your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGyms.map((gym, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">{gym.name}</h4>
                          {gym.type === "Luxury" && <Crown className="h-4 w-4 text-amber-500" />}
                          {gym.ladiesOnly && <Badge variant="secondary">Ladies Only</Badge>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{gym.locations.join(", ")}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          QAR {getMonthlyCost(gym)}
                        </p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {gym.pool && (
                        <Badge variant="outline" className="text-xs">
                          Pool
                        </Badge>
                      )}
                      {gym.classes && (
                        <Badge variant="outline" className="text-xs">
                          Classes
                        </Badge>
                      )}
                      {gym.personalTraining && (
                        <Badge variant="outline" className="text-xs">
                          Personal Training
                        </Badge>
                      )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="p-3 bg-secondary/50 rounded-lg space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {membershipDuration === "monthly" ? "Monthly Fee" : "Annual Fee"}
                        </span>
                        <span className="font-medium">
                          QAR {membershipDuration === "monthly" ? gym.monthlyFee : gym.annualFee}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Joining Fee (one-time)</span>
                        <span className="font-medium">QAR {gym.joiningFee}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-semibold">
                          Total {membershipDuration === "monthly" ? "First Month" : "First Year"}
                        </span>
                        <span className="font-bold">QAR {calculateTotalCost(gym)}</span>
                      </div>
                      {membershipDuration === "annual" && (
                        <p className="text-xs text-muted-foreground pt-1">
                          Saves QAR {(gym.monthlyFee * 12) - gym.annualFee} vs monthly payments
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {gym.facilities.map((facility, i) => (
                          <span key={i} className="text-xs bg-background px-2 py-1 rounded">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Additional Costs Info */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Additional Costs to Consider
          </h4>
          <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-200">
            <li>• Personal training: QAR 150-350 per session</li>
            <li>• Specialized classes: QAR 50-150 per class (if not included)</li>
            <li>• Locker rental: QAR 50-100 per month (some gyms)</li>
            <li>• Towel service: QAR 50-100 per month (luxury gyms)</li>
            <li>• Parking fees: Usually free but check location</li>
            <li>• Sports clothing/equipment if needed</li>
          </ul>
        </div>

        {/* Money-Saving Tips */}
        <div className="p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Money-Saving Tips
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✓ Annual memberships save 15-20% vs monthly</li>
            <li>✓ Corporate discounts available - ask your employer</li>
            <li>✓ Off-peak memberships 20-30% cheaper (weekdays/mornings)</li>
            <li>✓ Join during promotional periods (September, January)</li>
            <li>✓ Negotiate joining fee waiver during sign-up</li>
            <li>✓ Try free trial classes before committing</li>
            <li>✓ Check if compound gym meets basic needs (often free)</li>
          </ul>
        </div>

        {/* Membership Freeze Policy */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Before You Sign Up
          </h4>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li>✓ Visit facility at time you plan to workout (check crowding)</li>
            <li>✓ Read contract carefully - cancellation terms vary</li>
            <li>✓ Ask about membership freeze policy (for travel)</li>
            <li>✓ Verify personal trainer qualifications if using</li>
            <li>✓ Check if classes require pre-booking</li>
            <li>✓ Confirm ladies-only hours/areas if important</li>
            <li>✓ Ask about guest passes for trying out</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymMembershipComparison;
