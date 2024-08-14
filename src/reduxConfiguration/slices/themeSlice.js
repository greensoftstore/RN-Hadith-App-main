import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ThemeModes } from 'constantsConfiguration';

const initialState = {
    mode: 'light',
    useSystemTheme: true,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleThemeMode: (state, action) => {
            const { payload } = action
            state.mode = payload;
        },
        toggleThemeModeAndRemoveSystem: (state, action) => {
            const { payload } = action
            state.mode = payload;
            state.useSystemTheme = false;
        },
        toggleSystemTheme: (state, action) => {
            const { payload } = action
            state.useSystemTheme = !state.useSystemTheme;
        },
    },
});

export const { toggleThemeMode, toggleThemeModeAndRemoveSystem, toggleSystemTheme } = themeSlice.actions;

export const selectThemeMode = (state) => ThemeModes[state.theme.mode];
export const selectThemeValue = (state) => state.theme.mode;
export const selectUseSystemTheme = (state) => state.theme.useSystemTheme;

export default themeSlice.reducer;