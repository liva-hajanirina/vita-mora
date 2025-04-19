
import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera
} from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { uploadProfileImage } from '@/utils/imageUploadService';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Profile } from '@/utils/profileService';
import { getProfileById } from '@/utils/profileService';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await getProfileById(user.id);
        if (profileData) {
          setProfile(profileData);
        }
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      try {
        const result = await uploadProfileImage(e.target.files[0]);
        if (!result.success) {
          throw new Error(result.error);
        }
        
        // Rafraîchir le profil
        if (user) {
          const profileData = await getProfileById(user.id);
          if (profileData) {
            setProfile(profileData);
          }
        }
      } catch (error: any) {
        console.error("Erreur lors du téléchargement de l'image:", error);
        toast.error(error.message || "Erreur lors du téléchargement de l'image");
      } finally {
        setIsUploading(false);
      }
    }
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

  // Si l'utilisateur est un admin, ajouter un lien vers le dashboard admin
  if (profile?.role === 'admin') {
    menuItems.push({
      icon: <User size={20} />,
      label: "Dashboard Administrateur",
      action: () => navigate('/admin')
    });
  }

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Mon profil" showBack={false} />
      
      <div className="vitamora-container">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-vitamora-green">
                <AvatarImage 
                  src={profile?.profile_image_url || `https://ui-avatars.com/api/?name=${profile?.first_name || ''} ${profile?.last_name || ''}`} 
                  alt="Photo de profil" 
                />
                <AvatarFallback>
                  {profile?.first_name?.charAt(0) || ''}
                  {profile?.last_name?.charAt(0) || ''}
                </AvatarFallback>
              </Avatar>
              
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 p-1 bg-vitamora-orange text-white rounded-full cursor-pointer"
              >
                <Camera size={16} />
              </label>
              <input 
                id="profile-image" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleProfileImageChange}
                disabled={isUploading}
              />
            </div>
            
            <div className="ml-4">
              <h2 className="text-xl font-bold text-vitamora-green">
                {profile ? `${profile.first_name} ${profile.last_name}` : "Chargement..."}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-gray-500">{profile?.phone || "Téléphone non renseigné"}</p>
              {profile?.role === 'admin' && (
                <span className="text-xs bg-vitamora-green text-white px-2 py-1 rounded-full mt-1 inline-block">
                  Administrateur
                </span>
              )}
            </div>
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
