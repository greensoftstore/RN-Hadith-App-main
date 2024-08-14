import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    netInfoStatus: true
};

export const netInfoSlice = createSlice({
    name: 'netInfo',
    initialState,
    reducers: {
        setNetInfo: (state, action) => {
            const { payload } = action
            state.netInfoStatus = payload;
        },
    },
});

export const { setNetInfo } = netInfoSlice.actions;

export const selectNetInfo = (state) => state.netInfo.netInfoStatus;

export default netInfoSlice.reducer;