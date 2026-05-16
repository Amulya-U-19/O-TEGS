import React, { useState } from 'react';
import { GraduationCap, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { API } from '../api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await API.post('/login', { username, password });
      if (res.data.message === 'success') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        onLogin();
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f8] flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-[450px]">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-black w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
            <GraduationCap className="text-white" size={28} />
          </div>
          <span className="text-3xl font-bold tracking-tighter text-gray-900">O-TEGS</span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-black/[0.03] border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-medium text-sm">Sign in to access your offline AI evaluation dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or teacher"
                  className="w-full h-14 bg-gray-50 border-transparent rounded-[18px] pl-12 pr-4 font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 bg-gray-50 border-transparent rounded-[18px] pl-12 pr-4 font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-bold text-center animate-shake">Invalid username or password.</p>
            )}

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full h-14 bg-black text-white rounded-[18px] font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400 font-medium">
          Privacy-First. Secure. <span className="text-gray-900">Fully Offline.</span>
        </p>
      </div>
    </div>
  );
}
