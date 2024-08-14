// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

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

const Title = ({ navigation, selectedItem, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);

    const activeFont = useSelector(selectActiveFont)
    const fontSize = useSelector(selectFontSize)
    // ===================================================================

    let title = selectedItem?.hadithTitle || 'Naslov hadisa'
    let categoryName = selectedItem?.categoryName || selectedItem?.category?.categoryName || ''
    let subcategoryTitle = selectedItem?.subCategoryTitle || selectedItem?.subCategory?.subCategoryTitle || ''

    const sharedValue = useSharedValue(0);

    const [subtitleHeightMax, setSubtitleHeightMax] = useState(20);

    const onPress = () => {

        let value = sharedValue.value === 1 ? 0 : 1

        sharedValue.value = withTiming(value, {
            duration: 100,
            easing: Easing.linear,
        })
    }

    const subtitleHeight = useAnimatedStyle(() => {
        const height = interpolate(sharedValue.value, [0, 1], [10, subtitleHeightMax], {
            extrapolateLeft: Extrapolate.CLAMP,
            extrapolateRight: Extrapolate.CLAMP,
        })
        return {
            height: height
        };
    }, [subtitleHeightMax]);

    const subtitleOpacityText = useAnimatedStyle(() => {
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
        <Animated.View style={{ width: '100%', overflow: 'hidden', }} >
            <View style={{ width: '100%', minHeight: 40, paddingVertical: 2, overflow: 'hidden', flexDirection: 'row', paddingHorizontal: ConstNumbers.paddingHorizontalCard }}>
                <View style={{ /* height: 40, */ flex: 1, paddingVertical: 9, justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={[
                        activeFont === 'Bookerly'
                            ? GlobalStyle.textFontBookerlyBold
                            : activeFont === 'Georgia'
                                ? GlobalStyle.textFontGeorgiaBold
                                : GlobalStyle.textFontMedium,
                        { fontSize: 16 + fontSize, color: theme.singleHadithTitleColor, lineHeight: 20 + fontSize, letterSpacing: -0.25 }]}
                        numberOfLines={2}
                        >
                        {title}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => { onPress() }} style={{ width: 35, height: 40, transform: [{ translateX: 9 }], justifyContent: 'center', alignItems: 'center', }} >
                    <Animated.Image source={Images.Right} style={[{ width: 33, height: 15, resizeMode: 'contain', tintColor: theme.singleHadithIconColor }, arrowRotate]} />
                </TouchableOpacity>
            </View>

            <Animated.View style={[{ width: '100%', paddingHorizontal: ConstNumbers.paddingHorizontalCard, marginTop: -10, }, subtitleHeight]} >
                <Animated.Text onLayout={(event) => { if (event.nativeEvent.layout.height > 20) setSubtitleHeightMax(event.nativeEvent.layout.height + 5) }} style={[GlobalStyle.textFontRegular, { position: 'absolute', paddingHorizontal: ConstNumbers.paddingHorizontalCard, top: 0, fontSize: 11, color: theme.singleHadithSubTitleColor, }, subtitleOpacityText]}>{categoryName} / {subcategoryTitle}</Animated.Text>
            </Animated.View>

            <View style={{ width: '100%', height: 1, backgroundColor: theme.singleHadithDeviderColor }} />
        </Animated.View>
    );
};

export default memo(Title);
