// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ModalPortal } from 'react-native-modals';
// =================================================================== 
// Store
// ===================================================================
import { store, persistor } from 'reduxConfiguration/store'
// =================================================================== 
// Root
// ===================================================================
import Root from './Root'
// =================================================================== 
// Api
// ===================================================================
import { injectStore } from "api/axios";
// ===================================================================
// Components
// ===================================================================
import { SplashScreen, BackgroundRoot } from 'components'
// =================================================================== 

injectStore(store);

export default function App() {

    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAppReady(true);
        }, Platform.OS === 'ios' ? 1100 : 1000)
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>

                    <SplashScreen isAppReady={isAppReady}>
                        {isAppReady && <Root />}
                    </SplashScreen>

                    <ModalPortal />

                </PersistGate>
            </Provider>
        </GestureHandlerRootView >
    );
};

const styles = StyleSheet.create({
});

