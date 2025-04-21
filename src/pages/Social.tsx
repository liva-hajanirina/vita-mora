
import React, { useEffect, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SocialPost from '@/components/SocialPost';
import CreatePost from '@/components/CreatePost';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface Post {
  id: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image_url?: string;
  };
}

const Social = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select(`
          *,
          user:profiles(id, first_name, last_name, profile_image_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      console.log("Posts récupérés:", data);
      setPosts(data as unknown as Post[]);
    } catch (error: any) {
      console.error('Erreur lors du chargement des publications:', error.message);
      toast.error("Impossible de charger les publications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to new posts
    const channel = supabase
      .channel('social_posts_changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'social_posts' 
      }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Fil d'actualité" />
      
      <div className="vitamora-container">
        <div className="sticky top-16 z-10 bg-gray-50 pb-2">
          {!showCreatePost ? (
            <Button
              onClick={() => setShowCreatePost(true)}
              className="w-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-700 mb-4 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              <span>Créer une publication</span>
            </Button>
          ) : (
            <CreatePost onSuccess={() => {
              setShowCreatePost(false);
              fetchPosts();
              toast.success("Publication créée avec succès!");
            }} />
          )}
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800">Publications récentes</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchPosts}
              disabled={loading}
              className="text-vitamora-orange hover:text-vitamora-orange/90 hover:bg-orange-50"
            >
              {loading ? <Spinner className="h-4 w-4 mr-2" /> : <RefreshCw size={16} />}
              <span className="ml-1">Actualiser</span>
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <SocialPost
                key={post.id}
                username={`${post.user?.first_name || 'Utilisateur'} ${post.user?.last_name || ''}`}
                avatar={post.user?.profile_image_url || `https://ui-avatars.com/api/?name=${post.user?.first_name || 'U'}+${post.user?.last_name || ''}`}
                time={new Date(post.created_at).toLocaleString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                content={post.content}
                image={post.image_url}
                likes={post.likes_count || 0}
                comments={post.comments_count || 0}
                postId={post.id}
                userId={user?.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">Aucune publication pour le moment</p>
            <p className="text-sm text-gray-400 mt-1">Soyez le premier à partager quelque chose!</p>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => setShowCreatePost(true)}
        className="fixed right-6 bottom-20 bg-vitamora-orange text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-colors"
      >
        <Plus size={24} />
      </button>
      
      <BottomNavigation />
    </div>
  );
};

export default Social;
