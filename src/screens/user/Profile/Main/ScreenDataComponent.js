// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    ScrollView,
    Alert,
    RefreshControl
} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from "@react-native-firebase/messaging";
import firestore from '@react-native-firebase/firestore';
import * as Keychain from 'react-native-keychain';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { logout, selectUserID, updateUser, selectUser, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
// =================================================================== 
// Components
// ===================================================================
import { MainBackgroundWidthShadow, ProfileButton, BottomEditImage, Header } from 'components'
// ===================================================================
import { ConstNumbers, Images } from 'constantsConfiguration';
import TopComponent from './LocalComponents/TopComponent'
import Devider from './LocalComponents/Devider'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'
import { moduleNames } from "constantsConfiguration/enums/modules";

function ScreenDataComponent({ t, navigation, screenSettings }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
    const user = useSelector(selectUser)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [visiableImageSettings, toggleVisiableImageSettings] = useState(false)
    const [loading, setLoading] = useState(false);
    const [refreshLocal, setrefreshLocal] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    /* useEffect(() => {
        if (!authenticated)
            navigation.navigate(moduleNames.HOME)
    }, [authenticated]) */

    useEffect(() => {
        getUserNewData()

    }, [])

    const getUserNewData = useCallback(async () => {
        const currentUser = auth().currentUser;

        await currentUser.reload()

        // console.log('currentUser ', currentUser)
        let newUser = {
            "photoURL": currentUser?.photoURL || null,
            "phoneNumber": currentUser?.phoneNumber || null,
            "displayName": currentUser?.displayName || null,
            "uid": currentUser?.uid || null,
            "email": currentUser?.email || null,
        }

        // console.log('currentUser?.photoURL ', currentUser?.photoURL)
        // console.log('user.photoURL ', user.photoURL)
        if (
            user.photoURL != newUser.photoURL
            || user.phoneNumber != newUser.phoneNumber
            || user.displayName != newUser.displayName
            || user.photoURL != newUser.photoURL
            || user.email != newUser.email
        ) dispatchRedux(updateUser(newUser))

        setrefreshLocal(false)
    }, [])

    const onRefresh = useCallback(async () => {
        setrefreshLocal(true)

        getUserNewData()
    }, [])

    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    const deleteAcc = useCallback(() => {
        Alert.alert(
            t('deleteAccTitle', 'Delete account'),
            t('deleteAccDescription', 'Are you sure you want to delete your account?'),
            [{
                text: t('no', 'No'), onPress: () => {
                }
            },
            {
                text: t('yes', 'Yes'), onPress: () => {
                    setLoading(true)

                    subscribeOrUnsubscribeFromTopic()
                    checkUserStatus()
                    // firestore()
                    //     .collection('users')
                    //     .doc(userId)
                    //     .delete()
                    //     .then(() => {
                    //         auth().currentUser.delete()
                    //             .then(() => {
                    //                 dispatchRedux(logout())
                    //             });
                    //     });

                }
            },
            ],
            { cancelable: true }
        );
    }, [])

    const onLogout = useCallback(() => {
        Alert.alert(
            t('logoutTitle', 'Logout'),
            t('logoutDescription', 'Are you sure you want to loggout?'),
            [{
                text: t('no', 'No'), onPress: () => {
                }
            },
            {
                text: t('yes', 'Yes'), onPress: () => {
                    setLoading(true)

                    subscribeOrUnsubscribeFromTopic()

                    auth()
                        .signOut()
                        .then(() => {
                            navigation.navigate(moduleNames.HOME)

                            dispatchRedux(logout())
                        })
                        .catch(error => {
                            setLoading(false)
                            let message = 'Došlo je do greške';
                            const key = new Date().getTime() + Math.random()

                            dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
                        });
                }
            },
            ],
            { cancelable: true }
        );
    }, [])

    const checkUserStatus = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            let username = '';
            let password = '';

            if (credentials) {
                username = credentials.username;
                password = credentials.password;

                auth()
                    .signInWithEmailAndPassword(username, password)
                    .then((user) => {
                        firestore()
                            .collection('users')
                            .doc(userId)
                            .delete()
                            .then(() => {
                                auth().currentUser.delete()
                                    .then(() => {

                                        navigation.navigate(moduleNames.HOME)

                                        dispatchRedux(logout())
                                    })
                                    .catch(error => {
                                        setLoading(false)
                                        let message = 'Došlo je do greške';
                                        const key = new Date().getTime() + Math.random()

                                        dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
                                    });
                            });
                    })
                    .catch(error => {
                        setLoading(false)
                        let message = 'Došlo je do greške';
                        const key = new Date().getTime() + Math.random()

                        dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
                    });

            } else {
                setLoading(false)
                let message = 'Došlo je do greške';
                const key = new Date().getTime() + Math.random()

                dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

            }
        }
        catch (error) {
            setLoading(false)
            let message = 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
        }
    }

    const subscribeOrUnsubscribeFromTopic = useCallback(async () => {
        messaging()
            .unsubscribeFromTopic('hadis_dana')
            .then(() => {
            })
            .catch((e) => {
            });
    }, [])

    const onPressImage = useCallback((val) => {
        toggleVisiableImageSettings(val)
    }, [])
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (<>
        <View style={{ width: '100%', flex: 1, overflow: 'hidden' }}>

            <Header
                title={screenSettings?.settings?.title?.main || null}
                navigation={navigation}
                displayBackButton={true}
            />

            <ScrollView
                style={{ width: '100%', flex: 1, }}
                contentContainerStyle={{
                    padding: ConstNumbers.paddingHorizontalMain,
                }}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshLocal}
                        onRefresh={onRefresh}
                        colors={Platform.OS === 'android' ? [theme.refreshLoader] : [theme.refreshLoader]}
                        tintColor={Platform.OS === 'android' ? theme.refreshLoader : theme.refreshLoader}
                        progressViewOffset={0}
                    />
                }

            >
                <View style={{ width: '100%', height: '100%' }} >

                    <TopComponent
                        onPressImage={onPressImage}
                        loadingImage={loadingImage}
                    />

                    <MainBackgroundWidthShadow>
                        <View style={{ width: '100%', backgroundColor: theme.secondaryBackgroundColor, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden' }} >
                            <ProfileButton
                                disabled={loading}
                                text={t('deleteProfile', 'Delete profile')}
                                image={Images.Delete}
                                onPress={() => { deleteAcc() }}
                            />

                            <Devider />

                            <ProfileButton
                                disabled={loading}
                                text={t('logout', 'Logout')}
                                image={Images.Logout}
                                onPress={() => { onLogout() }}
                                displayRightImage
                            />
                        </View>
                    </MainBackgroundWidthShadow>

                </View>

            </ScrollView>
        </View >


        <BottomEditImage
            onPressImage={onPressImage}
            visiable={visiableImageSettings}
            navigation={navigation}
            setLoadingImage={setLoadingImage}
        />
    </>
    );
};

export default Localization('Profile', memo(ScreenDataComponent));
