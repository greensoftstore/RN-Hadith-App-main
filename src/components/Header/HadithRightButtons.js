// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, Pressable, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
// =================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, selectThemeValue } from 'reduxConfiguration/slices/themeSlice';
import { selectRole, selectUser } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
import { ConstNumbers, GlobalStyle, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";


const HadithRightButtons = ({ onPressFullScreen, onPressShare, onPressSettings }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const themeVal = useSelector(selectThemeValue)
    const user = useSelector(selectUser)
    // ===================================================================

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: ConstNumbers.paddingHorizontalMain, zIndex: 1 }} >
            <TouchableOpacity onPress={onPressFullScreen} style={{ width: 40, height: 50, justifyContent: 'center', alignItems: 'center', }} >
                <Image source={themeVal == 'light' ? Images.ZoomLight : Images.ZoomLight} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { onPressShare(true) }} style={{ width: 40, marginHorizontal: 2, height: 50, justifyContent: 'center', alignItems: 'center', }} >
                <Image source={themeVal == 'light' ? Images.ShareLight : Images.ShareLight} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { onPressSettings(true) }} style={{ width: 40, height: 50, justifyContent: 'center', alignItems: 'center', }} >
                <Image source={themeVal == 'light' ? Images.ThreeDotsLight : Images.ThreeDotsLight} style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: theme.headerIconButtonColor }} />
            </TouchableOpacity>
        </View>
    )
}

export default memo(HadithRightButtons);
