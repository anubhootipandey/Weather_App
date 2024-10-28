import React, { useState } from 'react';


function WeatherForecast() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="app-wrap">
      <header>
        <input 
          type="text"
          className="search-box"
          placeholder="Search for a city..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </header>
      {weather.main && (
        <main>
          <section className="location">
            <div className="city">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </section>
          <div className="current">
            <div className="temp">
              {Math.round(weather.main.temp)}<span>°c</span>
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="hi-low">
              {Math.round(weather.main.temp_min)}°c / {Math.round(weather.main.temp_max)}°c
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default WeatherForecast;
