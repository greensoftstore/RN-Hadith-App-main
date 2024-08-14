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

const ErrorBoundary = ({ navigation, mainScreen, boundaryError, errorText, children, catchedError = null, screen = null }) => {

    // ===================================================================
    // Redux Props
    // ===================================================================
    const user = useSelector(selectUser)
    const theme = useSelector(selectThemeMode)
    const role = useSelector(selectRole)

    useEffect(() => {
        if (catchedError) {
            // Analytics.trackEvent(`SCREENCRASH => ${screen || 'Global'}`, { user: user?.data?.username || 'null', screen: screen || 'Global', error: catchedError + " " }).then(r => { }).catch(e => { })
        }
    }, [catchedError])

    const goBack = () => {
        if (mainScreen) {
            RNExitApp.exitApp();
        } else {
            // if (user !== null) {
                navigation.replace(moduleNames.HOME);
            // }
            // else navigation.replace('Login')
        }
    }

    if (boundaryError) {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor, }}>

                <View style={{ paddingHorizontal: 20, alignItems: 'center', marginTop: 120, }}>
                    < View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                    </View>
                    <Text style={{ fontSize: 32, textAlign: 'center', color: theme.mainTextColor }}>Nešto je pošlo po zlu</Text>
                    <Text style={{ marginVertical: 10, lineHeight: 23, color: theme.mainTextColor, fontWeight: '500', textAlign: 'center', marginBottom: 50 }}>
                        Aplikacija je naišla na problem i nije mogla nastaviti. Izvinjavamo se na svim neugodnostima koje je ovo izazvalo! Pritisnite dugme ispod za povratak. Molimo kontaktirajte nas ako se ovaj problem nastavi.
                    </Text>

                    <View style={{ width: '100%' }}>
                        <MainButton
                            height={60}
                            text={mainScreen ? 'Izadite iz aplikacije' : 'Nazad'}
                            onPress={() => { goBack() }}
                            textWeight={GlobalStyle.textFontSemiBold}
                        />
                    </View>

                </View>
            </View >
        )
    } else {
        return children;
    }
}

export default memo(ErrorBoundary)