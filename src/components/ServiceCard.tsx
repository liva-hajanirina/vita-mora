
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  link,
  color = 'text-vitamora-orange'
}) => {
  return (
    <Link to={link} className="block">
      <div className="service-card">
        <div className={`rounded-full p-3 mb-3 ${color} self-start`}>
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
