import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Login() {
  const [u, setU] = useState('admin');
  const [p, setP] = useState('admin123');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { login, isAuthenticated } = useAuth();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    const ok = await login(u, p);
    if (ok) nav('/dashboard');
    else setErr('Invalid credentials');
  }

  if (isAuthenticated) nav('/dashboard');

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow border">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={u} onChange={(e) => setU(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Username" />
        <input value={p} onChange={(e) => setP(e.target.value)} className="w-full border rounded px-3 py-2" type="password" placeholder="Password" />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-gray-900 text-white rounded py-2">Sign in</button>
      </form>
    </div>
  );
}
