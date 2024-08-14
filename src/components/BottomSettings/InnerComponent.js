// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Keyboard,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, useBottomSheetDynamicSnapPoints, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, Devider, FontOptions, MainBackgroundWidthShadow } from 'components'

import FavouriteList from './FavouriteList'

const InnerComponent = ({ t, navigation, onPressSettings, footerVisiable = true, onPressNote, visiable = false, copyText, selectedItem }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    const [activeIndex, setActiveIndex] = useState(0)
    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);;

    // variables
    // const snapPoints = useMemo(() => [/* 270, */ 280, 310, 400], []);
    // const initialSnapPoints = useMemo(() => [280, 310, 'CONTENT_HEIGHT', 190], []);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // if (activeIndex == 3) bottomSheetRef.current.snapToIndex(3)
        if (index === -1) {
            setActiveIndex(0)
            onPressSettings(false)
        } /* else if (index === 1) {
            setActiveIndex(1)
        } else {
            bottomSheetRef.current.snapToIndex(activeIndex)
        } */
        // console.log('index ', index)



    }, [activeIndex]);



    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                if (visiable) bottomSheetRef.current.snapToIndex(0)
            }
        )

        return () => {
            keyboardDidHideListener.remove();
        };
    }, [visiable]);

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

    const onPressIndex = useCallback((index) => {
        setActiveIndex(index)
        // bottomSheetRef.current.snapToIndex(index)
    }, [])

    const close = useCallback(() => {
        setActiveIndex(0)
        onPressSettings(false)
    }, [])

    const onPressNoteLocal = useCallback(() => {
        setActiveIndex(0)
        onPressSettings(false)
        onPressNote()
    }, [])


    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={visiable ? 0 : -1}
            // snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: theme.modalBackgroundColor, overflow: 'hidden' }}
            handleIndicatorStyle={{ backgroundColor: '#C4C4C4', width: 60, height: 4, }}
            backdropComponent={renderBackdrop}


            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
        >
            {/* <BottomSheetView
                style={{ width: '100%', flex: 1 }}
                onLayout={handleContentLayout}
            > */}
            <View
                onLayout={handleContentLayout}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: ConstNumbers.paddingHorizontalMain,
                    paddingBottom: 20,
                }}>

                {activeIndex == 0 &&
                    <Animated.View /* entering={FadeIn.duration(400).delay(200)} exiting={FadeOut.duration(400)} */ style={{ width: '100%', }}>
                        <MainBackgroundWidthShadow
                            customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
                        >
                            <View style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }} >
                                {authenticated &&
                                    <ProfileButton
                                        text={t('addToFavorites', 'Add to favorites')}
                                        image={Images.Heart}
                                        onPress={() => { onPressIndex(2) }}
                                        customImageStyle={{ width: 22, height: 22 }}
                                    />
                                }

                                {authenticated && <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />}

                                <ProfileButton
                                    text={t('copyTheTextOfTheHadith', 'Copy the text of the hadith')}
                                    image={Images.CoppyText}
                                    onPress={copyText}
                                    displayRightImage
                                />

                                <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />

                                {authenticated &&
                                    <ProfileButton
                                        text={t('WriteANoteOnTheHadith', 'Write a note on the hadith')}
                                        image={Images.AddNote}
                                        onPress={() => { onPressNoteLocal() }}
                                        displayRightImage
                                    />
                                }

                                {authenticated && <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />}

                                <ProfileButton
                                    text={t('textSizeAndSettings', 'Text size and settings')}
                                    image={Images.FontSizeEdit}
                                    onPress={() => { onPressIndex(1) }}
                                    displayRightImage
                                />
                            </View>
                        </MainBackgroundWidthShadow>
                    </Animated.View>
                }

                {/* {activeIndex == 0 &&
                    <Animated.View entering={FadeIn.duration(400).delay(200)} exiting={FadeOut.duration(400)} style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.modalBackgroundColor2 }} >
                        <ProfileButton
                            text={'Omiljeni hadisi'}
                            image={Images.Heart}
                            onPress={() => { }}
                            customImageStyle={{ width: 22, height: 22 }}
                        />

                        <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />

                        <ProfileButton
                            text={t('addFavouriteCategory', 'Add category')}
                            image={Images.AddFavourite}
                            onPress={() => { }}
                            displayRightImage
                        />
                    </Animated.View>
                }
 */}


                <FavouriteList
                    activeIndex={activeIndex}
                    close={close}
                    selectedItem={selectedItem}
                    onPressIndex={onPressIndex}
                />


                {activeIndex == 1 &&
                    <Animated.View /* entering={FadeIn.duration(400).delay(200)} exiting={FadeOut.duration(400)} */ style={{ width: '100%', }}>
                        <MainBackgroundWidthShadow
                            customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
                        >
                            <View style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2, padding: ConstNumbers.paddingHorizontalMain, }} >
                                <FontOptions />
                            </View>
                        </MainBackgroundWidthShadow>
                    </Animated.View>
                }

            </View>
            {/* </BottomSheetView> */}
        </BottomSheet>
    );
};

export default Localization('Common', memo(InnerComponent));
