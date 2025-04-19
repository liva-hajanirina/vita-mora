import { supabase } from "@/integrations/supabase/client";
import type { Profile } from '@/utils/profileService';

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: Profile;
  user_id: string;
}

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const { data, error } = await supabase
      .from('social_comments' as any)
      .select(`
        id,
        content,
        created_at,
        user_id,
        user:profiles(*)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
      return [];
    }

    return data as unknown as Comment[];
  } catch (error) {
    console.error('Erreur inattendue lors du chargement des commentaires:', error);
    return [];
  }
};

export const addComment = async (postId: string, userId: string, content: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('social_comments')
      .insert({ 
        post_id: postId, 
        user_id: userId,
        content
      });

    if (error) throw error;

    // Update comments count using a typed RPC call
    await supabase
      .from('social_posts')
      .update({ 
        comments_count: supabase.rpc('increment', { 
          x: 1 
        }) 
      } as any)
      .eq('id', postId);

    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    return { success: false, error: error.message };
  }
};

export const deleteComment = async (commentId: string, postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('social_comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId);

    if (error) throw error;

    // Update comments count using a typed RPC call
    await supabase
      .from('social_posts')
      .update({ 
        comments_count: supabase.rpc('increment', { 
          x: -1 
        }) 
      } as any)
      .eq('id', postId);

    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    return { success: false, error: error.message };
  }
};
