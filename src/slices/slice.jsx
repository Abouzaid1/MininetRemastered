import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { socket } from "@/socket/socket";

import { toast } from "sonner";

const url = import.meta.env.VITE_APP_URL + '/device'

export const getDevice = createAsyncThunk("deviceSlice/getDevice", async (deviceId) => {
    const response = await axios.get(`${url}/${deviceId}`);
    return response.data;
})
export const addDevice = createAsyncThunk("deviceSlice/addDevice", async (newDevice) => {
    const response = await axios.post(url, newDevice);
    toast(response.data.msg);
    return response.data;
});
export const deleteDevice = createAsyncThunk("deviceSlice/deleteDevice", async (deviceId) => {
    const response = await axios.delete(url + `/${deviceId}`)
    socket.emit("topoChange", { data: response.data, room: topoId });
    toast(response.data.msg);
    return deviceId;
});
export const updateDevice = createAsyncThunk("deviceSlice/updateDevice", async (updatedDevice) => {
    await axios.post(url + `/${updatedDevice.id}`, updatedDevice);
    return updatedDevice;
});


const deviceSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDevice.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(addDevice.fulfilled, (state, action) => {
            state.unshift(action.payload);
        });
        builder.addCase(deleteDevice.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(updateDevice.fulfilled, (state, action) => {
            return action.payload
        });
    }
})

export const { } = deviceSlice.actions;
export default deviceSlice.reducer;    