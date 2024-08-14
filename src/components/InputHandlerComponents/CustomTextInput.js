// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, TextInput, View, Text, Animated, TouchableOpacity, Image, Platform } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon } from 'components';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
import { GlobalStyle, ConstNumbers } from 'constantsConfiguration';
// =================================================================== 

const CustomTextInput = ({
    t,
    refInner,

    value,
    placeholder,
    important,

    blurOnSubmit,
    onSubmitEditing,

    editable = true,
    returnKeyType,
    capitalize,
    keyboardType,
    multiline,
    maxLength,

    onChangeText,
    onFocusAddition,
    onBlurAddition,

    textInputContainerStyle,
    style,
    placeholderColor,
    borderColorActive = 'transparent',
    borderColorInactive = 'transparent',
    borderColorError = 'transparent',
    selectionColor,
    backgroundColor,

    iconColor,
    icon = null,
    imageIcon = null,
    imageIconStyle = null,

    image,
    imageStyle,

    error,
    additionalErrorText,
    showError,
    showNumberOfCharacters,

    descriptionText = null,
    descriptionBottom = null,

    dropdown = false,
    showSecurityButton,
    showSearchIcon,
    date = false,
    customTextAnimationTranslateX = -40,
    percent = false,
    currency = false,
    displaySubmitButton = false,

    autoFocus = false
}) => {

    // ===================================================================
    // Redux Props
    // ===================================================================
    const theme = useSelector(selectThemeMode)

    // ===================================================================
    // Variables
    // ===================================================================

    // ===================================================================
    // State
    // ===================================================================

    const [showPassword, setShowPassword] = useState(showSecurityButton ? true : false)
    const [focused, setFocused] = useState(false)

    // ===================================================================
    // Ref
    // ===================================================================

    // ===================================================================
    // UseEffects
    // ===================================================================

    // ===================================================================
    // Methods
    // ===================================================================


    // ===================================================================
    // Animations
    // ===================================================================

    return (
        <View style={[{ width: '100%', height: 50, backgroundColor: backgroundColor || theme.textInputBackground, borderWidth: 1, borderRadius: ConstNumbers.borderRadiusMain, borderColor: showError ? theme.borderColorError : (focused && borderColorActive || value != null && value != '' && borderColorActive) ? borderColorActive : borderColorInactive }, textInputContainerStyle]}>
            <View style={{ width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center', }}>
                {(icon || imageIcon) &&
                    <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center', marginRight: 5, }} >
                        {imageIcon !== '' &&
                            <Image source={imageIcon} style={imageIconStyle ? imageIconStyle : { width: '50%', height: '50%', resizeMode: 'contain', tintColor: ((value !== '' && value !== null) || focused) ? theme.iconTextInputColorFocused : theme.iconTextInputColor }} />
                        }

                        {icon &&
                            < View style={{ position: 'absolute', right: 5, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', }}>
                                <CustomIcon type={icon.tzpe} name={icon.name} color={icon?.color ? icon.color : theme.iconTextInputColor} style={{ fontSize: 26 }} />
                            </View>
                        }
                    </View>
                }

                <TextInput
                    returnKeyType={returnKeyType ? returnKeyType : 'next'}
                    editable={editable}
                    ref={refInner ? refInner : null}
                    underlineColorAndroid='transparent'
                    placeholder={placeholder ? `${placeholder}${important ? '*' : ''}` : ''}
                    placeholderTextColor={placeholderColor ? placeholderColor : theme.placeholderTextColor}
                    style={[
                        {
                            ...GlobalStyle.textFontRegular,
                            width: '100%',
                            color: theme.textInputColor,
                            padding: 0,
                            paddingLeft: (icon || imageIcon) ? 0 : ConstNumbers.textInputPadding,
                            paddingRight: ConstNumbers.textInputPadding,
                            fontSize: Platform.OS === 'ios' ? 15 : 15,
                            textAlignVertical: 'center'
                        },
                        style
                    ]}
                    autoFocus={autoFocus}
                    value={value}
                    onChangeText={onChangeText}
                    selectionColor={selectionColor}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    multiline={multiline ? multiline : false}
                    maxLength={maxLength ? maxLength : null}
                    blurOnSubmit={blurOnSubmit ? blurOnSubmit : false}
                    onSubmitEditing={onSubmitEditing}

                    autoCapitalize={capitalize ? capitalize : 'none'}

                    secureTextEntry={showPassword}

                    onBlur={() => {
                        setFocused(false)

                        if (onBlurAddition)
                            onBlurAddition()

                    }}
                    onFocus={(e) => {
                        setFocused(true)

                        if (onFocusAddition)
                            onFocusAddition(e)
                    }}

                />
            </View>

            {
                displaySubmitButton &&
                < TouchableOpacity onPress={onSubmitEditing} style={{ position: 'absolute', right: 5, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <CustomIcon type={'MaterialCommunityIcons'} name={'send-circle'} color={iconColor ? iconColor : theme.lightTextColor} style={{ fontSize: 34 }} />
                </TouchableOpacity>
            }

            {
                showNumberOfCharacters &&
                <View style={{ position: 'absolute', bottom: -6, right: 10, }}>
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 8, color: placeholderColor ? placeholderColor : theme.placeholderTextColor, paddingVertical: 5, paddingLeft: 10 }}>{value && value !== '' && value !== null ? value.length : 0} / {maxLength}</Text>
                </View>
            }

            {
                showSecurityButton &&
                < TouchableOpacity onPress={() => { setShowPassword(!showPassword) }} style={{ position: 'absolute', right: 5, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <CustomIcon type={'MaterialCommunityIcons'} name={showPassword ? 'eye-outline' : 'eye-off-outline'} color={iconColor ? iconColor : theme.lightTextColor} style={{ fontSize: 26 }} />
                </TouchableOpacity>
            }

            {
                dropdown &&
                < View style={{ position: 'absolute', right: 5, height: '100%', width: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <CustomIcon type={'AntDesign'} name={'down'} color={iconColor ? iconColor : theme.lightTextColor} style={{ fontSize: 26 }} />
                </View>
            }

            {
                showError &&
                <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 8, color: theme.textColorRed, paddingBottom: 5, paddingLeft: 10, paddingTop: 2 }}>{t(error, error)}{additionalErrorText || ''}</Text>
            }

        </View >
    )
}

const styles = StyleSheet.create({


})

export default Localization('Common', memo(CustomTextInput));
