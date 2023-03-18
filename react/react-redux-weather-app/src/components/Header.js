import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdMyLocation } from "react-icons/md";
import {
  citiesSelector,
  citySelector,
  getWeatherData,
  setSelection,
} from "../redux/weather/weatherSlice";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const dispatch = useDispatch();
  const initialCity = useSelector(citySelector);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  useEffect(() => {
    dispatch(getWeatherData(selectedCity));
  }, [dispatch, selectedCity]);

  const [darkMode, setDarkMode] = useState(false);
  const cities = useSelector(citiesSelector);

  const handleChange = (e) => {
    dispatch(setSelection(e.target.value));
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  const handleClick = () => {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(showPosition)
        : alert("Geolocation is not supported by this browser.");

      function showPosition(position) {
        dispatch(
          getWeatherData([
            { lat: position.coords.latitude, lon: position.coords.longitude },
          ])
        );
      }
    }

  return (
    <header className="header">

      <ThemeToggle className="" darkMode={darkMode} setDarkMode={setDarkMode} />

      <h1 className="title">Weather App</h1>

      <div className="selection">
       <span>For Weather Info Select City or Your Location</span>
        <div className="selection-items">
          <select name="cities" defaultValue="Select City..." onChange={handleChange}>
            {["Select City..."].concat(cities).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <MdMyLocation className="position-icon" onClick={handleClick} title="Use Your Location..."/>
        </div>
      </div>

    </header>
  );
}

export default Header;
