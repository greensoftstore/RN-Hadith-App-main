import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    appIntro: true,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleAppIntro: (state, action) => {
            state.appIntro = !state.appIntro;
        },
    },
});

export const {  toggleAppIntro, } = settingsSlice.actions;

export const selectAppIntro = (state) => state.settings.appIntro;

export default settingsSlice.reducer;