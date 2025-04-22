
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type SocialLike = Database['public']['Tables']['social_likes']['Row'];

export const toggleSocialLike = async (postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if post is already liked
    const { data: existingLike, error: checkError } = await supabase
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingLike) {
      // Delete existing like
      const { error: deleteError } = await supabase
        .from('social_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;
      
      // Update like counter with direct update since RPC has type issues
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: supabase.from('social_posts').select('likes_count').eq('id', postId).single().then(r => Math.max(0, (r.data?.likes_count || 0) - 1)) })
        .eq('id', postId);
      
      if (updateError) throw updateError;
      
      return { success: true };
    } else {
      // Add like
      const { error: insertError } = await supabase
        .from('social_likes')
        .insert({ 
          post_id: postId, 
          user_id: userId 
        });

      if (insertError) throw insertError;
      
      // Update like counter with direct update since RPC has type issues
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: supabase.from('social_posts').select('likes_count').eq('id', postId).single().then(r => (r.data?.likes_count || 0) + 1) })
        .eq('id', postId);
      
      if (updateError) throw updateError;
      
      return { success: true };
    }
  } catch (error: any) {
    console.error('Error handling likes:', error);
    return { success: false, error: error.message };
  }
};

export const checkIsLiked = async (postId: string, userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Erreur lors de la vérification du like:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Erreur lors de la vérification du like:', error);
    return false;
  }
};
