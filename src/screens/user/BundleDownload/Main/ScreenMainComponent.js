// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import { config } from "../../../../constantsConfiguration";
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { SpinnerCustom } from 'components'
// ===================================================================
// Constant
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
// =================================================================== 

// Local Settings
// ===================================================================
import ScrennSettings from '../ScreenSettings';
// ===================================================================
// ===================================================================
import { GlobalStyle } from 'constantsConfiguration';
// ===================================================================

// Utility
// ===================================================================
import DownloadBundleUtil from "../../../../utilities/DownloadBundle";
// ===================================================================


function ScreenMainComponent({ navigation, route }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================
    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [percent, setPercent] = useState(0)
    const [loading, setLoading] = useState(false)
    // const [exist, setExist] = useState(false)
    // ===================================================================


    /* Start ------- Download Bundle file */
    const downloadFunc = (fileUrl, filePath) => {
        let percent = 0;
        
        RNFS.downloadFile({
            fromUrl: fileUrl,
            toFile: filePath,
            background: true, // Enable downloading in the background (iOS only)
            discretionary: true, // Allow the OS to control the timing and speed (iOS only)
            progress: (res) => {
                // Handle download progress updates if needed
                const progress = (res.bytesWritten / res.contentLength) * 100;
    
                if( parseInt(progress) > percent ) {
                    percent = parseInt(progress);
                    setPercent(percent)
                }
            },
        })
        .promise.then((response) => {
            setPercent(100)
            console.log('File downloaded!', response);
            setLoading(true);
            loadBundleFunc();
        })
        .catch((err) => {
            console.log('Download error:', err);
            downloadFunc(fileUrl, filePath);
        });
    }
    /* End ------- Download Bundle file */

    /* Start ------- Load Bundle file */
    const loadBundleFunc = async() => {
        const filePath = config.BundlePath;

        try {
            const bundleFileInfo = await RNFS.stat(filePath);
            const bundleSize = bundleFileInfo.size;

            let index = 0;
            let buffer = '';

            while (index < bundleSize) {
                
                let res = await RNFS.read(filePath, config.mbSize, index)

                buffer+=res;

                index += config.mbSize;
            }
            
            await firestore().loadBundle(buffer)
            config.bookBundleQuery = await firestore().namedQuery('books-query');
            // console.log("query ======================================= ")
            // console.log(config.bookBundleQuery);
            
            navigation.replace(moduleNames.HOME);
        }
        catch {error => 
            console.log(error)
            navigation.replace(moduleNames.HOME);
        }
    }
    /* End ------- Load Bundle file */

    /* Start ------- check bookbundle data */
    let collection = `bundles`
    let doc = `bookDetails`

    firestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(snapshot => {
        const bundleData = snapshot.data();

        /**
         * Check local storage data & update or create bundle file
         * @param {*} props 
         * @returns 
         */
        const CheckBundleFile = async() => {
            if(Platform.OS == 'ios') {
                if(percent == 0) {
                    const bundleInfo = await DownloadBundleUtil.existBundleFile(bundleData);
                    if (bundleInfo.exist == false) {
                        downloadFunc(bundleInfo.url, bundleInfo.path)
                    } else {
                        if(bundleInfo.download == true) {
                            downloadFunc(bundleInfo.url, bundleInfo.path);
                        }
                        else {
                            setPercent(100);
                            setLoading(true);
                            console.log("Exist !!!!!!!!!!!!")
                            loadBundleFunc();
                        }
                    }
                }
            } else {
                try{
                    let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );

                    if(!isPermitedExternalStorage) {
            
                        // Ask for permission
                        const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE ,
                            {
                                title: 'Storage Permission Required',
                                message: 'Application needs access to your storage to download Bundle file',
                                buttonNeutral: "Ask Me Later",
                                buttonNegative: "Cancel",
                                buttonPositive: "OK"
                            }
                        );
                        
                        if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                            if(percent == 0) {
                                const bundleInfo = await DownloadBundleUtil.existBundleFile(bundleData);
                                
                                if (bundleInfo.exist == false) {
                                    downloadFunc(bundleInfo.url, bundleInfo.path)
                                } else {
                                    if(bundleInfo.download == true) {
                                        downloadFunc(bundleInfo.url, bundleInfo.path);
                                    }
                                    else {
                                        setPercent(100);
                                        setLoading(true);
                                        console.log("Exist !!!!!!!!!!!!");
                                        loadBundleFunc();
                                    }
                                }
                            }
                        } else {
                            console.log("Denined!!!")
                        }
                    } else {
                        if(percent == 0) {
                            const bundleInfo = await DownloadBundleUtil.existBundleFile(bundleData);
                            console.log("Allowed!!!")
                            if (bundleInfo.exist == false) {
                                downloadFunc(bundleInfo.url, bundleInfo.path)
                            } else {
                                if(bundleInfo.download == true) {
                                    downloadFunc(bundleInfo.url, bundleInfo.path);
                                }
                                else {
                                    setPercent(100);
                                    setLoading(true);
                                    console.log("Exist !!!!!!!!!!!!");
                                    loadBundleFunc();
                                }
                            }
                        }
                    }
                } catch(err) {
                    setPercent(100);
                    setLoading(true);
                    console.log("ERROR!!!!!!!!!!!!!!!!!!");
                    console.log(err);
                    loadBundleFunc();
                }
            }
        }
        // ===============================================================

        CheckBundleFile();
    })
    .catch(error => {
        setPercent(100);
        setLoading(true);
        console.log("ERROR!!!!!!!!!!!!!!!!!!");
        console.log(error);
        loadBundleFunc();
    })
    /* End ------- check bookbundle data */


    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: '5%'}}>
                <View style={{ flexDirection: 'row', margin: '8%' }}>
                    <AnimatedCircularProgress
                        size={150}
                        width={7}
                        fill={percent}
                        tintColor="#4A3D35"
                        backgroundColor="#A0948C"
                        duration={0}
                    >
                        {
                            (fill) => (
                                <Text style={{ fontSize: 24 }}>
                                    { percent }%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={{marginBottom: '10%'}}>
                    <Text style={[GlobalStyle.textFontRegular, { fontSize: 18, color: theme.categoryTitleColor }]}>
                        Skida se sadržaj. Molimo pričekajte...
                    </Text>
                </View>
                {loading && <SpinnerCustom size={30} color={theme.textColorReverse} type={'FadingCircleAlt'} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
