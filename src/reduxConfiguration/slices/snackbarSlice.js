import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    apiMessages: []

};

export const appReducer = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        createApiMessage: (state, action) => {
            if (state.apiMessages.findIndex(value => value.key === action.payload.key) === -1)
                state.apiMessages = [...state.apiMessages, { ...action.payload }]
        },
        closeApiMessage: (state, action) => {
            state.apiMessages = state.apiMessages
                .map(message => message.key === action.payload.key
                    ? { ...message, dismissed: true }
                    : { ...message })
        },
        closeAllApiMessages: (state) => {
            state.apiMessages = state.apiMessages
                .map(message => ({ ...message, dismissed: true }))
        },
        removeApiMessage: (state, action) => {
            state.apiMessages = state.apiMessages
                .filter(message => message.key !== action.payload.key)
        }
    },
});

export const { createApiMessage, closeApiMessage, closeAllApiMessages, removeApiMessage } = appReducer.actions;

export const selectApiMessages = (state) => state.snackbar.apiMessages;


export default appReducer.reducer;