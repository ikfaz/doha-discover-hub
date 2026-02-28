import React from 'react';
import { Car, CreditCard, Smartphone, Map, Train } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResourceSidebar = () => {
  const tools = [
    {
      name: 'Uber / Karwa Taxi',
      description: 'Reliable ride-hailing apps for getting around Doha.',
      icon: Car,
      link: 'https://www.uber.com/global/en/cities/doha/',
    },
    {
      name: 'Hayya Card',
      description: 'Essential entry permit and stadium access for major events.',
      icon: CreditCard,
      link: 'https://hayya.qatar2022.qa/',
    },
    {
      name: 'Doha Metro (Qatar Rail)',
      description: 'Fast, clean, and affordable way to explore the city.',
      icon: Train,
      link: 'https://www.qr.com.qa/',
    },
    {
      name: 'Visit Qatar App',
      description: 'Official tourism app with guides and event calendars.',
      icon: Smartphone,
      link: 'https://visitqatar.com/',
    },
    {
      name: 'Google Maps',
      description: 'Essential for navigation and finding local businesses.',
      icon: Map,
      link: 'https://maps.google.com/',
    },
  ];

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardHeader className="pb-3 border-b border-gray-50">
        <CardTitle className="text-lg font-bold text-qatar-maroon flex items-center gap-2">
          <Map className="w-5 h-5" />
          Essential Travel Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        {tools.map((tool, index) => (
          <a
            key={index}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="mt-1 p-2 bg-gray-100 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
              <tool.icon className="w-4 h-4 text-qatar-maroon" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 group-hover:text-qatar-maroon transition-colors">
                {tool.name}
              </h4>
              <p className="text-xs text-gray-500 leading-snug mt-0.5">
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResourceSidebar;