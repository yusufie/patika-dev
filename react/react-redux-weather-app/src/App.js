import React from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { weatherDataSelector } from "./redux/weather/weatherSlice";

function App() {
  const weatherData = useSelector(weatherDataSelector);
  return (
    <div className="App">
      <Header />
      {weatherData && <Weather />}
      <Footer />
    </div>
  );
}

export default App;
