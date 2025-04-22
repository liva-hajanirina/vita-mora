
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vitamora-cream p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-8">
          <Logo className="h-24 mb-2" />
          <h1 className="text-2xl font-bold text-vitamora-green mt-2">Bienvenue</h1>
          <p className="text-gray-600 text-center mt-2">On le fait pour vous</p>
        </div>

        <LoginForm />
        <SocialLogin />

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
