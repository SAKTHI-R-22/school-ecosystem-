//Developed by SAKTHI R
import { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function Leave() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ reason: '', fromDate: '', toDate: '' });

  const fetchLeaves = useCallback(() => {
    const url = user.role === 'student' ? '/leave/my' : '/leave';
    api.get(url).then(r => setLeaves(r.data));
  }, [user.role]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const apply = async (e) => {
    e.preventDefault();
    await api.post('/leave', form);
    setForm({ reason: '', fromDate: '', toDate: '' });
    fetchLeaves();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/leave/${id}`, { status });
    fetchLeaves();
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Leave Management</h1>
      {user.role === 'student' && (
        <form onSubmit={apply} className="bg-white rounded-2xl shadow p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">Apply for Leave</h2>
          <textarea className="w-full border rounded-lg p-3" placeholder="Reason" rows={3}
            value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded-lg p-3" value={form.fromDate}
              onChange={e => setForm({...form, fromDate: e.target.value})} />
            <input type="date" className="border rounded-lg p-3" value={form.toDate}
              onChange={e => setForm({...form, toDate: e.target.value})} />
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Apply</button>
        </form>
      )}
      <div className="space-y-4">
        {leaves.map(l => (
          <div key={l._id} className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              {user.role !== 'student' && (
                <p className="font-semibold">{l.student?.name} ({l.student?.class})</p>
              )}
              <p className="text-gray-600">{l.reason}</p>
              <p className="text-sm text-gray-400">
                {new Date(l.fromDate).toLocaleDateString()} → {new Date(l.toDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm ${
                l.status === 'approved' ? 'bg-green-100 text-green-700' :
                l.status === 'rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'}`}>
                {l.status}
              </span>
              {(user.role === 'teacher' || user.role === 'admin') && l.status === 'pending' && (
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(l._id, 'approved')}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">Approve</button>
                  <button onClick={() => updateStatus(l._id, 'rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Reject</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}