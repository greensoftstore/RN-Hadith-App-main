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
    TouchableOpacity
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
import { selectAppIntro, toggleAppIntro } from 'reduxConfiguration/slices/settingsSlice';
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon, GradientButton, GradientChackboxSingle } from 'components'
import { LogoSVG } from 'components/SVGImages'
// =================================================================== 
// Local Components
// ===================================================================
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ConstNumbers } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 


const RenderDots = ({ t, navigation, introData, xOffset, scrollViewRef, screenWidth, setActiveScreen, activeScreen, length }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const appIntro = useSelector(selectAppIntro)
    // ===================================================================

    const onPressNext = (index) => {
        let endReached = index === introData.length - 1 ? true : false;
        if (endReached) {
            onPressSkip()
        } else {
            scrollViewRef.current.scrollTo({ x: (index + 1) * screenWidth, y: 0, animated: true });
            setTimeout(() => {
                setActiveScreen(index + 1)
            }, 300)
        }
    }

    const onPressSkip = () => {
        if (appIntro) {
            dispatchRedux(toggleAppIntro())

            // navigation.replace(moduleNames.BOTTOM_TABS)
            navigation.replace(moduleNames.HOME)

        } else {

            // navigation.replace(moduleNames.BOTTOM_TABS)
            navigation.goBack()

        }
    }

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const dotPosition = Animated.divide(xOffset, screenWidth);
    const dotSizeMain = 8;

    return (
        <View style={{ position: 'absolute', bottom: 35, left: 0, right: 0, height: 50, paddingTop: 0, paddingHorizontal: ConstNumbers.paddingHorizontalMain, alignItems: 'center', justifyContent: 'center', zIndex: 99, }}>

            {/* <View style={{ position: 'absolute', zIndex: 99, left: 10 }} >
                <TouchableOpacity
                    onPress={() => {
                        onPressSkip()
                    }}
                    style={{ padding: 10 }}
                >
                    <Text style={{ ...GlobalStyle.textFontRegular, color: theme.secondaryTextColor, fontSize: 16, }} >{t('close', 'Close')}</Text>
                </TouchableOpacity>
            </View> */}


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 12,
                marginBottom: 12,
                height: 24,
            }}>
                {introData.map((item, index) => {
                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [dotSizeMain, dotSizeMain * 3.5, dotSizeMain],
                        extrapolate: "clamp"
                    });

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                width: dotSize,
                                height: dotSizeMain,
                                // transform: [{ scale: dotSize }],
                                borderRadius: dotSizeMain,
                                backgroundColor: theme.introDotColor,
                                marginHorizontal: 3
                            }}
                        />
                    );
                })}
            </View>

            <View style={{ position: 'absolute', zIndex: 99, right: 20 }} >
                <TouchableOpacity onPress={() => { onPressNext(activeScreen) }} style={{ width: 40, height: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.mainButtonColor }} >
                    <CustomIcon type={'Feather'} name={activeScreen === length - 1 ? 'check' : 'chevron-right'} color={theme.textColorWhite} style={{ fontSize: 26 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Localization('Intro', memo(RenderDots));
