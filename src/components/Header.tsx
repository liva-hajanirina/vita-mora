
import React from 'react';
import { Bell, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showLogo = true,
  showNotification = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {showBack && !isHomePage && (
            <button 
              onClick={() => navigate(-1)}
              className="p-1"
            >
              <ChevronLeft size={24} className="text-vitamora-green" />
            </button>
          )}
          {showLogo && <Logo className="h-9" />}
          {title && <h1 className="text-xl font-bold text-vitamora-green">{title}</h1>}
        </div>
        
        {showNotification && (
          <button className="relative p-1">
            <Bell size={24} className="text-vitamora-green" />
            <span className="absolute top-0 right-0 bg-vitamora-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
