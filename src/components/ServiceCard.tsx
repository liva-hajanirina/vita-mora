
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color?: string;
  bgColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  link,
  color = 'text-vitamora-orange',
  bgColor = 'bg-orange-50'
}) => {
  return (
    <Link to={link} className="block">
      <div className="service-card hover:scale-105 hover:shadow-md transition-all duration-200">
        <div className={`rounded-full p-3 mb-3 ${bgColor} ${color} self-start`}>
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-lg mb-2 text-vitamora-green">{title}</h3>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-vitamora-orange font-medium">Voir plus</span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
