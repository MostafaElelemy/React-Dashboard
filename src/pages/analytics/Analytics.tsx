import { useQueries } from '@tanstack/react-query';
import { fetchUsers, fetchPostsByUser, fetchTodosByUser } from '../../lib/api';

export default function Analytics() {
  const usersQ = useQueries({
    queries: [
      { queryKey: ['users'], queryFn: fetchUsers },
    ]
  });
  const users = usersQ[0].data || [];

  const postsCounts = useQueries({
    queries: users.map((u: any) => ({
      queryKey: ['posts', u.id],
      queryFn: () => fetchPostsByUser(u.id),
      select: (posts: any[]) => ({ id: u.id, username: u.username, count: posts.length })
    }))
  });

  const todoCounts = useQueries({
    queries: users.map((u: any) => ({
      queryKey: ['todos', u.id],
      queryFn: () => fetchTodosByUser(u.id),
      select: (todos: any[]) => ({
        id: u.id,
        username: u.username,
        completed: todos.filter((t) => t.completed).length,
      })
    }))
  });

  const loading = usersQ[0].isLoading || postsCounts.some((q) => q.isLoading) || todoCounts.some((q) => q.isLoading);
  const error = usersQ[0].isError || postsCounts.some((q) => q.isError) || todoCounts.some((q) => q.isError);
  if (loading) return <p>Loading analytics…</p>;
  if (error) return <p className="text-red-600">Error loading analytics.</p>;

  const posts = postsCounts.map((q: any) => q.data!).sort((a: any, b: any) => b.count - a.count);
  const todos = todoCounts.map((q: any) => q.data!).sort((a: any, b: any) => b.completed - a.completed);

  const mostPosts = posts[0];
  const fewestPosts = posts[posts.length - 1];
  const mostCompleted = todos[0];
  const fewestCompleted = todos[todos.length - 1];

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl shadow p-5 border">
        <div className="text-sm text-gray-600">Total users</div>
        <div className="text-4xl font-bold">{users.length}</div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border">
        <div className="font-semibold mb-2">Posts</div>
        <div className="grid grid-cols-2 gap-3">
          <Box label="Most posts" value={`${mostPosts.username} (${mostPosts.count})`} />
          <Box label="Fewest posts" value={`${fewestPosts.username} (${fewestPosts.count})`} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 border">
        <div className="font-semibold mb-2">Completed to-dos</div>
        <div className="grid grid-cols-2 gap-3">
          <Box label="Most completed" value={`${mostCompleted.username} (${mostCompleted.completed})`} />
          <Box label="Fewest completed" value={`${fewestCompleted.username} (${fewestCompleted.completed})`} />
        </div>
      </div>
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
