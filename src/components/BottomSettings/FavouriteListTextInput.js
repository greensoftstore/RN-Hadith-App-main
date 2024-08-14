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

const FavouriteListTextInput = ({ t, isLoading, activeIndex, close, selectedItem, onPressIndex, addNewFavourite }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const userId = useSelector(selectUserID)
    // ===================================================================



    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <Animated.View /* entering={FadeIn.duration(400).delay(200)} exiting={FadeOut.duration(400)} */ style={{ width: '100%', borderRadius: ConstNumbers.borderRadiusMain, /* backgroundColor: '#1C1C1E', */ overflow: 'hidden' }} >
            <InputFieldAddFavourite
                disabled={false}
                addNewFavourite={addNewFavourite}
                loading={isLoading}

            />
        </Animated.View>
    );
};

export default Localization('Common', memo(FavouriteListTextInput));
