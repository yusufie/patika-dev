import { configureStore } from "@reduxjs/toolkit";
import covidTrackerSlice from "./covidTrackerSlice"

const store = configureStore({
    reducer: {
        covidTracker: covidTrackerSlice
    }
})

export default store;