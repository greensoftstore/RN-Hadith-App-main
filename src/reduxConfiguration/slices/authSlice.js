import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authenticated: false,
    token: null,
    fcmtoken: null,
    subscribedToTopic: false,
    user: null,
    role: null,
    sessionExpired: null,
    savedDataLocaly: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { payload } = action

            state.authenticated = true;
            state.user = payload.user;
            state.sessionExpired = false;
            state.role = null;
            state.savedDataLocaly = payload.saveData
            // state.token = payload?.token;
        },
        logout: (state) => {
            state.authenticated = false;
            state.token = null;
            state.user = null;
            state.role = null;
            state.sessionExpired = false
            state.subscribedToTopic = false
        },
        updateUser: (state, action) => {
            const { payload } = action

            state.user = payload;
        },
        sessionExpired: (state) => {
            state.sessionExpired = true
            state.token = null
        },
        setFCMToken: (state, action) => {
            const { payload } = action
            state.fcmtoken = payload
        },
        toggleSubscribeToTopic: (state, action) => {
            const { payload } = action
            state.subscribedToTopic = payload
        },
    },
});

export const { login, logout, setFCMToken, updateUser, sessionExpired, toggleSubscribeToTopic } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectUserID = (state) => state.auth.user?.uid;
export const selectUserPhoto = (state) => state.auth.user?.photoURL;
export const selectToken = (state) => state.auth.user?.data?.info?.token;
export const selectRole = (state) => state.auth.role;
export const selectSessionExpired = (state) => state.auth.sessionExpired;
export const selectUsername = (state) => state.auth?.user?.data?.username;
export const selectFCMToken = (state) => state.auth?.user?.data?.username;
export const selectSubscribedToTopic = (state) => state.auth.subscribedToTopic;
export const selectSavedDataLocaly = (state) => state.auth.savedDataLocaly;

export default authSlice.reducer;