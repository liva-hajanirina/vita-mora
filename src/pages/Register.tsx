
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Vérification des mots de passe
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Simuler un enregistrement
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès!",
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-vitamora-cream p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/login')}
          className="p-1"
        >
          <ChevronLeft size={24} className="text-vitamora-green" />
        </button>
        <h1 className="text-xl font-bold text-vitamora-green ml-2">Créer un compte</h1>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <Logo className="h-16" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
                placeholder="Entrez votre nom"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
                placeholder="Entrez votre email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
                placeholder="Entrez votre numéro de téléphone"
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
                  placeholder="Créez un mot de passe"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-vitamora-orange focus:border-vitamora-orange"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-vitamora-orange text-white rounded-lg py-3 font-medium hover:bg-opacity-90 transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-vitamora-orange hover:underline font-medium"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
