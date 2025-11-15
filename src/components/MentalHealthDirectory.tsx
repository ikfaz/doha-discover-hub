import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Globe, Shield, Video, MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface Therapist {
  id: number;
  name: string;
  type: 'in-person' | 'online' | 'both';
  location?: string;
  specialties: string[];
  languages: string[];
  confidentiality: 'high' | 'medium';
  expatExperience: boolean;
  lgbtqFriendly: boolean;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  notes: string;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: 'Doha Psychology Center',
    type: 'in-person',
    location: 'West Bay, Doha',
    specialties: ['Anxiety', 'Depression', 'Expat Adjustment', 'Relationship Issues'],
    languages: ['English', 'Arabic', 'French'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      phone: '+974 4000 0000',
      email: 'info@dohapsych.qa',
      website: 'www.dohapsychology.qa'
    },
    notes: 'International team with multicultural experience. Confidential setting.'
  },
  {
    id: 2,
    name: 'BetterHelp (Online)',
    type: 'online',
    specialties: ['LGBTQ+ Issues', 'Identity', 'Depression', 'Anxiety', 'Trauma'],
    languages: ['English', 'Spanish', 'French', 'German'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      website: 'www.betterhelp.com'
    },
    notes: 'International platform. Sessions via video, phone, or chat. LGBTQ+ specialized therapists available.'
  },
  {
    id: 3,
    name: 'Talkspace (Online)',
    type: 'online',
    specialties: ['LGBTQ+ Issues', 'Anxiety', 'Depression', 'Stress Management'],
    languages: ['English'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      website: 'www.talkspace.com'
    },
    notes: 'Flexible messaging-based therapy. Video sessions available. LGBTQ+ affirming.'
  },
  {
    id: 4,
    name: 'Al Shifa Medical Center - Psychology',
    type: 'in-person',
    location: 'Al Sadd, Doha',
    specialties: ['Stress Management', 'Anxiety', 'Depression', 'Family Therapy'],
    languages: ['English', 'Arabic', 'Hindi', 'Urdu'],
    confidentiality: 'medium',
    expatExperience: true,
    lgbtqFriendly: false,
    contact: {
      phone: '+974 4000 1111',
      email: 'psych@alshifa.qa'
    },
    notes: 'General psychology services. Culturally conservative approach.'
  },
  {
    id: 5,
    name: 'Pride Counseling (Online)',
    type: 'online',
    specialties: ['LGBTQ+ Issues', 'Coming Out', 'Identity', 'Relationships', 'Family Issues'],
    languages: ['English'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      website: 'www.pridecounseling.com'
    },
    notes: 'LGBTQ+ specialized platform. All therapists trained in LGBTQ+ issues. Video, phone, and messaging.'
  },
  {
    id: 6,
    name: 'Sidra Medicine - Mental Health',
    type: 'in-person',
    location: 'Al Luqta, Doha',
    specialties: ['Depression', 'Anxiety', 'Trauma', 'Adjustment Disorders'],
    languages: ['English', 'Arabic'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: false,
    contact: {
      phone: '+974 4003 3333',
      website: 'www.sidra.org'
    },
    notes: 'World-class facility. Professional and confidential. Conservative cultural approach.'
  },
  {
    id: 7,
    name: 'Expat Therapy Network (Online)',
    type: 'online',
    specialties: ['Expat Adjustment', 'Cross-Cultural Issues', 'Anxiety', 'Identity'],
    languages: ['English', 'French', 'German', 'Spanish'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      website: 'www.expattherapy.com',
      email: 'contact@expattherapy.com'
    },
    notes: 'Specialized in expat experiences. Understands challenges of living abroad. LGBTQ+ friendly.'
  },
  {
    id: 8,
    name: 'Mind & Soul Clinic',
    type: 'both',
    location: 'The Pearl, Doha',
    specialties: ['Anxiety', 'Depression', 'Stress Management', 'Life Transitions'],
    languages: ['English', 'Arabic', 'French'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      phone: '+974 4000 2222',
      email: 'hello@mindsouldoha.qa',
      website: 'www.mindsouldoha.qa'
    },
    notes: 'Private practice. Offers both in-person and online sessions. Discreet and professional.'
  },
  {
    id: 9,
    name: 'International SOS (Members Only)',
    type: 'both',
    location: 'Multiple locations',
    specialties: ['Crisis Intervention', 'Anxiety', 'Depression', 'Trauma'],
    languages: ['English', 'Arabic', 'French', 'German', 'Spanish'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      phone: '+974 4495 9999',
      website: 'www.internationalsos.com'
    },
    notes: 'Requires membership. 24/7 support. International network. Highly confidential.'
  },
  {
    id: 10,
    name: 'Headspace Care (Online)',
    type: 'online',
    specialties: ['Mindfulness', 'Anxiety', 'Depression', 'Stress Management'],
    languages: ['English'],
    confidentiality: 'high',
    expatExperience: true,
    lgbtqFriendly: true,
    contact: {
      website: 'www.headspace.com/care'
    },
    notes: 'Meditation-based therapy approach. Video sessions with licensed therapists. LGBTQ+ inclusive.'
  }
];

const MentalHealthDirectory = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [showLGBTQOnly, setShowLGBTQOnly] = useState(false);
  const [showExpatOnly, setShowExpatOnly] = useState(false);
  const [showHighConfOnly, setShowHighConfOnly] = useState(false);

  const allLanguages = Array.from(new Set(therapists.flatMap(t => t.languages))).sort();
  const allSpecialties = Array.from(new Set(therapists.flatMap(t => t.specialties))).sort();

  const filteredTherapists = therapists.filter(therapist => {
    if (selectedType !== 'all' && therapist.type !== selectedType && therapist.type !== 'both') {
      return false;
    }
    if (selectedLanguage !== 'all' && !therapist.languages.includes(selectedLanguage)) {
      return false;
    }
    if (selectedSpecialty !== 'all' && !therapist.specialties.includes(selectedSpecialty)) {
      return false;
    }
    if (showLGBTQOnly && !therapist.lgbtqFriendly) {
      return false;
    }
    if (showExpatOnly && !therapist.expatExperience) {
      return false;
    }
    if (showHighConfOnly && therapist.confidentiality !== 'high') {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedLanguage('all');
    setSelectedSpecialty('all');
    setShowLGBTQOnly(false);
    setShowExpatOnly(false);
    setShowHighConfOnly(false);
  };

  return (
    <Card className="my-8 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Mental Health Resources Directory for Qatar Expats
        </CardTitle>
        <CardDescription>
          Find mental health professionals and online therapy options with experience in expat and LGBTQ+ issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold text-sm">Filter Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Service Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in-person">In-Person Only</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="both">Both Options</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Languages</SelectItem>
                  {allLanguages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Specialties</SelectItem>
                  {allSpecialties.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lgbtq" 
                checked={showLGBTQOnly}
                onCheckedChange={(checked) => setShowLGBTQOnly(checked as boolean)}
              />
              <label htmlFor="lgbtq" className="text-sm font-medium cursor-pointer">
                LGBTQ+ Friendly Only
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="expat" 
                checked={showExpatOnly}
                onCheckedChange={(checked) => setShowExpatOnly(checked as boolean)}
              />
              <label htmlFor="expat" className="text-sm font-medium cursor-pointer">
                Expat Experience Only
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="confidential" 
                checked={showHighConfOnly}
                onCheckedChange={(checked) => setShowHighConfOnly(checked as boolean)}
              />
              <label htmlFor="confidential" className="text-sm font-medium cursor-pointer">
                High Confidentiality Only
              </label>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        {/* Results */}
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredTherapists.length} of {therapists.length} resources
          </p>

          {filteredTherapists.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No resources match your filters. Try adjusting your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTherapists.map((therapist) => (
                <Card key={therapist.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-lg">{therapist.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {therapist.type === 'online' && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Video className="h-3 w-3" />
                                Online
                              </Badge>
                            )}
                            {therapist.type === 'in-person' && therapist.location && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {therapist.location}
                              </Badge>
                            )}
                            {therapist.type === 'both' && (
                              <>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {therapist.location}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Video className="h-3 w-3" />
                                  + Online
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1 items-end">
                          {therapist.confidentiality === 'high' && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              High Confidentiality
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {therapist.lgbtqFriendly && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            LGBTQ+ Friendly
                          </Badge>
                        )}
                        {therapist.expatExperience && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            <Globe className="h-3 w-3 mr-1" />
                            Expat Experience
                          </Badge>
                        )}
                      </div>

                      {/* Specialties */}
                      <div>
                        <p className="text-sm font-semibold mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {therapist.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline">{specialty}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <p className="text-sm font-semibold mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-2">
                          {therapist.languages.map((language, idx) => (
                            <Badge key={idx} variant="secondary">{language}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Contact:</p>
                        <div className="flex flex-col gap-1 text-sm">
                          {therapist.contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{therapist.contact.phone}</span>
                            </div>
                          )}
                          {therapist.contact.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{therapist.contact.email}</span>
                            </div>
                          )}
                          {therapist.contact.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span className="text-primary">{therapist.contact.website}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="bg-muted/30 p-3 rounded text-sm">
                        <p className="text-muted-foreground italic">{therapist.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
            Important Considerations
          </p>
          <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
            <li>• Always verify credentials and licensing before beginning therapy</li>
            <li>• Online platforms may offer better privacy for sensitive topics</li>
            <li>• Some insurance plans cover international online therapy</li>
            <li>• Consider using VPN for additional privacy when accessing online platforms</li>
            <li>• Emergency mental health: Contact your embassy or International SOS (if member)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalHealthDirectory;
