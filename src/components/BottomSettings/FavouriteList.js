// =================================================================== 
// Libraries
// ===================================================================
import React, { useRef, memo, useState, useCallback, useMemo, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
} from 'react-native';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, MainBackgroundWidthShadow, Devider, FontOptions } from 'components'
import Api from './api';

import FavouriteListTextInput from './FavouriteListTextInputV2'

const FavouriteList = ({ t, activeIndex, close, selectedItem, onPressIndex }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    // ===================================================================
    const [favouriteList, setFavouriteList] = useState([])
    const [itemHeight, setItemHeight] = useState(60)
    const [isLoading, setIsLoading] = useState(false)

    const isFocused = useIsFocused();
    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    useEffect(() => {
        if (isFocused)
            getData()
    }, [isFocused])

    const getData = useCallback(async () => {
        let res = await Api.getData(userId)

        setFavouriteList(res.items)
        let height = res.items.length > 5 ? 5 * 62 + 60 : res.items.length * 62 + 60
        setItemHeight(height)
    }, [])

    const onPressItem = useCallback(async (categoryId, category) => {
        setIsLoading(true)

        let newItem = selectedItem

        if (newItem?.book) delete newItem.book
        if (newItem?.category) delete newItem.category
        if (newItem?.subCategory) delete newItem.subCategory

        let res = await Api.addToFavouriteCategory(userId, categoryId, newItem.key, newItem, category)

        if (!res.success) {
            let message = res?.customMessage || 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()
            setIsLoading(false)
            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

        } else {
            let message = 'Hadis uspješno dodat u favorite';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key, 'success') }))
            setIsLoading(false)

            getData()

            close()
        }
    }, [isLoading, selectedItem])

    const addNewFavourite = useCallback(async (name) => {
        setIsLoading(true)
        let newItem = selectedItem

        if (newItem?.book) delete newItem.book
        if (newItem?.category) delete newItem.category
        if (newItem?.subCategory) delete newItem.subCategory

        let res = await Api.addNewToFavouriteCategory(userId, name, newItem.key, newItem)

        if (!res.success) {
            let message = res?.customMessage || 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
            setIsLoading(false)
        } else {
            let message = 'Hadis uspješno dodat u favorite';
            const key = new Date().getTime() + Math.random()
            setIsLoading(false)

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key, 'success') }))

            getData()

            close()
        }
    }, [isLoading, selectedItem])

    const cancle = useCallback(() => {
        onPressIndex(2)
    }, [])

    if (activeIndex == 2)
        return (
            <Animated.View /* entering={FadeIn.duration(400).delay(200)} exiting={FadeOut.duration(400)} */ style={{ width: '100%', }}>
                <MainBackgroundWidthShadow
                    customShadow={{ borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2 }}
                >
                    <View style={{ width: '100%', height: itemHeight, borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.modalBackgroundColor2, overflow: 'hidden' }} >
                        <BottomSheetScrollView contentContainerStyle={{ width: '100%', }} >
                            {favouriteList.map(item => (
                                <View key={item.key} style={{ width: '100%' }} >
                                    <ProfileButton
                                        disabled={isLoading}
                                        text={item?.favouriteTitle || ''}
                                        image={Images.Heart}
                                        onPress={() => { onPressItem(item.key, item) }}
                                        customImageStyle={{ width: 22, height: 22 }}
                                    />

                                    <View style={{ width: '100%', height: 0.5, backgroundColor: theme.settingsDevider }} />
                                </View>
                            ))}

                            <ProfileButton
                                disabled={isLoading}
                                text={t('addFavouriteCategory', 'Add category')}
                                image={Images.AddFavourite}
                                onPress={() => { onPressIndex(3) }}
                                displayRightImage
                            />
                        </BottomSheetScrollView>
                    </View>
                </MainBackgroundWidthShadow>
            </Animated.View>
        );

    if (activeIndex == 3)
        return (
            <FavouriteListTextInput
                addNewFavourite={addNewFavourite}
                isLoading={isLoading}
                cancle={cancle}
            />
        );

    return null
};

export default Localization('Common', memo(FavouriteList));
