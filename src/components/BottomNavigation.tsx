
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, MessageCircle, User, Globe } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t border-gray-200 h-16 flex items-center justify-around z-50">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-vitamora-orange' : 'text-gray-500'}`
        }
        end
      >
        <Home size={24} />
        <span className="text-xs mt-1">Accueil</span>
      </NavLink>
      <NavLink 
        to="/orders" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-vitamora-orange' : 'text-gray-500'}`
        }
      >
        <ShoppingCart size={24} />
        <span className="text-xs mt-1">Commandes</span>
      </NavLink>
      <NavLink 
        to="/social" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-vitamora-orange' : 'text-gray-500'}`
        }
      >
        <Globe size={24} />
        <span className="text-xs mt-1">Social</span>
      </NavLink>
      <NavLink 
        to="/messages" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-vitamora-orange' : 'text-gray-500'}`
        }
      >
        <MessageCircle size={24} />
        <span className="text-xs mt-1">Messages</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex flex-col items-center ${isActive ? 'text-vitamora-orange' : 'text-gray-500'}`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Profil</span>
      </NavLink>
    </div>
  );
};

export default BottomNavigation;
