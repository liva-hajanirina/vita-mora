
import React, { useState } from 'react';
import { Heart, Filter } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const Meals = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'malgache', name: 'Malgache' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'asiatique', name: 'Asiatique' }
  ];
  
  const products = [
    {
      id: 1,
      title: "Pizza Margherita",
      price: 25000,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "pizza"
    },
    {
      id: 2,
      title: "Burger Classic",
      price: 18000,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1299&q=80",
      category: "burgers"
    },
    {
      id: 3,
      title: "Romazava",
      price: 15000,
      image: "https://www.recettesafricaine.com/wp-content/uploads/2021/12/romazava.jpg",
      category: "malgache"
    },
    {
      id: 4,
      title: "Ravitoto",
      price: 14000,
      image: "https://i.pinimg.com/originals/87/dc/f6/87dcf671ae5e1fd2d0e4891041b9506a.jpg",
      category: "malgache"
    },
    {
      id: 5,
      title: "Tiramisu",
      price: 12000,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      category: "desserts"
    },
    {
      id: 6,
      title: "Pad Thai",
      price: 20000,
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "asiatique"
    }
  ];
  
  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier`,
      });
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Repas" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des repas..." />
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-vitamora-green text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <button className="ml-2 p-2 bg-gray-100 rounded-full">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Meals;
