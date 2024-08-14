// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID, updateUser } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, Devider, FontOptions, MainBackgroundWidthShadow } from 'components'

const InnerComponent = ({ t, navigation, onPressImage, visiable = false, setLoadingImage }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);;

    // variables
    const snapPoints = useMemo(() => [190], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            onPressImage(false)
        }
    }, []);

    useEffect(() => {
        if (visiable) bottomSheetRef.current.snapToIndex(0)
        if (!visiable) bottomSheetRef.current.close()
    }, [visiable])

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const takePhoto = useCallback(async () => {
        ImagePicker.openCamera({
            includeBase64: false,
            // freeStyleCropEnabled: true,
            mediaType: 'photo',
            // width: 400,
            // height: 300,
            cropping: false,
            compressImageQuality: 0.2
        }).then(image => {
            setLoadingImage(true)
            uploadImage(image.path)
        });
    }, [])

    const chosePhoto = useCallback(async () => {
        ImagePicker.openPicker({
            includeBase64: false,
            // freeStyleCropEnabled: true,
            mediaType: 'photo',
            // width: 400,
            // height: 300,
            cropping: false,
            compressImageQuality: 0.2
        }).then(image => {
            setLoadingImage(true)
            uploadImage(image.path)
        });
    }, [])

    const uploadImage = useCallback((pathOriginal) => {

        if (pathOriginal) {
            let path = pathOriginal.replace('file://', '')

            // reference.putFile(image.path.);

            let pathStore = `/profile-images/${userId}/${moment(new Date()).format('YYYY_MM_DD_HH_mm_ss')}`

            storage()
                .ref(pathStore)
                .putFile(path)
                .then((successCb) => {
                    storage()
                        .ref(pathStore)
                        .getDownloadURL()
                        .then((result) => {
                            if (result != null) {
                                const currentUser = auth().currentUser;

                                currentUser.updateProfile({
                                    photoURL: result
                                }).then(() => {
                                    const currentUser2 = auth().currentUser;
                                    let newUser = {
                                        "photoURL": currentUser2?.photoURL || null,
                                        "phoneNumber": currentUser2?.phoneNumber || null,
                                        "displayName": currentUser2?.displayName || null,
                                        "uid": currentUser2?.uid || null,
                                        "email": currentUser2?.email || null,
                                    }
                                    dispatch(updateUser(newUser))
                                    setLoadingImage(false)
                                })
                            }
                        })
                })
                .catch((error) => {
                    setLoadingImage(false)
                });
        }
    }, [])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={visiable ? 0 : -1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: theme.modalBackgroundColor, overflow: 'hidden' }}
            handleIndicatorStyle={{ backgroundColor: '#C4C4C4', width: 60, height: 4, }}
            backdropComponent={renderBackdrop}
        >
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: ConstNumbers.paddingHorizontalMain,
                paddingBottom: 20,
            }}>

                <MainBackgroundWidthShadow
                    customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
                >
                    <View style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusThird, overflow: 'hidden', backgroundColor: theme.modalBackgroundColor2 }} >
                        <ProfileButton
                            text={t('takeAPicture', 'Take a picture')}
                            image={Images.Hadith}
                            onPress={() => { takePhoto() }}
                            customImageStyle={{ width: 22, height: 22 }}
                        />

                        <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />

                        <ProfileButton
                            text={t('choseFromGallery', 'Chose from gallery')}
                            image={Images.Hadith}
                            onPress={() => { chosePhoto() }}
                            displayRightImage
                        />
                    </View>
                </MainBackgroundWidthShadow>
            </View>
        </BottomSheet>
    );
};

export default Localization('Common', memo(InnerComponent));
