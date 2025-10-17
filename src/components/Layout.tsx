import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">React Dashboard</Link>
          <nav className="flex gap-3 text-sm">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/users" className="hover:underline">Users</Link>
            <Link to="/notes" className="hover:underline">Notes</Link>
            <Link to="/analytics" className="hover:underline">Analytics</Link>
          </nav>
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); nav('/'); }}
              className="text-sm px-3 py-1.5 rounded bg-gray-900 text-white"
            >Logout</button>
          ) : <div />}
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
