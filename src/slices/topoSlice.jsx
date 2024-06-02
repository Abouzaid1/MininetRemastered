import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from '../socket/socket';
const url = import.meta.env.VITE_APP_URL + `/topo`
export const getTopo = createAsyncThunk("topoSlice/getTopo", async (topoId) => {
    const response = await axios.get(`${url}/${topoId}`);
    socket.emit("topoChange", { data: response.data, room: topoId });
    return response.data;
})
export const addTopo = createAsyncThunk("topoSlice/addTopo", async (newTopo) => {
    const response = await axios.post(url, newTopo);
    return response.data;
});
export const deleteTopo = createAsyncThunk("topoSlice/deleteTopo", async (topoId) => {
    await axios.delete(url + `/${topoId}`);
    return topoId;
});
export const updateTopo = createAsyncThunk("topoSlice/updateTopo", async (updatedTopo) => {
    await axios.put(url + `/${updatedTopo.id}`, updatedTopo);
    return updatedTopo;
});


const topoSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTopo.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(addTopo.fulfilled, (state, action) => {
            state.unshift(action.payload);
        });
        builder.addCase(deleteTopo.fulfilled, (state, action) => {
            return state.filter(topo => topo.id !== action.payload);
        });
        builder.addCase(updateTopo.fulfilled, (state, action) => {
            const updatedTopoIndex = state.findIndex(
                (topo) => topo.id === action.payload.id
            );
            if (updatedTopoIndex !== -1) {
                state[updatedTopoIndex] = action.payload;
            }
        });
    }
})

export const { } = topoSlice.actions;
export default topoSlice.reducer;    