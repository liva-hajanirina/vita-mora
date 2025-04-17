
import React from 'react';
import { Button } from './ui/button';

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  image,
  buttonText,
  onButtonClick = () => {},
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-vitamora-green">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">
          {description}
        </p>
        <Button 
          onClick={onButtonClick} 
          className="mt-3 bg-vitamora-orange hover:bg-vitamora-orange/90 text-white"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PromotionCard;
