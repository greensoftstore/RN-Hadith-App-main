// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    Text,
    Animated,
    Platform,
} from 'react-native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectUserID, selectAuthenticated } from 'reduxConfiguration/slices/authSlice';
import { updateLastRead } from 'reduxConfiguration/slices/booksSlice';
// =================================================================== 
// Components
// ===================================================================
import { Header } from 'components'
import Title from './LocalComponents/Title'
import Description from './LocalComponents/Description'
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';

import api from './api'

const initialStateLocal = {
    items: null,
    lastItem: null,
    firstItem: null,
    updateListData: 0,
    endReachedRight: true,
    endReachedLeft: true,
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'reset': return { ...initialState };
        case 'updateLocalList': return { ...state, items: payload.items, endReachedRight: payload.endReachedRight, endReachedLeft: payload.endReachedLeft, lastItem: payload.lastItem, firstItem: payload.firstItem };
        case 'updateFirstAndLast': return { ...state, lastItem: payload, firstItem: payload, };
        case 'addToLocalList': return { ...state, items: [...state.items, ...payload.items], lastItem: payload.lastVisiable, endReached: payload.endReachedRight, };
        case 'addToBeginingLocalList': return { ...state, items: [...payload.items, ...state.items], firstItem: payload.firstVisiable, endReachedLeft: payload.endReachedLeft, };
        default: throw new Error();
    }
}


function ScreenDataComponent({ navigation, screenSettings, selectedItem }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const userId = useSelector(selectUserID)
    const authenticated = useSelector(selectAuthenticated)
    // ===================================================================

    const [state, reduce] = useReducer(reducer, { ...initialStateLocal, items: [selectedItem] });

    // ===================================================================
    // State
    // -------------------------------------------------------------------

    const xOffset = new Animated.Value(0);
    const screenWidth = Dimensions.get('screen').width - ConstNumbers.paddingHorizontalMain;

    const scrollViewRef = useRef(null)
    let canmomentum = useRef(false).current

    let fullSize = screenWidth * 2;

    const [activeScreen, setActiveScreen] = useState(0)


    const [isLoadigLeft, toggleIsLoadigLeft] = useState(false)
    const [isLoadigRight, toggleIsLoadigRight] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    // ===================================================================

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = useCallback(async () => {
        const res = await api.getInitialData(userId, 1, selectedItem)

        if (res.leftLength > 0) setActiveScreen(res.leftLength)

        if(res.lastItem?._data?.hadithNumber) dispatch(updateLastRead({ bookId: res.lastItem?._data?.bookId, hadith: res.lastItem?._data }))

        setTimeout(() => { reduce({ type: 'updateLocalList', payload: res }); }, 200)

    }, [state])

    const getLeftData = useCallback(async () => {
        const res = await api.getMoreDataLeft(userId, 1, selectedItem, state.firstItem)

        reduce({ type: 'addToBeginingLocalList', payload: res });

        setTimeout(() => { toggleIsLoadigLeft(false) }, 300)
    }, [state])

    const getRightData = useCallback(async () => {
        const res = await api.getMoreData(userId, 1, selectedItem, state.lastItem)

        reduce({ type: 'addToLocalList', payload: res });

        if(res.lastVisiable?._data?.hadithNumber) dispatch(updateLastRead({ bookId: res.lastVisiable?._data?.bookId, hadith: res.lastVisiable?._data }))

        setTimeout(() => { toggleIsLoadigRight(false) }, 300)
    }, [state])

    useEffect(() => {
        if (!state.endReachedLeft && activeScreen == 0 && state.items.length > 1 && !isLoadigLeft) {
            toggleIsLoadigLeft(true)
            getLeftData()
        }

        if (!state.endReachedRight && state.items.length > 1 && activeScreen == state.items.length - 1 && !isLoadigRight) {
            toggleIsLoadigRight(true)
            getRightData()
        }

    }, [activeScreen, state])


    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------



    const renderSingleItem = (item) => {

        return (
            <TouchableOpacity disabled={true} activeOpacity={1} onPress={() => { navigation.goBack() }} style={{ width: Dimensions.get('window').width - ConstNumbers.paddingHorizontalMain * 2, padding: ConstNumbers.paddingHorizontalMain / 4, paddingVertical: 0 }}>
                <View style={{ width: '100%', alignItems: 'flex-end', paddingRight: 16, marginBottom: 7 }} >
                    <Text style={[GlobalStyle.textFontRegular, { fontSize: 12, lineHeight: 14, letterSpacing: -0.5, color: theme.singleHadithTitleAboveColor, }]}>{selectedItem.bookTitle} / hadis {item?.hadithNumber}</Text>
                </View>
                <View style={{ width: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusMain, backgroundColor: theme.singleCollectionBackgroundColor, borderWidth: 0.6, borderColor: theme.singleCollectionBackgroundBorderColor, paddingBottom: 5 }} >
                    <Title
                        item={item}
                    />
                    <Description
                        text={item?.content}
                        item={item}
                        navigation={navigation}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {/* <Header
                title={'Sahihul-Buhari'}
                titlePosition={'flex-start'}

                navigation={navigation}
                displayBackButton={true}
                displayHadithRightButtons={true}
            /> */}
            <TouchableOpacity disabled={true} style={{ width: '100%', height: '100%', padding: ConstNumbers.paddingHorizontalMain, paddingVertical: Platform.OS == 'ios' ? 5 : 10 }} >

                <Animated.FlatList
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={state.items}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ flex: 1, width: '100%', overflow: 'visible' }}
                    removeClippedSubviews={false}
                    keyExtractor={(item, index) => {
                        return item.key;
                    }}
                    contentContainerStyle={{ overflow: 'visible' }}

                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                    }}

                    maximumZoomScale={2}

                    initialNumToRender={1}

                    renderItem={({ item, index }) => renderSingleItem(item, index)}


                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                        { useNativeDriver: false }
                    )}
                    onScrollBeginDrag={(e) => {
                        canmomentum = true

                    }}
                    onMomentumScrollEnd={(e) => {
                        if (fullSize !== e.nativeEvent.contentSize.width) fullSize = e.nativeEvent.contentSize.width;

                        if (canmomentum) {
                            canmomentum = false

                            let nexIndex = Math.round(((e.nativeEvent.contentOffset.x * 100 / fullSize) * state.items.length) / 100)
                            setActiveScreen(nexIndex)
                        }
                    }}

                // ListFooterComponent={() => (<View style={{ width: '100%', height: 60 }} />)}

                />

            </TouchableOpacity>
        </>
    );
};

export default memo(ScreenDataComponent);
