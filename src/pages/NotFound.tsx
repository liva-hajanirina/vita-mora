
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vitamora-cream p-4 text-center">
      <Logo className="h-24 mb-6" />
      
      <h1 className="text-4xl font-bold text-vitamora-green mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-vitamora-orange mb-6">Page non trouvée</h2>
      
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md mb-8">
        <p className="text-gray-600 mb-6">
          Oops! La page que vous recherchez semble avoir disparu. Retournez à l'accueil ou revenez à la page précédente.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Retour
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-vitamora-green hover:bg-vitamora-green/90 flex items-center gap-2"
          >
            <Home size={18} />
            Retour à l'accueil
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Vita Mora - On le fait pour vous
      </p>
    </div>
  );
};

export default NotFound;
