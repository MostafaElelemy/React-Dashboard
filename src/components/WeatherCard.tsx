import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchWeatherByCity, fetchWeatherByCoords } from '../lib/api';

export default function WeatherCard() {
  const [city, setCity] = useState('Cairo');

  const weather = useMutation({ mutationFn: fetchWeatherByCity });

  async function search() {
    if (!city.trim()) return;
    try { await weather.mutateAsync(city.trim()); } catch {}
  }

  async function locate() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const data = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        weather.reset();
        (weather as any).data = data;
      } catch {}
    });
  }

  const isLoading = weather.isPending;
  const isError = weather.isError;
  const data = weather.data as any;

  return (
    <div className="bg-white rounded-2xl shadow p-5 border">
      <h2 className="text-lg font-semibold mb-3">Weather</h2>
      <div className="flex gap-2 mb-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border rounded px-3 py-2 w-full"
        />
        <button onClick={search} className="px-3 py-2 rounded bg-blue-600 text-white">Search</button>
        <button onClick={locate} className="px-3 py-2 rounded bg-gray-900 text-white">My Location</button>
      </div>
      {isLoading && <p>Fetching weather…</p>}
      {isError && <p className="text-red-600">City not found or error fetching data.</p>}
      {data && (
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xl font-semibold">{data.name}</div>
            <div className="text-3xl font-bold">{Math.round(data.main.temp)}°C</div>
            <div className="text-gray-600 capitalize">{data.weather?.[0]?.description}</div>
            <div className="text-gray-600">Humidity: {data.main.humidity}%</div>
          </div>
          {data.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="icon" width={80} height={80}
            />
          )}
        </div>
      )}
    </div>
  );
}
