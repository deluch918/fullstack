import React, { useState, useEffect } from "react";
import countryService from "../modules/countries";

const Country = ({ country }) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [weather, setWeather] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const capital = country?.capital?.[0];

  const languageList = country.languages
    ? Object.values(country.languages)
    : [];

  useEffect(() => {
    setWeather(null);
    setWeatherError(null);
    setIsLoadingWeather(false);

    if (!capital) {
      setWeatherError("No captial city listed for this country");
      return;
    }

    setIsLoadingWeather(true);

    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      capital
    )}&appid=${apiKey}&units=imperial`;

    countryService
      .getWeather(weatherApiURL)
      .then((data) => {
        setWeather(data);
        setWeatherError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherError(`Failed to find weather for ${capital}`);
        setWeather(null);
      })
      .finally(() => {
        setIsLoadingWeather(false);
      });
  }, [capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} km^2</p>
      <h2>Languages</h2>
      {languageList.length > 0 ? (
        <ul>
          {languageList.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>N/A</p>
      )}
      <h3>Flag:</h3>
      <img src={country.flags.png} />
      <h2>
        Weather in {country.name.common}'s capital of {capital}
      </h2>
      {isLoadingWeather ? (
        <p>Loading weather data...please hold</p>
      ) : weatherError ? (
        <p style={{ color: "red" }}>{weatherError}</p>
      ) : weather ? (
        <div>
          <p>Temperature: {weather.main.temp} Fahrenheit</p>
          {weather.weather?.[0] && (
            <>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </>
          )}
          <p>Wind: {weather.wind.speed}</p>
        </div>
      ) : (
        <p>Weather data currently unavailable</p>
      )}
    </div>
  );
};

export default Country;
