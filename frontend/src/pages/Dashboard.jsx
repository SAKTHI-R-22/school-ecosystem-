import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Bell,
  TrendingUp,
  Search,
  Sparkles,
  Zap,
  Star,
  Award,
  CircleDot
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const roleCards = {
  student: [
    { title: 'Class Presence', desc: '94% Consistency', color: 'from-[#E0C3FC] to-[#8EC5FC]', span: 'col-span-1', icon: CircleDot },
    { title: 'Academic Performance', desc: 'GPA 3.8 / 4.0', color: 'from-[#D4FC79] to-[#96E6A1]', span: 'col-span-1 md:col-span-2', icon: Award },
    { title: 'Knowledge Lab', desc: '4 Active Projects', color: 'from-[#FFECD2] to-[#FCB69F]', span: 'col-span-1', icon: Sparkles },
    { title: 'Future Events', desc: 'May 2026', color: 'from-[#84FAB0] to-[#8FD3F4]', span: 'col-span-1', icon: Calendar },
    { title: 'Network Feed', desc: 'Important Broadcasts', color: 'from-[#FBC2EB] to-[#A6C1EE]', span: 'col-span-1 md:col-span-2', icon: Bell },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  const cards = roleCards[user?.role] || roleCards.student;

  return (
    <div className="relative min-h-screen p-8 md:p-16 max-w-[1700px] mx-auto overflow-hidden">
      {/* Aurora Background */}
      <div className="cosmic-bg">
        <div className="aurora-orb orb-1" />
        <div className="aurora-orb orb-2" />
        <div className="aurora-orb orb-3" />
        <div className="aurora-orb orb-4" />
      </div>

      {/* Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-5 py-2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl">
              Academic Intelligence v3.0
            </span>
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-6">
            Welcome, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
              {user?.name?.split(' ')[0]}
            </span>
          </h1>
          <p className="text-2xl text-slate-400 font-medium max-w-xl leading-relaxed">
            Harnessing the power of <span className="text-slate-900 font-bold underline decoration-indigo-300 decoration-4">intelligence</span> to redefine your academic journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl group-hover:bg-indigo-500/40 transition-all duration-700 rounded-full" />
          <div className="bg-white/80 backdrop-blur-3xl p-8 rounded-[4rem] border border-white shadow-2xl relative z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-[2rem] bg-slate-900 flex items-center justify-center text-white">
              <Award size={48} className="animate-float" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 leading-tight">Top 1%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Rank</p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Central Master Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-2 row-span-2 bg-slate-900 rounded-[5rem] p-12 text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-transparent to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/20">
                <TrendingUp size={40} className="text-indigo-300" />
              </div>
              <div className="text-right">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Live Status</span>
                <p className="text-3xl font-black">Syncing...</p>
              </div>
            </div>
            <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tight">Your Academic<br />Ecosystem is <span className="text-emerald-400">Thriving.</span></h2>
            <p className="text-slate-400 text-xl mb-12 max-w-lg leading-relaxed font-medium">98% of your current modules are above average. Your next milestone is only <span className="text-white underline decoration-emerald-400 decoration-2">2 days</span> away.</p>
            <div className="mt-auto flex gap-4">
              <button className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl">
                Analytics
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-[2rem] font-black text-lg border border-white/20 hover:bg-white/20 transition-all">
                Timeline
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Activity Cards */}
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * idx + 0.3 }}
            className={`bento-card-premium group ${card.span} flex flex-col`}
          >
            <div className="flex items-center justify-between mb-12">
              <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500`}>
                <card.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-200 group-hover:text-indigo-500 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all duration-300">
                <ArrowUpRight size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">{card.title}</h3>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">{card.desc}</p>

            {/* Mock Data Viz for interactivity */}
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-end gap-1 h-12 group-hover:h-16 transition-all duration-500">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-slate-100 rounded-t-sm group-hover:bg-indigo-100 transition-colors" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}