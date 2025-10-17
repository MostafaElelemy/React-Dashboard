import type { User, Post, Todo } from '../types';

const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers(): Promise<User[]> {
  const r = await fetch(`${BASE}/users`);
  if (!r.ok) throw new Error('Failed to fetch users');
  return r.json();
}

export async function fetchUser(id: string | number): Promise<User> {
  const r = await fetch(`${BASE}/users/${id}`);
  if (!r.ok) throw new Error('Failed to fetch user');
  return r.json();
}

export async function fetchPostsByUser(userId: string | number): Promise<Post[]> {
  const r = await fetch(`${BASE}/posts?userId=${userId}`);
  if (!r.ok) throw new Error('Failed to fetch posts');
  return r.json();
}

export async function fetchTodosByUser(userId: string | number): Promise<Todo[]> {
  const r = await fetch(`${BASE}/todos?userId=${userId}`);
  if (!r.ok) throw new Error('Failed to fetch todos');
  return r.json();
}

export type Weather = {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
};

export async function fetchWeatherByCity(city: string): Promise<Weather> {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('city-error');
  return r.json();
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<Weather> {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('geo-error');
  return r.json();
}
