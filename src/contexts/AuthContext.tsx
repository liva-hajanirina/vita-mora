
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; phone: string; }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour rafraîchir la session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de la session:", error);
    }
  };

  useEffect(() => {
    // Configurer le listener pour les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state change:", event, currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      // Rediriger l'utilisateur vers la page d'accueil s'il est connecté
      if (event === 'SIGNED_IN' && currentSession) {
        toast.success("Connexion réussie!");
        navigate('/home');
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    // Vérifier la session existante
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Session initiale:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      // Rediriger l'utilisateur vers la page d'accueil s'il est déjà connecté
      if (currentSession) {
        navigate('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      // La redirection est gérée par le listener onAuthStateChange
    } catch (error: any) {
      console.error("Erreur de connexion:", error.message);
      toast.error(error.message || "Email ou mot de passe incorrect");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { first_name: string; last_name: string; phone: string; }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Compte créé avec succès!");
      // La redirection est gérée par le listener onAuthStateChange
    } catch (error: any) {
      console.error("Erreur d'inscription:", error.message);
      toast.error(error.message || "Une erreur s'est produite lors de l'inscription");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) {
        throw error;
      }
      // La redirection est gérée automatiquement par Supabase
    } catch (error: any) {
      console.error("Erreur de connexion avec Google:", error.message);
      toast.error(error.message || "Erreur lors de la connexion avec Google");
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) {
        throw error;
      }
      // La redirection est gérée automatiquement par Supabase
    } catch (error: any) {
      console.error("Erreur de connexion avec Facebook:", error.message);
      toast.error(error.message || "Erreur lors de la connexion avec Facebook");
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      toast.success("Déconnexion réussie");
      // La redirection est gérée par le listener onAuthStateChange
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error.message);
      toast.error(error.message || "Une erreur s'est produite lors de la déconnexion");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut, refreshSession, signInWithGoogle, signInWithFacebook }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
