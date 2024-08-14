import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchList: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchList: (state, action) => {
            const { payload } = action
            state.searchList = payload;
        },
    },
});

export const { updateSearchList } = searchSlice.actions;

export const selectSearchList = (state) => state.search.searchList;

export default searchSlice.reducer;