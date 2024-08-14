// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info'
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
import { GlobalStyle } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { config } from 'constantsConfiguration/config'

const Title = ({ t, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', marginTop: 16, paddingLeft: 8 }} >
            <Text style={[GlobalStyle.textFontBookerlyRegular, { fontSize: 24, lineHeight: 32, color: theme.mainTextColor, }]}>{t('hadithCollections', 'Hadith collections')}</Text>
        </View >
    );
};

export default Localization('Home', memo(Title));
