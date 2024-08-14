// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    Keyboard
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, useBottomSheetDynamicSnapPoints, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
import { InputFieldSelectHadith } from 'components'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, Devider, FontOptions } from 'components'

const InnerComponent = ({ t, navigation, onPressSettings, item, footerVisiable = true, onPressNote, visiable = false, copyText, selectedItem }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    const [paddingBottom, setpaddingBottom] = useState(20)
    // ===================================================================

    const [activeIndex, setActiveIndex] = useState(0)
    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);
    const refInput = useRef(null);

    // variables
    const snapPoints = useMemo(() => [180], []);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            console.log('usao')
            setActiveIndex(0)
            onPressSettings(false)
            setTimeout(() => {
                Keyboard.dismiss()
            }, 50)
        } else {
            /*  bottomSheetRef.current.snapToIndex(activeIndex) */ /* setActiveIndex(index) */
        }


    }, [activeIndex]);


    useEffect(() => {

        const keyboardDidHideListener = Platform.OS === 'android' ? Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                if (visiable) bottomSheetRef.current.snapToIndex(0)
            }
        ) : Keyboard.addListener(
            'keyboardWillHide',
            (e) => {
                if (visiable) {
                    bottomSheetRef.current.snapToIndex(0)

                    setpaddingBottom(40)
                }
            }
        )

        const keyboardDidShowListener = Platform.OS === 'android' ? Keyboard.addListener(
            'keyboardDidShow',
            (e) => {

            }
        ) : Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                setpaddingBottom(20)
            }
        )

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [visiable]);

    useEffect(() => {
        if (visiable) {
            bottomSheetRef.current.snapToIndex(0)
            refInput.current.focus()
        }
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
        bottomSheetRef.current.snapToIndex(index)
    }, [])

    const onPressGoToHadith = useCallback((bookId, hadithNumber, getHadithByNumber) => {
        Keyboard.dismiss()
        close()

        setTimeout(() => {
            navigation.navigate(moduleNames.HADITHSDETAILS, { bookId: bookId, hadithNumber: hadithNumber, getHadithByNumber: getHadithByNumber })
        }, 250)
    }, [])

    const close = useCallback(() => {
        setActiveIndex(0)
        onPressSettings(false)
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
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: ConstNumbers.paddingHorizontalMain,
                paddingBottom: paddingBottom,
            }}
                onLayout={handleContentLayout}
            >

                <InputFieldSelectHadith
                    disabled={false}
                    navigation={navigation}
                    item={item}
                    refInner={refInput}
                    onPressGoToHadith={onPressGoToHadith}
                />

            </View>
            {/* </BottomSheetView> */}
        </BottomSheet>
    );
};

export default Localization('Common', memo(InnerComponent));
