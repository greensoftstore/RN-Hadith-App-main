// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect } from 'react'
import { View, Text, Image, BackHandler } from 'react-native'
// import LottieView from 'lottie-react-native';
import RNExitApp from 'react-native-exit-app';
// import Analytics from 'appcenter-analytics'
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectRole } from 'reduxConfiguration/slices/authSlice';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainButton } from 'components'
// ===================================================================
// Constants
// ===================================================================
import { Images, Gifs } from 'constantsConfiguration';
// ===================================================================
// Settings
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
// =================================================================== 
import { GlobalStyle } from 'constantsConfiguration'

const LoginQuestion = ({ navigation, mainScreen, boundaryError, errorText, children, catchedError = null, screen = null }) => {

    // ===================================================================
    // Redux Props
    // ===================================================================
    const user = useSelector(selectUser)
    const theme = useSelector(selectThemeMode)
    const role = useSelector(selectRole)

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor, }}>

            <View style={{ paddingHorizontal: 20, alignItems: 'center', marginTop: 120, }}>
                < View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                </View>
                <Text style={{ fontSize: 32, textAlign: 'center', color: theme.mainTextColor }}>Nisi prijavljen na aplikaciju</Text>
                <Text style={{ marginVertical: 10, lineHeight: 23, color: theme.mainTextColor, fontWeight: '500', textAlign: 'center', marginBottom: 50 }}>
                    Ukoliko želiš da imaš pristup svim dijelovima aplikacije moraš se prvo prijaviti.
                </Text>

                <View style={{ width: '100%' }}>
                    <MainButton
                        height={60}
                        text={'Prijava'}
                        onPress={() => { navigation.push(moduleNames.LOGIN) }}
                        textWeight={GlobalStyle.textFontSemiBold}
                    />
                </View>

            </View>
        </View >
    )
}

export default memo(LoginQuestion)