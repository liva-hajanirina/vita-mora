
import React, { useState } from 'react';
import { ArrowLeft, Package, CheckCircle, Clock, FileText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/login');
  };

  const handleConfirmOrder = (orderId: string) => {
    toast({
      title: "Commande confirmée",
      description: `La commande ${orderId} a été confirmée avec succès.`,
    });
  };

  const handleRejectOrder = (orderId: string) => {
    toast({
      title: "Commande refusée",
      description: `La commande ${orderId} a été refusée.`,
      variant: "destructive",
    });
  };

  const pendingOrders = [
    { id: "VM2305", time: "14:45", items: ["Pizza Margherita", "Coca-Cola"], total: "35000 Ar", client: "Sophie Rakoto" },
    { id: "VM2306", time: "15:10", items: ["Burger Classic", "Frites", "Sprite"], total: "42000 Ar", client: "Jean Andria" },
    { id: "VM2307", time: "15:30", items: ["Poulet rôti", "Riz blanc"], total: "30000 Ar", client: "Marie Ravalison" }
  ];

  const confirmedOrders = [
    { id: "VM2303", time: "13:15", items: ["Paracétamol", "Vitamine C"], total: "12500 Ar", client: "Eric Ramanantsoa", status: "En préparation" },
    { id: "VM2304", time: "13:30", items: ["Pizza Peperoni", "Tiramisu"], total: "38000 Ar", client: "Nathalie Rakotoson", status: "En livraison" }
  ];

  const completedOrders = [
    { id: "VM2298", date: "Hier, 18:45", items: ["Riz 5kg", "Huile", "Tomates"], total: "42000 Ar", client: "Pierre Randria" },
    { id: "VM2285", date: "12/04/2025", items: ["Combo Apéro: Bière et Amuse-bouches"], total: "28000 Ar", client: "Julie Razafy" },
    { id: "VM2274", date: "08/04/2025", items: ["Poulet rôti", "Frites"], total: "30000 Ar", client: "Thomas Rakoto" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-vitamora-orange text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-1"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold">Restaurant Délices</h1>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 hover:bg-white/30 transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto p-4 pt-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-vitamora-orange mb-4">Tableau de bord partenaire</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-3 mb-2">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <p className="font-semibold">{pendingOrders.length}</p>
              <p className="text-sm text-gray-500">En attente</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <Package className="text-blue-600" size={24} />
              </div>
              <p className="font-semibold">{confirmedOrders.length}</p>
              <p className="text-sm text-gray-500">En cours</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <p className="font-semibold">{completedOrders.length}</p>
              <p className="text-sm text-gray-500">Terminées</p>
            </div>
          </div>
          
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingOrders.length > 0 ? (
                  pendingOrders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-vitamora-orange">{order.id}</span>
                          <span className="text-sm text-gray-500 ml-2">{order.time}</span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En attente</Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">Client: {order.client}</p>
                      <ul className="text-sm text-gray-600 mb-3">
                        {order.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">{order.total}</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleRejectOrder(order.id)}
                            className="px-3 py-1 border border-red-500 text-red-500 rounded-lg text-sm hover:bg-red-50"
                          >
                            Refuser
                          </button>
                          <button 
                            onClick={() => handleConfirmOrder(order.id)}
                            className="px-3 py-1 bg-vitamora-green text-white rounded-lg text-sm hover:bg-vitamora-green/90"
                          >
                            Confirmer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FileText className="mx-auto mb-2 text-gray-300" size={48} />
                    <p>Aucune commande en attente</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="confirmed">
              <div className="space-y-4">
                {confirmedOrders.length > 0 ? (
                  confirmedOrders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-vitamora-orange">{order.id}</span>
                          <span className="text-sm text-gray-500 ml-2">{order.time}</span>
                        </div>
                        <Badge className={order.status === "En préparation" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100"}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">Client: {order.client}</p>
                      <ul className="text-sm text-gray-600 mb-3">
                        {order.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">{order.total}</p>
                        <button 
                          className={order.status === "En préparation" ? 
                            "px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600" : 
                            "px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                          }
                        >
                          {order.status === "En préparation" ? "Prêt pour livraison" : "Marquer comme livré"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FileText className="mx-auto mb-2 text-gray-300" size={48} />
                    <p>Aucune commande confirmée</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="space-y-4">
                {completedOrders.length > 0 ? (
                  completedOrders.map((order) => (
                    <div key={order.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-vitamora-orange">{order.id}</span>
                          <span className="text-sm text-gray-500 ml-2">{order.date}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Livrée</Badge>
                      </div>
                      <p className="text-sm font-medium mb-1">Client: {order.client}</p>
                      <ul className="text-sm text-gray-600 mb-3">
                        {order.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">{order.total}</p>
                        <button 
                          className="px-3 py-1 border border-vitamora-orange text-vitamora-orange rounded-lg text-sm hover:bg-orange-50"
                        >
                          Détails
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <FileText className="mx-auto mb-2 text-gray-300" size={48} />
                    <p>Aucune commande terminée</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
