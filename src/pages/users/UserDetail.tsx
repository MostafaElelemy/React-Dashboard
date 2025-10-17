import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchPostsByUser, fetchTodosByUser } from '../../lib/api';
import { useLocal } from '../../store/local';

export default function UserDetail() {
  const { id = '' } = useParams();
  const { data: user, isLoading: uL } = useQuery({ queryKey: ['user', id], queryFn: () => fetchUser(id) });
  const { data: posts, isLoading: pL } = useQuery({ queryKey: ['posts', id], queryFn: () => fetchPostsByUser(id) });
  const { data: todos, isLoading: tL } = useQuery({ queryKey: ['todos', id], queryFn: () => fetchTodosByUser(id) });

  const { todoOverrides, toggleTodo } = useLocal();

  if (uL || pL || tL) return <p>Loading…</p>;
  if (!user) return <p className="text-red-600">User not found.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl shadow p-5 border">
        <h1 className="text-xl font-semibold mb-2">{user.name}</h1>
        <div className="text-sm text-gray-700">Username: {user.username}</div>
        <div className="text-sm text-gray-700 mb-4">Email: {user.email}</div>
        <h2 className="font-semibold mb-2">Posts</h2>
        <ul className="space-y-2 max-h-80 overflow-auto pr-2">
          {posts?.map((p) => (
            <li key={p.id} className="p-3 border rounded">
              <div className="font-medium">{p.title}</div>
              <p className="text-sm text-gray-700">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border">
        <h2 className="font-semibold mb-2">To-dos</h2>
        <ul className="space-y-2 max-h-96 overflow-auto pr-2">
          {todos?.map((t) => {
            const overridden = t.id in todoOverrides ? todoOverrides[t.id] : t.completed;
            return (
              <li key={t.id} className="p-3 border rounded flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={overridden}
                  onChange={() => toggleTodo(t.id, overridden)}
                  className="size-4"
                />
                <span className={overridden ? 'line-through text-green-700' : ''}>{t.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
