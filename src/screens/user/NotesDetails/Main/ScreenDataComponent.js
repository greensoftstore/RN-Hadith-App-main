// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    Text,
    Keyboard,
    ScrollView
} from 'react-native';
import moment from 'moment'
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID } from 'reduxConfiguration/slices/authSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
// =================================================================== 
// Components
// ===================================================================
import { Header, InputFieldNotesMultiline, MainBackgroundWidthShadow } from 'components'
import Title from './LocalComponents/Title'
import BottomComponent from './LocalComponents/BottomComponent'
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';
import { moduleNames } from 'constantsConfiguration/enums/modules';
import { copyText } from 'utilities/ExternalLinksHandler'
import Api from './api';
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'

function ScreenDataComponent({ navigation, screenSettings, selectedItem, autoFocus = false }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatchRedux = useDispatch()
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [isLoading, setIsLoading] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------


    const onPressSave = useCallback(async (text) => {

        Keyboard.dismiss()

        let selectedItemNew = {
            ...selectedItem,
            note: text,
            lastEdited: new Date()
            // lastEdited: moment().unix()
        }

        setIsLoading(true)

        let res = await Api.editNote(userId, selectedItemNew.key, selectedItemNew)

        setIsLoading(false)

        let message = !res.error ? 'Bilješka uspješno spašena' : 'Bilješka nije uspješno spašena';
        const key = new Date().getTime() + Math.random()

        dispatchRedux(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key, !res.error ? 'success' : 'error') }))

        if (selectedItem?.fromList) {
            navigation.navigate(moduleNames.NOTES, { refresh: true })
        } else {
            navigation.navigate(moduleNames.HADITHSDETAILS, { ...selectedItem })
        }

    }, [selectedItem])

    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', flex: 1, }} >
            <Header
                title={screenSettings?.settings?.title?.main || null}
                navigation={navigation}
                displayBackButton={true}
            />

            <View style={{ width: '100%', flex: 1, zIndex: 0, }} >


                <View style={{ width: '100%', padding: ConstNumbers.paddingHorizontalMain, paddingBottom: 0 }}>


                    <View style={{ width: '100%', alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, borderWidth: 0.6, borderColor: theme.singleCollectionBackgroundBorderColor, paddingBottom: 5 }} >
                        <Title
                            selectedItem={selectedItem}
                            isLoading={isLoading}
                        />

                    </View>
                </View>

                <BottomComponent
                    selectedItem={selectedItem}
                    onPressSave={onPressSave}
                    isLoading={isLoading}
                    autoFocus={autoFocus}
                />

            </View >

            {/* <View style={{ height: '100%', position: 'absolute', left: 28, width: 1, backgroundColor: 'red' }} /> */}
        </View>
    );
};

export default memo(ScreenDataComponent);
