import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cities } from "../cities";

export const getWeatherData = createAsyncThunk(
  "getWeatherData",
  async (...args) => {
    let coordinates;
    if (typeof args[0] === "string") {
      const res = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${args[0].toLocaleLowerCase(
          "en-US"
        )}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      );
      coordinates = res.data;
    } else {
      coordinates = args[0];
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}`
    );

    return {
      ...response.data,
      coordinates,
    };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: null,
    isWeatherDataLoading: false,
    selectedCity: "İstanbul",
    cities,
    error: null,
  },
  reducers: {
    setSelection: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: {
    [getWeatherData.pending]: (state) => {
      state.isWeatherDataLoading = true;
    },
    [getWeatherData.fulfilled]: (state, action) => {
      state.isWeatherDataLoading = false;
      console.log("weatherData payload", action.payload);
      state.weatherData = action.payload;
    },
    [getWeatherData.rejected]: (state, action) => {
      state.isWeatherDataLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { setSelection } = weatherSlice.actions;

export const weatherDataSelector = (state) => state.weather.weatherData;
export const citySelector = (state) => state.weather.selectedCity;
export const citiesSelector = (state) => state.weather.cities;
export const errorSelector = (state) => state.weather.error;

export const weatherDataLoadingSelector = (state) =>
  state.weather.isWeatherDataLoading;

export default weatherSlice.reducer;
