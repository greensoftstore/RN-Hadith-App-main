// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { selectActiveFont, selectFontSize } from 'reduxConfiguration/slices/fontSlice';

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
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";

const Title = ({ navigation, item, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);

    const activeFont = useSelector(selectActiveFont)
    const fontSize = useSelector(selectFontSize)
    // ===================================================================


    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', overflow: 'hidden', }} >
            <View style={{ width: '100%', minHeight: 40, paddingVertical: 2, overflow: 'hidden', flexDirection: 'row', paddingHorizontal: ConstNumbers.paddingHorizontalCard }}>
                <View style={{/*  height: 40, */ flex: 1, paddingVertical: 9, justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={[
                        activeFont === 'Bookerly'
                            ? GlobalStyle.textFontBookerlyBold
                            : activeFont === 'Georgia'
                                ? GlobalStyle.textFontGeorgiaBold
                                : GlobalStyle.textFontMedium,
                        { fontSize: 16 + fontSize, lineHeight: 20 + fontSize, letterSpacing: -0.25, color: theme.singleHadithTitleColor, }]}
                        numberOfLines={2}
                        >
                        {item?.hadithTitle || 'Naslov hadisa'}
                    </Text>
                </View>
            </View>

            <View style={{ width: '100%', height: 1, backgroundColor: theme.singleHadithDeviderColor }} />
        </View>
    );
};

export default memo(Title);