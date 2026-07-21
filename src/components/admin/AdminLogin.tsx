import React, { useState } from 'react';
import { Sun, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { authenticateAdmin } from '../../lib/bookingsService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authenticateAdmin(email, password);

      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected auth exception:', err);
      setErrorMsg('An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative text-slate-900">
      
      {/* Back to Site Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onGoHome}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 text-xs font-bold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Site</span>
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 mx-auto flex items-center justify-center text-slate-900 shadow-md mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">M/S Rout Traders</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Admin Dashboard Portal</p>
          <p className="text-slate-600 text-xs mt-2">Sign in with your administrator email &amp; password</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@routtraders.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Sun className="w-4 h-4 animate-spin-slow" />
                <span>Sign In to Admin Panel</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400">
          Protected authentication via Supabase Auth &bull; Session token persisted
        </div>
      </div>
    </div>
  );
};
