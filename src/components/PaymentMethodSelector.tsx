
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export type PaymentMethod = 'mvola' | 'orange-money' | 'credit-card';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onChange
}) => {
  const paymentMethods = [
    {
      id: 'mvola',
      name: 'MVola',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/MVola_logo.svg/1200px-MVola_logo.svg.png',
      description: 'Paiement sécurisé via MVola'
    },
    {
      id: 'orange-money',
      name: 'Orange Money',
      logo: 'https://www.orange.mg/sites/orangemg/files/styles/visual_desktop/public/2021-11/orange-money-logo-new_3.png',
      description: 'Paiement rapide avec Orange Money'
    },
    {
      id: 'credit-card',
      name: 'Carte bancaire',
      logo: 'https://www.visa.fr/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg',
      description: 'Paiement par Visa, Mastercard, etc.'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-vitamora-green mb-2">Méthode de paiement</h3>
      
      {paymentMethods.map((method) => (
        <div 
          key={method.id}
          className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
            selectedMethod === method.id 
              ? 'border-vitamora-orange bg-orange-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onChange(method.id as PaymentMethod)}
        >
          <div className="w-12 h-12 flex-shrink-0 mr-3">
            <img 
              src={method.logo} 
              alt={method.name} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-grow">
            <h4 className="font-medium">{method.name}</h4>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
          
          {selectedMethod === method.id && (
            <div className="ml-3 text-vitamora-orange">
              <CheckCircle2 size={22} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
