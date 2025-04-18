
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-vitamora-cream">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-vitamora-orange" />
          <p className="text-vitamora-green font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
