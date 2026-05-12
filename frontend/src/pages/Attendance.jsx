import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, XCircle, Clock, ChevronLeft } from 'lucide-react';
import api from '../api/axios';

export default function Attendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    api.get('/attendance/my')
      .then(r => setData(r.data))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );

  if (!data) return <div className="p-8 text-center text-slate-500">No attendance data found.</div>;

  const color = data.percentage >= 75 ? 'text-emerald-600' : 'text-rose-500';

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <div className="flex items-center gap-4 mb-2">
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Attendance Tracking</h1>
          <p className="text-slate-500 font-medium">Detailed view of your academic presence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 mb-6">
            <Calendar size={32} />
          </div>
          <p className={`text-6xl font-black tracking-tighter ${color}`}>{data.percentage}%</p>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Total Progress</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 mb-6">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-6xl font-black tracking-tighter text-slate-900">{data.present}</p>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Days Present</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 mb-6">
            <Clock size={32} />
          </div>
          <p className="text-6xl font-black tracking-tighter text-slate-900">{data.total}</p>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Total Working Days</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg">Recent History</h2>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <span className="text-xs font-bold text-slate-500 uppercase">Live Feed</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-sm font-bold uppercase tracking-wider text-left">
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.records.map((r, idx) => (
                <tr key={r._id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-semibold text-slate-700">
                    {new Date(r.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <span className={`
                        px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest
                        ${r.status === 'present' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : r.status === 'late' 
                            ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                            : 'bg-rose-50 text-rose-600 border border-rose-100'}
                      `}>
                        {r.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right text-slate-400 italic text-sm">
                    {r.status === 'present' ? 'On time' : 'Recorded at check-in'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}