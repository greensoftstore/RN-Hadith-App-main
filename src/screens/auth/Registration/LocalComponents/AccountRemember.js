// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";

const AccountRemember = ({ t, navigation }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const navigateToScreen = useCallback((screen) => {
        navigation.goBack()
    }, [])

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <TouchableOpacity onPress={() => { navigateToScreen(moduleNames.LOGIN) }} style={{ paddingVertical: 5, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ ...GlobalStyle.textFontRegular, color: theme.textColorReverse, fontSize: 16, }} numberOfLines={6}>{t('accoutRemember', 'I remember my account')}</Text>
        </TouchableOpacity >
    )
};

export default Localization('Auth', memo(AccountRemember));
