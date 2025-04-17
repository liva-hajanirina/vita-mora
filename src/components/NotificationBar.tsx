
import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface NotificationBarProps {
  count?: number;
  onClick?: () => void;
}

const NotificationBar: React.FC<NotificationBarProps> = ({
  count = 0,
  onClick = () => {},
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          onClick={onClick}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell className="text-vitamora-green" size={24} />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-vitamora-orange text-white text-xs px-1.5 min-w-5 h-5 flex items-center justify-center">
              {count > 99 ? '99+' : count}
            </Badge>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Notifications</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NotificationBar;
