import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./slice";
import pcSlice from "./pcSlice";
export const myStore = configureStore({
    reducer: {
        device:deviceSlice,
        pc:pcSlice
    }
})