
import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type StatusType = 'success' | 'error' | 'info' | 'warning';

interface StatusMessageProps {
  type: StatusType;
  message: string;
  details?: string;
  onClose?: () => void;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  details,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-amber-500" size={20} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'info':
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getBgColor()} flex items-start mb-4`}>
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{message}</h3>
        {details && <p className="text-sm text-gray-600 mt-1">{details}</p>}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
