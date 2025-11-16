import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Wifi, Users, Star, Clock, AlertCircle } from "lucide-react";

interface Cafe {
  name: string;
  location: [number, number]; // [lng, lat]
  address: string;
  wifiSpeed: number; // Mbps
  rating: number;
  crowdLevel: "Low" | "Medium" | "High";
  hours: string;
  powerOutlets: boolean;
  price: string;
  reviews: number;
}

const CafeMapFinder = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  // Cafe data with Doha coordinates
  const cafes: Cafe[] = [
    {
      name: "Flat White Specialty Coffee",
      location: [51.5308, 25.2867], // Msheireb
      address: "Msheireb Downtown Doha",
      wifiSpeed: 52,
      rating: 4.8,
      crowdLevel: "Medium",
      hours: "7 AM - 11 PM",
      powerOutlets: true,
      price: "QAR 25-45",
      reviews: 324,
    },
    {
      name: "Drop Coffee (City Center)",
      location: [51.4827, 25.2532],
      address: "City Center Mall",
      wifiSpeed: 35,
      rating: 4.5,
      crowdLevel: "Medium",
      hours: "6 AM - 12 AM",
      powerOutlets: true,
      price: "QAR 20-40",
      reviews: 289,
    },
    {
      name: "DELI CUCINA",
      location: [51.5256, 25.3208], // West Bay
      address: "West Bay, Doha",
      wifiSpeed: 58,
      rating: 4.7,
      crowdLevel: "Low",
      hours: "7 AM - 11 PM",
      powerOutlets: true,
      price: "QAR 25-45",
      reviews: 156,
    },
    {
      name: "Cortado Coffee",
      location: [51.4894, 25.2854], // Al Sadd
      address: "Al Sadd Street",
      wifiSpeed: 28,
      rating: 4.6,
      crowdLevel: "Low",
      hours: "7 AM - 11 PM",
      powerOutlets: true,
      price: "QAR 22-38",
      reviews: 201,
    },
    {
      name: "Cavalli Caffe",
      location: [51.5547, 25.3697], // The Pearl
      address: "The Pearl-Qatar",
      wifiSpeed: 25,
      rating: 4.4,
      crowdLevel: "High",
      hours: "8 AM - 12 AM",
      powerOutlets: false,
      price: "QAR 30-50",
      reviews: 445,
    },
    {
      name: "Cafe Bateel",
      location: [51.5525, 25.3685], // The Pearl
      address: "The Pearl-Qatar",
      wifiSpeed: 30,
      rating: 4.5,
      crowdLevel: "Medium",
      hours: "8 AM - 11 PM",
      powerOutlets: true,
      price: "QAR 28-48",
      reviews: 378,
    },
    {
      name: "Katara Cafe",
      location: [51.5314, 25.3589], // Katara
      address: "Katara Cultural Village",
      wifiSpeed: 22,
      rating: 4.4,
      crowdLevel: "Low",
      hours: "8 AM - 10 PM",
      powerOutlets: false,
      price: "QAR 20-45",
      reviews: 167,
    },
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [51.5200, 25.2867], // Doha center
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      setIsMapLoaded(true);
      addCafeMarkers();
    });
  };

  const addCafeMarkers = () => {
    if (!map.current) return;

    cafes.forEach((cafe) => {
      const el = document.createElement("div");
      el.className = "cafe-marker";
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.fontSize = "20px";
      
      // Color based on WiFi speed
      if (cafe.wifiSpeed >= 40) {
        el.style.backgroundColor = "#10b981";
      } else if (cafe.wifiSpeed >= 25) {
        el.style.backgroundColor = "#f59e0b";
      } else {
        el.style.backgroundColor = "#ef4444";
      }
      
      el.innerHTML = "☕";

      const marker = new mapboxgl.Marker(el)
        .setLngLat(cafe.location)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        setSelectedCafe(cafe);
        map.current?.flyTo({
          center: cafe.location,
          zoom: 14,
          duration: 1000,
        });
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${cafe.name}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${cafe.address}</p>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 12px;">
              <span>📶 ${cafe.wifiSpeed} Mbps</span>
              <span>⭐ ${cafe.rating}</span>
            </div>
          </div>
        `);

      marker.setPopup(popup);

      el.addEventListener("mouseenter", () => {
        marker.togglePopup();
      });

      el.addEventListener("mouseleave", () => {
        marker.togglePopup();
      });
    });
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "";
    }
  };

  const getWifiColor = (speed: number) => {
    if (speed >= 40) return "text-green-600";
    if (speed >= 25) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          WiFi Speed Tester & Cafe Map
        </CardTitle>
        <CardDescription>
          Interactive map showing WiFi speeds, reviews, and crowd levels at remote work cafes in Doha
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isMapLoaded && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <p>To use the interactive map, you'll need a free Mapbox API token.</p>
                <div className="space-y-2">
                  <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                  <div className="flex gap-2">
                    <Input
                      id="mapbox-token"
                      type="text"
                      placeholder="pk.eyJ1..."
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={initializeMap} disabled={!mapboxToken}>
                      Load Map
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get your free token at{" "}
                    <a
                      href="https://account.mapbox.com/access-tokens/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mapbox.com
                    </a>
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-[500px] rounded-lg border"
          style={{ display: isMapLoaded ? "block" : "none" }}
        />

        {/* Legend */}
        {isMapLoaded && (
          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              WiFi Speed Legend
            </h4>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500" />
                <span>40+ Mbps (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500" />
                <span>25-40 Mbps (Good)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-500" />
                <span>&lt;25 Mbps (Fair)</span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Cafe Details */}
        {selectedCafe && (
          <Card className="border-primary">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{selectedCafe.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedCafe.address}
                  </p>
                </div>
                <Badge className={getCrowdColor(selectedCafe.crowdLevel)}>
                  {selectedCafe.crowdLevel} Crowd
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className={`h-4 w-4 ${getWifiColor(selectedCafe.wifiSpeed)}`} />
                    <span className="font-medium">WiFi Speed:</span>
                    <span className={getWifiColor(selectedCafe.wifiSpeed)}>
                      {selectedCafe.wifiSpeed} Mbps
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">Rating:</span>
                    <span>{selectedCafe.rating}/5</span>
                    <span className="text-muted-foreground">({selectedCafe.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Crowd Level:</span>
                    <span>{selectedCafe.crowdLevel}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Hours:</span>
                    <span>{selectedCafe.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Power Outlets:</span>
                    <Badge variant={selectedCafe.powerOutlets ? "default" : "secondary"}>
                      {selectedCafe.powerOutlets ? "Available" : "Limited"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Coffee Price:</span>
                    <span>{selectedCafe.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-secondary rounded-lg">
                <p className="text-sm">
                  <strong>Best For:</strong>{" "}
                  {selectedCafe.wifiSpeed >= 40 && selectedCafe.crowdLevel === "Low"
                    ? "Perfect for video calls and focused work"
                    : selectedCafe.wifiSpeed >= 40
                    ? "Great for intensive online work"
                    : selectedCafe.crowdLevel === "Low"
                    ? "Ideal for quiet concentration"
                    : "Good for casual work and light browsing"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cafe List */}
        {isMapLoaded && (
          <div className="space-y-3">
            <h4 className="font-semibold">All Remote Work Cafes</h4>
            <div className="grid gap-3">
              {cafes.map((cafe, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCafe?.name === cafe.name ? "border-primary" : ""
                  }`}
                  onClick={() => {
                    setSelectedCafe(cafe);
                    map.current?.flyTo({
                      center: cafe.location,
                      zoom: 14,
                      duration: 1000,
                    });
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold">{cafe.name}</h5>
                        <p className="text-xs text-muted-foreground">{cafe.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCrowdColor(cafe.crowdLevel)} variant="secondary">
                          {cafe.crowdLevel}
                        </Badge>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${getWifiColor(cafe.wifiSpeed)}`}>
                            {cafe.wifiSpeed} Mbps
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {cafe.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            Using the Map
          </h4>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li>• Click on cafe markers to see detailed information</li>
            <li>• Green markers = Excellent WiFi (40+ Mbps)</li>
            <li>• Amber markers = Good WiFi (25-40 Mbps)</li>
            <li>• Red markers = Fair WiFi (&lt;25 Mbps)</li>
            <li>• Hover over markers for quick info</li>
            <li>• Click cafe cards below to fly to location</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CafeMapFinder;
