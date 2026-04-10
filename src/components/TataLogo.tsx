import React from 'react';

interface TataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export const TataLogo: React.FC<TataLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'full' 
}) => {
  const sizes = {
    sm: { logo: 32, text: 'text-lg' },
    md: { logo: 40, text: 'text-xl' },
    lg: { logo: 56, text: 'text-2xl' },
  };

  const { logo, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Tata Logo - Stylized T shape */}
      <div 
        className="relative flex items-center justify-center rounded-full bg-primary"
        style={{ width: logo, height: logo }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4"
          fill="none"
        >
          {/* Outer arc */}
          <path
            d="M50 10 C75 10, 90 25, 90 50 C90 75, 75 90, 50 90 C25 90, 10 75, 10 50 C10 25, 25 10, 50 10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-primary-foreground"
          />
          {/* Inner T shape stylized */}
          <path
            d="M30 35 L70 35 M50 35 L50 70"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-primary-foreground"
          />
          {/* Small decorative elements */}
          <circle cx="50" cy="25" r="4" fill="currentColor" className="text-accent" />
        </svg>
      </div>
      
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} text-foreground leading-tight`}>
            TATA MOTORS
          </span>
          <span className="text-xs text-muted-foreground font-medium tracking-wider">
            LAB BOOKING SYSTEM
          </span>
        </div>
      )}
    </div>
  );
};

export default TataLogo;
