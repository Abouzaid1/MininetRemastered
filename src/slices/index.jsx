import { configureStore } from "@reduxjs/toolkit";
import topoSlice from "./topoSlice";
import deviceSlice from "./slice";
import toolSlice from "./toolSlice";
export const myStore = configureStore({
    reducer: {
        topo: topoSlice,
        device: deviceSlice,
        tool:toolSlice,
    }
})