import { Link } from 'react-router-dom';
import Card from '../components/Card';
import WeatherCard from '../components/WeatherCard';

export default function Dashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card title="User & Posts Manager">
        <p className="mb-3 text-sm text-gray-600">Browse users, inspect posts & to-dos, toggle completion.</p>
        <Link to="/users" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Open Users</Link>
      </Card>

      <Card title="Note Manager">
        <p className="mb-3 text-sm text-gray-600">Add, categorize, reorder priorities.</p>
        <Link to="/notes" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Open Notes</Link>
      </Card>

      <Card title="Simple Analytics">
        <p className="mb-3 text-sm text-gray-600">Summary stats from JSONPlaceholder.</p>
        <Link to="/analytics" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Open Analytics</Link>
      </Card>

      <WeatherCard />
    </div>
  );
}
