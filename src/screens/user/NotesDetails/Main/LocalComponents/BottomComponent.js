// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectActiveFont, selectFontSize } from 'reduxConfiguration/slices/fontSlice';
// ===================================================================
import { GlobalStyle, ConstNumbers, Images } from 'constantsConfiguration'
// =================================================================== 
import { moduleNames } from "constantsConfiguration/enums/modules";

import { InputFieldNotesMultiline, SecondaryButton, MainButton } from 'components'

const BottomComponent = ({ navigation, selectedItem, onPressSave, isLoading, autoFocus = false }) => {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const theme = useSelector(selectThemeMode);
    // ===================================================================

    const inputRef = useRef(null)

    useEffect(() => {
        if(autoFocus)
            setTimeout(() => {
                inputRef.current.focus()
            }, 450)
    }, [])

    const [refreshValue, setRefreshValue] = useState(0)
    const [noteText, setNotetext] = useState(selectedItem?.note || '')

    const customTextChange = useCallback((text) => {
        setNotetext(text)
    }, [])

    const onPressSaveLocal = useCallback(() => {
        onPressSave(noteText)
    }, [noteText])
    // ===================================================================
    //  Render
    // -------------------------------------------------------------------

    return (
        <View style={{ width: '100%', flex: 1, minHeight: Dimensions.get('screen').height * 0.3 }} >
            <View style={{ height: 50, justifyContent: 'flex-end', paddingHorizontal: ConstNumbers.paddingHorizontalMain, }}>
                <Text style={[
                    GlobalStyle.textFontRegular,
                    { fontSize: 16, color: theme.singleHadithTitleColor, }]}>
                    Vaša bilješka
                </Text>
            </View>

            <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalMain, paddingBottom: ConstNumbers.paddingHorizontalMain }}>
                <View style={{ width: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, borderWidth: 0.6, borderColor: theme.singleCollectionBackgroundBorderColor, paddingBottom: 5, paddingTop: Platform.OS == 'ios' ? 2 : 0 }} >
                    <InputFieldNotesMultiline
                        refInner={inputRef}
                        disabled={isLoading}
                        key={refreshValue}
                        onSubmitEditing={() => {

                        }}
                        // autoFocus
                        initialValue={selectedItem?.note || ''}
                        inputSettings={null}
                        customTextChange={customTextChange}
                        textInputStyle={{ paddingLeft: 15, paddingRight: 15, paddingTop: 8 }}
                    // onFocusAddition={onFocusAddition}
                    // shadow
                    />
                </View>

                
            {/* <View style={{ height: 15, position: 'absolute', left: 16, top: 13, width: 15, backgroundColor: 'red' }} /> */}
            </View>

            <View style={{ marginBottom: Platform.OS == 'ios' ? ConstNumbers.paddingHorizontalMain * 2 + 4 : ConstNumbers.paddingHorizontalMain * 2, marginTop: ConstNumbers.paddingHorizontalMain, paddingHorizontal: ConstNumbers.paddingHorizontalMain, width: '100%', alignItems: 'center', overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between' }} >
                {/* <SecondaryButton
                    height={40}
                    width={'48%'}
                    text={'Poništi'}
                    onPress={() => {
                        setNotetext(selectedItem?.note || '')
                        setRefreshValue(val => val + 1)
                    }}
                    border={0}
                    disabled={isLoading}
                /> */}

                <MainButton
                    height={56}
                    width={'100%'}
                    text={'Sačuvaj'}
                    onPress={() => { onPressSaveLocal() }}
                    disabled={isLoading}
                    loading={isLoading}
                />
            </View>
        </View>
    );
};

export default memo(BottomComponent);
