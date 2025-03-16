import { useState } from 'react';
import './App.css';
import fetchWeather from './api/featchWeather';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-500 p-4">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Weather App</h1>
      <div className="relative mt-6 w-full max-w-lg">
        <input
          type="text"
          className="w-full p-4 text-lg text-gray-900 rounded-full shadow-xl bg-white bg-opacity-80 focus:ring-4 focus:ring-indigo-300 outline-none placeholder-gray-500"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
      </div>
      {weather.main && (
        <div className="mt-8 bg-white bg-opacity-20 text-black backdrop-blur-lg rounded-xl shadow-2xl p-6 w-full max-w-lg text-center text-black">
          <h2 className="text-3xl font-bold">
            {weather.name}, <span className="text-xl font-light">{weather.sys.country}</span>
          </h2>
          <div className="text-6xl font-extrabold mt-2">
            {Math.round(weather.main.temp)}
            <sup className="text-3xl">&deg;C</sup>
          </div>
          <div className="flex flex-col items-center mt-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24"
            />
            <p className="text-xl capitalize">{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;