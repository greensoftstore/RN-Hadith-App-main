// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    Image,
    Platform
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 


const BackgroundImages = ({ t, introData, xOffset, screenWidth }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================
    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const backgroundPosition = Animated.divide(xOffset, screenWidth);

    return (
        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -2,
        }}>
            {introData.map((item, index) => {
                const opacity = backgroundPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 1, 0],
                    extrapolate: "clamp"
                });

                const scale = backgroundPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 1, 0],
                    extrapolate: "clamp"
                });

                return (
                    <Animated.View
                        key={`background-${index}`}
                        opacity={opacity}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            zIndex: introData.length - index,
                        }}
                    >
                        <Animated.Image source={item.background} style={{ width: '100%', height: '100%', resizeMode: 'contain', transform: [{ scale: scale }] }} />
                    </Animated.View>
                );
            })}
        </View>
    )
};

export default Localization('Intro', memo(BackgroundImages));
