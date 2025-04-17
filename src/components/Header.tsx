
import React from 'react';
import { ChevronLeft, Bell, User, Search, ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from './Logo';
import { Badge } from './ui/badge';
import NotificationBar from './NotificationBar';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showNotification?: boolean;
  showProfile?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showLogo = true,
  showNotification = true,
  showProfile = true,
  showSearch = false,
  showCart = true,
  cartItemCount = 2
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white p-4 shadow-sm sticky top-0 z-30">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
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
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <button 
              onClick={() => navigate('/search')}
              className="p-2 text-vitamora-green hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
          )}
          
          {showCart && (
            <Link 
              to="/cart" 
              className="p-2 text-vitamora-green hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-vitamora-orange text-white h-5 min-w-5 flex items-center justify-center text-xs px-1">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          )}
          
          {showNotification && (
            <NotificationBar count={3} onClick={() => navigate('/notifications')} />
          )}
          
          {showProfile && (
            <Link to="/profile" className="p-1">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-vitamora-green">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
