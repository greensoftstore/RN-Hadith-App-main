// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { StyleSheet, View, } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
// =================================================================== 
// Components
// ===================================================================
import { BottomTabBar, KeyboardBottom } from 'components'
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
import Api from './api'

function ScreenMainComponent({ navigation, route }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
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
    const [selectedItem, setSelectedItem] = useState(null)
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = useCallback(async () => {
        let res = await Api.getData(userId, route?.params?.item)

        if (!res.error) {
            setSelectedItem(res?.item)
            setInitialLoad(false)
        }
    }, [])
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor, justifyContent: 'flex-end', }}>


            <View style={{ width: '100%', flexGrow: 1 }} >
                {!initialLoad &&
                    <ScreenDataComponent
                        navigation={navigation}
                        screenSettings={screenSettings}
                        selectedItem={selectedItem}
                        autoFocus={route?.params?.autoFocus || false}
                    />
                }
            </View>



            <KeyboardBottom
                animate
                useOnAndroid
                bottomOffset={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
