import { configureStore } from "@reduxjs/toolkit"
 import weatherReducer from "./weather/weatherSlice";

export const store=configureStore({
reducer:{
    weather:weatherReducer,
}
})