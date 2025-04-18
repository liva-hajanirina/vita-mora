
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Social from "./pages/Social";
import Messages from "./pages/Messages";
import Conversation from "./pages/messages/Conversation";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/orders/OrderDetail";
import Profile from "./pages/Profile";
import Meals from "./pages/services/Meals";
import Groceries from "./pages/services/Groceries";
import Aperitifs from "./pages/services/Aperitifs";
import Medicines from "./pages/services/Medicines";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/admin/Dashboard";
import PartnerDashboard from "./pages/partner/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Redirection par défaut vers la page de connexion */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Pages d'authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes protégées nécessitant une authentification */}
            <Route element={<ProtectedRoute />}>
              {/* Pages principales */}
              <Route path="/home" element={<Index />} />
              <Route path="/social" element={<Social />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Conversation />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              
              {/* Pages des services */}
              <Route path="/services/meals" element={<Meals />} />
              <Route path="/services/groceries" element={<Groceries />} />
              <Route path="/services/aperitifs" element={<Aperitifs />} />
              <Route path="/services/medicines" element={<Medicines />} />
              
              {/* Pages Admin et Partenaire */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/partner" element={<PartnerDashboard />} />
            </Route>
            
            {/* Page d'erreur 404 pour les routes non définies */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
