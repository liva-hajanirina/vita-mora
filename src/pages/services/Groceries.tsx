
import React, { useState } from 'react';
import { Filter, Tag } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const Groceries = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStoreType, setActiveStoreType] = useState('supermarket');
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'fruits', name: 'Fruits & Légumes' },
    { id: 'dairy', name: 'Produits laitiers' },
    { id: 'meat', name: 'Viandes' },
    { id: 'bakery', name: 'Boulangerie' },
    { id: 'drinks', name: 'Boissons' },
    { id: 'rice', name: 'Riz' }
  ];
  
  // Produits de supermarché
  const supermarketProducts = [
    {
      id: 1,
      title: "Lait (1L)",
      price: 4500,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "dairy"
    },
    {
      id: 2,
      title: "Poulet entier",
      price: 18000,
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "meat"
    },
    {
      id: 3,
      title: "Pain baguette",
      price: 1200,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "bakery"
    },
    {
      id: 4,
      title: "Eau minérale (pack 6x1.5L)",
      price: 12000,
      image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      category: "drinks"
    },
    {
      id: 5,
      title: "Pommes (1kg)",
      price: 8000,
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "fruits"
    },
    {
      id: 6,
      title: "Riz blanc (5kg)",
      price: 22000,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "rice"
    }
  ];
  
  // Produits de marché local
  const localMarketProducts = [
    {
      id: 7,
      title: "Riz Makalioka (5kg)",
      price: 20000,
      image: "https://www.madacamp.com/images/Madagascar_Makalioka_Rice.jpg",
      category: "rice",
      isLocal: true
    },
    {
      id: 8,
      title: "Tomates fraîches (1kg)",
      price: 4000,
      image: "https://images.unsplash.com/photo-1592924357228-91517b3b8566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "fruits",
      isLocal: true
    },
    {
      id: 9,
      title: "Manioc frais (1kg)",
      price: 3000,
      image: "https://images.unsplash.com/photo-1583608354155-90119b1ae2b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "fruits",
      isLocal: true
    },
    {
      id: 10,
      title: "Poulet fermier",
      price: 22000,
      image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "meat",
      isLocal: true
    },
    {
      id: 11,
      title: "Fruits de saison (1kg)",
      price: 6000,
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "fruits",
      isLocal: true
    },
    {
      id: 12,
      title: "Riz rouge (3kg)",
      price: 18000,
      image: "https://4.bp.blogspot.com/-o-MHSG32Qec/T4Ky3J-L3wI/AAAAAAAAGyo/bAcX2f0oFpU/s1600/riz+rouge2.jpg",
      category: "rice",
      isLocal: true
    }
  ];
  
  // Filtrer les produits en fonction du type de magasin et de la catégorie
  const getFilteredProducts = () => {
    const allProducts = activeStoreType === 'supermarket' 
      ? supermarketProducts 
      : localMarketProducts;
      
    return activeCategory === 'all' 
      ? allProducts 
      : allProducts.filter(product => product.category === activeCategory);
  };
  
  const filteredProducts = getFilteredProducts();
  
  const addToCart = (productId: number) => {
    const allProducts = [...supermarketProducts, ...localMarketProducts];
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier`,
      });
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Courses" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des produits..." />
        
        <div className="bg-vitamora-orange/10 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-vitamora-green">L'astuce du chef</h3>
          <p className="text-sm text-gray-700 mt-1">
            Les produits des marchés locaux sont récoltés le jour même ! Idéal pour des plats frais et savoureux.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Choisissez votre source</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveStoreType('supermarket')}
              className={`flex-1 py-2 px-3 rounded-md ${
                activeStoreType === 'supermarket'
                  ? 'bg-vitamora-green text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Supermarché
            </button>
            <button
              onClick={() => setActiveStoreType('localmarket')}
              className={`flex-1 py-2 px-3 rounded-md ${
                activeStoreType === 'localmarket'
                  ? 'bg-vitamora-green text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Marché local
            </button>
          </div>
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
            <div key={product.id} className="relative">
              {product.isLocal && (
                <Badge className="absolute top-2 left-2 z-10 bg-vitamora-orange text-white">
                  <Tag className="h-3 w-3 mr-1" />
                  Local
                </Badge>
              )}
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                onAddToCart={() => addToCart(product.id)}
              />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p>Aucun produit trouvé dans cette catégorie</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Groceries;
