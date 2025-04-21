
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
    // Using a raw query to work around TypeScript limitations
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
    // First, get the current comments count
    const { data: postData, error: postError } = await supabase
      .from('social_posts')
      .select('comments_count')
      .eq('id', postId)
      .single();
    
    if (postError) throw postError;
    
    const currentCount = postData.comments_count || 0;
    
    // Add the comment using a raw query to work around TypeScript limitations
    const { error } = await supabase
      .from('social_comments' as any)
      .insert({ 
        post_id: postId, 
        user_id: userId,
        content
      });

    if (error) throw error;

    // Update comments count by directly setting the new value
    await supabase
      .from('social_posts')
      .update({ comments_count: currentCount + 1 })
      .eq('id', postId);

    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    return { success: false, error: error.message };
  }
};

export const deleteComment = async (commentId: string, postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // First, get the current comments count
    const { data: postData, error: postError } = await supabase
      .from('social_posts')
      .select('comments_count')
      .eq('id', postId)
      .single();
    
    if (postError) throw postError;
    
    const currentCount = postData.comments_count || 0;
    
    // Delete the comment using a raw query to work around TypeScript limitations
    const { error } = await supabase
      .from('social_comments' as any)
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId);

    if (error) throw error;

    // Update comments count by directly setting the new value
    await supabase
      .from('social_posts')
      .update({ comments_count: Math.max(0, currentCount - 1) })
      .eq('id', postId);

    return { success: true };
  } catch (error: any) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    return { success: false, error: error.message };
  }
};
