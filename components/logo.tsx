import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showText = false 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto', 
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="HEIC to PDF Converter Logo" 
        className={sizeClasses[size]}
      />
      {showText && (
        <span className="ml-3 text-lg font-semibold text-foreground">
          HEICtoPDF.shop
        </span>
      )}
    </div>
  );
};

export default Logo; 