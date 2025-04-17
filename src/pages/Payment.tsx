
import React, { useState } from 'react';
import { Check, ChevronLeft, CreditCard, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  fields: Array<{
    id: string;
    label: string;
    type: string;
    placeholder: string;
  }>;
}

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("mvola");
  const [loading, setLoading] = useState(false);
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: "mvola",
      name: "MVola",
      icon: Phone,
      color: "bg-orange-100 text-orange-500",
      fields: [
        {
          id: "phone",
          label: "Numéro de téléphone",
          type: "tel",
          placeholder: "034 XX XXX XX"
        }
      ]
    },
    {
      id: "orange_money",
      name: "Orange Money",
      icon: Phone,
      color: "bg-orange-100 text-orange-500",
      fields: [
        {
          id: "phone",
          label: "Numéro de téléphone",
          type: "tel",
          placeholder: "032 XX XXX XX"
        }
      ]
    },
    {
      id: "credit_card",
      name: "Carte bancaire",
      icon: CreditCard,
      color: "bg-blue-100 text-blue-500",
      fields: [
        {
          id: "card_number",
          label: "Numéro de carte",
          type: "text",
          placeholder: "XXXX XXXX XXXX XXXX"
        },
        {
          id: "expiry",
          label: "Date d'expiration",
          type: "text",
          placeholder: "MM/AA"
        },
        {
          id: "cvv",
          label: "CVV",
          type: "text",
          placeholder: "XXX"
        }
      ]
    }
  ];
  
  const currentMethod = paymentMethods.find(method => method.id === selectedMethod);
  
  const handlePayment = () => {
    setLoading(true);
    
    // Simuler un paiement
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Paiement réussi",
        description: "Votre commande a été confirmée avec succès!",
      });
      
      navigate('/orders');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-white p-4 shadow-sm flex items-center">
        <button 
          onClick={() => navigate('/cart')}
          className="p-1"
        >
          <ChevronLeft size={24} className="text-vitamora-green" />
        </button>
        <h1 className="text-xl font-bold text-vitamora-green ml-2">Paiement</h1>
      </header>
      
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-vitamora-green flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <span className="ml-2 font-medium text-vitamora-green">Panier</span>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-vitamora-orange flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <span className="ml-2 font-medium text-vitamora-orange">Paiement</span>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold">
              3
            </div>
            <span className="ml-2 text-gray-500">Confirmation</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-semibold text-vitamora-green mb-4">Choisissez votre méthode de paiement</h2>
          
          <RadioGroup defaultValue={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id} className="flex items-center cursor-pointer">
                  <div className={`w-10 h-10 rounded-full ${method.color} flex items-center justify-center mr-3`}>
                    <method.icon size={20} />
                  </div>
                  <span>{method.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {currentMethod && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="font-semibold text-vitamora-green mb-4">Détails de paiement - {currentMethod.name}</h2>
            
            {currentMethod.fields.map((field) => (
              <div key={field.id} className="mb-4 last:mb-0">
                <Label htmlFor={field.id} className="block mb-1">{field.label}</Label>
                <Input 
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-semibold text-vitamora-green mb-4">Résumé de la commande</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span>35 000 Ar</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              <span>5 000 Ar</span>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>40 000 Ar</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-vitamora-orange hover:bg-vitamora-orange/90 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Traitement en cours..." : "Confirmer le paiement"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
