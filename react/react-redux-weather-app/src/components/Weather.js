import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/tr";
import {
  citySelector,
  errorSelector,
  weatherDataLoadingSelector,
  weatherDataSelector,
} from "../redux/weather/weatherSlice";

moment.locale("tr");

function Weather() {
  const selectedCity = useSelector(citySelector);
  const isWeatherDataLoading = useSelector(weatherDataLoadingSelector);
  const weatherData = useSelector(weatherDataSelector);
  const error = useSelector(errorSelector);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const current = weatherData.current;
  if (isWeatherDataLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }

  return (
    <div className="weather-container">
      <span className="weather-header">
        Selected City: {selectedCity.toLocaleUpperCase("tr-TR")}
      </span>
      <div className="weather-today">
        <h5>
          Today: {moment.unix(current.dt).format("dddd, DD MMMM YYYY, hh:mm")}
        </h5>
        <div className="weather-column">
          <div className="column">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
              alt="iconimage"
            />
            <span>
              <strong>
                {current.weather[0].description
                  .split(" ")
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(" ")}
              </strong>
            </span>
          </div>
          <div className="column">
            <span className="temp">
              Temp:
              <strong>
                {` ${parseFloat(current.temp).toFixed(1)} `}
                &deg;C
              </strong>
            </span>
            <span className="temp">
              Humidity:
              <strong>{` % ${current.humidity} `}</strong>
            </span>
            <span className="temp">
              Wind:
              <strong>
                {` ${parseFloat(current.wind_speed).toFixed(1)} `}
                Kmph
              </strong>
            </span>
            <span className="temp">
              Pressure:
              <strong>{` ${current.pressure} `}mbar</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="weather-card-container">
        {weatherData.daily?.slice(1).map((day) => (
          <div className="weather-card" key={Math.random() * 1000}>
            <h5>{days[new Date(day.dt * 1000).getDay()]}</h5>
            <h6>{moment.unix(day.dt).format(" DD MMMM YYYY, hh:mm")}</h6>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="iconimage"
            />
            <h6>
              <span className="temp">
                Min:
                {parseFloat(day.temp.min).toFixed(1)} &deg;C
              </span>
            </h6>
            <h6>
              <span className="temp">
                Maks:
                {parseFloat(day.temp.max).toFixed(1)} &deg;C
              </span>
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
