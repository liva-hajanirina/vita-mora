
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type SocialLike = Tables['social_likes']['Row'];

export const toggleSocialLike = async (postId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Vérifier si le post est déjà liké
    const { data: existingLike, error: checkError } = await supabase
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingLike) {
      // Supprimer le like existant
      const { error: deleteError } = await supabase
        .from('social_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;
      
      // Mettre à jour le compteur de likes
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: supabase.sql`greatest(0, likes_count - 1)` })
        .eq('id', postId);

      if (updateError) throw updateError;
      
      return { success: true };
    } else {
      // Ajouter le like
      const { error: insertError } = await supabase
        .from('social_likes')
        .insert({ 
          post_id: postId, 
          user_id: userId 
        });

      if (insertError) throw insertError;
      
      // Mettre à jour le compteur de likes
      const { error: updateError } = await supabase
        .from('social_posts')
        .update({ likes_count: supabase.sql`likes_count + 1` })
        .eq('id', postId);

      if (updateError) throw updateError;
      
      return { success: true };
    }
  } catch (error: any) {
    console.error('Erreur lors de la gestion des likes:', error);
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
