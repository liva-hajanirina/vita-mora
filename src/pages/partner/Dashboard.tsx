
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, CheckCircle, Clock, FileText, LogOut, ChefHat, Users, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CreatePost from '@/components/CreatePost';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");
  const [chefTip, setChefTip] = useState("Essayez nos délicieux plats traditionnels malgaches, préparés avec des ingrédients frais du marché local!");
  const [editingTip, setEditingTip] = useState(false);
  const [tempTip, setTempTip] = useState(chefTip);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    completed: 0
  });

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive"
      });
    }
  };

  const fetchPartnerData = async () => {
    setLoading(true);
    
    try {
      // Fetch user data
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        if (profileData.role !== 'partner') {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits de partenaire",
            variant: "destructive"
          });
          navigate('/home');
          return;
        }
        
        setUserData(profileData);
      }
      
      // For demo purposes, we'll use dummy data
      // In a real app, you would fetch real orders from the database
      const pendingOrdersData = [
        { id: "VM2305", time: "14:45", items: ["Pizza Margherita", "Coca-Cola"], total: "35000 Ar", client: "Sophie Rakoto" },
        { id: "VM2306", time: "15:10", items: ["Burger Classic", "Frites", "Sprite"], total: "42000 Ar", client: "Jean Andria" },
        { id: "VM2307", time: "15:30", items: ["Poulet rôti", "Riz blanc"], total: "30000 Ar", client: "Marie Ravalison" }
      ];
      
      const confirmedOrdersData = [
        { id: "VM2303", time: "13:15", items: ["Paracétamol", "Vitamine C"], total: "12500 Ar", client: "Eric Ramanantsoa", status: "En préparation" },
        { id: "VM2304", time: "13:30", items: ["Pizza Peperoni", "Tiramisu"], total: "38000 Ar", client: "Nathalie Rakotoson", status: "En livraison" }
      ];
      
      const completedOrdersData = [
        { id: "VM2298", date: "Hier, 18:45", items: ["Riz 5kg", "Huile", "Tomates"], total: "42000 Ar", client: "Pierre Randria" },
        { id: "VM2285", date: "12/04/2025", items: ["Combo Apéro: Bière et Amuse-bouches"], total: "28000 Ar", client: "Julie Razafy" },
        { id: "VM2274", date: "08/04/2025", items: ["Poulet rôti", "Frites"], total: "30000 Ar", client: "Thomas Rakoto" }
      ];
      
      setPendingOrders(pendingOrdersData as any);
      setConfirmedOrders(confirmedOrdersData as any);
      setCompletedOrders(completedOrdersData as any);
      
      setStats({
        pending: pendingOrdersData.length,
        active: confirmedOrdersData.length,
        completed: completedOrdersData.length
      });
      
    } catch (error: any) {
      console.error("Erreur lors du chargement des données:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = (orderId: string) => {
    toast({
      title: "Commande confirmée",
      description: `La commande ${orderId} a été confirmée avec succès.`,
    });
    
    // In a real app, update the order status in the database
    // and refresh the orders
    
    // For demo, update the local state
    setPendingOrders((prev: any) => prev.filter((order: any) => order.id !== orderId));
    setConfirmedOrders((prev: any) => [...prev, {
      ...pendingOrders.find((o: any) => o.id === orderId),
      status: "En préparation"
    }]);
    
    setStats(prev => ({
      ...prev,
      pending: prev.pending - 1,
      active: prev.active + 1
    }));
  };

  const handleRejectOrder = (orderId: string) => {
    toast({
      title: "Commande refusée",
      description: `La commande ${orderId} a été refusée.`,
      variant: "destructive",
    });
    
    // In a real app, update the order status in the database
    // and refresh the orders
    
    // For demo, update the local state
    setPendingOrders((prev: any) => prev.filter((order: any) => order.id !== orderId));
    
    setStats(prev => ({
      ...prev,
      pending: prev.pending - 1
    }));
  };

  const handleSaveTip = () => {
    setChefTip(tempTip);
    setEditingTip(false);
    toast({
      title: "Astuce du chef mise à jour",
      description: "Votre astuce du chef a été mise à jour avec succès.",
    });
  };

  useEffect(() => {
    fetchPartnerData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 text-vitamora-orange">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-vitamora-orange text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ChefHat size={24} className="text-vitamora-orange" />
              <h3 className="text-lg font-bold text-vitamora-green">L'astuce du chef</h3>
            </div>
            {!editingTip ? (
              <Button 
                onClick={() => setEditingTip(true)}
                variant="outline" 
                className="text-vitamora-orange border-vitamora-orange hover:bg-orange-50"
              >
                Modifier
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setEditingTip(false);
                    setTempTip(chefTip);
                  }}
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSaveTip}
                  className="bg-vitamora-green text-white hover:bg-vitamora-green/90"
                >
                  Sauvegarder
                </Button>
              </div>
            )}
          </div>
          
          {!editingTip ? (
            <div className="bg-vitamora-cream p-4 rounded-lg italic text-gray-700">
              "{chefTip}"
            </div>
          ) : (
            <Textarea 
              value={tempTip}
              onChange={(e) => setTempTip(e.target.value)}
              className="min-h-[100px]"
              placeholder="Entrez votre astuce culinaire ici..."
            />
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            Cette astuce sera affichée aux clients lors de leur commande pour les encourager à essayer vos spécialités.
          </div>
        </div>
        
        {!showCreatePost ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-vitamora-orange">Créer une publication</h3>
              <Button 
                onClick={() => setShowCreatePost(true)}
                className="bg-vitamora-green text-white hover:bg-vitamora-green/90"
              >
                Nouvelle publication
              </Button>
            </div>
            <p className="text-gray-600">
              Partagez des nouvelles, des promotions ou des événements avec vos clients. Les publications apparaîtront dans le fil d'actualité de l'application.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-vitamora-orange">Nouvelle publication</h3>
              <Button 
                variant="outline"
                onClick={() => setShowCreatePost(false)}
                className="text-gray-500 border-gray-300"
              >
                Annuler
              </Button>
            </div>
            <CreatePost />
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-vitamora-orange">Tableau de bord partenaire</h2>
            <div className="flex items-center gap-2">
              <Users className="text-vitamora-orange" size={20} />
              <span className="font-medium">{userData?.first_name} {userData?.last_name}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-3 mb-2">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <p className="font-semibold">{stats.pending}</p>
              <p className="text-sm text-gray-500">En attente</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <Package className="text-blue-600" size={24} />
              </div>
              <p className="font-semibold">{stats.active}</p>
              <p className="text-sm text-gray-500">En cours</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <p className="font-semibold">{stats.completed}</p>
              <p className="text-sm text-gray-500">Terminées</p>
            </div>
          </div>
          
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchPartnerData}
              className="flex items-center gap-1 text-vitamora-orange border-vitamora-orange hover:bg-orange-50"
            >
              <RefreshCw size={16} />
              <span>Actualiser</span>
            </Button>
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
                  pendingOrders.map((order: any) => (
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
                        {order.items.map((item: string, i: number) => (
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
                  confirmedOrders.map((order: any) => (
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
                        {order.items.map((item: string, i: number) => (
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
                  completedOrders.map((order: any) => (
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
                        {order.items.map((item: string, i: number) => (
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
