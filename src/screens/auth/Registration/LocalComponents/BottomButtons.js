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

const BottomButtons = ({ t, loading, handleSubmit }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', }}>
            <MainButton
                disabled={loading ? true : false}
                height={60}
                text={t('register', 'Register')}
                backgroundColor={theme.mainButtonColor}
                textColor={theme.textColorWhite}
                onPress={handleSubmit}
                textWeight={GlobalStyle.textFontRegular}
                loading={loading}
            />
        </View>
    )
};

export default Localization('Auth', memo(BottomButtons));
