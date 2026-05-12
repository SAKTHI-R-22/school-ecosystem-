//Developed by SAKTHI R
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Marks() {
  const [marks, setMarks] = useState([]);
  useEffect(() => { api.get('/marks/my').then(r => setMarks(r.data)); }, []);

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Marks</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-50"><tr>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Exam Type</th>
            <th className="p-4 text-left">Marks</th>
            <th className="p-4 text-left">Percentage</th>
          </tr></thead>
          <tbody>
            {marks.map(m => (
              <tr key={m._id} className="border-t">
                <td className="p-4 font-medium">{m.subject}</td>
                <td className="p-4 text-gray-500">{m.examType}</td>
                <td className="p-4">{m.marks} / {m.totalMarks}</td>
                <td className="p-4">
                  <span className={`font-bold ${(m.marks/m.totalMarks*100) >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                    {(m.marks/m.totalMarks*100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}