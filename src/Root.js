// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Platform
} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import auth from '@react-native-firebase/auth';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken, selectLastEdited, selectSessionExpired } from 'reduxConfiguration/slices/authSlice';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectDevMode } from 'reduxConfiguration/slices/settingsSlice';
// =================================================================== 
// Navigator
// ===================================================================
import AppNavigator from 'navigation'
// ===================================================================
// Components
// ===================================================================
import { Snackbars, MyNetInfo, BackgroundRoot } from 'components'
import { FirebaseSetup, AppCenterVersion, } from 'services'
// ===================================================================

const Root = ({ themes }) => {

    // ===================================================================
    // Redux Props
    // ===================================================================
    const dispatch = useDispatch()

    const token = useSelector(selectToken)
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const user = useSelector(selectUser)

    const onAuthStateChanged = (user) => {
        // console.log('user root ', user)

    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <RootSiblingParent>

            <BackgroundRoot />

            <View style={{ width: '100%', height: '100%', }} >

                <AppNavigator />
            </View>

            <Snackbars />
            <MyNetInfo />

            <FirebaseSetup />

            {/* <AppCenterVersion /> */}
        </RootSiblingParent>
    );
};

const styles = StyleSheet.create({
});


export default Root;