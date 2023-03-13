import axios from "axios";
import { createContext,useState,useEffect } from "react";

const WeatherContext =createContext();

export const WeatherProvider =({children})=>{
    const [city, setcity] = useState("Ankara");
    const [weather, setweather] = useState([]);
    const [current, setcurrent] = useState([]);
    const values ={weather,setweather, city,setcity,current}

    useEffect(()=>{
        
        const key ="6c1e346b0bd44ac7bdb104808230503"
        axios(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&aqi=no&alerts=no&lang=tr`)
        .then(res=> { setweather(res.data.forecast.forecastday); setcurrent(res.data.current);})
        

    },[city])
    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}
export default WeatherContext;