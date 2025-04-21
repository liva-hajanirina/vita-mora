
-- Créer une table pour les commentaires sociaux si elle n'existe pas encore
CREATE TABLE IF NOT EXISTS public.social_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ajouter des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_social_comments_post_id ON public.social_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_social_comments_user_id ON public.social_comments(user_id);

-- Activer Row Level Security (RLS)
ALTER TABLE public.social_comments ENABLE ROW LEVEL SECURITY;

-- Créer des politiques RLS pour les commentaires
CREATE POLICY "Les utilisateurs peuvent voir tous les commentaires" 
ON public.social_comments FOR SELECT 
USING (true);

CREATE POLICY "Les utilisateurs peuvent créer leurs propres commentaires" 
ON public.social_comments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leurs propres commentaires" 
ON public.social_comments FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres commentaires" 
ON public.social_comments FOR DELETE 
USING (auth.uid() = user_id);

-- Créer un bucket de stockage pour les images sociales s'il n'existe pas déjà
INSERT INTO storage.buckets (id, name, public)
VALUES ('social_images', 'social_images', true)
ON CONFLICT (id) DO NOTHING;

-- Créer un bucket de stockage pour les images de profil s'il n'existe pas déjà
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre à tous les utilisateurs de lire les images
CREATE POLICY "Images accessibles par tous" ON storage.objects FOR SELECT
USING (bucket_id IN ('social_images', 'images'));

-- Politique pour permettre aux utilisateurs de télécharger leurs propres images
CREATE POLICY "Les utilisateurs peuvent télécharger leurs propres images" ON storage.objects
FOR INSERT TO authenticated 
WITH CHECK (bucket_id IN ('social_images', 'images'));

-- Politique pour permettre aux utilisateurs de mettre à jour leurs propres images
CREATE POLICY "Les utilisateurs peuvent mettre à jour leurs propres images" ON storage.objects
FOR UPDATE TO authenticated 
USING (bucket_id IN ('social_images', 'images'));

-- Politique pour permettre aux utilisateurs de supprimer leurs propres images
CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres images" ON storage.objects
FOR DELETE TO authenticated 
USING (bucket_id IN ('social_images', 'images'));
