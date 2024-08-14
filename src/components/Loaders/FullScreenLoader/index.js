// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { StatusBar } from 'react-native'
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { SpinnerCustom } from 'components'
// =================================================================== 

const FullScreenLoader = ({ isLoading, absolute = true, customStyle }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    if (isLoading)
        return (
            <Animated.View entering={FadeIn.duration(600)} exiting={FadeOut.duration(400)} style={[customStyle ? customStyle : { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.loaderColorBackground }, absolute ? { position: 'absolute', zIndex: 9999 } : {}]}>
                {/* <StatusBar
                    animated={true}
                    backgroundColor={'#000000'}
                    barStyle={"light-content"}
                /> */}
                <Animated.View entering={ZoomIn.duration(1000)} >
                    <SpinnerCustom size={50} color={theme.loaderColor} type={'FadingCircleAlt'} />
                </Animated.View>
            </Animated.View>
        )

    return null
};

export default memo(FullScreenLoader);
