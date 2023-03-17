
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchCountryData = createAsyncThunk(
    'covidTracker/fetchCountryData',
    async (selectedCountry) => {
        try {
            const res = await axios.get(`https://api.covid19api.com/country/${selectedCountry}`);
            return res.data[res.data.length - 1];
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchCountries = createAsyncThunk(
    'covidTracker/countriesReceived',
    async () => {
        try {
            const res = await axios.get(`https://api.covid19api.com/countries`);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)