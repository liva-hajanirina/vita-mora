
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Télécharge une image et retourne l'URL publique
 * @param file Le fichier à télécharger
 * @param bucket Le nom du bucket (par défaut: 'images')
 * @param folder Le dossier dans le bucket (par défaut: 'general')
 * @returns Un objet contenant le succès de l'opération et l'URL de l'image
 */
export const uploadImage = async (
  file: File,
  bucket: string = 'images',
  folder: string = 'general'
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    if (!file) {
      return { success: false, error: "Aucun fichier sélectionné" };
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return { success: false, error: "Le fichier doit être une image" };
    }

    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "L'image ne doit pas dépasser 5MB" };
    }

    // Créer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const userId = (await supabase.auth.getUser()).data.user?.id || 'anonymous';
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log(`Tentative de téléchargement dans ${bucket}/${filePath}`);

    // Télécharger le fichier
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Erreur lors du téléchargement:', uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('Téléchargement réussi:', uploadData);

    // Obtenir l'URL publique
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log('URL publique:', urlData.publicUrl);

    return { success: true, url: urlData.publicUrl };
  } catch (error: any) {
    console.error('Erreur inattendue:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Télécharge une image de profil pour l'utilisateur courant
 */
export const uploadProfileImage = async (
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: "Utilisateur non connecté" };
    }
    
    const userId = user.id;
    console.log('Téléchargement pour utilisateur:', userId);
    
    const result = await uploadImage(file, 'images', `profiles/${userId}`);
    
    if (result.success && result.url) {
      console.log('Mise à jour du profil avec URL:', result.url);
      
      // Mettre à jour le profil avec l'URL de l'image
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: result.url })
        .eq('id', userId);
  
      if (updateError) {
        console.error('Erreur lors de la mise à jour du profil:', updateError);
        return { success: false, error: updateError.message };
      }
  
      toast.success("Photo de profil mise à jour avec succès");
    }
  
    return result;
  } catch (error: any) {
    console.error('Erreur lors du téléchargement de l\'image de profil:', error);
    return { success: false, error: error.message };
  }
};
