import { createSlice } from "@reduxjs/toolkit";
import { fetchCountryData, fetchCountries } from "./services"

const initialState = {
    countries: [],
    selectedCountry: null,
    countryData: null,
    status: "idle",
    error: null
}

const covidTrackerSlice = createSlice({
    name: "covidTracker",
    initialState,
    reducers: {
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        }
    },
    extraReducers: {
          [fetchCountryData.pending ]: (state) => {
            state.status = 'loading';
          },
          [fetchCountryData.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.countryData = action.payload;
          },
          [fetchCountryData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            alert('Bir hata oluştu: ' + state.error);
          },
          [fetchCountries.pending ]: (state) => {
            state.status = 'loading';
            state.error = null;
          },
          [fetchCountries.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.countries = action.payload;
          },
          [fetchCountries.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          },
      }
})

export const { setSelectedCountry } = covidTrackerSlice.actions

export default covidTrackerSlice.reducer