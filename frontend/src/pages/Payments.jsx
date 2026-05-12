//Developed by SAKTHI R
import { useEffect, useState } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function Payments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ studentId: '', type: 'school_fee', amount: '', month: '', year: new Date().getFullYear() });

  useEffect(() => { api.get('/payments').then(r => setPayments(r.data)); }, []);

  const pay = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/payments/order', form);
    const options = {
      key: data.key, amount: data.amount, currency: data.currency,
      name: 'SchoolConnect', description: form.type.replace('_', ' '),
      order_id: data.orderId,
      handler: async (response) => {
        await api.post('/payments/verify', { ...response, paymentId: data.paymentId,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature });
        alert('Payment successful!');
        api.get('/payments').then(r => setPayments(r.data));
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Fee Payments</h1>
      {user.role === 'parent' && (
        <form onSubmit={pay} className="bg-white rounded-2xl shadow p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-lg">Make a Payment</h2>
          <input className="w-full border rounded-lg p-3" placeholder="Student ID" value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} />
          <select className="w-full border rounded-lg p-3" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="school_fee">School Fee</option>
            <option value="exam_fee">Exam Fee</option>
            <option value="stationary_fee">Stationary Fee</option>
            <option value="competition_fee">Competition Fee</option>
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input className="border rounded-lg p-3" placeholder="Month (e.g. June)" value={form.month} onChange={e => setForm({...form, month: e.target.value})} />
            <input type="number" className="border rounded-lg p-3" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Pay Now via Razorpay</button>
        </form>
      )}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-50"><tr>
            <th className="p-4 text-left">Student</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Month</th>
            <th className="p-4 text-left">Status</th>
          </tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-4">{p.student?.name}</td>
                <td className="p-4 capitalize">{p.type?.replace('_', ' ')}</td>
                <td className="p-4">₹{p.amount}</td>
                <td className="p-4">{p.month} {p.year}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${p.status === 'paid' ? 'bg-green-100 text-green-700' : p.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.status}
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