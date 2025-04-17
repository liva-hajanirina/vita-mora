
import React, { useState } from 'react';
import { Minus, Plus, MapPin, Clock, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Pizza Margherita",
      price: 25000,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quantity: 1
    },
    {
      id: 3,
      title: "Coca-Cola (33cl)",
      price: 5000,
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      quantity: 2
    }
  ]);
  
  const [deliveryAddress, setDeliveryAddress] = useState("123 Rue Analakely, Antananarivo");
  const [deliveryTime, setDeliveryTime] = useState("Dès que possible");
  
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé de votre panier",
    });
  };
  
  const handleCheckout = () => {
    navigate('/payment');
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const deliveryFee = 5000;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Panier" showCart={false} />
      
      <div className="vitamora-container">
        {cartItems.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="font-semibold text-vitamora-green mb-4">Articles ({cartItems.length})</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-vitamora-orange font-semibold mt-1">
                        {item.price.toLocaleString()} Ar
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="font-semibold text-vitamora-green mb-4">Détails de livraison</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin size={20} className="text-vitamora-orange mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Adresse de livraison</h3>
                    <p className="text-sm text-gray-600">{deliveryAddress}</p>
                    <button className="text-vitamora-green text-sm font-medium mt-1">
                      Modifier
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="text-vitamora-orange mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Heure de livraison</h3>
                    <p className="text-sm text-gray-600">{deliveryTime}</p>
                    <button className="text-vitamora-green text-sm font-medium mt-1">
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="font-semibold text-vitamora-green mb-4">Résumé de la commande</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison</span>
                  <span>{deliveryFee.toLocaleString()} Ar</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>Total</span>
                    <span>{total.toLocaleString()} Ar</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-vitamora-orange hover:bg-vitamora-orange/90 text-white py-3 rounded-lg font-semibold"
            >
              Passer à la caisse
            </Button>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Ajoutez des articles à votre panier pour passer une commande</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-vitamora-green hover:bg-vitamora-green/90 text-white"
            >
              Explorer les produits
            </Button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Cart;
