// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { Platform, StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { BottomTabBar, Header, KeyboardBottom } from 'components'
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
import { ConstNumbers } from 'constantsConfiguration';

function ScreenMainComponent({ navigation, route }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
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
    const [displayBottomBar, toggleDisplayBottomBar] = useState(true)
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    useEffect(() => {
        setTimeout(() => {
            // setInitialLoad(false)
        }, 10)
    }, [])
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            {/* <Header
                title={screenSettings?.settings?.title?.main || null}
                navigation={navigation}
                displayBackButton={true}
            /> */}

            <View style={{ width: '100%', flex: 1, paddingBottom: displayBottomBar ? ConstNumbers.footerHeight : 0 }} >

                {displayBottomBar &&
                    <BottomTabBar
                        navigation={navigation}
                        settings={screenSettings.settings}
                        delay
                        animate
                        customBottomStyle={{ zIndex: 0 }}
                    />
                }

                {!initialLoad &&
                    <ScreenDataComponent
                        navigation={navigation}
                        screenSettings={screenSettings}
                        searchAutoFocus={route?.params?.autoFocus || false}
                    />
                }
            </View>

            {Platform.OS == 'android' && <KeyboardBottom
                hideBottomBar
                toggleDisplayBottomBar={toggleDisplayBottomBar}
                animate={false}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
