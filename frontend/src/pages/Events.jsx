import { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', targetRoles: ['all'] });

  const fetchEvents = () => api.get('/events').then(r => setEvents(r.data)).catch(() => {});
  useEffect(() => { fetchEvents(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/events', form);
      setForm({ title: '', description: '', date: '', venue: '', targetRoles: ['all'] });
      setCreating(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const participate = async (id) => { await api.post(`/events/${id}/participate`); fetchEvents(); };
  const withdraw = async (id) => { await api.post(`/events/${id}/withdraw`); fetchEvents(); };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1e293b', margin: 0 }}>🎉 Events</h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>School events and activities</p>
        </div>

        {/* Create Button or Form */}
        {(user.role === 'admin' || user.role === 'teacher') && (
          <div style={{ marginBottom: 24 }}>
            {!creating ? (
              <button onClick={() => setCreating(true)} style={{
                padding: '10px 22px', borderRadius: 10, border: '1.5px dashed #6366f1',
                background: 'transparent', color: '#6366f1', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, fontFamily: 'inherit'
              }}>
                + Create New Event
              </button>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0', marginBottom: 8 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#1e293b' }}>Create New Event</h2>
                <form onSubmit={create}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    {[
                      ['Event Title', 'title', 'text', 'Annual Sports Day'],
                      ['Venue', 'venue', 'text', 'School Ground'],
                    ].map(([label, key, type, ph]) => (
                      <div key={key}>
                        <label style={{ fontSize: 13, color: '#64748b', display: 'block', marginBottom: 6 }}>{label}</label>
                        <input type={type} placeholder={ph} value={form[key]}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 13, color: '#64748b', display: 'block', marginBottom: 6 }}>Date</label>
                      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 13, color: '#64748b', display: 'block', marginBottom: 6 }}>Description</label>
                    <textarea placeholder="Describe the event..." value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="submit" disabled={loading} style={{
                      padding: '11px 24px', borderRadius: 10, border: 'none', background: '#6366f1',
                      color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                    }}>{loading ? 'Creating...' : 'Create Event'}</button>
                    <button type="button" onClick={() => setCreating(false)} style={{
                      padding: '11px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
                      background: 'transparent', color: '#64748b', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit'
                    }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Events Grid */}
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 16 }}>No events scheduled yet</p>
            {(user.role === 'admin' || user.role === 'teacher') && (
              <p style={{ fontSize: 14, marginTop: 8 }}>Click "Create New Event" to add one</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {events.map(ev => {
              const joined = ev.participants?.includes(user._id);
              const upcoming = new Date(ev.date) > new Date();
              return (
                <div key={ev._id} style={{
                  background: '#fff', borderRadius: 16, padding: 22,
                  border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 28 }}>🎉</span>
                    <span style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: upcoming ? '#dcfce7' : '#f1f5f9', color: upcoming ? '#166534' : '#64748b'
                    }}>{upcoming ? 'Upcoming' : 'Past'}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{ev.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>{ev.description}</p>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>📍 {ev.venue}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>📅 {new Date(ev.date).toLocaleDateString()}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>👥 {ev.participants?.length || 0} participants</div>
                  {user.role === 'student' && upcoming && (
                    <button onClick={() => joined ? withdraw(ev._id) : participate(ev._id)} style={{
                      width: '100%', padding: '9px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                      background: joined ? '#fee2e2' : '#ede9fe', color: joined ? '#dc2626' : '#6366f1'
                    }}>{joined ? 'Withdraw' : 'Register to Participate'}</button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}