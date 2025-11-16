import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart, Scissors, ShoppingCart, AlertCircle, PawPrint } from "lucide-react";

const VeterinaryCostEstimator = () => {
  const [petType, setPetType] = useState<string>("dog");
  const [breedSize, setBreedSize] = useState<string>("medium");
  const [premiumFood, setPremiumFood] = useState<boolean>(false);
  const [grooming, setGrooming] = useState<number>(6);
  const [insurance, setInsurance] = useState<boolean>(false);

  // Cost data based on pet type and size
  const getCosts = () => {
    const baseCosts = {
      dog: {
        small: {
          checkups: 600, // 2 checkups x 300
          vaccinations: 500, // Annual shots
          food: premiumFood ? 3600 : 2400, // Monthly x 12
          grooming: grooming * 150, // Per session
          emergency: 1000,
        },
        medium: {
          checkups: 700,
          vaccinations: 600,
          food: premiumFood ? 5400 : 3600,
          grooming: grooming * 200,
          emergency: 1500,
        },
        large: {
          checkups: 900,
          vaccinations: 700,
          food: premiumFood ? 7200 : 4800,
          grooming: grooming * 250,
          emergency: 2000,
        },
      },
      cat: {
        small: {
          checkups: 500,
          vaccinations: 450,
          food: premiumFood ? 2400 : 1800,
          grooming: grooming * 100,
          emergency: 800,
        },
        medium: {
          checkups: 600,
          vaccinations: 500,
          food: premiumFood ? 3000 : 2100,
          grooming: grooming * 120,
          emergency: 1000,
        },
        large: {
          checkups: 700,
          vaccinations: 550,
          food: premiumFood ? 3600 : 2400,
          grooming: grooming * 150,
          emergency: 1200,
        },
      },
    };

    const costs = baseCosts[petType as keyof typeof baseCosts][breedSize as keyof typeof baseCosts.dog];
    const insuranceCost = insurance ? 1200 : 0;
    
    return {
      ...costs,
      insurance: insuranceCost,
      total: costs.checkups + costs.vaccinations + costs.food + costs.grooming + costs.emergency + insuranceCost,
    };
  };

  const costs = getCosts();

  const costBreakdown = [
    {
      icon: Heart,
      label: "Regular Checkups",
      amount: costs.checkups,
      description: "2 annual vet visits",
      color: "text-rose-600",
    },
    {
      icon: PawPrint,
      label: "Vaccinations",
      amount: costs.vaccinations,
      description: "Annual immunizations",
      color: "text-blue-600",
    },
    {
      icon: ShoppingCart,
      label: "Food",
      amount: costs.food,
      description: premiumFood ? "Premium brand (12 months)" : "Standard brand (12 months)",
      color: "text-amber-600",
    },
    {
      icon: Scissors,
      label: "Grooming",
      amount: costs.grooming,
      description: `${grooming} sessions/year`,
      color: "text-purple-600",
    },
    {
      icon: AlertCircle,
      label: "Emergency Fund",
      amount: costs.emergency,
      description: "Recommended reserve",
      color: "text-red-600",
    },
  ];

  if (insurance) {
    costBreakdown.push({
      icon: DollarSign,
      label: "Pet Insurance",
      amount: costs.insurance,
      description: "Annual premium",
      color: "text-green-600",
    });
  }

  const getSizeDescription = () => {
    if (petType === "dog") {
      switch (breedSize) {
        case "small": return "Under 10kg (Chihuahua, Pomeranian, etc.)";
        case "medium": return "10-25kg (Cocker Spaniel, Beagle, etc.)";
        case "large": return "Over 25kg (Labrador, German Shepherd, etc.)";
      }
    } else {
      switch (breedSize) {
        case "small": return "Under 4kg (Siamese, Persian, etc.)";
        case "medium": return "4-6kg (British Shorthair, Maine Coon mix, etc.)";
        case "large": return "Over 6kg (Maine Coon, Ragdoll, etc.)";
      }
    }
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Veterinary Cost Estimator
        </CardTitle>
        <CardDescription>
          Calculate expected annual pet care costs in Qatar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pet Type Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pet-type">Pet Type</Label>
            <Select value={petType} onValueChange={setPetType}>
              <SelectTrigger id="pet-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed-size">Breed Size</Label>
            <Select value={breedSize} onValueChange={setBreedSize}>
              <SelectTrigger id="breed-size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{getSizeDescription()}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium">Premium Food</Label>
              <p className="text-sm text-muted-foreground">Imported/high-quality brands</p>
            </div>
            <Button
              variant={premiumFood ? "default" : "outline"}
              size="sm"
              onClick={() => setPremiumFood(!premiumFood)}
            >
              {premiumFood ? "Yes" : "No"}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Grooming Sessions/Year</Label>
              <Badge variant="secondary">{grooming} sessions</Badge>
            </div>
            <Slider
              value={[grooming]}
              onValueChange={(value) => setGrooming(value[0])}
              min={0}
              max={12}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Typical: Dogs 6-12 sessions, Cats 0-4 sessions
            </p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium">Pet Insurance</Label>
              <p className="text-sm text-muted-foreground">Basic coverage plan</p>
            </div>
            <Button
              variant={insurance ? "default" : "outline"}
              size="sm"
              onClick={() => setInsurance(!insurance)}
            >
              {insurance ? "Yes" : "No"}
            </Button>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold">Annual Cost Breakdown</h4>
          {costBreakdown.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <p className="font-semibold">QAR {item.amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">Total Annual Cost</h3>
            <p className="text-2xl font-bold text-primary">
              QAR {costs.total.toLocaleString()}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground mt-3">
            <p>• Monthly average: QAR {Math.round(costs.total / 12).toLocaleString()}</p>
            <p>• Weekly average: QAR {Math.round(costs.total / 52).toLocaleString()}</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Cost-Saving Tips
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Buy pet food in bulk during sales (30-40% savings possible)</li>
            <li>• Consider pet insurance for breeds prone to health issues</li>
            <li>• Learn basic grooming for between professional sessions</li>
            <li>• Stock up on supplies during home visits (food costs 30-50% more in Qatar)</li>
            <li>• Join expat pet groups for shared vet recommendations and discounts</li>
            <li>• Preventive care is cheaper than emergency treatments</li>
          </ul>
        </div>

        {/* Regional Context */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">
            Qatar-Specific Considerations
          </h4>
          <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-200">
            <li>• Summer heat increases AC costs (factor in electricity)</li>
            <li>• Pet food is imported, making it 30-50% more expensive than home countries</li>
            <li>• Limited pet insurance options compared to Western countries</li>
            <li>• Emergency vet care can be costly - build a larger emergency fund</li>
            <li>• Some compounds charge pet deposits (QAR 500-2,000)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VeterinaryCostEstimator;
