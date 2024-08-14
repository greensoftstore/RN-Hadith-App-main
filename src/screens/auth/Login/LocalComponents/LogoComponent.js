// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
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

const LogoComponent = ({ t, handlebackButton }) => {
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
        <View style={{ width: '100%', flex: 1, minHeight: 300, justifyContent: 'center', alignItems: 'center' }} >
            {/* <View style={{ width: 250, height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.logoBackgroundColor }} >
                <Text style={{ color: theme.textColorWhite, fontSize: 22 }} >Logo</Text>
            </View> */}

            <Image source={Images.Logo} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
        </View>
    )
};

export default Localization('Auth', memo(LogoComponent));
