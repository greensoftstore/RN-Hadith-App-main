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
import { LoginQuestion, Header } from 'components'
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

function ScreenMainComponent({ navigation, }) {
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
    const [initialLoad, setInitialLoad] = useState(true)
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    useEffect(() => {
        setTimeout(() => {
            setInitialLoad(false)
        }, 10)
    }, [])
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            {!authenticated &&
                <Header
                    title={screenSettings?.settings?.title?.main || null}
                    navigation={navigation}
                    displayBackButton={true}
                />
            }

            {!initialLoad && authenticated &&
                <ScreenDataComponent
                    navigation={navigation}
                    screenSettings={screenSettings}
                />
            }

            {!authenticated && <LoginQuestion navigation={navigation} />}

        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
