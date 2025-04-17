
import React from 'react';
import { Home, Building2, MapPin, Check, Edit, Trash } from 'lucide-react';

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  details?: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete
}) => {
  const getIcon = () => {
    switch (address.type) {
      case 'home': return <Home size={20} />;
      case 'work': return <Building2 size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 transition-colors ${
        isSelected 
          ? 'border-vitamora-orange bg-orange-50' 
          : 'border-gray-200'
      }`}
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full mr-3 ${isSelected ? 'bg-vitamora-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
          {getIcon()}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center">
            <h3 className="font-semibold">{address.name}</h3>
            {address.isDefault && (
              <span className="ml-2 text-xs bg-vitamora-green text-white py-0.5 px-2 rounded-full">Par défaut</span>
            )}
          </div>
          
          <p className="text-gray-700 mt-1">{address.address}</p>
          {address.details && <p className="text-sm text-gray-500 mt-1">{address.details}</p>}
        </div>
        
        {isSelected && (
          <div className="text-vitamora-orange">
            <Check size={22} />
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
        {onSelect && (
          <button 
            onClick={onSelect}
            className="text-sm text-gray-600 hover:text-vitamora-green flex items-center gap-1 p-1"
          >
            <Check size={16} />
            Sélectionner
          </button>
        )}
        
        {onEdit && (
          <button 
            onClick={onEdit}
            className="text-sm text-gray-600 hover:text-vitamora-orange flex items-center gap-1 p-1"
          >
            <Edit size={16} />
            Modifier
          </button>
        )}
        
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-sm text-gray-600 hover:text-red-500 flex items-center gap-1 p-1"
          >
            <Trash size={16} />
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
