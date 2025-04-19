
import { supabase } from "@/integrations/supabase/client";

export const toggleSocialLike = async (postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Vérifier si le post est déjà liké
    const { data: existingLike } = await supabase
      .from('social_likes' as any)
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Supprimer le like
      const { error } = await supabase
        .from('social_likes' as any)
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } else {
      // Ajouter le like
      const { error } = await supabase
        .from('social_likes' as any)
        .insert({ 
          post_id: postId, 
          user_id: userId 
        } as any);

      if (error) throw error;
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
      .from('social_likes' as any)
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    return !!data;
  } catch (error) {
    return false;
  }
};
