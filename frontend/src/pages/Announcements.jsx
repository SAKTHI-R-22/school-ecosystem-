import { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

const priorityColor = { low: 'bg-gray-100 text-gray-600', medium: 'bg-blue-100 text-blue-600', high: 'bg-red-100 text-red-600' };

export default function Announcements() {
  const { user } = useAuth();
  const [anns, setAnns] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', priority: 'medium', targetRoles: ['all'] });

  useEffect(() => { api.get('/announcements').then(r => setAnns(r.data)); }, []);

  const create = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/announcements', form);
    setAnns(prev => [data, ...prev]);
    setForm({ title: '', content: '', priority: 'medium', targetRoles: ['all'] });
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>
      {user.role === 'admin' && (
        <form onSubmit={create} className="bg-white rounded-2xl shadow p-6 mb-8 space-y-4">
          <input className="w-full border rounded-lg p-3" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea className="w-full border rounded-lg p-3" placeholder="Content" rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
          <select className="border rounded-lg p-3" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Post Announcement</button>
        </form>
      )}
      <div className="space-y-4">
        {anns.map(a => (
          <div key={a._id} className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg">{a.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${priorityColor[a.priority]}`}>{a.priority}</span>
            </div>
            <p className="text-gray-600 mt-2">{a.content}</p>
            <p className="text-sm text-gray-400 mt-3">By {a.createdBy?.name} · {new Date(a.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}