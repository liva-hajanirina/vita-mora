
import React, { useState } from 'react';
import { ArrowLeft, Users, Package, Store, CreditCard, Palette, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("orders");

  const handleLogout = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-vitamora-green text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
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
          <h2 className="text-xl font-bold text-vitamora-green mb-4">Tableau de bord administrateur</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <Package className="text-blue-600" size={24} />
              </div>
              <p className="font-semibold">32</p>
              <p className="text-sm text-gray-500">Commandes</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <Users className="text-green-600" size={24} />
              </div>
              <p className="font-semibold">128</p>
              <p className="text-sm text-gray-500">Utilisateurs</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-orange-100 rounded-full p-3 mb-2">
                <Store className="text-orange-600" size={24} />
              </div>
              <p className="font-semibold">17</p>
              <p className="text-sm text-gray-500">Partenaires</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-3 mb-2">
                <CreditCard className="text-purple-600" size={24} />
              </div>
              <p className="font-semibold">1.8M Ar</p>
              <p className="text-sm text-gray-500">Revenus</p>
            </div>
          </div>
          
          <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="orders">Commandes</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="partners">Partenaires</TabsTrigger>
              <TabsTrigger value="settings">Personnalisation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <h3 className="font-semibold text-vitamora-green mb-4">Gestion des commandes</h3>
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
                    {[
                      { id: "VM2304", client: "Sophie Rakoto", amount: "35000 Ar", status: "En livraison" },
                      { id: "VM2303", client: "Jean Andria", amount: "12500 Ar", status: "Confirmée" },
                      { id: "VM2302", client: "Marie Ravalison", amount: "28000 Ar", status: "En préparation" },
                      { id: "VM2301", client: "Eric Ramanantsoa", amount: "45000 Ar", status: "Livrée" },
                      { id: "VM2300", client: "Nathalie Rakotoson", amount: "20000 Ar", status: "Annulée" }
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{order.id}</td>
                        <td className="py-3 px-4 text-sm">{order.client}</td>
                        <td className="py-3 px-4 text-sm">{order.amount}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Livrée' ? 'bg-green-100 text-green-700' :
                            order.status === 'En livraison' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Confirmée' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'En préparation' ? 'bg-purple-100 text-purple-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-vitamora-orange hover:underline">Détails</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <h3 className="font-semibold text-vitamora-green mb-4">Gestion des utilisateurs</h3>
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
                    {[
                      { name: "Sophie Rakoto", email: "sophie.r@gmail.com", phone: "+261 34 12 345 67", joined: "12/04/2025" },
                      { name: "Jean Andria", email: "jean.a@gmail.com", phone: "+261 33 87 654 32", joined: "10/04/2025" },
                      { name: "Marie Ravalison", email: "marie.r@gmail.com", phone: "+261 32 11 223 44", joined: "08/04/2025" },
                      { name: "Eric Ramanantsoa", email: "eric.r@gmail.com", phone: "+261 34 56 789 01", joined: "05/04/2025" },
                      { name: "Nathalie Rakotoson", email: "nathalie.r@gmail.com", phone: "+261 33 12 345 67", joined: "01/04/2025" }
                    ].map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{user.name}</td>
                        <td className="py-3 px-4 text-sm">{user.email}</td>
                        <td className="py-3 px-4 text-sm">{user.phone}</td>
                        <td className="py-3 px-4 text-sm">{user.joined}</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-vitamora-orange hover:underline mr-2">Éditer</button>
                          <button className="text-red-500 hover:underline">Désactiver</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="partners">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <h3 className="font-semibold text-vitamora-green mb-4">Gestion des partenaires</h3>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Nom</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Adresse</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Contact</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: "Restaurant Délices", type: "Restaurant", address: "Analakely, Antananarivo", contact: "+261 34 12 345 67" },
                      { name: "Supermarché Score", type: "Supermarché", address: "Ankorondrano, Antananarivo", contact: "+261 33 87 654 32" },
                      { name: "Marché d'Analakely", type: "Marché local", address: "Analakely, Antananarivo", contact: "+261 32 11 223 44" },
                      { name: "Pharmacie Centrale", type: "Pharmacie", address: "Behoririka, Antananarivo", contact: "+261 34 56 789 01" },
                      { name: "Cave à Vins", type: "Apéritifs", address: "Ivandry, Antananarivo", contact: "+261 33 12 345 67" }
                    ].map((partner, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{partner.name}</td>
                        <td className="py-3 px-4 text-sm">{partner.type}</td>
                        <td className="py-3 px-4 text-sm">{partner.address}</td>
                        <td className="py-3 px-4 text-sm">{partner.contact}</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-vitamora-orange hover:underline mr-2">Éditer</button>
                          <button className="text-red-500 hover:underline">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white rounded-lg border p-4 h-96 overflow-y-auto">
                <h3 className="font-semibold text-vitamora-green mb-4">Personnalisation de l'application</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Couleurs de l'application</h4>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur principale</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-green rounded-full"></div>
                          <input type="text" value="#34D399" className="text-sm border rounded p-1 w-24" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur secondaire</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-orange rounded-full"></div>
                          <input type="text" value="#F59E0B" className="text-sm border rounded p-1 w-24" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Couleur de fond</label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-vitamora-cream rounded-full"></div>
                          <input type="text" value="#F5F5DC" className="text-sm border rounded p-1 w-24" />
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
                      <button className="px-4 py-2 bg-vitamora-green text-white rounded-lg">
                        Modifier le logo
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Textes de l'application</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Slogan</label>
                        <input 
                          type="text" 
                          value="On le fait pour vous"
                          className="w-full text-sm border rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Description</label>
                        <textarea 
                          className="w-full text-sm border rounded p-2 h-20"
                          defaultValue="Vita Mora est une application de livraison et de réseau social adaptée au contexte malgache."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button className="px-4 py-2 bg-vitamora-orange text-white rounded-lg">
                      Sauvegarder les modifications
                    </button>
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
