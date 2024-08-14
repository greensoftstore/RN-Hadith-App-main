// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useState, useMemo } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ShadowedView } from 'react-native-fast-shadow';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { CustomIcon } from 'components'

const BottomSlider = ({ navigation, selectedItem, selectNewHadith }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    const themeVal = useSelector(selectThemeValue);
    // ===================================================================

    let numberOfHadiths = selectedItem?.numberOfHadith ? parseInt(selectedItem.numberOfHadith) : 0
    let hadithNumber = selectedItem?.hadithNumber ? parseInt(selectedItem.hadithNumber) : 0
    let bookId = selectedItem?.bookId || null

    const [valueLocal, setLocalValue] = useState(selectedItem?.hadithNumber ? parseInt(selectedItem.hadithNumber) : 1)
    const [displayValueAbove, setDisplayValueAbove] = useState(false)

    const sliderWidth = useMemo(() => (Dimensions.get('window').width - 120 - 4 - (ConstNumbers.paddingHorizontalMain * 2)))

    const updateValue = useCallback((val) => {
        if (val > 0 && val <= numberOfHadiths) {
            setLocalValue(val)
            selectNewHadith(bookId, val)
        }
    }, [])

    // console.log('selectedItem ', selectedItem)
    // console.log('numberOfHadiths ', numberOfHadiths)
    // console.log('hadithNumber ', hadithNumber)

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------
    if (numberOfHadiths >= hadithNumber)
        return (
            <View style={{ width: '100%', zIndex: 1, flexDirection: 'row', height: 60, paddingTop: 13, alignItems: 'center' }} >
                <TouchableOpacity disabled={valueLocal <= 1 ? true : false} onPress={() => updateValue(valueLocal - 1)} style={{ width: 50, height: 60, justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ width: 32, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.singleHadithArrowsBackgroundColor }} >
                        <ShadowedView style={[{ width: '100%', borderRadius: 100, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.singleHadithArrowsBackgroundColor, }, themeVal === 'light' ? GlobalStyle.shadowThird : {}]}>
                            {/* <CustomIcon type={'AntDesign'} name={'arrowleft'} color={theme.singleHadithArrowsIconColor} style={{ fontSize: 20 }} /> */}
                            <Image source={themeVal == 'light' ? Images.LeftLight : Images.LeftDark} style={{ width: 13, height: 11, resizeMode: 'contain' }} />
                        </ShadowedView>
                    </View>
                </TouchableOpacity>

                <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                    <Slider
                        containerStyle={{ width: sliderWidth, height: 60, }}
                        minimumValue={1}
                        value={valueLocal}
                        maximumValue={numberOfHadiths}
                        minimumTrackTintColor={theme.singleHadithSliderActiveColor}
                        maximumTrackTintColor={theme.singleHadithSliderInactiveColor}
                        trackStyle={{ height: 4 }}
                        onValueChange={(val) => { setLocalValue(val[0]) }}
                        thumbStyle={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: theme.settingFontSizeSliderThumbBorderColor }}
                        thumbTintColor={theme.singleHadithSliderThumbColor}
                        step={1}
                        renderThumbComponent={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: theme.singleHadithSliderThumbColor,
                                        width: 32,
                                        height: 32,
                                        borderRadius: 100,
                                        borderWidth: 2,
                                        borderColor: displayValueAbove ? theme.singleHadithSliderActiveColor : theme.singleHadithSliderThumbBorderColor,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }} >
                                    <View
                                        style={{
                                            width: 3,
                                            height: 10,
                                            borderRadius: 100,
                                            backgroundColor: theme.singleHadithSliderThumbInnerLineColor
                                        }} />
                                </View>
                            )
                        }}

                        onSlidingStart={() => { setDisplayValueAbove(true) }}
                        onSlidingComplete={() => { setDisplayValueAbove(false); selectNewHadith(bookId, valueLocal) }}
                        renderAboveThumbComponent={(e) => {
                            if (displayValueAbove)
                                return (
                                    <Animated.View
                                        entering={FadeIn.duration(250)}
                                        style={{
                                            width: valueLocal.toString().length * 10 + 30,
                                            top: -3,
                                            right: (sliderWidth + (valueLocal.toString().length * 10 + 30)) / 2,
                                            alignItems: "center",
                                            backgroundColor: theme.singleHadithSliderThumbAboveBackgroundColor,
                                            borderRadius: ConstNumbers.borderRadiusMain,
                                            height: 26,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Animated.View entering={FadeIn.duration(250)} style={{ width: 14, height: 14, backgroundColor: theme.singleHadithSliderThumbAboveBackgroundColor, transform: [{ rotate: '45deg' }], bottom: - 4, position: 'absolute' }} />
                                        <Text style={[GlobalStyle.textFontSemiBold, { color: theme.singleHadithSliderThumbAboveTextColor }]} >
                                            {valueLocal}
                                        </Text>
                                    </Animated.View>
                                )
                            return null
                        }}
                    />
                </View>

                <TouchableOpacity disabled={valueLocal >= numberOfHadiths ? true : false} onPress={() => updateValue(valueLocal + 1)} style={{ width: 50, height: 60, justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ width: 32, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.singleHadithArrowsBackgroundColor }} >
                        <ShadowedView style={[{ width: '100%', borderRadius: 100, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.singleHadithArrowsBackgroundColor, }, themeVal === 'light' ? GlobalStyle.shadowThird : {}]}>
                            {/* <CustomIcon type={'AntDesign'} name={'arrowright'} color={theme.singleHadithArrowsIconColor} style={{ fontSize: 20 }} /> */}
                            <Image source={themeVal == 'light' ? Images.RightLight : Images.RightDark} style={{ width: 13, height: 11, resizeMode: 'contain' }} />
                        </ShadowedView>
                    </View>
                </TouchableOpacity>
            </View>
        );
};

export default memo(BottomSlider);
