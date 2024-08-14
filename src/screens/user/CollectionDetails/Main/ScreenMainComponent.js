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
import { BottomTabBar, Header } from 'components'
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

const displayFooter = true;

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
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    /* useEffect(() => {
        setTimeout(() => {
            setInitialLoad(false)
        }, 10)
    }, []) */
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            <View style={{ width: '100%', flex: 1, }} >
                {!initialLoad &&
                    <ScreenDataComponent
                        navigation={navigation}
                        screenSettings={screenSettings}
                        item={route.params}
                    />
                }
            </View>

            {displayFooter &&
                <BottomTabBar
                    navigation={navigation}
                    settings={screenSettings.settings}
                    delay
                    animate
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);