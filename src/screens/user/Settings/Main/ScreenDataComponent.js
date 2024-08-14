// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    Platform,
} from 'react-native';
import email from 'react-native-email'
import messaging from "@react-native-firebase/messaging";
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectSubscribedToTopic, toggleSubscribeToTopic, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainBackgroundWidthShadow, SettingsButton, SettingsButtonSwitch } from 'components'
import BottomVersion from './LocalComponents/BottomVersion'
import Devider from './LocalComponents/Devider'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { ConstNumbers, Images } from 'constantsConfiguration';
import { moduleNames } from "constantsConfiguration/enums/modules";
import { openUrl } from 'utilities/ExternalLinksHandler'
import { config } from 'constantsConfiguration/config'


function ScreenDataComponent({ t, navigation, screenSettings }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const subscribedToTopic = useSelector(selectSubscribedToTopic)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    let offset = Platform.OS == 'ios' ? 80 : 100

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [hadithOfTheDay, toggleSwitch] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    const navigateToScreen = useCallback((screen) => {
        navigation.navigate(screen)
    }, [])

    const sendByMail = useCallback(() => {
        /* let url = `mailto:${''}`;

        // Create email link query
        const query = qs.stringify({
            subject: 'HadithApp Report',
            body: 'Pronašao sam grešku',
            cc: '',
            bcc: ''
        });

        if (query.length) {
            url += `?${query}`;
        }

        Linking.openURL(url); */

        const to = config.email // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: '', // string or array of email addresses
            bcc: '',
            subject: 'HadithApp Report',
            body: 'Postovanje,\n\nPronašao sam grešku\n\n',
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch((e) => { })

    })

    const subscribeOrUnsubscribeFromTopic = useCallback(async (val) => {
        dispatch(toggleSubscribeToTopic(val))

        if (val)
            messaging()
                .subscribeToTopic('hadis_dana')
                .then(() => {
                    // console.log("Subscribed to topic:", 'hadis_dana')

                })
                .catch((e) => {
                    dispatch(toggleSubscribeToTopic(!val))
                    // console.log(e);
                });
        else {
            messaging()
                .unsubscribeFromTopic('hadis_dana')
                .then(() => {
                    // console.log("UnSubscribed from topic:", 'hadis_dana')
                })
                .catch((e) => {
                    dispatch(toggleSubscribeToTopic(!val))
                    // console.log(e);
                });
        }
    }, [])
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', flex: 1, }}>
            <ScrollView
                style={{ width: '100%', flex: 1, }}
                contentContainerStyle={{
                    padding: ConstNumbers.paddingHorizontalMain,

                    justifyContent: 'space-between'
                }}
            >
                <View style={{ width: '100%', minHeight: Dimensions.get('window').height - ConstNumbers.headerHeight - ConstNumbers.headerPaddingHeight - offset, }} >

                    <View style={{ width: '100%', marginBottom: 32 }} >
                        <MainBackgroundWidthShadow >
                            <View style={{ width: '100%', backgroundColor: theme.secondaryBackgroundColor, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden', }} >
                                <SettingsButton
                                    text={t('fontAndSizeSettings', 'Font and size settings')}
                                    image={Images.FontSettings}
                                    onPress={() => { navigateToScreen(moduleNames.FONTSETTINGSSCREEN) }}
                                />

                                <Devider />

                                <SettingsButton
                                    text={t('darkMode', 'Dark mode')}
                                    image={Images.DarkTheme}
                                    onPress={() => { navigateToScreen(moduleNames.THEMESETTINGSSCEEN) }}
                                />

                                <Devider />

                                {authenticated &&
                                    <SettingsButtonSwitch
                                        text={t('hadithOfTheDay', 'Hadith of the day')}
                                        image={Images.HadisNotification}
                                        onPress={() => { subscribeOrUnsubscribeFromTopic(!subscribedToTopic) }}
                                        value={subscribedToTopic}
                                    />
                                }

                                {authenticated && <Devider />}

                                <SettingsButton
                                    text={t('instructionsForUse', 'Instructions for use')}
                                    image={Images.Instructions}
                                    onPress={() => { navigateToScreen(moduleNames.APPINTRO) }}
                                />
                            </View>
                        </MainBackgroundWidthShadow>
                    </View>


                    <View style={{ width: '100%', }} >
                        <MainBackgroundWidthShadow >
                            <View style={{ width: '100%', backgroundColor: theme.secondaryBackgroundColor, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden', /* marginBottom: 40 */ }} >
                                <SettingsButton
                                    text={t('platformOfHadithConfusion', 'Platform of Hadith confusion')}
                                    image={Images.PlatformInfo}
                                    onPress={() => { openUrl('https:\\www.google.com') }}
                                />

                                <Devider />

                                <SettingsButton
                                    text={t('privacyPolicy', 'Privacy Policy')}
                                    image={Images.PrivacyPolicy}
                                    onPress={() => { openUrl('https:\\www.google.com') }}
                                />

                                <Devider />

                                <SettingsButton
                                    text={t('reportABug', 'Report a bug')}
                                    image={Images.ReportMistake}
                                    onPress={() => { sendByMail() }}
                                />
                            </View>
                        </MainBackgroundWidthShadow>
                    </View>

                </View>

                <BottomVersion />

            </ScrollView>
        </View>
    );
};

export default Localization('Settings', memo(ScreenDataComponent));
