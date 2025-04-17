
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Logo className="h-24 mb-8" />
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-vitamora-green">404</h1>
        <p className="text-xl text-gray-600 mb-2">Page non trouvée</p>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to={-1 as any}>
              <ArrowLeft size={18} />
              <span>Retour</span>
            </Link>
          </Button>
          
          <Button asChild className="bg-vitamora-orange hover:bg-vitamora-orange/90 flex items-center gap-2">
            <Link to="/">
              <Home size={18} />
              <span>Accueil</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
