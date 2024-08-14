// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
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

const CollectionTopButtons = ({ t, activeText, toggleActiveText }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', backgroundColor: theme.singleCollectionTopButtonsBackgroundColor, flexDirection: 'row', padding: ConstNumbers.paddingHorizontalMain / 4, borderRadius: ConstNumbers.borderRadiusMain, alignItems: 'center', justifyContent: 'space-between', }} >
            <TouchableOpacity disabled={activeText === 1 ? true : false} onPress={() => toggleActiveText(1)} style={{ width: '48%', height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: activeText === 1 ? theme.singleCollectionTopButtonsActiveBackgroundColor : 'transparent' }} >
                <Text style={[GlobalStyle.textFontMedium, { fontSize: 14, lineHeight: 24, letterSpacing: 0.25, color: activeText === 1 ? theme.singleCollectionTopButtonsActiveTextColor : theme.singleCollectionTopButtonsInactiveTextColor }]}>{'Opis knjige'}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={activeText === 2 ? true : false} onPress={() => toggleActiveText(2)} style={{ width: '48%', height: 26, justifyContent: 'center', alignItems: 'center', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: activeText === 2 ? theme.singleCollectionTopButtonsActiveBackgroundColor : 'transparent' }} >
                <Text style={[GlobalStyle.textFontMedium, { fontSize: 14, lineHeight: 24, letterSpacing: 0.25, color: activeText === 2 ? theme.singleCollectionTopButtonsActiveTextColor : theme.singleCollectionTopButtonsInactiveTextColor }]}>{'Biografija autora'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Localization('Collection', memo(CollectionTopButtons));
