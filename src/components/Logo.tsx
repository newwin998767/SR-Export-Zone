import React from 'react';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-48", inverted = false }) => {
  const primaryColor = inverted ? "#FFFFFF" : "#141414";
  const accentColor = "#E53935"; // Red for the magnifying glass

  return (
    <svg viewBox="0 0 500 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="sr-cutouts">
          {/* Everything white in the mask is kept, black is hidden */}
          <rect x="0" y="0" width="500" height="300" fill="white" />
          
          {/* Vertical Line */}
          <rect x="235" y="80" width="30" height="150" fill="black" />
          
          {/* Horizontal Line */}
          <rect x="110" y="115" width="290" height="30" fill="black" />
          
          {/* Lower Cutout S */}
          <rect x="50" y="170" width="130" height="30" fill="black" />
          
          {/* Lower Cutouts R */}
          <polygon points="310,170 310,220 370,220" fill="black" />
          <polygon points="360,170 450,170 450,220 420,220" fill="black" />
        </mask>
      </defs>

      {/* Hanger Hook */}
      <path 
        d="M 250 30 C 250 10, 280 10, 280 30 C 280 50, 250 55, 250 80" 
        stroke={primaryColor} 
        strokeWidth="16" 
        strokeLinecap="round" 
        fill="none" 
      />
      
      {/* Main Body with Mask */}
      <path 
        d="M 50 130 Q 150 60 250 60 Q 350 60 450 130 L 450 220 L 50 220 Z" 
        fill={primaryColor} 
        mask="url(#sr-cutouts)" 
      />

      {/* Text: EXPORT Z */}
      <text 
        x="60" 
        y="275" 
        fontFamily="Inter, sans-serif" 
        fontSize="46" 
        fontWeight="900" 
        fill={primaryColor} 
        textAnchor="start" 
        letterSpacing="1"
      >
        EXPORT Z
      </text>
      
      {/* Text: NE */}
      <text 
        x="365" 
        y="275" 
        fontFamily="Inter, sans-serif" 
        fontSize="46" 
        fontWeight="900" 
        fill={primaryColor} 
        textAnchor="start" 
        letterSpacing="1"
      >
        NE
      </text>
      
      {/* Magnifying Glass (The 'O') */}
      <g transform="translate(332, 258)">
        <circle cx="0" cy="-14" r="14" stroke={accentColor} strokeWidth="6" fill="none" />
        <line x1="10" y1="-4" x2="22" y2="8" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
        <path d="M -6 -14 L -2 -10 L 6 -20" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
};
