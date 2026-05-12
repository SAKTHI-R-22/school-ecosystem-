//Developed by SAKTHI R
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarCheck, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Bell, 
  LogOut,
  ShieldCheck,
  Command,
  Plus
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const menuItems = {
  student: [
    { name: 'Intelligence', icon: Command, path: '/dashboard' },
    { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
    { name: 'Performance', icon: GraduationCap, path: '/marks' },
    { name: 'Repository', icon: FileText, path: '/homework' },
    { name: 'Scheduling', icon: Calendar, path: '/events' },
    { name: 'Notifications', icon: Bell, path: '/announcements' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const items = menuItems[user?.role] || menuItems.student;

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 h-[80vh] w-24 hover:w-72 transition-all duration-[600ms] cubic-bezier(0.22, 1, 0.36, 1) z-50 group">
      <div className="h-full glass rounded-[4rem] border-white/80 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden relative">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="p-8 flex items-center justify-center group-hover:justify-start gap-6 transition-all duration-500">
          <div className="w-14 h-14 min-w-[3.5rem] bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-500/20 group-hover:rotate-[15deg] transition-transform duration-500">
            <ShieldCheck size={32} />
          </div>
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">Campus</span>
            <span className="text-sm font-bold text-indigo-500 tracking-[0.2em] uppercase">Flow Intelligence</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-6 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
            <Plus size={20} strokeWidth={3} />
            Quick Action
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-3 py-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                group/nav flex items-center gap-6 px-5 py-5 rounded-[2.5rem] transition-all duration-300 relative
                ${isActive 
                  ? 'bg-slate-900 text-white shadow-2xl scale-105' 
                  : 'text-slate-400 hover:bg-white/80 hover:text-indigo-600 hover:translate-x-2'}
              `}
            >
              <div className="min-w-[1.5rem] flex items-center justify-center">
                <item.icon size={26} strokeWidth={2.5} />
              </div>
              <span className="font-black text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 whitespace-nowrap tracking-tight">
                {item.name}
              </span>
              
              {/* Active Dot */}
              <NavLink to={item.path} className={({isActive}) => isActive ? "absolute right-6 w-2 h-2 bg-indigo-400 rounded-full" : "hidden"} />
            </NavLink>
          ))}
        </nav>

        {/* Profile & Footer */}
        <div className="p-6 mt-auto bg-slate-50/50 backdrop-blur-md border-t border-white/50">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-3 rounded-3xl bg-white/80 shadow-sm border border-white">
              <div className="w-12 h-12 min-w-[3rem] rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 font-black text-lg shadow-inner">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 truncate">
                <span className="font-black text-sm text-slate-800 leading-tight">{user?.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{user?.role}</span>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-6 px-5 py-4 rounded-[2rem] text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all group/logout"
            >
              <div className="min-w-[1.5rem] flex items-center justify-center">
                <LogOut size={26} strokeWidth={2.5} />
              </div>
              <span className="font-black text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                Terminate Session
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}