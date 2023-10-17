import React from "react";
import "./App.css";
import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/current-weather/CurrentWeather"
import Forecast from "./Components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY} from "./api";
import { useState } from "react";

const App = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log("value",searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city:searchData.label, ...weatherResponse});
        setForecast({city:searchData.label, ...forecastResponse});

      })
      .catch((error) => console.log(error));
  };

  console.log("Weather",currentWeather);
  console.log("Forecast ",forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {CurrentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
