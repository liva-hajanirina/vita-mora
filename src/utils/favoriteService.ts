
import { supabase } from "@/integrations/supabase/client";

export const toggleFavorite = async (productId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Vérifier si le produit est déjà en favori
    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();

    if (existingFavorite) {
      // Supprimer des favoris
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('product_id', productId)
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true };
    } else {
      // Ajouter aux favoris
      const { error } = await supabase
        .from('favorites')
        .insert({ product_id: productId, user_id: userId });

      if (error) throw error;
      return { success: true };
    }
  } catch (error: any) {
    console.error('Erreur lors de la gestion des favoris:', error);
    return { success: false, error: error.message };
  }
};

export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      id,
      product_id,
      products (
        id,
        name,
        price,
        image_url,
        description
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return [];
  }

  return data;
};

export const checkIsFavorite = async (productId: string, userId: string): Promise<boolean> => {
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();

  return !!data;
};
