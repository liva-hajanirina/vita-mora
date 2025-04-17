
import React, { useState } from 'react';
import { Filter, Upload, Info } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const Medicines = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'painkillers', name: 'Antidouleurs' },
    { id: 'antibiotics', name: 'Antibiotiques' },
    { id: 'vitamins', name: 'Vitamines' },
    { id: 'firstaid', name: 'Premiers soins' },
    { id: 'allergy', name: 'Allergies' }
  ];
  
  const products = [
    {
      id: 1,
      title: "Paracétamol (500mg)",
      price: 2500,
      image: "https://cdn.pixabay.com/photo/2016/12/05/19/49/syringe-1884784_1280.jpg",
      category: "painkillers"
    },
    {
      id: 2,
      title: "Ibuprofène (400mg)",
      price: 3500,
      image: "https://cdn.pixabay.com/photo/2021/07/21/21/25/medication-6484335_1280.jpg",
      category: "painkillers"
    },
    {
      id: 3,
      title: "Amoxicilline",
      price: 7500,
      image: "https://cdn.pixabay.com/photo/2022/02/09/23/01/pharmacy-7004865_1280.jpg",
      category: "antibiotics"
    },
    {
      id: 4,
      title: "Vitamine C (30 comprimés)",
      price: 8000,
      image: "https://cdn.pixabay.com/photo/2021/11/14/15/54/bottle-6794842_1280.jpg",
      category: "vitamins"
    },
    {
      id: 5,
      title: "Kit premiers soins",
      price: 15000,
      image: "https://cdn.pixabay.com/photo/2014/12/10/20/56/medical-563427_1280.jpg",
      category: "firstaid"
    },
    {
      id: 6,
      title: "Cétirizine (antihistaminique)",
      price: 6000,
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "allergy"
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
  
  const handleUploadPrescription = () => {
    toast({
      title: "Fonctionnalité d'ordonnance",
      description: "L'upload d'ordonnance sera disponible bientôt",
    });
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Médicaments" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des médicaments..." />
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-start">
            <div className="bg-vitamora-green/10 p-2 rounded-full mr-3">
              <Info size={24} className="text-vitamora-green" />
            </div>
            <div>
              <h3 className="font-bold text-vitamora-green">Envoyez votre ordonnance</h3>
              <p className="text-sm text-gray-600 mt-1">
                Prenez une photo de votre ordonnance et recevez vos médicaments à domicile
              </p>
              <button 
                onClick={handleUploadPrescription}
                className="flex items-center gap-2 mt-3 bg-vitamora-green text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <Upload size={18} />
                <span>Envoyer une ordonnance</span>
              </button>
            </div>
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

export default Medicines;
