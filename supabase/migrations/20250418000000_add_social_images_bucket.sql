
-- Création du bucket pour les images des publications sociales
INSERT INTO storage.buckets (id, name, public)
VALUES ('social_images', 'social_images', true);

-- Politique pour permettre à tous les utilisateurs authentifiés de lire les images
CREATE POLICY "Images accessible par tous" ON storage.objects FOR SELECT
USING (bucket_id = 'social_images');

-- Politique pour permettre aux utilisateurs de télécharger leurs propres images
CREATE POLICY "Les utilisateurs peuvent télécharger leurs propres images" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'social_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique pour permettre aux utilisateurs de mettre à jour leurs propres images
CREATE POLICY "Les utilisateurs peuvent mettre à jour leurs propres images" ON storage.objects
FOR UPDATE TO authenticated USING (
  bucket_id = 'social_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Politique pour permettre aux utilisateurs de supprimer leurs propres images
CREATE POLICY "Les utilisateurs peuvent supprimer leurs propres images" ON storage.objects
FOR DELETE TO authenticated USING (
  bucket_id = 'social_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
