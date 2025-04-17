
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

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
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-vitamora-green">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <Link to="/" className="btn-primary flex items-center justify-center gap-2 mx-auto w-40">
          <Home size={18} />
          <span>Accueil</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
