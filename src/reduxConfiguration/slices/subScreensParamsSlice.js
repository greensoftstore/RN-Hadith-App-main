import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    screenParams: null,
    notificationScreenParams: null
};

export const subScreensParamsSlice = createSlice({
    name: 'subScreensParams',
    initialState,
    reducers: {
        setScreenParams: (state, action) => {
            const { payload } = action
            state.screenParams = payload;
        },
        setNotificationScreenParams: (state, action) => {
            const { payload } = action
            state.notificationScreenParams = payload;
        },
    },
});

export const { setScreenParams, setNotificationScreenParams } = subScreensParamsSlice.actions;

export const selectScreenParams = (state) => state.subScreensParams.screenParams;
export const selectNotificationScreenParams = (state) => state.subScreensParams.notificationScreenParams;

export default subScreensParamsSlice.reducer;