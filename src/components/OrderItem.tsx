
import React from 'react';
import { Clock, Check, Truck, ShoppingBag } from 'lucide-react';

interface OrderItemProps {
  id: string;
  date: string;
  items: string[];
  status: 'pending' | 'confirmed' | 'delivering' | 'delivered';
  total: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ id, date, items, status, total }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'confirmed':
        return <Check size={20} className="text-blue-500" />;
      case 'delivering':
        return <Truck size={20} className="text-vitamora-orange" />;
      case 'delivered':
        return <Check size={20} className="text-green-500" />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'delivering':
        return 'En livraison';
      case 'delivered':
        return 'Livrée';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-vitamora-green">Commande #{id}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
          {getStatusIcon()}
          <span className="text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 my-3">
        <ShoppingBag size={16} className="text-gray-500" />
        <p className="text-sm text-gray-600">
          {items.length === 1 
            ? items[0] 
            : `${items[0]} et ${items.length - 1} autre${items.length > 2 ? 's' : ''}`
          }
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="font-medium">Total</span>
        <span className="font-bold text-vitamora-orange">{total.toLocaleString()} Ar</span>
      </div>
    </div>
  );
};

export default OrderItem;
