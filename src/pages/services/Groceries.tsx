
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const Groceries = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'supermarket' | 'local'>('supermarket');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const supermarketCategories = [
    { id: 'all', name: 'Tous' },
    { id: 'essentials', name: 'Essentiels' },
    { id: 'dairy', name: 'Laitiers' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Légumes' },
    { id: 'beverages', name: 'Boissons' }
  ];
  
  const localCategories = [
    { id: 'all', name: 'Tous' },
    { id: 'rice', name: 'Riz' },
    { id: 'vegetables', name: 'Légumes' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'meats', name: 'Viandes' },
    { id: 'spices', name: 'Épices' }
  ];
  
  const supermarketProducts = [
    {
      id: 1,
      title: "Lait entier 1L",
      price: 4500,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "dairy"
    },
    {
      id: 2,
      title: "Pain de mie",
      price: 3000,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "essentials"
    },
    {
      id: 3,
      title: "Pommes (1kg)",
      price: 8000,
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "fruits"
    },
    {
      id: 4,
      title: "Tomates (500g)",
      price: 4000,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "vegetables"
    },
    {
      id: 5,
      title: "Coca-Cola (1.5L)",
      price: 5500,
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "beverages"
    },
    {
      id: 6,
      title: "Huile d'olive (500ml)",
      price: 15000,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "essentials"
    }
  ];
  
  const localProducts = [
    {
      id: 1,
      title: "Riz blanc (5kg)",
      price: 20000,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "rice"
    },
    {
      id: 2,
      title: "Riz rouge (3kg)",
      price: 18000,
      image: "https://cdn.pixabay.com/photo/2014/10/22/18/43/rice-498688_1280.jpg",
      category: "rice"
    },
    {
      id: 3,
      title: "Manioc frais (1kg)",
      price: 3000,
      image: "https://cdn.pixabay.com/photo/2019/06/17/08/41/manioc-4279174_1280.jpg",
      category: "vegetables"
    },
    {
      id: 4,
      title: "Bananes (1kg)",
      price: 4000,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "fruits"
    },
    {
      id: 5,
      title: "Poulet fermier",
      price: 25000,
      image: "https://cdn.pixabay.com/photo/2021/09/22/09/37/chicken-6646202_1280.jpg",
      category: "meats"
    },
    {
      id: 6,
      title: "Vanille (50g)",
      price: 10000,
      image: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      category: "spices"
    }
  ];
  
  const addToCart = (productId: number, isLocal: boolean) => {
    const products = isLocal ? localProducts : supermarketProducts;
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier`,
      });
    }
  };

  const categories = activeTab === 'supermarket' ? supermarketCategories : localCategories;
  const products = activeTab === 'supermarket' ? supermarketProducts : localProducts;
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Courses" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des produits..." />
        
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setActiveTab('supermarket');
              setActiveCategory('all');
            }}
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'supermarket' 
                ? 'bg-white text-vitamora-green font-medium shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            Supermarché
          </button>
          <button
            onClick={() => {
              setActiveTab('local');
              setActiveCategory('all');
            }}
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'local' 
                ? 'bg-white text-vitamora-green font-medium shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            Marché local
          </button>
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
              onAddToCart={() => addToCart(product.id, activeTab === 'local')}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Groceries;
