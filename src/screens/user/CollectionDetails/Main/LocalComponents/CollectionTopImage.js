// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
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


const CollectionTopImage = ({ t, image, progress }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <>
            <Image source={{ uri: image }} style={{ width: 160, height: Dimensions.get('screen').height / 4, maxHeight: 230, resizeMode: 'contain' }} />

            <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.singleCollectionTextSecondColor, marginTop: 8 }]}>{`${progress} pročitano`}</Text>

            <View style={{ width: '100%', height: 1, backgroundColor: theme.singleCollectionTopDeviderColor, marginVertical: 8, marginBottom: 10 }} />
        </>

    );
};

export default Localization('Collection', memo(CollectionTopImage));
