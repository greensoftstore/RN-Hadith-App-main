// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect, useCallback, useState } from 'react'
import { View } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import Animated, { ZoomInLeft, SlideOutRight, ZoomIn, ZoomOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector, } from 'react-redux';
import { selectNetInfo, setNetInfo } from 'reduxConfiguration/slices/netInfoSlice';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectEnabledAnimations } from 'reduxConfiguration/slices/settingsSlice';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
// ===================================================================

const MyNetInfo = ({ }) => {


    const dispatchRedux = useDispatch()

    const theme = useSelector(selectThemeMode)
    const netInfo = useSelector(selectNetInfo)

    useEffect(() => {
        const connection = NetInfo.addEventListener(state => {
            _handleConnectionChange(state.isConnected);
        });
        return () => {
            connection()
        };
    }, []);

    const _handleConnectionChange = useCallback((isConnected) => {
        dispatchRedux(setNetInfo(isConnected))
    }, [])

    // ===================================================================
    // Animation
    // -------------------------------------------------------------------

    // ===================================================================
    if (!netInfo)
        return (
            <Animated.View entering={ZoomIn.duration(400)} exiting={ZoomOut.duration(400)} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 999, top: Platform.OS === 'ios' ? 30 : 5, right: 6, }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <CustomIcon type={'MaterialIcons'} name={'signal-wifi-off'} color={theme.mainTextColor} style={{ fontSize: 14 }} />
                </View>
            </Animated.View>
        )

    return null
}

export default memo(MyNetInfo)
