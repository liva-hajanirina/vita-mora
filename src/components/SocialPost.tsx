
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SocialPostProps {
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  postId: string;
  userId?: string;
}

const SocialPost: React.FC<SocialPostProps> = ({ 
  username, 
  avatar, 
  time, 
  content, 
  image,
  likes,
  comments,
  postId,
  userId
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const toggleLike = async () => {
    if (!userId) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour aimer cette publication",
        variant: "destructive"
      });
      return;
    }

    try {
      if (liked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
      
      // Update like count in database
      await supabase
        .from('social_posts')
        .update({ likes_count: liked ? likeCount - 1 : likeCount + 1 })
        .eq('id', postId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des likes:', error);
      // Revert UI state if API call fails
      setLiked(!liked);
      setLikeCount(liked ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleDeletePost = async () => {
    try {
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Publication supprimée",
        description: "Votre publication a été supprimée avec succès",
      });

      // The post will be removed from the list in the parent component
      // through the real-time subscription
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la suppression: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  // Check if the current user is the author of the post
  const isAuthor = userId && postId.startsWith(userId);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={username} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 className="font-bold text-vitamora-green">{username}</h4>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1">
                <MoreHorizontal size={20} className="text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <p className="my-2 whitespace-pre-line">{content}</p>
      
      {image && (
        <div className="my-3 rounded-lg overflow-hidden">
          <img src={image} alt="Publication" className="w-full h-auto" />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={toggleLike}
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>
        
        <button className="flex items-center gap-1 text-gray-500">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </button>
        
        <button className="flex items-center gap-1 text-gray-500">
          <Share2 size={20} />
          <span>Partager</span>
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cette publication sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SocialPost;
