// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Platform, Text, Pressable } from 'react-native';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon, SpinnerCustom } from 'components'
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'
// ===================================================================

const MainButton = ({ customContainerStyle = {}, loading, loaderColor, textWeight = null, width = '100%', height = 55, disabled = false, backgroundColor, textColor, text = null, textCustomStyle = {}, onPress, shadow, pressableMainButton }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------

    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)

    // ===================================================================

    return (
        <View style={[{ width: width, height: height, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: backgroundColor || theme.mainButtonColor, }, customContainerStyle, shadow && themeVal === 'light' ? GlobalStyle.shadowMain : {}]}>
            <View style={[{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, },]}>
                <Pressable
                    disabled={disabled}
                    android_ripple={{ color: pressableMainButton || theme.buttonPressableMainButton, }}
                    style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? pressableMainButton || theme.buttonPressableMainButton : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                    onPress={() => { onPress() }}

                >
                    <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingTop: Platform.OS === 'android' ? 1 : 0, paddingBottom: Platform.OS === 'ios' && loading ? 5 : 0 }}>
                        {text && !loading && <Text style={[textWeight ? textWeight : GlobalStyle.textFontRegular, { fontSize: 16, color: textColor || theme.textColorWhite, ...textCustomStyle }]}>{text}</Text>}
                        {loading && <SpinnerCustom size={25} color={loaderColor || theme.loaderColor} type={'FadingCircleAlt'} />}
                    </View>

                </Pressable>
            </View>
        </View>
    )
}

export default memo(MainButton);
