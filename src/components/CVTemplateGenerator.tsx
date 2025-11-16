import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Plus, X } from 'lucide-react';
import jsPDF from 'jspdf';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export const CVTemplateGenerator = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    nationality: '',
    email: '',
    phone: '',
    location: '',
    visaStatus: '',
    noticePeriod: '',
  });

  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: '1', title: '', company: '', duration: '', description: '' }
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: '1', degree: '', institution: '', year: '' }
  ]);
  const [skills, setSkills] = useState('');

  const addExperience = () => {
    setExperiences([...experiences, { 
      id: Date.now().toString(), 
      title: '', 
      company: '', 
      duration: '', 
      description: '' 
    }]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, { 
      id: Date.now().toString(), 
      degree: '', 
      institution: '', 
      year: '' 
    }]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Header with name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(personalInfo.fullName || 'Your Name', 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    // Contact info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const contactLine = `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`;
    doc.text(contactLine, 105, yPosition, { align: 'center' });
    yPosition += 5;
    
    // GCC-specific info
    doc.setFontSize(9);
    doc.setTextColor(100);
    const gccInfo = `Nationality: ${personalInfo.nationality} | Visa Status: ${personalInfo.visaStatus} | Notice Period: ${personalInfo.noticePeriod}`;
    doc.text(gccInfo, 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    doc.setTextColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    // Professional Summary
    if (summary) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('PROFESSIONAL SUMMARY', 20, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const summaryLines = doc.splitTextToSize(summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += (summaryLines.length * 5) + 8;
    }
    
    // Work Experience
    if (experiences.some(exp => exp.title || exp.company)) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('WORK EXPERIENCE', 20, yPosition);
      yPosition += 7;
      
      experiences.forEach(exp => {
        if (exp.title || exp.company) {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(exp.title || 'Position Title', 20, yPosition);
          yPosition += 5;
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          doc.text(`${exp.company} | ${exp.duration}`, 20, yPosition);
          yPosition += 5;
          
          if (exp.description) {
            doc.setFont('helvetica', 'normal');
            const descLines = doc.splitTextToSize(exp.description, 170);
            doc.text(descLines, 20, yPosition);
            yPosition += (descLines.length * 5) + 5;
          }
          yPosition += 3;
        }
      });
    }
    
    // Education
    if (education.some(edu => edu.degree || edu.institution)) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EDUCATION', 20, yPosition);
      yPosition += 7;
      
      education.forEach(edu => {
        if (edu.degree || edu.institution) {
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(edu.degree || 'Degree', 20, yPosition);
          yPosition += 5;
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`${edu.institution} | ${edu.year}`, 20, yPosition);
          yPosition += 7;
        }
      });
    }
    
    // Skills
    if (skills) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('SKILLS', 20, yPosition);
      yPosition += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const skillsLines = doc.splitTextToSize(skills, 170);
      doc.text(skillsLines, 20, yPosition);
    }
    
    doc.save(`${personalInfo.fullName || 'CV'}_Qatar_Format.pdf`);
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle>Qatar-Optimized CV Generator</CardTitle>
        <CardDescription>
          Create a professional CV tailored for the GCC job market with all required information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Input
                id="nationality"
                value={personalInfo.nationality}
                onChange={(e) => setPersonalInfo({...personalInfo, nationality: e.target.value})}
                placeholder="British"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                placeholder="john.smith@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                placeholder="+974 XXXX XXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Current Location *</Label>
              <Input
                id="location"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                placeholder="Doha, Qatar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaStatus">Visa Status *</Label>
              <Input
                id="visaStatus"
                value={personalInfo.visaStatus}
                onChange={(e) => setPersonalInfo({...personalInfo, visaStatus: e.target.value})}
                placeholder="Resident / Visit Visa / Sponsorship Required"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Notice Period *</Label>
              <Input
                id="noticePeriod"
                value={personalInfo.noticePeriod}
                onChange={(e) => setPersonalInfo({...personalInfo, noticePeriod: e.target.value})}
                placeholder="1 Month / Immediate"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Professional Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief overview of your professional background, key achievements, and career objectives..."
            className="min-h-[100px]"
          />
        </div>

        <Separator />

        {/* Work Experience */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Position {index + 1}
                  </span>
                  {experiences.length > 1 && (
                    <Button
                      onClick={() => removeExperience(exp.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Company Ltd."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Key responsibilities and achievements..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Education */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Education</h3>
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
          {education.map((edu, index) => (
            <Card key={edu.id} className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Education {index + 1}
                  </span>
                  {education.length > 1 && (
                    <Button
                      onClick={() => removeEducation(edu.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      placeholder="2015-2019"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Skills */}
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="List your key skills (e.g., JavaScript, React, Project Management, Fluent Arabic, etc.)"
            className="min-h-[80px]"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={generatePDF} size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download CV as PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};