//Developed by SAKTHI R
import { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function Homework() {
  const { user } = useAuth();
  const [homeworks, setHomeworks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', subject: '', dueDate: '', class: '' });

  useEffect(() => {
    api.get('/homework').then(r => setHomeworks(r.data));
  }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/homework', form);
    api.get('/homework').then(r => setHomeworks(r.data));
    setForm({ title: '', description: '', subject: '', dueDate: '', class: '' });
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Homework</h1>
      {user.role === 'teacher' && (
        <form onSubmit={create} className="bg-white rounded-2xl shadow p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">Assign Homework</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg p-3" placeholder="Title"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input className="border rounded-lg p-3" placeholder="Subject"
              value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            <input className="border rounded-lg p-3" placeholder="Class (e.g. 10A)"
              value={form.class} onChange={e => setForm({...form, class: e.target.value})} />
            <input type="date" className="border rounded-lg p-3"
              value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
          </div>
          <textarea className="w-full border rounded-lg p-3" placeholder="Description" rows={3}
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Assign
          </button>
        </form>
      )}
      <div className="space-y-4">
        {homeworks.map(hw => (
          <div key={hw._id} className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-lg text-indigo-700">{hw.title}</h2>
                <p className="text-gray-600 mt-1">{hw.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Subject: {hw.subject} | Class: {hw.class} | Due: {new Date(hw.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">Assigned by: {hw.teacher?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}