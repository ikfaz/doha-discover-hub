import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Train, MapPin, CreditCard, Calendar } from "lucide-react";

export const MetroFareCalculator = () => {
  const [fromStation, setFromStation] = useState<string>("");
  const [toStation, setToStation] = useState<string>("");
  const [tripFrequency, setTripFrequency] = useState<string>("single");
  const [classType, setClassType] = useState<string>("standard");

  const stations = {
    red: [
      { value: "al-wakra", label: "Al Wakra", line: "Red" },
      { value: "al-wakra-south", label: "Al Wakra South", line: "Red" },
      { value: "airport", label: "Hamad International Airport", line: "Red" },
      { value: "new-doha", label: "New Doha", line: "Red" },
      { value: "mashaf", label: "Mashaf", line: "Red" },
      { value: "msheireb", label: "Msheireb (Interchange)", line: "Red" },
      { value: "katara", label: "Katara", line: "Red" },
      { value: "west-bay", label: "West Bay", line: "Red" },
      { value: "qnb", label: "QNB", line: "Red" },
      { value: "lusail", label: "Lusail", line: "Red" },
    ],
    green: [
      { value: "al-riffa", label: "Al Riffa", line: "Green" },
      { value: "msheireb-g", label: "Msheireb (Interchange)", line: "Green" },
      { value: "education-city", label: "Education City", line: "Green" },
      { value: "qatar-national-library", label: "Qatar National Library", line: "Green" },
      { value: "al-shaqab", label: "Al Shaqab", line: "Green" },
      { value: "al-mansoura", label: "Al Mansoura", line: "Green" },
    ],
    gold: [
      { value: "al-aziziyah", label: "Al Aziziyah", line: "Gold" },
      { value: "msheireb-go", label: "Msheireb (Interchange)", line: "Gold" },
      { value: "souq-waqif", label: "Souq Waqif", line: "Gold" },
      { value: "national-museum", label: "National Museum", line: "Gold" },
      { value: "ras-bu-aboud", label: "Ras Bu Aboud", line: "Gold" },
    ],
  };

  const allStations = [
    ...stations.red,
    ...stations.green.filter(s => s.value !== "msheireb-g"),
    ...stations.gold.filter(s => s.value !== "msheireb-go"),
  ];

  const calculateFare = () => {
    if (!fromStation || !toStation) return null;

    // Base fare calculation (simplified - actual fares are distance-based)
    const baseFare = fromStation === toStation ? 2 : 
                     fromStation.includes("airport") || toStation.includes("airport") ? 6 :
                     Math.abs(allStations.findIndex(s => s.value === fromStation) - 
                             allStations.findIndex(s => s.value === toStation)) <= 3 ? 2 : 
                     Math.abs(allStations.findIndex(s => s.value === fromStation) - 
                             allStations.findIndex(s => s.value === toStation)) <= 7 ? 4 : 6;

    const fareMultiplier = classType === "gold" ? 2 : 1;
    const singleFare = baseFare * fareMultiplier;

    // Calculate for different frequencies
    const dailyFare = singleFare * 2; // Round trip
    const weeklyFare = dailyFare * 5; // 5 working days
    const monthlyFare = 200; // Unlimited monthly pass

    let recommendation = "";
    let savingsInfo = "";

    if (tripFrequency === "single") {
      recommendation = "Single Journey";
    } else if (tripFrequency === "daily") {
      const dayPassCost = 12;
      if (dailyFare > dayPassCost) {
        recommendation = "Day Pass (QAR 12)";
        savingsInfo = `Save QAR ${(dailyFare - dayPassCost).toFixed(2)} per day`;
      } else {
        recommendation = "Pay per trip";
      }
    } else if (tripFrequency === "weekly") {
      const dayPassesWeek = 12 * 5;
      if (weeklyFare > dayPassesWeek && weeklyFare < monthlyFare) {
        recommendation = "Day Passes";
        savingsInfo = `QAR ${dayPassesWeek} for 5 day passes vs QAR ${weeklyFare.toFixed(0)} per trip`;
      } else if (weeklyFare * 4 > monthlyFare) {
        recommendation = "Monthly Pass (QAR 200)";
        savingsInfo = `Save QAR ${(weeklyFare * 4 - monthlyFare).toFixed(0)} per month`;
      } else {
        recommendation = "Pay per trip";
      }
    } else if (tripFrequency === "monthly") {
      if (weeklyFare * 4 > monthlyFare) {
        recommendation = "Monthly Pass (QAR 200) - Best Value!";
        savingsInfo = `Save QAR ${(weeklyFare * 4 - monthlyFare).toFixed(0)} per month`;
      } else {
        recommendation = "Pay per trip (you travel infrequently)";
      }
    }

    return {
      singleFare,
      dailyFare,
      weeklyFare,
      monthlyPassCost: monthlyFare,
      recommendation,
      savingsInfo,
      dayPassCost: 12,
    };
  };

  const result = calculateFare();

  const getStationLine = (stationValue: string) => {
    const station = allStations.find(s => s.value === stationValue);
    return station?.line || "";
  };

  const getLineColor = (line: string) => {
    switch (line) {
      case "Red": return "text-red-600 bg-red-50 dark:bg-red-950/20";
      case "Green": return "text-green-600 bg-green-50 dark:bg-green-950/20";
      case "Gold": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20";
      default: return "";
    }
  };

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="w-6 h-6" />
          Metro Fare Calculator & Route Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Calculate metro fares and find the best ticket option based on your travel frequency. 
            Select your route and see personalized recommendations.
          </p>
        </div>

        {/* Route Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="from" className="flex items-center gap-2 text-base font-semibold">
              <MapPin className="w-5 h-5 text-primary" />
              From Station
            </Label>
            <Select value={fromStation} onValueChange={setFromStation}>
              <SelectTrigger id="from" className="bg-background">
                <SelectValue placeholder="Select starting station" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50 max-h-80">
                {Object.entries(stations).map(([line, stationList]) => (
                  <div key={line}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {line.charAt(0).toUpperCase() + line.slice(1)} Line
                    </div>
                    {stationList.map(station => (
                      <SelectItem key={station.value} value={station.value}>
                        {station.label}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
            {fromStation && (
              <Badge className={getLineColor(getStationLine(fromStation))}>
                {getStationLine(fromStation)} Line
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="to" className="flex items-center gap-2 text-base font-semibold">
              <MapPin className="w-5 h-5 text-primary" />
              To Station
            </Label>
            <Select value={toStation} onValueChange={setToStation}>
              <SelectTrigger id="to" className="bg-background">
                <SelectValue placeholder="Select destination station" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50 max-h-80">
                {Object.entries(stations).map(([line, stationList]) => (
                  <div key={line}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {line.charAt(0).toUpperCase() + line.slice(1)} Line
                    </div>
                    {stationList.map(station => (
                      <SelectItem key={station.value} value={station.value}>
                        {station.label}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
            {toStation && (
              <Badge className={getLineColor(getStationLine(toStation))}>
                {getStationLine(toStation)} Line
              </Badge>
            )}
          </div>
        </div>

        {/* Travel Frequency */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Calendar className="w-5 h-5 text-primary" />
            How often will you make this trip?
          </Label>
          <RadioGroup value={tripFrequency} onValueChange={setTripFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single" className="cursor-pointer">One-time trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="cursor-pointer">Daily (round trip)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="cursor-pointer">5 days per week (commuting)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="cursor-pointer">Regular monthly use</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Class Type */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <CreditCard className="w-5 h-5 text-primary" />
            Class Type
          </Label>
          <RadioGroup value={classType} onValueChange={setClassType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="cursor-pointer">Standard Class</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gold" id="gold" />
              <Label htmlFor="gold" className="cursor-pointer">Gold Class (Premium, 2x fare)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20 space-y-4">
            <h3 className="text-xl font-bold">Your Fare Breakdown</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Single Journey</p>
                <p className="text-2xl font-bold">QAR {result.singleFare.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">{classType === "gold" ? "Gold Class" : "Standard"}</p>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Daily (Round Trip)</p>
                <p className="text-2xl font-bold">QAR {result.dailyFare.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">2 trips per day</p>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Weekly (5 days)</p>
                <p className="text-2xl font-bold">QAR {result.weeklyFare.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground mt-1">10 trips per week</p>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Monthly Pass</p>
                <p className="text-2xl font-bold text-green-600">QAR {result.monthlyPassCost}</p>
                <p className="text-xs text-muted-foreground mt-1">Unlimited rides</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2">💡 Recommended Option:</h4>
              <p className="text-lg font-bold text-primary">{result.recommendation}</p>
              {result.savingsInfo && (
                <p className="text-sm text-green-600 mt-2">✓ {result.savingsInfo}</p>
              )}
            </div>

            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">Ticket Options:</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-muted/50 rounded">
                  <p className="font-semibold">Standard Card</p>
                  <p className="text-xs text-muted-foreground">QAR 10 deposit (refundable)</p>
                  <p className="text-xs text-muted-foreground mt-1">Top-up as needed</p>
                </div>
                <div className="p-3 bg-muted/50 rounded">
                  <p className="font-semibold">Day Pass</p>
                  <p className="text-xs text-muted-foreground">QAR 12 unlimited</p>
                  <p className="text-xs text-muted-foreground mt-1">Valid 24 hours</p>
                </div>
                <div className="p-3 bg-muted/50 rounded">
                  <p className="font-semibold">Monthly Pass</p>
                  <p className="text-xs text-muted-foreground">QAR 200 unlimited</p>
                  <p className="text-xs text-muted-foreground mt-1">Best for commuters</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!result && (
          <div className="p-8 text-center text-muted-foreground">
            <Train className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select your route to calculate fares and see recommendations</p>
          </div>
        )}

        {/* Tips */}
        {result && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Metro Travel Tips:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Peak hours: 7-9 AM, 4-7 PM - trains can be crowded</li>
              <li>• Download Qatar Rail app for real-time tracking</li>
              <li>• Women's and family carriages available on all trains</li>
              <li>• Transfers between lines at Msheireb station</li>
              <li>• Friday service starts at 2:00 PM (after prayers)</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
