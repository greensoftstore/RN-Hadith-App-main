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
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
import { InputFieldAddFavourite } from 'components'
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, Devider, FontOptions } from 'components'
import Api from './api';
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'

const InnerComponent = ({ t, navigation, onPressSettings, visiable = false, refresh }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    // ===================================================================

    const [activeIndex, setActiveIndex] = useState(0)
    const [refreshText, setRefreshText] = useState(0)
    const [loading, setIsLoading] = useState(false)
    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    const bottomSheetRef = useRef(null);
    const refInput = useRef(null);

    // variables
    const snapPoints = useMemo(() => [220], []);
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            // setActiveIndex(0)
            onPressSettings(false)
            setTimeout(() => {
                Keyboard.dismiss()
            }, 50)
        } else {
            /*  bottomSheetRef.current.snapToIndex(activeIndex) */ /* setActiveIndex(index) */
        }


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

    const close = useCallback(() => {
        // setActiveIndex(0)
        onPressSettings(false)
    }, [])

    const addNewFavourite = useCallback(async (name) => {
        setIsLoading(true)

        let res = await Api.addNewCategory(userId, name)

        // console.log('res ', res)

        if (!res.success) {
            let message = res?.customMessage || 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
            setIsLoading(false)

        } else {
            let message = 'Kategorija uspješno kreirana';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key, 'success') }))
            setRefreshText(val => val + 1)
            refresh()
            setIsLoading(false)

            close()
        }
    }, [])

    const cancle = useCallback(() => {
        close()
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
            <View onLayout={handleContentLayout} style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: ConstNumbers.paddingHorizontalMain,
                paddingBottom: 20,
            }}>

                <InputFieldAddFavourite
                    key={'text' + refreshText}
                    disabled={loading}
                    addNewFavourite={addNewFavourite}
                    cancle={cancle}
                    loading={loading}
                    type={2}
                    refInner={refInput}
                />

            </View>
            {/* </BottomSheetView> */}
        </BottomSheet>
    );
};

export default Localization('Common', memo(InnerComponent));
