
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, MapPin, CreditCard, Phone, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from "@/hooks/use-toast";

// Statut de commande avec leur couleur associée
const orderStatusMap = {
  pending: { label: 'En attente', color: 'bg-yellow-500' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-500' },
  preparing: { label: 'En préparation', color: 'bg-blue-500' },
  delivering: { label: 'En livraison', color: 'bg-vitamora-orange' },
  delivered: { label: 'Livrée', color: 'bg-green-500' }
};

// Type pour le statut de commande
type OrderStatus = keyof typeof orderStatusMap;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // État simulé d'une commande pour la démo
  const [order] = useState({
    id: id || 'VM2304',
    date: '17 Avril 2025, 14:30',
    status: 'delivering' as OrderStatus,
    deliveryAddress: '123 Rue Principale, Antananarivo',
    paymentMethod: 'MVola',
    items: [
      { name: 'Pizza Margherita', price: 25000, quantity: 1 },
      { name: 'Coca-Cola (33cl)', price: 5000, quantity: 2 }
    ],
    deliveryFee: 5000,
    total: 35000,
    trackingURL: '#',
    deliveryPerson: {
      name: 'Rabe Jean',
      phone: '+261 34 12 345 67',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg'
    }
  });

  // Calcul du sous-total (sans frais de livraison)
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleContactDelivery = () => {
    toast({
      title: "Contact livreur",
      description: `Appel à ${order.deliveryPerson.name}...`,
    });
  };

  const handleTrackOrder = () => {
    toast({
      title: "Suivi de commande",
      description: "Ouverture de la carte de suivi...",
    });
  };

  return (
    <div className="min-h-screen pb-6 bg-gray-50">
      <Header title={`Commande #${order.id}`} />
      
      <div className="vitamora-container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg text-vitamora-green">Détails de la commande</h2>
              <div className={`px-3 py-1 rounded-full text-white text-sm ${orderStatusMap[order.status].color}`}>
                {orderStatusMap[order.status].label}
              </div>
            </div>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          
          {/* Étapes de la commande */}
          <div className="p-4 bg-gray-50">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-3">
                ✓
              </div>
              <div>
                <p className="font-medium">Commande confirmée</p>
                <p className="text-xs text-gray-500">14:30</p>
              </div>
            </div>
            <div className="ml-3 w-0.5 h-4 bg-gray-300 my-1"></div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-3">
                ✓
              </div>
              <div>
                <p className="font-medium">Préparation</p>
                <p className="text-xs text-gray-500">14:45</p>
              </div>
            </div>
            <div className="ml-3 w-0.5 h-4 bg-gray-300 my-1"></div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-vitamora-orange flex items-center justify-center text-white text-xs mr-3">
                <Clock size={14} />
              </div>
              <div>
                <p className="font-medium">En livraison</p>
                <p className="text-xs text-gray-500">Estimation: 15:15</p>
              </div>
            </div>
          </div>
          
          {/* Informations de livraison */}
          {order.status === 'delivering' && (
            <div className="p-4 border-t border-gray-100">
              <h3 className="font-medium text-vitamora-green mb-3">Livreur</h3>
              <div className="flex items-center">
                <img 
                  src={order.deliveryPerson.photo} 
                  alt={order.deliveryPerson.name} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-grow">
                  <p className="font-medium">{order.deliveryPerson.name}</p>
                  <p className="text-sm text-gray-500">{order.deliveryPerson.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleContactDelivery}
                    className="p-2 bg-green-100 text-green-600 rounded-full"
                  >
                    <Phone size={20} />
                  </button>
                  <button 
                    onClick={handleContactDelivery}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleTrackOrder}
                className="w-full mt-3 bg-vitamora-green text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                <MapPin size={18} />
                <span>Suivre la livraison</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Détails de livraison et paiement */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-start mb-4">
            <MapPin className="text-vitamora-green mt-1 mr-3" size={20} />
            <div>
              <h3 className="font-medium">Adresse de livraison</h3>
              <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CreditCard className="text-vitamora-green mt-1 mr-3" size={20} />
            <div>
              <h3 className="font-medium">Méthode de paiement</h3>
              <p className="text-sm text-gray-600">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
        
        {/* Articles commandés */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-bold mb-3">Articles commandés</h3>
          
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
              </div>
              <p className="font-medium">{(item.price * item.quantity).toLocaleString()} Ar</p>
            </div>
          ))}
        </div>
        
        {/* Résumé des coûts */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold mb-3">Résumé</h3>
          
          <div className="flex justify-between py-2">
            <p className="text-gray-600">Sous-total</p>
            <p>{subtotal.toLocaleString()} Ar</p>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <p className="text-gray-600">Frais de livraison</p>
            <p>{order.deliveryFee.toLocaleString()} Ar</p>
          </div>
          
          <div className="flex justify-between py-3 font-bold">
            <p>Total</p>
            <p className="text-vitamora-orange">{order.total.toLocaleString()} Ar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
