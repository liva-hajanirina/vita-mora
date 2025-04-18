
// Script de création des utilisateurs pour Vita Mora
// 
// Pour exécuter ce script, utilisez la CLI Supabase:
// 1. supabase login
// 2. supabase functions deploy create-demo-users --project-ref votre-ref-projet
// 3. supabase functions invoke create-demo-users --project-ref votre-ref-projet

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Remplacez avec les informations de votre projet
const SUPABASE_URL = 'https://iruqnleqjudknkxqdvbq.supabase.co';
const SUPABASE_SERVICE_KEY = 'votre-clé-service'; // Obtenez cette clé depuis les paramètres de votre projet

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createUser(email, password, userData, role) {
  // Vérifier si l'utilisateur existe déjà
  const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
  
  if (checkError) {
    console.error(`Erreur lors de la vérification des utilisateurs:`, checkError);
    return;
  }
  
  const userExists = existingUsers.users.some(user => user.email === email);
  
  if (userExists) {
    console.log(`L'utilisateur ${email} existe déjà, ignoré.`);
    return;
  }

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
    .update({ 
      role,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone || null,
      address: userData.address || null
    })
    .eq('id', authData.user.id);

  if (profileError) {
    console.error(`Erreur lors de la mise à jour du profil pour ${email}:`, profileError);
    return;
  }

  console.log(`Profil mis à jour pour ${email}: ${role}`);
  return authData.user;
}

// Fonction principale
async function createUsers() {
  try {
    console.log("Création des utilisateurs...");
    
    // Créer l'administrateur
    await createUser('admin@vitamora.com', 'Admin@2023', {
      first_name: 'Admin',
      last_name: 'Vitamora',
      phone: '+261 34 00 00 01'
    }, 'admin');

    // Créer le partenaire
    await createUser('restaurant@vitamora.com', 'Partner@2023', {
      first_name: 'Restaurant',
      last_name: 'Délices',
      phone: '+261 34 00 00 02',
      address: 'Analakely, Antananarivo'
    }, 'partner');

    // Créer un autre partenaire
    await createUser('pharmacie@vitamora.com', 'Partner@2023', {
      first_name: 'Pharmacie',
      last_name: 'Centrale',
      phone: '+261 34 00 00 03',
      address: 'Behoririka, Antananarivo'
    }, 'partner');

    // Créer le client
    await createUser('client@vitamora.com', 'Client@2023', {
      first_name: 'Jean',
      last_name: 'Razafy',
      phone: '+261 34 00 00 04',
      address: 'Analakely, Antananarivo'
    }, 'client');

    // Créer un deuxième client
    await createUser('sophie@vitamora.com', 'Client@2023', {
      first_name: 'Sophie',
      last_name: 'Rakoto',
      phone: '+261 33 00 00 05',
      address: 'Ankorondrano, Antananarivo'
    }, 'client');

    console.log('Tous les utilisateurs ont été créés avec succès!');
  } catch (error) {
    console.error('Erreur non gérée:', error);
  }
}

createUsers();
