// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { Text, } from 'react-native';
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

const BottomVersion = ({ t, }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <Animated.View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20, }}>
            <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 14, color: theme.settingsVersionColor, }}>{`hadiskezbirke.ba`}</Text>
            <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 14, color: theme.settingsVersionColor, }}>{t('version', 'version')} {`${DeviceInfo.getVersion()}-${config.appCenterVersion}`}</Text>
        </Animated.View>
    );
};

export default Localization('Settings', memo(BottomVersion));
