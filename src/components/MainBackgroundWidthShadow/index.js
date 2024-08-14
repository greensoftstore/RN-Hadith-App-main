// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    useColorScheme
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue, selectUseSystemTheme, toggleThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'

const MainBackgroundWidthShadow = ({ children, shadow = true, customMain, customShadow, borderRadius, shadowSecond = false }) => {
    // ===================================================================
    // Redux Props
    // ===================================================================
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    const colorScheme = useColorScheme();


    return (
        <View style={[{ width: '100%', flex: 1, borderRadius: borderRadius || ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, }, customMain]} >
            <ShadowedView style={[{ width: '100%', flex: 1, borderRadius: borderRadius || ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, }, customShadow, shadow && themeVal === 'light' ? shadowSecond ? GlobalStyle.shadowSecond : GlobalStyle.shadowMain : {}]}>
                {children}
            </ShadowedView >
        </View >
    );
};

const styles = StyleSheet.create({
});


export default MainBackgroundWidthShadow;