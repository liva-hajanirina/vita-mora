
import { supabase } from "@/integrations/supabase/client";

export const toggleSocialLike = async (postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Vérifier si le post est déjà liké
    const { data: existingLike } = await supabase
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Supprimer le like
      const { error } = await supabase
        .from('social_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
      
      // Mettre à jour le compteur de likes
      const { data: postData } = await supabase
        .from('social_posts')
        .select('likes_count')
        .eq('id', postId)
        .single();
        
      const currentLikes = postData?.likes_count || 0;
      
      await supabase
        .from('social_posts')
        .update({ likes_count: Math.max(0, currentLikes - 1) })
        .eq('id', postId);
        
      return { success: true };
    } else {
      // Ajouter le like
      const { error } = await supabase
        .from('social_likes')
        .insert({ 
          post_id: postId, 
          user_id: userId 
        });

      if (error) throw error;
      
      // Mettre à jour le compteur de likes
      const { data: postData } = await supabase
        .from('social_posts')
        .select('likes_count')
        .eq('id', postId)
        .single();
        
      const currentLikes = postData?.likes_count || 0;
      
      await supabase
        .from('social_posts')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', postId);
      
      return { success: true };
    }
  } catch (error: any) {
    console.error('Erreur lors de la gestion des likes:', error);
    return { success: false, error: error.message };
  }
};

export const checkIsLiked = async (postId: string, userId: string): Promise<boolean> => {
  try {
    const { data } = await supabase
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    return !!data;
  } catch (error) {
    console.error('Erreur lors de la vérification du like:', error);
    return false;
  }
};
