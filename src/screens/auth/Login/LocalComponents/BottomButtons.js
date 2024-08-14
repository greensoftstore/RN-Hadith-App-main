// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainButton, SecondaryButton } from 'components'
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

const BottomButtons = ({ t, navigation, onPressLogin, disabled, loading }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const navigateToScreen = useCallback((screen) => {
        navigation.push(screen)
    }, [])

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', }}>
            <MainButton
                disabled={disabled}
                customContainerStyle={{ marginBottom: 10 }}
                height={60}
                text={t('login', 'Login')}
                onPress={() => { onPressLogin() }}
                textWeight={GlobalStyle.textFontRegular}
                loading={loading}
            />

            <SecondaryButton
                disabled={disabled}
                height={60}
                text={t('registratonNew', 'Register new account')}
                onPress={() => { navigateToScreen(moduleNames.REGISTRATION) }}
                border={0}
                textWeight={GlobalStyle.textFontRegular}
            />
        </View>
    )
};

export default Localization('Auth', memo(BottomButtons));
