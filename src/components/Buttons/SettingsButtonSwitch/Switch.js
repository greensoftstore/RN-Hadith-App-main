// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect } from 'react';
import { TouchableOpacity, } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
    withRepeat,
    interpolate,
    Extrapolation,
    Easing,
    withDelay,
    Extrapolate
} from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { ShadowedView } from 'react-native-fast-shadow';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'
// ===================================================================

const Switch = ({
    disabledSwitch = true,
    onPressSwitch,
    value = false,
}) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------

    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)

    // ===================================================================

    const animatedVal = useSharedValue(0);

    useEffect(() => {
        animatedVal.value = withTiming(value ? 1 : 0, {
            duration: 200,
            easing: Easing.linear,
        })
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(animatedVal.value, [0, 1], [0, 21], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })

        return {
            transform: [{ translateX: translateX }],
        };
    });

    const animatedStyleContainer = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animatedVal.value,
            [0, 1],
            [theme.switchButtonToggleInactive, theme.switchButtonToggleActive]
        )

        return {
            backgroundColor: backgroundColor
        };
    });

    return (
        <TouchableOpacity activeOpacity={1} disabled={disabledSwitch} onPress={onPressSwitch} >
            <Animated.View style={[{ height: 28, width: 49, padding: 2.5, borderRadius: 100, /* backgroundColor: theme.switchButtonToggleInactive */ }, animatedStyleContainer]}>
                <Animated.View style={[{ width: 23, height: 23, }, animatedStyle]} >
                    <ShadowedView style={[{ width: 23, height: 23, borderRadius: 100, backgroundColor: theme.switchButtonToggleCircle, }, themeVal === 'light' ? GlobalStyle.shadowMain : {}]}></ShadowedView>
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default memo(Switch);
