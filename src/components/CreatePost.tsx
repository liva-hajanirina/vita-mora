
import React, { useState } from 'react';
import { Camera, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { uploadImage } from '@/utils/imageUploadService';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) {
      toast.error("Veuillez ajouter du texte ou une image à votre publication.");
      return;
    }

    if (!user) {
      toast.error("Vous devez être connecté pour publier.");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (image) {
        const uploadResult = await uploadImage(image, 'social_images', `posts/${user.id}`);
        
        if (!uploadResult.success) {
          throw new Error(`Erreur lors du téléchargement de l'image: ${uploadResult.error}`);
        }
        
        imageUrl = uploadResult.url;
      }

      // Create post in database
      const { error: postError } = await supabase
        .from('social_posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
          likes_count: 0,
          comments_count: 0
        });

      if (postError) {
        throw new Error(`Erreur lors de la création du post: ${postError.message}`);
      }

      toast.success("Publication réussie!");

      // Reset form
      setContent('');
      removeImage();
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite lors de la publication");
      console.error("Erreur de publication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
          {user && (
            <img 
              src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + (user.user_metadata?.name || user.email)}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow space-y-3">
          <Textarea
            placeholder="Que voulez-vous partager?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none focus-visible:ring-vitamora-orange"
            rows={3}
          />
          
          {imagePreview && (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg w-auto" />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-2">
              <label htmlFor="post-image" className="cursor-pointer flex items-center gap-1 text-vitamora-orange hover:text-vitamora-orange/80">
                <Camera size={20} />
                <span>Photo</span>
              </label>
              <input 
                id="post-image" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || (!content.trim() && !image)}
              className="bg-vitamora-orange hover:bg-vitamora-orange/90 flex items-center gap-1"
            >
              {isLoading ? "Publication..." : (
                <>
                  <Send size={16} />
                  <span>Publier</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
