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
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'

const InputFieldNotesMultiline = ({
    onSubmitEditing,
    initialValue = '',
    customContainer = {},
    onFocusAddition = null,
    textInputStyle = null,
    customTextChange,
    disabled = false,
    autoFocus = false,
    refInner = null
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
    // ===================================================================

    // ===================================================================
    // Methods
    // -------------------------------------------------------------------
    const onChangeInput = useCallback((text) => {
        setInnerValue(text)
        debouncedTextInput(text);
    }, []);

    const debouncedTextInput = debounce(text => updateReducer(text), 250)

    const updateReducer = (text) => {
        customTextChange(text)
    };
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', height: '100%', ...customContainer }}>
            <CustomTextInput
                refInner={refInner}
                editable={!disabled}
                returnKeyType={"done"}
                textInputContainerStyle={{ height: '100%', backgroundColor: 'transparent' }}
                placeholder={'Upišite vašu zabilješku'}
                placehonderFontSize={0}
                autoCapitalize={true}
                onSubmitEditing={onSubmitEditing}
                onChangeText={(text) => onChangeInput(text)}
                selectionColor={theme.mainColor2}
                borderColorActive={'transparent'}
                borderColorInactive={'transparent'}
                borderColorError={'transparent'}
                value={innerValue}
                important={false}
                blurOnSubmit={true}
                onFocusAddition={onFocusAddition}
                style={[{ textAlignVertical: 'top', height: '100%', paddingVertical: ConstNumbers.paddingHorizontalMain, paddingTop: Platform.OS == 'ios' ? 12 : 11 }, textInputStyle]}
                multiline={true}
                capitalize={'sentences'}
                maxLength={250}
                showNumberOfCharacters={true}
                autoFocus={autoFocus}
            />
        </View>
    );
};

export default memo(InputFieldNotesMultiline);
