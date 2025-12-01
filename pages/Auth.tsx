import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { Layers, ArrowRight, Lock, Mail, User, CheckCircle, ExternalLink } from 'lucide-react';

interface AuthProps {
  onLogin: (name: string, email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
    }

    // Simulate Auth
    setTimeout(() => {
        onLogin(name || 'Student', email);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white h-full">
            <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                <Icon name="Layers" size={32} className="text-indigo-400" />
                <span>OpenPath</span>
            </div>
            
            <div className="space-y-6 my-auto">
                <h1 className="text-5xl font-extrabold leading-tight">
                    Transform your career in <span className="text-indigo-400">200 days</span>.
                </h1>
                <p className="text-lg text-slate-300 max-w-lg">
                    A zero-cost, structured outcome-oriented learning system designed to take you from novice to placement-ready engineer.
                </p>
                <div className="flex flex-col gap-3 pt-4">
                    <div className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span>15 Specialized Career Paths</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span>Daily "Trident" Methodology</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span>Placement & Resume Support</span>
                    </div>
                </div>
            </div>

            <div className="text-sm text-slate-400 flex items-center gap-2">
                © 2025 OpenPath Foundation. 
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 min-h-screen bg-white">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-8 lg:hidden text-center">
                 <div className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <Icon name="Layers" size={32} className="text-indigo-600" />
                    <span>OpenPath</span>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 mb-8">
                {isLogin ? 'Continue your streak and master your craft.' : 'Start your zero-cost engineering journey today.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="student@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

                <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                    {isLogin ? 'Log In' : 'Start Learning'} <ArrowRight size={18} />
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="ml-2 font-bold text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 text-center border-t border-slate-100">
             <a href="https://piyush07-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1 group">
                Developed by <span className="font-semibold text-slate-600 group-hover:text-indigo-600">Mayank & Rushan</span>
                <ExternalLink size={10} />
            </a>
        </div>
      </div>
    </div>
  );
};