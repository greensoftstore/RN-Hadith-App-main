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
import { MainButton } from 'components'
import { ConstNumbers, GlobalStyle, Images, } from 'constantsConfiguration'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// ===================================================================
import CustomTextInput from './CustomTextInput'
import { moduleNames } from "constantsConfiguration/enums/modules";

const InputFieldSelectHadith = ({
    t,
    onSubmitEditing,
    initialValue = '',
    value = null,
    disabled = false,
    textInputStyle = null,
    width = '100%',
    height = 60,
    backgroundColor = null,
    customContainerStyle,
    autoFocus = false,
    refInner = null,
    customInputHandler = null,
    addNewFavourite,
    navigation,
    item,
    onPressGoToHadith
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
    }, []);

    const debouncedTextInput = debounce(text => updateReducer(text), 600)

    const updateReducer = (text) => {
        if (customInputHandler) customInputHandler(text)
        // reduce({ type: 'changeInput', payload: { name: inputSettings.label, value: text } })
    };
    // ===================================================================

    // console.log('item.key ', item?.key)

    return (
        <View style={{ width: width, }} >
            <View style={[{ width: width, height: height, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, }, customContainerStyle]}>
                <View style={[{ flex: 1, height: height, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, borderWidth: 0.5, borderColor: '#BDBDBD', backgroundColor: backgroundColor || theme.searchInputBackgroundColor, overflow: 'hidden' }]}>

                    <View style={{ flex: 1, }} >
                        <CustomTextInput
                            height={height}
                            editable={!disabled}
                            refInner={refInner}
                            returnKeyType={"done"}
                            textInputContainerStyle={{}}
                            placeholder={'Broj hadisa'}
                            placeholderColor={theme.searchButtonTextColor}
                            backgroundColor={theme.searchInputBackgroundColor}
                            placehonderFontSize={15}
                            autoCapitalize={false}
                            onSubmitEditing={onSubmitEditing}
                            onChangeText={(text) => onChangeInput(text)}
                            selectionColor={theme.mainColor2}
                            borderColorActive={backgroundColor || theme.searchInputBackgroundColor}
                            borderColorInactive={backgroundColor || theme.searchInputBackgroundColor}
                            borderColorError={backgroundColor || theme.searchInputBackgroundColor}
                            value={innerValue}
                            blurOnSubmit={true}
                            onBlurAddition={() => { }}
                            style={textInputStyle || { paddingRight: 0, paddingLeft: 10, paddingTop: Platform.OS === 'ios' ? 0 : 0, fontSize: 16, color: theme.textColorReverse }}
                            autoFocus={true}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>

            <MainButton
                disabled={innerValue != '' && innerValue != null ? false : true}
                customContainerStyle={{ marginTop: 10 }}
                height={60}
                text={'Idite na hadis broj'}
                onPress={() => { onPressGoToHadith(item.key, parseInt(innerValue), true) }}
                textWeight={GlobalStyle.textFontRegular}
            />
        </View>
    )
}

export default Localization('Common', memo(InputFieldSelectHadith));
