// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainButton, Devider } from 'components'
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';

function ListEmptyComponent({ text, buttonText, onPressButton, image, customHeight, paddingBottom }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', height: 80, marginTop: 10, paddingHorizontal: ConstNumbers.paddingHorizontalMain, }} >
            <View style={{ width: '100%', height: '100%', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.homeItemSingleBackgroundColorMain, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50, }} >

                <Text
                    style={[GlobalStyle.textFontSemiBold, { fontSize: 16, color: theme.emptyComponentTextColor, textAlign: 'center' }]}
                >
                    {text ? text : 'Lista je prazna'}
                </Text>
            </View>
        </View>
    );
};

export default memo(ListEmptyComponent);
