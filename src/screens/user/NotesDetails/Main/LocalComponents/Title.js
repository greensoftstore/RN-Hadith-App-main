// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useMemo } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, Keyboard } from 'react-native';

import Animated, {
    ZoomIn,
    SlideInLeft,
    withRepeat,
    withTiming,
    withDelay,
    useSharedValue,
    useAnimatedStyle,
    cancelAnimation,
    Easing,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectActiveFont, selectFontSize } from 'reduxConfiguration/slices/fontSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";

import Description from './Description'

const Title = ({ navigation, selectedItem, isLoading }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);

    const activeFont = useSelector(selectActiveFont)
    const fontSize = useSelector(selectFontSize)

    const finalHeight = useMemo(() => (Dimensions.get('window').height * 0.28), [])
    // ===================================================================

    const sharedValue = useSharedValue(0);

    const onPress = () => {

        let value = sharedValue.value === 1 ? 0 : 1

        if (value === 1) Keyboard.dismiss()

        setTimeout(() => {
            sharedValue.value = withTiming(value, {
                duration: 200,
                easing: Easing.linear,
            })
        }, value === 1 ? 0 : 0)
    }

    const descriptionHeight = useAnimatedStyle(() => {
        const height = interpolate(sharedValue.value, [0, 1], [0, finalHeight], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })
        return {
            height: height
        };
    }, []);

    const opacityLine = useAnimatedStyle(() => {
        const opacity = interpolate(sharedValue.value, [0, 1], [0, 1], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })
        return {
            opacity: opacity
        };
    }, []);


    const arrowRotate = useAnimatedStyle(() => {
        const rotate = interpolate(sharedValue.value, [0, 1], [90, -90], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })
        return {
            transform: [{ rotate: `${rotate}deg` }]
        };
    }, []);


    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <>
            {/* <View style={{ width: '100%', overflow: 'hidden', }} >
                <View style={{ width: '100%', height: 45, overflow: 'hidden', flexDirection: 'row', paddingHorizontal: ConstNumbers.paddingHorizontalMain }}>
                    <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={[
                            GlobalStyle.textFontMedium,
                            { fontSize: 16, color: theme.singleHadithTitleColor, lineHeight: 20, letterSpacing: -0.25 }]}
                            numberOfLines={2}
                        >
                            {selectedItem?.hadithTitle || 'Naslov hadisa'}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => { onPress() }} style={{ width: 35, height: 50, transform: [{ translateX: 9 }], justifyContent: 'center', alignItems: 'center', }} >
                        <Animated.Image source={Images.Right} style={[{ width: 33, height: 15, resizeMode: 'contain', tintColor: theme.singleHadithIconColor }, arrowRotate]} />
                    </TouchableOpacity>
                </View>
            </View> */}

            <View style={{ width: '100%', overflow: 'hidden', }} >
                <View style={{ width: '100%', minHeight: 40, paddingVertical: 2, overflow: 'hidden', flexDirection: 'row', paddingHorizontal: ConstNumbers.paddingHorizontalCard, }}>
                    <View style={{ /* height: 40, */ flex: 1, paddingVertical: 9, justifyContent: 'center', alignItems: 'flex-start', }}>
                        <Text style={[GlobalStyle.textFontMedium, { fontSize: 16, color: theme.singleHadithTitleColor, lineHeight: 20, letterSpacing: -0.25 }]} numberOfLines={2} >
                            {selectedItem?.hadithTitle || 'Naslov hadisa'}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => { onPress() }} style={{ width: 35,/*  height: 40, */ transform: [{ translateX: 9 }], justifyContent: 'center', alignItems: 'center', }} >
                        <Animated.Image source={Images.Right} style={[{ width: 33, height: 15, resizeMode: 'contain', tintColor: theme.singleHadithIconColor }, arrowRotate]} />
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.View style={[{ width: '100%', height: 1, backgroundColor: theme.singleHadithDeviderColor }, opacityLine]} />

            <Animated.View style={[{ width: '100%', }, descriptionHeight]} >
                <Description
                    text={selectedItem?.content}
                />
            </Animated.View>
        </>
    );
};

export default memo(Title);
