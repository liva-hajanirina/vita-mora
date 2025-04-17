
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import OrderItem from '@/components/OrderItem';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  
  const currentOrders = [
    {
      id: "VM2304",
      date: "Aujourd'hui, 14:30",
      items: ["Pizza Margherita", "Coca-Cola"],
      status: "delivering" as const,
      total: 35000
    },
    {
      id: "VM2303",
      date: "Aujourd'hui, 10:15",
      items: ["Paracétamol", "Vitamine C"],
      status: "confirmed" as const,
      total: 12500
    }
  ];
  
  const orderHistory = [
    {
      id: "VM2298",
      date: "Hier, 18:45",
      items: ["Riz 5kg", "Huile", "Tomates"],
      status: "delivered" as const,
      total: 42000
    },
    {
      id: "VM2285",
      date: "12/04/2025",
      items: ["Combo Apéro: Bière et Amuse-bouches"],
      status: "delivered" as const,
      total: 28000
    },
    {
      id: "VM2274",
      date: "08/04/2025",
      items: ["Poulet rôti", "Frites"],
      status: "delivered" as const,
      total: 30000
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Mes commandes" />
      
      <div className="vitamora-container">
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'current' 
                ? 'bg-white text-vitamora-green font-medium shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-md text-center transition-colors ${
              activeTab === 'history' 
                ? 'bg-white text-vitamora-green font-medium shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            Historique
          </button>
        </div>
        
        {activeTab === 'current' ? (
          <div className="space-y-4">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <div key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
                  <OrderItem {...order} />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Vous n'avez aucune commande en cours</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orderHistory.length > 0 ? (
              orderHistory.map((order) => (
                <div key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
                  <OrderItem {...order} />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Votre historique de commandes est vide</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Orders;
