//Developed by SAKTHI R
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, GraduationCap, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      setErr('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fdfcfd]">
      {/* Pastel Background Elements */}
      <div className="mesh-bg" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[120px] animate-pulse-slow" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-md px-6"
      >
        <div className="bg-white/60 backdrop-blur-3xl p-10 md:p-12 rounded-[4rem] border border-white/80 shadow-2xl shadow-indigo-500/5">
          <div className="flex flex-col items-center mb-12">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-20 h-20 pastel-lavender rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-8"
            >
              <GraduationCap size={40} />
            </motion.div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">CampusFlow</h1>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
              <Sparkles size={16} className="text-indigo-300" />
              <span>Enter your academic universe</span>
            </div>
          </div>

          {err && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold py-4 px-6 rounded-3xl mb-8 text-center uppercase tracking-widest"
            >
              {err}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="email"
                  required
                  className="w-full bg-white/80 border border-white/40 rounded-[2rem] py-5 pl-16 pr-6 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm" 
                  placeholder="name@school.com"
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="password"
                  required
                  className="w-full bg-white/80 border border-white/40 rounded-[2rem] py-5 pl-16 pr-6 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm" 
                  placeholder="••••••••"
                  value={form.password} 
                  onChange={e => setForm({...form, password: e.target.value})} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Portal
                  <LogIn size={22} />
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-slate-300 text-xs font-bold uppercase tracking-widest">
            Managed by <span className="text-slate-500">Administrator</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}