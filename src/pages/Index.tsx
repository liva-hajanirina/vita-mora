
import React from 'react';
import { Utensils, ShoppingCart, Wine, PillBottle, Search } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    toast({
      title: "Recherche",
      description: `Vous avez recherché: ${query}`,
    });
  };

  const services = [
    {
      title: "Repas",
      description: "Commandez vos plats préférés livrés à votre porte",
      icon: Utensils,
      link: "/services/meals",
      color: "bg-orange-100"
    },
    {
      title: "Courses",
      description: "Faites vos courses dans les supermarchés et marchés locaux",
      icon: ShoppingCart,
      link: "/services/groceries",
      color: "bg-green-100"
    },
    {
      title: "Apéros",
      description: "Boissons et accompagnements pour vos soirées",
      icon: Wine,
      link: "/services/aperitifs",
      color: "bg-blue-100"
    },
    {
      title: "Médicaments",
      description: "Médicaments livrés depuis les pharmacies",
      icon: PillBottle,
      link: "/services/medicines",
      color: "bg-red-100"
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="vitamora-container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-vitamora-green mb-1">Bonjour!</h1>
          <p className="text-gray-600">Que pouvons-nous faire pour vous aujourd'hui?</p>
        </div>
        
        <SearchBar 
          placeholder="Rechercher des produits ou services..."
          onSearch={handleSearch}
        />
        
        <section className="mb-8">
          <h2 className="section-title">Nos services</h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                color={service.color}
              />
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title mb-0">Promotions</h2>
            <button className="text-vitamora-orange font-medium">Voir tout</button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Promotion" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-vitamora-green">Offre spéciale week-end</h3>
              <p className="text-gray-600 text-sm mt-1">
                Obtenez 20% de réduction sur toutes les commandes de repas ce week-end!
              </p>
              <button className="mt-3 bg-vitamora-orange text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                En profiter
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
