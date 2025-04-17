
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/bc808ae3-9ea0-4640-911c-9aaf202c8ed1.png" 
        alt="Vita Mora Logo" 
        className="h-full"
      />
    </div>
  );
};

export default Logo;
