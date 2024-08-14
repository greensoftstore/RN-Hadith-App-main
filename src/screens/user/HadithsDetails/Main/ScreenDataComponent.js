// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
import { updateLastRead } from 'reduxConfiguration/slices/booksSlice';
import { selectActiveFont, selectFontSize } from 'reduxConfiguration/slices/fontSlice';
// =================================================================== 
// Components
// ===================================================================
import { MainBackgroundWidthShadow, Header, BottomTabBar, BottomSettings, BottomShare } from 'components'
import Title from './LocalComponents/Title'
import Description from './LocalComponents/Description'
import BottomSlider from './LocalComponents/BottomSlider'
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';
import { moduleNames } from 'constantsConfiguration/enums/modules';
import { copyText } from 'utilities/ExternalLinksHandler'
import Api from './api';

function ScreenDataComponent({ navigation, screenSettings, item }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const userID = useSelector(selectUserID)
    const authenticated = useSelector(selectAuthenticated)
    const fontSize = useSelector(selectFontSize)
    const activeFont = useSelector(selectActiveFont)
    // ===================================================================

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [selectedItem, setSelectedItem] = useState(item)
    const [visiableSettings, toggleVisiableSettings] = useState(false)
    const [shareVisiable, setShareVisiable] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    useEffect(() => {
        if (authenticated) {
            let bookId = selectedItem?.bookId || selectedItem?.hadith?.bookId || selectedItem?.book?.key || null

            Api.setAsRead(userID, bookId, selectedItem?.key)
        }


    }, [selectedItem, authenticated]);

    useEffect(() => {
        let bookId = selectedItem?.bookId || selectedItem?.hadith?.bookId || selectedItem?.book?.key || null
        let selectedItemNew = selectedItem
        if (selectedItemNew?.book) delete selectedItemNew.book
        if (selectedItemNew?.category) delete selectedItemNew.category
        if (selectedItemNew?.subCategory) delete selectedItemNew.subCategory

        dispatch(updateLastRead({ bookId: bookId, hadith: selectedItemNew }))
    }, [selectedItem]);
    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------

    const onPressFullScreen = useCallback(() => {
        navigation.push(moduleNames.HADITHSDETAILSFULLSCREEN, selectedItem)
    }, [selectedItem])

    const onPressShare = useCallback((val) => {
        setShareVisiable(val)
    }, [])

    const onPressSettings = useCallback((val) => {
        toggleVisiableSettings(val)
    }, [])

    const copyTextLocal = useCallback(() => {
        let plainString = selectedItem?.content.replaceAll('</p>', '\n\n').replaceAll('<br />', '\n').replaceAll('<br/>', '\n').replace(/<[^>]+>/g, '');

        copyText(plainString)
    }, [selectedItem])

    const onPressNote = useCallback(() => {
        let selectedItemNew = selectedItem
        if (selectedItemNew?.book) delete selectedItemNew.book
        if (selectedItemNew?.category) delete selectedItemNew.category
        if (selectedItemNew?.subCategory) delete selectedItemNew.subCategory

        navigation.push(moduleNames.NOTESDETAILS, {item: selectedItemNew, autoFocus: true})
    }, [selectedItem])

    const selectNewHadith = useCallback(async (bookId, hadithNumber) => {
        const res = await Api.getHadith(bookId, hadithNumber)

        setSelectedItem(res.item)
    }, [selectedItem])


    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    // console.log('selectedItem ', JSON.stringify(selectedItem, null, 2))

    return (
        <>
            <View style={{ width: '100%', flex: 1, zIndex: 0 }} >
                <Header
                    title={`${selectedItem?.bookTitle || selectedItem?.book?.bookTitle || ''}, ${selectedItem?.hadithNumber}`}
                    titlePosition={'flex-start'}
                    titleCustomStyle={[
                        activeFont === 'Bookerly'
                            ? GlobalStyle.textFontBookerlyBold
                            : activeFont === 'Georgia'
                                ? GlobalStyle.textFontGeorgiaBold
                                : GlobalStyle.textFontMedium,
                                { 
                        textAlign: 'left', 
                        fontSize: 16 + fontSize, 
                        lineHeight: 24,
                        }
                    ]}

                    navigation={navigation}
                    displayBackButton={true}
                    displayHadithRightButtons={true}

                    headerHeightCustom={ConstNumbers.headerHeight}

                    onPressFullScreen={onPressFullScreen}
                    onPressShare={onPressShare}
                    onPressSettings={onPressSettings}
                />

                <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalCard, paddingBottom: ConstNumbers.footerHeight + ConstNumbers.paddingHorizontalCard }}>



                    <View style={{ width: '100%', flex: 1, }} >
                        <MainBackgroundWidthShadow borderRadius={ConstNumbers.borderRadiusThird} >
                            <View style={{ width: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.singleCollectionBackgroundColor, paddingBottom: 5, borderWidth: 0.6, borderColor: theme.singleCollectionBackgroundBorderColor, }} >
                                <Title
                                    selectedItem={selectedItem}
                                />
                                <Description
                                    text={selectedItem?.content}
                                />
                            </View>

                        </MainBackgroundWidthShadow>

                        <BottomSlider
                            selectedItem={selectedItem}
                            selectNewHadith={selectNewHadith}
                        />
                    </View>
                </View>

                <BottomTabBar
                    navigation={navigation}
                    settings={screenSettings.settings}
                    delay
                    animate
                />

            </View >

            {selectedItem &&
                <BottomSettings
                    onPressSettings={onPressSettings}
                    visiable={visiableSettings}
                    navigation={navigation}
                    copyText={copyTextLocal}
                    onPressNote={onPressNote}
                    selectedItem={selectedItem}
                />
            }

            <BottomShare
                visiable={shareVisiable}
                onClose={onPressShare}
                item={selectedItem}
            />
        </>
    );
};

export default memo(ScreenDataComponent);
