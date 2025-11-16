import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Clock, Hospital, Stethoscope, Building2, Navigation, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HealthcareProvider {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'specialist-center';
  specialty: string[];
  location: string;
  area: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  hours: string;
  insuranceAccepted: ('basic' | 'standard' | 'comprehensive')[];
  services: string[];
  languages: string[];
  website?: string;
  googleMaps?: string;
  featured?: boolean;
}

export const HealthcareProviderDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const providers: HealthcareProvider[] = [
    // Comprehensive/Premium Hospitals
    {
      id: 'sidra',
      name: 'Sidra Medicine',
      type: 'hospital',
      specialty: ['Pediatrics', 'Women\'s Health', 'Maternity', 'Neonatology', 'Oncology'],
      location: 'West Bay',
      area: 'West Bay',
      address: 'Al Luqta Street, Doha',
      phone: '+974 4003 3333',
      emergencyPhone: '+974 4003 3333',
      hours: '24/7 Emergency, Clinics: 8AM-8PM',
      insuranceAccepted: ['comprehensive', 'standard'],
      services: ['Emergency Care', 'Pediatric ICU', 'NICU', 'Women\'s Hospital', 'Cancer Center', 'Surgical Services'],
      languages: ['English', 'Arabic', 'French', 'Spanish'],
      website: 'https://www.sidra.org',
      googleMaps: 'https://maps.app.goo.gl/sidra',
      featured: true,
    },
    {
      id: 'al-emadi',
      name: 'Al Emadi Hospital',
      type: 'hospital',
      specialty: ['General Medicine', 'Surgery', 'Cardiology', 'Orthopedics', 'Pediatrics'],
      location: 'Al Sadd',
      area: 'Al Sadd',
      address: 'Al Markhiya Street, Doha',
      phone: '+974 4466 9779',
      emergencyPhone: '+974 4466 9779',
      hours: '24/7 Emergency, Clinics: 8AM-10PM',
      insuranceAccepted: ['comprehensive', 'standard'],
      services: ['Emergency', 'ICU', 'Surgical Center', 'Cardiac Care', 'Maternity', 'Pharmacy'],
      languages: ['English', 'Arabic', 'Urdu', 'Hindi'],
      website: 'https://www.alemadihospital.com',
      googleMaps: 'https://maps.app.goo.gl/alemadi',
      featured: true,
    },
    {
      id: 'doha-clinic',
      name: 'Doha Clinic Hospital',
      type: 'hospital',
      specialty: ['General Medicine', 'Surgery', 'Dermatology', 'Orthopedics', 'ENT'],
      location: 'Al Hilal',
      area: 'Al Hilal',
      address: 'C Ring Road, Doha',
      phone: '+974 4435 1234',
      emergencyPhone: '+974 4435 1234',
      hours: '24/7 Services',
      insuranceAccepted: ['comprehensive', 'standard'],
      services: ['Emergency', 'Inpatient', 'Outpatient', 'Laboratory', 'Radiology', 'Pharmacy'],
      languages: ['English', 'Arabic', 'Filipino', 'Hindi'],
      website: 'https://www.dohaclinichospital.com',
      googleMaps: 'https://maps.app.goo.gl/dohaclinic',
      featured: true,
    },
    {
      id: 'american-hospital',
      name: 'American Hospital Doha',
      type: 'hospital',
      specialty: ['General Medicine', 'Surgery', 'Cardiology', 'Internal Medicine', 'Rehabilitation'],
      location: 'Al Waab',
      area: 'Al Waab',
      address: 'Al Waab Street, Doha',
      phone: '+974 4440 8888',
      emergencyPhone: '+974 4440 8888',
      hours: '24/7 Services',
      insuranceAccepted: ['comprehensive'],
      services: ['Emergency', 'ICU', 'Cardiac Center', 'Rehabilitation', 'Sports Medicine', 'Executive Health'],
      languages: ['English', 'Arabic', 'French'],
      website: 'https://www.ahdoha.com',
      googleMaps: 'https://maps.app.goo.gl/americanhospital',
      featured: true,
    },
    {
      id: 'aster-hospital',
      name: 'Aster Hospital',
      type: 'hospital',
      specialty: ['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics', 'Orthopedics'],
      location: 'Al Wakra',
      area: 'Al Wakra',
      address: 'Al Wakra Road, Doha',
      phone: '+974 4440 2500',
      emergencyPhone: '+974 4440 2500',
      hours: '24/7 Services',
      insuranceAccepted: ['comprehensive', 'standard'],
      services: ['Emergency', 'Maternity', 'Pediatric Care', 'Surgical Center', 'Dental', 'Pharmacy'],
      languages: ['English', 'Arabic', 'Hindi', 'Malayalam'],
      website: 'https://www.asterhospital.com',
      googleMaps: 'https://maps.app.goo.gl/aster',
    },
    // Standard/Public Hospitals
    {
      id: 'hamad-general',
      name: 'Hamad General Hospital',
      type: 'hospital',
      specialty: ['Emergency', 'General Medicine', 'Surgery', 'Trauma', 'Critical Care'],
      location: 'Al Rayyan',
      area: 'Al Rayyan',
      address: 'Hamad Medical City, Doha',
      phone: '+974 4439 2222',
      emergencyPhone: '+974 999',
      hours: '24/7 Emergency Services',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Level 1 Trauma Center', 'Emergency', 'ICU', 'Surgery', 'Burn Center', 'Helipad'],
      languages: ['English', 'Arabic', 'Urdu', 'Hindi', 'Filipino'],
      website: 'https://www.hamad.qa',
      googleMaps: 'https://maps.app.goo.gl/hamad',
      featured: true,
    },
    {
      id: 'womens-hospital',
      name: 'Women\'s Wellness and Research Center',
      type: 'hospital',
      specialty: ['Women\'s Health', 'Maternity', 'Gynecology', 'Fertility', 'Neonatology'],
      location: 'Al Rayyan',
      area: 'Al Rayyan',
      address: 'Hamad Medical City, Doha',
      phone: '+974 4439 4444',
      hours: '24/7 Maternity Services',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Maternity', 'NICU', 'Gynecology', 'Fertility Clinic', 'Women\'s Health Screening'],
      languages: ['English', 'Arabic', 'Urdu', 'Hindi'],
      website: 'https://www.hamad.qa',
      googleMaps: 'https://maps.app.goo.gl/wwrc',
    },
    {
      id: 'al-wakra',
      name: 'Al Wakra Hospital',
      type: 'hospital',
      specialty: ['General Medicine', 'Emergency', 'Pediatrics', 'Surgery', 'Maternity'],
      location: 'Al Wakra',
      area: 'Al Wakra',
      address: 'Al Wakra, Doha',
      phone: '+974 4011 6666',
      emergencyPhone: '+974 999',
      hours: '24/7 Services',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Emergency', 'Inpatient Care', 'Maternity', 'Pediatrics', 'Laboratory', 'Radiology'],
      languages: ['English', 'Arabic', 'Urdu', 'Hindi'],
      website: 'https://www.hamad.qa',
      googleMaps: 'https://maps.app.goo.gl/alwakra',
    },
    // Specialist Clinics & Centers
    {
      id: 'al-ahli',
      name: 'Al Ahli Hospital',
      type: 'clinic',
      specialty: ['General Medicine', 'Pediatrics', 'Dental', 'Dermatology', 'ENT'],
      location: 'Bin Mahmoud',
      area: 'Bin Mahmoud',
      address: 'Ahmed Bin Ali Street, Doha',
      phone: '+974 4489 8888',
      hours: '24/7 Emergency, Clinics: 7AM-11PM',
      insuranceAccepted: ['standard', 'comprehensive'],
      services: ['Outpatient Clinic', 'Emergency', 'Dental Clinic', 'Laboratory', 'Radiology', 'Pharmacy'],
      languages: ['English', 'Arabic', 'Urdu'],
      website: 'https://www.alahli.com.qa',
      googleMaps: 'https://maps.app.goo.gl/alahli',
    },
    {
      id: 'naseem-al-rabeeh',
      name: 'Naseem Al Rabeeh Medical Center',
      type: 'clinic',
      specialty: ['General Medicine', 'Pediatrics', 'Women\'s Health', 'Dental', 'Dermatology'],
      location: 'Al Sadd',
      area: 'Al Sadd',
      address: 'Al Sadd Street, Doha',
      phone: '+974 4443 2211',
      hours: '8AM-11PM Daily',
      insuranceAccepted: ['standard', 'comprehensive'],
      services: ['GP Consultation', 'Pediatrics', 'Women\'s Clinic', 'Dental', 'Laboratory', 'Pharmacy'],
      languages: ['English', 'Arabic', 'Filipino'],
      website: 'https://www.naseemmedical.com',
      googleMaps: 'https://maps.app.goo.gl/naseem',
    },
    {
      id: 'aster-clinics',
      name: 'Aster Clinics',
      type: 'clinic',
      specialty: ['General Medicine', 'Pediatrics', 'Dental', 'Physiotherapy'],
      location: 'Multiple Locations',
      area: 'The Pearl, Al Wakra, Ain Khaled',
      address: 'Multiple branches across Doha',
      phone: '+974 4440 7500',
      hours: '8AM-10PM Daily',
      insuranceAccepted: ['standard', 'comprehensive'],
      services: ['GP Consultation', 'Pediatrics', 'Dental Care', 'Physiotherapy', 'Laboratory', 'Home Care'],
      languages: ['English', 'Arabic', 'Hindi', 'Malayalam'],
      website: 'https://www.asterclinics.com',
      googleMaps: 'https://maps.app.goo.gl/asterclinics',
    },
    {
      id: 'qatar-medical',
      name: 'Qatar Medical Center',
      type: 'clinic',
      specialty: ['General Medicine', 'Cardiology', 'Orthopedics', 'Ophthalmology', 'Dental'],
      location: 'Al Sadd',
      area: 'Al Sadd',
      address: 'Jawaan Street, Doha',
      phone: '+974 4443 5544',
      hours: '8AM-10PM Daily',
      insuranceAccepted: ['comprehensive'],
      services: ['Multi-specialty Clinic', 'Cardiology', 'Orthopedics', 'Eye Care', 'Dental', 'Laboratory'],
      languages: ['English', 'Arabic', 'French', 'Urdu'],
      website: 'https://www.qatarmedical.com',
      googleMaps: 'https://maps.app.goo.gl/qmc',
    },
    {
      id: 'medcare',
      name: 'Medcare Medical Center',
      type: 'clinic',
      specialty: ['General Medicine', 'Pediatrics', 'Women\'s Health', 'Dermatology'],
      location: 'The Pearl',
      area: 'The Pearl Qatar',
      address: 'Porto Arabia, The Pearl',
      phone: '+974 4403 3000',
      hours: '8AM-10PM Daily',
      insuranceAccepted: ['comprehensive'],
      services: ['Family Medicine', 'Pediatrics', 'Women\'s Health', 'Dermatology', 'Laboratory'],
      languages: ['English', 'Arabic', 'French'],
      website: 'https://www.medcare.com',
      googleMaps: 'https://maps.app.goo.gl/medcare',
    },
    // Specialist Centers
    {
      id: 'heart-hospital',
      name: 'Heart Hospital (HMC)',
      type: 'specialist-center',
      specialty: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
      location: 'Al Rayyan',
      area: 'Al Rayyan',
      address: 'Hamad Medical City, Doha',
      phone: '+974 4439 5555',
      emergencyPhone: '+974 999',
      hours: '24/7 Emergency, Clinics: 8AM-4PM',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Cardiac Surgery', 'Interventional Cardiology', 'Cardiac ICU', 'Heart Transplant', 'Rehabilitation'],
      languages: ['English', 'Arabic', 'Urdu'],
      website: 'https://www.hamad.qa',
      googleMaps: 'https://maps.app.goo.gl/hearthospital',
      featured: true,
    },
    {
      id: 'national-cancer',
      name: 'National Cancer Center (NCCCR)',
      type: 'specialist-center',
      specialty: ['Oncology', 'Hematology', 'Radiation Therapy', 'Palliative Care'],
      location: 'Al Rayyan',
      area: 'Al Rayyan',
      address: 'Hamad Medical City, Doha',
      phone: '+974 4439 6666',
      hours: 'Mon-Thu: 7AM-3PM',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Medical Oncology', 'Radiation Therapy', 'Chemotherapy', 'Palliative Care', 'Clinical Trials'],
      languages: ['English', 'Arabic', 'Urdu'],
      website: 'https://www.hamad.qa/ncccr',
      googleMaps: 'https://maps.app.goo.gl/ncccr',
    },
    {
      id: 'rumailah',
      name: 'Rumailah Hospital (Rehabilitation)',
      type: 'specialist-center',
      specialty: ['Rehabilitation', 'Geriatrics', 'Long-term Care', 'Palliative Care'],
      location: 'Al Rayyan',
      area: 'Al Rayyan',
      address: 'Hamad Medical City, Doha',
      phone: '+974 4439 7777',
      hours: '24/7 Inpatient, Clinics: 8AM-4PM',
      insuranceAccepted: ['basic', 'standard', 'comprehensive'],
      services: ['Physical Therapy', 'Occupational Therapy', 'Geriatric Care', 'Long-term Care', 'Palliative Care'],
      languages: ['English', 'Arabic', 'Urdu', 'Filipino'],
      website: 'https://www.hamad.qa',
      googleMaps: 'https://maps.app.goo.gl/rumailah',
    },
  ];

  const specialties = [
    'All Specialties',
    'General Medicine',
    'Pediatrics',
    'Women\'s Health',
    'Maternity',
    'Cardiology',
    'Orthopedics',
    'Dermatology',
    'Dental',
    'ENT',
    'Surgery',
    'Emergency',
    'Oncology',
    'Rehabilitation',
  ];

  const locations = [
    'All Locations',
    'West Bay',
    'Al Sadd',
    'Al Rayyan',
    'The Pearl',
    'Al Wakra',
    'Bin Mahmoud',
    'Al Hilal',
    'Al Waab',
  ];

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialty.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        provider.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Insurance filter
      const matchesInsurance =
        selectedInsurance === 'all' || provider.insuranceAccepted.includes(selectedInsurance as any);

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === 'all' ||
        provider.specialty.some((s) => s.toLowerCase() === selectedSpecialty.toLowerCase());

      // Location filter
      const matchesLocation =
        selectedLocation === 'all' ||
        provider.area.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        provider.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Type filter
      const matchesType = selectedType === 'all' || provider.type === selectedType;

      return matchesSearch && matchesInsurance && matchesSpecialty && matchesLocation && matchesType;
    });
  }, [providers, searchQuery, selectedInsurance, selectedSpecialty, selectedLocation, selectedType]);

  const getInsuranceBadge = (insurance: string) => {
    switch (insurance) {
      case 'basic':
        return <Badge variant="secondary">Basic/HMC</Badge>;
      case 'standard':
        return <Badge variant="default">Standard</Badge>;
      case 'comprehensive':
        return <Badge variant="default">Premium</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return <Hospital className="h-5 w-5" />;
      case 'clinic':
        return <Building2 className="h-5 w-5" />;
      case 'specialist-center':
        return <Stethoscope className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hospital className="h-6 w-6" />
          Healthcare Provider Directory
        </CardTitle>
        <CardDescription>
          Search and find hospitals, clinics, and specialists in Doha by insurance network, specialty, and location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hospital, clinic, specialty, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Insurance Network</Label>
              <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Insurance" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Insurance</SelectItem>
                  <SelectItem value="basic">Basic/HMC Only</SelectItem>
                  <SelectItem value="standard">Standard Network</SelectItem>
                  <SelectItem value="comprehensive">Premium Network</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Specialty</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50 max-h-[300px]">
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty === 'All Specialties' ? 'all' : specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {locations.map((location) => (
                    <SelectItem key={location} value={location === 'All Locations' ? 'all' : location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Provider Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hospital">Hospitals</SelectItem>
                  <SelectItem value="clinic">Clinics</SelectItem>
                  <SelectItem value="specialist-center">Specialist Centers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedInsurance !== 'all' || selectedSpecialty !== 'all' || selectedLocation !== 'all' || selectedType !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedInsurance('all');
                setSelectedSpecialty('all');
                setSelectedLocation('all');
                setSelectedType('all');
              }}
            >
              Clear All Filters
            </Button>
          )}
        </div>

        <Separator />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredProviders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No providers match your search criteria. Try adjusting your filters.</p>
            </Card>
          ) : (
            filteredProviders.map((provider) => (
              <Card key={provider.id} className={provider.featured ? 'border-primary/50' : ''}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          {getTypeIcon(provider.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-lg">{provider.name}</h3>
                            {provider.featured && (
                              <Badge variant="default" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground capitalize">
                            {provider.type.replace('-', ' ')} • {provider.location}
                          </p>
                        </div>
                      </div>
                      {provider.googleMaps && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={provider.googleMaps} target="_blank" rel="noopener noreferrer">
                            <Navigation className="h-4 w-4 mr-2" />
                            Directions
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {provider.specialty.slice(0, 5).map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                      {provider.specialty.length > 5 && (
                        <Badge variant="outline">+{provider.specialty.length - 5} more</Badge>
                      )}
                    </div>

                    <Separator />

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{provider.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">{provider.phone}</p>
                            {provider.emergencyPhone && (
                              <p className="text-destructive text-xs mt-1">Emergency: {provider.emergencyPhone}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Hours</p>
                            <p className="text-muted-foreground">{provider.hours}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="font-medium mb-2">Insurance Accepted</p>
                          <div className="flex flex-wrap gap-2">
                            {provider.insuranceAccepted.map((ins) => (
                              <div key={ins}>{getInsuranceBadge(ins)}</div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-medium mb-2">Languages</p>
                          <p className="text-sm text-muted-foreground">{provider.languages.join(', ')}</p>
                        </div>

                        {provider.website && (
                          <Button variant="link" size="sm" asChild className="px-0 h-auto">
                            <a href={provider.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Services */}
                    {provider.services.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="font-medium text-sm mb-2">Services Available</p>
                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((service) => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
