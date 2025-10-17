import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import UserDetail from './pages/users/UserDetail';
import Notes from './pages/notes/Notes';
import Analytics from './pages/analytics/Analytics';
import { useAuth } from './store/auth';

function Protected({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/',
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <UserDetail /> },
      { path: 'notes', element: <Notes /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
