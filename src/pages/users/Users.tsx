import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../lib/api';

export default function Users() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

  if (isLoading) return <p>Loading users…</p>;
  if (isError) return <p className="text-red-600">Failed to load users.</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-5 border">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <ul className="divide-y">
        {data!.map((u) => (
          <li key={u.id} className="py-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </div>
            <Link to={`/users/${u.id}`} className="text-blue-600">Open →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
