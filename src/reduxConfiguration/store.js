import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'

import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'
import settingsReducer from './slices/settingsSlice'
import fontReducer from './slices/fontSlice'
import searchReducer from './slices/searchSlice'
import booksReducer from './slices/booksSlice'
import snackbarReducer from './slices/snackbarSlice'
import subScreensParamsReducer from './slices/subScreensParamsSlice'
import netInfoReducer from './slices/netInfoSlice'

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['auth']
}

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage: AsyncStorage,
}

const themePersistConfig = {
    key: 'theme',
    version: 1,
    storage: AsyncStorage,
}

const languagePersistConfig = {
    key: 'language',
    version: 1,
    storage: AsyncStorage,
}

const settingsPersistConfig = {
    key: 'settings',
    version: 2,
    storage: AsyncStorage,
}

const fontPersistConfig = {
    key: 'font',
    version: 1,
    storage: AsyncStorage,
}

const searchPersistConfig = {
    key: 'search',
    version: 1,
    storage: AsyncStorage,
}

const booksPersistConfig = {
    key: 'books',
    version: 1,
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
    language: persistReducer(languagePersistConfig, languageReducer),
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    font: persistReducer(fontPersistConfig, fontReducer),
    search: persistReducer(searchPersistConfig, searchReducer),
    books: persistReducer(booksPersistConfig, booksReducer),
    snackbar: snackbarReducer,
    subScreensParams: subScreensParamsReducer,
    netInfo: netInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});
const persistor = persistStore(store)

export { store, persistor };
