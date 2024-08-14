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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const Skip = ({ t, navigation, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const appIntro = useSelector(selectAppIntro)
    // ===================================================================

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

    let headerHeight = ConstNumbers.headerHeightSecond

    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;

    let headerPaddingHeightFinal = ConstNumbers.headerPaddingHeight < statusBarHeight ? statusBarHeight : ConstNumbers.headerPaddingHeight

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ position: 'absolute', paddingRight: 10, paddingBottom: 6,  top: 0, width: '100%', paddingTop: headerPaddingHeightFinal, height: Platform.OS === 'ios' ? headerHeight + headerPaddingHeightFinal : headerHeight, alignItems: 'flex-end', justifyContent: 'center', zIndex: 99, }} >

                <View style={{  }} >
                    <TouchableOpacity
                        onPress={() => {
                            onPressSkip()
                        }}
                        style={{ padding: 10, }}
                    >
                        <Text style={{ ...GlobalStyle.textFontRegular, color: theme.secondaryTextColor, fontSize: 16, }} >{t('close', 'Close')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            )
};

            export default Localization('Intro', memo(Skip));
