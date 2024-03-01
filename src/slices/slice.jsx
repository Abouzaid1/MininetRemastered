import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_APP_URL + '/device'
export const getDevices = createAsyncThunk("deviceSlice/getDevices", async () => {
    const response = await axios.get(url);
    return response.data;
})
export const addDevice = createAsyncThunk("deviceSlice/addDevice", async (newDevice) => {
    const response = await axios.post(url, newDevice);
    return response.data;
});
export const deleteDevice = createAsyncThunk("deviceSlice/deleteDevice", async (deviceId) => {
    await axios.delete(url + `/${deviceId}`);
    return deviceId;
});
export const updateDevice = createAsyncThunk("deviceSlice/updateDevice", async (updatedDevice) => {
    await axios.put(url + `/${updatedDevice.id}`, updatedDevice);
    return updatedDevice;
});


const deviceSlice = createSlice({
    name: "data",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDevices.fulfilled, (state, action) => {
            return action.payload
        });
        builder.addCase(addDevice.fulfilled, (state, action) => {
            state.unshift(action.payload);
        });
        builder.addCase(deleteDevice.fulfilled, (state, action) => {
            return state.filter(device => device.id !== action.payload);
        });
        builder.addCase(updateDevice.fulfilled, (state, action) => {
            const updatedDeviceIndex = state.findIndex(
                (device) => device.id === action.payload.id
            );
            if (updatedDeviceIndex !== -1) {
                state[updatedDeviceIndex] = action.payload;
            }
        });
    }
})

export const { } = deviceSlice.actions;
export default deviceSlice.reducer;    