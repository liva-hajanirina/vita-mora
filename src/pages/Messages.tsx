
import React from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import MessageItem from '@/components/MessageItem';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  
  const conversations = [
    {
      id: 1,
      username: "Sophie Rakoto",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      lastMessage: "Super! Merci pour la livraison rapide.",
      time: "12:30",
      unread: true
    },
    {
      id: 2,
      username: "Restaurant Délices",
      avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      lastMessage: "Votre commande est en préparation",
      time: "Hier",
      unread: false
    },
    {
      id: 3,
      username: "Jean Andria",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Bonjour, est-ce que vous livrez à Ambohidratrimo?",
      time: "Lun",
      unread: false
    },
    {
      id: 4,
      username: "Pharmacie Centrale",
      avatar: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      lastMessage: "Vos médicaments sont disponibles, nous pouvons...",
      time: "Dim",
      unread: false
    },
    {
      id: 5,
      username: "Vita Mora Support",
      avatar: "/lovable-uploads/bc808ae3-9ea0-4640-911c-9aaf202c8ed1.png",
      lastMessage: "Comment pouvons-nous vous aider aujourd'hui?",
      time: "28/03",
      unread: false
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Messages" />
      
      <div className="vitamora-container">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Rechercher dans les messages..."
            className="w-full p-3 pr-10 rounded-lg border border-gray-200 focus:border-vitamora-orange focus:ring-1 focus:ring-vitamora-orange outline-none"
          />
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {conversations.map((conversation) => (
            <MessageItem 
              key={conversation.id}
              username={conversation.username}
              avatar={conversation.avatar}
              lastMessage={conversation.lastMessage}
              time={conversation.time}
              unread={conversation.unread}
              onClick={() => navigate(`/messages/${conversation.id}`)}
            />
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Messages;
