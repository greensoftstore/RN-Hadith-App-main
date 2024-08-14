// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
//=================================================================== 
import { useDispatch, useSelector } from 'react-redux';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
import { setFCMToken } from "reduxConfiguration/slices/authSlice"
import { setNotificationScreenParams, selectNotificationScreenParams } from "reduxConfiguration/slices/subScreensParamsSlice"
import { selectNetInfo } from 'reduxConfiguration/slices/netInfoSlice';

import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'

const FirebaseSetup = ({ }) => {

    const dispatch = useDispatch()
    const notificationScreenParams = useSelector(selectNotificationScreenParams)
    const netInfo = useSelector(selectNetInfo)

    useEffect(() => {
        requestUserPermission()
    }, [])

    useEffect(() => {
        handleDatabase(netInfo)
    }, [netInfo])

    const handleDatabase = async (connected) => {
        if (connected)
            await database().goOnline();
        else database().goOffline();
    }

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // dispatch(createApiMessage({ message: remoteMessage.notification.body, key: remoteMessage.messageId, options: apiErrorSnackbarOptions(remoteMessage.messageId, 'notification') }))
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            // console.log('remoteMessage1 ', remoteMessage)
            if (remoteMessage && remoteMessage?.data) {
                if (remoteMessage?.data?.hadith_id) {
                    dispatch(setNotificationScreenParams({ hadith_id: remoteMessage?.data?.hadith_id }))
                }
            } else {
                if (notificationScreenParams != null) dispatch(setNotificationScreenParams(null))
            }
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                // console.log('remoteMessage2 ', remoteMessage)
                if (remoteMessage && remoteMessage?.data) {
                    if (remoteMessage?.data?.hadith_id) {
                        dispatch(setNotificationScreenParams({ hadith_id: remoteMessage?.data?.hadith_id }))
                    }
                } else {
                    if (notificationScreenParams != null) dispatch(setNotificationScreenParams(null))
                }
            });

        return unsubscribe;
    }, []);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            messaging().getToken()
                .then(token => {
                    // console.log('token ', token)
                    dispatch(setFCMToken(token))
                }).catch(e => {
                })
        }
    }
    return null;
};

export default memo(FirebaseSetup);