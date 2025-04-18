
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  profile_image_url?: string;
  role: 'client' | 'partner' | 'admin';
  created_at: string;
  updated_at: string;
};

/**
 * Récupère le profil d'un utilisateur par son ID
 */
export const getProfileById = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return null;
  }

  return data;
};

/**
 * Met à jour le profil d'un utilisateur
 */
export const updateProfile = async (
  userId: string,
  profileData: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

/**
 * Télécharge une image de profil
 */
export const uploadProfileImage = async (
  userId: string,
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  const fileExt = file.name.split('.').pop();
  const filePath = `profiles/${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Erreur lors du téléchargement de l\'image:', uploadError);
    return { success: false, error: uploadError.message };
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;

  // Mettre à jour le profil avec l'URL de l'image
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ profile_image_url: publicUrl })
    .eq('id', userId);

  if (updateError) {
    console.error('Erreur lors de la mise à jour du profil avec l\'image:', updateError);
    return { success: false, error: updateError.message };
  }

  return { success: true, url: publicUrl };
};
