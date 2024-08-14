// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, memo, useEffect, } from 'react';
import { Platform, Keyboard, } from 'react-native';
import Animated, {
    useAnimatedProps,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
    withRepeat,
    interpolate,
    Extrapolation,
    Easing,
    withDelay
} from 'react-native-reanimated';
import { ConstNumbers } from '../../constantsConfiguration';
//=================================================================== 

const KeyboardBottom = ({
    useOnAndroid,
    hideBottomBar,
    toggleDisplayBottomBar,
    animate,
    bottomOffset = true
}) => {
    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const animatedVal = useSharedValue(0);
    // ===================================================================

    // ===================================================================
    // UseEffects
    // -------------------------------------------------------------------
    useEffect(() => {
        const keyboardDidShowListener = Platform.OS === 'android' ? Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                // setKeyboardVisible(parseInt(e.endCoordinates.height));
                // console.log('e.endCoordinates.height ', e.endCoordinates.height)
                if (useOnAndroid)
                    animatedVal.value = withTiming(e.endCoordinates.height, {
                        duration: 200,
                        easing: Easing.linear,
                    })

                if (hideBottomBar) {
                    toggleDisplayBottomBar(false)
                }
            }
        ) : Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                // setKeyboardVisible(parseInt(e.endCoordinates.height));
                let bottomOffsetLocal = hideBottomBar ? ConstNumbers.footerHeight + 10 : ConstNumbers.footerPaddingBottom
                let finalVal = bottomOffset ? e.endCoordinates.height - bottomOffsetLocal : e.endCoordinates.height
                animatedVal.value = withTiming(finalVal, {
                    duration: animate ? hideBottomBar ? 400 : 200 : 0,
                    easing: Easing.linear,
                })
            }
        )

        const keyboardDidHideListener = Platform.OS === 'android' ? Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                // setKeyboardVisible(0);
                if (useOnAndroid)
                    animatedVal.value = withTiming(0, {
                        duration: 200,
                        easing: Easing.linear,
                    })

                if (hideBottomBar) {
                    setTimeout(() => {
                        toggleDisplayBottomBar(true)
                    }, 300)
                }
            }
        ) : Keyboard.addListener(
            'keyboardWillHide',
            (e) => {
                // console.log('keyboardWillHide')
                // setKeyboardVisible(0);
                animatedVal.value = withTiming(0, {
                    duration: animate ? 200 : 0,
                    easing: Easing.linear,
                })
            }
        )

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    // ===================================================================

    // ===================================================================
    // Animation
    // -------------------------------------------------------------------

    const animatedStyle = useAnimatedStyle(() => {

        return {
            height: animatedVal.value
        };
    });
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <Animated.View key={'keyboardHeight'} style={[{ width: '100%', }, animatedStyle]}></Animated.View>
    );
};

export default memo(KeyboardBottom);
