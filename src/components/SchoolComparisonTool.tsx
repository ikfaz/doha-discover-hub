import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Check, X, Info, GraduationCap, MapPin, DollarSign } from 'lucide-react';

interface School {
  id: string;
  name: string;
  curriculum: string;
  feeRange: string;
  feeMin: number;
  feeMax: number;
  location: string;
  waitlist: 'Short' | 'Medium' | 'Long';
  facilities: string[];
  classSize: string;
  accreditation: string[];
  grades: string;
}

const schools: School[] = [
  {
    id: '1',
    name: 'Doha College',
    curriculum: 'British',
    feeRange: 'QAR 85,000-95,000',
    feeMin: 85000,
    feeMax: 95000,
    location: 'Al Waab',
    waitlist: 'Long',
    facilities: ['Swimming Pool', 'Sports Complex', 'Theater', 'Science Labs', 'Library'],
    classSize: '1:18',
    accreditation: ['BSO', 'CIS'],
    grades: 'KG1-Year 13',
  },
  {
    id: '2',
    name: 'American School of Doha',
    curriculum: 'American',
    feeRange: 'QAR 90,000-110,000',
    feeMin: 90000,
    feeMax: 110000,
    location: 'Al Gharrafa',
    waitlist: 'Long',
    facilities: ['Olympic Pool', 'Athletics Track', 'Arts Center', 'Innovation Lab', 'Media Center'],
    classSize: '1:15',
    accreditation: ['MSA', 'CIS'],
    grades: 'Pre-K-Grade 12',
  },
  {
    id: '3',
    name: 'Qatar Academy',
    curriculum: 'IB',
    feeRange: 'QAR 95,000-115,000',
    feeMin: 95000,
    feeMax: 115000,
    location: 'Al Rayyan',
    waitlist: 'Long',
    facilities: ['Aquatic Center', 'Black Box Theater', 'Design Studios', 'Robotics Lab', 'Music Rooms'],
    classSize: '1:16',
    accreditation: ['IB', 'CIS', 'NEASC'],
    grades: 'KG-Grade 12',
  },
  {
    id: '4',
    name: 'Park House English School',
    curriculum: 'British',
    feeRange: 'QAR 55,000-75,000',
    feeMin: 55000,
    feeMax: 75000,
    location: 'Al Waab',
    waitlist: 'Medium',
    facilities: ['Swimming Pool', 'Sports Hall', 'Library', 'IT Labs', 'Music Rooms'],
    classSize: '1:20',
    accreditation: ['BSO'],
    grades: 'FS1-Year 13',
  },
  {
    id: '5',
    name: 'Compass International School',
    curriculum: 'IB',
    feeRange: 'QAR 85,000-105,000',
    feeMin: 85000,
    feeMax: 105000,
    location: 'Al Gharrafa',
    waitlist: 'Medium',
    facilities: ['Sports Complex', 'STEAM Labs', 'Art Studios', 'Performance Space', 'Library'],
    classSize: '1:18',
    accreditation: ['IB', 'CIS'],
    grades: 'KG-Grade 12',
  },
  {
    id: '6',
    name: 'Newton International Academy',
    curriculum: 'British',
    feeRange: 'QAR 45,000-65,000',
    feeMin: 45000,
    feeMax: 65000,
    location: 'West Bay',
    waitlist: 'Short',
    facilities: ['Sports Facilities', 'Science Labs', 'Library', 'IT Rooms', 'Art Studios'],
    classSize: '1:22',
    accreditation: ['BSO'],
    grades: 'FS-Year 13',
  },
  {
    id: '7',
    name: 'DPS Modern Indian School',
    curriculum: 'CBSE',
    feeRange: 'QAR 15,000-25,000',
    feeMin: 15000,
    feeMax: 25000,
    location: 'Al Wakrah',
    waitlist: 'Short',
    facilities: ['Sports Ground', 'Computer Labs', 'Library', 'Science Labs', 'Auditorium'],
    classSize: '1:30',
    accreditation: ['CBSE'],
    grades: 'KG-Grade 12',
  },
  {
    id: '8',
    name: 'SEK International School',
    curriculum: 'IB',
    feeRange: 'QAR 60,000-80,000',
    feeMin: 60000,
    feeMax: 80000,
    location: 'Al Kheesa',
    waitlist: 'Medium',
    facilities: ['Pool', 'Sports Center', 'Innovation Lab', 'Arts Center', 'Library'],
    classSize: '1:18',
    accreditation: ['IB', 'CIS'],
    grades: 'Early Years-DP',
  },
];

const SchoolComparisonTool = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [maxFee, setMaxFee] = useState<number>(120000);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  const filteredSchools = schools.filter(school => {
    const curriculumMatch = selectedCurriculum === 'all' || school.curriculum === selectedCurriculum;
    const locationMatch = selectedLocation === 'all' || school.location === selectedLocation;
    const feeMatch = school.feeMax <= maxFee;
    return curriculumMatch && locationMatch && feeMatch;
  });

  const toggleSchool = (schoolId: string) => {
    if (selectedSchools.includes(schoolId)) {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    } else if (selectedSchools.length < 3) {
      setSelectedSchools([...selectedSchools, schoolId]);
    }
  };

  const comparisonSchools = schools.filter(school => selectedSchools.includes(school.id));

  const waitlistColors = {
    Short: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Long: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            School Comparison Tool
          </CardTitle>
          <CardDescription>
            Filter and compare up to 3 schools side-by-side. Select your preferences and click schools to add them to comparison.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="curriculum">Curriculum</Label>
              <Select value={selectedCurriculum} onValueChange={setSelectedCurriculum}>
                <SelectTrigger id="curriculum" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Curricula</SelectItem>
                  <SelectItem value="British">British</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                  <SelectItem value="IB">IB</SelectItem>
                  <SelectItem value="CBSE">CBSE (Indian)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Al Waab">Al Waab</SelectItem>
                  <SelectItem value="Al Gharrafa">Al Gharrafa</SelectItem>
                  <SelectItem value="Al Rayyan">Al Rayyan</SelectItem>
                  <SelectItem value="West Bay">West Bay</SelectItem>
                  <SelectItem value="Al Wakrah">Al Wakrah</SelectItem>
                  <SelectItem value="Al Kheesa">Al Kheesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxFee">Max Fee: QAR {maxFee.toLocaleString()}</Label>
              <input
                id="maxFee"
                type="range"
                min="15000"
                max="120000"
                step="5000"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Available Schools */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Available Schools ({filteredSchools.length})
              {selectedSchools.length > 0 && (
                <Badge variant="secondary">{selectedSchools.length}/3 selected</Badge>
              )}
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {filteredSchools.map(school => (
                <Card
                  key={school.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSchools.includes(school.id) ? 'ring-2 ring-primary' : ''
                  } ${selectedSchools.length >= 3 && !selectedSchools.includes(school.id) ? 'opacity-50' : ''}`}
                  onClick={() => toggleSchool(school.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm">{school.name}</h5>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {school.location}
                        </p>
                      </div>
                      <Checkbox
                        checked={selectedSchools.includes(school.id)}
                        disabled={selectedSchools.length >= 3 && !selectedSchools.includes(school.id)}
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <Badge variant="outline" className="text-xs">{school.curriculum}</Badge>
                      <Badge className={`text-xs ${waitlistColors[school.waitlist]}`}>
                        {school.waitlist} Wait
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-primary mt-2">{school.feeRange}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {comparisonSchools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>School Comparison</CardTitle>
            <CardDescription>Side-by-side comparison of selected schools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    {comparisonSchools.map(school => (
                      <th key={school.id} className="text-left p-3 min-w-[200px]">
                        <div>
                          <p className="font-semibold">{school.name}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSchool(school.id)}
                            className="text-xs text-muted-foreground hover:text-destructive mt-1"
                          >
                            Remove
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Curriculum</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">
                        <Badge variant="outline">{school.curriculum}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Annual Fees</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3 font-semibold text-primary">
                        {school.feeRange}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Location</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">{school.location}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Waitlist Status</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">
                        <Badge className={waitlistColors[school.waitlist]}>
                          {school.waitlist}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Class Size</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">{school.classSize}</td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium">Grades Offered</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">{school.grades}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Accreditation</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {school.accreditation.map(acc => (
                            <Badge key={acc} variant="secondary" className="text-xs">{acc}</Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="p-3 font-medium align-top">Facilities</td>
                    {comparisonSchools.map(school => (
                      <td key={school.id} className="p-3">
                        <ul className="space-y-1">
                          {school.facilities.map(facility => (
                            <li key={facility} className="flex items-center gap-1 text-xs">
                              <Check className="h-3 w-3 text-green-600" />
                              {facility}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SchoolComparisonTool;
