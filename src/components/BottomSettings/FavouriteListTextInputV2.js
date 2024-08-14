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
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// ===================================================================
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration';
// ===================================================================
// HOC
// ===================================================================
import Localization from 'hoc/localization';
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";
import { ProfileButton, InputFieldAddFavourite } from 'components'
import Api from './api';

const FavouriteListTextInput = ({ t, isLoading, activeIndex, close, selectedItem, onPressIndex, addNewFavourite, cancle }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    // ===================================================================
    const refInput = useRef(null);

    useEffect(() => {
        refInput.current.focus()
    }, [])

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>

            <InputFieldAddFavourite
                key={'text'}
                disabled={isLoading}
                addNewFavourite={addNewFavourite}
                cancle={cancle}
                loading={isLoading}
                type={2}
                refInner={refInput}
            />

        </View>
    );
};

export default Localization('Common', memo(FavouriteListTextInput));
