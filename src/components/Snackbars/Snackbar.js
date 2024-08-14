// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, { ZoomIn, ZoomOut, Layout } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
// ===================================================================
// Constants
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration'
// ===================================================================

const Snackbar = ({ onSnackbarClose, snackbar, index }) => {

    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Variables
    // -------------------------------------------------------------------
    const delay = useMemo(() => (snackbar.options.variant === 'notification' ? (index * 200) + 500 : index * 200), []);
    // ===================================================================

    // ===================================================================
    // Use Effects
    // -------------------------------------------------------------------
    useEffect(() => {
        setTimeout(() => {
            onSnackbarClose(snackbar.key)
        }, snackbar?.options?.time || 2000 + delay)
    }, []);
    // ===================================================================

    // ===================================================================
    // Animation
    // -------------------------------------------------------------------

    // ===================================================================

    return (
        <Animated.View layout={Layout.duration(500)} entering={ZoomIn.duration(500)} exiting={ZoomOut.duration(500)} style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 12, }}>
            <View style={{ width: '100%', height: 58, paddingVertical: 2, borderRadius: ConstNumbers.borderRadiusMain, overflow: 'hidden' }}>
                <Animated.View style={{ width: '100%', height: '100%', paddingLeft: 10, paddingRight: 35, justifyContent: 'center', backgroundColor: snackbar.options.variant === 'success' ? theme.snackbarbackgroundSuccess : snackbar.options.variant === 'notification' ? theme.snackbarbackgroundNotification : theme.snackbarbackgroundError, elevation: 5, transform: [{ translateX: 0 }] }}>
                    <Text style={{ ...GlobalStyle.textFontRegular, fontSize: 16, color: theme.textColorWhite }} numberOfLines={2}>{snackbar?.message ? snackbar.message : ''}</Text>
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default memo(Snackbar);
