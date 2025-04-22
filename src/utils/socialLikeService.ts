
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

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
      
      // First get the current like count
      const { data: postData, error: getError } = await supabase
        .from('social_posts')
        .select('likes_count')
        .eq('id', postId)
        .single();
      
      if (getError) throw getError;
      
      // Then update the like counter
      const newCount = Math.max(0, (postData?.likes_count || 0) - 1);
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: newCount })
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
      
      // First get the current like count
      const { data: postData, error: getError } = await supabase
        .from('social_posts')
        .select('likes_count')
        .eq('id', postId)
        .single();
      
      if (getError) throw getError;
      
      // Then update the like counter
      const newCount = (postData?.likes_count || 0) + 1;
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: newCount })
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
