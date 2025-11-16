import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Building2, MapPin, Bed, Sofa, CheckCircle2, TrendingDown, TrendingUp, Info, GraduationCap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyData {
  area: string;
  propertyType: '1-bed' | '2-bed' | '3-bed-villa';
  furnished: boolean;
  unfurnished: boolean;
  amenities: {
    pool: boolean;
    gym: boolean;
    parking: boolean;
    security: boolean;
    playground: boolean;
  };
  rentRange: {
    min: number;
    max: number;
    average: number;
  };
  popularWith: string;
  metroAccess: boolean;
  schoolProximity: 'high' | 'medium' | 'low';
}

const propertyDatabase: PropertyData[] = [
  // The Pearl - Qatar
  {
    area: 'The Pearl',
    propertyType: '1-bed',
    furnished: true,
    unfurnished: false,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: false },
    rentRange: { min: 8000, max: 12000, average: 10000 },
    popularWith: 'Young professionals, Couples',
    metroAccess: false,
    schoolProximity: 'medium',
  },
  {
    area: 'The Pearl',
    propertyType: '2-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 12000, max: 18000, average: 15000 },
    popularWith: 'Small families, Professionals',
    metroAccess: false,
    schoolProximity: 'medium',
  },
  {
    area: 'The Pearl',
    propertyType: '3-bed-villa',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 18000, max: 28000, average: 23000 },
    popularWith: 'Families',
    metroAccess: false,
    schoolProximity: 'medium',
  },
  // West Bay
  {
    area: 'West Bay',
    propertyType: '1-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: false },
    rentRange: { min: 7000, max: 11000, average: 9000 },
    popularWith: 'Business professionals',
    metroAccess: true,
    schoolProximity: 'low',
  },
  {
    area: 'West Bay',
    propertyType: '2-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 10000, max: 15000, average: 12500 },
    popularWith: 'Professionals, Small families',
    metroAccess: true,
    schoolProximity: 'medium',
  },
  {
    area: 'West Bay',
    propertyType: '3-bed-villa',
    furnished: false,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 15000, max: 22000, average: 18500 },
    popularWith: 'Families',
    metroAccess: true,
    schoolProximity: 'medium',
  },
  // Lusail
  {
    area: 'Lusail',
    propertyType: '1-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: false },
    rentRange: { min: 7500, max: 11500, average: 9500 },
    popularWith: 'Modern lifestyle seekers',
    metroAccess: true,
    schoolProximity: 'medium',
  },
  {
    area: 'Lusail',
    propertyType: '2-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 11000, max: 16000, average: 13500 },
    popularWith: 'Families, Professionals',
    metroAccess: true,
    schoolProximity: 'high',
  },
  {
    area: 'Lusail',
    propertyType: '3-bed-villa',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 16000, max: 25000, average: 20500 },
    popularWith: 'Families',
    metroAccess: true,
    schoolProximity: 'high',
  },
  // Al Sadd
  {
    area: 'Al Sadd',
    propertyType: '1-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: false },
    rentRange: { min: 5000, max: 7500, average: 6250 },
    popularWith: 'Budget-conscious singles',
    metroAccess: true,
    schoolProximity: 'medium',
  },
  {
    area: 'Al Sadd',
    propertyType: '2-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 7000, max: 10000, average: 8500 },
    popularWith: 'Mid-level professionals',
    metroAccess: true,
    schoolProximity: 'high',
  },
  {
    area: 'Al Sadd',
    propertyType: '3-bed-villa',
    furnished: false,
    unfurnished: true,
    amenities: { pool: true, gym: false, parking: true, security: true, playground: true },
    rentRange: { min: 10000, max: 14000, average: 12000 },
    popularWith: 'Families seeking value',
    metroAccess: true,
    schoolProximity: 'high',
  },
  // Al Waab
  {
    area: 'Al Waab',
    propertyType: '1-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: false },
    rentRange: { min: 4500, max: 7000, average: 5750 },
    popularWith: 'Budget singles, Couples',
    metroAccess: true,
    schoolProximity: 'medium',
  },
  {
    area: 'Al Waab',
    propertyType: '2-bed',
    furnished: true,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 6500, max: 9500, average: 8000 },
    popularWith: 'Families seeking affordability',
    metroAccess: true,
    schoolProximity: 'high',
  },
  {
    area: 'Al Waab',
    propertyType: '3-bed-villa',
    furnished: false,
    unfurnished: true,
    amenities: { pool: true, gym: true, parking: true, security: true, playground: true },
    rentRange: { min: 9000, max: 13000, average: 11000 },
    popularWith: 'Large families',
    metroAccess: true,
    schoolProximity: 'high',
  },
];

const RentPriceComparison = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all');
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'area'>('price-low');

  const amenityOptions = [
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'gym', label: 'Gym' },
    { id: 'parking', label: 'Parking' },
    { id: 'security', label: '24/7 Security' },
    { id: 'playground', label: 'Playground' },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(a => a !== amenityId)
        : [...prev, amenityId]
    );
  };

  const filteredProperties = useMemo(() => {
    let filtered = propertyDatabase.filter(property => {
      // Property type filter
      if (selectedPropertyType !== 'all' && property.propertyType !== selectedPropertyType) {
        return false;
      }

      // Furnishing filter
      if (selectedFurnishing === 'furnished' && !property.furnished) {
        return false;
      }
      if (selectedFurnishing === 'unfurnished' && !property.unfurnished) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(
          amenityId => property.amenities[amenityId as keyof typeof property.amenities]
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.rentRange.average - b.rentRange.average);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.rentRange.average - a.rentRange.average);
    } else {
      filtered.sort((a, b) => a.area.localeCompare(b.area));
    }

    return filtered;
  }, [selectedPropertyType, selectedFurnishing, selectedAmenities, sortBy]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const areaGroups = filteredProperties.reduce((acc, property) => {
      if (!acc[property.area]) {
        acc[property.area] = [];
      }
      acc[property.area].push(property.rentRange.average);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(areaGroups).map(([area, prices]) => ({
      area,
      average: Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length),
      min: Math.min(...prices),
      max: Math.max(...prices),
    }));
  }, [filteredProperties]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-sm">{payload[0].payload.area}</p>
          <p className="text-sm text-primary font-medium">
            Average: QAR {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const getCheapestAndExpensive = () => {
    if (filteredProperties.length === 0) return null;
    const sorted = [...filteredProperties].sort((a, b) => a.rentRange.average - b.rentRange.average);
    return {
      cheapest: sorted[0],
      expensive: sorted[sorted.length - 1],
    };
  };

  const comparison = getCheapestAndExpensive();

  return (
    <Card className="w-full my-8 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-primary" />
          Rent Price Comparison Tool
        </CardTitle>
        <CardDescription className="text-base">
          Compare rental prices across Doha neighborhoods with filters for property type, furnishing, and amenities.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Property Type</Label>
            <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="1-bed">1-Bedroom</SelectItem>
                <SelectItem value="2-bed">2-Bedroom</SelectItem>
                <SelectItem value="3-bed-villa">3-Bedroom Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Furnishing */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Furnishing</Label>
            <Select value={selectedFurnishing} onValueChange={setSelectedFurnishing}>
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="furnished">Furnished</SelectItem>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Sort By</Label>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="area">Area: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Required Amenities</Label>
          <div className="flex flex-wrap gap-3">
            {amenityOptions.map(amenity => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityToggle(amenity.id)}
                />
                <Label
                  htmlFor={amenity.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
            </span>
          </div>
          {comparison && (
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span>Cheapest: QAR {comparison.cheapest.rentRange.average.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span>Most Expensive: QAR {comparison.expensive.rentRange.average.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Price Chart</TabsTrigger>
            <TabsTrigger value="details">Detailed List</TabsTrigger>
          </TabsList>

          {/* Chart View */}
          <TabsContent value="chart" className="space-y-4 mt-6">
            {chartData.length > 0 ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Rent by Area</CardTitle>
                    <CardDescription>Monthly rent in QAR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="area" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--foreground))' }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--foreground))' }}
                          label={{ value: 'QAR', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="average" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No properties match your selected filters
              </div>
            )}
          </TabsContent>

          {/* Details View */}
          <TabsContent value="details" className="space-y-4 mt-6">
            {filteredProperties.length > 0 ? (
              <div className="space-y-4">
                {filteredProperties.map((property, index) => (
                  <Card key={`${property.area}-${property.propertyType}-${index}`}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Left: Area & Type */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-bold">{property.area}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground capitalize">
                              {property.propertyType.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{property.popularWith}</p>
                          
                          {/* Amenities */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {Object.entries(property.amenities)
                              .filter(([_, hasIt]) => hasIt)
                              .map(([amenity]) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                                </Badge>
                              ))}
                            {property.metroAccess && (
                              <Badge variant="outline" className="text-xs">Metro Access</Badge>
                            )}
                          </div>

                          {/* Additional Info */}
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Sofa className="h-3 w-3" />
                              {property.furnished && property.unfurnished ? 'Both options' : 
                               property.furnished ? 'Furnished' : 'Unfurnished'}
                            </div>
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              School proximity: {property.schoolProximity}
                            </div>
                          </div>
                        </div>

                        {/* Right: Price */}
                        <div className="md:text-right space-y-1">
                          <div className="text-3xl font-bold text-primary">
                            QAR {property.rentRange.average.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">per month (average)</div>
                          <div className="text-xs text-muted-foreground mt-2">
                            Range: QAR {property.rentRange.min.toLocaleString()} - {property.rentRange.max.toLocaleString()}
                          </div>
                          {property.rentRange.average < 8000 && (
                            <Badge variant="default" className="mt-2">Budget-Friendly</Badge>
                          )}
                          {property.rentRange.average > 18000 && (
                            <Badge variant="secondary" className="mt-2">Premium</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No properties match your selected filters. Try adjusting your criteria.
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Money-Saving Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Al Waab & Al Sadd</strong> offer 30-40% savings compared to The Pearl while maintaining good quality</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Unfurnished properties</strong> are typically 15-20% cheaper - worth the initial furniture investment</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Metro access</strong> in Al Sadd and Al Waab reduces transportation costs significantly</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Negotiate</strong> - landlords often accept 5-10% below asking price, especially for annual payments</span>
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RentPriceComparison;
