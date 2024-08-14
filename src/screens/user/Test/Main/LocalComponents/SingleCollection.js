// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 

const SingleCollection = ({ t, onPress }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.homeItemSingleBackgroundColorMain, padding: ConstNumbers.paddingHorizontalMain / 2, marginBottom: ConstNumbers.paddingHorizontalMain / 2 }} >
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.homeItemSingleBackgroundColorSecond, padding: ConstNumbers.paddingHorizontalMain / 2 }} >
                <View style={{ width: 92, height: 135, marginRight: ConstNumbers.paddingHorizontalMain }} >
                    <Image source={Images.CollectionExample} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </View>

                <View style={{ flex: 1 }} >
                    <View>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 20, color: theme.homeItemSingleTextColor, }]}>{'Sahihul Buhari'}</Text>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.homeItemSingleSubtitleTextColor, marginBottom: 5 }]}>{'Muhammed ibn Ismail el Buhari'}</Text>
                        <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.homeItemSingleSubtitleTextColor, }]}>{'7654 hadisa'}</Text>

                        <View style={{ width: '100%', alignItems: 'flex-end' }} >
                            <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.homeItemSingleTextSecondColor, }]}>{'45% pročitano'}</Text>

                            <View style={{ width: '100%', height: 6, overflow: 'hidden', marginTop: 3, borderRadius: 100, backgroundColor: theme.homeItemSingleLineColorMain }} >
                                <View style={{ width: '45%', height: '100%', backgroundColor: theme.homeItemSingleLineColorSecond }} ></View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Localization('Settings', memo(SingleCollection));
