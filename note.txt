import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_APP_URL + `/pcs`
export const getPc = createAsyncThunk("pcSlice/getPc", async () => {
    const response = await axios.get(url);
    return response.data;
})
export const addPc = createAsyncThunk("pcSlice/addPc", async (newPc) => {
    const response = await axios.post(url, newPc);
    return response.data;
});
export const deletePc = createAsyncThunk("pcSlice/deletePc", async (pcId) => {
    await axios.delete(url + `/${pcId}`);
    return pcId;
});
export const updatePc = createAsyncThunk("pcSlice/updatePc", async (updatedPc) => {
    await axios.put(url + `/${updatedPc.id}`, updatedPc);
    return updatedPc;
});


const pcSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPc.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(addPc.fulfilled, (state, action) => {
            state.unshift(action.payload);
        });
        builder.addCase(deletePc.fulfilled, (state, action) => {
            return state.filter(pc => pc.id !== action.payload);
        });
        builder.addCase(updatePc.fulfilled, (state, action) => {
            const updatedPcIndex = state.findIndex(
                (pc) => pc.id === action.payload.id
            );
            if (updatedPcIndex !== -1) {
                state[updatedPcIndex] = action.payload;
            }
        });
    }
})

export const { } = pcSlice.actions;
export default pcSlice.reducer;    