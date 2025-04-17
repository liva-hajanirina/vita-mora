
import React from 'react';
import { Plus } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SocialPost from '@/components/SocialPost';

const Social = () => {
  const posts = [
    {
      id: 1,
      username: "Sophie Rakoto",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      time: "Il y a 20 minutes",
      content: "Je viens de recevoir ma commande de Pizza Express. Livraison rapide et pizza délicieuse comme toujours! 😋🍕",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=828&q=80",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      username: "Jean Andria",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "Il y a 2 heures",
      content: "Vita Mora vient de me livrer mes médicaments en 30 minutes seulement. Service impeccable! Merci l'équipe 👏",
      likes: 18,
      comments: 3
    },
    {
      id: 3,
      username: "Pharmacie Centrale",
      avatar: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      time: "Il y a 5 heures",
      content: "Nous sommes ravis d'annoncer notre partenariat avec Vita Mora! Vous pouvez désormais commander vos médicaments et les recevoir directement chez vous.",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80",
      likes: 42,
      comments: 7
    }
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Fil d'actualité" />
      
      <div className="vitamora-container">
        <div className="sticky top-16 z-10 bg-gray-50 pb-2">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="Your avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-gray-500">
                Quoi de neuf?
              </div>
            </div>
            <div className="flex justify-around mt-3 pt-2 border-t border-gray-100">
              <button className="flex items-center text-gray-500 gap-1">
                📷 Photo
              </button>
              <button className="flex items-center text-gray-500 gap-1">
                🎬 Vidéo
              </button>
              <button className="flex items-center text-gray-500 gap-1">
                😊 Feeling
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <SocialPost 
              key={post.id}
              username={post.username}
              avatar={post.avatar}
              time={post.time}
              content={post.content}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
      
      <button className="fixed right-6 bottom-20 bg-vitamora-orange text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-colors">
        <Plus size={24} />
      </button>
      
      <BottomNavigation />
    </div>
  );
};

export default Social;
