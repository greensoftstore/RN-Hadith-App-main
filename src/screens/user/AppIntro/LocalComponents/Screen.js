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
    Platform,
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
// import { GradientButton } from 'components'
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

const Screen = ({ t, navigation, introData, data, index, xOffset, screenWidth, screenHeight, scrollViewRef, /* fullSize, currentPosition, endReached, */ paddingTop, bottomHeight, dataHeight, setActiveScreen }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const appIntroActive = useSelector(selectAppIntro)
    // ===================================================================

    const onPressNext = (index) => {
        let endReached = index === introData.length - 1 ? true : false;

        if (endReached) {
            finishIntro()
        } else {
            scrollViewRef.current.scrollTo({ x: (index + 1) * screenWidth, y: 0, animated: true });
            setTimeout(() => {
                setActiveScreen(index + 1)
            }, 300)
        }
    }

    const finishIntro = useCallback(() => {
        if (appIntroActive) {
            navigation.replace(moduleNames.HOME)
            setTimeout(() => {
                dispatchRedux(toggleAppIntro())
            }, 100)
        } else {
            navigation.goBack()
        }
    }, [])

    const transitionAnimation = index => {
        return {
            transform: [
                { perspective: 800 },
                {
                    scale: xOffset.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth
                        ],
                        outputRange: [0.25, 1, 0.25]
                    })
                },
                {
                    rotateX: xOffset.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth
                        ],
                        outputRange: ["45deg", "0deg", "45deg"]
                    })
                },
                {
                    rotateY: xOffset.interpolate({
                        inputRange: [
                            (index - 1) * screenWidth,
                            index * screenWidth,
                            (index + 1) * screenWidth
                        ],
                        outputRange: ["-45deg", "0deg", "45deg"]
                    })
                }
            ]
        };
    };

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: screenWidth, }}>
            <Animated.View style={[{ height: '100%', marginTop: 0, justifyContent: 'flex-end', alignItems: "center", borderRadius: ConstNumbers.borderRadiusMain, padding: 20, paddingBottom: 0, paddingHorizontal: ConstNumbers.paddingHorizontalCard, }, transitionAnimation(index)]}>
                <View style={{ height: dataHeight, width: '100%', paddingTop: 10, justifyContent: 'flex-start', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
                        <Text style={{ ...GlobalStyle.textFontBold, color: theme.mainTextColor, fontSize: 20, }}>{t(data.title, data.title_en)}</Text>
                    </View>

                    <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={{ ...GlobalStyle.textFontRegular, color: theme.secondaryTextColor, fontSize: 16, }} >{t(data.description, data.description_en)}</Text>
                    </View>

                    {/* <GradientButton
                        containerStyle={{ height: 55, borderRadius: ConstNumbers.borderRadiusMain, marginBottom: 10, width: '100%' }}
                        // text={t('next', 'Next')}
                        text={index === introData.length - 1 ? t('done', 'Done') : t('next', 'Next')}
                        textStyle={{ fontSize: 20, color: theme.textColorWhite }}
                        onPress={() => { onPressNext(index) }}
                        pressableBackground={theme.buttonPressableColor2}
                        customGradient={theme.gradientColor1}
                        reverse
                        icon={{ type: 'AntDesign', name: index === introData.length - 1 ? 'check' : 'arrowright', iconSize: 18, iconStyle: { color: theme.textColorWhite } }}
                    /> */}
                </View>
            </Animated.View>
        </View >
    )
};

export default Localization('Intro', memo(Screen));
