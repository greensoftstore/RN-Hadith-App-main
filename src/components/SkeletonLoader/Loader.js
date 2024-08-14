
// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, memo, } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    Extrapolate,
    interpolate,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
// ===================================================================
// Constants
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================

const Loader = ({ customBackground = null, displaySkeletonLoader, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // Style
    // -------------------------------------------------------------------
    const { container } = style
    // ===================================================================

    // ===================================================================
    // Variables
    // -------------------------------------------------------------------
    const opacityAnimation = useSharedValue(1);
    // ===================================================================

    // ===================================================================
    // useEffect
    // -------------------------------------------------------------------
    useEffect(() => {
        opacityAnimation.value = withRepeat(
            withTiming(0, {
                duration: 1000,
                easing: Easing.ease,
            }),
            -1,
            true
        )
    }, [])
    // ===================================================================

    // ===================================================================
    // Animations
    // -------------------------------------------------------------------
    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(opacityAnimation.value, [0, 1], [0.5, 0.9], {
            extrapolateLeft: Extrapolate.EXTEND,
            extrapolateRight: Extrapolate.EXTEND,
        })

        return {
            opacity: opacity,
        };
    });
    // ===================================================================

    return (
        <Animated.View
            style={[container, {
                backgroundColor: customBackground ? customBackground : theme.skeletonLoader,
            }, animatedStyles]}
        >
        </Animated.View>
    );
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default memo(Loader);
