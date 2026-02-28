import React from 'react';
import { CheckCircle2, Twitter, Linkedin, Instagram, Globe, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'instagram' | 'website';
  url: string;
}

interface AuthorBioProps {
  name: string;
  role?: string;
  bio: string;
  imageUrl?: string;
  credentials?: string[];
  socials?: SocialLink[];
  verified?: boolean;
  location?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({
  name,
  role = "Travel Writer & Local Expert",
  bio,
  imageUrl,
  credentials = [],
  socials = [],
  verified = true,
  location = "Doha, Qatar"
}) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm my-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-qatar-maroon/10 flex items-center justify-center text-qatar-maroon text-2xl font-bold border-2 border-gray-100">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            {verified && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 gap-1 font-normal">
                <CheckCircle2 className="w-3 h-3" />
                Verified Local
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
            <span className="text-qatar-maroon font-medium">{role}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {bio}
          </p>

          {credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {credentials.map((cred, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {cred}
                </span>
              ))}
            </div>
          )}

          {socials.length > 0 && (
            <div className="flex gap-3 pt-2 border-t border-gray-50">
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-qatar-maroon transition-colors p-1"
                  aria-label={`Follow ${name} on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;