import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, GraduationCap, TrendingUp, MapPin, Users, Globe, FileText, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

interface UserProfile {
  industry: string;
  experience: string;
  qualifications: string;
  location: string;
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ElementType;
}

const JobSearchStrategyGuide = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    industry: '',
    experience: '',
    qualifications: '',
    location: '',
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setProfile({
      industry: '',
      experience: '',
      qualifications: '',
      location: '',
    });
    setShowResults(false);
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return profile.industry !== '';
      case 2:
        return profile.experience !== '';
      case 3:
        return profile.qualifications !== '';
      case 4:
        return profile.location !== '';
      default:
        return false;
    }
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Job Portal Recommendations
    if (profile.industry === 'healthcare' || profile.industry === 'education') {
      recommendations.push({
        title: 'Specialized Job Portals',
        description: `Focus on healthcare-specific portals like GulfMedCareers.com and education portals like TeachAway.com. Also check Qatar Foundation careers for ${profile.industry} roles.`,
        priority: 'high',
        icon: Globe,
      });
    } else if (profile.industry === 'energy' || profile.industry === 'construction') {
      recommendations.push({
        title: 'Industry-Specific Platforms',
        description: 'Target Rigzone.com for oil & gas, and major company career pages (QatarEnergy, QatarGas). LinkedIn is crucial for engineering roles.',
        priority: 'high',
        icon: Globe,
      });
    } else {
      recommendations.push({
        title: 'General Job Portals',
        description: 'Start with Bayt.com, GulfTalent.com, and Naukrigulf.com. Check Qatar Living classifieds for diverse opportunities.',
        priority: 'high',
        icon: Globe,
      });
    }

    // Experience-Based Strategy
    if (profile.experience === 'entry') {
      recommendations.push({
        title: 'Entry-Level Strategy',
        description: 'Focus on graduate programs and rotational schemes. Apply to multinational companies with training programs. Consider contract positions to gain GCC experience.',
        priority: 'high',
        icon: TrendingUp,
      });
    } else if (profile.experience === 'mid') {
      recommendations.push({
        title: 'Mid-Career Approach',
        description: 'Leverage your experience by highlighting achievements and metrics. Target team lead and specialist roles. Network actively with industry peers on LinkedIn.',
        priority: 'high',
        icon: TrendingUp,
      });
    } else if (profile.experience === 'senior') {
      recommendations.push({
        title: 'Senior Professional Strategy',
        description: 'Work with executive recruiters like Michael Page, Hays, and Robert Half. Focus on leadership roles. Build relationships with industry leaders before applying.',
        priority: 'high',
        icon: TrendingUp,
      });
    }

    // Qualifications-Based Advice
    if (profile.qualifications === 'bachelors') {
      recommendations.push({
        title: 'Enhance Your Profile',
        description: 'Consider professional certifications relevant to your field (PMP, CFA, CPA). Highlight any specialized training or technical skills prominently.',
        priority: 'medium',
        icon: GraduationCap,
      });
    } else if (profile.qualifications === 'masters') {
      recommendations.push({
        title: 'Leverage Advanced Degree',
        description: 'Emphasize your Master\'s degree and research/thesis work. Target roles requiring advanced qualifications. Consider roles in Education City institutions.',
        priority: 'medium',
        icon: GraduationCap,
      });
    } else if (profile.qualifications === 'phd') {
      recommendations.push({
        title: 'Academic & Research Opportunities',
        description: 'Explore Qatar Foundation, QNRF, and university positions. Your PhD qualifies you for senior research and teaching roles. Consider consulting opportunities.',
        priority: 'high',
        icon: GraduationCap,
      });
    }

    // Location-Based Networking
    if (profile.location === 'outside') {
      recommendations.push({
        title: 'Virtual Presence Strategy',
        description: 'Optimize your LinkedIn profile with Qatar-focused keywords. Join Qatar expat groups online. Consider a job search visit to Qatar for interviews and networking events.',
        priority: 'high',
        icon: MapPin,
      });
      recommendations.push({
        title: 'Timing Your Move',
        description: 'Apply 2-3 months before your desired start date. Many employers prefer candidates who can start quickly. Mention your willingness to relocate in your CV.',
        priority: 'medium',
        icon: FileText,
      });
    } else if (profile.location === 'qatar') {
      recommendations.push({
        title: 'In-Person Networking',
        description: 'Attend professional events at Qatar Foundation, business networking at hotels, and industry-specific meetups. Face-to-face connections are powerful in Qatar.',
        priority: 'high',
        icon: Users,
      });
      recommendations.push({
        title: 'Leverage Local Presence',
        description: 'Emphasize your Qatar residence and immediate availability in applications. Visit company offices to submit CVs in person. This shows commitment and initiative.',
        priority: 'high',
        icon: MapPin,
      });
    } else {
      recommendations.push({
        title: 'GCC Experience Advantage',
        description: 'Highlight your GCC work experience prominently. Employers value candidates familiar with the region. Network within your current GCC location for Qatar referrals.',
        priority: 'high',
        icon: MapPin,
      });
    }

    // Universal CV Tips
    recommendations.push({
      title: 'CV Optimization',
      description: 'Use a professional format with photo. Include nationality, visa status, and notice period. Quantify achievements with numbers. Keep it to 2-3 pages maximum.',
      priority: 'high',
      icon: FileText,
    });

    // Networking Strategy
    recommendations.push({
      title: 'Strategic Networking',
      description: 'Join LinkedIn groups for Qatar professionals. Follow Qatar companies. Engage with recruiters specializing in Qatar. Attend virtual career fairs focused on the Middle East.',
      priority: 'medium',
      icon: Users,
    });

    return recommendations;
  };

  const recommendations = showResults ? getRecommendations() : [];

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-primary text-primary-foreground';
      case 'medium':
        return 'bg-secondary text-secondary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full my-8 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Briefcase className="h-6 w-6 text-primary" />
          Job Search Strategy Guide
        </CardTitle>
        <CardDescription className="text-base">
          Get personalized job hunting tips and recommendations based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!showResults ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step 1: Industry */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">What industry are you targeting?</h3>
                </div>
                <RadioGroup value={profile.industry} onValueChange={(value) => setProfile({ ...profile, industry: value })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="energy" id="energy" />
                    <Label htmlFor="energy" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Energy (Oil & Gas)</div>
                        <div className="text-sm text-muted-foreground">Engineering, Project Management, Operations</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="healthcare" id="healthcare" />
                    <Label htmlFor="healthcare" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Healthcare</div>
                        <div className="text-sm text-muted-foreground">Doctors, Nurses, Medical Specialists</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="education" id="education" />
                    <Label htmlFor="education" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Education</div>
                        <div className="text-sm text-muted-foreground">Teachers, Administrators, University Faculty</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="finance" id="finance" />
                    <Label htmlFor="finance" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Finance & Banking</div>
                        <div className="text-sm text-muted-foreground">Analysts, Auditors, Compliance Officers</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="it" id="it" />
                    <Label htmlFor="it" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">IT & Technology</div>
                        <div className="text-sm text-muted-foreground">Software Development, Cybersecurity, Data Science</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="construction" id="construction" />
                    <Label htmlFor="construction" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Construction & Infrastructure</div>
                        <div className="text-sm text-muted-foreground">Project Management, Civil Engineering, Architecture</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Experience Level */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">What is your experience level?</h3>
                </div>
                <RadioGroup value={profile.experience} onValueChange={(value) => setProfile({ ...profile, experience: value })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="entry" id="entry" />
                    <Label htmlFor="entry" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Entry Level (0-2 years)</div>
                        <div className="text-sm text-muted-foreground">Recent graduate or early career professional</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="mid" id="mid" />
                    <Label htmlFor="mid" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Mid-Level (3-7 years)</div>
                        <div className="text-sm text-muted-foreground">Experienced professional with proven track record</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Senior Level (8+ years)</div>
                        <div className="text-sm text-muted-foreground">Leadership, management, or specialist roles</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Qualifications */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">What is your highest qualification?</h3>
                </div>
                <RadioGroup value={profile.qualifications} onValueChange={(value) => setProfile({ ...profile, qualifications: value })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="diploma" id="diploma" />
                    <Label htmlFor="diploma" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Diploma / Technical Certificate</div>
                        <div className="text-sm text-muted-foreground">Vocational or technical training</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="bachelors" id="bachelors" />
                    <Label htmlFor="bachelors" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Bachelor's Degree</div>
                        <div className="text-sm text-muted-foreground">Undergraduate university degree</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="masters" id="masters" />
                    <Label htmlFor="masters" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Master's Degree</div>
                        <div className="text-sm text-muted-foreground">Postgraduate university degree</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="phd" id="phd" />
                    <Label htmlFor="phd" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">PhD / Doctorate</div>
                        <div className="text-sm text-muted-foreground">Doctoral degree or equivalent</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Location */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Where are you currently located?</h3>
                </div>
                <RadioGroup value={profile.location} onValueChange={(value) => setProfile({ ...profile, location: value })}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="qatar" id="qatar" />
                    <Label htmlFor="qatar" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Currently in Qatar</div>
                        <div className="text-sm text-muted-foreground">Already residing in Doha or elsewhere in Qatar</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="gcc" id="gcc" />
                    <Label htmlFor="gcc" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">In GCC Region</div>
                        <div className="text-sm text-muted-foreground">UAE, Saudi Arabia, Kuwait, Bahrain, Oman</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="outside" id="outside" />
                    <Label htmlFor="outside" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Outside GCC</div>
                        <div className="text-sm text-muted-foreground">International location outside the Gulf region</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepComplete()}
              >
                {step === totalSteps ? 'Get Recommendations' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Your Profile</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="capitalize">{profile.industry.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="capitalize">{profile.experience} Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="capitalize">{profile.qualifications.replace('phd', 'PhD')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="capitalize">{profile.location === 'gcc' ? 'GCC Region' : profile.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div>
              <h3 className="text-xl font-bold mb-4">Your Personalized Strategy</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  const IconComponent = rec.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-lg">{rec.title}</h4>
                              <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                                {rec.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Key Job Portals */}
            <Card className="bg-secondary/5 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Essential Job Portals for Qatar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Bayt.com</span> - Largest MENA job portal, wide range of industries
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">GulfTalent.com</span> - Focus on professional roles across Gulf
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">LinkedIn</span> - Essential for networking and professional roles
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Qatar Living</span> - Local classifieds, diverse opportunities
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Company Websites</span> - Direct applications often preferred
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reset Button */}
            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over with Different Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobSearchStrategyGuide;
