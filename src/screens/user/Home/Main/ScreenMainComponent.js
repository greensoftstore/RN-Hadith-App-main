// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectNotificationScreenParams, setNotificationScreenParams } from "reduxConfiguration/slices/subScreensParamsSlice"
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
import { ConstNumbers } from 'constantsConfiguration'
import { moduleNames } from "constantsConfiguration/enums/modules";

function ScreenMainComponent({ navigation, }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const notificationScreenParams = useSelector(selectNotificationScreenParams)
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



    useEffect(() => {
        // console.log('notificationScreenParams ', notificationScreenParams)
        if (notificationScreenParams?.hadith_id) {
            navigation.push(moduleNames.HADITHSDETAILS, { hadith_id: notificationScreenParams?.hadith_id })
            dispatch(setNotificationScreenParams(null))
        }

    }, [notificationScreenParams])
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>

            <Header
                // title={screenSettings?.settings?.title?.main || null}
                navigation={navigation}
                displayProfileInfo={true}
                displaySettingsButton={true}
                headerHeightCustom={ConstNumbers.headerHeight}

            />

            {!initialLoad &&
                <ScreenDataComponent
                    navigation={navigation}
                    screenSettings={screenSettings}
                />
            }

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
