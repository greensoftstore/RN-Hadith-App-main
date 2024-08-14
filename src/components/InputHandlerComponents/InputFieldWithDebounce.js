// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, memo, useMemo, useCallback, useEffect } from 'react';
import { View, ScrollView, Pressable, Platform, Text } from 'react-native';
import { debounce } from 'lodash';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { CustomTextInput } from 'components'
// =================================================================== 
// Utilities
// ===================================================================
import { validateField } from 'utilities/validation'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'

const InputField = ({
    t,
    inputSettings,
    reduce,
    triedToSubmitAtLeastOnce,
    onSubmitEditing,
    reference,
    compareValue = null,
    initialValue = '',
    value = null,
    customContainer = {},
    disabled = false,
    onFocusAddition = null,
    shadow = false,
    textInputStyle = null,
    multiline = false
}) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [innerValue, setInnerValue] = useState(initialValue)
    const [refreshLocal, setRefreshLocal] = useState(0)
    // ===================================================================

    useEffect(() => {
        if (value !== null) changeLocalVal(value)
    }, [value]);

    const changeLocalVal = useCallback((valueA) => {
        if (valueA !== innerValue) {
            setInnerValue(valueA)
            setTimeout(() => {
                setRefreshLocal(val => val + 1)
            }, 200)
        }
    }, [innerValue]);
    // ===================================================================
    // Methods
    // -------------------------------------------------------------------
    const onChangeInput = useCallback((text) => {
        setInnerValue(text)
        debouncedTextInput(text);
    }, []);

    const debouncedTextInput = debounce(text => updateReducer(text), 150)

    const updateReducer = (text) => {
        reduce({ type: 'changeInput', payload: { name: inputSettings.label, value: text } })
    };
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    let validation = useMemo(() => (validateField(inputSettings, innerValue, compareValue)), [innerValue, compareValue])

    return (
        <View style={{ width: '100%', marginBottom: ConstNumbers.inputsMarginBottom, ...customContainer }}>
            <CustomTextInput
                editable={!disabled}
                refInner={reference ? reference : null}
                returnKeyType={inputSettings?.returnKeyType ? inputSettings.returnKeyType : "done"}
                textInputContainerStyle={shadow && themeVal === 'light' ? GlobalStyle.shadowMain : {}}
                placeholder={t(inputSettings.placeholder, inputSettings.placeholder)}
                placehonderFontSize={15}
                autoCapitalize={inputSettings.capitalize}
                onSubmitEditing={onSubmitEditing}
                onChangeText={(text) => onChangeInput(text)}
                selectionColor={theme.mainColor2}
                borderColorActive={theme.borderColorActive}
                borderColorInactive={theme.borderColorInactive}
                borderColorError={theme.borderColorError}
                value={innerValue}
                important={inputSettings?.validation?.important}
                showSecurityButton={inputSettings.secure}
                showError={triedToSubmitAtLeastOnce && !validation.bool}
                error={validation.text}
                additionalErrorText={validation.additionalText}
                blurOnSubmit={inputSettings?.returnKeyType && inputSettings.returnKeyType === 'next' ? false : true}
                onBlurAddition={() => updateReducer(innerValue)}
                keyboardType={inputSettings?.keyboardType ? inputSettings.keyboardType : null}
                icon={inputSettings.icon}
                imageIcon={inputSettings.imageIcon}
                onFocusAddition={onFocusAddition}
                style={textInputStyle}
                multiline={multiline}
            />
        </View>
    );
};

export default Localization('Common', memo(InputField));
