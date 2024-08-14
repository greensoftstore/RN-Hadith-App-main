// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectAuthenticated, } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// Components
// ===================================================================
import { BottomTabBar, Header, LoginQuestion } from 'components'
// =================================================================== 
// Local Components
// ===================================================================
import ScreenDataComponent from './ScreenDataComponent';
// ===================================================================
// Local Settings
// ===================================================================
import ScrennSettings from '../ScreenSettings';
// ===================================================================
// Utilities
// ===================================================================
import { createNewObjectFromExistingOne } from 'utilities/common'
// ===================================================================

function ScreenMainComponent({ navigation, route }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    // ===================================================================
    // Variables
    // -------------------------------------------------------------------
    const screenSettings = useMemo(() => createNewObjectFromExistingOne(ScrennSettings), [],);
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [initialLoad, setInitialLoad] = useState(false)
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    useEffect(() => {
        if (route?.params?.refresh) {
            setInitialLoad(true)
            setTimeout(() => {
                setInitialLoad(false)
            }, 10)
        }
    }, [route])
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            <Header
                title={screenSettings?.settings?.title?.main || null}
                navigation={navigation}
                displayBackButton={false}
            /> 

            {!initialLoad && authenticated &&
                <ScreenDataComponent
                    navigation={navigation}
                    screenSettings={screenSettings}
                />
            }

            {!authenticated && <LoginQuestion navigation={navigation} />}

            <BottomTabBar
                navigation={navigation}
                settings={screenSettings.settings}
                delay
                animate
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
