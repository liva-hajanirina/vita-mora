
import React, { useState } from 'react';
import { Filter, Upload, PillBottle } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

const Medicines = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'painkillers', name: 'Douleur' },
    { id: 'fever', name: 'Fièvre' },
    { id: 'allergies', name: 'Allergies' },
    { id: 'vitamins', name: 'Vitamines' },
    { id: 'prescription', name: 'Ordonnance' }
  ];
  
  const products = [
    {
      id: 1,
      title: "Paracétamol (500mg)",
      price: 3500,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80",
      description: "Contre la douleur légère à modérée et la fièvre",
      category: "painkillers"
    },
    {
      id: 2,
      title: "Ibuprofène (400mg)",
      price: 4500,
      image: "https://images.unsplash.com/photo-1550572017-26b5c3e5d0a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      description: "Anti-inflammatoire pour soulager douleur et inflammation",
      category: "painkillers"
    },
    {
      id: 3,
      title: "Vitamine C (1000mg)",
      price: 15000,
      image: "https://images.unsplash.com/photo-1606939884722-6d5856e8e336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      description: "Renforce le système immunitaire",
      category: "vitamins"
    },
    {
      id: 4,
      title: "Antihistaminique",
      price: 6500,
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      description: "Contre les allergies, la rhinite et l'urticaire",
      category: "allergies"
    },
    {
      id: 5,
      title: "Doliprane (1000mg)",
      price: 5000,
      image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "Pour soulager la fièvre et les maux de tête",
      category: "fever"
    },
    {
      id: 6,
      title: "Complexe multivitaminé",
      price: 22000,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "Vitamines et minéraux essentiels pour le bien-être quotidien",
      category: "vitamins"
    }
  ];
  
  const handleUploadPrescription = () => {
    toast({
      title: "Ordonnance téléchargée",
      description: "Votre ordonnance a été envoyée aux pharmacies partenaires. Nous vous contacterons bientôt.",
    });
    setShowPrescriptionUpload(false);
  };
  
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
      <Header title="Médicaments" />
      
      <div className="vitamora-container">
        <SearchBar placeholder="Rechercher des médicaments..." />
        
        <div className="bg-vitamora-orange/10 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-vitamora-green">L'astuce du pharmacien</h3>
          <p className="text-sm text-gray-700 mt-1">
            Téléchargez votre ordonnance pour être mis en relation avec la pharmacie la plus proche disposant de vos médicaments.
          </p>
          <Button 
            onClick={() => setShowPrescriptionUpload(true)}
            className="mt-2 bg-vitamora-green hover:bg-vitamora-green/90 text-white flex items-center gap-2"
          >
            <Upload size={16} />
            Télécharger une ordonnance
          </Button>
        </div>
        
        {showPrescriptionUpload && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h4 className="font-semibold text-vitamora-green mb-3">Télécharger votre ordonnance</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-3">
              <PillBottle size={36} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Cliquez pour sélectionner une image ou prenez une photo</p>
              <input type="file" accept="image/*" className="hidden" id="prescription-upload" />
              <label htmlFor="prescription-upload">
                <Button variant="outline" className="mx-auto">
                  Choisir un fichier
                </Button>
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowPrescriptionUpload(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={handleUploadPrescription}
                className="bg-vitamora-green hover:bg-vitamora-green/90 text-white"
              >
                Envoyer
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    if (category.id === 'prescription') {
                      setShowPrescriptionUpload(true);
                    }
                  }}
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

export default Medicines;
