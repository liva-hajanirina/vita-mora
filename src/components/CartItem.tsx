
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-vitamora-orange font-semibold mt-1">
          {item.price.toLocaleString()} Ar
        </p>
        {item.notes && (
          <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
        )}
      </div>
      
      <div className="flex items-center ml-4">
        <button 
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          className="p-1 rounded-full border border-gray-300 text-gray-500 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        
        <span className="mx-2 min-w-[24px] text-center">{item.quantity}</span>
        
        <button 
          onClick={handleIncrement}
          className="p-1 rounded-full border border-gray-300 text-gray-500"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <button 
        onClick={() => onRemove(item.id)}
        className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
