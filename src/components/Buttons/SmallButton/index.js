// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Platform, Text, Pressable, Image } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'
// ===================================================================

const SmallButton = ({
    customContainerStyle = {},
    width = '100%',
    height = 55,
    disabled = false,
    backgroundColor,
    iconData = null,
    image = null,
    onPress,
    border = 1,
    borderColor,
    shadow = false,
    imageCustomStyle
}) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------

    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)

    // ===================================================================

    return (
        <View style={[{ width: width, borderWidth: border ? border : 0, borderColor: borderColor ? borderColor : theme.borderButtonColor, height: height, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: backgroundColor ? backgroundColor : theme.secondaryButtonColor, }, customContainerStyle, shadow && themeVal === 'light' ? GlobalStyle.shadowMain : {}]}>
            <View style={[{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, },]}>
                <Pressable
                    disabled={disabled}
                    android_ripple={{ color: theme.buttonPressableColor1, }}
                    style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? theme.buttonPressableColor1 : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                    onPress={onPress}

                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                        {iconData && <CustomIcon type={iconData.type} name={iconData.name} color={iconData?.color ? iconData.color : theme.mainTextColor} style={iconData.style} />}
                        {image && <Image source={image} style={[{ width: '50%', height: '50%', resizeMode: 'contain' }, imageCustomStyle]} />}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default memo(SmallButton);
