
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler une connexion
    setTimeout(() => {
      setLoading(false);
      
      // Pour démonstration, nous allons juste accepter n'importe quelles entrées
      // normalement, vous vérifieriez avec un backend
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Vita Mora!",
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vitamora-cream p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-8">
          <Logo className="h-24 mb-2" />
          <p className="text-gray-600 text-center mt-2">On le fait pour vous</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email ou téléphone
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
              placeholder="Entrez votre email ou téléphone"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm text-vitamora-orange hover:underline">
              Mot de passe oublié?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vitamora-orange text-white rounded-lg py-3 font-medium hover:bg-opacity-90 transition-colors disabled:opacity-70"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-300 absolute w-full"></div>
          <span className="relative px-4 bg-white text-sm text-gray-500">Ou</span>
        </div>

        <button
          type="button"
          className="w-full border border-gray-300 bg-white text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte?{" "}
            <button
              onClick={() => navigate('/register')}
              className="text-vitamora-orange hover:underline font-medium"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
