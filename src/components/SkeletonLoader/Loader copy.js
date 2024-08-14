
// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, memo, useMemo, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Loader = ({ style, customBackground = null, displaySkeletonLoader, customSkeletonSecondColor = null }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [animatedValue] = useState(new Animated.Value(0))
    // ===================================================================

    const { width } = useMemo(() => (Dimensions.get("window")), []);

    const anim = useRef(
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        )
    ).current

    useEffect(() => {
        if (displaySkeletonLoader) {
            anim.start()
        } else {
            anim.stop()
        }

    }, [displaySkeletonLoader])

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [width * -1.5, width * 1.5],
    });

    return (
        <Animated.View
            style={{
                opacity: 1,
                backgroundColor: customBackground ? customBackground : theme.skeletonFirstColor,
                borderColor: theme.skeletonSecondColor,
                overflow: 'hidden',
                ...style,
                width: width * 2
            }}
        >
            <AnimatedLG
                colors={[
                    customBackground ? customBackground : theme.skeletonFirstColor,
                    customBackground ? customBackground : theme.skeletonFirstColor,
                    customSkeletonSecondColor ? customSkeletonSecondColor : theme.skeletonSecondColor,
                    customSkeletonSecondColor ? customSkeletonSecondColor : theme.skeletonSecondColor,
                    customBackground ? customBackground : theme.skeletonFirstColor,
                    customBackground ? customBackground : theme.skeletonFirstColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateX: translateX }],
                }}
            />
        </Animated.View>
    );
};
export default memo(Loader);
