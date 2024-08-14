// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useRef, memo, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    FlatList,
    Keyboard,
    Platform,
    ScrollView,
    RefreshControl
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from 'reduxConfiguration/slices/themeSlice';
import { selectSearchList, updateSearchList } from 'reduxConfiguration/slices/searchSlice';
import { createApiMessage } from "reduxConfiguration/slices/snackbarSlice"
import { updateLocalListBooks, updateLocalListBooksFilter, selectListOfBooksFilters } from 'reduxConfiguration/slices/booksSlice';
// =================================================================== 
// Components
// ===================================================================
import { Header, ListEmptyComponent, BottomBooksList, SearchInput, MainBackgroundWidthShadow } from 'components'
import SingleItem from './LocalComponents/SingleItem'
// ===================================================================
import { ConstNumbers, GlobalStyle } from 'constantsConfiguration';
import Api from './api'
import { apiErrorSnackbarOptions } from 'api/globalResponseErrorHandler'


const initialStateLocal = {
    items: null,
    books: null,
    startedSearching: false,
    updateSearchList: false,
    searchText: '',
    isGettingItems: false,
    isGettingBooks: true,
    error: true,
    refreshLocal: false
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'reset': return { ...initialState };
        case 'updateLocalList': return { ...state, items: payload, isGettingItems: false, refreshLocal: false };
        case 'setRefreshLocal': return { ...state, refreshLocal: payload, startedSearching: false };
        case 'updateLocalListBooks': return { ...state, /* books: payload, */ isGettingBooks: false };
        case 'toggleStartedSearching': return { ...state, startedSearching: true };
        case 'setUpdateSearchList': return { ...state, updateSearchList: state.updateSearchList + 1, searchText: payload, startedSearching: true };
        case 'setError': return { ...state, isGettingItems: true, refreshLocal: false };

        case 'updateLocalListBooksFilter':
            let newBooks = [...state.books]

            let selectedBook = newBooks[payload.index]

            selectedBook.active = payload.val

            newBooks[payload.index] = selectedBook;

            return { ...state, books: newBooks, };

        default: throw new Error();
    }
}



function ScreenDataComponent({ navigation, screenSettings, searchAutoFocus }) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    const dispatch = useDispatch()
    const theme = useSelector(selectThemeMode)
    const searchList = useSelector(selectSearchList)
    const listOfBooks = useSelector(selectListOfBooksFilters)

    const isFocused = useIsFocused();
    // ===================================================================
    const [state, reduce] = useReducer(reducer, { ...initialStateLocal });

    // ===================================================================
    // State
    // -------------------------------------------------------------------
    const [visiableSettings, toggleVisiableSettings] = useState(false)
    // ===================================================================

    // ===================================================================
    // Ref
    // -------------------------------------------------------------------
    const searchRef = useRef(null)
    // ===================================================================

    // ===================================================================
    // Api
    // -------------------------------------------------------------------

    // ===================================================================

    // ===================================================================
    // UseEffects
    // -------------------------------------------------------------------

    useEffect(() => {
        setTimeout(() => {
            if (isFocused && searchRef && searchAutoFocus) {
                searchRef?.current?.focus()

            }
        }, 250)

        return clearTimeout()
    }, [isFocused, searchAutoFocus])

    useEffect(() => {
        getBooks()
        // getData()
    }, [])

    useEffect(() => {
        // getSearch(['test', 'dva'], ['Z0Fdkh6XfJNQrH1gYmbh'])
    }, [])



    // useEffect(() => {
    //     if (state.refreshLocal) {
    //         getData()
    //     }
    // }, [state])

    useEffect(() => {
        if (state.startedSearching) {
            let bookItems = []
            if (listOfBooks) listOfBooks.map(val => { if (val.active) bookItems.push(val.key) })

            if (bookItems.length > 0) {
                getSearch(state.searchText.split(' '), bookItems, state.searchText)
            } else {
                let message = 'Lista knjiga ne smije biti prazna';
                const key = new Date().getTime() + Math.random()

                dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
            }
        }
    }, [state, listOfBooks])

    // ===================================================================

    // ===================================================================
    //  Methods
    // -------------------------------------------------------------------

    const getSearch = useCallback(async (arr, bookArr, searchText) => {
        let res = await Api.searchHadiths(arr, bookArr, searchText)

        if (!res.error) {
            dispatch(updateSearchList(res.items))

        } else {
            let message = 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))

        }
    }, [])

    const filterData = useCallback((text, items, books) => {
        const filtered = items.filter(el => {
            if (books) {
                if (el?.bookId && books.findIndex(val => val.active && val.key == el.bookId) > -1 && (el.content.toLowerCase().includes(text) || el.hadithTitle.toLowerCase().includes(text)))
                    return el
            } else {
                if ((el.content.toLowerCase().includes(text) || el.hadithTitle.toLowerCase().includes(text)))
                    return el
            }
        })

        if (filtered.length > 10) filtered.splice(0, 10)

        dispatch(updateSearchList(filtered))
    }, [])

    const removeItemFromList = useCallback((index) => {
        let itemsNew = [...searchList]
        itemsNew.splice(index, 1)

        dispatch(updateSearchList(itemsNew))
    }, [searchList])

    const customInputHandler = useCallback((text) => {
        // console.log('text ', text)

        reduce({ type: 'setUpdateSearchList', payload: text });
    }, [])

    const onPressFilter = useCallback(() => {

    }, [])

    const getData = useCallback(async () => {
        let res = await Api.getAllHadiths()

        if (!res.error) {
            reduce({ type: 'updateLocalList', payload: res.items });
        } else {
            let message = 'Došlo je do greške';
            const key = new Date().getTime() + Math.random()

            dispatch(createApiMessage({ message, key, options: apiErrorSnackbarOptions(key) }))
            reduce({ type: 'setError', payload: true });
        }
    }, [state])


    const getBooks = useCallback(async () => {
        let res = await Api.getBooks()

        if (!res.error) {
            reduce({ type: 'updateLocalListBooks', payload: null });
            dispatch(updateLocalListBooks(res.items))
        }
    }, [state])

    const onPressSettings = useCallback((val) => {
        toggleVisiableSettings(val)
    }, [])

    const updateBooks = useCallback((book) => {
        // console.log('book ', book)
        dispatch(updateLocalListBooksFilter(book))
        // reduce({ type: 'updateLocalListBooksFilter', payload: book });
    }, [])

    const onRefresh = useCallback((book) => {
        reduce({ type: 'setRefreshLocal', payload: true });
    }, [])
    // ===================================================================

    // ===================================================================
    //  Animations
    // -------------------------------------------------------------------
    // ===================================================================

    // ===================================================================
    // Render
    // -------------------------------------------------------------------

    const renderSingleItem = (item, index) => {
        return (
            <SingleItem
                item={item}
                index={index}
                navigation={navigation}
                removeItemFromList={removeItemFromList}
                startedSearching={state.startedSearching}
            />
        )
    }
    
    return (
        <>
            <View style={{ width: '100%', flex: 1, zIndex: 0 }}>

                <Header
                    title={screenSettings?.settings?.title?.main || null}
                    navigation={navigation}
                    displayBackButton={false}
                />

                <View style={{ width: '100%', flex: 1, padding: ConstNumbers.paddingHorizontalCard, paddingBottom: ConstNumbers.paddingHorizontalMain }}>
                    <MainBackgroundWidthShadow>

                        <View style={{ width: '100%', height: '100%', flex: 1, alignItems: 'center', overflow: 'hidden', borderRadius: ConstNumbers.borderRadiusThird, backgroundColor: theme.singleCollectionBackgroundColor, /* borderWidth: 1, borderColor: theme.singleCollectionBackgroundBorderColor, */ paddingBottom: 5 }} >
                            <SearchInput
                                refInner={searchRef}
                                disabled={state.isGettingItems ? true : false}
                                customInputHandler={customInputHandler}
                                customContainerStyle={{ paddingHorizontal: ConstNumbers.paddingHorizontalMain, marginTop: ConstNumbers.paddingHorizontalMain }}
                                onPressFilter={() => { Keyboard.dismiss(); onPressSettings(true) }}
                            />

                            <View style={{ width: '100%', marginVertical: 10, paddingHorizontal: ConstNumbers.paddingHorizontalMain, paddingLeft: ConstNumbers.paddingHorizontalMain + 8, }} >
                                <Text style={[GlobalStyle.textFontRegular, { fontSize: 14, color: theme.searchInputTitleColor, }]}>{state.startedSearching ? 'Rezultati pretrage' : 'Zadnje pretrage'}</Text>
                            </View>

                            <FlatList
                                data={searchList}
                                keyboardShouldPersistTaps={'handled'}
                                style={{ flex: 1, width: '100%', }}
                                keyboardDismissMode='on-drag'

                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={state.refreshLocal}
                                //         onRefresh={onRefresh}
                                //         colors={Platform.OS === 'android' ? [theme.refreshLoader] : [theme.refreshLoader]}
                                //         tintColor={Platform.OS === 'android' ? theme.refreshLoader : theme.refreshLoader}
                                //         progressViewOffset={0}
                                //     />
                                // }

                                keyExtractor={(item, index) => {
                                    return item.key;
                                }}
                                contentContainerStyle={{}}

                                initialNumToRender={15}

                                renderItem={({ item, index }) => renderSingleItem(item, index)}

                                ListEmptyComponent={() => {
                                    if (state.startedSearching)
                                        return (
                                            <ListEmptyComponent
                                            />
                                        )
                                }}

                            />
                        </View >
                    </MainBackgroundWidthShadow>
                </View>
            </View>

            <BottomBooksList
                onPressSettings={onPressSettings}
                visiable={visiableSettings}
                navigation={navigation}
                books={listOfBooks}
                updateBooks={updateBooks}
            />
        </>
    );
};

export default memo(ScreenDataComponent);
