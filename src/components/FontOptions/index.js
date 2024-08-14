// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Animated, { ZoomIn, ZoomOut, } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { setActiveFont, selectActiveFont, setFontSize, selectFontSize } from 'reduxConfiguration/slices/fontSlice';
// =================================================================== 
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';

const FontOptions = ({ }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)

    const activeFont = useSelector(selectActiveFont)
    const fontSize = useSelector(selectFontSize)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', }}>
            <View style={{ width: '100%', height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <TouchableOpacity onPress={() => { dispatch(setActiveFont('SFProDisplay')) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 60, }} >
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 30, lineHeight: 30, color: theme.settingFontPickerTextColor }} >Aa</Text>
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 12, color: theme.settingFontPickerTextColor }} >San Francisco</Text>
                    {activeFont === 'SFProDisplay' && <Animated.View entering={ZoomIn.duration(400)} exiting={ZoomOut.duration(400)} style={{ position: 'absolute', bottom: -5, height: 2, backgroundColor: theme.settingFontPickerTextActiveLineColor, width: 80 }} />}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { dispatch(setActiveFont('Bookerly')) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 60 }} >
                    <Text style={{ ...GlobalStyle.textFontBookerlyRegular, fontSize: 30, lineHeight: 30, color: theme.settingFontPickerTextColor }} >Aa</Text>
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 12, color: theme.settingFontPickerTextColor }} >Bookerly</Text>
                    {activeFont === 'Bookerly' && <Animated.View entering={ZoomIn.duration(400)} exiting={ZoomOut.duration(400)} style={{ position: 'absolute', bottom: -5, height: 2, backgroundColor: theme.settingFontPickerTextActiveLineColor, width: 80 }} />}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { dispatch(setActiveFont('Georgia')) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 60 }} >
                    <Text style={{ ...GlobalStyle.textFontGeorgiaRegular, fontSize: 30, lineHeight: 30, color: theme.settingFontPickerTextColor }} >Aa</Text>
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 12, color: theme.settingFontPickerTextColor }} >Georgia</Text>
                    {activeFont === 'Georgia' && <Animated.View entering={ZoomIn.duration(400)} exiting={ZoomOut.duration(400)} style={{ position: 'absolute', bottom: -5, height: 2, backgroundColor: theme.settingFontPickerTextActiveLineColor, width: 80 }} />}
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 1, marginVertical: 20, backgroundColor: theme.settingFontPickerDeviderColor }} />

            <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                <Slider
                    containerStyle={{ width: '100%', height: 60, }}
                    minimumValue={0}
                    value={fontSize}
                    maximumValue={4}
                    minimumTrackTintColor={theme.settingFontSizeSliderActiveColor}
                    maximumTrackTintColor={theme.settingFontSizeSliderInactiveColor}
                    trackStyle={{ height: 2 }}
                    onValueChange={(val) => { if (val[0] !== fontSize) dispatch(setFontSize(val[0])) }}
                    thumbStyle={{ width: 40, height: 40, borderRadius: 100, borderWidth: 2, borderColor: theme.settingFontSizeSliderThumbBorderColor }}
                    thumbTintColor={theme.settingFontSizeSliderThumbColor}
                    step={2}
                    trackMarks={[0, 2, 4]}
                />

                <View style={{ position: 'absolute', zIndex: -1, transform: [{ translateY: -40 }], width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                    <Text style={{ fontSize: 14, color: theme.settingFontSizeSliderInactiveColor, position: 'absolute', left: 0 }} >A</Text>
                    <Text style={{ fontSize: 16, color: theme.settingFontSizeSliderInactiveColor, position: 'absolute', }} >A</Text>
                    <Text style={{ fontSize: 18, color: theme.settingFontSizeSliderInactiveColor, position: 'absolute', right: 0 }} >A</Text>
                </View>

                <View style={{ position: 'absolute', zIndex: -1, width: '100%', height: 12, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ width: 2, height: '100%', backgroundColor: theme.settingFontSizeSliderInactiveColor }} />
                    <View style={{ width: 2, height: '100%', backgroundColor: theme.settingFontSizeSliderInactiveColor }} />
                    <View style={{ width: 2, height: '100%', backgroundColor: theme.settingFontSizeSliderInactiveColor }} />
                    {/* <View style={{ width: 2, height: '100%', backgroundColor: theme.settingFontSizeSliderInactiveColor }} />
                    <View style={{ width: 2, height: '100%', backgroundColor: theme.settingFontSizeSliderInactiveColor }} /> */}
                </View>
            </View>
        </View>
    )
};

export default memo(FontOptions);
