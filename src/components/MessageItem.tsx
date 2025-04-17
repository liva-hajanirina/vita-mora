
import React from 'react';

interface MessageItemProps {
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  onClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  username, 
  avatar, 
  lastMessage, 
  time, 
  unread = false,
  onClick = () => {} 
}) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
    >
      <div className="relative">
        <img src={avatar} alt={username} className="w-12 h-12 rounded-full object-cover" />
        {unread && (
          <span className="absolute top-0 right-0 bg-vitamora-orange h-3 w-3 rounded-full border-2 border-white"></span>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <h4 className={`font-semibold ${unread ? 'text-vitamora-green' : 'text-gray-700'}`}>{username}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className={`text-sm truncate ${unread ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
