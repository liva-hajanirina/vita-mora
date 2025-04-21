
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { Spinner } from './ui/spinner';

interface CreatePostProps {
  onSuccess?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onSuccess }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour publier");
      return;
    }

    if (!content.trim() && !selectedImage) {
      toast.error("Veuillez ajouter du texte ou une image");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = null;

      // Upload image if selected
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `social/${user.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('images')
          .upload(filePath, selectedImage);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Create post
      const { error: postError } = await supabase
        .from('social_posts')
        .insert({
          content: content.trim(),
          image_url: imageUrl,
          user_id: user.id,
          likes_count: 0,
          comments_count: 0
        });

      if (postError) throw postError;

      // Reset form
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      
      toast.success("Publication créée avec succès!");
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Erreur lors de la création de la publication:', error);
      toast.error(error.message || "Erreur lors de la création de la publication");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start gap-3">
        <img 
          src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.first_name || 'U'}+${user?.user_metadata?.last_name || ''}`} 
          alt="Profil" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <Textarea
            placeholder="Partagez vos pensées..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none border-gray-200 focus:border-vitamora-orange focus:ring-vitamora-orange"
            rows={3}
          />
          
          {imagePreview && (
            <div className="relative mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-40 object-cover rounded-lg"
              />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-vitamora-orange">
              <Upload size={18} />
              <span>Image</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
                disabled={isSubmitting}
              />
            </label>
            
            <Button 
              onClick={handleSubmit}
              disabled={(!content.trim() && !selectedImage) || isSubmitting}
              className="bg-vitamora-orange hover:bg-vitamora-orange/90 text-white"
            >
              {isSubmitting ? <Spinner className="h-4 w-4 mr-2" /> : null}
              Publier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
