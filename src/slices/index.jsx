import { configureStore } from "@reduxjs/toolkit";
import topoSlice from "./topoSlice";
import deviceSlice from "./slice";
export const myStore = configureStore({
    reducer: {
        topo: topoSlice,
        device: deviceSlice
    }
})