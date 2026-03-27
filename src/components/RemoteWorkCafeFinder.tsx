import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Wifi, Zap, MapPin, Coffee, Clock, Volume2, Users, Star } from "lucide-react";

interface Cafe {
  name: string;
  location: string;
  area: string;
  hours: string;
  wifiSpeed: string;
  powerOutlets: string;
  seating: string;
  noiseLevel: string;
  coffeePrice: string;
  atmosphere: string;
  bestFor: string[];
  rating: number;
}

const RemoteWorkCafeFinder = () => {
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [needsPowerOutlets, setNeedsPowerOutlets] = useState<boolean>(false);
  const [needsQuiet, setNeedsQuiet] = useState<boolean>(false);
  const [needsLongHours, setNeedsLongHours] = useState<boolean>(false);
  const [workType, setWorkType] = useState<string>("all");

  const cafes: Cafe[] = [
    {
      name: "Flat White Specialty Coffee",
      location: "Msheireb Downtown",
      area: "Msheireb",
      hours: "7 AM - 11 PM",
      wifiSpeed: "Excellent (50+ Mbps)",
      powerOutlets: "Throughout venue",
      seating: "Tables and counters",
      noiseLevel: "Moderate",
      coffeePrice: "QAR 25-45",
      atmosphere: "Professional, modern",
      bestFor: ["Serious work", "All-day sessions", "Meetings"],
      rating: 4.8,
    },
    {
      name: "Drop Coffee",
      location: "Multiple locations",
      area: "Various",
      hours: "6 AM - 12 AM",
      wifiSpeed: "Fast (30+ Mbps)",
      powerOutlets: "Most tables",
      seating: "Varied options",
      noiseLevel: "Moderate",
      coffeePrice: "QAR 20-40",
      atmosphere: "Consistent, reliable",
      bestFor: ["Quick sessions", "Convenience", "Chain reliability"],
      rating: 4.5,
    },
    {
      name: "DRVN Coffee",
      location: "City Center Mall",
      area: "City Center",
      hours: "9 AM - 10 PM",
      wifiSpeed: "Good (20+ Mbps)",
      powerOutlets: "Limited",
      seating: "Modern arrangements",
      noiseLevel: "Mall ambient",
      coffeePrice: "QAR 30-50",
      atmosphere: "Designer, aesthetic",
      bestFor: ["Creative work", "Short sessions", "Social atmosphere"],
      rating: 4.3,
    },
    {
      name: "Cortado Coffee",
      location: "Al Sadd",
      area: "Al Sadd",
      hours: "7 AM - 11 PM",
      wifiSpeed: "Reliable (25+ Mbps)",
      powerOutlets: "Available",
      seating: "Comfortable tables",
      noiseLevel: "Quiet",
      coffeePrice: "QAR 22-38",
      atmosphere: "Neighborhood, calm",
      bestFor: ["Focused work", "Extended sessions", "Local vibe"],
      rating: 4.6,
    },
    {
      name: "DELI CUCINA",
      location: "West Bay",
      area: "West Bay",
      hours: "7 AM - 11 PM",
      wifiSpeed: "Excellent (50+ Mbps)",
      powerOutlets: "Throughout venue",
      seating: "Restaurant style",
      noiseLevel: "Business appropriate",
      coffeePrice: "QAR 25-45",
      atmosphere: "Professional setting",
      bestFor: ["Client meetings", "Lunch work", "Business environment"],
      rating: 4.7,
    },
    {
      name: "Cavalli Caffe (The Pearl)",
      location: "The Pearl-Qatar",
      area: "The Pearl",
      hours: "8 AM - 12 AM",
      wifiSpeed: "Good (20+ Mbps)",
      powerOutlets: "Some tables",
      seating: "Marina views",
      noiseLevel: "Moderate to loud",
      coffeePrice: "QAR 30-50",
      atmosphere: "Upscale, scenic",
      bestFor: ["Relaxed work", "Evening sessions", "Scenic views"],
      rating: 4.4,
    },
    {
      name: "Cafe Bateel (The Pearl)",
      location: "The Pearl-Qatar",
      area: "The Pearl",
      hours: "8 AM - 11 PM",
      wifiSpeed: "Reliable (25+ Mbps)",
      powerOutlets: "Available",
      seating: "Premium comfort",
      noiseLevel: "Moderate",
      coffeePrice: "QAR 28-48",
      atmosphere: "Elegant, refined",
      bestFor: ["Relaxed work", "Quality atmosphere", "Dates lunch"],
      rating: 4.5,
    },
    {
      name: "Katara Cafe",
      location: "Katara Cultural Village",
      area: "Katara",
      hours: "8 AM - 10 PM",
      wifiSpeed: "Good (20+ Mbps)",
      powerOutlets: "Limited",
      seating: "Indoor & outdoor",
      noiseLevel: "Quiet",
      coffeePrice: "QAR 20-45",
      atmosphere: "Cultural, artistic",
      bestFor: ["Creative projects", "Peaceful work", "Inspiration"],
      rating: 4.4,
    },
  ];

  // Filter cafes based on preferences
  const filteredCafes = cafes.filter(cafe => {
    if (selectedArea !== "all" && cafe.area !== selectedArea) return false;
    if (needsPowerOutlets && !cafe.powerOutlets.includes("Throughout") && !cafe.powerOutlets.includes("Most")) return false;
    if (needsQuiet && cafe.noiseLevel !== "Quiet") return false;
    if (needsLongHours && !cafe.hours.includes("11 PM") && !cafe.hours.includes("12 AM")) return false;
    
    // Work type filtering
    if (workType === "meetings" && !cafe.bestFor.some(b => b.toLowerCase().includes("meeting"))) return false;
    if (workType === "focused" && !cafe.bestFor.some(b => b.toLowerCase().includes("focus") || b.toLowerCase().includes("serious"))) return false;
    if (workType === "creative" && !cafe.bestFor.some(b => b.toLowerCase().includes("creative"))) return false;
    
    return true;
  });

  const getNoiseColor = (level: string) => {
    switch (level) {
      case "Quiet": return "text-green-600";
      case "Moderate": return "text-amber-600";
      case "Mall ambient": return "text-orange-600";
      default: return "text-muted-foreground";
    }
  };

  const getWifiColor = (speed: string) => {
    if (speed.includes("Excellent")) return "text-green-600";
    if (speed.includes("Fast") || speed.includes("Reliable")) return "text-blue-600";
    return "text-muted-foreground";
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5" />
          Remote Work Cafe Finder
        </CardTitle>
        <CardDescription>
          Find the perfect cafe for your work style in Doha
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area">Area Preference</Label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger id="area">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Msheireb">Msheireb</SelectItem>
                <SelectItem value="West Bay">West Bay</SelectItem>
                <SelectItem value="The Pearl">The Pearl</SelectItem>
                <SelectItem value="Al Sadd">Al Sadd</SelectItem>
                <SelectItem value="City Center">City Center</SelectItem>
                <SelectItem value="Katara">Katara</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work-type">Work Type</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger id="work-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                <SelectItem value="focused">Deep Focus Work</SelectItem>
                <SelectItem value="creative">Creative Projects</SelectItem>
                <SelectItem value="meetings">Client Meetings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <Label>Must-Have Features</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="power"
                checked={needsPowerOutlets}
                onCheckedChange={(checked) => setNeedsPowerOutlets(checked as boolean)}
              />
              <Label htmlFor="power" className="cursor-pointer">
                Abundant Power Outlets
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="quiet"
                checked={needsQuiet}
                onCheckedChange={(checked) => setNeedsQuiet(checked as boolean)}
              />
              <Label htmlFor="quiet" className="cursor-pointer">
                Quiet Environment
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hours"
                checked={needsLongHours}
                onCheckedChange={(checked) => setNeedsLongHours(checked as boolean)}
              />
              <Label htmlFor="hours" className="cursor-pointer">
                Extended Hours (Open Late)
              </Label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <h4 className="font-semibold">
            {filteredCafes.length} Cafe{filteredCafes.length !== 1 ? 's' : ''} Match Your Criteria
          </h4>

          {filteredCafes.length === 0 ? (
            <div className="p-8 text-center bg-secondary rounded-lg">
              <p className="text-muted-foreground">
                No cafes match all your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCafes.map((cafe, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">{cafe.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{cafe.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{cafe.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{cafe.area}</Badge>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Wifi className={`h-4 w-4 flex-shrink-0 mt-0.5 ${getWifiColor(cafe.wifiSpeed)}`} />
                        <div>
                          <p className="font-medium">WiFi</p>
                          <p className="text-muted-foreground">{cafe.wifiSpeed}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                        <div>
                          <p className="font-medium">Power Outlets</p>
                          <p className="text-muted-foreground">{cafe.powerOutlets}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Volume2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${getNoiseColor(cafe.noiseLevel)}`} />
                        <div>
                          <p className="font-medium">Noise Level</p>
                          <p className="text-muted-foreground">{cafe.noiseLevel}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-600" />
                        <div>
                          <p className="font-medium">Hours</p>
                          <p className="text-muted-foreground">{cafe.hours}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Coffee className="h-4 w-4 flex-shrink-0 mt-0.5 text-brown-600" />
                        <div>
                          <p className="font-medium">Coffee Price</p>
                          <p className="text-muted-foreground">{cafe.coffeePrice}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Users className="h-4 w-4 flex-shrink-0 mt-0.5 text-purple-600" />
                        <div>
                          <p className="font-medium">Seating</p>
                          <p className="text-muted-foreground">{cafe.seating}</p>
                        </div>
                      </div>
                    </div>

                    {/* Best For Tags */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Best For:</p>
                      <div className="flex flex-wrap gap-1">
                        {cafe.bestFor.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Atmosphere */}
                    <div className="p-3 bg-secondary/50 rounded text-sm">
                      <span className="font-medium">Atmosphere: </span>
                      <span className="text-muted-foreground">{cafe.atmosphere}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Cafe Working Tips
          </h4>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li>✓ Purchase something every 2 hours to be respectful</li>
            <li>✓ Avoid peak meal times (12-2 PM) for extended stays</li>
            <li>✓ Bring noise-canceling headphones for calls</li>
            <li>✓ Use VPN on public WiFi for security</li>
            <li>✓ Arrive early for best seat selection</li>
            <li>✓ Check Google Maps for current crowd levels</li>
          </ul>
        </div>

        {/* Cost Calculator */}
        <div className="p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold mb-2">Cafe Working Cost Estimate</h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-background rounded">
              <p className="text-muted-foreground mb-1">Daily Cost (4 hours)</p>
              <p className="text-lg font-bold">QAR 100-150</p>
              <p className="text-xs text-muted-foreground">2-3 coffees + snack</p>
            </div>
            <div className="p-3 bg-background rounded">
              <p className="text-muted-foreground mb-1">Monthly Cost (20 days)</p>
              <p className="text-lg font-bold">QAR 2,000-3,000</p>
              <p className="text-xs text-muted-foreground">vs coworking QAR 800-1,500</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemoteWorkCafeFinder;
