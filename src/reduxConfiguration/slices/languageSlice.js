import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    lan: 'ba'
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            const { payload } = action
            state.lan = payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.lan;

export default languageSlice.reducer;