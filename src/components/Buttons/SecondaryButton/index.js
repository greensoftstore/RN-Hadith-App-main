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

const SecondaryButton = ({
    customContainerStyle = {},
    textWeight = null,
    width = '100%',
    height = 55,
    disabled = false,
    backgroundColor,
    iconDataLeft = null,
    imageLeft = null,
    iconDataRight = null,
    imageRight = null,
    text = null,
    textCustomStyle = {},
    onPress,
    border = 1,
    borderColor,
    shadow = false,
    pressableColor
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
                    android_ripple={{ color: pressableColor || theme.buttonPressableSecondaryButton, }}
                    style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? pressableColor || theme.buttonPressableSecondaryButton : 'transparent', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}
                    onPress={onPress}

                >
                    <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', paddingHorizontal: 5, }}>
                        <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                            {iconDataLeft && <CustomIcon type={iconDataLeft.type} name={iconDataLeft.name} color={iconDataLeft?.color ? iconDataLeft.color : theme.mainTextColor} style={iconDataLeft.style} />}
                            {imageLeft && <Image source={imageLeft} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />}
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            {text && <Text style={[textWeight ? textWeight : GlobalStyle.textFontRegular, { fontSize: 16, color: theme.secondaryButtonTextColor, textAlign: 'center', ...textCustomStyle, }]}>{text}</Text>}
                        </View>

                        <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                            {iconDataRight && <CustomIcon type={iconDataRight.type} name={iconDataRight.name} color={iconDataRight?.color ? iconDataRight.color : theme.mainTextColor} style={iconDataRight.style} />}
                            {imageRight && <Image source={imageRight} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />}
                        </View>
                    </View>

                </Pressable>
            </View>
        </View>
    )
}

export default memo(SecondaryButton);
