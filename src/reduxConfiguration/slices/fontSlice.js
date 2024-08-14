import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeFont: 'SFProDisplay',
    fontSize: 0
};

export const fontSlice = createSlice({
    name: 'font',
    initialState,
    reducers: {
        setActiveFont: (state, action) => {
            const { payload } = action
            state.activeFont = payload;
        },
        setFontSize: (state, action) => {
            const { payload } = action
            state.fontSize = payload;
        },
    },
});

export const { setActiveFont, setFontSize } = fontSlice.actions;

export const selectActiveFont = (state) => state.font.activeFont;
export const selectFontSize = (state) => state.font.fontSize; 

export default fontSlice.reducer;