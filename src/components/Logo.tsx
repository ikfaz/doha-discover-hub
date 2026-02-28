import React from 'react';

interface LogoProps {
  className?: string;
  iconColor?: string;
  textColor?: string;
  accentColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconColor = "#8A1538", // Qatar Maroon
  textColor = "#1F2937", // Slate 800
  accentColor = "#C5A059" // Dune Gold
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg 
        width="42" 
        height="42" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Main Sail / Wing - Represents the primary dhow sail or falcon wing shape */}
        <path 
          d="M30 75 C30 75 40 10 80 10 C80 10 60 40 60 75 H30Z" 
          fill={iconColor} 
        />
        {/* Accent Sail - Represents the secondary sail or wing detail */}
        <path 
          d="M65 75 C65 75 70 45 90 35 C90 35 80 60 80 75 H65Z" 
          fill={accentColor} 
        />
        {/* Hull - The base of the dhow */}
        <path 
          d="M20 80 H90 C90 80 80 90 55 90 C30 90 20 80 20 80Z" 
          fill={iconColor} 
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-['Playfair_Display'] font-bold text-xl leading-none" style={{ color: textColor }}>
          Experience
        </span>
        <span className="font-['Lato'] text-[0.65rem] font-bold tracking-[0.25em] uppercase" style={{ color: accentColor }}>
          Doha
        </span>
      </div>
    </div>
  );
};

export default Logo;