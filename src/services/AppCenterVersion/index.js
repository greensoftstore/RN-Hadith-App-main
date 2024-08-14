// =================================================================== 
// Libraries
// ===================================================================
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    Platform,
    AppState
} from 'react-native';

import CodePush from "react-native-code-push";
import Animated, { BounceIn, } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { SpinnerCustom } from 'components';
import PackageStatus from './PackageStatus'
// ===================================================================

let AppCenterVersion = ({ }) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    const appState = useRef(AppState.currentState);

    const [syncMessage, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(false)

    useEffect(() => {
        checkForUpdate()
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkForUpdate()
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const checkForUpdate = useCallback(() => {
        setTimeout(() => {
            syncImmediate()
        }, 800)
    }, [])

    useEffect(() => {
        // CodePush.allowRestart()
        setTimeout(() => {
            syncImmediate()
        }, 1000)
    }, [])

    const codePushStatusDidChange = (syncStatus) => {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                // setMessage("Checking for update.");
                setMessage(null);
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                setMessage("Skidanje nove verzije");
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                // setMessage("Awaiting user action.");
                setMessage("Nova verzija dostupna");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                setMessage("Instalacija nove verzije");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                // setMessage("App up to date.");
                setMessage(null);
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                // setMessage("Update cancelled by user.");
                setMessage(null);
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                //CodePush.restartApp(true);
                setMessage("Nova verzija instalirana");
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                // setMessage("An unknown error occurred");
                setMessage(null);
                break;
        }
    }

    const codePushDownloadDidProgress = (progress) => {
    }

    const handleBinaryVersionMismatchCallback = (atribute) => {
    }

    const getUpdateMetadata = () => {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata) => {
                setMessage(metadata ? JSON.stringify(metadata) : "Running binary version")
            }, (error) => {
                setMessage("Error: " + error)
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended) */
    /* const sync = () => {
        CodePush.sync(
            {},
            codePushStatusDidChange,
            codePushDownloadDidProgress,
            handleBinaryVersionMismatchCallback
        );
    } */

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    const syncImmediate = () => {
        CodePush.sync(
            { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
            codePushStatusDidChange,
            codePushDownloadDidProgress,
            handleBinaryVersionMismatchCallback
        );
    }

    if (syncMessage !== null) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                statusBarTranslucent={true}
                onRequestClose={() => {

                }}
            >

                <View style={{ width: '100%', height: '100%', flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.1)' }}>

                    <View style={{ width: '100%', height: '100%' }}>

                        <Animated.View
                            entering={BounceIn.duration(500)}
                            style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22, position: 'absolute', width: '100%', height: '100%' }}>

                            <View
                                style={{ margin: 20, borderRadius: 10, alignItems: "center", overflow: 'hidden', backgroundColor: theme.modalbackground, minWidth: 220, paddingVertical: 10 }}>

                                <View style={{ width: '100%', marginVertical: 20, paddingHorizontal: Platform.OS === 'android' ? 40 : 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <SpinnerCustom size={Platform.OS === 'android' ? 50 : 35} color={theme.mainTextColor} type={'Circle'} />

                                    <PackageStatus syncMessage={syncMessage} />
                                </View>

                            </View>

                        </Animated.View>
                    </View>
                </View>

            </Modal >
        )
    }

    return null
};

// let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

// AppCenterVersion = CodePush(codePushOptions)(AppCenterVersion);


export default AppCenterVersion;