// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    StatusBar,
    useColorScheme
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue, selectUseSystemTheme, toggleThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 

const Root = ({ themes }) => {
    // ===================================================================
    // Redux Props
    // ===================================================================
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const systemTheme = useSelector(selectUseSystemTheme)
    // ===================================================================

    const colorScheme = useColorScheme();

    const [statusbarChange, setStatusBar] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setStatusBar(true)
        }, 600)
    }, [])


    useEffect(() => {
        if (systemTheme && themeVal !== colorScheme) {
            dispatch(toggleThemeMode(colorScheme))
        }
    }, [colorScheme, systemTheme])

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={statusbarChange ? theme.mainStatusBarBackground : theme.splashScreenStatusBar}
                barStyle={themeVal === 'light' ? "dark-content" : "light-content"}
            />
        </>
    );
};

const styles = StyleSheet.create({
});


export default Root;