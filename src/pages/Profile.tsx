
import React from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/login');
  };

  const menuItems = [
    {
      icon: <User size={20} />,
      label: "Informations personnelles",
      action: () => navigate('/profile/personal-info')
    },
    {
      icon: <MapPin size={20} />,
      label: "Adresses enregistrées",
      action: () => navigate('/profile/addresses')
    },
    {
      icon: <CreditCard size={20} />,
      label: "Méthodes de paiement",
      action: () => navigate('/profile/payment-methods')
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      action: () => navigate('/profile/notifications')
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Aide et support",
      action: () => navigate('/profile/help')
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Mon profil" showBack={false} />
      
      <div className="vitamora-container">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center">
          <img 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold text-vitamora-green">Razafy Jean</h2>
            <p className="text-gray-500">jean.razafy@gmail.com</p>
            <p className="text-gray-500">+261 34 12 345 67</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="text-vitamora-green mr-3">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md text-red-500 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Se déconnecter</span>
        </button>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Version 1.0.0
        </p>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
