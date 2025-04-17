
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Paperclip, Smile } from 'lucide-react';
import Header from '@/components/Header';

const Conversation = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Données simulées pour la conversation
  const conversation = {
    id: id,
    user: {
      id: 1,
      name: 'Sophie Rakoto',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'Bonjour, j\'ai une question concernant ma commande récente.',
        time: '14:30'
      },
      {
        id: 2,
        sender: 'me',
        text: 'Bonjour Sophie ! Bien sûr, comment puis-je vous aider ?',
        time: '14:32'
      },
      {
        id: 3,
        sender: 'user',
        text: 'Je n\'ai pas reçu le dessert qui était censé être inclus dans ma commande.',
        time: '14:33'
      },
      {
        id: 4,
        sender: 'me',
        text: 'Je suis désolé pour ce désagrément. Pouvez-vous me donner le numéro de votre commande, s\'il vous plaît?',
        time: '14:35'
      },
      {
        id: 5,
        sender: 'user',
        text: 'Oui, c\'est VM2304.',
        time: '14:36'
      }
    ]
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Dans une application réelle, nous enverrions ce message à un backend
      console.log(`Envoi du message: ${message}`);
      setMessage('');
    }
  };

  // Faire défiler automatiquement vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        title={conversation.user.name} 
        showLogo={false}
        showNotification={false}
      />
      
      <div className="flex-grow overflow-y-auto p-4 pb-20">
        <div className="space-y-4">
          {conversation.messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'user' && (
                <img 
                  src={conversation.user.avatar} 
                  alt={conversation.user.name} 
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              
              <div 
                className={`max-w-[75%] rounded-t-lg ${
                  msg.sender === 'me' 
                    ? 'bg-vitamora-green text-white rounded-bl-lg' 
                    : 'bg-white text-gray-800 rounded-br-lg shadow-sm'
                } p-3`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
        <form onSubmit={sendMessage} className="flex items-center gap-2">
          <button 
            type="button" 
            className="p-2 text-gray-500 hover:text-vitamora-green"
          >
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-grow bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-vitamora-green"
          />
          
          <button 
            type="button" 
            className="p-2 text-gray-500 hover:text-vitamora-green"
          >
            <Smile size={20} />
          </button>
          
          <button 
            type="submit" 
            className={`p-2 rounded-full ${
              message.trim() ? 'bg-vitamora-green text-white' : 'bg-gray-200 text-gray-400'
            }`}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
