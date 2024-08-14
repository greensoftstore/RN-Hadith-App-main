// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Text, Easing, Image, Dimensions, StatusBar } from "react-native";
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectDefaultDateRangeForFilter } from 'reduxConfiguration/slices/settingsSlice';
// =================================================================== 
// Components
// ===================================================================
// import { LogoSVG } from 'components'
// =================================================================== 
import { Images } from 'constantsConfiguration'

export default function WithSplashScreen({
    children,
    isAppReady,
}) {
    return (
        <>
            {isAppReady && children}

            <Splash isAppReady={isAppReady} />
        </>
    );
}

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

export const Splash = ({ isAppReady }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const containerOpacity = useRef(new Animated.Value(1)).current;
    const imageAnimation = useRef(new Animated.Value(0)).current;

    const [state, setState] = useState(LOADING_IMAGE);

    useEffect(() => {
        if (state === LOADING_IMAGE) setState(FADE_IN_IMAGE);
        if (state === FADE_IN_IMAGE) {
            Animated.timing(imageAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.linear
            }).start();

            setTimeout(() => {
                setState(WAIT_FOR_APP_TO_BE_READY);
            }, 400)
        }
    }, [imageAnimation, state]);

    useEffect(() => {
        if (state === WAIT_FOR_APP_TO_BE_READY) {
            if (isAppReady) {
                setState(FADE_OUT);
            }
        }
    }, [isAppReady, state]);

    useEffect(() => {
        if (state === FADE_OUT) {
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 500, // Fade out duration
                delay: 300, // Minimum time the logo will stay visible
                useNativeDriver: true,
            }).start(() => {
                setState(HIDDEN);
            });
        }
    }, [containerOpacity, state]);

    const imageOpacity2 = imageAnimation.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0, 1, 1]
    });

    const imageOpacity3 = imageAnimation.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0, 0, 1]
    });

    const imageZIndex1 = imageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-1, 1]
    });

    if (state === HIDDEN) return null;


    return (
        <Animated.View
            collapsable={false}
            style={[style.container, { opacity: containerOpacity, backgroundColor: theme.splashScreenStatusBar }]}
        >
            <StatusBar
                animated={true}
                backgroundColor={theme.splashScreenStatusBar}
                barStyle={"light-content"}
            />

            {state !== LOADING_IMAGE &&
                <Animated.View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, opacity: imageOpacity2 }}>
                    {/*                    <View style={{ width: 170, height: 170,  justifyContent: 'center', alignItems: 'center' }}>
                    <LogoSVG animated duration={1200} customColor={'#FFFFFF'} />
                </View> */}
                    <Image source={Images.SplashScreen} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </Animated.View>
            }
        </Animated.View >
    );
};

const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 150,
    },
});