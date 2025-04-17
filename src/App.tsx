
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages d'authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Pages principales */}
          <Route path="/" element={<Index />} />
          <Route path="/social" element={<Social />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<Conversation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Pages des services */}
          <Route path="/services/meals" element={<Meals />} />
          <Route path="/services/groceries" element={<Groceries />} />
          <Route path="/services/aperitifs" element={<Aperitifs />} />
          <Route path="/services/medicines" element={<Medicines />} />
          
          {/* Page d'erreur 404 pour les routes non définies */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
