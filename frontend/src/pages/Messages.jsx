//Developed by SAKTHI R
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function Messages() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef();

  useEffect(() => {
    socket.emit('join', user._id);
    api.get('/auth/users').then(r =>
      setAllUsers(r.data.filter(u => u._id !== user._id))
    );
  }, [user._id]);

  useEffect(() => {
    const handleMessage = ({ senderId, message }) => {
      if (selected?._id === senderId) {
        setMessages(prev => [...prev, {
          sender: { _id: senderId },
          content: message,
          createdAt: new Date()
        }]);
      }
    };
    socket.on('receiveMessage', handleMessage);
    return () => socket.off('receiveMessage', handleMessage);
  }, [selected]);

  useEffect(() => {
    if (selected) {
      api.get(`/messages/${selected._id}`).then(r => setMessages(r.data));
    }
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = useCallback(async () => {
    if (!text.trim() || !selected) return;
    await api.post('/messages', { receiverId: selected._id, content: text });
    socket.emit('sendMessage', {
      senderId: user._id,
      receiverId: selected._id,
      message: text
    });
    setMessages(prev => [...prev, {
      sender: { _id: user._id },
      content: text,
      createdAt: new Date()
    }]);
    setText('');
  }, [text, selected, user._id]);

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <div className="w-72 border-r bg-white overflow-y-auto">
        <div className="p-4 font-bold text-lg text-indigo-700 border-b">Contacts</div>
        {allUsers.map(c => (
          <div key={c._id} onClick={() => setSelected(c)}
            className={`p-4 cursor-pointer hover:bg-indigo-50 ${selected?._id === c._id ? 'bg-indigo-100' : ''}`}>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-gray-400 capitalize">{c.role}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        {selected ? (
          <>
            <div className="p-4 border-b font-bold text-gray-700 bg-white">
              {selected.name}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-xs ${m.sender._id === user._id ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-4 bg-white border-t flex gap-3">
              <input
                className="flex-1 border rounded-full px-4 py-2 focus:outline-indigo-500"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type a message..."
              />
              <button onClick={send}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
            Select a contact to chat
          </div>
        )}
      </div>
    </div>
  );
}