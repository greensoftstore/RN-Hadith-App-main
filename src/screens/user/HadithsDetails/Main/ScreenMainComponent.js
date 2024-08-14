// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useEffect, useMemo, memo } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
// =================================================================== 
// Components
// ===================================================================
import { ListEmptyComponent, Header } from 'components'
import { selectAuthenticated, } from 'reduxConfiguration/slices/authSlice';
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

import Api from './api'

const displayFooter = true;

function ScreenMainComponent({ navigation, route }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    const isFocused = useIsFocused();

    // ===================================================================
    // Variables
    // -------------------------------------------------------------------
    const screenSettings = useMemo(() => createNewObjectFromExistingOne(ScrennSettings), [],);
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [initialLoad, setInitialLoad] = useState(true)
    const [selectedItem, setItem] = useState(null)
    // -------------------------------------------------------------------

    // ===================================================================
    // UseEffect
    // -------------------------------------------------------------------
    // useEffect(() => {
    //     setTimeout(() => {
    //     }, 10)
    // }, [])

    useEffect(() => {
        if(isFocused)
            checkForhadith()
    }, [isFocused]);

    const checkForhadith = async () => {

        // console.log('usao ', route?.params.hadithNumber)
        // console.log('selectedItem ', selectedItem?.hadithNumber)

        // setInitialLoad(true)
        if (route?.params?.getHadithByNumber) {
            const res = await Api.getHadith(route.params.bookId, route.params.hadithNumber)

            setItem(res?.item || null)

            setInitialLoad(false)
        } else if (route?.params?.hadith_id) {
            const res = await Api.getHadithByID(route.params.hadith_id)

            setItem(res?.item || null)

            setInitialLoad(false)
        } else if (route?.params?.key && selectedItem?.key ) {
            if(route?.params?.key != selectedItem?.key){
                setInitialLoad(true)
                setTimeout(() => {
                    setItem(route.params)
                    setInitialLoad(false)
                }, 1)
            }
        } else if (route?.params?.key) {
            setItem(route.params)
            setInitialLoad(false)
        } else {
            setInitialLoad(false)
        }
    }
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------
    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: theme.mainBackgroundColor }}>
            {selectedItem == null && !initialLoad &&
                <Header
                    title={``}
                    navigation={navigation}
                    displayBackButton={true}
                />
            }

            <View style={{ width: '100%', flex: 1, }} >
                {selectedItem && !initialLoad &&
                    <ScreenDataComponent
                        navigation={navigation}
                        screenSettings={screenSettings}
                        item={selectedItem}
                    />
                }

                {selectedItem == null && !initialLoad &&
                    <ListEmptyComponent
                        text={'Hadis nije pronađen'}
                    />
                }
            </View>

            {/* <View style={{width: 1, height: '100%', backgroundColor: 'red', position: 'absolute', right: 39}} />
            <View style={{width: 1, height: '100%', backgroundColor: 'red', position: 'absolute', left: 39}} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default memo(ScreenMainComponent);
