
// Script de création des utilisateurs de démonstration pour Vita Mora
// 
// Pour exécuter ce script, utilisez la CLI Supabase:
// 1. supabase login
// 2. supabase functions deploy create-demo-users --project-ref votre-ref-projet
// 3. supabase functions invoke create-demo-users --project-ref votre-ref-projet
//
// Ce script crée 3 utilisateurs de démonstration:
// 1. Admin: admin@vitamora.com / admin123
// 2. Partenaire: partner@vitamora.com / partner123
// 3. Client: client@vitamora.com / client123

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Remplacez avec les informations de votre projet
const SUPABASE_URL = 'https://iruqnleqjudknkxqdvbq.supabase.co';
const SUPABASE_SERVICE_KEY = 'votre-clé-service'; // Obtenez cette clé depuis les paramètres de votre projet

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createUser(email, password, userData, role) {
  // Créer l'utilisateur
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: userData
  });

  if (authError) {
    console.error(`Erreur lors de la création de l'utilisateur ${email}:`, authError);
    return;
  }

  console.log(`Utilisateur créé: ${email}`);
  
  // Mettre à jour le rôle dans le profil
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', authData.user.id);

  if (profileError) {
    console.error(`Erreur lors de la mise à jour du profil pour ${email}:`, profileError);
    return;
  }

  console.log(`Rôle mis à jour pour ${email}: ${role}`);
}

// Fonction principale
async function createDemoUsers() {
  try {
    // Créer l'administrateur
    await createUser('admin@vitamora.com', 'admin123', {
      first_name: 'Admin',
      last_name: 'Vitamora'
    }, 'admin');

    // Créer le partenaire
    await createUser('partner@vitamora.com', 'partner123', {
      first_name: 'Partenaire',
      last_name: 'Vitamora'
    }, 'partner');

    // Créer le client
    await createUser('client@vitamora.com', 'client123', {
      first_name: 'Client',
      last_name: 'Vitamora'
    }, 'client');

    console.log('Tous les utilisateurs de démonstration ont été créés avec succès!');
  } catch (error) {
    console.error('Erreur non gérée:', error);
  }
}

createDemoUsers();
