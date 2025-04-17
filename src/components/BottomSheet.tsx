
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: 'sm' | 'md' | 'lg' | 'full';
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height = 'md'
}) => {
  const [isClosing, setIsClosing] = useState(false);
  
  // Prévenir le scrolling de la page quand le bottom sheet est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };
  
  if (!isOpen && !isClosing) return null;
  
  const getHeightClass = () => {
    switch (height) {
      case 'sm': return 'h-1/4';
      case 'md': return 'h-1/2';
      case 'lg': return 'h-3/4';
      case 'full': return 'h-full';
      default: return 'h-1/2';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-50'
        }`}
        onClick={handleClose}
      ></div>
      
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl ${getHeightClass()} transition-transform duration-300 ease-in-out transform ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        } flex flex-col`}
      >
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="w-8"></div>
          <div className="flex-1 text-center">
            {title && <h3 className="font-semibold text-lg text-vitamora-green">{title}</h3>}
          </div>
          <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
