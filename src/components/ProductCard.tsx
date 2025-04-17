
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  description?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  title, 
  price, 
  description,
  onAddToCart = () => {} 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-vitamora-green">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-vitamora-orange">{price.toLocaleString()} Ar</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onAddToCart();
            }} 
            className="p-2 bg-vitamora-green text-white rounded-full hover:bg-green-700 transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
