import './Weather.css'
import React, { useEffect, useState } from 'react'

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [query, setQuery] = useState('Prague');

  const search = async (city) => {
    try {
      console.log(`Searching for weather in ${city}`);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || "./assets/clear.png";
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search(query);
  }, [query]);
  
  const allIcons = {
    "01d": "./assets/clear.png",
    "01n": "./assets/clear.png",
    "02d": "./assets/cloud.png",
    "02n": "./assets/cloud.png",
    "03d": "./assets/cloud.png",
    "03n": "./assets/cloud.png",
    "04d": "./assets/drizzle.png",
    "04n": "./assets/drizzle.png",
    "09d": "./assets/rain.png",
    "09n": "./assets/rain.png",
    "10d": "./assets/rain.png",
    "10n": "./assets/rain.png",
    "13d": "./assets/snow.png",
    "13n": "./assets/snow.png"
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {weatherData.icon && <img src={weatherData.icon} alt="" className="weather-icon" />}
      {weatherData.temperature && <p className="temperature">{weatherData.temperature}°C</p>}
      {weatherData.location && <p className="location">{weatherData.location}</p>}
      <div className="weather-data">
        <div className="col">
          <img src="./assets/humidity.png" alt="humidity" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src="./assets/wind.png" alt="wind" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;