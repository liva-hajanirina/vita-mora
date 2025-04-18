import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Package, Store, CreditCard, Palette, LogOut, PlusCircle, Save, UserCog, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import PartnerInvitation from './components/PartnerInvitation';
import MailConfiguration from './components/MailConfiguration';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("orders");
  const { signOut, user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    partners: 0,
    revenue: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  const [appSettings, setAppSettings] = useState({
    primaryColor: "#34D399",
    secondaryColor: "#F59E0B",
    backgroundColor: "#F5F5DC",
    slogan: "On le fait pour vous",
    description: "Vita Mora est une application de livraison et de réseau social adaptée au contexte malgache.",
    enableNotifications: true,
    enableSocialFeatures: true
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

  const fetchAdminData = async () => {
    setLoading(true);
    
    try {
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        if (profileData.role !== 'admin') {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits d'administrateur",
            variant: "destructive"
          });
          navigate('/home');
          return;
        }
        
        setUserData(profileData);
      }
      
      setStats({
        orders: 32,
        users: 128,
        partners: 17,
        revenue: 1800000
      });
      
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (usersError) throw usersError;
      setUsers(usersData || []);
      
      const { data: partnersData, error: partnersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'partner')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (partnersError) throw partnersError;
      setPartners(partnersData || []);
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          user:profiles(first_name, last_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
      
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

  const handleCreatePartner = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          phone: phone
        }
      });
      
      if (error) throw error;
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: 'partner',
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          address: address
        })
        .eq('id', data.user.id);
      
      if (profileError) throw profileError;
      
      toast({
        title: "Partenaire créé",
        description: `Le partenaire ${firstName} ${lastName} a été créé avec succès`,
      });
      
      fetchAdminData();
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de l'application ont été mis à jour",
    });
  };

  useEffect(() => {
    fetchAdminData();
  }, [user]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 text-vitamora-green">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-vitamora-green text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
              className="p-1"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold">Administration Vita Mora</h1>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-vitamora-green">Tableau de bord administrateur</h2>
            <div className="flex items-center gap-2">
              <UserCog className="text-vitamora-green" size={20} />
              <span className="font-medium">{userData?.first_name} {userData?.last_name}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <Package className="text-blue-600" size={24} />
              </div>
              <p className="font-semibold">{stats.orders}</p>
              <p className="text-sm text-gray-500">Commandes</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <Users className="text-green-600" size={24} />
              </div>
              <p className="font-semibold">{stats.users}</p>
              <p className="text-sm text-gray-500">Utilisateurs</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-orange-100 rounded-full p-3 mb-2">
                <Store className="text-orange-600" size={24} />
              </div>
              <p className="font-semibold">{stats.partners}</p>
              <p className="text-sm text-gray-500">Partenaires</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-3 mb-2">
                <CreditCard className="text-purple-600" size={24} />
              </div>
              <p className="font-semibold">{(stats.revenue / 1000).toFixed(1)}M Ar</p>
              <p className="text-sm text-gray-500">Revenus</p>
            </div>
          </div>
          
          <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="partners">Partenaires</TabsTrigger>
              <TabsTrigger value="mail">Messagerie</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-vitamora-green">Gestion des commandes</h3>
                  <Button variant="outline" size="sm" className="text-vitamora-green border-vitamora-green hover:bg-green-50">
                    Voir toutes les commandes
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">ID</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Client</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Montant</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Statut</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{order.id.substring(0, 8)}</td>
                            <td className="py-3 px-4 text-sm">{order.user?.first_name} {order.user?.last_name}</td>
                            <td className="py-3 px-4 text-sm">{order.total_amount} Ar</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipping' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                                order.status === 'preparing' ? 'bg-purple-100 text-purple-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {order.status === 'delivered' ? 'Livrée' :
                                 order.status === 'shipping' ? 'En livraison' :
                                 order.status === 'confirmed' ? 'Confirmée' :
                                 order.status === 'preparing' ? 'En préparation' :
                                 'Annulée'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <button className="text-vitamora-orange hover:underline">Détails</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            Aucune commande à afficher
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-vitamora-green">Gestion des utilisateurs</h3>
                  <Button variant="outline" size="sm" className="text-vitamora-green border-vitamora-green hover:bg-green-50">
                    Voir tous les utilisateurs
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Nom</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Téléphone</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date d'inscription</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{user.first_name} {user.last_name}</td>
                            <td className="py-3 px-4 text-sm">{user.email || 'Non renseigné'}</td>
                            <td className="py-3 px-4 text-sm">{user.phone || 'Non renseigné'}</td>
                            <td className="py-3 px-4 text-sm">{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                            <td className="py-3 px-4 text-sm">
                              <button className="text-vitamora-orange hover:underline mr-2">Éditer</button>
                              <button className="text-red-500 hover:underline">Désactiver</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            Aucun utilisateur à afficher
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="partners">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <PartnerInvitation />
                
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Nom</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Adresse</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Contact</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {partners.length > 0 ? (
                        partners.map((partner) => (
                          <tr key={partner.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{partner.first_name} {partner.last_name}</td>
                            <td className="py-3 px-4 text-sm">{partner.email || 'Non renseigné'}</td>
                            <td className="py-3 px-4 text-sm">{partner.address || 'Non renseigné'}</td>
                            <td className="py-3 px-4 text-sm">{partner.phone || 'Non renseigné'}</td>
                            <td className="py-3 px-4 text-sm">
                              <button className="text-vitamora-orange hover:underline mr-2">Éditer</button>
                              <button className="text-red-500 hover:underline">Supprimer</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            Aucun partenaire à afficher
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mail">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <MailConfiguration />
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <h3 className="font-semibold text-vitamora-green mb-4">Personnalisation de l'application</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Couleurs de l'application</h4>
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur principale</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-green rounded-full"></div>
                          <Input 
                            type="text" 
                            value={appSettings.primaryColor}
                            onChange={(e) => setAppSettings({...appSettings, primaryColor: e.target.value})}
                            className="w-24 h-8"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur secondaire</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-orange rounded-full"></div>
                          <Input 
                            type="text" 
                            value={appSettings.secondaryColor}
                            onChange={(e) => setAppSettings({...appSettings, secondaryColor: e.target.value})}
                            className="w-24 h-8"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur de fond</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-cream rounded-full"></div>
                          <Input 
                            type="text" 
                            value={appSettings.backgroundColor}
                            onChange={(e) => setAppSettings({...appSettings, backgroundColor: e.target.value})}
                            className="w-24 h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Logo de l'application</h4>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Palette size={32} className="text-gray-400" />
                      </div>
                      <Button className="bg-vitamora-green hover:bg-vitamora-green/90">
                        Modifier le logo
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Textes de l'application</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Slogan</label>
                        <Input 
                          value={appSettings.slogan}
                          onChange={(e) => setAppSettings({...appSettings, slogan: e.target.value})}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Description</label>
                        <Textarea 
                          value={appSettings.description}
                          onChange={(e) => setAppSettings({...appSettings, description: e.target.value})}
                          className="w-full h-20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fonctionnalités</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-gray-500">Activer les notifications push</p>
                        </div>
                        <Switch 
                          checked={appSettings.enableNotifications}
                          onCheckedChange={(checked) => setAppSettings({...appSettings, enableNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Fonctionnalités sociales</p>
                          <p className="text-sm text-gray-500">Activer les publications et interactions</p>
                        </div>
                        <Switch 
                          checked={appSettings.enableSocialFeatures}
                          onCheckedChange={(checked) => setAppSettings({...appSettings, enableSocialFeatures: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleSaveSettings}
                      className="bg-vitamora-orange hover:bg-vitamora-orange/90 flex items-center gap-2"
                    >
                      <Save size={16} />
                      <span>Sauvegarder les modifications</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
