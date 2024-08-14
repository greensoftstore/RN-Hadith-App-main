// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, Platform, Text, TouchableOpacity, Image } from 'react-native';
import { debounce } from 'lodash';
import { ShadowedView } from 'react-native-fast-shadow';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
// Components
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// ===================================================================
import { CustomTextInput } from 'components'

const InputFieldAddFavourite = ({
    t,
    displayIcon = true,
    onSubmitEditing,
    initialValue = '',
    value = null,
    disabled = false,
    shadow = false,
    textInputStyle = null,
    width = '100%',
    height = 50,
    backgroundColor = null,
    customContainerStyle,
    autoFocus = false,
    refInner = null,
    customInputHandler = null,
    minNumberOfCharacter = 1,
    resetSearch,
    onPressFilter,
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

    useEffect(() => {
        if (resetSearch) changeLocalVal('')
    }, [resetSearch]);

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
        if (minNumberOfCharacter <= text.length || text.length === 0)
            debouncedTextInput(text);
    }, []);

    const debouncedTextInput = debounce(text => updateReducer(text), 600)

    const updateReducer = (text) => {
        if (customInputHandler) customInputHandler(text)
        // reduce({ type: 'changeInput', payload: { name: inputSettings.label, value: text } })
    };
    // ===================================================================

    return (
        <View style={[{ width: width, height: height, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, }, customContainerStyle]}>
            <View style={[{ flex: 1, height: height, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, borderWidth: 0.3, borderColor: theme.searchInputBorderColor, backgroundColor: backgroundColor || theme.searchInputBackgroundColor, overflow: 'hidden' }]}>
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 0, }}>
                    <Image source={Images.Search} style={{ width: 40, height: 40, resizeMode: 'contain', tintColor: theme.searchButtonIconColor }} />
                </View>

                <View style={{ flex: 1, }} >
                    <CustomTextInput
                        height={height}
                        editable={!disabled}
                        refInner={refInner}
                        returnKeyType={"search"}
                        textInputContainerStyle={{}}
                        placeholder={t('searchByCollections', 'Search by collections')}
                        placeholderColor={theme.searchButtonTextColor}
                        backgroundColor={theme.searchInputBackgroundColor}
                        placehonderFontSize={15}
                        autoCapitalize={false}
                        onSubmitEditing={onSubmitEditing}
                        onChangeText={(text) => onChangeInput(text)}
                        selectionColor={theme.mainColor2}
                        borderColorActive={theme.searchInputBackgroundColor}
                        borderColorInactive={theme.searchInputBackgroundColor}
                        borderColorError={theme.searchInputBackgroundColor}
                        value={innerValue}
                        blurOnSubmit={true}
                        onBlurAddition={() => {}}
                        style={textInputStyle || { paddingRight: 0, paddingLeft: 0, paddingTop: Platform.OS === 'ios' ? 0 : 0, fontSize: 16, color: theme.textColorReverse }}
                        autoFocus={autoFocus}
                    />
                </View>
            </View>

            <TouchableOpacity disabled={disabled} onPress={onPressFilter} style={{ width: height, height: height, borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: backgroundColor || theme.searchInputBackgroundColor, borderWidth: 0.3, borderColor: theme.searchInputBorderColor, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Image source={Images.Filter} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: theme.searchInputFilterImageColor }} />
            </TouchableOpacity>
        </View>
    )
}

export default Localization('Search', memo(InputFieldAddFavourite));
