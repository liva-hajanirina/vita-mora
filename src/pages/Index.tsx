
import React from 'react';
import { Utensils, ShoppingCart, Wine, PillBottle, Heart, Star, Clock } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ServiceCard from '@/components/ServiceCard';
import BottomNavigation from '@/components/BottomNavigation';
import PromotionCard from '@/components/PromotionCard';
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

  const promotions = [
    {
      id: 1,
      title: "Offre spéciale week-end",
      description: "Obtenez 20% de réduction sur toutes les commandes de repas ce week-end!",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      buttonText: "En profiter"
    },
    {
      id: 2,
      title: "Spécial Apéro entre amis",
      description: "Combo apéritif complet pour 4 personnes avec livraison express",
      image: "https://images.unsplash.com/photo-1616091216087-de070775f5c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      buttonText: "Commander"
    }
  ];

  const quickAccess = [
    { icon: Heart, label: "Favoris", color: "bg-pink-100 text-pink-500" },
    { icon: Star, label: "Top ventes", color: "bg-yellow-100 text-yellow-600" },
    { icon: Clock, label: "Récents", color: "bg-purple-100 text-purple-500" }
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
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {quickAccess.map((item, index) => (
            <button key={index} className="flex flex-col items-center p-3">
              <div className={`rounded-full p-3 mb-2 ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </button>
          ))}
        </div>
        
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
        
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title mb-0">Promotions</h2>
            <button className="text-vitamora-orange font-medium">Voir tout</button>
          </div>
          
          <div className="space-y-4">
            {promotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                title={promo.title}
                description={promo.description}
                image={promo.image}
                buttonText={promo.buttonText}
                onButtonClick={() => toast({
                  title: "Promotion activée",
                  description: `Vous avez sélectionné: ${promo.title}`
                })}
              />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="section-title">Recommandés pour vous</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 w-max">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="w-40 flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-151${idx + 1000000}`} 
                      alt="Recommandation" 
                      className="w-full h-28 object-cover bg-gray-100"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm">Recommandation {idx + 1}</h3>
                      <p className="text-xs text-gray-500 mt-1">Recommandé pour vous</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
