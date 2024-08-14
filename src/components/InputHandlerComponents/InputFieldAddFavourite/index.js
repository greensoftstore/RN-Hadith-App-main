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
import { MainButton, MainBackgroundWidthShadow, SecondaryButton, Devider } from 'components'
import { ConstNumbers, GlobalStyle, Images, } from 'constantsConfiguration'
// ===================================================================
import CustomTextInput from './CustomTextInput'

const SearchInputButton = ({
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
    cancle,
    loading,
    type = 1
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

    const cancleLocal = useCallback(() => {
        setInnerValue('')
        cancle()
    }, [])
    // ===================================================================

    if (type == 1)
        return (
            <View style={{ width: width, }} >
                <View style={[{ width: width, height: height, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, }, customContainerStyle]}>
                    <View style={[{ flex: 1, height: height, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, borderWidth: 0.5, borderColor: theme.searchInputBorderColor, backgroundColor: backgroundColor || theme.searchInputBackgroundColor, overflow: 'hidden' }]}>

                        <View style={{ marginLeft: 10, width: 40, height: 40, borderRadius: 100, backgroundColor: theme.profileButtonIconBackgroundColor, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <Image source={Images.Heart} style={[{ width: 25, height: 25, resizeMode: 'contain', tintColor: theme.profileButtonIconColor }]} />
                        </View>

                        <View style={{ flex: 1, }} >
                            <CustomTextInput
                                height={height}
                                editable={!disabled}
                                refInner={refInner}
                                returnKeyType={"done"}
                                textInputContainerStyle={{}}
                                placeholder={'Dodajte kategoriju'}
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
                                onBlurAddition={() => { }}
                                style={textInputStyle || { paddingRight: 0, paddingLeft: 0, paddingTop: Platform.OS === 'ios' ? 0 : 0, fontSize: 16, color: theme.textColorReverse }}
                                autoFocus={true}
                            />
                        </View>
                    </View>

                    {/* <TouchableOpacity disabled={innerValue != '' && innerValue != null ? false : true} onPress={() => { addNewFavourite(innerValue) }} style={{ opacity: innerValue != '' && innerValue != null ? 1 : 0.6, width: height, height: height, borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: backgroundColor || theme.searchInputBackgroundColor, borderWidth: 0.5, borderColor: theme.searchInputBorderColor, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Image source={Images.AddFavourite} style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: theme.searchInputFilterImageColor }} />
            </TouchableOpacity> */}
                </View>

                <MainButton
                    disabled={disabled ? disabled : innerValue != '' && innerValue != null ? false : true}
                    customContainerStyle={{ marginTop: 10 }}
                    height={60}
                    text={'Spasite'}
                    onPress={() => { addNewFavourite(innerValue) }}
                    textWeight={GlobalStyle.textFontRegular}
                    loading={loading}
                />
            </View>
        )

    if (type == 2)
        return (

            <MainBackgroundWidthShadow
                customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
            >
                <View style={{ width: '100%', height: '100%', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2, padding: ConstNumbers.paddingHorizontalMain, }} >



                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }} >
                        <Text style={[GlobalStyle.textFontMedium, { fontSize: 18, lineHeight: 24, color: theme.addFavouriteTitle, textAlign: 'center' }]} numberOfLines={1}>{'Nova kategorija'}</Text>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, lineHeight: 24, color: theme.addFavouriteSubTitle, textAlign: 'center' }]} numberOfLines={1}>{'Unesite naziv za ovu kategoriju'}</Text>
                    </View>

                    <Devider height={12} />

                    <View style={{ flex: 1, }} >
                        <CustomTextInput
                            height={height}
                            editable={!disabled}
                            refInner={refInner}
                            returnKeyType={"done"}
                            textInputContainerStyle={{}}
                            placeholder={'Naziv'}
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

                        />
                    </View>

                    <Devider height={15} />

                    {/* <View style={{ width: '100%', height: 1, marginTop: 20, marginBottom: 8, backgroundColor: theme.addFavouriteDevider }} ></View> */}

                    <View style={{ width: '100%', alignItems: 'center', overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <SecondaryButton
                            height={40}
                            width={'48%'}
                            text={'Poništi'}
                            onPress={() => { cancleLocal() }}
                            border={0}
                            disabled={loading}
                        />

                        <MainButton
                            height={40}
                            width={'48%'}
                            text={'Sačuvaj'}
                            onPress={() => { addNewFavourite(innerValue) }}
                            disabled={loading}
                            loading={loading}
                        />
                    </View>


                    {/* <View style={{ width: '100%', flexDirection: 'row' }} >
                        <MainButton
                            width={'50%'}
                            disabled={disabled ? disabled : false}
                            customContainerStyle={{ backgroundColor: 'transparent' }}
                            textCustomStyle={{ color: theme.addFavouriteButton1Text }}
                            height={50}
                            text={'Poništi'}
                            onPress={() => { cancleLocal() }}
                            textWeight={GlobalStyle.textFontMedium}
                            pressableMainButton={theme.buttonPressableColor1}
                        />
                        <MainButton
                            width={'50%'}
                            disabled={disabled ? disabled : innerValue != '' && innerValue != null ? false : true}
                            customContainerStyle={{ backgroundColor: 'transparent' }}
                            textCustomStyle={{ color: theme.addFavouriteButton2Text }}
                            height={50}
                            text={'Spremi'}
                            onPress={() => { addNewFavourite(innerValue) }}
                            textWeight={GlobalStyle.textFontBold}
                            loading={loading}
                            pressableMainButton={theme.buttonPressableColor1}
                            loaderColor={theme.addFavouriteButton2Text}

                        />
                    </View> */}

                </View>
            </MainBackgroundWidthShadow>
        )
}

export default memo(SearchInputButton);
