import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Building2, ShoppingCart, Car, GraduationCap, Utensils, Wifi, Heart, Zap } from 'lucide-react';

interface CityData {
  name: string;
  code: string;
  color: string;
  expenses: {
    housing1Bed: number;
    housing3Bed: number;
    groceries: number;
    transportation: number;
    utilities: number;
    diningOut: number;
    internet: number;
    healthcare: number;
    schoolFees: number;
  };
}

const cityData: CityData[] = [
  {
    name: 'Doha',
    code: 'DOH',
    color: 'hsl(349, 91%, 25%)',
    expenses: {
      housing1Bed: 6500,
      housing3Bed: 14000,
      groceries: 1500,
      transportation: 3000,
      utilities: 500,
      diningOut: 2000,
      internet: 350,
      healthcare: 300,
      schoolFees: 10000,
    },
  },
  {
    name: 'Dubai',
    code: 'DXB',
    color: 'hsl(44, 47%, 53%)',
    expenses: {
      housing1Bed: 7500,
      housing3Bed: 16000,
      groceries: 1600,
      transportation: 3500,
      utilities: 600,
      diningOut: 2500,
      internet: 400,
      healthcare: 400,
      schoolFees: 11000,
    },
  },
  {
    name: 'Riyadh',
    code: 'RUH',
    color: 'hsl(210, 40%, 60%)',
    expenses: {
      housing1Bed: 4500,
      housing3Bed: 9000,
      groceries: 1200,
      transportation: 2500,
      utilities: 400,
      diningOut: 1500,
      internet: 300,
      healthcare: 250,
      schoolFees: 8500,
    },
  },
];

const expenseCategories = [
  { key: 'housing1Bed', label: '1-Bed Apartment', icon: Building2, description: 'Monthly rent' },
  { key: 'housing3Bed', label: '3-Bed Apartment/Villa', icon: Building2, description: 'Monthly rent' },
  { key: 'groceries', label: 'Groceries', icon: ShoppingCart, description: 'Monthly for 1 person' },
  { key: 'transportation', label: 'Transportation', icon: Car, description: 'Car ownership/monthly' },
  { key: 'utilities', label: 'Utilities', icon: Zap, description: 'Electricity, water, AC' },
  { key: 'diningOut', label: 'Dining Out', icon: Utensils, description: 'Monthly average' },
  { key: 'internet', label: 'Internet & Mobile', icon: Wifi, description: 'Monthly' },
  { key: 'healthcare', label: 'Healthcare', icon: Heart, description: 'Monthly average' },
  { key: 'schoolFees', label: 'International School', icon: GraduationCap, description: 'Monthly per child' },
];

const CityCostComparison = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>(['DOH', 'DXB']);

  const handleCityToggle = (cityCode: string) => {
    if (selectedCities.includes(cityCode)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(c => c !== cityCode));
      }
    } else {
      if (selectedCities.length < 3) {
        setSelectedCities([...selectedCities, cityCode]);
      }
    }
  };

  const selectedCityData = cityData.filter(city => selectedCities.includes(city.code));

  // Prepare data for bar charts
  const getChartData = (categoryKey: keyof CityData['expenses']) => {
    return selectedCityData.map(city => ({
      city: city.name,
      amount: city.expenses[categoryKey],
      color: city.color,
    }));
  };

  // Prepare data for radar chart (normalized comparison)
  const getRadarData = () => {
    const categories = ['Housing', 'Groceries', 'Transport', 'Utilities', 'Dining', 'Internet', 'Healthcare', 'School'];
    const expenseKeys: (keyof CityData['expenses'])[] = ['housing3Bed', 'groceries', 'transportation', 'utilities', 'diningOut', 'internet', 'healthcare', 'schoolFees'];
    
    return categories.map((category, index) => {
      const dataPoint: any = { category };
      selectedCityData.forEach(city => {
        dataPoint[city.name] = city.expenses[expenseKeys[index]];
      });
      return dataPoint;
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-sm">{payload[0].payload.city}</p>
          <p className="text-sm text-primary font-medium">
            QAR {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const calculateTotalMonthly = (city: CityData, familySize: 'single' | 'family') => {
    if (familySize === 'single') {
      return city.expenses.housing1Bed + 
             city.expenses.groceries + 
             city.expenses.transportation + 
             city.expenses.utilities + 
             city.expenses.diningOut + 
             city.expenses.internet + 
             city.expenses.healthcare;
    } else {
      return city.expenses.housing3Bed + 
             (city.expenses.groceries * 2.5) + 
             city.expenses.transportation + 
             city.expenses.utilities + 
             city.expenses.diningOut + 
             city.expenses.internet + 
             city.expenses.healthcare + 
             (city.expenses.schoolFees * 2);
    }
  };

  return (
    <Card className="w-full my-8 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-primary" />
          City Cost Comparison Calculator
        </CardTitle>
        <CardDescription className="text-base">
          Compare living expenses across Gulf cities. Select 2-3 cities to analyze costs.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* City Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Select Cities (2-3)</Label>
          <div className="flex flex-wrap gap-4">
            {cityData.map(city => (
              <div key={city.code} className="flex items-center space-x-2">
                <Checkbox
                  id={city.code}
                  checked={selectedCities.includes(city.code)}
                  onCheckedChange={() => handleCityToggle(city.code)}
                  disabled={!selectedCities.includes(city.code) && selectedCities.length >= 3}
                />
                <Label
                  htmlFor={city.code}
                  className="text-sm font-medium cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: city.color }} />
                  {city.name}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {selectedCities.length < 2 && "Select at least 2 cities to compare"}
            {selectedCities.length === 3 && "Maximum 3 cities selected"}
          </p>
        </div>

        {/* Comparison Tabs */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="total">Total Costs</TabsTrigger>
          </TabsList>

          {/* By Category Tab */}
          <TabsContent value="categories" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {expenseCategories.map(category => {
                const Icon = category.icon;
                const data = getChartData(category.key as keyof CityData['expenses']);
                
                return (
                  <Card key={category.key}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5 text-primary" />
                        {category.label}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="city" 
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fill: 'hsl(var(--foreground))' }}
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            tick={{ fill: 'hsl(var(--foreground))' }}
                            label={{ value: 'QAR', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                              <Bar key={`bar-${index}`} dataKey="amount" fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="flex justify-around mt-4 text-sm">
                        {data.map(city => (
                          <div key={city.city} className="text-center">
                            <p className="text-muted-foreground">{city.city}</p>
                            <p className="font-bold text-primary">QAR {city.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Comparison</CardTitle>
                <CardDescription>All expense categories at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="category" 
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 'auto']}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    {selectedCityData.map(city => (
                      <Radar
                        key={city.code}
                        name={city.name}
                        dataKey={city.name}
                        stroke={city.color}
                        fill={city.color}
                        fillOpacity={0.3}
                      />
                    ))}
                    <Legend />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Total Costs Tab */}
          <TabsContent value="total" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Person */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Single Person
                  </CardTitle>
                  <CardDescription>Estimated monthly living costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCityData.map(city => {
                    const total = calculateTotalMonthly(city, 'single');
                    return (
                      <div key={city.code} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: city.color }} />
                          <span className="font-medium">{city.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">QAR {total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-2 text-xs text-muted-foreground">
                    <p>Includes: 1-bed apartment, groceries, transport, utilities, dining, internet, healthcare</p>
                  </div>
                </CardContent>
              </Card>

              {/* Family */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Family (2 Adults + 2 Children)
                  </CardTitle>
                  <CardDescription>Estimated monthly living costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCityData.map(city => {
                    const total = calculateTotalMonthly(city, 'family');
                    return (
                      <div key={city.code} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: city.color }} />
                          <span className="font-medium">{city.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">QAR {total.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-2 text-xs text-muted-foreground">
                    <p>Includes: 3-bed villa, groceries (×2.5), transport, utilities, dining, internet, healthcare, school fees (×2)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Savings Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Savings Potential</CardTitle>
                <CardDescription>Based on QAR 20,000 salary (single) or QAR 45,000 (family)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCityData.map(city => {
                    const singleExpense = calculateTotalMonthly(city, 'single');
                    const singleSavings = 20000 - singleExpense;
                    const singleRate = ((singleSavings / 20000) * 100).toFixed(1);
                    
                    const familyExpense = calculateTotalMonthly(city, 'family');
                    const familySavings = 45000 - familyExpense;
                    const familyRate = ((familySavings / 45000) * 100).toFixed(1);
                    
                    return (
                      <div key={city.code} className="p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: city.color }} />
                          <h4 className="font-semibold">{city.name}</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Single Person</p>
                            <p className="text-lg font-bold text-primary">
                              QAR {singleSavings.toLocaleString()} 
                              <span className="text-sm font-normal ml-2">({singleRate}%)</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Family</p>
                            <p className="text-lg font-bold text-primary">
                              QAR {familySavings.toLocaleString()} 
                              <span className="text-sm font-normal ml-2">({familyRate}%)</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Housing</strong> is the largest expense across all cities, typically 35-45% of monthly costs</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Riyadh</strong> offers the most affordable housing and overall living costs</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Dubai</strong> has the highest costs, especially for premium areas and dining</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Doha</strong> balances costs with high purchasing power, offering strong savings potential</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>School fees</strong> significantly impact family budgets - negotiate education allowances</span>
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CityCostComparison;
