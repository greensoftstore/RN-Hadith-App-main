// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { GlobalStyle } from 'constantsConfiguration'
// =================================================================== 
import { config } from 'constantsConfiguration/config'

const Devider = ({ }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />
    );
};

export default memo(Devider);
