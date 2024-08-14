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
import { MainButton, Devider } from 'components'
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
    height = 50,
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

            {/* <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} >
                <Text style={[GlobalStyle.textFontMedium, { fontSize: 18, lineHeight: 24, color: theme.addFavouriteTitle, textAlign: 'center' }]} numberOfLines={1}>{'Broj hadisa'}</Text>
            </View> */}

            {/* <Devider height={12} /> */}

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
                            backgroundColor={theme.addFavouriteInputBackground}
                            placehonderFontSize={16}
                            autoCapitalize={false}
                            onSubmitEditing={onSubmitEditing}
                            onChangeText={(text) => onChangeInput(text)}
                            selectionColor={theme.mainColor2}
                            borderColorActive={theme.addFavouriteInputBorder}
                            borderColorInactive={theme.addFavouriteInputBorder}
                            borderColorError={theme.addFavouriteInputBorder}
                            value={innerValue}
                            blurOnSubmit={true}
                            onBlurAddition={() => { }}
                            style={textInputStyle || { paddingRight: 10, paddingLeft: 10, paddingTop: Platform.OS === 'ios' ? 0 : 0, fontSize: 16, color: theme.textColorReverse }}
                            autoFocus={true}
                            keyboardType={'decimal-pad'}

                        />
                    </View>
                </View>
            </View>

            <Devider height={15} />

            <MainButton
                disabled={innerValue != '' && innerValue != null ? false : true}
                customContainerStyle={{ marginTop: 0 }}
                height={56}
                text={'Idite na hadis'}
                onPress={() => { onPressGoToHadith(item.key, parseInt(innerValue), true) }}
                textWeight={GlobalStyle.textFontRegular}
            />
        </View>
    )
}

export default Localization('Common', memo(InputFieldSelectHadith));
