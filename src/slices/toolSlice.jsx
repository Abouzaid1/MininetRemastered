import {createSlice } from "@reduxjs/toolkit";

const toolSlice = createSlice({
    name: "tool",
    initialState: "mouse",
    reducers: {
        getToolName:(state,action)=>{
            state = action.payload
            return state
        }
    },
})

export const {getToolName } = toolSlice.actions;
export default toolSlice.reducer;