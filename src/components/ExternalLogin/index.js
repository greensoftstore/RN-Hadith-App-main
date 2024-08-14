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
import { SmallButton, SecondaryButton } from 'components'
// =================================================================== 
// Constants
// ===================================================================
import { GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 

const ExternalLogin = ({ t, type = 1, buttonHeightCustom = null }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    if (type === 2)
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                <SmallButton
                    customContainerStyle={{ marginHorizontal: 10 }}
                    width={buttonHeightCustom || 65}
                    height={buttonHeightCustom || 65}
                    onPress={() => { }}
                    image={Images.Google}
                />

                <SmallButton
                    customContainerStyle={{ marginHorizontal: 10 }}
                    width={buttonHeightCustom || 65}
                    height={buttonHeightCustom || 65}
                    onPress={() => { }}
                    image={Images.Facebook}
                />

                <SmallButton
                    customContainerStyle={{ marginHorizontal: 10 }}
                    width={buttonHeightCustom || 65}
                    height={buttonHeightCustom || 65}
                    onPress={() => { }}
                    image={Images.Apple}
                />

                <SmallButton
                    customContainerStyle={{ marginHorizontal: 10 }}
                    width={buttonHeightCustom || 65}
                    height={buttonHeightCustom || 65}
                    onPress={() => { }}
                    image={Images.Windows}
                />
            </View>
        )

    return (
        <View>
            <SecondaryButton
                customContainerStyle={{ marginBottom: 10 }}
                height={buttonHeightCustom || 55}
                text={t('googleButton', 'Continue with Google')}
                onPress={() => { }}
                imageLeft={Images.Google}
                textWeight={GlobalStyle.textFontMedium}
            />

            <SecondaryButton
                customContainerStyle={{ marginBottom: 10 }}
                height={buttonHeightCustom || 55}
                text={t('facebookButton', 'Continue with Facebook')}
                onPress={() => { }}
                imageLeft={Images.Facebook}
                textWeight={GlobalStyle.textFontMedium}
            />

            <SecondaryButton
                customContainerStyle={{ marginBottom: 10 }}
                height={buttonHeightCustom || 55}
                text={t('iosButton', 'Continue with Apple')}
                onPress={() => { }}
                imageLeft={Images.Apple}
                textWeight={GlobalStyle.textFontMedium}
            />

            {/* <SecondaryButton
                customContainerStyle={{ marginBottom: 10 }}
                height={buttonHeightCustom || 55}
                text={t('windowsButton', 'Continue with Windows')}
                onPress={() => { }}
                imageLeft={Images.Windows}
                textWeight={GlobalStyle.textFontMedium}
            /> */}
        </View>
    )
};

export default Localization('ExternalLogin', memo(ExternalLogin));
