
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const Aperitifs = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'combos', name: 'Combos' },
    { id: 'beers', name: 'Bières' },
    { id: 'wines', name: 'Vins' },
    { id: 'spirits', name: 'Spiritueux' },
    { id: 'snacks', name: 'Amuse-bouches' }
  ];
  
  const products = [
    {
      id: 1,
      title: "Combo Bière & Snacks",
      price: 30000,
      image: "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description: "4 bières THB et un assortiment d'amuse-bouches",
      category: "combos"
    },
    {
      id: 2,
      title: "Combo Vin & Fromages",
      price: 45000,
      image: "https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description: "Bouteille de vin rouge et plateau de fromages",
      category: "combos"
    },
    {
      id: 3,
      title: "THB Pack (6x33cl)",
      price: 24000,
      image: "https://lh3.googleusercontent.com/p/AF1QipOhS_VgqeIZ7tCDv0OA-a3oVSTwZDYFwjT-Nyzd=w960-h960-n-o-v1",
      category: "beers"
    },
    {
      id: 4,
      title: "Vin Rouge Malgache",
      price: 28000,
      image: "https://www.mada-boutique.com/wp-content/uploads/2021/08/vin-rouge-malgache.jpg",
      category: "wines"
    },
    {
      id: 5,
      title: "Whisky Jack Daniel's",
      price: 85000,
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      category: "spirits"
    },
    {
      id: 6,
      title: "Assortiment d'Amuse-bouches",
      price: 25000,
      image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      description: "Mélange varié de snacks et d'amuse-bouches pour l'apéritif",
      category: "snacks"
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
      <Header title="Apéros" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des apéritifs..." />
        
        <div className="bg-vitamora-orange/10 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-vitamora-green">L'astuce du chef</h3>
          <p className="text-sm text-gray-700 mt-1">
            Nos combos apéritifs sont parfaits pour vos soirées entre amis ! Livraison en moins de 30 minutes.
          </p>
        </div>
        
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
              description={product.description}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Aperitifs;
